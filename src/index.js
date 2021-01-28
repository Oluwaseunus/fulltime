const app = require('express')();
const PORT = process.env.PORT || 3000;
const routes = require('./routes/index');

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`App running on ${PORT}`);
});
