TrainViewerApp.module("TrainsApp", function (TrainsApp, TrainViewerApp, Backbone, Marionette, $, _) {
    TrainsApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "view/:id": "listTrains"
        }
    });

    var API = {
        listTrains: function (code) {
            TrainsApp.List.Controller.listTrains(code);
        }
    };

    TrainViewerApp.addInitializer(function () {
        new TrainsApp.Router({
            controller: API
        });
    });
});
