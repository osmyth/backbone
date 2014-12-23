TrainViewerApp.module("TrainsApp.List", function (List, TrainViewerApp, Backbone, Marionette, $, _) {

    List.Layout = Marionette.LayoutView.extend({
        template: "#train-list-layout",

        regions: {
            directionFilterRegion: "#direction-filter-layout-region",
            trainsRegion: "#train-list-layout-region"
        }
    });

    List.DirectionFilterItemView = Marionette.ItemView.extend({
        tagName: "div",
        template: "#direction-filter-item",
        events: {
            'click #north-button': 'setDirectionHandler',
            'click #south-button': 'setDirectionHandler'
        },
        initialize: function (model, options) {
            this.code = options.code;
            this.direction = options.direction;
        },
        onRender: function () {
            if(this.direction=="north") {
                this.setDirection("north-button", false);
            }else if(this.direction=="south"){
                this.setDirection("south-button", false);
            }

        },
        setDirectionHandler: function(event) {
            var targetId = event.currentTarget.id;
            console.log(targetId);
            this.setDirection(targetId, true);
        },
        setDirection: function (id, trigger){
            if(id == "north-button"){

                this.$el.find("#north-button").addClass("active");
                this.$el.find("#south-button").removeClass("active");
                if(trigger) {
                    TrainViewerApp.trigger("trains:list", this.code, "north");
                }
            } else if (id == "south-button"){
                this.$el.find("#north-button").removeClass("active");
                this.$el.find("#south-button").addClass("active");
                if(trigger) {
                    TrainViewerApp.trigger("trains:list", this.code, "south");
                }
            }
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
