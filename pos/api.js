const net = require('net');
const client = net.Socket();

client.on('data', (data) => {
  console.log('terminal:', data);
});

client.on('error', (error) => {
  console.error(error);
});

client.on('close', () => {
  console.log('connection closed');
});

const IP = '192.168.10.188';
const PORT = 443;

const FS = '\u001c';
const PURCHASE = {
  id: '00',
  amountTag: '001',
  tenderTag: '002',
  tenderType: {
    card: '0',
    gift: '3',
    cash: '5'
  }
};

const connect = function() {
  client.connect(PORT, IP, () => {
    console.log('connecting to terminal...');
    console.log('connected to terminal at ' + IP + ':' + PORT);
  });
}

const write = function(req) {
  client.write(req);
}

module.exports = {
  purchase: (amount, tender) => {
    tender = (tender === 'cash')? 'cash' : 'card';

    const req = `${PURCHASE.id}${FS}${PURCHASE.amountTag}${amount}${FS}${PURCHASE.tenderTag}${PURCHASE.tenderType[tender]}`;

    console.log(req);

    connect();
    write(req);
  }
}
