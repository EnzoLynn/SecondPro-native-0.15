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
   BackAndroid,
   TouchableOpacity
 } = React;

 var Config = require('./Config.js');
 // var req_url = "http://192.168.91.101:818/data/movies.json";
 var test = require('./test.js');
var pushState = require('./PushState.js');
// var req_url3000 = "http://192.168.91.101:3000";
 var NoteList = React.createClass({
   getEvent: function(aa, bb, cc) {
     console.log(aa.nativeEvent);
     console.log(bb);
   },
   onPressIn: function(e,name) {
      pushState.on = true;
      console.log(name);
   },
   onPressOut: function(e,name) { 
    console.log(name);
     if (pushState.top && pushState.move) {
         fetch(`${Config.req_url3000}/login`)
      .then((response) => { 
      })
      .then((responseData) => { 
      }).catch(function(error) { 
      }).done();
     }else{
         console.log(pushState.top);
     }
     pushState.on = false;
     pushState.move = false;
      pushState.yArr = [];
   },
   onMoveShouldSetResponder: function(event,name) {
    pushState.move = true;
   // console.log(name);
     // if (pushState.on) { 
     //    console.log(pushState.yArr);
     //     pushState.yArr.push(event.nativeEvent.locationY);
     // };
   },
   onScroll:function(event){
      //event.nativeEvent.contentOffset.y
      if (event.nativeEvent.contentOffset.y != 0) {
         pushState.top = false;
      }else{
         pushState.top = true;
      }
   },
   renderMovie: function(movie) {

     return (


       <TouchableOpacity  
        onPressIn ={(e) => this.onPressIn(e,'in')}
        onPressOut={(e) => this.onPressOut(e,'out')} 
        delayPressOut={200} 
        >

 			<View style={styles.container}> 
      

            <Image
              source={{uri: movie.posters.thumbnail}}
              style={styles.thumbnail}
            />
            <View style={styles.rightContainer}>
              <Text style={styles.title}>{movie.title} nn</Text>
              <Text style={styles.year}>{movie.year}</Text>
             
            </View>
           
          </View>
 
    </TouchableOpacity >

     );

   },
   getInitialState: function() {
     return {
       dataSource: new ListView.DataSource({
         rowHasChanged: (row1, row2) => row1 !== row2,
       }),
       loaded: false,
       movies: null,
       dd: `${test} init`,
       post: 'loading...',
       event: 'ppp',
       route: {
         name: 'home',
         index: 0
       },
       pushState :{
         on: false,
         yArr: []
       },
       routeIndex: 0
     };
   },
   componentDidMount: function() {
     var me = this;
     me.fetchData();
   },
   fetchData: function() {
     fetch(Config.req_url)
       .then((response) => response.json())
       .then((responseData) => {
         this.setState({
           movies: responseData.data,
           dataSource: this.state.dataSource.cloneWithRows(responseData.data),
           loaded: true
         });
       })
       .done();
   },
   renderLoadingView: function() {
     return (
       <View style={styles.container} >
          <Text>
            Loading movies...
          </Text>
        </View>
     );

   },

   render: function() {
     if (!this.state.movies) {
       return this.renderLoadingView();
     }
     return (

       <ListView onMoveShouldSetResponder={(e)=>this.onMoveShouldSetResponder(e,'onMoveShouldSetResponder')} 
              onScroll ={(e)=>this.onScroll(e,'onScroll ')} 
              dataSource={this.state.dataSource}
              renderRow={this.renderMovie}  
              > 
          </ListView>
     );
   }
 });
 var styles = StyleSheet.create({
   container1: {
     flex: 1,
     backgroundColor: '#00a2ed',
     flexDirection: 'column',
   },
   container2: {
     flex: 1,
     height: 56,
     backgroundColor: '#39ED00',
     flexDirection: 'column',
   },
   container: {
     flex: 1,
     flexDirection: 'row',
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: '#F5FCFF',
   },
   title: {
     fontSize: 20,
     marginBottom: 8,
     textAlign: 'center',
   },
   year: {
     textAlign: 'center',
   },
   listView: {
     paddingTop: 20,
     height: 100,
     backgroundColor: '#F5FCFF',
   },
   thumbnail: {
     width: 53,
     height: 81,
     borderWidth: 1,
     borderColor: 'red'
   }
 });
 module.exports = NoteList;