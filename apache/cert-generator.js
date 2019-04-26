var fs = require('fs');
var exec = require('child_process').exec;
var config = fs.readFileSync('ssl-config.json');
var domains = JSON.parse(config);
var template  = fs.readFileSync('ssl-config.cnf', 'utf8');
const COUNTRY = 'US';
const STATE = 'CA';
const LOCALITY = 'CA';
const OCCUPATION = 'IT';
const OCCUPATION_UNIT = 'IT';
console.log(template);
for (let i in domains){
	let domainData = domains[i];
	let certConfig = template;
	let domain = domainData.domain;
	let country = domainData.country || COUNTRY;
	let state = domainData.state || STATE;
	let locality = domainData.locality || LOCALITY;
	let occupation = domainData.occupation || OCCUPATION;
	let occupation_unit = domainData.occupation_unit || OCCUPATION_UNIT;
	certConfig = certConfig.replace(/{DOMAIN}/g, domain);
	certConfig = certConfig.replace(/{COUNTRY}/g, country);
	certConfig = certConfig.replace(/{STATE}/g, state);
	certConfig = certConfig.replace(/{LOCALITY}/g, locality);
	certConfig = certConfig.replace(/{OCCUPATION}/g, occupation);
	certConfig = certConfig.replace(/{OCCUPATION_UNIT}/g, occupation_unit);
	console.log(certConfig)
	fs.writeFileSync("ssl/"+domain+".cnf", certConfig);
	let fn = "openssl req -new -x509 -newkey rsa:2048 -sha256 -nodes -keyout ssl/"+domain+".key -days 3560 -out ssl/"+domain+".crt -config ssl/"+domain+".cnf"
	exec(fn);
}