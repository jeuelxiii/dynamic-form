import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { FormService } from '../form.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

profileForm = this.fb.group({
  firstName: ['', Validators.required],
  lastName: ['', Validators.required],
  address: this.fb.group({
    address1: [''],
    address2: [''],
    city: [''],
    state: [''],
    country: [''],
    zip: ['', Validators.pattern("^[0-9]*$")]
  }),
  birthday: this.fb.group({
      day: ['', [Validators.pattern("^[0-9]*$"), Validators.maxLength(2)] ],
    month: ['', [Validators.pattern("^[0-9]*$"), Validators.maxLength(2)] ],
    year: ['', [Validators.pattern("^[0-9]*$"), Validators.maxLength(4), Validators.minLength(4)] ]
  }),
  gender: [''],
  highschool: [''],
  college: [''],
  skills: this.fb.array([''])
});

get firstName() {
  return this.profileForm.get("firstName");
}

get lastName() {
  return this.profileForm.get("lastName");
}

  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {

  }


  addSkills() {
    this.skills.push(this.fb.control(''));
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  get skills() {
    return this.profileForm.get('skills') as FormArray;
  }


  onSubmit(){
    let completedForm = {
      firstName: this.profileForm.controls.firstName.value,
      lastName: this.profileForm.controls.lastName.value,
      address: this.profileForm.controls.address.value,
      birthday: this.profileForm.controls.birthday.value,
      gender: this.profileForm.controls.gender.value,
      highschool: this.profileForm.controls.highschool.value,
      college: this.profileForm.controls.college.value,
      skills: this.skills.value
    }
  
    console.log(completedForm);
    this.toastr.success('Your form has been submitted!');
    this.formService.addItem(completedForm);
    this.profileForm.reset();
    
  }

}