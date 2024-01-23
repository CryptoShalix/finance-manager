import { Component, OnInit } from '@angular/core';

import { CoreService } from './shared/services/core.service';
import { TranslateService } from './shared/services/translate.service';

import { LinkItem, LinkItemCircle } from './shared/components/link/link.entity';
import { ModalItem } from './shared/components/modal/modal.entity';
import { BUTTONS } from './shared/models/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  APP_TITLE = CoreService.appTitle;

  btnMenu: LinkItem[] = [];
  btnList: LinkItem[] = [];

  modalItem: ModalItem = new ModalItem();

  constructor(
    private coreService: CoreService,
    private translateService: TranslateService,
  ) { }

  ngOnInit(): void {
    this.prepareMenu();
    this.prepareButtons();
    this.prepareEvents();
  }

  public doOpenHome() {
    this.coreService.goTo();
  }

  private prepareMenu() {
    this.btnMenu = [];
    this.btnMenu.push(LinkItemCircle.createButton(
      'upload', 'cloud_upload', () => this.doUpload()
    ));
    this.btnMenu.push(LinkItemCircle.createButton(
      'download', 'cloud_download', () => this.doDownload()
    ));
    this.btnMenu.push(LinkItemCircle.createButton(
      'refresh', 'refresh', () => this.doRefresh()
    ));
    this.btnMenu.push(LinkItemCircle.createButton(
      'settings', 'settings', () => this.doOpenSettings()
    ));
  }

  private prepareButtons() {
    this.btnList = [];
    this.btnList.push(LinkItemCircle.createButton(
      'change_language', 'translate', () => this.doChangeLanguage()
    ));
    this.btnList.push(LinkItemCircle.createButton(
      'change_currency', 'attach_money', () => this.doChangeCurrency()
    ));
  }

  private prepareEvents() {
    // Detect modal item changes to show modal dialog
    this.coreService.eModalItem.subscribe(response => { this.modalItem = response; });
  }

  private doUpload() {
    const btnAccept = BUTTONS.accept(() => { this.coreService.uploadData(); });
    const btnCancel = BUTTONS.cancel();
    this.coreService.messageInfo('MSG.actionUploadTitle', 'MSG.actionUpload', [btnAccept, btnCancel]);
  }

  private doDownload() {
    this.coreService.downloadDB();
  }

  /**
   * TODO: Force update of prices in current currency
   */
  private doRefresh() { }

  private doOpenSettings() {
    this.coreService.goTo('settings');
  }

  /**
   * Automatically changes the language between ES (Spanish) and EN (English)
   */
  private doChangeLanguage() {
    this.translateService.toggleUserLanguage();
  }

  /**
   * TODO: Show a select with different currencies (€, $, B, etc), and allow to choose one.
   * Store on localStorage
   */
  private doChangeCurrency() { }
}
