import {Component, OnInit, Input, Output} from '@angular/core';
import {DashboardService} from '../dashboard.service';

/**
 * @title Table with sticky header
 */
@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.component.css'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  public dataSource;
  constructor(private dash: DashboardService) {}
  ngOnInit() {
    this.dataSource = this.dash.dataSource;
  }
}

