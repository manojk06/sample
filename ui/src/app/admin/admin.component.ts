import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  dataSource= new MatTableDataSource<any>();
  displayedColumns: string[] = ['UserName','Name', 'Role','ContactNumber'];
@ViewChild(MatPaginator) paginator:MatPaginator;
  constructor(private router:Router,private route:ActivatedRoute,private appservice:AppService) { }

  ngOnInit(): void {
    let obj = {
      "jsonrpc": "2.0",
      "method": "UserService.GetAdmin",
      "params": [{}],
      "id": 1
    }
    this.appservice.getPost(obj).subscribe(data =>{
      if(data.result!=null){
        this.dataSource= new MatTableDataSource<any>(data.result)
        this.dataSource.paginator=this.paginator;
      }
    })
  }
}

