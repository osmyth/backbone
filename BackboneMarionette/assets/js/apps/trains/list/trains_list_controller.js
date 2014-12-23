TrainViewerApp.module("TrainsApp.List", function (List, TrainViewerApp, Backbone, Marionette, $, _) {
    List.Controller = {
        listTrains: function (code, direction) {

            // show loading view
            var loadingView = new TrainViewerApp.Common.Views.Loading();
            TrainViewerApp.trainsRegion.show(loadingView);

            var fetching = TrainViewerApp.request("train:entities", code, direction);
            var trainListLayout = new List.Layout();

            $.when(fetching).done(function (trains) {
                var trainCompView = new List.TrainCompView({
                    collection: trains
                });

                var directionFilterItemView = new List.DirectionFilterItemView({
                    model: null
                },{
                    direction:direction,
                    code:code
                }
                );

                trainListLayout.on("show", function () {
                    trainListLayout.directionFilterRegion.show(directionFilterItemView);
                    trainListLayout.trainsRegion.show(trainCompView);
                });

                TrainViewerApp.trainsRegion.show(trainListLayout);

            });
        }
    }
});
