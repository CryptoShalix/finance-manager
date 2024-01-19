import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'home', component: MainPageComponent, pathMatch: 'full' },
  { path: 'settings', component: SettingsPageComponent, pathMatch: 'full' },
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
