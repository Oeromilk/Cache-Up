import Backbone from 'backbone';
import $ from 'jquery';
require('./router');

$(function(){
    Backbone.history.start();
});