const { validateRule, composeErrors } = require('../utils/utils');

const fetch = (req, res) => {
  res.send({
    message: 'My Rule-Validation API',
    status: 'success',
    data: {
      name: 'Seun Adetunji',
      github: '@Oluwaseunus',
      email: 'oluwaseunus@gmail.com',
      mobile: '09058464964',
      twitter: '@seunisking'
    }
  });
};

const validate = (req, res) => {
  const { body } = req;
  const { rule, data } = body;

  if (typeof body !== 'object') {
    return composeErrors(res, 'Invalid JSON object passed');
  }

  if (!rule) {
    return composeErrors(res, 'rule is required.');
  } else if (!data) {
    return composeErrors(res, 'data is required.');
  } else if (typeof rule !== 'object') {
    return composeErrors(res, 'rule should be an object.');
  } else if (typeof data !== 'string' || typeof data !== 'object') {
    return composeErrors(
      res,
      'data should either be a string, an array or a valid JSON object'
    );
  } else validateRule(req, res);
};

module.exports = {
  fetch,
  validate
};
