import {Colors, sizeFont, sizeScale} from '@/commons';
import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';

export default function RadioChoice({answersList = [], handleSelectRadio}) {
  const [key, setKey] = useState(0);
  const data = answersList.map(answer => {
    let result = Object.assign({}, answer);
    result['label'] = answer.text;
    return result;
  });

  useEffect(() => {
    setKey(Math.random());
  }, [answersList]);

  return (
    <ScrollView style={styles.container}>
      <RadioButtonRN
        key={key}
        data={data}
        selectedBtn={e => handleSelectRadio(e)}
        style={styles.answer__container}
        textStyle={styles.answer__text}
        circleSize={10}
        boxDeactiveBgColor={Colors.answerColor}
        boxActiveBgColor={'#0f4c75'}
        activeColor={Colors.white}
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '80%',
  },
  answer__container: {
    flex: 1,
    height: 'auto',
    borderRadius: 10,
    alignItems: 'center',
  },
  answer__text: {
    color: '#e4f9f5',
    fontFamily: 'BalsamiqSans-Regular',
    marginLeft: sizeScale(5),
    fontSize: sizeFont(16),
  },
});
