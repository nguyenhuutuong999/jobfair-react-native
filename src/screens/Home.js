import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from 'react-native';
import {Api, Colors, sizeFont, sizeHeight, sizeScale} from '@/commons';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import {MultipleChoice, RadioChoice} from '@/components';
import {useSelector, useDispatch} from 'react-redux';
import {get, last} from 'lodash';
import {Actions} from '@/store/actions';
import Alert from '@/utils/alert';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const TIME_COUNTDOWN = 1200;
const Home = () => {
  const {questions, loading} = useSelector(state =>
    get(state, 'questionReducers', false),
  );
  const data = useSelector(state => get(state, 'formReducers.data', false));
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [idxQuestion, setIdxQuestion] = useState(1);
  const [answer, setAnswer] = useState(null);
  const [answersList, setAnswersList] = useState([]);
  const [isPostingAnswer,setIsPostingAnswer] = useState(false);
  const [time, setTime] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    StatusBar.setHidden(true);
    dispatch(Actions.getAllQuestions());
  }, []);
  useEffect(() => {
    let question = Object.assign({}, questions[0]);
    setCurrentQuestion(question);
  }, [questions]);

  const handleNext = () => {
    if (!answer) {
      Alert.warn('Please select answer!');
    } else {
      if (currentQuestion.type === 'single') {
        let tempAnswer = Object.assign({});
        tempAnswer['question_id'] = currentQuestion.question_id;
        tempAnswer['answer_ids'] = [answer.anwser_id];
        setAnswersList([...answersList, tempAnswer]);
      } else {
        let tempAnswer = Object.assign({});
        tempAnswer['question_id'] = currentQuestion.question_id;
        tempAnswer['answer_ids'] = answer.map(answer => answer.anwser_id);
        setAnswersList([...answersList, tempAnswer]);
      }
      //Handle check question to submit
      if (idxQuestion === questions.length) {
        handleSubmit();
      } else {
        setIdxQuestion(idxQuestion + 1);
        setAnswer(null);
        setCurrentQuestion(questions[idxQuestion]);
      }
    }
  };
  const handleSelectCheckBox = answers => {
    let tempAnswer = answers.filter(awnser => awnser.checked === true);
    setAnswer(tempAnswer);
  };
  const handleSubmit = () => {
    let submitData = Object.assign({});
    submitData['contact_request'] = data;
    submitData['contact_request']['submited_total_time'] =
      TIME_COUNTDOWN - time;

    if (!answer) {
      submitData['answer_requests'] = answersList;
      setIsPostingAnswer(true);
      axios
        .post(`${Api.apiUrl}anwsers`, submitData)
        .then(res => navigation.navigate('Ranking', {data: res.data}))
        .catch(err => {
          Alert.error(err.message);
          navigation.navigate('Form');
        }).finally(() => {
          setIsPostingAnswer(false)
        })
    } else {
      let tempAnswer = Object.assign({});
      if (currentQuestion.type === 'single') {
        tempAnswer['question_id'] = currentQuestion.question_id;
        tempAnswer['answer_ids'] = [answer.anwser_id];
      } else {
        tempAnswer['question_id'] = currentQuestion.question_id;
        tempAnswer['answer_ids'] = answer.map(answer => answer.anwser_id);
      }
      answersList.push(tempAnswer);
      submitData['answer_requests'] = answersList;
      setIsPostingAnswer(true);
      axios
        .post(`${Api.apiUrl}anwsers`, submitData)
        .then(res => {
          navigation.navigate('Ranking', {data: res.data});
        })
        .catch(err => {
          Alert.error(err.message);
          navigation.navigate('Form');
        }).finally(() => {
          setIsPostingAnswer(false)
        })
    }
  };
  const handleSelectRadio = e => setAnswer(e);

  const {text, type} = currentQuestion || {};
  const {anwsers} = currentQuestion || [];

  if (loading) {
    return (
      <View style={[styles.container, {justifyContent: 'center'}]}>
        <ActivityIndicator size="large" color={Colors.white} />
      </View>
    );
  }
  if (isPostingAnswer) {
    return (
      <View style={[styles.container, {justifyContent: 'center'}]}>
        <ActivityIndicator size="large" color={Colors.white} />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.header__question}>Question: {idxQuestion}/10</Text>
        <View style={styles.header__time}>
          <CountdownCircleTimer
            isPlaying
            size={50}
            duration={TIME_COUNTDOWN}
            colors={Colors.white}
            strokeWidth={5}
            trailColor={Colors.backgroundColor}
            onComplete={() => {
              Alert.warn('Timeout!');
              handleSubmit();
            }}>
            {({remainingTime, animatedColor}) => {
              const minutes = Math.floor(remainingTime / 60);
              const seconds = remainingTime % 60;
              setTime(remainingTime);
              let timeDisplay = `${minutes}:${seconds}`;
              return (
                <Animated.Text
                  style={{...styles.remainingTime, color: animatedColor}}>
                  {timeDisplay}
                </Animated.Text>
              );
            }}
          </CountdownCircleTimer>
        </View>
      </View>
      <View style={styles.question}>
        <Text style={styles.question__text}>{text}</Text>
      </View>
      {type !== 'single' ? (
        <MultipleChoice
          answersList={anwsers}
          handleSelectCheckBox={handleSelectCheckBox}
        />
      ) : (
        <RadioChoice
          answersList={anwsers}
          handleSelectRadio={handleSelectRadio}
        />
      )}
      <TouchableOpacity style={styles.button} onPress={() => handleNext()}>
        <Text style={styles.button__text}>
          {idxQuestion === questions.length ? 'Submit' : 'Next'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: sizeScale(15),
  },
  header__question: {
    fontFamily: 'BalsamiqSans-Bold',
    fontSize: sizeFont(18),
    color: Colors.white,
  },
  question: {
    backgroundColor: Colors.white,
    width: '80%',
    maxWidth: '80%',
    minHeight: sizeHeight(150),
    height: 'auto',
    padding: sizeScale(15),
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: sizeScale(15),
  },
  question__text: {
    fontFamily: 'BalsamiqSans-Regular',
    fontSize: sizeFont(16),
  },
  button: {
    backgroundColor: 'red',
    alignSelf: 'flex-end',
    paddingVertical: sizeScale(15),
    paddingHorizontal: sizeScale(40),
    marginRight: sizeScale(35),
    marginVertical: sizeScale(10),
    borderRadius: 15,
    backgroundColor: Colors.buttonColor,
  },
  button__text: {
    fontFamily: 'BalsamiqSans-Bold',
    color: Colors.white,
  },
});

export default Home;
