'use strict';

var bowerConfig = require('bower/lib/config');
var path = require('path');

module.exports = function() {
  function renameAlias(source) {
    if (source.substr(0, 6) === 'bower:') {
      source = path.join(bowerConfig().directory, source.substr(6));
    }
    return source.replace(/\\/g, '/');
  }

  return {
    visitor: {
      ModuleDeclaration: {
        enter: function(path) {
          if (path.node.source) {
            path.node.source.value = renameAlias(path.node.source.value);
          }
        }
      }
    },

    post: function(file) {
      file.metadata.modules.imports.forEach(function(importData) {
        importData.source = renameAlias(importData.source);
      });
      file.metadata.modules.exports.specifiers.forEach(function(exportData) {
        exportData.source = renameAlias(exportData.source);
      });
    }
  };
};
