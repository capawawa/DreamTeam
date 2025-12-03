/**
 * Minimal Markdown Viewer + Link Rewriter (no external CDN)
 * Features:
 * - Fetches ?src=relative-path (optionally with :line suffix)
 * - Minimal converter: headings (#, ##, ###), lists (- * +), code fences ``` and inline `code`
 * - Links [text](url) with rewriting rules:
 *   - If href ends with .md (and not http[s]), route to viewer.html?src=normalizedPath
 *   - Preserve MARKDOWN RULES style like docs/canon/Canon_Rules.md:34 (line number)
 *   - Normalize relative links against the current src directory (handles ../)
 * - View Raw button points to ../ + src (assumes serving from repo root or adjusted hosting)
 */

(function(){
  const outEl = document.getElementById('mdOutput');
  if(!outEl) return;

  // Utilities
  function getParams(){
    const p=new URLSearchParams(location.search);
    const qsrc=p.get('src')||'';
    let line=null;
    let src=qsrc;
    const colonIdx=qsrc.lastIndexOf(':');
    if(colonIdx>0){
      const maybe=qsrc.slice(colonIdx+1);
      if(/^\d+$/.test(maybe)){ line=maybe; src=qsrc.slice(0,colonIdx) }
    }
    return { src, line };
  }
  function dirname(path){
    const i=path.lastIndexOf('/');
    return i>=0? path.slice(0,i) : '';
  }
  function joinPath(base, rel){
    if(rel.startsWith('/')) return rel.slice(1);
    const stack = base ? base.split('/') : [];
    const parts = rel.split('/');
    for(const p of parts){
      if(p==='.'||p==='') continue;
      if(p==='..') stack.pop();
      else stack.push(p);
    }
    return stack.join('/');
  }
  function isHttp(u){ return /^https?:\/\//i.test(u) }
  function escapeHtml(s){
    return s.replace(/[&<>"]/g, c => ({'&':'&','<':'<','>':'>','"':'"'}[c]));
  }
  function slugify(text){
    return ('h-'+text.toLowerCase().trim().replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g,'-').replace(/-+/g,'-')).replace(/^-+/,'');
  }

  // Tiny Markdown converter (pragmatic)
  function mdToHtml(md){
    // Normalize newlines
    md = md.replace(/\r\n?/g,'\n');

    // Code fences ```
    let inFence=false;
    let fenceLang='';
    const lines = md.split('\n');
    let html = '';
    for(let i=0;i<lines.length;i++){
      let line = lines[i];

      // fenced blocks
      if(line.trim().startsWith('```')){
        if(!inFence){
          inFence = true;
          fenceLang = line.trim().slice(3).trim();
          html += `<pre><code>`;
        }else{
          inFence = false;
          fenceLang = '';
          html += `</code></pre>\n`;
        }
        continue;
      }
      if(inFence){
        html += escapeHtml(line)+'\n';
        continue;
      }

      // headings with anchors
      if(/^###\s+/.test(line)){
        const t = line.replace(/^###\s+/,''); const id = slugify(t);
        html += `<h3 id="${id}">${escapeInline(t)}</h3>\n`; continue;
      }
      if(/^##\s+/.test(line)){
        const t = line.replace(/^##\s+/,''); const id = slugify(t);
        html += `<h2 id="${id}">${escapeInline(t)}</h2>\n`; continue;
      }
      if(/^#\s+/.test(line)){
        const t = line.replace(/^#\s+/,''); const id = slugify(t);
        html += `<h1 id="${id}">${escapeInline(t)}</h1>\n`; continue;
      }

      // lists (-, *, +) simple
      if(/^(\s*)(\-|\*|\+)\s+/.test(line)){
        // collect consecutive list items
        const items = [];
        let j=i;
        for(; j<lines.length; j++){
          const li = lines[j];
          if(/^(\s*)(\-|\*|\+)\s+/.test(li)) items.push(li.replace(/^(\s*)(\-|\*|\+)\s+/, ''));
          else break;
        }
        html += '<ul>\n';
        for(const it of items){ html += `<li>${escapeInline(it)}</li>\n`; }
        html += '</ul>\n';
        i = j-1;
        continue;
      }

      // horizontal rule
      if(/^(\-\s*){3,}$/.test(line.trim())){
        html += '<hr/>\n'; continue;
      }

      // paragraph or blank
      if(line.trim()===''){ html += '\n'; continue; }
      html += `<p>${escapeInline(line)}</p>\n`;
    }
    // close if ended inside fence
    if(inFence) html += '</code></pre>\n';
    return html;
  }

  // Inline: code `x` and links [t](u)
  function escapeInline(s){
    // inline code
    s = s.replace(/`([^`]+)`/g,(m,code)=>`<code>${escapeHtml(code)}</code>`);
    // links
    s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g,(m,text,href)=>{
      const escText = escapeHtml(text);
      const escHref = escapeHtml(href);
      return `<a href="${escHref}">${escText}</a>`;
    });
    return s;
  }

  // After render: rewrite links per rules
  function rewriteLinks(container, currentSrc){
    const baseDir = dirname(currentSrc);
    container.querySelectorAll('a[href]').forEach(a=>{
      const raw = a.getAttribute('href');
      if(!raw) return;

      // Ignore http(s)
      if(isHttp(raw)) return;

      // Normalize relative against current src directory
      let href = raw;

      // If anchor-only, keep it
      if(href.startsWith('#')) return;

      // Capture optional :line suffix e.g., docs/canon/Canon_Rules.md:34
      let line = null;
      const mdMatch = href.match(/^(.*?\.md)(?::(\d+))?$/i);

      // If it's a .md path (no http), route to viewer
      if(mdMatch){
        const mdPath = mdMatch[1];
        if(!isHttp(mdPath)){
          const normalized = joinPath(baseDir, mdPath);
          if(mdMatch[2]) line = mdMatch[2];
          const newHref = `viewer.html?src=${encodeURIComponent(normalized+(line?(':'+line):''))}`;
          a.setAttribute('href', newHref);
          return;
        }
      }

      // If relative non-md (like images), make it relative to current file dir
      const normalized = joinPath(baseDir, href);
      a.setAttribute('href', normalized);
    });
  }

  // Fetch & render
  async function load(){
    const { src } = getParams();
    if(!src){
      outEl.innerHTML = `<p class="error">No ?src provided. Example: ?src=docs/bible/DreamTeam_Writers_Book.md</p>`;
      return;
    }
    try{
      const res = await fetch(`../${src}`, { cache: 'no-store' });
      if(!res.ok){
        const safeSrc = escapeHtml(src);
        const code = res.status;
        const rawHref = '../'+src;
        outEl.innerHTML = `
          <div class="md-container" style="border-color:#803; background:rgba(32,8,12,0.7)">
            <h2 class="error">404 — Could not load document</h2>
            <p>Failed to load: <code>${safeSrc}</code> (HTTP ${code})</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap">
              <button class="btn" id="retryLoad">Retry</button>
              <a class="btn raw-link" href="${rawHref}" target="_blank" rel="noopener">View raw</a>
              <a class="btn" href="../index.html">Back to Home</a>
            </div>
          </div>`;
        document.getElementById('retryLoad')?.addEventListener('click', ()=>load());
        return;
      }
      const txt = await res.text();
      const html = mdToHtml(txt);
      outEl.innerHTML = `<div id="content">${html}</div>`;

      // Rewrite links inside rendered markdown
      rewriteLinks(outEl, src);
      // Build anchors & TOC if site.js is present
      const sections = (window.buildAnchorsAndSections? window.buildAnchorsAndSections(): null);
      if(window.buildToc) window.buildToc();
      if(window.smoothScroll) window.smoothScroll();
      if(window.scrollSpy) window.scrollSpy();
      if(window.searchInit && sections) window.searchInit(sections);

      // Export chrome-less view
      const usp = new URLSearchParams(location.search);
      if(usp.get('view')==='export'){ document.body.classList.add('export-view'); }

      // Hash scroll + highlight
      if(location.hash){
        const id = decodeURIComponent(location.hash.slice(1));
        const target = document.getElementById(id);
        if(target){
          target.scrollIntoView({behavior:'smooth',block:'start'});
          target.classList.add('hash-hit');
          setTimeout(()=>target.classList.remove('hash-hit'), 1500);
        }
      }

      // Line suffix banner & heuristic scroll
      const { line } = getParams();
      const banner = document.getElementById('lineBanner');
      if(line && banner){
        banner.textContent = `Source line L${line}`;
        // Approximate nearest heading above that line
        const lines = txt.replace(/\r\n?/g,'\n').split('\n');
        let up = Math.max(0, Math.min(lines.length-1, parseInt(line,10)-1));
        let headingId = null;
        for(let i=up;i>=0;i--){
          const m = lines[i].match(/^(#{1,3})\s+(.*)$/);
          if(m){ headingId = slugify(m[2]); break; }
        }
        if(headingId){const h = document.getElementById(headingId);
          if(h){
            h.scrollIntoView({behavior:'smooth',block:'start'});
            h.classList.add('hash-hit');
            setTimeout(()=>h.classList.remove('hash-hit'), 1500);
          }
        }
      }
    }catch(err){
      const safeSrc = escapeHtml(src);
      const msg = escapeHtml(String(err));
      const rawHref = '../'+src;
      outEl.innerHTML = `
        <div class="md-container" style="border-color:#803; background:rgba(32,8,12,0.7)">
          <h2 class="error">Load Error</h2>
          <p>Problem loading: <code>${safeSrc}</code></p>
          <pre style="white-space:pre-wrap">${msg}</pre>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button class="btn" id="retryLoad">Retry</button>
            <a class="btn raw-link" href="${rawHref}" target="_blank" rel="noopener">View raw</a>
            <a class="btn" href="../index.html">Back to Home</a>
          </div>
        </div>`;
      document.getElementById('retryLoad')?.addEventListener('click', ()=>load());
    }
  }

  async function checkLinks(){
    const report = [];
    const anchors = outEl.querySelectorAll('a[href]');
    const tasks = [];
    anchors.forEach(a=>{
      const href = a.getAttribute('href')||'';
      if(/\.md(\?|#|$)/i.test(href) && !/^https?:/i.test(href)){
        const url = href.startsWith('viewer.html') ? href : `viewer.html?src=${encodeURIComponent(href.replace(/^(\.\/)/,''))}`;
        tasks.push((async()=>{
          try{
            let res = await fetch(url, { method:'HEAD', cache:'no-store' });
            if(!res.ok) throw new Error(String(res.status));
            report.push({href:url, ok:true, status:res.status});
          }catch(e){
            try{
              const res2 = await fetch(url, { cache:'no-store' });
              report.push({href:url, ok:res2.ok, status:res2.status});
            }catch(_){
              report.push({href:url, ok:false, status:'ERR'});
            }
          }
        })());
      }
    });
    await Promise.all(tasks);
    // Show panel
    let panel = document.getElementById('link-report');
    if(!panel){
      panel = document.createElement('div');
      panel.id='link-report';
      panel.style.position='fixed'; panel.style.left='16px'; panel.style.top='96px';
      panel.style.maxWidth='420px'; panel.style.maxHeight='60vh'; panel.style.overflow='auto';
      panel.style.background='rgba(8,12,24,0.95)'; panel.style.border='2px solid var(--border)'; panel.style.borderRadius='10px'; panel.style.padding='10px'; panel.style.zIndex='10';
      document.body.appendChild(panel);
    }
    panel.innerHTML = `<h4 style="margin:0 0 8px;color:var(--muted);font-size:12px">Link Check</h4>` + report
      .sort((a,b)=> (a.ok===b.ok?0:(a.ok?-1:1)))
      .map(r=>`<div><span style="color:${r.ok?'#8f8':'#f88'}">${r.ok?'OK':'BROKEN'}</span> — <a href="${r.href}" target="_blank" rel="noopener">${r.href}</a> <span class="note">(${r.status})</span></div>`).join('');
  }

  // Expose minimal hooks for viewer toolbar
  window._mdv = {
    reload: load,
    checkLinks
  };

  // Wire toolbar
  document.getElementById('reloadBtn')?.addEventListener('click', ()=>load());
// Wire Viewer utility bar controls
document.getElementById('checkLinksBtn')?.addEventListener('click', ()=>checkLinks());
document.getElementById('exportHtml')?.addEventListener('click', ()=>{
  const usp=new URLSearchParams(location.search); usp.set('view','export');
  const u = location.pathname.split('/').pop() + '?' + usp.toString();
  window.open(u, '_blank','noopener');
});
document.getElementById('printPdf')?.addEventListener('click', ()=>window.print());
const qa=document.getElementById('quickActions'); if(qa){ qa.addEventListener('change',()=>{ if(qa.value){ location.href = qa.value; } }); }
const ip=document.getElementById('inpageSearch'); document.getElementById('inpageSearchBtn')?.addEventListener('click', ()=>{ if(window.searchHeadings){ window.searchHeadings(ip?.value||''); } });

  // Initial load
  load();
})();