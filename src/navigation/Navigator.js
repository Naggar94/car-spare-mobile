import React from 'react';
import {
  createDrawerNavigator,
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";

import {
  createStackNavigator
} from "react-navigation-stack";

import {
  createBottomTabNavigator
} from "react-navigation-tabs";

import Icon from 'react-native-vector-icons/Ionicons';

import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile';
import SplashScreen from '../screens/Splash';
import ModelGridListScreen from '../screens/ModelGridList';
import SubModelListScreen from '../screens/SubModelList';
import TypeGridListScreen from '../screens/TypeGridList';
import ManufactureDateListScreen from '../screens/ManufactureDateList';
import PartsListScreen from '../screens/PartsList';
import CartScreen from '../screens/Cart';

const HomeStack = createStackNavigator({  
	Home:HomeScreen,
	ModelGridList:ModelGridListScreen,
	TypeGridList:TypeGridListScreen,
	SubModelList:SubModelListScreen,
	ManufactureDateList:ManufactureDateListScreen,
	PartsList:PartsListScreen,
},
{
	defaultNavigationOptions: {
		headerStyle: {
			backgroundColor: '#034d7e',
		},
		headerTintColor: '#fff',
		headerTitleStyle:{
			textAlign:'center',
			fontWeight: 'bold',
		}
	}
}
);

HomeStack.navigationOptions = {
  tabBarLabel: "الرئيسية",
  tabBarIcon: ({ focused, horizontal, tintColor }) => (
    <Icon name="home" size={25} color={tintColor} />
  )
};

const CartStack = createStackNavigator({  
	Cart:CartScreen,
},
{
	defaultNavigationOptions: {
		headerStyle: {
			backgroundColor: '#034d7e',
		},
		headerTintColor: '#fff',
		headerTitleStyle:{
			textAlign:'center',
			fontWeight: 'bold',
		}
	}
}
);

CartStack.navigationOptions = {
  tabBarLabel: "الدفع",
  tabBarIcon: ({ focused, horizontal, tintColor }) => (
    <Icon name="cart" size={25} color={tintColor} />
  )
};

const ProfileStack = createStackNavigator({  
	Profile:ProfileScreen 
});

ProfileStack.navigationOptions = {
  tabBarLabel: "الملف الشخصي",
  tabBarIcon: ({ focused, horizontal, tintColor }) => (
    <Icon name="person" size={25} color={tintColor} />
  )
};

const AuthStack = createStackNavigator({  
	Login:LoginScreen, 
	Register:RegisterScreen 
},
{
	defaultNavigationOptions: {
		headerStyle: {
			backgroundColor: '#034d7e',
		},
		headerTintColor: '#fff',
		headerTitleStyle:{
			textAlign:'center',
			fontWeight: 'bold',
		}
	}
}
);

AuthStack.navigationOptions = {
  tabBarLabel: "الملف الشخصي",
  tabBarIcon: ({ focused, horizontal, tintColor }) => (
    <Icon name="person" size={25} color={tintColor} />
  )
};


const MainNavigator = createBottomTabNavigator({
	HomeStack,
	CartStack,
	ProfileStack
});

const AuthNavigator = createBottomTabNavigator({
	HomeStack,
	CartStack,
	AuthStack
});

const SwitchNavigator = createSwitchNavigator(
	{
	  Splash: SplashScreen,
	  App: MainNavigator,
	  Auth: AuthNavigator,
	},
	{
	  initialRouteName: 'Splash',
	}
);

const AppContainer = createAppContainer(SwitchNavigator)

export default AppContainer;