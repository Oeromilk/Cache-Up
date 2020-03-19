import Backbone from 'backbone';
import React from 'react';
import ReactDOM from 'react-dom';
import Landing from './components/landing';
import Auth from './components/auth';
import Dashboard from './components/dashboard';
import './styles/index.css';

var AppRouter = Backbone.Router.extend({
    routes: {
        '' : 'index',
        'dashboard': 'dashboard',
        'auth' : 'auth',
        'user' : 'user',
        'expenses' : 'expenses',
        'expenses/:id': 'expenses-id',
        'create-expense' :'createExpense'
    },
    index: function(){
        ReactDOM.render(
            React.createElement(Landing),
            document.getElementById('root')
          );
    },
    auth: function(){
        ReactDOM.render(
            React.createElement(Auth),
            document.getElementById('root')
        )
    },
    dashboard: function(){
        ReactDOM.render(
            React.createElement(Dashboard),
            document.getElementById('root')
        );
    }
});

var router = new AppRouter();

export default router;