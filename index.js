require('dotenv').config();
const seneca = require('seneca')();
const data = require('../sandbox-data');

seneca.add({ role: 'item', cmd: 'getItem' }, (message, reply) => {
  if (!message.id) {
    return reply(null, { error: 'ItemIdentifierRequired' });
  }
  data.Item
    .findById(message.id)
    .then(item => reply(null, { response: item }))
    .catch(error => reply(error, null));
});

seneca.listen({
  port: process.env.PORT,
  host: process.env.HOST || 'localhost',
});
