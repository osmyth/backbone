TrainViewerApp.module("StationsApp", function (StationsApp, TrainViewerApp, Backbone, Marionette, $, _) {
    StationsApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "": "listStations",
            "view/:id": "listTrains"
        }
    });

    var API = {
        listStations: function () {
        console.log("listStations");
            StationsApp.List.Controller.listStations();
        }
    };

    TrainViewerApp.addInitializer(function () {
        new StationsApp.Router({
            controller: API
        });
    });
});
