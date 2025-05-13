import {updatePrice} from '../store/crypto';

let ws = null;

export const connectToFeed = (symbols, dispatch) => {
  if (ws) return;

  ws = new WebSocket('wss://ws-feed.exchange.coinbase.com');

  ws.onopen = () => {
    ws.send(
      JSON.stringify({
        type: 'subscribe',
        channels: [{name: 'ticker', product_ids: symbols}],
      }),
    );
  };

  ws.onmessage = e => {
    const msg = JSON.parse(e.data);
    if (msg.type === 'ticker' && msg.product_id && msg.price) {
      dispatch(updatePrice({id: msg.product_id, price: msg.price}));
    }
  };

  ws.onerror = e => {
    console.log('WebSocket error:', e.message);
  };

  ws.onclose = () => {
    console.log('WebSocket closed');
    ws = null;
  };
};

export const disconnectFromFeed = () => {
  if (ws) {
    ws.close();
    ws = null;
  }
};
