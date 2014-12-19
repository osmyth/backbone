TrainViewerApp.module("TrainsApp.List", function (List, TrainViewerApp, Backbone, Marionette, $, _) {
    List.Controller = {
        listTrains: function (code) {
            var fetching = TrainViewerApp.request("train:entities", code);
            var trainListLayout = new List.Layout();

            $.when(fetching).done(function (trains) {
                var trainCompView = new List.TrainCompView({
                    collection: trains
                });

                trainListLayout.on("show", function () {
                    trainListLayout.stationsRegion.show(trainCompView);
                });
                console.log("show - trainListLayout");
                TrainViewerApp.trainsRegion.show(trainListLayout);

            });
        }
    }
});
