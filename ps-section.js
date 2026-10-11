/* ==========================================================================
   Phase Section — Webflow 正式版核心邏輯
   100% 保持調校工作台的運作機制與真實資料
   ========================================================================== */
(function() {
  'use strict';
  const root = document.getElementById('ps-root');
  if (!root) return;

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
    "phase01-img.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc1381b4d5b0c8164f2a2c_phase01-img.avif",
    "phase02-img.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc13808cefba012e6ea6fb_phase02-img.avif",
    "phase03-img.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc1381cdd337debbb7b147_phase03-img.avif",
    "phase04-img.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc1380b4d5b0c8164f2a11_phase04-img.avif",
    "rock01.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc13804b19aa9175fe8798_rock01.avif",
    "rock02.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc138038881bba415dfce1_rock02.avif",
    "rock03.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc1380cdd337debbb7b11a_rock03.avif",
    "rock04.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc1380252649e5ead3177d_rock04.avif",
    "rock.avif": "",
    "stone.avif": "",

    // ==========================================
    // C. Phase 01 卡片內容插圖 (8 張，已轉為 .avif)
    // ==========================================
    "01_探查.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc13824f1bfe253bc8fd44_01_%E6%8E%A2%E6%9F%A5.avif",
    "02_理解.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc13826db332cece4197b4_02_%E7%90%86%E8%A7%A3.avif",
    "03_評估都市計畫.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc1382c816eb85bbdd7261_03_%E8%A9%95%E4%BC%B0%E9%83%BD%E5%B8%82%E8%A8%88%E7%95%AB.avif",
    "04_土管規則條件.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc138231ce4c749af5c1be_04_%E5%9C%9F%E7%AE%A1%E8%A6%8F%E5%89%87%E6%A2%9D%E4%BB%B6.avif",
    "05_產品定位.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc138233e846e23b741f59_05_%E7%94%A2%E5%93%81%E5%AE%9A%E4%BD%8D.avif",
    "06_區域脈絡與人口結構.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc13824b19aa9175fe87e3_06_%E5%8D%80%E5%9F%9F%E8%84%88%E7%B5%A1%E8%88%87%E4%BA%BA%E5%8F%A3%E7%B5%90%E6%A7%8B.avif",
    "07_生活機能.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc138231ce4c749af5c1ce_07_%E7%94%9F%E6%B4%BB%E6%A9%9F%E8%83%BD.avif",
    "08_購屋習慣與銷售時機.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc1382f993e067e015868d_08_%E8%B3%BC%E5%B1%8B%E7%BF%92%E6%85%A3%E8%88%87%E9%8A%B7%E5%94%AE%E6%99%82%E6%A9%9F.avif",

    // ==========================================
    // D. Phase 02 卡片內容插圖 (3 張，已轉為 .avif)
    // ==========================================
    "09_房型規劃.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc13831efce99d35b74375_09_%E6%88%BF%E5%9E%8B%E8%A6%8F%E5%8A%83.avif",
    "10_公設配置.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc1383d423991cbf9166f0_10_%E5%85%AC%E8%A8%AD%E9%85%8D%E7%BD%AE.avif",
    "11_室內格局.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc1383d423991cbf9166f3_11_%E5%AE%A4%E5%85%A7%E6%A0%BC%E5%B1%80.avif",

    // ==========================================
    // E. Phase 03 卡片內容插圖 (4 張，已轉為 .avif)
    // ==========================================
    "12_品牌語言.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc138386e309da498943d5_12_%E5%93%81%E7%89%8C%E8%AA%9E%E8%A8%80.avif",
    "13_沉浸式行銷的體驗設計.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc13830ebe54f4c0323553_14_%E5%AA%92%E9%AB%94%E7%AD%96%E7%95%A5.avif",
    "14_媒體策略.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc13830ebe54f4c0323553_14_%E5%AA%92%E9%AB%94%E7%AD%96%E7%95%A5.avif",
    "15_互動溝通.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc1383d5d0de7797f9a734_15_%E4%BA%92%E5%8B%95%E6%BA%9D%E9%80%9A.avif",

    // ==========================================
    // F. Phase 04 卡片內容插圖 (4 張，已轉為 .avif)
    // ==========================================
    "16_驗屋服務.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc1383b4f6d005885c0712_16_%E9%A9%97%E5%B1%8B%E6%9C%8D%E5%8B%99.avif",
    "17_建立修繕通報機制.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc1384fae7d56f239582d2_17_%E5%BB%BA%E7%AB%8B%E4%BF%AE%E7%B9%95%E9%80%9A%E5%A0%B1%E6%A9%9F%E5%88%B6.avif",
    "18_說明會與區權會.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc13845f514da625d1f87a_18_%E8%AA%AA%E6%98%8E%E6%9C%83%E8%88%87%E5%8D%80%E6%AC%8A%E6%9C%83.avif",
    "19_建立社區總體營造.avif": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6acc1384b4d5b0c8164f2ad7_19_%E5%BB%BA%E7%AB%8B%E7%A4%BE%E5%8D%80%E7%B8%BD%E9%AB%94%E7%87%9F%E9%80%A0.avif"
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
  function updateNavHeight() {
    const rootStyle = getComputedStyle(document.documentElement);
    const cssHeaderH = parseFloat(rootStyle.getPropertyValue('--header-h'));
    if (!isNaN(cssHeaderH) && cssHeaderH > 0) {
      navHeight = cssHeaderH;
    } else {
      const navAttr = root.getAttribute('data-nav');
      if (!navAttr) {
        navHeight = 110;
      } else if (/^\d+(\.\d+)?$/.test(navAttr)) {
        navHeight = parseFloat(navAttr);
      } else {
        const navEl = document.querySelector(navAttr);
        navHeight = navEl ? navEl.offsetHeight : 110;
      }
    }
    document.documentElement.style.setProperty('--ps-nav-h', `${navHeight}px`);
  }

  // 自適應 100vh 縮放比例計算 (以扣除 Header 後高度 (vh) 容納完整版面為主等比縮放)
  function updateResponsiveScale() {
    updateNavHeight();
    const vw = window.innerWidth;
    const vh = window.innerHeight - navHeight;
    const wrapper = document.getElementById('canvasViewportWrapper');
    if (!wrapper) return;

    let scale = 1;
    if (vw <= 767) {
      wrapper.className = 'canvas-viewport-wrapper viewport-mobile';
      document.body.classList.add('viewport-mobile');
      document.body.classList.remove('viewport-tablet');
      // 手機基準 390 x 874，以高度容納完整版面為主等比縮放
      scale = Math.min(vh / 874, vw / 390);
      setMobileTitlePosition('above');
    } else if (vw <= 1024) {
      wrapper.className = 'canvas-viewport-wrapper viewport-tablet';
      document.body.classList.add('viewport-tablet');
      document.body.classList.remove('viewport-mobile');
      // 平板基準 1024 x 1366：以高度調整容納完整版面等比縮放 (字級最低限制保護由 CSS 獨立約束)
      scale = Math.min(vh / 1366, vw / 1024);
    } else {
      wrapper.className = 'canvas-viewport-wrapper';
      document.body.classList.remove('viewport-mobile', 'viewport-tablet');
      // 桌面基準 1440 x 1048：方案 A 智慧約束縮放 (以視窗高度為安全上限，確保 100vh 垂直完整可視，絕不裁切底部)
      scale = Math.min(vw / 1440, vh / 1048);
    }
    root.style.setProperty('--ps-scale', scale);
    syncGlobalFixedComponentsPosition();
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
        img: "01_探查.png",
        nextImg: "02_理解.png",
        caption: "走進基地與街區，觀察在地消費、人潮、生活氛圍與步調。除了數據，我們也用雙腳感受土地；從街道、人流到日常生活的細節，一路記錄、一路思考，找出這片土地真正的樣貌與可能。"
      },
      {
        pageIndex: 2,
        titleCn: "理解",
        titleEn: "UNDERSTAND",
        highlightWord: "理解",
        sentenceIndex: 0,
        img: "02_理解.png",
        nextImg: "03_評估都市計畫.png",
        caption: "理解，從傾聽開始。透過與建設團隊深入對談，理解品牌對土地的態度、對建築的期待，以及對居住者與城市的責任。我們將這些理念與堅持，整理成清楚的策略與溝通方式，讓品牌真正被看見、被理解。"
      },
      {
        pageIndex: 3,
        titleCn: "評估都市計畫",
        titleEn: "PLANNING",
        highlightWord: "評估都市計畫",
        sentenceIndex: 1,
        img: "03_評估都市計畫.png",
        nextImg: "04_土管規則條件.png",
        caption: "都市計畫，描繪的是一個區域未來的樣子。從公共建設、交通發展、產業聚落到商圈與人流變化，我們梳理區域發展趨勢，思考未來生活圈可能如何形成。透過長期視角，協助建設團隊掌握土地的發展契機，提前布局。"
      },
      {
        pageIndex: 4,
        titleCn: "土管規則條件",
        titleEn: "ZONING",
        highlightWord: "土管規則條件",
        sentenceIndex: 1,
        img: "04_土管規則條件.png",
        nextImg: "05_產品定位.png",
        caption: "法規不是只有限制，也決定一塊土地能如何被好好使用。從棟距、採光通風、格局動線到車位比例，我們在法規條件中思考居住品質，也從市場角度提出產品建議。在限制中找出更好的解法，讓設計效益與生活需求取得平衡。"
      },
      {
        pageIndex: 5,
        titleCn: "產品定位",
        titleEn: "PRODUCT POSITIONING",
        highlightWord: "產品定位",
        sentenceIndex: 2,
        img: "05_產品定位.png",
        nextImg: "06_區域脈絡與人口結構.png",
        caption: "數據，是理解市場的重要方式。從實價登錄、人口統計到購屋族群，分析誰可能住在這裡、他們需要什麼樣的生活。將不同族群的需求，轉化為產品規劃的依據，讓空間更貼近真正的使用者。"
      },
      {
        pageIndex: 6,
        titleCn: "區域脈絡與人口結構",
        titleEn: "LOCAL CONTEXT",
        highlightWord: "區域脈絡與人口結構",
        sentenceIndex: 2,
        img: "06_區域脈絡與人口結構.png",
        nextImg: "07_生活機能.png",
        caption: "理解一個區域，不只看數據，也要走進真實的生活。從城市發展、商圈變化到人口遷移，我們同時觀察大環境與街區細節，理解一個地方如何形成自己的生活節奏。讓建築不只是落在土地上，而能真正融入城市與社區。"
      },
      {
        pageIndex: 7,
        titleCn: "生活機能",
        titleEn: "AMENITIES",
        highlightWord: "生活機能",
        sentenceIndex: 2,
        img: "07_生活機能.png",
        nextImg: "08_購屋習慣與銷售時機.png",
        caption: "生活機能，不只是地圖上的距離，而是每天生活是否方便。我們實際走訪街區，了解採買、交通、學區、公園與休閒環境，從居住者角度思考一天的生活路徑。因為真正重要的，是住進來之後，每一天是否自然、順手、安心。"
      },
      {
        pageIndex: 8,
        titleCn: "購屋習慣與銷售時機",
        titleEn: "HABITS & TIMING",
        highlightWord: "購屋習慣與銷售時機",
        sentenceIndex: 2,
        img: "08_購屋習慣與銷售時機.png",
        nextImg: "01_探查.png",
        caption: "市場會改變，購屋需求也會隨政策、區域發展與生活方式持續變化。我們透過市場調查與購屋習慣，分析目標族群與購屋契機，協助建設團隊調整產品與銷售策略。在市場變化中掌握節奏，讓產品在適合的時間，被真正需要的人看見。"
    ];
    phase01Pages.forEach(p => { p.img = asset(p.img); p.nextImg = asset(p.nextImg); });

    let currentState = 'default';
    let isTransitioning = false;

    // 建立頂部切換按鈕 (包含手機板在 Default 與 Page01 之間的 page01-1 漏掉的過渡頁)
    

    let lastManualStateTime = 0;

    // =========================================================================
    // 全域左上角固定標籤與側邊原石動態過渡控制器 (Fixed Top-Left Component)
    // 支援 3 種過渡情境：
    // 1. 都只有文字 (Default ➔ Default)：文字 cross-fade 淡入淡出
    // 2. 都有石頭 (Page ➔ Page)：石頭 cross-fade，文字 cross-fade
    // 3. 文字 ➔ 石頭+文字 (Default ➔ Page)：比照首頁切換分頁，文字平滑下移，石頭滑入淡入
    // 全域固定元件 (左上角原石標籤、左下角導航) 與當前畫布自適應同步
    
    function syncGlobalFixedComponentsPosition() {
      const wrapper = document.getElementById('canvasViewportWrapper');
      if (!wrapper) return;
      const wrapperRect = wrapper.getBoundingClientRect();
      const canvasLeft = wrapperRect.left;
      const canvasTop = wrapperRect.top;
      document.documentElement.style.setProperty('--canvas-left', `${canvasLeft}px`);
      document.documentElement.style.setProperty('--canvas-top', `${canvasTop}px`);

      // 依照畫面寬度置左 (Screen-Left Anchoring)：
      // 取得全裝置置左基準線 (桌面: 48px, 平板: 36px, 手機: 20px)
      const vw = window.innerWidth;
      const rootStyle = getComputedStyle(document.documentElement);
      let targetScreenLeft = vw <= 767 ? 20 : (vw <= 1024 ? 36 : 48);
      const customScreenLeft = parseFloat(rootStyle.getPropertyValue('--side-rail-screen-left'));
      if (!isNaN(customScreenLeft) && customScreenLeft > 0) {
        targetScreenLeft = customScreenLeft;
      }

      // 將螢幕絕對座標轉換為置中縮放畫布內部的相對座標
      const scale = parseFloat(root.style.getPropertyValue('--ps-scale')) || 1;
      const innerX = (targetScreenLeft - canvasLeft) / scale;

      // 英文直行字定位 X 座標
      document.documentElement.style.setProperty('--side-rail-inner-x', `${innerX}px`);
      // 側邊小原石 (寬度約 172px，中心點與直行字對齊，左緣約 innerX - 38px)
      document.documentElement.style.setProperty('--side-rail-rock-inner-x', `${innerX - 38}px`);

      // 桌面板引文區：根據螢幕寬度，自動置中於「左側石頭/英文字」與「中間貫通線段」之間的剩餘區塊中心
      if (vw > 1024) {
        // 1. 左邊界：扣除左側石頭與英文字 (依螢幕左緣計算，側邊原石右緣約在 targetScreenLeft + 110px * scale)
        const rockRightScreen = targetScreenLeft + (110 * scale);

        // 2. 右邊界：中間貫通線段 (畫布中心 720px，在螢幕上即為 vw / 2)
        const centerLineScreen = canvasLeft + (720 * scale);
        const centerLineMargin = 30 * scale;
        const rightBoundScreen = centerLineScreen - centerLineMargin;

        // 3. 剩餘空間中心點 (螢幕座標)
        const zoneCenterScreen = (rockRightScreen + rightBoundScreen) / 2;

        // 4. 引文內容盒寬度 (450px)
        const textBlockWidth = 450;
        const textBlockWidthScaled = textBlockWidth * scale;

        // 5. 轉換為畫布內部座標
        const textBlockLeftScreen = zoneCenterScreen - (textBlockWidthScaled / 2);
        const innerContentX = (textBlockLeftScreen - canvasLeft) / scale;

        // 6. 安全邊界保護：確保絕不碰撞左側石頭 (innerX + 115px) 且不擠壓到中線 (720px - 450px - 20px = 250px)
        const minContentX = Math.round(innerX + 115);
        const maxContentX = Math.round(720 - textBlockWidth - 20);
        const clampedX = Math.round(Math.max(minContentX, Math.min(innerContentX, maxContentX)));

        document.documentElement.style.setProperty('--left-content-x', `${clampedX}px`);
      } else {
        document.documentElement.style.setProperty('--left-content-x', '232px');
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

      currentState = st;
      

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
    }

    let currentSentenceIndex = null;
    let cardRoles = { main: 0, sub: 1, spare: 2 };

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
        slot.style.opacity = 'var(--card-sub-opacity)';
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
      const pageData = phase01Pages[pageNum - 1];
      const isMobile = document.getElementById('canvasViewportWrapper').classList.contains('viewport-mobile');

      cardRoles = { main: 0, sub: 1, spare: 2 };
      const s0 = document.getElementById('cardSlot0');
      const s1 = document.getElementById('cardSlot1');
      const s2 = document.getElementById('cardSlot2');
      if (!s0 || !s1 || !s2) return;

      s0.style.transition = 'none';
      s1.style.transition = 'none';
      s2.style.transition = 'none';

      document.getElementById('imgSlot0').src = pageData.img;
      document.getElementById('imgSlot1').src = pageData.nextImg;
      document.getElementById('imgSlot2').src = pageData.nextImg;

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

        setTimeout(() => {
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

        const ease = '0.52s cubic-bezier(0.25, 1, 0.5, 1)';
        slotMain.style.transition = `transform ${ease}, opacity ${ease}`;
        slotSub.style.transition = `transform ${ease}, opacity ${ease}`;
        slotSpare.style.transition = `transform ${ease}, opacity ${ease}`;

        // slotMain 滑出左側
        setSlotState(cardRoles.main, 'out-left');
        // slotSub 平滑放大位移至主要位置 (原圖已在 slotSub 上，絕不閃白或閃現！)
        setSlotState(cardRoles.sub, 'main');
        // slotSpare 滑入次要位置
        setSlotState(cardRoles.spare, 'sub');

        setTimeout(() => {
          slotMain.style.transition = 'none';
          slotSub.style.transition = 'none';
          slotSpare.style.transition = 'none';
          const oldMain = cardRoles.main;
          cardRoles.main = cardRoles.sub;
          cardRoles.sub = cardRoles.spare;
          cardRoles.spare = oldMain;
          isTransitioning = false;
        }, 540);

      } else { // Prev
        // spare 預載上一張主圖，並就位在左側隱藏
        imgSpare.src = toData.img;
        slotSpare.style.transition = 'none';
        setSlotState(cardRoles.spare, 'out-left');
        slotSpare.style.zIndex = '5';
        slotSpare.offsetWidth; // reflow

        const ease = '0.52s cubic-bezier(0.25, 1, 0.5, 1)';
        slotMain.style.transition = `transform ${ease}, opacity ${ease}`;
        slotSub.style.transition = `opacity 0.35s ease`;
        slotSpare.style.transition = `transform ${ease}, opacity ${ease}`;

        // slotMain 縮小退回次要位置
        setSlotState(cardRoles.main, 'sub');
        // slotSpare 由左側滑入主位置
        setSlotState(cardRoles.spare, 'main');
        // slotSub 淡出
        slotSub.style.opacity = '0';

        setTimeout(() => {
          slotMain.style.transition = 'none';
          slotSub.style.transition = 'none';
          slotSpare.style.transition = 'none';
          document.getElementById(`imgSlot${cardRoles.main}`).src = toData.nextImg;
          const oldSub = cardRoles.sub;
          cardRoles.sub = cardRoles.main;
          cardRoles.main = cardRoles.spare;
          cardRoles.spare = oldSub;
          isTransitioning = false;
        }, 540);
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
      const measureDiv = document.createElement('div');
      measureDiv.className = 'sentence-track is-active';
      measureDiv.style.visibility = 'hidden';
      measureDiv.style.position = 'absolute';
      measureDiv.style.left = '0';
      measureDiv.style.top = '0';
      measureDiv.style.transition = 'none';
      if (isMobile) {
        measureDiv.style.width = '315px';
        measureDiv.style.fontSize = 'var(--mob-quote-size, 19px)';
        measureDiv.style.lineHeight = 'var(--mob-quote-lh, 1.8)';
        measureDiv.style.letterSpacing = '1.6px';
        measureDiv.style.paddingLeft = '18px';
      } else if (isTablet) {
        measureDiv.style.width = '574px';
        measureDiv.style.fontSize = 'var(--tab-quote-size, 24px)';
        measureDiv.style.lineHeight = 'var(--tab-quote-lh, 1.8)';
        measureDiv.style.letterSpacing = '2.4px';
        measureDiv.style.paddingLeft = '25px';
      } else {
        measureDiv.style.width = '438px';
        measureDiv.style.fontSize = 'var(--quote-font-size, 28px)';
        measureDiv.style.lineHeight = 'var(--quote-line-height, 1.8)';
        measureDiv.style.letterSpacing = 'var(--quote-letter-spacing, 2.8px)';
        measureDiv.style.paddingLeft = '25px';
      }
      measureDiv.innerHTML = makeHighlightHTML(text, word);
      document.body.appendChild(measureDiv);
      const h = measureDiv.offsetHeight || 102;
      document.body.removeChild(measureDiv);
      return h;
    }

    function renderQuotes(toPage, fromPage, direction) {
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
        document.documentElement.style.setProperty('--mob-quote-push-y', `${pushY}px`);
      } else {
        document.documentElement.style.setProperty('--mob-quote-push-y', '0px');
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
        img: "09_房型規劃.png",
        nextImg: "10_公設配置.png",
        caption: "房型規劃，是對不同生活方式的回應。有人需要小而精準的空間，也有人期待更寬裕、能承接未來變化的生活尺度。我們從客層、生活習慣與真實需求出發，在坪數、機能與舒適度之間找到平衡，讓房型真正符合居住者的生活。"
      },
      {
        pageIndex: 2,
        titleCn: "公設配置",
        titleEn: "COMMON AREAS",
        highlightWord: "公設配置",
        sentenceIndex: 0,
        img: "10_公設配置.png",
        nextImg: "11_室內格局.png",
        caption: "公設不是制式設備的堆疊，而是生活的延伸。從住戶的年齡、需求與使用習慣出發，規劃真正會被使用的空間，同時考慮交屋後的管理與維護。讓每一項公設不只好看，也能長久、實用地陪伴生活。"
      },
      {
        pageIndex: 3,
        titleCn: "室內格局",
        titleEn: "LAYOUT",
        highlightWord: "室內格局",
        sentenceIndex: 0,
        img: "11_室內格局.png",
        nextImg: "09_房型規劃.png",
        caption: "格局，決定生活如何在空間裡流動。我們從居住者的角度檢視動線、採光、尺度與空間關係，思考每一道牆、每一個轉角是否符合真實使用。讓格局不只成立於圖面，也真正成立於每天的生活。"
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
        img: "12_品牌語言.png",
        nextImg: "13_沉浸式行銷的體驗設計.png",
        caption: "品牌語言不是口號，而是品牌與市場溝通的方式。我們從品牌核心出發，將理念轉化為清楚、貼近人的文字與敘事，讓理性的產品資訊與感性的生活想像自然連結。讓品牌想說的話，更準確地被理解。"
      },
      {
        pageIndex: 2,
        titleCn: "沉浸式行銷的體驗設計",
        titleEn: "IMMERSIVE",
        highlightWord: "沉浸式行銷的體驗設計",
        sentenceIndex: 1,
        img: "13_沉浸式行銷的體驗設計.png",
        nextImg: "14_媒體策略.png",
        caption: "沉浸式行銷，是讓購屋者更具體地感受未來生活。從接待中心的光線、音樂、氣味，到參觀動線、模型、展牆、材質與陳設，每一個細節都影響品牌感受。我們協助建設團隊逐一檢視與調整，讓空間體驗、產品特色與品牌質感保持一致，也讓購屋者更容易走進建築所描繪的生活。"
      },
      {
        pageIndex: 3,
        titleCn: "媒體策略",
        titleEn: "STRATEGY",
        highlightWord: "媒體策略",
        sentenceIndex: 2,
        img: "14_媒體策略.png",
        nextImg: "15_互動溝通.png",
        caption: "不同的內容，需要不同的方式被看見。從平面廣告、社群內容、影片、官網到數位互動，我們依照受眾與平台特性安排媒體策略。透過流量與內容數據持續觀察成效，調整內容與投放方向，讓每一次溝通都更精準、更有效。"
      },
      {
        pageIndex: 4,
        titleCn: "互動溝通",
        titleEn: "COMMUNICATION",
        highlightWord: "互動溝通",
        sentenceIndex: 2,
        img: "15_互動溝通.png",
        nextImg: "12_品牌語言.png",
        caption: "互動溝通，從傾聽開始。透過現場對談、社群留言、問卷與各種接觸點，理解消費者對生活與家的期待，再將這些回饋轉化為建設團隊可以參考的方向。同時，也將品牌的理念清楚傳回市場，讓建設方、消費者與我們之間形成持續而良性的溝通。"
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
        img: "16_驗屋服務.png",
        nextImg: "17_建立修繕通報機制.png",
        caption: "以中立角度與專業儀器，逐項檢視工程品質與交屋細節。除了協助建設團隊把關品質，也讓購屋者更安心理解新家的狀況。讓驗屋成為建設方與住戶之間建立信任的一座橋樑。"
      },
      {
        pageIndex: 2,
        titleCn: "建立修繕通報機制",
        titleEn: "MAINTENANCE",
        highlightWord: "建立修繕通報機制",
        sentenceIndex: 1,
        img: "17_建立修繕通報機制.png",
        nextImg: "18_說明會與區權會.png",
        caption: "透過修繕管理平台，串聯住戶、物業與建設團隊。讓問題可以即時回報，維修進度與紀錄清楚可追蹤，也讓每一個反饋都被完整留下。對住戶而言，是更安心的服務；對建設團隊而言，也能持續了解實際居住後的需求。"
      },
      {
        pageIndex: 3,
        titleCn: "說明會與區權會",
        titleEn: "MEETING",
        highlightWord: "說明會與區權會",
        sentenceIndex: 1,
        img: "18_說明會與區權會.png",
        nextImg: "19_建立社區總體營造.png",
        caption: "協助建設團隊規劃與主持各類說明會及區權會，清楚說明社區規劃、管理方式與住戶權益。透過透明的資訊與耐心溝通，減少理解落差，也讓建設方的專業與用心被住戶真正感受到。"
      },
      {
        pageIndex: 4,
        titleCn: "建立社區總體營造",
        titleEn: "COMMUNITY",
        highlightWord: "建立社區總體營造",
        sentenceIndex: 1,
        img: "19_建立社區總體營造.png",
        nextImg: "16_驗屋服務.png",
        caption: "一個社區的形成，不只來自建築，也來自人與人之間的關係。從公共空間、管理制度到社區活動，我們協助建設團隊建立更完整的生活體驗，讓住戶有更多交流與參與的機會。讓品牌價值從交屋延伸進日常，逐漸形成真正能被感受、被信任的社區關係。"
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
      clearTimeout(programmaticTimer);
      programmaticTimer = setTimeout(endProgrammaticScroll, 900);
      window.scrollTo({ top, behavior: behavior || 'smooth' });
    }

    function endProgrammaticScroll() {
      clearTimeout(programmaticTimer);
      programmaticScroll = false;
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
      if (Date.now() < lastManualStateTime) return;
      const a = getNearestAnchor();
      if (!a) return;
      const phase = a.dataset.phase;
      const kind = a.dataset.kind;
      let ok = true;

      if (phase === '1') {
        const bgCurve2 = document.getElementById('bgDefaultCurve2');
        if (bgCurve2) bgCurve2.classList.add('is-hidden');
        const bgCurve3 = document.getElementById('bgDefaultCurve3');
        if (bgCurve3) bgCurve3.classList.add('is-hidden');
        const bgCurve4 = document.getElementById('bgDefaultCurve4');
        if (bgCurve4) bgCurve4.classList.add('is-hidden');

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
          if (typeof currentState !== 'number') setState(1);
          ok = typeof currentState === 'number';
        }
      } else if (phase === '2') {
        const bgCurve3 = document.getElementById('bgDefaultCurve3');
        if (bgCurve3) bgCurve3.classList.add('is-hidden');
        const bgCurve4 = document.getElementById('bgDefaultCurve4');
        if (bgCurve4) bgCurve4.classList.add('is-hidden');

        if (kind === 'default') {
          const accept = currentPhase2State === 'default' || (!isMobileView() && currentPhase2State === '02-1');
          if (!accept) setPhase2State('default');
          ok = currentPhase2State === 'default' || (!isMobileView() && currentPhase2State === '02-1');
        } else if (kind === 'intro') {
          if (currentPhase2State !== '02-1') setPhase2State('02-1');
          ok = currentPhase2State === '02-1';
        } else if (kind === 'page') {
          if (typeof currentPhase2State !== 'number') setPhase2State(1);
          ok = typeof currentPhase2State === 'number';
        }
      } else if (phase === '3') {
        const bgCurve4 = document.getElementById('bgDefaultCurve4');
        if (bgCurve4) bgCurve4.classList.add('is-hidden');

        if (kind === 'default') {
          const accept = currentPhase3State === 'default' || (!isMobileView() && currentPhase3State === '03-1');
          if (!accept) setPhase3State('default');
          ok = currentPhase3State === 'default' || (!isMobileView() && currentPhase3State === '03-1');
        } else if (kind === 'intro') {
          if (currentPhase3State !== '03-1') setPhase3State('03-1');
          ok = currentPhase3State === '03-1';
        } else if (kind === 'page') {
          if (typeof currentPhase3State !== 'number') setPhase3State(1);
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
          if (typeof currentPhase4State !== 'number') setPhase4State(1);
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
        const isInView = (rootRect.bottom > navHeight && rootRect.top < window.innerHeight);
        root.classList.toggle('is-inview', isInView);

        // 控制 html.ps-snap：僅在進入此區塊範圍時開啟吸附
        const inSnapZone = (rootRect.top <= navHeight + 10 && rootRect.bottom >= window.innerHeight - 10);
        document.documentElement.classList.toggle('ps-snap', inSnapZone && !programmaticScroll);

        if (!programmaticScroll && isInView) {
          applyAnchorState();
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

        // Phase 4 線段
        let p4 = 0;
        if (st <= s3Page) {
          p4 = 0;
        } else if (st < s4Home) {
          const progressToHome = (st - s3Page) / (s4Home - s3Page);
          p4 = Math.min(Math.max(progressToHome * diamondRatio, 0), diamondRatio);
        } else if (st <= s4Page) {
          const progressToPage = (st - s4Home) / (s4Page - s4Home);
          p4 = Math.min(Math.max(diamondRatio + progressToPage * (1 - diamondRatio), diamondRatio), 1);
        } else {
          p4 = 1;
        }
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
      function attachSwipe(elemId, onNext, onPrev) {
        const el = document.getElementById(elemId);
        if (!el) return;

        let startX = 0;
        let startY = 0;
        let isTracking = false;
        let startTime = 0;

        el.addEventListener('pointerdown', (e) => {
          if (e.pointerType === 'mouse' && e.button !== 0) return;
          isTracking = true;
          startX = e.clientX;
          startY = e.clientY;
          startTime = Date.now();
        });

        el.addEventListener('pointerup', (e) => {
          if (!isTracking) return;
          isTracking = false;
          const dx = e.clientX - startX;
          const dy = e.clientY - startY;
          const dt = Date.now() - startTime;

          // 水平位移大於等於 40px，且水平位移明顯大於垂直位移，時間在 750ms 內
          if (Math.abs(dx) >= 40 && Math.abs(dx) > Math.abs(dy) * 1.2 && dt < 750) {
            lastManualStateTime = Date.now() + 600;
            if (dx < 0) {
              onNext();
            } else {
              onPrev();
            }
          }
        });

        el.addEventListener('pointercancel', () => {
          isTracking = false;
        });
      }

      attachSwipe('cardsStackContainer', nextPage, prevPage);
      attachSwipe('cardsStackContainer2', nextPage2, prevPage2);
      attachSwipe('cardsStackContainer3', nextPage3, prevPage3);
      attachSwipe('cardsStackContainer4', nextPage4, prevPage4);
    }

    const stageContainer = document.querySelector('.viewport-stage');
    if (stageContainer) {
      // 方案 A：不再攔截 wheel / touch，滾動交給原生 scroll-snap，只監聽滾動結果
      stageContainer.addEventListener('scroll', handleStageScroll, { passive: true });
      stageContainer.addEventListener('scrollend', () => {
        if (programmaticScroll) endProgrammaticScroll(); else applyAnchorState();
      });
    }
    window.addEventListener('scroll', updateCenterLineScroll, { passive: true });
    window.addEventListener('resize', syncGlobalFixedComponentsPosition, { passive: true });

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

      currentPhase2State = st;

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
    }

    function renderQuotes2(toPage, fromPage, direction = 0) {
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
        document.documentElement.style.setProperty('--mob-quote-push-y', `${pushY}px`);
      } else {
        document.documentElement.style.setProperty('--mob-quote-push-y', '0px');
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
        slot.style.opacity = 'var(--card-sub-opacity)';
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

        setTimeout(() => {
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

        const ease = '0.52s cubic-bezier(0.25, 1, 0.5, 1)';
        if (slotMain) slotMain.style.transition = `transform ${ease}, opacity ${ease}`;
        if (slotSub) slotSub.style.transition = `transform ${ease}, opacity ${ease}`;
        if (slotSpare) slotSpare.style.transition = `transform ${ease}, opacity ${ease}`;

        // slotMain 滑出左側
        setSlotState2(cardRoles2.main, 'out-left');
        // slotSub 平滑放大位移至主要位置
        setSlotState2(cardRoles2.sub, 'main');
        // slotSpare 滑入次要位置
        setSlotState2(cardRoles2.spare, 'sub');

        setTimeout(() => {
          if (slotMain) slotMain.style.transition = 'none';
          if (slotSub) slotSub.style.transition = 'none';
          if (slotSpare) slotSpare.style.transition = 'none';
          const oldMain = cardRoles2.main;
          cardRoles2.main = cardRoles2.sub;
          cardRoles2.sub = cardRoles2.spare;
          cardRoles2.spare = oldMain;
          isTransitioning2 = false;
        }, 540);

      } else { // Prev
        if (imgSpare) imgSpare.src = toData.img;
        if (slotSpare) {
          slotSpare.style.transition = 'none';
          setSlotState2(cardRoles2.spare, 'out-left');
          slotSpare.style.zIndex = '5';
          slotSpare.offsetWidth; // reflow
        }

        const ease = '0.52s cubic-bezier(0.25, 1, 0.5, 1)';
        if (slotMain) slotMain.style.transition = `transform ${ease}, opacity ${ease}`;
        if (slotSub) slotSub.style.transition = `opacity 0.35s ease`;
        if (slotSpare) slotSpare.style.transition = `transform ${ease}, opacity ${ease}`;

        setSlotState2(cardRoles2.main, 'sub');
        setSlotState2(cardRoles2.spare, 'main');
        if (slotSub) slotSub.style.opacity = '0';

        setTimeout(() => {
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
        }, 540);
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

      currentPhase3State = st;

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
    }

    function renderQuotes3(toPage, fromPage, direction = 0) {
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
        document.documentElement.style.setProperty('--mob-quote-push-y', `${pushY}px`);
      } else {
        document.documentElement.style.setProperty('--mob-quote-push-y', '0px');
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
        slot.style.opacity = 'var(--card-sub-opacity)';
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

        setTimeout(() => {
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

        const ease = '0.52s cubic-bezier(0.25, 1, 0.5, 1)';
        if (slotMain) slotMain.style.transition = `transform ${ease}, opacity ${ease}`;
        if (slotSub) slotSub.style.transition = `transform ${ease}, opacity ${ease}`;
        if (slotSpare) slotSpare.style.transition = `transform ${ease}, opacity ${ease}`;

        setSlotState3(cardRoles3.main, 'out-left');
        setSlotState3(cardRoles3.sub, 'main');
        setSlotState3(cardRoles3.spare, 'sub');

        setTimeout(() => {
          if (slotMain) slotMain.style.transition = 'none';
          if (slotSub) slotSub.style.transition = 'none';
          if (slotSpare) slotSpare.style.transition = 'none';
          const oldMain = cardRoles3.main;
          cardRoles3.main = cardRoles3.sub;
          cardRoles3.sub = cardRoles3.spare;
          cardRoles3.spare = oldMain;
          isTransitioning3 = false;
        }, 540);

      } else { // Prev
        if (imgSpare) imgSpare.src = toData.img;
        if (slotSpare) {
          slotSpare.style.transition = 'none';
          setSlotState3(cardRoles3.spare, 'out-left');
          slotSpare.style.zIndex = '5';
          slotSpare.offsetWidth; // reflow
        }

        const ease = '0.52s cubic-bezier(0.25, 1, 0.5, 1)';
        if (slotMain) slotMain.style.transition = `transform ${ease}, opacity ${ease}`;
        if (slotSub) slotSub.style.transition = `opacity 0.35s ease`;
        if (slotSpare) slotSpare.style.transition = `transform ${ease}, opacity ${ease}`;

        setSlotState3(cardRoles3.main, 'sub');
        setSlotState3(cardRoles3.spare, 'main');
        if (slotSub) slotSub.style.opacity = '0';

        setTimeout(() => {
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
        }, 540);
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

      currentPhase4State = st;

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
    }

    function renderQuotes4(toPage, fromPage, direction = 0) {
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
        document.documentElement.style.setProperty('--mob-quote-push-y', `${pushY}px`);
      } else {
        document.documentElement.style.setProperty('--mob-quote-push-y', '0px');
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
        slot.style.opacity = 'var(--card-sub-opacity)';
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

        setTimeout(() => {
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

        const ease = '0.52s cubic-bezier(0.25, 1, 0.5, 1)';
        if (slotMain) slotMain.style.transition = `transform ${ease}, opacity ${ease}`;
        if (slotSub) slotSub.style.transition = `transform ${ease}, opacity ${ease}`;
        if (slotSpare) slotSpare.style.transition = `transform ${ease}, opacity ${ease}`;

        setSlotState4(cardRoles4.main, 'out-left');
        setSlotState4(cardRoles4.sub, 'main');
        setSlotState4(cardRoles4.spare, 'sub');

        setTimeout(() => {
          if (slotMain) slotMain.style.transition = 'none';
          if (slotSub) slotSub.style.transition = 'none';
          if (slotSpare) slotSpare.style.transition = 'none';
          const oldMain = cardRoles4.main;
          cardRoles4.main = cardRoles4.sub;
          cardRoles4.sub = cardRoles4.spare;
          cardRoles4.spare = oldMain;
          isTransitioning4 = false;
        }, 540);

      } else { // Prev
        if (imgSpare) imgSpare.src = toData.img;
        if (slotSpare) {
          slotSpare.style.transition = 'none';
          setSlotState4(cardRoles4.spare, 'out-left');
          slotSpare.style.zIndex = '5';
          slotSpare.offsetWidth; // reflow
        }

        const ease = '0.52s cubic-bezier(0.25, 1, 0.5, 1)';
        if (slotMain) slotMain.style.transition = `transform ${ease}, opacity ${ease}`;
        if (slotSub) slotSub.style.transition = `opacity 0.35s ease`;
        if (slotSpare) slotSpare.style.transition = `transform ${ease}, opacity ${ease}`;

        setSlotState4(cardRoles4.main, 'sub');
        setSlotState4(cardRoles4.spare, 'main');
        if (slotSub) slotSub.style.opacity = '0';

        setTimeout(() => {
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
        }, 540);
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

    
    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    window.addEventListener('resize', () => {
      updateNavHeight();
      updateResponsiveScale();
    }, { passive: true });

    // 初始化
    updateImageSources();
    updateNavHeight();
    updateResponsiveScale();
    initSentenceTracks();
    initSentenceTracks2();
    initSentenceTracks3();
    initSentenceTracks4();
    setupCardSwipeGestures();
    updateGlobalTopLeftBadge(1, false);
    updateCenterLineScroll();
    const bgCurve2Init = document.getElementById('bgDefaultCurve2');
    if (bgCurve2Init) bgCurve2Init.classList.add('is-hidden');
    const bgCurve3Init = document.getElementById('bgDefaultCurve3');
    if (bgCurve3Init) bgCurve3Init.classList.add('is-hidden');
    const bgCurve4Init = document.getElementById('bgDefaultCurve4');
    if (bgCurve4Init) bgCurve4Init.classList.add('is-hidden');

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
