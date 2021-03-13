const chokidar = require('chokidar');
const esbuild = require('esbuild')
const pm2 = require('pm2');
const sass = require('sass');
const fs = require("fs");

const stage = process.argv[2];


function build({ source, outfile, platform, watch }) {

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

  if (source.endsWith('jsx')) {
    buildExe = () => {
      try {
        esbuild.buildSync({
          entryPoints: [source],
          bundle: true,
          sourcemap: dev ? 'inline' : false,
          minify: build,
          jsxFactory: 'h',
          jsxFragment: 'Fragment',
          logLevel: 'error',
          define: {
            'STAGE': `"${stage}"`
          },
          outfile,
          platform
        })
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