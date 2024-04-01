
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet,Event } from '@angular/router';
import { initFlowbite } from 'flowbite';

import { IStaticMethods } from 'preline/preline';
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet/>'
})
export class AppComponent {
  title = 'store';
  constructor(private router: Router) {

  }


  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          window.HSStaticMethods.autoInit();
        }, 100);
      }
    });
  }
}
