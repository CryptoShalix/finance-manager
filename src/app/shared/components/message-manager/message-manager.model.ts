export enum MessageType {
  NORMAL = 0,
  SUCCESS = 1,
  ALERT = 2,
  ERROR = 3,
}

export class MessageItem {
  id: number;
  message: string;
  type: MessageType;

  constructor(id: number, message: string, type: MessageType = 0) {
    this.id = id;
    this.message = message;
    this.type = type;
  }
}