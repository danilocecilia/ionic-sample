import { Component, ViewChild } from "@angular/core";
import chartJs from 'chart.js';
import datalabels from 'chartjs-plugin-datalabels'

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
  @ViewChild("barCanvas") barCanvas;
  @ViewChild('pieCanvas') pieCanvas;

  lineChart: any;
  barChart: any;
  pieChart: any;

  constructor() { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.barChart = this.getBarChart();
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
      this.pieChart = this.getPieChart();
    }, 350);
  }

  getLineChart() {
    const data = {
      labels: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
      datasets: [
        {
          label: "Qty Access",
          fill: true,
          // yAxisID: "Qtd Access",
          lineTension: 0.1,
          backgroundColor: "rgba(0,0,0,0.7)",
          borderColor: "rgba(0,0,0,0.7)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "bevel",
          pointBorderColor: "rgba(0,0,0,0.7)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(0,0,0,0.7)",
          pointHoverBorderColor: "rgba(255,0,0,0.7)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [0, 2, 20, 6, 15, 55, 35, 2, 8, 1, 1],
          spanGaps: false
        }
      ]
    };

    const options = {
      scales: {
        yAxes: [{
          ticks: {
            min: 0,
            stepSize: 10,
            max: 60
          }
        }]
      }
    };

    return this.getChart(this.lineCanvas.nativeElement, "line", data, options);
  }

  getBarChart() {
    const data = {
      labels: ['Air', 'Food', 'Gifts', 'Location', 'Other', 'Training', 'Transport'],
      datasets: [{
        //label: '# of Votes',
        data: [825.00, 308.70, 100.00, 499.00, 339.00, 45.00, 64.25],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 220, 60, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 220, 60, 1)'
        ],
        borderWidth: 1,
        fill: false
      }]
    };

    const options = {
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            min: 0,
            stepSize: 300,
            max: 850
          }
        }]
      },
      plugins: [datalabels]
    };

    return this.getChart(this.barCanvas.nativeElement, 'bar', data, options);
  }

  getPieChart() {
    const data = {
      labels: ['Enrolled', 'Fail', 'In Progress', 'Pass'],
      labelFontSize : '6',
      datasets: [
        {
          data: [226, 2467, 2787, 6000],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#64f28a'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#64f28a']
        }]
    };

    return this.getChart(this.pieCanvas.nativeElement, 'pie', data);
  }

  getChart(context, chartType, data, options?, plugins?) {
    return new chartJs(context, { type: chartType, data, options, plugins });
  }
}
