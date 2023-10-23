import { Component, Input } from '@angular/core';

import { ModalItem } from './modal.entity';
import { LinkItem } from '../link/link.entity';

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
    this.buttons.forEach(btn => {
      btn.action = () => {
        console.log(btn.action.length);
        if (btn.action.length === 0) {
          this.doCloseModal();
        } else {
          this.toPromise(this.doCloseModal()).finally(btn.action);
        }
      };
    });
    console.log(this.buttons);
  }

  showModal = false;
  showCloseButton: boolean = true;

  title: string = '';
  body: string = '';

  buttons: LinkItem[] = [];

  doCloseModal() {
    this.showModal = false;
  }

  private toPromise(_method: void): Promise<void> {
    return new Promise((resolve) => resolve(_method));
  }
}