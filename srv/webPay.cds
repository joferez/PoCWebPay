    service webPay {
     entity Pay {
    key token : String;
    urlForm : String;
    monto: Integer;
    returnUrl:String;

  }
entity PayCommit {
 key token : String;
 status: String;

}

}