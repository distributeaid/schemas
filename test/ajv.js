const fs = require('fs')
const path = require('path')
const Ajv = require('ajv').default
const glob = require('glob')
const addFormats = require('ajv-formats')

module.exports = {
	ajv: addFormats(
		new Ajv({
			schemas: glob
				.sync(`${path.resolve(process.cwd(), 'schemas')}/*.json`)
				.map((f) => JSON.parse(fs.readFileSync(f, 'utf-8'))),
		}),
	),
}
