import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';

import { PipesModule } from '../../pipes/pipes.module';

import { LinkComponent } from './link.component';

@NgModule({
  declarations: [
    LinkComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    PipesModule,
  ],
  exports: [
    LinkComponent
  ]
})
export class LinkModule { }