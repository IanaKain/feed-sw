const router = require('express-promise-router')();
const posts = require('./posts');

router.use('/posts', posts);

module.exports = router;
