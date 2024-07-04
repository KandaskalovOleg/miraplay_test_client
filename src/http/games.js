import axios from "axios";

export const API_GAMES_URL = 'https://api.miraplay.cloud';

const $apiGames = axios.create({
  withCredentials: true,
  baseURL: API_GAMES_URL,
});


export default $apiGames;
