import fs from 'fs';
import path from 'path';
import git from 'isomorphic-git';

async function freeze() {
  const dir = path.resolve('.');
  console.log('📦 Initializing Git repository in:', dir);

  // 1. Init
  await git.init({ fs, dir });

  // 2. Collect files excluding node_modules and dist and hidden system files
  const ignoreList = ['node_modules', 'dist', '.git', '.system_generated'];

  function getAllFiles(currentDir) {
    let files = [];
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      if (ignoreList.includes(entry.name)) continue;
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        files = files.concat(getAllFiles(fullPath));
      } else {
        const relativePath = path.relative(dir, fullPath).replace(/\\/g, '/');
        files.push(relativePath);
      }
    }
    return files;
  }

  const filesToAdd = getAllFiles(dir);
  console.log(`Staging ${filesToAdd.length} project files...`);

  for (const filepath of filesToAdd) {
    await git.add({ fs, dir, filepath });
  }

  // 3. Commit
  const sha = await git.commit({
    fs,
    dir,
    author: {
      name: 'User',
      email: 'user@srmist.edu.in'
    },
    message: 'feat: freeze CampusSafe demo as Demo V1'
  });

  console.log('✅ Committed Demo V1 with SHA:', sha);

  // 4. Tag as Demo-V1
  await git.tag({
    fs,
    dir,
    ref: 'Demo-V1'
  });

  console.log('🏷️ Created Git Tag: Demo-V1');

  // Verify log
  const commits = await git.log({ fs, dir, depth: 1 });
  console.log('Commit Log:', commits[0].commit.message, 'by', commits[0].commit.author.name);
}

freeze().catch(err => {
  console.error('Git error:', err);
  process.exit(1);
});
