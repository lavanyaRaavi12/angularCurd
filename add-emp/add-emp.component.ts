import { Component, OnInit } from '@angular/core';
import { Employee } from '../app.component';
import { EmployeeService } from '../employee.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";  


@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.css']
})
export class AddEmpComponent implements OnInit {
  data:any
  employees;
  employeedata: any;
  TotalEmployeeList: any;

  pagesize = 5;
  pageno = 0;
  activePage: number;
  submitted: boolean;
  currentPage: any;
  p: number = 1;

 constructor(private empserive: EmployeeService ,private formbuilder:FormBuilder) { }
 crudform=this.formbuilder.group({
  // id:[],
  name:['', Validators.required],
  salary:['', Validators.required],
  city:['', Validators.required],
  phone:['', [Validators.required, Validators.minLength(6)]]
})
 ngOnInit() {
    this.getAll();
 }
 getAll() {
    this.empserive.getEmployees(this.pageno,this.pagesize)
      .subscribe(response => {
        this.employees = response.body;
        this.TotalEmployeeList = this.employees.data;
        console.log(this.TotalEmployeeList);
      });
  }
  Adding_Data(){
    this.empserive.addEmplyee(this.crudform.value).subscribe(res=>{
    this. getAll();
  })
    this.crudform.reset();
  }
  editEmployee(emp){
    localStorage.removeItem('editEmpId');  
    localStorage.setItem('editEmpId', emp.id);  
    this.crudform.patchValue({
      id: emp.id,
      name: emp.name,
      salary: emp.salary,
      city: emp.city,
      phone: emp.phone
    })
   
  }
  updateemployee(){
    let obj={
       id:  parseInt(localStorage.getItem('editEmpId')),
        name: this.crudform.get('name').value,
        salary: this.crudform.get('salary').value,
        city: this.crudform.get('city').value,
        phone: this.crudform.get('phone').value,
    }
   this.empserive.updateEmplyee(obj).subscribe(res=>{
    this.getAll();
    });
  
   this.crudform.reset();
  }
  delete(emp){
    console.log(emp.id);
    this.empserive.deleteEmplyee(emp.id).subscribe(res=>{
      this.getAll()
    });
  }
  get f() { return this.crudform.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.crudform.invalid) {
          return;
      }

      alert('SUCCESS!! :-)')
  }
 
  pageChange(pageno) {
    this.currentPage = pageno;
    this.getAll();
    console.log(pageno);
     }
}
