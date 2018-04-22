
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
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'green',
    },
});

class NewLogScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPaperCardboard: false,
            isPlastic: false,
            isMetal: false,
            isGlass: false,
            isTextile: false,
            totalItems: "0"
        }
        this.newLog = this.newLog.bind(this);
    }

    newLog = () => {
        firebase.auth().onAuthStateChanged(authUser => {
            if (authUser) {
                const ref = firebase.database().ref('users/' + authUser.uid + "/records");
                const data = {
                    isCardboard: this.state.isPaperCardboard.toString(),
                    isPlastic: this.state.isPlastic.toString(),
                    isMetal: this.state.isMetal.toString(),
                    isGlass: this.state.isGlass.toString(),
                    isTextile: this.state.isTextile.toString(),
                    totalItems: this.state.totalItems,
                };
                ref.push(data).then(() => {
                    const db = firebase.database().ref('users/' + authUser.uid);
                    db.once('value').then((snapshot) => {
                        var score = parseInt(snapshot.val().points);
                        score += parseInt(this.state.totalItems);
                        const update = firebase.database();
                        update.ref('users/' + authUser.uid + '/points').set(score.toString()).then(() => {
                            this.props.navigation.state.params.onGoBack();
                            this.props.navigation.goBack();
                        });
                    })
                    
                })
            }
        });
    }

    render() {
        return (
            <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss} accessible={false}>
            <KeyboardAvoidingView behavior="position">
                <Text>New Recycling Entry</Text>
                <Text> Total Number of Items (.e.g 1 bottle = 1, 1 box = 1, etc.):</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => this.setState({ ['totalItems']: text })}
                    value={this.state.email}
                    keyboardType="numeric"
                />
                <Text> Paper/Cardboard </Text>
                <Switch
                    value={this.state.isPaperCardboard} 
                    onValueChange={() => {this.setState({['isPaperCardboard']: !this.state.isPaperCardboard})}}
                />
                <Text> Plastic </Text>                
                <Switch
                    value={this.state.isPlastic} 
                    onValueChange={() => {this.setState({['isPlastic']: !this.state.isPlastic})}}
                />
                <Text> Metal </Text> 
                <Switch
                    value={this.state.isMetal} 
                    onValueChange={() => {this.setState({['isMetal']: !this.state.isMetal})}}
                />
                <Text> Glass </Text> 
                <Switch
                    value={this.state.isGlass} 
                    onValueChange={() => {this.setState({['isGlass']: !this.state.isGlass})}}
                />
                <Text> Textile </Text> 
                <Switch
                    value={this.state.isTextile} 
                    onValueChange={() => {this.setState({['isTextile']: !this.state.isTextile})}}
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

export default NewLogScreen;