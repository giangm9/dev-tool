const dev = require('..');

dev.build({
  source : 'examples/server.jsx',
  outfile : 'examples/server.min.js',
  platform : 'node',
  stage : 'build'
})

dev.build({
  source : 'examples/client.jsx',
  outfile : 'examples/client.min.js',
  platform : 'node',
  stage : 'build'
})

dev.build({
  source : 'examples/three.ts',
  outfile : 'examples/three.min.js',
  platform : 'node',
  stage : 'dev'
})