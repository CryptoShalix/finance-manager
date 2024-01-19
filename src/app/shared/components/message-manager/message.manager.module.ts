import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from 'src/app/material.module';
import { PipesModule } from '../../pipes/pipes.module';

import { MessageManagerComponent } from './message-manager.component';

import { MessageManagerService } from './message-manager.service';

@NgModule({
  declarations: [
    MessageManagerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    PipesModule,
  ],
  exports: [
    MessageManagerComponent
  ],
  providers: [
    MessageManagerService
  ]
})
export class MessageManagerModule { }