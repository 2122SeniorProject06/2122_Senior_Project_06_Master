import {Component, Inject} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {ThemePalette} from '@angular/material/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MantraBadge } from './MantraBadge/mantrabadge.componet';

@Component({
  selector: 'Mantra',
  templateUrl: './mantra.component.html',
  styleUrls: ['./mantra.component.css'],
})

export class MantraComponent {

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute){}
  
  //Badge
  openDialog(): void {
    const dialogRef = this.dialog.open(MantraBadge, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("Test");
    })
  }
  
  //Routes to Main Menu
  goToMain() {
    this.router.navigateByUrl('/main-menu');
  }

  //Refresh Page
  restartFeature() {
    window.location.reload();
  }
  
  //Display Date
  currentDate = new Date();
}
