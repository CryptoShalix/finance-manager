import { Component, OnInit } from '@angular/core';

import { CoreService } from './shared/services/core.service';

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
    private coreService: CoreService
  ) { }

  ngOnInit(): void {
    this.prepareMenu();
    this.prepareButtons();
    this.prepareEvents();
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

  /**
   * TODO: Add english .json language, store in localStorage and do change on this event
   */
  private doChangeLanguage() { }

  /**
   * TODO: Show a select with different currencies (€, $, B, etc), and allow to choose one.
   * Store on localStorage
   */
  private doChangeCurrency() { }
}
