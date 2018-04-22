import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import firebase from '../firebase';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerSpace: {
        flex: 2,
    },
    headerText: {
        paddingTop: 20,
        fontSize: 28,
        fontWeight: "200",
    },
    normalText: {
        flex: 6,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 24,
      marginTop: '5%',
      marginBottom: '5%',
      
    },
    button1: {
      width: '25%',
      height: '100%',
      borderWidth: 0.5,
      borderColor: "white", 
      alignItems: 'center',
      backgroundColor: 'green',
    },
    imageFormat: {
        padding: 0,
        margin: 0,
        width: "80%",
        height: "80%",
    }
  });

class HomeScreen extends Component {

    static navigationOptions = {
        title: 'Home',
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
                    this.setState({ ['water']: parseInt(snapshot.val().water) / 16.0 });
                    this.setState({ ['points']: snapshot.val().points });
                    this.calculateLevel();
                })
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerSpace}>
                    <Text style={styles.headerText}>
                        Welcome home, {this.state.firstName}
                    </Text>
                </View>
                <View style={styles.normalText}>
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
                            Number of 16 fl oz. plastic water bottles saved from the ocean: {this.state.water}
                        </Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button1} onPress={() => this.props.navigation.navigate('NewLog', {onGoBack: () => this.componentWillMount()})}>
                        <Image
                            
                            source={require('../icons/triangular-arrows-sign-for-recycle.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button1} onPress={() => this.props.navigation.navigate('Comp', {onGoBack: () => this.componentWillMount()})}>
                        <Image
                            
                            source={require('../icons/multiple-users-silhouette.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button1} onPress={() => this.props.navigation.navigate('Water', {onGoBack: () => this.componentWillMount()})}>
                        <Image
                            
                            source={require('../icons/water.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button1} onPress={() => this.props.navigation.navigate('Leader', {onGoBack: () => this.componentWillMount()})}>
                        <Image
                            
                            source={require('../icons/trophy.png')}
                        />
                    </TouchableOpacity>
                </View>
                
            </View>
        )
    }
}

export default HomeScreen;