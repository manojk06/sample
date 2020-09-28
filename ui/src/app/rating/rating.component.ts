
import { Component, OnInit, Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AppService } from '../app.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
    time = new Date()
    date: string;
    now: string;
    t1: any;
    duration: any;
    replace: any;
    value: any;
    yesterday: any;
    rollno: any;
    constructor(private datePipe: DatePipe, public toaster: ToastrService, public appService: AppService, private dialog: MatDialog) {


    }

    ngOnInit(): void {
        this.rollno = Number(this.appService.getRollNo())
        this.now = this.time.toString().split(' ')[4];
        let a = this.now.split(':')[0]
        this.t1 = Number(a)
        this.date = this.datePipe.transform(this.time, "y-MMMM-d")
        console.log(this.t1)
        console.log(this.date)
        console.log(this.now)

        this.interval();
    }
    interval() {
        if (this.t1 >= 12 && this.t1 <= 18) {
            this.duration = "Today Breakfast"

        } else if (this.t1 >= 18 && this.t1 <= 23) {
            this.duration = "Today Lunch"


        } else if (this.t1 >= 8 && this.t1 < 12) {
            this.duration = "Yesterday Dinner"

        }
    }
    feedback() {
        if (this.value !== undefined) {
            console.log(this.rollno)
            if (this.t1 >= 8 && this.t1 < 12) {
                this.yesterday = new Date(this.time.setDate(this.time.getDate() - 1))
                this.date = this.datePipe.transform(this.yesterday, "y-MMMM-d")
                console.log("for dinner feedback date", this.date)

            }
            let result = Number(this.value)
            console.log(result)
            console.log(this.date)
            let dialogRef = this.dialog.open(
                ConfirmDialogComponent, { data: { duration: this.duration, result: result } }
            );
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    let obj = { "id": 1, "method": "UserService.FeedBack", "params": [{ "rollno": this.rollno, "time": this.date, "value": result }] };
                    this.appService.getPost(obj).subscribe(data => {
                        console.log(data)
                    })
                }
            });
        } else {
            this.toaster.warning("Give ratting")
        }
    }
}



@Component({
    selector: 'confirm-dialogue',
    templateUrl: './confirm-dialogue.html'
})

export class ConfirmDialogComponent {

    constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }



}
