var ColorPallete = {
    normal: {
        firstColor: "#153243",
        secondColor: "#284B63",
        thirdColor: "#B4B8AB",
        fourthColor: '#F4F9E9',
        fifthColor: "#EEF0EB",
        gridColor1: "#1abc9c",
        gridColor2: "#3498db",
        gridColor3: "#2ecc71",
        gridColor4: "#e74c3c",
        gridColor5: "#34495e",
        gridColor6: "#d35400",
        gridColor7: "#43474F",
    },
       dimmed: {
        firstColor: "#344132",
        secondColor: "#394120",
        thirdColor: "#586374",
        fourthColor: '#D4D6B9',
        fifthColor: "#D1CAA1",
        gridColor1: "#587367",
        gridColor2: "#736A4E",
        gridColor3: "#377358",
        gridColor4: "#097309",
        gridColor5: "#736D58",
        gridColor6: "#A73E1B",
        gridColor7: "#43474F",

    },
    bright: {
        firstColor: "blue",
        secondColor: "#153242",
        thirdColor: "grey",
        fourthColor: '#F4F9E9',
        fifthColor: "white",
        gridColor1: "#0E4F6D",
        gridColor2: "#6D3965",
        gridColor3: "#33544A",
        gridColor4: "#862C46",
        gridColor5: "#5C5858",
        gridColor6: "#8E2A08",
        gridColor7: "#43474F",
    },
    inverted: {
        firstColor: "#f4942e",
        secondColor: "#F28F3B",
        thirdColor: "#FFD5C2",
        fourthColor: '#0D0618',
        fifthColor: "#000000",
        gridColor1: "#F18DD1",
        gridColor2: "#3CB849",
        gridColor3: "#939BEB",
        gridColor4: "#D78C14",
        gridColor5: "#A59782",
        gridColor6: "#F07976",
        gridColor7: "#43474F",
    },

    blackwhite: {
        firstColor: "#FCFAF9",
        secondColor: "#FCFFFC",
        thirdColor: "#878787",
        fourthColor: '#393E41',
        fifthColor: "#0F0A0A",
        gridColor1: "#F18DD1",
        gridColor2: "#3CB849",
        gridColor3: "#939BEB",
        gridColor4: "#D78C14",
        gridColor5: "#A59782",
        gridColor6: "#F07976",
        gridColor7: "#43474F",
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
        },
        blackwhite: {
            backgroundColor: ColorPallete.blackwhite.firstColor,
            fontColor: ColorPallete.blackwhite.fourthColor,
            borderWidth: 1,
            borderColor: ColorPallete.blackwhite.firstColor,
        },

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
    Voice:{
        activated:true,
        deactivated:false
    },
    Font:{
        normal:{
            fontFamily: 'normal',
            textFS:14,
            textFW:"normal",
            titleFS:20,
            titleFW:"bold",
            headingFS:16,
            headingFW:"bold",
            smallTxtFS:12,
            smallTxtFW:"100",
            name:'normal'
        },
        big:{
            fontFamily: 'normal',
            textFS:16,
            textFW:"normal",
            titleFS:22,
            titleFW:"bold",
            headingFS:18,
            headingFW:"bold",
            smallTxtFS:14,
            smallTxtFW:"100",
            name:'big'

        },
        bigger:{
            fontFamily: 'normal',
            textFS:18,
            textFW:"normal",
            titleFS:24,
            titleFW:"bold",
            headingFS:20,
            headingFW:"bold",
            smallTxtFS:16,
            smallTxtFW:"100",
            name:'bigger'

        },
    },
    Platform:{
        tablet:"tablet",
        smartphone:"smartphone"
    },
    EmotionButton:{
        neutral:"none",
        cheerup:"cheerup",
        happy:"happy",
    },
    Background:{
        happy: 'maxresdefault.jpg',
        neutral:'bg-01.jpg',
        sad:'maxresdefaultsad.jpg'
    }
}



export default ComponentAdaptations;