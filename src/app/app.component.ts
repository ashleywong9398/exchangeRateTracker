import { Component } from '@angular/core';
import { ExchangeRateChartComponent } from './exchange-rate-chart/exchange-rate-chart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
     
    <app-exchange-rate-chart></app-exchange-rate-chart>
  `,
  imports: [ExchangeRateChartComponent],
})
export class AppComponent {}
