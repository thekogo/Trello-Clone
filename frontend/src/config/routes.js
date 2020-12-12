import RegisterPage from '../components/pages/Register';
import LoginPage from '../components/pages/Login';
import BoardPage from '../components/pages/Board';

const components = {
  register: {
    url: '/register',
    component: RegisterPage
  },
  login: {
    url: '/login',
    component: LoginPage
  },
  board: {
    url: '/board',
    component: BoardPage
  }
}

const config = {
  guest: {
    allowedRoutes: [
      components.register,
      components.login
    ],
    redirectRoute: '/login'
  },
  member: {
    allowedRoutes: [
      components.board,
    ],
    redirectRoute: '/board'
  }
}

export default config;