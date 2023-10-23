import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';

import { PipesModule } from '../../pipes/pipes.module';

import { ModalComponent } from './modal.component';
import { LinkModule } from '../link/link.module';

@NgModule({
  declarations: [
    ModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    PipesModule,
    LinkModule,
  ],
  exports: [
    ModalComponent
  ]
})
export class ModalModule { }