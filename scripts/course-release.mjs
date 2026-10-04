#!/usr/bin/env node
/** Reproducible, content-pinned release inventory. No network or source-geometry generation. */
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const args=process.argv.slice(2);
assert(args.every(a=>a==='--write'||a==='--export'||!a.startsWith('--')),'Unknown option');
const output=args.includes('--export')?path.resolve(args[args.indexOf('--export')+1]||''):null;
async function noLinks(base,relative){
 let current=base;
 assert(!(await fs.lstat(base)).isSymbolicLink(),'Root symlink rejected');
 for(const part of relative.split('/')){current=path.join(current,part);assert(!(await fs.lstat(current)).isSymbolicLink(),'Source symlink rejected: '+relative);}
 return current;
}
async function readSafe(p){const resolved=await noLinks(root,p);assert((await fs.stat(resolved)).isFile(),'Regular files only: '+p);return fs.readFile(resolved);}
const read=async p=>JSON.parse(await readSafe(p));
const sums=await read('assets/course-checksums.json');
await noLinks(root,'schemas');
const paths=['course-loader.mjs','PROVENANCE.json','LICENSE.md',...Object.keys(sums.files).map(p=>'assets/'+p),'assets/course-checksums.json',...(await fs.readdir(path.join(root,'schemas'))).map(p=>'schemas/'+p)].sort();
const files={},contents=new Map();
for(const p of paths){
 assert(/^(?:assets\/[A-Za-z0-9][A-Za-z0-9._-]*|schemas\/[A-Za-z0-9][A-Za-z0-9._-]*|course-loader\.mjs|PROVENANCE\.json|LICENSE\.md)$/.test(p),'Unsafe release path');
 const b=await readSafe(p);contents.set(p,b);
 assert(b.length<25*1024*1024,'Oversized release asset');
 files[p]={bytes:b.length,sha256:crypto.createHash('sha256').update(b).digest('hex')};
}
const release={schemaVersion:1,repository:'https://github.com/Sunwood-ai-labs/ashinoko-course-data',courseId:sums.courseId,packVersion:sums.packVersion,files};
const releaseBytes=Buffer.from(JSON.stringify(release,null,2)+'\n');
if(args.includes('--write')){try{await noLinks(root,'course-release.json');}catch(error){if(error.code!=='ENOENT')throw error;}await fs.writeFile(path.join(root,'course-release.json'),releaseBytes);}
else assert.deepEqual(await read('course-release.json'),release,'Release inventory drift; review changes before --write');
if(output){
 assert(output!==root&&!output.startsWith(root+path.sep),'Export must be outside the repository');
 let outputAncestor=path.parse(output).root;
 for(const part of output.slice(outputAncestor.length).split(path.sep)){outputAncestor=path.join(outputAncestor,part);try{assert(!(await fs.lstat(outputAncestor)).isSymbolicLink(),'Export destination symlink rejected');}catch(error){if(error.code!=='ENOENT')throw error;}}
 await fs.mkdir(output,{recursive:true});
 assert.equal((await fs.readdir(output)).length,0,'Export destination must be empty');
 contents.set('course-release.json',releaseBytes);
 for(const [p,bytes] of contents){const target=path.join(output,p);await fs.mkdir(path.dirname(target),{recursive:true});await fs.writeFile(target,bytes);}
}
console.log(JSON.stringify({courseId:release.courseId,packVersion:release.packVersion,releaseFiles:paths.length,bytes:Object.values(files).reduce((s,x)=>s+x.bytes,0),exported:!!output}));
