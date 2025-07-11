import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPageRoutingModule } from './search-routing.module';

import { SearchPage } from './search.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPageRoutingModule,
    RouterModule.forChild([{ path: '', component: SearchPage }]),
  ],
  declarations: [SearchPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SearchPageModule {}
