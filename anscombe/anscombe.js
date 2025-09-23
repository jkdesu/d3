// Datasets
var set1 = [
    {x:10,y:8.04},{x:8,y:6.95},{x:13,y:7.58},{x:9,y:8.81},
    {x:11,y:8.33},{x:14,y:9.96},{x:6,y:7.24},{x:4,y:4.26},
    {x:12,y:10.84},{x:7,y:4.82},{x:5,y:5.68}
];

var set2 = [
    {x:10,y:9.14},{x:8,y:8.14},{x:13,y:8.74},{x:9,y:8.77},
    {x:11,y:9.26},{x:14,y:8.10},{x:6,y:6.13},{x:4,y:3.10},
    {x:12,y:9.13},{x:7,y:7.26},{x:5,y:4.74}
];

var set3 = [
    {x:10,y:7.46},{x:8,y:6.77},{x:13,y:12.74},{x:9,y:7.11},
    {x:11,y:7.81},{x:14,y:8.84},{x:6,y:6.08},{x:4,y:5.39},
    {x:12,y:8.15},{x:7,y:6.42},{x:5,y:5.73}
];

var set4 = [
    {x:8,y:6.58},{x:8,y:5.76},{x:8,y:7.71},{x:8,y:8.84},
    {x:8,y:8.47},{x:8,y:7.04},{x:8,y:5.25},{x:19,y:12.50},
    {x:8,y:5.56},{x:8,y:7.91},{x:8,y:6.89}
];

// Reusable scatterplot function
function scatterPlot(inputDataset, title) {
    var svg = d3.select("body")
    .append("svg")
    .attr("width", 400)
    .attr("height", 400);

    var xScale = d3.scaleLinear()
    .domain([0,20])
    .range([0,300]);

    var yScale = d3.scaleLinear()
    .domain([0,20])
    .range([300,0]);

  // Plot points
    svg.selectAll("circle")
    .data(inputDataset)
    .enter()
    .append("circle")
    .attr("r", 5)
    .attr("cx", d => xScale(d.x))
    .attr("cy", d => yScale(d.y))
    .attr("transform", "translate(50,30)");

  // Axes
    var xAxis = d3.axisBottom().scale(xScale);
    var yAxis = d3.axisLeft().scale(yScale);

    svg.append("g")
    .attr("transform","translate(50,330)")
    .call(xAxis);

    svg.append("g")
    .attr("transform","translate(50,30)")
    .call(yAxis);

  // Labels
    svg.append("text").text("x")
    .attr("x", 180)
    .attr("y", 370);

    svg.append("text").text("y")
    .attr("x", 10)
    .attr("y", 180);

  // Title
    svg.append("text").text(title)
    .attr("x", 180)
    .attr("y", 20)
    .style("font-weight", "bold");
}

// Draw all four
scatterPlot(set1, "Set I");
scatterPlot(set2, "Set II");
scatterPlot(set3, "Set III");
scatterPlot(set4, "Set IV");
