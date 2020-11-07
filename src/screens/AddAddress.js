import React from 'react';
import { Text, View} from 'react-native';

export default class AddAddress extends React.Component {
	constructor(props) {
		super(props)
    }

    render(){
    	return(
	    	<View style={{
	    		justifyContent:'center'
	    	}}>
	    		<Text>Register</Text>
	    	</View>
	    );
    }
}