define(['pipAPI','https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/IAT/iat10.js'], function(APIConstructor, iatExtension){
    let API = new APIConstructor();
    let global = API.getGlobal();

    return iatExtension({
		leftKeyText : '"E" harfine basın',
		rightKeyText : 'I harfine basın', 
		finalText : 'Bir sonraki bölüme geçmek için boşluk tuşuna basın.', 
		finalTouchText : 'Bir sonraki bölüme geçmek için alttaki yeşil alana dokunun.',
		instAttributePractice: '<div><p align="center" style="font-size:20px; font-family:arial">' +
				'<font color="#000000"><u>Part blockNum of nBlocks </u><br/><br/></p>' +
				'<p style="font-size:20px; text-align:left; vertical-align:bottom; margin-left:10px; font-family:arial">' +
				'Kategoriye ait olan öğeler için sol parmağınızı <b>E</b> tuşuna koyun. <font color="#0000ff">leftAttribute.</font>' +
				'<br/>Kategoriye ait olan öğeler için sol parmağınızı <b>I</b> tuşuna koyun. <font color="#0000ff">rightAttribute</font>.<br/><br/>' +
				'Eğer bir hata yaparsanız, kırmızı bir <font color="#ff0000"><b>X</b></font> belirecektir. ' +
				'Devam etmek için diğer tuşa basın.<br/>' +
				'<u>Mümkün olduğunca hızlı ve isabetli olmaya çalışın.<br/><br/></p>'+
				'<p align="center"> Başlamaya hazır olduğunuzda <b> boşluk tuşuna</b> basın. </font></p></div>',
			instAttributePracticeTouch: [
				'<div>',
					'<p align="center">',
						'<u>Part blockNum of nBlocks</u>',
					'</p>',
					'<p align="left" style="margin-left:5px">',
						'<br/>',
						'Put a left finger over the the <b>left</b> green area for items that belong to the category <font color="#0000ff">leftAttribute</font>.<br/>',
						'Put a right finger over the <b>right</b> green area for items that belong to the category <font color="#0000ff">rightAttribute</font>.<br/>',
						'Items will appear one at a time.<br/>',
						'<br/>',
						'If you make a mistake, a red <font color="#ff0000"><b>X</b></font> will appear. Touch the other side. <u>Go as fast as you can</u> while being accurate.',
					'</p>',
					'<p align="center">Touch the <b>lower </b> green area to start.</p>',
				'</div>'
			].join('\n'),

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
