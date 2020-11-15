const fs = require('fs')
const path = require('path')
const { ajv } = require('./ajv.js')

describe('Aid Group', () => {
	test('aid-group.schema.json', () => {
		const data = JSON.parse(
			fs.readFileSync(
				path.resolve(process.cwd(), 'test', 'samples', 'aid-group.json'),
				'utf8',
			),
		)
		const validate = ajv.getSchema(
			'https://distributeaid.github.io/schemas#AidGroup',
		)
		const valid = validate(data)
		expect(validate.errors).toBeNull()
		expect(valid).toEqual(true)
	})
})
