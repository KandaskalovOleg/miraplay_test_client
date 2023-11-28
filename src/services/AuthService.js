import $apiAuth from '../http/auth';

export default class AuthService {
  static async login(email, password) {
    return $apiAuth.post('/login', { email, password });
  }

  static async registration(email, password) {
    return $apiAuth.post('/registration', { email, password });
  }

  static async logout() {
    return $apiAuth.post('/logout');
  }
}
