import { Component, ViewChild } from "@angular/core";
import chartJs from 'chart.js';

/**
 * Generated class for the DashboardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "dashboard",
  templateUrl: "dashboard.html"
})
export class DashboardComponent {
  @ViewChild("lineCanvas") lineCanvas;

  lineChart: any;

  constructor() {}

  ngAfterViewInit() {
    setTimeout(() => {
      // this.barChart = this.getBarChart();
      // this.doughnutChart = this.getDoughnutChart();
      // this.halfDoughnutChart = this.getHalfDoughnutChart();
    }, 150);
    setTimeout(() => {
      this.lineChart = this.getLineChart();
      // this.radarChart = this.getRadarChart();
      // this.polarAreaChart = this.getPolarAreaChart();
    }, 250);
    setTimeout(() => {
      // this.bubbleChart = this.getBubbleChart();
      // this.mixedChart = this.getMixedChart();
      // this.pieChart = this.getPieChart();
    }, 350);
  }

  getLineChart() {
    const data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "My First dataset",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [65, 59, 80, 81, 56, 55, 40],
          spanGaps: false
        },
        {
          label: "My Second dataset",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(175,92,192,0.4)",
          borderColor: "rgba(31,156,156,1)",
          borderCapStyle: "butt",
          borderDash: [5, 8],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(31,156,156,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(31,156,156,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [15, 39, 50, 81, 51, 55, 30],
          spanGaps: false
        }
      ]
    };

    return this.getChart(this.lineCanvas.nativeElement, "line", data);
  }

  getChart(context, chartType, data, options?) {
    return new chartJs(context, {
      data,
      options,
      type: chartType,
    });
  }
}
