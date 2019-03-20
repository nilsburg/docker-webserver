var fs = require('fs');
var content = fs.readFileSync('vhosts.json');
var data = JSON.parse(content);
var template  = fs.readFileSync('vhost.conf', 'utf8');
var outputDir = 'sites-available';
const DEFAULT_PORT = 80;
const DEFAULT_PHP_HOST =  'php';
const SERVER_ROOT = '/var/www';
for(let i in data){
	var vhost = data[i];
	var port = vhost.port || DEFAULT_PORT;
	var php_host = vhost.php_host || DEFAULT_PHP_HOST;
	let outputContent = template;
	outputContent = outputContent.replace(/{SERVER_NAME}/g, vhost.server_name)
	outputContent = outputContent.replace(/{DOCUMENT_ROOT}/g, SERVER_ROOT+vhost.document_root)
	outputContent = outputContent.replace(/{PORT}/g, port)
	outputContent = outputContent.replace(/{PHP_HOST}/g, php_host);
	outputContent = outputContent.replace(/{NAME}/g, vhost.name);
	let vhostFilename = vhost.name+"-"+port+".conf";
	console.log("Generated "+vhostFilename, vhost);
	fs.writeFileSync(outputDir+"/"+vhostFilename, outputContent);
}