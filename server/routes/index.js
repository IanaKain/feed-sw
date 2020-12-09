const router = require('express-promise-router')();
const posts = require('./posts');

router.use('/api/posts', posts);

module.exports = router;
