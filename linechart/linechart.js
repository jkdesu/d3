// ===== Anscombe sets =====
var set1 = [
    {x:10,y:8.04},{x:8,y:6.95},{x:13,y:7.58},{x:9,y:8.81},
    {x:11,y:8.33},{x:14,y:9.96},{x:6,y:7.24},{x:4,y:4.26},
    {x:12,y:10.84},{x:7,y:4.82},{x:5,y:5.68}
];
var set2 = [
    {x:10,y:9.14},{x:8,y:8.14},{x:13,y:8.74},{x:9,y:8.77},
    {x:11,y:9.26},{x:14,y:8.1},{x:6,y:6.13},{x:4,y:3.1},
    {x:12,y:9.13},{x:7,y:7.26},{x:5,y:4.74}
];
var set3 = [
    {x:10,y:7.46},{x:8,y:6.77},{x:13,y:12.74},{x:9,y:7.11},
    {x:11,y:7.81},{x:14,y:8.84},{x:6,y:6.08},{x:4,y:5.39},
    {x:12,y:8.15},{x:7,y:6.42},{x:5,y:5.73}
];
var set4 = [
    {x:8,y:6.58},{x:8,y:5.76},{x:8,y:7.71},{x:8,y:8.84},
    {x:8,y:8.47},{x:8,y:7.04},{x:8,y:5.25},{x:19,y:12.5},
    {x:8,y:5.56},{x:8,y:7.91},{x:8,y:6.89}
];

function lineChart(data, title){
    var svg = d3.select("#chart")
        .append("svg")
        .attr("width",200)
        .attr("height",200)
    var yScale = d3.scaleLinear().domain([0,20]).range([0,200])
    
    // Add title
    svg.append("text")
        .text(title)
        .attr("x", 5)
        .attr("y", 15)
        .attr("font-size", "12px")
        .attr("font-weight", "bold")
        .attr("fill", "black")
    
    // Create xLine for x values
    var xLine = d3.line()
        .x(function(d,i){return i*10})
        .y(function(d,i){return yScale(d.x)})

    // Create yLine for y values  
    var yLine = d3.line()
        .x(function(d,i){return i*10})
        .y(function(d,i){return yScale(d.y)})

    // Add x line (red)
    svg.append("path")
        .datum(data)
        .attr("d",xLine)  
        .attr("fill","none")
        .attr("stroke","red")
        .attr("stroke-width", 2)

    // Add y line (blue)
    svg.append("path")
        .datum(data)
        .attr("d",yLine)  
        .attr("fill","none")
        .attr("stroke","blue")
        .attr("stroke-width", 2)
}

// Create line charts for all 4 sets
lineChart(set1, "Set 1: X & Y Lines")
lineChart(set2, "Set 2: X & Y Lines")
lineChart(set3, "Set 3: X & Y Lines")
lineChart(set4, "Set 4: X & Y Lines")

// Create a new SVG for multiple overlapping lines
var svg = d3.select("#chart")
    .append("svg")
    .attr("width",200)
    .attr("height",200)

// Add title for X-Value Overlay Chart
svg.append("text")
    .text("X-Value Overlay Chart")
    .attr("x", 5)
    .attr("y", 15)
    .attr("font-size", "12px")
    .attr("font-weight", "bold")
    .attr("fill", "black")

var yScale = d3.scaleLinear().domain([0,20]).range([0,200])

function lineChart2(data, color){
    var ourLine = d3.line()
        .x(function(d,i){return i*10})
        .y(function(d,i){return yScale(d.x)})

    svg.append("path")
        .datum(data)
        .attr("d",ourLine)  
        .attr("fill","none")
        .attr("stroke", color)
        .attr("stroke-width", 2)
        .attr("opacity", 0.7)
}

lineChart2(set1, "red")
lineChart2(set2, "blue")
lineChart2(set3, "green")
lineChart2(set4, "orange")

// Create a new SVG for y values with different colors and opacity
var svg2 = d3.select("#chart")
    .append("svg")
    .attr("width",200)
    .attr("height",200)

// Add title for Y-Value Overlay Chart
svg2.append("text")
    .text("Y-Value Overlay Chart")
    .attr("x", 5)
    .attr("y", 15)
    .attr("font-size", "12px")
    .attr("font-weight", "bold")
    .attr("fill", "black")

var yScale2 = d3.scaleLinear().domain([0,20]).range([0,200])

function lineChart3(data, color, opacity, strokeWidth){
    var ourLine = d3.line()
       .x(function(d,i){return i*10})
       .y(function(d,i){return yScale2(d.y)})  // Using d.y instead of d.x

    svg2.append("path")
        .datum(data)
        .attr("d",ourLine)  
        .attr("fill","none")
        .attr("stroke", color)
        .attr("stroke-width", strokeWidth)
        .attr("opacity", opacity)
}

// Add multiple overlapping y-value lines with different styles
lineChart3(set1, "darkred", 0.9, 3)
lineChart3(set2, "navy", 0.7, 2)
lineChart3(set3, "darkgreen", 0.8, 2.5)
lineChart3(set4, "purple", 0.6, 1.5)

