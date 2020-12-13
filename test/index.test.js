const WebsiteGenerator = require('../lib/index')

describe('WebisteGenerator', () => {
  it('runs', () => {
    expect(WebsiteGenerator.run()).toEqual(true)
  })
})
