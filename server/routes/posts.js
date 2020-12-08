const router = require('express-promise-router')();

router.get('/', (req, res, next) => {
  res.status(200).json({
    data: [
      {title: 'Morning coffee', content: '10 Ways to Improve Your Morning Coffee. Brew a Better Cup at Home'},
      {title: 'Signs Their Love is Authentic', content: 'Nothing is possible without love…..For love puts one in a mood to risk everything.'},
      {title: 'You’re a social perfectionist', content: '6 Psychological Reasons Why You Take Things Too Personally'}
    ]
  });
});

module.exports = router;
