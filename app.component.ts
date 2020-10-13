import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crud-operations';
}
export class Employee {  
    id: number;  
    name: string;  
    salary: number;  
    city: string;  
    phone:number;
}  