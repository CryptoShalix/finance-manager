import { LinkItem } from '../link/link.entity';

export interface IModal {
  title: string,
  body: string,
  showModal: boolean,
  buttons: LinkItem[],
  showCloseButton?: boolean,
}

export class ModalItem {
  title: string = '';
  body: string = '';
  buttons: LinkItem[] = [];
  showModal: boolean = false;
  showCloseButton: boolean = true;

  constructor(_modal?: IModal) {
    if (_modal) {
      this.title = _modal.title;
      this.body = _modal.body;
      this.buttons = _modal.buttons;
      this.showModal = _modal.showModal;
      this.showCloseButton = _modal.showCloseButton === undefined ? true : _modal.showCloseButton;
    }
  }
}