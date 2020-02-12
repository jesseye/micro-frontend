const path = require('path');

module.exports = {
  extensions: ['.js', '.css', '.less'],
  alias: {
    '@views': path.resolve(__dirname, '../source/views')
  }
}