const composeErrors = (res, message) => {
  // this function assumes that the errors are
  // mostly homogeneous
  res.status(400);
  return res.json({
    message,
    data: null,
    status: 'error'
  });
};

const getProperty = (object, key) => {
  // this function assumes that the
  // nesting is no more than two levels
  if (key.includes('.')) {
    const [first, second] = key.split('.');
    return object[first][second];
  }

  return object[key];
};

const validateValue = (value, condition, condition_value) => {
  switch (condition) {
    case 'eq':
      return value === condition_value;

    case 'neq':
      return value !== condition_value;

    case 'gt':
      return value > condition_value;

    case 'gte':
      return value >= condition_value;

    case 'contains':
      return value.includes(condition_value);

    default:
      break;
  }
};

const validateRule = (req, res) => {
  const { data, rule } = req.body;
  let { field, condition, condition_value } = rule;
  const value = getProperty(data, field);

  if (value === undefined) {
    return composeErrors(res, `field ${field} is missing from data.`);
  }

  const validation = validateValue(value, condition, condition_value);

  const resData = {
    validation: {
      field,
      condition,
      error: false,
      condition_value,
      field_value: value
    }
  };

  if (validation) {
    res.status(200);
    res.json({
      message: `field ${field} successfully validated.`,
      status: 'success',
      data: resData
    });
  } else {
    res.status(400);
    res.json({
      message: `field ${field} failed validation`,
      status: 'error',
      data: resData
    });
  }
};

module.exports = {
  validateRule,
  composeErrors
};
