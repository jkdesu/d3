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

var colors = ["#53e2e8","#dce539","#4cecbb","#f1be47","#79e950","#f6ac8d","#7be98e","#e5d17c","#8ce1af","#d6db66","#c2e596","#b4e462"]

function pieChart(data, title){
    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", 200)
        .attr("height", 200)
        .append("g")
        .attr("transform", "translate(100,100)")

    // Add title explaining what the slices represent
    svg.append("text")
        .text(title)
        .attr("x", 0)
        .attr("y", -90)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("font-weight", "bold")
        .attr("fill", "black")

    var pie = d3.pie()
        .value(function(d){
            return d.x
        })

    var pieData = pie(data)

    var arc = d3.arc()
        .innerRadius(0)
        .outerRadius(80)

    svg.selectAll("path")
        .data(pieData)
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", function(d){
            console.log(d)
            var sliceIndex = d.index
            return colors[sliceIndex]
        })
        .attr("stroke", "white")
        .style("stroke-width", "2px")
}

// Function for y-value pie charts
function pieChartY(data, title){
    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", 200)
        .attr("height", 200)
        .append("g")
        .attr("transform", "translate(100,100)")

    // Add title explaining what the slices represent
    svg.append("text")
        .text(title)
        .attr("x", 0)
        .attr("y", -90)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("font-weight", "bold")
        .attr("fill", "black")

    var pie = d3.pie()
        .value(function(d){
            return d.y  // Using y values instead of x values
        })

    var pieData = pie(data)

    var arc = d3.arc()
        .innerRadius(0)
        .outerRadius(80)

    svg.selectAll("path")
        .data(pieData)
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", function(d){
            console.log(d)
            var sliceIndex = d.index
            return colors[sliceIndex]
        })
        .attr("stroke", "white")
        .style("stroke-width", "2px")
}

// Create x-value pie charts for all 4 sets
pieChart(set1, "Set 1: X-Value Distribution")
pieChart(set2, "Set 2: X-Value Distribution")
pieChart(set3, "Set 3: X-Value Distribution")
pieChart(set4, "Set 4: X-Value Distribution")

// Create y-value pie charts for all 4 sets
pieChartY(set1, "Set 1: Y-Value Distribution")
pieChartY(set2, "Set 2: Y-Value Distribution")
pieChartY(set3, "Set 3: Y-Value Distribution")
pieChartY(set4, "Set 4: Y-Value Distribution")  