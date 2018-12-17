const get = () => {
  return JSON.parse(window.localStorage.getItem('credential'));
};
const set = (cred) => {
  return window.localStorage.setItem('credential', JSON.stringify(cred));
};

// 'credentialManager' plugin
// cf. https://github.com/isomorphic-git/credential-manager-node-cli/blob/master/index.js
export const credentialManager = {
  async fill({url}){
    let cred = get();
    if(cred && url in cred && cred[url].length === 1){
      return cred[url][0];
    }
    if(cred && url in cred && cred[url].length > 0){
      console.log('returning first credential');
      return cred[url][0];
    }
    let username = window.prompt('Username:');
    let password = window.prompt('Password:');
    return { username, password };
  },
  async approved({url, auth}){
    console.log('approved', [url, auth]);
    let cred = get();
    if(!cred){
      console.log('save approved credential about (first url)', [url, auth]);
      cred = {};
      cred[url] = [auth];
      set(cred);
      return;
    }
    if(cred && !url in cred ){
      console.log('save approved credential about (new url)', [url, auth]);
      cred[url] = [auth];
      set(cred);
      return;
    }
    let _cred = cred[url].find(x => JSON.stringify(x) === JSON.stringify(auth));
    if(_cred){
      console.log('already stored credential');
      return;
    }
    console.log('save approved credential about (append)', [url, auth]);
    cred[url].push(auth);
    set(cred);
  },

  async rejected({url, auth}){
    window.alert('Authentication rejected');
    let cred = get();
    if(!cred || !url in cred){
      console.log('no stored credentials');
      return;
    }
    let _cred = cred[url].filter(x => JSON.stringify(x) !== JSON.stringify(auth));
    if(cred[url].length === _cred.length){
      console.log('no stored failed credentials');
      return;
    }
    if (_cred.length === 0) {
      console.log('failed last credentials about', url);
      delete(cred[url]);
      set(cred);
    } else {
      console.log('failed credentials about', [url, auth]);
      cred[url] = _cred;
      set(cred);
    }
  }
};
