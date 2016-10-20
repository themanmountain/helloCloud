sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function(Controller, JSONModel, MessageToast) {
	"use strict";

	return Controller.extend("zcchelloworld.controller.Main", {
		
		onInit: function() {
			
			var oViewModel = new JSONModel({
				url: "/EnvironmentInfos",
				resultText: ""
			});
			
			this.getView().setModel(oViewModel, "helloWorld");
			
		},
		
		onGo: function() {
			var sURL = this.getView().getModel("helloWorld").getProperty("/url");
			this.getView().getModel().read(sURL, {
				success: function(oData, response) {
					this._onSuccess(oData, response);
				}.bind(this),
				error: function(oData,response) {
					MessageToast.show("Error Occurred", {
						duration: 20000
					});
				}
			});
		},
		
		_onSuccess: function(oData, response) {
			this.getView().getModel("helloWorld").setProperty("/resultText", JSON.stringify(oData.results[0],null,4));
		}
		
		
		

	});
});