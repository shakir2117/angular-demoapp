import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CandidateService } from '../candidate.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-userreg',
  templateUrl: './userreg.component.html',
  styleUrls: ['./userreg.component.css'],
})
export class UserregComponent implements OnInit {
  constructor(private candidates: CandidateService, private http: HttpClient) {}
  candidatedata: any = [];
  // ngOnInit() {
  //   this.candidates.candidatesget().subscribe(
  //     (alldata) => {
  //       console.log('Form data got form server');
  //       console.log(alldata);
  //       this.candidatedata = alldata;
  //     },
  //     (error) => {
  //       console.log('Error reciving form data to server:', error);
  //     }
  //   );
  // }

  // constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://localhost:3000/candidate/').subscribe((data) => {
      this.candidatedata = data;
    });
  }
}
