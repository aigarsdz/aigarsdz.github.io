module.exports = function (config) {
  config.addPassthroughCopy('CNAME')
  config.addPassthroughCopy('apple-touch-icon.png')
  config.addPassthroughCopy('favicon.ico')
  config.addPassthroughCopy('robots.txt')
}
