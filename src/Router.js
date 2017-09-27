import React from 'react';
import {StackNavigator,TabNavigator,TouchableOpacity,Image,View,Text} from 'react-navigation';
import DanhSachSV from './screens/DanhSachSV';
import ThemSV from './screens/ThemSV';
import SuaSV from './screens/SuaSV';

export const DanhSachSVStack= StackNavigator({
  ManHinh_DanhSachSV:{screen: DanhSachSV,
                navigationOptions:{
                  header:null,
                }
              },
  ManHinh_SuaSV:{screen: SuaSV,
                navigationOptions:{
                header:null,
                }
              },
})

export const ThemSVStack= StackNavigator({
  ManHinh_ThemSV:{screen: ThemSV,
                navigationOptions:{
                  header:null,
                }
              },
})
export const Tabbar = TabNavigator({

  ThemSV: {
    screen: ThemSVStack,
    navigationOptions:{
      tabBarLabel:'ThemSV'
    }
  },
  DanhSachSV: {
    screen: DanhSachSVStack,
    navigationOptions:{
      tabBarLabel:'DSSV',

    }
  },
},
  {
    tabBarPosition: 'bottom',
    tabBarOptions:{
      inactiveTintColor:'#4b2c20',
      activeTintColor:'#e64a19',
      style:{
        backgroundColor:'#6effe8'
      }
    }


})
