import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-exchange-rate-chart',
  standalone: true,
  template: `
    <!-- Header -->
    <header class="header">
      <h1>Exchange Rate Tracker</h1>
      <div class="user-status">
        Hi, <strong>User 1</strong>
      </div>
    </header>

    <!-- Conversion Section -->
    <div class="conversion-section module">
      <div class="conversion-wrapper">
        <label for="usdAmount">Amount in USD:</label>
        <input
          type="number"
          id="usdAmount"
          [(ngModel)]="usdAmount"
          (input)="updateConversion()"
        />
        <span class="converted-amount">
          Converted Amount: {{ convertedAmount.toFixed(2) }} CNY
        </span>
      </div>
    </div>

    <!-- Exchange Rates Section -->
    <div class="exchange-rate-section module">
      <h3>Currency Exchange Rates</h3>
      <ul *ngIf="exchangeRates">
        <li>1 USD = {{ exchangeRates.CNY }} CNY (Chinese Yuan)</li>
        <li>1 USD = {{ exchangeRates.JPY }} JPY (Japanese Yen)</li>
        <li>1 USD = {{ exchangeRates.EUR }} EUR (Euro)</li>
        <li>1 USD = {{ exchangeRates.HKD }} HKD (Hong Kong Dollar)</li>
        <li *ngIf="exchangeRates.XAU">1 USD = {{ exchangeRates.XAU }} XAU (Gold)</li>
      </ul>
    </div>

    <!-- Notes Section -->
    <div class="record-section module">
      <h3>Notes Section</h3>
      <mat-form-field appearance="fill">
        <mat-label>Select a date</mat-label>
        <input
          matInput
          [matDatepicker]="picker"
          [(ngModel)]="selectedDate"
          [value]="today"
        />
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>

      <textarea
        [(ngModel)]="noteContent"
        placeholder="Add your note here"
      ></textarea>
      <div class="button-group">
        <button (click)="saveNote()">Save Note</button>
      </div>

      <h4>Recorded Notes</h4>
      <ul>
        <li *ngFor="let note of notes; let i = index">
          <strong>{{ note.date }}</strong>: {{ note.content }}
          <button (click)="deleteNote(i)">Delete</button>
        </li>
      </ul>
    </div>

    <!-- Footer -->
    <footer class="footer">
      Copyright © Ashley's Website 2024
    </footer>
  `,
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
  ],
  styleUrls: ['./exchange-rate-chart.component.css'],
})
export class ExchangeRateChartComponent implements OnInit {
  exchangeRates: any = null;
  usdAmount: number = 1; 
  convertedAmount: number = 0; 
  selectedDate: Date | null = null;
  today: Date = new Date(); 
  noteContent: string = '';
  notes: { date: string; content: string }[] = [];

  ngOnInit(): void {
    this.fetchExchangeRates();
    this.loadNotes();
    this.selectedDate = this.today; 
  }

  fetchExchangeRates() {
    this.exchangeRates = {
      CNY: 7.28,
      JPY: 149.72,
      EUR: 0.95,
      HKD: 7.78,
    };
    this.updateConversion();
  }

  updateConversion(): void {
    if (this.exchangeRates) {
      this.convertedAmount = this.usdAmount * this.exchangeRates.CNY;
    }
  }

  saveNote(): void {
    if (this.selectedDate && this.noteContent) {
      const dateKey = this.selectedDate.toISOString().split('T')[0];
      const newNote = { date: dateKey, content: this.noteContent };

      this.notes.push(newNote);
      localStorage.setItem('notes', JSON.stringify(this.notes));

      this.noteContent = '';
    }
  }

  deleteNote(index: number): void {
    this.notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  loadNotes(): void {
    const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    this.notes = savedNotes;
  }
}
