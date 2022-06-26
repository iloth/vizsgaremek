import { Component, OnInit, ViewChild } from '@angular/core';
import { UserModel } from 'src/app/models/admin/UserModel';
import { IDataColumn } from 'src/app/modules/data-components/models/DataTableModels';
import { DashboardService } from 'src/app/services/sale/DashboardService';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(
    private dashboardService: DashboardService
  ) { }
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  
  newOrders$ = this.dashboardService.getNewOrders();
  inprogressOrders$ = this.dashboardService.getInprogressOrders();
  orderStat$ = this.dashboardService.getOrderStat();
  orderHistW$ = this.dashboardService.getOrderHistoryW();
  orderHistM$ = this.dashboardService.getOrderHistoryM();

  orderColumns: IDataColumn[] = [
    { key: 'userId', title: 'Customer', filterable: false, sortable: false, format: (value: UserModel) => value.name },
    { key: 'orderDate', title: 'orderDate', filterable: false, sortable: false, format: (value: Date) => new Date(value).toLocaleString() }
  ]

  chartType: ChartType = 'bar';
  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {}
    },
    plugins: {
      legend: {
        display: true,
      }
    }
  };

  histChartDataW: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Completed orders' }
    ]
  };    
  histChartDataM: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Completed orders' }
    ]
  };    


  ngOnInit(): void {
    this.orderHistW$.subscribe({
      next: (history) => {
        this.histChartDataW = {
          labels: history?.map((data) => data.week) ?? [],
          datasets: [
            { data: history?.map((data) => data.completed) ?? [], label: 'Completed orders', backgroundColor: '#77ff77' }
          ]
        };
        this.chart?.update();
      }
    });

    this.orderHistM$.subscribe({
      next: (history) => {
        this.histChartDataM = {
          labels: history?.map((data) => data.month) ?? [],
          datasets: [
            { data: history?.map((data) => data.completed) ?? [], label: 'Completed orders', backgroundColor: '#7777ff' }
          ]
        };
        this.chart?.update();
      }
    });

    this.chart?.update();
  }

}
