import React, { Component } from 'react';
import { View, AsyncStorage, StyleSheet, Text as Text2, ImageBackground } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Text } from 'native-base';
import Axios from 'axios';
import { ScrollView, TextInput } from 'react-native-gesture-handler';



class ListCon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            search : ''
        }

    }

    async componentDidMount() {
        const value = await AsyncStorage.getItem('data');
        const data = JSON.parse(value);
        // console.log(data)
        Axios({
            method: "GET",
            //  url: "https://api.fluxgen.in/aquagen/v1/industries/" + data.data.industry_id + "/consumption/latest",
             url: "https://api.fluxgen.in/aquagen/v1/industries/GKN1/total_consumption?duration=daily",
            headers: {
                "Authorization": data.data.token
            }
        }).then(res => res.data).then(res => {
            this.setState({ data: res.data });
            // console.log(res.data)
        });

        console.log(this.props.route.params.totalCost);
    }
  render() {
    const { data } = this.state;
    // console.log("Heylo",data.units," ")
    if (data && data.length) {
        var list = []
        
        Object.entries(data).map((item, key) => {
            list.push(item)
        })
        // console.log("hi", list)
        
        return (
            <ImageBackground source={require('../assets/background.jpeg')} style={{ flex: 1, width: null, height: null }}>
                <View style={styles.container}>
                    <View style={styles.firstBox}>
                        <Text2 style={{ textAlign: 'center', fontSize: 25, color: "#EBEBEB" }}>Consumption: {this.props.route.params.totalConsumption} kl</Text2>
                        <Text2 style={{ textAlign: 'center', fontSize: 20, color: "#CFCFCF" }}>Cost: ₹ {this.props.route.params.totalCost}</Text2>
                    </View>
                    <ScrollView >
                        {
                            Object.values(list).map((item, key) => {
                                console.log("Hey",item[1])
                                if(item[1].category.toUpperCase().includes(this.state.search.toUpperCase()) || this.state.search === '')
                                
                                {

                                return (
                                    <View key={key} style={{ backgroundColor: '#FFFFFF', borderRadius: 15, margin: 15, shadowOpacity: 1, shadowRadius: 15 }}>
                                        <Text style={{ marginLeft: 15, textDecorationStyle: 'solid', marginBottom: 15, marginTop: 15 }}>{item[1].category}</Text>
                                        <View 
                                            style={{
                                                borderBottomColor: '#2C2B2B',
                                                borderWidth: 2,
                                                borderBottomWidth: StyleSheet.hairlineWidth,
                                            }}
                                        />
                                        <View style={{ flexDirection: 'row', margin: 10 ,alignContent: "center", justifyContent:"center", alignSelf: "center"}}>
                                            <View style={{ flexDirection: 'column', alignContent: "center", justifyContent:"center", alignSelf: "center" }}>

                                                <Text style={styles.texttitle}   >Consumption</Text>
                                                <Text style={styles.textvalue}>
                                                    {item[1].total_consumption/1000} kl
                                                </Text>

                                                <Text style={styles.texttitle} >Cost</Text>
                                                <Text style={styles.textvalue}>
                                                ₹ {item[1].cost} 
                                                </Text>


                                               
                                            </View>
                                            {/* <View style={{ flexDirection: 'column' }}>


                                                <Text style={styles.texttitle} >Process </Text>
                                                <Text style={styles.textvalue}>
                                                    {item[1].process_consumption}
                                                </Text>

                                            

                                                <Text style={styles.texttitle} >Unit id</Text>
                                                <Text style={styles.textvalue}>
                                                    {item[1].unit_id}
                                                </Text>
                                            </View> */}
                                        </View>
                                    </View>
                                )
                                        }
                            })
                            
                        }
                    </ScrollView>
                </View>
            </ImageBackground>
               );
            } else {
                return (<ImageBackground source={require('../assets/loading.gif')} style={{ width: null, height: null }} />)
            }






     }




}
const styles = StyleSheet.create({
    textvalue: {
    marginLeft: 5,
    textDecorationStyle: 'solid'
    },
    texttitle: {
    color: '#CDCDCD', textDecorationStyle: 'solid', margin: 5
    },
    container: {
    marginTop: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily : 'Arial'
    },
    firstBox: {
    flex: 1,
    width: '80%',
    marginBottom: 25,
    height: '20%',
    shadowColor: '#000000'
    },
    secondBox: {
    width: '80%',
    borderRadius: 20,
    opacity : 0.8,
    height: '80%',
    backgroundColor: "#CDCDCD"
    },
    innerBox: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 20,
    borderWidth: 1,
    margin: 15
    }
    });
export default ListCon;