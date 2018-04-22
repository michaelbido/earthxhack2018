import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class CompScreen extends Component {

    static navigationOptions = {
        title: 'Competition',
        headerStyle: {
          backgroundColor: 'green',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 24,
        },
      };

    render() {
        return (
            <View>
                <Text>Comp Screen</Text>
            </View>
        )
    }
}

export default CompScreen;