import { Component, OnInit } from '@angular/core';
// import { MatDialog } from '@angular/material';
import {UserComponent} from '../user/user.component';
// import { Unassignes2Service } from '../../services/unassigned2/unassignes2.service';
import { UnassignedService } from '../../services/unassigned/unassigned.service';

@Component({
  selector: 'app-unassigned',
  templateUrl: './unassigned.component.html',
  styleUrls: ['./unassigned.component.css',
    './styles/css/bootstrap.min.css',
    './styles/css/swim-kit.css?v=032817']
})
export class UnassignedComponent {
  output;
  constructor( public data: UnassignedService ) { 
    this.data.getData().subscribe(caseData =>{
      console.log(caseData);
    });
  }
  //
  // openDialog() {
  //   this.dialog.open(UserComponent);
  // }
    // getData(){
    //   this.data.getData().subscribe(caseData =>{
    //     console.log(caseData);
    //   })
    // }

}
