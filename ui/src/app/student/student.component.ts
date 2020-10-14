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
  selectedStudent:any;
  detail:any;
  duration:string;
  time=new Date();
  now:any;
  t1:any;
  dataSource= new MatTableDataSource<any>();
  displayedColumns: string[] = ['RollNo','Name', 'Dob','ContactNumber','Joining Date'];
@ViewChild(MatPaginator) paginator:MatPaginator;
  constructor(private appService:AppService) { 
    this.selectedStudent={};
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
        // this.studentDetail=data.result;
        this.dataSource= new MatTableDataSource<any>(data.result)
        this.dataSource.paginator=this.paginator;
      }
    })
  }
  getStudent(a){
    this.selectedRow=a.id;
    this.selectedStudent=a;
    this.now = this.time.toString().split(' ')[4];
    let no = this.now.split(':')[0]
    this.t1 = Number(no)
    this.interval()
    let obj = {
      "jsonrpc": "2.0",
      "method": "UserService.GetRating",
      "params": [{"rollno":a.rollno}],
      "id": 1
    }
    this.appService.getPost(obj).subscribe(data =>{
      if(data['result']!=null){
         this.detail=data['result']
      }else{
        this.detail={}
        this.duration="";
        this.appService.addErrorMsg(data['error'])
      }
    })
    }
    interval() {
      if (this.t1 >= 12 && this.t1 < 15) {
          this.duration = "Today Breakfast"

      } else if (this.t1 >= 15 && this.t1 <=23) {
          this.duration = "Today Lunch"


      } else if (this.t1 >= 8 && this.t1 < 12) {
          this.duration = "Yesterday Dinner"

      }
  }

}


