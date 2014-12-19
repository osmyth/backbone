TrainViewerApp.module("Entities", function (Entities, TrainViewerApp, Backbone, Marionette, $, _) {

    Entities.Station = Backbone.Model.extend({

        defaults: {
            id: "",
            name: "",
            code: "",
            lat: "",
            lon: ""
        }
    });

    Entities.Stations = Backbone.Collection.extend({
        model: Entities.Station,
        url: 'http://www.corsproxy.com/api.irishrail.ie/realtime/realtime.asmx/getAllStationsXML_WithStationType?StationType=D',
        fetch: function (options) {
            options = options || {};
            options.dataType = "xml";
            return Backbone.Collection.prototype.fetch.call(this, options);
        },
        parse: function (data) {
            var parsed = [];
            $(data).find('objStation').each(function (index) {
                parsed.push(new Entities.Station({
                    id: $(this).find('StationId').text(),
                    name: $(this).find('StationDesc').text(),
                    code: $(this).find('StationCode').text(),
                    lat: $(this).find('StationLatitude').text(),
                    lon: $(this).find('StationLongitude').text()
                }));
            });
            return parsed;
        }
    });

    var API = {
        getStations: function () {
            console.log("getStations...")
            var stations = new Entities.Stations();
            var defer = $.Deferred();
            stations.fetch({
                success: function (data) {
                    defer.resolve(data);
                }
            });
            return defer.promise();
        }
    };

    TrainViewerApp.reqres.setHandler("station:entities", function () {
        return API.getStations();
    });
});
