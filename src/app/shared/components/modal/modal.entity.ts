import { LinkItem } from '../link/link.entity';

export interface IModal {
  title: string,
  body: string,
  showModal: boolean,
  showCloseButton?: boolean,
  buttons?: LinkItem[],
}

export class ModalItem {
  showModal: boolean = false;
  showCloseButton: boolean = true;

  title: string = '';
  body: string = '';

  buttons: LinkItem[] = [];

  constructor(_modal?: IModal) {
    if (_modal) {
      this.showModal = _modal.showModal;
      this.showCloseButton = _modal.showCloseButton === undefined ? true : _modal.showCloseButton;
      this.title = _modal.title;
      this.body = _modal.body;
      this.buttons = _modal.buttons === undefined ? [] : _modal.buttons;
    }
  }
}