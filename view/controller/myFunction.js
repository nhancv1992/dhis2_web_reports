var facility = "Ff8x7tCAgRq";
function validateDashboard() {

    //orgUnit Related
    var orgUnitList = document.getElementById('dropdown');
    var tempOrgUnitUid = orgUnitList.options[orgUnitList.selectedIndex].value;

    // indicator related
    var tempIndicatorList = document.getElementById('indicator');
    var tempIndicatorUid = tempIndicatorList.options[tempIndicatorList.selectedIndex].value;

    // month related
    var tempMonthList = document.getElementById('ddlMonth');
    var tempMonthUid = tempMonthList.options[tempMonthList.selectedIndex].value;

    // year related
    var tempYearList = document.getElementById('year');
    var tempYearUid = tempYearList.options[tempYearList.selectedIndex].value;

    if (tempOrgUnitUid == "base" || tempOrgUnitUid == undefined) {
        alert("Please select OrganisationUnit");
        return;
    }

    //else if (tempIndicatorUid == "base" || tempIndicatorUid == undefined) {
    //    alert("Please select Indicator");
    //    return;
    //}

    else if (tempMonthUid == "Select Month" || tempMonthUid == undefined) {
        alert("Please select Month");
        return;
    }

    else if (tempYearUid == "Select Year" || tempYearUid == undefined) {
        alert("Please select Year");
        return;
    }

    myFunction(tempOrgUnitUid, tempMonthUid, tempYearUid);
}

function myFunction(tempOrgUnitUid, tempMonthUid, tempYearUid) {

    createChart1(tempOrgUnitUid, tempMonthUid, tempYearUid);
    createChart2(tempOrgUnitUid, tempMonthUid, tempYearUid);


}

function createChart1(tempOrgUnitUid, tempMonthUid, tempYearUid) {
    var count = tempMonthUid;
    $.getJSON("../../../model/localdb/chart1.json", function (json) {
        var datarows = json.rows;
        var peArr = json.metaData.pe;
        var facilityArr = json.metaData[facility];
        var dataResult = [];
        //sort
        for (var i = 0; i < peArr.length; i++) {
            var minPe = peArr[i];
            for (var k = 0; k < facilityArr.length; k++) {
                var minF = facilityArr[k];
                for (var j = 0; j < datarows.length; j++) {
                    if (datarows[j][0] == minF && datarows[j][1] == minPe) {
                        dataResult.push(datarows[j]);
                    }
                }
            }
        }
        var xAxisCategoriesArr = [];
        for (var i = 0; i < peArr.length; i++) {
            xAxisCategoriesArr.push(json.metaData.names[peArr[i]])
            if(xAxisCategoriesArr.length >=count ) break;
        }
        var dataSeriesArrO = [];

        for (var i = 0; i < facilityArr.length; i++) {
            var name = json.metaData.names[facilityArr[i]];
            var data = [];
            for (var j = 0; j < dataResult.length; j++) {
                if (dataResult[j][0] == facilityArr[i]) {
                    data.push(Number(dataResult[j][2]));
                    if(data.length >=count ) break;
                }
            }
            var seriO = {
                name: name,
                data: data
            }
            dataSeriesArrO.push(seriO);
        }
        createBarCharts("chart1", "chart1", "", xAxisCategoriesArr, dataSeriesArrO);
    });
}

function createChart2(tempOrgUnitUid, tempMonthUid, tempYearUid) {

    var count = tempMonthUid*3;
    $.getJSON("../../../model/localdb/chart2.json", function (json) {
        var datarows = json.rows;
        var peArr = json.metaData.pe;
        var facilityArr = json.metaData[facility];
        var dataResult = [];
        //sort
        for (var i = 0; i < peArr.length; i++) {
            var minPe = peArr[i];
            for (var k = 0; k < facilityArr.length; k++) {
                var minF = facilityArr[k];
                for (var j = 0; j < datarows.length; j++) {
                    if (datarows[j][0] == minF && datarows[j][1] == minPe) {
                        dataResult.push(datarows[j]);
                    }
                }
            }
        }
        var xAxisCategoriesArr = [];
        for (var i = 0; i < peArr.length; i++) {
            xAxisCategoriesArr.push(json.metaData.names[peArr[i]])
            if(xAxisCategoriesArr.length >=count ) break;
        }
        var dataSeriesArrO = [];

        for (var i = 0; i < facilityArr.length; i++) {
            var name = json.metaData.names[facilityArr[i]];
            var data = [];
            for (var j = 0; j < dataResult.length; j++) {
                if (dataResult[j][0] == facilityArr[i]) {
                    data.push(Number(dataResult[j][2]));
                    if(data.length >=count ) break;
                }
            }
            var seriO = {
                name: name,
                data: data
            }
            dataSeriesArrO.push(seriO);
        }
        createLineCharts("chart2", "char2", "", xAxisCategoriesArr, dataSeriesArrO);
    });
}

function createBarCharts(view, titleStr, subtitleStr, xAxisCategoriesArr, dataSeriesArrO) {
    $("#" + view).highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: titleStr
        },
        subtitle: {
            text: subtitleStr
        },
        xAxis: {
            categories: xAxisCategoriesArr,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: dataSeriesArrO
    });
}

function createLineCharts(view, titleStr, subtitleStr, xAxisCategoriesArr, dataSeriesArrO) {
    $("#" + view).highcharts({
        chart: {
            type: 'line'
        },
        title: {
            text: titleStr
        },
        subtitle: {
            text: subtitleStr
        },
        xAxis: {
            categories: xAxisCategoriesArr,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        series: dataSeriesArrO
    });
}
