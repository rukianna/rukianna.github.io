define(['pipAPI','https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/IAT/iat10.js'], function(APIConstructor, iatExtension){
    let API = new APIConstructor();
    let global = API.getGlobal();

    return iatExtension({
        category1 : {
            name : global.blackLabels, //Will appear in the data.
            title : {
                media : {word : global.blackLabels}, //Name of the category presented in the task.
                css : {color:'#31940F','font-size':'1.8em'}, //Style of the category title.
                height : 4 //Used to position the "Or" in the combined block.
            }, 
            stimulusMedia : [ //Stimuli content as PIP's media objects
                {image: 'woman1.jpg'},
                {image: 'woman2.jpg'},
                {image: 'woman3.jpg'},
                {image: 'woman4.jpg'},
                {image: 'woman5.jpg'},                 
                {image: 'woman6.jpg'}     
            ],
            //Stimulus css (style)
            stimulusCss : {color:'#31940F','font-size':'2.3em'}
        },    
        category2 : {
            name : global.whiteLabels, //Will appear in the data.
            title : {
                media : {word : global.whiteLabels}, //Name of the category presented in the task.
                css : {color:'#31940F','font-size':'1.8em'}, //Style of the category title.
                height : 4 //Used to position the "Or" in the combined block.
            }, 
            stimulusMedia : [ //Stimuli content as PIP's media objects
                {image: 'man1.jpg'},
                {image: 'man2.jpg'},
                {image: 'man3.jpg'},
                {image: 'man4.jpg'},
                {image: 'man5.jpg'},
                {image: 'man6.jpg'}
            ],
            //Stimulus css (style)
            stimulusCss : {color:'#31940F','font-size':'2.3em'}
        },
        attribute1 : {
            name : 'Aile',
            title : {
                media : {word : 'Aile'},
                css : {color:'#0000FF','font-size':'1.8em'},
                height : 4 //Used to position the "Or" in the combined block.
            },
            stimulusMedia : [ //Stimuli content as PIP's media objects
                {word: global.negWords[0]},
                {word: global.negWords[1]},
                {word: global.negWords[2]},
                {word: global.negWords[3]},
                {word: global.negWords[4]},
                {word: global.negWords[5]}
            ],
            //Stimulus css
            stimulusCss : {color:'#0000FF','font-size':'2.3em'}
        },
        attribute2 : {
            name : 'Kariyer',
            title : {
                media : {word : 'Kariyer'},
                css : {color:'#0000FF','font-size':'1.8em'},
                height : 4 //Used to position the "Or" in the combined block.
            },
            stimulusMedia : [ //Stimuli content as PIP's media objects
                {word: global.posWords[0]},
                {word: global.posWords[1]},
                {word: global.posWords[2]},
                {word: global.posWords[3]},
                {word: global.posWords[4]},
                {word: global.posWords[5]},
 
            ],
            //Stimulus css
            stimulusCss : {color:'#0000FF','font-size':'2.3em'}
        },
        base_url : {//Where are your images at?
            image : global.baseURL
        },
        isTouch : global.$isTouch
    });
});
