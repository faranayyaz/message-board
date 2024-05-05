export class Channel {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.messages = [];
  }

  addMessage(message) {
    this.messages.push(message);
  }
}
