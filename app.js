var APP = {

    BASE_URL: 'https://www.crossorigin.me/http://api.irishrail.ie/realtime/realtime.asmx/',
    STATIONS_URL: 'getAllStationsXML_WithStationType?StationType=D',
    TRAINS_URL: 'getStationDataByCodeXML?StationCode=',

    stations: [],

    init: function () {
        var that = this;
        $('.station-list').change(function (event) {
            $('.train-list').css('display', 'none');
            $('.train-list table').empty();

            var station = event.target.value;
            that.getTrainsForStation(station);
        });
        this.getAllStations();
    },

    getAllStations: function () {
        var that = this;
        $.ajax({
            url: this.BASE_URL + this.STATIONS_URL,
            beforeSend: function () {
                $('.station-list').empty().append(that.getStationOptionHTML("loading", "Loading..."));
            },
            success: function (xml) {
                var stations = $(xml).find('objStation');
                $(stations).each(function (index, stationXML) {
                    var station = {
                        code: $(stationXML).find('StationCode').text(),
                        name: $(stationXML).find('StationDesc').text(),
                        latitude: Number($(stationXML).find('StationLatitude').text()),
                        longitude: Number($(stationXML).find('StationLongitude').text())
                    };
                    that.stations.push(station);
                });
                //that.initGeo();
                that.updateStationList();
            },
            error: function (error) {
                console.log(error);
            }
        });
    },

    updateStationList: function () {
        var $stationList = $('.station-list').empty();
        this.stations.forEach(function (station) {
            $stationList.append(this.getStationOptionHTML(station.code, station.name));
        }, this);
        $stationList.trigger('change');
    },

    getTrainsForStation: function (station) {
        var that = this;
        $.ajax({
            url: that.BASE_URL + that.TRAINS_URL + station,
            beforeSend: function () {
                $('.trains-list').empty().append("Loading...");
            },
            success: function (xml) {
                $('.train-list').css('display', 'inherit');
                $('.train-list table').empty();

                $('.train-list table').append('<thead><tr>' +
                    '<td>Due</td>' +
//                 '<td>Origin</td>'+
                    '<td>Destination</td>' +
//                 '<td>Status</td>'+
//                 '<td>Lastlocation</td>'+
                    '<td>Late</td>' +
                    '<td>Exparrival</td>' +
                    '<td>Direction</td>' +
                    '</tr></thead>');

                $(xml).find('objStationData').each(function () {
                    $('.train-list table').append('<tr>' +
                        '<td>' + $(this).find('Duein').text() + '</td>' +
//                             '<td>'+$(this).find('Origin').text()+'</td>'+
                        '<td>' + $(this).find('Destination').text() + '</td>' +
//                             '<td>'+$(this).find('Status').text()+'</td>'+
//                             '<td>'+$(this).find('Lastlocation').text()+'</td>'+
                        '<td>' + $(this).find('Late').text() + '</td>' +
                        '<td>' + $(this).find('Exparrival').text() + '</td>' +
                        '<td>' + $(this).find('Direction').text() + '</td>' +
                        '</tr>');
                });
            },
            error: function (error) {
                console.log(error);
            }
        });
    },

    initGeo: function () {
        var that = this;
        navigator.geolocation.getCurrentPosition(
            function (position) {
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;

                that.updateStationList();

                var station = that.selectNearestStation(latitude, longitude);
                var $stationList = $('.station-list');

                $stationList.val(station.code);
                $stationList.trigger('change');
            },
            function error(error) {
                console.log("Unable to retrieve your location: " + error);
            });
    },

    selectNearestStation: function (latitude, longitude) {
        var nearestDistance = null;
        var nearestStation = null;
        this.stations.forEach(function (station) {
            var distance = this.getDistance(latitude, longitude,
                station.latitude, station.longitude);
            if (!nearestDistance || distance < nearestDistance) {
                nearestDistance = distance;
                nearestStation = station;
            }
        }, this);
        return nearestStation;
    },

    getDistance: function (x1, y1, x2, y2) {
        var xDiff = x1 - x2;
        var yDiff = y1 - y2;
        return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
    },

    getStationOptionHTML: function (value, name) {
        return '<option value="' + value + '">' + name + '</option>';
    }
};

$(document).ready(function () {
    APP.init();

    var bar1  = new ProgressBar.Circle('#prog1', {
        strokeWidth: 6,
        easing: 'easeInOut',
        duration: 600,
        color: 'green',
        trailColor: '#eee',
        trailWidth: 1,
        svgStyle: null
    });

    bar1.animate(0.4);  // Number from 0.0 to 1.0

    var bar2  = new ProgressBar.Circle('#prog2', {
        strokeWidth: 6,
        easing: 'easeInOut',
        duration: 600,
        color: 'red',
        trailColor: '#eee',
        trailWidth: 1,
        svgStyle: null
    });

    bar2.animate(0.04);  // Number from 0.0 to 1.0
});