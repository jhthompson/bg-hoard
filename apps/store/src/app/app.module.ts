import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router';

import { StoreUiSharedModule } from '@bg-hoard/store/ui-shared';

import { environment } from '../environments/environment'

import { AppComponent } from './app.component';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      [
        {
          path: 'game/:id',
          loadChildren: () =>
            import('@bg-hoard/store/feature-game-detail').then(
              (module) => module.StoreFeatureGameDetailModule
            ),
        },
      ],
      { initialNavigation: 'enabled' }
    ),
    MatCardModule,
    StoreUiSharedModule,
  ],
  providers: [{
    provide: 'baseUrl',
    useValue: environment.apiUrl
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
