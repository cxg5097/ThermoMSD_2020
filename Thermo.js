
var chart_h = 40; /* Need to change dynamically with monitor settings*/
var chart_w = 80; /* Need to change dynamically with monitor settings*/
var stepX = 82 / 14; /* Need to change dynamically with monitor settings*/

/*Data Import - Need to change to real data aquisition eventually */
var chart_1_y = [
  30, 30, 35, 30, 30, 30, 80.0, 10, 30, 30, 35, 40, 35, 30, 30
];
var chart_2_y = [
  49, 49, 49, 42, 49, 42, 42, 42, 42, 38, 35, 34, 34, 34, 34
];

var chart_3_y = [
  44, 44, 42, 42, 43, 43, 42, 42, 41, 43, 43, 43, 43
];

var chart_4_y = [
  60, 58, 55, 62, 55, 65, 60, 60, 58, 65, 60, 60, 55
];
/*Data Import - Need to change to real data aquisition eventually */

/*Diaply value on monitors */
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
function drawGrid(graph) {
    var graph = Snap(graph);
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
        var horizontalLine = graph.path(
            "M" + stepX * i + "," + 38.7 + " " +
            "L" + stepX * i + "," + 0)
        horizontalLine.attr('class', 'vertical');
        g.add(horizontalLine);
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
            p.y = 40 - pv;
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

function alarm(points) {
    for (i = 0; i < points.length; i++) {
        var d = chart_2_y[i];
        console.log(d);
        if (min_Temp < d < max_Temp) {   
        } else {
            console.log(10);
            document.chart2.style.backgroundColor = 'red';
        }
    }
}

 alarm(chart_2_y);

$(window).on('load',function(){
    drawLineGraph('#chart-1', chart_1_y, '#graph-1-container', 1);
    drawLineGraph('#chart-2', chart_2_y, '#graph-2-container', 2);
    drawLineGraph('#chart-3', chart_3_y, '#graph-3-container', 3);
    drawLineGraph('#chart-4', chart_4_y, '#graph-4-container', 4);
});
