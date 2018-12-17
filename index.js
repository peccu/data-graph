let worker = new Worker('./js/worker.js');
const portal = new MagicPortal(worker);
worker.addEventListener('message', ({ data }) => console.log(data));

import {emitter} from './js/emitter.js';
portal.set('emitter', emitter, { void: ['emit'] });

import {credentialManager} from './js/credentialManager.js';
portal.set('credentialManager', credentialManager, {
  void: ['approved', 'rejected']
});

(async () => {
  const pfs = await portal.get('pfs');
  window.pfs = pfs;
  const fs = await portal.get('fs');
  window.fs = fs;

  const git = await portal.get('git');
  document.getElementById('log').textContent += 'ready\n';
  document.getElementById('repository').value = 'https://github.com/isomorphic-git/isomorphic-git';
  document
    .getElementById('cloneButton')
    .addEventListener('click', async () => {
      document.getElementById('log').textContent = '';
      await git.clone({
        dir: '.',
        corsProxy: 'https://cors.isomorphic-git.org',
        // corsProxy: 'http://localhost:9999',
        url: document.getElementById('repository').value,
        singleBranch: true,
        depth: 100
      });
      let branches = await git.listBranches({ dir: '.', remote: 'origin' });
      console.log('branches', branches);
      document.getElementById('log').textContent +=
        'branches ' + branches + '\n';
    });

  window.git = git;
  window.worker = worker;
  console.log(git);
})();
