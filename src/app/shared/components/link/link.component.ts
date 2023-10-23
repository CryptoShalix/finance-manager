import { Component, Input } from '@angular/core';

import { ELINK_HREF, ELINK_ICON_TYPE, ELINK_TYPE, LinkItem } from './link.entity';

import { CoreService } from '../../services/core.service';
import { TranslateService } from '../../services/translate.service';

import { IMAGES } from 'src/assets/images/images';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent {
  /**
 * @param setItem Requires a LinkItem model:
 * 
 * [REQUIRED]
 * @param type Choose which type of link to create: ELINK_TYPE
 * @param href Specify the url to go: string
 * @param title Specify the title (text or title) to show: string
 * 
 * [OPTIONAL]
 * @param tooltip Specify the tooltip to show when hovering: string (default: '')
 * @param icon Specify the path/name to the image/icon: string (default: '')
 * @param iconType Choose the type of icon to show: ELINK_ICON_TYPE (default: 'ico')
 * @param target Choose the target: ELINK_HREF (default: '_blank')
 * @param showIconGo Choose whether you want to show this icon or not: boolean (default: false)
 * @param action Set the action to do when click. Create an event with: () => { ... here goes your action ... }
 */
  @Input() set setItem(linkItem: LinkItem) {
    // Set required params
    this.type = linkItem.type;
    this.href = linkItem.href;
    this.title = this.translate.instant(linkItem.title);

    // Set internal params
    this.isTypeCard = this.type === ELINK_TYPE.CARD;
    this.isTypeCircle = this.type === ELINK_TYPE.CIRCLE;
    this.isTypeSquare = this.type === ELINK_TYPE.SQUARE;
    this.isTypeBadge = this.type === ELINK_TYPE.BADGE;
    this.isTypeButton = this.type === ELINK_TYPE.BUTTON;

    // Set optional params
    this.tooltip = !this._noTooltip() && this.isNullOrEmpty(linkItem.tooltip)
      ? this.title
      : this.translate.instant(linkItem.tooltip);
    this.icon = linkItem.icon;
    this.iconType = linkItem.iconType;
    this.target = linkItem.target;
    this.showIconGo = linkItem.showIconGo;
    this.action = linkItem.action;
  }

  // REQUIRED
  private type: string = ELINK_TYPE.CIRCLE;
  href: string = '';
  title: string = '';

  // OPTIONAL
  action: () => void = () => { };
  tooltip: string = '';
  icon?: string = '';
  iconType?: string = ELINK_ICON_TYPE.ICON;
  target?: string = ELINK_HREF.BLANK;
  showIconGo?: boolean = false;

  // INTERNAL
  isTypeCard = this.type === ELINK_TYPE.CARD;
  isTypeCircle = this.type === ELINK_TYPE.CIRCLE;
  isTypeSquare = this.type === ELINK_TYPE.SQUARE;
  isTypeBadge = this.type === ELINK_TYPE.BADGE;
  isTypeButton = this.type === ELINK_TYPE.BUTTON;
  svgGoTo = IMAGES.svgGoTo;

  constructor(
    private coreService: CoreService,
    private translate: TranslateService
  ) { }

  private _noTooltip() {
    return this.isTypeCard || this.isTypeButton;
  }

  isCurrentPage(href: string): boolean {
    const currentFullPage = window.location.hash;
    return currentFullPage.includes(`/${href}`);
  }

  isNullOrEmpty(val: string) {
    return this.coreService.isNullOrEmpty(val);
  }
}