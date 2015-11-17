babel-plugin-import-alias-bower
===================================

A babel plugin that allows using aliases to reference bower files in ES2015 imports.

## Usage

This is a [babel plugin](http://babeljs.io/docs/plugins/) that converts imports with sources starting with the **bower:** prefix to their path inside the local bower_components folder. To use it, just add it to your package.json and pass it as a plugin when calling babel:

```javascript
{
  "plugins": ["import-alias-bower"]
}
```
