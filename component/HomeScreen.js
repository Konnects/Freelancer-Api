import React, { Component } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, StyleSheet, Dimensions, ScrollView } from 'react-native';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalConsumptionDaily : 0,
            totalConsumptionWeekly: 0,
            totalConsumptionMonthly: 0,
            totalCostDaily: 0,
            totalCostMonthly:0,
            totalCostWeekly:0
            
        }
    }


    cumulativeConsumptionDaily = 0;
    cumulativeConsumptionMonthly = 0;
    cumulativeConsumptionWeekly = 0;
    cumulativeCostDaily = 0;
    cumulativeCostMonthly = 0;
    cumulativeCostWeekly = 0;

    async componentDidMount() {
        const value = await AsyncStorage.getItem('data');
        const data = JSON.parse(value);
        
        //Get the daily data and set it to state
        Axios.get('https://api.fluxgen.in/aquagen/v1/industries/GKN1/total_consumption?duration=daily', { headers : {
            "Authorization" : data.data.token
        }}).then(result => {
            result.data.data.forEach(element => {
                this.cumulativeConsumptionDaily += element.total_consumption;
                this.cumulativeCostDaily += element.cost;
            })
        }).then(() => this.setState({totalConsumptionDaily: this.cumulativeConsumptionDaily, totalCostDaily: this.cumulativeCostDaily}));
        
        //Get the monthly data and set it to state
        Axios.get('https://api.fluxgen.in/aquagen/v1/industries/GKN1/total_consumption?duration=monthly', { headers : {
            "Authorization" : data.data.token
        }}).then(result => {
            result.data.data.forEach(element => {
                this.cumulativeConsumptionMonthly += element.total_consumption;
                this.cumulativeCostMonthly += element.cost;
            })
        }).then(() => this.setState({totalConsumptionMonthly: this.cumulativeConsumptionMonthly, totalCostMonthly: this.cumulativeCostMonthly}));
        
        //Get the weekly data and set it to state
        Axios.get('https://api.fluxgen.in/aquagen/v1/industries/GKN1/total_consumption?duration=weekly', { headers : {
            "Authorization" : data.data.token
        }}).then(result => {
            result.data.data.forEach(element => {
                this.cumulativeConsumptionWeekly += element.total_consumption;
                this.cumulativeCostWeekly += element.cost;
            })
        }).then(() => this.setState({totalConsumptionWeekly: this.cumulativeConsumptionWeekly, totalCostWeekly: this.cumulativeCostWeekly}));
    }

    render() {
        return (
            <ScrollView contentContainerStyle = {styles.container} >
                
                {/*Daily*/}
                <TouchableOpacity onPress = {() => this.props.navigation.navigate('Daily Con', { totalCost: this.state.totalCostDaily, totalConsumption: this.state.totalConsumptionDaily })} style = {styles.cardContainer} >
                    <Text style = {styles.heading}>Daily</Text>
                    <View style = {styles.border} ></View>
                    <Text style = {styles.consumptionText} >Total Consumption</Text>
                    <Text style = {styles.consumptionValue} >{this.state.totalConsumptionDaily} kL</Text>
                </TouchableOpacity>
                
                {/*Weekly*/}
                <TouchableOpacity onPress = {() => this.props.navigation.navigate('Weekly Con', { totalCost: this.state.totalConsumptionWeekly, totalConsumption: this.state.totalCostWeekly })} style = {styles.cardContainer} >
                    <Text style = {styles.heading}>Weekly</Text>
                    <View style = {styles.border} ></View>
                    <Text style = {styles.consumptionText} >Total Consumption</Text>
                    <Text style = {styles.consumptionValue} >{this.state.totalConsumptionWeekly} kL</Text>
                </TouchableOpacity>
                
                {/*Monthly*/}
                <TouchableOpacity onPress = {() => this.props.navigation.navigate('Monthly Con', { totalCost: this.state.totalCostMonthly, totalConsumption: this.state.totalConsumptionMonthly })} style = {styles.cardContainer} >
                    <Text style = {styles.heading}>Monthly</Text>
                    <View style = {styles.border} ></View>
                    <Text style = {styles.consumptionText} >Total Consumption</Text>
                    <Text style = {styles.consumptionValue} >{this.state.totalConsumptionMonthly} kL</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardContainer: {
        width: WIDTH/1.5,
        borderWidth: 1,
        borderColor: 'black',
        height: 180,
        borderRadius: 25,
        padding: 10,
        backgroundColor: '#280d49',
        paddingVertical: 20,
        marginBottom: 20
    },
    heading: {
        color: 'white',
        fontSize: 28
    },
    consumptionText: {
        color: "white",
        marginTop: 5,
        fontSize: 26,
        
    },
    consumptionValue: {
        color: 'white',
        fontSize: 24,
    },
    border: {
        borderWidth: 1, borderColor: 'white',
        marginTop: 10
    }

})




