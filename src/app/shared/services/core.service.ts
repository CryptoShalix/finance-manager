import { EventEmitter, Injectable } from '@angular/core';

import { StorageService } from './storage.service';

import { ModalItem } from '../components/modal/modal.entity';
import { LinkItem } from '../components/link/link.entity';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  // VARIABLES: PUBLIC
  public static appTitle = 'Finance Manager';

  constructor(
    private storage: StorageService,
  ) { }

  // MODAL-DIALOG

  eModalItem = new EventEmitter<ModalItem>();

  messageInfo(
    title: string,
    body: string,
    buttons: LinkItem[] = []
  ) {
    const _modalItem = new ModalItem({
      title,
      body,
      buttons,
      showModal: true,
      showCloseButton: true,
    });
    this.eModalItem.next(_modalItem);
  }

  // TEXT AND ITEMS

  isNullOrEmpty = (val: string | null | undefined) => val === undefined || val === null || val === '';
  isNullOrEmptyList = (list: string | any[]) => !list || list.length === 0;
  isString = (str: string | string[]) => typeof str === 'string' || str instanceof String;
  isBoolean = (boo: any) => typeof boo === 'boolean' || boo instanceof Boolean;
  isNumber = (num: any) => typeof num === 'number' || num instanceof Number || (this.isString(num) && !isNaN(num));

  // LISTS

  sort(list: any[], orderColumn: string) {
    if (list && list.length > 0 && !this.isNullOrEmpty(orderColumn)) {
      list = list.sort(function (a, b) {
        if (a[orderColumn] > b[orderColumn]) {
          return 1;
        }
        if (a[orderColumn] < b[orderColumn]) {
          return -1;
        }
        return 0;
      });
    }
    return list;
  }

  // FILE

  downloadDB() {
    const data = this.storage.getTransactions();
    if (data && data.length > 0) {
      const fileName = 'finance_manager_' + new Date();
      this.downloadData(JSON.stringify(data), fileName);
    }
  }

  downloadData(data: string, fileName: string = '', fileExtension: string = 'json') {
    const dlink: HTMLAnchorElement = document.createElement('a');
    dlink.download = `${fileName}.${fileExtension}`;
    dlink.href = 'data:application/json;charset=utf-16,' + data;
    dlink.click();
    dlink.remove();
  }

  /**
   * Creates an HTMLInputElement to show a dialog so the user can choose a .json file and then read that file data.
   * 
   * Source: https://stackoverflow.com/questions/47581687/read-a-file-and-parse-its-content
   */
  uploadData() {
    //https://stackoverflow.com/questions/47581687/read-a-file-and-parse-its-content
    const dlink: HTMLInputElement = document.createElement('input');
    dlink.setAttribute('type', 'file');
    dlink.setAttribute('accept', '.json');
    dlink.click();
    dlink.onchange = (e) => this.readData(e);
    dlink.remove();
  }

  private readData(e: any) {
    const file = e.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const data = fileReader.result as string;
        if (!this.isNullOrEmpty(data)) {
          this.storage.saveTransactionsAsString(data);
        }
      }
      fileReader.readAsText(file);
    }
  }
}