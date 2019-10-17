
import React, {Component} from 'react';
import { View, Button, Text, Image, StyleSheet, TouchableOpacity, Modal, Alert} from 'react-native';

const dice = [
  {
    img: require('../dice/assets/1.png'),
    val: 1,
  },
  {
    img: require('../dice/assets/2.png'),
    val: 2,
  },
  {
    img: require('../dice/assets/2.png'),
    val: 2,
  },
  {
    img: require('../dice/assets/2.png'),
    val: 2,
  },
  {
    img: require('../dice/assets/2.png'),
    val: 2,
  },
  {
    img: require('../dice/assets/3.png'),
    val: 3,
  },
  {
    img: require('../dice/assets/4.png'),
    val: 4,
  },
  {
    img: require('../dice/assets/4.png'),
    val: 4,
  },
  {
    img: require('../dice/assets/4.png'),
    val: 4,
  },
  {
    img: require('../dice/assets/5.png'),
    val: 5,
  },
  {
    img: require('../dice/assets/6.png'),
    val: 6,
  },
]

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAllRandom: false,
      firstPress: 1,
      isSomeRandom: false,
      selected: [],
      modalVisible: false,
    };
  }

    static navigationOptions = {
      header : null
    }

    componentDidMount() {
      const { navigation } = this.props;
      this.focusListener = navigation.addListener('willFocus', () => {
        this.setState({ 
          isAllRandom: false,
          firstPress: 1,
          isSomeRandom: false,
          selected: [],
          modalVisible: false,
        });
      });
    }

    isSelected = (array, index) => {
        if(array.find(tileItem => tileItem === index) )
          return true
        else
          return false  
      }

    arrayRemove(arr, value) {
        return arr.filter((ele) => {
            return ele != value;
        });
    }
    
    onPressDice = (index) => {
        if(!this.isSelected(this.state.selected, index)){
            this.setState({
                selected: this.state.selected.concat([index])
            });
        }
        else{
            this.setState({
                selected: this.arrayRemove(this.state.selected,index)
            });
        }
      } 

    toggleModal = () => {
        this.setState({ 
          modalVisible: !this.state.modalVisible 
        });
     }

    onAllRandom = () => {
      if(this.state.firstPress<2){
        this.setState({
          isAllRandom: true,
          //modalVisible: false,
          firstPress: this.state.firstPress+1
        });
        dice.sort( () => Math.random() - 0.5);
      }
        if(this.state.firstPress==2){
          dice.sort( () => Math.random() - 0.5);
          setTimeout(() => {
            this.props.navigation.navigate('Total',{dice: dice})
            }, 2000);
          // dice.sort( () => Math.random() - 0.5);
          // this.props.navigation.navigate('Total',{dice: dice})
          this.setState({
            modalVisible: false,
          });
        }
      }

    onSomeRandom = () => {
      this.setState({
        isSomeRandom: !this.state.isSomeRandom,
        selected: []
      });

      for (let i = 0; i < this.state.selected.length; i++) {
        //var rnd = dice[Math.floor(Math.random()*dice.length)];
        var idx = Math.floor(Math.random() * dice.length);
        let element = this.state.selected[i];
        var index = dice.indexOf(element);

        if (index !== -1) {
          dice[index] = dice[idx];
        }
        
      }

      setTimeout(() => {
        this.props.navigation.navigate('Total',{dice: dice})
        }, 2000);
      }

    render() {

        let initial = []
        let modal

        if(this.state.isAllRandom){
          initial = 
          dice.slice(0, 6).map((item, i) =>{
            return(
              <View key={i} style={styles.bottomItem}>
              <TouchableOpacity onPress={() => this.onPressDice(item)}>
                  <Image
                      source={item.img}
                      //style = {styles.pic}
                      style = {this.isSelected(this.state.selected, item)  ? styles.picPressed:styles.pic}
                  />
              </TouchableOpacity>
              </View>
          )});
        }
        else{
            for (let i = 0; i < 6; i++) {
                initial.push(
                <View key={i} style={styles.bottomItem}>
                    <Image
                    source={require('../dice/assets/udem.png')}
                    style = {styles.pic}
                    />
                </View>);
              }
        }

        if(this.state.modalVisible && this.state.firstPress==2 ){
          modal = <Modal 
          onRequestClose={() => { this.visibleModal(false); } } 
          visible = {this.state.modalVisible}
          animationType = {"fade"}
          transparent = {true}
          >
              <View style={styles.modalView}>
                  <Text style={styles.modalText}>Are you sure you want to randomize all?</Text>
                <View>
                  <TouchableOpacity style={styles.buttonContainer1} onPress = {this.onAllRandom}>
                    <Text style={styles.button1}>Yes</Text>
                  </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer2} onPress = {this.toggleModal}>
                  <Text style={styles.button2}>No</Text>
                </TouchableOpacity>
                </View>
              </View>
          </Modal>
        }
      return (
          <View style={styles.main}>
            <View style={styles.firstrow}>
              <Text style={styles.title}>Dice Game</Text>
            </View>

            <View style={styles.secondrow}>
              {initial}
              <Text style={styles.subText}>{this.state.isAllRandom ? "Select items to randomize" : ""}</Text>
                {modal} 
            </View>   

            <View style={styles.thirdrow}>
              <Button
                title="Randomize all"
                //onPress={() => this.props.navigation.navigate('Calculo')}
                onPress={this.state.firstPress ==2 ? this.toggleModal:this.onAllRandom}
                /> 
                <Button
                title="Randomize selected items"
                disabled={this.state.firstPress == 2 && this.state.selected.length>0 ? false:true}
                onPress={this.onSomeRandom}
                /> 
            </View>  
          </View>
      );
    }
  }

  const styles = StyleSheet.create({
    main: {
      flex: 1,
    },
    firstrow: {
      height: '15%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#98d2c1',
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
      height: '10%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    buttonrow: {
      //height: '30%',
      backgroundColor: "#f3f3f3",
      flexDirection: 'row',
    },
    modalView: {
      marginTop: 275,
      height: 130,
      width: '75%',
      backgroundColor: '#DCDCDC',
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 24,
      fontFamily: 'Hiragino Sans',
      fontWeight: "bold",
      justifyContent: 'center',
    },
    subText:{
      fontSize: 18,
      textAlign: 'center',
      //fontWeight: 'bold',
    },
    modalText:{
      fontSize: 14,
      textAlign: 'center',
      paddingTop: 20,
      //fontWeight: 'bold',
    },
    buttonContainer1:{
      backgroundColor:'black',
      margin: 7,
     },
     buttonContainer2:{
      //backgroundColor:'#E0E0E0',
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
      height: 100,
      margin: 5,
    },
    pic:{
      height: 75,
      width: 75,
      //borderRadius: 30
    },
    picPressed:{
      height: 75,
      width: 75,
      //opacity: 0.5,
      //borderWidth: 2,
      backgroundColor: '#E0E0E0',
      opacity: 0.7
    },
  });
  

  export default HomeScreen;