import { Guid } from 'guid-typescript';
import { IPlatform } from './platform';
import { IValueText } from './core';
import { ELanguage } from '../services/translate.service';

export class Transaction {
  id: Guid;
  date?: Date;
  platform?: IPlatform;

  constructor() {
    this.id = Guid.create();
  }
}

/**
 * This would be the equivalent of the type of service or operation.
 * 
 * That is, the supermarket service, transportation, pet... it does not matter if it is income or egress, that is defined elsewhere.
 */
export class TransactionCategory {
  private readonly _id!: Guid;
  private _names!: IValueText[];
  private _special: boolean = false; // TODO: will allow to paint the row with different color

  constructor() {
    this._id = Guid.create();
    this._names = [];
  }

  id() {
    return this._id;
  }

  /**
   * Add or Update a category name
   * @param category [Required] The name of the category
   * @param language [Required] The language in which is written this category
   */
  setName(category: string, language: ELanguage) {
    const _nameIndex = this._names.findIndex(n => n.value === language);
    if (_nameIndex === -1) {
      this._names.push({ text: category, value: language });
    } else {
      this._names[_nameIndex].text = category;
    }
  }

  /**
   * @returns The list of category names with each language
   */
  names() { return this._names; }

  /**
   * Get the category name by language
   * @param language [Required] The language in which is written this category
   * @returns The category name
   */
  name(language: ELanguage) {
    return this._names.find(n => n.value === language)?.text;
  }
}