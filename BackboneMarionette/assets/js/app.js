var TrainViewerApp = new Marionette.Application();

TrainViewerApp.addRegions({
    stationsRegion: "#stations-region",
    trainsRegion: "#trains-region"
});

TrainViewerApp.navigate = function (route, options) {
    options || (options = {});
    Backbone.history.navigate(route, options);
};

TrainViewerApp.getCurrentRoute = function () {
    return Backbone.history.fragment
};

TrainViewerApp.on("start", function () {

    if (Backbone.history) {
        Backbone.history.start();

        if (this.getCurrentRoute() === "") {
            TrainViewerApp.trigger("station:list");
        }
    }
});
