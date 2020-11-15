const fs = require('fs')
const path = require('path')
const { ajv } = require('./ajv.js')

describe('Person', () => {
	test('person.schema.json', () => {
		const data = JSON.parse(
			fs.readFileSync(
				path.resolve(process.cwd(), 'test', 'samples', 'person.json'),
				'utf8',
			),
		)
		const validate = ajv.getSchema(
			'https://distributeaid.github.io/schemas#Person',
		)
		const valid = validate(data)
		expect(validate.errors).toBeNull()
		expect(valid).toEqual(true)
	})
})
