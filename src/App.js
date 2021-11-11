import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import Debits from './components/Debits';
import Credits from './components/Credits';

import LogIn from './Login';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
  
    this.state = {
      accountBalance: 0,
      currentUser: {
        userName: 'joe_shmo',
        memberSince: '07/23/96',
      },
      newDescription: '',
      newAmount: '',
      debits: [],
      credits: []
    }
  }

  async componentDidMount() {
    let debits = await axios.get("https://moj-api.herokuapp.com/debits")
    let credits = await axios.get("https://moj-api.herokuapp.com/credits")

    debits = debits.data
    credits = credits.data
    let debitSum = 0, creditSum = 0;
    debits.forEach((debit) =>{
      debitSum += debit.amount
    })
    credits.forEach((credit) => {
      creditSum += credit.amount
    })
    let accountBalance = creditSum - debitSum;
    this.setState({debits, credits, accountBalance});
  }


addDebit = (e) => {
  //send to debits view via props
  e.preventDefault();
//log target values 
  console.log(e.target[0].value);
  console.log(e.target[1].value);
  let { debits } = this.state;
  //get the credits from state
  const current = new Date();
  //create current date with correct formatting from the date object above 
  const currentDate = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
  //create variables from user inputs
  const newDescInput =  e.target[0].value; //this.state.newDescription;
  const newAmountVal = e.target[1].value;//this.state.newAmount;
  //push new value to array
  debits.push({'id': 1, 'description': newDescInput, 'amount': newAmountVal, 'date':currentDate});
  //update account balance
  let newAccountBalance = this.state.accountBalance - newAmountVal;
  //update state
  this.setState({debits: debits, accountBalance: newAccountBalance});

}

  addCredit = (e) => {
    //send to credits view via props
    e.preventDefault();
    //log target values 
    console.log(e.target[0].value);
    console.log(e.target[1].value);
    //get the credits from state
    let { credits } = this.state;
    //create date object
    const current = new Date();
    //create current date with correct formatting from the date object above 
    const currentDate = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
    //create variables from user inputs
    const newDescInput =  e.target[0].value; 
    const newAmountVal = e.target[1].value;
    //push new value to array
    credits.push({'id': 1, 'description': newDescInput, 'amount': newAmountVal, 'date':currentDate});
    //update account balance
    let newAccountBalance = this.state.accountBalance + parseFloat(newAmountVal,10);
    //update state
    this.setState({credits: credits, accountBalance: newAccountBalance});

  }

  mockLogIn = (logInInfo) => {
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }

  render() {

    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);
    const UserProfileComponent = () => (
      <UserProfile userName = {this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}/>
    );

    const { debits } = this.state;
    const DebitsComponent = () => (
      <div>     
        <Debits addDebit={this.addDebit} debits={debits}/>

      </div>
     
    );

    const { credits } = this.state;

    const CreditsComponent = () => (
     <Credits addCredit={this.addCredit} credits={credits}/>
    );

    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn}/>)
    return (
        <Router>
          <div>
            <Route exact path="/" render={HomeComponent}/>
            <Route exact path="/userProfile" render={UserProfileComponent}/>
            <Route exact path="/login" render={LogInComponent}/>
            <Route exact path="/debits" render={DebitsComponent}/>
            <Route exact path="/credits" render={CreditsComponent}/>
          </div>
        </Router>
    );
  }


}




export default App;