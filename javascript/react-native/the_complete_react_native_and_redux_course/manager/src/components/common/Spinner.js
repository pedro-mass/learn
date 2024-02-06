import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = ({ size }) => {
  return (
    <View style={styles.spinnerStyle}>
      <ActivityIndicator size={size || 'large'} />
    </View>
  );
};

const styles = {
  spinnerStyle: {
    flex: 1, // take up all the space available
    justifyContent: 'center',  // vertical alignment
    alignItems: 'center'      // horizontal alignment
  }
};

export { Spinner };
