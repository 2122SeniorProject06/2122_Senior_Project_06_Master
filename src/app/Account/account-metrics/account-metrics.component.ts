import { MerticsModel } from './../../../../Models/MetricsModel';
import { Chart, ChartData, ChartType, ChartOptions} from 'chart.js';
import { MetricsService } from './../../Services/metrics.service';
import { Component, Input, OnChanges, OnInit, SimpleChanges, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRegistration } from '../../../../Models/UserModels';
@Component({
    selector: 'app-account-metrics',
    templateUrl: './account-metrics.component.html',
    styleUrls: ['./account-metrics.component.css'],
    //imports: [NgChartsModule]
})

export class AccountMetricsComponent implements OnInit {
  @Input() accountInfo: UserRegistration;
  totalUses: number[] = [];
  mostHelpful: number[] = [];
  metricsLoaded: boolean = false;
  helpfulLoaded: boolean = false;


  // Radar
   salesData: ChartData<'radar'> = {
    labels: ['Focus', 'Ground', 'Relax', 'Breathe', 'Encourage', 'Check In'],
    datasets: [
      { label: 'Total Uses', data: this.totalUses },
      { label: 'Most Helpful', data: this.mostHelpful },
    ],
   };

   chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Activity Metrics',
      },
    },
  };
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private MetricsService: MetricsService) {
      this.accountInfo = new UserRegistration();
      console.log("i'm in the metrics");
    }

  ngOnInit() {
    let userid = localStorage.getItem('userId') as string;
    console.log("Test value 3 ");
    this.MetricsService.getTotalOccurances(userid).subscribe(metrics => {
      console.log("Test value 1");
      this.totalUses = metrics as number[];
      console.log("Test value");
      console.log(this.totalUses);
      this.metricsLoaded = true;
      this.updateGraph();
    });

    this.MetricsService.getOccurances(userid).subscribe(effective => {
      this.mostHelpful = effective as number[];
      console.log(this.mostHelpful);
      this.helpfulLoaded = true;
      this.updateGraph();
    });
  }

  updateGraph(){
    this.salesData = {
      labels: ['Focus', 'Ground', 'Relax', 'Breathe', 'Encourage', 'Check In'],
      datasets: [
        { label: 'Total Uses', data: this.totalUses },
        { label: 'Most Helpful', data: this.mostHelpful },
      ],
     };
  }
}

// export class AccountMetricsComponent{
//     @Input() accountInfo: UserRegistration;
//     metricsLoaded: boolean = false;
//     helpfulLoaded: boolean = false;
//     userid?: any;
//     data?: any;
//     label: string = 'Most Useful';
//     mostEffective? : any;

// //make this a Chart?
//      public chartType: ChartType = "radar";
//      public chartDatasets = [
//        this.data, this.label
//     ];
//     public chartLabels: string[] = ['Focus', 'Ground', 'Relax', 'Breathe', 'Encourage', 'Check In'];
//     public chartOptions: any = {
//       responsive: true
//     }
//     public chartColors = [
//       {
//         backgroundColor: 'rgba(105, 0, 132, .2)',
//         borderColor: 'rgba(200, 99, 132, .7)',
//         borderWidth: 2,
//       }]

//     constructor(
//       private router: Router,
//       private route: ActivatedRoute,
//       private MetricsService: MetricsService) {
//        this.accountInfo = new UserRegistration();
//        console.log("i'm in the metrics");
//      }

//      ngOnInit() {
//       this.userid = localStorage.getItem('userId');
//       console.log("Test value 3 ");
//        this.MetricsService.getTotalOccurances(this.userid).subscribe(metrics => {
//         console.log("Test value 1");
//         metrics = this.data;
//         console.log("Test value");
//         console.log(metrics + this.data);
//         this.metricsLoaded = true;
//        });

//        this.MetricsService.getOccurances(this.userid).subscribe(effective => {
//          this.mostEffective = effective;
//          console.log(effective + this.mostEffective);
//          this.helpfulLoaded = true;
//        })
//      }
//      chartClicked(event: any): void {
//        console.log(event);
//      }

//      chartHovered(event:any): void {
//        console.log(event);
//      }

// }
