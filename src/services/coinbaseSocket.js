import { updatePrice } from '../store/crypto';

export const connectToFeed = (symbols, dispatch) => {
  const ws = new WebSocket('wss://ws-feed.exchange.coinbase.com');

  ws.onopen = () => {
    ws.send(
      JSON.stringify({
        type: 'subscribe',
        channels: [{ name: 'ticker', product_ids: symbols }],
      })
    );
  };

  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data);
    if (msg.type === 'ticker' && msg.product_id && msg.price) {
      dispatch(updatePrice({ id: msg.product_id, price: msg.price }));
    }
  };
};
