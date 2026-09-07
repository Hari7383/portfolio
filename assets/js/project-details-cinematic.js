(() => {
  const loader=document.getElementById('detailLoader'), pct=document.getElementById('detailLoad');
  let n=0; const tick=setInterval(()=>{n+=Math.ceil(Math.random()*11); if(n>=100){n=100;clearInterval(tick);setTimeout(()=>loader?.classList.add('is-done'),250)} if(pct)pct.textContent=String(n).padStart(2,'0')+'%'},55);
  const els=[...document.querySelectorAll('.reveal,.reveal-word')];
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12}); els.forEach(e=>io.observe(e));
  const dot=document.querySelector('.cursor-dot'), ring=document.querySelector('.cursor-ring');
  if(dot&&ring&&matchMedia('(pointer:fine)').matches){let x=0,y=0,rx=0,ry=0;addEventListener('mousemove',e=>{x=e.clientX;y=e.clientY;dot.style.transform=`translate(${x}px,${y}px)`});const loop=()=>{rx+=(x-rx)*.16;ry+=(y-ry)*.16;ring.style.transform=`translate(${rx}px,${ry}px)`;requestAnimationFrame(loop)};loop();document.querySelectorAll('a,figure').forEach(el=>{el.addEventListener('mouseenter',()=>ring.classList.add('cursor-grow'));el.addEventListener('mouseleave',()=>ring.classList.remove('cursor-grow'))})}
})();
