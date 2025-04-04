import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
  renderLastSlide = (index) => {
    if (index === this.props.data.length -1) {
      return (
        <View style={{ marginTop: 15 }}>
          <Button
            title="Onwards!"
            raised
            buttonStyle={styles.button}
            onPress={this.props.onComplete}
          />
        </View>
      );
    }
  }

  renderSlides = () => {
    return this.props.data.map((slide, index) => {
      return (
        <View
          key={slide.text}
          style={[styles.slide, { backgroundColor: slide.color}]}
        >
          <Text style={styles.slideText}>{slide.text}</Text>

          {this.renderLastSlide(index)}
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
    fontSize: 30,
    color: 'white'
  },
  button: {
    backgroundColor: '#0288D1',
  }
};

export default Slides;
