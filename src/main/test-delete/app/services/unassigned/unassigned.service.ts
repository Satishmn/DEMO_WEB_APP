import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UnassignedService {
  unassignedCases = [
    {
      caseNo: 100011112,
      drugName: "Prevymis (letermovir)",
      description: "For CMV Prophylaxis treatment",
      category: "Infection Drug",
      submittedBy: "Merck & Co., Inc.",
      dateReceived: "11/22/17",
      dateAssigned: "11/23/2017",
      channel: "Electronic Gateway",
      status: "Phase 3 completed"
    },
  ];

  constructor( public http: Http) { }
  getUnassignedCases() {
    return this.unassignedCases;
  }

  getData(){
    return this.http.get('http://jsonplaceholder.typicode.com/users').map(res =>{
      res.json()
    });
  }

}
