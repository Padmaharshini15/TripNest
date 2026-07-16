import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TouristSpot } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class SpotService {
  private apiUrl = 'http://localhost:8080/api/spots';
  private adminApiUrl = 'http://localhost:8080/api/admin/spots';

  constructor(private http: HttpClient) {}

  getActiveSpots(): Observable<TouristSpot[]> {
    return this.http.get<TouristSpot[]>(`${this.apiUrl}/public`);
  }

  getSpotById(id: number): Observable<TouristSpot> {
    return this.http.get<TouristSpot>(`${this.apiUrl}/public/${id}`);
  }

  searchSpots(query: string): Observable<TouristSpot[]> {
    return this.http.get<TouristSpot[]>(`${this.apiUrl}/public/search?query=${query}`);
  }

  // --- Admin Restrict Operations ---

  getAllSpotsAdmin(): Observable<TouristSpot[]> {
    return this.http.get<TouristSpot[]>(`${this.adminApiUrl}/all`);
  }

  createSpot(spot: TouristSpot): Observable<TouristSpot> {
    return this.http.post<TouristSpot>(`${this.adminApiUrl}`, spot);
  }

  updateSpot(id: number, spot: TouristSpot): Observable<TouristSpot> {
    return this.http.put<TouristSpot>(`${this.adminApiUrl}/${id}`, spot);
  }

  deleteSpot(id: number): Observable<void> {
    return this.http.delete<void>(`${this.adminApiUrl}/${id}`);
  }
}
