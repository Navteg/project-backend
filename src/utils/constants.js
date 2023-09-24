const port = 8000;
const TABLE = "projects";

const DB_CONFIG = {
  client: "pg",
  connection: {
    host: "localhost", // use your local ip address here
    user: "postgres", // use your username here
    password: "password", // use your password here
    database: "knex-test" // use your database name here
  }
};

module.exports = {
  port,
  TABLE,
  DB_CONFIG
};
