import { Component, OnInit } from '@angular/core';
import { UnassignedService } from '../../services/unassigned/unassigned.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.css']
})
export class MoreComponent {
  casesData;

  constructor(
    public data: UnassignedService,
    private route: ActivatedRoute,
    private router: Router,

  ) {
    this.casesData = this.data.getUnassignedCases();
    console.log(this.casesData);
    this.route.params.subscribe((params) => {
      console.log(params);
    });
  }
}
