import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from '../app.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  dataSource= new MatTableDataSource<any>();
  displayedColumns: string[] = ['RollNo','Name', 'Dob','ContactNumber','Joining Date'];
@ViewChild(MatPaginator) paginator:MatPaginator;
  constructor(private appService:AppService) { }

  ngOnInit(): void {
    let obj = {
      "jsonrpc": "2.0",
      "method": "UserService.GetStudent",
      "params": [{}],
      "id": 1
    }
    this.appService.getPost(obj).subscribe(data =>{
      console.log(data.result)
      if(data.result!=null){
        this.dataSource= new MatTableDataSource<any>(data.result)
        this.dataSource.paginator=this.paginator;
      }
    })
  }

}


