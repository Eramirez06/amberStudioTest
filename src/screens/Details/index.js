import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {styles} from './styles';

export default function DetailScreen({route}) {
  const {name, price, icon} = route.params;

  return (
    <View style={styles.container}>
      <Image source={{uri: icon}} style={styles.icon} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>
        Current Price: ${parseFloat(price).toFixed(2)}
      </Text>
    </View>
  );
}
