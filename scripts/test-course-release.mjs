import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
const temp=await fs.mkdtemp(path.join(os.tmpdir(),'course-release-test-')),source=path.join(temp,'source');let checks=0;
try{
 for(const p of ['scripts','assets','schemas'])await fs.mkdir(path.join(source,p),{recursive:true});
 await fs.copyFile('scripts/course-release.mjs',path.join(source,'scripts/course-release.mjs'));
 for(const[p,text]of Object.entries({'course-loader.mjs':'// fixture','PROVENANCE.json':'{}','LICENSE.md':'Fixture rights','assets/course-checksums.json':'{"courseId":"ashinoko-gt","packVersion":"4.0.0","files":{}}','schemas/course-manifest.schema.json':'{}'}))await fs.writeFile(path.join(source,p),text);
 const run=(...args)=>spawnSync(process.execPath,[path.join(source,'scripts/course-release.mjs'),...args],{encoding:'utf8'});
 const pass=r=>{assert.equal(r.status,0,r.stderr);checks++;},fail=r=>{assert.notEqual(r.status,0,'Unsafe release accepted');checks++;};
 pass(run('--write'));pass(run());pass(run('--export',path.join(temp,'export')));
 assert.equal(await fs.readFile(path.join(temp,'export','course-loader.mjs'),'utf8'),'// fixture');checks++;
 await fs.rename(path.join(source,'course-loader.mjs'),path.join(temp,'outside'));await fs.symlink(path.join(temp,'outside'),path.join(source,'course-loader.mjs'));
 fail(run());fail(run('--write'));fail(run('--export',path.join(temp,'bad-export')));
 await fs.unlink(path.join(source,'course-loader.mjs'));await fs.rename(path.join(temp,'outside'),path.join(source,'course-loader.mjs'));
 await fs.rename(path.join(source,'assets'),path.join(temp,'outside-assets'));await fs.symlink(path.join(temp,'outside-assets'),path.join(source,'assets'));
 fail(run('--write'));await fs.unlink(path.join(source,'assets'));await fs.rename(path.join(temp,'outside-assets'),path.join(source,'assets'));
 await fs.mkdir(path.join(temp,'empty'));await fs.symlink(path.join(temp,'empty'),path.join(temp,'out-link'));fail(run('--export',path.join(temp,'out-link')));
 fail(run('--export',path.join(temp,'export')));
 console.log(JSON.stringify({releaseChecks:checks,coverage:['export equality','source-file symlink','source-directory symlink','destination symlink','nonempty export']}));
}finally{await fs.rm(temp,{recursive:true,force:true});}
