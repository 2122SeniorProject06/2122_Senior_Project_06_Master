import { JournalModel } from '../../../../Models/JournalModel';
import { FormsModule, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JournalService } from '../../Services/journal.service';

@Component({
  selector: 'edit-journal',
  templateUrl: './editjournal.component.html',
  styleUrls: ['./editjournal.component.css']
})

export class EditJournalComponent implements OnInit {
  editJournalForm: any;
  userId: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private JournalService: JournalService
    ) { }

    ngOnInit(): void {
      this.editJournalForm = this.formBuilder.group({
        Title: [''],
        Body: ['']
      });


    }


    get f() {
      return this.editJournalForm.controls;
    }

    onSubmit() {
      const journalModel = new FormData();
      journalModel.append('Title', this.editJournalForm.get('Title').value);
      journalModel.append('Body', this.editJournalForm.get('Body').value);

      const editjournal = new JournalModel();
      editjournal.title = this.editJournalForm.get('Title').value;
      editjournal.body = this.editJournalForm.get('Body').value;
      this.userId = localStorage.getItem('userId');
      editjournal.userID = this.userId;
      console.log(editjournal);
      this.JournalService.updateJournal(editjournal).subscribe((res) => {
          console.log(res);

          this.goToJournals();

      })

    }

goToMain() {
  this.router.navigateByUrl('/main-menu');
}

goToJournals(){
  this.router.navigateByUrl('/viewjournal');
}

}

