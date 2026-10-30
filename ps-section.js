/* ==========================================================================
   Phase Section — Webflow 正式版核心邏輯
   100% 保持調校工作台的運作機制與真實資料
   ========================================================================== */
(function() {
  'use strict';
  const root = document.getElementById('ps-root');
  if (!root) return;
  if(window.PSLayout.mode!=='desktop')return;

  const ASSET_BASE = root.getAttribute('data-asset-base') || '';
  const ASSETS = {
    // ==========================================
    // A. 背景裝飾與輔助向量 (共 5 項，SVG 保持不變)
    // ==========================================
    "curve.svg": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc13806db332cece419759_curve_figma.svg",
    "deco_ellipse.svg": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc1380fae7d56f2395825c_deco_ellipse.svg",
    "brush.svg": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc13804f1bfe253bc8fcc7_brush.svg",
    "btn_left.svg": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc1380ae8c81a49084de26_btn_left.svg",
    "btn_right.svg": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc138031ce4c749af5c16e_btn_right.svg",

    // ==========================================
    // B. 各 Phase 首頁主圖與原石小圖 (共 10 項，已轉為 .avif)
    // ==========================================
    "phase01-img.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acfed1dfb028eb2bb522520_phase01-img.avif",
    "phase02-img.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acfed1d7e072b14c23c561e_phase02-img.avif",
    "phase03-img.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acfed1d838bc7acbce4c3e6_phase03-img.avif",
    "phase04-img.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acfed1dc4067cdc8365e206_phase04-img.avif",
    "rock01.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc13804b19aa9175fe8798_rock01.avif",
    "rock02.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc138038881bba415dfce1_rock02.avif",
    "rock03.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc1380cdd337debbb7b11a_rock03.avif",
    "rock04.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc1380252649e5ead3177d_rock04.avif",
    "rock.avif": "",
    "stone.avif": "",

    // ==========================================
    // C. Phase 01 卡片內容插圖 (8 張，已轉為 .avif)
    // ==========================================
    "card_01.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc7484c816eb85bbf2b89c_01_card.avif",
    "card_02.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc7484c950039fcd0894a8_02_card.avif",
    "card_03.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc7484ff2549290e893275_03_card.avif",
    "card_04.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc7484fae7d56f23aa9425_04_card.avif",
    "card_05.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc74846f0aa25f884ec608_05_card.avif",
    "card_06.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc74844b19aa917513c427_06_card.avif",
    "card_07.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc7484f50d04eab301ffe2_07_card.avif",
    "card_08.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc74830ebe54f4c04653d3_08_card.avif",

    // ==========================================
    // D. Phase 02 卡片內容插圖 (3 張，已轉為 .avif)
    // ==========================================
    "card_09.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc7483252649e5eae6d0cb_09_card.avif",
    "card_10.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc74840ebe54f4c04653f8_10_card.avif",
    "card_11.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc74841efce99d35cba2e8_11_card.avif",

    // ==========================================
    // E. Phase 03 卡片內容插圖 (4 張，已轉為 .avif)
    // ==========================================
    "card_12.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc74853715fdc430c60fab_12_card.avif",
    "card_13.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc74841a0f9d9c63514810_13_card.avif",
    "card_14.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc74845f514da625e6a77e_14_card.avif",
    "card_15.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc748454f9656736f45f9a_15_card.avif",

    // ==========================================
    // F. Phase 04 卡片內容插圖 (4 張，已轉為 .avif)
    // ==========================================
    "card_16.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc74831efce99d35cba2ca_16_card.avif",
    "card_17.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc74853715fdc430c60fc3_17_card.avif",
    "card_18.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc74855ed8eae53b67c3ea_18_card.avif",
    "card_19.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc748554f9656736f45fae_19_card.avif"
  };

  // 智慧資源定位器：支援 .avif / .webp / .png 交叉比對，無論填寫哪種副檔名皆可自動對應
  function asset(name) {
    if (!name) return '';
    // 1. 完全吻合
    if (ASSETS[name]) return ASSETS[name];
    // 2. 移除副檔名後進行跨格式 (avif -> webp -> png) 查找
    const baseName = name.replace(/\.(png|jpe?g|webp|avif)$/i, '');
    if (ASSETS[baseName + '.avif']) return ASSETS[baseName + '.avif'];
    if (ASSETS[baseName + '.webp']) return ASSETS[baseName + '.webp'];
    if (ASSETS[baseName + '.png']) return ASSETS[baseName + '.png'];
    // 3. Fallback
    return ASSET_BASE ? (ASSET_BASE + encodeURIComponent(name)) : name;
  }

  // 替換現有 DOM 中的圖片路徑
  function updateImageSources() {
    root.querySelectorAll('img').forEach(img => {
      const src = img.getAttribute('src');
      if (src && !src.startsWith('http://') && !src.startsWith('https://') && !src.startsWith('data:')) {
        img.src = asset(src);
      }
    });
  }

  // 讀取固定導覽列高度 (以全裝置 Header 高度變數 --header-h 優先進行版面高度計算)
  let navHeight = 110;
  let layoutReady = false;
  let layoutRaf = 0;
  const cardAnimationTimers = new Set();
  function queueCardAnimation(fn, delay) {
    const id = setTimeout(() => { cardAnimationTimers.delete(id); fn(); }, delay);
    cardAnimationTimers.add(id);
    return id;
  }
  function updateNavHeight() {
    const selector = root.getAttribute('data-nav');
    const el = selector && !/^\d+(\.\d+)?$/.test(selector) ? document.querySelector(selector) : null;
    // Use the website's shared header height where provided; a numeric data-nav
    // remains an explicit override (the standalone preview uses zero).
    const sharedHeader = getComputedStyle(root).getPropertyValue('--site-header-height').trim();
    if (selector && /^\d+(\.\d+)?$/.test(selector)) navHeight = Number(selector);
    else if(el&&el.getBoundingClientRect().height>0){navHeight=Math.max(0,['fixed','sticky'].includes(getComputedStyle(el).position)?el.getBoundingClientRect().bottom:el.getBoundingClientRect().height);}
    else if (sharedHeader) {
      const sharedProbe=document.createElement('div');
      sharedProbe.style.cssText='position:absolute;visibility:hidden;width:0;height:var(--site-header-height);pointer-events:none';
      root.appendChild(sharedProbe); navHeight=Math.max(0,sharedProbe.getBoundingClientRect().height); sharedProbe.remove();
    }
    else if (el) navHeight = Math.max(0, el.getBoundingClientRect().height);
    else {
      const probe = document.createElement('div');
      probe.style.cssText = 'position:absolute;visibility:hidden;width:0;height:var(--header-h,64px);pointer-events:none';
      root.appendChild(probe);
      navHeight = probe.getBoundingClientRect().height;
      probe.remove();
    }
    root.style.setProperty('--ps-nav-h', navHeight + 'px');
    document.documentElement.style.setProperty('--ps-nav-h', navHeight + 'px');
  }
  function updateResponsiveScale() {
    const wrapper = document.getElementById('canvasViewportWrapper');
    if (!wrapper) return;
    const frames = Array.from(root.querySelectorAll('.canvas-frame'));
    const reference = layoutReady ? frames.reduce((best,frame) => Math.abs(frame.getBoundingClientRect().top-navHeight)<Math.abs(best.getBoundingClientRect().top-navHeight)?frame:best,frames[0]) : null;
    const oldTop = reference ? reference.parentElement.getBoundingClientRect().top : 0;
    updateNavHeight();
    const width = Math.min(document.documentElement.clientWidth, root.getBoundingClientRect().width);
    const mobile = width <= 767 || (width <= 1024 && window.innerHeight <= 500) || (width <= 1024 && !CSS.supports('zoom','1'));
    const tablet = !mobile && width <= 1120;
    const scale = mobile || !tablet ? 1 : Math.min(1, width / 1024);
    wrapper.classList.toggle('viewport-mobile',mobile);
    wrapper.classList.toggle('viewport-tablet',tablet);
    // Existing component selectors also cover fixed navigation outside the wrapper.
    root.classList.toggle('viewport-mobile',mobile);
    root.classList.toggle('viewport-tablet',tablet);
    document.body.classList.remove('viewport-mobile','viewport-tablet');
    root.style.setProperty('--ps-scale',String(scale));
    // Desktop canvas follows the dynamic viewport, with a 760px minimum content height.
    let dvhProbe=root.querySelector('.ps-dvh-probe');
    if(!dvhProbe){dvhProbe=document.createElement('div');dvhProbe.className='ps-dvh-probe';dvhProbe.style.cssText='position:fixed;left:0;top:0;width:0;height:100vh;height:100dvh;visibility:hidden;pointer-events:none';root.append(dvhProbe);}
    const desktopHeight=Math.max(760,dvhProbe.getBoundingClientRect().height-navHeight);
    // Reduce the card continuously below the 1440px reference width.
    const desktopCardWidth=Math.min(521, 521*width/1440, Math.max(240,width/2-85));
    root.style.setProperty('--card-active-width',desktopCardWidth+'px');
    root.style.setProperty('--card-active-height',(desktopCardWidth*393/521)+'px');
    root.style.setProperty('--card-sub-x',(desktopCardWidth+55)+'px');
    root.style.setProperty('--ps-desktop-x-scale',String(width/1440));
    root.style.setProperty('--ps-desktop-y-scale',String(760/1048));
    const homeWidth=Math.min(660,width/2-64);
    root.style.setProperty('--ps-home-width',homeWidth+'px');
    root.style.setProperty('--ps-home-height',(homeWidth*530/580)+'px');
    root.style.setProperty('--ps-frame-height',(tablet?1366:desktopHeight)+'px');
    root.style.setProperty('--ps-sticky-top',(navHeight/scale)+'px');
    root.style.setProperty('--ps-view-height',Math.max(240,(window.visualViewport?.height||window.innerHeight)-navHeight)+'px');
    root.classList.toggle('desktop-short',window.PSLayout.mode==='desktop'&&desktopHeight>(window.visualViewport?.height||innerHeight)-navHeight+1);
    if(width>=1200&&!root.classList.contains('desktop-short'))frames.forEach(frame=>{frame.scrollTop=0;});
    root.style.setProperty('--ps-page-distance',(mobile?300:tablet?380:420)+'px');
    frames.forEach((frame,i)=>setHomeGeometry(frame,i+1));
    requestAnimationFrame(()=>frames.forEach(positionMobileControls));
    transitionOverlays.forEach(el=>el.remove());transitionOverlays.clear();
    root.classList.remove('ps-flow');
    document.documentElement.classList.remove('ps-snap');
    if (layoutReady) {
      cardAnimationTimers.forEach(clearTimeout);cardAnimationTimers.clear();
      isTransitioning=isTransitioning2=isTransitioning3=isTransitioning4=false;
      currentSentenceIndex=currentSentenceIndex2=currentSentenceIndex3=currentSentenceIndex4=null;
      const values=[currentState,currentPhase2State,currentPhase3State,currentPhase4State];
      [renderPage,renderPage2,renderPage3,renderPage4].forEach((render,i)=>{if(typeof values[i]==='number')render(values[i],values[i],0);});
      if(reference)window.scrollBy({top:reference.parentElement.getBoundingClientRect().top-oldTop,behavior:'instant'});
    }
    syncGlobalFixedComponentsPosition();
    refreshDesktopStories();
    updateCenterLineScroll();
    handleWindowScroll();
  }
  function scheduleResponsiveLayout() {
    cancelAnimationFrame(layoutRaf);
    layoutRaf=requestAnimationFrame(updateResponsiveScale);
  }


  // Figma scene bounds: desktop 933:4883, tablet 685:12850, mobile 685:14564.
  const HOME_SCENES={
    desktop:[{x:770.52,y:292,w:544.48,h:589.46,fh:1048},{x:783,y:287,w:564.18,h:566,fh:1108},{x:832,y:254,w:548,h:642,fh:1105},{x:745,y:232,w:548.96,h:575,fh:1115}],
    tablet:[{x:145,y:365,w:527,h:570},{x:222,y:321,w:580.18,h:582.05},{x:203,y:346,w:548,h:642},{x:93,y:297,w:548.96,h:575}],
    mobile:[{x:32,y:283.85,w:407.61,h:441.15},{x:-22,y:262,w:447.70,h:449.15},{x:-18,y:272,w:438,h:513.13},{x:-58,y:233,w:457.31,h:479}],
    intro:{x:120,y:233,w:239.4,h:259.1}
  };
  const transitionOverlays=new Set();
  function prepareStoryContent(){
    root.querySelectorAll('.default-quote').forEach(q=>{q.innerHTML=q.innerHTML.replace(/<br\s*\/?>/gi,'');});
    root.querySelectorAll('.default-paragraph br').forEach(br=>br.replaceWith(document.createTextNode('')));
    root.querySelectorAll('.default-content-box').forEach(box=>{
      if(box.querySelector('.default-paragraphs'))return;
      const copy=document.createElement('div');copy.className='default-paragraphs';
      Array.from(box.querySelectorAll('.default-paragraph')).forEach(p=>copy.appendChild(p));box.appendChild(copy);
    });
  }
  function setHomeGeometry(frame,phase){
    const width=root.getBoundingClientRect().width,scale=parseFloat(root.style.getPropertyValue('--ps-scale'))||1;
    const mobile=root.classList.contains('viewport-mobile'),tablet=root.classList.contains('viewport-tablet');
    const scene=HOME_SCENES.desktop[phase-1],tabletScene=HOME_SCENES.tablet[phase-1];
    // 100dvh is measured directly so image size follows the visible viewport.
    let dvhProbe=root.querySelector('.ps-dvh-probe');
    if(!dvhProbe){dvhProbe=document.createElement('div');dvhProbe.className='ps-dvh-probe';dvhProbe.style.cssText='position:fixed;left:0;top:0;width:0;height:100vh;height:100dvh;visibility:hidden;pointer-events:none';root.append(dvhProbe);}
    const availableHeight=Math.max(240,dvhProbe.getBoundingClientRect().height-navHeight);
    const originalWidth=Math.min(660*scene.w/544.48,width/2-64);
    const dw=mobile||tablet?originalWidth:originalWidth*.9*Math.min(1,Math.min(760,availableHeight)/1048),dh=dw*scene.h/scene.w;
    const baseHeight=mobile||tablet?(parseFloat(root.style.getPropertyValue('--ps-frame-height'))||1048):760;
    frame.style.setProperty('--ps-home-scene-width',dw+'px');frame.style.setProperty('--ps-home-scene-height',dh+'px');
    frame.style.setProperty('--ps-home-scene-x',(width*(scene.x+scene.w/2)/1440-dw/2)+'px');
    frame.style.setProperty('--ps-home-scene-y',(baseHeight*(scene.y+scene.h/2)/scene.fh-dh/2)+'px');
    frame.style.setProperty('--ps-tablet-home-x',tabletScene.x+'px');frame.style.setProperty('--ps-tablet-home-y',tabletScene.y+'px');
    frame.style.setProperty('--ps-tablet-home-width',tabletScene.w+'px');frame.style.setProperty('--ps-tablet-home-height',tabletScene.h+'px');
    frame.style.setProperty('--ps-tablet-copy-y',Math.max(967,tabletScene.y+tabletScene.h+24)+'px');
    if(mobile){
      const s=frame.dataset.psState==='intro'?HOME_SCENES.intro:HOME_SCENES.mobile[phase-1];
      const style=getComputedStyle(frame),left=parseFloat(style.paddingLeft),right=parseFloat(style.paddingRight);
      const landscape=width>=760&&window.innerHeight<=500;
      const column=landscape?(width-left-right-28)/2:width;
      let w=column*(s.w/402),h=w*s.h/s.w;
      if(landscape){const limit=Math.max(160,parseFloat(root.style.getPropertyValue('--ps-view-height'))-84);if(h>limit){w*=limit/h;h=limit;}}
      const targetCenter=(s.x+s.w/2)/402*column;
      const contentCenter=landscape?column/2:left+(width-left-right)/2;
      frame.style.setProperty('--ps-mobile-home-width',w+'px');frame.style.setProperty('--ps-mobile-home-height',h+'px');
      frame.style.setProperty('--ps-mobile-home-shift',(targetCenter-contentCenter)+'px');
      frame.style.setProperty('--ps-mobile-home-gap',Math.max(24,s.y-219)+'px');
    }
  }
  function calibrateDesktopFrame(frame){
    const story=frame.querySelector('.desktop-story-text');if(!story)return;
    const available=Math.max(240,innerHeight-navHeight),caption=frame.querySelector('.card-caption-desc'),rows=story.querySelectorAll('.sentence-track');
    const homeHeight=parseFloat(story.style.getPropertyValue('--ps-story-home-height'))||487;
    const key=[innerWidth,available,homeHeight,caption?.offsetHeight,frame.querySelector('.cards-stack-container')?.offsetHeight].join(':');
    if(frame.dataset.composeKey===key)return;frame.dataset.composeKey=key;
    const rect=frame.getBoundingClientRect(),offset=Number(frame.dataset.outerReadOffset)||0;
    const title=frame.querySelector('.section-title-box'),top=title.getBoundingClientRect().top-rect.top+offset;
    const visual=frame.querySelector('.default-visual-box'),cards=frame.querySelector('.cards-stack-container');
    const number=frame.querySelector('.reel-page-indicator'),controls=frame.querySelector('.reel-nav-buttons');
    // Use stable layout dimensions, never positions inside an active animation.
    // Both parts share one centered envelope, including the lower controls.
    const quoteHeight=Math.max(120,frame.querySelector('.sentence-track.is-active')?.offsetHeight||0);
    const controlHeight=(number?.offsetHeight||100)+7.5+(controls?.offsetHeight||50)+28;
    const bottom=Math.max(story.offsetTop+homeHeight,visual.offsetTop+visual.offsetHeight,
      cards.offsetTop+cards.offsetHeight+22+Math.max(96,caption?.offsetHeight||0),story.offsetTop+quoteHeight+controlHeight);
    if(controls)controls.style.setProperty('top',(bottom-(controls.offsetHeight||50))+'px','important');
    if(number)number.style.setProperty('top',(bottom-(controls?.offsetHeight||50)-7.5-number.offsetHeight)+'px','important');
    const span=bottom-title.offsetTop,desired=Math.max(24,(available-span)/2);
    const saved=parseFloat(frame.style.getPropertyValue('--ps-compose-y'));
    const rendered=parseFloat(getComputedStyle(title).translate.split(/\s+/).at(-1));
    const current=Number.isFinite(saved)?saved:(Number.isFinite(rendered)?rendered+offset:-66);
    frame.style.setProperty('--ps-compose-y',(Math.round((current+desired-top)*2)/2)+'px');
  }
  function updateShortDesktopFrame(frame){
    calibrateDesktopFrame(frame);
    if(innerWidth<1200)return;
    const available=Math.max(240,innerHeight-navHeight),rect=frame.getBoundingClientRect(),offset=Number(frame.dataset.outerReadOffset)||0;
    const bottom=el=>el&&el.getClientRects().length?el.getBoundingClientRect().bottom-rect.top+offset:0;
    const page=frame.dataset.psState==='page';
    if(!page){const rows=frame.querySelectorAll('.desktop-story-text .sentence-track');frame.dataset.homeExtent=String(Math.max(available,bottom(rows[rows.length-1])+32,bottom(frame.querySelector('.default-visual-box'))+24));}
    else{frame.dataset.pageExtent=String(Math.max(available,bottom(frame.querySelector('.card-caption-desc'))+32,bottom(frame.querySelector('.reel-nav-buttons'))+24));}
    const home=Math.max(available,Number(frame.dataset.homeExtent)||available),detail=Math.max(available,Number(frame.dataset.pageExtent)||available);
    frame.style.setProperty('--ps-short-content-height',Math.ceil(page?detail:home)+'px');frame.style.setProperty('--ps-short-number-height',(frame.querySelector('.reel-page-indicator')?.offsetHeight||100)+'px');
    frame.style.setProperty('--ps-short-quote-height',Math.max(160,(frame.querySelector('.sentence-track.is-active')?.offsetHeight||120)+64)+'px');
    const track=frame.parentElement,homeTravel=Math.max(0,home-available),pageTravel=Math.max(0,detail-available);
    track.dataset.homeReadTravel=String(homeTravel);track.dataset.pageReadTravel=String(pageTravel);
    track.style.setProperty('height',(available+homeTravel+420+pageTravel)+'px','important');
    const anchor=track.querySelector('.snap-anchor-page');if(anchor)anchor.style.setProperty('top',(homeTravel+420)+'px','important');
  }
  function outerReadingAnchor(){
    const anchors=getAnchors().filter(a=>root.contains(a)&&a.dataset.kind!=='intro');
    for(const a of anchors){const start=anchorScrollTop(a),travel=Number(a.parentElement.dataset[a.dataset.kind==='page'?'pageReadTravel':'homeReadTravel'])||0;if(travel>0&&scrollY>=start-2&&scrollY<=start+travel+2)return a;}return null;
  }
  function canReadDesktopFrame(frame,direction){
    const a=outerReadingAnchor();if(a){const start=anchorScrollTop(a),travel=Number(a.parentElement.dataset[a.dataset.kind==='page'?'pageReadTravel':'homeReadTravel'])||0;return direction>0?scrollY<start+travel-2:scrollY>start+2;}
    if(direction<0){const a=getNearestAnchor();if(a){const travel=Number(a.parentElement.dataset[a.dataset.kind==='page'?'pageReadTravel':'homeReadTravel'])||0;return travel>0&&scrollY>anchorScrollTop(a)+2&&scrollY<=anchorScrollTop(a)+travel+2;}}return false;
  }
  function syncOuterReading(){
    root.querySelectorAll('.canvas-frame').forEach(frame=>{const track=frame.parentElement,phase=Number(track.querySelector('.snap-anchor').dataset.phase),page=frame.dataset.psState==='page',anchor=getAnchor(phase,page?'page':'default'),travel=Number(track.dataset[page?'pageReadTravel':'homeReadTravel'])||0;const offset=Math.min(travel,Math.max(0,scrollY-anchorScrollTop(anchor)));frame.dataset.outerReadOffset=String(offset);frame.style.setProperty('--ps-read-offset',offset+'px');});
  }
  function setupOuterReading(){
    let pending=false;function schedule(){if(!pending){pending=true;requestAnimationFrame(()=>{pending=false;syncOuterReading();});}}
    addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});
    const observer=new MutationObserver(()=>{root.querySelectorAll('.canvas-frame').forEach(updateShortDesktopFrame);schedule();});root.querySelectorAll('.canvas-frame').forEach(f=>observer.observe(f,{attributes:true,attributeFilter:['data-ps-state']}));schedule();
  }
  function positionMobileControls(frame){
    if(window.innerWidth>=1200){const number=frame.querySelector('.reel-page-indicator');if(number)frame.style.setProperty('--ps-desktop-number-height',number.offsetHeight+'px');}
    updateShortDesktopFrame(frame);
    if(root.classList.contains('viewport-tablet')&&frame.dataset.psState==='page'){const nav=frame.querySelector('.reel-nav-buttons'),number=frame.querySelector('.reel-page-indicator');const scale=parseFloat(root.style.getPropertyValue('--ps-scale'))||1;frame.style.setProperty('--ps-tablet-number-y',(nav.offsetTop-number.offsetHeight-15/scale)+'px');}
    if(!root.classList.contains('viewport-mobile')||frame.dataset.psState!=='page')return;
    const card=frame.querySelector('.cards-stack-container'),caption=frame.querySelector('.card-caption-desc');
    const f=frame.getBoundingClientRect(),c=card.getBoundingClientRect(),d=caption.getBoundingClientRect();
    frame.style.setProperty('--ps-mobile-controls-x',(c.left-f.left-22)+'px');
    frame.style.setProperty('--ps-mobile-controls-y',(c.top-f.top+frame.scrollTop+c.height/2-22)+'px');
    frame.style.setProperty('--ps-mobile-controls-width',(c.width+44)+'px');
    frame.style.setProperty('--ps-mobile-number-y',Math.max(frame.clientHeight-76,d.bottom-f.top+frame.scrollTop+24)+'px');
  }
  function animateLeavingQuote(track){
    const clone=track.cloneNode(true);clone.removeAttribute('id');clone.className='ps-quote-exit';
    const style=getComputedStyle(track);clone.style.cssText='position:absolute;top:0;left:0;width:100%;pointer-events:none;margin:0;z-index:12;';
    for(const key of ['fontFamily','fontSize','fontWeight','lineHeight','letterSpacing','color'])clone.style[key]=style[key];
    track.parentElement.appendChild(clone);clone.animate([{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(-24px)'}],{duration:180,easing:'ease-out'}).finished.then(()=>clone.remove()).catch(()=>clone.remove());
  }

  function desktopStoryData(phase){return [phase01Queue,phase02Queue,phase03Queue,phase04Queue][phase-1];}
  function stopDesktopStory(story){
    story.revision++;
    story.animations.forEach(a=>a.cancel());story.animations=[];
  }
  function setupDesktopStorySurfaces(){
    if(innerWidth<1200)return;
    root.querySelectorAll('.canvas-frame').forEach((frame,index)=>{
      if(frame._desktopStory)return;
      const stage=frame.querySelector('.main-text-stage');
      const rows=Array.from(stage.querySelectorAll('.sentence-track'));
      if(!rows.length)return;
      const tagline=frame.querySelector('.default-quote');
      const copy=frame.querySelector('.default-paragraphs');
      const line=frame.querySelector('.reel-line-note');
      const home=frame.querySelector('.default-content-box');
      const surface=document.createElement('div');surface.className='desktop-story-text';
      tagline.classList.add('desktop-story-tagline');
      surface.append(tagline,stage,line);frame.append(surface);
      const normalize=text=>text.replace(/[\s，。；、：！？,.;:!?—「」『』]/g,'');
      const paragraphs=Array.from(copy.querySelectorAll('.default-paragraph')).map(p=>normalize(p.textContent));
      const queue=desktopStoryData(index+1);
      const groups=queue.map(text=>paragraphs.findIndex(p=>p.includes(normalize(text))));
      frame._desktopStory={surface,stage,rows,tagline,line,copy,home,groups,animations:[],revision:0,before:null};
      frame.classList.add('has-shared-story');
      frame.addEventListener('scroll',()=>{if(innerWidth>=1200&&frame.scrollLeft)frame.scrollLeft=0;},{passive:true});
      surface.addEventListener('click',()=>{if(frame.dataset.psState!=='page'&&getSelection()?.isCollapsed!==false)advanceHomeStory(index+1);});
      renderDesktopStory(frame,index+1,phaseState(index+1),phaseState(index+1),false);
    });
  }
  function captureDesktopStory(frame){
    const story=frame._desktopStory;if(!story||innerWidth<1200)return;
    const read=row=>{const rect=row.getBoundingClientRect(),style=getComputedStyle(row);return {x:rect.left,y:rect.top,fontSize:style.fontSize,fontWeight:style.fontWeight,letterSpacing:style.letterSpacing,paddingLeft:style.paddingLeft,opacity:style.opacity};};
    story.before={rows:story.rows.map(read),lineHeight:getComputedStyle(story.line).height,tagline:read(story.tagline),scrollTop:frame.scrollTop};
    stopDesktopStory(story);
  }
  function renderDesktopStory(frame,phase,state,previous,animate){
    const story=frame._desktopStory;if(!story||innerWidth<1200)return;
    const before=story.before;story.before=null;
    stopDesktopStory(story);const revision=story.revision;
    const page=typeof state==='number';
    story.surface.dataset.kind=page?'page':'home';
    story.tagline.setAttribute('aria-hidden',page?'true':'false');
    frame.scrollLeft=0;
    story.rows.forEach(row=>{row.style.transition='none';});
    story.line.style.transition='none';
    if(!page){
      const queue=desktopStoryData(phase);
      const homeGap=Math.min((parseFloat(getComputedStyle(story.copy).marginTop)||174)-4,Math.max(240,innerHeight-navHeight)*.18);
      let y=Math.max(story.tagline.offsetHeight+32,homeGap);
      story.rows.forEach((row,index)=>{
        if(index&&story.groups[index]!==story.groups[index-1])y+=28;
        row.className='sentence-track is-story-body';row.textContent=queue[index];
        row.style.transform='translateY('+y+'px)';row.style.opacity='1';
        row.removeAttribute('aria-hidden');
        y+=row.offsetHeight;
      });
      story.surface.style.setProperty('--ps-story-home-height',Math.ceil(y)+'px');
      story.line.style.height=(story.tagline.offsetHeight+10)+'px';
    }else{
      const active=story.rows.find(row=>row.classList.contains('is-active'));
      if(active){active.dataset.storyFinalHeight=String(active.offsetHeight);story.line.style.height=(active.offsetHeight+10)+'px';}
      story.rows.forEach(row=>row.setAttribute('aria-hidden',row.classList.contains('is-past')?'true':'false'));
    }
    const canAnimate=animate&&before&&!matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(canAnimate){
      const entering=page&&typeof previous!=='number';
      const leaving=!page&&typeof previous==='number';
      const duration=(entering||leaving)?1000*2/3:280;
      const delay=0;
      const easing='cubic-bezier(.25,1,.5,1)';
      story.rows.forEach((row,index)=>{
        const old=before.rows[index];if(!old)return;
        const rect=row.getBoundingClientRect(),style=getComputedStyle(row);
        const finalTransform=style.transform==='none'?'translateY(0)':style.transform;
        const dx=old.x-rect.left,dy=old.y-rect.top;
        const animation=row.animate([
          {transform:'translate('+dx+'px,'+dy+'px) '+finalTransform,fontSize:old.fontSize,fontWeight:old.fontWeight,letterSpacing:old.letterSpacing,paddingLeft:old.paddingLeft,opacity:old.opacity},
          {transform:finalTransform,fontSize:style.fontSize,fontWeight:style.fontWeight,letterSpacing:style.letterSpacing,paddingLeft:style.paddingLeft,opacity:style.opacity}
        ],{duration,delay,easing,fill:'backwards'});
        story.animations.push(animation);
      });
      if(entering||leaving)story.animations.push(story.tagline.animate(
        entering?[{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(-18px)'}]:[{opacity:0,transform:'translateY(-18px)'},{opacity:1,transform:'translateY(0)'}],
        {duration,easing,fill:'backwards'}));
      story.animations.push(story.line.animate([{height:before.lineHeight},{height:story.line.style.height}],{duration,delay,easing,fill:'backwards'}));
      Promise.allSettled(story.animations.map(a=>a.finished)).then(()=>{
        if(story.revision!==revision)return;
        story.animations=[];
        story.rows.forEach(row=>{row.style.transition='none';});
        positionMobileControls(frame);
      });
    }
  }
  function refreshDesktopStories(){
    if(innerWidth<1200)return;
    setupDesktopStorySurfaces();
    root.querySelectorAll('.canvas-frame').forEach((frame,index)=>{
      if(frame._desktopStory){frame._desktopStory.before=null;renderDesktopStory(frame,index+1,phaseState(index+1),phaseState(index+1),false);}
    });
  }

  function phaseState(phase){return [currentState,currentPhase2State,currentPhase3State,currentPhase4State][phase-1];}
  function viewKind(state){return typeof state==='number'?'page':state==='default'?'default':'intro';}
  function captureStoryTransition(frame,state,previous){
    captureDesktopStory(frame);
    if(!layoutReady||viewKind(state)===viewKind(previous)||matchMedia('(prefers-reduced-motion: reduce)').matches)return [];
    const mobile=root.classList.contains('viewport-mobile');
    const readingChange=viewKind(previous)!=='page'&&viewKind(state)!=='page';
    const names=viewKind(previous)==='page'?['.page-content-box','.cards-stack-container','.card-caption-desc']:mobile?(readingChange?['.default-visual-box','.default-paragraphs']:['.default-quote','.default-visual-box','.default-paragraphs']):['.default-content-box','.default-visual-box'];
    const snapshotNames=frame._desktopStory?names.filter(name=>name!=='.default-content-box'&&name!=='.page-content-box'):names;
    return snapshotNames.map(selector=>{const el=frame.querySelector(selector);if(!el||getComputedStyle(el).display==='none')return null;const rect=el.getBoundingClientRect();if(!rect.width||!rect.height)return null;
      const clone=el.cloneNode(true);clone.removeAttribute('id');clone.querySelectorAll('[id]').forEach(n=>n.removeAttribute('id'));clone.classList.remove('is-hidden');clone.setAttribute('aria-hidden','true');
      const values={position:'fixed',left:rect.left+'px',top:rect.top+'px',width:rect.width+'px',height:rect.height+'px',margin:'0',padding:selector==='.default-quote'?getComputedStyle(el).padding:'0',zIndex:'35',pointerEvents:'none',visibility:'visible',display:'block',opacity:'1',transformOrigin:'top left'};
      Object.entries(values).forEach(([k,v])=>clone.style.setProperty(k.replace(/[A-Z]/g,m=>'-'+m.toLowerCase()),v,'important'));
      const scale=parseFloat(root.style.getPropertyValue('--ps-scale'))||1;
      const outer=document.createElement('div');outer.className='ps-story-snapshot';outer.inert=true;outer.setAttribute('aria-hidden','true');
      Object.entries(values).forEach(([k,v])=>outer.style.setProperty(k.replace(/[A-Z]/g,m=>'-'+m.toLowerCase()),v,'important'));
      outer.style.setProperty('padding','0','important');
      clone.style.setProperty('position','absolute','important');clone.style.setProperty('left','0','important');clone.style.setProperty('top','0','important');
      clone.style.setProperty('width',(rect.width/scale)+'px','important');clone.style.setProperty('height',(rect.height/scale)+'px','important');
      clone.style.setProperty('transform','scale('+scale+')','important');
      outer.appendChild(clone);root.appendChild(outer);transitionOverlays.add(outer);return{selector,clone:outer,rect};
    }).filter(Boolean);
  }
  function finishStoryTransition(frame,phase,state,previous,snapshots){
    setHomeGeometry(frame,phase);
    renderDesktopStory(frame,phase,state,previous,true);
    if(innerWidth>=1200&&typeof state==='number'&&typeof previous!=='number'){
      const next=frame.querySelector('.reel-nav-buttons button:last-child');
      if(next){next.classList.remove('ps-next-hint');void next.offsetWidth;next.classList.add('ps-next-hint');}
    }

    requestAnimationFrame(()=>{positionMobileControls(frame);if(root.classList.contains('desktop-short')&&viewKind(state)!==viewKind(previous))frame.scrollTop=0;});
    if(viewKind(state)!==viewKind(previous))frame.scrollTop=0;
    snapshots.forEach(({selector,clone,rect})=>{
      const morph=selector==='.default-visual-box'&&viewKind(state)!=='page';
      const slideLeft=window.innerWidth>=1200&&selector==='.default-visual-box'&&viewKind(previous)!=='page'&&viewKind(state)==='page';
      const returnCard=window.innerWidth>=1200&&selector==='.cards-stack-container'&&viewKind(previous)==='page'&&viewKind(state)!=='page';
      let transform=returnCard?'translateX(64px)':slideLeft?'translateX(-64px)':selector==='.default-visual-box'?'scale(.92)':(window.innerWidth>=1200?'none':'translateY(-20px)');
      if(selector==='.default-visual-box'&&viewKind(state)!=='page'){
        const visual=frame.querySelector(selector);const oldTransition=visual.style.transition;visual.style.transition='none';
        const next=visual.getBoundingClientRect();visual.style.transition=oldTransition;
        transform='translate('+(next.left-rect.left)+'px,'+(next.top-rect.top)+'px) scale('+(next.width/rect.width)+','+(next.height/rect.height)+')';
        visual.animate([{opacity:0},{opacity:0}],{duration:280,easing:'cubic-bezier(0.25,1,0.5,1)'});
      }
      clone.style.removeProperty('opacity');
      const animation=clone.animate([{opacity:1,transform:'none'},{opacity:morph?1:0,transform}],{duration:morph?280:(slideLeft||returnCard)?1000:180,easing:'cubic-bezier(0.25,1,0.5,1)',fill:'forwards'});
      animation.finished.catch(()=>{}).then(()=>{clone.remove();transitionOverlays.delete(clone);});
    });
    if(snapshots.length){const selectors=viewKind(state)==='page'?['.page-content-box','.cards-stack-container','.card-meta-header','.card-caption-desc','.reel-page-indicator','.reel-nav-buttons']:[viewKind(state)==='intro'?'.default-paragraphs':'.default-content-box'];selectors.forEach(selector=>{const el=frame.querySelector(selector);if(el&&getComputedStyle(el).display!=='contents'&&!(frame._desktopStory&&(selector==='.page-content-box'||selector==='.default-content-box'))){
      const enterFromRight=window.innerWidth>=1200&&selector==='.cards-stack-container'&&viewKind(previous)!=='page'&&viewKind(state)==='page';
      if(enterFromRight){
        const previousTransition=el.style.transition;el.style.transition='none';
        const incoming=el.animate([{opacity:0,transform:'translateX(64px)'},{opacity:1,transform:'translateX(0)'}],{duration:1000,easing:'cubic-bezier(0.25,1,0.5,1)'});
        const restore=()=>{el.style.transition=previousTransition;};incoming.finished.then(restore,restore);
      }else el.animate([{opacity:0},{opacity:1}],{duration:180,easing:'cubic-bezier(0.25,1,0.5,1)'});
    }});}
    if(window.innerWidth>=1200&&viewKind(previous)==='page'&&viewKind(state)!=='page'&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
      const visual=frame.querySelector('.default-visual-box');
      if(visual){visual.animate([{opacity:0,transform:'translateX(-64px)'},{opacity:1,transform:'translateX(0)'}],{duration:1000,easing:'cubic-bezier(.25,1,.5,1)'});}
    }
    if(layoutReady&&viewKind(state)!==viewKind(previous))scrollToAnchor(phase,viewKind(state),matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth');
  }
  function advanceHomeStory(phase){
    const state=phaseState(phase);if(typeof state==='number')return false;
    const target=state==='default'&&root.classList.contains('viewport-mobile')?'0'+phase+'-1':selectedPages[phase-1];
    [setState,setPhase2State,setPhase3State,setPhase4State][phase-1](target);return true;
  }
  function setupHomeScrollIntent(){
    let burst=0,last=0,consumed=false,touch=null;
    root.addEventListener('wheel',event=>{
      if(Math.abs(event.deltaX)>Math.abs(event.deltaY)||event.ctrlKey)return;
      const frame=event.target.closest?.('.canvas-frame');if(!frame)return;
      const now=performance.now();if(now-last>220){burst=0;consumed=false;}last=now;
      if(consumed){event.preventDefault();return;}
      const phase=Array.from(root.querySelectorAll('.canvas-frame')).indexOf(frame)+1;
      if(event.deltaY<=0||phaseState(phase)!=='default')return;
      const box=frame.getBoundingClientRect();if(box.top>navHeight+24||box.bottom<navHeight+120)return;
      const unit=event.deltaMode===1?32:event.deltaMode===2?window.innerHeight:1;burst+=event.deltaY*unit;
      if(burst>=40){event.preventDefault();consumed=true;advanceHomeStory(phase);}
    },{passive:false});
    root.addEventListener('touchstart',event=>{if(event.touches.length!==1){touch=null;return;}const frame=event.target.closest?.('.canvas-frame');if(!frame)return;const phase=Array.from(root.querySelectorAll('.canvas-frame')).indexOf(frame)+1;touch={phase,y:event.touches[0].clientY,x:event.touches[0].clientX,state:phaseState(phase)};},{passive:true});
    root.addEventListener('touchend',event=>{const g=touch;touch=null;if(!g||g.state!=='default'||phaseState(g.phase)!=='default'||!event.changedTouches.length)return;const t=event.changedTouches[0],dy=g.y-t.clientY,dx=g.x-t.clientX;if(dy>=40&&dy>Math.abs(dx)*1.2)advanceHomeStory(g.phase);},{passive:true});
    root.addEventListener('touchcancel',()=>{touch=null;},{passive:true});
  }

  // =========================================================================
  // 核心資料庫 (Phase 01 ~ Phase 02)
  // =========================================================================
const phase01Queue = [
      "從一次次的探查與理解開始，我們走進基地與街區，感受環境、人潮與生活的樣貌；",
      "也從專業角度評估都市計畫與土管規則條件，理解一塊土地此刻的限制，以及未來的可能。",
      "再從產品定位、區域脈絡與人口結構、生活機能，一路延伸至購屋習慣與銷售時機，",
      "將土地條件、市場需求與生活想像層層交疊，找出最適合個案的發展方向。",
      "讓土地不只是被評估，而是先被理解，才有機會創造真正屬於它的價值。"
    ];

    const phase01Pages = [
      {
        pageIndex: 1,
        titleCn: "探查",
        titleEn: "EXPLORE",
        highlightWord: "探查",
        sentenceIndex: 0,
        img: "card_01.avif",
        nextImg: "card_02.avif",
        caption: "走進基地與街區，觀察在地消費、人潮、生活氛圍與步調。除了數據，我們也用雙腳感受土地；從街道、人流到日常生活的細節，一路記錄、一路思考，找出這片土地真正的樣貌與可能。"
      },
      {
        pageIndex: 2,
        titleCn: "理解",
        titleEn: "UNDERSTAND",
        highlightWord: "理解",
        sentenceIndex: 0,
        img: "card_02.avif",
        nextImg: "card_03.avif",
        caption: "理解，從傾聽開始。透過與建設團隊深入對談，理解品牌對土地的態度、對建築的期待，以及對居住者與城市的責任。我們將這些理念與堅持，整理成清楚的策略與溝通方式，讓品牌真正被看見、被理解。"
      },
      {
        pageIndex: 3,
        titleCn: "評估都市計畫",
        titleEn: "PLANNING",
        highlightWord: "評估都市計畫",
        sentenceIndex: 1,
        img: "card_03.avif",
        nextImg: "card_04.avif",
        caption: "都市計畫，描繪的是一個區域未來的樣子。從公共建設、交通發展、產業聚落到商圈與人流變化，我們梳理區域發展趨勢，思考未來生活圈可能如何形成。透過長期視角，協助建設團隊掌握土地的發展契機，提前布局。"
      },
      {
        pageIndex: 4,
        titleCn: "土管規則條件",
        titleEn: "ZONING",
        highlightWord: "土管規則條件",
        sentenceIndex: 1,
        img: "card_04.avif",
        nextImg: "card_05.avif",
        caption: "法規不是只有限制，也決定一塊土地能如何被好好使用。從棟距、採光通風、格局動線到車位比例，我們在法規條件中思考居住品質，也從市場角度提出產品建議。在限制中找出更好的解法，讓設計效益與生活需求取得平衡。"
      },
      {
        pageIndex: 5,
        titleCn: "產品定位",
        titleEn: "PRODUCT POSITIONING",
        highlightWord: "產品定位",
        sentenceIndex: 2,
        img: "card_05.avif",
        nextImg: "card_06.avif",
        caption: "數據，是理解市場的重要方式。從實價登錄、人口統計到購屋族群，分析誰可能住在這裡、他們需要什麼樣的生活。將不同族群的需求，轉化為產品規劃的依據，讓空間更貼近真正的使用者。"
      },
      {
        pageIndex: 6,
        titleCn: "區域脈絡與人口結構",
        titleEn: "LOCAL CONTEXT",
        highlightWord: "區域脈絡與人口結構",
        sentenceIndex: 2,
        img: "card_06.avif",
        nextImg: "card_07.avif",
        caption: "理解一個區域，不只看數據，也要走進真實的生活。從城市發展、商圈變化到人口遷移，我們同時觀察大環境與街區細節，理解一個地方如何形成自己的生活節奏。讓建築不只是落在土地上，而能真正融入城市與社區。"
      },
      {
        pageIndex: 7,
        titleCn: "生活機能",
        titleEn: "AMENITIES",
        highlightWord: "生活機能",
        sentenceIndex: 2,
        img: "card_07.avif",
        nextImg: "card_08.avif",
        caption: "生活機能，不只是地圖上的距離，而是每天生活是否方便。我們實際走訪街區，了解採買、交通、學區、公園與休閒環境，從居住者角度思考一天的生活路徑。因為真正重要的，是住進來之後，每一天是否自然、順手、安心。"
      },
      {
        pageIndex: 8,
        titleCn: "購屋習慣與銷售時機",
        titleEn: "HABITS & TIMING",
        highlightWord: "購屋習慣與銷售時機",
        sentenceIndex: 2,
        img: "card_08.avif",
        nextImg: "card_01.avif",
        caption: "市場會改變，購屋需求也會隨政策、區域發展與生活方式持續變化。我們透過市場調查與購屋習慣，分析目標族群與購屋契機，協助建設團隊調整產品與銷售策略。在市場變化中掌握節奏，讓產品在適合的時間，被真正需要的人看見。"
    }
  ];
    phase01Pages.forEach(p => { p.img = asset(p.img); p.nextImg = asset(p.nextImg); });

    let currentState = 'default';
    let isTransitioning = false;

    // 建立頂部切換按鈕 (包含手機板在 Default 與 Page01 之間的 page01-1 漏掉的過渡頁)
    

    let lastManualStateTime = 0;
    const selectedPages=[1,1,1,1];
    function updateCardControls(phase,state) {
      const suffix=phase===1?'':String(phase);
      const nav=document.getElementById('reelNavButtons'+suffix);
      const count=[8,3,4,4][phase-1];
      if(nav)nav.querySelectorAll('button').forEach((button,i)=>{
        button.disabled=typeof state==='number' && i===1 && state>=count;
        button.setAttribute('aria-label',i===0?(state===1?'返回章節介紹':'上一張圖片'):'下一張圖片');
      });
    }

    // =========================================================================
    // 全域左上角固定標籤與側邊原石動態過渡控制器 (Fixed Top-Left Component)
    // 支援 3 種過渡情境：
    // 1. 都只有文字 (Default ➔ Default)：文字 cross-fade 淡入淡出
    // 2. 都有石頭 (Page ➔ Page)：石頭 cross-fade，文字 cross-fade
    // 3. 文字 ➔ 石頭+文字 (Default ➔ Page)：比照首頁切換分頁，文字平滑下移，石頭滑入淡入
    // 全域固定元件 (左上角原石標籤、左下角導航) 與當前畫布自適應同步
    
    function syncGlobalFixedComponentsPosition() {
      root.style.setProperty('--left-content-x','232px');
      root.style.setProperty('--side-rail-inner-x','58px');
      root.style.setProperty('--side-rail-rock-inner-x','20px');
      if(!root.classList.contains('viewport-mobile')&&!root.classList.contains('viewport-tablet')) {
        const bounds=root.getBoundingClientRect();
        const canvas=root.querySelector('.canvas-frame');
        const pixelRatio=window.devicePixelRatio||1;
        const centerX=Math.round(((canvas?canvas.clientWidth:bounds.width)/2)*pixelRatio)/pixelRatio;
        root.style.setProperty('--ps-center-line-x',centerX+'px');
        const nav=root.querySelector('.global-stage-nav');
        const rail=root.querySelector('.phase-vertical-tag');
        const occupiedRight=Math.max(0,nav?nav.getBoundingClientRect().right-bounds.left:0,rail?rail.getBoundingClientRect().right-bounds.left:0);
        const start=occupiedRight+24;
        const end=bounds.width/2-32;
        const available=Math.max(0,end-start);
        const textWidth=Math.min(600,available);
        const originalTextX=start+(available-textWidth)/2;
        const sharedLeft=(originalTextX+232)/2;
        root.style.setProperty('--ps-left-text-x',sharedLeft+'px');
        root.style.setProperty('--left-content-x',sharedLeft+'px');
        root.style.setProperty('--ps-left-text-width',(textWidth*.9)+'px');
      }
    }

    function updateGlobalTopLeftBadge(activePhase, isPageActive) {
      syncGlobalFixedComponentsPosition();
    }

    function setState(st) {
      lastManualStateTime = Date.now() + 600;
      if (isTransitioning) return;
      const prevSt = currentState;
      if (prevSt === st) return;
      const storyFrame=document.getElementById('canvasFrame');
      const storySnapshots=captureStoryTransition(storyFrame,st,prevSt);

      currentState = st;
      document.getElementById('canvasFrame').dataset.psState = typeof st === 'number' ? 'page' : st === 'default' ? 'default' : 'intro';
      if(typeof st === 'number') selectedPages[0]=st;
      updateCardControls(1,st);
      

      const wrapper = document.getElementById('canvasViewportWrapper');
      wrapper.classList.toggle('state-intro', st === '01-1');

      const bgDefaultCurve = document.getElementById('bgDefaultCurve');
      const bgPageEllipse = document.getElementById('bgPageEllipse');
      const sideRockIcon = document.getElementById('sideRockIcon');
      const phaseVerticalTag = document.getElementById('phaseVerticalTag');
      const defaultContent = document.getElementById('defaultContent');
      const defaultVisual = document.getElementById('defaultVisual');
      const pageContent = document.getElementById('pageContent');
      const reelIndicator = document.getElementById('reelIndicator');
      const reelNavButtons = document.getElementById('reelNavButtons');
      const cardMetaHeader = document.getElementById('cardMetaHeader');
      const cardsStackContainer = document.getElementById('cardsStackContainer');
      const cardCaptionDesc = document.getElementById('cardCaptionDesc');

      const isTargetHomeOrIntro = (st === 'default' || st === '01-1');
      const wasHomeOrIntro = (prevSt === 'default' || prevSt === '01-1');

      // 更新全域左上角固定組件 (Phase 01)
      updateGlobalTopLeftBadge(1, !isTargetHomeOrIntro);

      if (isTargetHomeOrIntro) {
        currentSentenceIndex = null;
        bgDefaultCurve.classList.remove('is-hidden');
        bgPageEllipse.classList.remove('is-active');
        sideRockIcon.classList.remove('is-active');
        phaseVerticalTag.classList.add('is-default');

        defaultContent.classList.remove('is-hidden');
        defaultVisual.classList.remove('is-hidden');

        pageContent.classList.add('is-hidden');
        reelIndicator.classList.add('is-hidden');
        reelNavButtons.classList.add('is-hidden');
        cardMetaHeader.classList.add('is-hidden');
        cardsStackContainer.classList.add('is-hidden');
        cardCaptionDesc.classList.add('is-hidden');
      } else {
        bgDefaultCurve.classList.add('is-hidden');
        bgPageEllipse.classList.add('is-active');
        sideRockIcon.classList.add('is-active');
        phaseVerticalTag.classList.remove('is-default');

        defaultContent.classList.add('is-hidden');
        defaultVisual.classList.add('is-hidden');

        pageContent.classList.remove('is-hidden');
        reelIndicator.classList.remove('is-hidden');
        reelNavButtons.classList.remove('is-hidden');
        cardMetaHeader.classList.remove('is-hidden');
        cardsStackContainer.classList.remove('is-hidden');
        cardCaptionDesc.classList.remove('is-hidden');

        let dir = 0;
        if (!wasHomeOrIntro && typeof prevSt === 'number' && typeof st === 'number') {
          dir = st > prevSt ? 1 : -1;
        }
        renderPage(st, prevSt, dir);
      }
      finishStoryTransition(storyFrame,1,st,prevSt,storySnapshots);
    }

    let currentSentenceIndex = null;
    let cardRoles = { main: 0, sub: 1, spare: 2 };

    // Each phase independently suppresses its preview at the final page.
    let hasNextCard = true;

    function setSlotState(slotIdx, state) {
      const slot = document.getElementById(`cardSlot${slotIdx}`);
      if (!slot) return;
      if (state === 'main') {
        slot.style.transform = 'translate(0, 0) scale(1)';
        slot.style.opacity = '1';
        slot.style.zIndex = '5';
        slot.style.pointerEvents = 'auto';
      } else if (state === 'sub') {
        slot.style.transformOrigin = 'top left';
        slot.style.transform = 'translate(var(--card-sub-x), var(--card-sub-y)) scale(var(--card-sub-scale))';
        slot.style.opacity = hasNextCard ? 'var(--card-sub-opacity)' : '0';
        slot.style.zIndex = '3';
        slot.style.pointerEvents = 'none';
      } else if (state === 'out-left') {
        slot.style.transform = 'translateX(-140px) scale(0.92)';
        slot.style.opacity = '0';
        slot.style.zIndex = '1';
        slot.style.pointerEvents = 'none';
      } else if (state === 'sub-enter') {
        slot.style.transformOrigin = 'top left';
        slot.style.transform = 'translate(calc(var(--card-sub-x) + 60px), var(--card-sub-y)) scale(var(--card-sub-scale))';
        slot.style.opacity = '0';
        slot.style.zIndex = '2';
        slot.style.pointerEvents = 'none';
      }
    }

    function resetCardSlots(pageNum) {
      const p = (typeof pageNum === 'number' && pageNum >= 1 && pageNum <= 8) ? pageNum : 1;
      const pageData = phase01Pages[p - 1];
      hasNextCard = p < phase01Pages.length;
      const isMobile = document.getElementById('canvasViewportWrapper') && document.getElementById('canvasViewportWrapper').classList.contains('viewport-mobile');

      cardRoles = { main: 0, sub: 1, spare: 2 };
      const s0 = document.getElementById('cardSlot0');
      const s1 = document.getElementById('cardSlot1');
      const s2 = document.getElementById('cardSlot2');
      if (!s0 || !s1 || !s2) return;

      s0.style.transition = 'none';
      s1.style.transition = 'none';
      s2.style.transition = 'none';

      const img0 = document.getElementById('imgSlot0');
      const img1 = document.getElementById('imgSlot1');
      const img2 = document.getElementById('imgSlot2');
      if (img0 && pageData.img) img0.src = pageData.img;
      if (img1 && pageData.nextImg) img1.src = pageData.nextImg;
      if (img2 && pageData.nextImg) img2.src = pageData.nextImg;

      if (isMobile) {
        s0.style.transform = 'translateX(0)';
        s0.style.opacity = '1';
        s0.style.zIndex = '5';
        s1.style.transform = 'translateX(100%)';
        s1.style.opacity = '0';
        s2.style.opacity = '0';
      } else {
        setSlotState(0, 'main');
        setSlotState(1, 'sub');
        setSlotState(2, 'out-left');
      }
    }

    function animateCardSlots(fromPage, toPage, direction) {
      isTransitioning = true;
      const isMobile = document.getElementById('canvasViewportWrapper').classList.contains('viewport-mobile');
      const toData = phase01Pages[toPage - 1];
      hasNextCard = toPage < phase01Pages.length;

      if (isMobile) {
        // 手機端：雙槽位橫向推移 (無疊加、無閃現)
        const slotMain = document.getElementById(`cardSlot${cardRoles.main}`);
        const slotNext = document.getElementById(`cardSlot${cardRoles.sub}`);
        const imgNext = document.getElementById(`imgSlot${cardRoles.sub}`);

        imgNext.src = toData.img;
        slotNext.style.transition = 'none';
        slotNext.style.transform = direction === 1 ? 'translateX(100%)' : 'translateX(-100%)';
        slotNext.style.opacity = '0';
        slotNext.style.zIndex = '5';
        slotNext.offsetWidth; // reflow

        slotMain.style.transition = 'transform 0.48s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.48s cubic-bezier(0.25, 1, 0.5, 1)';
        slotNext.style.transition = 'transform 0.48s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.48s cubic-bezier(0.25, 1, 0.5, 1)';

        slotMain.style.transform = direction === 1 ? 'translateX(-100%)' : 'translateX(100%)';
        slotMain.style.opacity = '0';
        slotNext.style.transform = 'translateX(0)';
        slotNext.style.opacity = '1';

        queueCardAnimation(() => {
          slotMain.style.transition = 'none';
          slotNext.style.transition = 'none';
          const temp = cardRoles.main;
          cardRoles.main = cardRoles.sub;
          cardRoles.sub = temp;
          isTransitioning = false;
        }, 500);
        return;
      }

      // 桌面端與平板端：三槽位虛擬輪換 (原圖存在次要卡上，直接平滑位移放大至主卡，零閃爍零重疊！)
      const slotMain = document.getElementById(`cardSlot${cardRoles.main}`);
      const slotSub = document.getElementById(`cardSlot${cardRoles.sub}`);
      const slotSpare = document.getElementById(`cardSlot${cardRoles.spare}`);
      const imgSpare = document.getElementById(`imgSlot${cardRoles.spare}`);

      if (direction === 1) { // Next
        // spare 預載下一張次要圖，並就位在次要位置右側隱藏
        imgSpare.src = toData.nextImg;
        slotSpare.style.transition = 'none';
        setSlotState(cardRoles.spare, 'sub-enter');
        slotSpare.offsetWidth; // reflow

        const ease = '0.28s cubic-bezier(0.25, 1, 0.5, 1)';
        slotMain.style.transition = `transform ${ease}, opacity ${ease}`;
        slotSub.style.transition = `transform ${ease}, opacity ${ease}`;
        slotSpare.style.transition = `transform ${ease}, opacity ${ease}`;

        // slotMain 滑出左側
        setSlotState(cardRoles.main, 'out-left');
        // slotSub 平滑放大位移至主要位置 (原圖已在 slotSub 上，絕不閃白或閃現！)
        setSlotState(cardRoles.sub, 'main');
        // slotSpare 滑入次要位置
        setSlotState(cardRoles.spare, 'sub');

        queueCardAnimation(() => {
          slotMain.style.transition = 'none';
          slotSub.style.transition = 'none';
          slotSpare.style.transition = 'none';
          const oldMain = cardRoles.main;
          cardRoles.main = cardRoles.sub;
          cardRoles.sub = cardRoles.spare;
          cardRoles.spare = oldMain;
          isTransitioning = false;
        }, 300);

      } else { // Prev
        // spare 預載上一張主圖，並就位在左側隱藏
        imgSpare.src = toData.img;
        slotSpare.style.transition = 'none';
        setSlotState(cardRoles.spare, 'out-left');
        slotSpare.style.zIndex = '5';
        slotSpare.offsetWidth; // reflow

        const ease = '0.28s cubic-bezier(0.25, 1, 0.5, 1)';
        slotMain.style.transition = `transform ${ease}, opacity ${ease}`;
        slotSub.style.transition = `opacity 0.35s ease`;
        slotSpare.style.transition = `transform ${ease}, opacity ${ease}`;

        // slotMain 縮小退回次要位置
        setSlotState(cardRoles.main, 'sub');
        // slotSpare 由左側滑入主位置
        setSlotState(cardRoles.spare, 'main');
        // slotSub 淡出
        slotSub.style.opacity = '0';

        queueCardAnimation(() => {
          slotMain.style.transition = 'none';
          slotSub.style.transition = 'none';
          slotSpare.style.transition = 'none';
          document.getElementById(`imgSlot${cardRoles.main}`).src = toData.nextImg;
          const oldSub = cardRoles.sub;
          cardRoles.sub = cardRoles.main;
          cardRoles.main = cardRoles.spare;
          cardRoles.spare = oldSub;
          isTransitioning = false;
        }, 300);
      }
    }

    // =========================================================================
    // 統一段落軌道系統 (100% 還原 Figma Smart Animate Main-text 互動)
    // =========================================================================
    function makeHighlightHTML(text, word) {
      if (word && text.includes(word)) {
        return text.replace(word, `<span class="highlight-span">${word}</span>`);
      }
      return text;
    }

    function initSentenceTracks() {
      const wrapper = document.getElementById('sentenceTracksWrapper');
      if (!wrapper || wrapper.children.length > 0) return;
      wrapper.innerHTML = '';
      phase01Queue.forEach((text, i) => {
        const div = document.createElement('div');
        div.className = 'sentence-track is-upcoming';
        div.id = `sentenceTrack${i}`;
        div.dataset.idx = i;
        div.innerText = text;
        wrapper.appendChild(div);
      });
    }

    function measureTrackFinalHeight(text, word, isMobile, isTablet) {
      const frames=Array.from(root.querySelectorAll('.canvas-frame'));
      const frame=frames.find(f=>f.querySelector('.sentence-track.is-active')?.textContent===text) || frames[0];
      const stage=frame.querySelector('.main-text-stage');
      const probe=document.createElement('div');
      probe.className='sentence-track is-active';
      probe.style.cssText='position:absolute!important;visibility:hidden;transition:none!important;transform:none!important';
      probe.style.width=stage.offsetWidth+'px';
      probe.innerHTML=makeHighlightHTML(text,word);
      stage.appendChild(probe);
      const height=probe.offsetHeight;
      probe.remove();return height;
    }

    function renderQuotes(toPage, fromPage, direction) {
      // Keep desktop text at the same quote anchor on every card.
      if(window.innerWidth>=1200)direction=0;
      initSentenceTracks();

      const toData = phase01Pages[toPage - 1];
      const targetSentenceIdx = toData.sentenceIndex;
      const targetHighlightWord = toData.highlightWord;
      const isMobile = document.getElementById('canvasViewportWrapper').classList.contains('viewport-mobile');
      const isTablet = document.getElementById('canvasViewportWrapper').classList.contains('viewport-tablet');
      
      // 平板與桌面使用各自專屬的引文-隊列間距參數 (平板可調)
      const quoteToQueueGap = isTablet
        ? (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--tab-quote-to-queue-gap')) || 28)
        : (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--quote-to-queue-gap')) || 54);
      const queueItemGap = isTablet
        ? (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--tab-queue-item-gap')) || 16)
        : (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--queue-item-gap')) || 20);
      const extraLineH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--line-note-extra-h')) || 0;
      const lineNote = document.getElementById('reelLineNote');

      // 取得新引文完全展開後的真實高度 (免受 font-size 過渡期誤差影響，絕不發生重疊)
      const activeH = measureTrackFinalHeight(phase01Queue[targetSentenceIdx], targetHighlightWord, isMobile, isTablet);

      // 手機端引文行數若大於基礎高度，將下方卡片/標題/說明/按鈕順延向下位移，維持安全間距
      if (isMobile) {
        const baseH = 80;
        const pushY = Math.max(0, activeH - baseH);
        document.getElementById('canvasFrame').style.setProperty('--mob-quote-push-y', `${pushY}px`);
      } else {
        document.getElementById('canvasFrame').style.setProperty('--mob-quote-push-y', '0px');
      }

      function updateLineNote() {
        if (lineNote) {
          lineNote.style.height = `${activeH + 5 + extraLineH}px`;
        }
      }

      // 統一預備隊列佈局：根據引文最新折行高度即時順延推開，桌面與平板完整保留 margin 間距
      function updateUpcomingQueue(withTransition = true) {
        if (!isMobile) {
          let nextY = activeH + quoteToQueueGap;
          for (let i = targetSentenceIdx + 1; i < phase01Queue.length; i++) {
            const track = document.getElementById(`sentenceTrack${i}`);
            if (track) {
              track.className = 'sentence-track is-upcoming';
              track.innerText = phase01Queue[i];
              track.style.opacity = '0.75';
              if (withTransition) {
                track.style.transition = 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.35s ease';
              } else {
                track.style.transition = 'none';
              }
              track.style.transform = `translateY(${nextY}px)`;
              nextY += (track.offsetHeight || 52) + queueItemGap;
            }
          }
        }
      }

      // 1. 初次載入或由首頁進入
      if (direction === 0 || currentSentenceIndex === null) {
        currentSentenceIndex = targetSentenceIdx;
        for (let i = 0; i < phase01Queue.length; i++) {
          const track = document.getElementById(`sentenceTrack${i}`);
          if (!track) continue;
          track.style.transition = 'none';

          if (i === targetSentenceIdx) {
            track.className = 'sentence-track is-active';
            track.innerHTML = makeHighlightHTML(phase01Queue[i], targetHighlightWord);
            track.style.transform = 'translateY(0px)';
            track.style.opacity = '1';
          } else if (i < targetSentenceIdx) {
            track.className = 'sentence-track is-past';
            track.innerText = phase01Queue[i];
            track.style.transform = `translateY(${(i - targetSentenceIdx) * 60 - 30}px) scale(0.85)`;
            track.style.opacity = '0';
          } else {
            track.className = 'sentence-track is-upcoming';
            track.innerText = phase01Queue[i];
            track.style.opacity = isMobile ? '0' : '0.75';
          }
        }

        updateLineNote();
        updateUpcomingQueue(false);

        setTimeout(() => {
          for (let i = 0; i < phase01Queue.length; i++) {
            const track = document.getElementById(`sentenceTrack${i}`);
            if (track) track.style.transition = '';
          }
        }, 50);
        return;
      }

      // 2. 同一句段落內的分頁切換 (例如 01->02 或 05->06->07->08)：引文不動，高亮詞平滑由左至右顯現
      if (targetSentenceIdx === currentSentenceIndex) {
        const activeTrack = document.getElementById(`sentenceTrack${currentSentenceIndex}`);
        if (activeTrack) {
          activeTrack.innerHTML = makeHighlightHTML(phase01Queue[currentSentenceIndex], targetHighlightWord);
          updateLineNote();
        }
        // 桌面端與平板端：若引文因關鍵字折行產生多行高度變化，後續隊列平滑順延推開，保留完整間距 (margin)！
        updateUpcomingQueue(true);
        return;
      }

      // 3. 段落更換 (如 02->03 或 04->05)：100% 精確還原 Figma Smart Animate
      const oldIdx = currentSentenceIndex;
      currentSentenceIndex = targetSentenceIdx;

      // 手機端切換動態 (引文字級不變小，純位移與淡出)
      if (isMobile) {
        const oldTrack = document.getElementById(`sentenceTrack${oldIdx}`);
        const newTrack = document.getElementById(`sentenceTrack${targetSentenceIdx}`);

        if (oldTrack) {
          animateLeavingQuote(oldTrack);oldTrack.classList.remove('is-active');oldTrack.classList.add('is-past');
          oldTrack.style.transition = 'transform 0.42s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.35s ease';
          oldTrack.style.transform = direction === 1 ? 'translateY(-36px)' : 'translateY(36px)';
          oldTrack.style.opacity = '0';
        }

        if (newTrack) {
          newTrack.className = 'sentence-track is-active';
          newTrack.innerHTML = makeHighlightHTML(phase01Queue[targetSentenceIdx], targetHighlightWord);
          newTrack.style.transition = 'none';
          newTrack.style.transform = direction === 1 ? 'translateY(36px)' : 'translateY(-36px)';
          newTrack.style.opacity = '0';
          newTrack.offsetWidth; // reflow

          newTrack.style.transition = 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.45s ease';
          newTrack.style.transform = 'translateY(0px)';
          newTrack.style.opacity = '1';
          if(isMobile)newTrack.animate([{opacity:0,transform:'translateY(24px)'},{opacity:1,transform:'translateY(0)'}],{duration:180,easing:'ease-out'});

          updateLineNote();
        }
        return;
      }

      // 桌面與平板端：統一段落軌道實時位移放大
      const newActiveTrack = document.getElementById(`sentenceTrack${targetSentenceIdx}`);
      if (newActiveTrack) {
        newActiveTrack.className = 'sentence-track is-active';
        newActiveTrack.innerHTML = makeHighlightHTML(phase01Queue[targetSentenceIdx], targetHighlightWord);
        newActiveTrack.style.transform = 'translateY(0px)';
        newActiveTrack.style.opacity = '1';
      }

      // 處理所有過去段落 (Past: 向上移動縮小並淡出入頂部遮罩)
      for (let i = 0; i < targetSentenceIdx; i++) {
        const track = document.getElementById(`sentenceTrack${i}`);
        if (track) {
          track.className = 'sentence-track is-past';
          track.innerText = phase01Queue[i];
          track.style.transform = `translateY(${(i - targetSentenceIdx) * 60 - 30}px) scale(0.85)`;
          track.style.opacity = '0';
        }
      }

      // 豎線高度即時根據真實高度更新
      updateLineNote();

      // 預備隊列所有段落 (Upcoming: 根據精準引文高度，完美維持 gap，平滑推開絕不重疊)
      updateUpcomingQueue(true);
    }

    function dissolveTextHeaders(toPage) {
      const pageData = phase01Pages[toPage - 1];
      const textElems = [
        document.getElementById('currPageNum'),
        document.getElementById('cardCatCn'),
        document.getElementById('cardCatEn'),
        document.getElementById('cardCaptionDesc')
      ];

      textElems.forEach(el => {
        if (el) {
          el.classList.add('text-dissolve-out');
          el.classList.remove('text-dissolve-in');
        }
      });

      setTimeout(() => {
        document.getElementById('currPageNum').innerText = `0${toPage}`;
        document.getElementById('cardCatCn').innerText = pageData.titleCn;
        document.getElementById('cardCatEn').innerText = pageData.titleEn;
        document.getElementById('cardCaptionDesc').innerText = pageData.caption;

        textElems.forEach(el => {
          if (el) {
            el.classList.remove('text-dissolve-out');
            el.classList.add('text-dissolve-in');
          }
        });

        setTimeout(() => {
          textElems.forEach(el => {
            if (el) el.classList.remove('text-dissolve-in');
          });
        }, 320);
      }, 160);
    }

    function renderPage(toPage, fromPage, direction = 0) {
      const pageData = phase01Pages[toPage - 1];

      if (direction !== 0 && typeof fromPage === 'number') {
        animateCardSlots(fromPage, toPage, direction);
        renderQuotes(toPage, fromPage, direction);
        dissolveTextHeaders(toPage);
      } else {
        resetCardSlots(toPage);
        renderQuotes(toPage, fromPage, 0);
        document.getElementById('currPageNum').innerText = `0${toPage}`;
        document.getElementById('cardCatCn').innerText = pageData.titleCn;
        document.getElementById('cardCatEn').innerText = pageData.titleEn;
        document.getElementById('cardCaptionDesc').innerText = pageData.caption;
      }
    }

    const states = ['default', '01-1', 1, 2, 3, 4, 5, 6, 7, 8];

    function prevPage() {
      const isMobile = document.getElementById('canvasViewportWrapper').classList.contains('viewport-mobile');
      if (currentState === 1) {
        setState(isMobile ? '01-1' : 'default');
        scrollToPhase('phase-01');
        return;
      }
      const idx = states.indexOf(currentState);
      if (idx > 0) {
        const targetSt = states[idx - 1];
        setState(targetSt);
        if (targetSt === 'default' || targetSt === '01-1') {
          scrollToPhase('phase-01');
        }
      }
    }

    function nextPage() {
      const isMobile = document.getElementById('canvasViewportWrapper').classList.contains('viewport-mobile');
      if (currentState === 'default') {
        setState(isMobile ? '01-1' : 1);
        scrollToPhase('phase-01');
        return;
      }
      if (currentState === '01-1') {
        setState(1);
        scrollToPhase('phase-01');
        return;
      }
      const idx = states.indexOf(currentState);
      if (idx >= 0 && idx < states.length - 1) {
        setState(states[idx + 1]);
      }
    }

    // RWD 寬度響應式切換
    function setRWD(mode) {
      const wrapper = document.getElementById('canvasViewportWrapper');
      document.getElementById('btnDesktop').classList.toggle('active', mode === 'desktop');
      document.getElementById('btnTablet').classList.toggle('active', mode === 'tablet');
      document.getElementById('btnMobile').classList.toggle('active', mode === 'mobile');

      wrapper.className = 'canvas-viewport-wrapper';
      document.body.classList.toggle('viewport-tablet', mode === 'tablet');
      document.body.classList.toggle('viewport-mobile', mode === 'mobile');

      if (mode === 'tablet') {
        wrapper.classList.add('viewport-tablet');
        switchTunerTab('tablet');
      } else if (mode === 'mobile') {
        wrapper.classList.add('viewport-mobile');
        switchTunerTab('mobile');
        setMobileTitlePosition('above');
      } else {
        switchTunerTab('desktop');
      }
      if (typeof currentState === 'number') {
        resetCardSlots(currentState);
      }
      if (typeof currentPhase2State === 'number') {
        resetCardSlots2(currentPhase2State);
      }
      setTimeout(updateCenterLineScroll, 50);
      setTimeout(syncGlobalFixedComponentsPosition, 50);
      // 版型切換後錨點位置改變：瞬間重新對齊目前 Phase 的狀態錨點
      setTimeout(() => {
        const n = getNearestAnchor();
        if (n && n.dataset.phase === '2') scrollToAnchor(2, kindForPhase2State(currentPhase2State), 'instant');
        else scrollToAnchor(1, kindForPhase1State(currentState), 'instant');
      }, 80);
    }

    // 調校抽屜裝置標籤切換
    function switchTunerTab(tab) {
      document.getElementById('tunerGroupDesktop').style.display = tab === 'desktop' ? 'block' : 'none';
      document.getElementById('tunerGroupTablet').style.display = tab === 'tablet' ? 'block' : 'none';
      document.getElementById('tunerGroupMobile').style.display = tab === 'mobile' ? 'block' : 'none';

      document.getElementById('tabBtnDesktop').style.background = tab === 'desktop' ? 'var(--color-main-brown)' : '#333';
      document.getElementById('tabBtnDesktop').style.color = tab === 'desktop' ? '#fff' : '#aaa';
      document.getElementById('tabBtnTablet').style.background = tab === 'tablet' ? 'var(--color-main-brown)' : '#333';
      document.getElementById('tabBtnTablet').style.color = tab === 'tablet' ? '#fff' : '#aaa';
      document.getElementById('tabBtnMobile').style.background = tab === 'mobile' ? 'var(--color-main-brown)' : '#333';
      document.getElementById('tabBtnMobile').style.color = tab === 'mobile' ? '#fff' : '#aaa';
    }

    // 滑桿與數值輸入框雙向同步控制器
    function syncControl(key, value, cssVar, unit) {
      const slider = document.getElementById(`slider_${key}`);
      const numInput = document.getElementById(`num_${key}`);
      if (slider) slider.value = parseFloat(value) || value;
      if (numInput) numInput.value = value;
      const strVal = String(value).trim();
      const finalVal = (strVal.endsWith('px') || strVal.endsWith('pt') || strVal.endsWith('%') || strVal.endsWith('em')) ? strVal : (strVal + (unit || ''));
      document.documentElement.style.setProperty(cssVar, finalVal);

      if (typeof currentState === 'number') {
        if (cssVar.includes('gap') || cssVar.includes('quote') || cssVar.includes('line-note')) {
          renderQuotes(currentState, currentState, 0);
        }
      }
    }

    function syncBrushPadding(value) {
      const slider = document.getElementById('slider_brush_pad');
      const numInput = document.getElementById('num_brush_pad');
      if (slider) slider.value = value;
      if (numInput) numInput.value = value;
      document.documentElement.style.setProperty('--brush-pad-x', value + 'px');
      document.documentElement.style.setProperty('--brush-pad-y', value + 'px');
    }

    // 手機端圖片標題在圖片上方 vs 下方 切換
    let currentMobTitlePos = 'above';
    function setMobileTitlePosition(pos) {
      currentMobTitlePos = pos;
      const btnAbove = document.getElementById('btnTitlePosAbove');
      const btnBelow = document.getElementById('btnTitlePosBelow');
      if (btnAbove && btnBelow) {
        if (pos === 'above') {
          btnAbove.style.background = 'var(--color-main-brown)';
          btnAbove.style.borderColor = 'var(--color-main-brown)';
          btnAbove.style.color = '#fff';
          btnBelow.style.background = '#2a2a2a';
          btnBelow.style.borderColor = '#444';
          btnBelow.style.color = '#ccc';
        } else {
          btnBelow.style.background = 'var(--color-main-brown)';
          btnBelow.style.borderColor = 'var(--color-main-brown)';
          btnBelow.style.color = '#fff';
          btnAbove.style.background = '#2a2a2a';
          btnAbove.style.borderColor = '#444';
          btnAbove.style.color = '#ccc';
        }
      }

      if (pos === 'above') {
        // Figma 預設：標題在圖片上方
        syncControl('mob_title_top', 296, '--mob-title-top', 'px');
        syncControl('mob_card_top', 334, '--mob-card-top', 'px');
        syncControl('mob_desc_top', 563, '--mob-desc-top', 'px');
        syncControl('mob_card_h', 209, '--mob-card-h', 'px');
        syncControl('mob_btn_y', 423, '--mob-btn-y', 'px');
      } else {
        // 標題在圖片下方
        syncControl('mob_card_top', 299, '--mob-card-top', 'px');
        syncControl('mob_title_top', 541, '--mob-title-top', 'px');
        syncControl('mob_desc_top', 580, '--mob-desc-top', 'px');
        syncControl('mob_card_h', 220, '--mob-card-h', 'px');
        syncControl('mob_btn_y', 391, '--mob-btn-y', 'px');
      }
    }

    // 一鍵複製當前參數 (包含桌面、平板與手機獨立設定)
    function copyCurrentTokens() {
      const rootStyles = getComputedStyle(document.documentElement);
      const desktopProps = [
        '--side-phase-x',
        '--side-phase-y',
        '--side-phase-default-y',
        '--side-phase-size',
        '--default-rock-x',
        '--default-rock-y',
        '--default-rock-w',
        '--default-rock-h',
        '--quote-font-size',
        '--quote-line-height',
        '--quote-to-paragraph-gap',
        '--section-title-gap',
        '--line-note-offset',
        '--brush-pad-x',
        '--quote-to-queue-gap',
        '--queue-clip-height',
        '--queue-item-gap',
        '--mask-stage-h',
        '--mask-solid-bottom',
        '--mask-fade-bottom',
        '--line-note-extra-h',
        '--card-meta-top',
        '--card-title-cn-size',
        '--card-title-en-size',
        '--card-title-en-y',
        '--card-sub-x',
        '--card-sub-y',
        '--card-sub-scale',
        '--card-sub-opacity',
        '--btn-size',
        '--btn-arrow-size',
        '--btn-arrow-scale',
        '--btn-arrow-offset-x',
        '--btn-arrow-left-x',
        '--btn-arrow-right-x',
        '--page-indicator-y',
        '--page-num-size',
        '--page-total-size',
        '--page-letter-spacing',
        '--quote-x',
        '--page-quote-x',
        '--center-line-w',
        '--center-line-top',
        '--center-line-h',
        '--sticky-travel'
      ];

      const tabletProps = [
        '--tab-quote-size',
        '--tab-quote-lh',
        '--tab-quote-gap',
        '--tab-quote-to-queue-gap',
        '--tab-queue-item-gap',
        '--tab-mask-stage-h',
        '--tab-mask-solid-bottom',
        '--tab-mask-fade-bottom',
        '--tab-quote-x',
        '--tab-page-quote-x',
        '--tab-title-cn-size',
        '--tab-title-en-size',
        '--tab-title-en-y',
        '--tab-title-top',
        '--tab-card-top',
        '--tab-card-w',
        '--tab-card-h',
        '--tab-side-phase-x',
        '--tab-side-phase-y',
        '--tab-side-phase-default-x',
        '--tab-side-phase-default-y',
        '--tab-rock-x',
        '--tab-rock-y',
        '--tab-rock-w',
        '--tab-rock-h',
        '--tab-page-curr-size',
        '--tab-page-total-size',
        '--tab-page-indicator-y',
        '--tab-btn-size',
        '--tab-btn-arrow-scale',
        '--tab-btn-arrow-left-x',
        '--tab-btn-arrow-right-x',
        '--tab-sticky-travel'
      ];

      const mobileProps = [
        '--mob-title-gap',
        '--mob-quote-para-gap',
        '--mob-quote-size',
        '--mob-quote-lh',
        '--mob-quote-gap',
        '--mob-quote-x',
        '--mob-page-quote-x',
        '--mob-title-cn-size',
        '--mob-title-top',
        '--mob-card-top',
        '--mob-desc-top',
        '--mob-card-w',
        '--mob-card-h',
        '--mob-btn-y',
        '--mob-btn-left-x',
        '--mob-btn-right-x',
        '--mob-btn-size',
        '--mob-btn-arrow-scale',
        '--mob-btn-arrow-left-x',
        '--mob-btn-arrow-right-x',
        '--mob-page-indicator-y',
        '--mob-page-indicator-x',
        '--mob-page-curr-size',
        '--mob-page-total-size',
        '--mob-side-rock-x',
        '--mob-side-rock-y',
        '--mob-side-rock-w',
        '--mob-rock-x',
        '--mob-rock-y',
        '--mob-rock-w',
        '--mob-rock-h',
        '--mob-intro-rock-x',
        '--mob-intro-rock-y',
        '--mob-intro-rock-w',
        '--mob-intro-rock-h',
        '--mob-nav-x',
        '--mob-nav-bottom',
        '--mob-sticky-travel'
      ];

      let cssText = "/* Phase 01 最新調校 CSS 參數 (全端完整) */\n:root {\n  /* === 桌面端 (Desktop) === */\n";
      desktopProps.forEach(p => {
        cssText += `  ${p}: ${rootStyles.getPropertyValue(p).trim()};\n`;
      });
      cssText += "\n  /* === 平板端 (Tablet) === */\n";
      tabletProps.forEach(p => {
        cssText += `  ${p}: ${rootStyles.getPropertyValue(p).trim()};\n`;
      });
      cssText += "\n  /* === 手機端 (Mobile) === */\n";
      mobileProps.forEach(p => {
        cssText += `  ${p}: ${rootStyles.getPropertyValue(p).trim()};\n`;
      });
      cssText += "}\n";

      navigator.clipboard.writeText(cssText).then(() => {
        alert("已成功複製「桌面 / 平板 / 手機」全端獨立 CSS 參數至剪貼簿！");
      });
    }

    // 初始化狀態為 Default，手機端預設標題在圖片上方
    setMobileTitlePosition('above');
    setState('default');
  
    // =========================================================================
    // Phase 02 資料與邏輯擴充
    // =========================================================================
    const phase02Queue = [
      "從客層與需求出發，我們與建設團隊共同推敲房型規劃、公設配置與室內格局，",
      "思考的不只是坪效與形式，而是人在其中如何行走、停留、收納與生活。",
      "從空間尺度、採光通風到日常使用，也將未來管理與維護納入思考，",
      "讓看得見與看不見的細節，都能兼顧生活需求與工程邏輯。",
      "把使用者的聲音帶進圖紙裡，讓設計真正回應生活。"
    ];

    const phase02Pages = [
      {
        pageIndex: 1,
        titleCn: "房型規劃",
        titleEn: "TYPOLOGY",
        highlightWord: "房型規劃",
        sentenceIndex: 0,
        img: "card_09.avif",
        nextImg: "card_10.avif",
        caption: "房型規劃，是對不同生活方式的回應。有人需要小而精準的空間，也有人期待更寬裕、能承接未來變化的生活尺度。我們從客層、生活習慣與真實需求出發，在坪數、機能與舒適度之間找到平衡，讓房型真正符合居住者的生活。"
      },
      {
        pageIndex: 2,
        titleCn: "公設配置",
        titleEn: "COMMON AREAS",
        highlightWord: "公設配置",
        sentenceIndex: 0,
        img: "card_10.avif",
        nextImg: "card_11.avif",
        caption: "公設不是制式設備的堆疊，而是生活的延伸。從住戶的年齡、需求與使用習慣出發，規劃真正會被使用的空間，同時考慮交屋後的管理與維護。讓每一項公設不只好看，也能長久、實用地陪伴生活。"
      },
      {
        pageIndex: 3,
        titleCn: "室內格局",
        titleEn: "LAYOUT",
        highlightWord: "室內格局",
        sentenceIndex: 0,
        img: "card_11.avif",
        nextImg: "card_09.avif",
        caption: "格局，決定生活如何在空間裡流動。我們從居住者的角度檢視動線、採光、尺度與空間關係，思考每一道牆、每一個轉角是否符合真實使用。讓格局不只成立於圖面，也真正成立於每天的生活。"
      }
    ];
    phase02Pages.forEach(p => { p.img = asset(p.img); p.nextImg = asset(p.nextImg); });

    let currentPhase2State = 'default';
    let currentSentenceIndex2 = null;
    let cardRoles2 = { main: 0, sub: 1, spare: 2 };
    let isTransitioning2 = false;

    // =========================================================================
    // Phase 03 資料與邏輯擴充 (工藝淬煉 ELEVATE)
    // =========================================================================
    const phase03Queue = [
      "我們與建設團隊一起梳理產品與品牌，透過品牌語言說清楚建築想傳遞的精神；",
      "以沉浸式行銷的體驗設計，讓未來生活從想像變成感受；",
      "再結合媒體策略與互動溝通，讓訊息不只是被看見，也能產生理解與回應。",
      "從產品特色、空間規劃到購屋資訊，我們選擇清楚、坦白而有感的方式溝通，",
      "不以誇張話術包裝，而是讓專案回到自身的價值。",
      "當內容真實、語言動人，價值自然會被感知，也被認同。"
    ];

    const phase03Pages = [
      {
        pageIndex: 1,
        titleCn: "品牌語言",
        titleEn: "BRAND NARRATIVE",
        highlightWord: "品牌語言",
        sentenceIndex: 0,
        img: "card_12.avif",
        nextImg: "card_13.avif",
        caption: "品牌語言不是口號，而是品牌與市場溝通的方式。我們從品牌核心出發，將理念轉化為清楚、貼近人的文字與敘事，讓理性的產品資訊與感性的生活想像自然連結。讓品牌想說的話，更準確地被理解。"
      },
      {
        pageIndex: 2,
        titleCn: "沉浸式行銷的體驗設計",
        titleEn: "IMMERSIVE",
        highlightWord: "沉浸式行銷的體驗設計",
        sentenceIndex: 1,
        img: "card_13.avif",
        nextImg: "card_14.avif",
        caption: "沉浸式行銷，是讓購屋者更具體地感受未來生活。從接待中心的光線、音樂、氣味，到參觀動線、模型、展牆、材質與陳設，每一個細節都影響品牌感受。我們協助建設團隊逐一檢視與調整，讓空間體驗、產品特色與品牌質感保持一致，也讓購屋者更容易走進建築所描繪的生活。"
      },
      {
        pageIndex: 3,
        titleCn: "媒體策略",
        titleEn: "STRATEGY",
        highlightWord: "媒體策略",
        sentenceIndex: 2,
        img: "card_14.avif",
        nextImg: "card_15.avif",
        caption: "不同的內容，需要不同的方式被看見。從平面廣告、社群內容、影片、官網到數位互動，我們依照受眾與平台特性安排媒體策略。透過流量與內容數據持續觀察成效，調整內容與投放方向，讓每一次溝通都更精準、更有效。"
      },
      {
        pageIndex: 4,
        titleCn: "互動溝通",
        titleEn: "COMMUNICATION",
        highlightWord: "互動溝通",
        sentenceIndex: 2,
        img: "card_15.avif",
        nextImg: "card_12.avif",
        caption: "互動溝通，從傾聽開始。透過現場對談、社群留言、問卷與各種接觸點，理解消費者對生活與家的期待，再將這些回饋轉化為建設團隊可以參考的方向。同時，也將品牌的理念清楚傳回市場，讓建設方、消費者與我們之間形成持續而良性的溝通。"
      }
    ];
    phase03Pages.forEach(p => { p.img = asset(p.img); p.nextImg = asset(p.nextImg); });

    let currentPhase3State = 'default';
    let currentSentenceIndex3 = null;
    let cardRoles3 = { main: 0, sub: 1, spare: 2 };
    let isTransitioning3 = false;

    // =========================================================================
    // Phase 04 資料與邏輯擴充 (鑽石綻放 SHINE)
    // =========================================================================
    const phase04Queue = [
      "透過專業的驗屋服務，協助建設團隊把關交付品質；",
      "並進一步建立修繕通報機制、協助規劃說明會與區權會，以及建立社區總體營造，",
      "讓建設方與住戶之間的溝通更即時、透明，也讓服務持續發生。",
      "我們相信，售後不是一個流程的結束，而是品牌與住戶建立長久關係的開始。",
      "每一次被理解的需求、每一次妥善的回應，都在累積一個品牌最難取代的價值——信任。"
    ];

    const phase04Pages = [
      {
        pageIndex: 1,
        titleCn: "驗屋服務",
        titleEn: "INSPECTION",
        highlightWord: "驗屋服務",
        sentenceIndex: 0,
        img: "card_16.avif",
        nextImg: "card_17.avif",
        caption: "以中立角度與專業儀器，逐項檢視工程品質與交屋細節。除了協助建設團隊把關品質，也讓購屋者更安心理解新家的狀況。讓驗屋成為建設方與住戶之間建立信任的一座橋樑。"
      },
      {
        pageIndex: 2,
        titleCn: "建立修繕通報機制",
        titleEn: "MAINTENANCE",
        highlightWord: "建立修繕通報機制",
        sentenceIndex: 1,
        img: "card_17.avif",
        nextImg: "card_18.avif",
        caption: "透過修繕管理平台，串聯住戶、物業與建設團隊。讓問題可以即時回報，維修進度與紀錄清楚可追蹤，也讓每一個反饋都被完整留下。對住戶而言，是更安心的服務；對建設團隊而言，也能持續了解實際居住後的需求。"
      },
      {
        pageIndex: 3,
        titleCn: "說明會與區權會",
        titleEn: "MEETING",
        highlightWord: "說明會與區權會",
        sentenceIndex: 1,
        img: "card_18.avif",
        nextImg: "card_19.avif",
        caption: "協助建設團隊規劃與主持各類說明會及區權會，清楚說明社區規劃、管理方式與住戶權益。透過透明的資訊與耐心溝通，減少理解落差，也讓建設方的專業與用心被住戶真正感受到。"
      },
      {
        pageIndex: 4,
        titleCn: "建立社區總體營造",
        titleEn: "COMMUNITY",
        highlightWord: "建立社區總體營造",
        sentenceIndex: 1,
        img: "card_19.avif",
        nextImg: "card_16.avif",
        caption: "一個社區的形成，不只來自建築，也來自人與人之間的關係。從公共空間、管理制度到社區活動，我們協助建設團隊建立更完整的生活體驗，讓住戶有更多交流與參與的機會。讓品牌價值從交屋延伸進日常，逐漸形成真正能被感受、被信任的社區關係。"
      }
    ];
    phase04Pages.forEach(p => { p.img = asset(p.img); p.nextImg = asset(p.nextImg); });

    let currentPhase4State = 'default';
    let currentSentenceIndex4 = null;
    let cardRoles4 = { main: 0, sub: 1, spare: 2 };
    let isTransitioning4 = false;

    // 取得 Phase 02 精確吸附停駐點 (相容桌面、平板 zoom 0.72 與手機)
    // =========================================================================
    // 方案 A：實體 Snap 錨點 ⇄ 區塊狀態同步
    // - 滾動完全交給瀏覽器原生 scroll-snap (mandatory + snap-stop: always)
    // - JS 只負責「目前停在哪個錨點」→ 套用對應狀態，不再攔截 wheel / touch
    // =========================================================================
    let programmaticScroll = false;
    let desktopPagingTarget=null;

    let programmaticTimer = null;

    
    function isMobileView() {
      return document.getElementById('canvasViewportWrapper').classList.contains('viewport-mobile');
    }

    function getAnchors() {
      return Array.from(document.querySelectorAll('.snap-anchor')).filter(a => a.offsetParent !== null);
    }

    function getAnchor(phase, kind) {
      return getAnchors().find(a => a.dataset.phase === String(phase) && a.dataset.kind === kind) || null;
    }

    function anchorScrollTop(anchor) {
      return Math.round(anchor.getBoundingClientRect().top + window.scrollY - navHeight);
    }

    function getNearestAnchor() {
      const reading=outerReadingAnchor();if(reading)return reading;
      const st = window.scrollY;
      let best = null, bestD = Infinity;
      getAnchors().forEach(a => {
        const d = Math.abs(anchorScrollTop(a) - st);
        if (d < bestD) { bestD = d; best = a; }
      });
      return best;
    }

    function kindForPhase1State(st) {
      if (typeof st === 'number') return 'page';
      if (st === '01-1') return isMobileView() ? 'intro' : 'default';
      return 'default';
    }
    function kindForPhase2State(st) {
      if (typeof st === 'number') return 'page';
      if (st === '02-1') return isMobileView() ? 'intro' : 'default';
      return 'default';
    }
    function kindForPhase3State(st) {
      if (typeof st === 'number') return 'page';
      if (st === '03-1') return isMobileView() ? 'intro' : 'default';
      return 'default';
    }
    function kindForPhase4State(st) {
      if (typeof st === 'number') return 'page';
      if (st === '04-1') return isMobileView() ? 'intro' : 'default';
      return 'default';
    }

    function scrollToAnchor(phase, kind, behavior) {
      const anchor = getAnchor(phase, kind) || getAnchor(phase, 'default');
      if (!anchor) return;
      const top = anchorScrollTop(anchor);
      if (Math.abs(window.scrollY - top) < 2) return;
      programmaticScroll = true;
      document.documentElement.classList.remove('ps-snap');
      clearTimeout(programmaticTimer);
      programmaticTimer = setTimeout(endProgrammaticScroll, 900);
      window.scrollTo({ top, behavior: behavior || 'smooth' });
    }

    function endProgrammaticScroll() {

      clearTimeout(programmaticTimer);
      programmaticScroll = false;
      lastManualStateTime=0;
      applyAnchorState();
    }

    function scrollToPhase(phaseId) {
      lastManualStateTime = Date.now() + 1000;
      if (phaseId === 'phase-01') {
        scrollToAnchor(1, kindForPhase1State(currentState));
      } else if (phaseId === 'phase-02') {
        scrollToAnchor(2, kindForPhase2State(currentPhase2State));
      } else if (phaseId === 'phase-03') {
        scrollToAnchor(3, kindForPhase3State(currentPhase3State));
      } else if (phaseId === 'phase-04') {
        scrollToAnchor(4, kindForPhase4State(currentPhase4State));
      }
    }

    // 依「目前停靠的錨點」套用狀態 (冪等：狀態已正確則不動作)
    let applyRetryTimer = null;
    function applyAnchorState() {
      if(desktopPagingTarget||programmaticScroll||document.documentElement.classList.contains('snap-disabled'))return;
      const sectionBounds=root.getBoundingClientRect();if(sectionBounds.top>navHeight+2||sectionBounds.bottom<=navHeight+2)return;

      if(Date.now()<lastManualStateTime){clearTimeout(applyRetryTimer);applyRetryTimer=setTimeout(applyAnchorState,lastManualStateTime-Date.now()+20);return;}
      const a = getNearestAnchor();
      if (!a) return;
      const phase = a.dataset.phase;
      const kind = a.dataset.kind;
      let ok = true;

      if (phase === '1') {
        if (kind === 'default') {
          // 桌面/平板沒有 Intro 錨點：'01-1' 視同首頁
          const accept = currentState === 'default' || (!isMobileView() && currentState === '01-1');
          if (!accept) setState('default');
          ok = currentState === 'default' || (!isMobileView() && currentState === '01-1');
        } else if (kind === 'intro') {
          if (currentState !== '01-1') setState('01-1');
          ok = currentState === '01-1';
        } else if (kind === 'page') {
          // 已在某分頁 (例如手動翻到 03) 就保留，不強制回 01
          if(isMobileView()&&currentState==='default')setState('01-1');
          else if (typeof currentState !== 'number') setState(selectedPages[0]);
          ok = typeof currentState === 'number';
        }
      } else if (phase === '2') {
        if (kind === 'default') {
          const accept = currentPhase2State === 'default' || (!isMobileView() && currentPhase2State === '02-1');
          if (!accept) setPhase2State('default');
          ok = currentPhase2State === 'default' || (!isMobileView() && currentPhase2State === '02-1');
        } else if (kind === 'intro') {
          if (currentPhase2State !== '02-1') setPhase2State('02-1');
          ok = currentPhase2State === '02-1';
        } else if (kind === 'page') {
          if(isMobileView()&&currentPhase2State==='default')setPhase2State('02-1');
          else if (typeof currentPhase2State !== 'number') setPhase2State(selectedPages[1]);
          ok = typeof currentPhase2State === 'number';
        }
      } else if (phase === '3') {
        if (kind === 'default') {
          const accept = currentPhase3State === 'default' || (!isMobileView() && currentPhase3State === '03-1');
          if (!accept) setPhase3State('default');
          ok = currentPhase3State === 'default' || (!isMobileView() && currentPhase3State === '03-1');
        } else if (kind === 'intro') {
          if (currentPhase3State !== '03-1') setPhase3State('03-1');
          ok = currentPhase3State === '03-1';
        } else if (kind === 'page') {
          if(isMobileView()&&currentPhase3State==='default')setPhase3State('03-1');
          else if (typeof currentPhase3State !== 'number') setPhase3State(selectedPages[2]);
          ok = typeof currentPhase3State === 'number';
        }
      } else if (phase === '4') {
        if (kind === 'default') {
          const accept = currentPhase4State === 'default' || (!isMobileView() && currentPhase4State === '04-1');
          if (!accept) setPhase4State('default');
          ok = currentPhase4State === 'default' || (!isMobileView() && currentPhase4State === '04-1');
        } else if (kind === 'intro') {
          if (currentPhase4State !== '04-1') setPhase4State('04-1');
          ok = currentPhase4State === '04-1';
        } else if (kind === 'page') {
          if(isMobileView()&&currentPhase4State==='default')setPhase4State('04-1');
          else if (typeof currentPhase4State !== 'number') setPhase4State(selectedPages[3]);
          ok = typeof currentPhase4State === 'number';
        }
      }

      // setState 在卡片動畫中 (isTransitioning) 會被擋下：稍後重試，保證狀態與錨點一致
      if (!ok) {
        clearTimeout(applyRetryTimer);
        applyRetryTimer = setTimeout(applyAnchorState, 560);
      }
    }

    let scrollRaf = 0;
    let scrollSettleTimer = null;
    
    let scrollTicking = false;
    function handleWindowScroll() {
      if (scrollTicking) return;
      scrollTicking = true;
      requestAnimationFrame(() => {
        scrollTicking = false;
        const rootRect = root.getBoundingClientRect();
        const isInView = (rootRect.bottom > navHeight + 2 && rootRect.top <= navHeight + 2);
        root.classList.toggle('is-inview', isInView);

        // 控制 html.ps-snap：僅在進入此區塊範圍時開啟吸附
        const inSnapZone = (rootRect.top <= navHeight + 10 && rootRect.bottom >= window.innerHeight - 10);
        document.documentElement.classList.remove('ps-snap');

        if (!programmaticScroll && isInView) {
          clearTimeout(scrollSettleTimer);scrollSettleTimer=setTimeout(applyAnchorState,180);
        }
        updateCenterLineScroll();
        syncGlobalFixedComponentsPosition();
      });
    }

    function updateGlobalNavActivePhase(phase) {
      const items = [
        document.getElementById('globalNavItem1'),
        document.getElementById('globalNavItem2'),
        document.getElementById('globalNavItem3'),
        document.getElementById('globalNavItem4')
      ];
      const diamond = document.getElementById('globalNavDiamond');
      const activeItem = items[phase - 1];
      items.forEach((it, idx) => {
        if (it) it.classList.toggle('is-active', (idx + 1) === phase);
      });
      if (activeItem && diamond) {
        const itemTop = activeItem.offsetTop;
        const itemH = activeItem.offsetHeight || 24;
        const diamondH = diamond.offsetHeight || 7;
        const targetTop = itemTop + (itemH / 2) - (diamondH / 2);
        diamond.style.top = `${targetTop}px`;
      }

      // 手機專屬階梯 Nav
      const dots = [
        document.getElementById('phoneNavDot1'),
        document.getElementById('phoneNavDot2'),
        document.getElementById('phoneNavDot3'),
        document.getElementById('phoneNavDot4')
      ];
      dots.forEach((dot, idx) => {
        if (dot) dot.classList.toggle('is-active', (idx + 1) === phase);
      });
    }

    // 取得當前區塊相對於可視容器頂部的真實像素位移 (完全免疫 zoom/scale 誤差，平板與手機精準無誤)
    function getSectionViewportOffsets() {
      const stage = document.querySelector('.viewport-stage');
      const track1 = document.getElementById('trackPhase01') || document.getElementById('canvasFrame');
      const track2 = document.getElementById('trackPhase02') || document.getElementById('sectionPhase02');
      if (!track1 || !track2) return null;

      if (stage) {
        const stageRect = stage.getBoundingClientRect();
        const r1 = track1.getBoundingClientRect();
        const r2 = track2.getBoundingClientRect();
        return {
          stage,
          scrollTop: stage.scrollTop,
          offset1: r1.top - stageRect.top,
          offset2: r2.top - stageRect.top,
          height1: r1.height,
          height2: r2.height
        };
      } else {
        const r1 = track1.getBoundingClientRect();
        const r2 = track2.getBoundingClientRect();
        return {
          stage: null,
          scrollTop: window.scrollY || 0,
          offset1: r1.top,
          offset2: r2.top,
          height1: r1.height,
          height2: r2.height
        };
      }
    }

    // 視窗滾動偵測：動態平滑隨滾動填滿 Phase 1 ~ Phase 4 中軸線
    function updateCenterLineScroll() {
      const fill1 = document.getElementById('centerLineFill1');
      const fill2 = document.getElementById('centerLineFill2');
      const fill3 = document.getElementById('centerLineFill3');
      const fill4 = document.getElementById('centerLineFill4');

      const a1Default = getAnchor(1, 'default');
      const a1Page = getAnchor(1, 'page');
      const a2Default = getAnchor(2, 'default');
      const a2Page = getAnchor(2, 'page');
      const a3Default = getAnchor(3, 'default');
      const a3Page = getAnchor(3, 'page');
      const a4Default = getAnchor(4, 'default');
      const a4Page = getAnchor(4, 'page');

      if (a1Default && a1Page && a2Default) {
        const st = window.scrollY;
        const s1Home = anchorScrollTop(a1Default);
        const s1Page = anchorScrollTop(a1Page);
        const s2Home = anchorScrollTop(a2Default);
        const s2Page = a2Page ? anchorScrollTop(a2Page) : (s2Home + 420);
        const s3Home = a3Default ? anchorScrollTop(a3Default) : (s2Page + 420);
        const s3Page = a3Page ? anchorScrollTop(a3Page) : (s3Home + 420);
        const s4Home = a4Default ? anchorScrollTop(a4Default) : (s3Page + 420);
        const s4Page = a4Page ? anchorScrollTop(a4Page) : (s4Home + 420);

        const diamondRatio = 656 / 1048; // ≈ 0.626

        // Phase 1 線段 (長度 392px，從菱形 y=656px 填至底部 y=1048px)
        let p1 = 0;
        if (st <= s1Home) {
          p1 = 0;
        } else if (st >= s1Page) {
          p1 = 1;
        } else {
          p1 = Math.min(Math.max((st - s1Home) / (s1Page - s1Home), 0), 1);
        }
        if (fill1) fill1.style.transform = `scaleY(${p1})`;

        // Phase 2 線段 (全長 1048px，置頂 y=0 接續 Phase 1 底部，中段 y=656px 為菱形錨點)
        let p2 = 0;
        if (st <= s1Page) {
          p2 = 0;
        } else if (st < s2Home) {
          const progressToHome = (st - s1Page) / (s2Home - s1Page);
          p2 = Math.min(Math.max(progressToHome * diamondRatio, 0), diamondRatio);
        } else if (st <= s2Page) {
          const progressToPage = (st - s2Home) / (s2Page - s2Home);
          p2 = Math.min(Math.max(diamondRatio + progressToPage * (1 - diamondRatio), diamondRatio), 1);
        } else {
          p2 = 1;
        }
        if (fill2) fill2.style.transform = `scaleY(${p2})`;

        // Phase 3 線段
        let p3 = 0;
        if (st <= s2Page) {
          p3 = 0;
        } else if (st < s3Home) {
          const progressToHome = (st - s2Page) / (s3Home - s2Page);
          p3 = Math.min(Math.max(progressToHome * diamondRatio, 0), diamondRatio);
        } else if (st <= s3Page) {
          const progressToPage = (st - s3Home) / (s3Page - s3Home);
          p3 = Math.min(Math.max(diamondRatio + progressToPage * (1 - diamondRatio), diamondRatio), 1);
        } else {
          p3 = 1;
        }
        if (fill3) fill3.style.transform = `scaleY(${p3})`;

        // The final connector ends at Phase 4's diamond (y=656).
        // Fill this shortened segment while travelling from Phase 3 to Phase 4.
        const p4 = st <= s3Page ? 0 : st >= s4Home ? 1
          : Math.min(Math.max((st - s3Page) / (s4Home - s3Page), 0), 1);
        if (fill4) fill4.style.transform = `scaleY(${p4})`;
      }

      // 當滾動進入各 Phase 視野時，焦點切換至對應 Phase
      const nearest = getNearestAnchor();
      let activePhase = 1;
      if (nearest) {
        activePhase = parseInt(nearest.dataset.phase, 10) || 1;
      }
      updateGlobalNavActivePhase(activePhase);

      // 同步全域左上角固定組件 (支援 cross-fade 與 Default ➔ Page 過渡)
      let isPage = false;
      if (activePhase === 1) {
        isPage = !(currentState === 'default' || currentState === '01-1');
      } else if (activePhase === 2) {
        isPage = !(currentPhase2State === 'default' || currentPhase2State === '02-1');
      } else if (activePhase === 3) {
        isPage = !(currentPhase3State === 'default' || currentPhase3State === '03-1');
      } else if (activePhase === 4) {
        isPage = !(currentPhase4State === 'default' || currentPhase4State === '04-1');
      }
      updateGlobalTopLeftBadge(activePhase, isPage);
    }

    // 平板與手機端：卡片左右滑動換頁 (Pointer & Touch Swipe)
    function setupCardSwipeGestures() {
      const next=[nextPage,nextPage2,nextPage3,nextPage4],prev=[prevPage,prevPage2,prevPage3,prevPage4];
      for(let phase=1;phase<=4;phase++){
        const el=document.getElementById('cardsStackContainer'+(phase===1?'':phase));
        if(!el)continue;
        let gesture=null;
        el.querySelectorAll('img').forEach(img=>{img.draggable=false;});
        el.addEventListener('dragstart',event=>event.preventDefault());
        el.addEventListener('pointerdown',event=>{
          if(event.isPrimary===false || gesture || (event.pointerType==='mouse'&&event.button!==0))return;
          if(event.target.closest('button,a'))return;
          gesture={id:event.pointerId,x:event.clientX,y:event.clientY,axis:null};
          el.setPointerCapture(event.pointerId);
        });
        el.addEventListener('pointermove',event=>{
          if(!gesture||gesture.id!==event.pointerId)return;
          const dx=event.clientX-gesture.x,dy=event.clientY-gesture.y;
          if(!gesture.axis&&Math.max(Math.abs(dx),Math.abs(dy))>=10)gesture.axis=Math.abs(dx)>Math.abs(dy)*1.2?'x':'y';
          if(gesture.axis==='x'){el.classList.add('is-dragging');if(event.cancelable)event.preventDefault();}
        });
        function finish(event,cancelled){
          if(!gesture||gesture.id!==event.pointerId)return;
          const g=gesture;gesture=null;el.classList.remove('is-dragging');
          if(el.hasPointerCapture(event.pointerId))el.releasePointerCapture(event.pointerId);
          if(cancelled)return;
          const dx=event.clientX-g.x,dy=event.clientY-g.y;
          const threshold=Math.max(24,Math.min(64,el.getBoundingClientRect().width*0.12));
          if(g.axis!=='y'&&Math.abs(dx)>=threshold&&Math.abs(dx)>Math.abs(dy)*1.2){
            const state=[currentState,currentPhase2State,currentPhase3State,currentPhase4State][phase-1];
            const count=[8,3,4,4][phase-1];
            if(typeof state==='number'&& (dx<0?state<count:state>1))(dx<0?next:prev)[phase-1]();
          }
        }
        el.addEventListener('pointerup',event=>finish(event,false));
        el.addEventListener('pointercancel',event=>finish(event,true));
        el.addEventListener('lostpointercapture',event=>finish(event,true));
      }
    }
    window.addEventListener('scrollend',()=>{clearTimeout(scrollSettleTimer);if(programmaticScroll)endProgrammaticScroll();else applyAnchorState();},{passive:true});
    window.addEventListener('wheel',event=>{if(programmaticScroll&&!event.defaultPrevented)endProgrammaticScroll();},{passive:true});
    window.addEventListener('pointerdown',()=>{if(programmaticScroll)endProgrammaticScroll();},{passive:true});

    function initSentenceTracks2() {
      const wrapper = document.getElementById('sentenceTracksWrapper2');
      if (!wrapper || wrapper.children.length > 0) return;
      wrapper.innerHTML = '';
      phase02Queue.forEach((text, i) => {
        const div = document.createElement('div');
        div.className = 'sentence-track is-upcoming';
        div.id = `sentenceTrack2_${i}`;
        div.dataset.idx = i;
        div.innerText = text;
        wrapper.appendChild(div);
      });
    }

    function setPhase2State(st) {
      lastManualStateTime = Date.now() + 600;
      if (isTransitioning2) return;
      const prevSt = currentPhase2State;
      if (prevSt === st) return;
      const storyFrame=document.getElementById('sectionPhase02');
      const storySnapshots=captureStoryTransition(storyFrame,st,prevSt);

      currentPhase2State = st;
      document.getElementById('sectionPhase02').dataset.psState = typeof st === 'number' ? 'page' : st === 'default' ? 'default' : 'intro';
      if(typeof st === 'number') selectedPages[1]=st;
      updateCardControls(2,st);

      const wrapper = document.getElementById('canvasViewportWrapper');
      if (wrapper) wrapper.classList.toggle('state-intro-p2', st === '02-1');

      const bgDefaultCurve = document.getElementById('bgDefaultCurve2');
      const bgPageEllipse = document.getElementById('bgPageEllipse2');
      const sideRockIcon = document.getElementById('sideRockIcon2');
      const phaseVerticalTag = document.getElementById('phaseVerticalTag2');
      const defaultContent = document.getElementById('defaultContent2');
      const defaultVisual = document.getElementById('defaultVisual2');
      const pageContent = document.getElementById('pageContent2');
      const reelIndicator = document.getElementById('reelIndicator2');
      const reelNavButtons = document.getElementById('reelNavButtons2');
      const cardMetaHeader = document.getElementById('cardMetaHeader2');
      const cardsStackContainer = document.getElementById('cardsStackContainer2');
      const cardCaptionDesc = document.getElementById('cardCaptionDesc2');

      const isTargetHomeOrIntro = (st === 'default' || st === '02-1');
      const wasHomeOrIntro = (prevSt === 'default' || prevSt === '02-1');
      // 更新全域左上角固定組件 (Phase 02)
      updateGlobalTopLeftBadge(2, !isTargetHomeOrIntro);

      if (isTargetHomeOrIntro) {
        currentSentenceIndex2 = null;
        if (bgDefaultCurve) bgDefaultCurve.classList.remove('is-hidden');
        if (bgPageEllipse) bgPageEllipse.classList.remove('is-active');
        if (sideRockIcon) sideRockIcon.classList.remove('is-active');
        if (phaseVerticalTag) phaseVerticalTag.classList.add('is-default');

        if (defaultContent) defaultContent.classList.remove('is-hidden');
        if (defaultVisual) defaultVisual.classList.remove('is-hidden');

        if (pageContent) pageContent.classList.add('is-hidden');
        if (reelIndicator) reelIndicator.classList.add('is-hidden');
        if (reelNavButtons) reelNavButtons.classList.add('is-hidden');
        if (cardMetaHeader) cardMetaHeader.classList.add('is-hidden');
        if (cardsStackContainer) cardsStackContainer.classList.add('is-hidden');
        if (cardCaptionDesc) cardCaptionDesc.classList.add('is-hidden');
      } else {
        if (bgDefaultCurve) bgDefaultCurve.classList.add('is-hidden');
        if (bgPageEllipse) bgPageEllipse.classList.add('is-active');
        if (sideRockIcon) sideRockIcon.classList.add('is-active');
        if (phaseVerticalTag) phaseVerticalTag.classList.remove('is-default');

        if (defaultContent) defaultContent.classList.add('is-hidden');
        if (defaultVisual) defaultVisual.classList.add('is-hidden');

        if (pageContent) pageContent.classList.remove('is-hidden');
        if (reelIndicator) reelIndicator.classList.remove('is-hidden');
        if (reelNavButtons) reelNavButtons.classList.remove('is-hidden');
        if (cardMetaHeader) cardMetaHeader.classList.remove('is-hidden');
        if (cardsStackContainer) cardsStackContainer.classList.remove('is-hidden');
        if (cardCaptionDesc) cardCaptionDesc.classList.remove('is-hidden');

        let dir = 0;
        if (!wasHomeOrIntro && typeof prevSt === 'number' && typeof st === 'number') {
          dir = st > prevSt ? 1 : -1;
        }
        renderPage2(st, prevSt, dir);
      }
      finishStoryTransition(storyFrame,2,st,prevSt,storySnapshots);
    }

    function renderQuotes2(toPage, fromPage, direction = 0) {
      // Keep desktop text at the same quote anchor on every card.
      if(window.innerWidth>=1200)direction=0;
      initSentenceTracks2();
      const toData = phase02Pages[toPage - 1];
      const targetSentenceIdx = toData.sentenceIndex;
      const targetHighlightWord = toData.highlightWord;
      const isMobile = document.getElementById('canvasViewportWrapper').classList.contains('viewport-mobile');
      const isTablet = document.getElementById('canvasViewportWrapper').classList.contains('viewport-tablet');

      const quoteToQueueGap = isTablet
        ? (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--tab-quote-to-queue-gap')) || 33)
        : (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--quote-to-queue-gap')) || 54);
      const queueItemGap = isTablet
        ? (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--tab-queue-item-gap')) || 12)
        : (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--queue-item-gap')) || 20);
      const extraLineH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--line-note-extra-h')) || 0;
      const lineNote = document.getElementById('reelLineNote2');

      const activeH = measureTrackFinalHeight(phase02Queue[targetSentenceIdx], targetHighlightWord, isMobile, isTablet);

      if (isMobile) {
        const baseH = 80;
        const pushY = Math.max(0, activeH - baseH);
        document.getElementById('sectionPhase02').style.setProperty('--mob-quote-push-y', `${pushY}px`);
      } else {
        document.getElementById('sectionPhase02').style.setProperty('--mob-quote-push-y', '0px');
      }

      function updateLineNote() {
        if (lineNote) {
          lineNote.style.top = '0px';
          lineNote.style.height = `${activeH + 5 + extraLineH}px`;
        }
      }

      function updateUpcomingQueue(withTransition = true) {
        if (!isMobile) {
          let nextY = activeH + quoteToQueueGap;
          for (let i = targetSentenceIdx + 1; i < phase02Queue.length; i++) {
            const track = document.getElementById(`sentenceTrack2_${i}`);
            if (track) {
              track.className = 'sentence-track is-upcoming';
              track.style.display = '';
              track.innerText = phase02Queue[i];
              track.style.opacity = '0.75';
              if (withTransition) {
                track.style.transition = 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.35s ease';
              } else {
                track.style.transition = 'none';
              }
              track.style.transform = `translateY(${nextY}px)`;
              const trackH = track.offsetHeight || 52;
              nextY += trackH + queueItemGap;
            }
          }
        }
      }

      // 1. 初次載入或由首頁/Intro進入
      if (direction === 0 || currentSentenceIndex2 === null) {
        currentSentenceIndex2 = targetSentenceIdx;
        for (let i = 0; i < phase02Queue.length; i++) {
          const track = document.getElementById(`sentenceTrack2_${i}`);
          if (!track) continue;
          track.style.transition = 'none';

          if (i === targetSentenceIdx) {
            track.className = 'sentence-track is-active';
            track.innerHTML = makeHighlightHTML(phase02Queue[i], targetHighlightWord);
            track.style.transform = 'translateY(0px)';
            track.style.opacity = '1';
          } else if (i < targetSentenceIdx) {
            track.className = 'sentence-track is-past';
            track.innerText = phase02Queue[i];
            track.style.transform = `translateY(${(i - targetSentenceIdx) * 60 - 30}px) scale(0.85)`;
            track.style.opacity = '0';
          } else {
            track.className = 'sentence-track is-upcoming';
            track.innerText = phase02Queue[i];
            track.style.opacity = isMobile ? '0' : '0.75';
          }
        }

        updateLineNote();
        updateUpcomingQueue(false);

        setTimeout(() => {
          for (let i = 0; i < phase02Queue.length; i++) {
            const track = document.getElementById(`sentenceTrack2_${i}`);
            if (track) track.style.transition = '';
          }
        }, 50);
        return;
      }

      // 2. 同一句段落內的分頁切換
      if (targetSentenceIdx === currentSentenceIndex2) {
        const activeTrack = document.getElementById(`sentenceTrack2_${currentSentenceIndex2}`);
        if (activeTrack) {
          activeTrack.innerHTML = makeHighlightHTML(phase02Queue[currentSentenceIndex2], targetHighlightWord);
          updateLineNote();
        }
        updateUpcomingQueue(true);
        return;
      }

      // 3. 段落更換
      const oldIdx = currentSentenceIndex2;
      currentSentenceIndex2 = targetSentenceIdx;

      if (isMobile) {
        const oldTrack = document.getElementById(`sentenceTrack2_${oldIdx}`);
        const newTrack = document.getElementById(`sentenceTrack2_${targetSentenceIdx}`);

        if (oldTrack) {
          animateLeavingQuote(oldTrack);oldTrack.classList.remove('is-active');oldTrack.classList.add('is-past');
          oldTrack.style.transition = 'transform 0.42s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.35s ease';
          oldTrack.style.transform = direction === 1 ? 'translateY(-36px)' : 'translateY(36px)';
          oldTrack.style.opacity = '0';
        }

        if (newTrack) {
          newTrack.className = 'sentence-track is-active';
          newTrack.innerHTML = makeHighlightHTML(phase02Queue[targetSentenceIdx], targetHighlightWord);
          newTrack.style.transition = 'none';
          newTrack.style.transform = direction === 1 ? 'translateY(36px)' : 'translateY(-36px)';
          newTrack.style.opacity = '0';
          newTrack.offsetWidth;

          newTrack.style.transition = 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.45s ease';
          newTrack.style.transform = 'translateY(0px)';
          newTrack.style.opacity = '1';
          if(isMobile)newTrack.animate([{opacity:0,transform:'translateY(24px)'},{opacity:1,transform:'translateY(0)'}],{duration:180,easing:'ease-out'});

          updateLineNote();
        }
        return;
      }

      const newActiveTrack = document.getElementById(`sentenceTrack2_${targetSentenceIdx}`);
      if (newActiveTrack) {
        newActiveTrack.className = 'sentence-track is-active';
        newActiveTrack.innerHTML = makeHighlightHTML(phase02Queue[targetSentenceIdx], targetHighlightWord);
        newActiveTrack.style.transform = 'translateY(0px)';
        newActiveTrack.style.opacity = '1';
      }

      for (let i = 0; i < targetSentenceIdx; i++) {
        const track = document.getElementById(`sentenceTrack2_${i}`);
        if (track) {
          track.className = 'sentence-track is-past';
          track.innerText = phase02Queue[i];
          track.style.transform = `translateY(${(i - targetSentenceIdx) * 60 - 30}px) scale(0.85)`;
          track.style.opacity = '0';
        }
      }

      updateLineNote();
      updateUpcomingQueue(true);
    }

    // Each phase independently suppresses its preview at the final page.
    let hasNextCard2 = true;

    function setSlotState2(slotIdx, state) {
      const slot = document.getElementById(`cardSlot${slotIdx}_2`);
      if (!slot) return;
      if (state === 'main') {
        slot.style.transform = 'translate(0, 0) scale(1)';
        slot.style.opacity = '1';
        slot.style.zIndex = '5';
        slot.style.pointerEvents = 'auto';
      } else if (state === 'sub') {
        slot.style.transformOrigin = 'top left';
        slot.style.transform = 'translate(var(--card-sub-x), var(--card-sub-y)) scale(var(--card-sub-scale))';
        slot.style.opacity = hasNextCard2 ? 'var(--card-sub-opacity)' : '0';
        slot.style.zIndex = '3';
        slot.style.pointerEvents = 'none';
      } else if (state === 'out-left') {
        slot.style.transform = 'translateX(-140px) scale(0.92)';
        slot.style.opacity = '0';
        slot.style.zIndex = '1';
        slot.style.pointerEvents = 'none';
      } else if (state === 'sub-enter') {
        slot.style.transformOrigin = 'top left';
        slot.style.transform = 'translate(calc(var(--card-sub-x) + 60px), var(--card-sub-y)) scale(var(--card-sub-scale))';
        slot.style.opacity = '0';
        slot.style.zIndex = '2';
        slot.style.pointerEvents = 'none';
      }
    }

    function resetCardSlots2(pageNum) {
      const p = (typeof pageNum === 'number' && pageNum >= 1 && pageNum <= 3) ? pageNum : 1;
      const pageData = phase02Pages[p - 1];
      hasNextCard2 = p < phase02Pages.length;
      const isMobile = document.getElementById('canvasViewportWrapper') && document.getElementById('canvasViewportWrapper').classList.contains('viewport-mobile');

      cardRoles2 = { main: 0, sub: 1, spare: 2 };
      const s0 = document.getElementById('cardSlot0_2');
      const s1 = document.getElementById('cardSlot1_2');
      const s2 = document.getElementById('cardSlot2_2');
      if (!s0 || !s1 || !s2) return;

      s0.style.transition = 'none';
      s1.style.transition = 'none';
      s2.style.transition = 'none';

      const img0 = document.getElementById('imgSlot0_2');
      const img1 = document.getElementById('imgSlot1_2');
      const img2 = document.getElementById('imgSlot2_2');
      if (img0) img0.src = pageData.img;
      if (img1) img1.src = pageData.nextImg;
      if (img2) img2.src = pageData.nextImg;

      if (isMobile) {
        s0.style.transform = 'translateX(0)';
        s0.style.opacity = '1';
        s0.style.zIndex = '5';
        s1.style.transform = 'translateX(100%)';
        s1.style.opacity = '0';
        s1.style.zIndex = '3';
        s2.style.transform = 'translateX(-100%)';
        s2.style.opacity = '0';
        s2.style.zIndex = '1';
      } else {
        setSlotState2(0, 'main');
        setSlotState2(1, 'sub');
        setSlotState2(2, 'out-left');
      }
    }

    function animateCardSlots2(fromPage, toPage, direction) {
      isTransitioning2 = true;
      const isMobile = document.getElementById('canvasViewportWrapper') && document.getElementById('canvasViewportWrapper').classList.contains('viewport-mobile');
      const toData = phase02Pages[toPage - 1];
      hasNextCard2 = toPage < phase02Pages.length;

      if (isMobile) {
        // 手機端：雙槽位橫向推移 (無疊加、無閃現)
        const slotMain = document.getElementById(`cardSlot${cardRoles2.main}_2`);
        const slotNext = document.getElementById(`cardSlot${cardRoles2.sub}_2`);
        const imgNext = document.getElementById(`imgSlot${cardRoles2.sub}_2`);

        if (imgNext) imgNext.src = toData.img;
        if (slotNext) {
          slotNext.style.transition = 'none';
          slotNext.style.transform = direction === 1 ? 'translateX(100%)' : 'translateX(-100%)';
          slotNext.style.opacity = '0';
          slotNext.style.zIndex = '5';
          slotNext.offsetWidth; // reflow
        }

        const easeMobile = 'transform 0.48s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.48s cubic-bezier(0.25, 1, 0.5, 1)';
        if (slotMain) slotMain.style.transition = easeMobile;
        if (slotNext) slotNext.style.transition = easeMobile;

        if (slotMain) {
          slotMain.style.transform = direction === 1 ? 'translateX(-100%)' : 'translateX(100%)';
          slotMain.style.opacity = '0';
        }
        if (slotNext) {
          slotNext.style.transform = 'translateX(0)';
          slotNext.style.opacity = '1';
        }

        queueCardAnimation(() => {
          if (slotMain) slotMain.style.transition = 'none';
          if (slotNext) slotNext.style.transition = 'none';
          const temp = cardRoles2.main;
          cardRoles2.main = cardRoles2.sub;
          cardRoles2.sub = temp;
          isTransitioning2 = false;
        }, 500);
        return;
      }

      // 桌面端與平板端：三槽位虛擬輪換 (原圖存在次要卡上，直接平滑位移放大至主卡，零閃爍零重疊！)
      const slotMain = document.getElementById(`cardSlot${cardRoles2.main}_2`);
      const slotSub = document.getElementById(`cardSlot${cardRoles2.sub}_2`);
      const slotSpare = document.getElementById(`cardSlot${cardRoles2.spare}_2`);
      const imgSpare = document.getElementById(`imgSlot${cardRoles2.spare}_2`);

      if (direction === 1) { // Next
        if (imgSpare) imgSpare.src = toData.nextImg;
        if (slotSpare) {
          slotSpare.style.transition = 'none';
          setSlotState2(cardRoles2.spare, 'sub-enter');
          slotSpare.offsetWidth; // reflow
        }

        const ease = '0.28s cubic-bezier(0.25, 1, 0.5, 1)';
        if (slotMain) slotMain.style.transition = `transform ${ease}, opacity ${ease}`;
        if (slotSub) slotSub.style.transition = `transform ${ease}, opacity ${ease}`;
        if (slotSpare) slotSpare.style.transition = `transform ${ease}, opacity ${ease}`;

        // slotMain 滑出左側
        setSlotState2(cardRoles2.main, 'out-left');
        // slotSub 平滑放大位移至主要位置
        setSlotState2(cardRoles2.sub, 'main');
        // slotSpare 滑入次要位置
        setSlotState2(cardRoles2.spare, 'sub');

        queueCardAnimation(() => {
          if (slotMain) slotMain.style.transition = 'none';
          if (slotSub) slotSub.style.transition = 'none';
          if (slotSpare) slotSpare.style.transition = 'none';
          const oldMain = cardRoles2.main;
          cardRoles2.main = cardRoles2.sub;
          cardRoles2.sub = cardRoles2.spare;
          cardRoles2.spare = oldMain;
          isTransitioning2 = false;
        }, 300);

      } else { // Prev
        if (imgSpare) imgSpare.src = toData.img;
        if (slotSpare) {
          slotSpare.style.transition = 'none';
          setSlotState2(cardRoles2.spare, 'out-left');
          slotSpare.style.zIndex = '5';
          slotSpare.offsetWidth; // reflow
        }

        const ease = '0.28s cubic-bezier(0.25, 1, 0.5, 1)';
        if (slotMain) slotMain.style.transition = `transform ${ease}, opacity ${ease}`;
        if (slotSub) slotSub.style.transition = `opacity 0.35s ease`;
        if (slotSpare) slotSpare.style.transition = `transform ${ease}, opacity ${ease}`;

        setSlotState2(cardRoles2.main, 'sub');
        setSlotState2(cardRoles2.spare, 'main');
        if (slotSub) slotSub.style.opacity = '0';

        queueCardAnimation(() => {
          if (slotMain) slotMain.style.transition = 'none';
          if (slotSub) slotSub.style.transition = 'none';
          if (slotSpare) slotSpare.style.transition = 'none';
          const newSubImg = document.getElementById(`imgSlot${cardRoles2.main}_2`);
          if (newSubImg) newSubImg.src = toData.nextImg;
          const oldSub = cardRoles2.sub;
          cardRoles2.sub = cardRoles2.main;
          cardRoles2.main = cardRoles2.spare;
          cardRoles2.spare = oldSub;
          isTransitioning2 = false;
        }, 300);
      }
    }

    function dissolveTextHeaders2(toPage) {
      const pageData = phase02Pages[toPage - 1];
      const textElems = [
        document.getElementById('currPageNum2'),
        document.getElementById('cardCatCn2'),
        document.getElementById('cardCatEn2'),
        document.getElementById('cardCaptionDesc2')
      ];

      textElems.forEach(el => {
        if (el) {
          el.classList.add('text-dissolve-out');
          el.classList.remove('text-dissolve-in');
        }
      });

      setTimeout(() => {
        const numEl = document.getElementById('currPageNum2');
        if (numEl) numEl.innerText = `0${toPage}`;
        const cnEl = document.getElementById('cardCatCn2');
        if (cnEl) cnEl.innerText = pageData.titleCn;
        const enEl = document.getElementById('cardCatEn2');
        if (enEl) enEl.innerText = pageData.titleEn;
        const descEl = document.getElementById('cardCaptionDesc2');
        if (descEl) descEl.innerText = pageData.caption;

        textElems.forEach(el => {
          if (el) {
            el.classList.remove('text-dissolve-out');
            el.classList.add('text-dissolve-in');
          }
        });

        setTimeout(() => {
          textElems.forEach(el => {
            if (el) el.classList.remove('text-dissolve-in');
          });
        }, 320);
      }, 160);
    }

    function renderPage2(toPage, fromPage, direction = 0) {
      const pageData = phase02Pages[toPage - 1];

      if (direction !== 0 && typeof fromPage === 'number') {
        animateCardSlots2(fromPage, toPage, direction);
        renderQuotes2(toPage, fromPage, direction);
        dissolveTextHeaders2(toPage);
      } else {
        resetCardSlots2(toPage);
        renderQuotes2(toPage, fromPage, 0);
        const numEl = document.getElementById('currPageNum2');
        if (numEl) numEl.innerText = `0${toPage}`;
        const cnEl = document.getElementById('cardCatCn2');
        if (cnEl) cnEl.innerText = pageData.titleCn;
        const enEl = document.getElementById('cardCatEn2');
        if (enEl) enEl.innerText = pageData.titleEn;
        const descEl = document.getElementById('cardCaptionDesc2');
        if (descEl) descEl.innerText = pageData.caption;
      }
    }

    function prevPage2() {
      const isMobile = document.getElementById('canvasViewportWrapper') && document.getElementById('canvasViewportWrapper').classList.contains('viewport-mobile');
      if (currentPhase2State === 1) {
        setPhase2State(isMobile ? '02-1' : 'default');
        scrollToPhase('phase-02');
        return;
      }
      if (currentPhase2State === '02-1') {
        setPhase2State('default');
        scrollToPhase('phase-02');
        return;
      }
      if (typeof currentPhase2State === 'number' && currentPhase2State > 1) {
        setPhase2State(currentPhase2State - 1);
      }
    }

    function nextPage2() {
      const isMobile = document.getElementById('canvasViewportWrapper') && document.getElementById('canvasViewportWrapper').classList.contains('viewport-mobile');
      if (currentPhase2State === 'default') {
        setPhase2State(isMobile ? '02-1' : 1);
        scrollToPhase('phase-02');
        return;
      }
      if (currentPhase2State === '02-1') {
        setPhase2State(1);
        scrollToPhase('phase-02');
        return;
      }
      if (typeof currentPhase2State === 'number' && currentPhase2State < 3) {
        setPhase2State(currentPhase2State + 1);
      }
    }
    
    // =========================================================================
    // Phase 03 控制器邏輯
    // =========================================================================
    function initSentenceTracks3() {
      const wrapper = document.getElementById('sentenceTracksWrapper3');
      if (!wrapper || wrapper.children.length > 0) return;
      wrapper.innerHTML = '';
      phase03Queue.forEach((text, i) => {
        const div = document.createElement('div');
        div.className = 'sentence-track is-upcoming';
        div.id = `sentenceTrack3_${i}`;
        div.dataset.idx = i;
        div.innerText = text;
        wrapper.appendChild(div);
      });
    }

    function setPhase3State(st) {
      lastManualStateTime = Date.now() + 600;
      if (isTransitioning3) return;
      const prevSt = currentPhase3State;
      if (prevSt === st) return;
      const storyFrame=document.getElementById('sectionPhase03');
      const storySnapshots=captureStoryTransition(storyFrame,st,prevSt);

      currentPhase3State = st;
      document.getElementById('sectionPhase03').dataset.psState = typeof st === 'number' ? 'page' : st === 'default' ? 'default' : 'intro';
      if(typeof st === 'number') selectedPages[2]=st;
      updateCardControls(3,st);

      const wrapper = document.getElementById('canvasViewportWrapper');
      if (wrapper) wrapper.classList.toggle('state-intro-p3', st === '03-1');

      const bgDefaultCurve = document.getElementById('bgDefaultCurve3');
      const bgPageEllipse = document.getElementById('bgPageEllipse3');
      const sideRockIcon = document.getElementById('sideRockIcon3');
      const phaseVerticalTag = document.getElementById('phaseVerticalTag3');
      const defaultContent = document.getElementById('defaultContent3');
      const defaultVisual = document.getElementById('defaultVisual3');
      const pageContent = document.getElementById('pageContent3');
      const reelIndicator = document.getElementById('reelIndicator3');
      const reelNavButtons = document.getElementById('reelNavButtons3');
      const cardMetaHeader = document.getElementById('cardMetaHeader3');
      const cardsStackContainer = document.getElementById('cardsStackContainer3');
      const cardCaptionDesc = document.getElementById('cardCaptionDesc3');

      const isTargetHomeOrIntro = (st === 'default' || st === '03-1');
      const wasHomeOrIntro = (prevSt === 'default' || prevSt === '03-1');
      updateGlobalTopLeftBadge(3, !isTargetHomeOrIntro);

      if (isTargetHomeOrIntro) {
        currentSentenceIndex3 = null;
        if (bgDefaultCurve) bgDefaultCurve.classList.remove('is-hidden');
        if (bgPageEllipse) bgPageEllipse.classList.remove('is-active');
        if (sideRockIcon) sideRockIcon.classList.remove('is-active');
        if (phaseVerticalTag) phaseVerticalTag.classList.add('is-default');

        if (defaultContent) defaultContent.classList.remove('is-hidden');
        if (defaultVisual) defaultVisual.classList.remove('is-hidden');

        if (pageContent) pageContent.classList.add('is-hidden');
        if (reelIndicator) reelIndicator.classList.add('is-hidden');
        if (reelNavButtons) reelNavButtons.classList.add('is-hidden');
        if (cardMetaHeader) cardMetaHeader.classList.add('is-hidden');
        if (cardsStackContainer) cardsStackContainer.classList.add('is-hidden');
        if (cardCaptionDesc) cardCaptionDesc.classList.add('is-hidden');
      } else {
        if (bgDefaultCurve) bgDefaultCurve.classList.add('is-hidden');
        if (bgPageEllipse) bgPageEllipse.classList.add('is-active');
        if (sideRockIcon) sideRockIcon.classList.add('is-active');
        if (phaseVerticalTag) phaseVerticalTag.classList.remove('is-default');

        if (defaultContent) defaultContent.classList.add('is-hidden');
        if (defaultVisual) defaultVisual.classList.add('is-hidden');

        if (pageContent) pageContent.classList.remove('is-hidden');
        if (reelIndicator) reelIndicator.classList.remove('is-hidden');
        if (reelNavButtons) reelNavButtons.classList.remove('is-hidden');
        if (cardMetaHeader) cardMetaHeader.classList.remove('is-hidden');
        if (cardsStackContainer) cardsStackContainer.classList.remove('is-hidden');
        if (cardCaptionDesc) cardCaptionDesc.classList.remove('is-hidden');

        let dir = 0;
        if (!wasHomeOrIntro && typeof prevSt === 'number' && typeof st === 'number') {
          dir = st > prevSt ? 1 : -1;
        }
        renderPage3(st, prevSt, dir);
      }
      finishStoryTransition(storyFrame,3,st,prevSt,storySnapshots);
    }

    function renderQuotes3(toPage, fromPage, direction = 0) {
      // Keep desktop text at the same quote anchor on every card.
      if(window.innerWidth>=1200)direction=0;
      initSentenceTracks3();
      const toData = phase03Pages[toPage - 1];
      const targetSentenceIdx = toData.sentenceIndex;
      const targetHighlightWord = toData.highlightWord;
      const isMobile = document.getElementById('canvasViewportWrapper').classList.contains('viewport-mobile');
      const isTablet = document.getElementById('canvasViewportWrapper').classList.contains('viewport-tablet');

      const quoteToQueueGap = isTablet
        ? (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--tab-quote-to-queue-gap')) || 33)
        : (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--quote-to-queue-gap')) || 54);
      const queueItemGap = isTablet
        ? (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--tab-queue-item-gap')) || 12)
        : (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--queue-item-gap')) || 20);
      const extraLineH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--line-note-extra-h')) || 0;
      const lineNote = document.getElementById('reelLineNote3');

      const activeH = measureTrackFinalHeight(phase03Queue[targetSentenceIdx], targetHighlightWord, isMobile, isTablet);

      if (isMobile) {
        const baseH = 80;
        const pushY = Math.max(0, activeH - baseH);
        document.getElementById('sectionPhase03').style.setProperty('--mob-quote-push-y', `${pushY}px`);
      } else {
        document.getElementById('sectionPhase03').style.setProperty('--mob-quote-push-y', '0px');
      }

      function updateLineNote() {
        if (lineNote) {
          lineNote.style.top = '0px';
          lineNote.style.height = `${activeH + 5 + extraLineH}px`;
        }
      }

      function updateUpcomingQueue(withTransition = true) {
        if (!isMobile) {
          let nextY = activeH + quoteToQueueGap;
          for (let i = targetSentenceIdx + 1; i < phase03Queue.length; i++) {
            const track = document.getElementById(`sentenceTrack3_${i}`);
            if (track) {
              track.className = 'sentence-track is-upcoming';
              track.style.display = '';
              track.innerText = phase03Queue[i];
              track.style.opacity = '0.75';
              if (withTransition) {
                track.style.transition = 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.35s ease';
              } else {
                track.style.transition = 'none';
              }
              track.style.transform = `translateY(${nextY}px)`;
              const trackH = track.offsetHeight || 52;
              nextY += trackH + queueItemGap;
            }
          }
        }
      }

      // 1. 初次載入或由首頁/Intro進入
      if (direction === 0 || currentSentenceIndex3 === null) {
        currentSentenceIndex3 = targetSentenceIdx;
        for (let i = 0; i < phase03Queue.length; i++) {
          const track = document.getElementById(`sentenceTrack3_${i}`);
          if (!track) continue;
          track.style.transition = 'none';

          if (i === targetSentenceIdx) {
            track.className = 'sentence-track is-active';
            track.innerHTML = makeHighlightHTML(phase03Queue[i], targetHighlightWord);
            track.style.transform = 'translateY(0px)';
            track.style.opacity = '1';
          } else if (i < targetSentenceIdx) {
            track.className = 'sentence-track is-past';
            track.innerText = phase03Queue[i];
            track.style.transform = `translateY(${(i - targetSentenceIdx) * 60 - 30}px) scale(0.85)`;
            track.style.opacity = '0';
          } else {
            track.className = 'sentence-track is-upcoming';
            track.innerText = phase03Queue[i];
            track.style.opacity = isMobile ? '0' : '0.75';
          }
        }

        updateLineNote();
        updateUpcomingQueue(false);

        setTimeout(() => {
          for (let i = 0; i < phase03Queue.length; i++) {
            const track = document.getElementById(`sentenceTrack3_${i}`);
            if (track) track.style.transition = '';
          }
        }, 50);
        return;
      }

      // 2. 同一句段落內的分頁切換
      if (targetSentenceIdx === currentSentenceIndex3) {
        const activeTrack = document.getElementById(`sentenceTrack3_${currentSentenceIndex3}`);
        if (activeTrack) {
          activeTrack.innerHTML = makeHighlightHTML(phase03Queue[currentSentenceIndex3], targetHighlightWord);
          updateLineNote();
        }
        updateUpcomingQueue(true);
        return;
      }

      // 3. 段落更換
      const oldIdx = currentSentenceIndex3;
      currentSentenceIndex3 = targetSentenceIdx;

      if (isMobile) {
        const oldTrack = document.getElementById(`sentenceTrack3_${oldIdx}`);
        const newTrack = document.getElementById(`sentenceTrack3_${targetSentenceIdx}`);

        if (oldTrack) {
          animateLeavingQuote(oldTrack);oldTrack.classList.remove('is-active');oldTrack.classList.add('is-past');
          oldTrack.style.transition = 'transform 0.42s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.35s ease';
          oldTrack.style.transform = direction === 1 ? 'translateY(-36px)' : 'translateY(36px)';
          oldTrack.style.opacity = '0';
        }

        if (newTrack) {
          newTrack.className = 'sentence-track is-active';
          newTrack.innerHTML = makeHighlightHTML(phase03Queue[targetSentenceIdx], targetHighlightWord);
          newTrack.style.transition = 'none';
          newTrack.style.transform = direction === 1 ? 'translateY(36px)' : 'translateY(-36px)';
          newTrack.style.opacity = '0';
          newTrack.offsetWidth;

          newTrack.style.transition = 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.45s ease';
          newTrack.style.transform = 'translateY(0px)';
          newTrack.style.opacity = '1';
          if(isMobile)newTrack.animate([{opacity:0,transform:'translateY(24px)'},{opacity:1,transform:'translateY(0)'}],{duration:180,easing:'ease-out'});

          updateLineNote();
        }
        return;
      }

      const newActiveTrack = document.getElementById(`sentenceTrack3_${targetSentenceIdx}`);
      if (newActiveTrack) {
        newActiveTrack.className = 'sentence-track is-active';
        newActiveTrack.innerHTML = makeHighlightHTML(phase03Queue[targetSentenceIdx], targetHighlightWord);
        newActiveTrack.style.transform = 'translateY(0px)';
        newActiveTrack.style.opacity = '1';
      }

      for (let i = 0; i < targetSentenceIdx; i++) {
        const track = document.getElementById(`sentenceTrack3_${i}`);
        if (track) {
          track.className = 'sentence-track is-past';
          track.innerText = phase03Queue[i];
          track.style.transform = `translateY(${(i - targetSentenceIdx) * 60 - 30}px) scale(0.85)`;
          track.style.opacity = '0';
        }
      }

      updateLineNote();
      updateUpcomingQueue(true);
    }

    // Each phase independently suppresses its preview at the final page.
    let hasNextCard3 = true;

    function setSlotState3(slotIdx, state) {
      const slot = document.getElementById(`cardSlot${slotIdx}_3`);
      if (!slot) return;
      if (state === 'main') {
        slot.style.transform = 'translate(0, 0) scale(1)';
        slot.style.opacity = '1';
        slot.style.zIndex = '5';
        slot.style.pointerEvents = 'auto';
      } else if (state === 'sub') {
        slot.style.transformOrigin = 'top left';
        slot.style.transform = 'translate(var(--card-sub-x), var(--card-sub-y)) scale(var(--card-sub-scale))';
        slot.style.opacity = hasNextCard3 ? 'var(--card-sub-opacity)' : '0';
        slot.style.zIndex = '3';
        slot.style.pointerEvents = 'none';
      } else if (state === 'out-left') {
        slot.style.transform = 'translateX(-140px) scale(0.92)';
        slot.style.opacity = '0';
        slot.style.zIndex = '1';
        slot.style.pointerEvents = 'none';
      } else if (state === 'sub-enter') {
        slot.style.transformOrigin = 'top left';
        slot.style.transform = 'translate(calc(var(--card-sub-x) + 60px), var(--card-sub-y)) scale(var(--card-sub-scale))';
        slot.style.opacity = '0';
        slot.style.zIndex = '2';
        slot.style.pointerEvents = 'none';
      }
    }

    function resetCardSlots3(pageNum) {
      const p = (typeof pageNum === 'number' && pageNum >= 1 && pageNum <= 4) ? pageNum : 1;
      const pageData = phase03Pages[p - 1];
      hasNextCard3 = p < phase03Pages.length;
      const isMobile = document.getElementById('canvasViewportWrapper') && document.getElementById('canvasViewportWrapper').classList.contains('viewport-mobile');

      cardRoles3 = { main: 0, sub: 1, spare: 2 };
      const s0 = document.getElementById('cardSlot0_3');
      const s1 = document.getElementById('cardSlot1_3');
      const s2 = document.getElementById('cardSlot2_3');
      if (!s0 || !s1 || !s2) return;

      s0.style.transition = 'none';
      s1.style.transition = 'none';
      s2.style.transition = 'none';

      const img0 = document.getElementById('imgSlot0_3');
      const img1 = document.getElementById('imgSlot1_3');
      const img2 = document.getElementById('imgSlot2_3');
      if (img0) img0.src = pageData.img;
      if (img1) img1.src = pageData.nextImg;
      if (img2) img2.src = pageData.nextImg;

      if (isMobile) {
        s0.style.transform = 'translateX(0)';
        s0.style.opacity = '1';
        s0.style.zIndex = '5';
        s1.style.transform = 'translateX(100%)';
        s1.style.opacity = '0';
        s1.style.zIndex = '3';
        s2.style.transform = 'translateX(-100%)';
        s2.style.opacity = '0';
        s2.style.zIndex = '1';
      } else {
        setSlotState3(0, 'main');
        setSlotState3(1, 'sub');
        setSlotState3(2, 'out-left');
      }
    }

    function animateCardSlots3(fromPage, toPage, direction) {
      isTransitioning3 = true;
      const isMobile = document.getElementById('canvasViewportWrapper') && document.getElementById('canvasViewportWrapper').classList.contains('viewport-mobile');
      const toData = phase03Pages[toPage - 1];
      hasNextCard3 = toPage < phase03Pages.length;

      if (isMobile) {
        const slotMain = document.getElementById(`cardSlot${cardRoles3.main}_3`);
        const slotNext = document.getElementById(`cardSlot${cardRoles3.sub}_3`);
        const imgNext = document.getElementById(`imgSlot${cardRoles3.sub}_3`);

        if (imgNext) imgNext.src = toData.img;
        if (slotNext) {
          slotNext.style.transition = 'none';
          slotNext.style.transform = direction === 1 ? 'translateX(100%)' : 'translateX(-100%)';
          slotNext.style.opacity = '0';
          slotNext.style.zIndex = '5';
          slotNext.offsetWidth; // reflow
        }

        const easeMobile = 'transform 0.48s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.48s cubic-bezier(0.25, 1, 0.5, 1)';
        if (slotMain) slotMain.style.transition = easeMobile;
        if (slotNext) slotNext.style.transition = easeMobile;

        if (slotMain) {
          slotMain.style.transform = direction === 1 ? 'translateX(-100%)' : 'translateX(100%)';
          slotMain.style.opacity = '0';
        }
        if (slotNext) {
          slotNext.style.transform = 'translateX(0)';
          slotNext.style.opacity = '1';
        }

        queueCardAnimation(() => {
          if (slotMain) slotMain.style.transition = 'none';
          if (slotNext) slotNext.style.transition = 'none';
          const temp = cardRoles3.main;
          cardRoles3.main = cardRoles3.sub;
          cardRoles3.sub = temp;
          isTransitioning3 = false;
        }, 500);
        return;
      }

      const slotMain = document.getElementById(`cardSlot${cardRoles3.main}_3`);
      const slotSub = document.getElementById(`cardSlot${cardRoles3.sub}_3`);
      const slotSpare = document.getElementById(`cardSlot${cardRoles3.spare}_3`);
      const imgSpare = document.getElementById(`imgSlot${cardRoles3.spare}_3`);

      if (direction === 1) { // Next
        if (imgSpare) imgSpare.src = toData.nextImg;
        if (slotSpare) {
          slotSpare.style.transition = 'none';
          setSlotState3(cardRoles3.spare, 'sub-enter');
          slotSpare.offsetWidth; // reflow
        }

        const ease = '0.28s cubic-bezier(0.25, 1, 0.5, 1)';
        if (slotMain) slotMain.style.transition = `transform ${ease}, opacity ${ease}`;
        if (slotSub) slotSub.style.transition = `transform ${ease}, opacity ${ease}`;
        if (slotSpare) slotSpare.style.transition = `transform ${ease}, opacity ${ease}`;

        setSlotState3(cardRoles3.main, 'out-left');
        setSlotState3(cardRoles3.sub, 'main');
        setSlotState3(cardRoles3.spare, 'sub');

        queueCardAnimation(() => {
          if (slotMain) slotMain.style.transition = 'none';
          if (slotSub) slotSub.style.transition = 'none';
          if (slotSpare) slotSpare.style.transition = 'none';
          const oldMain = cardRoles3.main;
          cardRoles3.main = cardRoles3.sub;
          cardRoles3.sub = cardRoles3.spare;
          cardRoles3.spare = oldMain;
          isTransitioning3 = false;
        }, 300);

      } else { // Prev
        if (imgSpare) imgSpare.src = toData.img;
        if (slotSpare) {
          slotSpare.style.transition = 'none';
          setSlotState3(cardRoles3.spare, 'out-left');
          slotSpare.style.zIndex = '5';
          slotSpare.offsetWidth; // reflow
        }

        const ease = '0.28s cubic-bezier(0.25, 1, 0.5, 1)';
        if (slotMain) slotMain.style.transition = `transform ${ease}, opacity ${ease}`;
        if (slotSub) slotSub.style.transition = `opacity 0.35s ease`;
        if (slotSpare) slotSpare.style.transition = `transform ${ease}, opacity ${ease}`;

        setSlotState3(cardRoles3.main, 'sub');
        setSlotState3(cardRoles3.spare, 'main');
        if (slotSub) slotSub.style.opacity = '0';

        queueCardAnimation(() => {
          if (slotMain) slotMain.style.transition = 'none';
          if (slotSub) slotSub.style.transition = 'none';
          if (slotSpare) slotSpare.style.transition = 'none';
          const newSubImg = document.getElementById(`imgSlot${cardRoles3.main}_3`);
          if (newSubImg) newSubImg.src = toData.nextImg;
          const oldSub = cardRoles3.sub;
          cardRoles3.sub = cardRoles3.main;
          cardRoles3.main = cardRoles3.spare;
          cardRoles3.spare = oldSub;
          isTransitioning3 = false;
        }, 300);
      }
    }

    function dissolveTextHeaders3(toPage) {
      const pageData = phase03Pages[toPage - 1];
      const textElems = [
        document.getElementById('currPageNum3'),
        document.getElementById('cardCatCn3'),
        document.getElementById('cardCatEn3'),
        document.getElementById('cardCaptionDesc3')
      ];

      textElems.forEach(el => {
        if (el) {
          el.classList.add('text-dissolve-out');
          el.classList.remove('text-dissolve-in');
        }
      });

      setTimeout(() => {
        const numEl = document.getElementById('currPageNum3');
        if (numEl) numEl.innerText = `0${toPage}`;
        const cnEl = document.getElementById('cardCatCn3');
        if (cnEl) cnEl.innerText = pageData.titleCn;
        const enEl = document.getElementById('cardCatEn3');
        if (enEl) enEl.innerText = pageData.titleEn;
        const descEl = document.getElementById('cardCaptionDesc3');
        if (descEl) descEl.innerText = pageData.caption;

        textElems.forEach(el => {
          if (el) {
            el.classList.remove('text-dissolve-out');
            el.classList.add('text-dissolve-in');
          }
        });

        setTimeout(() => {
          textElems.forEach(el => {
            if (el) el.classList.remove('text-dissolve-in');
          });
        }, 320);
      }, 160);
    }

    function renderPage3(toPage, fromPage, direction = 0) {
      const pageData = phase03Pages[toPage - 1];

      if (direction !== 0 && typeof fromPage === 'number') {
        animateCardSlots3(fromPage, toPage, direction);
        renderQuotes3(toPage, fromPage, direction);
        dissolveTextHeaders3(toPage);
      } else {
        resetCardSlots3(toPage);
        renderQuotes3(toPage, fromPage, 0);
        const numEl = document.getElementById('currPageNum3');
        if (numEl) numEl.innerText = `0${toPage}`;
        const cnEl = document.getElementById('cardCatCn3');
        if (cnEl) cnEl.innerText = pageData.titleCn;
        const enEl = document.getElementById('cardCatEn3');
        if (enEl) enEl.innerText = pageData.titleEn;
        const descEl = document.getElementById('cardCaptionDesc3');
        if (descEl) descEl.innerText = pageData.caption;
      }
    }

    function prevPage3() {
      const isMobile = document.getElementById('canvasViewportWrapper') && document.getElementById('canvasViewportWrapper').classList.contains('viewport-mobile');
      if (currentPhase3State === 1) {
        setPhase3State(isMobile ? '03-1' : 'default');
        scrollToPhase('phase-03');
        return;
      }
      if (currentPhase3State === '03-1') {
        setPhase3State('default');
        scrollToPhase('phase-03');
        return;
      }
      if (typeof currentPhase3State === 'number' && currentPhase3State > 1) {
        setPhase3State(currentPhase3State - 1);
      }
    }

    function nextPage3() {
      const isMobile = document.getElementById('canvasViewportWrapper') && document.getElementById('canvasViewportWrapper').classList.contains('viewport-mobile');
      if (currentPhase3State === 'default') {
        setPhase3State(isMobile ? '03-1' : 1);
        scrollToPhase('phase-03');
        return;
      }
      if (currentPhase3State === '03-1') {
        setPhase3State(1);
        scrollToPhase('phase-03');
        return;
      }
      if (typeof currentPhase3State === 'number' && currentPhase3State < 4) {
        setPhase3State(currentPhase3State + 1);
      }
    }

    // =========================================================================
    // Phase 04 控制器邏輯
    // =========================================================================
    function initSentenceTracks4() {
      const wrapper = document.getElementById('sentenceTracksWrapper4');
      if (!wrapper || wrapper.children.length > 0) return;
      wrapper.innerHTML = '';
      phase04Queue.forEach((text, i) => {
        const div = document.createElement('div');
        div.className = 'sentence-track is-upcoming';
        div.id = `sentenceTrack4_${i}`;
        div.dataset.idx = i;
        div.innerText = text;
        wrapper.appendChild(div);
      });
    }

    function setPhase4State(st) {
      lastManualStateTime = Date.now() + 600;
      if (isTransitioning4) return;
      const prevSt = currentPhase4State;
      if (prevSt === st) return;
      const storyFrame=document.getElementById('sectionPhase04');
      const storySnapshots=captureStoryTransition(storyFrame,st,prevSt);

      currentPhase4State = st;
      document.getElementById('sectionPhase04').dataset.psState = typeof st === 'number' ? 'page' : st === 'default' ? 'default' : 'intro';
      if(typeof st === 'number') selectedPages[3]=st;
      updateCardControls(4,st);

      const wrapper = document.getElementById('canvasViewportWrapper');
      if (wrapper) wrapper.classList.toggle('state-intro-p4', st === '04-1');

      const bgDefaultCurve = document.getElementById('bgDefaultCurve4');
      const bgPageEllipse = document.getElementById('bgPageEllipse4');
      const sideRockIcon = document.getElementById('sideRockIcon4');
      const phaseVerticalTag = document.getElementById('phaseVerticalTag4');
      const defaultContent = document.getElementById('defaultContent4');
      const defaultVisual = document.getElementById('defaultVisual4');
      const pageContent = document.getElementById('pageContent4');
      const reelIndicator = document.getElementById('reelIndicator4');
      const reelNavButtons = document.getElementById('reelNavButtons4');
      const cardMetaHeader = document.getElementById('cardMetaHeader4');
      const cardsStackContainer = document.getElementById('cardsStackContainer4');
      const cardCaptionDesc = document.getElementById('cardCaptionDesc4');

      const isTargetHomeOrIntro = (st === 'default' || st === '04-1');
      const wasHomeOrIntro = (prevSt === 'default' || prevSt === '04-1');
      updateGlobalTopLeftBadge(4, !isTargetHomeOrIntro);

      if (isTargetHomeOrIntro) {
        currentSentenceIndex4 = null;
        if (bgDefaultCurve) bgDefaultCurve.classList.remove('is-hidden');
        if (bgPageEllipse) bgPageEllipse.classList.remove('is-active');
        if (sideRockIcon) sideRockIcon.classList.remove('is-active');
        if (phaseVerticalTag) phaseVerticalTag.classList.add('is-default');

        if (defaultContent) defaultContent.classList.remove('is-hidden');
        if (defaultVisual) defaultVisual.classList.remove('is-hidden');

        if (pageContent) pageContent.classList.add('is-hidden');
        if (reelIndicator) reelIndicator.classList.add('is-hidden');
        if (reelNavButtons) reelNavButtons.classList.add('is-hidden');
        if (cardMetaHeader) cardMetaHeader.classList.add('is-hidden');
        if (cardsStackContainer) cardsStackContainer.classList.add('is-hidden');
        if (cardCaptionDesc) cardCaptionDesc.classList.add('is-hidden');
      } else {
        if (bgDefaultCurve) bgDefaultCurve.classList.add('is-hidden');
        if (bgPageEllipse) bgPageEllipse.classList.add('is-active');
        if (sideRockIcon) sideRockIcon.classList.add('is-active');
        if (phaseVerticalTag) phaseVerticalTag.classList.remove('is-default');

        if (defaultContent) defaultContent.classList.add('is-hidden');
        if (defaultVisual) defaultVisual.classList.add('is-hidden');

        if (pageContent) pageContent.classList.remove('is-hidden');
        if (reelIndicator) reelIndicator.classList.remove('is-hidden');
        if (reelNavButtons) reelNavButtons.classList.remove('is-hidden');
        if (cardMetaHeader) cardMetaHeader.classList.remove('is-hidden');
        if (cardsStackContainer) cardsStackContainer.classList.remove('is-hidden');
        if (cardCaptionDesc) cardCaptionDesc.classList.remove('is-hidden');

        let dir = 0;
        if (!wasHomeOrIntro && typeof prevSt === 'number' && typeof st === 'number') {
          dir = st > prevSt ? 1 : -1;
        }
        renderPage4(st, prevSt, dir);
      }
      finishStoryTransition(storyFrame,4,st,prevSt,storySnapshots);
    }

    function renderQuotes4(toPage, fromPage, direction = 0) {
      // Keep desktop text at the same quote anchor on every card.
      if(window.innerWidth>=1200)direction=0;
      initSentenceTracks4();
      const toData = phase04Pages[toPage - 1];
      const targetSentenceIdx = toData.sentenceIndex;
      const targetHighlightWord = toData.highlightWord;
      const isMobile = document.getElementById('canvasViewportWrapper').classList.contains('viewport-mobile');
      const isTablet = document.getElementById('canvasViewportWrapper').classList.contains('viewport-tablet');

      const quoteToQueueGap = isTablet
        ? (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--tab-quote-to-queue-gap')) || 33)
        : (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--quote-to-queue-gap')) || 54);
      const queueItemGap = isTablet
        ? (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--tab-queue-item-gap')) || 12)
        : (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--queue-item-gap')) || 20);
      const extraLineH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--line-note-extra-h')) || 0;
      const lineNote = document.getElementById('reelLineNote4');

      const activeH = measureTrackFinalHeight(phase04Queue[targetSentenceIdx], targetHighlightWord, isMobile, isTablet);

      if (isMobile) {
        const baseH = 80;
        const pushY = Math.max(0, activeH - baseH);
        document.getElementById('sectionPhase04').style.setProperty('--mob-quote-push-y', `${pushY}px`);
      } else {
        document.getElementById('sectionPhase04').style.setProperty('--mob-quote-push-y', '0px');
      }

      function updateLineNote() {
        if (lineNote) {
          lineNote.style.top = '0px';
          lineNote.style.height = `${activeH + 5 + extraLineH}px`;
        }
      }

      function updateUpcomingQueue(withTransition = true) {
        if (!isMobile) {
          let nextY = activeH + quoteToQueueGap;
          for (let i = targetSentenceIdx + 1; i < phase04Queue.length; i++) {
            const track = document.getElementById(`sentenceTrack4_${i}`);
            if (track) {
              track.className = 'sentence-track is-upcoming';
              track.style.display = '';
              track.innerText = phase04Queue[i];
              track.style.opacity = '0.75';
              if (withTransition) {
                track.style.transition = 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.35s ease';
              } else {
                track.style.transition = 'none';
              }
              track.style.transform = `translateY(${nextY}px)`;
              const trackH = track.offsetHeight || 52;
              nextY += trackH + queueItemGap;
            }
          }
        }
      }

      // 1. 初次載入或由首頁/Intro進入
      if (direction === 0 || currentSentenceIndex4 === null) {
        currentSentenceIndex4 = targetSentenceIdx;
        for (let i = 0; i < phase04Queue.length; i++) {
          const track = document.getElementById(`sentenceTrack4_${i}`);
          if (!track) continue;
          track.style.transition = 'none';

          if (i === targetSentenceIdx) {
            track.className = 'sentence-track is-active';
            track.innerHTML = makeHighlightHTML(phase04Queue[i], targetHighlightWord);
            track.style.transform = 'translateY(0px)';
            track.style.opacity = '1';
          } else if (i < targetSentenceIdx) {
            track.className = 'sentence-track is-past';
            track.innerText = phase04Queue[i];
            track.style.transform = `translateY(${(i - targetSentenceIdx) * 60 - 30}px) scale(0.85)`;
            track.style.opacity = '0';
          } else {
            track.className = 'sentence-track is-upcoming';
            track.innerText = phase04Queue[i];
            track.style.opacity = isMobile ? '0' : '0.75';
          }
        }

        updateLineNote();
        updateUpcomingQueue(false);

        setTimeout(() => {
          for (let i = 0; i < phase04Queue.length; i++) {
            const track = document.getElementById(`sentenceTrack4_${i}`);
            if (track) track.style.transition = '';
          }
        }, 50);
        return;
      }

      // 2. 同一句段落內的分頁切換
      if (targetSentenceIdx === currentSentenceIndex4) {
        const activeTrack = document.getElementById(`sentenceTrack4_${currentSentenceIndex4}`);
        if (activeTrack) {
          activeTrack.innerHTML = makeHighlightHTML(phase04Queue[currentSentenceIndex4], targetHighlightWord);
          updateLineNote();
        }
        updateUpcomingQueue(true);
        return;
      }

      // 3. 段落更換
      const oldIdx = currentSentenceIndex4;
      currentSentenceIndex4 = targetSentenceIdx;

      if (isMobile) {
        const oldTrack = document.getElementById(`sentenceTrack4_${oldIdx}`);
        const newTrack = document.getElementById(`sentenceTrack4_${targetSentenceIdx}`);

        if (oldTrack) {
          animateLeavingQuote(oldTrack);oldTrack.classList.remove('is-active');oldTrack.classList.add('is-past');
          oldTrack.style.transition = 'transform 0.42s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.35s ease';
          oldTrack.style.transform = direction === 1 ? 'translateY(-36px)' : 'translateY(36px)';
          oldTrack.style.opacity = '0';
        }

        if (newTrack) {
          newTrack.className = 'sentence-track is-active';
          newTrack.innerHTML = makeHighlightHTML(phase04Queue[targetSentenceIdx], targetHighlightWord);
          newTrack.style.transition = 'none';
          newTrack.style.transform = direction === 1 ? 'translateY(36px)' : 'translateY(-36px)';
          newTrack.style.opacity = '0';
          newTrack.offsetWidth;

          newTrack.style.transition = 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.45s ease';
          newTrack.style.transform = 'translateY(0px)';
          newTrack.style.opacity = '1';
          if(isMobile)newTrack.animate([{opacity:0,transform:'translateY(24px)'},{opacity:1,transform:'translateY(0)'}],{duration:180,easing:'ease-out'});

          updateLineNote();
        }
        return;
      }

      const newActiveTrack = document.getElementById(`sentenceTrack4_${targetSentenceIdx}`);
      if (newActiveTrack) {
        newActiveTrack.className = 'sentence-track is-active';
        newActiveTrack.innerHTML = makeHighlightHTML(phase04Queue[targetSentenceIdx], targetHighlightWord);
        newActiveTrack.style.transform = 'translateY(0px)';
        newActiveTrack.style.opacity = '1';
      }

      for (let i = 0; i < targetSentenceIdx; i++) {
        const track = document.getElementById(`sentenceTrack4_${i}`);
        if (track) {
          track.className = 'sentence-track is-past';
          track.innerText = phase04Queue[i];
          track.style.transform = `translateY(${(i - targetSentenceIdx) * 60 - 30}px) scale(0.85)`;
          track.style.opacity = '0';
        }
      }

      updateLineNote();
      updateUpcomingQueue(true);
    }

    // Each phase independently suppresses its preview at the final page.
    let hasNextCard4 = true;

    function setSlotState4(slotIdx, state) {
      const slot = document.getElementById(`cardSlot${slotIdx}_4`);
      if (!slot) return;
      if (state === 'main') {
        slot.style.transform = 'translate(0, 0) scale(1)';
        slot.style.opacity = '1';
        slot.style.zIndex = '5';
        slot.style.pointerEvents = 'auto';
      } else if (state === 'sub') {
        slot.style.transformOrigin = 'top left';
        slot.style.transform = 'translate(var(--card-sub-x), var(--card-sub-y)) scale(var(--card-sub-scale))';
        slot.style.opacity = hasNextCard4 ? 'var(--card-sub-opacity)' : '0';
        slot.style.zIndex = '3';
        slot.style.pointerEvents = 'none';
      } else if (state === 'out-left') {
        slot.style.transform = 'translateX(-140px) scale(0.92)';
        slot.style.opacity = '0';
        slot.style.zIndex = '1';
        slot.style.pointerEvents = 'none';
      } else if (state === 'sub-enter') {
        slot.style.transformOrigin = 'top left';
        slot.style.transform = 'translate(calc(var(--card-sub-x) + 60px), var(--card-sub-y)) scale(var(--card-sub-scale))';
        slot.style.opacity = '0';
        slot.style.zIndex = '2';
        slot.style.pointerEvents = 'none';
      }
    }

    function resetCardSlots4(pageNum) {
      const p = (typeof pageNum === 'number' && pageNum >= 1 && pageNum <= 4) ? pageNum : 1;
      const pageData = phase04Pages[p - 1];
      hasNextCard4 = p < phase04Pages.length;
      const isMobile = document.getElementById('canvasViewportWrapper') && document.getElementById('canvasViewportWrapper').classList.contains('viewport-mobile');

      cardRoles4 = { main: 0, sub: 1, spare: 2 };
      const s0 = document.getElementById('cardSlot0_4');
      const s1 = document.getElementById('cardSlot1_4');
      const s2 = document.getElementById('cardSlot2_4');
      if (!s0 || !s1 || !s2) return;

      s0.style.transition = 'none';
      s1.style.transition = 'none';
      s2.style.transition = 'none';

      const img0 = document.getElementById('imgSlot0_4');
      const img1 = document.getElementById('imgSlot1_4');
      const img2 = document.getElementById('imgSlot2_4');
      if (img0) img0.src = pageData.img;
      if (img1) img1.src = pageData.nextImg;
      if (img2) img2.src = pageData.nextImg;

      if (isMobile) {
        s0.style.transform = 'translateX(0)';
        s0.style.opacity = '1';
        s0.style.zIndex = '5';
        s1.style.transform = 'translateX(100%)';
        s1.style.opacity = '0';
        s1.style.zIndex = '3';
        s2.style.transform = 'translateX(-100%)';
        s2.style.opacity = '0';
        s2.style.zIndex = '1';
      } else {
        setSlotState4(0, 'main');
        setSlotState4(1, 'sub');
        setSlotState4(2, 'out-left');
      }
    }

    function animateCardSlots4(fromPage, toPage, direction) {
      isTransitioning4 = true;
      const isMobile = document.getElementById('canvasViewportWrapper') && document.getElementById('canvasViewportWrapper').classList.contains('viewport-mobile');
      const toData = phase04Pages[toPage - 1];
      hasNextCard4 = toPage < phase04Pages.length;

      if (isMobile) {
        const slotMain = document.getElementById(`cardSlot${cardRoles4.main}_4`);
        const slotNext = document.getElementById(`cardSlot${cardRoles4.sub}_4`);
        const imgNext = document.getElementById(`imgSlot${cardRoles4.sub}_4`);

        if (imgNext) imgNext.src = toData.img;
        if (slotNext) {
          slotNext.style.transition = 'none';
          slotNext.style.transform = direction === 1 ? 'translateX(100%)' : 'translateX(-100%)';
          slotNext.style.opacity = '0';
          slotNext.style.zIndex = '5';
          slotNext.offsetWidth; // reflow
        }

        const easeMobile = 'transform 0.48s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.48s cubic-bezier(0.25, 1, 0.5, 1)';
        if (slotMain) slotMain.style.transition = easeMobile;
        if (slotNext) slotNext.style.transition = easeMobile;

        if (slotMain) {
          slotMain.style.transform = direction === 1 ? 'translateX(-100%)' : 'translateX(100%)';
          slotMain.style.opacity = '0';
        }
        if (slotNext) {
          slotNext.style.transform = 'translateX(0)';
          slotNext.style.opacity = '1';
        }

        queueCardAnimation(() => {
          if (slotMain) slotMain.style.transition = 'none';
          if (slotNext) slotNext.style.transition = 'none';
          const temp = cardRoles4.main;
          cardRoles4.main = cardRoles4.sub;
          cardRoles4.sub = temp;
          isTransitioning4 = false;
        }, 500);
        return;
      }

      const slotMain = document.getElementById(`cardSlot${cardRoles4.main}_4`);
      const slotSub = document.getElementById(`cardSlot${cardRoles4.sub}_4`);
      const slotSpare = document.getElementById(`cardSlot${cardRoles4.spare}_4`);
      const imgSpare = document.getElementById(`imgSlot${cardRoles4.spare}_4`);

      if (direction === 1) { // Next
        if (imgSpare) imgSpare.src = toData.nextImg;
        if (slotSpare) {
          slotSpare.style.transition = 'none';
          setSlotState4(cardRoles4.spare, 'sub-enter');
          slotSpare.offsetWidth; // reflow
        }

        const ease = '0.28s cubic-bezier(0.25, 1, 0.5, 1)';
        if (slotMain) slotMain.style.transition = `transform ${ease}, opacity ${ease}`;
        if (slotSub) slotSub.style.transition = `transform ${ease}, opacity ${ease}`;
        if (slotSpare) slotSpare.style.transition = `transform ${ease}, opacity ${ease}`;

        setSlotState4(cardRoles4.main, 'out-left');
        setSlotState4(cardRoles4.sub, 'main');
        setSlotState4(cardRoles4.spare, 'sub');

        queueCardAnimation(() => {
          if (slotMain) slotMain.style.transition = 'none';
          if (slotSub) slotSub.style.transition = 'none';
          if (slotSpare) slotSpare.style.transition = 'none';
          const oldMain = cardRoles4.main;
          cardRoles4.main = cardRoles4.sub;
          cardRoles4.sub = cardRoles4.spare;
          cardRoles4.spare = oldMain;
          isTransitioning4 = false;
        }, 300);

      } else { // Prev
        if (imgSpare) imgSpare.src = toData.img;
        if (slotSpare) {
          slotSpare.style.transition = 'none';
          setSlotState4(cardRoles4.spare, 'out-left');
          slotSpare.style.zIndex = '5';
          slotSpare.offsetWidth; // reflow
        }

        const ease = '0.28s cubic-bezier(0.25, 1, 0.5, 1)';
        if (slotMain) slotMain.style.transition = `transform ${ease}, opacity ${ease}`;
        if (slotSub) slotSub.style.transition = `opacity 0.35s ease`;
        if (slotSpare) slotSpare.style.transition = `transform ${ease}, opacity ${ease}`;

        setSlotState4(cardRoles4.main, 'sub');
        setSlotState4(cardRoles4.spare, 'main');
        if (slotSub) slotSub.style.opacity = '0';

        queueCardAnimation(() => {
          if (slotMain) slotMain.style.transition = 'none';
          if (slotSub) slotSub.style.transition = 'none';
          if (slotSpare) slotSpare.style.transition = 'none';
          const newSubImg = document.getElementById(`imgSlot${cardRoles4.main}_4`);
          if (newSubImg) newSubImg.src = toData.nextImg;
          const oldSub = cardRoles4.sub;
          cardRoles4.sub = cardRoles4.main;
          cardRoles4.main = cardRoles4.spare;
          cardRoles4.spare = oldSub;
          isTransitioning4 = false;
        }, 300);
      }
    }

    function dissolveTextHeaders4(toPage) {
      const pageData = phase04Pages[toPage - 1];
      const textElems = [
        document.getElementById('currPageNum4'),
        document.getElementById('cardCatCn4'),
        document.getElementById('cardCatEn4'),
        document.getElementById('cardCaptionDesc4')
      ];

      textElems.forEach(el => {
        if (el) {
          el.classList.add('text-dissolve-out');
          el.classList.remove('text-dissolve-in');
        }
      });

      setTimeout(() => {
        const numEl = document.getElementById('currPageNum4');
        if (numEl) numEl.innerText = `0${toPage}`;
        const cnEl = document.getElementById('cardCatCn4');
        if (cnEl) cnEl.innerText = pageData.titleCn;
        const enEl = document.getElementById('cardCatEn4');
        if (enEl) enEl.innerText = pageData.titleEn;
        const descEl = document.getElementById('cardCaptionDesc4');
        if (descEl) descEl.innerText = pageData.caption;

        textElems.forEach(el => {
          if (el) {
            el.classList.remove('text-dissolve-out');
            el.classList.add('text-dissolve-in');
          }
        });

        setTimeout(() => {
          textElems.forEach(el => {
            if (el) el.classList.remove('text-dissolve-in');
          });
        }, 320);
      }, 160);
    }

    function renderPage4(toPage, fromPage, direction = 0) {
      const pageData = phase04Pages[toPage - 1];

      if (direction !== 0 && typeof fromPage === 'number') {
        animateCardSlots4(fromPage, toPage, direction);
        renderQuotes4(toPage, fromPage, direction);
        dissolveTextHeaders4(toPage);
      } else {
        resetCardSlots4(toPage);
        renderQuotes4(toPage, fromPage, 0);
        const numEl = document.getElementById('currPageNum4');
        if (numEl) numEl.innerText = `0${toPage}`;
        const cnEl = document.getElementById('cardCatCn4');
        if (cnEl) cnEl.innerText = pageData.titleCn;
        const enEl = document.getElementById('cardCatEn4');
        if (enEl) enEl.innerText = pageData.titleEn;
        const descEl = document.getElementById('cardCaptionDesc4');
        if (descEl) descEl.innerText = pageData.caption;
      }
    }

    function prevPage4() {
      const isMobile = document.getElementById('canvasViewportWrapper') && document.getElementById('canvasViewportWrapper').classList.contains('viewport-mobile');
      if (currentPhase4State === 1) {
        setPhase4State(isMobile ? '04-1' : 'default');
        scrollToPhase('phase-04');
        return;
      }
      if (currentPhase4State === '04-1') {
        setPhase4State('default');
        scrollToPhase('phase-04');
        return;
      }
      if (typeof currentPhase4State === 'number' && currentPhase4State > 1) {
        setPhase4State(currentPhase4State - 1);
      }
    }

    function nextPage4() {
      const isMobile = document.getElementById('canvasViewportWrapper') && document.getElementById('canvasViewportWrapper').classList.contains('viewport-mobile');
      if (currentPhase4State === 'default') {
        setPhase4State(isMobile ? '04-1' : 1);
        scrollToPhase('phase-04');
        return;
      }
      if (currentPhase4State === '04-1') {
        setPhase4State(1);
        scrollToPhase('phase-04');
        return;
      }
      if (typeof currentPhase4State === 'number' && currentPhase4State < 4) {
        setPhase4State(currentPhase4State + 1);
      }
    }

    
    // A shared side rail follows the same chapter and detail state as tablet.

    function setupDesktopHints() {
      root.querySelectorAll('.reel-nav-buttons button').forEach(b=>b.addEventListener('click',()=>b.classList.remove('ps-next-hint')));
    }

    function setupDesktopSideRail() {
      const wrapper=document.createElement('div'); wrapper.className='desktop-shared-rail'; wrapper.setAttribute('aria-hidden','true');
      const rock=document.createElement('img'); rock.className='desktop-shared-rock'; rock.alt='';
      const label=document.createElement('div'); label.className='desktop-shared-label'; wrapper.append(rock,label); root.append(wrapper);
      const names=['DISCOVER','REFINE','ELEVATE','SHINE']; let scheduled=false;
      function update(){scheduled=false;const anchors=getAnchors().filter(a=>root.contains(a)&&a.dataset.kind!=='intro');if(!anchors.length)return;
        const active=anchors.reduce((best,a)=>Math.abs(anchorScrollTop(a)-scrollY)<Math.abs(anchorScrollTop(best)-scrollY)?a:best,anchors[0]);
        const n=Number(active.dataset.phase), frame=root.querySelectorAll('.canvas-frame')[n-1], detail=frame?.dataset.psState==='page';
        const source=frame?.querySelector('.side-rock-icon');if(source&&rock.getAttribute('src')!==source.getAttribute('src'))rock.src=source.getAttribute('src');
        label.textContent='PHASE '+String(n).padStart(2,'0')+'-'+names[n-1];wrapper.classList.toggle('is-detail',detail);
        const entry=anchors[0].getBoundingClientRect().top, last=anchors[anchors.length-1].getBoundingClientRect().top;
        const exit=Math.min(0,last-navHeight);wrapper.style.top=(Math.max(navHeight,entry)+exit)+'px';
        wrapper.classList.toggle('is-visible',root.getBoundingClientRect().bottom>navHeight && entry<innerHeight && last<innerHeight+root.getBoundingClientRect().height);
      }
      const schedule=()=>{if(!scheduled){scheduled=true;requestAnimationFrame(update)}};
      addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});const stateObserver=new MutationObserver(schedule);root.querySelectorAll('.canvas-frame').forEach(frame=>stateObserver.observe(frame,{attributes:true,attributeFilter:['data-ps-state']}));schedule();
    }

    function setupDesktopPaging() {
      let used=false, sum=0, timer, touch=null, moving=false, reading=false, previous=scrollY, lastWheelAt=0, pendingDirection=0;
      // Require silence before rearming: trackpad momentum can accelerate or reverse.
      const gestureIdle=180;
      // Share geometry within a frame instead of rescanning/measuring all
      // anchors for every high-frequency trackpad event.
      let geometry=null;
      function readGeometry(){
        if(!geometry){
          const anchors=getAnchors().filter(a=>root.contains(a)&&a.dataset.kind!=='intro');
          geometry={anchors,positions:anchors.map(anchorScrollTop)};
          requestAnimationFrame(()=>{geometry=null;});
        }
        return geometry;
      }
      const list=()=>readGeometry().anchors;
      const positions=()=>readGeometry().positions;
      const nearest=p=>p.reduce((b,y,i)=>Math.abs(y-scrollY)<Math.abs(p[b]-scrollY)?i:b,0);
      const finalReadingEnd=p=>{const a=list().at(-1);return p[p.length-1]+(Number(a?.parentElement.dataset.pageReadTravel)||0);};
      const eligible=(p,d)=>!document.documentElement.classList.contains('snap-disabled')&&!document.querySelector('.site-header.is-menu-open')&&p.length && ((scrollY>=p[0]-2&&scrollY<=finalReadingEnd(p)+2)||(d<0&&scrollY>finalReadingEnd(p)&&scrollY<=finalReadingEnd(p)+innerHeight*.8));
      function go(i){
        const a=list()[i];if(!a)return;moving=true;
        const phase=Number(a.dataset.phase),target=a.dataset.kind==='page'?selectedPages[phase-1]:'default';
        const origin=list()[nearest(positions())],samePhase=origin?.dataset.phase===a.dataset.phase;
        desktopPagingTarget=a;const start=performance.now();
        function commit(){
          const current=phaseState(phase);
          if((typeof target==='number'&&typeof current!=='number')||(target==='default'&&typeof current==='number')){
            transitionOverlays.forEach(el=>el.remove());transitionOverlays.clear();
            [setState,setPhase2State,setPhase3State,setPhase4State][phase-1](target);
          }
          const committed=typeof target==='number'?typeof phaseState(phase)==='number':typeof phaseState(phase)!=='number';
          if(!committed&&performance.now()-start<1800){requestAnimationFrame(commit);return;}
          const motionStart=performance.now(),from=scrollY;
          const motionDuration=samePhase||matchMedia('(prefers-reduced-motion: reduce)').matches?0:320;
          // Native smooth scrolling can be cancelled by the next wheel event.
          // Own the short anchor motion; visual transitions run independently.
          function done(){
            if(document.documentElement.classList.contains('snap-disabled')){moving=false;desktopPagingTarget=null;pendingDirection=0;return;}
            const progress=motionDuration?Math.min(1,(performance.now()-motionStart)/motionDuration):1;
            const targetTop=anchorScrollTop(a),eased=1-Math.pow(1-progress,3);
            scrollTo({top:progress===1?targetTop:from+(targetTop-from)*eased,behavior:'instant'});
            if(progress===1){
              scrollTo({top:anchorScrollTop(a),behavior:'instant'});
              moving=false;desktopPagingTarget=null;
              endProgrammaticScroll();
              if(pendingDirection){const d=pendingDirection;pendingDirection=0;used=step(d);}return;
            }requestAnimationFrame(done);
          }done();
        }commit();
      }
      function step(d){const p=positions();if(!eligible(p,d))return false;if(scrollY<p[0]-2&&d>0){go(0);return true}if(scrollY>p[p.length-1]+2&&d<0){go(p.length-1);return true}const current=getNearestAnchor(),index=list().indexOf(current),i=(index>=0?index:nearest(p))+d;if(i<0||i>=p.length)return false;go(i);return true}
      addEventListener('wheel',e=>{
        if(e.ctrlKey||Math.abs(e.deltaX)>Math.abs(e.deltaY)||!e.deltaY)return;
        const p=positions(),d=Math.sign(e.deltaY);
        if(document.documentElement.classList.contains('snap-disabled')||document.querySelector('.site-header.is-menu-open')||!p.length)return;
        const now=performance.now(),gap=now-lastWheelAt;
        const magnitude=Math.abs(e.deltaY)*(e.deltaMode===1?16:e.deltaMode===2?innerHeight:1);
        // Capture the boundary BEFORE native scrolling can overshoot into detail.
        // Consume the entering gesture, including its remaining momentum.
        if(d>0&&scrollY<p[0]-2&&scrollY+magnitude>=p[0]-2){
          if(e.cancelable)e.preventDefault();
          lastWheelAt=now;used=true;sum=0;reading=false;pendingDirection=0;
          go(0);return;
        }
        if(!eligible(p,d))return;
        const fresh=!lastWheelAt||gap>gestureIdle;
        lastWheelAt=now;
        if(fresh){used=false;sum=0;reading=false;}
        clearTimeout(timer);
        if(moving){
          if(fresh||sum){if(sum&&Math.sign(sum)!==d)sum=0;sum+=d*magnitude;if(Math.abs(sum)>=12){pendingDirection=d;sum=0;}}
          used=true;if(e.cancelable)e.preventDefault();return;
        }
        if(used&&!reading){if(e.cancelable)e.preventDefault();return;}
        const frame=e.target.closest?.('.canvas-frame');
        if(canReadDesktopFrame(frame,d)){
          if(e.cancelable)e.preventDefault();
          const a=getNearestAnchor(),start=anchorScrollTop(a),travel=Number(a.parentElement.dataset[a.dataset.kind==='page'?'pageReadTravel':'homeReadTravel'])||0;
          // Own reading scroll too: a large wheel delta cannot escape its bounds.
          const target=Math.max(start,Math.min(start+travel,scrollY+d*magnitude));
          scrollTo({top:target,behavior:'instant'});syncOuterReading();
          used=true;reading=Math.abs(target-(d>0?start+travel:start))>2;return;
        }
        if(reading){if(e.cancelable)e.preventDefault();return;}
        if(used){if(e.cancelable)e.preventDefault();return;}
        if((scrollY<=p[0]+2&&d<0)||(scrollY>=finalReadingEnd(p)-2&&d>0))return;
        if(e.cancelable)e.preventDefault();
        if(sum&&Math.sign(sum)!==d)sum=0;
        sum+=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?innerHeight:1);
        if(Math.abs(sum)>=12){used=step(d);sum=0;}
      },{passive:false,capture:true});
      addEventListener('touchstart',e=>{touch=e.touches.length===1&&!e.target.closest('button,a,input,select,textarea,[contenteditable="true"]')?{x:e.touches[0].clientX,y:e.touches[0].clientY,used:false}:null},{passive:true});
      addEventListener('touchmove',e=>{if(!touch||e.touches.length!==1)return;const dx=e.touches[0].clientX-touch.x,dy=touch.y-e.touches[0].clientY,p=positions(),d=Math.sign(dy);if(!dy||Math.abs(dx)>Math.abs(dy)||!eligible(p,d))return;const frame=e.target.closest?.('.canvas-frame'),canRead=canReadDesktopFrame(frame,d);if(!touch.used&&!moving&&!canRead&&((scrollY<=p[0]+2&&d<0)||(scrollY>=finalReadingEnd(p)-2&&d>0)))return;if(e.cancelable)e.preventDefault();if(touch.used||Math.abs(dy)<55)return;touch.used=true;if(moving){pendingDirection=d;return}if(canRead){const a=getNearestAnchor(),start=anchorScrollTop(a),travel=Number(a.parentElement.dataset[a.dataset.kind==='page'?'pageReadTravel':'homeReadTravel'])||0;scrollTo({top:d>0?start+travel:start,behavior:'instant'});syncOuterReading();return}step(d)},{passive:false,capture:true});
      addEventListener('touchend',()=>touch=null,{passive:true});addEventListener('touchcancel',()=>touch=null,{passive:true});
      addEventListener('scroll',()=>{
        const now=scrollY,p=positions();if(!p.length){previous=now;return}
        const top=previous<p[0]-2&&now>=p[0]-2&&now>previous;
        const bottom=previous>p[p.length-1]+2&&now<=p[p.length-1]+2&&now<previous;
        previous=now;
        if(moving||programmaticScroll||document.documentElement.classList.contains('snap-disabled')||document.querySelector('.site-header.is-menu-open')||(!top&&!bottom))return;
        used=true;sum=0;reading=false;pendingDirection=0;
        lastWheelAt=performance.now();if(touch)touch.used=true;
        // Scrollbar/native entry must commit the opening state too. Never rearm
        // on a fixed timer while trackpad momentum is still arriving.
        clearTimeout(timer);go(top?0:p.length-1);
        previous=scrollY;
      },{passive:true});
    }

    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    window.addEventListener('resize',scheduleResponsiveLayout,{passive:true});

    // 初始化
    prepareStoryContent();
    setupDesktopPaging();
    setupDesktopSideRail();
    setupDesktopHints();
    setupOuterReading();
    const controlsObserver=new ResizeObserver(()=>requestAnimationFrame(()=>root.querySelectorAll(".canvas-frame").forEach(positionMobileControls)));
    root.querySelectorAll(".cards-stack-container,.card-caption-desc").forEach(el=>controlsObserver.observe(el));
    updateImageSources();
    updateNavHeight();
    updateResponsiveScale();
    initSentenceTracks();
    initSentenceTracks2();
    initSentenceTracks3();
    initSentenceTracks4();
    setupDesktopStorySurfaces();
    setupCardSwipeGestures();
    updateGlobalTopLeftBadge(1, false);
    updateCenterLineScroll();

    // 預先就位各 Phase 卡片槽位與圖片 (防止進入分頁時空白)
    resetCardSlots(1);
    resetCardSlots2(1);
    resetCardSlots3(1);
    resetCardSlots4(1);

    // 支援首頁點擊切換：點擊首頁主圖或文案亦可平滑展開分頁卡片
    const dv1 = document.getElementById('defaultVisual');
    if (dv1) { dv1.style.cursor = 'pointer'; dv1.addEventListener('click', () => advanceHomeStory(1)); }
    const dc1 = document.getElementById('defaultContent');
    if (dc1) { dc1.style.cursor = 'pointer'; dc1.addEventListener('click', () => advanceHomeStory(1)); }

    const dv2 = document.getElementById('defaultVisual2');
    if (dv2) { dv2.style.cursor = 'pointer'; dv2.addEventListener('click', () => advanceHomeStory(2)); }
    const dc2 = document.getElementById('defaultContent2');
    if (dc2) { dc2.style.cursor = 'pointer'; dc2.addEventListener('click', () => advanceHomeStory(2)); }

    const dv3 = document.getElementById('defaultVisual3');
    if (dv3) { dv3.style.cursor = 'pointer'; dv3.addEventListener('click', () => advanceHomeStory(3)); }
    const dc3 = document.getElementById('defaultContent3');
    if (dc3) { dc3.style.cursor = 'pointer'; dc3.addEventListener('click', () => advanceHomeStory(3)); }

    const dv4 = document.getElementById('defaultVisual4');
    if (dv4) { dv4.style.cursor = 'pointer'; dv4.addEventListener('click', () => advanceHomeStory(4)); }
    const dc4 = document.getElementById('defaultContent4');
    if (dc4) { dc4.style.cursor = 'pointer'; dc4.addEventListener('click', () => advanceHomeStory(4)); }

    root.querySelectorAll('.canvas-frame').forEach(frame=>{if(!frame.dataset.psState)frame.dataset.psState='default';const tag=frame.querySelector('.phase-vertical-tag');if(tag)tag.classList.toggle('is-default',frame.dataset.psState!=='page');});
    layoutReady=true;
    const resizeObserver=new ResizeObserver(()=>scheduleResponsiveLayout());
    resizeObserver.observe(root);
    if(document.fonts)document.fonts.ready.then(scheduleResponsiveLayout);
    if(window.visualViewport)window.visualViewport.addEventListener('resize',scheduleResponsiveLayout,{passive:true});

    // 匯出全域 API (支援行內 onclick 與外部控制)
    window.setState = setState;
    window.setPhase2State = setPhase2State;
    window.setPhase3State = setPhase3State;
    window.setPhase4State = setPhase4State;
    window.renderPage = renderPage;
    window.renderPage2 = renderPage2;
    window.renderPage3 = renderPage3;
    window.renderPage4 = renderPage4;
    window.scrollToPhase = scrollToPhase;
    window.prevPage = prevPage;
    window.nextPage = nextPage;
    window.prevPage2 = prevPage2;
    window.nextPage2 = nextPage2;
    window.prevPage3 = prevPage3;
    window.nextPage3 = nextPage3;
    window.prevPage4 = prevPage4;
    window.nextPage4 = nextPage4;

    window.PSSection = {
      setState: setState,
      setPhase2State: setPhase2State,
      setPhase3State: setPhase3State,
      setPhase4State: setPhase4State,
      scrollToPhase: scrollToPhase,
      go: scrollToPhase,
      next: nextPage,
      prev: prevPage,
      next2: nextPage2,
      prev2: prevPage2,
      next3: nextPage3,
      prev3: prevPage3,
      next4: nextPage4,
      prev4: prevPage4
    };
})();






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
   const desktop=innerWidth>=1200, root=document.querySelector(desktop?'#ps-root':'#phase-mobile');
   if(innerWidth>=1200){cue.hidden=true;root?.querySelectorAll('.center-connecting-line').forEach(line=>{
     const track=line.querySelector('.center-line-track'),diamond=line.querySelector('.center-line-diamond');if(!track||!diamond)return;
     const start=Math.max(0,diamond.getBoundingClientRect().top+diamond.getBoundingClientRect().height/2-track.getBoundingClientRect().top);
     track.style.setProperty('--guide-start',start+'px');track.classList.toggle('has-progress-guide',track.getBoundingClientRect().height>start+10);
    });return;}
   if(innerWidth<768||!root){cue.hidden=true;return;}
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
  if(innerWidth<768||document.getElementById('ps-banner-color-bridge-style'))return;
  const root=document.getElementById('ps-root'),section=root?.closest('section');
  let banner=section?.previousElementSibling;
  while(banner&&(getComputedStyle(banner).display==='none'||banner.classList.contains('phone-only')||banner.getBoundingClientRect().height<1))banner=banner.previousElementSibling;
  const opening=document.querySelector(innerWidth>=1200?'#canvasFrame':'#phase-mobile-01 .tablet-opening');
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
