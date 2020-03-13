// Calling modules used
const assert = require('chai').assert
const fetch = require('node-fetch')

// Testing the fetch function on the back-end.
describe('Testing fetch Api', () => {
    // Static data being parsed and fetched
    it('Fetching data', async() => {
        const iStoreData = await fetch('https://itunes.apple.com/search?term=eminem&limit=1')
        const readData = await iStoreData.json()

        assert.equal(readData.results[0].trackName, 'Lose Yourself')

    })
})