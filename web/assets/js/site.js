function slugify(text){return text.toLowerCase().trim().replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g,'-').replace(/-+/g,'-')}

// Registry: doc metadata for freshness stamps (update dates as needed)
const DT_DOCS = {
  "docs/bible/DreamTeam_Writers_Book.md": { title:"Writer’s Book", lastUpdated: "2025-08-20T00:00:00Z" },
  "scripts/format/Comic_Script_Format.md": { title:"Script Format", lastUpdated: "2025-08-10T00:00:00Z" },
  "production/Production_Plan.md": { title:"Production Plan", lastUpdated: "2025-08-28T00:00:00Z" },
  "docs/canon/Canon_Rules.md": { title:"Canon Rules", lastUpdated: "2025-08-05T00:00:00Z" },
  "docs/characters/Character_Bible.md": { title:"Character Bible", lastUpdated: "2025-08-15T00:00:00Z" },
  "docs/setting/Firedog_Setting.md": { title:"World & Setting", lastUpdated: "2025-08-08T00:00:00Z" },
  "outline/Series_Outline.md": { title:"Series Outline", lastUpdated: "2025-08-01T00:00:00Z" },
  "docs/narrative/Narrative_Structure.md": { title:"Narrative Structure", lastUpdated: "2025-08-12T00:00:00Z" },
  "scripts/issue-01/Issue01_Script_Sample.md": { title:"Script Sample", lastUpdated: "2025-08-03T00:00:00Z" }
};
function renderFreshnessBadges(){
  const now = Date.now();
  document.querySelectorAll('[data-path]').forEach(a=>{
    const key = (a.getAttribute('data-path')||'').replace(/#.*$/,'');
    const meta = DT_DOCS[key];
    if(!meta) return;
    const days = Math.floor((now - Date.parse(meta.lastUpdated))/86400000);
    let kind = '';
    if(days <= 7) kind = 'NEW';
    else if(days <= 14) kind = 'UPDATED';
    if(kind){
      const b = document.createElement('span');
      b.className = 'fresh-badge ' + (kind==='UPDATED'?'updated':'new');
      b.textContent = kind;
      a.after(b);
    }
  });
}

// Optional anchors (only if a #content doc exists)
function buildAnchorsAndSections(){
  const content=document.getElementById('content');
  if(!content) return [];
  const heads=[...content.querySelectorAll('h2, h3')];
  const sections=[];
  let current=null;
  heads.forEach(h=>{
    if(!h.id){h.id=slugify(h.textContent)}
    const a=document.createElement('a');a.className='anchor';a.href='#'+h.id;a.textContent='¶';h.appendChild(a);
    if(h.tagName==='H2'){
      current=document.createElement('section');current.dataset.sectionId=h.id;h.before(current);current.appendChild(h);sections.push(current)
    }else if(current){current.appendChild(h)}
  });
  let n=current?current.nextSibling:null;
  while(n){const next=n.nextSibling;if(n.nodeType===Node.ELEMENT_NODE){current&&current.appendChild(n)}n=next}
  return sections;
}

function buildToc(){
  const toc=document.getElementById('toc');
  const content=document.getElementById('content');
  if(!toc || !content) return;
  const h2=[...content.querySelectorAll('h2')];
  const h3=[...content.querySelectorAll('h3')];
  const map=new Map(h2.map(h=>[h.id,[]]));
  h3.forEach(h=>{
    let prev=h.previousElementSibling;
    while(prev&&prev.tagName!=='H2'){prev=prev.previousElementSibling}
    if(prev&&map.has(prev.id)){map.get(prev.id).push(h)}
  });
  h2.forEach(h=>{
    const li=document.createElement('li');
    const link=document.createElement('a');link.href='#'+h.id;link.textContent=h.textContent;li.appendChild(link);
    const subs=map.get(h.id)||[];
    if(subs.length){
      const ul=document.createElement('ul');
      subs.forEach(s=>{
        const sli=document.createElement('li');const sl=document.createElement('a');sl.href='#'+s.id;sl.textContent=s.textContent;sli.appendChild(sl);ul.appendChild(sli)
      });
      li.appendChild(ul)
    }
    toc.appendChild(li)
  })
}

function smoothScroll(){
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const id=a.getAttribute('href').slice(1);
      const target=document.getElementById(id);
      if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'});history.pushState(null,'','#'+id)}
    })
  })
}

function scrollSpy(){
  const links=[...document.querySelectorAll('#toc a')];
  const headers=[...document.querySelectorAll('main h2')];
  if(!links.length || !headers.length) return;
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(en=>{
      if(en.isIntersecting){
        const id=en.target.id;
        links.forEach(l=>l.classList.toggle('active',l.getAttribute('href')==='#'+id))
      }
    })
  },{rootMargin:'-30% 0px -60% 0px',threshold:[0,1]});
  headers.forEach(h=>obs.observe(h))
}

function searchInit(sections){
  const input=document.getElementById('search');
  if(!input || !sections) return;
  input.addEventListener('input',()=>{
    const q=input.value.toLowerCase().trim();
    sections.forEach(sec=>{
      const text=sec.textContent.toLowerCase();
      sec.classList.toggle('hidden',q&&text.indexOf(q)===-1)
    })
  })
}

function themeInit(){
  const btn=document.getElementById('theme');
  if(!btn) return;
  const key='dt-theme';
  const set=(m)=>{document.body.classList.toggle('dark',m==='dark');localStorage.setItem(key,m)};
  const saved=localStorage.getItem(key)||'light';
  set(saved);
  btn.addEventListener('click',()=>{set(document.body.classList.contains('dark')?'light':'dark')})
}

/* Visual Mode (Pro vs Retro) */
function toggleVisualMode(){
  const KEY = 'dt-visual-mode';
  const current = localStorage.getItem(KEY) || 'retro';
  const next = current === 'pro' ? 'retro' : 'pro';
  localStorage.setItem(KEY, next);
  applyVisualMode(next);
}
function applyVisualMode(mode){
  // retro.css injected only for retro
  const LINK_ID='retro-css';
  const href=(location.pathname.includes('/pages/')?'../':'')+'assets/css/retro.css';
  let link=document.getElementById(LINK_ID);
  const isRetro = mode==='retro';
  if(isRetro && !link){
    link=document.createElement('link'); link.id=LINK_ID; link.rel='stylesheet'; link.href=href; document.head.appendChild(link);
  }else if(!isRetro && link){
    link.remove();
  }
  document.body.classList.toggle('retro', isRetro);
  document.body.classList.toggle('pro', mode==='pro');
  const btn = document.getElementById('retroToggle') || document.getElementById('visualToggle');
  if(btn){ btn.textContent = mode==='pro' ? 'Retro Mode' : 'Pro Mode' }
}
function visualModeInit(){
  const KEY='dt-visual-mode';
  applyVisualMode(localStorage.getItem(KEY)||'retro');
  const hook = document.getElementById('retroToggle') || document.getElementById('visualToggle');
  if(hook){ hook.addEventListener('click', ()=>{ const cur=localStorage.getItem(KEY)||'retro'; const next=cur==='pro'?'retro':'pro'; localStorage.setItem(KEY,next); applyVisualMode(next); }); }
}
// Back-compat: keep name for callers
function retroModeInit(){ visualModeInit(); }

// Footer: last updated
function lastUpdatedInit(){
  const el=document.getElementById('last-updated');
  if(el){ el.textContent=new Date().toLocaleDateString() }
}

// QoL: Back to top button
function backToTop(){
  const btn=document.getElementById('toTop');
  if(!btn) return;
  const onScroll=()=>{btn.classList.toggle('show',window.scrollY>600)};
  window.addEventListener('scroll',onScroll,{passive:true});
  btn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
  onScroll()
}

function marqueeHover(){
  const track=document.querySelector('.marquee-track');
  if(!track) return;
  track.addEventListener('mouseenter',()=>{track.style.animationDuration='40s'});
  track.addEventListener('mouseleave',()=>{track.style.animationDuration='20s'})
}

document.addEventListener('DOMContentLoaded',()=>{
  const sections=buildAnchorsAndSections();
  buildToc();
  smoothScroll();
  scrollSpy();
  searchInit(sections);
  themeInit();
  retroModeInit(); // now routes to visualModeInit
  lastUpdatedInit();
  backToTop();
  marqueeHover();
  renderFreshnessBadges();
});
