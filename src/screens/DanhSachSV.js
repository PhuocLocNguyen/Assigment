import React, { Component } from 'react';
import {View,Text,FlatList,Image,StyleSheet,Dimensions,TouchableHighlight} from 'react-native';
const {height} = Dimensions.get('window');
export default class DanhSachSV extends Component{
  constructor(props) {
    super(props);
    this.state = {
      dssv:[],
    }
  }
  loadDssv(){
    return fetch("http://192.168.56.1:3000/api/dssv", {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
    .then((response)=>response.json())
    .then((responseJson)=>{
       this.setState({
        dssv:responseJson.dssv
       })
    })
    .catch((e)=>{console.log(e)});
  }
  render(){
    return(
      <View style={styles.container}>
      <FlatList
        data={this.state.dssv}
        keyExtractor={(item) => item.ma}
        renderItem={({item}) =>(
        <TouchableHighlight
          onPress = {()=>this.props.navigation.navigate('ManHinh_SuaSV',{mssv:item.mssv,anh:item.anh,hoten:item.hoten,gioitinh:item.gioitinh,diachi:item.diachi})}>
          <View style={styles.rowStyle}>
            <View style={styles.rowStyleIcon}>
              <Image
                source={{ uri: 'data:image/jpeg;base64,' + item.anh }}
                style={{height:70,width:70}}
              />
            </View>

            <View style={styles.rowStyle1}>

                <Text style={styles.rowText}>Mssv      : {item.mssv}</Text>
                <Text style={styles.rowText}>Họ Tên    : {item.hoten}</Text>
                <Text style={styles.rowTextSdt}>Giới Tính : {item.gioitinh}</Text>
                <Text style={styles.rowText}>Địa chỉ    : {item.diachi}</Text>

            </View>
          </View>
          </TouchableHighlight>
        )}
      />
      </View>
    );
  }
  componentDidMount(){
    this.loadDssv();
   }
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#F5FCFF',
    marginBottom: 5,
  },
  Input: {
    height: 40,
    width: 420,
    fontSize: 18,
    borderWidth: 1,
    color: '#F5FCFF',
    borderColor: '#102027',
    borderRadius: 1,
    backgroundColor:'#4b2c20',
  },

  rowStyle: {
        backgroundColor: '#fff',
        flex: 1,
        borderBottomWidth:1,
        borderBottomColor:'#102027',
        flexDirection: 'row',
        padding:5,
        margin:8

    },
    rowStyleIcon: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    rowStyle1: {
          flex: 3,
      },
    rowStyle2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
        },
    rowText: {
        fontSize: 15,
        color: '#484848',
        marginLeft:5
    },
    rowTextSdt: {
        fontSize: 15,
        color: '#484848',
        marginLeft:5
    },
    add: {
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    wrapper:{
      height:height/8,
      backgroundColor:'#00b686',
      padding:10,
      justifyContent: 'space-around'
    },
    row1:{
      flexDirection:'row',
      justifyContent: 'space-between'
    },
    textInput:{
      marginTop:10,
      height:height/18,
      backgroundColor:'#fff',fontSize:12
    },
    iconStyle:{
      width: 25,
      height: 25
    },
    title:{
      color:'#fff',
      fontFamily:'Avenir',
      fontSize:20,
    }
});
