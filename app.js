$(document).ready(function() {

    var BASE_URL = 'https://www.crossorigin.me/http://api.irishrail.ie/realtime/realtime.asmx/';
    var ALL_STATIONS = 'getAllStationsXML_WithStationType?StationType=D';

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