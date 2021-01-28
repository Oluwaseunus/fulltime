const router = require('express').Router();
const { fetch, validate } = require('../controllers/index');

router.get('', fetch);
router.post('validate-rule', validate);

module.exports = router;
