import React from 'react';
import { View, ActivityIndicator, StyleSheet , YellowBox } from 'react-native';
import Navigation from './src/routes/Navigation';
import { PersistGate } from "redux-persist/es/integration/react";
import { connect } from "react-redux";
import { Root } from "native-base";
import { Provider } from "react-redux";
import configureStore from "./src/store/index";

const { persistor, store } = configureStore();

export default function App() {
 
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Root>
          <Navigation />
       </Root>
      </PersistGate>
    </Provider>
  );
}

