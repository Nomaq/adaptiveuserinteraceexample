
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Login from './pages/login';
import Register from './pages/register';
import Main from './pages/main';
import Settings from './pages/settings';
import AccountDetail from './pages/accountdetail';
import InitDummyData from './services/initDummyData';
import Engine from './ruleengine/engine';
import Emotion from './services/affectiva';
import MobileWithdraw from './pages/mobilewithdraw';



class RouterComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
           
        };
    }

    componentWillMount() {
      this.facerecognition();
    }


    facerecognition() {

      let context = this;
      context.user = {
        mood :null,
        facedetected:false,
        age:null
      }
      
      InitDummyData.initData();
      Engine.init(context.enableadaptation.bind(context));
      Emotion.init(function (facedetected, mood, age){
        context.user.mood = mood;
        context.user.facedetected =facedetected;
        context.user.age = age;
        Engine.userChange(context.user, context.enableadaptation.bind(context));
        });
      
    }

    enableadaptation(currentUI){
      this.setState({currentUI});
    }

    render() {


        return (
          <Router>
          <div className="maincont">
            <Route exact path="/" render={(props) => <Login {...props} currentUI = {this.state.currentUI} />} />
            <Route path="/main" render={(props) => <Main {...props} currentUI = {this.state.currentUI} />} />
            <Route path="/cashoutatm" render={(props) => <MobileWithdraw {...props} currentUI = {this.state.currentUI} />} />
            <Route path="/register" render={(props) => <Register {...props} currentUI = {this.state.currentUI} />} />
            <Route path="/settings" render={(props) => <Settings {...props} currentUI = {this.state.currentUI} />} />
            <Route  path="/accountdetail/:id" render={(props) => <AccountDetail {...props} currentUI = {this.state.currentUI} />} />
          </div>
        </Router>
        );
    }
}

export default RouterComponent

