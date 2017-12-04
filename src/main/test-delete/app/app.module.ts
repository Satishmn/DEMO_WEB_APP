import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { DetailsComponent } from './components/details/details.component';
import { UnassignedComponent } from './components/unassigned/unassigned.component';
import { MycasesComponent } from './components/mycases/mycases.component';
import { MoreComponent } from './components/more/more.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';

import { UnassignedService } from './services/unassigned/unassigned.service';
import { MycasesService } from './services/mycases/mycases.service';
import { Unassignes2Service } from './services/unassigned2/unassignes2.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    DetailsComponent,
    UnassignedComponent,
    MycasesComponent,
    MoreComponent,
    UserComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NoopAnimationsModule,
    // MatCheckboxModule,
    // MatDialogModule,
    // MatButtonModule,
    RouterModule.forRoot([
      {path: '', component: LoginComponent },
      {path: 'home', component: HomeComponent },
      {path: 'details', component: DetailsComponent },
      {path: 'about', component: AboutComponent},
      {path: 'unassigned', component: UnassignedComponent},
      {path: 'my-cases', component: MycasesComponent},
      {path: 'more', component: MoreComponent},
      {path: 'user', component: UserComponent},
      {path: 'more/:id', component: MoreComponent}
    ])
  ],
  providers: [MycasesService, UnassignedService, Unassignes2Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
