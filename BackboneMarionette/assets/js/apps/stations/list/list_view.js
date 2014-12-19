TrainViewerApp.module("StationsApp.List", function (List, TrainViewerApp, Backbone, Marionette, $, _) {

    List.Layout = Marionette.LayoutView.extend({
        template: "#list-layout",

        regions: {
            stationsRegion: "#list-layout-region"
        }
    });

    List.StationItemView = Marionette.ItemView.extend({
        tagName: "tr",
        template: "#station-list-item"
    });

    List.StationCompView = Marionette.CompositeView.extend({
        tagName: "table",
        className: "table table-hover",
        template: "#station-list",
        childView: List.StationItemView,
        childViewContainer: "tbody"
    });
});
