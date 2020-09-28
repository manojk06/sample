import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common'


import {FormsModule}from '@angular/forms'
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatRadioModule} from '@angular/material/radio';



@NgModule({
  imports:[
    CommonModule,FormsModule,MatIconModule,MatInputModule,MatButtonModule,MatToolbarModule,
    MatTableModule,MatMenuModule,MatPaginatorModule,MatRadioModule,
  ],
  exports:[
    CommonModule,FormsModule,MatIconModule,MatInputModule,MatButtonModule,MatToolbarModule,
    MatTableModule,MatMenuModule,MatPaginatorModule,MatRadioModule,
  ]
})

export class MaterialModule{}

