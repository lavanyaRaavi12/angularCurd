import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  getRequest() {
    throw new Error('Method not implemented.');
  }

  constructor(private http:HttpClient) { }
   getEmployees(pageno,pagesize):Observable<any>{
return this.http.get(`http://192.168.2.229:9090/emp/getallemployess/${pageno}/${pagesize}`);
  }

  addEmplyee(data):Observable<any>{
    return this.http.post ('http://192.168.2.229:9090/emp/createemp',data);
  }
  updateEmplyee(data):Observable<any>{
    return this.http.post ('http://192.168.2.229:9090/emp/createemp',data);
  }
  
  deleteEmplyee(data):Observable<any>{
    return this.http.delete ('http://192.168.2.229:9090/emp/deleteemp/'+ data,data);
  }
  

}

