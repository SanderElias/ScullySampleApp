import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <header><nav>
      <a routerLinkActive='active' routerLink="/home">Home</a>
      <a routerLinkActive='active' routerLink="/about">About</a>
      <a routerLinkActive='active' routerLink="/users/search">Users</a>
      <a routerLinkActive='active' routerLink="/blog">Blog</a>
      <a routerLinkActive='active' routerLink="/products">Products</a>
      <a routerLinkActive='active' routerLink="/brand">Brands</a>
    </nav></header>
    <main>
      <router-outlet></router-outlet>
    </main>
    
  `,
  styles: [``]
})
export class AppComponent {
  title = 'scully-sample-app';
}
