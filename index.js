import React, {useEffect, useRef} from 'react';
import {AppRegistry, Platform, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import DropdownAlert from 'react-native-dropdownalert';
import {store, persistor} from '@/store';
import Alert from '@/utils/alert';
import RootRouter from '@/routers';
import {Colors} from '@/commons';
import {name as appName} from './app.json';

const App = () => {
  let alert = useRef(null);

  useEffect(() => {
    Alert.addAlertListener((data) => {
      const {type, title, message} = data;
      if (alert) alert.alertWithType(type, title, message);
    });
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}

        <NavigationContainer>
          <RootRouter />
        </NavigationContainer>

        <DropdownAlert
          ref={(ref) => (alert = ref)}
          inactiveStatusBarStyle="dark-content"
          inactiveStatusBarBackgroundColor={Colors.white}
          containerStyle={{
            backgroundColor: Colors.lochmara,
          }}
        />
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => App);
