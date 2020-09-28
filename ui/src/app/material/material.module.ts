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
import { MatDialogModule } from '@angular/material/dialog';

import {MatCardModule} from '@angular/material/card';


@NgModule({
  imports:[
    CommonModule,FormsModule,MatIconModule,MatInputModule,MatButtonModule,MatToolbarModule,
    MatTableModule,MatMenuModule,MatPaginatorModule,MatRadioModule,MatCardModule,MatDialogModule
  ],
  exports:[
    CommonModule,FormsModule,MatIconModule,MatInputModule,MatButtonModule,MatToolbarModule,
    MatTableModule,MatMenuModule,MatPaginatorModule,MatRadioModule,MatCardModule,MatDialogModule
  ]
})

export class MaterialModule{}

