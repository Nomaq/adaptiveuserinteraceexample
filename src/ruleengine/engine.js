import User from './DataClasses/User';
import Platform from './DataClasses/Platform';
import Context from './DataClasses/Context';
import ComponentAdaptations from './Adaptations/adaptations';
const $ = window.$;

var nools = require("nools");


var currentUI = {
   Background : ComponentAdaptations.Background.neutral,
   NavBar: ComponentAdaptations.NavBar.normal,
   ColorPallete: ComponentAdaptations.ColorPallete.normal,
   Navigation: ComponentAdaptations.Navigation.normal,
   Information: ComponentAdaptations.Information.normal,
   Font: ComponentAdaptations.Font.normal,
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
    },
    rule13:{
        activated:false
    },
    rule14:{
        activated:false
    },
    rule15:{
        activated:false
    },
    rule16:{
        activated:false
    },
}


var RuleEngine = {
    init: function (enableadaptation) {

        var context = this;
        enableadaptation(currentUI);

        if (!nools.hasFlow("MainFlow")){


            nools.flow("MainFlow", function (flow) {
                //User Rules
                flow.rule("Rule1: User happy", { salience: 9 }, [User, "m", "m.mood == 0"], function (facts) {
                    console.log("good");
                    currentUI.Background = ComponentAdaptations.Background.happy; 
                    Rules.rule1.activated = true ;
                    $( "#root" ).addClass( "happy" );
                });

                flow.rule("Rule2: User Neutral", { salience: 9 }, [User, "m", "m.mood == 2"], function (facts) {
                    
                    console.log("neutral");
                     currentUI.Background =ComponentAdaptations.Background.neutral;
                     Rules.rule2.activated = true ;
                     $( "#root" ).removeClass( "happy" );
                     $( "#root" ).removeClass( "sad" );
        
                });

                flow.rule("Rule3: User Bad mood", { salience: 9 }, [User, "m", "m.mood == 1 || m.mood == 3"], function (facts) {
                    
                    console.log("down");
                    currentUI.Background =ComponentAdaptations.Background.sad;
                    Rules.rule3.activated = true ;
                    $( "#root" ).addClass( "sad" );
        
                });

                flow.rule("Rule 13 : Impaired vision", { salience: 10 }, [User, "m", "m.reducedvision == true"], function (facts) {
                    console.log(13);
                    //console.log("Older User");
                    global.currentUI.Font = ComponentAdaptations.Font.bigger;
                    Rules.rule13.activated = true;
                });

                flow.rule("Rule14 : Middle aged user", { salience: 3 }, [User, "m", "m.age >= 45 &&  m.age <= 60"], function (facts) {
                    console.log(14);
                    //console.log("Older User");
                    global.currentUI.Font = ComponentAdaptations.Font.big;
                    Rules.rule14.activated = true;
                });

                flow.rule("Rule15 : Older User", { salience: 10 }, [User, "m", "m.age > 60 && m.experience !== 'high'"], function (facts) {
                    console.log(15);
                    //console.log("Older User");
                    global.currentUI.Font = ComponentAdaptations.Font.bigger;
                    Rules.rule15.activated = true;

                });

                this.rule("Rule16: Younger User", { salience: 10 }, [User, "m", "m.age < 45 && !(m.experience == 'low' || m.experience == 'none')"], function (facts) { 
                    if(!Rules.rule13){

                        global.currentUI.Font = ComponentAdaptations.Font.normal;
                        Rules.rule16.activated = true ;
                        
                    }
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