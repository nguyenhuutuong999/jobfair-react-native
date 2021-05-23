import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import {RankingContainer, ResultContainer} from '@/components';
import {Colors, sizeFont, sizeHeight, Styles} from '@/commons';

const initialLayout = {width: Dimensions.get('window').width};
export default function Ranking({route}) {
  
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Result'},
    {key: 'second', title: 'Ranking'},
  ]);

  const renderScene = SceneMap({
    first: () => <ResultContainer route={route} />,
    second: () => <RankingContainer />,
  });
 
  const renderTabBar = props => {
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          let active = index === i ? styles.active : {};
          let activeText = index === i ? styles.activeText : {};
          return (
            <TouchableOpacity
              style={[styles.tabBarItem, active]}
              key={i}
              onPress={() => setIndex(i)}>
              <Text style={[styles.tabBarText, activeText]}>{route.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
        tabBarPosition = "bottom"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#25076B',
  },
  scene: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#432577'
  },
  tabBarItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.navigation,
    padding: sizeHeight(10),
  },
  tabBarText: {
    fontSize: sizeFont(13),
    fontWeight: '800',
    color: '#c6c6c6',
    ...Styles.styleFontText,
    fontSize: sizeFont(16),
  },
  active: {
    backgroundColor: '#936BD5',
    color: Colors.black,
  },
  activeText: {
    color: Colors.black,
  },
});
