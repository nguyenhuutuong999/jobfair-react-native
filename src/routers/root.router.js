import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Form, Ranking, Home} from '@/screens';
const Stack = createStackNavigator();

function RootStack() {

  return (
    <Stack.Navigator

      initialRouteName="Form"

      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
      }}>
     <Stack.Screen name="Form" component={Form} />
     <Stack.Screen name="Home" component={Home} />
     <Stack.Screen name="Ranking" component={Ranking} />
    </Stack.Navigator>
  );
}

export default RootStack;
