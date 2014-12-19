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
            this.url = 'http://www.corsproxy.com/api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML?StationCode=' + options.code;
        },
        fetch: function (options) {
            options = options || {};
            options.dataType = "xml";

            return Backbone.Collection.prototype.fetch.call(this, options);
        },
        parse: function (data) {
            var parsed = [];
            $(data).find('objStationData').each(function (index) {
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
            });
            return parsed;
        }
    });

    var API = {
        listTrains: function (code) {
            console.log("getTrains ("+code+")...");
            var trains = new Entities.Trains(null, {code:code});
            var defer = $.Deferred();
            trains.fetch({
                success: function (data) {
                    defer.resolve(data);
                }
            });
            return defer.promise();
        }
    };

    TrainViewerApp.reqres.setHandler("train:entities", function (code) {
        return API.listTrains(code);
    });
});
