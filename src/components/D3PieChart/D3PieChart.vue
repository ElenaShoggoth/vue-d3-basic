<template>
  <div>
    <input type="number" v-model.number="newData" @keyup.enter="updateData" placeholder="Enter data value" />
    <div ref="chart"></div>
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'D3PieChart',
  data() {
    return {
      newData: null,
      dataset: [],
      radius: null,
      innerRadius: 50,
    };
  },
  mounted() {
    this.radius = Math.min(500, 500) / 2;
    this.createChart();
  },
  methods: {
    createChart() {
      this.svg = d3.select(this.$refs.chart)
        .append('svg')
        .attr('width', this.radius * 2)
        .attr('height', this.radius * 2)
        .append('g')
        .attr('transform', `translate(${this.radius}, ${this.radius})`);

      this.pie = d3.pie().value(d => d.value).sort(null);

      this.arc = d3.arc()
        .innerRadius(0)
        .outerRadius(this.radius);

      this.updateChart();
    },
    updateChart() {
      const arcs = this.svg.selectAll('.arc')
        .data(this.pie(this.dataset))
        .enter()
        .append('g')
        .attr('class', 'arc');

      arcs.append('path')
        .attr('d', this.arc)
        .attr('fill', (d, i) => d3.schemeCategory10[i % 10])
        .on('mouseover', this.mouseover)
        .on('mouseout', this.mouseout);

      arcs.append('text')
        .attr('transform', d => `translate(${this.arc.centroid(d)})`)
        .attr('text-anchor', 'middle')
        .attr('dy', '.35em')
        .text(d => d.data.label);
    },
    updateData() {
      if (this.newData !== null && this.newData !== '') {
        let foundIndex = this.dataset.findIndex(item => item.label === this.newData);

        if (foundIndex !== -1) {
          this.dataset[foundIndex].value += 2;
        } else {
          this.dataset.push({ label: this.newData, value: 1 });
        }

        this.svg.selectAll('*').remove();
        this.updateChart();
        this.newData = null;
      }
    },
    mouseover(event) {
      d3.select(event.currentTarget).select('path').transition().duration(200)
        .attr('d', d3.arc().innerRadius(this.innerRadius).outerRadius(this.radius * 1.1));
    },
    mouseout(event) {
      d3.select(event.currentTarget).select('path').transition().duration(200)
        .attr('d', this.arc);
    },
  },
};
</script>

<style scoped>
input {
  margin-bottom: 20px;
  padding: 10px;
  font-size: 16px;
}
.arc path {
  transition: fill 0.3s, transform 0.2s;
}
.arc:hover path {
  fill: orange;
}
</style>
