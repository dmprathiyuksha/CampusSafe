import fs from 'fs';
import path from 'path';
import git from 'isomorphic-git';

async function updateTag() {
  const dir = path.resolve('.');

  const filesToAdd = [
    'README.md',
    'docs/screenshots/main_map_demo_v1.png',
    'docs/screenshots/emergency_drawer_demo_v1.png',
    'scripts/capture-demo-v1-screenshots.js'
  ];

  for (const filepath of filesToAdd) {
    if (fs.existsSync(path.join(dir, filepath))) {
      await git.add({ fs, dir, filepath });
    }
  }

  const sha = await git.commit({
    fs,
    dir,
    author: {
      name: 'User',
      email: 'user@srmist.edu.in'
    },
    message: 'docs: complete README and screenshots for Demo V1'
  });

  console.log('✅ Committed README & screenshots with SHA:', sha);

  // Force update tag Demo-V1
  await git.tag({
    fs,
    dir,
    ref: 'Demo-V1',
    force: true
  });

  console.log('🏷️ Updated Git Tag: Demo-V1');
}

updateTag().catch(err => {
  console.error('Git error:', err);
  process.exit(1);
});
