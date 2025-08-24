import React from 'react';
import { Image, StyleSheet } from 'react-native';

interface logoSize {
  height: number;
  width?: number;
  marginTop?: number;
}

const Logo = (size: logoSize) => {
  return (
    <Image
      source={require('../images/YSG_Logo.png')}
      style={{
        height: size.height,
        width: size.width,
        marginTop: size.marginTop,
      }}
      resizeMode="contain"
    />
  );
};
export default Logo;

const styles = StyleSheet.create({});
