import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Card, Button } from 'react-native-elements';
import Swipe from '../components/Swipe';

class DeckScreen extends Component {
  renderCard(job) {
    const cacheEnabled = (Platform.OS === 'android');

    const initialRegion = {
      longitude: job.longitude,
      latitude: job.latitude,
      longitudeDelta: 0.045,
      latitudeDelta: 0.02
    };

    return (
      <Card>
        <View style={{ height: 300 }}>
          <MapView
            scrollEnabled={false}
            style={{ flex: 1 }}
            cacheEnabled={cacheEnabled}
            initialRegion={initialRegion}
          >
          </MapView>
        </View>

        <View style={styles.detailWrapper}>
          <Text>{job.company}</Text>
          <Text>{job.formattedRelativeTime}</Text>
        </View>

        <Text>
          {job.snippet.replace(/<b>/g, '').replace(/<\/b>/g, '')}
        </Text>
      </Card>
    );
  }

  cleanSnippet = (snippet) => {
    return snippet.replace(/<b>/g, '').replace(/<\/b>/g, '');
  }

  renderNoMoreCards() {
    return (
      <Card title="No More Jobs">
      </Card>
    );
  }

  render() {
    return (
      <View style={{ marginTop: 10 }}>
        <Swipe
          data={this.props.jobs}
          keyProp="jobkey"
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
        />
      </View>
    );
  }
}

const styles = {
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  }
};

const mapStateToProps = ({ jobs }) => {
  return { jobs: jobs.results };
};

export default connect(mapStateToProps)(DeckScreen);
