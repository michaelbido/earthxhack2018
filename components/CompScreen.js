import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Switch, KeyboardAvoidingView,
    TouchableWithoutFeedback, Keyboard, TouchableOpacity,
} from 'react-native';
import firebase from '../firebase';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 24,
        marginTop: '5%',
        marginBottom: '5%',
    },
    button1: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'green',
    },
});

class CompScreen extends Component {

    static navigationOptions = {
        title: 'Join a Competition',
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
            <View style={styles.container}>
                <TouchableOpacity style={styles.button1} onPress={() => this.props.navigation.navigate('GoNewComp')}>
                    <Text style={styles.buttonText}> Join a Competition </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button1} onPress={() => this.props.navigation.navigate('GoJoinComp')}>
                    <Text style={styles.buttonText}> Create a Competition </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default CompScreen;