import RegisterPage from '../components/pages/Register';
import LoginPage from '../components/pages/Login';
import BoardPage from '../components/pages/Board';
import BoardDetail from '../components/pages/BoardDetail';

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
  },
  boardDetail: {
    url: '/board/:boardId',
    component: BoardDetail
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
      components.boardDetail
    ],
    redirectRoute: '/board'
  }
}

export default config;