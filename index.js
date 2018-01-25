const fs = require('fs')
const path = require('path')
const loaderUtils = require('loader-utils')
const defaultOptions = {
  placeholder: '{{__content__}}',
  decorator: 'layout'
}

const render = (layoutPath, placeholder, source, params) => {
  try {
    var layoutHtml = fs.readFileSync(layoutPath, 'utf-8')
  } catch (error) {
    throw error
  }
  if (params) {
    const reg = new RegExp(`{\\s*(.*)\\s*:\\s*['"](.*)['"]\\s*}`)
    const regResult = reg.exec(params)
    let str = `{{__${regResult[1]}__}}`
    layoutHtml = layoutHtml.replace(str, regResult[2])
  }
  return layoutHtml.replace(placeholder, source)
}

module.exports = function (source) {
  this.cacheable && this.cacheable()
  const options = Object.assign(loaderUtils.getOptions(this), defaultOptions)
  const { placeholder, decorator } = options
  let { layout } = options
  const reg = new RegExp(`(@${decorator}\\()(.*?),?\\s*({.*})?\\)`)
  const regResult = reg.exec(source)
  var callback = this.async()
  if (regResult) {
    const request = loaderUtils.urlToRequest(regResult[2])
    this.resolve('/', request, (err, rs) => {
      if (err) {
        rs = path.resolve(this.resourcePath, '../', request)
      }
      source = source.replace(regResult[0], '')
      callback(null, render(rs, placeholder, source, regResult[3]))
    })
  } else if (layout) {
    callback(null, render(layout, placeholder, source))
  } else {
    callback(null, source)
  }
}
