import { Component } from '@angular/core';
import { LinkItem, LinkItemCircle } from 'src/app/shared/components/link/link.entity';

import { ISettings } from 'src/app/shared/models/settings';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent {
  settingsList: ISettings[] = [];

  btnSettingsToolbar: LinkItem[] = [];

  constructor() {
    this.btnSettingsToolbar.push(LinkItemCircle.createButton(
      'add', 'add', () => this.doAddSetting()
    ));
  }

  private doAddSetting() { }
}