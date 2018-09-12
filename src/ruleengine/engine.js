import User from './DataClasses/User';
import Platform from './DataClasses/Platform';
import Context from './DataClasses/Context';
import ComponentAdaptations from './Adaptations/adaptations';

var nools = require("nools");


var currentUI = {
   Background : ComponentAdaptations.Background.neutral
};

var Rules = {
    rule1:{
        activated:false
    },
    rule2:{
        activated:false
    },
    rule3:{
        activated:false
    }
}


var RuleEngine = {
    init: function () {

        var context = this;

        if (!nools.hasFlow("MainFlow")){


            nools.flow("MainFlow", function (flow) {
                //User Rules
                flow.rule("Rule1: User happy", { salience: 9 }, [User, "m", "m.mood == 0"], function (facts) {
                    console.log("good");
                    currentUI.Background = ComponentAdaptations.Background.happy; 
                    Rules.rule1.activated = true ;
                });

                flow.rule("Rule1: User Neutral", { salience: 9 }, [User, "m", "m.mood == 2"], function (facts) {
                    
                    console.log("neutral");
                     currentUI.Background =ComponentAdaptations.Background.neutral;
                     Rules.rule2.activated = true ;
        
                });

                flow.rule("Rule1: User Bad mood", { salience: 9 }, [User, "m", "m.mood == 1 || m.mood == 3"], function (facts) {
                    
                    console.log("down");
                    currentUI.Background =ComponentAdaptations.Background.sad;
                    Rules.rule3.activated = true ;
        
                });
                
            });
        }
    },
    

    userChange: function (userchange, enableadaptation) {
        var flow = nools.getFlow("MainFlow");
        var session = flow.getSession();
        //assert your different messages
        if (!this.user) {
            this.user = new User(userchange);
        } else {
            let keys = Object.keys(this.user);
            for (var i = 0; i < keys.length; i++) {
                if (this.user[keys[i]] != userchange[keys[i]]) {
                    this.user[keys[i]] = userchange[keys[i]];
                }
            }
        }
        session.assert(this.user);
        session.match().then(
            function (result) {
               enableadaptation(currentUI);
            },
            function (err) {
                //uh oh an error occurred
                console.error(err.stack);
            });
            
    }
}

export default RuleEngine;