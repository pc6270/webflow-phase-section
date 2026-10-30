(()=>{const root=document.getElementById('ps-root');if(window.PSLayout.mode!=='desktop'||!root)return;
const frames=Array.from(root.querySelectorAll('.canvas-frame'));
// Tablet landscape uses the desktop composition with naturally wrapping quotes.
root.querySelectorAll('.desktop-story-tagline').forEach(q=>{q.innerHTML=q.innerHTML.replace(/<br\s*\/?>/gi,'');});
let pending=false;function update(){
 pending=false;
 const available=parseFloat(getComputedStyle(root).getPropertyValue('--ps-view-height'))||innerHeight;
 const first=frames[0],track=first?.parentElement,line=first?.querySelector('.center-connecting-line'),diamond=first?.querySelector('.center-line-diamond');
 // Read geometry before any writes. The later connectors use a stable height.
 const firstTop=first?Math.max(available,-track.getBoundingClientRect().top+first.getBoundingClientRect().top+(line?.offsetTop||0)+(diamond?.offsetTop||0)+6):available;
 frames.forEach((frame,i)=>{const t=frame.parentElement,top=i===0?firstTop:available,previous=parseFloat(t.style.getPropertyValue('--ps-continuation-top'));if(!Number.isFinite(previous)||Math.abs(previous-top)>.5)t.style.setProperty('--ps-continuation-top',top+'px');});
}
function schedule(){if(!pending){pending=true;requestAnimationFrame(update);}}addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});document.fonts.ready.then(schedule);schedule();})();