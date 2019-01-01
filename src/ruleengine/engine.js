import User from './DataClasses/User';
import Platform from './DataClasses/Platform';
import Context from './DataClasses/Context';
import ComponentAdaptations from './Adaptations/adaptations';
const $ = window.$;

var nools = require("nools");


var currentUI = {
   Background : ComponentAdaptations.Background.neutral,
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
    rule4:{

    },
    rule5:{

    },
    rule6:{

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
    rule10:{
        activated:false
    },
    rule11:{
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
                    currentUI.Background = ComponentAdaptations.Background.happy; 
                    Rules.rule1.activated = true ;
                    $( "#root" ).addClass( "happy" );
                });

                flow.rule("Rule2: User Neutral", { salience: 9 }, [User, "m", "m.mood == 2"], function (facts) {
           
                     currentUI.Background =ComponentAdaptations.Background.neutral;
                     Rules.rule2.activated = true ;
                     $( "#root" ).removeClass( "happy" );
                     $( "#root" ).removeClass( "sad" );
        
                });

                flow.rule("Rule3: User Bad mood", { salience: 9 }, [User, "m", "m.mood == 1 || m.mood == 3"], function (facts) {
                    
                    currentUI.Background =ComponentAdaptations.Background.sad;
                    Rules.rule3.activated = true ;
                    $( "#root" ).addClass( "sad" );
        
                });

                flow.rule("Rule4: Minimal", { salience: 10 }, [User, "m", "m.usagetime > 1000 && m.experience >= 2 "], function (facts) {
                   

                    currentUI.Information = ComponentAdaptations.Information.minimized;
                    Rules.rule4.activated = true;


                    Rules.rule5.activated = false;
                    Rules.rule6.activated = false;

                   
                });

                flow.rule("Rule5: Minimized Information", { salience: 10 }, [User, "m", "m.usagetime > 1000 && m.experience < 2 "], function (facts) {
               
                    currentUI.Information = ComponentAdaptations.Information.normal;
                    Rules.rule5.activated = true;

                    Rules.rule4.activated = false;
                    Rules.rule6.activated = false;

                   
                });

                flow.rule("Rule6: Maximized information ", { salience: 10 }, [User, "m", "m.usagetime < 1000 && m.experience < 2 "], function (facts) {
                
                    currentUI.Information = ComponentAdaptations.Information.maximized;
                    Rules.rule6.activated = true;
                    Rules.rule5.activated = false;
                    Rules.rule4.activated = false;


                   
                });

                flow.rule("Rule 13 : Impaired vision", { salience: 10 }, [User, "m", "m.impairments == 'Yes'"], function (facts) {
                    currentUI.Font = ComponentAdaptations.Font.bigger;
                    Rules.rule13.activated = true;
                });
                flow.rule("Deactivate Rule 13 : Impaired vision", { salience: 10 }, [User, "m", "m.impairments == 'No'"], function (facts) {

                    Rules.rule13.activated = false;
                });

                flow.rule("Rule14 : Middle aged user", { salience: 3 }, [User, "m", "m.age >= 45 &&  m.age <= 60"], function (facts) {
                    if(!Rules.rule13){

                    currentUI.Font = ComponentAdaptations.Font.big;
                    Rules.rule14.activated = true;
                    }
                });

                flow.rule("Rule15 : Older User", { salience: 10 }, [User, "m", "m.age > 60"], function (facts) {
                    //console.log("Older User");
                    if(!Rules.rule13){

                    currentUI.Font = ComponentAdaptations.Font.bigger;
                    Rules.rule15.activated = true;
                    }

                });

                flow.rule("Rule16: Younger User", { salience: 10 }, [User, "m", "m.age < 45"], function (facts) { 
                    if(!Rules.rule13){

                        currentUI.Font = ComponentAdaptations.Font.normal;
                        Rules.rule16.activated = true ;
                        
                    }
                });
                this.rule("Rule10: Day", { salience: 8 }, [Context, "m", "m.time && (m.time > 5 && m.time < 20)"], function (facts) {
                    currentUI.ColorPallete = ComponentAdaptations.ColorPallete.normal;
                    Rules.rule10.activated = true;
                    $( "#root" ).addClass( "white" );
                    $( "#root" ).removeClass( "black" );

               });

                this.rule("Rule11: Night", { salience: 11 }, [Context, "m", "m.time && (m.time <= 5 || m.time >= 20)"], function (facts) {
                    currentUI.ColorPallete = ComponentAdaptations.ColorPallete.inverted;
                    Rules.rule11.activated = true;
                    $( "#root" ).addClass( "black" );
                    $( "#root" ).removeClass( "white" );

                });

                
            });
        }
    },
    

    userChange: function (userchange, enableadaptation) {
        var flow = nools.getFlow("MainFlow");
        var session = flow.getSession();
        //assert your different messages
        
        let user = new User(userchange);
        session.assert(user);
        session.match().then(
            function (result) {
               enableadaptation(currentUI);
            },
            function (err) {
                //uh oh an error occurred
                console.error(err.stack);
            });
            
    },
    contextChange: function (contextchange, enableadaptation) {
        // //console.log(contextchange);
 
         let flow = nools.getFlow("MainFlow");
         let session = flow.getSession();
         //assert your different messages
         let env = new Context(contextchange);
    
         session.assert(env);
         session.match().then(
             function (result) {
                 enableadaptation(currentUI);
             },
             function (err) {
                 //uh oh an error occurred
                 console.error(err.stack);
             });
 
 
     },
}

export default RuleEngine;