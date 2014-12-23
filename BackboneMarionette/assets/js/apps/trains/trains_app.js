TrainViewerApp.module("TrainsApp", function (TrainsApp, TrainViewerApp, Backbone, Marionette, $, _) {

    var API = {
        listTrains: function (code, direction) {
            console.log("listTrains: "+code);
            TrainsApp.List.Controller.listTrains(code, direction);
        }
    };

    TrainViewerApp.on("trains:list", function (code, direction) {
        TrainViewerApp.navigate("#view/"+code+"/"+direction);
        API.listTrains(code, direction);
    });
});
