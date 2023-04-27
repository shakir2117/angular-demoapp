import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { UserregComponent } from '../userreg/userreg.component';
import { MatFormField } from '@angular/material/form-field';
import { CandidateService } from '../candidate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  successMessage: string = '';

  registrationForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private candidate: CandidateService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
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
  }

  //url; //Angular 8
  url: any; //Angular 11, for stricter type
  msg = '';

  //selectFile(event) { //Angular 8

  selectFile(event: any) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      return;
    }

    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = 'Only images are supported';
      return;
    }

    this.registrationForm.patchValue({
      Image: event.target.files[0],
    });

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.msg = '';
      this.url = reader.result;
    };
  }

  onClickSubmit() {
    if (this.registrationForm.value != null) {
      this.candidate.candidate(this.registrationForm.value).subscribe(
        (result) => {
          console.log('Form data sent to server');
          console.log(result);
        },
        (error) => {
          console.log('Error sending form data to server:', error);
        }
      );
    }

    this.successMessage = 'Form submitted successfully!';
  }
  closeMessage() {
    this.successMessage = '';
  }
  submittedFormData: any;

  onSubmit() {
    // submit form logic here
    this.submittedFormData = this.registrationForm.value;
  }
}
