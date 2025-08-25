import React from 'react';
import { Image, StyleSheet } from 'react-native';

interface LogoSize {
  height: number;
  width?: number;
  marginTop?: number;
}

const Logo: React.FC<LogoSize> = ({ height, width, marginTop }) => {
  return (
    <Image
      source={require('../images/YSG_Logo.png')}
      style={{
        height: height,
        width: width,
        marginTop: marginTop,
      }}
      resizeMode="contain"
    />
  );
};
export default Logo;

const styles = StyleSheet.create({});
