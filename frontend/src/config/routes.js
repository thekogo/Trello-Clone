import RegisterPage from '../components/pages/Register';
import LoginPage from '../components/pages/Login';

const components = {
  register: {
    url: '/register',
    component: RegisterPage
  },
  login: {
    url: '/login',
    component: LoginPage
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
}

export default config;