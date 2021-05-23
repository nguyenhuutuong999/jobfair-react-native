import React from 'react';
import {Text} from 'react-native';
import {Styles, sizeFont, sizeWidth, sizeHeight} from '@/commons';

function CustomText(props) {
  const {
    white,
    bold,
    color,
    paddingHorizontal,
    paddingVertical,
    size,
    children,
    style,
  } = props;

  return (
    <Text
      {...props}
      style={[
        Styles.text,
        white && Styles.textWhite,
        bold && Styles.bold,
        color && {color},
        paddingHorizontal && {
          paddingHorizontal: sizeWidth(paddingHorizontal),
        },
        paddingVertical && {
          paddingVertical: sizeHeight(paddingVertical),
        },
        size && {fontSize: sizeFont(size), lineHeight: sizeFont(size + 6)},
        style,
      ]}>
      {children}
    </Text>
  );
}

export default CustomText;
