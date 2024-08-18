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
        declineText: isTouch ? 'Geç' : 'Soruyu Geç', 
        autoFocus:true, 
        progressBar:  ''Sayfa <%= pagesMeta.number %> / 8',
	submitText: isTouch ? 'Gönder' : 'Gönder', // Yeni buton metnini burada belirleyin
    });
	
    /**
	* Question prototypes
	*/
    API.addQuestionsSet('basicQ',{
        decline: 'true',
        required : true, 		
        errorMsg: {
            required: isTouch 
                ? 'Please select an answer, or click \'Geç\'' 
                : 'Please select an answer, or click \'Soruyu Geç\''
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
	* Specific Questions (Relationship Duration, Gender Roles, Relationship with Partner, Belief in Gender Equality)
	*/
    // Relationship Duration
    API.addQuestionsSet('relationshipDuration',{
        inherit: 'basicSelect',
        name: 'relationshipDuration',
        stem: 'İlişki süreniz nedir?',
        answers: [
            {text: '0-6 Ay', value: '0-6 Ay'},
            {text: '6 Ay - 1 Sene', value: '6 Ay - 1 Sene'},
            {text: '1-2 Yıl', value: '1-2 Yıl'},
            {text: '3-5 Yıl', value: '3-5 Yıl'},
            {text: '6+ Yıl', value: '6+ Yıl'}
        ]
    });

    // Gender Roles and Attitudes
    API.addQuestionsSet('genderRolesView',{
        inherit: 'basicSelect',
        name: 'genderRolesView',
        stem: 'Cinsiyet rollerine bakışınızı ve toplumsal cinsiyete yönelik tutumunuzu nasıl tanımlarsınız?',
        answers: [
            {text: 'Biraz Eşitlikçi', value: 'Biraz Eşitlikçi'},
            {text: 'Biraz Muhafazakar', value: 'Biraz Muhafazakar'},
            {text: 'Tamamen Eşitlikçi', value: 'Tamamen Eşitlikçi'},
            {text: 'Tamamen Muhafazakar', value: 'Tamamen Muhafazakar'},
            {text: 'Bilmiyorum', value: 'Bilmiyorum'}
        ]
    });

    // Relationship with Partner
    API.addQuestionsSet('relationshipEquality',{
        inherit: 'basicSelect',
        name: 'relationshipEquality',
        stem: 'İlişkinizi nasıl tanımlarsınız?',
        answers: [
            {text: 'Tamamen Eşitlikçi', value: 'Tamamen Eşitlikçi'},
            {text: 'Eşitlikçi Değil', value: 'Eşitlikçi Değil'},
            {text: 'Biraz Eşitlikçi', value: 'Biraz Eşitlikçi'},
            {text: 'Biraz Eşitlikçi Değil', value: 'Biraz Eşitlikçi Değil'},
            {text: 'Tamamen Eşitsiz', value: 'Tamamen Eşitsiz'}
        ]
    });

    // Belief in Gender Equality
    API.addQuestionsSet('beliefInEquality',{
        inherit: 'basicSelect',
        name: 'beliefInEquality',
        stem: 'Kadın erkek eşitliğine ne kadar inanıyorsunuz?',
        answers: [
            {text: 'Tamamen İnanıyorum', value: 'Tamamen İnanıyorum'},
            {text: 'Biraz İnanıyorum', value: 'Biraz İnanıyorum'},
            {text: 'Tamamen İnanmıyorum', value: 'Tamamen İnanmıyorum'},
            {text: 'Biraz İnanmıyorum', value: 'Biraz İnanmıyorum'}
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
