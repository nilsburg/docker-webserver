var fs = require('fs');
var content = fs.readFileSync('vhosts.json');
var data = JSON.parse(content);
var template  = fs.readFileSync('vhost.conf', 'utf8');
var outputDir = 'sites-available';
const DEFAULT_PORT = 80;
const DEFAULT_PHP_HOST =  'php';
for(let i in data){
	var ssl = false;
	var vhost = data[i];
	var port = vhost.port || DEFAULT_PORT;
	var php_host = vhost.php_host || DEFAULT_PHP_HOST;
	let outputContent = template;
	let serverAliases = '';
	if(vhost.ssl){
		ssl = true;
		port = 443;
	}
	outputContent = outputContent.replace(/{SERVER_NAME}/g, vhost.server_name)
	outputContent = outputContent.replace(/{DOCUMENT_ROOT}/g, vhost.document_root)
	outputContent = outputContent.replace(/{PORT}/g, port)
	outputContent = outputContent.replace(/{PHP_HOST}/g, php_host);
	outputContent = outputContent.replace(/{NAME}/g, vhost.name);
	if(ssl){
		outputContent = outputContent.replace(/({SSL_START}|{SSL_END})/gm, '');
		outputContent = outputContent.replace(/({CERT_FILENAME})/g, vhost.cert_filename);
	}else{
		outputContent = outputContent.replace(/({SSL_START}[\s\S]+{SSL_END})/gm, '');
	}
	if(vhost.server_aliases){
		serverAliases = 'ServerAlias';
		for (let i in vhost.server_aliases){
			serverAliases+= ' '+vhost.server_aliases[i];
		}		
	}
	
	outputContent = outputContent.replace(/{SERVER_ALIASES}/g, serverAliases);
	let vhostFilename = vhost.name+"-"+port+".conf";
	console.log("Generated "+vhostFilename, vhost);
	fs.writeFileSync(outputDir+"/"+vhostFilename, outputContent);
}
