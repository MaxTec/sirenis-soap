const sql = require("mssql");
var config = require("../config/db");

// hace una conexion en cada llamada...
async function checkPool() {
  try {
    let pool = await sql.connect(config);
    let poolTable = await pool
      .request()
      .query(`select Id, TerminalIP, Enable, Account from [Demo Database NAV (11-0)].[dbo].[CRONUS Mexico S_A_$Token] where Id = ${process.env.TOKEN_USER}`);
    return poolTable.recordsets;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  checkPool: checkPool,
};
