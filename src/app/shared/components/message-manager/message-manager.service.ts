import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { MessageType } from './message-manager.model';

@Injectable()
export class MessageManagerService {
  private subject = new Subject<any>();

  sendMessage(message: string, type: MessageType = MessageType.NORMAL, timer: number = 60) {
    this.subject.next({ text: message, type, timer });
  }

  clearMessage() {
    this.subject.next('');
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}