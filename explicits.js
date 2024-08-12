define(['questAPI'], function(Quest){
    let API = new Quest();
    let isTouch = API.getGlobal().$isTouch;
	
    /**
	* Page prototype
	*/
    API.addPagesSet('basicPage',{
        noSubmit:false, // Change to true if you don't want to show the submit button.
        header: 'Questionnaire',
        decline: true,
        declineText: isTouch ? 'Decline' : 'Decline to Answer', 
        autoFocus:true, 
        progressBar:  'Page <%= pagesMeta.number %> out of 7'
    });
	
    /**
	* Question prototypes
	*/
    API.addQuestionsSet('basicQ',{
        decline: 'true',
        required : true, 		
        errorMsg: {
            required: isTouch 
                ? 'Please select an answer, or click \'Decline\'' 
                : 'Please select an answer, or click \'Decline to Answer\''
        },
        autoSubmit:'true',
        numericValues:'true',
        help: '<%= pagesMeta.number < 7 %>',
        helpText: 'Tip: For quick response, click to select your answer, and then click again to submit.'
    });

    API.addQuestionsSet('basicSelect',{
        inherit :'basicQ',
        type: 'selectOne'
    });

    API.addQuestionsSet('basicDropdown',{
        inherit :'basicQ',
        type : 'dropdown',
        autoSubmit:false
    });

    /**
	* Demographic Questions
	*/
    // Birth Month
    API.addQuestionsSet('birthMonth',{
        inherit: 'basicSelect',
        name: 'birthMonth',
        stem: 'Doğum ayınız nedir?',
        answers: [
            {text: 'Ocak', value: 'Ocak'},
            {text: 'Şubat', value: 'Şubat'},
            {text: 'Mart', value: 'Mart'},
            {text: 'Nisan', value: 'Nisan'},
            {text: 'Mayıs', value: 'Mayıs'},
            {text: 'Haziran', value: 'Haziran'},
            {text: 'Temmuz', value: 'Temmuz'},
            {text: 'Ağustos', value: 'Ağustos'},
            {text: 'Eylül', value: 'Eylül'},
            {text: 'Ekim', value: 'Ekim'},
            {text: 'Kasım', value: 'Kasım'},
            {text: 'Aralık', value: 'Aralık'}
        ]
    });

    // Birth Year
    API.addQuestionsSet('birthYear',{
        inherit: 'basicDropdown',
        name: 'birthYear',
        stem: 'Doğum yılınız nedir?',
        answers: (function(){
            let years = [];
            for (let i = 2005; i >= 1910; i--) {
                years.push({text: i.toString(), value: i});
            }
            return years;
        })()
    });

    // Gender
    API.addQuestionsSet('gender',{
        inherit: 'basicSelect',
        name: 'gender',
        stem: 'Cinsiyetiniz nedir?',
        answers: [
            {text: 'Kadın', value: 'Kadın'},
            {text: 'Erkek', value: 'Erkek'}
        ]
    });

    // Education Level
    API.addQuestionsSet('educationLevel',{
        inherit: 'basicSelect',
        name: 'educationLevel',
        stem: 'Eğitim durumunuz nedir?',
        answers: [
            {text: 'Lisans', value: 'Lisans'},
            {text: 'Lisansüstü', value: 'Lisansüstü'},
            {text: 'Doktora', value: 'Doktora'}
        ]
    });

    /**
	* Specific questions
	*/	
    API.addQuestionsSet('attributes7',{
        inherit : 'basicSelect',
        name: 'attributes7',
        stem: 'Sizi en iyi tanımlayan ifade hangisidir?',
        answers: [
            {text:'I strongly prefer <%= global.whiteLabels %> to <%= global.blackLabels %>.',value:7},
            {text:'I moderately prefer <%= global.whiteLabels %> to <%= global.blackLabels %>.',value:6},
            {text:'I slightly prefer <%= global.whiteLabels %> to <%= global.blackLabels %>.',value:5},
            {text:'I like <%= global.whiteLabels %> and <%= global.blackLabels %> equally.',value:4},
            {text:'I slightly prefer <%= global.blackLabels %> to <%= global.whiteLabels %>.',value:3},
            {text:'I moderately prefer <%= global.blackLabels %> to <%= global.whiteLabels %>.',value:2},
            {text:'I strongly prefer <%= global.blackLabels %> to <%= global.whiteLabels %>.',value:1}
        ]
    });
	
    API.addQuestionsSet('thermBlack',{
        inherit : 'therm',
        name: 'Tblack_0to10',
        stem: 'How warm or cold do you feel towards <b><%= global.blackLabels %></b>?'
    });

    API.addQuestionsSet('thermWhite',{
        inherit : 'therm',
        name: 'Twhite_0to10',
        stem: 'How warm or cold do you feel towards <b><%= global.whiteLabels %></b>?'
    });

    /**
	* Sequence
	*/
    API.addSequence([
        {inherit: 'basicPage', questions: {inherit: 'birthMonth'}},
        {inherit: 'basicPage', questions: {inherit: 'birthYear'}},
        {inherit: 'basicPage', questions: {inherit: 'gender'}},
        {inherit: 'basicPage', questions: {inherit: 'educationLevel'}},
        {
            mixer : 'random', 
            data : [
                {
                    mixer : 'random', 
                    wrapper:true, 
                    data : [
                        {
                            inherit:'basicPage', 
                            questions: {inherit:'thermBlack'}
                        },
                        {
                            inherit:'basicPage', 
                            questions: {inherit:'thermWhite'}							
                        }
                    ]
                },
                {
                    inherit:'basicPage', 
                    questions: {inherit:'attributes7'}
                }
            ]
        }
    ]);

    return API.script;
});

