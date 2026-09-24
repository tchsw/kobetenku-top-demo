document.addEventListener('DOMContentLoaded',()=>{
  const root=document.querySelector('.kobe-tenku-front');
  if(!root)return;
  const assetBase=(root.dataset.assetBase||'').replace(/\/$/,'');
  const imageUrl=file=>`${assetBase}/images/${file}`;
  window.setTimeout(()=>document.body.classList.add('kt-is-ready'),120);
  const headerState=()=>document.body.classList.toggle('kt-is-scrolled',window.scrollY>30);
  headerState();
  window.addEventListener('scroll',headerState,{passive:true});
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.14,rootMargin:'0px 0px -6%'});
  root.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
  const parallaxEls=[...root.querySelectorAll('[data-parallax]')];
  const story=root.querySelector('.garden-story');
  const storyChapters=story?[...story.querySelectorAll('.garden-story__chapter')]:[];
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
  let activeStoryIndex=-1;
  let ticking=false;
  const draw=()=>{
    parallaxEls.forEach(el=>{const box=el.parentElement.getBoundingClientRect();const speed=Number(el.dataset.parallax||0);el.style.translate=`0 ${Math.round(-box.top*speed)}px`});
    if(storyChapters.length){
      const rect=story.getBoundingClientRect();
      const distance=Math.max(1,story.offsetHeight-window.innerHeight);
      const progress=Math.min(1,Math.max(0,-rect.top/distance));
      const nextIndex=storyChapters.length===3
        ?(progress<.24?0:progress<.64?1:2)
        :Math.min(storyChapters.length-1,Math.floor(progress*storyChapters.length));
      if(nextIndex!==activeStoryIndex){
        activeStoryIndex=nextIndex;
        storyChapters.forEach((chapter,index)=>{
          const active=index===activeStoryIndex;
          chapter.classList.toggle('is-active',active);
          chapter.style.pointerEvents=active?'auto':'none';
          chapter.setAttribute('aria-hidden',String(!active));
        });
      }
    }
    ticking=false
  };
  window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(draw);ticking=true}},{passive:true});
  window.addEventListener('resize',()=>{if(!ticking){requestAnimationFrame(draw);ticking=true}},{passive:true});
  root.addEventListener('wheel',event=>{
    if(event.ctrlKey||event.metaKey||event.deltaY===0)return;
    event.preventDefault();
    window.scrollBy({top:event.deltaY*.5,left:event.deltaX*.5,behavior:'instant'});
  },{passive:false});
  draw();
  const menu=root.querySelector('.menu-button');
  const nav=root.querySelector('.nav');
  const setMenu=open=>{document.body.classList.toggle('kt-menu-open',open);menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'メニューを閉じる':'メニューを開く');nav.setAttribute('aria-hidden',String(!open))};
  menu.addEventListener('click',()=>setMenu(!document.body.classList.contains('kt-menu-open')));
  root.querySelectorAll('.nav a').forEach(link=>link.addEventListener('click',()=>setMenu(false)));
  document.addEventListener('keydown',event=>{if(event.key==='Escape')setMenu(false)});
  document.addEventListener('click',event=>{if(document.body.classList.contains('kt-menu-open')&&!event.target.closest('.header'))setMenu(false)});

  const mapData={
    'ground':{title:'グラウンド',image:imageUrl('map-ground.webp'),alt:'山と空に囲まれた神戸天空のグラウンド',text:'森と空にひらかれたグラウンド。季節の風を感じながら、運動や自然を生かした催しに利用できるエリアです。'},
    'atago-shrine':{title:'愛宕神社',image:imageUrl('map-atago-shrine.webp'),alt:'森の中にたたずむ愛宕神社',text:'静かな森に佇む神社。',note:'※通常時は立ち入れません'},
    'atago-pond':{title:'愛宕池',image:imageUrl('map-atago-pond.webp'),alt:'山の緑に囲まれた愛宕池',text:'鷺の住む穏やかな池。',note:'※通常時は立ち入れません'},
    'ginga-onsen':{title:'銀河の湯',image:imageUrl('map-ginga-onsen.webp'),alt:'陽光に照らされる銀河の湯の露天風呂',text:'丹生山田に湧く源泉で、頭上に広がる空と遠い街並みを眺めながら爽やかな風と四季の音に浸れます。'},
    'glamping':{title:'グランピングエリア',image:imageUrl('map-glamping.webp'),alt:'山並みを望む白いグランピングドームとデッキ',text:'白いドームが並ぶ山上の滞在エリア。宿泊はもちろん、気軽に自然を楽しめるデイグランピングもご用意しています。'},
    'cafe-lounge':{title:'カフェラウンジ',image:imageUrl('map-cafe-lounge.webp'),alt:'グランピングドームを望むカフェラウンジの店内',text:'山上の景色を眺めながら、滞在の合間にひと息。季節と時間で変わる空を、ゆったり味わえる場所です。'},
    'spa-suite':{title:'スパスイートエリア',image:imageUrl('dusk.webp'),alt:'夕暮れの空と白いドーム',text:'自然の中でプライベートな時間を大切にできる滞在エリア。夕焼けや星空とともに、静かなひとときを楽しめます。'},
    'dog-run':{title:'ドッグラン',image:imageUrl('map-dog-run.webp'),alt:'山に囲まれた芝生のドッグラン',text:'愛犬と一緒に山上の空気を楽しめる屋外エリア。大きな空の下で、のびのびと過ごせます。'},
    'tennis-court':{title:'テニスコート',image:imageUrl('map-tennis-court.webp'),alt:'緑の山々に囲まれたテニスコート',text:'緑豊かな環境に設けられたテニスコート。フリスビーなどのアクティビティもご用意しております。'}
  };
  const mapInteractive=root.querySelector('.site-map__interactive');
  const mapCard=root.querySelector('.map-card');
  const mapButtons=[...root.querySelectorAll('.map-hotspot')];
  if(mapInteractive&&mapCard&&mapButtons.length){
    const cardImage=mapCard.querySelector('.map-card__image');
    const cardTitle=mapCard.querySelector('.map-card__title');
    const cardText=mapCard.querySelector('.map-card__text');
    const cardNote=mapCard.querySelector('.map-card__note');
    let pinnedArea=null;
    const hideArea=()=>{pinnedArea=null;mapCard.classList.remove('is-active');mapCard.setAttribute('aria-hidden','true');mapButtons.forEach(button=>{button.classList.remove('is-active');button.setAttribute('aria-pressed','false')})};
    const showArea=(key,pin=false)=>{const data=mapData[key];if(!data)return;if(pin)pinnedArea=key;cardImage.src=data.image;cardImage.alt=data.alt;cardTitle.textContent=data.title;cardText.textContent=data.text;cardNote.textContent=data.note||'';mapCard.classList.add('is-active');mapCard.setAttribute('aria-hidden','false');mapButtons.forEach(button=>{const active=button.dataset.area===key;button.classList.toggle('is-active',active);button.setAttribute('aria-pressed',String(active))});if(pin&&matchMedia('(hover:none)').matches)requestAnimationFrame(()=>mapCard.scrollIntoView({behavior:'smooth',block:'nearest'}))};
    mapButtons.forEach(button=>{button.setAttribute('aria-pressed','false');button.addEventListener('mouseenter',()=>{if(!pinnedArea)showArea(button.dataset.area)});button.addEventListener('mouseleave',()=>{if(!pinnedArea&&matchMedia('(hover:hover)').matches)hideArea()});button.addEventListener('focus',()=>{if(!pinnedArea)showArea(button.dataset.area)});button.addEventListener('blur',()=>{if(!pinnedArea&&matchMedia('(hover:hover)').matches)hideArea()});button.addEventListener('click',event=>{event.stopPropagation();showArea(button.dataset.area,true)})});
    mapInteractive.addEventListener('mouseleave',()=>{if(!pinnedArea&&matchMedia('(hover:hover)').matches)hideArea()});
    mapCard.addEventListener('click',event=>event.stopPropagation());
    mapCard.querySelector('.map-card__close').addEventListener('click',hideArea);
    document.addEventListener('click',()=>{if(pinnedArea)hideArea()});
    document.addEventListener('keydown',event=>{if(event.key==='Escape')hideArea()});
  }

  const filmArchive=root.querySelector('.film-archive');
  if(filmArchive){
    const filmItems=[...filmArchive.querySelectorAll('.film-archive__item')];
    const moreButton=filmArchive.querySelector('.film-archive__more');
    const count=filmArchive.querySelector('.film-archive__count span');
    const batchSize=12;
    const updateArchive=()=>{
      const visible=filmItems.filter(item=>!item.hidden).length;
      count.textContent=String(visible);
      if(visible>=filmItems.length)moreButton.hidden=true;
      else moreButton.querySelector('small').textContent=`残り${filmItems.length-visible}枚`;
    };
    moreButton.addEventListener('click',()=>{
      const next=filmItems.filter(item=>item.hidden).slice(0,batchSize);
      next.forEach((item,index)=>{
        const image=item.querySelector('img');
        item.hidden=false;
        if(image.dataset.src){image.src=image.dataset.src;delete image.dataset.src}
        window.setTimeout(()=>item.classList.add('is-shown'),index*45);
      });
      updateArchive();
    });
    updateArchive();
  }
});
