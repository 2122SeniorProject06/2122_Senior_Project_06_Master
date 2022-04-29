import {Component, HostListener, OnInit,} from '@angular/core';
import { Router } from '@angular/router';
import { JournalModel } from '../../../../Models/JournalModel';
import { JournalService } from '../../Services/journal.service';

/** @title Form field theming */
@Component({
  selector: 'form-field-theming-example',
  templateUrl: 'viewonejournal.component.html',
  styleUrls: ['viewonejournal.component.css'],
  providers: [JournalModel]
})
export class ViewOneJournalComponent {
  data: any;
  journal: JournalModel = new JournalModel();
  isLoaded: boolean = false;
  constructor(private JournalService: JournalService, private router: Router) {}

  ngOnInit(){
    console.log(this.data);
    console.log(this.JournalService.viewOneJournalId);
    this.data = this.JournalService.viewOneJournalId;
    console.log(this.data);
    this.journal.journalID = "ex";
    this.viewJournal(this.data);
  }
  viewJournal(data: any){
    console.log(data);
    this.JournalService.getJournalById(data).subscribe((myjournal) => {
      //myjournal as JournalModel;
      console.log(myjournal);
      console.log(myjournal.title?.toString());
      console.log("Journal Title" + this.journal.title);
      //getting the journal successfully but after this point everything is null
      console.log("Updated " + myjournal.lastUpdated);
      this.journal.lastUpdated = myjournal.lastUpdated;
      console.log(this.journal.lastUpdated + " " + myjournal.lastUpdated);
      this.journal.title = myjournal.title;
      this.journal.body = myjournal.body;
      this.journal!.journalID = myjournal.journalID;
      this.isLoaded = true;
      console.log(myjournal);

    })


  }

      /**
     * Unblurs the background image on leaving the page.
     * @param event Event that triggers the unblurring.
     */
       @HostListener('window:popstate', ['$event'])
       onPopState(event : Event) {
        this.viewJournal(this.data)
       }

  delete(id: any){
    this.JournalService.deleteJournalById(id).subscribe(res => {
      console.log(res);
      this.router.navigateByUrl('view-journals');
    })
  }
  goToMain(){
    this.router.navigateByUrl('main-menu');
  }
  goToEdit(id: any) {
    //Implement a dialog box for editing
    this.JournalService.getJournalById(id).subscribe(res =>{
      console.log(res + " " + id);
    })
    this.router.navigateByUrl('journal');
  }
  clear() {
  //not needed for this
  }


}

