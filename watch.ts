import * as chokidar from 'chokidar';
import {build} from 'esbuild';
import * as shell from 'shelljs';

chokidar
  .watch('src')
  .on('all', (event, path) => {
    if (['add', 'change'].includes(event)) {
      console.log('build', path);
      build({
        entryPoints: [path],
        outdir: 'dist/src',
        minify: false,
        bundle: true,
        define: {'process.env.NODE_ENV': '"production"'},
      }).catch(() => console.warn('failed to build', path));
      shell.touch('dist/reload');
    }
  });