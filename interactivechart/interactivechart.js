
// 1) Data (minutes)
const data = [
  {date:"2025-09-14", day:"Sun", Entertainment:0,   Social:68, Utilities:21, Creativity:19, Productivity:0,  Travel:0},
  {date:"2025-09-15", day:"Mon", Entertainment:205, Social:24, Utilities:32, Creativity:0,  Productivity:0,  Travel:0},
  {date:"2025-09-16", day:"Tue", Entertainment:31,  Social:5,  Utilities:0,  Creativity:0,  Productivity:5,  Travel:0},
  {date:"2025-09-17", day:"Wed", Entertainment:94,  Social:37, Utilities:0,  Creativity:19, Productivity:0,  Travel:0},
  {date:"2025-09-18", day:"Thu", Entertainment:129, Social:93, Utilities:0,  Creativity:0,  Productivity:9,  Travel:0},
  {date:"2025-09-19", day:"Fri", Entertainment:21,  Social:87, Utilities:0,  Creativity:0,  Productivity:0,  Travel:17},
  {date:"2025-09-20", day:"Sat", Entertainment:0,   Social:149,Utilities:0,  Creativity:14, Productivity:7,  Travel:0}
];
const categories = ["Entertainment","Social","Utilities","Creativity","Productivity","Travel"]; // keep fixed order

const color = d3.scaleOrdinal()
  .domain(categories)
  .range(d3.schemeTableau10.slice(0, categories.length));

const controls = d3.select('#catControls'); //CatControls: container where all category filters checkboxes get dynamically inserted
const selected = new Set(categories);  
controls.selectAll('label')
  .data(categories)
  .enter().append('label')
    .html(d => `<input type="checkbox" value="${d}" checked> <span>${d}</span>`)
    .on('change', (e, d) => {
      const cb = e.currentTarget.querySelector('input');
      if (cb.checked) selected.add(d); else selected.delete(d);
      updateBar();
      updatePie();
    });

// Legend
const legend = d3.select('#legend');
legend.selectAll('span')
  .data(categories)
  .enter().append('span')
    .html(d => `<i class='swatch' style='background:${color(d) }'></i>${d}`);

// Tooltip  
const tip = d3.select('#tooltip');
const showTip = (html, [x,y]) => { tip.html(html).style('left', (x+12)+"px").style('top', (y+12)+"px").style('opacity', 1); };
const hideTip = () => tip.style('opacity', 0);

// 2) Bar Chart
const barWidth = 880, barHeight = 360, margin = {top:10,right:16,bottom:40,left:48};
const svgBar = d3.select('#barChart').append('svg')
  .attr('viewBox',`0 0 ${barWidth} ${barHeight}`);

const x = d3.scaleBand().domain(data.map(d=>d.day)).range([margin.left, barWidth-margin.right]).padding(0.22);
const y = d3.scaleLinear().range([barHeight-margin.bottom, margin.top]);

svgBar.append('g').attr('class','axis x').attr('transform',`translate(0,${barHeight-margin.bottom})`).call(d3.axisBottom(x));
const yAxisG = svgBar.append('g').attr('class','axis y').attr('transform',`translate(${margin.left},0)`);

const barsG = svgBar.append('g');

function updateBar(){
  const keys = categories.filter(c=>selected.has(c));
  // stack
  const stack = d3.stack().keys(keys)(data.map(d=>{
    const o = {day:d.day}; keys.forEach(k=>o[k]=d[k]); return o;
  }));

  const maxY = d3.max(data, d=> d3.sum(keys, k=>d[k]));
  y.domain([0, maxY||10]);
  yAxisG.transition().duration(400).call(d3.axisLeft(y).ticks(6));

  const groups = barsG.selectAll('g.layer').data(stack, d=>d.key);
  groups.enter().append('g').attr('class','layer').attr('fill', d=>color(d.key));
  groups.exit().remove();

  const layers = barsG.selectAll('g.layer');
  const rects = layers.selectAll('rect').data(d=>d, d=>d.data.day);
  rects.enter().append('rect')
      .attr('x', d=>x(d.data.day))
      .attr('y', y(0))
      .attr('width', x.bandwidth())
      .attr('height', 0)
      .on('mousemove', (e, d)=>{
        const day = d.data.day;
        const total = d3.sum(keys, k=> data.find(r=>r.day===day)[k]);
        const rows = keys.map(k=>`<div><b style='color:${color(k)}'>■</b> ${k}: ${data.find(r=>r.day===day)[k]}m</div>`).join("");
        showTip(`<b>${day}</b><div style='margin-top:6px'>${rows}</div><hr style='border:0;border-top:1px solid #2b3a68'><div>Total: ${total}m</div>`, d3.pointer(e));
      })
      .on('mouseleave', hideTip)
    .merge(rects)
      .transition().duration(500)
      .attr('x', d=>x(d.data.day))
      .attr('y', d=>y(d[1]))
      .attr('height', d=>y(d[0]) - y(d[1]))
      .attr('width', x.bandwidth());
  rects.exit().transition().duration(300).attr('y', y(0)).attr('height', 0).remove();
}

// 3) Pie Chart
const pieW = 440, pieH = 340, pieR = Math.min(pieW, pieH) / 2 - 40;
const svgPie = d3.select('#pieChart').append('svg')
  .attr('viewBox', `0 0 ${pieW} ${pieH}`)
  .append('g')
  .attr('transform', `translate(${pieW/2}, ${pieH/2})`);

const pie = d3.pie()
  .value(d => d.value)
  .sort(null);

const arc = d3.arc()
  .innerRadius(0)
  .outerRadius(pieR);

function updatePie(){
  // Calculate total minutes per category across all days
  const keys = categories.filter(c => selected.has(c));
  const categoryTotals = keys.map(category => {
    const total = d3.sum(data, d => d[category]);
    return { category: category, value: total };
  }).filter(d => d.value > 0); // Only show categories with data

  const pieData = pie(categoryTotals);

  const slices = svgPie.selectAll('path').data(pieData, d => d.data.category);
  
  const enter = slices.enter()
    .append('path')
    .attr('fill', d => color(d.data.category))
    .attr('stroke', 'white')
    .style('stroke-width', '2px')
    .on('mousemove', (e, d) => {
      showTip(`<b>${d.data.category}</b><div>${d.data.value} minutes total</div>`, d3.pointer(e, document.body));
    })
    .on('mouseleave', hideTip)
    .each(function(d) { this._current = {startAngle: 0, endAngle: 0}; });


  enter.merge(slices)
    .transition()
    .duration(500)
    .attrTween('d', function(d){
      const interpolate = d3.interpolate(this._current, d);
      this._current = interpolate(1);
      return t => arc(interpolate(t));
    });
  slices.exit()
    .transition()
    .duration(300)
    .attrTween('d', function(d){
      const interpolate = d3.interpolate(this._current, {startAngle: 0, endAngle: 0});
      return t => arc(interpolate(t));
    })
    .remove();
}

updateBar();
updatePie();