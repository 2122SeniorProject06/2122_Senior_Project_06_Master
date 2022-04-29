import {
    trigger,
    state,
    animate,
    transition,
    style,
    animation,
  } from '@angular/animations';

  export const Animations = {
    loadingTrigger: trigger('loadingAnimation', [
                        state('notLoading', style({
                            height: '80%'
                        })),
                        state('loading', style({
                            height: '*'
                        })),
                        transition('notLoading => loading', [
                            animate('0.37s')
                        ]),
                    ]),
  }