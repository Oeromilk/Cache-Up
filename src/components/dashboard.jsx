import React from 'react';
import firebase from '../firebaseConfig';
import "firebase/auth";
import "firebase/firestore";
import Navigation from './navigation';
// import CreateForm from './createForm';
// import CalendarChart from './calendarChart';
// import CreateDashboard from './createDashboard';

class Snapshots extends React.Component {
    render() {
        return (
            <div className="snapshots-container">
                <div>Month to Month</div>
                <div>Recent Expenses</div>
                <div>Categories</div>
            </div>
        )
    }
}

class Highlights extends React.Component {
    render(){
        return (
            <div className="highlights-container">
                <div>Total Income: {this.props.dashboardInfo.totalIncome}</div>
                <div>Total Expenses: {this.props.dashboardInfo.totalExpenses}</div>
                <div>Food: {this.props.dashboardInfo.food}</div>
                <div>Debt: {this.props.dashboardInfo.debt}</div>
                <div>Savings: {this.props.dashboardInfo.savings}</div>
                <div>Monthly Subscriptions: {this.props.dashboardInfo.monthlySubs}</div>
                <div>Miscellaneous: {this.props.dashboardInfo.miscellaneous}</div>
            </div>
        )
    }
}

class Dashboard extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            createDisplay: 'createDisplay',
            chartDisplay: 'createDisplayHidden',
            dashboardInfo: {}
        }

        this.updateDisplay = this.updateDisplay.bind(this);
    }
    componentDidMount() {
        let u = firebase.auth().currentUser;
        if(u !== null){
            let docID = 'dashboard_' + u.uid;
            console.log('dashboard:', docID);
            var docRef = firebase.firestore().collection('dashboards').doc(docID)
            docRef.get().then((doc) => {
                if(doc.exists){
                    this.setState({
                        createDisplay: 'createDisplayHidden',
                        chartDisplay: 'createDisplay',
                        dashboardInfo: doc.data()
                    });
                } else {
                    console.log('No doc exists.');
                }
            })
        }
    }
    updateDisplay(){
        this.setState({
            createDisplay: 'createDisplayHidden',
            chartDisplay: 'createDisplay'
        });
    }
    render() {
        return (
            <Navigation>
                <div className="dashboard-container">
                    <h1>Dashboard</h1>
                    <Highlights dashboardInfo={this.state.dashboardInfo}/>
                    <Snapshots />
                </div>
            </Navigation>
        )
    }
};

/* <CreateDashboard createDisplay={this.state.createDisplay} updateDisplay={this.updateDisplay}/>
<div className="chart-container">
    {(this.state.chartDisplay === 'createDisplayHidden') ? null : <CalendarChart createDisplay={this.state.chartDisplay}/>}
</div>
<CreateForm /> */

export default Dashboard;