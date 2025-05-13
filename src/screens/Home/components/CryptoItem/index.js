import React, {useEffect, useRef} from 'react';
import {Text, Image, Pressable, View, Animated} from 'react-native';
import {styles} from './styles';

export const CryptoItem = ({name, price, icon, onPress, isLive}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isLive) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.3,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLive]);

  return (
    <Pressable onPress={onPress} style={styles.item}>
      <View style={styles.container}>
        <Image source={{uri: icon}} style={styles.icon} />
        <Text style={styles.name}>{name}</Text>
      </View>
      <View style={styles.content}>
        {isLive && (
          <Animated.View
            style={[
              styles.liveDot,
              {
                transform: [{scale: scaleAnim}],
              },
            ]}
          />
        )}
        <Text style={styles.price}>${parseFloat(price).toFixed(2)}</Text>
      </View>
    </Pressable>
  );
};
