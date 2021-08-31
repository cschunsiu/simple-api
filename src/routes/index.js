let express = require('express');
let router = express.Router();
const { getById, create, getByShortened } = require('../service/index');

router.post('/url', async (req, res, next) => {
  const { url: original } = req.body;

  // validate URL
  let pattern = new RegExp('^(https?:\\/\\/)?'+
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
      '((\\d{1,3}\\.){3}\\d{1,3}))'+
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
      '(\\?[;&a-z\\d%_.~+=-]*)?'+
      '(\\#[-a-z\\d_]*)?$','i');
  if(!pattern.test(original)) {
    console.log('Url input is not valid.');
    throw new Error();
  };

  const shortened = [..."abcdefghijklmnopqrsuvwxyz0123456789"].map((e, i, a) => a[Math.floor(Math.random() * a.length)]).join('');
  await create({ original, shortened });
  const result = await getByShortened({ shortened });
  res.status(201).send(`Url added with ID: ${JSON.stringify(result)}`)
});

router.post('/', async (req, res, next) => {
  const { url: shortened } = req.body;

  const result = await getByShortened({ shortened });
  res.redirect(result.original);
});

router.get('/url/:id', async (req, res, next) => {
  const { id } = req.params;

  const result = await getById({ id });
  res.status(200).json(result)
});

module.exports = router;
