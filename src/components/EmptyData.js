import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Text from './Text';
import {Constants, Colors, sizeScale} from '@/commons';
import {ic_empty} from '@/assets/icons';
import {colorOpacityMaker} from '../commons/Colors';

function EmptyData(props) {
  const {text, imageSource} = props;
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Image source={imageSource || ic_empty} style={styles.emptyImage} />
        <Text size={14} color={Colors.tundora}>
          {text || Constants.NoData}
        </Text>
      </View>
    </View>
  );
}

export default EmptyData;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImage: {
    width: sizeScale(90),
    height: sizeScale(90),
    resizeMode: 'contain',
  },
  wrapper: {
    backgroundColor: colorOpacityMaker(Colors.bgAthensGray, 30),
    justifyContent: 'center',
    alignItems: 'center',
    padding: sizeScale(8),
    borderRadius: 5,
  },
});
