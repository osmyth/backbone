$(document).ready(function() {

    var BASE_URL = 'https://www.crossorigin.me/http://api.irishrail.ie/realtime/realtime.asmx/';
    var ALL_STATIONS = 'getAllStationsXML_WithStationType?StationType=D';
    var TRAINS = 'getStationDataByCodeXML?StationCode=';


    $('.station-list').change(function(event){
        var station = event.target.value;
        $.ajax({
        url: BASE_URL + TRAINS + station,
        beforeSend: function() {
            $('.trains-list').empty().append("Loading...");
        },
        success : function(xml) {
            $('.train-list').css('display', 'inherit');
            $('.train-list table').empty();
            
            $('.train-list table').append('<thead><tr>'+
            '<td>Due</td>'+
            '<td>Origin</td>'+
            '<td>Destination</td>'+
            '<td>Status</td>'+
            '<td>Lastlocation</td>'+
            '<td>Late</td>'+
            '<td>Exparrival</td>'+
            '<td>Direction</td>'+
            '</tr></thead>');


            $(xml).find('objStationData').each(function (index) {
                $('.train-list table').append('<tr>'+
                        '<td>'+$(this).find('Duein').text()+'</td>'+
                        '<td>'+$(this).find('Origin').text()+'</td>'+
                        '<td>'+$(this).find('Destination').text()+'</td>'+
                        '<td>'+$(this).find('Status').text()+'</td>'+
                        '<td>'+$(this).find('Lastlocation').text()+'</td>'+
                        '<td>'+$(this).find('Late').text()+'</td>'+
                        '<td>'+$(this).find('Exparrival').text()+'</td>'+
                        '<td>'+$(this).find('Direction').text()+'</td>'+
                        '</tr>');
                });
        },
        error: function(error){
            console.log(error);
        }
    });
    })

    var getTrainRowHTML = function(value, name) {
        return '<option value="'+value+'">'+name+'</option>';
    };

    var getStationOptionHTML = function(value, name) {
        return '<option value="'+value+'">'+name+'</option>';
    };

    $.ajax({
        url: BASE_URL + ALL_STATIONS,
        beforeSend: function() {
            $('.station-list').empty().append(getStationOptionHTML("loading", "Loading..."));
        },
        success : function(xml) {
            var stations = $(xml).find('objStation');
            var $stationList = $('.station-list').empty();
            
            $stationList.append(getStationOptionHTML('', "Select Station"));

            $(stations).each(function(index, station) {
                var stationCode = $(station).find('StationCode').text();
                var stationName = $(station).find('StationDesc').text();
                $stationList.append(getStationOptionHTML(stationCode, stationName));
            })
        },
        error: function(error){
            console.log(error);
        }
    });
});