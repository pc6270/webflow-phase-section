(()=>{
const breakpoint=phaseMedia('(max-width:1199px)');
// The original module installs global handlers. Reinitialize only when crossing its breakpoint.
breakpoint.addEventListener('change',()=>location.reload());
phaseMedia('(min-width:768px)').addEventListener('change',()=>location.reload());
if(!breakpoint.matches)return;
const main=document.createElement('main');main.id='phase-mobile';
if(!phaseMedia('(min-width:768px)').matches)document.documentElement.classList.add('phase-phone-natural');
let phoneMetrics=null;
function measurePhone(){if(phaseMedia('(min-width:768px)').matches)return;const offset=scrollY,b=main.getBoundingClientRect();phoneMetrics={top:b.top+offset,bottom:b.bottom+offset,tops:controllers.map(c=>c.block.getBoundingClientRect().top+offset)}}
const nav=document.createElement('nav');nav.className='phone-nav';nav.id='phase-mobile-nav';nav.setAttribute('aria-label','階段導覽');
const assetRoot='https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/';
const ellipse=assetRoot+'6acc1380fae7d56f2395825c_deco_ellipse.svg';
const curve=assetRoot+'6acc13806db332cece419759_curve_figma.svg';
const left=assetRoot+'6acc1380ae8c81a49084de26_btn_left.svg',right=assetRoot+'6acc138031ce4c749af5c16e_btn_right.svg';
function esc(s){const node=document.createElement('span');node.textContent=s;return node.innerHTML}
const sideRail=document.createElement('span');sideRail.className='fixed-tablet-rail';sideRail.setAttribute('aria-hidden','true');main.append(sideRail);const sideRock=document.createElement('img');sideRock.className='fixed-tablet-rock';sideRock.alt='';main.append(sideRock);const controllers=[];
for(const [index,phase] of phases.entries()){
 const block=document.createElement('section');block.className='phase-block';block.id='phase-mobile-'+phase.number;
 block.innerHTML=`<section class="hero"><img class="curve" src="${curve}" alt=""><div class="hero-title"><div class="en">PHASE ${phase.number}</div><h1>${phase.name}</h1></div><blockquote>${phase.quote}</blockquote><div class="scene"><img class="original-hero" src="${phase.hero}" alt="${phase.name}"></div><a class="scroll" href="#intro-${phase.number}" aria-label="往下閱讀"><span class="wf-scroll-indicator"><span class="wf-scroll-arrow-box"><span class="wf-scroll-arrow-body"><span class="wf-scroll-arrow-line"></span><span class="wf-scroll-arrow-head"></span></span></span><span class="wf-scroll-label">scroll</span></span></a></section><section class="intro" id="intro-${phase.number}">${(phaseMedia('(min-width:768px)').matches&&index===0?[phase.intro[0]+phase.intro[1],...phase.intro.slice(2)]:phase.intro).map(p=>'<p>'+p+'</p>').join('')}</section><section class="card"><div class="ellipse-wrap"><img class="ellipse" src="${ellipse}" alt=""></div><div class="card-heading"><div><div class="en">PHASE ${phase.number}</div><h2>${phase.name}</h2></div><div class="counter"><span class="number"></span><span class="slash">/</span><small>${String(phase.pages.length).padStart(2,'0')}</small></div></div><blockquote></blockquote><div class="photo"><img alt=""><button class="prev css-card-button" aria-label="上一張"><img src="${left}" alt=""></button><button class="next css-card-button" aria-label="下一張"><img src="${right}" alt=""></button></div><h3></h3><p class="caption"></p></section>`;
 main.append(block);
 const dot=document.createElement('button');dot.className='phone-nav-dot';dot.setAttribute('aria-label','Phase '+phase.number+' '+phase.name);dot.onclick=()=>(block.querySelector('.stack-anchor')||block).scrollIntoView({behavior:'smooth'});nav.append(dot);
 const card=block.querySelector('.card');let current=0;
 const tablet=phaseMedia('(min-width:768px)').matches;
 if(!tablet){card.querySelector('.slash').textContent='/';const scroll=block.querySelector('.hero .scroll');if(scroll){card.id='card-mobile-'+phase.number;scroll.href='#'+card.id;block.querySelector('.intro').append(scroll)}}
 if(tablet){block.querySelectorAll('.hero>blockquote br,.intro p br').forEach(br=>br.replaceWith(document.createTextNode('')));const opening=document.createElement('div');opening.className='tablet-opening';block.prepend(opening);opening.append(block.querySelector('.hero'),block.querySelector('.intro'))}
 const railText=['DISCOVER','REFINE','ELEVATE','SHINE'][index];
 for(const host of [block.querySelector('.hero'),card]){const rail=document.createElement('span');rail.className='tablet-rail';rail.textContent='PHASE '+phase.number+'-'+railText;host.append(rail)}
 const rock=document.createElement('img');rock.className='tablet-rock';rock.src=assetRoot+['6acc13804b19aa9175fe8798_rock01.avif','6acc138038881bba415dfce1_rock02.avif','6acc1380cdd337debbb7b11a_rock03.avif','6acc1380252649e5ead3177d_rock04.avif'][index];rock.alt='';card.append(rock);
 const followups=document.createElement('div');followups.className='quote-followups';card.querySelector('blockquote').after(followups);
 let trackNodes=[],lastSentence=-1;
 if(tablet){const stage=document.createElement('div');stage.className='tablet-quote-stage';followups.append(stage);trackNodes=phase.queue.map(text=>{const row=document.createElement('div');row.className='tablet-quote-track';row.textContent=text;stage.append(row);return row})}
 function renderTabletQueue(){
  const page=phase.pages[current],target=page.sentenceIndex,reduced=phaseMedia('(prefers-reduced-motion:reduce)').matches;
  const initial=lastSentence<0;const word=page.highlightWord;
  if(initial||reduced)trackNodes.forEach(row=>row.style.transition='none');
  trackNodes.forEach((row,i)=>{
   row.className='tablet-quote-track '+(i===target?'is-active':i<target?'is-past':'is-upcoming');
   if(i===target){const text=phase.queue[i];row.innerHTML=esc(text).replace(esc(word),'<span class="highlight-span">'+esc(word)+'</span>')}
   else if(row.textContent!==phase.queue[i]||row.querySelector('.highlight-span'))row.textContent=phase.queue[i];
  });
  const finalHeight=row=>{const probe=row.cloneNode(true);Object.assign(probe.style,{transition:'none',transform:'none',opacity:'0',width:followups.clientWidth+'px'});row.parentElement.append(probe);const height=probe.scrollHeight;probe.remove();return height};
  let nextY=finalHeight(trackNodes[target])+33;
  trackNodes.forEach((row,i)=>{
   let y=0;if(i<target)y=(i-target)*60-30;
   if(i>target){y=nextY;nextY+=finalHeight(row)+12}
   row.style.transform=`translateY(${y}px) scale(${i<target?.85:1})`;
   row.style.opacity=i===target?'1':i<target?'0':'.75';
   row.setAttribute('aria-hidden',i<target?'true':'false');
  });
  if(initial||reduced){void followups.offsetHeight;trackNodes.forEach(row=>row.style.removeProperty('transition'))}
  lastSentence=target;
 }
 const english=document.createElement('div');english.className='card-cat-en';card.append(english);
 const peek=document.createElement('img');peek.className='next-preview';peek.alt='下一張預覽';card.querySelector('.photo').append(peek);
 if(tablet)card.append(card.querySelector('.counter'));
 function render(){const p=phase.pages[current];card.querySelector('.number').textContent=String(current+1).padStart(2,'0');const text=phase.queue[p.sentenceIndex],word=p.highlightWord;const parts=text.split(word);card.querySelector('blockquote').innerHTML='<span class="quote-current">'+(parts.length>1?parts.map(esc).join('<span class="highlight-span">'+esc(word)+'</span>'):esc(text))+'</span>';card.querySelector('h3').textContent=p.titleCn;card.querySelector('.caption').textContent=p.caption;const img=card.querySelector('.photo>img');img.src=p.img;img.alt=p.titleCn;english.textContent=p.titleEn;peek.src=phase.pages[(current+1)%phase.pages.length].img;if(tablet)renderTabletQueue();else followups.innerHTML=phase.queue.slice(p.sentenceIndex+1,p.sentenceIndex+3).map(t=>'<p>'+esc(t)+'</p>').join('')}
 function fit(){if(tablet){const availableLabelWidth=card.querySelector('.photo').clientWidth;const ruler=document.createElement('span');Object.assign(ruler.style,{position:'fixed',left:'-10000px',whiteSpace:'nowrap',visibility:'hidden'});main.append(ruler);let widest=0;for(const item of phase.pages){ruler.style.font='700 18px Noto Serif TC,serif';ruler.style.letterSpacing='.96px';ruler.textContent=item.titleCn;const cn=ruler.getBoundingClientRect().width;ruler.style.font='500 22px Bacasime Antique,serif';ruler.style.letterSpacing='1.28px';ruler.textContent=item.titleEn;widest=Math.max(widest,cn+ruler.getBoundingClientRect().width)}ruler.remove();const labelScale=Math.min(1,Math.max(0,(availableLabelWidth-24)/Math.max(1,widest)));card.style.setProperty('--tablet-label-cn',(18*labelScale)+'px');card.style.setProperty('--tablet-label-en',(22*labelScale)+'px');const photoWidth=card.querySelector('.photo').clientWidth;const stableHeight=parseFloat(main.style.getPropertyValue('--stable-view-height'))||innerHeight;card.style.setProperty('--tablet-photo-height',Math.min(photoWidth*438/581,Math.max(photoWidth*.62,stableHeight*.34))+'px')}const probe=card.cloneNode(true);probe.inert=true;probe.setAttribute('aria-hidden','true');Object.assign(probe.style,{position:'fixed',left:'-10000px',top:'0',visibility:'hidden',width:card.getBoundingClientRect().width+'px',minHeight:'0',margin:'0'});for(const [k,v] of Object.entries({'--photo-height':'160px','--caption-height':'0px','--quote-height':'74px','--title-height':'0px'}))probe.style.setProperty(k,v);main.append(probe);let captionHeight=0,quoteHeight=74,titleHeight=0;for(const p of phase.pages){probe.querySelector('.caption').textContent=p.caption;probe.querySelector('blockquote').innerHTML=esc(phase.queue[p.sentenceIndex]).replace(esc(p.highlightWord),'<span class="highlight-span">'+esc(p.highlightWord)+'</span>');probe.querySelector('h3').textContent=p.titleCn;captionHeight=Math.max(captionHeight,probe.querySelector('.caption').getBoundingClientRect().height);quoteHeight=Math.max(quoteHeight,probe.querySelector('blockquote').getBoundingClientRect().height);titleHeight=Math.max(titleHeight,probe.querySelector('h3').getBoundingClientRect().height)}const values={'--caption-height':captionHeight+'px','--quote-height':quoteHeight+'px','--title-height':titleHeight+'px'};for(const[k,v]of Object.entries(values))probe.style.setProperty(k,v);if(tablet){probe.style.setProperty('--tablet-photo-height','140px')}const base=probe.getBoundingClientRect().height;probe.remove();for(const[k,v]of Object.entries(values))card.style.setProperty(k,v);const header=parseFloat(getComputedStyle(main).getPropertyValue('--site-header-height'))||0;if(tablet){const available=(parseFloat(main.style.getPropertyValue('--stable-view-height'))||innerHeight)-header;const width=card.querySelector('.photo').clientWidth;card.style.setProperty('--tablet-photo-height',Math.max(140,Math.min(width*438/581,140+available-base))+'px')}card.style.setProperty('--photo-height',Math.max(160,Math.min(240,card.querySelector('.photo').clientWidth*3/4,160+main.querySelector('.hero').getBoundingClientRect().height-base))+'px')}
 let request=0;
 async function change(delta){
  const target=(current+delta+phase.pages.length)%phase.pages.length,version=++request;
  const preload=new Image();preload.src=phase.pages[target].img;
  try{await preload.decode()}catch{}
  if(version!==request)return;
  card.querySelectorAll('.photo>img').forEach(img=>img.getAnimations().forEach(animation=>animation.cancel()));
  card.querySelectorAll('.quote-outgoing,.photo-outgoing').forEach(n=>n.remove());
  const quoteChanged=phase.queue[phase.pages[current].sentenceIndex]!==phase.queue[phase.pages[target].sentenceIndex];
  const quote=card.querySelector('blockquote'),outgoingQuote=quote.querySelector('.quote-current').cloneNode(true);
  outgoingQuote.className='quote-outgoing';outgoingQuote.setAttribute('aria-hidden','true');
  const outgoingImage=card.querySelector('.photo>img').cloneNode(true);outgoingImage.className='photo-outgoing';outgoingImage.alt='';outgoingImage.setAttribute('aria-hidden','true');
  current=target;render();
  const reduced=phaseMedia('(prefers-reduced-motion:reduce)').matches;
  if(reduced)return;
  if(quoteChanged&&!tablet)quote.append(outgoingQuote);card.querySelector('.photo').append(outgoingImage);
  const timing={duration:180,easing:'ease-out'};
  if(quoteChanged&&!tablet){
   outgoingQuote.animate([{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(-24px)'}],timing).finished.finally(()=>outgoingQuote.remove());
   quote.querySelector('.quote-current').animate([{opacity:0,transform:'translateY(24px)'},{opacity:1,transform:'translateY(0)'}],timing);
  }
  if(tablet){
   const mainImage=card.querySelector('.photo>img'),mainRect=mainImage.getBoundingClientRect(),nextRect=peek.getBoundingClientRect();
   const direction=delta<0?-1:1,dx=nextRect.left-mainRect.left,dy=nextRect.top-mainRect.top;
   const scaleX=nextRect.width/mainRect.width,scaleY=nextRect.height/mainRect.height;
   const motion={duration:480,easing:'cubic-bezier(0.25,1,0.5,1)'};
   outgoingImage.style.transformOrigin='top left';mainImage.style.transformOrigin='top left';
   outgoingImage.animate([{opacity:1,transform:'translate(0,0) scale(1,1)'},{opacity:0,transform:`translate(${-direction*dx}px,${dy}px) scale(${scaleX},${scaleY})`}],motion).finished.then(()=>outgoingImage.remove(),()=>outgoingImage.remove());
   mainImage.animate([{opacity:0,transform:`translate(${direction*dx}px,${dy}px) scale(${scaleX},${scaleY})`},{opacity:1,transform:'translate(0,0) scale(1,1)'}],motion);
   peek.animate([{opacity:0,transform:'translateX(60px)'},{opacity:.49,transform:'translateX(0)'}],motion);
  }else{
   outgoingImage.animate([{opacity:1},{opacity:0}],{duration:280,easing:'ease-in-out'}).finished.then(()=>outgoingImage.remove(),()=>outgoingImage.remove());
   card.querySelector('.photo>img').animate([{opacity:0},{opacity:1}],{duration:280,easing:'ease-in-out'});
  }
 }
 card.querySelector('.prev').onclick=()=>change(-1);card.querySelector('.next').onclick=()=>change(1);
 let start;const photo=card.querySelector('.photo');photo.addEventListener('touchstart',e=>{start={x:e.touches[0].clientX,y:e.touches[0].clientY}},{passive:true});photo.addEventListener('touchend',e=>{if(!start)return;const dx=e.changedTouches[0].clientX-start.x,dy=e.changedTouches[0].clientY-start.y;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.5)change(dx<0?1:-1);start=null},{passive:true});
 controllers.push({block,dot,fit,refresh:()=>{if(tablet)renderTabletQueue()}});render();
}
if(phaseMedia('(min-width:768px)').matches)main.querySelectorAll('.tablet-opening,.card').forEach(panel=>{const anchor=document.createElement('div');anchor.className='stack-anchor';panel.before(anchor)});if(window.PSLayout.mode==='tablet')main.querySelectorAll('.hero>blockquote').forEach(q=>{q.innerHTML=q.innerHTML.replace(/<br\s*\/?>/gi,'');});const original=document.querySelector('#ps-root');original.after(main);document.body.append(nav);
function update(){if(phaseMedia('(min-width:768px)').matches){controllers.forEach(({block})=>{const quote=block.querySelector('.hero>blockquote');block.style.setProperty('--opening-content-offset',quote.getBoundingClientRect().height+'px')})}const viewportProbe=document.createElement('div');Object.assign(viewportProbe.style,{position:'fixed',height:'100svh',width:'0',visibility:'hidden'});document.body.append(viewportProbe);main.style.setProperty('--stable-view-height',viewportProbe.getBoundingClientRect().height);viewportProbe.remove();main.style.setProperty('--tablet-scale',Math.min(1.171,innerWidth/1024));const header=document.querySelector((document.querySelector('#ps-root')?.getAttribute('data-nav') || '').replace(/^0$/, '') || '[data-phase-header],.site-header,.w-nav,header');let occupied=0;if(header){const style=getComputedStyle(header),rect=header.getBoundingClientRect();if(['fixed','sticky'].includes(style.position))occupied=Math.max(0,rect.bottom)}main.style.setProperty('--site-header-height',occupied+'px');controllers.forEach(c=>{c.fit();c.refresh()});measurePhone()}
let selectedPhase=-1,lastNavVisible=null;
function active(){
 if(!phaseMedia('(min-width:768px)').matches&&phoneMetrics){
  const y=scrollY+(parseFloat(main.style.getPropertyValue('--stable-view-height'))||innerHeight)*.4;
  let selected=0;for(let i=1;i<phoneMetrics.tops.length;i++){if(phoneMetrics.tops[i]<=y)selected=i;else break}
  const visible=phoneMetrics.top<y&&phoneMetrics.bottom>y;
  if(visible!==lastNavVisible){nav.style.visibility=visible?'visible':'hidden';nav.inert=!visible;lastNavVisible=visible}
  if(selected!==selectedPhase){controllers.forEach((c,i)=>{c.dot.classList.toggle('is-active',i===selected);if(i===selected)c.dot.setAttribute('aria-current','step');else c.dot.removeAttribute('aria-current')});selectedPhase=selected}
  return;
 }
 const y=Math.max(0,innerHeight*.4);let selected=0;
 for(let i=0;i<controllers.length;i++){if((controllers[i].block.querySelector('.stack-anchor')||controllers[i].block).getBoundingClientRect().top<=y)selected=i;else break}
 const current=controllers[selected],bounds=main.getBoundingClientRect(),inRange=bounds.top<y&&bounds.bottom>y;
 const tabletMode=phaseMedia('(min-width:768px)').matches;
 document.documentElement.classList.toggle('phase-tablet-snap',tabletMode&&inRange);
 const headerHeight=parseFloat(main.style.getPropertyValue('--site-header-height'))||0;
 if(tabletMode)document.documentElement.style.setProperty('--phase-snap-header',headerHeight+'px');
 let railTop=0,showRock=false;
 if(tabletMode){const titleTop=current.block.querySelector('.hero-title .en').getBoundingClientRect().top;showRock=current.block.querySelector('.card').getBoundingClientRect().top<=headerHeight+103;railTop=showRock?headerHeight+163:Math.max(headerHeight+24,Math.min(headerHeight+103,titleTop))}
 if(inRange!==lastNavVisible){const visibility=inRange?'visible':'hidden';nav.style.visibility=visibility;nav.inert=!inRange;sideRail.style.visibility=visibility;sideRock.style.visibility=visibility;lastNavVisible=inRange}
 if(selected!==selectedPhase){controllers.forEach((c,i)=>{c.dot.classList.toggle('is-active',i===selected);if(i===selected)c.dot.setAttribute('aria-current','step');else c.dot.removeAttribute('aria-current')});if(tabletMode){sideRail.textContent='PHASE '+phases[selected].number+'-'+['DISCOVER','REFINE','ELEVATE','SHINE'][selected];const src=current.block.querySelector('.tablet-rock').src;if(sideRock.src!==src)sideRock.src=src}selectedPhase=selected}
 if(!tabletMode)return;
 const setProperty=(name,value)=>{if(main.style.getPropertyValue(name)!==value)main.style.setProperty(name,value)};
 setProperty('--tablet-rail-top',railTop+'px');
 const cardMode=showRock?'true':'false';if(main.dataset.tabletCard!==cardMode)main.dataset.tabletCard=cardMode;
 if(showRock)setProperty('--tablet-rock-top',(headerHeight+45)+'px');
}
let scrollFrame=0;
function scheduleActive(){if(scrollFrame)return;scrollFrame=requestAnimationFrame(()=>{scrollFrame=0;active()})}
let layoutWidth=innerWidth;
let resizeFrame=0;
addEventListener('scroll',scheduleActive,{passive:true});
addEventListener('resize',()=>{if(innerWidth===layoutWidth)return;layoutWidth=innerWidth;cancelAnimationFrame(resizeFrame);resizeFrame=requestAnimationFrame(update)});
addEventListener('orientationchange',()=>{cancelAnimationFrame(resizeFrame);resizeFrame=requestAnimationFrame(update)});
document.fonts.ready.then(update);update();active();
})();





















if(phaseMedia("(min-width:768px) and (max-width:1199px)").matches){
(()=>{const root=document.querySelector('#phase-mobile');document.documentElement.classList.add('phase-tablet-pager');function size(){const header=parseFloat(getComputedStyle(root).getPropertyValue('--site-header-height'))||0;document.documentElement.style.setProperty('--phase-pager-header',header+'px');for(const panel of root.querySelectorAll('.tablet-opening,.card'))panel.style.setProperty('--stack-top',Math.min(header,innerHeight-panel.getBoundingClientRect().height)+'px')}document.fonts.ready.then(()=>{size();const observer=new ResizeObserver(size);root.querySelectorAll('.tablet-opening,.card').forEach(p=>observer.observe(p))});addEventListener('resize',size);size()})();
/* Isolated gesture paging experiment. */
(()=>{
 const root=document.querySelector('#phase-mobile');if(!root)return;const pagingHeader=()=>{const original=document.querySelector('#ps-root');const selector=(original?.getAttribute('data-nav')||'').replace(/^0$/,'');const header=document.querySelector(selector||'[data-phase-header],.site-header,.w-nav,header');if(!header)return 0;return ['fixed','sticky'].includes(getComputedStyle(header).position)?Math.max(0,header.getBoundingClientRect().bottom):0};
 const anchors=[...root.querySelectorAll('.stack-anchor')],panels=[...root.querySelectorAll('.tablet-opening,.card')];
 const header=()=>pagingHeader();
 const positions=()=>anchors.map(a=>Math.round(a.getBoundingClientRect().top+scrollY-header()));
 const landscapePaging=()=>innerWidth>innerHeight;
 const nearest=()=>{const p=positions();if(!landscapePaging())return p.reduce((best,y,i)=>Math.abs(y-scrollY)<Math.abs(p[best]-scrollY)?i:best,0);const reading=p.findIndex((y,i)=>scrollY>=y-2&&scrollY<=y+Math.max(0,panels[i].offsetHeight-(innerHeight-header()))+2);return reading>=0?reading:p.reduce((best,y,i)=>Math.abs(y-scrollY)<Math.abs(p[best]-scrollY)?i:best,0)};
 let busy=false,wheelUsed=false,wheelSum=0,wheelTimer,gesture=null,pendingDirection=0;
 let lastWheelAt=0,lastMagnitude=0,lastDirection=0,gestureAt=0,trough=Infinity,rising=0;
 const reduced=phaseMedia('(prefers-reduced-motion:reduce)').matches;
 function go(index,offset=0){if(!landscapePaging()){const p=positions();if(index<0||index>=p.length)return;busy=true;window.scrollTo({top:p[index],behavior:reduced?'instant':'smooth'});const started=performance.now();function finish(){if((performance.now()-started>250&&Math.abs(scrollY-p[index])<2)||performance.now()-started>1600){busy=false;return}requestAnimationFrame(finish)}requestAnimationFrame(finish);return;}const p=positions();if(index<0||index>=p.length)return;busy=true;const started=performance.now(),from=scrollY,duration=reduced?0:320;function finish(){if(document.documentElement.classList.contains('snap-disabled')){busy=false;pendingDirection=0;return}const target=positions()[index]+offset,progress=duration?Math.min(1,(performance.now()-started)/duration):1;scrollTo({top:progress===1?target:from+(target-from)*(1-Math.pow(1-progress,3)),behavior:'instant'});if(progress===1){busy=false;if(pendingDirection){const d=pendingDirection;pendingDirection=0;step(d)}return}requestAnimationFrame(finish)}finish()}
 function inside(){const p=positions();return scrollY>=p[0]-2&&scrollY<=p.at(-1)+Math.max(0,panels.at(-1).offsetHeight-(innerHeight-header()))+2}
 function eligible(dir){if(document.documentElement.classList.contains('snap-disabled')||document.querySelector('.site-header.is-menu-open'))return false;if(inside())return true;const p=positions(),reach=innerHeight*.8,lastEnd=p.at(-1)+Math.max(0,panels.at(-1).offsetHeight-(innerHeight-header()));return dir<0&&scrollY>lastEnd&&scrollY<=lastEnd+reach}
 function step(dir){const p=positions(),i=nearest(),bottom=p[i]+Math.max(0,panels[i].offsetHeight-(innerHeight-header()));
 // A tall page is read to its edge before the next gesture changes pages.
 if(dir>0&&scrollY<bottom-2){if(!landscapePaging()){busy=true;scrollTo({top:bottom,behavior:reduced?'instant':'smooth'});setTimeout(()=>busy=false,700);}else go(i,bottom-p[i]);return true}
 if(dir<0&&scrollY>p[i]+2){go(i);return true}
 if(i+dir<0||i+dir>=p.length)return false;go(i+dir);return true}
 const interactive=t=>t.closest('button,a,input,select,textarea,[contenteditable="true"]');
 addEventListener('wheel',e=>{if(!landscapePaging()){if(e.ctrlKey||Math.abs(e.deltaX)>Math.abs(e.deltaY)||!eligible(Math.sign(e.deltaY)))return;clearTimeout(wheelTimer);wheelTimer=setTimeout(()=>{wheelUsed=false;wheelSum=0},240);if(busy||wheelUsed){e.preventDefault();return}wheelSum+=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?innerHeight:1);const dir=Math.sign(wheelSum);const i=nearest();if((i===0&&dir<0)||(i===panels.length-1&&dir>0&&scrollY>=positions()[i]+Math.max(0,panels[i].offsetHeight-(innerHeight-header()))-2))return;e.preventDefault();if(Math.abs(wheelSum)>=45){wheelUsed=step(dir);wheelSum=0};return;}const dir=Math.sign(e.deltaY);if(!dir||e.ctrlKey||Math.abs(e.deltaX)>Math.abs(e.deltaY)||!eligible(dir))return;const now=performance.now(),gap=now-lastWheelAt,magnitude=Math.abs(e.deltaY)*(e.deltaMode===1?16:e.deltaMode===2?innerHeight:1);rising=magnitude>lastMagnitude+1?rising+1:0;trough=Math.min(trough,magnitude);const renewed=wheelUsed&&now-gestureAt>160&&magnitude>=8&&magnitude-trough>=6&&((rising>=2&&magnitude>=trough*1.25)||(magnitude>=18&&magnitude>=lastMagnitude*1.8));const fresh=!lastWheelAt||gap>120||renewed||(dir!==lastDirection&&gap>70&&magnitude>=12);lastWheelAt=now;lastMagnitude=magnitude;lastDirection=dir;if(fresh){wheelUsed=false;wheelSum=0;gestureAt=now;trough=magnitude;rising=0}clearTimeout(wheelTimer);if(busy){if(fresh||wheelSum){wheelSum+=dir*magnitude;if(Math.abs(wheelSum)>=12){pendingDirection=dir;wheelSum=0}}wheelUsed=true;e.preventDefault();return}if(wheelUsed){e.preventDefault();return}const i=nearest(),p=positions();if((i===0&&dir<0&&scrollY<=p[0]+2)||(i===panels.length-1&&dir>0&&scrollY>=p[i]+Math.max(0,panels[i].offsetHeight-(innerHeight-header()))-2))return;e.preventDefault();wheelSum+=dir*magnitude;if(Math.abs(wheelSum)>=12){wheelUsed=step(dir);wheelSum=0}},{passive:false});
 addEventListener('touchstart',e=>{if(e.touches.length!==1||interactive(e.target)){gesture=null;return}gesture={x:e.touches[0].clientX,y:e.touches[0].clientY,used:false,vertical:null,locked:inside()||eligible(1)||eligible(-1)}},{passive:true});
 addEventListener('touchmove',e=>{if(!landscapePaging()){if(!gesture||e.touches.length!==1)return;const dx=e.touches[0].clientX-gesture.x,dy=gesture.y-e.touches[0].clientY;if(!gesture.locked&&eligible(Math.sign(dy)))gesture.locked=true;if(!gesture.locked||!eligible(Math.sign(dy)))return;const i=nearest(),p=positions(),end=p[i]+Math.max(0,panels[i].offsetHeight-(innerHeight-header()));const outward=(i===0&&dy<0)||(i===panels.length-1&&dy>0&&scrollY>=end-2);if(outward&&!gesture.used&&!busy)return;
 // Cancel from the first move, before Safari commits to native vertical inertia.
 if(e.cancelable)e.preventDefault();if(busy||gesture.used)return;if(gesture.vertical===null&&Math.max(Math.abs(dx),Math.abs(dy))>10)gesture.vertical=Math.abs(dy)>Math.abs(dx)*1.2;if(!gesture.vertical||Math.abs(dy)<55)return;gesture.used=true;step(Math.sign(dy));;return;}if(!gesture||e.touches.length!==1)return;const dx=e.touches[0].clientX-gesture.x,dy=gesture.y-e.touches[0].clientY;if(!gesture.locked&&eligible(Math.sign(dy)))gesture.locked=true;if(!gesture.locked||!eligible(Math.sign(dy)))return;const i=nearest(),p=positions(),end=p[i]+Math.max(0,panels[i].offsetHeight-(innerHeight-header()));const outward=(i===0&&dy<0)||(i===panels.length-1&&dy>0&&scrollY>=end-2);if(outward&&!gesture.used&&!busy)return;
 // Cancel from the first move, before Safari commits to native vertical inertia.
 if(gesture.used)return;if(gesture.vertical===null&&Math.max(Math.abs(dx),Math.abs(dy))>10)gesture.vertical=Math.abs(dy)>Math.abs(dx)*1.2;if(gesture.vertical===false)return;if(e.cancelable)e.preventDefault();if(!gesture.vertical||Math.abs(dy)<55)return;gesture.used=true;if(busy)pendingDirection=Math.sign(dy);else step(Math.sign(dy));},{passive:false});
 addEventListener('touchend',()=>gesture=null,{passive:true});addEventListener('touchcancel',()=>gesture=null,{passive:true});
 addEventListener('keydown',e=>{if(interactive(e.target))return;const dir=['ArrowDown','PageDown',' '].includes(e.key)?1:['ArrowUp','PageUp'].includes(e.key)?-1:0;if(!dir||!eligible(dir))return;if(busy||e.repeat){e.preventDefault();return}if(step(dir))e.preventDefault()});
 // Catch native momentum that began outside the component before a new touch can be captured.
 let previousScroll=scrollY;
 addEventListener('scroll',()=>{const now=scrollY,p=positions(),first=p[0],last=p.at(-1)+Math.max(0,panels.at(-1).offsetHeight-(innerHeight-header()));const enteringTop=previousScroll<first-2&&now>=first-2&&now>previousScroll;const enteringBottom=previousScroll>last+2&&now<=last+2&&now<previousScroll;previousScroll=now;if(busy||document.documentElement.classList.contains('snap-disabled')||(!enteringTop&&!enteringBottom))return;if(gesture){gesture.locked=true;gesture.used=true}wheelUsed=true;clearTimeout(wheelTimer);wheelTimer=setTimeout(()=>{wheelUsed=false;wheelSum=0},enteringTop?120:300);const index=enteringTop?0:panels.length-1;window.scrollTo({top:p[index],behavior:'instant'});previousScroll=p[index];if(!enteringTop)go(index);},{passive:true});

})();
(()=>{
 const root=document.querySelector('#phase-mobile');if(!root)return;const pagingHeader=()=>{const original=document.querySelector('#ps-root');const selector=(original?.getAttribute('data-nav')||'').replace(/^0$/,'');const header=document.querySelector(selector||'[data-phase-header],.site-header,.w-nav,header');if(!header)return 0;return ['fixed','sticky'].includes(getComputedStyle(header).position)?Math.max(0,header.getBoundingClientRect().bottom):0};
 const phases=[...root.querySelectorAll('.phase-block')],anchors=[...root.querySelectorAll('.stack-anchor')];
 const overlay=document.createElement('div');overlay.className='shared-chapter-overlay';overlay.innerHTML='<div class="hero-title"><div class="en"></div><h2></h2></div><div class="shared-quote-box"></div>';root.append(overlay);
 const title=overlay.querySelector('.hero-title'),box=overlay.querySelector('.shared-quote-box');
 let selected=-1,quoteText='',quoteHTML='',motion=[],frame=0;
 const quoteGeometry=new WeakMap();
 const pixel=value=>Math.round(value*(devicePixelRatio||1))/(devicePixelRatio||1);
 function geometryFor(opening){
  let value=quoteGeometry.get(opening);if(value)return value;
  const heading=opening.querySelector('.hero-title'),quote=opening.querySelector('blockquote');
  const r=heading.getBoundingClientRect(),p=opening.getBoundingClientRect(),q=quote.getBoundingClientRect();
  value={left:pixel(r.left),width:pixel(r.width),titleTop:pixel(r.top-p.top),quoteTop:pixel(q.top-r.top)};
  quoteGeometry.set(opening,value);return value;
 }
 function invalidateQuoteGeometry(){phases.forEach(phase=>quoteGeometry.delete(phase.querySelector('.tablet-opening')));schedule();}

 const reduced=phaseMedia('(prefers-reduced-motion:reduce)').matches;
 function update(){frame=0;const header=pagingHeader();
 const ys=anchors.map(a=>a.getBoundingClientRect().top+scrollY-header);let panel=0;for(let i=1;i<ys.length;i++){if(scrollY>=(ys[i-1]+ys[i])/2)panel=i;else break}
 const phase=phases[Math.floor(panel/2)],detail=panel%2===1;overlay.dataset.phase=String(Math.floor(panel/2));
 // Measure the reserved original heading; hidden elements still keep their layout.
 const opening=phase.querySelector('.tablet-opening'),heading=opening.querySelector('.hero-title'),geometry=geometryFor(opening);
 const heroQuote=opening.querySelector('blockquote');
 overlay.style.left=geometry.left+'px';overlay.style.width=geometry.width+'px';const entryTop=anchors[0].getBoundingClientRect().top;const lastPanel=phases.at(-1).querySelector('.card');const exitOffset=Math.min(0,lastPanel.getBoundingClientRect().top-header);const overlayTop=pixel(Math.max(header,entryTop)+geometry.titleTop+exitOffset);overlay.style.top=overlayTop+'px';const nav=document.querySelector('#phase-mobile-nav');if(nav)nav.style.translate='0 '+exitOffset+'px';root.querySelectorAll('.fixed-tablet-rail,.fixed-tablet-rock').forEach(el=>el.style.translate='0 '+exitOffset+'px');box.style.top=geometry.quoteTop+'px';
 const bounds=root.getBoundingClientRect();overlay.style.display=bounds.top<innerHeight&&bounds.bottom>header?'block':'none';
 if(selected!==Math.floor(panel/2)){title.querySelector('.en').textContent=heading.querySelector('.en').textContent;title.querySelector('h2').textContent=heading.querySelector('h1').textContent;selected=Math.floor(panel/2)}
 const source=detail?phase.querySelector('.card>blockquote'):heroQuote;
 const html=source.innerHTML,text=source.textContent.trim();
 if(text!==quoteText){motion.forEach(a=>a.cancel());motion=[];box.querySelectorAll('.is-leaving').forEach(el=>el.remove());const old=box.lastElementChild;
 if(old){old.classList.add('is-leaving');old.setAttribute('aria-hidden','true');old.style.position='absolute';old.style.top='0';old.style.width='100%';if(reduced)old.remove();else{const a=old.animate([{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(-20px)'}],{duration:420,easing:'cubic-bezier(.25,1,.5,1)',fill:'forwards'});a.onfinish=()=>old.remove();motion.push(a)}}
 const next=document.createElement('blockquote');next.className='shared-quote'+(detail?' is-detail':'');next.innerHTML=html;box.append(next);if(!reduced)motion.push(next.animate([{opacity:0,transform:'translateY(20px)'},{opacity:1,transform:'translateY(0)'}],{duration:480,easing:'cubic-bezier(.25,1,.5,1)',fill:'both'}));quoteText=text;quoteHTML=html;
 }else{const current=box.lastElementChild;if(current){current.classList.toggle('is-detail',detail);if(html!==quoteHTML){current.innerHTML=html;quoteHTML=html}}}
 }
 function schedule(){if(!frame)frame=requestAnimationFrame(update)}
 root.classList.add('shared-chapter');const observer=new MutationObserver(schedule);phases.forEach(p=>observer.observe(p.querySelector('.card>blockquote'),{subtree:true,childList:true,characterData:true}));addEventListener('scroll',schedule,{passive:true});addEventListener('resize',invalidateQuoteGeometry);document.fonts.ready.then(invalidateQuoteGeometry);
 const geometryObserver=new ResizeObserver(invalidateQuoteGeometry);phases.forEach(phase=>{const opening=phase.querySelector('.tablet-opening');geometryObserver.observe(opening.querySelector('.hero-title'));geometryObserver.observe(opening.querySelector('blockquote'));});schedule();
})();

}

/* Shared desktop/tablet chapter scroll cue. */
(()=>{
 function init(){
  if(document.getElementById('psScrollGuide'))return;
  const cue=document.createElement('div');cue.id='psScrollGuide';cue.hidden=true;cue.setAttribute('aria-hidden','true');
  cue.innerHTML='<span class="guide-arrow-box"><span class="guide-arrow"><i></i><b></b></span></span><span class="guide-label">scroll</span>';
  document.body.append(cue);
  const style=document.createElement('style');style.textContent=`
   #psScrollGuide{position:fixed;z-index:40;width:40px;height:62px;box-sizing:border-box;border:1px solid #675d54;border-radius:999px;color:#675d54;pointer-events:none;display:flex;align-items:center;flex-direction:column;}
   #psScrollGuide[hidden]{display:none!important;}
   #psScrollGuide .guide-arrow-box{position:relative;width:14px;height:20px;margin-top:10px;overflow:hidden;display:flex;justify-content:center;}
   #psScrollGuide .guide-arrow{position:absolute;top:0;width:8px;display:flex;flex-direction:column;align-items:center;animation:psGuideDown 3s cubic-bezier(.65,0,.35,1) infinite;}
   #psScrollGuide i{width:1.2px;height:10px;background:currentColor;}
   #psScrollGuide b{width:5px;height:5px;border-right:1.2px solid;border-bottom:1.2px solid;transform:rotate(45deg);margin-top:-4px;}
   #psScrollGuide .guide-label{position:absolute;bottom:16px;font:500 9.5px/1 'Noto Sans TC',sans-serif;letter-spacing:.05em;}
   #phase-mobile .hero>.scroll{display:none!important;}
   @keyframes psGuideDown{0%{transform:translateY(-16px);opacity:0}25%{opacity:1}70%{opacity:1;transform:translateY(4px)}100%{opacity:0;transform:translateY(4px)}}
   @media(max-width:767px),(min-width:1200px){#psScrollGuide{display:none!important;}}
   @media(min-width:1200px){
    #ps-root .has-progress-guide>.center-line-fill{transform:scaleY(1)!important;transition:none;clip-path:inset(0 0 calc(100% - var(--guide-start)) 0);}
    #ps-root .has-progress-guide::after{content:'';position:absolute;top:var(--guide-start);bottom:0;left:0;width:2px;background:#987a6b;transform-origin:top;animation:psLineGuideFill 3s linear infinite;}
   }
   @keyframes psLineGuideFill{0%{transform:scaleY(0);opacity:1}90%{transform:scaleY(1);opacity:1}100%{transform:scaleY(1);opacity:0}}
   @media(prefers-reduced-motion:reduce){#ps-root .has-progress-guide::after{animation:none;opacity:.6;}}
   @media(prefers-reduced-motion:reduce){#psScrollGuide .guide-arrow{animation:none;}}
  `;document.head.append(style);
  let pending=false,idleTimer=null,idle=false,touching=false;
  function movement(){idle=false;clearTimeout(idleTimer);cue.hidden=true;if(!touching)idleTimer=setTimeout(()=>{idle=true;schedule();},5000);schedule();}
  addEventListener('touchstart',()=>{touching=true;movement();},{passive:true});
  addEventListener('touchend',()=>{touching=false;movement();},{passive:true});
  addEventListener('touchcancel',()=>{touching=false;movement();},{passive:true});
  function update(){pending=false;
   const desktop=window.PSLayout.mode==='desktop', root=document.querySelector(desktop?'#ps-root':'#phase-mobile');
   if(window.PSLayout.mode==='desktop'){cue.hidden=true;root?.querySelectorAll('.center-connecting-line').forEach(line=>{
     const track=line.querySelector('.center-line-track'),diamond=line.querySelector('.center-line-diamond');if(!track||!diamond)return;
     const start=Math.max(0,diamond.getBoundingClientRect().top+diamond.getBoundingClientRect().height/2-track.getBoundingClientRect().top);
     track.style.setProperty('--guide-start',start+'px');track.classList.toggle('has-progress-guide',track.getBoundingClientRect().height>start+10);
    });return;}
   if(window.PSLayout.mode==='phone'||!root){cue.hidden=true;return;}
   const header=document.querySelector('[data-phase-header],.site-header,.w-nav,header');
   const measuredHeader=header&&['fixed','sticky'].includes(getComputedStyle(header).position)?Math.max(0,header.getBoundingClientRect().bottom):0;const head=desktop?(parseFloat(getComputedStyle(root).getPropertyValue('--ps-nav-h'))||measuredHeader):measuredHeader;
   const bounds=root.getBoundingClientRect();
   const panels=Array.from(root.querySelectorAll(desktop?'.canvas-frame':'.tablet-opening,.card'));
   if(!panels.length){cue.hidden=true;return;}
   const anchors=Array.from(root.querySelectorAll(desktop?'.snap-anchor':'.stack-anchor')).filter(a=>a.offsetParent!==null);
   if(!anchors.length){cue.hidden=true;return;}
   const anchor=anchors.reduce((best,a)=>Math.abs(a.getBoundingClientRect().top-head)<Math.abs(best.getBoundingClientRect().top-head)?a:best,anchors[0]);
   const index=anchors.indexOf(anchor),active=desktop?panels[Number(anchor.dataset.phase)-1]:panels[index];
   const fourth=desktop?active===panels[3]&&active.dataset.psState==='page':index===panels.length-1;
   const firstOpening=index===0&&Math.abs(anchor.getBoundingClientRect().top-head)<8;
   cue.hidden=bounds.top>head+2||bounds.bottom<=innerHeight-2||fourth||touching||(!firstOpening&&!idle);
   if(desktop){const text=active.querySelector('.desktop-story-text,.default-content-box');const controls=active.querySelector('.reel-nav-buttons');const r=text?.getBoundingClientRect();const c=controls?.getBoundingClientRect();cue.style.left=(r?.left||200)+'px';cue.style.top=Math.min(innerHeight-70,Math.max(head+10,(c?.bottom||innerHeight-90)+12))+'px';}
   else{cue.style.left=(bounds.left+bounds.width/2-20)+'px';cue.style.top=(innerHeight-86)+'px';}
  }
  function schedule(){if(!pending){pending=true;requestAnimationFrame(update);}}
  addEventListener('scroll',movement,{passive:true});addEventListener('resize',schedule,{passive:true});
  document.querySelectorAll('.canvas-frame').forEach(f=>{f.addEventListener('scroll',schedule,{passive:true});new MutationObserver(schedule).observe(f,{attributes:true,attributeFilter:['data-ps-state']});});
  document.fonts.ready.then(schedule);schedule();
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else requestAnimationFrame(init);
})();



/* ZIYANG_BANNER_COLOR_BRIDGE_V2_20261030 */
(()=>{
 function installBannerColorBridge(){
  if(window.PSLayout.mode==='phone'||document.getElementById('ps-banner-color-bridge-style'))return;
  const root=document.getElementById('ps-root'),section=root?.closest('section');
  let banner=section?.previousElementSibling;
  while(banner&&(getComputedStyle(banner).display==='none'||banner.classList.contains('phone-only')||banner.getBoundingClientRect().height<1))banner=banner.previousElementSibling;
  const opening=document.querySelector(window.PSLayout.mode==='desktop'?'#canvasFrame':'#phase-mobile-01 .tablet-opening');
  if(!banner||!opening)return;
  let color='#faf7f2',host=banner;
  while(host){const candidate=getComputedStyle(host).backgroundColor;if(candidate&&candidate!=='transparent'&&candidate!=='rgba(0, 0, 0, 0)'){color=candidate;break;}host=host.parentElement;}
  document.querySelectorAll('.ps-banner-transition,.ps-section-transition,.ps-color-bridge').forEach(e=>e.remove());
  const style=document.createElement('style');style.id='ps-banner-color-bridge-style';
  style.textContent='.ps-color-bridge{position:absolute;inset:0 0 auto;height:clamp(180px,28vh,320px);z-index:2;pointer-events:none;background:linear-gradient(to bottom,var(--ps-banner-start) 0%,transparent 100%)}#phase-mobile #phase-mobile-01 .tablet-opening::before{background:none!important}';document.head.append(style);
  const bridge=document.createElement('div');bridge.className='ps-color-bridge';bridge.setAttribute('aria-hidden','true');bridge.style.setProperty('--ps-banner-start',color);opening.prepend(bridge);
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',installBannerColorBridge,{once:true});else requestAnimationFrame(installBannerColorBridge);
})();

/* TABLET_FIRST_SECTION_REVEAL_90VH */
(()=>{
 if(!phaseMedia('(min-width:768px) and (max-width:1199px)').matches)return;
 const root=document.getElementById('phase-mobile');if(!root)return;
 const style=document.createElement('style');style.textContent=
 '#phase-mobile #phase-mobile-01 .tablet-opening{opacity:0;transition:opacity .6s ease-out}'+
 '#phase-mobile .shared-chapter-overlay[data-phase="0"]{opacity:0;transition:opacity .6s ease-out}'+
 '#phase-mobile.is-first-revealed #phase-mobile-01 .tablet-opening,#phase-mobile.is-first-revealed .shared-chapter-overlay[data-phase="0"]{opacity:1}'+
 '@media(prefers-reduced-motion:reduce){#phase-mobile #phase-mobile-01 .tablet-opening,#phase-mobile .shared-chapter-overlay[data-phase="0"]{transition:none}}';document.head.append(style);
 let queued=false,revealed=false;
 function check(){queued=false;if(revealed)return;if(root.getBoundingClientRect().top<=innerHeight*.9){revealed=true;root.classList.add('is-first-revealed');removeEventListener('scroll',schedule);removeEventListener('resize',schedule);}}
 function schedule(){if(!queued){queued=true;requestAnimationFrame(check);}}
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});schedule();
})();

(()=>{if(window.PSLayout.mode!=='phone')return;const root=document.getElementById('phase-mobile');if(!root)return;
const banner=document.querySelector('section.section-5:not(.phone-only)');let color='#faf7f2',host=banner;while(host){const bg=getComputedStyle(host).backgroundColor;if(bg&&bg!=='transparent'&&bg!=='rgba(0, 0, 0, 0)'){color=bg;break;}host=host.parentElement;}
root.querySelectorAll('.phase-block').forEach((block,index)=>{if(block.querySelector('.phone-wide-background'))return;const background=document.createElement('div');background.className='phone-wide-background';background.setAttribute('aria-hidden','true');background.innerHTML='<img src="https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc13806db332cece419759_curve_figma.svg" alt="">';if(index===0)background.style.setProperty('--phone-entry-color',color);block.prepend(background);});})();
