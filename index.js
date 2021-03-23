const chokidar = require('chokidar');
const esbuild = require('esbuild')
const sass = require('sass');
const fs = require("fs");

function build({
  source,
  outfile,
  platform,
  watch,
  stage
}) {

  const dev = stage == 'dev';
  const build = stage == 'build'

  let buildExe = null;

  let logSuccess = () => {

    let fileSizeInBytes = fs.statSync(outfile).size;
    let msg = `${source} > ${outfile} ${(fileSizeInBytes / 1024).toFixed(0)}KB ok`;
    if (stage == 'dev') {
      console.count(msg)
    } else {
      console.log(msg)
    }
  }

  if (source.endsWith('jsx') || source.endsWith('ts')) {
    var options = {
      entryPoints: [source],
      bundle: true,
      sourcemap: dev ? 'inline' : false,
      minify: build,
      logLevel: 'error',
      define: {
        'STAGE': `"${stage}"`,
        'process.env.NODE_ENV' : dev ? '"development"' : '"production"'
      },
      outfile,
      platform
    }

    buildExe = () => {
      try {
        esbuild.buildSync(options)
        logSuccess()
      } catch (e) {
        console.log(e);
      }
    }

  }

  if (source.endsWith('scss')) {
    buildExe = () => {
      try {
        const result = sass.renderSync({
          file: source,
          outfile,
          sourceMap: dev
        })
        fs.writeFileSync(outfile, result.css);
        logSuccess()
      } catch (e) {
        console.log(e);
      }
    }

  }
  buildExe();

  watch && chokidar.watch(watch).on('change', buildExe);

}

module.exports = {
  build
}