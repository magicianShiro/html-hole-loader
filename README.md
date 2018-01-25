# html-hole-loader

> simple html layout loader for webpack

> modified from html-hole-loader

## Install

`npm install html-hole-loader`

## Required

> node > 6.0

## Usage

- First, you need a layout html, like this:
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Pure Web</title>
  <meta name=viewport content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no">
</head>
<body>
  <header>This is Header</header>

  <!-- the place of the content will be inserted, you can change the placeholder in loader options-->
  {{__content__}}

  <footer>This is footer</header>
</body>
</html>
```
- Second, you have two way to use the layout

  A. import layout template in html file, and add loader

  ```html
  <!-- file path can't include quotes -->
  @layout(../../htmls/layout.html)
  <div class="main">
    main content
  </div>
  ```
  ```javascript
  {
    test: /\.(html)$/,
    loader: 'html-hole-loader'
  },
  ```
  B. setting default layout in loader options, so you don't do any thing in html
  ```html
  <div class="main">
    main content
  </div>
  ```
  ```javascript
  {
    test: /\.(html)$/,
    loader: 'html-hole-loader',
    include: htmlPath, // the htmls you want inject to layout
    options: {
      layout: layoutHtmlPath // the path of default layout html
    }
  }
  ```
- you can also pass a parameter
  ```html
  @layout(../../htmls/layout.html, {title, "title"})
  <div class="main">
    main content
  </div>
  ```
  then in your layout

  ```html
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <!-- the place of the param will be inserteds-->
    <title>{{__title__}}</title>
    <meta name=viewport content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no">
  </head>
  <body>
    <header>This is Header</header>
    {{__content__}}
    <footer>This is footer</header>
  </body>
  </html>
  ```
## Options

there is others options

* `placeholder`: the placeholder of inserted place of layout,default: `{{__content__}}`
* `decorator`: the layout syntax, default: `layout`.
