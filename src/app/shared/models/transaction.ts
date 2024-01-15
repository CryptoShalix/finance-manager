import { Guid } from 'guid-typescript';
import { IPlatform } from './platform';

export class Transaction {
  id: Guid;
  date?: Date;
  platform?: IPlatform;

  constructor() {
    this.id = Guid.create();
  }
}