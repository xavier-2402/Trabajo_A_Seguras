import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {

  form:UntypedFormGroup;

  types:any[] = [
    {
      code:1,
      name:'Analgésico'
    },
    {
      code:2,
      name:'Analéptico'
    },
    {
      code:3,
      name:'Anestésico'
    },
    {
      code:4,
      name:'Antiácido'
    },
    {
      code:5,
      name:'Antidepresivo'
    },
    {
      code:6,
      name:'Antibioticos'
    }
  ]

  distributors:any[]=[
    {
      code:1,
      name:'COFARMA'
    },
    {
      code:2,
      name:'EMPSEPHAR'
    },
    {
      code:3,
      name:'CEMEFAR'
    }
  ]

  showNew:boolean = false;

  constructor(private fb:FormBuilder){
    this.buildForm();
  }


  buildForm(){
    this.form  = this.fb.group({
      medicine:[null,[Validators.required,Validators.minLength(3),Validators.maxLength(250)]],
      type:[null,[Validators.required]],
      quantity:[null,[Validators.required,Validators.min(3),Validators.max(100)]],
      distributor:[null,[Validators.required]],
    });
  }
}
