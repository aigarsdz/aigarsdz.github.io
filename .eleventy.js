const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const URL_BASE = 'https://aigars.digital'

function calculateFileHash(filePath) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256')
    const stream = fs.createReadStream(filePath)

    stream.on('error', reject)
    stream.on('data', chunk => hash.update(chunk))
    stream.on('end', () => resolve(hash.digest('hex')))
  })
}

module.exports = function (config) {
  config.addPassthroughCopy('CNAME')
  config.addPassthroughCopy('apple-touch-icon.png')
  config.addPassthroughCopy('favicon.ico')
  config.addPassthroughCopy('robots.txt')
  config.addPassthroughCopy('csv')
  config.addPassthroughCopy('json')
  config.addPassthroughCopy('public')
  config.ignores.add('react')
  config.ignores.add('vue')
  config.addAsyncFilter('version', async resourceURL => {
    const url = new URL(resourceURL, URL_BASE)
    const filePath = path.join(__dirname, url.pathname)

    try {
      const hash = await calculateFileHash(filePath)

      url.searchParams.set('v', hash)
    } catch (error) {
      console.error(error)
    }

    return url.toString().replace(URL_BASE, '')
  })
}

module.exports.config = {
  pathPrefix: '/'
}