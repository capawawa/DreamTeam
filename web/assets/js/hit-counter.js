/**
 * Retro Hit Counter
 * - Increments a global localStorage counter "global_visits"
 * - Renders into any element with id="hit-counter" as a 7-seg style number
 * - Pads to 6+ digits
 */
(function(){
  const KEY = 'global_visits';
  function pad(n, width=6){
    const s=String(n);
    return s.length>=width ? s : new Array(width - s.length + 1).join('0') + s;
  }
  try{
    const raw = localStorage.getItem(KEY);
    const val = raw ? parseInt(raw,10) : 0;
    const next = isFinite(val) ? (val+1) : 1;
    localStorage.setItem(KEY,String(next));
    const el = document.getElementById('hit-counter');
    if(el){ el.textContent = pad(next); }
  }catch(e){
    const el = document.getElementById('hit-counter');
    if(el){ el.textContent = '000001'; }
  }
})();