import React, { Component } from 'react';
import { View, Text, Platform, ScrollView, Linking } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import { MapView } from 'expo';

class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Review Jobs',
    headerRight: (<Button
                    title="Settings"
                    onPress={() => navigation.navigate('settings')}
                    backgroundColor="rgba(0,0,0,0)"
                    color="rgba(0, 122, 255, 1)" />),
    headerStyle: {
      marginTop: Platform.OS === 'android' ? Expo.Constants.statusBarHeight : undefined
    },
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="favorite" size={30} color={tintColor}/>
    }
  });

  renderLikedJobs = () => {
    return this.props.likedJobs.map(job => {
      const initialRegion = {
        longitude: job.longitude,
        latitude: job.latitude,
        longitudeDelta: 0.045,
        latitudeDelta: 0.02
      };

      return (
        <Card title={job.jobtitle} key={job.jobkey}>
          <View style={{ height: 200 }}>
            <MapView
              scrollEnabled={false}
              style={{ flex: 1 }}
              cacheEnabled={Platform.OS === 'android'}
              initialRegion={initialRegion}
            />

            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>{job.company}</Text>
              <Text style={styles.italics}>{job.formattedRelativeTime}</Text>
            </View>

            <Button
              title="Apply Now!"
              backgroundColor="#03A9F4"
              onPress={() => Linking.openURL(job.url)}
            />
          </View>
        </Card>
      );
    });
  }

  render() {
    return (
      <ScrollView>
        {this.renderLikedJobs()}
      </ScrollView>
    );
  }
}

const styles = {
  italics: {
    fontStyle: 'italic'
  },
  detailWrapper: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
};

const mapStateToProps = ({ likedJobs }) => {
  return { likedJobs };
}

export default connect(mapStateToProps)(ReviewScreen);
