TrainViewerApp.module("StationsApp.List", function (List, TrainViewerApp, Backbone, Marionette, $, _) {
    List.Controller = {
        listStations: function (code) {
            var fetching = TrainViewerApp.request("station:entities");
            var stationListLayout = new List.Layout();

            $.when(fetching).done(function (stations) {
                var stationCompView = new List.StationCompView({
                    collection: stations
                });

                stationListLayout.on("show", function () {
                    stationListLayout.stationsRegion.show(stationCompView);
                });

                if(code) {
                    stationCompView.on("show", function(){
                        stationCompView.setSelectedStation(code);
                    });
                }
                TrainViewerApp.stationsRegion.show(stationListLayout);
            });
        }
    }
});
