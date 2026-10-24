(()=>{
const breakpoint=matchMedia('(max-width:1199px)');
// The original module installs global handlers. Reinitialize only when crossing its breakpoint.
breakpoint.addEventListener('change',()=>location.reload());
matchMedia('(min-width:768px)').addEventListener('change',()=>location.reload());
if(!breakpoint.matches)return;
const main=document.createElement('main');main.id='phase-mobile';
const nav=document.createElement('nav');nav.className='phone-nav';nav.id='phase-mobile-nav';nav.setAttribute('aria-label','階段導覽');
const assetRoot='https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/';
const ellipse=assetRoot+'6acc1380fae7d56f2395825c_deco_ellipse.svg';
const curve=assetRoot+'6acc13806db332cece419759_curve_figma.svg';
const left=assetRoot+'6acc1380ae8c81a49084de26_btn_left.svg',right=assetRoot+'6acc138031ce4c749af5c16e_btn_right.svg';
function esc(s){const node=document.createElement('span');node.textContent=s;return node.innerHTML}
const sideRail=document.createElement('span');sideRail.className='fixed-tablet-rail';sideRail.setAttribute('aria-hidden','true');main.append(sideRail);const sideRock=document.createElement('img');sideRock.className='fixed-tablet-rock';sideRock.alt='';main.append(sideRock);const controllers=[];
for(const [index,phase] of phases.entries()){
 const block=document.createElement('section');block.className='phase-block';block.id='phase-mobile-'+phase.number;
 block.innerHTML=`<section class="hero"><img class="curve" src="${curve}" alt=""><div class="hero-title"><div class="en">PHASE ${phase.number}</div><h1>${phase.name}</h1></div><blockquote>${phase.quote}</blockquote><div class="scene"><img class="original-hero" src="${phase.hero}" alt="${phase.name}"></div><a class="scroll" href="#intro-${phase.number}" aria-label="往下閱讀"><span class="wf-scroll-indicator"><span class="wf-scroll-arrow-box"><span class="wf-scroll-arrow-body"><span class="wf-scroll-arrow-line"></span><span class="wf-scroll-arrow-head"></span></span></span><span class="wf-scroll-label">scroll</span></span></a></section><section class="intro" id="intro-${phase.number}">${(matchMedia('(min-width:768px)').matches&&index===0?[phase.intro[0]+phase.intro[1],...phase.intro.slice(2)]:phase.intro).map(p=>'<p>'+p+'</p>').join('')}</section><section class="card"><div class="ellipse-wrap"><img class="ellipse" src="${ellipse}" alt=""></div><div class="card-heading"><div><div class="en">PHASE ${phase.number}</div><h2>${phase.name}</h2></div><div class="counter"><span class="number"></span><span class="slash"> / </span><small>${String(phase.pages.length).padStart(2,'0')}</small></div></div><blockquote></blockquote><div class="photo"><img alt=""><button class="prev css-card-button" aria-label="上一張"><img src="${left}" alt=""></button><button class="next css-card-button" aria-label="下一張"><img src="${right}" alt=""></button></div><h3></h3><p class="caption"></p></section>`;
 main.append(block);
 const dot=document.createElement('button');dot.className='phone-nav-dot';dot.setAttribute('aria-label','Phase '+phase.number+' '+phase.name);dot.onclick=()=>block.scrollIntoView({behavior:'smooth'});nav.append(dot);
 const card=block.querySelector('.card');let current=0;
 const tablet=matchMedia('(min-width:768px)').matches;
 if(tablet){const opening=document.createElement('div');opening.className='tablet-opening';block.prepend(opening);opening.append(block.querySelector('.hero'),block.querySelector('.intro'))}
 const railText=['DISCOVER','REFINE','ELEVATE','SHINE'][index];
 for(const host of [block.querySelector('.hero'),card]){const rail=document.createElement('span');rail.className='tablet-rail';rail.textContent='PHASE '+phase.number+'-'+railText;host.append(rail)}
 const rock=document.createElement('img');rock.className='tablet-rock';rock.src=assetRoot+['6acc13804b19aa9175fe8798_rock01.avif','6acc138038881bba415dfce1_rock02.avif','6acc1380cdd337debbb7b11a_rock03.avif','6acc1380252649e5ead3177d_rock04.avif'][index];rock.alt='';card.append(rock);
 const followups=document.createElement('div');followups.className='quote-followups';card.querySelector('blockquote').after(followups);
 let trackNodes=[],lastSentence=-1;
 if(tablet){const stage=document.createElement('div');stage.className='tablet-quote-stage';followups.append(stage);trackNodes=phase.queue.map(text=>{const row=document.createElement('div');row.className='tablet-quote-track';row.textContent=text;stage.append(row);return row})}
 function renderTabletQueue(){
  const page=phase.pages[current],target=page.sentenceIndex,reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
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
  const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
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
const original=document.querySelector('#ps-root');original.after(main);document.body.append(nav);
function update(){if(matchMedia('(min-width:768px)').matches){controllers.forEach(({block})=>{const quote=block.querySelector('.hero>blockquote');block.style.setProperty('--opening-content-offset',quote.getBoundingClientRect().height+'px')})}const viewportProbe=document.createElement('div');Object.assign(viewportProbe.style,{position:'fixed',height:'100svh',width:'0',visibility:'hidden'});document.body.append(viewportProbe);main.style.setProperty('--stable-view-height',viewportProbe.getBoundingClientRect().height);viewportProbe.remove();main.style.setProperty('--tablet-scale',Math.min(1.171,innerWidth/1024));const header=document.querySelector((document.querySelector('#ps-root')?.getAttribute('data-nav') || '').replace(/^0$/, '') || '[data-phase-header],.site-header,.w-nav,header');let occupied=0;if(header){const style=getComputedStyle(header),rect=header.getBoundingClientRect();if(['fixed','sticky'].includes(style.position))occupied=Math.max(0,rect.bottom)}main.style.setProperty('--site-header-height',occupied+'px');controllers.forEach(c=>{c.fit();c.refresh()})}
function active(){const y=Math.max(0,innerHeight*.4);let current=controllers[0];for(const c of controllers)if(c.block.getBoundingClientRect().top<=y)current=c;sideRail.textContent='PHASE '+phases[controllers.indexOf(current)].number+'-'+['DISCOVER','REFINE','ELEVATE','SHINE'][controllers.indexOf(current)];const titleTop=current.block.querySelector('.hero-title .en').getBoundingClientRect().top;const headerHeight=parseFloat(main.style.getPropertyValue('--site-header-height'))||0;main.style.setProperty('--tablet-rail-top',Math.max(headerHeight+24,Math.min(headerHeight+103,titleTop))+'px');const showRock=current.block.querySelector('.card').getBoundingClientRect().top<=headerHeight+103;main.dataset.tabletCard=showRock?'true':'false';if(showRock){sideRock.src=current.block.querySelector('.tablet-rock').src;main.style.setProperty('--tablet-rail-top',(headerHeight+163)+'px');main.style.setProperty('--tablet-rock-top',(headerHeight+45)+'px')}const bounds=main.getBoundingClientRect(),inRange=bounds.top<innerHeight*.4&&bounds.bottom>innerHeight*.4;nav.style.visibility=inRange?'visible':'hidden';sideRail.style.visibility=inRange?'visible':'hidden';sideRock.style.visibility=inRange?'visible':'hidden';for(const c of controllers){c.dot.classList.toggle('is-active',c===current);if(c===current)c.dot.setAttribute('aria-current','step');else c.dot.removeAttribute('aria-current')}}
let layoutWidth=innerWidth;
let resizeFrame=0;
addEventListener('scroll',active,{passive:true});
addEventListener('resize',()=>{if(innerWidth===layoutWidth)return;layoutWidth=innerWidth;cancelAnimationFrame(resizeFrame);resizeFrame=requestAnimationFrame(update)});
addEventListener('orientationchange',()=>{cancelAnimationFrame(resizeFrame);resizeFrame=requestAnimationFrame(update)});
document.fonts.ready.then(update);update();active();
})();


















