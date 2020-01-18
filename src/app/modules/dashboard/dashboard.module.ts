import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SideBarComponent } from './side-bar/side-bar.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
  SideBarComponent,
  TopBarComponent,
  LayoutComponent,
  HomeComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
