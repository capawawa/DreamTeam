/**
 * Guestbook (client-only, localStorage)
 * - Stores entries under key "guestbook_entries" (array of {name,message,ts})
 * - Renders a retro table
 * - Shows "Under Construction" flair if empty
 */
(function(){
  const KEY = 'guestbook_entries';

  function load(){
    try{
      const raw = localStorage.getItem(KEY);
      if(!raw) return [];
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    }catch(e){
      return [];
    }
  }
  function save(entries){
    try{
      localStorage.setItem(KEY, JSON.stringify(entries));
    }catch(e){}
  }

  function fmtDate(ts){
    try{
      const d = new Date(ts);
      return d.toLocaleString();
    }catch(e){
      return String(ts);
    }
  }

  function render(){
    const list = load();
    const table = document.getElementById('guestbook-table');
    const empty = document.getElementById('guestbook-empty');
    const body = document.getElementById('guestbook-body');
    if(!table || !empty || !body) return;

    body.innerHTML = '';
    if(list.length === 0){
      table.style.display = 'none';
      empty.style.display = 'block';
      return;
    }
    table.style.display = 'table';
    empty.style.display = 'none';

    list
      .slice() // copy
      .sort((a,b)=>b.ts - a.ts)
      .forEach((e,i)=>{
        const tr = document.createElement('tr');
        const tdN = document.createElement('td');
        const tdM = document.createElement('td');
        const tdT = document.createElement('td');
        tdN.textContent = e.name || 'Anonymous';
        tdM.textContent = e.message || '';
        tdT.textContent = fmtDate(e.ts);
        tr.appendChild(tdN); tr.appendChild(tdM); tr.appendChild(tdT);
        body.appendChild(tr);
      });
  }

  function onSubmit(ev){
    ev.preventDefault();
    const name = document.getElementById('gb-name')?.value.trim() || 'Anonymous';
    const msg  = document.getElementById('gb-message')?.value.trim() || '';
    if(!msg){
      alert('Please write a message.');
      return;
    }
    const entries = load();
    entries.push({ name, message: msg, ts: Date.now() });
    save(entries);
    (document.getElementById('gb-message')||{}).value = '';
    render();
  }

  function onClear(){
    if(confirm('Clear all guestbook entries on this browser?')){
      save([]);
      render();
    }
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('gb-form')?.addEventListener('submit', onSubmit);
    document.getElementById('gb-clear')?.addEventListener('click', onClear);
    render();
  });
})();