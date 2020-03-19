import React from 'react';
import firebase from '../firebaseConfig';
import "firebase/auth";
import router from '../router';

class SignUpSignIn extends React.Component {
    constructor(props){
        super(props)

        this.handleAuthSwitch = this.handleAuthSwitch.bind(this);
    }
    handleAuthSwitch(){
        router.navigate('auth', {trigger: true});
    }
    render() {
        return (
            <button onClick={this.handleAuthSwitch}>Sign In / Sign Up</button>
        )
    }
}

class SignOut extends React.Component {
    constructor(props){
        super(props)

        this.handleSignOut = this.handleSignOut.bind(this);
    }
    handleSignOut(event) {
        event.preventDefault();
        firebase.auth().signOut().then(() => {
            router.navigate('', {trigger: true});
        })
    }
    render() {
        return (
            <button onClick={this.handleSignOut}>Sign Out</button>
        )
    }
}

class NavBar extends React.Component {
    constructor(props ){
        super(props)
        this.state = {
            clicked: false,
            mobileLinks: "mobile-nav-list mobile-nav-bar-links-hidden",
            authState: <SignUpSignIn/>
        }

        this.showNavLinks = this.showNavLinks.bind(this);
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                this.setState({authState: <SignOut />});
            } else {
                this.setState({authState: <SignUpSignIn />});  
            }
        })
    }
    showNavLinks() {
        var intial = this.state.clicked;
        var bool = !intial;
        var display = this.state.clicked ?  'mobile-nav-list mobile-nav-bar-links-hidden' : 'mobile-nav-list mobile-nav-bar-links-show';
        this.setState({clicked: bool, mobileLinks: display});
    }
    render() {
        return (
            <div>
                 <div className="nav-container nav-bar-container">
                    <button className="nav-bar-logo">Cache Up</button>
                    <div className="desktop-nav-link nav-bar-links">
                        {/* <a href="#">Link</a>
                        <a href="#">Link</a> */}
                        <button href="#dashboard">Dashboard</button>
                        {this.state.authState}
                    </div>
                    <div className="mobile-nav-link">
                        <div onClick={this.showNavLinks} className="mobile-menu"><i className="material-icons">menu</i></div>
                    </div>
                </div>
                <div className={this.state.mobileLinks}>
                    {/* <a href="#">Link</a>
                    <a href="#">Link</a> */}
                    <button href="#dashboard">Dashboard</button>
                    {this.state.authState}
                </div>
            </div>
        )
    }
}

class Navigation extends React.Component {
   
    render(){
        return (
            <div className="app-container">
                <NavBar />
                <div className="content-container">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Navigation;