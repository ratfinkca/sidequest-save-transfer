import {makeSaveFile,readSaveFile,saveSummary,downloadSave} from './save-format.js';
const status=document.querySelector('#status'),button=document.querySelector('#download'),share=document.querySelector('#share'),list=document.querySelector('#saves');
let storage;
try{
 storage=window.localStorage;const text=makeSaveFile(storage),file=readSaveFile(text);
 for(const [edition,label] of [['smf','Festival edition'],['generic','Original edition']]){
  const summary=saveSummary(file,edition);if(!summary)continue;
  const row=document.createElement('li');row.textContent=`${label}: ${summary.name||'Raver'} · ${summary.xp.toLocaleString()} rave XP${summary.run?' · saved run included':''}`;list.append(row);
 }
 if(!list.children.length)throw Error('No saved character was found in this browser.');
 status.textContent='Found your saves. Ready to pack!';button.disabled=false;
 try{share.hidden=!navigator.canShare?.({files:[new File([text],'sidequest-save.json',{type:'application/json'})]});}catch{}
}catch{status.textContent='No readable save was found here. Try the same device and browser you played in. See the help below.';}
button.addEventListener('click',()=>{
 try{downloadSave(makeSaveFile(storage));status.textContent='Backup downloaded. Next, open the new game and restore the file in Settings.';}catch(error){status.textContent=error.message;}
});
share.addEventListener('click',async()=>{
 try{
  const file=new File([makeSaveFile(storage)],`sidequest-save-${new Date().toISOString().slice(0,10)}.json`,{type:'application/json'});
  await navigator.share({files:[file],title:'Side Quest save'});status.textContent='Keep that backup. Restore it from Settings inside the new game.';
 }catch(error){if(error.name!=='AbortError')status.textContent='Sharing is unavailable here. Try Download my saves instead.';}
});
