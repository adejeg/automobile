import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../../services/crud.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  auditForm: FormGroup;
  manufacturers: any;
  cars: any;
  makerModel: any;
  checkList: any;
  submitted = false;
  backgroundImages: any;

  constructor(private fb: FormBuilder, private crud: CrudService, private router: Router, private toastr: ToastrService) {
    // data for automobile contidions
    this.checkList = [
      {
        id: 'engine',
        value: 'Engine Issue'
      },
      {
        id: 'gearbox',
        value: 'Gearbox Issue'
      },
      {
        id: 'body',
        value: 'Need Body Repair'
      },
      {
        id: 'repainting',
        value: 'Need Repainting'
      },
      {
        id: 'wiring',
        value: 'Wiring Problems'
      },
      {
        id: 'leakage',
        value: 'Oil Leakage'
      },
      {
        id: 'brake',
        value: 'Brake Issue'
      },
    ];

    this.getCarMakers();
    this.getCars();
  }

  ngOnInit(): void {
    this.createAuditForm();
  }

  // initializing audit form
  createAuditForm(): void{
    this.auditForm = this.fb.group({
      name: ['', Validators.required],
      refcode: ['', [Validators.required, Validators.pattern('(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}')]],
      email: ['', [Validators.required, Validators.email]],
      make: ['', Validators.required],
      model: ['', Validators.required],
      conditions: this.fb.array([], [Validators.required])
    });
  }

  // return form data
  get createdAuditForm(){
    return {
      name: this.auditForm.get('name'),
      refcode: this.auditForm.get('refcode'),
      email:  this.auditForm.get('email'),
      make:  this.auditForm.get('make'),
      model:  this.auditForm.get('model'),
      conditions:  this.auditForm.get('conditions')
    };
  }

  // API call for car manufacturer
  async getCarMakers(): Promise<void>{
    try {
      this.manufacturers = await this.crud.getData('manufacturers');
    } catch (error) {
      this.toastr.error('Load Failed', 'Failed');
    }
  }

  // API call for car model
  async getCars(): Promise<void>{
    try {
      this.cars = await this.crud.getData('cars');
    } catch (error) {
      this.toastr.error('Load Failed', 'Failed');
    }
  }

  // Filtering car model according to manufaturers
  filterCars(): void{
    this.makerModel = this.cars.filter(e => e.make === this.auditForm.value.make);
  }

  // Checking checkbox and assign data to auditForm
  onCheckboxChange(e): void{
    const checkArray: FormArray = this.auditForm.get('conditions') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value === e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  // pass form data to result page
  submitAuditForm(): void{
    this.submitted = true;
    if(this.auditForm.status !=='VALID')return;
    // passing data through router state
    this.router.navigate(['result'], {
      state: {
        result: JSON.stringify(this.auditForm.value)
      }
    });
  }
}
