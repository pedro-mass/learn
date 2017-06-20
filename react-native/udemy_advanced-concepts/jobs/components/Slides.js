import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
  renderSlides = () => {
    return this.props.data.map(slide => {
      return (
        <View key={slide.text} style={styles.slide}>
          <Text style={styles.slideText}>{slide.text}</Text>
        </View>
      );
    });
  }

  render() {
    return (
      <ScrollView
        horizontal
        pagingEnabled
      >
        {this.renderSlides()}
      </ScrollView>
    );
  }
}

const styles = {
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH
  },
  slideText: {
    fontSize: 30
  }
};

export default Slides;
