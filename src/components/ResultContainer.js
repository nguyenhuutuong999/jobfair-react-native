import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import {ic_circle} from '@/assets/icons';
import {sizeFont, sizeScale, Styles} from '@/commons';
const {width, height} = Dimensions.get('window');

export default function ResultContainer({route}) {
  const [result, setResult] = useState({});

  useEffect(() => {
    setResult(route.params.data.result || {});
  }, []);

  const convertTime = time => {
    return Math.floor(time / 60) + 'm ' + (time % 60) + 's';
  };

  return (
    <View style={styles.container}>
      <View style={styles.container_item}>
        <View style={styles.imageWrapper}>
          <Image style={styles.circle} source={ic_circle} />
          <View style={styles.infor}>
            <Text style={styles.result}>{result.total_correct_anwser}/10</Text>
            <Text style={styles.time}>{convertTime(result.submited_total_time)}</Text>
          </View>
        </View>
        <Text style={styles.name}>{result.name}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: height,
    marginBottom: sizeScale(30),
  },
  container_item: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: width / 1.1,
  },
  name: {
    fontSize: sizeFont(40),
    color: 'white',
    ...Styles.styleFontText,
    paddingVertical: sizeScale(10),
  },
  imageWrapper: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: (width * 2.5) / 3,
    height: (width * 2.5) / 3,
  },
  infor: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },

  result: {
    fontSize: sizeFont(30),
    color: 'white',
    ...Styles.styleFontText,
  },
  time: {
    fontSize: sizeFont(24),
    color: 'white',
    ...Styles.styleFontText,
  },
});
