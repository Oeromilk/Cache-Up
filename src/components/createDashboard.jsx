import React from 'react';
import firebase from '../firebaseConfig';
import "firebase/auth";
import "firebase/firestore";

let db = firebase.firestore();

class CreateDashboard extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            user: firebase.auth().currentUser
        }

        this.handleCreate = this.handleCreate.bind(this);
    }
    handleCreate(){
        let uid = this.state.user.uid;
        let dashboardRef = db.collection('dashboards');
        let docID = 'dashboard_' + uid;
        dashboardRef.doc(docID).set({
            owner: this.props.uid,
            timeCreated: new Date(),
            total: 0,
            expenses: 0
        }).then(()=> {
            console.log("Document successfully written!");
            this.props.updateDisplay();
        }).catch((error) => {
            console.error("Error writing document: ", error);
        });
    }
    render(){
        return (
            <button className={this.props.createDisplay} onClick={this.handleCreate}>Create Dashboard</button>
        )
    }
};

export default CreateDashboard;