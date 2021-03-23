const dev = require('..');

dev.build({
  source: 'examples/server.jsx',
  outfile: 'examples/server.min.js',
  platform: 'node',
  stage: 'prod'
})

dev.build({
  source: 'examples/client.jsx',
  outfile: 'examples/client.min.js',
  platform: 'node',
  stage: 'prod'
})

dev.build({
  source: 'examples/three.js',
  outfile: 'examples/three.min.js',
  platform: 'node',
  stage: 'prod'
})

var fs = require('fs')
fs.readFile('examples/three.min.js', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(/\r/g, '')
    .replace(/[ \t]*\/\/.*\n/g, '') // remove //
    .replace(/[ \t]*\/\*[\s\S]*?\*\//g, '') // remove /* */
    .replace(/\n{2,}/g, '\n') // # \n+ to \n

  fs.writeFile('examples/three.min.r.js', result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});