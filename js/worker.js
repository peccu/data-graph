importScripts(
  'https://isomorphic-git.org/js/browserfs.js',
  'https://isomorphic-git.org/js/pify.js',
  'https://unpkg.com/isomorphic-git',
  'https://unpkg.com/magic-portal'
);
let fsOptions = {
  fs: 'IndexedDB',
  options: {}
};

BrowserFS.configure(fsOptions, async function(err) {
  if (err) return console.log(err);
  const portal = new MagicPortal(self);

  // Initialize isomorphic-git
  const fs = BrowserFS.BFSRequire('fs');
  portal.set('fs', fs);
  portal.set('pfs', pify(fs));

  // Initialize isomorphic-git with our new file system
  git.plugins.set('fs', fs);

  let emitter = await portal.get('emitter');
  git.plugins.set('emitter', emitter);

  let credentialManager = await portal.get('credentialManager');
  git.plugins.set('credentialManager', credentialManager);

  fs.getRootFS().empty(() => {
    fs.mkdir('/', () => {
      portal.set('git', git);
    });
  });
});

self.addEventListener('message', ({ data }) => console.log(data));
