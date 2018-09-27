import { ResetPasswordPage } from './';
// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

export default {
  path: '',
  name: 'auth',
  childRoutes: [
    { path: '/reset/:token', name: 'Reset password page', component: ResetPasswordPage },
  ],
};
