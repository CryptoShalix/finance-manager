/**
 * Entity for the LinkComponent
 */

export enum ELINK_TYPE {
  CARD = 'card',
  CIRCLE = 'circle',
  SQUARE = 'square',
  BADGE = 'badge',
  BUTTON = 'button',
}

export enum ELINK_HREF {
  SELF = '_self',
  BLANK = '_blank'
}

export enum ELINK_ICON_TYPE {
  ICON = 'ico',
  IMAGE = 'img',
  SVG = 'svg'
}

/**
 * @param type Required ELINK_TYPE
 * @param href Required string
 * @param title Required string
 * @param tooltip Required string
 * @param icon Optional string
 * @param iconType Optional ELINK_ICON_TYPE
 * @param target Optional ELINK_HREF
 * @param showIconGo Optional string
 */
export interface ILinkItem {
  type: string,
  href?: string,
  title: string,
  tooltip?: string,
  icon?: string,
  iconType?: string,
  target?: string,
  showIconGo?: boolean,
  action?: () => void,
}

export class LinkItem {
  // REQUIRED
  type: string = ELINK_TYPE.CIRCLE;
  href: string = '';
  title: string = '';

  // OPTIONAL
  tooltip: string = '';
  icon?: string = '';
  iconType?: string = ELINK_ICON_TYPE.ICON;
  target?: string = ELINK_HREF.BLANK;
  showIconGo?: boolean = false;
  action: () => void = () => { };

  constructor(data: ILinkItem) {
    if (data) {
      // Required
      this.type = this.getLinkType(data.type);
      this.href = data.href === undefined ? '' : data.href;
      this.title = data.title;
      // Optional
      this.tooltip = data.tooltip === undefined ? this.title : data.tooltip;
      this.icon = data.icon;
      this.iconType = this.getLinkIconType(data.iconType);
      this.target = this.getLinkTarget(data.target);
      this.showIconGo = data.showIconGo;
      this.action = data.action === undefined ? () => null : data.action;
    }
  }

  private getLinkType(type: string) {
    switch (type) {
      case ELINK_TYPE.CARD:
        return ELINK_TYPE.CARD;
      case ELINK_TYPE.SQUARE:
        return ELINK_TYPE.SQUARE;
      case ELINK_TYPE.BADGE:
        return ELINK_TYPE.BADGE;
      case ELINK_TYPE.BUTTON:
        return ELINK_TYPE.BUTTON;
      case ELINK_TYPE.CIRCLE:
      default:
        return ELINK_TYPE.CIRCLE;
    }
  }

  private getLinkIconType(iconType?: string) {
    switch (iconType) {
      case ELINK_ICON_TYPE.SVG:
        return ELINK_ICON_TYPE.SVG;
      case ELINK_ICON_TYPE.IMAGE:
        return ELINK_ICON_TYPE.IMAGE;
      case ELINK_ICON_TYPE.ICON:
      default:
        return ELINK_ICON_TYPE.ICON;
    }
  }

  private getLinkTarget(target?: string) {
    switch (target) {
      case ELINK_HREF.SELF:
        return ELINK_HREF.SELF;
      case ELINK_HREF.BLANK:
      default:
        return ELINK_HREF.BLANK;
    }
  }
}

export class LinkItemCircle {

  static createButton(title: string, icon: string, action: () => void) {
    return new LinkItem({
      type: ELINK_TYPE.SQUARE,
      title: `BUTTONS.${title}`,
      icon,
      iconType: ELINK_ICON_TYPE.ICON,
      action,
    });
  }
}