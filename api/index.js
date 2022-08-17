serverHttp = require("./app");
const { PORT } = require("./src/config/index");

serverHttp.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})