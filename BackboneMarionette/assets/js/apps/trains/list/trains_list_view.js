TrainViewerApp.module("TrainsApp.List", function (List, TrainViewerApp, Backbone, Marionette, $, _) {

    List.Layout = Marionette.LayoutView.extend({
        template: "#list-layout",

        regions: {
            stationsRegion: "#list-layout-region"
        }
    });

    List.TrainItemView = Marionette.ItemView.extend({
        tagName: "tr",
        template: "#train-list-item"
    });

    List.TrainCompView = Marionette.CompositeView.extend({
        tagName: "table",
        className: "table table-hover",
        template: "#train-list",
        childView: List.TrainItemView,
        childViewContainer: "tbody"
    });
});
