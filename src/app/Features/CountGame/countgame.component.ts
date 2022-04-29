import {Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountGameService } from 'src/app/Services/countgame.service';

@Component({
  selector: 'CountGame',
  templateUrl: './countgame.component.html',
  styleUrls: ['./countgame.component.css'],
})
export class CountGameComponent {

  constructor(private CountGameService: CountGameService, 
    private router: Router,
    private route: ActivatedRoute,
  ){}

    countVal?: any;
    startVal?: any;
    val1?: any;
    val2?: any;
    val3?: any;
    val4?: any;
    val5?: any;
    val6?: any;
    val7?: any;
    val8?: any;
    val9?: any;
    val10?: any;
    val11?: any;
    val12?: any;
    val13?: any;
    val14?: any;
    val15?: any;


    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      console.log("help again");
      this.getCountValue();
    }

  //Get counting and starting value
  getCountValue(){
    this.CountGameService.getCountValue(100).subscribe((res: any) => {
      this.countVal = res;
      console.log(this.countVal);

      //get start value that corresponds to the count value
      if (this.countVal == 3){
        this.startVal = 15;
      } else if(this.countVal == 5){
          this.startVal = 25;
      } else if(this.countVal == 15){
        this.startVal = 75;
      } else if(this.countVal == 20){
        this.startVal = 100;
      } else if(this.countVal == 30){
        this.startVal = 150;
      } console.log(this.startVal);

    // get value 1
    if (this.countVal == 3){
      this.val1 = this.startVal - 2;
    } else if(this.countVal == 5){
      this.val1 = this.startVal - 3;
    } else if(this.countVal == 15){
      this.val1 = this.startVal - 5;
    } else if(this.countVal == 20){
      this.val1 = this.startVal - 15;
    } else if(this.countVal == 30){
      this.val1 = this.startVal - 25;
    } console.log(this.val1);

    //get value 2
    if (this.countVal == 3){
      this.val2 = this.startVal - 1;
    } else if(this.countVal == 5){
      this.val2 = this.startVal - 2;
    } else if(this.countVal == 15){
      this.val2 = this.startVal - 10;
    } else if(this.countVal == 20){
      this.val2 = this.startVal - 10;
    } else if(this.countVal == 30){
      this.val2 = this.startVal - 20;
    } console.log(this.val2);

    //get value 3
    if (this.countVal == 3){
      this.val3 = this.startVal - 3;
    } else if (this.countVal == 5){
      this.val3 = this.startVal - 5;
    } else if(this.countVal == 15){
      this.val3 = this.startVal - 15;
    } else if(this.countVal == 20){
      this.val3 = this.startVal - 20;
    } else if(this.countVal == 30){
      this.val3 = this.startVal - 30;
    } console.log(this.val3);

    //get value 4
    if (this.countVal == 3){
      this.val4 = this.val3 - 2;
    } else if (this.countVal == 5){
      this.val4 = this.val3 - 4;
    } else if(this.countVal == 15){
      this.val4 = this.val3 - 10;
    } else if(this.countVal == 20){
      this.val4 = this.val3 - 10;
    } else if(this.countVal == 30){
      this.val4 = this.val3 - 15;
    } console.log(this.val4);

    //get value 5
    if (this.countVal == 3){
      this.val5 = this.val3 - 3;
    } else if (this.countVal == 5){
      this.val5 = this.val3 - 5;
    } else if(this.countVal == 15){
      this.val5 = this.val3 - 15;
    } else if(this.countVal == 20){
      this.val5 = this.val3 - 20;
    } else if(this.countVal == 30){
      this.val5 = this.val3 - 30;
    } console.log(this.val5);    

    //get value 6
    if (this.countVal == 3){
      this.val6 = this.val3 - 1;
    } else if (this.countVal == 5){
      this.val6 = this.val3 - 3;
    } else if(this.countVal == 15){
      this.val6 = this.val3 - 5;
    } else if(this.countVal == 20){
      this.val6 = this.val3 - 15;
    } else if(this.countVal == 30){
      this.val6 = this.val3 - 10;
    } console.log(this.val6);    

    //get value 7
    if (this.countVal == 3){
      this.val7 = this.val5 - 2;
    } else if (this.countVal == 5){
      this.val7 = this.val5 - 4;
    } else if(this.countVal == 15){
      this.val7 = this.val5 - 10;
    } else if(this.countVal == 20){
      this.val7 = this.val5 - 10;
    } else if(this.countVal == 30){
      this.val7 = this.val5 - 15;
    } console.log(this.val7);

    //get value 8
    if (this.countVal == 3){
      this.val8 = this.val5 - 1;
    } else if (this.countVal == 5){
      this.val8 = this.val5 - 3;
    } else if(this.countVal == 15){
      this.val8 = this.val5 - 5;
    } else if(this.countVal == 20){
      this.val8 = this.val5 - 15;
    } else if(this.countVal == 30){
      this.val8 = this.val5 - 10;
    } console.log(this.val8); 

    //get value 9
    if (this.countVal == 3){
      this.val9 = this.val5 - 3;
    } else if (this.countVal == 5){
      this.val9 = this.val5 - 5;
    } else if(this.countVal == 15){
      this.val9 = this.val5 - 15;
    } else if(this.countVal == 20){
      this.val9 = this.val5 - 20;
    } else if(this.countVal == 30){
      this.val9 = this.val5 - 30;
    } console.log(this.val9);   

    //get value 10
    if (this.countVal == 3){
      this.val10 = this.val9 - 3;
    } else if (this.countVal == 5){
      this.val10 = this.val9 - 5;
    } else if(this.countVal == 15){
      this.val10 = this.val9 - 15;
    } else if(this.countVal == 20){
      this.val10 = this.val9 - 20;
    } else if(this.countVal == 30){
      this.val10 = this.val9 - 30;
    } console.log(this.val10); 

    //get value 11
    if (this.countVal == 3){
      this.val11 = this.val9 - 2;
    } else if (this.countVal == 5){
      this.val11 = this.val9 - 4;
    } else if(this.countVal == 15){
      this.val11 = this.val9 - 10;
    } else if(this.countVal == 20){
      this.val11 = this.val9 - 10;
    } else if(this.countVal == 30){
      this.val11 = this.val9 - 15;
    } console.log(this.val11);

    //get value 12
    if (this.countVal == 3){
      this.val12 = this.val9 - 1;
    } else if (this.countVal == 5){
      this.val12 = this.val9 - 3;
    } else if(this.countVal == 15){
      this.val12 = this.val9 - 5;
    } else if(this.countVal == 20){
      this.val12 = this.val9 - 15;
    } else if(this.countVal == 30){
      this.val12 = this.val9 - 10;
    } console.log(this.val12); 

    //get value 13
    if (this.countVal == 3){
      this.val13 = this.val10 - 2;
    } else if (this.countVal == 5){
      this.val13 = this.val10 - 4;
    } else if(this.countVal == 15){
      this.val13 = this.val10 - 10;
    } else if(this.countVal == 20){
      this.val13 = this.val10 - 10;
    } else if(this.countVal == 30){
      this.val13 = this.val10 - 15;
    } console.log(this.val13);

    //get value 14
    if (this.countVal == 3){
      this.val14 = this.val10 - 3;
    } else if (this.countVal == 5){
      this.val14 = this.val10 - 5;
    } else if(this.countVal == 15){
      this.val14 = this.val10 - 15;
    } else if(this.countVal == 20){
      this.val14 = this.val10 - 20;
    } else if(this.countVal == 30){
      this.val14 = this.val10 - 30;
    } console.log(this.val14); 

    //get value 15
    if (this.countVal == 3){
      this.val15 = this.val10 - 1;
    } else if (this.countVal == 5){
      this.val15 = this.val10 - 3;
    } else if(this.countVal == 15){
      this.val15 = this.val10 - 5;
    } else if(this.countVal == 20){
      this.val15 = this.val10 - 15;
    } else if(this.countVal == 30){
      this.val15 = this.val10 - 10;
    } console.log(this.val15); 
    })
  }

  //Go to main menu
  goToMain() {
    this.router.navigateByUrl('/main-menu');
  }

  //Color Changing 
  newColor = false;
  toggleColorOne() {
    this.newColor = !this.newColor;
    this.newColor = true;
  }

  newColorTwo=false;
  toggleColorTwo() {
    this.newColorTwo = !this.newColorTwo;
    this.newColorTwo = true;
  }

  newColorThree=false;
  toggleColorThree() {
    this.newColorThree = !this.newColorThree;
    this.newColorThree = true;
  }

  newColorFour=false;
  toggleColorFour() {
    this.newColorFour = !this.newColorFour;
    this.newColorFour = true;
  }

  newColorFive=false;
  toggleColorFive() {
    this.newColorFive = !this.newColorFive;
    this.newColorFive = true;
  }

  //Restart
  restartCount() {
    window.location.reload();
  }
}