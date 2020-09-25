import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AppService } from '../app.service';

@Component({
  selector: 'app-emp',
  templateUrl: './emp.component.html',
  styleUrls: ['./emp.component.css']
})
export class EmpComponent implements OnInit {
  dataSource= new MatTableDataSource<any>();
  obj={};
  displayedColumns: string[] = ['EmpId', 'EmailId', 'Name','Doj', 'ProjectName'];
@ViewChild(MatPaginator) paginator:MatPaginator;
  constructor(private service:AppService) { }

  ngOnInit(): void {

    // this.obj = {
    //   "jsonrpc": "2.0",
    //   "method": "RpcService.GetEmp",
    //   "params": [{}],
    //   "id": 1
    // }
    // this.service.getPost(this.obj).subscribe(data =>{
    //   console.log(data.result)
    //   if(data.result!=null){
    //     this.dataSource= new MatTableDataSource<any>(data.result)
    //     this.dataSource.paginator=this.paginator;
    //   }
    // })
  }

}
