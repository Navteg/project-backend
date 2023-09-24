const data = require("../../data/data.json");
const { TABLE } = require("../../utils/constants.js");

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns {String} message
 */
const PopulateData = function (req, res) {
  const db = req.app.get("db");

  /**
   * Check if table exists
   * If not, create table
   * Insert data into table
   */
  db.schema.hasTable(TABLE).then(function (exists) {
    if (!exists) {
      db.schema
        .createTable(TABLE, function (table) {
          table.increments("id").primary();
          table.string("title");
          table.text("description");
          table.string("frontend");
          table.string("backend");
          table.string("database");
          table.string("infrastructure");
        })
        .then(function () {
          const records = data.map((record) => ({
            title: record?.title,
            description: record?.description,
            frontend: record?.frontend,
            backend: record?.backend,
            database: record?.database,
            infrastructure: record?.infrastructure
          }));
          db(TABLE)
            .insert(records)
            .then(() => {
              res.send("Table created and data inserted");
            });
        });
    } else {
      res.send("Table exists");
    }
  });
};

module.exports = PopulateData;
