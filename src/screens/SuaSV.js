import React, { Component } from 'react';
import {StyleSheet,View,Text,TextInput,TouchableOpacity,Dimensions,Image} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import pick from '../picker.js';

const {height} = Dimensions.get('window');
var radio_props = [
{label: 'Nam', value: 0  },
{label: 'Nữ', value: 1 },
];
export default class SuaSV extends Component{
  constructor(props) {
    super(props);
    this.state = {
      anh:this.props.navigation.state.params.anh,
      hoten: this.props.navigation.state.params.hoten,
      mssv:this.props.navigation.state.params.mssv,
      diachi:this.props.navigation.state.params.diachi,
      gioitinh:this.props.navigation.state.params.gioitinh,
      avatarSource:null,
      check_GioiTinh:null,
    }
  }
  showPicker(){
      pick((source,data)=>this.setState({avatarSource: source, anh: data}));
  }
  suaSV(){
    return fetch ('http://192.168.56.1:3000/api/update', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mssv: this.state.mssv,
        anh: this.state.anh,
        hoten: this.state.hoten,
        gioitinh: this.state.gioitinh,
        diachi: this.state.diachi
      })
    }).then(alert("Sửa SV thành công "))
    .then(this.props.navigation.navigate('ManHinh_DanhSachSV'))
    .catch((e)=>{console.log(e)});
  }

  xoaSV(){
    return fetch ('http://192.168.56.1:3000/api/delete' + '/' + this.state.mssv, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mssv: this.state.mssv
      })
    }).then(alert("Xóa SV thành công "))
    .then(this.props.navigation.navigate('ManHinh_DanhSachSV'))
    .catch((e)=>{console.log(e)});
  }

  ganGiaTri_GioiTinh(value){
    if(value==0){
      this.setState({gioitinh:"Nam"})
    }
    else{
      this.setState({gioitinh:"Nu"})
    }
  }

  check_GioiTinh(){
    if(this.state.gioitinh=="Nam"){
      this.setState({check_GioiTinh:0})
    }
    else{
      this.setState({check_GioiTinh:1})
    }
  }
  componentWillMount(){
    this.check_GioiTinh();
   }
  render(){
    const {container,textAdd,textInput,viewInput,viewAdd,iconStyle,viewImage,viewRadio}=styles;
    let img=this.state.avatarSource == null ?
    <TouchableOpacity  onPress = {() => this.showPicker()} >
      <Image
        source={{ uri: 'data:image/jpeg;base64,' + this.state.anh }}
        style={iconStyle}
      />
    </TouchableOpacity>
     :
    <TouchableOpacity  onPress = {() => this.showPicker()} >
      <Image
        source={this.state.avatarSource}
        style={iconStyle}
      />
    </TouchableOpacity>
    return(
      <View style={container}>
        <View style={viewImage}>
          {img}
        </View>
        <View style={viewInput}>
          <TextInput
            style={textInput}
            placeholder = 'Nhập Họ Tên : '
            onChangeText={(hoten) => this.setState({hoten})}
            value={this.state.hoten}
          />
        </View>

        <View style={viewInput}>
          <TextInput
            style={textInput}
            placeholder = 'Nhập Mã Số SV : '
            onChangeText={(mssv) => this.setState({mssv})}
            value={this.state.mssv}
          />
        </View>

        <View style={viewInput}>
          <TextInput
            style={textInput}
            placeholder = 'Nhập Địa Chỉ : '
            onChangeText={(diachi) => this.setState({diachi})}
            value={this.state.diachi}
          />
        </View>

        <View style={viewInput}>
          <Text style={{fontSize:20}}>Giới Tính :</Text>
        </View>

        <View style={viewRadio}>
            <RadioForm
              radio_props={radio_props}
              initial={this.state.check_GioiTinh}
              formHorizontal={true}
              onPress={(value) => {this.setState({value});this.ganGiaTri_GioiTinh(value)}}
            />
        </View>

        <View style={viewAdd}>
          <TouchableOpacity onPress = {()=>this.suaSV()}>
            <Text style ={textAdd}>Sửa</Text>
          </TouchableOpacity>
        </View>

        <View style={viewAdd}>
          <TouchableOpacity onPress = {()=>this.xoaSV()}>
            <Text style ={textAdd}>Xóa</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

}
  const styles = StyleSheet.create({
    container: {
      height:height,
    },
    textAdd: {
      fontSize: 20,
      textAlign: 'center',
      color: '#F5FCFF',
      justifyContent: 'center',
      alignItems: 'center',
    },
    textInput: {
      fontSize: 20,
      borderWidth: 1,
      padding:10,
      color: 'black',
      borderColor: '#484848',
      borderRadius: 1,
      backgroundColor:"#fff"
    },
    viewInput: {
      height:height/9,
      padding:10,
      marginTop:1,
    },
    viewImage: {
      justifyContent: 'center',
      alignItems: 'center',
      height:height/8,
      padding:10,
      marginTop:3,
    },
    viewRadio: {
      justifyContent: 'center',
      alignItems: 'center',
      height:height/12,
      padding:10,
      marginTop:1,
    },
    viewAdd: {
      height:height/14,
      padding:5,
      margin:5,
      marginTop:5,
      backgroundColor: '#3366FF',
    },
    iconStyle:{
      width: 80,
      height: 80
    },
  });
