 'use strict';
 var React = require('react-native');
 var {
 	AppRegistry,
 	Image,
 	StyleSheet,
 	Text,
 	View,
 	ListView,
 	TouchableHighlight,
 	ToolbarAndroid,
 	Navigator,
 	BackAndroid
 } = React;

 var ToolbarAndroid = require('ToolbarAndroid');
 var toolbarTop = React.createClass({
 	onActionSelected: function(position) {
 		let navigator = this.props.navigator;
 		if (position === 0) { // index of 'Settings' 

 			if (navigator.getCurrentRoutes()[1]) {
 				navigator.popToRoute(navigator.getCurrentRoutes()[1]);
 			} else {
 				navigator.push({
 					name: 'story',
 					index: 1
 				});
 			}
 		} else if (position === 1) {
 			navigator.popToRoute(navigator.getCurrentRoutes()[0]);
 		} else {
 			navigator.popToTop();
 		}
 	},
 	render: function() {
 		var ico = this.props.myico;
 		return (
 			<View>
				<ToolbarAndroid
					  logo={{uri: 'http://192.168.91.101:818/image/fax/test@2x.jpg'}}
	                  navIcon={{uri: 'http://192.168.91.101:818/image/fax/inFax.png'}} 
	                  title="NoteApp"
	                  titleColor="red"
	                  style={styles.toolbar}
	                  actions={[{title: 'story', icon: {uri:ico,width:222}, show: 'always'}
	                  ,{title: 'home1', show: 'always'},
	                  {title:'popToTop'}]}
	                 onActionSelected={this.onActionSelected}  />
             </View>
 		);
 	}
 });
 var styles = StyleSheet.create({
 	toolbar: {
 		backgroundColor: '#ED4D00', 
 		height: 56,
 	}
 });


 module.exports = toolbarTop;