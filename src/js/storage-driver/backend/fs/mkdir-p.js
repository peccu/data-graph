import immutableArray from '../../../immutableArray.js';

// based on https://stackoverflow.com/a/40686853/514411
export const isAbsolute = (path) => {
  if(!path){
    return false;
  }
  if(path.match(/^\//)){
    return true;
  }
  return false;
};

// remove head ./ and / and ../ and trailing /
const normalize = (path) => path
      .replace(/^(\.\/)+/, '')
      .replace(/(\/\.\/)/g, '/')
      .replace(/^\//, '')
      .replace(/(^\.\.\/)+/, '')
      .replace(/\/$/, '');

const resolveDoubleDots = (path) => {
  const pathArray = path.split('/');
  const parent = pathArray.indexOf('..');
  if(parent === -1){
    return path;
  }
  if(parent === 0){
    return resolveDoubleDots(immutableArray.splice(pathArray, parent, 1).join('/'));
  }
  return resolveDoubleDots(immutableArray.splice(pathArray, parent - 1, 2).join('/'));
};

export default (fs, path) => {
  let sep = '/';
  const initDir = isAbsolute(path) ? '' : '.';
  const baseDir = (isAbsolute(path) ? '/' : './') + resolveDoubleDots(normalize(path));

  return resolveDoubleDots(normalize(path)).split(sep).reduce((parentDir, childDir) => {
    const curDir = [parentDir, childDir].join(sep);
    if(fs.existsSync(curDir)){
      // console.log('exists', curDir);
      return curDir;
    }
    try{
      // console.log('mkdir', curDir);
      fs.mkdirSync(curDir);
      return curDir;
    } catch (err) {
      if(err.code === 'EEXIST'){ // curDir already exists!
        return curDir;
      }

      // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
      if(err.code === 'ENOENT'){ // Throw the original parentDir error on curDir `ENOENT` failure.
        throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
      }

      const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
      if(!caughtErr || caughtErr && curDir === baseDir){
        throw err; // Throw if it's just the last created dir.
      }
    }

    return curDir;
  }, initDir);
};
