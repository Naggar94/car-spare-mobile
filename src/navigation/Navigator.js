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
import PhoneLoginScreen from '../screens/PhoneLogin';
import RegisterScreen from '../screens/Register';
import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile';
import SplashScreen from '../screens/Splash';
import AuthenticatingScreen from '../screens/Authentication';
import ModelGridListScreen from '../screens/ModelGridList';
import SubModelListScreen from '../screens/SubModelList';
import TypeGridListScreen from '../screens/TypeGridList';
import ManufactureDateListScreen from '../screens/ManufactureDateList';
import PartsListScreen from '../screens/PartsList';
import CartScreen from '../screens/Cart';
import i18n from './../i18n';

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

HomeStack.navigationOptions = ({ navigation }) => {
	return {
		tabBarLabel: i18n.t('bottomBar.home'),
		tabBarIcon: ({ focused, horizontal, tintColor }) => (
			<Icon name="home" size={25} color={tintColor} />
		)
	}
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

CartStack.navigationOptions = ({ navigation }) => ({
	tabBarLabel: i18n.t('bottomBar.cart'),
	tabBarIcon: ({ focused, horizontal, tintColor }) => (
		<Icon name="cart" size={25} color={tintColor} />
	)
});

const ProfileStack = createStackNavigator({  
	Profile:ProfileScreen 
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
});

ProfileStack.navigationOptions = ({ navigation }) => ({
	tabBarLabel: i18n.t('bottomBar.profile'),
	tabBarIcon: ({ focused, horizontal, tintColor }) => (
		<Icon name="person" size={25} color={tintColor} />
	)
});

const AuthStack = createStackNavigator({  
	Login:LoginScreen, 
	PhoneLogin:PhoneLoginScreen,
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

AuthStack.navigationOptions = ({ navigation }) => ({
  tabBarLabel: i18n.t('bottomBar.profile'),
  tabBarIcon: ({ focused, horizontal, tintColor }) => (
    <Icon name="person" size={25} color={tintColor} />
  )
});


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
	  Authenticating: AuthenticatingScreen,
	  App: MainNavigator,
	  Auth: AuthNavigator,
	},
	{
	  initialRouteName: 'Splash',
	}
);

const AppContainer = createAppContainer(SwitchNavigator)

export default AppContainer;