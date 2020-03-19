import React from 'react';
import firebase from '../firebaseConfig';
import "firebase/auth";
import "firebase/firestore";
import Chart from 'react-google-charts';

class CalendarChart extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: [
                [{ type: 'date', id: 'Date' }, { type: 'number', id: 'Amount' }]
            ]
        }
        this.showData = this.showData.bind(this);
    }
    componentDidMount(){
        let u = firebase.auth().currentUser;
        let db = firebase.firestore();
        let docID = 'dashboard_' + u.uid;
        let collectionID = 'expenses_' + u.uid;
        let docRef = db.collection('dashboards').doc(docID);
        let collectionRef = docRef.collection(collectionID);
        collectionRef.onSnapshot((snapshot) => {
            snapshot.forEach((doc) => {
                if(doc.exists){
                    let newArr = this.state.data;
                    let dateString = doc.data().date;
                    newArr.push([new Date(dateString.replace(/-/g, ', ')), doc.data().amount])
                    this.setState({
                        data: newArr
                    });
                }
            });
        });
    }
    showData(){
        
    }
    render() {
        return (
                <Chart
                width="100%"
                height="100%"
                chartType="Calendar"
                loader={<div>Loading Chart Data</div>}
                data={this.state.data}
            />
        )
    }
};

export default CalendarChart;