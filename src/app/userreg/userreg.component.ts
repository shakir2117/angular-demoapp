import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CandidateService } from '../candidate.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-userreg',
  templateUrl: './userreg.component.html',
  styleUrls: ['./userreg.component.css'],
})
export class UserregComponent implements OnInit {
  EditForm!: FormGroup;

  canupdate = {
    FName: "",
    LName: "",
    email: "",
    age: "",
    intrests: "",
    homeAddress1: "",
    homeAddress2: "",
    companyAddress1: "",
    companyAddress2: "",
  }

  constructor(private formBuilder: FormBuilder, private candidate: CandidateService, private http: HttpClient) { }
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
    this.EditForm = this.formBuilder.group({
      Image: ['', Validators.required],

      FName: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
          Validators.maxLength(20),
        ],
      ],
      LName: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
          Validators.maxLength(20),
        ],
      ],
      email: [
        '',
        Validators.required,
        Validators.pattern(
          "[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*"
        ),
      ],
      age: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
      interests: [''],
      addressType: ['', Validators.required],
      companyAddress1: [''],
      companyAddress2: [''],
      homeAddress1: [''],
      homeAddress2: [''],
    });
    this.http.get('http://localhost:3000/candidate/1').subscribe((data) => {
      this.candidatedata = data;
    });
  }
  // onClickSubmit() {

  //   this.candidate.candidate(this.EditForm.value).subscribe(
  //     (result: any) => {
  //       console.log('Form data sent to server');
  //       console.log(result);
  //     },
  //     (error: any) => {
  //       console.log('Error sending form data to server:', error);
  //     }
  //   );
  // }

  onClickSubmit() {
    this.candidate.candidateput(this.EditForm.value).subscribe(
      (data: any) => {
        console.log('user updated successfully')
      }
    )
    location.reload();
  }

  onClickEdit() {
    this.http.get('http://localhost:3000/candidate/1').subscribe((data) => {
      this.candidatedata = data;
      console.log(data)
    });
  }

}
