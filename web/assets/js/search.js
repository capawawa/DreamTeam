/**
 * Heading search helper for Viewer utility bar
 * Exposes: window.searchHeadings(query)
 * - Scans visible H1/H2/H3 under #content
 * - Renders floating results panel (#search-results)
 * - Clicking a result scrolls smoothly to that heading
 */
(function(){
  function ensurePanel(){
    let panel = document.getElementById('search-results');
    if(!panel){
      panel = document.createElement('div');
      panel.id = 'search-results';
      panel.innerHTML = '<h4>Search Results</h4>';
      document.body.appendChild(panel);
    }
    return panel;
  }
  function clearPanel(){
    const panel = document.getElementById('search-results');
    if(panel) panel.remove();
  }
  function makeRow(h){
    const a = document.createElement('a');
    a.href = '#' + h.id;
    a.textContent = (h.textContent || '').trim().slice(0, 140);
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      const id = h.id;
      if(!id) return;
      h.scrollIntoView({behavior:'smooth', block:'start'});
      history.pushState(null, '', '#'+id);
      h.classList.add('hash-hit');
      setTimeout(()=>h.classList.remove('hash-hit'), 1200);
    });
    return a;
  }

  window.searchHeadings = function(query){
    const q = (query||'').toLowerCase().trim();
    if(!q){ clearPanel(); return; }
    const root = document.getElementById('content') || document;
    const heads = Array.from(root.querySelectorAll('h1, h2, h3'));
    const matches = heads.filter(h => (h.textContent||'').toLowerCase().includes(q));
    if(!matches.length){ clearPanel(); return; }
    const panel = ensurePanel();
    panel.innerHTML = '<h4>Search Results</h4>';
    matches.slice(0, 50).forEach(h=>{
      if(!h.id){ h.id = (h.textContent||'').toLowerCase().trim().replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g,'-').replace(/-+/g,'-'); }
      panel.appendChild(makeRow(h));
    });
  };
})();