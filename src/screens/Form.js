import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Text, Button} from '@/components';
import {
  Styles,
  sizeScale,
  Constants,
  Validation,
  sizeFont,
  sizeHeight,
  sizeWidth,
  Api,
} from '@/commons';
import {Actions} from '@/store/actions';
import Alert from '@/utils/alert';
import {useDispatch, useSelector} from 'react-redux';
import {get} from 'lodash';
import {logo} from '@/assets/icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import RadioButtonRN from 'radio-buttons-react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
const listOfSchools = ['Da Nang University of Technology', 'Others'];
const {height, width} = Dimensions.get('window');
function Form() {
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const dropdown = useRef(null);
  const GenderDropdown = useRef(null);
  const dispatch = useDispatch();
  const [infor, setInfor] = useState({});
  const [listUsers, setListUsers] = useState();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const loading = useSelector(state =>
    get(state, 'formReducers.infor.loading', false),
  );
  const [isPostingAnswer, setIsPostingAnswer] = useState(false);
  const navigation = useNavigation();

  const data = [
    {
      label: 'Yes',
      check: true,
    },
    {
      label: 'No',
      check: false,
    },
  ];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
    }).start();
  }, []);

  const onHandleChange = (value, inputName) => {
    setInfor({
      ...infor,
      [inputName]: value,
    });
  };

  const onChangeDate = selectedDate => {
    const currentDate = selectedDate || infor.birthday || new Date();
    setShow(Platform.OS === 'ios');
    if (selectedDate.type === 'set') {
      setInfor({
        ...infor,
        birthday: new Date(currentDate.nativeEvent.timestamp),
      });
    } else {
      return;
    }
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const onSubmit = () => {
    if (
      !infor.name ||
      !infor.mobile ||
      !infor.birthday ||
      !infor.university ||
      typeof infor.able_to_speak_english !== 'boolean' ||
      typeof infor.intern_at_least_3_months !== 'boolean' ||
      !infor.gender
    ) {
      Alert.notify(Constants.AlertInfo, 'Please Fill The Required Field!');
      return;
    } else if (!Validation.checkPhoneNumber(infor.mobile)) {
      Alert.notify(Constants.AlertInfo, 'Phone is invalid !');
      return;
    } else if (infor.email && !Validation.checkEmail(infor.email)) {
      Alert.notify(Constants.AlertInfo, 'Email is invalid !');
      return;
    }
    axios
      .post(`${Api.apiUrl}contacts/validate-submitted`, {
        email: infor.email,
        mobile: infor.mobile,
      })
      .then(function(response) {
        let temp = Object.assign({}, infor);
        temp['submited_date'] = String(new Date().toISOString()).toString();
        temp['season'] = 'summer';
        temp['birthday'] = temp.birthday.toISOString();
        dispatch(Actions.submit(temp));
        navigation.navigate('Home');
        console.log(response.data);
      })
      .catch(function(error) {
        Alert.error('Already exists phone and email');
        flag = false;
        return;
      })
      .finally(() => {
        setIsPostingAnswer(false);
      });
  };
  if (isPostingAnswer) {
    return (
      <View style={[styles.container, {justifyContent: 'center'}]}>
        <ActivityIndicator size="large" color={Colors.white} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.keyboard}>
        <View style={styles.header}>
          <Image style={styles.logo} source={logo} />
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Animated.View style={[styles.formWrapper, {opacity: fadeAnim}]}>
            <KeyboardAwareScrollView>
              <View style={styles.inputWrapper}>
                <View style={styles.input_section}>
                  <TextInput
                    maxLength={30}
                    style={styles.input}
                    placeholder="Full Name *"
                    onChangeText={value => {
                      onHandleChange(value, 'name');
                    }}
                  />
                </View>
                <View style={styles.input_section}>
                  <TextInput
                    maxLength={50}
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={value => {
                      onHandleChange(value, 'email');
                    }}
                  />
                </View>
                <View style={styles.input_section}>
                  <TextInput
                    maxLength={13}
                    style={styles.input}
                    placeholder="Phone Number *"
                    keyboardType="number-pad"
                    onChangeText={value => {
                      onHandleChange(value, 'mobile');
                    }}
                  />
                </View>
                <View style={styles.input_section}>
                  <TouchableOpacity
                    style={styles.input}
                    onPress={showDatepicker}>
                    <Text
                      style={{
                        color: infor.birthday ? 'black' : '#969696',
                        fontSize: 14,
                      }}>
                      {infor.birthday
                        ? infor.birthday.toLocaleDateString()
                        : 'Date of Birth *'}
                    </Text>
                  </TouchableOpacity>
                  {show && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={infor.birthday || new Date()}
                      mode={'date'}
                      display="default"
                      onChange={onChangeDate}
                    />
                  )}
                </View>
                <View style={styles.input_section}>
                  <TouchableOpacity
                    onPress={() => {
                      GenderDropdown.current.show();
                    }}
                    style={styles.input}>
                    <ModalDropdown
                      disabled={true}
                      ref={GenderDropdown}
                      onSelect={(_, value) => {
                        onHandleChange(value, 'gender');
                      }}
                      style={{padding: sizeScale(0)}}
                      dropdownTextStyle={{}}
                      dropdownStyle={{width: '82%'}}
                      defaultValue={'Gender *'}
                      textStyle={{fontSize: 14}}
                      options={['Female', 'Male']}
                      adjustFrame={style => {
                        style.left = style.left - 10;
                        style.height = 'auto';
                        return style;
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.input_section}>
                  <View style={styles.dropdownWrapper}>
                    <TouchableOpacity
                      onPress={() => {
                        dropdown.current.show();
                      }}
                      style={styles.input}>
                      <ModalDropdown
                        disabled={true}
                        ref={dropdown}
                        onSelect={value => {
                          onHandleChange(listOfSchools[value], 'university');
                        }}
                        style={{padding: sizeScale(0)}}
                        dropdownTextStyle={{}}
                        dropdownStyle={{width: '82%', height: sizeHeight(60)}}
                        defaultValue={'University *'}
                        textStyle={{fontSize: 14}}
                        options={listOfSchools}
                        adjustFrame={style => {
                          style.left = style.left - 10;
                          style.height = 'auto';
                          return style;
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.input_section}>
                  <Text style={styles.input_title}>
                    Can you intern full-time for at least 3 months?
                    <Text style={{color: '#e25a5a'}}> *</Text>
                  </Text>
                  <View style={styles.buttonRN_wrapper}>
                    <RadioButtonRN
                      animationTypes={['rotate']}
                      boxStyle={styles.box}
                      style={styles.box_wrapper}
                      textStyle={styles.text_box}
                      data={data}
                      selectedBtn={value =>
                        onHandleChange(value.check, 'intern_at_least_3_months')
                      }
                    />
                  </View>
                </View>
                <View style={styles.input_section}>
                  <Text style={styles.input_title}>
                    Are you able to speak in English?
                    <Text style={{color: '#e25a5a'}}> *</Text>
                  </Text>
                  <View style={styles.buttonRN_wrapper}>
                    <RadioButtonRN
                      animationTypes={['rotate']}
                      boxStyle={styles.box}
                      style={styles.box_wrapper}
                      textStyle={styles.text_box}
                      data={data}
                      selectedBtn={value =>
                        onHandleChange(value.check, 'able_to_speak_english')
                      }
                    />
                  </View>
                </View>
              </View>

              <Button
                style={styles.button}
                loading={loading}
                text="Enter"
                bgColor="#2f2f2f"
                onPress={() => onSubmit()}
              />
            </KeyboardAwareScrollView>
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#25076B',
  },
  keyboard: {
    marginTop: sizeScale(20),
    height: '100%',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  header: {
    ...Styles.justifyContentCenter,
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: '45%',
    height: sizeScale(60),
    resizeMode: 'contain',
  },
  formWrapper: {
    marginHorizontal: sizeScale(20),
    backgroundColor: '#f2f2f2',
    padding: sizeScale(10),
    borderRadius: 8,
    position: 'relative',
    marginBottom: sizeScale(20),
    justifyContent: 'center',
  },
  inputLabel: {
    marginTop: sizeScale(10),
  },
  input_section: {},
  button: {
    marginTop: sizeScale(10),
    paddingVertical: sizeScale(10),
    borderRadius: 5,
    backgroundColor: '#2F2F2F',
    height: sizeScale(40),
  },
  link: {
    alignSelf: 'center',
    marginTop: sizeScale(18),
  },
  input: {
    height: sizeScale(40),
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: sizeScale(10),
    borderColor: '#c4c4c4',
    paddingHorizontal: sizeScale(10),
    justifyContent: 'center',
  },
  footer: {
    alignItems: 'center',
    width: '100%',
    marginTop: sizeScale(160),
  },
  text: {
    width: '75%',
    color: '#848484',
    fontSize: 10,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    width: sizeScale(300),
    marginTop: sizeScale(8),
  },
  image: {
    width: sizeScale(15),
    height: sizeScale(15),
    marginRight: sizeScale(10),
  },
  input_title: {
    color: 'gray',
    fontSize: sizeFont(12),
  },
  buttonRN_wrapper: {
    marginLeft: sizeScale(5),
  },
  box_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: sizeHeight(40),
    width: '70%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  box: {
    width: sizeWidth(80),
    backgroundColor: '#f2f2f2',
    borderWidth: 0,
    marginTop: 0,
  },
  text_box: {
    marginLeft: sizeScale(15),
  },
});
export default Form;
