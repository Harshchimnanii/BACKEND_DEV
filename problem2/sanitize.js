const sanitizeHtml = require('sanitize-html');

function clean(input){
  return sanitizeHtml(input, {
    allowedTags: ['b','i','a'],
    allowedAttributes: { 'a': ['href'] }
  });
}

module.exports = clean;
