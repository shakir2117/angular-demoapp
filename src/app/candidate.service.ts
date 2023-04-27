import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  url = 'http://localhost:3000/candidate';
  constructor(private http: HttpClient) {}
  candidatesget(): Observable<any> {
    return this.http.get(this.url);
  }
  candidate(formData: any): Observable<any> {
    return this.http.post(this.url, formData);
  }
}
