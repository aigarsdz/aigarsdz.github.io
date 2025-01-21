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
}
