import React, {useCallback, useEffect, useState} from 'react';
import {View, FlatList, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {CURRENCIES} from '../../constants';
import {fetchCryptoData} from '../../services/cryptoData';
import {connectToFeed, disconnectFromFeed} from '../../services/coinbaseSocket';
import {CryptoItem} from './components/CryptoItem';
import {styles} from './styles';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function HomeScreen({navigation}) {
  const {navigate} = navigation;
  const dispatch = useDispatch();
  const {data, loading, error} = useSelector(state => state.crypto);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    dispatch(fetchCryptoData());
  }, [dispatch]);

  const handleLivePrices = () => {
    setIsLive(true);
    connectToFeed(CURRENCIES, dispatch);
  };

  const handleStopPrices = () => {
    setIsLive(false);
    disconnectFromFeed();
  };

  const renderItem = useCallback(
    ({item}) => (
      <CryptoItem
        {...item}
        isLive={isLive}
        onPress={() => navigate('Detail', item)}
      />
    ),
    [navigate, isLive],
  );

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error error={error} />;
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={Object.values(data)}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.buttonContainer}>
        <Button
          title={`${!isLive ? 'Activate' : 'Stop'} Live Feed`}
          onPress={isLive ? handleStopPrices : handleLivePrices}
        />
      </View>
    </SafeAreaView>
  );
}
