import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//this will need to be edited to route the dynamic grid to the correct components, i added the html and css to the correct files
@Component({
  selector: 'app-loading-animation',
  templateUrl: './loading-animation.component.html',
  styleUrls: ['./loading-animation.component.css']
})

export class LoadingAnimationComponent implements OnInit, OnChanges {

  @Input() targetRoute: HTMLElement;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { 
      this.targetRoute = document.createElement('br')
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.targetRoute != null)
    {
      this.loadAndSwitch();
    }
  }

  loadAndSwitch(){
    var routeName = this.targetRoute.innerText.toUpperCase();
    var routeLink = this.targetRoute.parentElement!.id;
    document.getElementById('routeDescription')!.innerHTML = "GOING TO " + routeName;
    setTimeout( () => {
      this.router.navigateByUrl(routeLink)
    },1000)
  }
}
