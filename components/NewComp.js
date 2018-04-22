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

class NewComp extends Component {

    static navigationOptions = {
        title: 'Make a new Comp',
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
            compName: "",
        }
        this.newLog = this.newLog.bind(this);
    }

    newLog = () => {
        firebase.auth().onAuthStateChanged(authUser => {
            if (authUser) {
                const db = firebase.database().ref('users/' + authUser.uid);
                
                db.once('value').then((snapshot) => {
                    const name = snapshot.val().firstName + ' ' + snapshot.val().lastName;
                    const ref = firebase.database().ref('comps/' + this.state.compName + '/users/' + authUser.uid);
                    ref.set({username: name}).then(() => {
                        const db = firebase.database().ref('users/' + authUser.uid + '/comp');
                        db.set({compName: this.state.compName}).then(() => {
                            // this.props.navigation.state.params.onGoBack();
                            this.props.navigation.goBack();
                        });
                    });
                })
            }
        })
    }

    render() {
        return (
            <TouchableWithoutFeedback style={{width: '100%', height: '100%'}} onPress={Keyboard.dismiss} accessible={false}>
            <KeyboardAvoidingView style={styles.container}behavior="position">
                <Text>Set the name of the new competition you want to create: </Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => this.setState({ ['compName']: text })}
                    value={this.state.compName}
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

export default NewComp;