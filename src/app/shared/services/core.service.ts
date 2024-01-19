import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { StorageService } from './storage.service';
import { MessageManagerService } from '../components/message-manager/message-manager.service';

import { ModalItem } from '../components/modal/modal.entity';
import { LinkItem } from '../components/link/link.entity';
import { MessageType } from '../components/message-manager/message-manager.model';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  // VARIABLES: PUBLIC
  public static appTitle = 'Finance Manager';

  constructor(
    private router: Router,
    private storage: StorageService,
    private messageService: MessageManagerService,
  ) { }

  // ROUTING

  goTo(url: string = '/') { this.router.navigateByUrl(url); }

  navigateTo(url: string, openAs: string = '_blank'): void {
    if (!this.isNullOrEmpty(url)) {
      window.open(url, openAs);
    }
  }

  // MESSAGE MANAGER

  showMessage(message: string) {
    this.messageService.sendMessage(message);
  }
  showSuccess(message: string) {
    this.messageService.sendMessage(message, MessageType.SUCCESS, 15);
  }
  showAlert(message: string) {
    this.messageService.sendMessage(message, MessageType.ALERT, 30);
  }
  showError(message: string) {
    this.messageService.sendMessage(message, MessageType.ERROR);
  }

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

  sorter(fields: any[], paramToSort: string, reverse: boolean = false): any[] {
    return fields.sort((a, b) => {
      const dir = 1;
      if (paramToSort[0] === '-') {
        reverse = true;
        paramToSort = (paramToSort as string).substring(1);
      }
      const firstValue: string = this.getFieldSorterValue(a, paramToSort);
      const secondValue: string = this.getFieldSorterValue(b, paramToSort);

      const firstName = this.isString(firstValue) ? firstValue.toLowerCase() : firstValue;
      const secondName = this.isString(secondValue) ? secondValue.toLowerCase() : secondValue;

      if (reverse) {
        return firstName < secondName ? dir : firstName > secondName ? -(dir) : 0;
      }
      return firstName > secondName ? dir : firstName < secondName ? -(dir) : 0;
    });
  }

  private getFieldSorterValue(item: any, propertyNames: string | string[]): string {
    let propertyValue = propertyNames;
    if (this.isString(propertyNames)) {
      propertyValue = (propertyNames as string).split('.');
    }
    if (propertyValue.length === 1) { return item[(propertyValue as string[])[0]]; }
    let currentItem = item;
    let name = '';
    (propertyValue as string[]).map((propertyName, index) => {
      if (index < propertyValue.length - 1) {
        currentItem = currentItem[propertyName];
        return;
      }
      name = currentItem[propertyName];
    });
    return name;
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