import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';

import { PipesModule } from './pipes/pipes.module';

import { LinkModule } from './components/link/link.module';
import { ModalModule } from './components/modal/modal.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    PipesModule,
    LinkModule,
    ModalModule,
  ],
  exports: [
    LinkModule,
    ModalModule,
  ]
})
export class SharedModule { }