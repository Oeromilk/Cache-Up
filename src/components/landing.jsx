import React from 'react';
import Navigation from './navigation';
import router from '../router';
import firebase from '../firebaseConfig';
import "firebase/auth";

class Landing extends React.Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                router.navigate('dashboard', {trigger: true});
            }
        })
    }
    render() {
        return (
            <Navigation>
                <div className="landing-container">
                    <h1>Cache Up</h1>
                    <h2>What is Cache Up and why should I use it?</h2>
                    <div>Cache Up is a utility to help you visualize three main elements of your spending habits.</div>
                    <h3>How much you spend</h3>
                    <div>
                        Most people don't really think about their spending. They now about how much they have in any given account and how long until they get paid next.
                        They generally use those two points of information to make sure they have enough to cover them until their next paycheck.
                    </div>
                    <h3>When you spend</h3>
                    <div>
                        If you were to be asked when you think you spend most of your money, you moight tend to say the first of the month. While this is probably not wrong,
                        those types of expenses usually fall under the catergory of "bills" and can be see as seperate because they will happen every month unless something changes.
                    </div>
                    <h3>Where you spend</h3>
                    <div>
                        Another common theme that we notice is people generally don't have an idea of where most of their spending happens. Take for example, coffee, 
                        most people have some kind of morning routine. Swing into Starbucks on the way into work or what ever local coffee shop you happen to have.
                        If asked could you recall how often you go there amd how much you spend?
                    </div>
                    <h2>What makes Cache Up different?</h2>
                    <h3>Privacy</h3>
                    <div>
                        Other apps that help you track spending may have you link a debit/credit card or even you bank through a routing number. We don't and will never
                        ask for your personal finicial information for two very specific reasons. The first is fairly obvious, your Privacy. We utilize state of the art web 
                        services to handle your account and information. Let's be honest though, anything that happens over the web can not be 100% gauranteed private or secured. 
                        That is why Cache Up handles your information manually. This also helps with the other reason. Forming a habit. With those other apps, you may never check 
                        and or won't fully utilize the service because it tracks your spending for you. Having to manually enter what you spend helps you better understand your 
                        spending and what changes you can make.
                    </div>
                    <h3>Security</h3>
                    <div>
                        Like we laid out in the section above, not having your personal finicial information linked to our services keeps those accounts secured and the information 
                        to access them out of hands and anyone  that might want to peep into what you have going on into your account. We utilize state of the art web services 
                        that offer speed, reliability, and security. That being said, this is the internet, and anyone who wants to see what 1s and 0s you are sending is going 
                        to regardless of what measures may take to stop them.
                    </div>
                    <div className="landingCTA">
                        <h2>Ready to Try it out?</h2>
                        <div>
                            Accounts are free and signing up is so simple.
                        </div>
                    </div>
                    <a type="button" href="#auth">Sign Up</a>
                </div>
            </Navigation>
        )
    }
}

export default Landing;