import { Component, Input } from '@angular/core';

import { ModalItem } from './modal.entity';
import { LinkItem } from '../link/link.entity';
import { BUTTONS } from '../../models/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() set setModal(_modal: ModalItem) {
    this.showModal = _modal.showModal;
    this.showCloseButton = _modal.showModal;
    this.title = _modal.title;
    this.body = _modal.body;
    this.buttons = _modal.buttons;
    if (this.buttons.length === 0) {
      this.buttons.push(BUTTONS.cancel());
    }
  }

  showModal = false;
  showCloseButton: boolean = true;

  title: string = '';
  body: string = '';

  buttons: LinkItem[] = [];

  doCloseModal() {
    this.showModal = false;
  }
}