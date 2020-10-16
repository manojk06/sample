import { DatePipe } from '@angular/common';
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
  selectedRow:any;
  detail:any;
  time=new Date();
  obj :any ={date:new Date}
  count:any;
  maxDate:any;
  average:any;
  name:any;
  flag:boolean=false;
  dataSource= new MatTableDataSource<any>();
  displayedColumns: string[] = ['RollNo','Name', 'Dob','ContactNumber','Joining Date'];
@ViewChild(MatPaginator) paginator:MatPaginator;
  constructor(private appService:AppService,private datePipe:DatePipe) { 
    this.maxDate =new Date()
    this.detail={};
  }

  ngOnInit(): void {
    let obj = {
      "jsonrpc": "2.0",
      "method": "UserService.GetStudent",
      "params": [{}],
      "id": 1
    }
    this.appService.getPost(obj).subscribe(data =>{
      if(data.result!=null){
        this.dataSource= new MatTableDataSource<any>(data.result)
        this.count=data.result.length;
        this.dataSource.paginator=this.paginator;
      }
    })
  }
  getStudent(a){
    this.selectedRow=a.id;
    this.name=a.name;
    let date = this.datePipe.transform(this.time, "y-MMMM-dd")
    if (this.obj.date !== date){
                 date= this.datePipe.transform(this.obj.date, "y-MMMM-dd")
    }else{
      date = this.datePipe.transform(this.obj.date, "y-MMMM-dd")
    }
    let obj = {
      "jsonrpc": "2.0",
      "method": "UserService.GetRating",
      "params": [{"rollno":a.rollno,"time":date}],
      "id": 1
    }
    this.appService.getPost(obj).subscribe(data =>{
      if(data['result']!=null){
        this.flag=true;
         this.detail=data['result']
         if(this.detail.Breakfast !=0 && this.detail.Lunch !=0 && this.detail.Dinner !=0){
          this.average = Math.round((this.detail.Breakfast+this.detail.Lunch+this.detail.Dinner)/3)
         }
      }else{
        this.detail={}
        this.appService.addErrorMsg(data['error'])
      }
    })
    }
    clear(){
      this.flag=false;
      this.detail={}
      this.obj.date =new Date();

    }
    
}


