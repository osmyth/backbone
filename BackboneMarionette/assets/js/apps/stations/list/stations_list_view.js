TrainViewerApp.module("StationsApp.List", function (List, TrainViewerApp, Backbone, Marionette, $, _) {

    List.Layout = Marionette.LayoutView.extend({
        template: "#list-layout",
        regions: {
            stationsRegion: "#list-layout-region"
        }
    });

    List.StationItemView = Marionette.ItemView.extend({
        tagName: "option",
        template: "#station-list-item",
        onRender: function() {
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
        viewTrains: function(event){
            console.log($('.station-combo').val());
            code = $('.station-combo').val();
            TrainViewerApp.navigate("#view/"+code, {trigger: true});
        }
    });
});
