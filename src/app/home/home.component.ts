import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
  <h1>Home</h1>
  <img src="/assets/logo.svg" alt="logo" >
  `,
  styles: [`
  :host {
    display: grid;
    align-self: center;
    justify-content: center;
    grid-template-rows: 4rem auto;
  }
  img {
    max-width: 60vw;
    max-height: 60vh;
    background-color: #111;
    padding: 2rem;
    border-radius: 1rem;
  }
  `]
})
export class HomeComponent {

  constructor() { }

}
