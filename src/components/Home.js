    // src/components/Home.js
    
    import React, { Component } from 'react';
    import AccountBalance from './AccountBalance';
    import {Link} from 'react-router-dom';
    
    class Home extends Component {
      render() {
        return (
            <div>
              <img src="https://letstalkpayments.com/wp-content/uploads/2016/04/Bank.png" alt="bank"/>
              <h1>Bank of React</h1>
              <Link to="/bank-of-react//userProfile">User Profile</Link><br/>
              <Link to="/bank-of-react//debits">Debits</Link><br/>
              <Link to="/bank-of-react//credits">Credits</Link><br/>

              <Link to="/bank-of-react//login">Login</Link>

              <AccountBalance accountBalance={this.props.accountBalance}/>
            </div>
        );
      }
    }
    
    export default Home;