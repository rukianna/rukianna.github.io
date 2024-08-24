define(['managerAPI',
	'https://cdn.jsdelivr.net/gh/minnojs/minno-datapipe@1.*/datapipe.min.js'], function(Manager){

	var API = new Manager();

	// DataPipe'i başlatma. OSF Proje ID'si ve Veri Bileşeni ID'si eklenmiştir.
	init_data_pipe(API, 
		'NkIIpkWT5EGRhn7wTIJEd9JFWvHko5PryC8nEMJVrecersfdyLrWgFUST1QzinfGg9g4Kz',  
		{
			file_type: 'csv', 
			osf_project: '9t2u7',  // OSF Proje ID'si
			osf_component: 'n6d5b',  // OSF Veri Bileşeni ID'si (component ID)
			experiment_id: 'RSo9zI9jhrIn'
		}
	);

	API.setName('mgr');
	API.addSettings('skip', true);

	// Rastgele iki setten birini seç
	let raceSet = API.shuffle(['a', 'b'])[0];
	let blackLabels = [];
	let whiteLabels = [];

	if (raceSet === 'a') {
		blackLabels.push('Kadın');
		whiteLabels.push('Erkek');
	} else {
		blackLabels.push('Kadın');
		whiteLabels.push('Erkek');
	}

	API.addGlobal({
		raceiat: {},
		baseURL: './images/',
		raceSet: raceSet,
		blackLabels: blackLabels,
		whiteLabels: whiteLabels,
		posWords: API.shuffle([
			'Profesyonel', 'Zeki', 'Maaş', 'Cesur', 'Korkusuz', 'Güçlü'
		]),
		negWords: API.shuffle([
			'Saflık', 'Duygusallık', 'Şefkat', 'Çocuk', 'Aile', 'Bağlılık'
		])
	});

	API.addTasksSet({
		instructions: [{
			type: 'message',
			buttonText: 'Devam et'
		}],

		intro: [{
			inherit: 'instructions',
			name: 'intro',
			templateUrl: 'intro.jst',
			title: 'Intro',
			header: 'Welcome'
		}],
		
		explicits: [{
			type: 'quest',
			name: 'explicits',
			scriptUrl: 'explicits.js'
		}],
			
		raceiat_instructions: [{
			inherit: 'instructions',
			name: 'raceiat_instructions',
			templateUrl: 'raceiat_instructions.jst',
			title: 'IAT Instructions',
			header: 'Implicit Association Test'
		}],

		raceiat: [{
			type: 'time',
			name: 'raceiat',
			scriptUrl: 'raceiat.js'
		}],

		lastpage: [{
			type: 'message',
			name: 'lastpage',
			templateUrl: 'lastpage.jst',
			title: 'End',
			header: 'You have completed the study'
		}], 
		
		redirect: [{ 
			type: 'redirect', 
			name: 'redirecting', 
			url: 'https://www.google.com/search' 
		}],
		
		uploading: uploading_task({header: 'Bir dakika...', body: 'Lütfen Bekleyiniz'})
	});

	API.addSequence([
		{ type: 'isTouch' }, 
		{ type: 'post', path: ['$isTouch', 'raceSet', 'blackLabels', 'whiteLabels'] },

		{
			mixer: 'branch',
			conditions: { compare: 'global.$isTouch', to: true },
			data: [{
				type: 'injectStyle',
				css: [
					'* {color:red}',
					'[piq-page] {background-color: #fff; border: 1px solid transparent; border-radius: 4px; box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05); margin-bottom: 20px; border-color: #bce8f1;}',
					'[piq-page] > ol {margin: 15px;}',
					'[piq-page] > .btn-group {margin: 0px 15px 15px 15px;}',
					'.container {padding:5px;}',
					'[pi-quest]::before, [pi-quest]::after {content: " ";display: table;}',
					'[pi-quest]::after {clear: both;}',
					'[pi-quest] h3 { border-bottom: 1px solid transparent; border-top-left-radius: 3px; border-top-right-radius: 3px; padding: 10px 15px; color: inherit; font-size: 2em; margin-bottom: 20px; margin-top: 0;background-color: #d9edf7;border-color: #bce8f1;color: #31708f;}',
					'[pi-quest] .form-group > label {font-size:1.2em; font-weight:normal;}',
					'[pi-quest] .btn-toolbar {margin:15px;float:none !important; text-align:center;position:relative;}',
					'[pi-quest] [ng-click="decline($event)"] {position:absolute;right:0;bottom:0}',
					'[pi-quest] [ng-click="submit()"] {width:30%;line-height: 1.3333333;border-radius: 6px;}',
					'@media (min-width: 480px) { [pi-quest] [ng-click="submit()"] {width:30%;padding: 10px 16px;font-size: 1.6em;} }',
					'@media (max-width: 480px) { [pi-quest] [ng-click="submit()"] {padding: 8px 13px;font-size: 1.2em;} [pi-quest] [ng-click="decline($event)"] {font-size: 0.9em;padding:3px 6px;} }'
				]
			}]
		},
		
		{ inherit: 'intro' },	
		{
			mixer: 'wrapper',
			data: [
				{ inherit: 'explicits' },
				{
					mixer: 'wrapper',
					data: [
						{ inherit: 'raceiat_instructions' },
						{ inherit: 'raceiat' }
					]
				}
			]
		},
		{ inherit: 'uploading' },
		{ inherit: 'lastpage' },
		{ inherit: 'redirect' }
	]);

	return API.script;
});
