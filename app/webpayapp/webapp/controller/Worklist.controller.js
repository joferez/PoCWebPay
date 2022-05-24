sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (BaseController, JSONModel, formatter, Filter, FilterOperator) {
    "use strict";

    return BaseController.extend("blueboot.uy.webpayapp.controller.Worklist", {

        formatter: formatter,

        /* =========================================================== */
        /* lifecycle methods                                           */
        /* =========================================================== */

        /**
         * Called when the worklist controller is instantiated.
         * @public
         */
        onInit : function () {
            const urlParams = new URLSearchParams(window.location.search);     
            var sToken = urlParams.get("token_ws")  ; 
            if(sToken){
                $.ajax({url: `/web-pay/PayCommit(token='${sToken}')`,
                type: 'get',
                contentType: 'application/json',
                dataType: 'json',
                success: function(oData) {
                 if(oData.status == "AUTHORIZED"){
                    sap.m.MessageBox.success("El pago fue autorizado");
                 }else{
                    sap.m.MessageBox.error("Hubo un problema al realizar el pago");
                 }
              },
              error: function(oError) {
                  console.log(oError)
              }
               }) ;

            }

        },
        onAfterRendering : function () {
   

            
         
            
        /*    
            ("/Pay",{ success: (oData) => { 
                oHTML.setContent(`<form action="${oData.results[0].urlForm}" method="POST">
                <input type="hidden" name="token_ws" value="${token}"/>
                <input type="submit" value="Pagar"/>
             </form>`)
    
             },
            error: (oError) =>{ console.log(oError) } });
    
         */

        },
        onGenerarLink : function(oEvent){

            let oHTML =   this.getView().byId("HTMLForm");
            let iMonto = this.getView().byId("Monto").getValue();
            let sReturn = window.location.href;
  
               
         $.ajax({url: "/web-pay/Pay",
                type: 'post',
                data: JSON.stringify({token:"prueba",urlForm:"",monto:parseInt(iMonto),returnUrl:sReturn}),
                contentType: 'application/json',
                dataType: 'json',
                success: function(oData) {
                  oHTML.setContent(`<form action="${oData.urlForm}" method="POST">
                  <input type="hidden" name="token_ws" value="${oData.token}"/>
                  <input type="submit" value="Pagar"/>
               </form>`)
              },
              error: function(oError) {
                  console.log(oError)
              }
               }) ;
        },

        /* =========================================================== */
        /* event handlers                                              */
        /* =========================================================== */

        /**
         * Triggered by the table's 'updateFinished' event: after new table
         * data is available, this handler method updates the table counter.
         * This should only happen if the update was successful, which is
         * why this handler is attached to 'updateFinished' and not to the
         * table's list binding's 'dataReceived' method.
         * @param {sap.ui.base.Event} oEvent the update finished event
         * @public
         */
     

        /**
         * Event handler when a table item gets pressed
         * @param {sap.ui.base.Event} oEvent the table selectionChange event
   

        /**
         * Event handler for navigating back.
         * Navigate back in the browser history
         * @public
         */
        onNavBack : function() {
            // eslint-disable-next-line sap-no-history-manipulation
            history.go(-1);
        },



        /**
         * Event handler for refresh event. Keeps filter, sort
         * and group settings and refreshes the list binding.
         * @public
         */
        onRefresh : function () {
            var oTable = this.byId("table");
            oTable.getBinding("items").refresh();
        },

        /* =========================================================== */
        /* internal methods                                            */
        /* =========================================================== */

        /**
         * Shows the selected item on the object page
         * @param {sap.m.ObjectListItem} oItem selected Item
         * @private
         */
  

        /**
         * Internal helper method to apply both filter and search state together on the list binding
         * @param {sap.ui.model.Filter[]} aTableSearchState An array of filters for the search
         * @private
         */
   
    });
});
