import React, { Component, PropTypes } from 'react';
import Meteor from 'react-native-meteor';
import Container from '../components/Container';
import { Header } from '../components/Text';
import LocateMeButton from '../components/LocateMeButton';
import config from '../config/config';
class FindNearMe extends Component {

  static route = {
    navigationBar: {
      visible: false,
    },
  }

  static propTypes = {
    navigator: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  handleGeolocationSuccess = (position) => {
    const params = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };

    this.setState({ loading: true });
    // use older syntax, since this allows this access in the function
    // also, name things like Collection.functionToActOnCollection for organiz.
    Meteor.call('Locations.getNearestLocations', params, (error, locations) => {
      if (error) {
        this.props.navigator.showLocalAlert(error.reason, config.errorStyles);
      } else {
        console.log('locations:', locations);
      }
      this.setState({ loading: false });
    });
  };

  // Not sure why error handling not being called
  handleGeolocationError = (error) => {
    this.props.navigator.showLocalAlert(error.message, config.errorStyles);
  };

  // pro tip, using this syntax handles all necessary binding
  // of thisso all functions in this JS class use the same this
  // it's equivalent to onPress={functionName.bind(this)}
  goToNearMe = () => {
    navigator.geolocation.getCurrentPosition(
      this.handleGeolocationSuccess,
      this.handleGeolocationError,
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  render() {
    return (
      <Container>
        <LocateMeButton onPress={this.goToNearMe} loading={this.state.loading} />
        <Header>
          Find Nearest Charging Stations
        </Header>
      </Container>
    );
  }
}

export default FindNearMe;
