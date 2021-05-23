import React from 'react';
import {TouchableOpacity, ActivityIndicator} from 'react-native';
import Text from './Text';
import {Styles, Colors} from '@/commons';

function Button(props) {
  const {
    style,
    onPress,
    disabled,
    children,
    text,
    loading,
    textStyle,
    bgColor,
  } = props;
  return (
    <TouchableOpacity
      style={[
        Styles.button,
        style,
        (disabled || loading) && Styles.buttonDisabled,
        bgColor && {backgroundColor: bgColor},
      ]}
      disabled={disabled || loading}
      onPress={onPress}>
      {loading ? (
        <ActivityIndicator color={Colors.white} />
      ) : (
        <>
          {text && (
            <Text style={textStyle} white>
              {text}
            </Text>
          )}
          {children}
        </>
      )}
    </TouchableOpacity>
  );
}

export default Button;
