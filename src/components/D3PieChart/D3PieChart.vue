<template>
  <div class="container">
    <div class="input-group">
      <input
        type="number"
        v-model.number="newData"
        @keyup.enter="updateData"
        placeholder="Enter data value"
        class="styled-input"
      />
      <button
        :disabled="!newData"
        @click="updateData"
        class="styled-button"
      >
        Update
      </button>
    </div>
    <div ref="chart" class="chart"></div>
  </div>
</template>

<script>
import * as d3 from 'd3';
// import { interpolateRainbow } from 'd3-scale-chromatic';

export default {
  name: 'D3PieChart',
  data() {
    return {
      newData: null,
      dataset: [],
      radius: null,
      innerRadius: 50,
      colors: d3.schemeSet3.concat(d3.schemeSet3), // получаем всего 14 уникальных цветов
      // colorScale: d3.scaleSequential(interpolateRainbow).domain([0, 50]), // масштабирование цветов(палитра)
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
        .attr('fill', (d, i) => this.colors[i % this.colors.length])
        // .attr('fill', (d, i) => this.colorScale(i)) 
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
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.input-group {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.styled-input {
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
  outline: none;
  transition: border-color 0.3s;
}

.styled-input:focus {
  border-color: #007bff;
}

.styled-button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.styled-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.styled-button:not(:disabled):hover {
  background-color: #0056b3;
}

.chart {
  width: 100%;
  max-width: 500px;
}
</style>

