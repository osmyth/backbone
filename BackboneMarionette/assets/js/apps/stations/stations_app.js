TrainViewerApp.module("StationsApp", function (StationsApp, TrainViewerApp, Backbone, Marionette, $, _) {
    StationsApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "": "listStations",
            "view/:code/:direction": "listTrains"
        }
    });

    var API = {
        listStations: function () {
            console.log("listStations");
            StationsApp.List.Controller.listStations();
        },
        listTrains: function (code) {
            console.log("listStations and trains for: "+ code);
            StationsApp.List.Controller.listStations(code);
        }
    };

    TrainViewerApp.on("stations:list", function () {
        TrainViewerApp.navigate("home");
        API.listStations();
    });

    TrainViewerApp.addInitializer(function () {
        new StationsApp.Router({
            controller: API
        });
    });
});
