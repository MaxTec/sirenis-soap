const Formatter = require("./formatter");
const Parser = require("./parser");
const Axios = require("axios");

const url = `http://www.dneonline.com/calculator.asmx`;

module.exports = class Remote {
  static async multipleTwoOperands(operandA, operandB) {
    try {
      let payload = {
        Multiply: {
          intA: operandA,
          intB: operandB,
        },
      };

      const headers = {
        headers: {
          "Content-Type": "text/xml; charset=utf-8",
          SOAPAction: "http://tempuri.org/Multiply",
        },
      };

      let args = Formatter.convertJsonToSoapRequest(payload);
      let remoteResponse = await Axios.post(url, args, headers);
      remoteResponse = await Parser.convertXMLToJSON(remoteResponse);

      console.log(remoteResponse);
    } catch (err) {
        console.log(err);
    //   throw new Error(
    //     `Oops something went wrong. Please try again later ${JSON.stringify(
    //       err
    //     )}`
    //   );
    }
  }
};
