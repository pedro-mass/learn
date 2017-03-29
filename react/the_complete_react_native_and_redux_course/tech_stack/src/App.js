import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import { Header } from './components/common';

const App = () => {
  const pedro = 'pedro';
  console.log(pedro);

  return (
    <Provider store={createStore(reducers)}>
      <View>
        <Header text="Tech Stack" />
      </View>
    </Provider>
  );
};

export default App;
