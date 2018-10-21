var ColorPallete = {
    normal: {
        firstColor: "#0D0E44",
        secondColor: "#7C20A2",
        thirdColor: "#3C4858",
        fourthColor: '#000',
        fifthColor: "#FFF",
    },
       dimmed: {
        firstColor: "#344132",
        secondColor: "#394120",
        thirdColor: "#586374",
        fourthColor: '#D4D6B9',
        fifthColor: "#D1CAA1",

    },
    bright: {
        firstColor: "blue",
        secondColor: "#153242",
        thirdColor: "grey",
        fourthColor: '#F4F9E9',
        fifthColor: "white",
    },
    inverted: {
        firstColor: "#f4942e",
        secondColor: "#F28F3B",
        thirdColor: "#FFD5C2",
        fourthColor: '#0D0618',
        fifthColor: "#000000",
    },

};

var ComponentAdaptations = {
    ColorPallete: {
        normal: ColorPallete.normal,
        dimmed: ColorPallete.dimmed,
        bright: ColorPallete.bright,
        inverted: ColorPallete.inverted,
        blackwhite: ColorPallete.blackwhite
    },
    NavBar: {
        normal: {
            backgroundColor: ColorPallete.normal.firstColor,
            fontColor: ColorPallete.normal.fourthColor,
            borderWidth: 1,
            borderColor: ColorPallete.normal.firstColor,
        },
        dimmed: {
            backgroundColor: ColorPallete.dimmed.firstColor,
            fontColor: ColorPallete.dimmed.fourthColor,
            borderWidth: 1,
            borderColor: ColorPallete.dimmed.firstColor,
        },
        bright: {
            backgroundColor: ColorPallete.bright.firstColor,
            fontColor: ColorPallete.bright.fourthColor,
            borderWidth: 1,
            borderColor: ColorPallete.bright.firstColor,
        },
        inverted: {
            backgroundColor: ColorPallete.inverted.firstColor,
            fontColor: ColorPallete.inverted.fourthColor,
            borderWidth: 1,
            borderColor: ColorPallete.inverted.firstColor,
        }

    },
    Navigation: {
        easy: {
            fontSize: "18",
            buttons:"easy",
            type:"easy"
        },
        normal: {
            fontSize: "16",
            buttons:"normal",
            type:"normal"
        }
    },
    Information:{
        normal:{
            showButtonText:true,
            showExtraInfo:false,
        },
        maximized:{
            showButtonText:true,
            showExtraInfo:true,
        },
        minimized:{
            showButtonText:false,
            showExtraInfo:false,
        }

    },
    Font:{
        normal:{
            fontFamily: 'normal',
            textFS:12,
            textFW:"inherit",
            titleFS:20,
            titleFW:"bold",
            headingFS:12,
            textFW:"inherit",
            smallTxtFS:10,
            textFW:"inherit",
            name:'normal'
        },
        big:{
            fontFamily: 'normal',
            textFS:14,
            textFW:"normal",
            titleFS:22,
            titleFW:"bold",
            headingFS:14,
            headingFW:"bold",
            smallTxtFS:12,
            smallTxtFW:"100",
            name:'big'

        },
        bigger:{
            fontFamily: 'normal',
            textFS:16,
            textFW:"normal",
            titleFS:24,
            titleFW:"bold",
            headingFS:16,
            headingFW:"bold",
            smallTxtFS:14,
            smallTxtFW:"100",
            name:'bigger'

        },
    },
    Background:{
        happy: 'maxresdefault.jpg',
        neutral:'bg-01.jpg',
        sad:'maxresdefaultsad.jpg'
    }
}



export default ComponentAdaptations;