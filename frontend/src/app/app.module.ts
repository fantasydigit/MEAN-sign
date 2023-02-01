import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { AddCardComponent } from './components/add-card/add-card.component';
import { CardDetailsComponent } from './components/card-details/card-details.component';
import { CardListComponent } from './components/card-list/card-list.component';
// import { AddCardComponent } from './add-card/add-card.component';
// import { CardDetailComponent } from './card-detail/card-detail.component';
// import { CardListComponent } from './card-list/card-list.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    AddCardComponent,
    CardDetailsComponent,
    CardListComponent,   
    // AddCardComponent,
    // CardDetailComponent,
    // CardListComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // NgxPaginationModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
