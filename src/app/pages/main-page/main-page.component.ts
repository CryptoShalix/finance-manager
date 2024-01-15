import { Component } from '@angular/core';

import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  constructor(
    private storage: StorageService,
  ) {
    this.prepareEvents();
  }

  private prepareEvents() {
    this.storage.eStorageUpdated.subscribe(updated => {
      if (updated) { this.doRefresh(); }
    });
  }

  private doRefresh() {
    const data = this.storage.getTransactions();
    console.log(data);
  }
}