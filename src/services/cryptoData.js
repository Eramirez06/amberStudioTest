import {COLOR_MAP, CURRENCIES, ICON_MAP} from '../constants';
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
        const name = symbol.split('-')[0];

        prices[symbol] = {
          id: symbol,
          name,
          price: json.data.amount,
          color: COLOR_MAP[name] || '#FFFFFF',
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
