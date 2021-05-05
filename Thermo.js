
console.log("Accessing Server")

var volt;
var time;

var iLoveCanada;
var CoolestCat;

function getData(){
    fetch('http://192.168.1.202:31415/get_result')
       .then(response => response.json())  
       .then(json_temp => [volt = json_temp.voltage, time = json_temp.time])
}

getData();

function AutoRefresh(t){
    setTimeout("location.reload(true);", t)
}

function waitForElement(){
    if(typeof volt !== "undefined"){
        console.log(volt);
        console.log(time);
        monitors();
    }
    else{
        setTimeout(waitForElement, 250);
        console.log(volt);
    }
}

/* Below is the code for the setup screen*/
var initialnumbermonitor = 0;
var maxnumbermonitor = 4;


function DuplicateMonitors() {
    initialnumbermonitor = initialnumbermonitor + 1;
    if (initialnumbermonitor < maxnumbermonitor) {
        var monitordata = document.querySelectorAll('.monitorRepeates');
        var monitorclone = monitordata[0].cloneNode(true);
        monitorclone.id = (initialnumbermonitor + 1); // give a unique id
        monitordata[monitordata.length - 1].after(monitorclone);
    }    
}

function SaveAllUserInput() {
    // find all the monitors by class
    var numOfMonitors = document.querySelectorAll('.monitorRepeates');
    var saveTitle = document.querySelector("#ExperimentTitle").value;
    // create an array for saving the data to the local storage
    var saveData = [];
    
    // find each individual monitor data and store it as an object
    for (let i = 0; i <  numOfMonitors.length; i++){
        var newMonitorDataObject = GetData(numOfMonitors[i]);
        saveData.push(newMonitorDataObject);
    }
    // prints out the save data
    console.log(saveData);
    SaveAllDataToLocalStorage(saveData, saveTitle);
}

// this method grabs all the data for each individual monitor 
function GetData(monitorData){
     var newMonitorData = {
        id: monitorData.id, // unique id 
        name:  monitorData.childNodes[1].value, // the selected monitorname
        monitorsize: monitorData.childNodes[6].value, // the selected monitorsize
        minAlarmThreshold:  monitorData.childNodes[12].value, // the selected min alarm 
        maxAlarmThreshold: monitorData.childNodes[18].value, // the selected max alarm 
    };
    return newMonitorData;
}

// this method saves the data to local storage 
// so it get pulled into the Thermo.html to dynamically set the monitor inputs
function SaveAllDataToLocalStorage(saveData, saveTitle){
    localStorage.setItem('saveCristinasMonitorData', JSON.stringify(saveData)); 
    localStorage.setItem('saveCristinasMonitorExperimentTitle', JSON.stringify(saveTitle)); 
}
/* End of code for the setup_screen */

// This method pulls the monitor data from local storage to be used in thermo html
// * note this values need to be uniquely named to avoid being overwritten by other programs using local storage
function PullMonitorDataFromLocalStorage(){
    // Then to retrieve it from the store and convert to an object again
    var saveCristinasMonitorData = JSON.parse(localStorage.getItem('saveCristinasMonitorData'));
    return saveCristinasMonitorData;
}
// This method pulls the title from local storage to be used in thermo html
function PullExperimentTitleFromLocalStorage(){
    var saveCristinasMonitorExperimentTitle = JSON.parse(localStorage.getItem('saveCristinasMonitorExperimentTitle'));
    return saveCristinasMonitorExperimentTitle;
}

// This method sets the page with all of the input 
function SetDataOnPage(){
    // set title on page
    document.querySelector("h1").innerHTML = PullExperimentTitleFromLocalStorage();

    // set data for monitor
    var multMonitorsData = PullMonitorDataFromLocalStorage();
    for(let j = 0; j < multMonitorsData.length; j++){
        // create a graph using the properties?
        // set the title for each graph
        var chartTitle = document.querySelector(".chart" + (j + 1 ) + " h2"); // ex. ".chart1 h2"
        chartTitle.innerText = multMonitorsData[j].name;
        // var monitorsize = multMonitorsData[j].monitorsize; // how does the size affect the graphs and their points?
        // var minAlarmThreshold = multMonitorsData[j].minAlarmThreshold; // set the min alarm threshold here and later pull that info in another method that will is constantly updated?
        // var maxAlarmThreshold = multMonitorsData[j].maxAlarmThreshold; // set the min alarm threshold here and later pull that info in another method that will is constantly updated?
        
    }
}



function deselect(e) {
  $('.pop').slideFadeToggle(function() {
    e.removeClass('selected');
  });    
}

$(function() {
  $('#contact').on('click', function() {
    if($(this).hasClass('selected')) {
      deselect($(this));               
    } else {
      $(this).addClass('selected');
      $('.pop').slideFadeToggle();
    }
    return false;
  });

  $('.close').on('click', function() {
    deselect($('#contact'));
    return false;
  });
});

$.fn.slideFadeToggle = function(easing, callback) {
  return this.animate({ opacity: 'toggle', height: 'toggle' }, 'fast', easing, callback);
};


/* Below is the code for the monitors*/
function monitors() {
    var chart_h = 40; /* Need to change dynamically with monitor settings*/
    var chart_w = 80; /* Need to change dynamically with monitor settings*/
    var stepX = 82 / 14; /* Need to change dynamically with monitor settings*/

    volt = volt.map(function(element) {
        return 1.5*((element*100)-50);
    });


    /*Data Import - Need to change to real data aquisition eventually */
    
    var chart_1_y = [
      30, 30, 35, 30, 30, 30, 80.0, 10, 30, 30, 35, 40, 35, 30, 30
    ];

    /* Temp chart: focus here*/
    var chart_2_y = volt;

    var chart_3_y = [
      44, 44, 42, 42, 43, 43, 42, 42, 41, 43, 43, 43, 43
    ];

    var chart_4_y = [
      60, 58, 55, 62, 55, 65, 60, 60, 58, 65, 60, 60, 55
    ];
    /* Data Import - Need to change to real data aquisition eventually */

    // Draw graphs
   //drawLineGraph('#chart-1', chart_1_y, '#graph-1-container', 1);
    //drawLineGraph('#chart-2', chart_2_y, '#graph-2-container', 2);
    //drawLineGraph('#chart-3', chart_3_y, '#graph-3-container', 3);
    //drawLineGraph('#chart-4', chart_4_y, '#graph-4-container', 4);

    var dps = [];
    var chart = new CanvasJS.Chart("chart-1", {
        data: [{
            type:"line",
            dataPoints: dps
        }]
    });

    var updateInterval = 100;
    var dataLength = 10;
    var time_start = time[0];
   
    var updateChart = function (count){
        getData();
        count = time.length;

        for(var ind = 0; ind < count; ind++){
        current_time = time[ind] - time_start
       
            dps.push({
                x:  current_time,
                y: volt[ind]
            });

        }

        chart.render();
        dps = [];
    }

    updateChart(dataLength);
    setInterval(function(){updateChart()}, updateInterval);

    /* Display value on monitors */
    var disp_HR = chart_1_y[chart_1_y.length - 1];
    var disp_Temp = chart_2_y[chart_2_y.length - 1];
    var disp_O2 = chart_3_y[chart_3_y.length - 1];
    var disp_RR = chart_4_y[chart_4_y.length - 1];
    /* Display values on monitors */

    function point(x, y) {
        x: 0;
        y: 0;
    }



    /* DRAW GRID */
    function drawGrid(graphToSet) {
        var graph = Snap(graphToSet);
        var g = graph.g();
        g.attr('id', 'grid');
        for (i = 0; i <= stepX + 2; i++) {
            var horizontalLine = graph.path(
                "M" + 0 + "," + stepX * i + " " +
                "L" + 77 + "," + stepX * i);
            horizontalLine.attr('class', 'horizontal');
            g.add(horizontalLine);
        };
        for (i = 0; i <= 14; i++) {
            var verticalLine = graph.path(
                "M" + stepX * i + "," + 38.7 + " " +
                "L" + stepX * i + "," + 0)
            verticalLine.attr('class', 'vertical');
            g.add(verticalLine);
        };
    }


    function drawLineGraph(graph, points, container, id) {
        drawGrid("#chart-" + id);
        var graph = Snap(graph);

        /* PARSE POINTS */
        var myPoints = [];
        var shadowPoints = [];

        function parseData(points) {
            for (i = 0; i < points.length; i++) {
                var p = new point();
                var pv = points[i] / 100 * 40;
                p.x = 83.7 / points.length * i + 1;
                p.y = 30 - pv;
                if (p.x > 78) {
                    p.x = 78;
                }
                myPoints.push(p);
            }
        }

        var segments = [];

        function createSegments(p_array) {
            for (i = 0; i < p_array.length; i++) {
                var seg = "L" + p_array[i].x + "," + p_array[i].y;
                if (i === 0) {
                    seg = "M" + p_array[i].x + "," + p_array[i].y;
                }
                segments.push(seg);
            }
        }

        function joinLine(segments_array, id) {
            var line = segments_array.join(" ");
            var line = graph.path(line);
            line.attr('id', 'graph-' + id);
            var lineLength = line.getTotalLength();

            line.attr({
                'stroke-dasharray': lineLength,
                    'stroke-dashoffset': lineLength
            });
        }

        function ValueDelay(graph) {
            var cVal = $(graph).find('.current-value');
             /* Delay before vital values are displayed*/ 
            setTimeout(function () {
                cVal.addClass('visible');
            }, 0);
            /* Delay before vital values are displayed*/    
        }

        var initValue = points[0];
        var endValue = points[points.length - 1];
        var sum = endValue - initValue;
        var stepCount = 1300 / sum;

        function count(graph, sum) {
            var prefix;
            var totalGain = $(graph).find('.total-gain');
            var i = 0;
            var time = 1300;
            var intervalTime = Math.abs(time / sum);
            var timerID = 0;
            if (sum > 0) {
                var timerID = setInterval(function () { 
                    i++;
                    if (i === sum) clearInterval(timerID);
                }, intervalTime);
                } else if (sum < 0) {
                    var timerID = setInterval(function () {
                        i--;
                        if (i === sum) clearInterval(timerID);
                    }, intervalTime);
            }
        }
        count(graph, sum);

        function drawPolygon(segments, id) {
            var lastel = segments[segments.length - 1];
            var polySeg = segments.slice();
            polySeg.push([78, 38.4], [1, 38.4]);
            var polyLine = polySeg.join(' ').toString();
            var replacedString = polyLine.replace(/L/g, '').replace(/M/g, "");

            var poly = graph.polygon(replacedString);
            var clip = graph.rect(-80, 0, 80, 40);
            poly.attr({
                'id': 'poly-' + id,
                /*'clipPath':'url(#clip)'*/
                    'clipPath': clip
            });
            clip.animate({
                transform: 't80,0'
            }, 1300, mina.linear);
        }

        parseData(points);
        createSegments(myPoints);
        ValueDelay(container);
        joinLine(segments,id);
        drawPolygon(segments, id);
    }

    /* Alarm threshol definition - Should use user input */
    var max_Temp = 37.5;
    var min_Temp = 35.8;
    var max_HR = 450;
    var min_HR= 300;
    var max_O2 = 98;
    var min_02 = 97;
    var max_RR = 65;
    var min_RR = 55;
    /* Alarm threshol definition*/
// HER: Old Method, Remove if the method below works with your data
//    function alarm(points) {
//        for (i = 0; i < points.length; i++) {
//            var d = chart_2_y[i];
//            if (min_Temp < d < max_Temp) {   
//                
//            } 
//            else {
//                console.log(10);
//                document.chart2.style.backgroundColor = 'red';
//                //document.querySelector(".chart2").style.backgroundColor = 'red';
//
//            }
//        }
//    }
//      alarm(chart_2_y);  
    
    // HER: Updated Method
    // This method takes in points, chartClass, minAlarm, maxAlarmTemp 
    // To alert the user when there's an out of range data point
    function alarm(points, chartName, minAlarmTemp, maxAlarmTemp){
        // grab the chart 2 from the page
        var chart2 = document.querySelector(chartName);
        
        for (let k = 0; k < points.length; k++) {
            var d = chart_2_y[k];
            
            // if d is less than the min temp 
            // or d is greater than the max temp 
            // change the background color of the chart to alert user...
            if (d < minAlarmTemp || d > maxAlarmTemp) {   
                chart2.classList.add("alarm_style");
            } 
            //... else return the chart color back to its original color value
            else {
                chart2.classList.remove("alarm_style");

            }
        }
    }
    
    alarm(chart_2_y, ".chart2", min_Temp, max_Temp);  

}

document.addEventListener("DOMContentLoaded", function(){
    waitForElement();
    SetDataOnPage(); // HER: Remove this if you want to add it to the monitors function
});