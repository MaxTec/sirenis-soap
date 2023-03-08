const soapRequest = require("easy-soap-request");
var parseString = require("xml2js").parseString;
import axios from "axios";
export default async function handler(req, res) {
  try {
    let xmls = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tok="urn:microsoft-dynamics-schemas/page/tokenid">
    <soapenv:Header/>
    <soapenv:Body>
       <tok:Update>
          <tok:TokenID>
             <tok:ImageBT>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</tok:ImageBT>
          </tok:TokenID>
       </tok:Update>
    </soapenv:Body>
 </soapenv:Envelope>`;
    const response = await axios.get(
      "http://nexpayne.ddns.net:7447/DynamicsNAV110User/WS/CRONUS%20Mexico%20S.A./Page/TokenID",
      //   { xml:xmls },
      {
        xml: xmls,
        headers: { "Content-Type": "text/xml" },
        auth: {
          username: "NEXPAYNE",
          password: "Isair_01",
        },
      }
    );
    // res.status(200).json({ res: response.data });
    parseString(response.data, function (err, result) {
      console.dir(result);
      res.status(200).json({ res: result });
    });
  } catch (err) {
    // console.log(err);
    res.status(500).json({ error: err });
  }
  // usage of module
  //   (async () => {
  //     try {
  //       const { response } = await soapRequest({
  //         method: "GET",
  //         url: url,
  //         headers: sampleHeaders,
  //         xml: xml,
  //         timeout: 1000,
  //         auth,
  //         wsdl_headers: { Authorization: auth },
  //       }); // Optional timeout parameter(milliseconds)
  //       const { headers, body, statusCode } = response;
  //       console.log(headers);
  //       console.log(body);
  //       console.log(statusCode);
  //       res.status(200).json({ res: body });
  //     } catch (error) {
  //       console.log(error);
  //       res.status(500).json({ error: error });
  //     }
  //   })();
}
