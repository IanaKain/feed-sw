const fs = require('fs');
const path = require('path');
const router = require('express-promise-router')();
const FileType = require('file-type');

router.get('/', (req, res, next) => {
  fs.readFile(require.resolve(path.resolve(__dirname, '../data/posts.json')), (err, json) => {
    if (err) {
      res.status(200).json({ data: [] });
    }
    else {
      const data = JSON.parse(json);
      const posts = data.map(async (post) => {
        const image = post.image ? fs.readFileSync(
          path.resolve(__dirname, `../data/images/${post.image}`)
        ) : '';
        const fileData = image.length ? await FileType.fromBuffer(image) : '';
        const file = fileData ? `data:${fileData.mime};base64,${image.toString('base64')}` : '';
        return {...post, image: file};
      })

      Promise.all(posts)
        .then(result => { res.status(200).json({ data: result }); })
        .catch((error) => {
          console.log('Error getting posts', error);
          return;
        });
    }
  })
});

module.exports = router;
