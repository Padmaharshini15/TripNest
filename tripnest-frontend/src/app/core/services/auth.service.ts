import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  private apiUrl = 'http://localhost:8080/api/auth'; // Match port settings

  constructor(private http: HttpClient) {
    const savedUser = localStorage.getItem('tn_current_user');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      savedUser ? JSON.parse(savedUser) : null
    );
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: String): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, { email, password }).pipe(
      map(user => {
        localStorage.setItem('tn_current_user', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      })
    );
  }

  adminLogin(email: string, password: String): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/admin-login`, { email, password }).pipe(
      map(user => {
        localStorage.setItem('tn_current_user', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      })
    );
  }

  register(name: string, email: string, phone: string, password: String): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { name, email, phone, password });
  }

  logout() {
    localStorage.removeItem('tn_current_user');
    this.currentUserSubject.next(null);
  }

  isAdmin(): boolean {
    const user = this.currentUserValue;
    return user ? user.role === 'ROLE_ADMIN' : false;
  }
}
