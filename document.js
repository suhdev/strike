
	var path = require('path'),
		fs = require('fs'),
		ngdocs = require('suh-dgeni-ngdocs');
 
 
	ngdocs.generate({
	defaultDeployment:{
		name:'default',
		meta:{
			description:'just a test',
		},
		navigation:{
			top:{
				//Navigation items for the top navigation  
				navItems:[{
            		type:'divider',
          		},
          		{
		            type:'dropdown',
		            disabled:true,
		            label:'TestModule Documentation',
		            url:'#',
		            menu:[{
			              	label:'API Reference',
			              	url:'api'
			            },{
			              	label:'Guides',
			              	url:'guide'
			            },{
			            	label:'Suhail',
			            	url:'suhail'
			            }
			        ]
          		},
          		{
          			type:'divider'
          		}]
			}
		},
		//add any javascript files to be included in the documentation,  
		//usually this includes youre compiled (minimized angular code).  
		//also note that you need to pass the source to the ```path.resolve```  
		//function to generate the absolute URL.  
		scripts:[path.resolve('./app.min.js')] 
	},
			//base path to your source  
			basePath:path.resolve('lib'),
			//add your source paths patterns  
			sourceFiles:[
				'*.js',
				'*.jsx',
				'**/*.js',
				'**/*.jsx',
				'**/*.ngdoc'],
			//still under development, ideally here this will be extracted from code 
			//to extract new sections in the documentation other than the predefined ones 
			AREA_NAMES:{
				suhail:'Suhail Abood',
			},
			//define the output path for your documentation 
			//again note that we're passing the folder to the  
			//```path.resolve``` function  
			outputFolder:path.resolve('generated'),
			//home page information  
			homePage:{
				data:{
					//title of the home page 
					title:'Suhail Abood Library',
					//desctiption (content of the home page, this can include markdown content as well) 
					//you can pass in the content of the ```README.md```  
					description:fs.readFileSync('./README.md').toString(),
					//still under development, ideally this will be used to add 
					//dependencies section with full details about each dependency.  
					dependencies:[{
						name:'angular',
						version:'1.3.15'
					},{
						name:'jquery',
						version:'2.1.13'
					}]
				}
			},
			logger:{
				//set the ```Dgeni``` logger level (info|warn|debug|error) 
				level:null
			},
			extraData:{
				//still under development, this object literal is passed on to  
				//all documents, all partials, and still looking into the potential 
				//usage of such access 
				angular:'1.3.15',
				jquery:'2.1.13',
				name:'Suhail Abood',
				module:{
					version:'v1.0.0',
					file:'suhail.js',
					minifiedFile:'suhail.min.js'
				}
			}
		});