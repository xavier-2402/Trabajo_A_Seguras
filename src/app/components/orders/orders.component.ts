import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormBuilder, Validators, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';
import { NzMessageComponent, NzMessageService } from 'ng-zorro-antd/message';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {

  form:UntypedFormGroup;
  isVisible = false;
  distributorSe: string = null;
  medicineSe: string = null;
  typeSe: string = null;
  quantitySe: string = null;
  address : string = null
  isValidBranch:boolean = true;
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

  orders:Order[] = [];

  showNew:boolean = false;
  allChecked = false;
  indeterminate = true;
  branchs:any[] = [
    { label: 'PRINCIPAL', value: 1, checked: true },
    { label: 'SECUNDARIA', value: 2, checked: false }
  ];

  order:Order;
  constructor(private fb:FormBuilder,
    private msg: NzMessageService
  ){
    this.buildForm();
  }


  buildForm(){
    this.form  = this.fb.group({
      medicine:[null,[Validators.required,Validators.minLength(3),Validators.maxLength(250)]],
      type:[null,[Validators.required]],
      quantity:[null,[Validators.required,Validators.min(3),Validators.max(100), this.nonNegativeValidator]],
      distributor:[null,[Validators.required]],
      branch: [null, [Validators.required]]
    });
  }


  nonNegativeValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value !== null && control.value < 0) {
      return { 'negative': true };
    }
    return null;
  }

  get quantity() {
    return this.form.get('quantity');
  }

  delete(){
    this.form.reset();
    this.branchs.map(x => x.checked = false)
  }

  log(){
    let items = this.branchs.filter(x => x.checked)
    if(items.length == 0) this.isValidBranch = false;
    else this.isValidBranch = true;

    if (this.branchs.every(item => !item.checked)) {
      this.allChecked = false;
      this.indeterminate = false;
    } else if (this.branchs.every(item => item.checked)) {
      this.allChecked = true;
      this.indeterminate = false;
    } else {
      this.indeterminate = true;
    }
  }

  onOkForm(){
    this.form.get('branch').setValue(this.branchs.filter(x => x.checked));
    if (!this.form.valid) {
      this.msg.error('Complete los campos obligatorios e ingrese la información correcta');
      return;
    }
    this.isVisible = true;

    this.distributorSe = this.distributors.find(p => p.code == this.form.value.distributor).name;
    this.medicineSe = this.form.value.medicine;
    this.typeSe = this.types.find(p => p.code == this.form.value.type).name;
    this.quantitySe = this.form.value.quantity;
    var selected = this.form.value.branch.filter(p => p.checked == true);
    if(selected.length == 2){
      this.address = "Calle 12 de Diciembre. 28 y Calle Av. Quito.";
    }else if(selected.find(x => x == 1)){
      this.address = "Calle 12 de Diciembre. 28"
    }else{
      this.address = "Calle Av. Quito."
    }
    this.order = this.form.value;
    console.log(this.order);
    
    this.order.address = this.address;
    this.order.distributorName = this.distributorSe;
    this.order.typeName = this.typeSe;
    console.log(this.address);
    this.order.address = this.address;
    console.log(this.order.address);
    
  }

  handleOk(): void {
    this.isVisible = false;
    this.msg.success("Enviado Correctamente");
    this.delete();
    this.orders = [...this.orders, this.order];
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  cancelForm(){
    this.delete();
    this.showNew = false;
  }
}
