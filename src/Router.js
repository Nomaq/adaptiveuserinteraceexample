
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
import Atm from './pages/atm';
import Engine from './ruleengine/engine';
import Emotion from './services/affectiva';
import MobileWithdraw from './pages/mobilewithdraw';



class RouterComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
          user : {
            mood :null,
            facedetected:false,
            age:null,
            usagetime:null,
          },
          environment : {
            time : null
          }

        };
    }

    componentWillMount() {
      Engine.init(this.enableadaptation.bind(this));
      this.facerecognition();
      this.getCurrentTIme();
      this.trackUsageTime();
    }
    
    
    changeinStorage(event,event2){

      console.log("gsdfdsfdsfdsf", event,event2);
    }


    facerecognition() {

      let context = this;
      Emotion.init(function (facedetected, mood, age){
        let user = JSON.parse(JSON.stringify(context.state.user));
        user.mood = mood;
        user.facedetected =facedetected;
        user.age = age;
        context.setState({user});
        Engine.userChange(user, context.enableadaptation.bind(context));
        });
      
    }

    trackUsageTime() {
      let context = this;
      let usagetime = 10;
      let time =  localStorage.getItem('timer');
         
            if (time) {
              usagetime = JSON.parse(time) + 10;
            } else {
              usagetime = usagetime + 10;
            }
          localStorage.setItem('timer', JSON.stringify(usagetime));
          let user = JSON.parse(JSON.stringify(context.state.user));    
            user.usagetime = usagetime;   
            context.setState({user});
            Engine.userChange(user, context.enableadaptation.bind(context));
            
          this.usagetracker = setInterval(function () {
          let time =  localStorage.getItem('timer');
          
          if (time) {
            usagetime = JSON.parse(time) + 10;
          } else {
            usagetime = usagetime + 10;
          }
            localStorage.setItem('timer', JSON.stringify(usagetime));
            let user = JSON.parse(JSON.stringify(context.state.user));    
            user.usagetime = usagetime;   
            context.setState({user});
            Engine.userChange(user, context.enableadaptation.bind(context));
  
      }, 10000);
  
  
  
    }

    getCurrentTIme(){

      let context = this;
      let environment = JSON.parse(JSON.stringify(context.state.environment));
      let d = new Date();
      let n = d.getHours();
      context.setState({environment});
      Engine.contextChange(environment, context.enableadaptation.bind(context));
      setInterval(function(){ 
        let environment = JSON.parse(JSON.stringify(context.state.environment));
        let d = new Date();
        let n = d.getHours();
        context.setState({environment});
        Engine.contextChange(environment, context.enableadaptation.bind(context));
       }, 60000);

    }

    enableadaptation(currentUI){
      this.setState({currentUI});
    }

    userSettings(imparments,experience){
      let context = this;
      let user = JSON.parse(JSON.stringify(this.state.user));
        user.experience = experience;
        user.impairments = imparments;
        context.setState({user});
        Engine.userChange(user, context.enableadaptation.bind(context));
    }

    

    render() {


        return (
          <Router>
          <div className="maincont">
            <Route exact path="/" render={(props) => <Login {...props} currentUI = {this.state.currentUI} userSettings = {this.userSettings.bind(this)}/>} />
            <Route path="/main" render={(props) => <Main {...props} currentUI = {this.state.currentUI} userSettings = {this.userSettings.bind(this)} />} />
            <Route path="/atm" render={(props) => <Atm {...props} currentUI = {this.state.currentUI} userSettings = {this.userSettings.bind(this)} />} />
            <Route path="/cashoutatm" render={(props) => <MobileWithdraw {...props} currentUI = {this.state.currentUI} />} />
            <Route path="/register" render={(props) => <Register {...props} currentUI = {this.state.currentUI} />} />
            <Route path="/settings" render={(props) => <Settings {...props} currentUI = {this.state.currentUI} userSettings = {this.userSettings.bind(this)} />} />
            <Route  path="/accountdetail/:id" render={(props) => <AccountDetail {...props} currentUI = {this.state.currentUI} />} />
          </div>
        </Router>
        );
    }
}

export default RouterComponent

