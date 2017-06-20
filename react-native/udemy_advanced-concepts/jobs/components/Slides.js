import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';

class Slides extends Component {
  renderSlides = () => {
    console.log('props: ', this.props);

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
    alignItems: 'center'
  },
  slideText: {
    fontSize: 30
  }
};

export default Slides;
