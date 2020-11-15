const fs = require('fs')
const path = require('path')
const { ajv } = require('./ajv.js')

describe('Quote Request', () => {
	test('quote-request.schema.json', () => {
		const data = JSON.parse(
			fs.readFileSync(
				path.resolve(process.cwd(), 'test', 'samples', 'quote-request.json'),
				'utf8',
			),
		)
		const validate = ajv.getSchema(
			'https://distributeaid.github.io/schemas#QuoteRequest',
		)
		const valid = validate(data)
		expect(validate.errors).toBeNull()
		expect(valid).toEqual(true)
	})
})
