TrainViewerApp.module("StationsApp", function (StationsApp, TrainViewerApp, Backbone, Marionette, $, _) {
    StationsApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "": "listStations",
            "stations": "listStations"
        }
    });

    var API = {
        listStations: function () {
            StationsApp.List.Controller.listStations();
        }
    };

    TrainViewerApp.addInitializer(function () {
        new StationsApp.Router({
            controller: API
        });
    });
});
