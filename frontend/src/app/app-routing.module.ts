import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
// import { AddCardComponent } from './add-card/add-card.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { CardDetailsComponent } from './components/card-details/card-details.component';
import { AddCardComponent } from './components/add-card/add-card.component';

const routes: Routes = [
  // { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  // { path: 'user', component: AddCardComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'cards', component: CardListComponent},
  { path: 'cards/:id', component: CardDetailsComponent},
  { path: 'add', component: AddCardComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
