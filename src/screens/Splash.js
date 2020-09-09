import React from 'react';
import { Text, View} from 'react-native';

export default class Splash extends React.Component {
	constructor(props) {
		super(props)
    }

    componentDidMount(){
    	this.props.navigation.navigate('Auth');
    }

    render(){
    	return(
	    	<View style={{
	    		justifyContent:'center'
	    	}}>
	    		<Text>Splash Screen</Text>
	    	</View>
	    );
    }
}