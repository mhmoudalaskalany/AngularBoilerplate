import { Component, OnInit } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  mobileMenuActive: boolean;
  constructor(layout: LayoutComponent) { }

  ngOnInit() {
  }

  onMobileMenuButton(event) {
    this.mobileMenuActive = !this.mobileMenuActive;
    event.preventDefault();
  }

  hideMobileMenu(event) {
    this.mobileMenuActive = false;
    event.preventDefault();
  }

}
