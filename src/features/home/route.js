import {
  LandingPage,
} from './';

export default {
  path: '/',
  name: 'Landing',
  childRoutes: [
    { name: 'Landing page',
      component: LandingPage,
      isIndex: true,
    },
  ],
};
