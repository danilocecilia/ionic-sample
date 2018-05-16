import { Component, ViewChild, OnInit } from "@angular/core";
import chartJs from 'chart.js';
import datalabels from 'chartjs-plugin-datalabels'
import { DashboardProvider } from "../../providers/dashboard/dashboard";

@Component({
  selector: "dashboard",
  templateUrl: "dashboard.html"
})
export class DashboardComponent implements OnInit{
  @ViewChild("lineCanvas") lineCanvas;
  @ViewChild("barCanvas") barCanvas;
  @ViewChild('pieCanvas') pieCanvas;

  lineChart: any;
  barChart: any;
  pieChart: any;

  dashboard:any;

  constructor(private dashboardProvider: DashboardProvider) { }

  ngOnInit(){
    this.dashboardProvider.loadDashboard()
    .then((response) => {
      this.dashboard = response;
      console.log(this.dashboard);
    }).catch(err => console.log(err));
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.barChart = this.getBarChart();
      // this.doughnutChart = this.getDoughnutChart();
      // this.halfDoughnutChart = this.getHalfDoughnutChart();
    }, 400);
    setTimeout(() => {
      this.lineChart = this.getLineChart();
      // this.radarChart = this.getRadarChart();
      // this.polarAreaChart = this.getPolarAreaChart();
    }, 800);
    setTimeout(() => {
      // this.bubbleChart = this.getBubbleChart();
      // this.mixedChart = this.getMixedChart();
      this.pieChart = this.getPieChart();
    }, 1200);
  }

  getLineChart() {
    const data = {
      labels: this.dashboard.DailyAccess.Hours,
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
          data: this.dashboard.DailyAccess.Logs,
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
      labels: this.dashboard.BillingSummary.Types,
      datasets: [{
        //label: '# of Votes',
        data: this.dashboard.BillingSummary.Values,
        backgroundColor: this.dashboard.BillingSummary.BackgroundColor,
        borderColor: this.dashboard.BillingSummary.BorderColor,
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
      labels: this.dashboard.TrainingStatus.Status,
      labelFontSize : '6',
      datasets: [
        {
          data: this.dashboard.TrainingStatus.Values,
          backgroundColor: this.dashboard.TrainingStatus.BackgroundColor,
          hoverBackgroundColor: this.dashboard.TrainingStatus.HoverBackgroundColor
        }]
    };

    return this.getChart(this.pieCanvas.nativeElement, 'pie', data);
  }

  getChart(context, chartType, data, options?, plugins?) {
    return new chartJs(context, { type: chartType, data, options, plugins });
  }
}
