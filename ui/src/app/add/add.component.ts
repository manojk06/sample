import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from '../app.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  dataSource= new MatTableDataSource<any>();
  obj={};
  displayedColumns: string[] = ['Email', 'Name', 'Role', 'Status','CreatedDate'];
@ViewChild(MatPaginator) paginator:MatPaginator;
  constructor(private router:Router,private route:ActivatedRoute,private service:AppService) { }

  ngOnInit(): void {
    // this.obj = {
    //   "jsonrpc": "2.0",
    //   "method": "RpcService.GetUser",
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

  sumbit(){

  }
  cancel(){
  }

}
