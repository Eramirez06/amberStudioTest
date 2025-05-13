import {CURRENCIES, ICON_MAP} from '../constants';
import {setCryptoData, setError, setLoading} from '../store/crypto';

export const fetchCryptoData = () => async dispatch => {
  dispatch(setLoading(true));
  try {
    const prices = {};
    await Promise.all(
      CURRENCIES.map(async symbol => {
        const res = await fetch(
          `https://api.coinbase.com/v2/prices/${symbol}/spot`,
        );
        const json = await res.json();
        console.log('json', json);
        prices[symbol] = {
          id: symbol,
          name: symbol.split('-')[0],
          price: json.data.amount,
          icon:
            ICON_MAP[symbol.split('-')[0]] || 'https://via.placeholder.com/64',
        };
      }),
    );
    dispatch(setCryptoData(prices));
    dispatch(setError(null));
  } catch (error) {
    dispatch(setError('Failed to fetch prices'));
  } finally {
    dispatch(setLoading(false));
  }
};
