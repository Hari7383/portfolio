(() => {
  const loader=document.getElementById('detailLoader'), pct=document.getElementById('detailLoad');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let seen=false; try{seen=sessionStorage.getItem('hs-detail')==='1'}catch(e){}
  if(seen||reduced){loader&&loader.classList.add('is-done')}
  else{
    let n=0; const tick=setInterval(()=>{n+=Math.ceil(Math.random()*22)+6; if(n>=100){n=100;clearInterval(tick);try{sessionStorage.setItem('hs-detail','1')}catch(e){}setTimeout(()=>loader?.classList.add('is-done'),150)} if(pct)pct.textContent=String(n).padStart(2,'0')+'%'},45);
    setTimeout(()=>loader?.classList.add('is-done'),3000);
  }
  // Next-project navigation, so visitors can browse case studies in a loop.
  const order=[['IR_portfolio-details.html','Image Retexturing'],['BI_portfolio-details.html','Brake Pad Inspection'],['PS_portfolio-details.html','Audio Diarization'],['r3d_portfolio-details.html','Fraud Detection'],['MCP_portfolio-details.html','DOTfit Desk'],['BT_portfolio-details.html','Ball Tracking'],['BP_portfolio-details.html','Deep Learning Playground'],['MJ_portfolio-details.html','Midjourney v6'],['SL_portfolio-details.html','Supervised Learning'],['SLC_portfolio-details.html','Classification'],['UL_portfolio-details.html','K-Means Clustering']];
  const here=decodeURIComponent(location.pathname.split('/').pop());
  const idx=order.findIndex(o=>o[0].toLowerCase()===here.toLowerCase());
  const nextLink=document.querySelector('.next-project-link');
  if(idx>-1&&nextLink){const nx=order[(idx+1)%order.length];nextLink.href=nx[0];nextLink.classList.add('is-next');nextLink.innerHTML='<span>NEXT PROJECT '+String((idx+2>order.length?1:idx+2)).padStart(2,'0')+' / '+order.length+'</span><em>'+nx[1]+'.</em><b>→</b>'}

  const els=[...document.querySelectorAll('.reveal,.reveal-word')];
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12}); els.forEach(e=>io.observe(e));
  const dot=document.querySelector('.cursor-dot'), ring=document.querySelector('.cursor-ring');
  if(dot&&ring&&matchMedia('(pointer:fine)').matches){let x=0,y=0,rx=0,ry=0;addEventListener('mousemove',e=>{x=e.clientX;y=e.clientY;dot.style.transform=`translate(${x}px,${y}px)`});const loop=()=>{rx+=(x-rx)*.16;ry+=(y-ry)*.16;ring.style.transform=`translate(${rx}px,${ry}px)`;requestAnimationFrame(loop)};loop();document.querySelectorAll('a,figure').forEach(el=>{el.addEventListener('mouseenter',()=>ring.classList.add('cursor-grow'));el.addEventListener('mouseleave',()=>ring.classList.remove('cursor-grow'))})}
})();
