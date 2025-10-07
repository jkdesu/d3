var jsonData = d3.json("anscombe.json")

function scatterPlot(inputDataset){
    var svg = d3.select("#scatterplot")
       .append("svg")
       .attr("width",400)
       .attr("height",400)

    var xScale = d3.scaleLinear()
       .domain([0,20])
       .range([0,300])

    var yScale = d3.scaleLinear()
       .domain([0,20])
       .range([300,0])

    svg.selectAll("circle")
       .data(inputDataset)
       .enter()
       .append("circle")
       .attr("r",5)
       .attr("cx",function(d){
           return xScale(d.x)
       })
       .attr("cy",function(d){
           return yScale(d.y)
       })
       .attr("transform","translate(30,30)")

       var xAxis = d3.axisBottom().scale(xScale)

       var yAxis = d3.axisLeft().scale(yScale)

    svg.append("g").call(xAxis).attr("transform","translate(30,330)")
    svg.append("g").call(yAxis).attr("transform","translate(30,30)")
    svg.append("text").text("x").attr("x",160).attr("y",360)
    svg.append("text").text("y").attr("x",0).attr("y",160)

}

function barChart(dataset, column="x", color="steelblue") {
  var width = 400, height = 400, barWidth = 20;

  var svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, d => d[column])])
    .range([0, height-20]);

  svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
      .attr("x", (d,i) => i * (barWidth+2))
      .attr("y", d => height - yScale(d[column]))
      .attr("width", barWidth)
      .attr("height", d => yScale(d[column]))
      .attr("fill", color);

  svg.append("text")
    .text(column)
    .attr("x", 5)
    .attr("y", 15)
    .attr("font-size", "14px")
    .attr("font-weight", "bold");
}

Promise.all([jsonData])
.then(function(data){
   console.log(data[0])  
   
   var set1 = data[0].set1
   var set2 = data[0].set2
   var set3 = data[0].set3
   var set4 = data[0].set4
   
   console.log("Set 1:", set1)
   console.log("Set 2:", set2)
   
   scatterPlot(set1)
   
   var sets = [set1, set2, set3, set4];
   var colors = ["pink", "yellow", "green", "orange"];

   for (var i = 0; i < sets.length; i++) {
     barChart(sets[i], "x", colors[i]);
     barChart(sets[i], "y", colors[i]);
   }
})