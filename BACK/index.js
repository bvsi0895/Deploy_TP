require("dotenv").config();

const port = process.env.PORT || 3001;

const server = require("./src/server.js");
const { sequelize } = require("./src/DB_connection.js");

sequelize
  .sync({ alter: true })
  .then(() => {
    server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
