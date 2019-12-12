//region imports
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const configs = require('./configs.json');
//endregion

function main() {
	const app = express();
	app.use(bodyParser.json());
	app.use(express.static(path.join(__dirname, 'dist')));

	app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname, 'dist/index.html'));
	});

	const server = app.listen(configs.port, () => {
		console.log(`Server listening on port ${configs.port}...`)
	});
}

main();