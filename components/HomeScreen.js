import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import firebase from '../firebase';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'lightgreen',
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

class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            firstName: null,
            lastName: null,
            points: null,
            level: null,
            progress: null,
            progressCap: null,
            water: null,
        }
        this.calculateLevel = this.calculateLevel.bind(this);
    }

    calculateLevel = () => {
        var score = this.state.points;
        var lvl = 0;
        var nextLvl = 10;
        var prevLevelCap = 0;
        for (var i = 1; nextLvl < score; i++) {
            if (score > (i * 10)) {
                prevLevelCap = nextLvl;
                nextLvl += 10 * i;
                lvl++;
            }
        }
        this.setState({ ['level']: lvl });
        this.setState({ ['progress']: this.state.points });
        this.setState({ ['progressCap']: nextLvl })
    }

    componentWillMount() {
        console.log(firebase.auth());
        firebase.auth().onAuthStateChanged(authUser => {
            authUser
                ? this.setState(() => ({ ['user']: authUser }))
                : this.setState(() => ({ ['user']: null }));
            if (authUser) {
                firebase.database().ref('users/' + authUser.uid).once('value')
                .then((snapshot) => {
                    this.setState({ ['firstName']: snapshot.val().firstName });
                    this.setState({ ['lastName']: snapshot.val().lastName });
                    this.setState({ ['water']: snapshot.val().water });
                    this.setState({ ['points']: snapshot.val().points });
                    this.calculateLevel();
                })
            }
        });
    }

    render() {
        return (
            <View>
                <Text>Home Screen</Text>
                <View>
                    <Text>
                        Welcome back, {this.state.firstName}
                    </Text>
                </View>
                <View>
                    <View>
                        <Text>
                            POINTS: {this.state.points}
                        </Text>
                    </View>
                    <View>
                        <Text>
                            Level: {this.state.level}
                        </Text>
                    </View>
                    <View>
                        <Text>
                            Progress: {this.state.progress} / {this.state.progressCap}
                        </Text>
                    </View>
                    <View>
                        <Text>
                            Plastic water bottles saved from ocean: {this.state.water}
                        </Text>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.button1} onPress={() => this.props.navigation.navigate('NewLog', {onGoBack: () => this.componentWillMount()})}>
                            <Text style={styles.buttonText}> New Recycle Log </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button1} onPress={() => this.props.navigation.navigate('Comp')}>
                            <Text style={styles.buttonText}> Groups </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button1} onPress={() => this.props.navigation.navigate('Water')}>
                            <Text style={styles.buttonText}> H20 </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button1} onPress={() => this.props.navigation.navigate('Leader')}>
                            <Text style={styles.buttonText}> Leaderboards </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

export default HomeScreen;