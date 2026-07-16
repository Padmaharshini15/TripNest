import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:8080/api/bookings';

  constructor(private http: HttpClient) {}

  createBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.apiUrl, booking);
  }

  getMyBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/my`);
  }

  cancelBooking(id: number): Observable<Booking> {
    return this.http.delete<Booking>(`${this.apiUrl}/${id}`);
  }

  // --- Admin Moderation Operations ---

  getAllBookingsAdmin(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/admin/all`);
  }

  updateBookingStatus(id: number, status: string): Observable<Booking> {
    return this.http.put<Booking>(`${this.apiUrl}/admin/${id}/status?status=${status}`, {});
  }
}
