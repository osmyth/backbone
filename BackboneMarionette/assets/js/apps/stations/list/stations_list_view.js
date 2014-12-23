TrainViewerApp.module("StationsApp.List", function (List, TrainViewerApp, Backbone, Marionette, $, _) {

    List.Layout = Marionette.LayoutView.extend({
        template: "#station-list-layout",
        regions: {
            stationsRegion: "#station-list-layout-region"
        }
    });

    List.StationItemView = Marionette.ItemView.extend({
        tagName: "option",
        template: "#station-list-item",
        onRender: function () {
            this.$el.attr('value', this.model.get('code'));
        }
    });

    List.StationCompView = Marionette.CompositeView.extend({
        tagName: "select",
        className: "table table-hover station-combo",
        template: "#station-list",
        childView: List.StationItemView,
        events: {
            'change': 'viewTrains'
        },
        viewTrains: function () {
            var code = this.$el.val();
            console.log(code);
            var direction = "";
            if (TrainViewerApp.getCurrentRoute().indexOf("south")!=-1){
                direction = "south";
            } else {
                direction = "north";
            }

            TrainViewerApp.trigger("trains:list", code, direction);
        },
        setSelectedStation: function(code){
            this.$el.val(code);
            this.viewTrains();
        }
    });
});
