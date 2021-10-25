var path = require('path');

module.exports = (function () {
  return path.dirname( process.mainModule.filename);
})();

