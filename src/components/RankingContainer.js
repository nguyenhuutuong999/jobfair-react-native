import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import {gold_cup, silver_cup, bronze_cup, profile} from '@/assets/icons';
import {
  Api,
  Colors,
  sizeFont,
  sizeHeight,
  sizeScale,
  sizeWidth,
  Styles,
} from '@/commons';
import {connect} from 'react-redux';
import axios from 'axios';
import Alert from '@/utils/alert';

const {width, height} = Dimensions.get('window');
const mapDispatchToProps = () => {};
const mapStateToProps = state => {
  return {
    inforState: state.formReducers.data,
  };
};
class RankingContainers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          id: '',
          name: '',
          email: '',
          mobile: '',
          birthday: '',
          university: 'a',
          intern_at_least_3_months: true,
          able_to_speak_english: true,
          submited_date: '',
          submited_total_time: 0,
          total_correct_anwser: 0,
          total_incorrect_anwser: 0,
          total_anwser: 0,
        },
      ],
    };
    this.mark = 0;
  }

  async componentDidMount() {
    let count = 1;
    let infor = await axios
      .get(`${Api.apiUrl}contacts/ranking`)
      .then(function(response) {
        return response.data;
      })

      .catch(function(error) {
        Alert.error('Something went wrong!')
      });

      infor.forEach(function(element) {
        element.count = count++;
      });

    this.setState({
      list: infor,
    });

  }
  convertTime = time => {
    return Math.floor(time/60) + 'm ' + time%60 + 's';
  };

  renderItem({item}) {
    if(item.count > 3){
      return (
        <View
          style={[styles.listItem, item.mobile == this.props.inforState.mobile?styles.active:'']}
          key={this.count}>
          <Text style={styles.places_item}>{item.count}</Text>
          <View style={styles.wrapper_image}>
            <Image style={styles.profile_image} source={profile} />
          </View>
          <Text style={styles.name_item}>{item.name}</Text>
          <View style={styles.infor_item}>
            <Text style={styles.correct_item}>
              {item.total_correct_anwser}/10
            </Text>
            <Text style={styles.time_item}>
              {this.convertTime(item.submited_total_time)}
            </Text>
          </View>
        </View>
      );
    }

   
  }

  getItemLayout(data, index) {
    return {
      length: styles.listItem.height,
      offset: styles.listItem.height * index,
      index,
    };
  }

  render() {
    let {list} = this.state;
    let top1 = list[0]?list[0]:[];
    let top2 = list[1]?list[1]:[];
    let top3 = list[2]?list[2]:[];
    
   // let cv = (item) => this.convertTime(item)
    return (
      <View style={styles.container}>
        <View style={styles.container_top}>
          <View style={[styles.ranking]}>
            <View style={styles.imageWrapper}>
              <Image
                style={[
                  styles.cup,
                  {
                    marginTop: sizeHeight(35),
                  },
                ]}
                source={silver_cup}
              />
            </View>
            <View style={styles.inforWrapper}>
              <Text style={styles.name}>{top2.name ? top2.name : ''}</Text>
              <Text style={styles.correct}>
                {top2.total_correct_anwser ? top2.total_correct_anwser+'/10' : ''}
              </Text>
              <Text style={styles.time}>
              {top2.submited_total_time !== '' ? this.convertTime(top2.submited_total_time) : ''}
              </Text>
            </View>
            <View style={[{backgroundColor: '#97E4EE'}, styles.section]}>
              <Text style={[styles.place, {fontSize: sizeFont(40)}]}>2</Text>
            </View>
          </View>

          <View style={[styles.ranking]}>
            <View style={styles.imageWrapper}>
              <Image style={styles.cup} source={gold_cup} />
            </View>
            <View style={styles.inforWrapper}>
            <Text style={styles.name}>{top1.name ? top1.name : ''}</Text>
              <Text style={styles.correct}>
                {top1.total_correct_anwser ? top1.total_correct_anwser+'/10' : ''}
              </Text>
              <Text style={styles.time}>
              {top1.submited_total_time !== '' ? this.convertTime(top1.submited_total_time) : ''}
              </Text>
            </View>
            <View style={[{backgroundColor: '#FF856F'}, styles.section]}>
              <Text style={[styles.place, {fontSize: sizeFont(50)}]}>1</Text>
            </View>
          </View>
          <View style={[styles.ranking]}>
            <View style={styles.imageWrapper}>
              <Image
                style={[styles.cup, {marginTop: sizeHeight(45)}]}
                source={bronze_cup}
              />
            </View>
            <View style={styles.inforWrapper}>
            <Text style={styles.name}>{top3.name ? top3.name : ''}</Text>
              <Text style={styles.correct}>
                {top3.total_correct_anwser ? top3.total_correct_anwser+'/10' : ''}
              </Text>
              <Text style={styles.time}>
                {top3.submited_total_time !== '' ? this.convertTime(top3.submited_total_time) : ''}
              </Text>
            </View>
            <View style={[styles.section, {backgroundColor: '#C4C4C4'}]}>
              <Text style={styles.place}>3</Text>
            </View>
          </View>
        </View>

        <View style={styles.containerList}>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
           
            data={this.state.list}
            renderItem={this.renderItem.bind(this)}
            keyExtractor={(item, key) => key}
            getItemLayout={this.getItemLayout.bind(this)}
            style={{
              margin: 0,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              backgroundColor: 'white',
              marginTop: sizeScale(10),
            }}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  container_top: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: sizeWidth(15),
  },
  containerList: {
    flex: 1.3,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderRadius: 30,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
  },

  ranking: {
    width: width / 3 - 20,
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '10%',
  },
  cup: {
    width: sizeScale(70),
    height: sizeScale(70),
    marginTop: 15,
  },
  inforWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    color: 'white',
  },
  name: {
    fontSize: sizeFont(17),
    color: 'white',
    ...Styles.styleFontText,
    textAlign: 'center',
  },
  correct: {
    fontSize: sizeFont(12),
    color: '#A8A8A8',
    ...Styles.styleFontText,
  },
  time: {
    fontSize: sizeFont(12),
    color: '#A8A8A8',
    ...Styles.styleFontText,
  },
  section: {
    // height: '100%',
    width: '80%',
    borderTopLeftRadius: sizeScale(10),
    borderTopRightRadius: sizeScale(10),
    alignItems: 'center',
  },
  place: {
    fontSize: sizeFont(30),
    ...Styles.styleFontText,
    color: 'white',
  },

  flatlist: {
    paddingTop: sizeScale(5),
    height: '60%',
    zIndex: 2,
  },
  listItem: {
    flex: 1,
    height: sizeHeight(56),
    justifyContent: 'center',
    paddingLeft: sizeScale(5),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#ededed',
    paddingHorizontal: sizeScale(15),
  },
  item: {
    width: width,
    height: sizeScale(50),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ededed',
    marginTop: sizeScale(10),
    paddingHorizontal: sizeScale(25),
  },
  places_item: {
    fontSize: sizeFont(22),
    ...Styles.styleFontText,
    width: '10%',
    textAlign: 'center',
    color: '#84a4cc',
  },
  infor_item: {
    ...Styles.styleFontText,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft: sizeScale(5),
    width: '18%',
    //backgroundColor:'red'
  },
  name_item: {
    fontSize: sizeFont(16),
    ...Styles.styleFontText,
    width: '60%',
    textAlign: 'center',
    color: '#7394bc',
  },
  time_item: {
    fontSize: sizeFont(15),
    ...Styles.styleFontText,
    color: '#84a4cc',
  },
  correct_item: {
    fontSize: sizeFont(15),
    ...Styles.styleFontText,
    color: '#84a4cc',
  },
  wrapper_image: {
    width: '10%',
    marginHorizontal: sizeScale(5),
  },
  profile_image: {
    width: sizeWidth(35),
    height: sizeHeight(35),
  },
  active: {
    backgroundColor: '#eaeaea',
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(RankingContainers);
