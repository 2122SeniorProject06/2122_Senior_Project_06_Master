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
    selector: 'MantraBadge',
    templateUrl: './mantrabadge.component.html'
  })
  export class MantraBadge {
  
    constructor(
      public dialogRef: MatDialogRef<MantraBadge>,
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