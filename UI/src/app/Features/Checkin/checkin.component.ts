import {Component, Inject} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ThemePalette} from '@angular/material/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { Badge } from './Badge/badge.component';

export interface Task {
  taskname: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'Checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css'],

})

export class CheckInComponent {

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute){}

  //Badge
  openDialog(): void {
    const dialogRef = this.dialog.open(Badge, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("Test");
    })
  }

  //Main Menu
  goToMain() {
    this.router.navigateByUrl('/main-menu');
  }
  //Display Date
  currentDate = new Date();

  ngAfterViewInit(): void {
    document.getElementsByClassName('mat-tab-header-pagination-before')[0].remove();
    document.getElementsByClassName('mat-tab-header-pagination-after')[0].remove();
  }

  //Refresh Page
  restartCheckIn() {
    window.location.reload();
  }

  //Task Items Check List
  task: Task = {
    taskname: 'Day Completed',
    completed: false,
    color: 'accent',
    subtasks: [
      {taskname: 'Make the Bed', completed: false, color: 'primary'},
      {taskname: 'Take a walk', completed: false, color: 'primary'},
      {taskname: 'Read 10 pages of a book', completed: false, color: 'primary'},
    ],
  };

  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => (t.completed = completed));
  }
}