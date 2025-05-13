import React, {useCallback, useEffect, useState} from 'react';
import {View, FlatList, Button, Text, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {CURRENCIES} from '../../constants';
import {fetchCryptoData} from '../../services/cryptoData';
import {connectToFeed} from '../../services/coinbaseSocket';
import {CryptoItem} from './components/CryptoItem';
import {styles} from './styles';

export default function HomeScreen({navigation}) {
  const {navigate} = navigation;
  const dispatch = useDispatch();
  const {data, loading, error} = useSelector(state => state.crypto);
  const [live, setLive] = useState(false);

  useEffect(() => {
    dispatch(fetchCryptoData());
  }, [dispatch]);

  const handleLivePrices = () => {
    setLive(true);
    connectToFeed(CURRENCIES, dispatch);
  };

  const renderItem = useCallback(
    ({item}) => (
      <CryptoItem {...item} onPress={() => navigate('Detail', item)} />
    ),
    [navigate],
  );

  if (loading) {
    return <ActivityIndicator style={{marginTop: 50}} size="large" />;
  }
  if (error) {
    return <Text style={{color: 'red', textAlign: 'center'}}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={Object.values(data)}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
      {!live && (
        <View style={styles.buttonContainer}>
          <Button title="Activate Live Feed" onPress={handleLivePrices} />
        </View>
      )}
    </View>
  );
}
