const WebpayPlus = require("transbank-sdk").WebpayPlus;
//const asyncHandler = require("../utils/async_handler");
module.exports = (webPay)=>{
    webPay.on ('CREATE', 'Pay', async  (req) => {

      let buyOrder = "O-" + Math.floor(Math.random() * 10000) + 1;
      let sessionId = "S-" + Math.floor(Math.random() * 10000) + 1;
      let amount =  parseInt(req.data.monto);
   // let amount =  100;
      let returnUrl = req.data.returnUrl;
     
      console.log({ mensaje:"Hola" });
    //    request.protocol + "://" + request.get("host") + "/webpay_plus/commit";
    
        const createResponse = await (new WebpayPlus.Transaction()).create(
          buyOrder, 
          sessionId, 

          amount, 
          returnUrl
        );
    
      let token = createResponse.token;
      let url = createResponse.url;
   
      return { token:token,urlForm:url,monto:req.data.monto  };


    })
    webPay.on ('READ', 'PayCommit', async  (req) => { 
      const commitResponse = await (new WebpayPlus.Transaction()).commit(req.data.token);


    let oResponse = {token:req.data.token,status:commitResponse.status};
    return oResponse;

    })
}