TrainViewerApp.module("Entities", function (Entities, TrainViewerApp, Backbone, Marionette, $, _) {

    Entities.Train = Backbone.Model.extend({

        defaults: {
            duein: "",
            origin: "",
            destination: "",
            status: "",
            lastlocation: "",
            late: "",
            exparrival: "",
            direction: ""
        }
    });

    Entities.Trains = Backbone.Collection.extend({
        model: Entities.Train,
        initialize: function (models, options) {
            this.url = 'https://www.crossorigin.me/http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML?StationCode=' + options.code;
            this.direction = options.direction;
        },
        fetch: function (options) {
            options = options || {};
            options.dataType = "xml";

            return Backbone.Collection.prototype.fetch.call(this, options);
        },
        parse: function (data) {
            var parsed = [];
            var direction = this.direction;
            $(data).find('objStationData').each(function (index) {
                if ($(this).find('Direction').text().toLowerCase().indexOf(direction) !== -1) {
                    parsed.push(new Entities.Train({
                        duein: $(this).find('Duein').text(),
                        origin: $(this).find('Origin').text(),
                        destination: $(this).find('Destination').text(),
                        status: $(this).find('Status').text(),
                        lastlocation: $(this).find('Lastlocation').text(),
                        late: $(this).find('Late').text(),
                        exparrival: $(this).find('Exparrival').text(),
                        direction: $(this).find('Direction').text()
                    }));
                }
            });
            return parsed;
        }
    });

    var API = {
        listTrains: function (code, direction) {
            console.log("getTrains ("+code+" "+ direction+ ")...");
            var trains = new Entities.Trains(null, {code:code, direction:direction});
            var defer = $.Deferred();
            trains.fetch({
                success: function (data) {
                    console.log("success");
                    defer.resolve(data);
                }
            });
            return defer.promise();
        }
    };

    TrainViewerApp.reqres.setHandler("train:entities", function (code, direction) {
        return API.listTrains(code, direction);
    });
});
