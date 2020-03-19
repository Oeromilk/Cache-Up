import React from 'react';
import router from '../router';
import firebase from '../firebaseConfig';
import "firebase/auth";
import "firebase/firestore";

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: '', password: ''};
    
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      handleEmail(event) {
        this.setState({email: event.target.value});
      }
      handlePassword(event) {
        this.setState({password: event.target.value});
      }
      handleSubmit(event) {
        event.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            router.navigate('dashboard', {trigger: true});
          } else {
            console.log("signed out please sign in");
          }
        });
      }
      render() {
        return (
          <form onSubmit={this.handleSubmit} className={this.props.active ? 'activeForm' : ' '}>
            <div className="inputGroup">
              <label className="logInEmail" htmlFor="email">Email</label>
              <input value={this.state.email} onChange={this.handleEmail} className="logInEmailInput" id="email" type="email" />
            </div>
            <div className="inputGroup">
              <label className="logInPassword" htmlFor="password">Password</label>
              <input type="password" value={this.state.password} onChange={this.handlePassword} className="logInPasswordInput" id="password" />
            </div>
            <p>Need to create an account? <button onClick={this.props.handleCreate}>Create Account</button></p>
            <button type="submit" className="auth-button">Sign In</button>
          </form>
        )
      }
}

class SignUp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          email: '',
          password: '',
          verifyPassword: '',
          weakPassword: '',
          passwordMatches: ''
        };
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
      }
      handleChange(event) {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
          [name]: value
        });
      }
      handlePassword(event) {
        if (this.state.password.length < 6) {
          this.setState({weakPassword: 'Password must be at least 6 characters.'});
        } else {
          this.setState({weakPassword: ''});
        }
        if (this.state.password !== this.state.verifyPassword){
          this.setState({passwordMatches: 'Passwords must match!'});
        } else {
          this.setState({passwordMatches: 'Passwords match, Sign Up!'});
        }
      }
      handleSubmit(event) {
        event.preventDefault();
        
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.verifyPassword).catch((error) => {
            if(error !== null){
                console.log(error);
            }
        });
        this.props.handleSwitch();
      }
      render () {
        return (
          <form className={this.props.active ? ' ' : 'activeForm'} onChange={this.handlePassword}>
            <div className="inputGroup">
              <label htmlFor="email">Email</label>
              <input value={this.state.email} onChange={this.handleChange} name="email" id="email" type="email" />
            </div>
            <div className="inputGroup">
              <label htmlFor="password">Password</label><span className="validationText">{this.state.weakPassword}</span>
              <input value={this.state.password} onChange={this.handleChange} name="password" id="password" type="password" />
            </div>
            <div className="inputGroup">
              <label htmlFor="verifyPassword">Verify Password</label><span className="validationText">{this.state.passwordMatches}</span>
              <input value={this.state.verifyPassword} onChange={this.handleChange} name="verifyPassword" id="verifyPassword" type="password" />
            </div>
            <button className="auth-button" type="button" onClick={this.handleSubmit}>Sign Up</button>
            <div>
                <p className="auth-text">Already a user?</p>
                <button className="signin-navigation" onClick={this.props.handleSwitch}>Sign In</button> 
            </div>
          </form>
        )
      }
};

class Auth extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        authSwitch: 'signin'
        };
        this.handleSwitch = this.handleSwitch.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
    }
    handleSwitch(){
        this.setState({authSwitch: 'signin'});
    }
    handleCreate(){
      this.setState({authSwitch: 'signup'});
    }
    render() {
        return (
            <div className="auth-container">
                {(this.state.authSwitch === 'signup') ? <SignUp handleSwitch={this.handleSwitch}/> : <SignIn handleCreate={this.handleCreate} />}
            </div>
        )
    }
};

export default Auth;