var nunjucks = require('nunjucks'); 
var fs = require('fs'); 
var env = nunjucks.configure('./templates', {
  tags: {
    blockStart: '<$',
    blockEnd: '$>',
    variableStart: '<%',
    variableEnd: '%>',
    commentStart: '<#',
    commentEnd: '#>'
  }
});

var res = nunjucks.renderString(fs.readFileSync('./templates/controller/Controller.template').toString(),{controller:{name:'Suhail'}});
console.log(res);