import { EventEmitter, Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';

import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private KEY_DB = 'FinanceManagerDB';

  eStorageUpdated = new EventEmitter<boolean>();

  getTransactions(): Transaction[] {
    const data = window.localStorage.getItem(this.KEY_DB);
    return data ? JSON.parse(data) : [];
  }

  getTransaction(_id: Guid): Transaction | undefined {
    const _transactions = this.getTransactions();
    return _transactions.find(item => item.id === _id);
  }

  saveTransactions(data: Transaction[]) {
    window.localStorage.setItem(this.KEY_DB, JSON.stringify(data));
    this.storageUpdated();
  }

  saveTransactionsAsString(data: string) {
    window.localStorage.setItem(this.KEY_DB, data);
    this.storageUpdated();
  }

  removeData() {
    window.localStorage.removeItem(this.KEY_DB);
    this.storageUpdated();
  }

  clearDB() {
    window.localStorage.clear();
    this.storageUpdated();
  }

  private storageUpdated() {
    this.eStorageUpdated.next(true);
  }
}