import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class LeaderScreen extends Component {

    static navigationOptions = {
        title: 'Leaderboard',
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
                <Text>Leader Screen</Text>
            </View>
        )
    }
}

export default LeaderScreen;