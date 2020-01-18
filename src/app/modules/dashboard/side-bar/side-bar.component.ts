import { Component, OnInit } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

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
