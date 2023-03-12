const sql = require("mssql");
const { Server } = require("socket.io");
import sqlConfig from "../../config/db";

const SocketHandler = async (req, res) => {
  console.log("SocketHandler");
  await sql.connect(sqlConfig);
  if (res.socket.server.io) {
    console.log("Socket is already running");
    console.log("clients connected", res.socket.server.io.engine.clientsCount);
  } else {
    console.log("Socket is initializing");
    var io = new Server(res.socket.server);
    // Inicializamos el socket y le pasamos el server
    res.socket.server.io = io;
    io.sockets.on("connection", function (socket) {
      // const interval = setInterval(async function () {
      //   const result =
      //     await sql.query`select Id, TerminalIP, Enable, Account from [Demo Database NAV (11-0)].[dbo].[CRONUS Mexico S_A_$Token] where Id = ${process.env.TOKEN_USER}`;
      //   if (result) {
      //     console.log(result.recordsets);
      //     clearInterval(interval);
      //     socket.emit("new_message", result.recordset[0]);
      //   }
      // }, 5000);
      socket.on("disconnect", (reason) => {
        console.log(`disconnect Id: ${socket.id}`, reason);
      });
    });
  }
  res.end();
};

export default SocketHandler;
