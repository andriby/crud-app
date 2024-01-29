import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  /* importar http */
  constructor(private _httpd: HttpClient) { }

  /* Agregar empleados */
  addEmployee(data: any): Observable<any>{
    return this._httpd.post('http://localhost:3000/employees', data)
  }

  updateEmployee(id: number, data: any): Observable<any>{
    return this._httpd.put(`http://localhost:3000/employees/${id}`, data)
  }


  /* Obtener lista de empleados */
  getEmployeeList(): Observable<any>{
    return this._httpd.get('http://localhost:3000/employees')
  }

  /* Eliminar empleados */
  deleteEmployee(id: number): Observable<any>{
    return this._httpd.delete(`http://localhost:3000/employees/${id}`)
  }
}
