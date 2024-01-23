import { IPlatform } from './platform';
import { TransactionCategory } from './transaction';

export class ISettings {
  private _categoryTitle!: string;
  private _items!: TransactionCategory[] | IPlatform;

  constructor(categoryTitle: string) {
    this._categoryTitle = categoryTitle;
  }

  categoryTitle() { return this._categoryTitle; }


}