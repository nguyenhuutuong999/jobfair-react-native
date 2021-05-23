import React, {useState, useEffect} from 'react';
import {Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors, sizeFont, sizeScale} from '@/commons';
import CheckBox from '@react-native-community/checkbox';

export default function MultipleChoice({
  answersList = [],
  handleSelectCheckBox,
}) {
  const [answers, setAnswers] = useState([]);
  useEffect(() => {
    setAnswers(
      answersList.map(answer => {
        let result = Object.assign({}, answer);
        result['checked'] = false;
        return result;
      }),
    );
  }, [answersList]);
  return (
    <FlatList
      style={{width: '80%'}}
      data={answersList}
      renderItem={({item, index}) => {
        answers[index] = answers[index] || {};
        return (
          <TouchableOpacity
            style={styles.answer__container}
            onPress={() => {
              setAnswers([
                ...answers,
                (answers[index].checked = !answers[index].checked),
              ]);
              handleSelectCheckBox(answers);
            }}>
            <CheckBox
              tintColors={{true: Colors.white, false: Colors.white}}
              value={answers[index].checked}
              onValueChange={newValue => {
                setAnswers([...answers, (answers[index].checked = newValue)]);
                handleSelectCheckBox(answers);
              }}
            />
            <Text style={styles.answer__text}>{item.text}</Text>
          </TouchableOpacity>
        );
      }}
      keyExtractor={item => item.anwser_id.toString()}
    />
  );
}

const styles = StyleSheet.create({
  answer__container: {
    flex: 1,
    height: 'auto',
    padding: sizeScale(15),
    marginTop: sizeScale(15),
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.answerColor,
  },
  answer__text: {
    color: Colors.white,
    fontFamily: 'BalsamiqSans-Regular',
    marginLeft: sizeScale(5),
    fontSize: sizeFont(16),
  },
});
