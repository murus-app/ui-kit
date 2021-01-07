import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <mur-button>Regular Button</mur-button>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {}
