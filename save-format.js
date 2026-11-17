// Shared with the standalone, same-origin rescue page. No network or game assets.
export const SAVE_FORMAT='sidequest-device-backup';
export const SAVE_LIMIT=6*1024*1024;
export const PROFILE_LIMIT=2*1024*1024;
export const SAVE_KEYS=Object.freeze(['sidequest.profile.v1','sidequest.smf.profile.v1','sidequest.generic.controls.v1','sidequest.smf.controls.v1','sidequest.best','sidequest.sound']);
export const PREVIOUS_SAVE_KEY='sidequest.save-transfer.previous.v1';
const bytes=s=>new TextEncoder().encode(s).length;
const object=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);

export function readSaveFile(text){
 if(typeof text!=='string'||bytes(text)>SAVE_LIMIT)throw Error('This file is too large to be a Side Quest save.');
 let file;try{file=JSON.parse(text);}catch{throw Error('This is not a readable save file.');}
 if(!object(file)||file.format!==SAVE_FORMAT||file.version!==1||!object(file.data)||Object.keys(file).some(k=>!['format','version','createdAt','data'].includes(k))||!Number.isFinite(file.createdAt)||file.createdAt<0)throw Error('Choose a Side Quest backup file (version 1).');
 if(!Object.keys(file.data).length||Object.keys(file.data).some(key=>!SAVE_KEYS.includes(key)||typeof file.data[key]!=='string'||bytes(file.data[key])>PROFILE_LIMIT))throw Error('This backup contains unsupported or oversized data.');
 return file;
}

export function makeSaveFile(storage,now=Date.now()){
 if(!storage)throw Error('Device storage is unavailable in this browser.');
 const data={};
 for(const key of SAVE_KEYS){
  const text=storage.getItem(key);if(text===null)continue;
  if(key.endsWith('profile.v1')){
   let profile;try{profile=JSON.parse(text);}catch{throw Error('A saved profile is unreadable. Your original save has not been changed.');}
   if(!object(profile)||profile.version!==1)throw Error('This profile uses an unsupported save version.');
   // Sharing is a fresh choice at the new address. Never transfer analytics IDs.
   profile.playtestConsent='unknown';delete profile.playtestIdentity;
   data[key]=JSON.stringify(profile);
  }else data[key]=text;
 }
 const text=JSON.stringify({format:SAVE_FORMAT,version:1,createdAt:now,data});readSaveFile(text);return text;
}

export function saveSummary(file,edition){
 const key=edition==='smf'?'sidequest.smf.profile.v1':'sidequest.profile.v1';
 if(!Object.hasOwn(file.data,key))return edition==='generic'&&Object.hasOwn(file.data,'sidequest.best')?{name:'Raver',xp:0,run:false,legacy:true}:null;
 try{const p=JSON.parse(file.data[key]);return {name:typeof p.playerName==='string'?p.playerName.slice(0,24):'Raver',xp:Number.isSafeInteger(p.progress?.xp)&&p.progress.xp>=0?p.progress.xp:0,run:!!(p.active||p.recovery)};}catch{return null;}
}

export function downloadSave(text,doc=document,name='sidequest-save'){
 const url=URL.createObjectURL(new Blob([text],{type:'application/json'}));
 const link=doc.createElement('a');link.href=url;link.download=`${name}-${new Date().toISOString().slice(0,10)}.json`;doc.body.append(link);link.click();link.remove();
 // Give Safari time to hand the file to Downloads / Files.
 setTimeout(()=>URL.revokeObjectURL(url),60000);
}
