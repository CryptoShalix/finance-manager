import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { MessageManagerService } from './message-manager.service';

import { MessageItem } from './message-manager.model';

@Component({
  selector: 'app-message-manager',
  templateUrl: './message-manager.component.html',
  styleUrls: ['./message-manager.component.scss']
})
export class MessageManagerComponent implements OnDestroy {
  // MESSAGE CONTAINER PARAMETERS
  pShowLeft = false;
  pShowBorderSameColor = true;

  // MAIN VARIABLES
  private timer = 1000;
  private subscription: Subscription;
  messages: MessageItem[] = [];

  constructor(private messageService: MessageManagerService) {
    this.subscription = this.messageService.getMessage().subscribe(data => {
      this.addNewMessage(data);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  clearMessage(id: number) {
    this.messages = this.messages.filter(f => f.id !== id);
  }

  private addNewMessage(data: any) {
    const msgItem = new MessageItem(this.getMessageId(), data.text, data.type);
    this.messages.push(msgItem);
    setInterval(() => this.clearMessage(msgItem.id), data.timer * this.timer);
  }

  private getMessageId() {
    return this.messages.length;
  }
}
