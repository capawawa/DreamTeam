(function(){
  const slides=[...document.querySelectorAll('.slide')];
  const bar=document.querySelector('.bar');
  let i=0;
  function show(n){i=(n+slides.length)%slides.length;slides.forEach((s,idx)=>s.classList.toggle('active',idx===i));bar.style.width=((i+1)/slides.length*100)+'%'}
  function next(){show(i+1)}
  function prev(){show(i-1)}
  document.addEventListener('keydown',e=>{if(['ArrowRight','PageDown',' '].includes(e.key)) next(); else if(['ArrowLeft','PageUp','Backspace'].includes(e.key)) prev()});
  document.getElementById('next').addEventListener('click',next);
  document.getElementById('prev').addEventListener('click',prev);
  document.getElementById('print').addEventListener('click',()=>window.print());
  show(0);
})();
