(()=>{
const breakpoint=matchMedia('(max-width:767px)');
// The original module installs global handlers. Reinitialize only when crossing its breakpoint.
breakpoint.addEventListener('change',()=>location.reload());
if(!breakpoint.matches)return;
const main=document.createElement('main');main.id='phase-mobile';
const nav=document.createElement('nav');nav.className='phone-nav';nav.id='phase-mobile-nav';nav.setAttribute('aria-label','階段導覽');
const assetRoot='https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/';
const ellipse=assetRoot+'6acc1380fae7d56f2395825c_deco_ellipse.svg';
const curve=assetRoot+'6acc13806db332cece419759_curve_figma.svg';
const left=assetRoot+'6acc1380ae8c81a49084de26_btn_left.svg',right=assetRoot+'6acc138031ce4c749af5c16e_btn_right.svg';
function esc(s){const node=document.createElement('span');node.textContent=s;return node.innerHTML}
const controllers=[];
for(const [index,phase] of phases.entries()){
 const block=document.createElement('section');block.className='phase-block';block.id='phase-mobile-'+phase.number;
 block.innerHTML=`<section class="hero"><img class="curve" src="${curve}" alt=""><div class="hero-title"><div class="en">PHASE ${phase.number}</div><h1>${phase.name}</h1></div><blockquote>${phase.quote}</blockquote><div class="scene"><img class="original-hero" src="${phase.hero}" alt="${phase.name}"></div><a class="scroll" href="#intro-${phase.number}" aria-label="往下閱讀"><span class="wf-scroll-indicator"><span class="wf-scroll-arrow-box"><span class="wf-scroll-arrow-body"><span class="wf-scroll-arrow-line"></span><span class="wf-scroll-arrow-head"></span></span></span><span class="wf-scroll-label">scroll</span></span></a></section><section class="intro" id="intro-${phase.number}">${phase.intro.map(p=>'<p>'+p+'</p>').join('')}</section><section class="card"><div class="ellipse-wrap"><img class="ellipse" src="${ellipse}" alt=""></div><div class="card-heading"><div><div class="en">PHASE ${phase.number}</div><h2>${phase.name}</h2></div><div class="counter"><span class="number"></span><span class="slash">/</span><small>${String(phase.pages.length).padStart(2,'0')}</small></div></div><blockquote></blockquote><div class="photo"><img alt=""><button class="prev" aria-label="上一張"><img src="${left}" alt=""></button><button class="next" aria-label="下一張"><img src="${right}" alt=""></button></div><h3></h3><p class="caption"></p></section>`;
 main.append(block);
 const dot=document.createElement('button');dot.className='phone-nav-dot';dot.setAttribute('aria-label','Phase '+phase.number+' '+phase.name);dot.onclick=()=>block.scrollIntoView({behavior:'smooth'});nav.append(dot);
 const card=block.querySelector('.card');let current=0;
 function render(){const p=phase.pages[current];card.querySelector('.number').textContent=String(current+1).padStart(2,'0');const text=phase.queue[p.sentenceIndex],word=p.highlightWord;const parts=text.split(word);card.querySelector('blockquote').innerHTML='<span class="quote-current">'+(parts.length>1?parts.map(esc).join('<span class="highlight-span">'+esc(word)+'</span>'):esc(text))+'</span>';card.querySelector('h3').textContent=p.titleCn;card.querySelector('.caption').textContent=p.caption;const img=card.querySelector('.photo>img');img.src=p.img;img.alt=p.titleCn}
 function fit(){const probe=card.cloneNode(true);probe.inert=true;probe.setAttribute('aria-hidden','true');Object.assign(probe.style,{position:'fixed',left:'-10000px',top:'0',visibility:'hidden',width:card.getBoundingClientRect().width+'px',minHeight:'0',margin:'0'});for(const [k,v] of Object.entries({'--photo-height':'160px','--caption-height':'0px','--quote-height':'74px','--title-height':'0px'}))probe.style.setProperty(k,v);main.append(probe);let captionHeight=0,quoteHeight=74,titleHeight=0;for(const p of phase.pages){probe.querySelector('.caption').textContent=p.caption;probe.querySelector('blockquote').innerHTML=esc(phase.queue[p.sentenceIndex]).replace(esc(p.highlightWord),'<span class="highlight-span">'+esc(p.highlightWord)+'</span>');probe.querySelector('h3').textContent=p.titleCn;captionHeight=Math.max(captionHeight,probe.querySelector('.caption').getBoundingClientRect().height);quoteHeight=Math.max(quoteHeight,probe.querySelector('blockquote').getBoundingClientRect().height);titleHeight=Math.max(titleHeight,probe.querySelector('h3').getBoundingClientRect().height)}const values={'--caption-height':captionHeight+'px','--quote-height':quoteHeight+'px','--title-height':titleHeight+'px'};for(const[k,v]of Object.entries(values))probe.style.setProperty(k,v);const base=probe.getBoundingClientRect().height;probe.remove();for(const[k,v]of Object.entries(values))card.style.setProperty(k,v);const header=parseFloat(getComputedStyle(main).getPropertyValue('--site-header-height'))||0;card.style.setProperty('--photo-height',Math.max(160,Math.min(240,card.querySelector('.photo').clientWidth*3/4,160+innerHeight-header-base))+'px')}
 let request=0;
 async function change(delta){
  const target=(current+delta+phase.pages.length)%phase.pages.length,version=++request;
  const preload=new Image();preload.src=phase.pages[target].img;
  try{await preload.decode()}catch{}
  if(version!==request)return;
  card.querySelectorAll('.quote-outgoing,.photo-outgoing').forEach(n=>n.remove());
  const quoteChanged=phase.queue[phase.pages[current].sentenceIndex]!==phase.queue[phase.pages[target].sentenceIndex];
  const quote=card.querySelector('blockquote'),outgoingQuote=quote.querySelector('.quote-current').cloneNode(true);
  outgoingQuote.className='quote-outgoing';outgoingQuote.setAttribute('aria-hidden','true');
  const outgoingImage=card.querySelector('.photo>img').cloneNode(true);outgoingImage.className='photo-outgoing';outgoingImage.alt='';outgoingImage.setAttribute('aria-hidden','true');
  current=target;render();
  const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
  if(reduced)return;
  if(quoteChanged)quote.append(outgoingQuote);card.querySelector('.photo').append(outgoingImage);
  const timing={duration:180,easing:'ease-out'};
  if(quoteChanged){
   outgoingQuote.animate([{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(-24px)'}],timing).finished.finally(()=>outgoingQuote.remove());
   quote.querySelector('.quote-current').animate([{opacity:0,transform:'translateY(24px)'},{opacity:1,transform:'translateY(0)'}],timing);
  }
  outgoingImage.animate([{opacity:1},{opacity:0}],{duration:280,easing:'ease-in-out'}).finished.finally(()=>outgoingImage.remove());
  card.querySelector('.photo>img').animate([{opacity:0},{opacity:1}],{duration:280,easing:'ease-in-out'});
 }
 card.querySelector('.prev').onclick=()=>change(-1);card.querySelector('.next').onclick=()=>change(1);
 let start;const photo=card.querySelector('.photo');photo.addEventListener('touchstart',e=>{start={x:e.touches[0].clientX,y:e.touches[0].clientY}},{passive:true});photo.addEventListener('touchend',e=>{if(!start)return;const dx=e.changedTouches[0].clientX-start.x,dy=e.changedTouches[0].clientY-start.y;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.5)change(dx<0?1:-1);start=null},{passive:true});
 controllers.push({block,dot,fit});render();
}
const original=document.querySelector('#ps-root');original.after(main);document.body.append(nav);
function update(){const header=document.querySelector((document.querySelector('#ps-root')?.getAttribute('data-nav') || '').replace(/^0$/, '') || '[data-phase-header],.site-header,.w-nav,header');let occupied=0;if(header){const style=getComputedStyle(header),rect=header.getBoundingClientRect();if(['fixed','sticky'].includes(style.position))occupied=Math.max(0,rect.bottom)}main.style.setProperty('--site-header-height',occupied+'px');controllers.forEach(c=>c.fit())}
function active(){const y=Math.max(0,innerHeight*.4);let current=controllers[0];for(const c of controllers)if(c.block.getBoundingClientRect().top<=y)current=c;for(const c of controllers){c.dot.classList.toggle('is-active',c===current);if(c===current)c.dot.setAttribute('aria-current','step');else c.dot.removeAttribute('aria-current')}}
addEventListener('scroll',active,{passive:true});addEventListener('resize',update);document.fonts.ready.then(update);update();active();
})();




