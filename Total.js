import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, Image, TouchableOpacity} from 'react-native';

class Total extends Component {

  static navigationOptions = {
    header : null
  }


  render(){
    let dice = this.props.navigation.state.params.dice
    let count = []
    let sum = []
    let bonus = 0
    let bonus_txt = ''
    let sum_arr = []
    let total = 0
    let initial = 
      dice.slice(0, 6).map((item, i) =>{
        // if(item){
        //   count= count +1
        // }
        count[item.val] = (count[item.val] || 0) + 1
        return(
          <View key={i} style={styles.bottomItem}>
            <Text style= {styles.subText}>{item.val}</Text>
              <Image
                  source={item.img}
                  //style = {styles.pic}
                  style = {styles.pic}
              />
          </View>
      )});
      console.log(count)
      
      let count_arr = 
      count.map((item, i) =>{
        sum = item*i
        if(item == 3){
          bonus=10
          bonus_txt = "3 equal = 10 points"
        }
        else if(item == 4){
          bonus= 20
          bonus_txt = "4 equal = 20 points"
        }
        else if(item == 5){
          bonus= 30
          bonus_txt = "5 equal = 30 points"
        }

        sum_arr.push(sum)
        return(
          <View key={i} style={styles.thirdrow}>
            <Text style= {styles.subText}>{i}'s</Text>
            <Text style= {styles.subText2}> {sum}</Text>
          </View>
      )});

      // let total = 
      // sum_arr.reduce((sum, current) =>{
      //   //let sum = item*i
      //   return(
      //     <View key={sum} style={styles.thirdrow}>
      //       <Text style= {styles.subText1}> {sum + current}</Text>
      //     </View>
      // )},0);

     for (let i = 0; i < sum_arr.length; i++) {
        total += sum_arr[i];
     }
    
    return(
      <View style= {styles.main}>
        <View style={styles.firstrow}>
          <Text style={styles.title}>Dice Game</Text>
        </View>
        <View style={styles.secondrow}>
          {initial}
          {count_arr}
          {/* {total} */}
        </View>
        <View style={styles.fourthrow} >
          <Text style= {styles.subText}>{bonus_txt}</Text>
          <Text style= {styles.puntosText}>{total+bonus} points</Text>
        </View>
        <Button
                title="Start again"
                // disabled={this.state.firstPress == 2 ? false:true}
                onPress={() => this.props.navigation.goBack()}
                /> 
      </View>
    );
  };
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  firstrow: {
    height: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC857',
    paddingTop: 40
  },
  secondrow: {
    height: '35%',
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: 10,
  },
  thirdrow: {
    height: '20%',
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
    justifyContent: 'center'
  },
  fourthrow: {
    height: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    //backgroundColor: '#FFC857',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Hiragino Sans',
    fontWeight: "bold",
    justifyContent: 'center',
  },
  subText:{
    fontSize: 22,
    alignSelf: 'center'
    //fontWeight: 'bold',
  },
  subText2:{
    fontSize: 22,
    alignSelf: 'center'
  },
  subText3:{
    fontSize: 22,
    alignSelf: 'center',
    color: 'purple',
    fontWeight: 'bold'
  },
  puntosText:{
    fontSize: 30,
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  buttonContainer1:{
    backgroundColor:'black',
    margin: 7,
   },
   buttonContainer2:{
    margin: 5,
   },
   button1:{
    fontSize: 14,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
    color: 'white',
  },
  button2:{
    fontSize: 14,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center'
  },
  bottomItem: {
    width: 100,
    height: 120,
    margin: 5,
  },
  pic:{
    height: 75,
    width: 75,
    //borderRadius: 30
  },
});

export default Total;
