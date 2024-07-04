import { makeAutoObservable, toJS } from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import { API_AUTH_URL } from "../http/auth";
import { API_GAMES_URL } from "../http/games";

export default class Store {
  user = {};
  isAuth = false;
  isLoading = false;
  errorMessageLogin = null;
  errorMessageReg = null;
  isActivated = false;

  games = [];
  gamesListLength = 0;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool) {
    this.isAuth = bool;
  }

  setUser(user) {
    this.user = user;
  }

  setLoading(bool) {
    this.isLoading = bool;
  }

  setErrorLogin(error) {
    this.errorMessageLogin = error;
  }

  setErrorReg(error) {
    this.errorMessageReg = error;
  }

  setActivated(bool) {
    this.isActivated = bool;
  }

  setGames(data) {
    this.games = toJS(data.games);
    this.gamesListLength = data.gamesListLength;
  }

  async login(email, password) {
    this.setLoading(true);
    
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      this.setActivated(response.data.user.isActivated);
      this.setErrorLogin('');
    } catch(e) {
      this.setErrorLogin(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }

  async registration(email, password) {
    this.setLoading(true);

    try {
      const response = await AuthService.registration(email, password);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      this.setActivated(response.data.user.isActivated);
      this.setErrorReg('');
    } catch(e) {
      this.setErrorReg(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }

  async logout() {
    this.setLoading(true);

    try {
      await AuthService.logout();
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({});
    } catch(e) {
      // console.log(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }

  async cheakAuth() {
    this.setLoading(true);

    try {
      const response = await axios.get(`${API_AUTH_URL}/refresh`, {
        withCredentials: true,
      });    
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      this.setActivated(response.data.user.isActivated);
    } catch(e) {
      // console.log(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }

  async getGames() {
    try {
      const response = await axios.post(`${API_GAMES_URL}/games/by_page`, {
        page: 1,
        isFreshGamesFirst: true,
        genre: 'FREE',
        gamesToShow: 9,
      });

      this.setGames(response.data);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  }
}