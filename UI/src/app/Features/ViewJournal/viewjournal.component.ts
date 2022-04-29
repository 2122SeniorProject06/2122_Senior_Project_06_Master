import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { JournalService } from '../../Services/journal.service';
import { Component, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatTableModule, MatCellDef, MatColumnDef, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { JournalModel } from '../../../../Models/JournalModel';


@Component({
  selector: 'view-journal',
  templateUrl: './viewjournal.component.html',
  styleUrls: [ './viewjournal.component.css' ],
  providers: [JournalModel]
})
export class ViewJournalsComponent {

  constructor(private JournalService: JournalService,
              private route: ActivatedRoute,
              private router: Router) {
    if(localStorage.getItem('userId') == null){
      localStorage.setItem("loginRoute", router.url);
      localStorage.setItem("loginName", "REFLECT ACTIVITY");
      this.router.navigateByUrl('/login');
    }
    console.log("help");
  }

  displayedColumns = ['LastUpdated', 'Title', 'Body', 'Action'];
  dataSource = new MatTableDataSource<JournalModel[]>();
  journals?: any;
  journal?: any;
  userId?: any; //this will be the user's id when they log in
 // @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log("help again");
    this.getJournals();
  }

  ngAfterViewInIt() {
    //this.dataSource.paginator = this.paginator;
  }
    getJournals() {
      //right now userid is null
      //valueOf needed?
      this.userId = localStorage.getItem('userId');
      console.log(this.userId);
      this.JournalService.getJournal(this.userId).subscribe((journals) => {
        this.journals = journals;
        if (this.journals != null){//if i receive data
          console.log(this.journals);
        this.dataSource.data = this.journals;
        }
        //add if i don't receive data because they have no journals, route them to add one
      })
    }
    getJournal(id: string){
      console.log(id);
      this.JournalService.getJournalById(id).subscribe(res => {
          this.journal = res;
          console.log(this.journal);
          console.log("routing to view one");
          this.router.navigateByUrl('view-one-journal');
      });

    }

    logout(){
      localStorage.clear();
      this.goToMainMenu();
    }

    goToViewOne(){
      console.log("going to view one");
      this.router.navigateByUrl('view-one-journal');
    }

    goToMainMenu(){
      this.router.navigateByUrl('main-menu');
    }

    goToAddJournal(){
      this.router.navigate(['../CreateNew'], {relativeTo: this.route});
    }

  }


//change the name to match better




