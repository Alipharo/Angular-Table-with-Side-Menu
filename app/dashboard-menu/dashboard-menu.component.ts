import {Component, OnInit, Input, Output} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {DashboardService} from '../dashboard.service';

@Component({
  selector: 'dashboard-menu',
  animations: [
    trigger('openMenu', [
      state('open', style({
        width: '500px',
        opacity: 1,
      })),
      state('closed', style({
        width: '0',
        opacity: 0,
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('1s')
      ]),
    ]),
  ],
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.css']
})
export class DashboardMenuComponent implements OnInit {
  public showMenu = false;
  public columns = [{show:true, name:'position'}, {show:true, name:'name'}, {show:true, name:'weight'}, {show:true, name:'symbol'}];
  public displayedColumns: string[];

  constructor(private dash: DashboardService) {
  }

  ngOnInit() {

  }

  public toggleColumn(column) {
    column.show = !column.show;
  }

  public searchColumn(column) {
    column.search = !column.search;
  }

  public moveColumn(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }

  public getColumns() {
    return this.columns.filter(x => x.show).map(x => x.name);
  }

  filterPredicate() {
    let data = this.dash.ELEMENT_DATA;
    this.dash.dataSource.data = data.filter(d => this.columns.every(x => !x.filter || ("" + d[x.name]).includes(x.filter)));
  }

}