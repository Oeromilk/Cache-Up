import React from 'react';
import firebase from '../firebaseConfig';
import "firebase/auth";
import "firebase/firestore";

let db = firebase.firestore();

class CreateForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            user: firebase.auth().currentUser,
            date: '',
            amount: '',
            types: 'bill',
            freq: 'one-time'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value
        });
    }
    handleSubmit(event){
        event.preventDefault();
        let uid = this.state.user.uid;
        let docID = 'dashboard_' + uid;
        let collectionID = 'expenses_' + uid;
        let dashboardRef = db.collection('dashboards').doc(docID);
        let expensesRef = dashboardRef.collection(collectionID);
        expensesRef.add({
            amount: parseInt(this.state.amount),
            types: this.state.types,
            date: this.state.date,
            freq: this.state.freq
        }).then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        }).catch((error) => {
            console.error("Error adding document: ", error);
        });
    }
    render() {
        return (
            <form className="create-expense">
                <label htmlFor="amount">Amount: </label>
                <input value={this.state.amount} id="amount" name="amount" type="number" onChange={this.handleChange}/>
                <label htmlFor="type-select">Choose a type: </label>
                <select value={this.state.types} name="types" id="type-select" onChange={this.handleChange}>
                    <option value="bill">Bill</option>
                    <option value="food">Food</option>
                    <option value="debt">Debt</option>
                    <option value="petCare">Pet Care</option>
                    <option value="transportation">Transportation</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="miscellaneous">Miscellaneous</option>
                </select>
                <label htmlFor="date">Date: </label>
                <input value={this.state.date} id="date" name="date" type="date" onChange={this.handleChange}/>
                <label htmlFor="freq-select">Frequnecy: </label>
                <select value={this.state.freq} name="freq" id="freq-select" onChange={this.handleChange}>
                    <option value="one-time">One Time</option>
                    <option value="recurring">Recurring</option>
                </select>
                <button onClick={this.handleSubmit}>Add</button>
            </form>
        )
    }
};

export default CreateForm;