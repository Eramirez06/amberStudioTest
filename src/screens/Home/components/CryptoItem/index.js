import React from 'react';
import {Text, Image, Pressable, View} from 'react-native';
import {styles} from './styles';

export const CryptoItem = ({name, price, icon, onPress}) => {
  return (
    <Pressable onPress={onPress} style={styles.item}>
      <View style={styles.container}>
        <Image source={{uri: icon}} style={styles.icon} />
        <Text style={styles.name}>{name}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.price}>${parseFloat(price).toFixed(2)}</Text>
      </View>
    </Pressable>
  );
};
