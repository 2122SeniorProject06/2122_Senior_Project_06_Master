import { getTestBed } from '@angular/core/testing';
import { JournalModel } from '../../../../Models/JournalModel';
import { FormsModule, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JournalService } from '../../Services/journal.service';
import { ActivityMetric } from 'Models/MetricsModel';

@Component({
  selector: 'journal-feature',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})

export class JournalComponent implements OnInit {
  journalForm: any;
  userId: any;
  methodOptions: string[] = ['Focus', 'Ground', 'Relax', 'Breathe', 'Encourage', 'Check In', 'None'];
  attack: boolean[] = [true, false];
  effective: boolean[] = [true, false];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private JournalService: JournalService
    ) { }

    ngOnInit(): void {
      this.journalForm = this.formBuilder.group({
        HadAttack: [''],
        Method: [''],
        WasEffective: [''],
        Title: [''],
        Body: ['']

      });
    }

    get f() {
      return this.journalForm.controls;
    }
/*Andrew helped with debugging*/
    onSubmit() {
      const journalModel = new FormData();
      journalModel.append('HadAttack', this.journalForm.get('HadAttack').value);
      journalModel.append('Method', this.journalForm.get('Method').value);
      journalModel.append('WasEffective', this.journalForm.get('WasEffective').value);
      journalModel.append('Title', this.journalForm.get('Title').value);
      journalModel.append('Body', this.journalForm.get('Body').value);

      const journal = new JournalModel();
      journal.ActivityMetric = new ActivityMetric();
      journal.ActivityMetric.hadAttack = this.journalForm.get('HadAttack').value;
      journal.ActivityMetric.activity = this.journalForm.get('Method').value;
      journal.ActivityMetric.wasEffective = this.journalForm.get('WasEffective').value;
      journal.title = this.journalForm.get('Title').value;
      journal.body = this.journalForm.get('Body').value;
      this.userId = localStorage.getItem('userId');
      journal.userID = this.userId;
      console.log(journal.userID);
      this.JournalService.createJournal(journal).subscribe((res) => {
          console.log(res);

          this.goToJournals();

      })

    }

goToMain() {
  this.router.navigateByUrl('/main-menu');
}

goToJournals(){
  this.router.navigate(['..'], {relativeTo: this.route});
}

}

