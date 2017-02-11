const router = require('express').Router();
const Login = require('./api/login');
const Logout = require('./api/logout');
const Signup = require('./api/signup');

module.exports = router;

router
  .get('/', (req, res) => res.sendFile('/index.html'));

router
  .get('/login', Login.get)
  .post('/login', Login.post);

router
  .get('/logout', Logout.get);

router
  .get('/signup', Signup.get)
  .post('/signup', Signup.post);

router
  .get('/users', (req, res) => {
    setTimeout(() => {
      res.json({ success: 'data' });
    }, 3000);
  });

router.get('*', (req, res) => res.json({ error: 'error' }));
