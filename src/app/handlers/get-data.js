const { TABLE } = require("../../utils/constants");

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns {[Project]} data
 */
const getData = async function (req, res) {
  const db = req.app.get("db");

  try {
    console.info(`Request received: ${req.method} ${req.url}`);
    const {
      frontendFilter = "",
      backendFilter = "",
      titleFilter = ""
    } = req.query;

    console.info(
      `Query params: frontendFilter: ${frontendFilter}, backendFilter: ${backendFilter}, titleFilter: ${titleFilter}`
    );

    const data = await db
      .select()
      .from(TABLE)
      .whereRaw("LOWER(frontend) LIKE ?", [`%${frontendFilter.toLowerCase()}%`])
      .whereRaw("LOWER(backend) LIKE ?", [`%${backendFilter.toLowerCase()}%`])
      .whereRaw("LOWER(title) LIKE ?", [`%${titleFilter.toLowerCase()}%`]);

    console.info(`Data returned: ${data.length} rows`);
    return res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err || "Internal Server Error");
  }
};

module.exports = getData;
