define(['questAPI'], function(Quest){
    let API = new Quest();
    let isTouch = API.getGlobal().$isTouch;
	
    /**
	* Page prototype
	*/
    API.addPagesSet('basicPage',{
        noSubmit:false, // Change to true if you don't want to show the submit button.
        header: 'Demografik Bilgiler',
        decline: true,
        declineText: isTouch ? 'Gec' : 'Soruyu Gec', 
        autoFocus:true, 
        progressBar:  'Sayfa <%= pagesMeta.number %> / 8',
	submitText: isTouch ? 'Gonder' : 'Gonder', // Yeni buton metnini burada belirleyin
    });
	
    /**
	* Question prototypes
	*/
    API.addQuestionsSet('basicQ',{
        decline: 'true',
        required : true, 		
        errorMsg: {
            required: isTouch 
                ? 'Please select an answer, or click \'Gec\'' 
                : 'Please select an answer, or click \'Soruyu Gec\''
        },
        autoSubmit:'true',
        numericValues:'true',
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
        stem: 'Dogum ayiniz nedir?',
        answers: [
            {text: 'Ocak', value: 'Ocak'},
            {text: 'subat', value: 'subat'},
            {text: 'Mart', value: 'Mart'},
            {text: 'Nisan', value: 'Nisan'},
            {text: 'Mayis', value: 'Mayis'},
            {text: 'Haziran', value: 'Haziran'},
            {text: 'Temmuz', value: 'Temmuz'},
            {text: 'Agustos', value: 'Agustos'},
            {text: 'Eylul', value: 'Eylul'},
            {text: 'Ekim', value: 'Ekim'},
            {text: 'Kasim', value: 'Kasim'},
            {text: 'Aralik', value: 'Aralik'}
        ]
    });

    // Birth Year
    API.addQuestionsSet('birthYear',{
        inherit: 'basicDropdown',
        name: 'birthYear',
        stem: 'Dogum yiliniz nedir?',
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
            {text: 'Kadin', value: 'Kadin'},
            {text: 'Erkek', value: 'Erkek'}
        ]
    });

    // Education Level
    API.addQuestionsSet('educationLevel',{
        inherit: 'basicSelect',
        name: 'educationLevel',
        stem: 'Egitim durumunuz nedir?',
        answers: [
            {text: 'Lisans', value: 'Lisans'},
            {text: 'Lisansustu', value: 'Lisansustu'},
            {text: 'Doktora', value: 'Doktora'}
        ]
    });

    /**
	* Specific Questions (Relationship Duration, Gender Roles, Relationship with Partner, Belief in Gender Equality)
	*/
    // Relationship Duration
    API.addQuestionsSet('relationshipDuration',{
        inherit: 'basicSelect',
        name: 'relationshipDuration',
        stem: 'Iliski sureniz nedir?',
        answers: [
            {text: '0-6 Ay', value: '0-6 Ay'},
            {text: '6 Ay - 1 Sene', value: '6 Ay - 1 Sene'},
            {text: '1-2 Yil', value: '1-2 Yil'},
            {text: '3-5 Yil', value: '3-5 Yil'},
            {text: '6+ Yil', value: '6+ Yil'}
        ]
    });

    // Gender Roles and Attitudes
    API.addQuestionsSet('genderRolesView',{
        inherit: 'basicSelect',
        name: 'genderRolesView',
        stem: 'Cinsiyet rollerine bakisinizi ve toplumsal cinsiyete yonelik tutumunuzu nasil tanimlarsiniz?',
        answers: [
            {text: 'Biraz Esitlikci', value: 'Biraz Esitlikci'},
            {text: 'Biraz Muhafazakar', value: 'Biraz Muhafazakar'},
            {text: 'Tamamen Esitlikci', value: 'Tamamen Esitlikci'},
            {text: 'Tamamen Muhafazakar', value: 'Tamamen Muhafazakar'},
            {text: 'Bilmiyorum', value: 'Bilmiyorum'}
        ]
    });

    // Relationship with Partner
    API.addQuestionsSet('relationshipEquality',{
        inherit: 'basicSelect',
        name: 'relationshipEquality',
        stem: 'Iliskinizi nasil tanimlarsiniz?',
        answers: [
            {text: 'Tamamen Esitlikci', value: 'Tamamen Esitlikci'},
            {text: 'Esitlikci Degil', value: 'Esitlikci Degil'},
            {text: 'Biraz Esitlikci', value: 'Biraz Esitlikci'},
            {text: 'Biraz Esitlikci Degil', value: 'Biraz Esitlikci Degil'},
            {text: 'Tamamen Esitsiz', value: 'Tamamen Esitsiz'}
        ]
    });

    // Belief in Gender Equality
    API.addQuestionsSet('beliefInEquality',{
        inherit: 'basicSelect',
        name: 'beliefInEquality',
        stem: 'Kadin erkek esitligine ne kadar inaniyorsunuz?',
        answers: [
            {text: 'Tamamen Inaniyorum', value: 'Tamamen Inaniyorum'},
            {text: 'Biraz Inaniyorum', value: 'Biraz Inaniyorum'},
            {text: 'Tamamen Inanmiyorum', value: 'Tamamen Inanmiyorum'},
            {text: 'Biraz Inanmiyorum', value: 'Biraz Inanmiyorum'}
        ]
    });

    /**
	* Sequence
	*/
    API.addSequence([
        {inherit: 'basicPage', questions: {inherit: 'birthMonth'}},
        {inherit: 'basicPage', questions: {inherit: 'birthYear'}},
        {inherit: 'basicPage', questions: {inherit: 'gender'}},
        {inherit: 'basicPage', questions: {inherit: 'educationLevel'}},
        {inherit: 'basicPage', questions: {inherit: 'relationshipDuration'}},
        {inherit: 'basicPage', questions: {inherit: 'genderRolesView'}},
        {inherit: 'basicPage', questions: {inherit: 'relationshipEquality'}},
        {inherit: 'basicPage', questions: {inherit: 'beliefInEquality'}}
    ]);

    return API.script;
});
