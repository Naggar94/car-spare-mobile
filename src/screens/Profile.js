import React from 'react';
import { Text, View} from 'react-native';

export default class Profile extends React.Component {
	constructor(props) {
		super(props)
    }

    render(){
    	return(
	    	<View style={{
	    		justifyContent:'center'
	    	}}>
	    		<Text>Profile</Text>
	    	</View>
	    );
    }
}