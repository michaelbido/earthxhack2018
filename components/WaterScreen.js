import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Switch, KeyboardAvoidingView,
    TouchableWithoutFeedback, Keyboard, TouchableOpacity,
} from 'react-native';
import firebase from '../firebase';

const styles = StyleSheet.create({
    textInput: {
      height: '6%', 
      width: '75%',
      borderColor: 'gray', 
      borderWidth: 1,
      backgroundColor: 'white',
      borderRadius: 4,
      padding: 6,
    },
    container: {
        flex: 3,
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
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'green',
    },
});

class WaterScreen extends Component {

    static navigationOptions = {
        title: 'Water Logging',
        headerStyle: {
          backgroundColor: 'green',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 24,
        },
      };

    constructor(props) {
        super(props);
        this.state = {
            totalOz: '0',
            timesFinished: '0',
        }
        this.newLog = this.newLog.bind(this);
    }

    newLog = () => {
        firebase.auth().onAuthStateChanged(authUser => {
            if (authUser) {
                const ref = firebase.database().ref('users/' + authUser.uid + "/waterConsumption");
                const data = {
                    totalOz: this.state.totalOz,
                    timesFinished: this.state.timesFinished,
                };
                ref.push(data).then(() => {
                    const db = firebase.database().ref('users/' + authUser.uid);
                    db.once('value').then((snapshot) => {
                        var score = parseInt(snapshot.val().water);
                        var totalPoints = parseInt(snapshot.val().points);
                        score += parseInt(this.state.timesFinished) * parseInt(this.state.timesFinished);
                        totalPoints += Math.floor(parseInt(this.state.timesFinished) * parseInt(this.state.timesFinished));
                        const update = firebase.database();
                        update.ref('users/' + authUser.uid + '/water').set(score.toString()).then(() => {
                            update.ref('users/' + authUser.uid + '/points').set(totalPoints.toString()).then(() => {
                                this.props.navigation.state.params.onGoBack();
                                this.props.navigation.goBack();
                            });
                        });
                    })
                    
                })
            }
        });
    }

    render() {
        return (
            <TouchableWithoutFeedback style={{width: '100%', height: '100%'}} onPress={Keyboard.dismiss} accessible={false}>
            <KeyboardAvoidingView style={styles.container}behavior="position">
                <Text>Reusable Bottle of Water Entry</Text>
                <Text>Size of Bottle (fl oz): </Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => this.setState({ ['totalOz']: text })}
                    value={this.state.totalOz}
                    keyboardType="numeric"
                />
                <Text>Number of times finished today: </Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => this.setState({ ['timesFinished']: text })}
                    value={this.state.timesFinished}
                    keyboardType="numeric"
                />
                    
                <View style={{ height: 60 }} />
                <TouchableOpacity style={styles.button1} onPress={() => this.newLog()}>
                    <Text style={styles.buttonText}> Submit </Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        )
    }
}

export default WaterScreen;