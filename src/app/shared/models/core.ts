import { ELINK_ICON_TYPE, ELINK_TYPE, LinkItem } from '../components/link/link.entity';

export class BUTTONS {
  static custom = (title: string, icon: string, action: () => void) => new LinkItem({
    title,
    type: ELINK_TYPE.BUTTON,
    icon,
    iconType: ELINK_ICON_TYPE.ICON,
    tooltip: '',
    action
  });

  static accept = (action: () => void) => new LinkItem({
    title: 'BUTTONS.accept',
    type: ELINK_TYPE.BUTTON,
    icon: 'check',
    iconType: ELINK_ICON_TYPE.ICON,
    tooltip: '',
    action
  });

  static cancel = (action: () => void = () => { }) => new LinkItem({
    title: 'BUTTONS.cancel',
    type: ELINK_TYPE.BUTTON,
    icon: 'cancel',
    iconType: ELINK_ICON_TYPE.ICON,
    tooltip: '',
    action
  });
}

export interface IValueText {
  value: string;
  text: string;
}

export class ValueText {
  protected static parameters = {
    value: 'value',
    text: 'text',
  };

  value: string;
  text: string;

  constructor(value: string, text: string) {
    this.value = value;
    this.text = text;
  }
}

export enum EDateFormat {
  short = 'ddMMyyyy',
  shortDash = 'dd-MM-yyyy',
  shortSlash = 'dd/MM/yyyy',
  long = 'ddMMyyyyTHH:mm:ss',
  longDash = 'dd-MM-yyyy HH:mm:ss',
  longSlash = 'dd/MM/yyyy HH:mm:ss',
}

export enum ECurrency {
  EUR = 'eur',
  USD = 'usd',
  BTC = 'btc',
  WXT = 'wxt'
}