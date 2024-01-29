import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  /* Columnas */
  displayedColumns: string[] = [
    'id', 
    'firstName', 
    'lastName', 
    'email', 
    'dob', 
    'gender', 
    'education', 
    'company', 
    'experience', 
    'package',
    'action'
  ];

  /* Elementos de la tabla */
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  /* Obtener lista de empleados al iniciar la web */
  ngOnInit(): void {
    this.getEmployeeList()
  }


  /* filtrar */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  constructor(
    private _dialog: MatDialog,
    private _empService: EmployeeService,
    private _coreService: CoreService
  ){}

  /* Abrir dialog */
  openAddEditEmpForm(){
    const dialogRef = this._dialog.open(EmpAddEditComponent)
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList()
        }
      },
      error: (err) =>{
        console.error(err)
      }
    })
  }

  /* Obtener la lista de empleados */
  getEmployeeList(){
    this._empService.getEmployeeList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) =>  {
        console.error(err)
      }
    })
  }

  /* Borrar empleado */
  deleteEmployee(id: number){
    this._empService.deleteEmployee(id).subscribe({
      next: () => {
        alert('Employee deleted')
        this.getEmployeeList()
      },
      error: (err) =>  {
        console.error(err)
      }
    })
  }


  openEditForm(data: any){
    const dialogRef = this._dialog.open(EmpAddEditComponent, {
      data
    })
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList()
        }
      },
      error: (err) =>{
        console.error(err)
      }
    })
  }
}
