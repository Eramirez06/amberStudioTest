import React from 'react';
import {View, Text, Image} from 'react-native';
import {styles} from './styles';

const DetailScreen = ({route}) => {
  const {name, price, icon, color} = route.params;

  return (
    <View style={[styles.container, {backgroundColor: color}]}>
      <Image source={{uri: icon}} style={styles.icon} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>
        Current Price: ${parseFloat(price).toFixed(2)}
      </Text>
    </View>
  );
};
export default DetailScreen;
