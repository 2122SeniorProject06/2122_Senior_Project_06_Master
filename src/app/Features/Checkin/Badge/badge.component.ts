import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

export interface DialogData {
    animal: string;
    name: string;
  }

@Component({
    selector: 'Badge',
    templateUrl: './badge.component.html'
  })
  export class Badge {
  
    constructor(
      public dialogRef: MatDialogRef<Badge>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
      private router: Router,
      private route: ActivatedRoute) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
      //Main Menu
  goToMain() {
    this.router.navigateByUrl('/main-menu');
  }

  }