import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
   {

    path: '',
    component: LayoutComponent,
     children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'lookup',
        loadChildren: () => import(`../features/lookups/lookups.module`).then(m => m.LookupsModule)
      }
     ]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
