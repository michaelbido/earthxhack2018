import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native';
import firebase from '../firebase';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'lightgreen',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brand: {
    color: 'white',
    fontSize: 32,
  },
  loginText: {
    color: 'white',
    fontSize: 24,
  },
  textInput: {
    height: '6%', 
    width: '75%',
    borderColor: 'gray', 
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 6,
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    marginTop: '5%',
    marginBottom: '5%',
  },
  wideButton1: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  wideButton2: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#00B1F9',
  },
});

class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      signup: false,
      signin: false,
      email: '',
      password: ''
      
    }

    this.addUser = this.addUser.bind(this);
    this.byPropKey = this.byPropKey.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  byPropKey = (propName, val) => () => ({
    [propName]: val,
  })

  addUser = (email, password) => {
    // firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    //   // Handle Errors here.
    //   // this.setState({ error: true });

    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   // [START_EXCLUDE]
    //   if (errorCode == 'auth/weak-password') {
    //     console.log("Weak Password");
    //   } else {
    //     console.log(errorMessage);
    //   }
    //   console.log(error);
    //   // [END_EXCLUDE]
    // });
    // // [END createwithemail]

  }

  loginUser = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      if (firebase.auth().currentUser !== null) {
        this.props.update(firebase.auth().currentUser.uid);
      }
    })
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.brand}>Login Screen</Text>
        <Text style={styles.brand}>Email</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({ ['email']: text })}
          value={this.state.email}
          keyboardType="email-address"
          autoCapitalize='none'
        />
        <Text style={styles.brand} >Password</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({ ['password']: text })}
          value={this.state.text}
          secureTextEntry={true}
          autoCapitalize='none'
        />
        <TouchableOpacity style={styles.wideButton1} onPress={() => this.loginUser(this.state.email, this.state.password)}>
          <Text style={styles.buttonText}> Login </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.wideButton2} onPress={() => this.props.update()}>
          <Text style={styles.buttonText}> Sign Up </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default LoginScreen;