// ======================================================================
// chars_2.js : 변이 2묶음 : 토타디 · 김민재 · 샌즈 · (구석 갇힘 방지) · 최해솔 · 어쩌라고 · 제트 · 테러리스트
// 안에 들어있는 순서 : extra8 → extra9 → extra10 → fix1 → extra11 → extra12 → extra13 → extra14
// (순서가 중요해서 위에서부터 차례로 실행됨 · 섹션 위치를 바꾸지 말 것)
// ======================================================================



// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ▶ 섹션 : extra8
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ===== extra8.js : 공병은 • 토타디 (카메라 · 스피커 · 변기 소환) =====

const NEW18=['tt_summon','tt_charge','tt_beam','tt_spk','tt_bass','tt_drop','tt_crash','tt_flush','tt_vortex','tt_geyser'];
NEW18.forEach(n=>{if(!SND.includes(n))SND.push(n);if(!AUD[n])AUD[n]=new SoundPool('sounds/'+n+'.mp3',n=='tt_bass'||n=='tt_drop'||n=='tt_crash'?4:3)});
Object.assign(SLB,{tt_summon:'토타디 · 소환',tt_charge:'토타디 · 카메라 충전',tt_beam:'토타디 · 카메라 빔',tt_spk:'토타디 · 스피커 켜짐',tt_bass:'토타디 · 베이스 충격파',tt_drop:'토타디 · 변기 낙하',tt_crash:'토타디 · 변기 착지',tt_flush:'토타디 · 물 내림',tt_vortex:'토타디 · 거대 소용돌이',tt_geyser:'토타디 · 물기둥 폭발'});
const TTSK=[
  {n:'카메라 빔',w:.3,cd:7,c:(o,t)=>!t.hid&&dist(o,t)<620,f:(o,t)=>ttCam(o,t)},
  {n:'스피커 쇼크웨이브',w:.3,cd:8,c:(o,t)=>!t.hid&&dist(o,t)<360,f:(o,t)=>ttSpk(o,t)},
  {n:'변기 대침공',w:.8,ult:1,f:(o,t)=>ttUlt(o,t)}];
const TTI0=DEF.findIndex(d=>d.name=='공병은');
DEF.push({name:'공병은 • 토타디',gl:'토',k:'ttd',vof:TTI0,r:25,sp:224,col:'#3fc8ff',hi:'#dff6ff',dk:'#06283a',alt:{col:'#ff9a2a',hi:'#ffead0',dk:'#3a1e02'},alt2:{col:'#9aff4a',hi:'#eaffd8',dk:'#18380a'},sk:TTSK});
INFO['공병은 • 토타디']={st:[8,5,7,9,9,9],p:'구독자 · 소환물이 적을 맞힐 때마다 궁 게이지가 더 빨리 참',
  sk:[['1.9×7','삼각대 카메라를 소환 · 렌즈에 빛을 모은 뒤 상대를 따라가며 굵은 빔을 쏨'],['4.8×3','거대한 스피커를 소환 · 쿵! 쿵! 쿵! 베이스 충격파 세 번이 퍼지며 밀쳐냄'],['5+α+8+α+8','하늘에서 변기 네 개가 떨어져 물을 내리며 빨아들이고 · 마지막에 거대한 변기가 내려와 모두 빨아들인 뒤 물기둥 폭발']]};

// ---------- 소환물 그림 (images 폴더 그림 우선 · 없으면 기본 그림) ----------
// images/tt_camera · tt_speaker · tt_toilet (png · webp · jpg)
const TTI={camera:null,speaker:null,toilet:null};
function ttLoad(key,names){if(!names.length)return;const im=new Image();im.onload=()=>{try{TTI[key]=typeof oniCut=='function'?oniCut(im):im}catch(e){TTI[key]=im}};im.onerror=()=>ttLoad(key,names.slice(1));im.src=names[0]}
['camera','speaker','toilet'].forEach(k=>{const L=[];['images/','','../images/'].forEach(d=>['png','webp','jpg','jpeg'].forEach(e=>L.push(d+'tt_'+k+'.'+e)));ttLoad(k,L)});
function ttImg(k,s,al){const im=TTI[k];if(!im)return false;const H=(k=='toilet'?80:104)*s,W=H*im.width/im.height;g.save();g.globalAlpha=al==null?1:al;g.fillStyle='rgba(0,0,0,.4)';g.beginPath();g.ellipse(0,40*s,W*.4,8*s,0,0,TAU);g.fill();g.drawImage(im,-W/2,40*s-H,W,H);g.restore();return true}
// 삼각대 캠코더
function ttCamArt(s,glw,al){if(ttImg('camera',s,al))return;g.save();g.scale(s,s);g.globalAlpha=al==null?1:al;g.lineCap='round';
  g.fillStyle='rgba(0,0,0,.4)';g.beginPath();g.ellipse(0,40,24,6,0,0,TAU);g.fill();
  [[-17,40],[17,40],[2,38]].forEach(([x,y])=>{g.strokeStyle='#14161c';g.lineWidth=4;g.beginPath();g.moveTo(0,-2);g.lineTo(x,y);g.stroke();g.strokeStyle='#5a606e';g.lineWidth=1.4;g.stroke()});
  g.fillStyle='#1c1f26';g.fillRect(-4,-8,8,8);
  const bg=g.createLinearGradient(0,-32,0,-6);bg.addColorStop(0,'#4a4f5c');bg.addColorStop(.5,'#22252d');bg.addColorStop(1,'#101217');g.fillStyle=bg;g.strokeStyle='#05060a';g.lineWidth=1.6;g.beginPath();g.roundRect?g.roundRect(-20,-32,36,26,4):g.rect(-20,-32,36,26);g.fill();g.stroke();
  g.fillStyle='#2a2e38';g.fillRect(-12,-38,20,5);g.strokeRect(-12,-38,20,5);
  const lg=g.createLinearGradient(0,-28,0,-10);lg.addColorStop(0,'#5a606e');lg.addColorStop(.5,'#1a1c22');lg.addColorStop(1,'#33373f');g.fillStyle=lg;g.fillRect(16,-28,16,18);g.strokeRect(16,-28,16,18);g.strokeStyle='#6a707e';g.lineWidth=1;[20,25].forEach(x=>{g.beginPath();g.moveTo(x,-28);g.lineTo(x,-10);g.stroke()});
  g.fillStyle='#0a0c12';g.beginPath();g.ellipse(33,-19,4,10,0,0,TAU);g.fill();const rg=g.createRadialGradient(33,-22,1,33,-19,9);rg.addColorStop(0,'#bfe8ff');rg.addColorStop(.4,'#2a6aff');rg.addColorStop(1,'#060a1a');g.fillStyle=rg;g.beginPath();g.ellipse(33,-19,3,8,0,0,TAU);g.fill();
  if(glw>0){g.save();g.globalCompositeOperation='lighter';glow('#7fd8ff',34,-19,10+glw*26,.9*glw);glow('#ffffff',34,-19,4+glw*8,glw);g.restore()}
  g.fillStyle=Math.floor(clock*3)%2?'#ff2a3a':'#5a0a10';g.beginPath();g.arc(-15,-27,2.2,0,TAU);g.fill();
  g.fillStyle='#0d1a2a';g.fillRect(-28,-28,7,14);g.strokeStyle='#05060a';g.strokeRect(-28,-28,7,14);g.fillStyle='rgba(120,200,255,.5)';g.fillRect(-27,-27,5,12);g.restore()}
// 스피커 (우퍼 두 개)
function ttSpkArt(s,pump,al,led){if(ttImg('speaker',s,al))return;g.save();g.scale(s,s);g.globalAlpha=al==null?1:al;
  g.fillStyle='rgba(0,0,0,.45)';g.beginPath();g.ellipse(0,40,28,7,0,0,TAU);g.fill();
  const bg=g.createLinearGradient(-22,0,22,0);bg.addColorStop(0,'#24262c');bg.addColorStop(.5,'#16171c');bg.addColorStop(1,'#0a0b0e');g.fillStyle=bg;g.strokeStyle='#000';g.lineWidth=2;g.beginPath();g.roundRect?g.roundRect(-22,-54,44,94,5):g.rect(-22,-54,44,94);g.fill();g.stroke();
  g.strokeStyle='rgba(255,255,255,.06)';g.lineWidth=1;for(let y=-50;y<38;y+=4){g.beginPath();g.moveTo(-20,y);g.lineTo(20,y);g.stroke()}
  [[-24,13],[10,16]].forEach(([y,R],k)=>{const p=1+pump*(k?.22:.15);g.fillStyle='#08090b';g.beginPath();g.arc(0,y,R+3,0,TAU);g.fill();g.strokeStyle='#3a3d46';g.lineWidth=2;g.stroke();
    const cg=g.createRadialGradient(-R*.3,y-R*.3,1,0,y,R*p);cg.addColorStop(0,'#5a5e68');cg.addColorStop(.6,'#22242a');cg.addColorStop(1,'#0e0f12');g.fillStyle=cg;g.beginPath();g.arc(0,y,R*p,0,TAU);g.fill();
    g.strokeStyle='rgba(255,255,255,.1)';g.beginPath();g.arc(0,y,R*p*.7,0,TAU);g.stroke();g.fillStyle='#2e3038';g.beginPath();g.arc(0,y,R*.32*p,0,TAU);g.fill();g.fillStyle='rgba(255,255,255,.18)';g.beginPath();g.arc(-2,y-2,R*.12,0,TAU);g.fill()});
  g.fillStyle='#0c0d10';g.beginPath();g.arc(0,-45,4,0,TAU);g.fill();g.strokeStyle='#4a4e58';g.lineWidth=1;g.stroke();
  const lc=led||'#3fc8ff';g.save();g.globalCompositeOperation='lighter';g.fillStyle=lc;g.globalAlpha=(al==null?1:al)*(.5+pump*.5);g.fillRect(-18,32,36,3);glow(lc,0,33,30,.3+pump*.4);g.restore();g.restore()}
// 변기
function ttToiletArt(s,swirl,al){if(ttImg('toilet',s,al))return;g.save();g.scale(s,s);g.globalAlpha=al==null?1:al;
  g.fillStyle='rgba(0,0,0,.4)';g.beginPath();g.ellipse(0,36,26,7,0,0,TAU);g.fill();
  const P=(c0,c1,y0,y1)=>{const gr=g.createLinearGradient(-24,y0,24,y1);gr.addColorStop(0,c0);gr.addColorStop(.5,'#ffffff');gr.addColorStop(1,c1);return gr};
  g.strokeStyle='#8a94a6';g.lineWidth=1.6;
  g.fillStyle=P('#dfe6f0','#b8c2d2',-40,-14);g.beginPath();g.roundRect?g.roundRect(-20,-42,40,26,4):g.rect(-20,-42,40,26);g.fill();g.stroke();g.fillStyle='#c8d0dc';g.fillRect(-21,-45,42,5);g.strokeRect(-21,-45,42,5);g.fillStyle='#b8c2d2';g.beginPath();g.arc(12,-34,3,0,TAU);g.fill();g.stroke();
  g.fillStyle=P('#d8e0ea','#aab4c4',14,36);g.beginPath();g.moveTo(-12,14);g.lineTo(12,14);g.lineTo(9,36);g.lineTo(-9,36);g.closePath();g.fill();g.stroke();
  g.fillStyle=P('#e8eef6','#b0bacb',-8,24);g.beginPath();g.ellipse(0,4,24,16,0,0,TAU);g.fill();g.stroke();
  g.fillStyle='#f4f7fb';g.beginPath();g.ellipse(0,3,20,12.5,0,0,TAU);g.fill();g.strokeStyle='#c0c8d6';g.stroke();
  const wg=g.createRadialGradient(0,4,1,0,4,15);wg.addColorStop(0,'#1a5aa8');wg.addColorStop(1,'#7fd0ff');g.fillStyle=wg;g.beginPath();g.ellipse(0,4,14,8,0,0,TAU);g.fill();
  if(swirl){g.save();g.beginPath();g.ellipse(0,4,14,8,0,0,TAU);g.clip();g.strokeStyle='rgba(255,255,255,.75)';g.lineWidth=1.5;for(let k=0;k<3;k++){g.beginPath();for(let i=0;i<=20;i++){const r=14-i*.6,a=k*TAU/3+clock*swirl*8+i*.35;i?g.lineTo(Math.cos(a)*r,4+Math.sin(a)*r*.57):g.moveTo(Math.cos(a)*r,4+Math.sin(a)*r*.57)}g.stroke()}g.restore()}
  g.restore()}
function ttBeamIn(x,y,u){if(u>=1)return;g.save();g.globalCompositeOperation='lighter';const w=24*(1-u);const gr=g.createLinearGradient(x-w,0,x+w,0);gr.addColorStop(0,'rgba(63,200,255,0)');gr.addColorStop(.5,'rgba(220,250,255,'+(1-u)+')');gr.addColorStop(1,'rgba(63,200,255,0)');g.fillStyle=gr;g.fillRect(x-w,-300,w*2,y+300+20);glow('#7fd8ff',x,y,60*(1-u),.6);g.restore()}
function ttHit(o,e,n,heavy){n=Math.round(n*1.2*10)/10;hurt(e,n,o,e.x,e.y,0,heavy?1:0);if(!o.dead)o.ug=Math.min(100,(o.ug||0)+n*.6)}

// ---------- 아이콘 (네온 캠코더 + 음파) ----------
EMB.ttd=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*3)*.05);
  neon(D,1.7,()=>{g.beginPath();g.rect(-15,-8,18,14);g.moveTo(3,-5);g.lineTo(12,-9);g.lineTo(12,9);g.lineTo(3,5);g.moveTo(-10,-8);g.lineTo(-10,-12);g.lineTo(-2,-12);g.lineTo(-2,-8);
    g.moveTo(-8,10);g.lineTo(-13,19);g.moveTo(-6,10);g.lineTo(-1,19)});
  neon({col:'#ffffff',hi:'#dff6ff'},1.3,()=>{g.beginPath();g.arc(14,0,8,-.6,.6);g.moveTo(14+Math.cos(-.6)*13,Math.sin(-.6)*13);g.arc(14,0,13,-.6,.6)});
  g.save();g.globalCompositeOperation='lighter';glow('#ff2a3a',-11,-4,5,.9);g.restore()};

// ---------- 1) 카메라 빔 ----------
function ttCam(o,t){const a=ang(o,t),sd=Math.random()<.5?1:-1,x=clamp(o.x-Math.sin(a)*sd*48,30,A-30),y=clamp(o.y+Math.cos(a)*sd*48,50,A-40);HZ.push({k:'ttcam',o,tg:t,t:0,x,y,a:Math.atan2(t.y-(y-25),t.x-x),tk:0,hit:null});SFXa('tt_summon')}
HZX.ttcam=(h,dt,EN)=>{const o=h.o;let e=h.tg;if(!e||e.dead){e=tgt(o);h.tg=e}const C0=.25,F0=.75,F1=1.45,lx=h.x+Math.cos(h.a)*40,ly=h.y-25+Math.sin(h.a)*12;h.lx=lx;h.ly=ly;
  if(h.t>=C0&&!h.cs){h.cs=1;SFXa('tt_charge')}if(h.t>=F0&&!h.fs){h.fs=1;SFXa('tt_beam');shake=Math.max(shake,6)}
  if(e&&h.t<F1){let da=Math.atan2(e.y-ly,e.x-lx)-h.a;da=Math.atan2(Math.sin(da),Math.cos(da));h.a+=clamp(da,-(h.t<F0?5:1.7)*dt,(h.t<F0?5:1.7)*dt)}
  if(h.t>=F0&&h.t<F1){// 빔이 맞는 지점
    let L=900,hit=null;EN.forEach(x=>{if(x.hid||x.jump)return;const px=x.x-lx,py=x.y-ly,along=px*Math.cos(h.a)+py*Math.sin(h.a),perp=Math.abs(-px*Math.sin(h.a)+py*Math.cos(h.a));if(along>0&&perp<16+x.r&&along<L){L=along;hit=x}});
    const ex=lx+Math.cos(h.a)*L,ey=ly+Math.sin(h.a)*L;h.L=L;h.hit=hit;h.tk-=dt;if(h.tk<=0){h.tk=.1;if(hit)ttHit(o,hit,1.6,0)}
    emit(80,dt,()=>{const a=h.a+Math.PI+rnd(-1,1),v=rnd(80,260),l=rnd(.15,.35);Pt.push({x:Math.min(A,Math.max(0,ex)),y:Math.min(A,Math.max(0,ey)),vx:Math.cos(a)*v,vy:Math.sin(a)*v,l,m:l,gl:1,sh:5,col:Math.random()<.5?'#ffffff':'#7fd8ff',r:1.8,fr:.1})})}
  return h.t<F1+.4};
HZD.ttcam=h=>{const fa=clamp((1.85-h.t)/.35,0,1),s=back(clamp(h.t/.25,0,1)),dir=Math.cos(h.a)<0?-1:1,glw=h.t<.25?0:h.t<.75?(h.t-.25)/.5:h.t<1.45?1:clamp(1-(h.t-1.45)/.2,0,1);
  g.save();g.translate(h.x,h.y);g.scale(dir,1);ttCamArt(1.3*s,glw,fa);g.restore();ttBeamIn(h.x,h.y,h.t/.3)};
HZP.ttcam=h=>{const F0=.75,F1=1.45;
  if(h.t>=.25&&h.t<F0){const u=(h.t-.25)/.5;g.save();g.globalCompositeOperation='lighter';for(let k=0;k<3;k++){const r=(1-((u*2+k/3)%1))*46;g.strokeStyle='rgba(127,216,255,'+(.7*u)+')';g.lineWidth=2;g.beginPath();g.arc(h.lx,h.ly,r,0,TAU);g.stroke()}g.restore()}
  if(h.t>=F0&&h.t<F1+.15){const a=h.t<F1?Math.min(1,(h.t-F0)/.06):clamp(1-(h.t-F1)/.15,0,1),L=h.L||900,w=(12+3*Math.sin(clock*40))*a;g.save();g.translate(h.lx,h.ly);g.rotate(h.a);g.globalCompositeOperation='lighter';
    const gr=g.createLinearGradient(0,-w*2.2,0,w*2.2);gr.addColorStop(0,'rgba(40,140,255,0)');gr.addColorStop(.3,'rgba(63,200,255,.55)');gr.addColorStop(.5,'rgba(255,255,255,.95)');gr.addColorStop(.7,'rgba(63,200,255,.55)');gr.addColorStop(1,'rgba(40,140,255,0)');
    g.fillStyle=gr;g.fillRect(0,-w*2.2,L,w*4.4);g.fillStyle='rgba(255,255,255,'+a+')';g.fillRect(0,-w*.25,L,w*.5);
    g.strokeStyle='rgba(200,240,255,'+(.5*a)+')';g.lineWidth=1.2;for(let k=0;k<6;k++){const x0=((clock*900+k*140)%L);g.beginPath();g.moveTo(x0,-w*1.6);g.lineTo(x0+30,-w*1.6);g.moveTo(x0+60,w*1.6);g.lineTo(x0+90,w*1.6);g.stroke()}
    glow('#ffffff',0,0,22*a,.9);glow('#7fd8ff',L,0,40*a,.8);for(let k=0;k<3;k++){g.strokeStyle='rgba(127,216,255,'+(.6*a)+')';g.lineWidth=2;g.beginPath();g.ellipse(L,0,(10+((clock*80+k*12)%36))*.5,10+((clock*80+k*12)%36),0,0,TAU);g.stroke()}g.restore()}};

// ---------- 2) 스피커 쇼크웨이브 ----------
function ttSpk(o,t){const a=ang(o,t),x=clamp(o.x+Math.cos(a)*44,30,A-30),y=clamp(o.y+Math.sin(a)*44,60,A-40);HZ.push({k:'ttspk',o,tg:t,t:0,x,y,w:[],n:0,pump:0});SFXa('tt_summon');SFXa('tt_spk')}
HZX.ttspk=(h,dt,EN)=>{const o=h.o,P=[.45,.85,1.25];h.pump=Math.max(0,h.pump-dt*4);
  if(h.n<3&&h.t>=P[h.n]){h.n++;h.pump=1;h.w.push({t0:h.t,hit:new Set()});SFXa('tt_bass');shake=Math.max(shake,10);hs=.03}
  h.w.forEach(W=>{const r=(h.t-W.t0)*720;if(r>300)return;EN.forEach(e=>{if(W.hit.has(e)||e.hid||e.jump)return;const d=Math.hypot(e.x-h.x,e.y-(h.y-5));if(Math.abs(d-r)<26+e.r&&d<300){W.hit.add(e);ttHit(o,e,4,0);const a=Math.atan2(e.y-h.y,e.x-h.x);e.x=clamp(e.x+Math.cos(a)*55,e.r,A-e.r);e.y=clamp(e.y+Math.sin(a)*55,e.r,A-e.r);e.slow=Math.max(e.slow,.8);e.sq=1;e.sa=a}})});
  return h.t<1.9};
HZD.ttspk=h=>{const fa=clamp((1.9-h.t)/.35,0,1),s=back(clamp(h.t/.25,0,1)),led=['#3fc8ff','#ff4a8a','#ffd84a'][Math.max(0,h.n-1)%3];
  h.w.forEach(W=>{const q=h.t-W.t0,r=q*720;if(r>320)return;const a=clamp(1-r/320,0,1);g.save();g.translate(h.x,h.y-5);g.globalCompositeOperation='lighter';
    const gr=g.createRadialGradient(0,0,Math.max(0,r-30),0,0,r+8);gr.addColorStop(0,'rgba(63,200,255,0)');gr.addColorStop(.7,'rgba(63,200,255,'+(.35*a)+')');gr.addColorStop(1,'rgba(255,255,255,'+(.6*a)+')');g.fillStyle=gr;g.beginPath();g.arc(0,0,r+8,0,TAU);g.fill();
    g.strokeStyle='rgba(255,255,255,'+(.8*a)+')';g.lineWidth=3;g.beginPath();g.arc(0,0,r,0,TAU);g.stroke();g.strokeStyle=led;g.globalAlpha=a*.6;g.lineWidth=6;g.beginPath();g.arc(0,0,Math.max(0,r-16),0,TAU);g.stroke();g.restore()});
  g.save();g.translate(h.x,h.y);g.scale(1+h.pump*.06,1-h.pump*.04);ttSpkArt(1.25*s,h.pump,fa,led);g.restore();ttBeamIn(h.x,h.y,h.t/.3)};

// ---------- 3) ULT 변기 대침공 ----------
function ttUlt(o,t){const EN=F.filter(x=>x!=o&&!x.dead);const T=[];for(let i=0;i<4;i++){const e=EN[i%Math.max(1,EN.length)]||t,a=i*TAU/4+rnd(-.4,.4),R=rnd(55,95);T.push({x:clamp(e.x+Math.cos(a)*R,40,A-40),y:clamp(e.y+Math.sin(a)*R,60,A-40),t0:.25+i*.2,st:0,hit:0})}
  HZ.push({k:'ttult',o,t:0,T,G:null,tk:0});SFXa('tt_summon')}
HZX.ttult=(h,dt,EN)=>{const o=h.o;h.tk-=dt;const tick=h.tk<=0;if(tick)h.tk=.15;
  h.T.forEach(q=>{const k=h.t-q.t0;if(k<0)return;if(!q.st){q.st=1;SFXa('tt_drop')}
    if(q.st==1&&k>=.38){q.st=2;q.lt=h.t;SFXa('tt_crash');shake=Math.max(shake,10);ring(q.x,q.y+20,6,80,'#dff6ff',6,.35);for(let i=0;i<10;i++)Pt.push({x:q.x,y:q.y,vx:rnd(-220,220),vy:rnd(-280,-60),l:rnd(.5,.9),m:.9,sh:2,col:i%2?'#ffffff':'#c8d0dc',r:rnd(3,6),rot:rnd(0,TAU),vr:rnd(-12,12),gy:520,fr:.4});
      for(let i=0;i<14;i++){const a=rnd(0,TAU),v=rnd(80,240),l=rnd(.4,.7);Pt.push({x:q.x,y:q.y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-80,l,m:l,sh:6,col:i%2?'#7fd0ff':'#ffffff',r:rnd(2,4),gy:400,fr:.3})}
      EN.forEach(e=>{if(!e.hid&&!e.jump&&Math.hypot(e.x-q.x,e.y-q.y)<65+e.r)ttHit(o,e,4,1)});if(!h.fl){h.fl=1;SFXa('tt_flush')}}
    if(q.st==2&&h.t<q.lt+1.1){EN.forEach(e=>{if(e.hid||e.jump)return;const d=Math.hypot(e.x-q.x,e.y-q.y);if(d<125&&d>4){const a=Math.atan2(q.y-e.y,q.x-e.x),tg=a+Math.PI/2;e.x+=(Math.cos(a)*150+Math.cos(tg)*90)*dt;e.y+=(Math.sin(a)*150+Math.sin(tg)*90)*dt;e.x=clamp(e.x,e.r,A-e.r);e.y=clamp(e.y,e.r,A-e.r);if(tick)ttHit(o,e,.6,0)}})}});
  // 거대 변기
  if(!h.G&&h.t>=1.9){const L=EN.filter(x=>!x.hid);const cx=L.length?L.reduce((s,e)=>s+e.x,0)/L.length:A/2,cy=L.length?L.reduce((s,e)=>s+e.y,0)/L.length:A/2;h.G={x:clamp(cx,90,A-90),y:clamp(cy,110,A-80),t0:h.t,st:0};SFXa('tt_drop')}
  const G=h.G;if(G){const k=h.t-G.t0;
    if(G.st==0&&k>=.45){G.st=1;SFXa('tt_crash');SFXa('tt_vortex');shake=Math.max(shake,22);hs=.1;ring(G.x,G.y+30,10,150,'#dff6ff',10,.5);EN.forEach(e=>{if(!e.hid&&!e.jump&&Math.hypot(e.x-G.x,e.y-G.y)<110+e.r)ttHit(o,e,7,1)})}
    if(G.st==1&&k<2.0){EN.forEach(e=>{if(e.hid||e.jump)return;const d=Math.hypot(e.x-G.x,e.y-G.y);if(d<270&&d>6){const a=Math.atan2(G.y-e.y,G.x-e.x),tg=a+Math.PI/2;e.x+=(Math.cos(a)*210+Math.cos(tg)*120)*dt;e.y+=(Math.sin(a)*210+Math.sin(tg)*120)*dt;e.x=clamp(e.x,e.r,A-e.r);e.y=clamp(e.y,e.r,A-e.r);e.slow=Math.max(e.slow,.3);if(tick)ttHit(o,e,.7,0)}});if(Math.random()<dt*20)shake=Math.max(shake,5)}
    if(G.st==1&&k>=2.0){G.st=2;SFXa('tt_geyser');shake=Math.max(shake,26);hs=.12;FX.push({k:'frost',l:.12,m:.12,c:'#dff6ff'});ring(G.x,G.y,10,200,'#7fd0ff',12,.6);
      EN.forEach(e=>{if(!e.hid&&!e.jump&&Math.hypot(e.x-G.x,e.y-G.y)<170+e.r){ttHit(o,e,7,1);const a=Math.atan2(e.y-G.y,e.x-G.x);e.flyA=a;e.flyT=.3;e.flyV=900}});
      for(let i=0;i<50;i++){const a=rnd(0,TAU),v=rnd(120,420),l=rnd(.6,1.1);Pt.push({x:G.x,y:G.y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-200,l,m:l,sh:6,col:['#7fd0ff','#ffffff','#3fa8ff'][i%3],r:rnd(2.5,5),gy:500,fr:.4})}}
    if(G.st==2&&k>2.6)return false}
  return h.t<6};
function ttVortex(x,y,R,a,sp){g.save();g.translate(x,y);g.scale(1,.55);g.globalAlpha=a;const gr=g.createRadialGradient(0,0,4,0,0,R);gr.addColorStop(0,'rgba(10,40,90,.85)');gr.addColorStop(.5,'rgba(40,140,230,.5)');gr.addColorStop(1,'rgba(120,210,255,0)');g.fillStyle=gr;g.beginPath();g.arc(0,0,R,0,TAU);g.fill();
  g.lineCap='round';for(let k=0;k<5;k++){g.strokeStyle=k%2?'rgba(255,255,255,.75)':'rgba(140,220,255,.8)';g.lineWidth=2.5;g.beginPath();for(let i=0;i<=30;i++){const r=R*(1-i/32),an=k*TAU/5+clock*sp+i*.28;i?g.lineTo(Math.cos(an)*r,Math.sin(an)*r):g.moveTo(Math.cos(an)*r,Math.sin(an)*r)}g.stroke()}
  g.setLineDash([6,8]);g.lineDashOffset=-clock*80;g.strokeStyle='rgba(255,255,255,.7)';g.lineWidth=2;g.beginPath();g.arc(0,0,R*.95,0,TAU);g.stroke();g.setLineDash([]);g.restore()}
HZD.ttult=h=>{h.T.forEach(q=>{if(q.st==2){const k=h.t-q.lt,a=clamp(Math.min(k/.15,(1.3-k)/.3),0,1);if(a>0)ttVortex(q.x,q.y+12,125,a*.9,5)}});
  const G=h.G;if(G&&G.st>=1){const k=h.t-G.t0,a=G.st==1?Math.min(1,(k-.45)/.2):clamp(1-(k-2)/.5,0,1);if(a>0)ttVortex(G.x,G.y+24,270,a,3.5+k)}
  if(G&&G.st==0){const u=clamp((h.t-G.t0)/.45,0,1);g.save();g.globalAlpha=.3+.4*u;g.fillStyle='#000';g.beginPath();g.ellipse(G.x,G.y+30,60+50*u,(60+50*u)*.35,0,0,TAU);g.fill();g.restore()}
  h.T.forEach(q=>{if(q.st==1){const u=clamp((h.t-q.t0)/.38,0,1);g.save();g.globalAlpha=.25+.4*u;g.fillStyle='#000';g.beginPath();g.ellipse(q.x,q.y+22,14+20*u,(14+20*u)*.35,0,0,TAU);g.fill();g.restore()}})};
HZP.ttult=h=>{h.T.forEach(q=>{if(!q.st)return;let y=q.y,al=1,sw=0;if(q.st==1){const u=clamp((h.t-q.t0)/.38,0,1);y=q.y-(1-u*u)*420}else{const k=h.t-q.lt;sw=1;al=clamp((1.4-k)/.3,0,1);if(al<=0)return}g.save();g.translate(q.x,y);g.rotate(q.st==1?Math.sin(h.t*20)*.2:0);ttToiletArt(.75,sw,al);g.restore()});
  const G=h.G;if(G){const k=h.t-G.t0;let y=G.y,al=1;if(G.st==0){const u=clamp(k/.45,0,1);y=G.y-(1-u*u)*520}if(G.st==2){al=clamp(1-(k-2)/.3,0,1)}if(al>0){g.save();g.translate(G.x,y);g.rotate(G.st==1?Math.sin(clock*30)*.02:0);ttToiletArt(2.1,G.st==1?2:0,al);g.restore()}
    if(G.st==2&&k<2.6){const u=(k-2)/.6,hh=380*Math.sin(Math.PI*Math.min(1,u*1.4)),w=46*(1-u*.4);g.save();g.globalAlpha=clamp(1-u,0,1);const gr=g.createLinearGradient(G.x-w,0,G.x+w,0);gr.addColorStop(0,'rgba(120,210,255,0)');gr.addColorStop(.3,'rgba(150,220,255,.85)');gr.addColorStop(.5,'rgba(255,255,255,.95)');gr.addColorStop(.7,'rgba(150,220,255,.85)');gr.addColorStop(1,'rgba(120,210,255,0)');
      g.fillStyle=gr;g.fillRect(G.x-w,G.y-hh,w*2,hh);g.fillStyle='rgba(255,255,255,.9)';g.beginPath();g.ellipse(G.x,G.y-hh,w*1.4,16,0,0,TAU);g.fill();g.restore()}}};

// ---------- 배지/아이콘 갱신 ----------
document.querySelectorAll('#grid .tile').forEach(t=>{const i=+t.dataset.i,vc=DEF.filter(x=>x.vof===i).length;let em=t.querySelector('.vb');if(vc){if(!em){em=document.createElement('em');em.className='vb';t.appendChild(em)}em.textContent='+'+vc}});
Object.keys(ICC).forEach(k=>delete ICC[k]);mkDict();
;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ▶ 섹션 : extra9
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ===== extra9.js : 김민채 • 김민재 (괴물 수비수) =====

const NEW19=['kj_whistle','kj_slide','kj_bump','kj_block','kj_kick','kj_crowd','kj_flag','kj_mark'];
NEW19.forEach(n=>{if(!SND.includes(n))SND.push(n);if(!AUD[n])AUD[n]=new SoundPool('sounds/'+n+'.mp3',n=='kj_block'||n=='kj_bump'?5:3)});
Object.assign(SLB,{kj_whistle:'김민재 · 휘슬',kj_slide:'김민재 · 슬라이딩',kj_bump:'김민재 · 몸싸움',kj_block:'김민재 · 차단',kj_kick:'김민재 · 클리어링 킥',kj_crowd:'김민재 · 관중 함성',kj_flag:'김민재 · 오프사이드 깃발',kj_mark:'김민재 · 마크 시작'});
const KJSK=[
  {n:'철벽 마크',w:.3,cd:9,c:(o,t)=>!t.hid&&!t.jump&&dist(o,t)<420,f:(o,t)=>kjMark(o,t)},
  {n:'인터셉트 · 클리어링',w:.25,cd:8,c:(o,t)=>!t.hid,f:(o,t)=>kjBlock(o,t)},
  {n:'오프사이드 트랩',w:.8,ult:1,f:(o,t)=>kjUlt(o,t)}];
const KJI=DEF.findIndex(d=>d.name=='김민채');
DEF.push({name:'김민채 • 김민재',gl:'재',k:'kmj',heavy:1,vof:KJI,r:32,sp:190,col:'#2f6bff',hi:'#dfe8ff',dk:'#081a4a',alt:{col:'#e8323c',hi:'#ffdcdc',dk:'#4a080c'},alt2:{col:'#f2c94c',hi:'#fff3cf',dk:'#3a2a04'},sk:KJSK});
INFO['김민채 • 김민재']={st:[7,10,5,6,8,9],p:'수비수 · 받는 피해 감소 + 시작 2.5초 동안 아무것도 안 통함 (킥오프 철벽)',
  sk:[['2.2×5','상대를 찰거머리처럼 따라붙어 3초 동안 마크 · 상대는 느려지고 계속 몸싸움에 밀림'],['4+1×차단','1.2초 동안 주변으로 날아오는 공격을 전부 끊어냄 (받는 피해 절반) · 끝나면 공을 상대한테 걷어참 · 많이 막을수록 셈'],['7×3','경기장이 축구장이 되고 수비 라인을 끌어올려 상대를 밀어냄 · 오프사이드 깃발이 올라가면 멈춘 상대에게 슬라이딩 태클 세 번']]};

// ---------- 패시브 : 킥오프 철벽 ----------
const _hurtKJ=hurt;hurt=function(t){if(t&&t.d&&t.d.k=='kmj'&&(t.kjInv>0||t.kjHalf>0)){if(t.kjInv>0){if(Math.random()<.3)ft(t.x,t.y-t.r-24,'철벽','#dfe8ff',18);return}const a=[...arguments];a[1]=Math.round(a[1]*.5*10)/10;return _hurtKJ.apply(this,a)}return _hurtKJ.apply(this,arguments)};
const _updKJ=update;update=function(dt){_updKJ(dt);if(!F)return;F.forEach(f=>{if(f.d.k!='kmj'||f.dead)return;if(f.kjInv==null&&phase=='play')f.kjInv=2.5;if(phase=='play'&&f.kjInv>0)f.kjInv-=dt;if(f.kjHalf>0)f.kjHalf-=dt})};
const _initKJ=init;init=function(){const r=_initKJ.apply(this,arguments);if(F)F.forEach(f=>{f.kjInv=null});return r};

// ---------- 그림 ----------
function kjBall(r,rot){g.save();g.rotate(rot||0);socBall(r);g.restore()}
function kjPitch(a){g.save();g.globalAlpha=a;for(let i=0;i<10;i++){g.fillStyle=i%2?'#2f8a3a':'#3a9a44';g.fillRect(i*A/10,0,A/10,A)}
  g.strokeStyle='rgba(255,255,255,.85)';g.lineWidth=4;g.strokeRect(14,14,A-28,A-28);g.beginPath();g.moveTo(A/2,14);g.lineTo(A/2,A-14);g.stroke();g.beginPath();g.arc(A/2,A/2,70,0,TAU);g.stroke();
  [14,A-14].forEach((x,k)=>{const sd=k?-1:1;g.strokeRect(k?x-90:x,A/2-130,90,260);g.strokeRect(k?x-34:x,A/2-60,34,120);g.beginPath();g.arc(x+sd*64,A/2,46,sd>0?-1.0:Math.PI-1.0+0,sd>0?1.0:Math.PI+1.0);g.stroke()});
  const v=g.createRadialGradient(A/2,A/2,A*.3,A/2,A/2,A*.75);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,0,.35)');g.fillStyle=v;g.fillRect(0,0,A,A);g.restore()}
function kjFlag(x,y,up,al){g.save();g.translate(x,y);g.globalAlpha=al;g.strokeStyle='#e8e8e8';g.lineWidth=3;g.lineCap='round';g.beginPath();g.moveTo(0,20);g.lineTo(0,-30);g.stroke();
  g.rotate(-(1-up)*1.2);const w=Math.sin(clock*14)*3;g.fillStyle='#ffd23a';g.beginPath();g.moveTo(0,-30);g.lineTo(22,-28+w);g.lineTo(22,-14+w);g.lineTo(0,-16);g.closePath();g.fill();g.fillStyle='#e8323c';g.beginPath();g.moveTo(0,-30);g.lineTo(11,-29+w*.5);g.lineTo(11,-15+w*.5);g.lineTo(0,-16);g.closePath();g.fill();g.restore()}
function kjTurf(x,y,a,n){for(let i=0;i<n;i++){const aa=a+Math.PI+rnd(-.6,.6),v=rnd(80,220),l=rnd(.4,.8);Pt.push({x,y,vx:Math.cos(aa)*v,vy:Math.sin(aa)*v-60,l,m:l,sh:13,col:['#3fae4a','#2b8a3a','#7dd56f','#6a4a2a'][i%4],r:rnd(2,3.5),rot:rnd(0,TAU),vr:rnd(-10,10),gy:300,fr:.4})}}

// ---------- 아이콘 (네온 방패 + 축구공) ----------
EMB.kmj=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*2)*.04);
  neon(D,1.8,()=>{g.beginPath();g.moveTo(0,-20);g.lineTo(16,-13);g.lineTo(14,4);g.quadraticCurveTo(10,15,0,20);g.quadraticCurveTo(-10,15,-14,4);g.lineTo(-16,-13);g.closePath()});
  neon({col:'#ffffff',hi:'#ffffff'},1.3,()=>{g.beginPath();g.arc(0,0,7,0,TAU);g.moveTo(0,-3);g.lineTo(3,-1);g.lineTo(2,3);g.lineTo(-2,3);g.lineTo(-3,-1);g.closePath()});
  g.save();g.globalCompositeOperation='lighter';glow(D.col,0,0,16,.4);g.restore()};
const _lowKJ=lowHP;lowHP=function(f){_lowKJ(f);if(f.d.k=='kmj'&&f.kjInv>0&&!f.dead&&!f.hid&&phase=='play'){g.save();g.translate(f.x,f.y);g.globalAlpha=Math.min(1,f.kjInv);g.strokeStyle='#dfe8ff';g.lineWidth=3;g.beginPath();for(let i=0;i<6;i++){const a=i*TAU/6+clock;g.lineTo(Math.cos(a)*(f.r+10),Math.sin(a)*(f.r+10))}g.closePath();g.stroke();g.globalCompositeOperation='lighter';glow('#9fc0ff',0,0,f.r*2,.3);g.restore()}};

// ---------- 1) 철벽 마크 ----------
function kjMark(o,t){HZ.push({k:'kjmark',o,tg:t,t:0,n:0,side:Math.random()<.5?1:-1,fp:[]});SFXa('kj_mark')}
HZX.kjmark=(h,dt)=>{const o=h.o,e=h.tg;if(o.dead||!e||e.dead||e.hid)return false;const D=3;if(h.t>D)return false;o.gcd=Math.max(o.gcd,.3);o.cast=null;
  // 상대 옆에 딱 붙어서 따라감
  const ea=Math.atan2(e.dy,e.dx)+h.side*Math.PI/2,tx=clamp(e.x+Math.cos(ea)*(o.r+e.r+4),o.r,A-o.r),ty=clamp(e.y+Math.sin(ea)*(o.r+e.r+4),o.r,A-o.r);o.x+=(tx-o.x)*Math.min(1,dt*9);o.y+=(ty-o.y)*Math.min(1,dt*9);
  e.slow=Math.max(e.slow,.3);if(Math.random()<dt*8)h.fp.push({x:o.x+rnd(-6,6),y:o.y+o.r*.8,t:h.t});h.fp=h.fp.filter(q=>h.t-q.t<.8);
  if(h.t>=.35+h.n*.55&&h.n<5){h.n++;const a=ang(o,e);hurt(e,2.2,o,e.x,e.y,0,0);SFXa('kj_bump');safePush(e,a,24);e.sq=1;e.sa=a;e.cast=null;ring((o.x+e.x)/2,(o.y+e.y)/2,4,40,'#dfe8ff',4,.25);kjTurf(e.x,e.y,a+Math.PI,4)}
  return true};
HZD.kjmark=h=>{h.fp.forEach(q=>{const a=1-(h.t-q.t)/.8;g.save();g.globalAlpha=a*.5;g.fillStyle='#0a1a3a';g.beginPath();g.ellipse(q.x,q.y,4,2.4,0,0,TAU);g.fill();g.restore()})};
HZP.kjmark=h=>{const o=h.o,e=h.tg;if(!e||e.dead||o.dead||h.t>3)return;const a=Math.min(1,h.t/.2)*clamp((3-h.t)/.3,0,1);g.save();g.globalAlpha=a;
  g.strokeStyle='#2f6bff';g.lineWidth=3;g.setLineDash([2,6]);g.lineCap='round';g.beginPath();g.moveTo(o.x,o.y);g.lineTo(e.x,e.y);g.stroke();g.setLineDash([]);
  g.translate(e.x,e.y);g.rotate(clock*2);g.strokeStyle='#dfe8ff';g.lineWidth=2.5;const R=e.r+10;for(let i=0;i<4;i++){g.rotate(TAU/4);g.beginPath();g.arc(0,0,R,-.35,.35);g.stroke()}g.restore()};

// ---------- 2) 인터셉트 · 클리어링 ----------
function kjBlock(o,t){HZ.push({k:'kjblk',o,tg:t,t:0,n:0,cut:[],ball:null});o.kjHalf=1.25;SFXa('kj_whistle')}
HZX.kjblk=(h,dt,EN)=>{const o=h.o;if(o.dead)return false;const D=1.2,R=150;
  if(h.t<D){o.gcd=Math.max(o.gcd,.3);
    // 날아오는 공격 끊기
    const before=B.length;B=B.filter(q=>{if(q.o==o||Math.hypot(q.x-o.x,q.y-o.y)>R)return true;h.n++;h.cut.push({x:q.x,y:q.y,t:h.t});SFXa('kj_block');spark(q.x,q.y,'dust',6,160);return false});
    EN.forEach(e=>{if(e.hid)return;const d=dist(o,e);if(d<o.r+e.r+20&&!e.kjb){e.kjb=1;const a=ang(o,e);e.x=clamp(e.x+Math.cos(a)*50,e.r,A-e.r);e.y=clamp(e.y+Math.sin(a)*50,e.r,A-e.r);e.cast=null;SFXa('kj_bump');setTimeout(()=>{e.kjb=0},400)}})}
  else if(!h.ball){let e=h.tg;if(!e||e.dead)e=tgt(o);if(!e)return false;const a=ang(o,e);h.ball={x:o.x+Math.cos(a)*o.r,y:o.y+Math.sin(a)*o.r,a,v:900,tg:e,t:0,dmg:4+Math.min(8,h.n)};SFXa('kj_kick');kjTurf(o.x,o.y,a,8);ring(o.x,o.y,o.r,o.r+40,'#ffffff',4,.3)}
  if(h.ball){const b=h.ball;b.t+=dt;const e=b.tg;if(e&&!e.dead){let da=Math.atan2(e.y-b.y,e.x-b.x)-b.a;da=Math.atan2(Math.sin(da),Math.cos(da));b.a+=clamp(da,-4*dt,4*dt)}b.x+=Math.cos(b.a)*b.v*dt;b.y+=Math.sin(b.a)*b.v*dt;
    emit(60,dt,()=>{const l=rnd(.15,.3);Pt.push({x:b.x,y:b.y,vx:-Math.cos(b.a)*80+rnd(-30,30),vy:-Math.sin(b.a)*80+rnd(-30,30),l,m:l,gl:1,sh:5,col:'#ffffff',r:2,fr:.1})});
    const hit=EN.find(x=>!x.hid&&!x.jump&&Math.hypot(x.x-b.x,x.y-b.y)<x.r+12);if(hit){hurt(hit,b.dmg,o,hit.x,hit.y,0,b.dmg>=9);hit.stn=Math.max(hit.stn,.3);hit.flyA=b.a;hit.flyT=.18;hit.flyV=700;shake=Math.max(shake,10);ring(hit.x,hit.y,6,70,'#ffffff',5,.35);return false}
    if(b.x<-20||b.x>A+20||b.y<-20||b.y>A+20||b.t>1.2)return false}
  return true};
HZD.kjblk=h=>{const o=h.o;if(o.dead||h.t>1.3)return;const a=Math.min(1,h.t/.12)*clamp((1.3-h.t)/.2,0,1),R=150;g.save();g.translate(o.x,o.y);g.globalAlpha=a;
  g.fillStyle='rgba(47,107,255,.10)';g.beginPath();g.arc(0,0,R,0,TAU);g.fill();g.strokeStyle='rgba(223,232,255,.8)';g.lineWidth=2.5;g.setLineDash([10,7]);g.lineDashOffset=-clock*60;g.beginPath();g.arc(0,0,R,0,TAU);g.stroke();g.setLineDash([]);
  g.strokeStyle='#2f6bff';g.lineWidth=5;g.globalAlpha=a*.7;for(let i=0;i<3;i++){const s=clock*2+i*TAU/3;g.beginPath();g.arc(0,0,R-8,s,s+.7);g.stroke()}g.restore()};
HZP.kjblk=h=>{h.cut.forEach(c=>{const q=h.t-c.t;if(q>.4)return;g.save();g.translate(c.x,c.y);g.globalAlpha=1-q/.4;g.strokeStyle='#ffffff';g.lineWidth=3;g.lineCap='round';const s=10+q*40;g.beginPath();g.moveTo(-s,-s);g.lineTo(s,s);g.moveTo(s,-s);g.lineTo(-s,s);g.stroke();g.restore()});
  if(h.n&&h.t<1.2){const o=h.o;g.save();g.font='700 14px '+FB;g.textAlign='center';g.lineJoin='round';g.lineWidth=4;g.strokeStyle='#000';g.strokeText('차단 '+h.n,o.x,o.y-o.r-30);g.fillStyle='#dfe8ff';g.fillText('차단 '+h.n,o.x,o.y-o.r-30);g.restore()}
  if(h.ball){const b=h.ball;g.save();g.translate(b.x,b.y);g.save();g.globalCompositeOperation='lighter';glow('#ffffff',0,0,20,.6);g.restore();kjBall(10,b.t*30);g.restore()}};

// ---------- 3) ULT 오프사이드 트랩 ----------
function kjUlt(o,t){const EN=F.filter(x=>x!=o&&!x.dead);const ex=EN.length?EN.reduce((s,e)=>s+e.x,0)/EN.length:A/2,dir=ex>o.x?1:-1;
  HZ.push({k:'kjult',o,t:0,dir,lx:dir>0?Math.max(20,o.x):Math.min(A-20,o.x),ph:0,n:0,sl:null,stuck:[]});SFXa('kj_crowd');SFXa('kj_whistle')}
HZX.kjult=(h,dt,EN)=>{const o=h.o;if(o.dead)return false;o.gcd=Math.max(o.gcd,.4);o.cast=null;const L0=.35,L1=1.5,FL=1.6;
  // 수비 라인 끌어올리기
  if(h.t>=L0&&h.t<L1){h.lx+=h.dir*380*dt;h.lx=clamp(h.lx,110,A-110);EN.forEach(e=>{if(e.hid||e.jump)return;if(h.dir>0?e.x<h.lx+e.r:e.x>h.lx-e.r){e.x=clamp(h.lx+h.dir*(e.r+2),e.r,A-e.r);e.cast=null}});o.x+=(h.lx-h.dir*40-o.x)*Math.min(1,dt*6)}
  if(h.t>=FL&&!h.fl){h.fl=1;SFXa('kj_flag');SFXa('kj_whistle');h.stuck=EN.filter(e=>!e.hid&&!e.jump);h.stuck.forEach(e=>{e.stn=Math.max(e.stn,1.9);e.cast=null});shake=Math.max(shake,8)}
  // 슬라이딩 태클 세 번
  if(h.fl&&h.n<3&&!h.sl&&h.t>=FL+.35+h.n*.5){const live=h.stuck.filter(e=>!e.dead);if(!live.length){h.n=3}else{const e=live[h.n%live.length],a=Math.atan2(e.y-o.y,e.x-o.x);h.sl={sx:o.x,sy:o.y,a,e,t:0,hit:0};h.n++;SFXa('kj_slide')}}
  if(h.sl){const s=h.sl;s.t+=dt;const u=Math.min(1,s.t/.32),d=Math.hypot(s.e.x-s.sx,s.e.y-s.sy)+60;o.x=clamp(s.sx+Math.cos(s.a)*d*u,o.r,A-o.r);o.y=clamp(s.sy+Math.sin(s.a)*d*u,o.r,A-o.r);o.sa=s.a;o.sq=.5;kjTurf(o.x,o.y+o.r*.6,s.a,2);
    if(!s.hit&&!s.e.dead&&dist(o,s.e)<o.r+s.e.r+8){s.hit=1;hurt(s.e,7,o,s.e.x,s.e.y,0,1);s.e.flyA=s.a-Math.PI/2*.3;s.e.flyT=.2;s.e.flyV=500;SFXa('kj_bump');shake=Math.max(shake,12);kjTurf(s.e.x,s.e.y,s.a,12)}if(u>=1)h.sl=null}
  if(h.n>=3&&!h.sl&&!h.end){h.end=1;h.et=h.t;SFXa('kj_crowd')}
  return !h.end||h.t<h.et+.6};
HZD.kjult=h=>{const a=Math.min(1,h.t/.35)*(h.end?clamp(1-(h.t-h.et)/.6,0,1):1);kjPitch(a*.85);
  g.save();g.globalAlpha=a;g.strokeStyle='#ffd23a';g.lineWidth=5;g.setLineDash([16,10]);g.lineDashOffset=-clock*80;g.beginPath();g.moveTo(h.lx,0);g.lineTo(h.lx,A);g.stroke();g.setLineDash([]);g.globalCompositeOperation='lighter';g.fillStyle='rgba(255,210,58,.12)';g.fillRect(h.dir>0?0:h.lx,0,h.dir>0?h.lx:A-h.lx,A);g.restore()};
HZP.kjult=h=>{const a=Math.min(1,h.t/.35)*(h.end?clamp(1-(h.t-h.et)/.6,0,1):1);if(h.fl){const u=clamp((h.t-1.6)/.15,0,1);kjFlag(h.lx,34,u,a);kjFlag(h.lx,A-14,u,a);
    if(h.t<2.6){g.save();g.globalAlpha=a*clamp((2.6-h.t)/.3,0,1);const s=back(clamp((h.t-1.6)/.2,0,1));g.translate(A/2,A*.2);g.scale(s,s);g.font='900 40px '+FD;g.textAlign='center';g.textBaseline='middle';g.lineJoin='round';g.lineWidth=10;g.strokeStyle='#0a1a3a';g.strokeText('오프사이드!',0,0);g.fillStyle='#ffd23a';g.fillText('오프사이드!',0,0);g.restore()}}
  if(h.sl){const o=h.o;g.save();g.translate(o.x,o.y);g.rotate(h.sl.a);g.globalAlpha=.5;g.fillStyle='#3a2a14';g.fillRect(-60,o.r*.5,60,6);g.restore()}};

// ---------- 배지/아이콘 갱신 ----------
document.querySelectorAll('#grid .tile').forEach(t=>{const i=+t.dataset.i,vc=DEF.filter(x=>x.vof===i).length;let em=t.querySelector('.vb');if(vc){if(!em){em=document.createElement('em');em.className='vb';t.appendChild(em)}em.textContent='+'+vc}});
Object.keys(ICC).forEach(k=>delete ICC[k]);mkDict();
;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ▶ 섹션 : extra10
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ===== extra10.js : 박지성 • 샌즈 (뼈 · 파란 영혼 · 블래스터) + 박르노 스탠드 그림 =====

// ---------- 그림 슬롯 (images 폴더) ----------
const SLOT={};
function slotLoad(name){if(name in SLOT)return;SLOT[name]=null;const L=[];['images/','','../images/'].forEach(d=>['png','webp','jpg','jpeg'].forEach(e=>L.push(d+name+'.'+e)));
  const go=i=>{if(i>=L.length)return;const im=new Image();im.onload=()=>{try{SLOT[name]=typeof oniCut=='function'?oniCut(im):im}catch(e){SLOT[name]=im}};im.onerror=()=>go(i+1);im.src=L[i]};go(0)}
['sn_blaster','sn_sans','ge_stand','ger_stand'].forEach(slotLoad);

// ======================================================================
// 박르노 박바나 : 항상 뒤에 떠 있는 스탠드 (images/ge_stand · ger_stand)
// ======================================================================
const _afterGE=afterImg;afterImg=function(f){_afterGE(f);if(f.dead||f.hid||phase=='menu'||!f.d||(f.d.k!='ge'&&f.d.k!='ger'))return;const im=f.d.k=='ger'?(SLOT.ger_stand||SLOT.ge_stand):SLOT.ge_stand;if(!im)return;
  const H=f.r*4.2,W=H*im.width/im.height,bob=Math.sin(clock*2.2+f.i)*4,dir=f.dx<0?-1:1;g.save();g.translate(f.x-dir*f.r*.9,f.y-f.r*.6+bob);
  g.save();g.globalCompositeOperation='lighter';glow(f.d.k=='ger'?'#cfe6ff':'#ffcc33',0,-H*.45,H*.55,.3);g.restore();
  g.globalAlpha=.88;if(dir<0)g.scale(-1,1);g.drawImage(im,-W/2,-H*.92,W,H);g.restore()};

// ======================================================================
// 박지성 • 샌즈
// ======================================================================
const NEW20=['sn_bone','sn_warn','sn_sweep','sn_blue','sn_slam','sn_gbc','sn_gbf','sn_text','sn_miss','sn_ult'];
NEW20.forEach(n=>{if(!SND.includes(n))SND.push(n);if(!AUD[n])AUD[n]=new SoundPool('sounds/'+n+'.mp3',n=='sn_text'||n=='sn_bone'||n=='sn_gbf'?6:3)});
Object.assign(SLB,{sn_bone:'샌즈 · 뼈 솟구침',sn_warn:'샌즈 · 경고음',sn_sweep:'샌즈 · 뼈 벽',sn_blue:'샌즈 · 파란 영혼',sn_slam:'샌즈 · 벽에 쾅',sn_gbc:'샌즈 · 블래스터 충전',sn_gbf:'샌즈 · 블래스터 발사',sn_text:'샌즈 · 대사 글자',sn_miss:'샌즈 · 회피',sn_ult:'샌즈 · 궁 시작'});
const SNSK=[
  {n:'뼈 공격',w:.3,cd:7,c:(o,t)=>!t.hid&&!t.jump,f:(o,t)=>snBones(o,t)},
  {n:'파란 영혼',w:.35,cd:10,c:(o,t)=>!t.hid&&!t.jump,f:(o,t)=>snBlue(o,t)},
  {n:'나쁜 시간',w:.6,ult:1,c:(o,t)=>!t.hid&&!t.jump,f:(o,t)=>snUlt(o,t)}];
const SNI=DEF.findIndex(d=>d.name=='박지성');
DEF.push({name:'박지성 • 샌즈',gl:'샌',k:'sans',vof:SNI,r:25,sp:200,col:'#5ab4ff',hi:'#eaf6ff',dk:'#0a1a30',alt:{col:'#ffd23a',hi:'#fff6d0',dk:'#3a2a04'},alt2:{col:'#ff5a8a',hi:'#ffe0ea',dk:'#3a0a1a'},sk:SNSK});
INFO['박지성 • 샌즈']={st:[7,8,6,9,8,10],p:'회피 · 13% 확률로 공격을 슥 피함 (MISS) · 뼈에 맞은 적은 보라색 독이 퍼짐',
  sk:[['3.5+3+독','경고 표시 뒤 바닥에서 뼈가 솟구치고, 이어서 뼈 벽이 경기장을 가로질러 지나감'],['2.2×3','상대의 영혼을 파랗게 바꿔 벽에 내리꽂고, 그 벽에서 뼈가 세 번 솟구침'],['2.2×5+3+6','화면이 까맣게 변하고 대사와 함께 전투 상자에 가둔 뒤 블래스터 다섯 발 · 뼈 벽 · 마지막 일제 사격']]};

// ---------- 패시브 : 회피 · 보라색 독 ----------
const _hurtSN=hurt;hurt=function(t,n,o){if(t&&t.d&&t.d.k=='sans'&&o&&o!=t&&!t.dead&&Math.random()<.13&&n>0){const a=ang(o,t)+Math.PI/2*(Math.random()<.5?1:-1);FX.push({k:'ghost',x:t.x,y:t.y,r:t.r,c:t.d.col,l:.3,m:.3});t.x=clamp(t.x+Math.cos(a)*34,t.r,A-t.r);t.y=clamp(t.y+Math.sin(a)*34,t.r,A-t.r);
  SFXa('sn_miss');T.push({x:t.x,y:t.y-t.r-30,txt:'MISS',col:'#c8c8c8',size:20,l:1});return}return _hurtSN.apply(this,arguments)};
function snPoison(e,o,d){e.snkr=Math.max(e.snkr||0,d);e.snko=o}
const _updSN=update;update=function(dt){_updSN(dt);if(!F||(phase!='play'&&phase!='demo')||TSTOP||MAD)return;F.forEach(f=>{if(!(f.snkr>0)||f.dead)return;if(CIN&&f!=CIN.o)return;f.snkr-=dt;f.snkt=(f.snkt||0)-dt;if(f.snkt<=0){f.snkt=.5;const s0=f.shield;f.shield=0;_hurtSN(f,.8,f.snko||f,f.x,f.y,0,0);f.shield=s0}})};
const _lowSN=lowHP;lowHP=function(f){_lowSN(f);if(f.snkr>0&&!f.dead&&!f.hid){g.save();g.globalCompositeOperation='lighter';glow('#c040ff',f.x,f.y,f.r*1.8,.35);g.restore()}};

// ---------- 그림 ----------
function snBone(x,y,L,w,a,al,col){g.save();g.translate(x,y);g.rotate(a);g.globalAlpha=al==null?1:al;g.fillStyle=col||'#ffffff';g.strokeStyle='rgba(0,0,0,.35)';g.lineWidth=1;
  const h=L/2;g.fillRect(-h+w*.5,-w*.32,L-w,w*.64);[-1,1].forEach(sd=>{[-1,1].forEach(k=>{g.beginPath();g.arc(sd*(h-w*.45),k*w*.3,w*.42,0,TAU);g.fill()})});g.restore()}
function snHeart(x,y,s,col,al){g.save();g.translate(x,y+s*3);g.scale(s,s);g.globalAlpha=al==null?1:al;heartPath();g.fillStyle=col;g.fill();g.restore()}
function snBlasterArt(s,open,glw,al){const im=SLOT.sn_blaster;g.save();g.globalAlpha=al==null?1:al;
  if(im){const H=70*s,W=H*im.width/im.height;g.rotate(Math.PI/2);g.drawImage(im,-W/2,-H/2,W,H);g.rotate(-Math.PI/2)}
  else{// 기본 : 뼈 고리 포 (회전하는 뼈 8개 + 가운데 빛)
    g.scale(s,s);for(let i=0;i<8;i++){const a=i*TAU/8+clock*3;snBone(Math.cos(a)*22,Math.sin(a)*22,18,6,a+Math.PI/2,1)}g.fillStyle='#0a0a12';g.beginPath();g.arc(0,0,14+open*4,0,TAU);g.fill();g.strokeStyle='#ffffff';g.lineWidth=2;g.stroke()}
  if(glw>0){g.save();g.globalCompositeOperation='lighter';glow('#ffffff',im?28*s:0,0,(14+26*glw)*s,glw);glow('#5ab4ff',im?28*s:0,0,(20+40*glw)*s,.6*glw);g.restore()}g.restore()}
function snBeam(x,y,a,L,w,al){g.save();g.translate(x,y);g.rotate(a);g.globalCompositeOperation='lighter';g.globalAlpha=al;const gr=g.createLinearGradient(0,-w,0,w);gr.addColorStop(0,'rgba(90,180,255,0)');gr.addColorStop(.3,'rgba(200,230,255,.8)');gr.addColorStop(.5,'#ffffff');gr.addColorStop(.7,'rgba(200,230,255,.8)');gr.addColorStop(1,'rgba(90,180,255,0)');
  g.fillStyle=gr;g.fillRect(0,-w,L,w*2);g.fillStyle='#ffffff';g.fillRect(0,-w*.35,L,w*.7);g.restore()}
function snBox(x,y,s){g.save();g.translate(x,y);g.fillStyle='#000';g.fillRect(-s/2,-s/2,s,s);g.strokeStyle='#ffffff';g.lineWidth=4;g.strokeRect(-s/2,-s/2,s,s);g.restore()}
function snDialog(txt,a){g.save();g.globalAlpha=a;const x=20,y=A-118,w=A-40,h=96;g.fillStyle='#000';g.fillRect(x,y,w,h);g.strokeStyle='#ffffff';g.lineWidth=5;g.strokeRect(x,y,w,h);
  g.font='700 24px monospace';g.fillStyle='#ffffff';g.textBaseline='top';g.textAlign='left';g.fillText('* '+txt,x+20,y+22);g.restore()}

// ---------- 아이콘 (네온 파란 하트 + 뼈 두 개) ----------
EMB.sans=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*2)*.05);
  neon({col:'#ffffff',hi:'#ffffff'},1.4,()=>{g.beginPath();[-1,1].forEach(sd=>{g.save();g.rotate(sd*.75);g.moveTo(-17,0);g.lineTo(17,0);g.moveTo(-17,-3);g.arc(-19,-3,2.4,0,TAU);g.moveTo(-17,3);g.arc(-19,3,2.4,0,TAU);g.moveTo(21,-3);g.arc(19,-3,2.4,0,TAU);g.moveTo(21,3);g.arc(19,3,2.4,0,TAU);g.restore()})});
  g.save();g.scale(1.1,1.1);g.translate(0,3);heartPath();g.fillStyle=D.col;g.fill();g.restore();g.save();g.globalCompositeOperation='lighter';glow(D.col,0,0,14,.6);g.restore()};

// ---------- 1) 뼈 공격 ----------
function snBones(o,t){const W=130,H=80;HZ.push({k:'snbone',o,tg:t,t:0,x:t.x,y:t.y,W,H,ph:0,hit:new Set(),sw:null});SFXa('sn_warn')}
HZX.snbone=(h,dt,EN)=>{const o=h.o,e=h.tg;const W0=.45;
  if(h.t<W0*.6&&e&&!e.dead){h.x+=(e.x-h.x)*Math.min(1,dt*8);h.y+=(e.y-h.y)*Math.min(1,dt*8)}
  if(h.t>=W0&&!h.up){h.up=1;SFXa('sn_bone');shake=Math.max(shake,6);EN.forEach(x=>{if(x.hid||x.jump)return;if(Math.abs(x.x-h.x)<h.W/2+x.r*.5&&Math.abs(x.y-h.y)<h.H/2+x.r*.5){hurt(x,3.5,o,x.x,x.y,0,0);snPoison(x,o,1.5);x.stn=Math.max(x.stn,.2)}})}
  if(h.t>=W0+.45&&!h.sw){const fromL=(e&&!e.dead?e.x:h.x)>A/2;h.sw={x:fromL?-20:A+20,d:fromL?1:-1,y:e&&!e.dead?e.y:h.y};SFXa('sn_sweep')}
  if(h.sw){h.sw.x+=h.sw.d*560*dt;EN.forEach(x=>{if(h.hit.has(x)||x.hid||x.jump)return;if(Math.abs(x.x-h.sw.x)<14+x.r&&Math.abs(x.y-h.sw.y)<90+x.r*.3){h.hit.add(x);hurt(x,3,o,x.x,x.y,0,0);snPoison(x,o,1.2)}});if(h.sw.x<-60||h.sw.x>A+60)return false}
  return h.t<3};
HZD.snbone=h=>{const W0=.45;if(h.t<W0){const bl=Math.floor(h.t*14)%2;g.save();g.translate(h.x,h.y);g.strokeStyle=bl?'#ff3040':'#ffffff';g.lineWidth=3;g.setLineDash([8,6]);g.strokeRect(-h.W/2,-h.H/2,h.W,h.H);g.setLineDash([]);g.fillStyle=bl?'rgba(255,48,64,.15)':'rgba(255,255,255,.08)';g.fillRect(-h.W/2,-h.H/2,h.W,h.H);g.font='700 13px monospace';g.fillStyle='#ffffff';g.textAlign='center';g.fillText('!',0,-h.H/2-8);g.restore()}};
HZP.snbone=h=>{const W0=.45;if(h.up&&h.t<W0+.75){const q=h.t-W0,u=q<.12?q/.12:q<.5?1:clamp(1-(q-.5)/.25,0,1);g.save();g.beginPath();g.rect(h.x-h.W/2-10,h.y-h.H/2-50,h.W+20,h.H+60);g.clip();
    for(let i=0;i<7;i++){const bx=h.x-h.W/2+10+i*(h.W-20)/6,L=(36+((i*37)%3)*10)*u;snBone(bx,h.y+h.H/2-L/2,Math.max(10,L),9,Math.PI/2,1)}g.restore()}
  if(h.sw){for(let k=-3;k<=3;k++){const L=26+((k+3)%2)*12;snBone(h.sw.x,h.sw.y+k*26,L,9,Math.PI/2,1)}g.save();g.globalCompositeOperation='lighter';g.fillStyle='rgba(255,255,255,.12)';g.fillRect(h.sw.x-h.sw.d*60,h.sw.y-95,h.sw.d*60,190);g.restore()}};

// ---------- 2) 파란 영혼 ----------
function snBlue(o,t){HZ.push({k:'snblue',o,tg:t,t:0,ph:0,n:0});SFXa('sn_blue')}
HZX.snblue=(h,dt)=>{const o=h.o,e=h.tg;if(!e||e.dead||e.hid)return false;
  if(h.ph==0){h.ph=1;const d=[[e.x,0],[A-e.x,1],[e.y,2],[A-e.y,3]].sort((a,b)=>a[0]-b[0])[0][1];h.w=d;h.sx=e.x;h.sy=e.y;h.tx=d==0?e.r:d==1?A-e.r:e.x;h.ty=d==2?e.r:d==3?A-e.r:e.y;e.stn=Math.max(e.stn,1.6);e.cast=null}
  if(h.t<.4){const u=clamp((h.t-.15)/.25,0,1),uu=u*u;e.x=h.sx+(h.tx-h.sx)*uu;e.y=h.sy+(h.ty-h.sy)*uu;e.stn=Math.max(e.stn,.3)}
  else{if(!h.sl){h.sl=1;SFXa('sn_slam');shake=Math.max(shake,12);spark(e.x,e.y,'dust',14,220);ring(e.x,e.y,6,70,'#5ab4ff',6,.35);if(typeof wallFlash=='function')wallFlash(e.x,e.y,'#5ab4ff')}e.x=h.tx+(h.w==0||h.w==1?0:e.x-h.tx);e.y=h.ty+(h.w>=2?0:e.y-h.ty);
    if(h.n<3&&h.t>=.6+h.n*.35){h.n++;h.bt=h.t;SFXa('sn_bone');hurt(e,2.2,o,e.x,e.y,0,0);snPoison(e,o,1);shake=Math.max(shake,5)}}
  return h.t<1.9};
HZP.snblue=h=>{const e=h.tg;if(!e||e.dead)return;const a=clamp((1.9-h.t)/.3,0,1);
  // 중력 방향 표시
  if(h.t<.45){g.save();g.globalAlpha=.6;g.strokeStyle='#5ab4ff';g.lineWidth=3;const dx=h.w==0?-1:h.w==1?1:0,dy=h.w==2?-1:h.w==3?1:0;for(let k=0;k<3;k++){const o2=((clock*200+k*30)%90);g.beginPath();g.moveTo(e.x+dx*(o2-20)-dy*12,e.y+dy*(o2-20)-dx*12);g.lineTo(e.x+dx*o2,e.y+dy*o2);g.lineTo(e.x+dx*(o2-20)+dy*12,e.y+dy*(o2-20)+dx*12);g.stroke()}g.restore()}
  snHeart(e.x,e.y,1.1+.08*Math.sin(clock*10),'#2a7bff',a);
  // 벽에서 솟는 뼈
  if(h.bt!=null&&h.t-h.bt<.3){const q=(h.t-h.bt)/.3,L=60*Math.sin(Math.PI*q),ang0=h.w==0?0:h.w==1?Math.PI:h.w==2?Math.PI/2:-Math.PI/2;for(let k=-2;k<=2;k++){const px=(h.w>=2?e.x+k*18:h.tx),py=(h.w<2?e.y+k*18:h.ty),bx=px+Math.cos(ang0)*(L/2-e.r),by=py+Math.sin(ang0)*(L/2-e.r);snBone(bx,by,Math.max(8,L+Math.abs(k)*-6),8,ang0,1)}}};

// ---------- 3) ULT 나쁜 시간 (연출 : 다른 사람은 멈춤) ----------
const SN_L=['와! 샌즈! 아시는구나!','이런 날엔, 너 같은 녀석은…','지옥에서 불타야 해.'];
function snUlt(o,t){SFXa('sn_ult');
  CIN={o,e:t,t:0,bx:clamp(t.x,110,A-110),by:clamp(t.y,140,A-170),gb:[],bw:[],n:0,ln:0,ch:0,ox:o.x,oy:o.y,
  tick(dt){const o=this.o;let e=this.e;if(!e||e.dead)return this.t<(this.endT||(this.endT=this.t+.5));const t=this.t,S=150;o.gcd=Math.max(o.gcd,.5);
    // 박지성은 상자 위로
    const tx=this.bx,ty=this.by-S/2-60;o.x+=(tx-o.x)*Math.min(1,dt*5);o.y+=(ty-o.y)*Math.min(1,dt*5);
    // 상대를 상자 안으로
    if(t>.9){e.x+=(this.bx-e.x)*Math.min(1,dt*6);e.y+=(this.by-e.y)*Math.min(1,dt*6)}
    // 대사
    const LT=[0,1.15,3.3];for(let i=0;i<3;i++)if(t>=LT[i])this.ln=i;const lt=t-LT[this.ln],nc=Math.min(SN_L[this.ln].length,Math.floor(lt*16));if(nc!=this.ch){if(nc>this.ch&&nc%2==0)SFXa('sn_text');this.ch=nc}
    // 블래스터 다섯
    const G0=1.3,GS=.38;if(this.n<5&&t>=G0+this.n*GS){const a=this.n*2.2+rnd(-.3,.3),R=150;this.gb.push({x:this.bx+Math.cos(a)*R,y:this.by+Math.sin(a)*R,a:a+Math.PI,t0:t,f:0,big:0});this.n++;SFXa('sn_gbc')}
    this.gb.forEach(b=>{const k=t-b.t0;if(!b.f&&k>=(b.big?.5:.45)){b.f=1;b.ft=t;SFXa('sn_gbf');shake=Math.max(shake,b.big?18:9);if(!e.dead){const px=e.x-b.x,py=e.y-b.y,al=px*Math.cos(b.a)+py*Math.sin(b.a),pe=Math.abs(-px*Math.sin(b.a)+py*Math.cos(b.a));if(al>0&&pe<(b.big?40:26)+e.r){hurt(e,b.big?1:2.2,o,e.x,e.y,0,b.big?1:0);snPoison(e,o,.8)}}}});
    // 뼈 벽 두 번
    [2.0,2.7].forEach((tw,i)=>{if(t>=tw&&!this.bw[i]){this.bw[i]={x:i%2?this.bx+S/2+20:this.bx-S/2-20,d:i%2?-1:1,hit:0};SFXa('sn_sweep')}});
    this.bw.forEach(w=>{if(!w)return;w.x+=w.d*380*dt;if(!w.hit&&Math.abs(w.x-e.x)<12+e.r){w.hit=1;hurt(e,1.5,o,e.x,e.y,0,0);snPoison(e,o,.8)}});
    // 마지막 : 일제 사격
    if(t>=3.6&&!this.fin){this.fin=1;for(let i=0;i<6;i++){const a=i*TAU/6+.3;this.gb.push({x:this.bx+Math.cos(a)*170,y:this.by+Math.sin(a)*170,a:a+Math.PI,t0:t,f:0,big:1})}SFXa('sn_gbc')}
    if(this.fin&&t>4.9)return false;return t<7},
  draw(){const o=this.o,e=this.e,t=this.t,S=150,a=Math.min(1,t/.4)*(this.fin?clamp(1-(t-4.6)/.3,0,1):1);
    g.save();g.globalAlpha=a;g.fillStyle='#000';g.fillRect(-300,-300,A+600,A+600);g.restore();
    if(t>.9){const s=Math.min(1,(t-.9)/.2);g.save();g.globalAlpha=a;snBox(this.bx,this.by,S*s);g.restore()}
    // 샌즈 그림 또는 박지성 공
    const si=SLOT.sn_sans;if(si){const H=110,W=H*si.width/si.height;g.save();g.globalAlpha=a;g.drawImage(si,o.x-W/2,o.y-H*.8+Math.sin(clock*2)*2,W,H);g.restore()}else if(!o.dead){g.save();g.globalAlpha=a;ball(o,e);g.restore()}
    // 영혼 (하트)
    if(e&&!e.dead){if(t>.9)snHeart(e.x,e.y,1.3,'#ff2030',a);else{g.save();g.globalAlpha=a;ball(e,o);g.restore()}}
    // 뼈 벽
    this.bw.forEach(w=>{if(!w)return;g.save();g.beginPath();g.rect(this.bx-S/2+3,this.by-S/2+3,S-6,S-6);g.clip();for(let k=-2;k<=2;k++)snBone(w.x,this.by+k*28,k%2?40:56,9,Math.PI/2,a);g.restore()});
    // 블래스터
    this.gb.forEach(b=>{const k=t-b.t0,sc=(b.big?1.25:1)*back(clamp(k/.2,0,1));if(b.f&&t-b.ft>.45)return;const fa=b.f?clamp(1-(t-b.ft-.25)/.2,0,1):1;
      if(b.f){const bw=(b.big?30:20)*(1-Math.max(0,t-b.ft-.2)/.25);if(bw>0)snBeam(b.x,b.y,b.a,700,bw,a*fa)}
      g.save();g.translate(b.x-(b.f?Math.cos(b.a)*20*Math.min(1,(t-b.ft)/.1):0),b.y-(b.f?Math.sin(b.a)*20*Math.min(1,(t-b.ft)/.1):0));g.rotate(b.a);snBlasterArt(sc,b.f?1:clamp(k/.45,0,1),b.f?0:clamp((k-.2)/.25,0,1),a*fa);g.restore()});
    // 대사 상자
    const txt=SN_L[this.ln].slice(0,this.ch);snDialog(txt,a)}};
  ft(o.x,o.y-o.r-40,'...','#ffffff',22)}

// ---------- 배지/아이콘 갱신 ----------
document.querySelectorAll('#grid .tile').forEach(t=>{const i=+t.dataset.i,vc=DEF.filter(x=>x.vof===i).length;let em=t.querySelector('.vb');if(vc){if(!em){em=document.createElement('em');em.className='vb';t.appendChild(em)}em.textContent='+'+vc}});
Object.keys(ICC).forEach(k=>delete ICC[k]);mkDict();
;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ▶ 섹션 : fix1
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ===== fix1.js : 구석 갇힘 · 모서리 연속 튕김 방지 =====
// 밀어낼 때 벽에 처박히지 않게 : 벽 쪽으로 밀리면 그 방향 성분을 반대로
function safePush(e,a,d){let vx=Math.cos(a)*d,vy=Math.sin(a)*d;const m=e.r+40;
  if((e.x+vx<m&&vx<0)||(e.x+vx>A-m&&vx>0))vx=-vx*.6;if((e.y+vy<m&&vy<0)||(e.y+vy>A-m&&vy>0))vy=-vy*.6;
  e.x=clamp(e.x+vx,e.r,A-e.r);e.y=clamp(e.y+vy,e.r,A-e.r)}
// 구석에 오래 있으면 가운데로 빠져나옴
const _updFX1=update;update=function(dt){_updFX1(dt);if(!F||(phase!='play'&&phase!='demo')||TSTOP||MAD)return;
  F.forEach(f=>{if(f.dead||f.hid||f.jump)return;if(CIN&&(f==CIN.o||CIN.e==f))return;const m=f.r+38,cx=f.x<m||f.x>A-m,cy=f.y<m||f.y>A-m;
    f.cnr=(cx&&cy)?(f.cnr||0)+dt:Math.max(0,(f.cnr||0)-dt*2);
    if(f.cnr>.7){const a=Math.atan2(A/2-f.y,A/2-f.x)+rnd(-.35,.35);f.dx=Math.cos(a);f.dy=Math.sin(a);f.x=clamp(f.x+Math.cos(a)*170*dt,f.r,A-f.r);f.y=clamp(f.y+Math.sin(a)*170*dt,f.r,A-f.r);if(f.cnr>1.1)f.cnr=0}
    // 한쪽 벽에 계속 붙어 있으면 벽에서 떨어지는 방향으로
    const wx=f.x<=f.r+1?1:f.x>=A-f.r-1?-1:0,wy=f.y<=f.r+1?1:f.y>=A-f.r-1?-1:0;f.wst=(wx||wy)?(f.wst||0)+dt:0;
    if(f.wst>1){if(wx&&Math.sign(f.dx)!=wx)f.dx=wx*Math.max(.5,Math.abs(f.dx));if(wy&&Math.sign(f.dy)!=wy)f.dy=wy*Math.max(.5,Math.abs(f.dy));const l=Math.hypot(f.dx,f.dy)||1;f.dx/=l;f.dy/=l}});};
// 겁먹고 도망칠 때 벽 · 구석으로 처박히지 않게 (가운데 쪽으로 섞어서 도망)
if(typeof onFear=='function'){const _updFX2=update;update=function(dt){_updFX2(dt);if(!F||(phase!='play'&&phase!='demo'))return;F.forEach(f=>{if(!(f.fear>0)||f.dead)return;const m=f.r+70;let px=0,py=0;
  if(f.x<m)px=(m-f.x)/m;else if(f.x>A-m)px=-(f.x-(A-m))/m;if(f.y<m)py=(m-f.y)/m;else if(f.y>A-m)py=-(f.y-(A-m))/m;if(px||py){let vx=f.dx+px*2.2,vy=f.dy+py*2.2;const l=Math.hypot(vx,vy)||1;f.dx=vx/l;f.dy=vy/l}})}}
;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ▶ 섹션 : extra11
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ===== extra11.js : 김티비 • 최해솔 (평범한 고1) =====

const NEW21=['hs_bell','hs_run','hs_bread','hs_paper','hs_grade','hs_chalk','hs_tap','hs_slam','hs_grow'];
NEW21.forEach(n=>{if(!SND.includes(n))SND.push(n);if(!AUD[n])AUD[n]=new SoundPool('sounds/'+n+'.mp3',n=='hs_chalk'||n=='hs_tap'||n=='hs_paper'?6:3)});
Object.assign(SLB,{hs_bell:'최해솔 · 학교 종',hs_run:'최해솔 · 전력질주',hs_bread:'최해솔 · 빵 먹기',hs_paper:'최해솔 · 시험지 날리기',hs_grade:'최해솔 · 빨간펜 채점',hs_chalk:'최해솔 · 분필 던지기',hs_tap:'최해솔 · 분필 맞음',hs_slam:'최해솔 · 출석부 쾅',hs_grow:'최해솔 · 성장'});
const HSSK=[
  {n:'매점 런',w:.3,cd:8,c:(o,t)=>!t.hid&&!t.jump,f:(o,t)=>hsRun(o,t)},
  {n:'중간고사',w:.35,cd:8,c:(o,t)=>!t.hid&&dist(o,t)<600,f:(o,t)=>hsExam(o,t)},
  {n:'자습 시간',w:.7,ult:1,c:(o,t)=>!t.hid,f:(o,t)=>hsUlt(o,t)}];
const HSI=DEF.findIndex(d=>d.name=='김티비');
DEF.push({name:'김티비 • 최해솔',gl:'솔',k:'hsol',vof:HSI,r:26,sp:212,col:'#4fd1a5',hi:'#dcfff1',dk:'#063a2a',alt:{col:'#ff9a3c',hi:'#ffe6cc',dk:'#3a1e04'},alt2:{col:'#8a7bff',hi:'#e6e2ff',dk:'#1c1450'},sk:HSSK});
INFO['김티비 • 최해솔']={st:[7,7,7,7,7,9],p:'성장기 · 특별한 건 없지만 12초마다 조금씩 큼 (피해 · 속도 +5%, 최대 5번)',
  sk:[['3×2 + 회복','종이 울리면 매점까지 전력질주 · 가는 길에 부딪힌 상대를 두 번 들이받고 빵 먹고 체력 회복'],['2~7 ×4','시험지 네 장을 날림 · 맞으면 빨간펜으로 채점 · 점수가 낮을수록 아픔 (0점이면 7)'],['1.2×12+7','경기장이 교실이 됨 · 칠판에서 분필이 쏟아지고 마지막에 출석부로 내리침']]};

// ---------- 패시브 : 성장기 ----------
const _updHS=update;update=function(dt){_updHS(dt);if(!F||phase!='play')return;F.forEach(f=>{if(f.d.k!='hsol'||f.dead)return;f.hgT=(f.hgT||0)+dt;if(f.hgT>=12&&(f.hg||0)<5){f.hgT=0;f.hg=(f.hg||0)+1;f.sp=f.d.sp*(1+.05*f.hg);SFXa('hs_grow');ft(f.x,f.y-f.r-34,'성장 +'+f.hg,'#4fd1a5',22);ring(f.x,f.y,f.r,f.r+40,'#4fd1a5',4,.4);
  for(let i=0;i<10;i++)Pt.push({x:f.x+rnd(-f.r,f.r),y:f.y+f.r,vx:0,vy:rnd(-160,-90),l:.6,m:.6,gl:1,sh:5,col:'#a8ffd8',r:1.8,fr:.2})}})};
const _hurtHS=hurt;hurt=function(t,n,o){if(o&&o.d&&o.d.k=='hsol'&&o.hg&&t!=o&&n>0){const a=[...arguments];a[1]=Math.round(n*(1+.05*o.hg)*10)/10;return _hurtHS.apply(this,a)}return _hurtHS.apply(this,arguments)};

// ---------- 그림 ----------
function hsBread(s){g.save();g.scale(s,s);const bg=g.createLinearGradient(0,-8,0,8);bg.addColorStop(0,'#e0a050');bg.addColorStop(1,'#a8641c');g.fillStyle=bg;g.strokeStyle='#5a3008';g.lineWidth=1.2;
  g.beginPath();g.moveTo(-11,6);g.lineTo(-11,-2);g.quadraticCurveTo(-11,-9,-5,-9);g.quadraticCurveTo(0,-12,5,-9);g.quadraticCurveTo(11,-9,11,-2);g.lineTo(11,6);g.closePath();g.fill();g.stroke();
  g.fillStyle='#fff3d0';g.beginPath();g.moveTo(-8,5);g.lineTo(-8,-1);g.quadraticCurveTo(-8,-6,-3,-6);g.quadraticCurveTo(0,-8,3,-6);g.quadraticCurveTo(8,-6,8,-1);g.lineTo(8,5);g.closePath();g.fill();g.restore()}
function hsPaper(s,score,rot){g.save();g.rotate(rot||0);g.scale(s,s);g.fillStyle='rgba(0,0,0,.25)';g.fillRect(-11,-13,24,30);g.fillStyle='#fbfaf4';g.fillRect(-13,-16,26,32);g.strokeStyle='#c8c3b0';g.lineWidth=.8;g.strokeRect(-13,-16,26,32);
  g.strokeStyle='rgba(60,90,160,.45)';for(let y=-8;y<14;y+=4){g.beginPath();g.moveTo(-10,y);g.lineTo(10,y);g.stroke()}g.fillStyle='#3a4a6a';g.font='700 5px '+FB;g.textAlign='left';g.fillText('중간고사',-10,-11);
  if(score!=null){g.strokeStyle='#e8202c';g.lineWidth=1.6;g.beginPath();g.arc(4,3,8,0,TAU);g.stroke();g.fillStyle='#e8202c';g.font='900 9px '+FB;g.textAlign='center';g.textBaseline='middle';g.fillText(score,4,3)}g.restore()}
function hsChalk(s,a){g.save();g.rotate(a);g.scale(s,s);g.fillStyle='#f6f6ee';g.fillRect(-7,-2,14,4);g.fillStyle='#d8d8cc';g.fillRect(4,-2,3,4);g.restore()}
function hsClass(a){g.save();g.globalAlpha=a;const fg=g.createLinearGradient(0,0,0,A);fg.addColorStop(0,'#b8895a');fg.addColorStop(1,'#8a5e36');g.fillStyle=fg;g.fillRect(0,0,A,A);
  g.strokeStyle='rgba(60,30,10,.25)';g.lineWidth=1;for(let y=0;y<A;y+=30){g.beginPath();g.moveTo(0,y);g.lineTo(A,y);g.stroke();for(let x=((y/30)%2)*60;x<A;x+=120){g.beginPath();g.moveTo(x,y);g.lineTo(x,y+30);g.stroke()}}
  // 칠판
  g.fillStyle='#5a3a1c';g.fillRect(40,6,A-80,92);const bg=g.createLinearGradient(0,12,0,92);bg.addColorStop(0,'#2e5a3e');bg.addColorStop(1,'#1e4430');g.fillStyle=bg;g.fillRect(48,12,A-96,78);
  g.fillStyle='rgba(255,255,255,.08)';for(let i=0;i<6;i++)g.fillRect(60+i*80,20+(i%3)*14,50,3);g.font='700 22px '+FB;g.fillStyle='rgba(250,250,240,.9)';g.textAlign='center';g.textBaseline='middle';g.fillText('자습',A/2,40);g.font='700 14px '+FB;g.fillText('떠들면 이름 적음',A/2,68);
  g.fillStyle='#d8d8cc';g.fillRect(A/2-60,90,120,5);
  // 책상
  for(let r=0;r<3;r++)for(let c=0;c<4;c++){const x=80+c*135,y=200+r*130;g.fillStyle='rgba(0,0,0,.2)';g.fillRect(x-30,y-14,64,32);g.fillStyle='#c9a06a';g.fillRect(x-32,y-18,64,30);g.strokeStyle='#7a5a2a';g.lineWidth=1.5;g.strokeRect(x-32,y-18,64,30);g.fillStyle='#6a6e78';g.fillRect(x-22,y+14,44,10)}
  const v=g.createRadialGradient(A/2,A/2,A*.35,A/2,A/2,A*.8);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,0,.35)');g.fillStyle=v;g.fillRect(0,0,A,A);g.restore()}

// ---------- 아이콘 (네온 가방 + 교복 넥타이) ----------
EMB.hsol=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*3)*.05);
  neon(D,1.7,()=>{g.beginPath();g.rect(-13,-8,26,24);g.moveTo(-7,-8);g.quadraticCurveTo(-7,-17,0,-17);g.quadraticCurveTo(7,-17,7,-8);g.moveTo(-13,2);g.lineTo(13,2);g.rect(-4,2,8,6)});
  neon({col:'#ff5a5a',hi:'#ffd8d8'},1.3,()=>{g.beginPath();g.moveTo(0,-4);g.lineTo(-2,0);g.lineTo(0,10);g.lineTo(2,0);g.closePath()});
  g.save();g.globalCompositeOperation='lighter';glow(D.col,0,0,15,.4);g.restore()};

// ---------- 1) 매점 런 ----------
function hsRun(o,t){HZ.push({k:'hsrun',o,tg:t,t:0,ph:0,hit:0,tr:[],a:ang(o,t)});SFXa('hs_bell')}
HZX.hsrun=(h,dt,EN)=>{const o=h.o;if(o.dead)return false;o.gcd=Math.max(o.gcd,.3);o.cast=null;const V=640;
  if(h.t<.45){return true}
  if(!h.rs){h.rs=1;SFXa('hs_run')}
  const e=h.tg;if(h.hit<2&&e&&!e.dead){let da=ang(o,e)-h.a;da=Math.atan2(Math.sin(da),Math.cos(da));h.a+=clamp(da,-5*dt,5*dt)}
  o.x+=Math.cos(h.a)*V*dt;o.y+=Math.sin(h.a)*V*dt;if(o.x<o.r||o.x>A-o.r){h.a=Math.PI-h.a}if(o.y<o.r||o.y>A-o.r){h.a=-h.a}o.x=clamp(o.x,o.r,A-o.r);o.y=clamp(o.y,o.r,A-o.r);o.dx=Math.cos(h.a);o.dy=Math.sin(h.a);
  h.tr.push({x:o.x,y:o.y,t:h.t});h.tr=h.tr.filter(q=>h.t-q.t<.25);emit(30,dt,()=>dustP(o.x,o.y+o.r*.7,rnd(30,70)));
  h.cd=(h.cd||0)-dt;const hit=EN.find(x=>!x.hid&&!x.jump&&dist(o,x)<o.r+x.r+6);if(hit&&h.cd<=0&&h.hit<2){h.hit++;h.cd=.25;hurt(hit,3,o,hit.x,hit.y,0,1);safePush(hit,h.a,46);hit.stn=Math.max(hit.stn,.3);hit.cast=null;shake=Math.max(shake,9);FX.push({k:'burst',x:hit.x,y:hit.y,c:'#dcfff1',a:rnd(0,1),l:.25,m:.25});h.a+=rnd(-.8,.8)}
  if(h.t>=1.25&&!h.ate){h.ate=1;h.et=h.t;SFXa('hs_bread');const hv=Math.min(5,100-o.hp);if(hv>0){o.hp+=hv;ft(o.x,o.y-o.r-14,'+'+hv,'#7bff8a',22)}for(let i=0;i<8;i++)Pt.push({x:o.x,y:o.y-10,vx:rnd(-80,80),vy:rnd(-120,-40),l:.6,m:.6,sh:2,col:'#e8b060',r:rnd(1.5,3),rot:rnd(0,TAU),vr:rnd(-10,10),gy:300,fr:.5})}
  return !h.ate||h.t<h.et+.6};
HZD.hsrun=h=>{const o=h.o;h.tr.forEach(q=>{const a=1-(h.t-q.t)/.25;g.save();g.globalAlpha=a*.35;g.drawImage(ICON(o.d,52),q.x-o.r,q.y-o.r,o.r*2,o.r*2);g.restore()})};
HZP.hsrun=h=>{const o=h.o;if(o.dead)return;
  if(h.t<.45){const u=h.t/.45;g.save();g.translate(o.x,o.y-o.r-30);g.rotate(Math.sin(clock*40)*.3);g.fillStyle='#d4af37';g.strokeStyle='#5a4008';g.lineWidth=1.5;g.beginPath();g.moveTo(-9,6);g.quadraticCurveTo(-9,-10,0,-11);g.quadraticCurveTo(9,-10,9,6);g.closePath();g.fill();g.stroke();g.fillStyle='#5a4008';g.beginPath();g.arc(0,8,2.5,0,TAU);g.fill();g.restore();
    g.save();g.strokeStyle='rgba(255,255,255,.7)';g.lineWidth=2;for(let k=0;k<2;k++){const r=14+((u*2+k*.5)%1)*20;g.beginPath();g.arc(o.x,o.y-o.r-30,r,-2.4,-.7);g.stroke()}g.restore();return}
  if(!h.ate){g.save();g.translate(o.x+Math.cos(h.a)*o.r*.8,o.y+Math.sin(h.a)*o.r*.8-6);g.rotate(h.a*.2);hsBread(.9);g.restore();
    g.save();g.font='700 13px '+FB;g.textAlign='center';g.lineJoin='round';g.lineWidth=4;g.strokeStyle='#000';g.strokeText('매점!!',o.x,o.y-o.r-22);g.fillStyle='#dcfff1';g.fillText('매점!!',o.x,o.y-o.r-22);g.restore()}};

// ---------- 2) 중간고사 ----------
function hsExam(o,t){const a0=ang(o,t);HZ.push({k:'hsexam',o,tg:t,t:0,pp:[0,1,2,3].map(i=>({x:o.x,y:o.y,a:a0+(i-1.5)*.35,v:430,dl:i*.08,on:0,live:1,rot:rnd(0,TAU)})),gr:[]});SFXa('hs_paper')}
HZX.hsexam=(h,dt,EN)=>{const o=h.o;let e=h.tg;if(!e||e.dead)e=tgt(o);let alive=0;
  h.pp.forEach(p=>{if(!p.live)return;alive++;if(h.t<p.dl)return;if(!p.on){p.on=1;p.x=o.x;p.y=o.y;if(p.dl)SFXa('hs_paper')}
    if(e){let da=Math.atan2(e.y-p.y,e.x-p.x)-p.a;da=Math.atan2(Math.sin(da),Math.cos(da));p.a+=clamp(da,-3.2*dt,3.2*dt)}p.x+=Math.cos(p.a)*p.v*dt;p.y+=Math.sin(p.a)*p.v*dt+Math.sin(h.t*12+p.dl*20)*40*dt;p.rot+=dt*7;
    if(p.x<-30||p.x>A+30||p.y<-30||p.y>A+30||h.t>2.4){p.live=0;return}
    const hit=EN.find(x=>!x.hid&&!x.jump&&Math.hypot(x.x-p.x,x.y-p.y)<x.r+12);if(hit){p.live=0;const sc=[0,12,37,58,64,81,95,100][Math.floor(rnd(0,8))],dmg=Math.round((2+5*(1-sc/100))*10)/10;hurt(hit,dmg,o,hit.x,hit.y,0,sc<20);SFXa('hs_grade');h.gr.push({x:hit.x,y:hit.y,e:hit,sc,t:h.t});
      if(sc==100)ft(hit.x,hit.y-hit.r-50,'만점?!','#ffd23a',22);else if(sc==0)ft(hit.x,hit.y-hit.r-50,'빵점 ㅋㅋ','#ff5a5a',24)}});
  return alive>0||h.gr.some(q=>h.t-q.t<1)};
HZP.hsexam=h=>{h.pp.forEach(p=>{if(!p.live||!p.on)return;g.save();g.translate(p.x,p.y);hsPaper(1.15,null,p.rot);g.restore()});
  h.gr.forEach(q=>{const k=h.t-q.t;if(k>1)return;const x=q.e&&!q.e.dead?q.e.x:q.x,y=(q.e&&!q.e.dead?q.e.y:q.y)-36,a=clamp((1-k)/.3,0,1),s=k<.12?1.8-.8*k/.12:1;g.save();g.translate(x+16,y);g.globalAlpha=a;g.scale(s,s);g.rotate(-.15);
    g.strokeStyle='#e8202c';g.lineWidth=3;g.beginPath();g.ellipse(0,0,24,16,0,0,TAU*Math.min(1,k/.15));g.stroke();g.font='900 18px '+FB;g.fillStyle='#e8202c';g.textAlign='center';g.textBaseline='middle';g.fillText(q.sc+'점',0,1);
    if(q.sc<40){g.beginPath();g.moveTo(-22,12);g.lineTo(-30,18);g.stroke()}g.restore()})};

// ---------- 3) ULT 자습 시간 ----------
function hsUlt(o,t){HZ.push({k:'hsult',o,t:0,n:0,ch:[],sl:0,tg:t});SFXa('hs_bell')}
HZX.hsult=(h,dt,EN)=>{const o=h.o;const C0=.7,CS=.13,N=12;
  if(h.n<N&&h.t>=C0+h.n*CS&&EN.length){const e=EN[h.n%EN.length];if(!e.hid){const sx=rnd(80,A-80),sy=95,a=Math.atan2(e.y-sy,e.x-sx);h.ch.push({x:sx,y:sy,a,v:780,live:1,rot:0});SFXa('hs_chalk')}h.n++}
  h.ch.forEach(c=>{if(!c.live)return;c.x+=Math.cos(c.a)*c.v*dt;c.y+=Math.sin(c.a)*c.v*dt;c.rot+=dt*20;if(c.x<-20||c.x>A+20||c.y>A+20){c.live=0;return}
    const hit=EN.find(x=>!x.hid&&!x.jump&&Math.hypot(x.x-c.x,x.y-c.y)<x.r+8);if(hit){c.live=0;hurt(hit,1.2,o,c.x,c.y,0,0);SFXa('hs_tap');for(let i=0;i<6;i++)Pt.push({x:c.x,y:c.y,vx:rnd(-90,90),vy:rnd(-90,90),l:.4,m:.4,sh:3,col:'#f6f6ee',r:rnd(4,7),gr:12,a0:.6,fr:.2});hit.slow=Math.max(hit.slow,.4)}});
  const S0=C0+N*CS+.4;
  if(h.t>=S0&&!h.sl){h.sl=1;const L=EN.filter(x=>!x.hid);h.st=L.sort((p,q)=>p.hp-q.hp)[0];if(h.st){h.sx=h.st.x;h.sy=h.st.y}}
  if(h.sl&&!h.slm&&h.t>=S0+.4){h.slm=1;SFXa('hs_slam');shake=Math.max(shake,18);hs=.1;const e=h.st;if(e&&!e.dead&&!e.hid&&!e.jump){hurt(e,7,o,e.x,e.y,0,1);e.stn=Math.max(e.stn,.6);ring(e.x,e.y,8,90,'#ffffff',8,.4);FX.push({k:'crack',x:e.x,y:e.y,r:50,l:1.5,m:1.5});ft(e.x,e.y-e.r-44,'떠들면 이름 적는다','#ffffff',22)}}
  return !h.slm||h.t<S0+1.1};
HZD.hsult=h=>{const S0=.7+12*.13+.4,a=Math.min(1,h.t/.4)*(h.slm?clamp(1-(h.t-S0-.6)/.5,0,1):1);hsClass(a*.9)};
HZP.hsult=h=>{h.ch.forEach(c=>{if(!c.live)return;g.save();g.translate(c.x,c.y);g.save();g.globalCompositeOperation='lighter';glow('#ffffff',0,0,10,.5);g.restore();hsChalk(2,c.rot);g.restore()});
  if(h.sl&&h.st&&!h.st.dead){const S0=.7+12*.13+.4,k=h.t-S0,e=h.st;if(k<.9){const u=clamp(k/.4,0,1),y=e.y-30-(1-u*u)*160,al=clamp((.9-k)/.3,0,1);g.save();g.translate(e.x,y);g.rotate(-.2+u*.2);g.globalAlpha=al;
    g.fillStyle='rgba(0,0,0,.3)';g.fillRect(-26,-14,56,36);g.fillStyle='#1c3a6a';g.fillRect(-28,-18,56,36);g.strokeStyle='#0a1a3a';g.lineWidth=2;g.strokeRect(-28,-18,56,36);g.fillStyle='#e8e2c8';g.fillRect(-24,-14,4,28);g.font='700 10px '+FB;g.fillStyle='#ffffff';g.textAlign='center';g.textBaseline='middle';g.fillText('출석부',4,0);g.restore()}}};

// ---------- 배지/아이콘 갱신 ----------
document.querySelectorAll('#grid .tile').forEach(t=>{const i=+t.dataset.i,vc=DEF.filter(x=>x.vof===i).length;let em=t.querySelector('.vb');if(vc){if(!em){em=document.createElement('em');em.className='vb';t.appendChild(em)}em.textContent='+'+vc}});
Object.keys(ICC).forEach(k=>delete ICC[k]);mkDict();
;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ▶ 섹션 : extra12
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ===== extra12.js : 김가은 • 어쩌라고 =====

const NEW22=['ez_say','ez_shield','ez_reflect','ez_letter','ez_bounce','ez_msg','ez_stamp','ez_ult'];
NEW22.forEach(n=>{if(!SND.includes(n))SND.push(n);if(!AUD[n])AUD[n]=new SoundPool('sounds/'+n+'.mp3',n=='ez_bounce'||n=='ez_msg'?6:3)});
Object.assign(SLB,{ez_say:'어쩌라고 · "어쩌라고" 뿅',ez_shield:'어쩌라고 · 무시 방패',ez_reflect:'어쩌라고 · 튕겨내기',ez_letter:'어쩌라고 · 글자 던지기',ez_bounce:'어쩌라고 · 글자 튕김',ez_msg:'어쩌라고 · 메시지 알림',ez_stamp:'어쩌라고 · 대왕 도장',ez_ult:'어쩌라고 · 궁 시작'});
const EZSK=[
  {n:'어쩌라고 방패',w:.2,cd:8,c:(o,t)=>!t.hid&&dist(o,t)<420,f:(o,t)=>ezShield(o,t)},
  {n:'어·쩌·라·고',w:.3,cd:7,c:(o,t)=>!t.hid&&dist(o,t)<600,f:(o,t)=>ezLetters(o,t)},
  {n:'무한 어쩌라고',w:.6,ult:1,c:(o,t)=>!t.hid,f:(o,t)=>ezUlt(o,t)}];
const EZI=DEF.findIndex(d=>d.name=='김가은');
DEF.push({name:'김가은 • 어쩌라고',gl:'어',k:'ezr',vof:EZI,r:26,sp:208,col:'#ff7ac8',hi:'#ffe6f4',dk:'#4a0a2e',alt:{col:'#7ad0ff',hi:'#e2f6ff',dk:'#0a2e4a'},alt2:{col:'#c8ff5a',hi:'#f2ffd8',dk:'#2a4a0a'},sk:EZSK});
INFO['김가은 • 어쩌라고']={st:[7,8,6,8,7,9],p:'무관심 · 둔화 · 기절 · 공포 같은 상태이상이 절반만 걸림 (어쩌라고)',
  sk:[['반사 + 7','1.2초 동안 "어쩌라고" 말풍선 방패 · 날아오는 공격은 상대한테 튕겨 보내고, 받은 피해는 무시한 뒤 그만큼 되돌려 줌'],['3.5×4','"어" "쩌" "라" "고" 네 글자를 던짐 · 글자가 벽과 상대에 통통 튕기며 계속 때림'],['2.2×8+11','화면이 채팅방이 되고 상대가 보내는 메시지마다 "어쩌라고"로 받아침 · 마지막에 대왕 "어쩌라고" 도장 쾅']]};

// ---------- 패시브 : 무관심 (상태이상 절반) ----------
const _updEZ=update;update=function(dt){const pre=F?F.filter(f=>f.d.k=='ezr'&&!f.dead).map(f=>[f,f.slow,f.stn,f.fear||0]):[];_updEZ(dt);
  pre.forEach(([f,s0,t0,fe0])=>{if(f.slow>s0+.01)f.slow=s0+(f.slow-s0)*.5;if(f.stn>t0+.01)f.stn=t0+(f.stn-t0)*.5;if((f.fear||0)>fe0+.01)f.fear=fe0+(f.fear-fe0)*.5})};

// ---------- 그림 : 말풍선 + 글자 ----------
function ezBubble(x,y,txt,s,al,col,tail){g.save();g.translate(x,y);g.scale(s,s);g.globalAlpha=al;g.font='900 22px "Black Han Sans",'+FB;const w=g.measureText(txt).width+28,h=40;
  g.fillStyle='rgba(0,0,0,.3)';ezRR(-w/2+3,-h/2+4,w,h,14);g.fill();g.fillStyle='#ffffff';g.strokeStyle=col||'#ff7ac8';g.lineWidth=3;ezRR(-w/2,-h/2,w,h,14);g.fill();g.stroke();
  if(tail!==0){g.beginPath();g.moveTo(-6,h/2-1);g.lineTo(-14,h/2+12);g.lineTo(6,h/2-1);g.closePath();g.fill();g.stroke();g.fillRect(-7,h/2-4,14,5)}
  g.fillStyle='#1a1020';g.textAlign='center';g.textBaseline='middle';g.fillText(txt,0,1);g.restore()}
function ezRR(x,y,w,h,r){g.beginPath();g.moveTo(x+r,y);g.lineTo(x+w-r,y);g.quadraticCurveTo(x+w,y,x+w,y+r);g.lineTo(x+w,y+h-r);g.quadraticCurveTo(x+w,y+h,x+w-r,y+h);g.lineTo(x+r,y+h);g.quadraticCurveTo(x,y+h,x,y+h-r);g.lineTo(x,y+r);g.quadraticCurveTo(x,y,x+r,y);g.closePath()}
function ezGlyph(ch,s,rot,col){g.save();g.rotate(rot);g.scale(s,s);g.font='900 30px "Black Han Sans",'+FB;g.textAlign='center';g.textBaseline='middle';g.lineJoin='round';
  g.save();g.globalCompositeOperation='lighter';glow(col,0,0,26,.55);g.restore();g.lineWidth=8;g.strokeStyle='#2a0a1e';g.strokeText(ch,0,0);const gr=g.createLinearGradient(0,-14,0,14);gr.addColorStop(0,'#ffffff');gr.addColorStop(1,col);g.fillStyle=gr;g.fillText(ch,0,0);g.restore()}

// ---------- 아이콘 (네온 말풍선 + 어쩌) ----------
EMB.ezr=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*2.5)*.06);
  neon(D,1.8,()=>{ezRR(-17,-14,34,22,8);g.moveTo(-6,8);g.lineTo(-10,16);g.lineTo(2,8)});
  g.fillStyle=D.hi;g.font='900 11px "Black Han Sans",'+FB;g.textAlign='center';g.textBaseline='middle';g.fillText('ㅇㅉ',0,-3);g.save();g.globalCompositeOperation='lighter';glow(D.col,0,-3,14,.45);g.restore()};

// ---------- 1) 어쩌라고 방패 ----------
function ezShield(o,t){HZ.push({k:'ezsh',o,tg:t,t:0,soak:0,n:0,pops:[]});o.ezsh=1;SFXa('ez_shield');SFXa('ez_say')}
const _hurtEZ=hurt;hurt=function(t,n,o){if(t&&t.ezsh&&n>0&&o&&o!=t){const h=HZ.find(q=>q.k=='ezsh'&&q.o==t);if(h){h.soak+=n;h.pops.push({t:h.t,a:rnd(-.5,.5)});SFXa('ez_reflect');return}}return _hurtEZ.apply(this,arguments)};
HZX.ezsh=(h,dt,EN)=>{const o=h.o;if(o.dead){o.ezsh=0;return false}const D=1.2,R=o.r+46;
  if(h.t<D){B.forEach(q=>{if(q.o==o||q.ezr)return;if(Math.hypot(q.x-o.x,q.y-o.y)<R+q.r){const e=q.o&&!q.o.dead?q.o:tgt(o);const a=e?Math.atan2(e.y-q.y,e.x-q.x):Math.atan2(q.y-o.y,q.x-o.x);const sp=Math.hypot(q.vx,q.vy)*1.2;q.vx=Math.cos(a)*sp;q.vy=Math.sin(a)*sp;q.a=a;q.o=o;q.ezr=1;h.n++;SFXa('ez_reflect');ring(q.x,q.y,4,30,'#ff7ac8',3,.25);h.pops.push({t:h.t,a:rnd(-.5,.5)})}})}
  else if(!h.done){h.done=1;o.ezsh=0;let e=h.tg;if(!e||e.dead)e=tgt(o);if(e&&!e.hid){const dmg=Math.round(Math.min(16,7+h.soak*1.5)*10)/10;h.sx=o.x;h.sy=o.y-o.r-30;h.fl={e,dmg,t:h.t}}}
  if(h.fl){const q=h.t-h.fl.t,u=Math.min(1,q/.3);h.bx=h.sx+(h.fl.e.x-h.sx)*u;h.by=h.sy+(h.fl.e.y-h.sy)*u-Math.sin(u*Math.PI)*60;if(u>=1&&!h.hit){h.hit=1;const e=h.fl.e;if(!e.dead){hurt(e,h.fl.dmg,o,e.x,e.y,0,h.fl.dmg>=9);SFXa('ez_stamp');shake=Math.max(shake,8);ring(e.x,e.y,6,70,'#ff7ac8',6,.35)}}if(h.hit&&q>.7)return false}
  return true};
HZP.ezsh=h=>{const o=h.o;if(o.dead)return;const D=1.2;
  if(h.t<D){const s=back(clamp(h.t/.15,0,1)),R=o.r+46;g.save();g.translate(o.x,o.y);g.globalAlpha=clamp((D-h.t)/.15,0,1);g.strokeStyle='#ff7ac8';g.lineWidth=3;g.setLineDash([10,6]);g.lineDashOffset=-clock*60;g.beginPath();g.arc(0,0,R*s,0,TAU);g.stroke();g.setLineDash([]);
    g.fillStyle='rgba(255,122,200,.10)';g.beginPath();g.arc(0,0,R*s,0,TAU);g.fill();g.restore();ezBubble(o.x,o.y-o.r-32+Math.sin(clock*8)*2,'어쩌라고',s,1,'#ff7ac8');
    h.pops.forEach(p=>{const k=h.t-p.t;if(k>.5)return;g.save();g.translate(o.x+Math.sin(p.a)*40,o.y-30-k*60);g.globalAlpha=1-k/.5;g.font='700 14px '+FB;g.fillStyle='#ffe6f4';g.textAlign='center';g.fillText('무시',0,0);g.restore()})}
  if(h.fl&&!h.hit){g.save();g.translate(h.bx,h.by);g.rotate(Math.sin(h.t*20)*.2);ezBubble(0,0,'어쩌라고',1.1,1,'#ff7ac8',0);g.restore()}};

// ---------- 2) 어·쩌·라·고 ----------
function ezLetters(o,t){const a0=ang(o,t);HZ.push({k:'ezlet',o,tg:t,t:0,L:['어','쩌','라','고'].map((ch,i)=>({ch,x:o.x,y:o.y,a:a0+(i-1.5)*.32,v:520,dl:i*.07,on:0,b:0,rot:0,cd:0,hits:0,live:1}))});SFXa('ez_letter')}
HZX.ezlet=(h,dt,EN)=>{const o=h.o;let alive=0;
  h.L.forEach(l=>{if(!l.live)return;alive++;if(h.t<l.dl)return;if(!l.on){l.on=1;l.x=o.x;l.y=o.y}l.cd-=dt;l.x+=Math.cos(l.a)*l.v*dt;l.y+=Math.sin(l.a)*l.v*dt;l.rot+=dt*8;
    let bn=0;if(l.x<14||l.x>A-14){l.a=Math.PI-l.a;l.x=clamp(l.x,14,A-14);bn=1}if(l.y<14||l.y>A-14){l.a=-l.a;l.y=clamp(l.y,14,A-14);bn=1}if(bn){l.b++;SFXa('ez_bounce');spark(l.x,l.y,'dust',4,100);if(l.b>4){l.live=0;return}}
    const e=EN.find(x=>!x.hid&&!x.jump&&Math.hypot(x.x-l.x,x.y-l.y)<x.r+14);if(e&&l.cd<=0){l.cd=.35;l.hits++;hurt(e,3.5,o,l.x,l.y,0,0);SFXa('ez_bounce');const n=Math.atan2(l.y-e.y,l.x-e.x);l.a=2*n-l.a+Math.PI;l.x=e.x+Math.cos(n)*(e.r+16);l.y=e.y+Math.sin(n)*(e.r+16);if(l.hits>=3)l.live=0}
    if(h.t>3)l.live=0});
  return alive>0};
HZP.ezlet=h=>{h.L.forEach(l=>{if(!l.live||!l.on)return;g.save();g.translate(l.x,l.y);ezGlyph(l.ch,1.15,Math.sin(l.rot)*.3,'#ff7ac8');g.restore()})};

// ---------- 3) ULT 무한 어쩌라고 ----------
const EZ_M=['아파…','그만해','진짜 아프다고','너 왜 그래','제발','엄마…','신고할거야','ㅠㅠ'];
function ezUlt(o,t){HZ.push({k:'ezult',o,tg:t,t:0,n:0,msgs:[]});SFXa('ez_ult')}
HZX.ezult=(h,dt,EN)=>{const o=h.o;let e=h.tg;if(!e||e.dead){e=tgt(o);h.tg=e}const M0=.55,MS=.3,N=8;
  if(h.n<N&&h.t>=M0+h.n*MS){const i=h.n++;h.msgs.push({who:1,txt:EZ_M[i%EZ_M.length],t:h.t});SFXa('ez_msg');h.msgs.push({who:0,txt:'어쩌라고',t:h.t+.14,hit:0})}
  h.msgs.forEach(m=>{if(m.who==0&&!m.hit&&h.t>=m.t){m.hit=1;SFXa('ez_say');if(e&&!e.dead&&!e.hid)hurt(e,2.2,o,e.x,e.y,0,0)}});
  const S0=M0+N*MS+.35;if(h.t>=S0&&!h.st){h.st=1;h.stt=h.t;SFXa('ez_stamp');shake=Math.max(shake,20);hs=.12;FX.push({k:'frost',l:.12,m:.12,c:'#ffe6f4'});if(e&&!e.dead&&!e.hid){hurt(e,11,o,e.x,e.y,0,1);e.stn=Math.max(e.stn,.5)}}
  return !h.st||h.t<h.stt+1};
HZD.ezult=h=>{const fa=Math.min(1,h.t/.35)*(h.st?clamp(1-(h.t-h.stt-.5)/.5,0,1):1);g.save();g.globalAlpha=fa*.92;g.fillStyle='#b7c9d9';g.fillRect(0,0,A,A);g.fillStyle='#a6b8c8';g.fillRect(0,0,A,46);
  g.globalAlpha=fa;g.font='700 16px '+FB;g.fillStyle='#1a2030';g.textAlign='center';g.textBaseline='middle';g.fillText('‹   상대   (1)',A/2,24);g.restore()};
HZP.ezult=h=>{const fa=Math.min(1,h.t/.35)*(h.st?clamp(1-(h.t-h.stt-.5)/.5,0,1):1);if(fa<=0)return;const shown=h.msgs.filter(m=>h.t>=m.t),base=A-70;
  g.save();g.globalAlpha=fa;shown.slice().reverse().forEach((m,k)=>{const y=base-k*48;if(y<60)return;const age=h.t-m.t,s=back(clamp(age/.18,0,1));g.font='700 17px '+FB;const w=g.measureText(m.txt).width+26;
    const x=m.who?30:A-30-w;g.save();g.translate(x+(m.who?0:w),y);g.scale(s,s);g.translate(-(m.who?0:w),0);g.fillStyle=m.who?'#ffffff':'#ffe14a';ezRR(0,-17,w,34,12);g.fill();g.fillStyle='#1a1a20';g.textAlign='left';g.textBaseline='middle';g.fillText(m.txt,13,1);
    if(!m.who){g.font='600 10px '+FB;g.fillStyle='#7a6a10';g.textAlign='right';g.fillText('1',-4,10)}g.restore()});g.restore();
  if(h.st){const q=h.t-h.stt,s=q<.12?3-2*(q/.12):1,e=h.tg,x=e&&!e.dead?e.x:A/2,y=e&&!e.dead?e.y:A/2;g.save();g.translate(x,y);g.scale(s,s);g.rotate(-.15);g.globalAlpha=clamp((1-q)/.3,0,1);
    g.strokeStyle='#e8202c';g.lineWidth=6;ezRR(-110,-38,220,76,10);g.stroke();g.lineWidth=2;ezRR(-100,-30,200,60,8);g.stroke();g.font='900 46px "Black Han Sans",'+FB;g.fillStyle='#e8202c';g.textAlign='center';g.textBaseline='middle';g.fillText('어쩌라고',0,3);g.restore()}};

// ---------- 배지/아이콘 갱신 ----------
document.querySelectorAll('#grid .tile').forEach(t=>{const i=+t.dataset.i,vc=DEF.filter(x=>x.vof===i).length;let em=t.querySelector('.vb');if(vc){if(!em){em=document.createElement('em');em.className='vb';t.appendChild(em)}em.textContent='+'+vc}});
Object.keys(ICC).forEach(k=>delete ICC[k]);mkDict();
;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ▶ 섹션 : extra13
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ===== extra13.js : 김건우 • 제트 (바람 · 칼날) =====

const NEW23=['jt_dash','jt_up','jt_smoke','jt_ult','jt_throw','jt_hit','jt_fan','jt_slash'];
NEW23.forEach(n=>{if(!SND.includes(n))SND.push(n);if(!AUD[n])AUD[n]=new SoundPool('sounds/'+n+'.mp3',n=='jt_throw'||n=='jt_hit'?6:3)});
Object.assign(SLB,{jt_dash:'제트 · 순풍 대시',jt_up:'제트 · 상승 기류',jt_smoke:'제트 · 구름 폭발',jt_ult:'제트 · 칼날 폭풍 소환',jt_throw:'제트 · 단검 투척',jt_hit:'제트 · 단검 적중',jt_fan:'제트 · 부채꼴 투척',jt_slash:'제트 · 바람 베기'});
const JTSK=[
  {n:'순풍',w:.15,cd:5,c:(o,t)=>!t.hid&&!t.jump,f:(o,t)=>jtDash(o,t)},
  {n:'상승 기류 · 구름 폭발',w:.3,cd:9,c:(o,t)=>!t.hid&&dist(o,t)<560,f:(o,t)=>jtCloud(o,t)},
  {n:'칼날 폭풍',w:.5,ult:1,c:(o,t)=>!t.hid,f:(o,t)=>jtUlt(o,t)}];
const JTI=DEF.findIndex(d=>d.name=='김건우');
DEF.push({name:'김건우 • 제트',gl:'제',k:'jett',vof:JTI,r:23,sp:255,col:'#7fe3ff',hi:'#effcff',dk:'#06303e',alt:{col:'#b8a8ff',hi:'#f0ecff',dk:'#1e1450'},alt2:{col:'#ffffff',hi:'#ffffff',dk:'#2a3440'},sk:JTSK});
INFO['김건우 • 제트']={st:[8,5,10,9,6,9],p:'표류 · 스킬을 쓰면 잠깐 바람을 타고 떠올라 0.35초 동안 맞지 않음',
  sk:[['7','바람을 타고 순식간에 상대를 꿰뚫고 지나감 · 지나가며 바람 칼로 벰'],['5 + 연막','위로 솟구친 뒤 구름 폭탄 두 개를 던짐 · 구름 안의 상대는 느려지고 스킬을 못 씀'],['7×5 + α','단검 다섯 자루를 띄워 하나씩 던짐 · 체력 35 이하면 두 배 · 남은 단검은 마지막에 부채꼴로 한꺼번에']]};

// ---------- 패시브 : 표류 ----------
function jtDrift(o){o.jtInv=.35;for(let i=0;i<10;i++){const a=rnd(0,TAU);Pt.push({x:o.x+Math.cos(a)*o.r,y:o.y+Math.sin(a)*o.r,vx:Math.cos(a)*60,vy:Math.sin(a)*60-40,l:.45,m:.45,sh:3,col:'#e8fbff',r:rnd(5,9),gr:14,a0:.5,fr:.3})}}
const _hurtJT=hurt;hurt=function(t){if(t&&t.jtInv>0)return;return _hurtJT.apply(this,arguments)};
const _updJT=update;update=function(dt){_updJT(dt);if(F)F.forEach(f=>{if(f.jtInv>0)f.jtInv-=dt})};
const _lowJT=lowHP;lowHP=function(f){_lowJT(f);if(f.d.k=='jett'&&!f.dead&&!f.hid&&phase!='menu'){g.save();g.translate(f.x,f.y);g.globalCompositeOperation='lighter';g.strokeStyle='rgba(200,245,255,'+(f.jtInv>0?.8:.25)+')';g.lineWidth=1.6;g.lineCap='round';
  for(let k=0;k<3;k++){const a=clock*(4+k)+k*2.1,r=f.r+4+k*3;g.beginPath();g.arc(0,0,r,a,a+1.1);g.stroke()}g.restore()}};

// ---------- 그림 : 쿠나이 ----------
function jtKunai(s,glw){g.save();g.scale(s,s);if(glw){g.save();g.globalCompositeOperation='lighter';g.save();g.scale(2.6,.6);glow('#7fe3ff',-4,0,14,.8*glw);g.restore();g.restore()}
  const bg=g.createLinearGradient(0,-4,0,4);bg.addColorStop(0,'#ffffff');bg.addColorStop(.5,'#b8d8e8');bg.addColorStop(1,'#5a7a8a');g.fillStyle=bg;g.strokeStyle='#0e2a36';g.lineWidth=1;
  g.beginPath();g.moveTo(16,0);g.lineTo(2,-4.5);g.lineTo(-1,0);g.lineTo(2,4.5);g.closePath();g.fill();g.stroke();
  g.fillStyle='#14222a';g.fillRect(-12,-1.6,12,3.2);g.strokeStyle='#7fe3ff';g.lineWidth=.8;for(let x=-11;x<0;x+=3){g.beginPath();g.moveTo(x,-1.6);g.lineTo(x+1.5,1.6);g.stroke()}
  g.strokeStyle='#cfefff';g.lineWidth=1.4;g.beginPath();g.arc(-14.5,0,2.6,0,TAU);g.stroke();g.restore()}
function jtWind(x1,y1,x2,y2,a){g.save();g.globalCompositeOperation='lighter';g.lineCap='round';const n=Math.hypot(x2-x1,y2-y1)||1,nx=-(y2-y1)/n,ny=(x2-x1)/n;
  for(let k=-2;k<=2;k++){g.strokeStyle='rgba(200,245,255,'+(a*(.5-Math.abs(k)*.1))+')';g.lineWidth=k?1.5:3;g.beginPath();g.moveTo(x1+nx*k*7,y1+ny*k*7);g.quadraticCurveTo((x1+x2)/2+nx*k*12,(y1+y2)/2+ny*k*12,x2+nx*k*4,y2+ny*k*4);g.stroke()}g.restore()}

// ---------- 아이콘 (네온 쿠나이 셋 + 바람) ----------
EMB.jett=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*3)*.05);
  [-.5,0,.5].forEach(r=>{g.save();g.rotate(-Math.PI/2+r);neon(D,1.5,()=>{g.beginPath();g.moveTo(20,0);g.lineTo(9,-3.5);g.lineTo(7,0);g.lineTo(9,3.5);g.closePath();g.moveTo(7,0);g.lineTo(-4,0);g.moveTo(-6.5,0);g.arc(-6.5,0,2,0,TAU)});g.restore()});
  neon({col:'#ffffff',hi:'#e8fbff'},1.2,()=>{g.beginPath();g.moveTo(-14,12);g.quadraticCurveTo(0,6,14,12);g.moveTo(-10,17);g.quadraticCurveTo(2,12,12,17)})};

// ---------- 1) 순풍 ----------
function jtDash(o,t){const a=ang(o,t),d=dist(o,t)+o.r+t.r+50;HZ.push({k:'jtdash',o,tg:t,t:0,sx:o.x,sy:o.y,ex:clamp(o.x+Math.cos(a)*d,o.r,A-o.r),ey:clamp(o.y+Math.sin(a)*d,o.r,A-o.r),a,hit:0});SFXa('jt_dash');jtDrift(o)}
HZX.jtdash=(h,dt,EN)=>{const o=h.o;if(o.dead)return false;const D=.16,u=Math.min(1,h.t/D),ue=1-Math.pow(1-u,3);
  if(u<1){o.x=h.sx+(h.ex-h.sx)*ue;o.y=h.sy+(h.ey-h.sy)*ue;o.gcd=Math.max(o.gcd,.3);EN.forEach(e=>{if(h.hit||e.hid||e.jump)return;if(segD(e.x,e.y,h.sx,h.sy,o.x,o.y)<e.r+o.r){h.hit=1;h.hx=e.x;h.hy=e.y;hurt(e,7,o,e.x,e.y,0,0);SFXa('jt_slash');e.slow=Math.max(e.slow,.6);FX.push({k:'burst',x:e.x,y:e.y,c:'#effcff',a:rnd(0,1),l:.25,m:.25})}})}
  else if(!h.end){h.end=1;h.et=h.t;o.dx=Math.cos(h.a+Math.PI*.8);o.dy=Math.sin(h.a+Math.PI*.8);for(let i=0;i<12;i++){const a=h.a+Math.PI+rnd(-.6,.6);Pt.push({x:o.x,y:o.y,vx:Math.cos(a)*rnd(80,200),vy:Math.sin(a)*rnd(80,200),l:.4,m:.4,sh:3,col:'#e8fbff',r:rnd(5,9),gr:14,a0:.5,fr:.3})}}
  return !h.end||h.t<h.et+.45};
HZP.jtdash=h=>{const o=h.o,fa=h.end?clamp(1-(h.t-h.et)/.45,0,1):1;jtWind(h.sx,h.sy,h.end?h.ex:o.x,h.end?h.ey:o.y,fa);
  for(let k=1;k<5;k++){const u=Math.max(0,Math.min(1,h.t/.16)-k*.18),x=h.sx+(h.ex-h.sx)*u,y=h.sy+(h.ey-h.sy)*u;g.save();g.globalAlpha=fa*(.35-k*.06);g.drawImage(ICON(o.d,52),x-o.r,y-o.r,o.r*2,o.r*2);g.restore()}
  if(h.hit&&h.hx!=null){const q=h.t;g.save();g.translate(h.hx,h.hy);g.rotate(h.a+.9);g.globalCompositeOperation='lighter';g.globalAlpha=clamp(1-(q-.1)/.3,0,1);g.strokeStyle='#ffffff';g.lineWidth=3;g.lineCap='round';g.beginPath();g.moveTo(-34,0);g.lineTo(34,0);g.stroke();g.strokeStyle='#7fe3ff';g.lineWidth=7;g.globalAlpha*=.5;g.stroke();g.restore()}};

// ---------- 2) 상승 기류 · 구름 폭발 ----------
function jtCloud(o,t){HZ.push({k:'jtcl',o,tg:t,t:0,cl:[],bm:[],x:o.x,y:o.y});SFXa('jt_up');jtDrift(o);o.onc=1;o.hid=1}
HZX.jtcl=(h,dt,EN)=>{const o=h.o;if(o.dead){o.onc=0;o.hid=0;return false}const UP=.55;
  if(h.t<UP){o.x=h.x;o.y=h.y;o.gcd=Math.max(o.gcd,.3);if(h.t>.15&&h.bm.length<2&&h.t>=.15+h.bm.length*.15){const e=h.tg&&!h.tg.dead?h.tg:tgt(o);if(e){const tx=clamp(e.x+e.dx*e.sp*.35+rnd(-20,20)*h.bm.length,40,A-40),ty=clamp(e.y+e.dy*e.sp*.35+(h.bm.length?40:-10),40,A-40);h.bm.push({sx:o.x,sy:o.y-70,tx,ty,t0:h.t,done:0});SFXa('jt_throw')}}}
  else if(!h.land){h.land=1;o.onc=0;o.hid=0}
  h.bm.forEach(b=>{if(!b.done&&h.t-b.t0>=.35){b.done=1;SFXa('jt_smoke');h.cl.push({x:b.tx,y:b.ty,t0:h.t,hit:0});EN.forEach(e=>{if(!e.hid&&Math.hypot(e.x-b.tx,e.y-b.ty)<90+e.r&&!e.jtc){e.jtc=1;hurt(e,5,o,e.x,e.y,0,0);setTimeout(()=>{e.jtc=0},300)}})}});
  h.cl.forEach(c=>{const k=h.t-c.t0;if(k<2.6)EN.forEach(e=>{if(e.hid)return;if(Math.hypot(e.x-c.x,e.y-c.y)<78){e.slow=Math.max(e.slow,.4);e.gcd=Math.max(e.gcd,.3);if(e.cast&&!e.cast.s.ult)e.cast=null}})});
  return h.t<UP+.1||h.cl.some(c=>h.t-c.t0<2.9)||h.bm.some(b=>!b.done)};
HZD.jtcl=h=>{h.cl.forEach(c=>{const k=h.t-c.t0,a=clamp(k/.2,0,1)*clamp((2.9-k)/.5,0,1);if(a<=0)return;g.save();g.translate(c.x,c.y);g.globalAlpha=a;for(let i=0;i<9;i++){const an=i*TAU/9+k*.3,r=40+Math.sin(k*2+i)*6;const gr=g.createRadialGradient(Math.cos(an)*r*.6,Math.sin(an)*r*.6,4,Math.cos(an)*r*.6,Math.sin(an)*r*.6,46);gr.addColorStop(0,'rgba(235,250,255,.85)');gr.addColorStop(1,'rgba(160,220,240,0)');g.fillStyle=gr;g.beginPath();g.arc(Math.cos(an)*r*.6,Math.sin(an)*r*.6,46,0,TAU);g.fill()}
  g.fillStyle='rgba(210,240,250,.55)';g.beginPath();g.arc(0,0,58,0,TAU);g.fill();g.restore()})};
HZP.jtcl=h=>{const o=h.o,UP=.55;
  if(h.t<UP&&!o.dead){const u=h.t/UP,z=Math.sin(Math.PI*u)*90;g.save();g.globalAlpha=.4;g.fillStyle='#000';g.beginPath();g.ellipse(h.x,h.y+o.r*.8,o.r*(1-z/200),o.r*.35*(1-z/200),0,0,TAU);g.fill();g.restore();
    g.save();g.globalCompositeOperation='lighter';for(let k=0;k<3;k++){g.strokeStyle='rgba(200,245,255,.6)';g.lineWidth=2;g.beginPath();g.ellipse(h.x,h.y+o.r*.6-k*14*u,o.r+10+k*6,(o.r+10+k*6)*.3,0,0,TAU);g.stroke()}g.restore();
    g.save();g.translate(h.x,h.y-z);g.scale(1+z/300,1+z/300);g.drawImage(ICON(o.d,52),-o.r*1.1,-o.r*1.1,o.r*2.2,o.r*2.2);g.restore()}
  h.bm.forEach(b=>{if(b.done)return;const u=clamp((h.t-b.t0)/.35,0,1),x=b.sx+(b.tx-b.sx)*u,y=b.sy+(b.ty-b.sy)*u-Math.sin(u*Math.PI)*60;g.save();g.translate(x,y);g.globalCompositeOperation='lighter';glow('#e8fbff',0,0,16,.9);g.fillStyle='#ffffff';g.beginPath();g.arc(0,0,6,0,TAU);g.fill();g.restore()})};

// ---------- 3) ULT 칼날 폭풍 ----------
function jtUlt(o,t){HZ.push({k:'jtult',o,t:0,kn:[0,1,2,3,4].map(i=>({i,st:0,gust:Array.from({length:6},()=>({a:rnd(0,TAU),r:rnd(70,120),w:rnd(.6,1.2)}))})),n:0,fl:[],wv:[]});SFXa('jt_ult');jtDrift(o)}
// 주변을 둥둥 떠다니는 자리 (천천히 돌면서 위아래로 출렁)
function jtOrb(h,o,i){const a=h.t*1.6+i*TAU/5,R=o.r+44+Math.sin(h.t*3+i)*7;return[o.x+Math.cos(a)*R,o.y+Math.sin(a)*R*.85+Math.sin(h.t*4+i*1.7)*5,a]}
HZX.jtult=(h,dt,EN)=>{const o=h.o;if(o.dead)return false;const T0=.95,TS=.4,FAN=T0+4*TS+.25;
  h.kn.forEach(k=>{if(!k.formed&&h.t>=.12+k.i*.11+.35){k.formed=1;SFXa('jt_slash');const p=jtOrb(h,o,k.i);ring(p[0],p[1],4,30,'#cfefff',3,.3)}});
  const left=h.kn.filter(k=>!k.st&&k.formed);
  if(h.n<4&&h.t>=T0+h.n*TS&&left.length&&EN.length){const e=EN.filter(x=>!x.hid).sort((p,q)=>dist(o,p)-dist(o,q))[0];if(e){const k=left[0];k.st=1;h.n++;const p=jtOrb(h,o,k.i);h.fl.push({x:p[0],y:p[1],tg:e,v:420,a:p[2]+Math.PI/2,hit:0,tr:[],t:0});SFXa('jt_throw')}}
  if(h.t>=FAN&&!h.fan){h.fan=1;h.fanT=h.t;SFXa('jt_fan');const e=EN.filter(x=>!x.hid).sort((p,q)=>dist(o,p)-dist(o,q))[0];const rest=h.kn.filter(k=>!k.st);const base=e?Math.atan2(e.y-o.y,e.x-o.x):0;
    h.wv.push({x:o.x,y:o.y,a:base,t:h.t});rest.forEach((k,j)=>{k.st=1;const p=jtOrb(h,o,k.i),a=base+(j-(rest.length-1)/2)*.22;h.fl.push({x:p[0],y:p[1],tg:null,v:1300,a,hit:0,tr:[],t:.2})})}
  h.fl.forEach(f=>{if(f.hit){f.ht+=dt;return}f.t+=dt;f.v=Math.min(1500,f.v+3600*dt);if(f.tg&&!f.tg.dead){let da=Math.atan2(f.tg.y-f.y,f.tg.x-f.x)-f.a;da=Math.atan2(Math.sin(da),Math.cos(da));f.a+=clamp(da,-(f.t<.12?14:9)*dt,(f.t<.12?14:9)*dt)}
    f.x+=Math.cos(f.a)*f.v*dt;f.y+=Math.sin(f.a)*f.v*dt;f.tr.push([f.x,f.y]);if(f.tr.length>12)f.tr.shift();
    if(f.x<-30||f.x>A+30||f.y<-30||f.y>A+30){f.hit=1;f.ht=9;return}const e=EN.find(x=>!x.hid&&!x.jump&&Math.hypot(x.x-f.x,x.y-f.y)<x.r+9);
    if(e){f.hit=1;f.ht=0;f.hx=e.x;f.hy=e.y;const hd=e.hp<=35;hurt(e,hd?13:7,o,e.x,e.y,0,hd);SFXa('jt_hit');if(hd)ft(e.x,e.y-e.r-40,'치명타!','#7fe3ff',22);e.x=clamp(e.x+Math.cos(f.a)*16,e.r,A-e.r);e.y=clamp(e.y+Math.sin(f.a)*16,e.r,A-e.r);shake=Math.max(shake,hd?12:6);
      for(let i=0;i<10;i++){const a=f.a+rnd(-1.2,1.2);Pt.push({x:e.x,y:e.y,vx:Math.cos(a)*rnd(120,300),vy:Math.sin(a)*rnd(120,300),l:.35,m:.35,gl:1,sh:5,col:i%2?'#ffffff':'#7fe3ff',r:1.6,fr:.1})}}});
  return !h.fan||h.fl.some(f=>!f.hit||f.ht<.4)||h.t<FAN+.4};
HZD.jtult=h=>{const o=h.o;if(o.dead)return;const a=Math.min(1,h.t/.3)*(h.fan?clamp(1-(h.t-h.fanT)/.6,0,1):1);
  // 발밑 바람 소용돌이
  g.save();g.translate(o.x,o.y+o.r*.5);g.scale(1,.4);g.globalCompositeOperation='lighter';g.lineCap='round';for(let k=0;k<4;k++){g.strokeStyle='rgba(180,240,255,'+(.35*a)+')';g.lineWidth=2;const r=o.r+20+k*12,s=h.t*(3+k)+k;g.beginPath();g.arc(0,0,r,s,s+2.2);g.stroke()}g.restore()};
HZP.jtult=h=>{const o=h.o;if(o.dead)return;
  h.kn.forEach(k=>{if(k.st)return;const [x,y,a]=jtOrb(h,o,k.i),t0=.12+k.i*.11,fm=clamp((h.t-t0)/.35,0,1);
    // 바람이 모여서 단검이 생김
    if(fm<1){g.save();g.globalCompositeOperation='lighter';g.lineCap='round';k.gust.forEach(q=>{const r=q.r*(1-fm),aa=q.a+fm*5*q.w;const px=x+Math.cos(aa)*r,py=y+Math.sin(aa)*r;g.strokeStyle='rgba(200,245,255,'+(.8*fm)+')';g.lineWidth=2;g.beginPath();g.arc(x,y,Math.max(1,r),aa-.5,aa);g.stroke();glow('#bff4ff',px,py,6,.7*fm)});glow('#ffffff',x,y,6+fm*14,fm);g.restore()}
    if(fm>.6){const s=(fm-.6)/.4;g.save();g.translate(x,y);g.rotate(a+Math.PI/2);g.globalCompositeOperation='lighter';glow('#7fe3ff',0,0,30,.55*s);g.globalCompositeOperation='source-over';jtKunai(2.1*back(s),1);g.restore()}});
  h.wv.forEach(w=>{const q=h.t-w.t;if(q>.5)return;g.save();g.translate(w.x,w.y);g.rotate(w.a);g.globalCompositeOperation='lighter';g.globalAlpha=1-q/.5;g.strokeStyle='#dff8ff';g.lineWidth=4;g.beginPath();g.arc(0,0,30+q*300,-.6,.6);g.stroke();g.lineWidth=2;g.beginPath();g.arc(0,0,20+q*240,-.5,.5);g.stroke();g.restore()});
  h.fl.forEach(f=>{
    if(f.tr.length>1){g.save();g.globalCompositeOperation='lighter';g.lineCap='round';for(let i=1;i<f.tr.length;i++){const u=i/f.tr.length;g.strokeStyle='rgba(127,227,255,'+(u*.6)*(f.hit?Math.max(0,1-f.ht/.25):1)+')';g.lineWidth=1+u*7;g.beginPath();g.moveTo(f.tr[i-1][0],f.tr[i-1][1]);g.lineTo(f.tr[i][0],f.tr[i][1]);g.stroke();
      if(i%3==0){const [px,py]=f.tr[i],aa=f.a+Math.PI/2;g.strokeStyle='rgba(255,255,255,'+(u*.5)+')';g.lineWidth=1.2;g.beginPath();g.moveTo(px+Math.cos(aa)*6*u,py+Math.sin(aa)*6*u);g.lineTo(px-Math.cos(aa)*6*u,py-Math.sin(aa)*6*u);g.stroke()}}g.restore()}
    if(!f.hit){g.save();g.translate(f.x,f.y);g.rotate(f.a);g.globalCompositeOperation='lighter';g.save();g.scale(3,.5);glow('#7fe3ff',-6,0,14,.8);g.restore();g.globalCompositeOperation='source-over';jtKunai(2.2,1);g.restore()}
    else if(f.ht<.35&&f.hx!=null){const q=f.ht/.35;g.save();g.translate(f.hx,f.hy);g.globalCompositeOperation='lighter';g.globalAlpha=1-q;g.strokeStyle='#ffffff';g.lineWidth=3;[0,1.2,-1.2].forEach(d=>{g.save();g.rotate(f.a+d*.5+Math.PI/2);g.beginPath();g.moveTo(-26-q*20,0);g.lineTo(26+q*20,0);g.stroke();g.restore()});g.strokeStyle='#7fe3ff';g.lineWidth=2;g.beginPath();g.arc(0,0,10+q*34,0,TAU);g.stroke();g.restore()}})};

// ---------- 배지/아이콘 갱신 ----------
document.querySelectorAll('#grid .tile').forEach(t=>{const i=+t.dataset.i,vc=DEF.filter(x=>x.vof===i).length;let em=t.querySelector('.vb');if(vc){if(!em){em=document.createElement('em');em.className='vb';t.appendChild(em)}em.textContent='+'+vc}});
Object.keys(ICC).forEach(k=>delete ICC[k]);mkDict();
// ---------- 세기 보정 (어쩌라고 · 제트) ----------
const DMGK={ezr:1.22,jett:1.2,terr:1.12};const _hurtK=hurt;hurt=function(t,n,o){if(o&&o.d&&DMGK[o.d.k]&&t!=o&&n>0){const a=[...arguments];a[1]=Math.round(n*DMGK[o.d.k]*10)/10;return _hurtK.apply(this,a)}return _hurtK.apply(this,arguments)};
;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ▶ 섹션 : extra14
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ===== extra14.js : 흉악범 • 테러리스트 (밀리터리) =====

const NEW24=['tr_burst','tr_sand','tr_c4','tr_beep','tr_boom','tr_heli','tr_strafe','tr_rope','tr_radio','tr_land'];
NEW24.forEach(n=>{if(!SND.includes(n))SND.push(n);if(!AUD[n])AUD[n]=new SoundPool('sounds/'+n+'.mp3',n=='tr_burst'||n=='tr_beep'||n=='tr_boom'?6:3)});
Object.assign(SLB,{tr_burst:'테러리스트 · 소총 점사',tr_sand:'테러리스트 · 모래주머니',tr_c4:'테러리스트 · C4 부착',tr_beep:'테러리스트 · C4 삑삑',tr_boom:'테러리스트 · 폭발',tr_heli:'테러리스트 · 헬기 접근',tr_strafe:'테러리스트 · 기총 소사',tr_rope:'테러리스트 · 레펠 강하',tr_radio:'테러리스트 · 무전',tr_land:'테러리스트 · 착지'});
const TRSK=[
  {n:'엄폐 사격',w:.3,cd:9,c:(o,t)=>!t.hid&&dist(o,t)<560,f:(o,t)=>trCover(o,t)},
  {n:'C4 부착',w:.3,cd:9,c:(o,t)=>!t.hid&&!t.jump&&dist(o,t)<480,f:(o,t)=>trC4(o,t)},
  {n:'헬기 강하',w:.6,ult:1,c:(o,t)=>!t.hid,f:(o,t)=>trHeli(o,t)}];
const TRI=DEF.findIndex(d=>d.name=='흉악범');
DEF.push({name:'흉악범 • 테러리스트',gl:'테',k:'terr',vof:TRI,r:26,sp:205,col:'#a8b44a',hi:'#eef2c8',dk:'#262a0a',alt:{col:'#c89a5a',hi:'#f6e6cc',dk:'#3a2410'},alt2:{col:'#7a8a9a',hi:'#e2e8ee',dk:'#141c24'},sk:TRSK});
INFO['흉악범 • 테러리스트']={st:[9,8,5,8,7,10],p:'방탄조끼 · 처음 세 번 맞는 공격은 피해 35% 감소 (조끼 판이 하나씩 깨짐)',
  sk:[['1.5×9','모래주머니 엄폐물을 쌓고 그 뒤에서 소총 3점사 · 엄폐물은 날아오는 공격을 막아줌'],['3 + 11','상대 몸에 C4를 붙임 · 삑삑 소리가 빨라지다가 2.5초 뒤 대폭발 · 근처 적도 휘말림'],['2×?+8','헬기가 날아와 붉은 선을 따라 기총 소사 두 번 · 이어서 상대 머리 위로 레펠 강하해 착지 충격']]};

// ---------- 패시브 : 방탄조끼 ----------
const _hurtTR=hurt;hurt=function(t,n,o){if(t&&t.d&&t.d.k=='terr'&&o&&o!=t&&n>0){t.vest=t.vest==null?3:t.vest;if(t.vest>0){t.vest--;const a=[...arguments];a[1]=Math.round(n*.65*10)/10;spark(t.x,t.y,'dust',6,160);ft(t.x,t.y-t.r-22,'조끼 '+t.vest,'#eef2c8',16);return _hurtTR.apply(this,a)}}return _hurtTR.apply(this,arguments)};
const _lowTR=lowHP;lowHP=function(f){_lowTR(f);if(f.d.k=='terr'&&!f.dead&&!f.hid&&phase!='menu'){const v=f.vest==null?3:f.vest;g.save();g.translate(f.x-9,f.y+f.r+6);for(let i=0;i<3;i++){g.fillStyle=i<v?'#a8b44a':'#2a2a2a';g.strokeStyle='#000';g.lineWidth=1;g.fillRect(i*7,0,5,4);g.strokeRect(i*7,0,5,4)}g.restore()}};

// ---------- 그림 ----------
function trRifle(s,fl){g.save();g.scale(s,s);g.fillStyle='rgba(0,0,0,.3)';g.fillRect(-12,3,40,3);
  g.fillStyle='#6a4a28';g.beginPath();g.moveTo(-16,-2);g.lineTo(-6,-2);g.lineTo(-6,3);g.lineTo(-15,5);g.closePath();g.fill();
  g.fillStyle='#22241e';g.fillRect(-6,-3,18,5);g.fillStyle='#3a3c34';g.fillRect(-4,-4.5,10,1.5);
  g.fillStyle='#6a4a28';g.fillRect(8,-2.5,8,4);g.fillStyle='#22241e';g.fillRect(16,-1.2,12,2.4);g.fillRect(26,-2,2,4);
  g.fillStyle='#2a2c26';g.beginPath();g.moveTo(2,2);g.lineTo(6,2);g.quadraticCurveTo(7,8,3,10);g.lineTo(1,9);g.quadraticCurveTo(3,6,2,2);g.fill();
  if(fl>0){g.save();g.globalCompositeOperation='lighter';glow('#ffcf6a',31,0,16*fl,.9);g.fillStyle='rgba(255,236,170,'+fl+')';g.beginPath();g.moveTo(29,0);g.lineTo(42*fl+29,-4);g.lineTo(36*fl+29,0);g.lineTo(42*fl+29,4);g.closePath();g.fill();g.restore()}g.restore()}
function trSandbag(x,y,a,hp){g.save();g.translate(x,y);g.rotate(a);for(let row=0;row<2;row++)for(let i=-2;i<=2;i++){if(row==1&&i==2)continue;const bx=i*15+(row?7.5:0),by=-row*7;g.fillStyle='rgba(0,0,0,.3)';g.beginPath();g.ellipse(bx+2,by+3,8.5,5.5,0,0,TAU);g.fill();
  const gr=g.createLinearGradient(0,by-5,0,by+5);gr.addColorStop(0,'#cdb88a');gr.addColorStop(1,'#8a7448');g.fillStyle=gr;g.strokeStyle='#4a3c22';g.lineWidth=1.2;g.beginPath();g.ellipse(bx,by,8.5,5.5,0,0,TAU);g.fill();g.stroke();g.strokeStyle='rgba(74,60,34,.5)';g.beginPath();g.moveTo(bx-4,by-4);g.lineTo(bx-4,by+4);g.stroke()}g.restore()}
function trC4Art(s,blink){g.save();g.scale(s,s);g.fillStyle='#d8cfb0';g.strokeStyle='#3a3424';g.lineWidth=1;g.fillRect(-9,-6,18,12);g.strokeRect(-9,-6,18,12);g.strokeStyle='#5a5038';g.beginPath();g.moveTo(-3,-6);g.lineTo(-3,6);g.moveTo(3,-6);g.lineTo(3,6);g.stroke();
  g.fillStyle='#1a1a1a';g.fillRect(-6,-3,8,5);g.fillStyle=blink?'#ff2020':'#5a0a0a';g.fillRect(-5,-2,3,3);if(blink){g.save();g.globalCompositeOperation='lighter';glow('#ff2020',-3.5,-.5,10,.9);g.restore()}
  g.strokeStyle='#e83030';g.lineWidth=1.2;g.beginPath();g.moveTo(5,-6);g.quadraticCurveTo(10,-12,7,-14);g.stroke();g.strokeStyle='#3060e8';g.beginPath();g.moveTo(6,-6);g.quadraticCurveTo(12,-10,10,-14);g.stroke();g.restore()}
function trHeliArt(s,rot,tilt){g.save();g.scale(s,s);g.rotate(tilt||0);
  g.fillStyle='#6a7840';g.strokeStyle='#0a0c06';g.lineWidth=2;g.beginPath();g.moveTo(-40,-3);g.lineTo(-78,-2);g.lineTo(-80,2);g.lineTo(-40,4);g.closePath();g.fill();g.stroke();
  g.fillRect(-84,-9,6,18);g.strokeRect(-84,-9,6,18);
  const bg=g.createLinearGradient(0,-16,0,16);bg.addColorStop(0,'#9aa860');bg.addColorStop(.5,'#6a7840');bg.addColorStop(1,'#3a4424');g.fillStyle=bg;g.beginPath();g.ellipse(0,0,42,17,0,0,TAU);g.fill();g.stroke();
  g.fillStyle='#8ab0c8';g.beginPath();g.ellipse(26,0,12,10,0,-1.2,1.2);g.fill();g.fillStyle='rgba(255,255,255,.35)';g.beginPath();g.ellipse(28,-3,5,3,0,0,TAU);g.fill();
  g.fillStyle='#1a1e12';[-1,1].forEach(sd=>{g.fillRect(-20,sd*19-2,44,3);g.fillRect(-12,sd*15,3,sd*4);g.fillRect(14,sd*15,3,sd*4)});
  g.fillStyle='#2a3018';g.fillRect(-14,-17,22,5);g.fillRect(-14,12,22,5);
  // 회전 날개
  g.save();g.rotate(rot);g.fillStyle='rgba(20,24,12,.18)';g.beginPath();g.arc(0,0,74,0,TAU);g.fill();g.fillStyle='rgba(20,24,12,.85)';for(let k=0;k<4;k++){g.rotate(TAU/4);g.fillRect(0,-3,74,6)}g.restore();
  g.fillStyle='#14180a';g.beginPath();g.arc(0,0,6,0,TAU);g.fill();g.save();g.translate(-81,0);g.rotate(rot*2);g.fillStyle='rgba(20,24,12,.7)';g.fillRect(-1,-12,2,24);g.restore();
  g.fillStyle=Math.floor(clock*4)%2?'#ff2020':'#400';g.beginPath();g.arc(-80,-9,1.8,0,TAU);g.fill();g.restore()}
function trBoom(x,y,R,o){SFXa('tr_boom');shake=Math.max(shake,R>90?20:12);FX.push({k:'burst',x,y,c:'#ffd27a',a:rnd(0,1),l:.35,m:.35});FX.push({k:'crack',x,y,r:R*.55,l:1.6,m:1.6});ring(x,y,8,R,'#ffb040',10,.4);ring(x,y,8,R*.7,'#ffffff',4,.3);
  for(let i=0;i<22;i++){const a=rnd(0,TAU),v=rnd(60,R*3);fireP(x,y,Math.cos(a)*v*.6,Math.sin(a)*v*.6,rnd(10,20),rnd(.35,.7),PAL.fire)}for(let i=0;i<10;i++)smokeP(x+rnd(-R*.4,R*.4),y+rnd(-R*.4,R*.4),rnd(14,24),rnd(.8,1.4));for(let i=0;i<10;i++)rockP(x,y,rnd(0,TAU),rnd(80,240))}

// ---------- 아이콘 (네온 방탄모 + 조준선) ----------
EMB.terr=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*2)*.04);
  neon(D,1.8,()=>{g.beginPath();g.moveTo(-17,4);g.quadraticCurveTo(-17,-16,0,-17);g.quadraticCurveTo(17,-16,17,4);g.lineTo(21,6);g.lineTo(-21,6);g.closePath();g.moveTo(-10,-4);g.lineTo(10,-4)});
  neon({col:'#ff3030',hi:'#ffd0d0'},1.3,()=>{g.beginPath();g.arc(0,13,4.5,0,TAU);g.moveTo(-8,13);g.lineTo(-5,13);g.moveTo(5,13);g.lineTo(8,13)})};

// ---------- 1) 엄폐 사격 ----------
function trCover(o,t){const a=ang(o,t);HZ.push({k:'trcov',o,tg:t,t:0,x:o.x+Math.cos(a)*(o.r+26),y:o.y+Math.sin(a)*(o.r+26),a,ox:o.x,oy:o.y,n:0,trs:[],fl:0,blk:0});SFXa('tr_sand');o.trCov=1}
HZX.trcov=(h,dt,EN)=>{const o=h.o;if(o.dead){o.trCov=0;return false}const D=3.6;h.fl=Math.max(0,h.fl-dt);h.trs.forEach(q=>q.t+=dt);h.trs=h.trs.filter(q=>q.t<.08);
  if(h.t<D){o.x+=(h.ox-o.x)*Math.min(1,dt*10);o.y+=(h.oy-o.y)*Math.min(1,dt*10);o.gcd=Math.max(o.gcd,.3);o.cast=null;
    // 날아오는 공격 막기
    B=B.filter(q=>{if(q.o==o)return true;const dx=q.x-h.x,dy=q.y-h.y,al=dx*Math.cos(h.a)+dy*Math.sin(h.a),pe=-dx*Math.sin(h.a)+dy*Math.cos(h.a);if(Math.abs(al)<12&&Math.abs(pe)<42){h.blk++;spark(q.x,q.y,'dust',8,160);SFXa('tr_sand');return false}return true});
    let e=h.tg;if(!e||e.dead){e=tgt(o);h.tg=e}if(e)h.aim=Math.atan2(e.y-o.y,e.x-o.x);
    const bi=Math.floor((h.t-.4)/.42),sh=Math.floor(((h.t-.4)%.42)/.07);if(h.t>.4&&bi<3&&sh<3&&h.n<bi*3+sh+1){h.n++;if(sh==0)SFXa('tr_burst');h.fl=.06;if(e&&!e.dead&&!e.hid){const a=h.aim+rnd(-.05,.05),mx=o.x+Math.cos(a)*(o.r+34),my=o.y+Math.sin(a)*(o.r+34);h.trs.push({x1:mx,y1:my,x2:e.x+rnd(-5,5),y2:e.y+rnd(-5,5),t:0});
      hurt(e,1.5,o,e.x,e.y,0,0);const pa=a+Math.PI/2*(Math.random()<.5?1:-1);Pt.push({x:o.x,y:o.y,vx:Math.cos(pa)*120,vy:Math.sin(pa)*120-60,l:.6,m:.6,sh:2,col:'#e2b04a',r:2.4,rot:rnd(0,TAU),vr:rnd(-20,20),gy:420,fr:.3})}}}
  else if(!h.end){h.end=1;h.et=h.t;o.trCov=0}
  return !h.end||h.t<h.et+.4};
HZD.trcov=h=>{const fa=h.end?clamp(1-(h.t-h.et)/.4,0,1):1,s=back(clamp(h.t/.25,0,1));g.save();g.globalAlpha=fa;g.translate(h.x,h.y);g.scale(s,s);trSandbag(0,0,h.a+Math.PI/2,1);g.restore()};
HZP.trcov=h=>{const o=h.o;if(o.dead||h.end)return;g.save();g.globalCompositeOperation='lighter';g.lineCap='round';h.trs.forEach(q=>{g.strokeStyle='rgba(255,230,160,'+(1-q.t/.08)+')';g.lineWidth=2;g.beginPath();g.moveTo(q.x1,q.y1);g.lineTo(q.x2,q.y2);g.stroke()});g.restore();
  if(h.aim!=null){g.save();g.translate(o.x+Math.cos(h.aim)*o.r*.5,o.y+Math.sin(h.aim)*o.r*.5);g.rotate(h.aim);if(Math.cos(h.aim)<0)g.scale(1,-1);trRifle(1.3,h.fl/.06);g.restore()}
  if(h.blk){g.save();g.font='700 13px '+FB;g.textAlign='center';g.lineJoin='round';g.lineWidth=4;g.strokeStyle='#000';g.strokeText('막음 '+h.blk,h.x,h.y-24);g.fillStyle='#eef2c8';g.fillText('막음 '+h.blk,h.x,h.y-24);g.restore()}};

// ---------- 2) C4 부착 ----------
function trC4(o,t){HZ.push({k:'trc4',o,tg:t,t:0,sx:o.x,sy:o.y,ph:0,bp:0});SFXa('tr_c4')}
HZX.trc4=(h,dt,EN)=>{const o=h.o,e=h.tg;
  if(h.ph==0){const u=Math.min(1,h.t/.32);if(!e||e.dead)return false;h.x=h.sx+(e.x-h.sx)*u;h.y=h.sy+(e.y-h.sy)*u-Math.sin(u*Math.PI)*70;if(u>=1){h.ph=1;h.st=h.t;h.ox=rnd(-.5,.5);if(!e.hid&&!e.jump){hurt(e,3,o,e.x,e.y,0,0);e.slow=Math.max(e.slow,.4);ft(e.x,e.y-e.r-40,'C4 부착!','#ff4040',22)}else return false}}
  if(h.ph==1){const q=h.t-h.st,F2=2.5;if(e&&!e.dead){h.x=e.x+Math.cos(h.ox)*e.r*.6;h.y=e.y+Math.sin(h.ox)*e.r*.6}const iv=Math.max(.08,.5-q*.17);h.bp-=dt;if(h.bp<=0){h.bp=iv;h.bl=.06;SFXa('tr_beep')}h.bl=Math.max(0,(h.bl||0)-dt);
    if(q>=F2){h.ph=2;h.et=h.t;trBoom(h.x,h.y,110,o);EN.forEach(x=>{if(x.hid||x.jump)return;const d=Math.hypot(x.x-h.x,x.y-h.y);if(d<110+x.r){hurt(x,x==e?11:6,o,x.x,x.y,0,1);const a=Math.atan2(x.y-h.y,x.x-h.x);x.flyA=a;x.flyT=.25;x.flyV=700}})}}
  return h.ph<2||h.t<h.et+.3};
HZP.trc4=h=>{if(h.ph==2)return;g.save();g.translate(h.x,h.y);if(h.ph==0)g.rotate(h.t*14);trC4Art(1.2,h.ph==1&&h.bl>0);g.restore();
  if(h.ph==1){const q=h.t-h.st,r=3-q;g.save();g.font='700 13px '+FB;g.textAlign='center';g.lineJoin='round';g.lineWidth=4;g.strokeStyle='#000';const tx=Math.max(0,2.5-q).toFixed(1);g.strokeText(tx,h.x,h.y-18);g.fillStyle='#ff4040';g.fillText(tx,h.x,h.y-18);
    g.strokeStyle='rgba(255,40,40,'+(.3+.4*Math.sin(clock*20))+')';g.lineWidth=2;g.setLineDash([5,5]);g.beginPath();g.arc(h.x,h.y,110,0,TAU);g.stroke();g.setLineDash([]);g.restore()}};

// ---------- 3) ULT 헬기 강하 ----------
function trHeli(o,t){HZ.push({k:'trheli',o,tg:t,t:0,runs:[],imp:[],ph:0,hx:-120,hy:60,rot:0});SFXa('tr_radio');SFXa('tr_heli');o.onc=1;o.hid=1;FX.push({k:'ghost',x:o.x,y:o.y,r:o.r,c:o.d.col,l:.4,m:.4})}
HZX.trheli=(h,dt,EN)=>{const o=h.o;if(o.dead){o.onc=0;o.hid=0;return false}o.gcd=Math.max(o.gcd,.4);o.cast=null;h.rot+=dt*30;
  const R0=.5,RL=1.15;
  // 기총 소사 두 번 (경고선 → 지나가며 땅에 총알이 줄지어 꽂힘)
  [0,1].forEach(k=>{const st=R0+k*(RL+.25);if(h.t>=st&&!h.runs[k]){const e=EN.filter(x=>!x.hid)[k%Math.max(1,EN.filter(x=>!x.hid).length)]||h.tg;const ty=e?e.y:A/2,tx=e?e.x:A/2,an=k?Math.PI/2+rnd(-.35,.35):rnd(-.35,.35);
      const L=A*.75;h.runs[k]={x1:tx-Math.cos(an)*L,y1:ty-Math.sin(an)*L,x2:tx+Math.cos(an)*L,y2:ty+Math.sin(an)*L,t0:h.t,n:0,hit:new Set()}}});
  h.runs.forEach(r=>{if(!r)return;const q=h.t-r.t0,W=.35;if(q<W)return;if(!r.snd){r.snd=1;SFXa('tr_strafe')}const u=clamp((q-W)/(RL-W),0,1);h.hx=r.x1+(r.x2-r.x1)*(u*1.1-.05);h.hy=r.y1+(r.y2-r.y1)*(u*1.1-.05);h.ha=Math.atan2(r.y2-r.y1,r.x2-r.x1);
    const want=Math.floor(u*26);while(r.n<want){r.n++;const v=r.n/26,ix=r.x1+(r.x2-r.x1)*v+rnd(-12,12),iy=r.y1+(r.y2-r.y1)*v+rnd(-12,12);h.imp.push({x:ix,y:iy,t:h.t});dustP(ix,iy,rnd(40,90));if(Math.random()<.5)spark(ix,iy,'dust',3,120);
      EN.forEach(e=>{if(r.hit.has(e)||e.hid||e.jump)return;if(segD(e.x,e.y,r.x1,r.y1,ix,iy)<e.r+18&&Math.hypot(e.x-ix,e.y-iy)<60){r.hit.add(e);hurt(e,2,o,e.x,e.y,0,0);e.slow=Math.max(e.slow,.5)}})}
    if(u>=.6&&r.hit.size&&!r.h2){r.h2=1;r.hit.clear()}});
  h.imp=h.imp.filter(q=>h.t-q.t<.6);
  // 레펠 강하
  const D0=R0+2*(RL+.25)+.1;if(h.t>=D0&&h.ph==0){h.ph=1;h.dt=h.t;const e=EN.filter(x=>!x.hid).sort((p,q)=>p.hp-q.hp)[0]||h.tg;h.dx=e?e.x:A/2;h.dy=e?e.y:A/2;h.de=e;SFXa('tr_rope')}
  if(h.ph==1){const q=h.t-h.dt;h.hx+=(h.dx-h.hx)*Math.min(1,dt*6);h.hy+=(h.dy-60-h.hy)*Math.min(1,dt*6);h.ha=(h.ha||0)*.9;if(h.de&&!h.de.dead&&q<.5){h.dx+=(h.de.x-h.dx)*Math.min(1,dt*4);h.dy+=(h.de.y-h.dy)*Math.min(1,dt*4)}
    if(q>=.75&&!h.landed){h.landed=1;SFXa('tr_land');o.onc=0;o.hid=0;o.x=clamp(h.dx,o.r,A-o.r);o.y=clamp(h.dy,o.r,A-o.r);trBoom(o.x,o.y,95,o);EN.forEach(e=>{if(e.hid||e.jump)return;if(Math.hypot(e.x-o.x,e.y-o.y)<95+e.r){hurt(e,8,o,e.x,e.y,0,1);const a=Math.atan2(e.y-o.y,e.x-o.x);e.flyA=a;e.flyT=.22;e.flyV=650;e.stn=Math.max(e.stn,.4)}})}
    if(q>=.75){h.hx+=(-200-h.hx)*dt*1.5;h.hy+=(-150-h.hy)*dt*1.5}if(q>1.8)return false}
  if(!h.ph&&!h.runs.some(r=>r&&h.t-r.t0>=.35)){h.hx+=((A/2)-h.hx)*dt*2;h.hy+=(90-h.hy)*dt*2}
  return true};
HZD.trheli=h=>{h.runs.forEach(r=>{if(!r)return;const q=h.t-r.t0;if(q>1.2)return;const a=q<.35?(Math.floor(q*16)%2?1:.4):clamp(1-(q-.35)/.85,0,1)*.6;g.save();g.globalAlpha=a;g.strokeStyle='#ff2020';g.lineWidth=3;g.setLineDash([14,10]);g.lineDashOffset=-clock*120;g.beginPath();g.moveTo(r.x1,r.y1);g.lineTo(r.x2,r.y2);g.stroke();g.setLineDash([]);g.restore()});
  h.imp.forEach(q=>{const k=(h.t-q.t)/.6;g.save();g.globalAlpha=1-k;g.fillStyle='rgba(20,16,10,.7)';g.beginPath();g.arc(q.x,q.y,4,0,TAU);g.fill();if(k<.25){g.globalCompositeOperation='lighter';glow('#ffcf6a',q.x,q.y,14*(1-k*4),.9)}g.restore()});
  // 헬기 그림자
  g.save();g.globalAlpha=.3;g.fillStyle='#000';g.translate(h.hx+40,h.hy+70);g.rotate(h.ha||0);g.beginPath();g.ellipse(0,0,46,18,0,0,TAU);g.fill();g.fillRect(-84,-3,44,6);g.restore()};
HZP.trheli=h=>{const o=h.o;
  // 밧줄 + 강하하는 대원
  if(h.ph==1&&!h.landed){const q=h.t-h.dt,u=clamp(q/.75,0,1);g.save();g.strokeStyle='#2a2418';g.lineWidth=3;g.beginPath();g.moveTo(h.hx,h.hy);g.lineTo(h.hx,h.hy+(h.dy-h.hy)*u);g.stroke();g.strokeStyle='#8a7448';g.lineWidth=1.2;g.stroke();g.restore();
    const y=h.hy+(h.dy-h.hy)*u*u,s=1.4-.4*u;g.save();g.translate(h.hx,y);g.scale(s,s);g.drawImage(ICON(o.d,52),-o.r,-o.r,o.r*2,o.r*2);g.restore();
    g.save();g.globalAlpha=.25+.5*u;g.strokeStyle='#ff2020';g.lineWidth=2;g.beginPath();g.arc(h.dx,h.dy,30+20*(1-u),0,TAU);g.moveTo(h.dx-44,h.dy);g.lineTo(h.dx+44,h.dy);g.moveTo(h.dx,h.dy-44);g.lineTo(h.dx,h.dy+44);g.stroke();g.restore()}
  // 기총 섬광
  const strafing=h.runs.some(r=>r&&h.t-r.t0>=.35&&h.t-r.t0<1.15);
  g.save();g.globalCompositeOperation='lighter';glow('#fff6d0',h.hx+30,h.hy+90,90,.18);g.restore();
  g.save();g.translate(h.hx,h.hy);g.rotate(h.ha||0);if(strafing&&Math.floor(clock*30)%2){g.save();g.globalCompositeOperation='lighter';glow('#ffcf6a',38,16,22,.9);g.restore()}trHeliArt(1.45,h.rot,0);g.restore();
  // 회전 바람 먼지
  if(Math.random()<.5)dustP(h.hx+40+rnd(-60,60),h.hy+70+rnd(-30,30),rnd(30,80))};

// ---------- 배지/아이콘 갱신 ----------
document.querySelectorAll('#grid .tile').forEach(t=>{const i=+t.dataset.i,vc=DEF.filter(x=>x.vof===i).length;let em=t.querySelector('.vb');if(vc){if(!em){em=document.createElement('em');em.className='vb';t.appendChild(em)}em.textContent='+'+vc}});
Object.keys(ICC).forEach(k=>delete ICC[k]);mkDict();
;
