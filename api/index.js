app = require("./app");
const { PORT } = require("./src/config/index");

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})