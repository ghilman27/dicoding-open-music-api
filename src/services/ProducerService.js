class ProducerService {
  constructor({ messageBroker }) {
    this._messageBroker = messageBroker;
  }

  async sendMessage(queue, payload) {
    this._messageBroker.sendMessage(queue, payload);
  }
}

module.exports = ProducerService;
