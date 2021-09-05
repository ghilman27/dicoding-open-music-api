const amqp = require('amqplib');

const RabbitMQ = {
  sendMessage: async (queue, payload) => {
    const connection = await amqp.connect({
      protocol: process.env.RABBITMQ_PROTOCOL,
      hostname: process.env.RABBITMQ_SERVER,
      port: process.env.RABBITMQ_PORT,
    });
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, {
      durable: true,
    });

    channel.sendToQueue(queue, Buffer.from(payload));

    setTimeout(() => {
      connection.close();
    }, 1000);
  },
};

module.exports = RabbitMQ;
