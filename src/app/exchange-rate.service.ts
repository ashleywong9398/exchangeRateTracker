import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExchangeRateService {
  private apiUrl = 'https://v6.exchangerate-api.com/v6/6a1e6769877ad600b1293e1f/latest/USD';

  constructor(private http: HttpClient) {}

  getSelectedExchangeRates(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((data) => ({
        CNY: data.conversion_rates.CNY,
        JPY: data.conversion_rates.JPY,
        EUR: data.conversion_rates.EUR,
        HKD: data.conversion_rates.HKD,
        XAU: data.conversion_rates.XAU || null,
      }))
    );
  }
}
