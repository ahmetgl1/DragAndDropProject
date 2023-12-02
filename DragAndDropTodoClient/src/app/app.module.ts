import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CdkDropList,
    ToastrModule.forRoot(),
    MatIconModule, 
    SweetAlert2Module,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    CdkDrag,
    HttpClientModule,
    NgFor
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
