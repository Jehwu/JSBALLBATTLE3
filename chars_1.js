// ======================================================================
// chars_1.js : 변이 1묶음 : 박르노 박바나 · 원숭이왕 · 피카소 · 기존 스킬 업그레이드 · 킬러 · 김지우 · 때리는형태
// 안에 들어있는 순서 : extra → extra2 → extra3 → extra4 → extra5 → extra6 → extra7
// (순서가 중요해서 위에서부터 차례로 실행됨 · 섹션 위치를 바꾸지 말 것)
// ======================================================================



// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ▶ 섹션 : extra
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ===== extra.js : 박지성 • 박르노 박바나 =====
// CIN : 연출 중에는 주인공 말고 전부 멈춤 (core1 step에서 처리)

// ---------- 공통 : 위치 기록 + 레퀴엠 각성 체크 + 연출 진행 ----------
const _updGE=update;update=function(dt){
  if(F&&(phase=='play'||phase=='demo'))F.forEach(f=>{if(f.dead)return;f.hist=f.hist||[];f.hist.push([f.x,f.y]);if(f.hist.length>100)f.hist.shift();
    if(f.d.k=='ge'&&!f.req&&f.hp<=40&&phase=='play'&&!CIN&&!TSTOP&&!MAD)geAwaken(f)});
  const co=CIN&&CIN.o,cs=co&&co.cds.slice(),cu=co&&co.ug;_updGE(dt);if(co&&CIN&&CIN.o==co&&co.cds.length==cs.length){co.cds=cs;co.ug=cu}
  if(CIN&&F)F.forEach(f=>{if(f!=CIN.o&&f.flash>0)f.flash-=dt});
  if(CIN){if(phase!='play'&&phase!='demo'||CIN.o.dead||!F||F.indexOf(CIN.o)<0){CIN=null}else{CIN.t+=dt;if(CIN.tick(dt)===false)CIN=null}}};
const _bannerGE=banner;banner=function(){if(CIN&&CIN.draw)CIN.draw();_bannerGE()};
const _initGE=init;init=function(){CIN=null;SLOW=0;return _initGE.apply(this,arguments)};
const _winGE=winTick;winTick=function(dt){CIN=null;_winGE(dt)};
function subtitle(txt,a){g.save();g.globalAlpha=a;g.font='700 26px '+FB;g.textAlign='center';g.textBaseline='middle';g.lineJoin='round';g.lineWidth=7;g.strokeStyle='#000';g.strokeText(txt,A/2,A-46);g.fillStyle='#ffffff';g.fillText(txt,A/2,A-46);g.restore()}

// ---------- 등록 ----------
const NEW11=['ge_life','ge_snake','ge_punch','ge_muda','ge_tree','ge_root','ge_arrow','ge_crack','ge_req','ge_rewind','ge_cosmos','ge_launch','ge_rushv','ge_reqv','ge_shell'];
NEW11.forEach(n=>{if(!SND.includes(n))SND.push(n);if(!AUD[n])AUD[n]=new SoundPool('sounds/'+n+'.mp3',n=='ge_punch'?8:3)});
Object.assign(SLB,{ge_life:'박르노 · 생명 부여',ge_snake:'박르노 · 뱀 물기',ge_punch:'박르노 · 러쉬 주먹',ge_muda:'박르노 · 무다아 (막타)',ge_tree:'박르노 · 그랜드 트리',ge_root:'박르노 · 뿌리 폭발',ge_arrow:'박르노 · 화살 꽂힘',ge_crack:'박르노 · 껍질 균열',ge_req:'박르노 · 레퀴엠 변신',ge_rewind:'박르노 · 되감기',ge_cosmos:'박르노 · "골드 E 레퀴엠"',ge_launch:'박르노 · 날려버리기',ge_rushv:'박르노 · 무다무다 (러쉬)',ge_reqv:'박르노 · "이것이 레퀴엠이다"',ge_shell:'박르노 · 껍질 깨짐'});
// 영상에서 잘라낸 소리 (gev1~3.js) : sounds 폴더에 같은 이름 mp3가 있으면 그걸 우선
function geClipUse(){if(!window.GECLIP)return;Object.keys(GECLIP).forEach(n=>{const p=AUD[n];if(p&&p.geClip)return;if(p&&p.ok&&p.pool&&p.pool[0].src.indexOf('/sounds/')>=0)return;const sp=new SoundPool(GECLIP[n],n=='ge_rushv'?3:2);sp.geClip=1;AUD[n]=sp})}
setTimeout(geClipUse,1000);setTimeout(geClipUse,3000);
function sfxStop(n){const p=AUD[n];if(p&&p.pool)p.pool.forEach(a=>{try{a.pause()}catch(e){}})}
const GESK=[
  {n:'생명 부여',w:.5,cd:7,c:(o,t)=>!t.hid,f:(o,t)=>geLife(o,t)},
  {n:'무다무다 러쉬',w:.4,cd:9,c:(o,t)=>!t.hid&&!t.jump&&dist(o,t)<340,f:(o,t)=>geRush(o,t,0)},
  {n:'그랜드 트리',w:1.8,ult:1,f:(o,t)=>geTree(o,t)}];
const GERSK=[
  {n:'레퀴엠 러쉬',w:.3,cd:9,c:(o,t)=>!t.hid&&!t.jump&&dist(o,t)<380,f:(o,t)=>geRush(o,t,1)},
  {n:'되감기',w:.35,cd:10,c:(o,t)=>!t.hid&&!t.jump&&t.hist&&t.hist.length>30,f:(o,t)=>geRewind(o,t)},
  {n:'끝나지 않는 죽음',w:1.4,ult:1,c:(o,t)=>!t.hid&&!t.jump,f:(o,t)=>geUlt(o,t)}];
DEF.push({name:'박지성 • 박르노 박바나',gl:'르',k:'ge',vof:2,r:26,sp:210,col:'#ffcc33',hi:'#fff4c2',dk:'#4a3300',alt:{col:'#5cd6ff',hi:'#ddf6ff',dk:'#063a4a'},alt2:{col:'#ff6fa8',hi:'#ffdfeb',dk:'#4a0f2a'},sk:GESK});
INFO['박지성 • 박르노 박바나']={st:[8,6,7,7,8,10],p:'체력 40 이하가 되면 스탠드의 화살이 꽂혀 레퀴엠으로 각성 (한 번) · 각성 중 무적 · 궁 게이지 30% · 스킬이 전부 레퀴엠 스킬로 바뀜',
  sk:[['4×3','돌멩이에 생명을 넣어 황금 뱀 3마리로 · 쫓아가서 물고 둔화'],['1.3×10+6','황금 주먹 연타 · 막타에 날아가며 생명 과부하로 느려짐'],['4×3+회복','거대한 생명의 나무가 자라나 뿌리가 적에게 뻗어 세 번 폭발 · 묶음 · 체력 5 회복']]};
const GERINFO=[['1×12+7','우주빛 집중선 속 레퀴엠 주먹 폭풍 · 막타에 벽까지 날려버림'],['6','상대를 지나온 길을 따라 거꾸로 되감음 · 그동안의 일이 없던 일이 되어 모든 쿨타임 +3초 · 궁 게이지 -15'],['4+0.6×16+7','시간이 멈춘 우주 속에서 상대를 되감은 뒤 무다 러쉬 · 하늘 끝까지 날려버림']];

// ---------- 아이콘 ----------
EMB.ge=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*3)*.05);
  neon(D,1.8,()=>{g.beginPath();g.moveTo(0,-4);g.bezierCurveTo(7,2,7,10,0,16);g.bezierCurveTo(-7,10,-7,2,0,-4);
    g.moveTo(-3,14);g.bezierCurveTo(-12,14,-20,6,-21,-6);g.bezierCurveTo(-14,-2,-8,4,-4,8);g.moveTo(3,14);g.bezierCurveTo(12,14,20,6,21,-6);g.bezierCurveTo(14,-2,8,4,4,8);
    [-8,0,8].forEach((x,i)=>{const y=i==1?-17:-13;g.moveTo(x+4,y);g.arc(x,y,4,0,TAU)})});
  const gg=g.createLinearGradient(0,-4,0,16);gg.addColorStop(0,'#ffffff');gg.addColorStop(1,'#3fd67e');g.fillStyle=gg;g.globalAlpha=.85;g.beginPath();g.moveTo(0,0);g.bezierCurveTo(4,4,4,9,0,13);g.bezierCurveTo(-4,9,-4,4,0,0);g.fill();g.globalAlpha=1;
  g.save();g.globalCompositeOperation='lighter';glow('#3fd67e',0,7,10,.7);glow(D.col,0,-14,12,.5);g.restore()};
EMB.ger=(f,D)=>{g.rotate(-f.rot*.2+Math.sin(clock*2)*.05);const W={col:'#cfe6ff',hi:'#ffffff'};
  g.save();g.globalCompositeOperation='lighter';glow('#ffffff',0,0,24,.45);glow('#9fd0ff',0,-8,16,.5);g.restore();
  neon(W,1.6,()=>{g.beginPath();g.ellipse(0,0,20,7,.5,0,TAU);g.moveTo(20,0);g.ellipse(0,0,20,7,-.5,0,TAU)});
  neon(D,1.9,()=>{g.beginPath();g.moveTo(-14,-6);g.lineTo(-11,-18);g.lineTo(-6,-10);g.lineTo(0,-21);g.lineTo(6,-10);g.lineTo(11,-18);g.lineTo(14,-6);
    g.moveTo(0,-8);g.lineTo(5,0);g.lineTo(2,0);g.lineTo(2,16);g.lineTo(-2,16);g.lineTo(-2,0);g.lineTo(-5,0);g.closePath()});
  g.fillStyle='#ffffff';const s=2.5+Math.sin(clock*6);g.save();g.translate(0,-21);g.beginPath();g.moveTo(0,-s*2);g.quadraticCurveTo(0,0,s*2,0);g.quadraticCurveTo(0,0,0,s*2);g.quadraticCurveTo(0,0,-s*2,0);g.quadraticCurveTo(0,0,0,-s*2);g.fill();g.restore()};

// ---------- 레퀴엠 상시 오라 (전기 + 후광) ----------
function arcLine(x1,y1,x2,y2,n,amp){g.beginPath();g.moveTo(x1,y1);for(let i=1;i<n;i++){const u=i/n,q=rnd(-amp,amp);g.lineTo(x1+(x2-x1)*u-(y2-y1)/Math.hypot(x2-x1,y2-y1||1)*q,y1+(y2-y1)*u+(x2-x1)/Math.hypot(x2-x1,y2-y1||1)*q)}g.lineTo(x2,y2);g.stroke()}
function reqAura(f,s){g.save();g.translate(f.x,f.y);g.scale(s,s);g.globalCompositeOperation='lighter';glow('#ffffff',0,0,f.r*2.2,.25+.1*Math.sin(clock*5));glow('#7fbfff',0,0,f.r*3,.15);
  g.lineCap='round';for(let k=0;k<3;k++){if(Math.random()<.45)continue;const a=rnd(0,TAU),a2=a+rnd(.6,1.4),r1=f.r+rnd(2,8),r2=f.r+rnd(10,22);g.strokeStyle=k?'#9fd0ff':'#ffffff';g.lineWidth=k?1.4:2.2;g.globalAlpha=rnd(.5,1);arcLine(Math.cos(a)*r1,Math.sin(a)*r1,Math.cos(a2)*r2,Math.sin(a2)*r2,6,5)}
  g.restore()}
const _lowGE=lowHP;lowHP=function(f){_lowGE(f);if(f.d.k=='ger'&&!f.dead&&!f.hid)reqAura(f,1)};

// ---------- 1) 생명 부여 : 황금 뱀 ----------
function geLife(o,t){const EN=F.filter(x=>x!=o&&!x.dead);HZ.push({k:'gesnake',o,t:0,sn:[0,1,2].map(i=>{const a=ang(o,t)+(i-1)*.7;return{x:o.x+Math.cos(a)*o.r,y:o.y+Math.sin(a)*o.r,a,tg:EN[i%EN.length]||t,tr:[],t0:i*.12,hit:0}})});SFXa('ge_life');
  for(let i=0;i<18;i++)sparkP(o.x,o.y,rnd(-180,180),rnd(-180,180),i%2?'#fff4c2':'#3fd67e',rnd(2,3.5));for(let i=0;i<6;i++)FX.push({k:'geflower',x:o.x+rnd(-40,40),y:o.y+rnd(-30,30),s:rnd(.6,1),l:1.4,m:1.4})}
HZX.gesnake=(h,dt)=>{let alive=0;h.sn.forEach(s=>{if(s.hit){s.ht=(s.ht||0)+dt;return}alive++;if(h.t<s.t0)return;const e=s.tg&&!s.tg.dead?s.tg:tgt(h.o);if(!e||e==h.o){s.hit=1;return}
  let da=Math.atan2(e.y-s.y,e.x-s.x)-s.a;da=Math.atan2(Math.sin(da),Math.cos(da));s.a+=clamp(da,-4*dt,4*dt);const v=330+(h.t-s.t0)*120;s.x+=Math.cos(s.a)*v*dt;s.y+=Math.sin(s.a)*v*dt;s.tr.push([s.x,s.y]);if(s.tr.length>16)s.tr.shift();
  if(!e.hid&&!e.jump&&Math.hypot(e.x-s.x,e.y-s.y)<e.r+12){s.hit=1;hurt(e,4,h.o,e.x,e.y,0,0);e.slow=Math.max(e.slow,.8);SFXa('ge_snake')}});
  return h.t<3.5&&(alive>0||h.sn.some(s=>s.ht<.3))};
HZD.gesnake=h=>{h.sn.forEach(s=>{if(s.hit||h.t<s.t0||s.tr.length<2)return;g.save();g.lineCap='round';g.lineJoin='round';const P=s.tr.map(([x,y],i)=>{const n=s.tr.length,w=Math.sin(i*1.1+h.t*20)*5*(i/n),dx=-Math.sin(s.a),dy=Math.cos(s.a);return[x+dx*w,y+dy*w]});
  [['#1a1206',10],['#e8b72e',7],['#fff4c2',2]].forEach(([c,w])=>{g.strokeStyle=c;g.lineWidth=w;g.beginPath();P.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.stroke()});
  const [hx,hy]=P[P.length-1];g.translate(hx,hy);g.rotate(s.a);g.save();g.globalCompositeOperation='lighter';glow('#ffcc33',0,0,22,.5);g.restore();g.fillStyle='#e8b72e';g.strokeStyle='#1a1206';g.lineWidth=2;g.beginPath();g.ellipse(3,0,8,6,0,0,TAU);g.fill();g.stroke();
  g.fillStyle='#3fd67e';g.beginPath();g.arc(6,-3,1.6,0,TAU);g.fill();g.beginPath();g.arc(6,3,1.6,0,TAU);g.fill();g.strokeStyle='#ff4655';g.lineWidth=1.2;g.beginPath();g.moveTo(11,0);g.lineTo(16,0);g.lineTo(18,-2);g.moveTo(16,0);g.lineTo(18,2);g.stroke();g.restore()})};
FXD.geflower=x=>{const p=1-x.l/x.m,s=back(clamp(p/.2,0,1))*x.s*(1-clamp((p-.7)/.3,0,1));g.save();g.translate(x.x,x.y);g.scale(s,s);g.rotate(p*2);for(let i=0;i<5;i++){g.rotate(TAU/5);g.fillStyle='#fff4c2';g.beginPath();g.ellipse(6,0,6,3.2,0,0,TAU);g.fill()}g.fillStyle='#ffcc33';g.beginPath();g.arc(0,0,3,0,TAU);g.fill();g.restore()};

// ---------- 주먹 그림 ----------
function geFist(x,y,a,s,req,al){g.save();g.translate(x,y);g.rotate(a);g.scale(s,s);g.globalAlpha=al;
  g.save();g.globalCompositeOperation='lighter';glow(req?'#bfe0ff':'#ffcc33',0,0,24,.55);g.restore();
  g.strokeStyle=req?'rgba(220,240,255,.8)':'rgba(255,230,160,.8)';g.lineWidth=2;g.lineCap='round';for(let i=-1;i<=1;i++){g.beginPath();g.moveTo(-14,i*5);g.lineTo(-34-Math.abs(i)*8,i*5);g.stroke()}
  const fg=g.createLinearGradient(0,-10,0,10);fg.addColorStop(0,req?'#ffffff':'#fff0b0');fg.addColorStop(1,req?'#c9d6e8':'#d49a12');g.fillStyle=fg;g.strokeStyle='#1a1206';g.lineWidth=2.2;
  g.beginPath();g.moveTo(-10,-9);g.lineTo(5,-10);g.quadraticCurveTo(11,-10,11,-5);g.lineTo(11,5);g.quadraticCurveTo(11,10,5,10);g.lineTo(-10,9);g.closePath();g.fill();g.stroke();
  g.lineWidth=1.4;for(let i=-1;i<=1;i++){g.beginPath();g.moveTo(5,i*5.5);g.lineTo(11,i*5.5);g.stroke()}g.fillStyle=req?'#9fd0ff':'#3fd67e';g.beginPath();g.arc(-4,0,2,0,TAU);g.fill();g.restore()}
function mudaText(x,y,s,rot,req,al){g.save();g.translate(x,y);g.rotate(rot);g.scale(s,s);g.globalAlpha=al;g.font='900 30px '+FB;g.textAlign='center';g.textBaseline='middle';g.lineJoin='round';g.lineWidth=9;g.strokeStyle='#1a0a04';g.strokeText('무다',0,0);
  const tg=g.createLinearGradient(0,-15,0,15);tg.addColorStop(0,req?'#ffffff':'#fff3a0');tg.addColorStop(1,req?'#9fd0ff':'#ff8a1c');g.fillStyle=tg;g.fillText('무다',0,0);g.restore()}
function speedLines(cx,cy,R,a,col){g.save();g.globalCompositeOperation='lighter';g.translate(cx,cy);for(let i=0;i<40;i++){const an=i*TAU/40+((i*37)%7)*.05+clock*.3,r0=R*(.35+((i*13)%5)*.05),w=.012+((i*7)%4)*.006;g.globalAlpha=a*(.25+.35*Math.random());g.fillStyle=i%3?col:'#ffffff';
  g.beginPath();g.moveTo(Math.cos(an)*r0,Math.sin(an)*r0);g.lineTo(Math.cos(an-w)*R*2,Math.sin(an-w)*R*2);g.lineTo(Math.cos(an+w)*R*2,Math.sin(an+w)*R*2);g.closePath();g.fill()}g.restore()}

// ---------- 2) 무다무다 러쉬 (기본 : 주먹만) / 레퀴엠 러쉬 ----------
function geRush(o,t,req){HZ.push({k:'gerush',o,tg:t,t:0,n:0,req,nt:0,N:req?12:10,fin:0,fs:[],ms:[]})}
function rushHit(h,o,e,dmg){const a=ang(o,e),d=dist(o,e);hurt(e,dmg,o,e.x-Math.cos(a)*e.r,e.y-Math.sin(a)*e.r,0,0);if(!(AUD.ge_rushv&&AUD.ge_rushv.ok)||Math.random()<.35)SFXa('ge_punch');e.x=clamp(e.x+Math.cos(a)*3,e.r,A-e.r);e.y=clamp(e.y+Math.sin(a)*3,e.r,A-e.r);
  for(let k=0;k<(h.req?4:3);k++)h.fs.push({a:a+rnd(-.45,.45),off:rnd(-22,22),d:Math.max(24,Math.min(d-4,96)),t:0,s:h.req?rnd(1.9,2.5):rnd(1.5,1.9)});
  if(Math.random()<.6)h.ms.push({x:e.x+rnd(-60,60),y:e.y-e.r-20+rnd(-30,20),t:0,r:rnd(-.35,.35),s:h.req?rnd(1.1,1.6):rnd(.8,1.1)});
  if(h.req&&Math.random()<.5)spark(e.x,e.y,'elec',3,200)}
function rushFinal(h,o,e,dmg,launch){const a=ang(o,e);hurt(e,dmg,o,e.x,e.y,0,1);sfxStop('ge_rushv');SFXa('ge_muda');shake=Math.max(shake,launch?24:14);hs=launch?.16:.08;e.slow=Math.max(e.slow,1.5);
  e.flyA=a;e.flyT=launch?.45:.25;e.flyV=launch?1400:700;FX.push({k:'burst',x:e.x,y:e.y,c:o.d.hi,a:0,l:.4,m:.4});ring(e.x,e.y,8,launch?160:90,o.d.col,launch?12:8,.45);
  if(launch){FX.push({k:'frost',l:.15,m:.15,c:'#ffffff'});SFXa('ge_launch')}ft(e.x,e.y-e.r-50,h.req?'무다아!!':'무다!!',h.req?'#ffffff':'#ffcc33',36)}
// 날아가기 (막타)
const _updFly=update;update=function(dt){_updFly(dt);if(F)F.forEach(e=>{if(e.flyT>0&&!e.dead){e.flyT-=dt;const v=e.flyV*dt;e.x=clamp(e.x+Math.cos(e.flyA)*v,e.r,A-e.r);e.y=clamp(e.y+Math.sin(e.flyA)*v,e.r,A-e.r);e.dx=Math.cos(e.flyA);e.dy=Math.sin(e.flyA);
  emit(80,dt,()=>Pt.push({x:e.x,y:e.y,vx:0,vy:0,l:.3,m:.3,sh:6,col:e.d.col,r:e.r*.7,a0:.3}));if(e.x<=e.r+1||e.x>=A-e.r-1||e.y<=e.r+1||e.y>=A-e.r-1){e.flyT=0;shake=Math.max(shake,12);spark(e.x,e.y,'dust',16,260);ring(e.x,e.y,6,70,'#ffffff',6,.4)}}})};
HZX.gerush=(h,dt)=>{
  const o=h.o,e=h.tg;if(o.dead||!e||e.dead)return false;o.gcd=Math.max(o.gcd,.3);const d=dist(o,e),a=ang(o,e);
  h.fs.forEach(q=>q.t+=dt);h.fs=h.fs.filter(q=>q.t<.14);h.ms.forEach(q=>q.t+=dt);h.ms=h.ms.filter(q=>q.t<.5);
  if(d>o.r+e.r+60&&!h.fin){o.x=clamp(o.x+Math.cos(a)*320*dt,o.r,A-o.r);o.y=clamp(o.y+Math.sin(a)*320*dt,o.r,A-o.r)}
  h.nt-=dt;if(h.n<h.N&&h.nt<=0&&d<o.r+e.r+90&&!e.hid){h.nt=h.req?.07:.085;if(!h.n){h.t0=h.t;SFXa('ge_rushv');if(h.req){SLOW=Math.max(SLOW,.15);zk=1.2;zx=e.x;zy=e.y}}h.n++;rushHit(h,o,e,h.req?1:1.3)}
  if(h.n>=h.N&&!h.fin){h.fin=1;h.ft=h.t;rushFinal(h,o,e,h.req?7:6,h.req)}
  return !h.fin?h.t<2.4:h.t<h.ft+.5};
HZD.gerush=h=>{if(!h.req||!h.n||h.fin&&h.t>h.ft+.3)return;const e=h.tg;if(!e)return;const a=h.fin?clamp(1-(h.t-h.ft)/.3,0,1):Math.min(1,(h.t-h.t0)/.1);speedLines(e.x,e.y,170,a*.9,'#9fd0ff')};
HZP.gerush=h=>{const o=h.o,e=h.tg;if(o.dead||!e)return;const a=ang(o,e);
  h.fs.forEach(q=>{const p=q.t/.14,r=Math.sin(p*Math.PI),cx=o.x+Math.cos(q.a)*(18+q.d*r)-Math.sin(q.a)*q.off,cy=o.y-6+Math.sin(q.a)*(18+q.d*r)+Math.cos(q.a)*q.off;geFist(cx,cy,q.a,q.s,h.req,1-p*.3)});
  h.ms.forEach(q=>{const p=q.t/.5;mudaText(q.x,q.y-p*20,q.s*back(clamp(p/.2,0,1)),q.r,h.req,clamp((.5-q.t)/.2,0,1))});
  if(h.req&&h.n&&!h.fin){g.save();g.globalAlpha=.85;reqAura(o,1.4);g.restore()}};

// ---------- 3) ULT 그랜드 트리 ----------
function treeBuild(seed){let s=seed;const R=()=>{s=(s*16807)%2147483647;return s/2147483647};const seg=[],lv=[];
  function br(x,y,an,len,w,dep,t0){const x2=x+Math.cos(an)*len,y2=y+Math.sin(an)*len,dur=.18+.04*dep,t1=t0+dur;seg.push({x1:x,y1:y,x2,y2,w,dep,t0,t1});
    if(dep>=6||len<10){lv.push({x:x2,y:y2,r:22+R()*16,t:t1,d:R()});return}
    const n=dep<2?3:2+(R()<.4?1:0);for(let i=0;i<n;i++){const sp=(n==3?(i-1)*.55:(i-.5)*.8)+(R()-.5)*.3;br(x2,y2,an+sp,len*(.7+R()*.12),w*.66,dep+1,t1-.03)}
    if(dep>=3&&R()<.6)lv.push({x:(x+x2)/2,y:(y+y2)/2,r:16+R()*12,t:t1,d:R()})}
  br(0,0,-Math.PI/2,92,30,0,0);return{seg,lv}}
function geTree(o,t){const EN=F.filter(x=>x!=o&&!x.dead);let x=A/2,y=A/2;if(EN.length){x=EN.reduce((s,e)=>s+e.x,0)/EN.length;y=EN.reduce((s,e)=>s+e.y,0)/EN.length}
  HZ.push({k:'getree',o,t:0,x:clamp(x,120,A-120),y:clamp(y+70,240,A-30),n:0,heal:0,T:treeBuild(Math.floor(rnd(1,99999))),roots:EN.map(e=>({e,pts:[]}))});SFXa('ge_tree');shake=Math.max(shake,8)}
HZX.getree=(h,dt,EN)=>{const o=h.o;
  if(h.t<1.2&&Math.random()<dt*20)shake=Math.max(shake,4);
  if(!h.heal&&h.t>=.6&&!o.dead){h.heal=1;SFXa('ge_life');const hv=Math.min(5,100-o.hp);if(hv>0){o.hp+=hv;ft(o.x,o.y-o.r-12,'+'+hv,'#7bff8a',24)}}
  h.roots.forEach(R=>{const e=R.e;if(e.dead)return;const L=R.pts.length;if(h.t>.3&&L<24){const u=(L+1)/24,x=h.x+(e.x-h.x)*u+Math.sin(u*9+L)*14*(1-u),y=h.y+(e.y-h.y)*u+Math.cos(u*7)*10*(1-u);R.pts.push([x,y])}else if(L>=24){R.pts[L-1]=[e.x,e.y]}});
  if(h.n<3&&h.t>=1+h.n*.45){h.n++;SFXa('ge_root');shake=Math.max(shake,10);EN.forEach(e=>{if(e.hid||e.jump)return;FX.push({k:'geroot',x:e.x,y:e.y,l:.6,m:.6});hurt(e,4,o,e.x,e.y,0,1);e.stn=Math.max(e.stn,.4);e.cast=null;for(let i=0;i<8;i++)rockP(e.x,e.y,rnd(0,TAU),rnd(60,180))})}
  if(h.t>.9)emit(16,dt,()=>{const lf=h.T.lv[Math.floor(rnd(0,h.T.lv.length))];if(!lf)return;Pt.push({x:h.x+lf.x*h.sc,y:h.y+lf.y*h.sc,vx:rnd(-30,30),vy:rnd(20,60),l:rnd(1.2,1.8),m:1.8,sh:13,col:['#ffcc33','#7dd56f','#fff4c2','#3fae4a'][Math.floor(rnd(0,4))],r:rnd(3,5),rot:rnd(0,TAU),vr:rnd(-4,4),gy:15,fr:.6})});
  if(h.t>.6&&h.t<2.6)emit(6,dt,()=>FX.push({k:'geflower',x:h.x+rnd(-110,110),y:h.y+rnd(-20,25),s:rnd(.5,.9),l:1.6,m:1.6}));
  return h.t<3.4};
HZD.getree=h=>{const gt=h.t*1.05,fa=clamp((3.4-h.t)/.5,0,1),sc=h.sc=Math.min(1.75,(A-60)/260);g.save();g.globalAlpha=fa;
  // 땅 : 빛나는 원 + 뿌리
  g.save();g.translate(h.x,h.y);g.scale(1,.42);const gr=g.createRadialGradient(0,0,0,0,0,170);gr.addColorStop(0,'rgba(255,220,120,.45)');gr.addColorStop(1,'rgba(255,200,80,0)');g.fillStyle=gr;g.beginPath();g.arc(0,0,170*Math.min(1,gt*2),0,TAU);g.fill();g.restore();
  g.lineCap='round';g.lineJoin='round';h.roots.forEach(R=>{if(R.pts.length<2)return;[['#1a0f05',10],['#7a5220',6],['rgba(255,220,120,.9)',1.6]].forEach(([c,w])=>{g.strokeStyle=c;g.lineWidth=w;g.beginPath();g.moveTo(h.x,h.y);R.pts.forEach(([x,y])=>g.lineTo(x,y));g.stroke()})});
  g.translate(h.x,h.y);g.scale(sc,sc);
  g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.ellipse(0,4,60,14,0,0,TAU);g.fill();
  // 뿌리 밑동
  [[-1,.5],[1,.45],[-1,.9],[1,.95]].forEach(([sd,k])=>{const u=clamp(gt*2,0,1);g.strokeStyle='#1a0f05';g.lineWidth=12;g.beginPath();g.moveTo(sd*6,-6);g.quadraticCurveTo(sd*22*k,-2,sd*44*k*u,8);g.stroke();g.strokeStyle='#6b4a1e';g.lineWidth=7;g.stroke()});
  // 가지
  const segs=h.T.seg;for(const s of segs){if(gt<s.t0)continue;const u=Math.min(1,(gt-s.t0)/(s.t1-s.t0)),x2=s.x1+(s.x2-s.x1)*u,y2=s.y1+(s.y2-s.y1)*u,w=s.w*(.5+.5*u);
    g.strokeStyle='#140b03';g.lineWidth=w+4;g.beginPath();g.moveTo(s.x1,s.y1);g.lineTo(x2,y2);g.stroke();g.strokeStyle='#6b4a1e';g.lineWidth=w;g.stroke();
    g.strokeStyle='#a87a34';g.lineWidth=Math.max(1,w*.3);g.beginPath();g.moveTo(s.x1-w*.18,s.y1);g.lineTo(x2-w*.18,y2);g.stroke()}
  g.save();g.globalCompositeOperation='lighter';g.lineCap='round';for(const s of segs){if(s.dep>2||gt<s.t0)continue;const u=Math.min(1,(gt-s.t0)/(s.t1-s.t0));g.strokeStyle='#ffd27a';g.globalAlpha=fa*(.35+.35*Math.sin(clock*4+s.dep*2));g.lineWidth=2;g.beginPath();g.moveTo(s.x1+2,s.y1);g.lineTo(s.x1+2+(s.x2-s.x1)*u,s.y1+(s.y2-s.y1)*u);g.stroke()}g.restore();g.globalAlpha=fa;
  // 잎 덩어리
  const lv=h.T.lv;for(let pass=0;pass<2;pass++)for(const L of lv){if(gt<L.t)continue;const u=back(clamp((gt-L.t)/.35,0,1)),r=L.r*u*(1+.04*Math.sin(clock*2+L.d*9));if(r<=1)continue;
    if(pass==0){g.fillStyle='#1d5a2c';g.beginPath();g.arc(L.x+3,L.y+4,r*1.08,0,TAU);g.fill()}else{const lg=g.createRadialGradient(L.x-r*.35,L.y-r*.4,r*.1,L.x,L.y,r);lg.addColorStop(0,L.d>.6?'#fff4c2':'#d8ff9c');lg.addColorStop(.45,L.d>.5?'#ffcc33':'#7dd56f');lg.addColorStop(1,'#2a7a3c');g.fillStyle=lg;g.beginPath();g.arc(L.x,L.y,r,0,TAU);g.fill()}}
  // 빛 : 수관 반짝이 + 갓 레이
  g.save();g.globalCompositeOperation='lighter';const cy=-190;if(gt>.9){const ra=clamp((gt-.9)/.5,0,1);for(let i=0;i<5;i++){const x=(i-2)*45+Math.sin(clock*.6+i)*10;g.globalAlpha=fa*ra*.1;g.fillStyle='#fff4c2';g.beginPath();g.moveTo(x-12,cy);g.lineTo(x+12,cy);g.lineTo(x*1.6+40,20);g.lineTo(x*1.6-40,20);g.closePath();g.fill()}
    g.globalAlpha=fa;glow('#ffcc33',0,cy,160*ra,.28);for(let i=0;i<16;i++){const L=lv[(i*7)%lv.length];if(!L)break;glow('#fff4c2',L.x+Math.sin(clock*2+i)*6,L.y+Math.cos(clock*1.7+i)*6,6+3*Math.sin(clock*5+i),.8)}}g.restore();
  g.restore();g.globalAlpha=1};
FXD.geroot=x=>{const p=1-x.l/x.m,up=back(clamp(p/.22,0,1)),dn=clamp((p-.6)/.4,0,1),hh=56*up*(1-dn);g.save();g.translate(x.x,x.y);g.lineCap='round';
  g.save();g.globalCompositeOperation='lighter';glow('#ffcc33',0,0,60*(1-p),.6*(1-p));g.restore();
  for(let i=0;i<6;i++){const a=i*TAU/6+x.x,ox=Math.cos(a)*24,oy=Math.sin(a)*13;g.strokeStyle='#140b03';g.lineWidth=11;g.beginPath();g.moveTo(ox,oy);g.quadraticCurveTo(ox*.4,oy-hh*.5,ox*.15,oy-hh);g.stroke();g.strokeStyle='#7a5220';g.lineWidth=6;g.stroke();g.strokeStyle='#ffd27a';g.lineWidth=1.5;g.stroke();
    g.fillStyle='#7dd56f';g.beginPath();g.ellipse(ox*.15+4,oy-hh+2,6,3,.6,0,TAU);g.fill()}g.restore()};

// ---------- 레퀴엠 각성 연출 ----------
function nebula(){if(nebula.c&&nebula.A==A)return nebula.c;const c=document.createElement('canvas');c.width=c.height=A;const x=c.getContext('2d');x.fillStyle='#0a0418';x.fillRect(0,0,A,A);
  const blobs=[['#6a1b9a',.55],['#c2185b',.45],['#283593',.5],['#00838f',.3],['#ad1457',.4],['#4a148c',.5]];for(let i=0;i<26;i++){const [c2,a]=blobs[i%blobs.length],px=Math.random()*A,py=Math.random()*A,r=60+Math.random()*180,gr=x.createRadialGradient(px,py,0,px,py,r);gr.addColorStop(0,c2);gr.addColorStop(1,'rgba(0,0,0,0)');x.globalAlpha=a*.6;x.fillStyle=gr;x.fillRect(px-r,py-r,r*2,r*2)}
  x.globalAlpha=1;for(let i=0;i<260;i++){x.fillStyle=Math.random()<.2?'#ffd6f0':'#ffffff';x.globalAlpha=Math.random()*.9;const r=Math.random()<.95?Math.random()*1.3:2.2;x.beginPath();x.arc(Math.random()*A,Math.random()*A,r,0,TAU);x.fill()}
  nebula.c=c;nebula.A=A;return c}
function geAwaken(f){f.req=1;f.cast=null;f.inv=1;SFXa('ge_arrow');
  CIN={o:f,t:0,sx:f.x-380,sy:f.y-560,hit:0,crack:[],done:0,px:f.x,py:f.y,
  tick(dt){const o=this.o;o.x=this.px;o.y=this.py;o.gcd=Math.max(o.gcd,.5);
    if(!this.hit&&this.t>=.6){this.hit=1;SFXa('ge_crack');shake=18;hs=.1;FX.push({k:'burst',x:o.x,y:o.y,c:'#ffcc33',a:0,l:.4,m:.4});ring(o.x,o.y,6,100,'#ffcc33',8,.4)}
    if(!this.sh&&this.t>=.65){this.sh=1;SFXa('ge_shell')}
    if(this.hit&&this.t<1.5&&Math.random()<dt*30){const a=rnd(0,TAU);this.crack.push({a,l:rnd(.4,1),t:this.t});shake=Math.max(shake,3+this.t*3)}
    if(this.t>=1.45&&!this.pil){this.pil=1}if(this.t>=1.75&&!this.rq){this.rq=1;SFXa('ge_req')}if(this.t>=2.25&&!this.rv){this.rv=1;SFXa('ge_reqv')}
    if(this.t>=2.05&&!this.done){this.done=1;shake=28;hs=.18;FX.push({k:'frost',l:.35,m:.35,c:'#ffffff'});
      o.d=Object.assign({},o.d,{name:o.d.name+' (레퀴엠)',k:'ger',sk:GERSK});o.cds=GERSK.map(()=>.6);o.ug=Math.max(o.ug||0,30);
      if(F.length<4){const i=o.i,el=$('#p'+i+' .nm b');if(el){el.textContent=o.d.name;paintIc($('#p'+i+' .ic'),o.d,34)}}
      for(let i=0;i<60;i++){const a=rnd(0,TAU),v=rnd(200,520),l=rnd(.6,1.2);Pt.push({x:o.x,y:o.y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l,m:l,gl:1,sh:5,col:i%3?'#ffffff':'#9fd0ff',r:2.6,fr:.1})}
      F.forEach(e=>{if(e!=o&&!e.dead){const a=ang(o,e);e.dx=Math.cos(a);e.dy=Math.sin(a);e.flyA=a;e.flyT=.25;e.flyV=600}})}
    if(this.t>=4.3){o.inv=0;return false}},
  draw(){const o=this.o,t=this.t,dark=t<2.05?Math.min(1,t/.4):clamp(1-(t-2.05)/.6,0,1);
    // 어두운 화면 (주인공만 스포트라이트)
    g.save();const sg=g.createRadialGradient(o.x,o.y,o.r*1.2,o.x,o.y,A*.9);sg.addColorStop(0,'rgba(0,0,0,0)');sg.addColorStop(.25,'rgba(0,0,0,'+(.75*dark)+')');sg.addColorStop(1,'rgba(0,0,0,'+(.92*dark)+')');g.fillStyle=sg;g.fillRect(-300,-300,A+600,A+600);g.restore();
    // 우주 플래시
    if(t>1.9&&t<2.6){g.save();g.globalAlpha=clamp(1-Math.abs(t-2.15)/.4,0,1)*.9;g.drawImage(nebula(),0,0,A,A);g.restore()}
    // 화살
    if(!this.hit){const u=t/.6,q=u*u,x=this.sx+(o.x-this.sx)*q,y=this.sy+(o.y-this.sy)*q,a=Math.atan2(o.y-this.sy,o.x-this.sx);geArrow(x,y,a,1.7,1)}
    else if(t<1.45){const a=Math.atan2(o.y-this.sy,o.x-this.sx),sink=clamp((t-.6)/.8,0,1);g.save();g.beginPath();g.rect(-300,-300,A+600,A+600);g.arc(o.x,o.y,o.r*.9,0,TAU,true);g.clip('evenodd');geArrow(o.x-Math.cos(a)*(10+sink*30),o.y-Math.sin(a)*(10+sink*30),a,1.7,1-sink);g.restore()}
    // 균열 (빛이 새어 나옴)
    if(this.hit&&t<2.1){g.save();g.translate(o.x,o.y);g.globalCompositeOperation='lighter';const lk=clamp((t-.6)/1.4,0,1);glow('#fff4c2',0,0,o.r*(1.5+lk*2),.3+.6*lk);g.lineCap='round';
      this.crack.forEach(c=>{const L=o.r*(c.l+.4)*Math.min(1,(t-c.t)/.15);g.strokeStyle='#ffffff';g.lineWidth=2.4;g.globalAlpha=.6+.4*lk;g.beginPath();g.moveTo(0,0);let x=0,y=0;for(let k=1;k<=4;k++){const aa=c.a+((k*31+c.l*97)%5-2)*.18;x=Math.cos(aa)*L*k/4;y=Math.sin(aa)*L*k/4;g.lineTo(x,y)}g.stroke()});g.restore()}
    // 하늘에서 내려오는 빛 기둥
    if(t>1.45&&t<2.9){const u=clamp((t-1.45)/.3,0,1),out=clamp((t-2.3)/.6,0,1),w=(30+60*u)*(1-out*.7);g.save();g.globalCompositeOperation='lighter';g.globalAlpha=(1-out)*.85;
      const pg=g.createLinearGradient(o.x-w,0,o.x+w,0);pg.addColorStop(0,'rgba(160,210,255,0)');pg.addColorStop(.35,'rgba(200,230,255,.6)');pg.addColorStop(.5,'rgba(255,255,255,1)');pg.addColorStop(.65,'rgba(200,230,255,.6)');pg.addColorStop(1,'rgba(160,210,255,0)');g.fillStyle=pg;g.fillRect(o.x-w,-300,w*2,o.y+300);
      glow('#ffffff',o.x,o.y,w*2.4,1);for(let i=0;i<14;i++){const yy=((clock*500+i*90)%(o.y+300))-300;g.fillStyle='#ffffff';g.globalAlpha=(1-out)*.8;g.beginPath();g.arc(o.x+Math.sin(i*2.1+clock*4)*w*.7,yy,2,0,TAU);g.fill()}
      for(let k=0;k<3;k++){const pk=((t-1.45)*1.6+k/3)%1;g.globalAlpha=(1-pk)*(1-out)*.8;g.strokeStyle='#cfe6ff';g.lineWidth=3;g.beginPath();g.ellipse(o.x,o.y+o.r*.6,20+pk*120,(20+pk*120)*.3,0,0,TAU);g.stroke()}g.restore()}
    // 각성 후 : 전기 + 제목
    if(t>2.05){const q=t-2.05,a=clamp(1-(q-1.7)/.5,0,1),s=back(clamp(q/.15,0,1));reqAura(o,1.6+(1-a));
      g.save();g.globalAlpha=a;g.translate(A/2,A*.28);g.scale(s,s);g.font='900 52px '+FB;g.textAlign='center';g.textBaseline='middle';g.lineJoin='round';g.lineWidth=12;g.strokeStyle='#05030c';g.strokeText('레퀴엠',0,0);
      const tg=g.createLinearGradient(0,-26,0,26);tg.addColorStop(0,'#ffffff');tg.addColorStop(.6,'#cfe6ff');tg.addColorStop(1,'#ffcc33');g.fillStyle=tg;g.fillText('레퀴엠',0,0);g.font='700 16px '+FB;g.lineWidth=5;g.strokeText('GOLD · EXPERIENCE · REQUIEM',0,40);g.fillStyle='#ffe9a8';g.fillText('GOLD · EXPERIENCE · REQUIEM',0,40);g.restore();
      subtitle('이것이 「레퀴엠」이다',a)}
    else if(t>.6)subtitle(t<1.45?'화살이…!':'',clamp((t-.7)/.3,0,1))}};
  ft(f.x,f.y-f.r-40,'스탠드의 화살','#ffcc33',22)}
function geArrow(x,y,a,s,al){g.save();g.translate(x,y);g.rotate(a);g.scale(s,s);g.globalAlpha=al;g.save();g.globalCompositeOperation='lighter';glow('#ffcc33',0,0,34,.8);g.strokeStyle='#fff4c2';g.globalAlpha=al*.6;g.lineWidth=5;g.lineCap='round';g.beginPath();g.moveTo(-150,0);g.lineTo(-10,0);g.stroke();g.restore();
  g.strokeStyle='#3a2408';g.lineWidth=3.5;g.beginPath();g.moveTo(-64,0);g.lineTo(-6,0);g.stroke();g.strokeStyle='#c9962e';g.lineWidth=1.5;g.stroke();
  const ag=g.createLinearGradient(0,-10,0,10);ag.addColorStop(0,'#fff4c2');ag.addColorStop(.5,'#ffcc33');ag.addColorStop(1,'#8a5a0c');g.fillStyle=ag;g.strokeStyle='#1a1206';g.lineWidth=1.4;
  g.beginPath();g.moveTo(18,0);g.lineTo(2,-6);g.lineTo(-2,-11);g.lineTo(-4,-5);g.lineTo(-10,-8);g.lineTo(-7,0);g.lineTo(-10,8);g.lineTo(-4,5);g.lineTo(-2,11);g.lineTo(2,6);g.closePath();g.fill();g.stroke();
  g.strokeStyle='#8a5a0c';g.lineWidth=1;g.beginPath();g.moveTo(16,0);g.lineTo(-6,0);g.stroke();g.fillStyle='#3fd67e';g.beginPath();g.arc(-3,0,2.2,0,TAU);g.fill();
  g.fillStyle='#c9962e';g.beginPath();g.moveTo(-60,0);g.lineTo(-70,-6);g.lineTo(-66,0);g.lineTo(-70,6);g.closePath();g.fill();g.restore()}

// ---------- 레퀴엠 2) 되감기 ----------
function ghostAt(e,x,y,a,s){g.save();g.globalAlpha=a;const sz=e.r*2.2*s;g.drawImage(ICON(e.d,52),x-sz/2,y-sz/2-2,sz,sz);g.restore()}
function geRewind(o,t){const hs=(t.hist||[]).slice();HZ.push({k:'gerew',o,e:t,t:0,path:hs.reverse(),done:0});SFXa('ge_rewind');ft(t.x,t.y-t.r-40,'되감기',o.d.hi,24)}
HZX.gerew=(h,dt)=>{const e=h.e;if(!e||e.dead)return false;const D=.75,u=clamp(h.t/D,0,1),P=h.path,n=P.length;
  if(!h.done){const i=Math.min(n-1,Math.floor(u*(n-1)));if(n){e.x=P[i][0];e.y=P[i][1]}e.stn=Math.max(e.stn,.12);e.cast=null;e.rush=0;e.auto=0;e.br=0;
    if(u>=1){h.done=1;h.dt=h.t;e.cds=e.cds.map((c,j)=>e.d.sk[j].ult?c:Math.max(c,0)+3);e.ug=Math.max(0,(e.ug||0)-15);hurt(e,6,h.o,e.x,e.y,0,1);e.hist=[[e.x,e.y]];shake=Math.max(shake,10);ft(e.x,e.y-e.r-44,'없던 일로','#ffffff',26);ring(e.x,e.y,6,90,'#cfe6ff',6,.4)}}
  return !h.done||h.t<h.dt+.6};
HZP.gerew=h=>{const e=h.e;if(!e||e.dead)return;const P=h.path,n=P.length,D=.75,u=clamp(h.t/D,0,1),fa=h.done?clamp(1-(h.t-h.dt)/.6,0,1):1;if(!n)return;
  g.save();g.globalAlpha=fa*.25;g.globalCompositeOperation='saturation';g.fillStyle='#888';g.beginPath();g.arc(e.x,e.y,160,0,TAU);g.fill();g.restore();
  const cur=Math.floor(u*(n-1));for(let k=0;k<12;k++){const i=Math.min(n-1,cur+k*Math.max(2,Math.floor(n/14)));if(i>=n)break;ghostAt(e,P[i][0],P[i][1],fa*(.5-k*.035),1-k*.03)}
  g.save();g.globalAlpha=fa;g.strokeStyle='rgba(220,240,255,.8)';g.lineWidth=2;g.setLineDash([6,8]);g.lineDashOffset=clock*90;g.beginPath();for(let i=cur;i<n;i+=3)i==cur?g.moveTo(P[i][0],P[i][1]):g.lineTo(P[i][0],P[i][1]);g.stroke();g.setLineDash([]);
  g.translate(e.x,e.y-e.r-62);g.strokeStyle='#ffffff';g.lineWidth=2.5;g.beginPath();g.arc(0,0,15,0,TAU);g.stroke();g.lineCap='round';g.beginPath();g.moveTo(0,0);g.lineTo(Math.cos(-clock*14)*11,Math.sin(-clock*14)*11);g.moveTo(0,0);g.lineTo(Math.cos(-clock*3)*7,Math.sin(-clock*3)*7);g.stroke();g.restore()};

// ---------- 레퀴엠 3) ULT 끝나지 않는 죽음 ----------
function geUlt(o,t){SFXa('ge_cosmos');const path=(t.hist||[]).slice().reverse(),dir=o.x>A/2?-1:1;
  CIN={o,e:t,t:0,R0:.9,R1:3,P1:3.2,px:o.x,py:o.y,x0:o.x,y0:o.y,tx:A/2-dir*A*.2,ty:A*.62,la:dir>0?-.3:Math.PI+.3,path,ph:0,n:0,nt:0,fs:[],ms:[],
  tick(dt){const o=this.o,e=this.e,k=clamp(this.t/.55,0,1),ek=k*k*(3-2*k);this.px=this.x0+(this.tx-this.x0)*ek;this.py=this.y0+(this.ty-this.y0)*ek;o.x=this.px;o.y=this.py;o.gcd=Math.max(o.gcd,.5);if(e.dead)return this.t<this.endT||(this.endT=this.t+.6,true);
    this.fs.forEach(q=>q.t+=dt);this.fs=this.fs.filter(q=>q.t<.14);this.ms.forEach(q=>q.t+=dt);this.ms=this.ms.filter(q=>q.t<.5);
    const t=this.t,P=this.path,n=P.length;
    if(t>=this.R0&&t<this.R1+.05&&n){const u=clamp((t-this.R0)/(this.R1-this.R0),0,1),i=Math.min(n-1,Math.floor(u*(n-1)));e.x=P[i][0];e.y=P[i][1];if(u>=1&&!this.rw){this.rw=1;hurt(e,4,o,e.x,e.y,0,1);shake=12;SFXa('ge_rewind')}}
    if(t>=this.P1&&this.ph==0){this.ph=1;SFXa('ge_rushv');const d=o.r+e.r+34;e.x=clamp(o.x+Math.cos(this.la)*d,e.r,A-e.r);e.y=clamp(o.y+Math.sin(this.la)*d,e.r,A-e.r);ring(e.x,e.y,6,90,'#cfe6ff',6,.35);SLOW=Math.max(SLOW,.2);zk=1.4;zx=e.x;zy=e.y}
    if(this.ph==1){if(!this.fin){const d=o.r+e.r+34;e.x=clamp(o.x+Math.cos(this.la)*d,e.r,A-e.r);e.y=clamp(o.y+Math.sin(this.la)*d,e.r,A-e.r)}this.nt-=dt;if(this.n<16&&this.nt<=0){this.nt=.1;this.n++;const fake={req:1,fs:this.fs,ms:this.ms};rushHit(fake,o,e,.6)}
      if(this.n>=16&&!this.fin){this.fin=1;this.ft=t;rushFinal({req:1},o,e,7,1);e.flyT=.7;e.flyV=1600}}
    if(this.fin&&t>this.ft+1.1)return false;return t<6},
  draw(){const o=this.o,e=this.e,t=this.t,inA=Math.min(1,t/.5),outA=this.fin?clamp(1-(t-this.ft-.5)/.6,0,1):1,a=inA*outA;
    g.save();g.globalAlpha=a*.92;g.drawImage(nebula(),0,0,A,A);g.globalAlpha=a*.5;g.globalCompositeOperation='lighter';for(let i=0;i<30;i++){const x=(i*173+clock*20*(1+i%3))%A,y=(i*97)%A;g.fillStyle='#ffffff';g.fillRect(x,y,1.5,1.5)}g.restore();
    // 레퀴엠 스탠드 (뒤에 크게)
    // 주인공 + 상대 다시 그리기 (우주 위에)
    if(!o.dead)ball(o,e);if(!e.dead)ball(e,o);reqAura(o,1.5);
    // 되감기 잔상
    const P=this.path,n=P.length;if(t>this.R0&&t<this.R1+.2&&n){const u=clamp((t-this.R0)/(this.R1-this.R0),0,1),cur=Math.floor(u*(n-1)),fa=t<this.R1?1:clamp(1-(t-this.R1)/.2,0,1);for(let k=1;k<14;k++){const i=Math.min(n-1,cur+k*Math.max(2,Math.floor(n/16)));ghostAt(e,P[i][0],P[i][1],fa*a*(.6-k*.04),1-k*.025)}}
    // 러쉬
    if(this.ph==1){const sa=this.fin?clamp(1-(t-this.ft)/.4,0,1):1;if(this.n&&(!this.fin||t<this.ft+.4))speedLines(e.x,e.y,220,a*sa,'#9fd0ff');
      this.fs.forEach(q=>{const p=q.t/.14,r=Math.sin(p*Math.PI),cx=o.x+Math.cos(q.a)*(18+q.d*r)-Math.sin(q.a)*q.off,cy=o.y-6+Math.sin(q.a)*(18+q.d*r)+Math.cos(q.a)*q.off;geFist(cx,cy,q.a,q.s,1,1-p*.3)});
      if(!e.dead&&!this.fin){g.save();g.translate(rnd(-3,3),rnd(-3,3));ball(e,o);g.restore()}this.ms.forEach(q=>{const p=q.t/.5;mudaText(q.x,q.y-p*20,q.s*1.2*back(clamp(p/.2,0,1)),q.r,1,clamp((.5-q.t)/.2,0,1))})}
    const sub=t<.2?'':t<this.P1?'이게 「골드 · E · 레퀴엠」':this.fin?(t<this.ft+1.1?'끝나지 않는 죽음':''):'무다무다무다무다무다';if(sub)subtitle(sub,a)}}}

const _hurtInv=hurt;hurt=function(t){if(t&&t.inv)return;return _hurtInv.apply(this,arguments)};
// ---------- 사전 : 레퀴엠 기술도 보기 ----------
const _openInfoGE=openInfo;openInfo=function(i){_openInfoGE(i);const d=DEF[i];if(d.k!='ge')return;const box=$('#dsk');
  box.insertAdjacentHTML('beforeend',`<div class="dsk np" style="border-color:#cfe6ff55"><i style="color:#cfe6ff">R</i><div><b>레퀴엠 각성</b><small>체력 40 이하 · 스탠드의 화살이 꽂혀 각성 (미리보기)</small></div><em></em></div>`+
    GERSK.map((s,j)=>`<button class="dsk${s.ult?' u':''}" data-rj="${j}" style="border-color:#cfe6ff55"><i style="color:#cfe6ff">${s.ult?'R·ULT':'R'+(j+1)}</i><div><b>${s.n}</b><small>${GERINFO[j][1]}</small></div><em>${GERINFO[j][0]} DMG<br>${s.ult?'게이지':s.cd+'s'}</em></button>`).join(''));
  const aw=box.querySelector('.np[style]');aw.style.cursor='pointer';aw.addEventListener('click',()=>{audioOn();SFX('click');startDemo(DI,0);DEMO.next=99;$('#demon').textContent='레퀴엠 각성';$('#demod').textContent='스탠드의 화살이 꽂혀 레퀴엠으로 각성';setTimeout(()=>{if(DEMO&&F[0])geAwaken(F[0])},500)});
  box.querySelectorAll('[data-rj]').forEach(b=>b.addEventListener('click',()=>{audioOn();SFX('click');const j=+b.dataset.rj;startDemo(DI,0);const f=F[0];f.req=1;f.d=Object.assign({},f.d,{name:f.d.name+' (레퀴엠)',k:'ger',sk:GERSK});f.cds=GERSK.map(()=>0);DEMO.j=j;DEMO.next=1.2;
    $('#demot').textContent=f.d.name+(GERSK[j].ult?' · R·ULT':' · R'+(j+1));$('#demon').textContent=GERSK[j].n;$('#demod').textContent=GERINFO[j][1]}))};

// ---------- 배지/아이콘 갱신 ----------
document.querySelectorAll('#grid .tile').forEach(t=>{const i=+t.dataset.i,vc=DEF.filter(x=>x.vof===i).length;let em=t.querySelector('.vb');if(vc){if(!em){em=document.createElement('em');em.className='vb';t.appendChild(em)}em.textContent='+'+vc}});
Object.keys(ICC).forEach(k=>delete ICC[k]);mkDict();
;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ▶ 섹션 : extra2
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ===== extra2.js : 김건우 • 원숭이왕 (제천대성) =====

// ---------- 등록 ----------
const NEW12=['wk_cloud','wk_swoop','wk_hit','wk_hair','wk_clone','wk_strike','wk_ult','wk_grow','wk_spin','wk_gold'];
NEW12.forEach(n=>{if(!SND.includes(n))SND.push(n);if(!AUD[n])AUD[n]=new SoundPool('sounds/'+n+'.mp3',n=='wk_strike'||n=='wk_hit'?5:3)});
Object.assign(SLB,{wk_cloud:'원숭이왕 · 근두운 소환',wk_swoop:'원숭이왕 · 구름 돌진',wk_hit:'원숭이왕 · 여의봉 타격',wk_hair:'원숭이왕 · 털 불기',wk_clone:'원숭이왕 · 분신 등장',wk_strike:'원숭이왕 · 분신 공격',wk_ult:'원숭이왕 · 궁 (징)',wk_grow:'원숭이왕 · 여의봉 거대화',wk_spin:'원숭이왕 · 여의봉 회전',wk_gold:'원숭이왕 · 금강불괴'});
const WKSK=[
  {n:'근두운',w:.35,cd:7,c:(o,t)=>!t.hid&&!t.jump,f:(o,t)=>wkCloud(o,t)},
  {n:'분신술',w:.45,cd:10,c:(o,t)=>!t.hid&&dist(o,t)<560,f:(o,t)=>wkClone(o,t)},
  {n:'여의봉 · 천지개벽',w:.6,ult:1,f:(o,t)=>wkUlt(o,t)}];
DEF.push({name:'김건우 • 원숭이왕',gl:'왕',k:'wk',vof:6,r:23,sp:245,col:'#ffb02e',hi:'#fff0c4',dk:'#5a1f00',alt:{col:'#ff4a3a',hi:'#ffe0d8',dk:'#4a0a04'},alt2:{col:'#3fdba0',hi:'#dcfff0',dk:'#063a26'},sk:WKSK});
INFO['김건우 • 원숭이왕']={st:[8,5,10,7,8,10],p:'금강불괴 · 체력 30 이하가 되면 한 번, 2.5초 동안 금빛 몸이 되어 받는 피해 절반',
  sk:[['4×3','근두운을 타고 상대를 세 번 휘감아 지나가며 여의봉으로 후려침 · 맞으면 느려짐'],['2.4×5','털을 뽑아 불면 분신 다섯이 상대를 둘러싸고 빙글빙글 돌다가 차례로 덮침'],['6×4','여의봉을 땅에 꽂아 하늘 끝까지 늘린 뒤 두 바퀴 휘두름 · 경기장 전체를 쓸어버림']]};

// ---------- 공통 그림 ----------
// 상서로운 구름 (祥雲)
function wkCloudArt(x,y,s,al,col){g.save();g.translate(x,y);g.scale(s,s);g.globalAlpha=al;
  g.save();g.globalCompositeOperation='lighter';glow(col||'#ffcf6a',0,0,46,.35);g.restore();
  const P=[[-26,4,12],[-12,-4,15],[6,-6,16],[22,2,12],[-2,6,14],[14,8,10],[-18,9,9]];
  g.fillStyle='#ffffff';g.strokeStyle='#e8a93a';g.lineWidth=2.4;
  P.forEach(([px,py,r])=>{g.beginPath();g.arc(px,py,r+2.2,0,TAU);g.stroke()});
  P.forEach(([px,py,r])=>{const gr=g.createRadialGradient(px-r*.3,py-r*.4,r*.1,px,py,r);gr.addColorStop(0,'#ffffff');gr.addColorStop(1,'#ffe3b0');g.fillStyle=gr;g.beginPath();g.arc(px,py,r,0,TAU);g.fill()});
  // 소용돌이 무늬
  g.strokeStyle='#e8a93a';g.lineWidth=2;g.lineCap='round';[[-13,-3,1],[8,-5,-1],[20,3,1]].forEach(([cx,cy,d])=>{g.beginPath();for(let k=0;k<=22;k++){const a=k*.42*d,r=1+k*.33;k?g.lineTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r):g.moveTo(cx,cy)}g.stroke()});
  g.restore()}
// 여의봉 (가운데 = 0, 양끝 = ±L)
function wkStaff(x,y,a,L,w,al){g.save();g.translate(x,y);g.rotate(a);g.globalAlpha=al;
  g.save();g.globalCompositeOperation='lighter';g.globalAlpha=al*.55;g.strokeStyle='#ffcf6a';g.lineWidth=w*2.6;g.lineCap='round';g.beginPath();g.moveTo(-L,0);g.lineTo(L,0);g.stroke();g.restore();
  const bg=g.createLinearGradient(0,-w/2,0,w/2);bg.addColorStop(0,'#fff2c2');bg.addColorStop(.35,'#d79a2a');bg.addColorStop(.7,'#7a4a10');bg.addColorStop(1,'#3a2004');
  g.fillStyle=bg;g.strokeStyle='#1e1002';g.lineWidth=Math.max(1.2,w*.12);g.fillRect(-L,-w/2,L*2,w);g.strokeRect(-L,-w/2,L*2,w);
  // 금테 (양 끝 붉은 금고)
  const cap=Math.max(w*1.9,Math.min(34,L*.18));[-1,1].forEach(sd=>{const x0=sd>0?L-cap:-L,cg=g.createLinearGradient(0,-w*.62,0,w*.62);cg.addColorStop(0,'#ffd0c0');cg.addColorStop(.4,'#e0251a');cg.addColorStop(1,'#5a0804');
    g.fillStyle=cg;g.fillRect(x0,-w*.62,cap,w*1.24);g.strokeRect(x0,-w*.62,cap,w*1.24);g.fillStyle='#ffd66b';[.18,.82].forEach(u=>g.fillRect(x0+cap*u-w*.14,-w*.66,w*.28,w*1.32))});
  // 새김 무늬
  if(L>60){g.strokeStyle='rgba(255,236,170,.55)';g.lineWidth=Math.max(1,w*.1);const st=Math.max(18,w*3);for(let px=-L+cap+st;px<L-cap-st/2;px+=st){g.beginPath();g.moveTo(px,-w*.3);g.lineTo(px+st*.3,w*.3);g.stroke()}}
  g.restore()}
// 작은 분신
function wkMini(o,x,y,s,a,al){const sz=40*s;g.save();g.globalAlpha=al;g.save();g.globalCompositeOperation='lighter';glow(o.d.col,x,y,sz*1.2,.35);g.restore();
  g.save();g.translate(x,y);g.rotate(a);g.globalAlpha=al;wkStaffMini(sz);g.restore();
  g.globalAlpha=al;g.drawImage(ICON(o.d,52),x-sz/2,y-sz/2,sz,sz);g.restore()}
function wkStaffMini(sz){g.strokeStyle='#3a2004';g.lineWidth=4.5;g.lineCap='round';g.beginPath();g.moveTo(-sz*.2,sz*.35);g.lineTo(sz*1.05,-sz*.15);g.stroke();g.strokeStyle='#e8b23a';g.lineWidth=2.6;g.stroke();g.fillStyle='#e0251a';g.beginPath();g.arc(sz*1.05,-sz*.15,3,0,TAU);g.fill()}
function wkPuff(x,y,n,s){for(let i=0;i<n;i++){const a=rnd(0,TAU),v=rnd(30,120)*s,l=rnd(.45,.8);Pt.push({x:x+Math.cos(a)*6,y:y+Math.sin(a)*6,vx:Math.cos(a)*v,vy:Math.sin(a)*v-20,l,m:l,sh:3,col:i%3?'#ffffff':'#ffe2a8',r:rnd(9,16)*s,gr:28*s,a0:.75,fr:.12})}
  for(let i=0;i<6;i++){const a=rnd(0,TAU),v=rnd(80,200);Pt.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l:.35,m:.35,gl:1,sh:8,col:'#ffd66b',r:rnd(2,3.5),rot:a})}}

// ---------- 아이콘 (네온) ----------
EMB.wk=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*3)*.06);
  neon(D,1.8,()=>{g.beginPath();g.moveTo(-17,-2);g.bezierCurveTo(-17,-16,17,-16,17,-2);
    g.moveTo(-17,-2);g.bezierCurveTo(-21,2,-23,8,-18,11);g.bezierCurveTo(-14,13,-12,9,-15,7);
    g.moveTo(17,-2);g.bezierCurveTo(21,2,23,8,18,11);g.bezierCurveTo(14,13,12,9,15,7);
    g.moveTo(-6,4);g.lineTo(-2,8);g.moveTo(6,4);g.lineTo(2,8);
    g.moveTo(-9,16);g.bezierCurveTo(-4,12,4,12,9,16)});
  neon({col:'#ff4a3a',hi:'#ffd6cc'},1.6,()=>{g.beginPath();g.arc(0,-10,3,0,TAU)});
  g.save();g.globalCompositeOperation='lighter';glow(D.col,0,-6,16,.45);g.restore()};

// ---------- 패시브 : 금강불괴 ----------
const _updWK=update;update=function(dt){_updWK(dt);if(!F||(phase!='play'&&phase!='demo'))return;
  F.forEach(f=>{if(f.d.k!='wk'||f.dead)return;if(f.gold>0)f.gold-=dt;
    if(!f.gb&&f.hp<=30&&phase=='play'){f.gb=1;f.gold=2.5;SFXa('wk_gold');ring(f.x,f.y,f.r,f.r+90,'#ffd66b',8,.5);ring(f.x,f.y,f.r,f.r+150,'#fff0c4',3,.7);shake=Math.max(shake,8);
      for(let i=0;i<26;i++){const a=rnd(0,TAU),v=rnd(120,320),l=rnd(.4,.8);Pt.push({x:f.x,y:f.y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l,m:l,gl:1,sh:8,col:'#ffd66b',r:rnd(2,4),rot:a})}}})};
const _hurtWK=hurt;hurt=function(t,n){if(t&&t.d&&t.d.k=='wk'&&t.gold>0){const a=[...arguments];a[1]=Math.round(n*.5*10)/10;return _hurtWK.apply(this,a)}return _hurtWK.apply(this,arguments)};
const _lowWK=lowHP;lowHP=function(f){_lowWK(f);if(f.d.k=='wk'&&f.gold>0&&!f.dead&&!f.hid){const a=Math.min(1,f.gold/.4);g.save();g.translate(f.x,f.y);g.globalCompositeOperation='lighter';glow('#ffd66b',0,0,f.r*2.6,.45*a);
  g.strokeStyle='#fff0c4';g.globalAlpha=.8*a;g.lineWidth=2;for(let k=0;k<3;k++){const r=f.r+4+((clock*30+k*7)%14);g.beginPath();g.arc(0,0,r,0,TAU);g.stroke()}g.restore()}};

// ---------- 1) 근두운 : 구름 타고 세 번 휘감아 치기 ----------
function wkCloud(o,t){HZ.push({k:'wkcloud',o,tg:t,t:0,i:-1,N:3,D:.32,tr:[],sx:o.x,sy:o.y,side:Math.random()<.5?1:-1});SFXa('wk_cloud');wkPuff(o.x,o.y+o.r*.6,10,1)}
function wkBez(a,c,b,u){const v=1-u;return[v*v*a[0]+2*v*u*c[0]+u*u*b[0],v*v*a[1]+2*v*u*c[1]+u*u*b[1]]}
HZX.wkcloud=(h,dt)=>{const o=h.o;if(o.dead)return false;let e=h.tg;if(!e||e.dead){e=tgt(o);h.tg=e}if(!e)return false;o.gcd=Math.max(o.gcd,.4);o.cast=null;
  const ti=Math.floor(h.t/h.D);
  if(ti>=h.N){if(!h.end){h.end=1;wkPuff(o.x,o.y+o.r*.5,8,1);o.dx=Math.cos(rnd(0,TAU));o.dy=Math.sin(rnd(0,TAU))}return h.t<h.N*h.D+.5}
  if(ti!=h.i){h.i=ti;h.hit=0;const S=[o.x,o.y],ia=Math.atan2(e.y-S[1],e.x-S[0])+h.side*(.55+rnd(0,.25)),R=150+rnd(0,30);
    const E=[clamp(e.x+Math.cos(ia)*R,o.r,A-o.r),clamp(e.y+Math.sin(ia)*R,o.r,A-o.r)];h.S=S;h.E=E;h.C=[2*e.x-(S[0]+E[0])/2,2*e.y-(S[1]+E[1])/2];h.side*=-1;SFXa('wk_swoop')}
  // 상대가 움직이면 곡선이 따라감
  h.C=[h.C[0]+(2*e.x-(h.S[0]+h.E[0])/2-h.C[0])*Math.min(1,dt*8),h.C[1]+(2*e.y-(h.S[1]+h.E[1])/2-h.C[1])*Math.min(1,dt*8)];
  const u0=(h.t-ti*h.D)/h.D,u=u0<.5?2*u0*u0:1-2*(1-u0)*(1-u0),[px,py]=wkBez(h.S,h.C,h.E,u),px0=o.x,py0=o.y;
  o.x=clamp(px,o.r,A-o.r);o.y=clamp(py,o.r,A-o.r);const va=Math.atan2(o.y-py0,o.x-px0);h.va=va;o.dx=Math.cos(va);o.dy=Math.sin(va);o.rot+=dt*14;
  h.tr.push({x:o.x,y:o.y+o.r*.55,t:h.t});h.tr=h.tr.filter(q=>h.t-q.t<.55);
  if(Math.random()<dt*40)Pt.push({x:o.x+rnd(-14,14),y:o.y+o.r*.6+rnd(-4,6),vx:-o.dx*60+rnd(-20,20),vy:-o.dy*60+rnd(-10,10),l:.5,m:.5,sh:3,col:'#ffffff',r:rnd(8,13),gr:16,a0:.55,fr:.2});
  if(!h.hit&&!e.hid&&!e.jump&&dist(o,e)<o.r+e.r+10){h.hit=1;const a=va;hurt(e,4,o,(o.x+e.x)/2,(o.y+e.y)/2,1,0);SFXa('wk_hit');e.slow=Math.max(e.slow,1);
    e.x=clamp(e.x+Math.cos(a)*22,e.r,A-e.r);e.y=clamp(e.y+Math.sin(a)*22,e.r,A-e.r);e.sq=1;e.sa=a;ring(e.x,e.y,8,70,'#ffd66b',6,.3);FX.push({k:'burst',x:e.x,y:e.y,c:'#fff0c4',a:rnd(0,1),l:.25,m:.25});
    h.sw={a,t:h.t,x:e.x,y:e.y};shake=Math.max(shake,7);hs=.04}
  return true};
HZD.wkcloud=h=>{const o=h.o;if(o.dead)return;
  h.tr.forEach((q,k)=>{if(k%2)return;const p=(h.t-q.t)/.55;g.save();g.globalAlpha=(1-p)*.42;g.strokeStyle='#ffcf6a';g.lineWidth=1.6;g.fillStyle='#ffffff';[[-6,2,.8],[0,-2,1],[6,2,.7]].forEach(([dx,dy,r])=>{g.beginPath();g.arc(q.x+dx*(1+p),q.y+dy,(4+p*7)*r,0,TAU);g.stroke()});[[-6,2,.8],[0,-2,1],[6,2,.7]].forEach(([dx,dy,r])=>{g.beginPath();g.arc(q.x+dx*(1+p),q.y+dy,(4+p*7)*r,0,TAU);g.fill()});g.restore()});
  if(!h.end||h.t<h.N*h.D+.15){const s=h.end?clamp(1-(h.t-h.N*h.D)/.15,0,1):Math.min(1,h.t/.12);wkCloudArt(o.x,o.y+o.r*.95,1.25*s,s,o.d.col)}};
HZP.wkcloud=h=>{const o=h.o;if(o.dead||h.end)return;
  // 여의봉 휘두르기
  const sw=h.sw&&h.t-h.sw.t<.18?(h.t-h.sw.t)/.18:-1,ba=(h.va||0)+(sw>=0?-1.6+3.2*sw:-.9);
  if(sw>=0){g.save();g.translate(o.x,o.y);g.globalCompositeOperation='lighter';g.globalAlpha=(1-sw)*.7;const gr=g.createRadialGradient(0,0,10,0,0,64);gr.addColorStop(0,'rgba(255,214,107,0)');gr.addColorStop(1,'rgba(255,214,107,.9)');g.fillStyle=gr;g.beginPath();g.moveTo(0,0);g.arc(0,0,64,ba-1.4,ba);g.closePath();g.fill();g.restore()}
  wkStaff(o.x+Math.cos(ba)*40,o.y+Math.sin(ba)*40,ba,40,6.5,1)};

// ---------- 2) 분신술 : 털 → 분신 다섯 ----------
function wkClone(o,t){const n=5,a0=rnd(0,TAU);HZ.push({k:'wkclone',o,tg:t,t:0,cx:t.x,cy:t.y,R:110,rot:a0,cl:Array.from({length:n},(_,i)=>({a:i*TAU/n,st:0,hx:o.x,hy:o.y,dash:-1,done:0,hit:0}))});SFXa('wk_hair');
  for(let i=0;i<8;i++){const a=rnd(-2.6,-.5),v=rnd(60,140);Pt.push({x:o.x,y:o.y-o.r*.6,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l:.5,m:.5,gl:1,sh:5,col:'#ffd66b',r:1.4})}}
HZX.wkclone=(h,dt)=>{const o=h.o;let e=h.tg;if(o.dead)return false;if(!e||e.dead){e=tgt(o);h.tg=e;if(!e)return false}
  h.cx+=(e.x-h.cx)*Math.min(1,dt*6);h.cy+=(e.y-h.cy)*Math.min(1,dt*6);
  const T1=.38,T2=1.15;h.rot+=dt*(h.t<T2?3.4:1.5);const R=h.t<T2?h.R-20*clamp((h.t-T1)/(T2-T1),0,1):h.R-20;
  h.cl.forEach((c,i)=>{c.x=clamp(h.cx+Math.cos(h.rot+c.a)*R,14,A-14);c.y=clamp(h.cy+Math.sin(h.rot+c.a)*R,14,A-14);
    if(!c.st&&h.t>=T1+i*.03){c.st=1;wkPuff(c.x,c.y,7,.8);if(i==0)SFXa('wk_clone')}
    const ds=T2+i*.15;
    if(c.dash<0&&h.t>=ds){c.dash=0;c.sx=c.x;c.sy=c.y;const a=Math.atan2(e.y-c.y,e.x-c.x);c.da=a;c.ex=clamp(e.x+Math.cos(a)*90,14,A-14);c.ey=clamp(e.y+Math.sin(a)*90,14,A-14)}
    if(c.dash>=0&&!c.done){c.dash+=dt/.17;const u=Math.min(1,c.dash),ex=c.ex,ey=c.ey;c.dx2=c.sx+(ex-c.sx)*u;c.dy2=c.sy+(ey-c.sy)*u;
      if(!c.hit&&u>.4&&!e.hid&&!e.jump&&Math.hypot(e.x-c.dx2,e.y-c.dy2)<e.r+22){c.hit=1;hurt(e,2.4,o,e.x,e.y,0,0);SFXa('wk_strike');e.stn=Math.max(e.stn,.12);e.x=clamp(e.x+Math.cos(c.da)*10,e.r,A-e.r);e.y=clamp(e.y+Math.sin(c.da)*10,e.r,A-e.r);FX.push({k:'burst',x:e.x,y:e.y,c:'#fff0c4',a:rnd(0,1),l:.22,m:.22});ring(e.x,e.y,6,46,'#ffd66b',4,.25)}
      if(u>=1){c.done=1;wkPuff(c.dx2,c.dy2,6,.7)}}});
  return h.t<T2+h.cl.length*.15+.5};
HZD.wkclone=h=>{const T1=.38;if(h.t<1.4){const a=clamp(h.t/.3,0,1)*clamp((1.4-h.t)/.3,0,1);g.save();g.translate(h.cx,h.cy);g.strokeStyle='#ffd66b';g.globalAlpha=a*.35;g.lineWidth=2;g.setLineDash([4,10]);g.lineDashOffset=-clock*40;g.beginPath();g.arc(0,0,h.R-10,0,TAU);g.stroke();g.setLineDash([]);g.restore()}};
HZP.wkclone=h=>{const o=h.o,T1=.38;
  // 털이 날아감
  if(h.t<T1){const u=h.t/T1;h.cl.forEach(c=>{const x=o.x+(c.x-o.x)*u,y=o.y-o.r+(c.y-o.y+o.r)*u-Math.sin(u*Math.PI)*50;g.save();g.translate(x,y);g.rotate(u*12+c.a);g.strokeStyle='#ffd66b';g.lineWidth=2;g.lineCap='round';g.beginPath();g.moveTo(-6,0);g.quadraticCurveTo(0,-4,6,0);g.stroke();g.globalCompositeOperation='lighter';glow('#ffd66b',0,0,10,.6);g.restore()})}
  h.cl.forEach((c,i)=>{if(!c.st||c.done)return;const age=h.t-T1-i*.03,s=back(clamp(age/.2,0,1));
    if(c.dash>=0){const u=Math.min(1,c.dash);for(let k=1;k<5;k++){const uu=Math.max(0,u-k*.08);wkMini(o,c.sx+(c.ex-c.sx)*uu,c.sy+(c.ey-c.sy)*uu,1,c.da,.25-k*.05)}wkMini(o,c.dx2,c.dy2,1.05,c.da,1)}
    else{const a=Math.atan2(h.cy-c.y,h.cx-c.x);wkMini(o,c.x,c.y+Math.sin(clock*8+i)*3,s,a,1)}})};

// ---------- 3) ULT 여의봉 · 천지개벽 ----------
function wkUlt(o,t){HZ.push({k:'wkult',o,t:0,x:o.x,y:o.y,a:-Math.PI/2,L:20,prev:[],hit:new Map(),rp:new Map(),sg:0});SFXa('wk_ult');shake=Math.max(shake,16);
  FX.push({k:'crack',x:o.x,y:o.y,r:80,l:3.4,m:3.4});for(let i=0;i<14;i++)rockP(o.x,o.y,rnd(0,TAU),rnd(80,220))}
HZX.wkult=(h,dt,EN)=>{const o=h.o;if(o.dead)return false;o.x=h.x;o.y=h.y;o.gcd=Math.max(o.gcd,.5);o.cast=null;
  const G0=.15,G1=.75,S0=.8,S1=2.9,LM=A*.98;
  if(h.t>=G0&&!h.gs){h.gs=1;SFXa('wk_grow')}
  if(h.t>=S0&&!h.ss){h.ss=1;SFXa('wk_spin')}
  const gu=clamp((h.t-G0)/(G1-G0),0,1);h.L=h.t<S1+.1?20+(LM-20)*(1-Math.pow(1-gu,3)):LM*clamp(1-(h.t-S1-.1)/.25,0,1);
  const su=clamp((h.t-S0)/(S1-S0),0,1),ea=su*su*(3-2*su),a=-Math.PI/2+ea*TAU*2;
  h.prev.unshift(a);if(h.prev.length>10)h.prev.pop();
  if(h.t<G1)if(Math.random()<dt*30)shake=Math.max(shake,5);
  // 맞았는지 : 봉(양쪽)이 적의 방향을 지나갈 때
  EN.forEach(e=>{if(e.hid||e.jump)return;const d=dist(o,e);if(d>h.L+e.r)return;let rel=Math.atan2(e.y-o.y,e.x-o.x)-a;rel=Math.atan2(Math.sin(rel*1),Math.cos(rel*1));let r2=rel>Math.PI/2?rel-Math.PI:rel<-Math.PI/2?rel+Math.PI:rel;
    const pr=h.hit.get(e),wid=Math.atan2(e.r+8,Math.max(d,1)),p2=h.rp.get(e);h.rp.set(e,r2);
    const cross=p2!=null&&Math.sign(p2)!=Math.sign(r2)&&Math.abs(p2)<.9&&Math.abs(r2)<.9;
    if(su>0&&su<1&&(Math.abs(r2)<wid||cross)&&(!pr||h.t-pr>.3)){h.hit.set(e,h.t);const out=Math.atan2(e.y-o.y,e.x-o.x),tg=a+Math.PI/2;hurt(e,6,o,e.x,e.y,0,1);e.stn=Math.max(e.stn,.25);SFXa('wk_hit');
      const kx=Math.cos(out)*30+Math.cos(tg)*40,ky=Math.sin(out)*30+Math.sin(tg)*40;e.x=clamp(e.x+kx,e.r,A-e.r);e.y=clamp(e.y+ky,e.r,A-e.r);ring(e.x,e.y,8,90,'#ffd66b',8,.35);for(let i=0;i<10;i++)rockP(e.x,e.y,rnd(0,TAU),rnd(80,200))}});
  // 끝부분이 땅을 긁음
  if(su>0&&su<1)emit(50,dt,()=>{const rr=rnd(60,Math.min(h.L,A*.7)),sd=Math.random()<.5?1:-1,px=o.x+Math.cos(a)*rr*sd,py=o.y+Math.sin(a)*rr*sd;if(px>0&&px<A&&py>0&&py<A){dustP(px,py,rnd(30,90));if(Math.random()<.4)Pt.push({x:px,y:py,vx:rnd(-90,90),vy:rnd(-90,90),l:.3,m:.3,gl:1,sh:5,col:'#ffd66b',r:1.6,fr:.1})}});
  if(h.t>=S1&&!h.fin){h.fin=1;shake=Math.max(shake,20);ring(o.x,o.y,10,240,'#ffd66b',14,.6);ring(o.x,o.y,10,160,'#fff0c4',6,.5);wkPuff(o.x,o.y,14,1.3)}
  h.a=a;return h.t<S1+.6};
HZD.wkult=h=>{const o=h.o,a=Math.min(1,h.t/.2)*clamp((h.t-2.95)/-.5+1,0,1);g.save();g.translate(o.x,o.y);g.globalCompositeOperation='lighter';glow('#ffb02e',0,0,120,.5*a);glow('#fff0c4',0,0,60,.4*a);
  g.globalAlpha=.35*a;g.strokeStyle='#ffd66b';g.lineWidth=3;for(let k=0;k<2;k++){const r=40+((clock*90+k*40)%80);g.beginPath();g.arc(0,0,r,0,TAU);g.stroke()}g.restore()};
HZP.wkult=h=>{const o=h.o;if(o.dead)return;const fa=clamp((2.9+.6-h.t)/.3,0,1);
  // 휘두른 자리 금빛 잔상
  if(h.prev.length>1){g.save();g.translate(o.x,o.y);g.globalCompositeOperation='lighter';for(let k=1;k<h.prev.length;k++){let a1=h.prev[k-1],a0=h.prev[k];if(Math.abs(a1-a0)<.002)continue;g.globalAlpha=fa*(.55-k*.05);
    [0,Math.PI].forEach(off=>{const gr=g.createRadialGradient(0,0,20,0,0,h.L);gr.addColorStop(0,'rgba(255,214,107,0)');gr.addColorStop(.4,'rgba(255,214,107,.6)');gr.addColorStop(1,'rgba(255,240,196,.2)');g.fillStyle=gr;g.beginPath();g.moveTo(0,0);g.arc(0,0,h.L,Math.min(a0,a1)+off,Math.max(a0,a1)+off);g.closePath();g.fill()})}g.restore()}
  wkStaff(o.x,o.y,h.a,h.L,h.L>200?16:8,fa);
  // 손잡이 부분 빛
  g.save();g.globalCompositeOperation='lighter';glow('#fff0c4',o.x,o.y,40,.6*fa);g.restore()};

// ---------- 배지/아이콘 갱신 ----------
document.querySelectorAll('#grid .tile').forEach(t=>{const i=+t.dataset.i,vc=DEF.filter(x=>x.vof===i).length;let em=t.querySelector('.vb');if(vc){if(!em){em=document.createElement('em');em.className='vb';t.appendChild(em)}em.textContent='+'+vc}});
Object.keys(ICC).forEach(k=>delete ICC[k]);mkDict();
;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ▶ 섹션 : extra3
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ===== extra3.js : 김가은 • 피카소 =====

// ---------- 등록 ----------
const NEW13=['pc_pencil','pc_trap','pc_color','pc_shape','pc_cube','pc_canvas','pc_brush','pc_sign','pc_splash'];
NEW13.forEach(n=>{if(!SND.includes(n))SND.push(n);if(!AUD[n])AUD[n]=new SoundPool('sounds/'+n+'.mp3',n=='pc_shape'||n=='pc_brush'?4:3)});
Object.assign(SLB,{pc_pencil:'피카소 · 연필 스케치',pc_trap:'피카소 · 스케치 감옥 닫힘',pc_color:'피카소 · 채색 폭발',pc_shape:'피카소 · 도형 던지기',pc_cube:'피카소 · 큐비즘',pc_canvas:'피카소 · 캔버스 펼치기',pc_brush:'피카소 · 붓질',pc_sign:'피카소 · 서명',pc_splash:'피카소 · 물감 폭발'});
const PCSK=[
  {n:'스케치 감옥',w:.4,cd:8,c:(o,t)=>!t.hid&&!t.jump&&dist(o,t)<520,f:(o,t)=>pcCage(o,t)},
  {n:'큐비즘',w:.35,cd:7,c:(o,t)=>!t.hid&&dist(o,t)<560,f:(o,t)=>pcCube(o,t)},
  {n:'걸작 · 캔버스',w:.7,ult:1,f:(o,t)=>pcUlt(o,t)}];
DEF.push({name:'김가은 • 피카소',gl:'피',k:'pica',vof:4,r:26,sp:212,col:'#ff5a5f',hi:'#ffe3e0',dk:'#4a0d12',alt:{col:'#3a7bff',hi:'#dfe8ff',dk:'#0a1f4a'},alt2:{col:'#ffc83a',hi:'#fff3cf',dk:'#4a3300'},sk:PCSK});
INFO['김가은 • 피카소']={st:[7,5,7,9,9,9],p:'영감 · 스킬을 3번 맞힐 때마다 궁 게이지 +12',
  sk:[['1×4+10 + 가둠','연필로 상대 주위에 동그라미를 스케치 · 2초 동안 그 안에 갇히고, 빗금이 다 차면 물감이 터짐'],['3×3 + 큐비즘','빨간 세모 · 파란 네모 · 노란 동그라미를 던짐 · 두 개 이상 맞으면 몸이 조각조각 큐비즘이 되어 2.4초 동안 제멋대로 움직이고 스킬을 못 씀'],['6×4 + 6','경기장이 캔버스가 되고 거대한 붓이 상대를 따라 네 번 붓질 · 마지막에 서명하면 물감 위에 있던 적은 한 번 더 터짐']]};
const PCC={r:['#d62839','#ef6b78','#8f1020'],b:['#1d4ed8','#5d86f0','#0f2a80'],y:['#f2a900','#ffd060','#a86f00'],k:['#16161a','#4a4a55','#000000']};

// 영감 : 3번 맞힐 때마다 궁 게이지
function pcHit(o,e,n,x,y,slow,heavy){hurt(e,n,o,x,y,slow,heavy);o.insp=(o.insp||0)+1;if(o.insp%3==0&&!o.dead){o.ug=Math.min(100,(o.ug||0)+12);ring(o.x,o.y,o.r,o.r+40,'#ffd060',4,.35);
  for(let i=0;i<8;i++){const a=rnd(0,TAU);Pt.push({x:o.x,y:o.y,vx:Math.cos(a)*120,vy:Math.sin(a)*120,l:.5,m:.5,sh:6,col:['#d62839','#1d4ed8','#f2a900'][i%3],r:rnd(2,3.5),fr:.1})}}}

// ---------- 공통 그림 ----------
function pcPencil(x,y,a,s,al){g.save();g.translate(x,y);g.rotate(a);g.scale(s,s);g.globalAlpha=al==null?1:al;
  g.fillStyle='rgba(0,0,0,.25)';g.beginPath();g.ellipse(-36,8,40,5,0,0,TAU);g.fill();
  g.fillStyle='#2a2a30';g.beginPath();g.moveTo(0,0);g.lineTo(-6,-2);g.lineTo(-6,2);g.closePath();g.fill();
  g.fillStyle='#ecc9a0';g.beginPath();g.moveTo(-5,-1.8);g.lineTo(-16,-6);g.lineTo(-16,6);g.lineTo(-5,1.8);g.closePath();g.fill();g.strokeStyle='#5a3a1a';g.lineWidth=1;g.stroke();
  const bg=g.createLinearGradient(0,-6,0,6);bg.addColorStop(0,'#ffe680');bg.addColorStop(.33,'#ffcc22');bg.addColorStop(.34,'#f2b400');bg.addColorStop(.66,'#f2b400');bg.addColorStop(.67,'#d99a00');bg.addColorStop(1,'#b37c00');
  g.fillStyle=bg;g.fillRect(-62,-6,46,12);g.strokeStyle='#5a3a00';g.lineWidth=1.2;g.strokeRect(-62,-6,46,12);
  const fg=g.createLinearGradient(0,-6,0,6);fg.addColorStop(0,'#f4f4f8');fg.addColorStop(.5,'#9aa0ad');fg.addColorStop(1,'#d8dbe2');g.fillStyle=fg;g.fillRect(-70,-6.3,8,12.6);g.strokeRect(-70,-6.3,8,12.6);
  g.fillStyle='#ff8fa3';g.beginPath();g.moveTo(-70,-6);g.lineTo(-78,-6);g.quadraticCurveTo(-82,0,-78,6);g.lineTo(-70,6);g.closePath();g.fill();g.stroke();g.restore()}
function pcBrush(x,y,a,col,s,al){g.save();g.translate(x,y);g.rotate(a);g.scale(s,s);g.globalAlpha=al==null?1:al;
  g.fillStyle='rgba(0,0,0,.28)';g.beginPath();g.ellipse(-60,14,62,7,0,0,TAU);g.fill();
  g.fillStyle=col;g.beginPath();g.moveTo(2,0);g.quadraticCurveTo(-6,-10,-24,-9);g.lineTo(-24,9);g.quadraticCurveTo(-6,10,2,0);g.fill();
  g.fillStyle='#e9d3a8';g.beginPath();g.moveTo(-14,-9.4);g.lineTo(-26,-9);g.lineTo(-26,9);g.lineTo(-14,9.4);g.quadraticCurveTo(-18,0,-14,-9.4);g.fill();
  g.strokeStyle='rgba(0,0,0,.35)';g.lineWidth=.8;for(let k=-3;k<=3;k++){g.beginPath();g.moveTo(-26,k*2.4);g.quadraticCurveTo(-12,k*2.6,0,k*.4);g.stroke()}
  const fg=g.createLinearGradient(0,-9,0,9);fg.addColorStop(0,'#ffffff');fg.addColorStop(.45,'#a7adb8');fg.addColorStop(1,'#e2e5ea');g.fillStyle=fg;g.beginPath();g.moveTo(-26,-9);g.lineTo(-42,-6);g.lineTo(-42,6);g.lineTo(-26,9);g.closePath();g.fill();g.strokeStyle='#4a4e57';g.lineWidth=1.2;g.stroke();
  const hg=g.createLinearGradient(0,-6,0,6);hg.addColorStop(0,'#d06a3a');hg.addColorStop(.5,'#8a2f12');hg.addColorStop(1,'#4a1406');g.fillStyle=hg;g.beginPath();g.moveTo(-42,-5.5);g.lineTo(-118,-3.2);g.quadraticCurveTo(-124,0,-118,3.2);g.lineTo(-42,5.5);g.closePath();g.fill();g.strokeStyle='#2a0a02';g.stroke();
  g.strokeStyle='rgba(255,220,190,.5)';g.lineWidth=1.4;g.beginPath();g.moveTo(-46,-3);g.lineTo(-114,-1.6);g.stroke();g.restore()}
function pcShape(kind,s,rot){g.save();g.rotate(rot);g.scale(s,s);g.lineJoin='round';g.lineWidth=3;g.strokeStyle='#111';
  g.beginPath();if(kind==0){g.moveTo(0,-15);g.lineTo(14,11);g.lineTo(-14,11);g.closePath()}else if(kind==1){g.rect(-12,-12,24,24)}else g.arc(0,0,13,0,TAU);
  g.fillStyle=kind==0?'#d62839':kind==1?'#1d4ed8':'#f2a900';g.fill();g.stroke();
  g.save();g.clip();g.fillStyle='rgba(255,255,255,.28)';g.beginPath();g.moveTo(-20,-20);g.lineTo(6,-20);g.lineTo(-20,6);g.closePath();g.fill();g.strokeStyle='rgba(0,0,0,.25)';g.lineWidth=1.2;for(let k=-20;k<20;k+=5){g.beginPath();g.moveTo(k,20);g.lineTo(k+14,6);g.stroke()}g.restore();g.restore()}
// 흔들리는 스케치 선 (점들)
function pcWob(cx,cy,R,seed,pass,u){const P=[],n=48,lim=Math.floor(n*u);for(let i=0;i<=lim;i++){const th=i/n*TAU*1.04+seed+pass*.4,r=R*(1+.035*Math.sin(th*3+seed*5+pass)+.02*Math.sin(th*7+pass*2))+pass*2.5-2.5;P.push([cx+Math.cos(th)*r,cy+Math.sin(th)*r])}return P}
function pcLine(P,col,w,al){if(P.length<2)return;g.save();g.globalAlpha=al;g.strokeStyle=col;g.lineWidth=w;g.lineCap='round';g.lineJoin='round';g.beginPath();P.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.stroke();g.restore()}

// ---------- 아이콘 (네온 큐비즘 얼굴) ----------
EMB.pica=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*2.5)*.06);
  neon(D,1.7,()=>{g.beginPath();g.moveTo(-2,-19);g.bezierCurveTo(-16,-18,-19,-4,-14,6);g.lineTo(-17,11);g.lineTo(-11,12);g.bezierCurveTo(-11,18,-4,20,2,18);
    g.moveTo(-2,-19);g.lineTo(-2,18);
    g.moveTo(-12,-6);g.quadraticCurveTo(-8,-10,-4,-6);g.quadraticCurveTo(-8,-3,-12,-6);
    g.moveTo(3,-12);g.lineTo(16,-12);g.lineTo(16,-1);g.lineTo(3,-1);
    g.moveTo(-2,2);g.lineTo(6,9);g.lineTo(-2,9);g.moveTo(3,14);g.lineTo(11,14)});
  neon({col:'#3a7bff',hi:'#dfe8ff'},1.5,()=>{g.beginPath();g.arc(9.5,-6.5,2.6,0,TAU)});
  neon({col:'#ffc83a',hi:'#fff3cf'},1.4,()=>{g.beginPath();g.arc(-8,-6,1.4,0,TAU)});
  g.save();g.globalCompositeOperation='lighter';glow(D.col,0,0,16,.4);g.restore()};

// ---------- 1) 스케치 감옥 ----------
function pcCage(o,t){HZ.push({k:'pccage',o,tg:t,t:0,cx:t.x,cy:t.y,R:84,seed:rnd(0,TAU),in:[],px:o.x,py:o.y,cl:0,hatch:[]});SFXa('pc_pencil')}
HZX.pccage=(h,dt,EN)=>{const o=h.o,e=h.tg,D0=.18,D1=.62,TR=2.2;
  if(!h.cl&&e&&!e.dead){h.cx+=(e.x-h.cx)*Math.min(1,dt*10);h.cy+=(e.y-h.cy)*Math.min(1,dt*10);h.cx=clamp(h.cx,h.R*.6,A-h.R*.6);h.cy=clamp(h.cy,h.R*.6,A-h.R*.6)}
  if(!h.cl&&h.t>=D1){h.cl=1;h.ct=h.t;SFXa('pc_trap');h.in=EN.filter(x=>!x.hid&&!x.jump&&Math.hypot(x.x-h.cx,x.y-h.cy)<h.R+x.r*.6);ring(h.cx,h.cy,h.R,h.R+20,'#f4f1ea',3,.3);
    h.in.forEach(x=>{const d=Math.hypot(x.x-h.cx,x.y-h.cy),m=h.R-x.r-2;if(d>m){const a=Math.atan2(x.y-h.cy,x.x-h.cx);x.x=h.cx+Math.cos(a)*m;x.y=h.cy+Math.sin(a)*m}})}
  if(h.cl&&!h.boom){h.in=h.in.filter(x=>!x.dead);h.in.forEach(x=>{const m=Math.max(4,h.R-x.r-2),d=Math.hypot(x.x-h.cx,x.y-h.cy);if(d>m){const a=Math.atan2(x.y-h.cy,x.x-h.cx);x.x=h.cx+Math.cos(a)*m;x.y=h.cy+Math.sin(a)*m;
      const nx=Math.cos(a),ny=Math.sin(a),dot=x.dx*nx+x.dy*ny;if(dot>0){x.dx-=2*dot*nx;x.dy-=2*dot*ny}x.sq=1;x.sa=a;if(Math.random()<.3)spark(x.x+nx*x.r,x.y+ny*x.r,'dust',3,80)}x.dash=0;x.slide=0});
    h.tk=(h.tk||0)+dt;if(h.tk>=.5){h.tk-=.5;h.in.forEach(x=>{if(!x.dead)hurt(x,1,o,x.x,x.y,0,0)})}
    // 빗금
    const pr=clamp((h.t-h.ct)/TR,0,1),want=Math.floor(pr*26);while(h.hatch.length<want){const k=h.hatch.length,cross=k>=13,off=((k%13)/13-.5)*2*h.R*.95+rnd(-4,4);h.hatch.push({off,cross,t:h.t,w:rnd(.9,1.6)});if(k%3==0)SFXa('pc_pencil')}
    if(h.t>=h.ct+TR){h.boom=1;h.bt=h.t;SFXa('pc_color');shake=Math.max(shake,12);
      EN.forEach(x=>{if(!x.hid&&!x.jump&&Math.hypot(x.x-h.cx,x.y-h.cy)<h.R+x.r)pcHit(o,x,10,x.x,x.y,0,1)});
      for(let i=0;i<40;i++){const a=rnd(0,TAU),v=rnd(80,330),l=rnd(.5,.9);Pt.push({x:h.cx+Math.cos(a)*rnd(0,h.R*.6),y:h.cy+Math.sin(a)*rnd(0,h.R*.6),vx:Math.cos(a)*v,vy:Math.sin(a)*v,l,m:l,sh:6,col:['#d62839','#1d4ed8','#f2a900','#ffffff'][i%4],r:rnd(3,7),fr:.05})}
      h.blobs=Array.from({length:9},(_,i)=>({x:rnd(-.6,.6)*h.R,y:rnd(-.6,.6)*h.R,r:rnd(.3,.55)*h.R,c:['#d62839','#1d4ed8','#f2a900'][i%3]}))}}
  if(o.dead&&!h.cl)return false;
  return !h.boom||h.t<h.bt+.7};
HZD.pccage=h=>{const D0=.18,D1=.62,fa=h.boom?clamp(1-(h.t-h.bt)/.7,0,1):1;
  if(h.boom){g.save();g.translate(h.cx,h.cy);const s=back(clamp((h.t-h.bt)/.15,0,1));g.beginPath();g.arc(0,0,h.R,0,TAU);g.clip();g.globalAlpha=fa*.85;h.blobs.forEach(b=>{g.fillStyle=b.c;g.beginPath();g.arc(b.x,b.y,Math.max(0,b.r*s),0,TAU);g.fill()});g.restore()}
  if(h.cl&&!h.boom){g.save();g.translate(h.cx,h.cy);g.beginPath();g.arc(0,0,h.R-2,0,TAU);g.clip();g.fillStyle='rgba(244,241,234,.06)';g.fillRect(-h.R,-h.R,h.R*2,h.R*2);
    h.hatch.forEach(q=>{const a=clamp((h.t-q.t)/.06,0,1);g.save();g.rotate(q.cross?-.8:.8);g.strokeStyle='#f4f1ea';g.globalAlpha=.42;g.lineWidth=q.w;g.beginPath();g.moveTo(q.off,-h.R);g.lineTo(q.off,-h.R+2*h.R*a);g.stroke();g.restore()});g.restore()}
  // 스케치 동그라미 (세 번 덧그림)
  const u=clamp((h.t-D0)/(D1-D0),0,1);for(let p=0;p<3;p++){const up=clamp(u*1.25-p*.12,0,1);if(up<=0)continue;const P=pcWob(h.cx,h.cy,h.R,h.seed,p,up);pcLine(P,p==1?h.o.d.col:'#f4f1ea',p==1?2.4:1.6,fa*(p==1?.9:.7))}
  if(h.cl){const pulse=.5+.5*Math.sin(clock*10);g.save();g.globalCompositeOperation='lighter';g.globalAlpha=fa*.25*pulse;g.strokeStyle=h.o.d.col;g.lineWidth=6;g.beginPath();g.arc(h.cx,h.cy,h.R,0,TAU);g.stroke();g.restore()}};
HZP.pccage=h=>{const o=h.o,D0=.18,D1=.62;let x,y,a;
  if(h.t<D0){const u=h.t/D0;x=o.x+(h.cx+Math.cos(h.seed-.4)*h.R-o.x)*u;y=o.y+(h.cy+Math.sin(h.seed-.4)*h.R-o.y)*u-Math.sin(u*Math.PI)*40;a=-.9}
  else if(h.t<D1+.08){const u=clamp((h.t-D0)/(D1-D0),0,1),th=u*TAU*1.04+h.seed;x=h.cx+Math.cos(th)*h.R;y=h.cy+Math.sin(th)*h.R;a=-1.1+Math.sin(clock*30)*.08}
  else if(h.cl&&!h.boom){const pr=clamp((h.t-h.ct)/2.2,0,1),last=h.hatch[h.hatch.length-1];if(!last)return;const k=Math.sin(clock*26);x=h.cx+(last.cross?-1:1)*last.off*.7+k*10;y=h.cy-k*h.R*.5;a=-1.1}
  else return;pcPencil(x,y,a,.8,1);g.save();g.globalCompositeOperation='lighter';glow('#ffffff',x,y,8,.6);g.restore()};

// ---------- 2) 큐비즘 : 세모 · 네모 · 동그라미 ----------
function pcCube(o,t){const a0=ang(o,t);HZ.push({k:'pccube',o,tg:t,t:0,hits:0,sh:[0,1,2].map(i=>({kind:i,x:o.x,y:o.y,a:a0+(i-1)*1,v:520,dl:i*.09,live:1,on:0,tr:[],rot:rnd(0,TAU)}))});SFXa('pc_shape')}
HZX.pccube=(h,dt,EN)=>{const o=h.o;let e=h.tg;if(!e||e.dead){e=tgt(o);h.tg=e}let alive=0;
  h.sh.forEach(s=>{if(!s.live)return;alive++;if(h.t<s.dl)return;if(!s.on){s.on=1;s.x=o.x;s.y=o.y;if(s.kind)SFXa('pc_shape')}
    if(e){let da=Math.atan2(e.y-s.y,e.x-s.x)-s.a;da=Math.atan2(Math.sin(da),Math.cos(da));s.a+=clamp(da,-5.5*dt,5.5*dt)}s.v+=500*dt;
    s.x+=Math.cos(s.a)*s.v*dt;s.y+=Math.sin(s.a)*s.v*dt;s.rot+=dt*9;s.tr.push([s.x,s.y]);if(s.tr.length>10)s.tr.shift();
    if(s.x<-30||s.x>A+30||s.y<-30||s.y>A+30||h.t>2.2){s.live=0;return}
    const hit=EN.find(x=>!x.hid&&!x.jump&&Math.hypot(x.x-s.x,x.y-s.y)<x.r+12);
    if(hit){s.live=0;pcHit(o,hit,3,s.x,s.y,0,0);const c=s.kind==0?'#d62839':s.kind==1?'#1d4ed8':'#f2a900';for(let i=0;i<12;i++){const a=rnd(0,TAU),v=rnd(60,200),l=rnd(.3,.6);Pt.push({x:s.x,y:s.y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l,m:l,sh:2,col:c,r:rnd(3,6),rot:rnd(0,TAU),vr:rnd(-9,9),fr:.1})}
      hit.cubN=(hit.cubN||0)+1;hit.cubW=h;if(hit.cubN>=2&&hit.cubH!=h){hit.cubH=h;pcCubism(hit)}}});
  return alive>0||h.t<.3};
HZP.pccube=h=>{h.sh.forEach(s=>{if(!s.live||!s.on)return;g.save();g.strokeStyle='rgba(244,241,234,.55)';g.lineWidth=1.4;g.setLineDash([3,4]);if(s.tr.length>1){g.beginPath();s.tr.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.stroke()}g.setLineDash([]);
  g.translate(s.x,s.y);g.globalCompositeOperation='lighter';glow(s.kind==0?'#ff6b78':s.kind==1?'#5d86f0':'#ffd060',0,0,26,.5);g.globalCompositeOperation='source-over';pcShape(s.kind,1.35,s.rot);g.restore()})};
function pcCubism(e){e.cub=2.4;e.cubT=0;SFXa('pc_cube');const base=rnd(0,TAU),ang4=[0,1,2,3].map(i=>base+i*TAU/4+rnd(-.45,.45)).sort((a,b)=>a-b);
  e.cubS={cx:rnd(-5,5),cy:rnd(-5,5),an:ang4,off:ang4.map(()=>({d:rnd(7,14),r:rnd(-.18,.18),j:rnd(0,TAU)})),cols:['#d62839','#1d4ed8','#f2a900','#16161a'].sort(()=>Math.random()-.5)};
  ring(e.x,e.y,e.r,e.r+60,'#f4f1ea',4,.4);shake=Math.max(shake,8);hs=.05;
  for(let i=0;i<14;i++){const a=rnd(0,TAU),v=rnd(100,260);Pt.push({x:e.x,y:e.y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l:.5,m:.5,sh:2,col:['#d62839','#1d4ed8','#f2a900','#f4f1ea'][i%4],r:rnd(3,7),rot:rnd(0,TAU),vr:rnd(-10,10),fr:.1})}}
// 큐비즘 : 제멋대로 움직임
const _updPC=update;update=function(dt){_updPC(dt);if(!F||(phase!='play'&&phase!='demo'))return;
  F.forEach(f=>{if(!(f.cub>0)||f.dead)return;if(TSTOP||MAD||CIN)return;f.cub-=dt;f.cubT-=dt;f.gcd=Math.max(f.gcd,.25);if(f.cast&&!f.cast.s.ult)f.cast=null;if(f.cubT<=0&&f.stn<=0&&f.frz<=0){f.cubT=rnd(.18,.3);let a;do{a=rnd(0,TAU)}while(Math.abs(Math.cos(a))<.25||Math.abs(Math.sin(a))<.25);f.dx=Math.cos(a);f.dy=Math.sin(a)}
    if(f.cub<=0){f.cubN=0;f.cubS=null;ring(f.x,f.y,f.r,f.r+30,'#f4f1ea',3,.3)}});
  F.forEach(f=>{if(f.cubN&&!(f.cub>0)&&f.cubW&&!HZ.includes(f.cubW)){f.cubN=0;f.cubW=null}})};
// 큐비즘 : 몸이 조각조각
const _ballPC=ball;ball=function(f,t){if(!(f.cub>0)||!f.cubS||f.dead||f.hid)return _ballPC(f,t);
  const S=f.cubS,R=f.r*1.9,n=S.an.length,amp=Math.min(1,f.cub/.3)*Math.min(1,(2.4-f.cub)/.15+.2);
  for(let i=0;i<n;i++){const a0=S.an[i],a1=i<n-1?S.an[i+1]:S.an[0]+TAU,mid=(a0+a1)/2,O=S.off[i],j=Math.sin(clock*7+O.j)*2,dx=Math.cos(mid)*(O.d+j)*amp,dy=Math.sin(mid)*(O.d+j)*amp;
    g.save();g.translate(f.x+dx,f.y+dy);g.rotate(O.r*amp);g.translate(-f.x,-f.y);
    g.beginPath();g.moveTo(f.x+S.cx,f.y+S.cy);for(let k=0;k<=8;k++){const a=a0+(a1-a0)*k/8;g.lineTo(f.x+S.cx+Math.cos(a)*R,f.y+S.cy+Math.sin(a)*R)}g.closePath();g.save();g.clip();_ballPC(f,t);
    g.globalAlpha=.3;g.fillStyle=S.cols[i];g.beginPath();g.arc(f.x,f.y,f.r,0,TAU);g.fill();g.restore();
    g.strokeStyle='#111';g.globalAlpha=.9;g.lineWidth=2.6;g.beginPath();g.moveTo(f.x+S.cx,f.y+S.cy);g.lineTo(f.x+S.cx+Math.cos(a0)*f.r*1.15,f.y+S.cy+Math.sin(a0)*f.r*1.15);g.stroke();
    g.strokeStyle='#f4f1ea';g.globalAlpha=.6;g.lineWidth=1;g.stroke();g.restore()}
  // 엉뚱한 자리에 눈 하나 더
  g.save();g.translate(f.x+Math.cos(S.an[1])*f.r*.45,f.y+Math.sin(S.an[1])*f.r*.45);g.rotate(S.an[0]);g.globalAlpha=amp;g.fillStyle='#f4f1ea';g.strokeStyle='#111';g.lineWidth=1.8;g.beginPath();g.moveTo(-8,0);g.quadraticCurveTo(0,-7,8,0);g.quadraticCurveTo(0,7,-8,0);g.fill();g.stroke();g.fillStyle='#111';g.beginPath();g.arc(1,0,2.6,0,TAU);g.fill();g.restore()};

// ---------- 3) ULT 걸작 · 캔버스 ----------
function pcPaper(){if(pcPaper.c&&pcPaper.A==A)return pcPaper.c;const c=document.createElement('canvas');c.width=c.height=A;const x=c.getContext('2d');x.fillStyle='#f1e7d2';x.fillRect(0,0,A,A);
  for(let i=0;i<5000;i++){x.fillStyle=Math.random()<.5?'rgba(120,90,40,.06)':'rgba(255,255,255,.12)';x.fillRect(Math.random()*A,Math.random()*A,1.5,1.5)}
  x.strokeStyle='rgba(110,80,30,.07)';x.lineWidth=1;for(let i=0;i<500;i++){const px=Math.random()*A,py=Math.random()*A,a=Math.random()*TAU,l=4+Math.random()*12;x.beginPath();x.moveTo(px,py);x.quadraticCurveTo(px+Math.cos(a+.5)*l*.5,py+Math.sin(a+.5)*l*.5,px+Math.cos(a)*l,py+Math.sin(a)*l);x.stroke()}
  x.strokeStyle='rgba(120,90,40,.035)';for(let k=0;k<A;k+=4){x.beginPath();x.moveTo(k,0);x.lineTo(k,A);x.stroke();x.beginPath();x.moveTo(0,k);x.lineTo(A,k);x.stroke()}
  const v=x.createRadialGradient(A/2,A/2,A*.3,A/2,A/2,A*.75);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(90,60,20,.28)');x.fillStyle=v;x.fillRect(0,0,A,A);pcPaper.c=c;pcPaper.A=A;return c}
function pcUlt(o,t){HZ.push({k:'pcult',o,t:0,st:[],n:0,sig:0});SFXa('pc_canvas');shake=Math.max(shake,8)}
const PC_ST=[.45,1.0,1.55,2.1],PC_DUR=.42,PC_COL=['r','b','y','k'];
function pcCurve(S,u){const v=1-u;return[v*v*S.P0[0]+2*v*u*S.C[0]+u*u*S.P1[0],v*v*S.P0[1]+2*v*u*S.C[1]+u*u*S.P1[1]]}
HZX.pcult=(h,dt,EN)=>{const o=h.o;if(o.dead&&!h.boom)return false;
  if(h.n<PC_ST.length&&h.t>=PC_ST[h.n]&&EN.length){const e=EN[h.n%EN.length],px=clamp(e.x+e.dx*e.sp*.18,30,A-30),py=clamp(e.y+e.dy*e.sp*.18,30,A-30),a=rnd(0,TAU),L=A*.75,dx=Math.cos(a),dy=Math.sin(a),bow=rnd(-90,90);
    const P0=[px-dx*L,py-dy*L],P1=[px+dx*L,py+dy*L],C=[2*px-(P0[0]+P1[0])/2-dy*bow,2*py-(P0[1]+P1[1])/2+dx*bow];
    // 지나가는 곡선이 상대를 꼭 지나도록 보정
    const S={P0,P1,C,t0:h.t,col:PCC[PC_COL[h.n%4]],w:46,hit:new Set(),br:Array.from({length:12},(_,i)=>({o:(i/11-.5)*40+rnd(-2,2),c:Math.random()<.5?1:2,w:rnd(1.2,3.4),a:rnd(.35,.8),cut:rnd(.75,1)})),pts:[]};
    const m=pcCurve(S,.5);S.P0=[P0[0]+(px-m[0]),P0[1]+(py-m[1])];S.P1=[P1[0]+(px-m[0]),P1[1]+(py-m[1])];S.C=[C[0]+(px-m[0]),C[1]+(py-m[1])];
    h.st.push(S);h.n++;SFXa('pc_brush')}
  h.st.forEach(S=>{const u=clamp((h.t-S.t0)/PC_DUR,0,1),ue=u<.5?2*u*u:1-2*(1-u)*(1-u);S.u=ue;const nP=Math.max(2,Math.floor(ue*60));S.pts=[];for(let i=0;i<=nP;i++)S.pts.push(pcCurve(S,ue*i/nP));
    const hd=S.pts[S.pts.length-1],pv=S.pts[Math.max(0,S.pts.length-3)];S.hx=hd[0];S.hy=hd[1];S.ha=Math.atan2(hd[1]-pv[1],hd[0]-pv[0]);
    if(u<1){EN.forEach(e=>{if(S.hit.has(e)||e.hid||e.jump)return;if(Math.hypot(e.x-S.hx,e.y-S.hy)<S.w*.6+e.r){S.hit.add(e);pcHit(o,e,6,e.x,e.y,0,1);e.x=clamp(e.x+Math.cos(S.ha)*34,e.r,A-e.r);e.y=clamp(e.y+Math.sin(S.ha)*34,e.r,A-e.r);
      for(let i=0;i<14;i++){const a=S.ha+rnd(-1,1),v=rnd(120,320),l=rnd(.4,.8);Pt.push({x:e.x,y:e.y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l,m:l,sh:6,col:S.col[i%3],r:rnd(3,7),fr:.06})}}})}
    else if(Math.random()<dt*6){const p=S.pts[Math.floor(rnd(0,S.pts.length))];if(p&&p[0]>0&&p[0]<A&&p[1]>0&&p[1]<A)S.dr=(S.dr||[]).concat([{x:p[0]+rnd(-S.w*.3,S.w*.3),y:p[1],t:h.t,l:rnd(14,34)}])}});
  const SG=2.65;if(h.t>=SG&&!h.sig){h.sig=1;SFXa('pc_sign')}
  if(h.t>=SG+.42&&!h.boom){h.boom=1;h.bt=h.t;SFXa('pc_splash');shake=Math.max(shake,16);FX.push({k:'frost',l:.12,m:.12,c:'#ffffff'});
    EN.forEach(e=>{if(e.hid||e.jump)return;const on=h.st.some(S=>{for(let i=1;i<S.pts.length;i++)if(segD(e.x,e.y,S.pts[i-1][0],S.pts[i-1][1],S.pts[i][0],S.pts[i][1])<S.w*.5+e.r)return true;return false});if(on)pcHit(o,e,6,e.x,e.y,0,1)});
    h.st.forEach(S=>{for(let k=0;k<12;k++){const p=S.pts[Math.floor(rnd(0,S.pts.length))];if(!p)continue;const a=rnd(0,TAU),v=rnd(80,300),l=rnd(.5,.9);Pt.push({x:p[0],y:p[1],vx:Math.cos(a)*v,vy:Math.sin(a)*v,l,m:l,sh:6,col:S.col[k%3],r:rnd(3,8),fr:.05})}})}
  return !h.boom||h.t<h.bt+.6};
function pcStroke(S,al){const P=S.pts,n=P.length;if(n<2)return;g.save();g.globalAlpha=al;g.lineCap='round';g.lineJoin='round';
  const W=i=>{const s=i/(n-1)*S.u;return S.w*(.5+.5*Math.sin(Math.PI*Math.min(1,s*1.6+.15)))*(s>.8?1-(s-.8)*1.6:1)};
  // 그림자 + 바탕색 (붓 압력에 따라 굵기 변화)
  g.strokeStyle='rgba(60,40,10,.12)';for(let i=1;i<n;i++){g.lineWidth=W(i)+4;g.beginPath();g.moveTo(P[i-1][0]+2,P[i-1][1]+3);g.lineTo(P[i][0]+2,P[i][1]+3);g.stroke()}
  g.strokeStyle=S.col[0];for(let i=1;i<n;i++){g.lineWidth=W(i);g.beginPath();g.moveTo(P[i-1][0],P[i-1][1]);g.lineTo(P[i][0],P[i][1]);g.stroke()}
  // 붓 결 (밝은 결 · 어두운 결 · 마른 붓 틈)
  const nrm=i=>{const q=P[Math.min(n-1,i+1)],p0=P[Math.max(0,i-1)];return Math.atan2(q[1]-p0[1],q[0]-p0[0])+Math.PI/2};
  S.br.forEach((b,k)=>{const lim=Math.max(2,Math.floor(n*b.cut));g.strokeStyle=k%4==3?'#f1e7d2':S.col[b.c];g.globalAlpha=al*(k%4==3?.55:b.a);g.lineWidth=b.w;g.beginPath();let pen=0;
    for(let i=0;i<lim;i++){const p=P[i],a=nrm(i),off=b.o*W(i)/S.w,x=p[0]+Math.cos(a)*off,y=p[1]+Math.sin(a)*off,on=k%4!=3||i>n*.45;if(on&&pen)g.lineTo(x,y);else if(on){g.moveTo(x,y);pen=1}}g.stroke()});
  // 붓 끝 갈라짐
  if(S.u>=1){const p=P[n-1],a=nrm(n-1);g.globalAlpha=al*.8;g.strokeStyle=S.col[0];g.lineWidth=2;for(let k=-3;k<=3;k++){const ox=Math.cos(a)*k*5,oy=Math.sin(a)*k*5,ta=a-Math.PI/2;g.beginPath();g.moveTo(p[0]+ox,p[1]+oy);g.lineTo(p[0]+ox+Math.cos(ta)*(8+((k*37)%7)*2),p[1]+oy+Math.sin(ta)*(8+((k*37)%7)*2));g.stroke()}}
  // 흘러내림
  (S.dr||[]).forEach(d=>{g.globalAlpha=al*.9;g.strokeStyle=S.col[0];g.lineWidth=4;g.beginPath();g.moveTo(d.x,d.y);g.lineTo(d.x,d.y+d.l);g.stroke();g.fillStyle=S.col[0];g.beginPath();g.arc(d.x,d.y+d.l,3.4,0,TAU);g.fill()});
  g.restore()}
HZD.pcult=h=>{const fa=h.boom?clamp(1-(h.t-h.bt)/.6,0,1):Math.min(1,h.t/.35);g.save();g.globalAlpha=fa*.93;g.drawImage(pcPaper(),0,0,A,A);
  // 캔버스 테두리 (액자)
  g.globalAlpha=fa;g.strokeStyle='#8a5a1c';g.lineWidth=10;g.strokeRect(5,5,A-10,A-10);g.strokeStyle='#e6c27a';g.lineWidth=2;g.strokeRect(10,10,A-20,A-20);g.restore();
  h.st.forEach(S=>pcStroke(S,fa));
  // 서명
  const SG=2.65;if(h.t>SG){const u=clamp((h.t-SG)/.38,0,1),P=[];for(let i=0;i<=Math.floor(70*u);i++){const s=i/70,x=A-190+s*130+Math.cos(s*TAU*5.5)*9,y=A-58+Math.sin(s*TAU*5.5)*11*(1-s*.5)-s*10;P.push([x,y])}
    if(u>.85){const v=(u-.85)/.15;for(let i=0;i<=12*v;i++)P.push([A-200+i*14,A-36+Math.sin(i*.5)*2])}
    pcLine(P,'#16161a',3,fa);if(u>=1){g.save();g.globalAlpha=fa;g.font='italic 700 18px '+FB;g.fillStyle='#8f1020';g.textAlign='right';g.fillText('Gaeun',A-30,A-26);g.restore()}}};
HZP.pcult=h=>{if(h.boom)return;const o=h.o;let S=h.st.find(S=>S.u<1),x,y,a,col;
  if(S){x=S.hx;y=S.hy;a=S.ha+Math.PI+.5;col=S.col[0]}else{const SG=2.65;if(h.t>SG&&h.t<SG+.42){const u=(h.t-SG)/.38,s=Math.min(1,u);x=A-190+s*130+Math.cos(s*TAU*5.5)*9;y=A-58+Math.sin(s*TAU*5.5)*11*(1-s*.5)-s*10;pcPencil(x,y,-1.1,.8,1);return}
    const nx=h.st[h.st.length-1];if(!nx)return;x=nx.P1[0];y=nx.P1[1];return}
  // 붓 (붓끝이 그림 위치)
  pcBrush(x,y,a+Math.PI,col,1.1,1)};

// ---------- 배지/아이콘 갱신 ----------
document.querySelectorAll('#grid .tile').forEach(t=>{const i=+t.dataset.i,vc=DEF.filter(x=>x.vof===i).length;let em=t.querySelector('.vb');if(vc){if(!em){em=document.createElement('em');em.className='vb';t.appendChild(em)}em.textContent='+'+vc}});
Object.keys(ICC).forEach(k=>delete ICC[k]);mkDict();
;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ▶ 섹션 : extra4
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ===== extra4.js : 기존 스킬 퀄리티 업그레이드 (권루티비 · 트릭 카드 · 풀오토 사격 · 중거리 슛) =====

const NEW14=['kr_charge','kr_stamp'];
NEW14.forEach(n=>{if(!SND.includes(n))SND.push(n);if(!AUD[n])AUD[n]=new SoundPool('sounds/'+n+'.mp3',3)});
Object.assign(SLB,{kr_charge:'권루티비 · L 모으기',kr_stamp:'권루티비 · L 도장 쾅'});

// ======================================================================
// 권루티비
// ======================================================================
// 네온 손 : 검지 + 엄지로 L
function krHand(D,s,al){g.save();g.scale(s,s);g.globalAlpha=al;
  neon(D,2.4,()=>{g.beginPath();g.moveTo(-7,24);g.lineTo(-11,6);g.lineTo(-11,-20);g.quadraticCurveTo(-11,-26,-6.5,-26);g.quadraticCurveTo(-2,-26,-2,-20);g.lineTo(-2,-3);
    g.quadraticCurveTo(2,-7,5,-3);g.quadraticCurveTo(8,-6,10,-1);g.lineTo(21,-1);g.quadraticCurveTo(26,-1,26,4);g.quadraticCurveTo(26,9,21,9);g.lineTo(9,9);g.lineTo(8,24);
    g.moveTo(-2,4);g.lineTo(5,4);g.moveTo(-1,12);g.lineTo(6,12)});
  g.restore()}
// 두꺼운 네온 L (빛나는 판)
function krL3(D,s,flip,al){g.save();g.scale(s*flip,s);g.globalAlpha=al;g.lineJoin='round';
  g.save();g.globalCompositeOperation='lighter';glow(D.col,0,0,46,.55);glow('#ffffff',0,0,18,.4);g.restore();
  const P=()=>{g.beginPath();g.moveTo(-13,-20);g.lineTo(-2,-20);g.lineTo(-2,5);g.lineTo(15,5);g.lineTo(15,16);g.lineTo(-13,16);g.closePath()};
  g.save();g.translate(3,4);P();g.fillStyle='rgba(0,0,0,.35)';g.fill();g.restore();
  P();const gr=g.createLinearGradient(-13,-20,15,16);gr.addColorStop(0,'#ffffff');gr.addColorStop(.35,D.hi);gr.addColorStop(1,D.col);g.fillStyle=gr;g.fill();
  g.lineWidth=3.2;g.strokeStyle=D.dk;g.stroke();g.lineWidth=1.4;g.strokeStyle='#ffffff';g.stroke();
  g.fillStyle='rgba(255,255,255,.55)';g.fillRect(-11,-18,3,30);g.restore()}

// ---------- 1) L을 가져가 ----------
krL=function(o,t){const got=(o.dlog||[]).filter(q=>clock-q[0]<4).reduce((s,q)=>s+q[1],0);o.dlog=[];const dmg=Math.round(clamp(6+got*.6,6,18)),hv=Math.round(Math.min(8,got*.35));
  const n=Math.min(12,2+Math.ceil(got/2));
  HZ.push({k:'krl',o,tg:t,t:0,dmg,hv,got,ph:0,tr:[],orbs:Array.from({length:n},(_,i)=>({a:i*TAU/n+rnd(-.3,.3),r:rnd(60,95),dl:i*.02}))});SFXa('kr_L');SFXa('kr_charge');
  ft(o.x,o.y-o.r-92,got>0?'내 L 가져가 ('+Math.round(got)+')':'L 가져가!',o.d.hi,22)};
HZX.krl=(h,dt)=>{const o=h.o;let e=h.tg;const T0=.38,T1=.78;
  if(h.ph==2)return h.t<h.dt+1.5;if(o.dead)return false;if(!e||e.dead){e=tgt(o);h.tg=e;if(!e)return false}
  const hx=o.x,hy=o.y-o.r-30;
  if(h.ph==0){h.x=hx;h.y=hy;if(h.t>=T0){h.ph=1;h.sx=hx;h.sy=hy;SFXa('kr_pass');ring(hx,hy,6,50,o.d.col,4,.3)}}
  if(h.ph==1){const u=clamp((h.t-T0)/(T1-T0),0,1),ue=u*u*(3-2*u);h.x=h.sx+(e.x-h.sx)*ue;h.y=h.sy+(e.y-e.r-6-h.sy)*ue-Math.sin(Math.PI*u)*110;
    h.tr.push([h.x,h.y]);if(h.tr.length>14)h.tr.shift();
    emit(50,dt,()=>{const l=rnd(.25,.5);Pt.push({x:h.x+rnd(-8,8),y:h.y+rnd(-8,8),vx:rnd(-40,40),vy:rnd(-40,40),l,m:l,gl:1,sh:8,col:Math.random()<.5?'#ffffff':o.d.hi,r:rnd(1.5,3),rot:rnd(0,TAU)})});
    if(u>=1){h.ph=2;h.dt=h.t;if(!e.hid&&!e.jump){hurt(e,h.dmg,o,e.x,e.y,0,h.dmg>=12);e.slow=Math.max(e.slow,1);ft(e.x,e.y-e.r-70,'L 받음 ㅋㅋ','#ffffff',24);h.st=e}
      SFXa('kr_stamp');shake=Math.max(shake,h.dmg>=12?14:9);ring(e.x,e.y-e.r-8,8,90,o.d.col,8,.4);ring(e.x,e.y-e.r-8,8,60,'#ffffff',3,.3);
      for(let i=0;i<16;i++){const a=rnd(0,TAU),v=rnd(90,260),l=rnd(.4,.8);Pt.push({x:e.x,y:e.y-e.r,vx:Math.cos(a)*v,vy:Math.sin(a)*v-40,l,m:l,sh:6,col:i%3?o.d.col:'#ffffff',r:rnd(2.5,5),gy:400,fr:.3})}
      if(h.hv>0&&!o.dead){o.hp=Math.min(100,o.hp+h.hv);ft(o.x,o.y-o.r-12,'+'+h.hv,'#7bff8a',22)}}}
  return true};
HZP.krl=h=>{const o=h.o,D=o.d,T0=.38;
  if(h.ph==0&&!o.dead){const u=clamp(h.t/.18,0,1),s=back(u);
    // 이마에 L 손 + 모여드는 L 조각들
    g.save();g.translate(o.x+o.r*.95,o.y-o.r*.4);g.rotate(-.3+Math.sin(clock*18)*.05);krHand(D,1.15*s,1);g.restore();
    h.orbs.forEach(b=>{const q=clamp((h.t-b.dl)/(T0-.05-b.dl),0,1);if(q>=1)return;const r=b.r*(1-q*q),a=b.a+q*4,x=h.x+Math.cos(a)*r,y=h.y+Math.sin(a)*r;
      g.save();g.globalCompositeOperation='lighter';glow('#ff4a5a',x,y,14,.7*(1-q*.5));glow('#ffffff',x,y,5,.9);g.restore()});
    const s2=clamp((h.t-.12)/.26,0,1);if(s2>0){g.save();g.translate(h.x,h.y);g.rotate(Math.sin(clock*10)*.1);krL3(D,(.6+Math.min(1,h.got/20)*.5)*back(s2),1,1);g.restore()}}
  if(h.ph==1){
    // 네온 꼬리
    if(h.tr.length>1){g.save();g.globalCompositeOperation='lighter';g.lineCap='round';for(let i=1;i<h.tr.length;i++){const u=i/h.tr.length;g.strokeStyle=D.col;g.globalAlpha=u*.55;g.lineWidth=2+u*16;g.beginPath();g.moveTo(h.tr[i-1][0],h.tr[i-1][1]);g.lineTo(h.tr[i][0],h.tr[i][1]);g.stroke();g.strokeStyle='#ffffff';g.globalAlpha=u*.7;g.lineWidth=1+u*4;g.stroke()}g.restore()}
    const sp=Math.cos((h.t-T0)*22);g.save();g.translate(h.x,h.y);g.rotate(Math.sin(h.t*9)*.3);krL3(D,1+Math.min(1,h.got/20)*.5,Math.abs(sp)<.12?.12*Math.sign(sp||1):sp,1);g.restore()}
  if(h.ph==2){const e=h.st;if(!e||e.dead||e.hid)return;const q=h.t-h.dt,a=clamp((1.5-q)/.35,0,1),s=q<.12?2.2-1.2*(q/.12):1+.06*Math.sin(q*14)*Math.exp(-q*3);
    g.save();g.translate(e.x,e.y-e.r-18+Math.sin(clock*5)*1.5);g.rotate(-.12+Math.sin(clock*3)*.06);g.globalAlpha=a;
    // 도장 테두리
    g.strokeStyle=D.col;g.lineWidth=3;g.globalAlpha=a*.85;g.beginPath();g.arc(0,0,26*s,0,TAU);g.stroke();g.setLineDash([3,5]);g.lineWidth=1.5;g.beginPath();g.arc(0,0,21*s,0,TAU);g.stroke();g.setLineDash([]);
    g.font='700 7px '+FB;g.fillStyle=D.hi;g.textAlign='center';g.textBaseline='middle';for(let i=0;i<8;i++){const an=i*TAU/8+q*.6;g.save();g.rotate(an);g.translate(0,-23.5*s);g.fillText('L',0,0);g.restore()}
    krL3(D,.72*s,1,a);g.restore()}};

// ---------- 2) 측면 대 측면 : 디스코 무대 ----------
const KRC=['#5ce06a','#3f8cff','#ff5c8a','#ffd84a','#b48cff'];
HZD.krdance=h=>{const e=h.tg,o=h.o;if(!e||e.dead||o.dead||h.t>1.9)return;const D=1.7,fa=Math.min(1,h.t/.2)*clamp((1.9-h.t)/.25,0,1),bt=Math.floor(Math.max(0,h.t-.35)/.4),bp=h.t<.35?0:1-((h.t-.35)%.4)/.4;
  const cx=(h.bx+h.ox)/2,cy=(h.by+h.oy)/2,L=Math.hypot(h.bx-h.ox,h.by-h.oy)+150,W=150,ts=25;
  g.save();g.translate(cx,cy);g.rotate(h.a);g.globalAlpha=fa;
  g.fillStyle='rgba(10,8,20,.6)';g.fillRect(-L/2-6,-W/2-6,L+12,W+12);
  g.beginPath();g.rect(-L/2,-W/2,L,W);g.save();g.clip();
  for(let i=0;i*ts<L;i++)for(let j=0;j*ts<W;j++){const c=KRC[(i*2+j+bt)%KRC.length],on=((i+j+bt)%3==0);g.fillStyle=c;g.globalAlpha=fa*(on?.25+.45*bp:.08);g.fillRect(-L/2+i*ts+1.5,-W/2+j*ts+1.5,ts-3,ts-3)}
  g.restore();g.globalAlpha=fa;g.lineWidth=3;g.strokeStyle=o.d.col;g.save();g.globalCompositeOperation='lighter';g.globalAlpha=fa*.5;g.lineWidth=9;g.strokeRect(-L/2,-W/2,L,W);g.restore();g.strokeRect(-L/2,-W/2,L,W);g.restore();
  // 조명
  g.save();g.globalCompositeOperation='lighter';[[0,o],[A,e]].forEach(([sx,f],k)=>{const sw=Math.sin(clock*2.4+k*2)*30,tx=f.x+sw,ty=f.y,a0=Math.atan2(ty+20,tx-sx),gr=g.createLinearGradient(sx,-20,tx,ty);gr.addColorStop(0,'rgba(255,255,255,.0)');gr.addColorStop(1,KRC[(bt+k*2)%5]+'55');
    g.fillStyle=gr;g.globalAlpha=fa*(.6+.4*bp);g.beginPath();g.moveTo(sx,-20);g.lineTo(tx-Math.sin(a0)*55,ty+Math.cos(a0)*55);g.lineTo(tx+Math.sin(a0)*55,ty-Math.cos(a0)*55);g.closePath();g.fill();glow(KRC[(bt+k*2)%5],tx,ty+8,70,.35*fa)});g.restore()};
function krBubble(x,y,txt,col,s,al){g.save();g.translate(x,y);g.scale(s,s);g.globalAlpha=al;g.font='700 17px '+FB;const w=g.measureText(txt).width+22;
  g.fillStyle='#ffffff';g.strokeStyle=col;g.lineWidth=3;g.lineJoin='round';g.beginPath();g.moveTo(-w/2+10,-15);g.lineTo(w/2-10,-15);g.quadraticCurveTo(w/2,-15,w/2,-5);g.lineTo(w/2,3);g.quadraticCurveTo(w/2,13,w/2-10,13);g.lineTo(6,13);g.lineTo(0,21);g.lineTo(-4,13);g.lineTo(-w/2+10,13);g.quadraticCurveTo(-w/2,13,-w/2,3);g.lineTo(-w/2,-5);g.quadraticCurveTo(-w/2,-15,-w/2+10,-15);g.fill();g.stroke();
  g.fillStyle='#14161d';g.textAlign='center';g.textBaseline='middle';g.fillText(txt,0,-1);g.restore()}
HZP.krdance=h=>{const e=h.tg,o=h.o;if(!e||e.dead||o.dead||h.t>1.7)return;const fa=Math.min(1,h.t/.2),bt=Math.floor(Math.max(0,h.t-.35)/.4),bq=h.t<.35?1:((h.t-.35)%.4)/.4;
  // 춤 리본
  g.save();g.globalCompositeOperation='lighter';g.lineCap='round';for(let k=0;k<2;k++){g.strokeStyle=k?'#ffffff':o.d.col;g.globalAlpha=fa*(k?.8:.45);g.lineWidth=k?2:7;g.beginPath();for(let i=0;i<=24;i++){const u=i/24,x=o.x+(e.x-o.x)*u,y=o.y+(e.y-o.y)*u,nx=-(e.y-o.y),ny=e.x-o.x,nl=Math.hypot(nx,ny)||1,w=Math.sin(u*Math.PI*3+clock*10)*10*Math.sin(u*Math.PI);i?g.lineTo(x+nx/nl*w,y+ny/nl*w):g.moveTo(x,y)}g.stroke()}g.restore();
  // 이퀄라이저
  [o,e].forEach((f,k)=>{g.save();g.translate(f.x,f.y+f.r+10);for(let i=0;i<5;i++){const hh=6+Math.abs(Math.sin(clock*12+i*1.7+k))*16*(1-bq*.5);g.fillStyle=KRC[(i+bt)%5];g.globalAlpha=fa*.9;g.fillRect(-15+i*6.5,-hh,5,hh)}g.restore()});
  // 구령 말풍선
  if(h.t>.3){const who=bt%2,f=who?e:o,txt=who?'대 측면!':'측면!',s=back(clamp(bq/.25,0,1));krBubble(f.x,f.y-f.r-38,txt,o.d.col,s,fa)}};

// ---------- 3) ULT 크리스 크로스 셀카 ----------
const _krultX=HZX.krult;HZX.krult=(h,dt,EN,t)=>{const n0=h.lines.length,r=_krultX(h,dt,EN,t);if(h.lines.length>n0){const L=h.lines[h.lines.length-1];L.de=h.tg&&h.tg.d;L.side=n0%2?1:-1}
  if(h.ph==3&&!h.tear&&h.px!=null){h.tear={t:h.t,x:h.px,y:h.py,d:h.pe&&h.pe.d}}return r};
HZD.krult=h=>{const D=h.o.d;h.lines.forEach(L=>{const q=h.t-L.t,a=clamp(1-q/.65,0,1);if(a<=0)return;const mx=(L.x1+L.x2)/2,my=(L.y1+L.y2)/2,nx=-(L.y2-L.y1),ny=L.x2-L.x1,nl=Math.hypot(nx,ny)||1,b=Math.min(90,nl*.3);
  g.save();g.globalCompositeOperation='lighter';g.lineCap='round';
  [[1,D,L.x1,L.y1,L.x2,L.y2],[-1,L.de||D,L.x2,L.y2,L.x1,L.y1]].forEach(([sd,DD,x1,y1,x2,y2])=>{const cx=mx+nx/nl*b*sd,cy=my+ny/nl*b*sd;
    [[DD.col,16*a+2,.5],['#ffffff',4*a+1,.9]].forEach(([c,w,al])=>{g.strokeStyle=c;g.globalAlpha=a*al;g.lineWidth=w;g.beginPath();g.moveTo(x1,y1);g.quadraticCurveTo(cx,cy,x2,y2);g.stroke()});
    g.globalCompositeOperation='source-over';for(let k=1;k<4;k++){const u=k/4,v=1-u,x=v*v*x1+2*v*u*cx+u*u*x2,y=v*v*y1+2*v*u*cy+u*u*y2,sz=40;g.globalAlpha=a*(.25+u*.25);g.drawImage(ICON(DD,52),x-sz/2,y-sz/2,sz,sz)}g.globalCompositeOperation='lighter'});
  g.globalAlpha=a;g.translate(mx,my);g.rotate(q*6);const s=1+q*.8;g.lineWidth=6*a+1;g.strokeStyle=D.hi;g.beginPath();g.moveTo(-20*s,-20*s);g.lineTo(20*s,20*s);g.moveTo(20*s,-20*s);g.lineTo(-20*s,20*s);g.stroke();glow(D.col,0,0,40*s,.5*a);g.restore()})};
function krPhone(D,al){g.save();g.globalAlpha=al;g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.ellipse(4,40,22,6,0,0,TAU);g.fill();
  g.fillStyle='#14161d';g.strokeStyle='#5a6070';g.lineWidth=2;g.beginPath();g.roundRect?g.roundRect(-20,-36,40,72,8):g.rect(-20,-36,40,72);g.fill();g.stroke();
  const sg=g.createLinearGradient(0,-31,0,31);sg.addColorStop(0,'#2a3a4a');sg.addColorStop(1,'#0d1218');g.fillStyle=sg;g.fillRect(-17,-31,34,62);
  g.fillStyle=D.col;g.globalAlpha=al*.9;g.beginPath();g.arc(0,22,6,0,TAU);g.fill();g.strokeStyle='#ffffff';g.lineWidth=1.5;g.beginPath();g.arc(0,22,8,0,TAU);g.stroke();
  g.fillStyle='#ff3b4a';g.beginPath();g.arc(-11,-26,2,0,TAU);g.fill();g.fillStyle='#ffffff';g.font='700 6px '+FB;g.textAlign='left';g.fillText('REC',-8,-24);
  g.globalAlpha=al;g.fillStyle='#000';g.fillRect(-6,-35,12,3);g.restore()}
HZP.krult=h=>{const o=h.o,D=o.d,e=h.pe||h.tg;
  if(h.ph==1&&!o.dead&&e&&!e.dead){const u=clamp((h.t-1.45)/.2,0,1),s=back(u);
    g.save();g.translate(o.x+34,o.y-o.r-36);g.rotate(-.15+Math.sin(clock*4)*.04);g.scale(s,s);krPhone(D,1);g.restore();
    // 뷰파인더
    const q=clamp((h.t-1.45)/.45,0,1),R=120-62*(1-Math.pow(1-q,3));g.save();g.translate(e.x,e.y);g.globalAlpha=u;g.strokeStyle='#ffffff';g.lineWidth=3;g.lineCap='round';
    [[-1,-1],[1,-1],[1,1],[-1,1]].forEach(([sx,sy])=>{g.beginPath();g.moveTo(sx*R,sy*R*.8);g.lineTo(sx*R,sy*(R*.8-16));g.moveTo(sx*R,sy*R*.8);g.lineTo(sx*(R-16),sy*R*.8);g.stroke()});
    g.lineWidth=1;g.globalAlpha=u*.35;g.beginPath();[-1,1].forEach(k=>{g.moveTo(k*R/3,-R*.8);g.lineTo(k*R/3,R*.8);g.moveTo(-R,k*R*.8/3);g.lineTo(R,k*R*.8/3)});g.stroke();
    g.globalAlpha=u;g.strokeStyle=q>.85?'#7bff8a':'#ffd84a';g.lineWidth=2;g.strokeRect(-e.r-6,-e.r-6,e.r*2+12,e.r*2+12);
    const cd=3-Math.floor(q*3);if(q<1){g.font='900 34px '+FD;g.textAlign='center';g.textBaseline='middle';g.lineWidth=6;g.strokeStyle='#000';g.strokeText(cd,0,-R*.8-24);g.fillStyle='#ffffff';g.fillText(cd,0,-R*.8-24)}
    if(Math.floor(clock*4)%2){g.fillStyle='#ff3b4a';g.beginPath();g.arc(-R+10,-R*.8+12,4,0,TAU);g.fill();g.font='700 10px '+FB;g.fillStyle='#ffffff';g.textAlign='left';g.fillText('REC',-R+18,-R*.8+12)}
    g.restore()}
  // 폴라로이드
  if(h.ph==2&&h.pe&&!h.pe.dead){const p=h.pe,q=h.t-h.ft,s=back(clamp(q/.15,0,1)),dev=clamp(q/.6,0,1);g.save();g.translate(h.px,h.py+10);g.rotate(-.08);g.scale(s,s);krPolaroid(p.d,D,dev,0,0);g.restore()}
  if(h.tear){const q=h.t-h.tear.t;if(q<1.3){const a=clamp((1.3-q)/.4,0,1);[-1,1].forEach(sd=>{g.save();g.translate(h.tear.x+sd*(q*120),h.tear.y+10+q*q*260-q*60);g.rotate(-.08+sd*q*1.8);g.globalAlpha=a;
      g.beginPath();krTearPath(sd);g.clip();krPolaroid(h.tear.d,D,1,sd,1);g.restore()})}}};
function krTearPath(sd){const P=[[0,-66],[5,-50],[-4,-38],[6,-22],[-3,-8],[5,6],[-5,20],[4,34],[-3,48],[3,66]];g.moveTo(P[0][0],P[0][1]);P.forEach(([x,y])=>g.lineTo(x,y));g.lineTo(sd*90,66);g.lineTo(sd*90,-66);g.closePath()}
function krPolaroid(pd,D,dev,sd,torn){g.fillStyle='rgba(0,0,0,.3)';g.fillRect(-52,-58,110,132);
  g.fillStyle='#fbfaf6';g.fillRect(-55,-62,110,130);g.strokeStyle='#d8d3c6';g.lineWidth=1;g.strokeRect(-55,-62,110,130);
  // 사진 칸 (현상되는 중)
  g.save();g.beginPath();g.rect(-47,-54,94,94);g.clip();g.fillStyle='rgba(28,26,30,'+(.9*dev)+')';g.fillRect(-47,-54,94,94);
  g.globalAlpha=.25*dev;g.fillStyle=D.col;g.fillRect(-47,-54,94,94);g.globalAlpha=1;
  if(pd){g.globalAlpha=.25+.75*dev;g.drawImage(ICON(pd,52),-30,-37,60,60);g.globalAlpha=1;g.fillStyle='rgba(150,100,50,.18)';g.fillRect(-47,-54,94,94)}
  g.fillStyle='rgba(255,236,190,'+(.85*(1-dev))+')';g.fillRect(-47,-54,94,94);
  // 낙서 (L 표시 · ㅋㅋ)
  if(dev>.5){const a=(dev-.5)*2;g.globalAlpha=a;g.strokeStyle=D.col;g.lineWidth=3.5;g.lineCap='round';g.lineJoin='round';g.beginPath();g.moveTo(-10,-40);g.lineTo(-10,-22);g.lineTo(2,-22);g.stroke();
    g.font='700 14px '+FB;g.fillStyle='#ffd84a';g.textAlign='left';g.fillText('ㅋㅋ',14,-34);g.strokeStyle='#ff5c8a';g.lineWidth=2.5;g.beginPath();g.arc(-30,24,9,0,TAU);g.stroke()}
  g.restore();g.font='700 11px '+FB;g.fillStyle='#3a3a44';g.textAlign='center';g.textBaseline='middle';g.fillText('권루티비 ♥ 셀카',0,54)}
FXD.krflash=x=>{const p=1-x.l/x.m;g.save();g.globalAlpha=(1-p)*.95;g.fillStyle='#ffffff';g.fillRect(-300,-300,A+600,A+600);g.restore()};

// ======================================================================
// 흉악범 : 트릭 카드 (진짜 트럼프 카드처럼 뒤집히며 날아감)
// ======================================================================
const SUIT=['♥','♦','♠','♣'],RANK=['A','K','Q','J'];
BUL.card=q=>{const D=q.D;if(q.su==null){q.su=Math.floor(rnd(0,4));q.rk=Math.floor(rnd(0,4))}
  g.rotate(q.a+Math.PI/2+Math.sin(q.age*6)*.25);g.save();g.globalCompositeOperation='lighter';glow(D.col,0,0,30,.55);g.restore();
  const fl=Math.cos(q.age*20),sx=Math.max(.08,Math.abs(fl));g.scale(sx*1.15,1.15);
  g.fillStyle='rgba(0,0,0,.3)';g.fillRect(-9,-12,20,28);
  g.beginPath();g.roundRect?g.roundRect(-10,-14,20,28,3):g.rect(-10,-14,20,28);
  if(fl>0){g.fillStyle='#fffdf8';g.fill();g.strokeStyle='#1a0a10';g.lineWidth=1.2;g.stroke();const red=q.su<2;g.fillStyle=red?'#d81b3a':'#14161d';
    g.font='700 7px '+FB;g.textAlign='center';g.textBaseline='middle';g.fillText(RANK[q.rk],-6,-9);g.save();g.translate(6,9);g.rotate(Math.PI);g.fillText(RANK[q.rk],0,0);g.restore();g.font='14px '+FB;g.fillText(SUIT[q.su],0,1)}
  else{g.fillStyle='#8a0f2a';g.fill();g.strokeStyle='#ffd27a';g.lineWidth=1.4;g.stroke();g.save();g.clip();g.strokeStyle='rgba(255,210,122,.45)';g.lineWidth=1;for(let k=-28;k<28;k+=5){g.beginPath();g.moveTo(k,-14);g.lineTo(k+28,14);g.moveTo(k,14);g.lineTo(k+28,-14);g.stroke()}g.restore();g.strokeStyle='#ffd27a';g.strokeRect(-7,-11,14,22)}};
TRL.card=(q,dt)=>{emit(16,dt,()=>petalP(q.x,q.y,rnd(-30,30),rnd(-30,30)));emit(30,dt,()=>{const l=rnd(.2,.4);Pt.push({x:q.x+rnd(-4,4),y:q.y+rnd(-4,4),vx:-q.vx*.1+rnd(-20,20),vy:-q.vy*.1+rnd(-20,20),l,m:l,gl:1,sh:8,col:Math.random()<.5?'#ffd27a':'#ffffff',r:rnd(1.2,2.4),rot:rnd(0,TAU)})})};

// ======================================================================
// 김티비 : 풀오토 사격 / 레디언트 : 총알 (총구 화염 · 탄피 · 밝은 예광탄)
// ======================================================================
function gunTr(q){const hs=q.k=='hs',c=hs?'#ff4655':q.D.col;g.rotate(q.a);
  g.save();g.globalCompositeOperation='lighter';g.save();g.scale(hs?5:3.2,.55);glow(c,-8,0,14,.9);g.restore();
  const gr=g.createLinearGradient(-46,0,8,0);gr.addColorStop(0,'rgba(255,255,255,0)');gr.addColorStop(.7,hs?'rgba(255,120,130,.9)':'rgba(255,230,170,.9)');gr.addColorStop(1,'#ffffff');
  g.strokeStyle=gr;g.lineWidth=hs?4:3;g.lineCap='round';g.beginPath();g.moveTo(-46,0);g.lineTo(8,0);g.stroke();glow('#ffffff',6,0,7,1);g.restore()}
BUL.tracer=q=>gunTr(q);BUL.hs=q=>gunTr(q);
const gunTRL=(q,dt)=>{if(!q.mz){q.mz=1;const o=q.o,a=q.a,mx=q.x,my=q.y;
    for(let i=0;i<5;i++){const aa=a+rnd(-.35,.35),v=rnd(120,320),l=rnd(.06,.12);Pt.push({x:mx,y:my,vx:Math.cos(aa)*v,vy:Math.sin(aa)*v,l,m:l,gl:1,sh:4,pal:PAL.fire,r:rnd(6,11)})}
    Pt.push({x:mx,y:my,vx:0,vy:0,l:.07,m:.07,gl:1,sh:4,col:'#ffffff',r:16});
    if(o){const pa=a+Math.PI/2*(Math.random()<.5?1:-1),v=rnd(90,160);Pt.push({x:mx-Math.cos(a)*8,y:my-Math.sin(a)*8,vx:Math.cos(pa)*v,vy:Math.sin(pa)*v-60,l:.6,m:.6,sh:2,col:'#e2b04a',r:3,rot:rnd(0,TAU),vr:rnd(-20,20),gy:420,fr:.3})}}
  if(q.k=='hs')emit(40,dt,()=>Pt.push({x:q.x,y:q.y,vx:0,vy:0,l:.15,m:.15,gl:1,sh:4,col:'#ff4655',r:rnd(5,8)}))};
TRL.tracer=gunTRL;TRL.hs=gunTRL;

// ======================================================================
// 해버지 : 중거리 슛 (불붙은 무회전 슛)
// ======================================================================
BUL.fball=q=>{const D=q.D,a=q.a;g.save();g.rotate(a);
  g.save();g.globalCompositeOperation='lighter';g.save();g.scale(3,.8);glow('#ff8a2c',-12,0,24,.6);g.restore();glow('#fff6d0',0,0,20,.7);g.restore();
  // 불꼬리
  const fl=Math.sin(q.age*40),L=95;const gr=g.createLinearGradient(-L,0,0,0);gr.addColorStop(0,'rgba(255,60,20,0)');gr.addColorStop(.5,'rgba(255,120,30,.7)');gr.addColorStop(1,'rgba(255,240,200,.95)');
  g.fillStyle=gr;g.beginPath();g.moveTo(4,-q.r*1.05);g.quadraticCurveTo(-L*.4,-q.r*1.4-fl*3,-L,fl*4);g.quadraticCurveTo(-L*.4,q.r*1.4+fl*3,4,q.r*1.05);g.closePath();g.fill();
  g.globalCompositeOperation='lighter';g.strokeStyle='rgba(255,255,255,.7)';g.lineWidth=2;[-.5,0,.5].forEach(k=>{g.beginPath();g.moveTo(-4,k*q.r);g.lineTo(-L*.75,k*q.r*1.6+fl*3);g.stroke()});g.restore();
  g.save();g.rotate(q.age*30);socBall(q.r*1.45);g.restore()};
TRL.fball=(q,dt)=>{emit(70,dt,()=>fireP(q.x-q.vx*.02+rnd(-5,5),q.y-q.vy*.02+rnd(-5,5),-q.vx*.12+rnd(-30,30),-q.vy*.12+rnd(-30,30),rnd(7,12),rnd(.2,.38)));
  emit(14,dt,()=>smokeP(q.x,q.y,rnd(5,9),rnd(.4,.7)));emit(30,dt,()=>{const l=rnd(.15,.3);Pt.push({x:q.x,y:q.y,vx:-q.vx*.2+rnd(-30,30),vy:-q.vy*.2+rnd(-30,30),l,m:l,gl:1,sh:5,col:'#ffffff',r:1.8,fr:.1})})};
;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ▶ 섹션 : extra5
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ===== extra5.js : 흉악범 • 킬러 (청부업자 · 쌍권총) =====

const NEW15=['jw_shot','jw_rack','jw_coin','jw_throw','jw_mark','jw_ult','jw_kata','jw_final','jw_casing'];
NEW15.forEach(n=>{if(!SND.includes(n))SND.push(n);if(!AUD[n])AUD[n]=new SoundPool('sounds/'+n+'.mp3',n=='jw_shot'||n=='jw_kata'||n=='jw_casing'?6:3)});
Object.assign(SLB,{jw_shot:'킬러 · 소음기 총성',jw_rack:'킬러 · 장전',jw_coin:'킬러 · 금화 튕기기',jw_throw:'킬러 · 메치기',jw_mark:'킬러 · 계약 표식',jw_ult:'킬러 · 궁 시작',jw_kata:'킬러 · 건카타 연사',jw_final:'킬러 · 마지막 한 발',jw_casing:'킬러 · 탄피'});
const JWSK=[
  {n:'건-푸',w:.3,cd:8,c:(o,t)=>!t.hid&&!t.jump&&dist(o,t)<380,f:(o,t)=>jwFu(o,t)},
  {n:'금화 · 청부 계약',w:.35,cd:10,c:(o,t)=>!t.hid&&dist(o,t)<560,f:(o,t)=>jwCoin(o,t)},
  {n:'콘티넨탈 · 처형',w:.6,ult:1,c:(o,t)=>!t.hid&&!t.jump,f:(o,t)=>jwUlt(o,t)}];
DEF.push({name:'흉악범 • 킬러',gl:'킬',k:'wick',vof:5,r:25,sp:228,col:'#d4af37',hi:'#fff4d0',dk:'#141414',alt:{col:'#e0245e',hi:'#ffd6e2',dk:'#2a0610'},alt2:{col:'#6fa8ff',hi:'#e2eeff',dk:'#0a1830'},sk:JWSK});
INFO['흉악범 • 킬러']={st:[9,6,8,8,5,10],p:'방탄 슈트 · 받는 피해 10% 감소',
  sk:[['3+2.5×2','순식간에 파고들어 업어치기로 바닥에 메친 뒤 쌍권총 두 발 · 메쳐지면 잠깐 기절'],['3 + 1.5×4','금화를 튕겨 청부 계약 · 4초 동안 표식이 붙고 레이저 조준선을 따라 소음기 총알이 계속 날아감'],['1×16+8','어두운 클럽 조명 속 건카타 · 상대 주위를 순간이동하며 여덟 번 쏘고, 마지막은 슬로모션 한 발 (쌍권총이라 한 번에 두 발씩)']]};

// ---------- 패시브 : 방탄 슈트 ----------
const _hurtJW=hurt;hurt=function(t,n){if(t&&t.d&&t.d.k=='wick'&&n>0){const a=[...arguments];a[1]=Math.round(n*.9*10)/10;return _hurtJW.apply(this,a)}return _hurtJW.apply(this,arguments)};

// ---------- 그림 : 소음기 권총 ----------
function jwGun(s,fl){g.save();g.scale(s,s);g.lineJoin='round';
  g.fillStyle='rgba(0,0,0,.35)';g.fillRect(-8,3,40,4);
  // 손잡이
  g.fillStyle='#1b1b1f';g.strokeStyle='#000';g.lineWidth=1;g.beginPath();g.moveTo(-7,0);g.lineTo(-2,0);g.lineTo(-4,10);g.lineTo(-10,10);g.closePath();g.fill();g.stroke();
  g.strokeStyle='#3a3a42';g.beginPath();g.moveTo(-8,3);g.lineTo(-4,3);g.moveTo(-8.5,6);g.lineTo(-4.5,6);g.stroke();
  // 슬라이드
  const sg=g.createLinearGradient(0,-4,0,2);sg.addColorStop(0,'#6a6d78');sg.addColorStop(.4,'#2a2c33');sg.addColorStop(1,'#111216');g.fillStyle=sg;g.fillRect(-9,-4,20,6);g.strokeStyle='#000';g.strokeRect(-9,-4,20,6);
  g.strokeStyle='#4a4d58';for(let i=0;i<4;i++){g.beginPath();g.moveTo(-7+i*1.6,-3.5);g.lineTo(-7+i*1.6,1.5);g.stroke()}
  g.fillStyle='#d4af37';g.fillRect(4,-4.6,2,1);
  // 소음기
  const cg=g.createLinearGradient(0,-3,0,3);cg.addColorStop(0,'#5a5d66');cg.addColorStop(.5,'#25272d');cg.addColorStop(1,'#0c0d10');g.fillStyle=cg;g.fillRect(11,-3.2,15,5.4);g.strokeRect(11,-3.2,15,5.4);
  g.strokeStyle='rgba(255,255,255,.12)';g.beginPath();g.moveTo(12,-2.4);g.lineTo(25,-2.4);g.stroke();
  if(fl>0){g.save();g.globalCompositeOperation='lighter';glow('#ffcf6a',30,-.5,18*fl,.9);g.fillStyle='rgba(255,240,200,'+fl+')';g.beginPath();for(let i=0;i<8;i++){const a=i*TAU/8,r=i%2?3:9*fl;g.lineTo(30+Math.cos(a)*r,-.5+Math.sin(a)*r*.6)}g.closePath();g.fill();g.restore()}
  g.restore()}
// 양손 권총 (o 기준, 조준 방향 a)
function jwDual(o,a,fl1,fl2,s){[-1,1].forEach((sd,k)=>{const px=o.x+Math.cos(a)*(o.r*.55)-Math.sin(a)*sd*o.r*.75,py=o.y+Math.sin(a)*(o.r*.55)+Math.cos(a)*sd*o.r*.75;g.save();g.translate(px,py);g.rotate(a+sd*.05);if(Math.cos(a)<0)g.scale(1,-1);jwGun((s||1)*1.3,k?fl2:fl1);g.restore()})}
function jwMuzzle(o,a,sd){return[o.x+Math.cos(a)*(o.r*.55+39)-Math.sin(a)*sd*o.r*.75,o.y+Math.sin(a)*(o.r*.55+39)+Math.cos(a)*sd*o.r*.75]}
function jwCasing(x,y,a){const pa=a+Math.PI/2+rnd(-.4,.4),v=rnd(90,170);Pt.push({x,y,vx:Math.cos(pa)*v,vy:Math.sin(pa)*v-70,l:.7,m:.7,sh:2,col:'#e2b04a',r:2.6,rot:rnd(0,TAU),vr:rnd(-24,24),gy:460,fr:.3})}
function jwShot(o,e,sd,dmg,list){const a=Math.atan2(e.y-o.y,e.x-o.x),[mx,my]=jwMuzzle(o,a,sd);list.push({x1:mx,y1:my,x2:e.x+rnd(-4,4),y2:e.y+rnd(-4,4),t:0});
  jwCasing(o.x,o.y,a);for(let i=0;i<4;i++){const aa=a+rnd(-.3,.3),v=rnd(80,220),l=rnd(.05,.1);Pt.push({x:mx,y:my,vx:Math.cos(aa)*v,vy:Math.sin(aa)*v,l,m:l,gl:1,sh:4,pal:PAL.fire,r:rnd(5,9)})}
  if(dmg){hurt(e,dmg,o,e.x,e.y,0,0);for(let i=0;i<6;i++){const aa=a+Math.PI+rnd(-.8,.8),v=rnd(80,240),l=rnd(.15,.3);Pt.push({x:e.x,y:e.y,vx:-Math.cos(aa)*v*-1,vy:-Math.sin(aa)*v*-1,l,m:l,gl:1,sh:5,col:'#ffcf6a',r:1.6,fr:.1})}}}
function jwTracers(list,dt){list.forEach(q=>q.t+=dt);return list.filter(q=>q.t<.1)}
function jwDrawTr(list){g.save();g.globalCompositeOperation='lighter';g.lineCap='round';list.forEach(q=>{const a=1-q.t/.1;g.strokeStyle='rgba(255,220,150,'+(.8*a)+')';g.lineWidth=3;g.beginPath();g.moveTo(q.x1,q.y1);g.lineTo(q.x2,q.y2);g.stroke();g.strokeStyle='rgba(255,255,255,'+a+')';g.lineWidth=1.2;g.stroke()});g.restore()}

// ---------- 아이콘 (네온 쌍권총 + 금화) ----------
EMB.wick=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*2)*.04);
  const gun=()=>{g.moveTo(-12,-3);g.lineTo(4,-3);g.lineTo(4,-2);g.lineTo(16,-2);g.lineTo(16,2);g.lineTo(4,2);g.lineTo(2,2);g.lineTo(-3,2);g.lineTo(-6,11);g.lineTo(-11,11);g.lineTo(-8,2);g.lineTo(-12,2);g.closePath()};
  [[-1,.75],[1,-.75]].forEach(([sd,r])=>{g.save();g.rotate(r);g.scale(sd,1);neon(D,1.6,()=>{g.beginPath();gun()});g.restore()});
  neon({col:'#ffcf6a',hi:'#fff4d0'},1.4,()=>{g.beginPath();g.arc(0,13,4.5,0,TAU)});
  g.save();g.globalCompositeOperation='lighter';glow(D.col,0,0,16,.4);g.restore()};

// ---------- 1) 건-푸 : 파고들어 메치고 두 발 ----------
function jwFu(o,t){HZ.push({k:'jwfu',o,tg:t,t:0,sx:o.x,sy:o.y,tr:[],trs:[],ph:0});SFXa('jw_rack')}
HZX.jwfu=(h,dt)=>{const o=h.o,e=h.tg;if(o.dead||!e||e.dead)return false;o.gcd=Math.max(o.gcd,.3);o.cast=null;h.trs=jwTracers(h.trs,dt);
  const D0=.2,T0=.24,T1=.56;
  if(h.t<D0){const u=h.t/D0,ue=1-Math.pow(1-u,3),a=Math.atan2(e.y-h.sy,e.x-h.sx),d=Math.hypot(e.x-h.sx,e.y-h.sy)-o.r-e.r-4;o.x=clamp(h.sx+Math.cos(a)*d*ue,o.r,A-o.r);o.y=clamp(h.sy+Math.sin(a)*d*ue,o.r,A-o.r);h.tr.push({x:o.x,y:o.y,t:h.t})}
  else if(h.ph==0){h.ph=1;SFXa('jw_throw');h.pa=Math.atan2(e.y-o.y,e.x-o.x);h.cx=o.x;h.cy=o.y;e.stn=Math.max(e.stn,.9);e.cast=null}
  if(h.ph==1){o.x=h.cx;o.y=h.cy;const u=clamp((h.t-T0)/(T1-T0),0,1),ue=u*u,R=o.r+e.r+4,an=h.pa+Math.PI*ue;e.x=clamp(h.cx+Math.cos(an)*R,e.r,A-e.r);e.y=clamp(h.cy+Math.sin(an)*R,e.r,A-e.r);e.sq=.6;e.sa=an;
    if(u>=1){h.ph=2;hurt(e,3,o,e.x,e.y,0,1);e.stn=Math.max(e.stn,.45);shake=Math.max(shake,12);hs=.08;ring(e.x,e.y,8,80,'#ffffff',6,.35);spark(e.x,e.y,'dust',16,240);FX.push({k:'crack',x:e.x,y:e.y,r:40,l:1.4,m:1.4});h.st=h.t}}
  if(h.ph>=2){o.x=h.cx;o.y=h.cy;const a=Math.atan2(e.y-o.y,e.x-o.x);h.aim=a;
    if(h.ph==2&&h.t>=h.st+.12){h.ph=3;SFXa('jw_shot');jwShot(o,e,-1,2.5,h.trs);h.f1=.08}
    if(h.ph==3&&h.t>=h.st+.26){h.ph=4;SFXa('jw_shot');jwShot(o,e,1,2.5,h.trs);h.f2=.08;SFXa('jw_casing')}}
  h.f1=Math.max(0,(h.f1||0)-dt);h.f2=Math.max(0,(h.f2||0)-dt);h.tr=h.tr.filter(q=>h.t-q.t<.3);
  return h.ph<4||h.t<h.st+.6};
HZD.jwfu=h=>{const o=h.o;h.tr.forEach(q=>{const a=1-(h.t-q.t)/.3;g.save();g.globalAlpha=a*.35;g.drawImage(ICON(o.d,52),q.x-o.r*1.1,q.y-o.r*1.1,o.r*2.2,o.r*2.2);g.restore()})};
HZP.jwfu=h=>{const o=h.o,e=h.tg;if(o.dead||!e)return;const a=h.aim!=null?h.aim:Math.atan2(e.y-o.y,e.x-o.x);jwDrawTr(h.trs);jwDual(o,a,h.f1/.08,h.f2/.08,1.05)};

// ---------- 2) 금화 · 청부 계약 ----------
function jwCoin(o,t){HZ.push({k:'jwcoin',o,tg:t,t:0,sx:o.x,sy:o.y-o.r,ph:0,trs:[],nx:0,n:0});SFXa('jw_coin')}
HZX.jwcoin=(h,dt)=>{const o=h.o;let e=h.tg;if(o.dead)return false;if(!e||e.dead){if(h.ph==0){e=tgt(o);h.tg=e;if(!e)return false}else return h.t<h.mt+.3}h.trs=jwTracers(h.trs,dt);
  const FT=.45,MD=4;
  if(h.ph==0){const u=clamp(h.t/FT,0,1);h.x=h.sx+(e.x-h.sx)*u;h.y=h.sy+(e.y-e.r-h.sy)*u-Math.sin(Math.PI*u)*120;
    if(u>=1){h.ph=1;h.mt=h.t;if(!e.hid&&!e.jump){hurt(e,3,o,e.x,e.y,0,0);SFXa('jw_mark');ring(e.x,e.y,6,70,'#d4af37',5,.4);for(let i=0;i<10;i++){const a=rnd(0,TAU);Pt.push({x:e.x,y:e.y-e.r,vx:Math.cos(a)*140,vy:Math.sin(a)*140,l:.4,m:.4,gl:1,sh:8,col:'#ffcf6a',r:2.5,rot:a})}}else{h.ph=2}}}
  if(h.ph==1){if(h.t>h.mt+MD||e.hid)return false;h.aim=Math.atan2(e.y-o.y,e.x-o.x);
    if(h.t>=h.mt+.5+h.n*.8&&h.n<4){h.n++;const sd=h.n%2?-1:1;SFXa('jw_shot');jwShot(o,e,sd,1.5,h.trs);h['f'+(sd<0?1:2)]=.08;if(h.n%2==0)SFXa('jw_casing')}}
  h.f1=Math.max(0,(h.f1||0)-dt);h.f2=Math.max(0,(h.f2||0)-dt);
  return h.ph!=2};
HZP.jwcoin=h=>{const o=h.o,e=h.tg;
  if(h.ph==0){const sp=Math.cos(h.t*30);g.save();g.translate(h.x,h.y);g.save();g.globalCompositeOperation='lighter';glow('#ffcf6a',0,0,18,.7);g.restore();g.scale(Math.max(.15,Math.abs(sp)),1);
    const cg=g.createRadialGradient(-2,-2,1,0,0,7);cg.addColorStop(0,'#fff4d0');cg.addColorStop(.6,'#d4af37');cg.addColorStop(1,'#7a5a10');g.fillStyle=cg;g.beginPath();g.arc(0,0,7,0,TAU);g.fill();g.strokeStyle='#5a4008';g.lineWidth=1.2;g.stroke();g.strokeStyle='#fff4d0';g.lineWidth=.8;g.beginPath();g.arc(0,0,4.5,0,TAU);g.stroke();g.restore();
    if(!o.dead)jwDual(o,Math.atan2(h.y-o.y,h.x-o.x),0,0,1);return}
  if(h.ph==1&&e&&!e.dead&&!o.dead){const q=h.t-h.mt,a=Math.min(1,q/.2)*clamp((4-q)/.3,0,1);
    // 레이저 조준선
    const [mx,my]=jwMuzzle(o,h.aim,h.n%2?1:-1);g.save();g.globalCompositeOperation='lighter';g.strokeStyle='rgba(255,40,60,'+(.35+.25*Math.sin(clock*20))*a+')';g.lineWidth=1.4;g.beginPath();g.moveTo(mx,my);g.lineTo(e.x,e.y);g.stroke();glow('#ff3040',e.x,e.y,10,.8*a);g.restore();
    jwDrawTr(h.trs);jwDual(o,h.aim,h.f1/.08,h.f2/.08,1);
    // 표식 (회전하는 조준경 + 금화)
    g.save();g.translate(e.x,e.y);g.rotate(q*1.5);g.globalAlpha=a;g.strokeStyle='#ff3040';g.lineWidth=2;const R=e.r+12+3*Math.sin(clock*8);g.beginPath();g.arc(0,0,R,0,TAU);g.stroke();
    for(let i=0;i<4;i++){g.rotate(TAU/4);g.beginPath();g.moveTo(R-6,0);g.lineTo(R+8,0);g.stroke()}g.restore();
    g.save();g.translate(e.x,e.y-e.r-22);g.globalAlpha=a;g.scale(Math.cos(clock*3),1);g.fillStyle='#d4af37';g.beginPath();g.arc(0,0,6,0,TAU);g.fill();g.strokeStyle='#fff4d0';g.lineWidth=1;g.stroke();g.restore()}};

// ---------- 3) ULT 콘티넨탈 · 처형 (연출 : 다른 사람은 멈춤) ----------
function jwUlt(o,t){SFXa('jw_ult');const EN=F.filter(x=>x!=o&&!x.dead);
  CIN={o,e:t,t:0,n:0,N:8,trs:[],gh:[],fl:[0,0],fx:0,
  tick(dt){const o=this.o;let e=this.e;if(!e||e.dead){const EN=F.filter(x=>x!=o&&!x.dead);e=this.e=EN[0];if(!e)return this.t<(this.endT||(this.endT=this.t+.6))}o.gcd=Math.max(o.gcd,.5);this.trs=jwTracers(this.trs,dt);this.fl=this.fl.map(v=>Math.max(0,v-dt));this.fx=Math.max(0,this.fx-dt*4);
    const t=this.t,K0=.5,KS=.27;
    if(this.n<this.N&&t>=K0+this.n*KS){const EN=F.filter(x=>x!=o&&!x.dead);const tg=EN[this.n%EN.length]||e;this.n++;this.gh.push({x:o.x,y:o.y,t});
      const an=(this.n*2.4)+rnd(-.3,.3),R=tg.r+o.r+40+rnd(0,30);o.x=clamp(tg.x+Math.cos(an)*R,o.r,A-o.r);o.y=clamp(tg.y+Math.sin(an)*R,o.r,A-o.r);this.aim=Math.atan2(tg.y-o.y,tg.x-o.x);this.ct=tg;
      SFXa('jw_kata');jwShot(o,tg,-1,1,this.trs);jwShot(o,tg,1,1,this.trs);this.fl=[.09,.09];this.fx=1;hs=.05;shake=Math.max(shake,6);if(this.n%3==0)SFXa('jw_casing')}
    const F0=K0+this.N*KS+.15;
    if(t>=F0&&!this.ff){this.ff=1;const EN=F.filter(x=>x!=o&&!x.dead);const tg=this.ct&&!this.ct.dead?this.ct:EN[0];if(!tg)return false;this.ft=tg;this.gh.push({x:o.x,y:o.y,t});const an=Math.atan2(tg.y-A/2,tg.x-A/2)+Math.PI*.15,R=tg.r+o.r+70;
      o.x=clamp(tg.x+Math.cos(an)*R,o.r,A-o.r);o.y=clamp(tg.y+Math.sin(an)*R,o.r,A-o.r);this.aim=Math.atan2(tg.y-o.y,tg.x-o.x);SFXa('jw_final');this.bt=t}
    if(this.ff&&!this.hit&&t>=this.bt+.75){this.hit=1;const tg=this.ft;this.fl=[0,.12];if(tg&&!tg.dead){hurt(tg,8,o,tg.x,tg.y,0,1);FX.push({k:'frost',l:.18,m:.18,c:'#ffffff'});shake=22;hs=.14;ring(tg.x,tg.y,8,120,'#ffcf6a',8,.5);
      for(let i=0;i<18;i++){const a=this.aim+rnd(-.6,.6),v=rnd(120,360),l=rnd(.3,.6);Pt.push({x:tg.x,y:tg.y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l,m:l,gl:1,sh:5,col:i%2?'#ffcf6a':'#ffffff',r:1.8,fr:.1})}}}
    this.gh=this.gh.filter(q=>t-q.t<.35);
    if(this.hit&&t>this.bt+1.4)return false;return t<6},
  draw(){const o=this.o,t=this.t,inA=Math.min(1,t/.35),outA=this.hit?clamp(1-(t-this.bt-.9)/.5,0,1):1,a=inA*outA,slow=this.ff&&!this.hit;
    // 어두운 클럽 + 네온 조명
    g.save();g.globalAlpha=a*.82;g.fillStyle='#07050a';g.fillRect(-300,-300,A+600,A+600);g.globalCompositeOperation='lighter';
    const st=Math.floor(t*7)%2;[[0,0,'#ff1e4a'],[A,0,'#2a6bff'],[A/2,A,'#ff1e4a']].forEach(([lx,ly,c],k)=>{g.globalAlpha=a*(slow?.12:.18+.12*((st+k)%2));const gr=g.createRadialGradient(lx,ly,0,lx,ly,A*.9);gr.addColorStop(0,c);gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(0,0,A,A)});
    // 총구 빛이 방을 밝힘
    if(this.fx>0){g.globalAlpha=a*this.fx*.35;const gr=g.createRadialGradient(o.x,o.y,0,o.x,o.y,260);gr.addColorStop(0,'#ffe6b0');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(0,0,A,A)}
    g.restore();
    // 네온 바닥 줄
    g.save();g.globalAlpha=a*.5;g.globalCompositeOperation='lighter';g.strokeStyle='#ff1e4a';g.lineWidth=2;for(let k=0;k<4;k++){const y=A*(.2+k*.2)+Math.sin(t*2+k)*6;g.beginPath();g.moveTo(0,y);g.lineTo(A,y);g.stroke()}g.restore();
    // 잔상
    this.gh.forEach(q=>{const p=(t-q.t)/.35;g.save();g.globalAlpha=a*(1-p)*.45;g.drawImage(ICON(o.d,52),q.x-o.r*1.1,q.y-o.r*1.1,o.r*2.2,o.r*2.2);g.restore()});
    F.forEach(f=>{if(!f.dead)ball(f,f==o?(this.ct||this.e):o)});
    jwDrawTr(this.trs);if(!o.dead&&this.aim!=null)jwDual(o,this.aim,this.fl[0]/.09,this.fl[1]/.12,1.1);
    // 마지막 한 발 : 슬로모션 총알
    if(slow&&this.ft){const u=clamp((t-this.bt-.15)/.6,0,1),[mx,my]=jwMuzzle(o,this.aim,1),tg=this.ft,bx=mx+(tg.x-mx)*u,by=my+(tg.y-my)*u;
      g.save();g.fillStyle='rgba(0,0,0,'+(.35*a)+')';g.fillRect(-300,-300,A+600,A+600);g.restore();if(!o.dead)jwDual(o,this.aim,0,u<.05?1:0,1.1);
      if(u>0){g.save();g.globalCompositeOperation='lighter';for(let k=0;k<5;k++){const v=u-k*.07;if(v<0)break;const rx=mx+(tg.x-mx)*v,ry=my+(tg.y-my)*v;g.strokeStyle='rgba(200,220,255,'+(.4-k*.07)+')';g.lineWidth=1.5;g.beginPath();g.ellipse(rx,ry,6+k*5,3+k*2.5,this.aim,0,TAU);g.stroke()}
        g.strokeStyle='rgba(255,230,180,.8)';g.lineWidth=2;g.beginPath();g.moveTo(mx,my);g.lineTo(bx,by);g.stroke();g.translate(bx,by);g.rotate(this.aim);glow('#ffcf6a',0,0,12,.9);g.fillStyle='#e2b04a';g.beginPath();g.ellipse(0,0,5,2.2,0,0,TAU);g.fill();g.restore()}}
    // 자막
    const sub=t<.5?'':!this.ff?'':this.hit?'계약 완료.':'…';if(sub)subtitle(sub,a)}};
  ft(o.x,o.y-o.r-40,'일이다.','#fff4d0',22)}

// ---------- 배지/아이콘 갱신 ----------
document.querySelectorAll('#grid .tile').forEach(t=>{const i=+t.dataset.i,vc=DEF.filter(x=>x.vof===i).length;let em=t.querySelector('.vb');if(vc){if(!em){em=document.createElement('em');em.className='vb';t.appendChild(em)}em.textContent='+'+vc}});
Object.keys(ICC).forEach(k=>delete ICC[k]);mkDict();
;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ▶ 섹션 : extra6
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ===== extra6.js : 김지우 (새 캐릭터 · 저택 괴물 술래잡기) =====

const NEW16=['oni_door','oni_scare','oni_growl','oni_closet','oni_burst','oni_ult','oni_step','oni_heart','oni_grab'];
NEW16.forEach(n=>{if(!SND.includes(n))SND.push(n);if(!AUD[n])AUD[n]=new SoundPool('sounds/'+n+'.mp3',n=='oni_step'||n=='oni_heart'?4:3)});
Object.assign(SLB,{oni_door:'김지우 · 문 삐걱 쾅',oni_scare:'김지우 · 깜짝 놀래키기',oni_growl:'김지우 · 괴물 으르렁',oni_closet:'김지우 · 옷장 덜컹',oni_burst:'김지우 · 옷장 박차기',oni_ult:'김지우 · 추격 시작',oni_step:'김지우 · 괴물 발소리',oni_heart:'김지우 · 심장 소리',oni_grab:'김지우 · 붙잡기'});
const ONSK=[
  {n:'문 너머',w:.4,cd:8,c:(o,t)=>!t.hid&&!t.jump&&dist(o,t)<600,f:(o,t)=>onDoor(o,t)},
  {n:'옷장 속',w:.35,cd:10,c:(o,t)=>!t.hid&&!t.jump,f:(o,t)=>onCloset(o,t)},
  {n:'끝없는 추격',w:.8,ult:1,c:(o,t)=>!t.hid,f:(o,t)=>onUlt(o,t)}];
DEF.push({name:'김지우',gl:'지',k:'oni',r:27,sp:206,col:'#4d6bff',hi:'#dce3ff',dk:'#0a1040',alt:{col:'#ff3b4a',hi:'#ffd8dc',dk:'#3a0408'},alt2:{col:'#2ee6c5',hi:'#d8fff7',dk:'#053a30'},sk:ONSK});
INFO['김지우']={st:[8,7,6,6,7,10],p:'공포 · 체력 50 이하인 적에게 주는 피해 15% 증가',
  sk:[['10 + 공포','상대 옆에 낡은 저택 문이 생기고, 문이 열리면 어둠 속에서 괴물이 튀어나와 낚아챔 · 맞으면 1.3초 동안 겁먹고 도망다님'],['10 + 묶음','내 자리 옷장에 숨었다가 상대 뒤에 생긴 옷장을 박차고 나와 붙잡음 · 숨어 있는 동안은 안 맞음'],['9×(잡힐 때마다)','불이 꺼지고 거대한 괴물로 변해 4.5초 동안 끝까지 쫓아감 · 잡힐 때마다 물어뜯음']]};

// ---------- 패시브 : 공포 ----------
const _hurtON=hurt;hurt=function(t,n,o){if(o&&o.d&&o.d.k=='oni'&&t&&t!=o&&t.hp<50&&n>0){const a=[...arguments];a[1]=Math.round(n*1.15*10)/10;return _hurtON.apply(this,a)}return _hurtON.apply(this,arguments)};

// ---------- 공포 상태 : 괴물 반대쪽으로 도망 ----------
function onFear(e,x,y,d){e.fear=Math.max(e.fear||0,d);e.fx=x;e.fy=y;e.cast=null}
const _updON=update;update=function(dt){_updON(dt);if(!F||(phase!='play'&&phase!='demo')||TSTOP||MAD||CIN)return;
  F.forEach(f=>{if(!(f.fear>0)||f.dead)return;f.fear-=dt;f.gcd=Math.max(f.gcd,.2);if(f.cast&&!f.cast.s.ult)f.cast=null;const a=Math.atan2(f.y-f.fy,f.x-f.fx)+Math.sin(clock*9+f.i)*.5;f.dx=Math.cos(a);f.dy=Math.sin(a);
    if(Math.random()<dt*6)Pt.push({x:f.x+rnd(-f.r,f.r),y:f.y-f.r,vx:rnd(-30,30),vy:rnd(-80,-40),l:.5,m:.5,sh:13,col:'#9fd6ff',r:3,rot:Math.PI/2,gy:300})})};
const _lowON=lowHP;lowHP=function(f){_lowON(f);if(f.fear>0&&!f.dead&&!f.hid){const a=Math.min(1,f.fear/.3);g.save();g.translate(f.x+rnd(-1.5,1.5),f.y);g.globalAlpha=a;g.strokeStyle='#bfe0ff';g.lineWidth=2;g.lineCap='round';
  for(let k=-1;k<=1;k++){g.beginPath();g.moveTo(k*9-3,-f.r-10);g.lineTo(k*9+1,-f.r-18);g.lineTo(k*9-2,-f.r-24);g.stroke()}g.restore()}};

// ---------- 괴물 이미지 (직접 넣은 그림) ----------
// images 폴더에 oni_idle (가만히) / oni_arms (팔 벌림) 그림을 넣으면 그걸 씀 (png · webp · jpg 다 됨)
// 흰 배경은 자동으로 지움 · 그림이 없으면 기본 괴물 그림을 씀
const ONI={idle:null,arms:null};
function oniLoad(key,names){if(!names.length)return;const im=new Image();im.onload=()=>{try{ONI[key]=oniCut(im)}catch(e){ONI[key]=im}};im.onerror=()=>oniLoad(key,names.slice(1));im.src=names[0]}
function oniCut(im){const W=im.naturalWidth,H=im.naturalHeight,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');x.drawImage(im,0,0);const D=x.getImageData(0,0,W,H),p=D.data;
  const br=i=>{const r=p[i],g2=p[i+1],b=p[i+2];return Math.min(r,g2,b)>205&&Math.max(r,g2,b)-Math.min(r,g2,b)<40};
  const seen=new Uint8Array(W*H),q=[];for(let i=0;i<W;i++){q.push(i,(H-1)*W+i)}for(let j=0;j<H;j++){q.push(j*W,j*W+W-1)}
  while(q.length){const k=q.pop();if(seen[k])continue;seen[k]=1;const i=k*4;if(p[i+3]<20||br(i)){p[i+3]=0;const X=k%W,Y=(k/W)|0;if(X>0)q.push(k-1);if(X<W-1)q.push(k+1);if(Y>0)q.push(k-W);if(Y<H-1)q.push(k+W)}}
  // 테두리 부드럽게
  for(let k=0;k<W*H;k++){const i=k*4;if(!p[i+3])continue;const X=k%W,Y=(k/W)|0;let n=0;if(X>0&&!p[i-1])n++;if(X<W-1&&!p[i+7])n++;if(Y>0&&!p[i-W*4+3])n++;if(Y<H-1&&!p[i+W*4+3])n++;if(n&&Math.min(p[i],p[i+1],p[i+2])>170)p[i+3]=120}
  x.putImageData(D,0,0);let x0=W,y0=H,x1=0,y1=0;for(let Y=0;Y<H;Y++)for(let X=0;X<W;X++)if(p[(Y*W+X)*4+3]>20){if(X<x0)x0=X;if(X>x1)x1=X;if(Y<y0)y0=Y;if(Y>y1)y1=Y}
  if(x1<=x0||y1<=y0)return c;const o=document.createElement('canvas');o.width=x1-x0+1;o.height=y1-y0+1;o.getContext('2d').drawImage(c,x0,y0,o.width,o.height,0,0,o.width,o.height);return o}
['idle','arms'].forEach(k=>{const L=[];['images/','','../images/'].forEach(d=>['png','webp','jpg','jpeg'].forEach(e=>L.push(d+'oni_'+k+'.'+e)));oniLoad(k,L)});
function oniImg(s,ph,al,arm){s=Math.max(.02,s);const im=arm>.5&&ONI.arms?ONI.arms:(ONI.idle||ONI.arms);if(!im)return false;const H=118*s,W=H*im.width/im.height,bob=Math.abs(Math.sin(ph))*5*s;
  g.save();g.globalAlpha=al==null?1:al;g.fillStyle='rgba(0,0,0,.4)';g.beginPath();g.ellipse(0,46*s,W*.38,9*s,0,0,TAU);g.fill();
  g.save();g.globalCompositeOperation='lighter';glow('#5a3cff',0,46*s-H*.5,H*.55,.18*(al==null?1:al));g.restore();
  g.translate(0,46*s-bob);g.rotate(Math.sin(ph)*.05);g.drawImage(im,-W/2,-H,W,H);g.restore();return true}

// ---------- 그림 : 푸른 그림자 도깨비 (오리지널) ----------
function onMon(s,ph,al,face,arm){if(oniImg(s,ph,al,arm))return;g.save();g.scale(s,s);g.globalAlpha=al==null?1:al;const sw=Math.sin(ph),sw2=Math.sin(ph+Math.PI);
  g.fillStyle='rgba(0,0,0,.4)';g.beginPath();g.ellipse(0,46,34,9,0,0,TAU);g.fill();
  // 다리 (가늘고 짧게)
  g.strokeStyle='#060818';g.lineWidth=7;g.lineCap='round';[[-9,sw],[9,sw2]].forEach(([x,w])=>{g.beginPath();g.moveTo(x,24);g.lineTo(x+w*6,36);g.lineTo(x+w*9,46);g.stroke()});
  // 긴 팔
  const armP=(sd,w)=>{const sx=sd*20,sy=-6,ex=sd*(30+(arm||0)*14)+w*8,ey=34-(arm||0)*30;return[sx,sy,sd*34,8+w*4,ex,ey]};
  [[-1,sw2],[1,sw]].forEach(([sd,w])=>{const [sx,sy,cx,cy,ex,ey]=armP(sd,w);g.strokeStyle='#060818';g.lineWidth=8;g.beginPath();g.moveTo(sx,sy);g.quadraticCurveTo(cx,cy,ex,ey);g.stroke();g.strokeStyle='#2a3a9a';g.lineWidth=2;g.stroke();
    // 손톱
    g.strokeStyle='#e8ecf6';g.lineWidth=2.2;for(let k=-1;k<=1;k++){const a=Math.atan2(ey-cy,ex-cx)+k*.45;g.beginPath();g.moveTo(ex,ey);g.quadraticCurveTo(ex+Math.cos(a)*7,ey+Math.sin(a)*7,ex+Math.cos(a+.5*sd)*12,ey+Math.sin(a+.5*sd)*12);g.stroke()}});
  // 몸 (구부정 · 연기처럼 해진 밑단)
  const bg=g.createLinearGradient(0,-40,0,30);bg.addColorStop(0,'#1d2a6a');bg.addColorStop(.6,'#0d1438');bg.addColorStop(1,'#05060f');g.fillStyle=bg;
  g.beginPath();g.moveTo(-22,-14);g.quadraticCurveTo(-28,8,-20,26);for(let k=0;k<=8;k++){const x=-20+k*5,y=26+(k%2?6:0)+Math.sin(clock*8+k)*2;g.lineTo(x,y)}g.quadraticCurveTo(28,8,22,-14);g.quadraticCurveTo(0,-26,-22,-14);g.fill();
  g.strokeStyle='#4d6bff';g.globalAlpha=(al==null?1:al)*.7;g.lineWidth=1.6;g.stroke();g.globalAlpha=al==null?1:al;
  // 머리
  g.save();g.translate(0,-30);const hg=g.createRadialGradient(-6,-8,2,0,0,22);hg.addColorStop(0,'#2b3b8e');hg.addColorStop(1,'#080b22');g.fillStyle=hg;g.beginPath();g.ellipse(0,0,19,17,0,0,TAU);g.fill();g.strokeStyle='#4d6bff';g.lineWidth=1.5;g.stroke();
  // 뿔
  [-1,1].forEach(sd=>{g.fillStyle='#d9d2c0';g.strokeStyle='#3a3226';g.lineWidth=1.2;g.beginPath();g.moveTo(sd*9,-12);g.quadraticCurveTo(sd*20,-24,sd*15,-34);g.quadraticCurveTo(sd*13,-22,sd*3,-14);g.closePath();g.fill();g.stroke();g.fillStyle='#3a3226';g.beginPath();g.moveTo(sd*15,-34);g.lineTo(sd*16.5,-28);g.lineTo(sd*13,-29);g.closePath();g.fill()});
  // 눈 (빛나는 가는 눈)
  g.save();g.globalCompositeOperation='lighter';[-1,1].forEach(sd=>{glow('#7fa8ff',sd*7,-3,10,.9);g.fillStyle='#ffffff';g.beginPath();g.moveTo(sd*2,-2);g.quadraticCurveTo(sd*7,-7,sd*13,-5);g.quadraticCurveTo(sd*7,-1,sd*2,-2);g.fill()});g.restore();
  // 입 (톱니 이빨 미소)
  const op=face?4+face*6:3;g.fillStyle='#3a0610';g.beginPath();g.moveTo(-12,5);g.quadraticCurveTo(0,10+op,12,5);g.quadraticCurveTo(0,8,-12,5);g.fill();
  g.fillStyle='#f4f0e6';for(let k=0;k<7;k++){const x=-10+k*3.3,y=5.5+Math.sin((k+.5)/7*Math.PI)*2;g.beginPath();g.moveTo(x,y);g.lineTo(x+1.6,y+3+op*.4);g.lineTo(x+3.2,y);g.fill()}
  g.restore();g.restore()}
// 저택 문
function onDoorArt(open,s,dark){g.save();g.scale(s,s);
  g.fillStyle='rgba(0,0,0,.45)';g.fillRect(-26,38,56,8);
  g.fillStyle='#2a1a10';g.fillRect(-28,-50,56,92);g.strokeStyle='#120a05';g.lineWidth=2;g.strokeRect(-28,-50,56,92);
  g.fillStyle='#000';g.fillRect(-22,-44,44,84);
  if(dark){g.save();g.beginPath();g.rect(-22,-44,44,84);g.clip();g.globalCompositeOperation='lighter';glow('#3a4fff',0,-6,40,.25*dark);g.restore()}
  // 문짝 (열리면 좁아짐)
  const w=44*Math.max(.06,Math.cos(open*1.35));const dg=g.createLinearGradient(-22,0,-22+w,0);dg.addColorStop(0,'#6a4426');dg.addColorStop(1,'#3e2614');g.fillStyle=dg;g.fillRect(-22,-44,w,84);g.strokeStyle='#1c1008';g.lineWidth=1.5;g.strokeRect(-22,-44,w,84);
  if(w>12){g.strokeStyle='rgba(0,0,0,.4)';g.strokeRect(-22+w*.15,-38,w*.7,34);g.strokeRect(-22+w*.15,0,w*.7,34);g.fillStyle='#d4af37';g.beginPath();g.arc(-22+w*.85,2,2.6,0,TAU);g.fill()}
  g.restore()}
// 옷장
function onClosetArt(s,shake,open){g.save();g.scale(s,s);g.translate(Math.sin(clock*60)*shake*2,0);g.rotate(Math.sin(clock*45)*shake*.03);
  g.fillStyle='rgba(0,0,0,.45)';g.beginPath();g.ellipse(0,40,30,7,0,0,TAU);g.fill();
  g.fillStyle='#4a2e18';g.fillRect(-26,-46,52,86);g.strokeStyle='#1a0e06';g.lineWidth=2;g.strokeRect(-26,-46,52,86);g.fillStyle='#5e3c20';g.fillRect(-28,-50,56,7);g.strokeRect(-28,-50,56,7);
  const ow=open||0;[-1,1].forEach(sd=>{const w=22*Math.max(.1,1-ow);g.fillStyle='#6a4426';g.fillRect(sd<0?-23:23-w,-41,w,76);g.strokeStyle='#1a0e06';g.lineWidth=1.4;g.strokeRect(sd<0?-23:23-w,-41,w,76);
    if(w>10){g.strokeStyle='rgba(0,0,0,.35)';for(let k=0;k<4;k++){g.beginPath();g.moveTo(sd<0?-21:23-w+2,-30+k*8);g.lineTo(sd<0?-23+w-2:21,-30+k*8);g.stroke()}g.fillStyle='#d4af37';g.beginPath();g.arc(sd*3,2,2,0,TAU);g.fill()}});
  if(ow>0){g.fillStyle='#000';g.fillRect(-23+22*(1-ow),-41,44*ow*.95,76)}
  g.restore()}

// ---------- 아이콘 (네온 : 뿔 + 빛나는 눈 + 톱니 미소) ----------
EMB.oni=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*1.7)*.05);
  neon(D,1.7,()=>{g.beginPath();[-1,1].forEach(sd=>{g.moveTo(sd*7,-10);g.quadraticCurveTo(sd*16,-18,sd*12,-24);g.quadraticCurveTo(sd*10,-15,sd*2,-12)});
    g.moveTo(-12,6);g.quadraticCurveTo(0,14,12,6);for(let k=0;k<5;k++){const x=-9+k*4.5;g.moveTo(x,8.5+Math.sin((k+.5)/5*Math.PI)*2);g.lineTo(x+2.2,12.5);g.lineTo(x+4.4,9+Math.sin((k+1)/5*Math.PI)*2)}});
  g.save();g.globalCompositeOperation='lighter';[-1,1].forEach(sd=>{glow('#9fc0ff',sd*7,-2,9,.9);g.fillStyle='#ffffff';g.beginPath();g.moveTo(sd*2,-1);g.quadraticCurveTo(sd*7,-6,sd*12,-4);g.quadraticCurveTo(sd*7,0,sd*2,-1);g.fill()});g.restore()};

// ---------- 1) 문 너머 : 문이 열리면 괴물이 튀어나옴 ----------
function onDoor(o,t){const a=Math.atan2(t.y-o.y,t.x-o.x)+(Math.random()<.5?1:-1)*1.2,x=clamp(t.x+Math.cos(a)*70,40,A-40),y=clamp(t.y+Math.sin(a)*70,60,A-50);HZ.push({k:'ondoor',o,tg:t,t:0,x,y,hit:0});SFXa('oni_door')}
HZX.ondoor=(h,dt)=>{const o=h.o,e=h.tg;if(!e||e.dead)return h.t<1.6&&h.hit;
  if(!h.hit&&h.t<.6){if(h.da==null)h.da=Math.atan2(h.y-e.y,h.x-e.x);const tx=clamp(e.x+Math.cos(h.da)*70,40,A-40),ty=clamp(e.y+Math.sin(h.da)*70,60,A-50);h.x+=(tx-h.x)*Math.min(1,dt*6);h.y+=(ty-h.y)*Math.min(1,dt*6)}
  if(!h.hit&&h.t>=.75){h.hit=1;h.ht=h.t;SFXa('oni_scare');shake=Math.max(shake,16);hs=.08;FX.push({k:'onred',l:.3,m:.3});
    if(!e.hid&&!e.jump&&Math.hypot(e.x-h.x,e.y-h.y)<210){hurt(e,10,o,e.x,e.y,0,1);onFear(e,h.x,h.y,1.3);e.x=clamp(e.x+(e.x-h.x)*.25,e.r,A-e.r);e.y=clamp(e.y+(e.y-h.y)*.25,e.r,A-e.r);
      for(let i=0;i<4;i++){const a=Math.atan2(e.y-h.y,e.x-h.x)+(i-1.5)*.25;FX.push({k:'onclaw',x:e.x,y:e.y,a,l:.35,m:.35})}}}
  return h.t<1.7};
HZD.ondoor=h=>{const fa=clamp((1.7-h.t)/.35,0,1),s=back(clamp(h.t/.22,0,1)),op=clamp((h.t-.35)/.3,0,1);g.save();g.translate(h.x,h.y);g.globalAlpha=fa;onDoorArt(op,s*.95,op);
  // 어둠 속 눈
  if(op>.3&&!h.hit){g.save();g.globalCompositeOperation='lighter';[-1,1].forEach(sd=>{glow('#9fc0ff',sd*7,-14,8,(op-.3)*1.3)});g.restore()}g.restore()};
HZP.ondoor=h=>{if(!h.hit)return;const e=h.tg,q=h.t-h.ht,fa=clamp((1-q)/.35,0,1);if(q>1)return;
  const tx=e&&!e.dead?e.x:h.x,ty=e&&!e.dead?e.y:h.y,u=Math.min(1,q/.1),x=h.x+(tx-h.x)*.55*u,y=h.y-6+(ty-h.y)*.55*u,s=(.9+.9*back(Math.min(1,q/.12)))*(1-Math.max(0,q-.5)*.6);
  g.save();g.translate(x,y);g.rotate(Math.atan2(ty-h.y,tx-h.x)*.15);onMon(s,clock*10,fa,1,1);g.restore()};
FXD.onred=x=>{const p=1-x.l/x.m;g.save();g.globalAlpha=(1-p)*.35;g.fillStyle='#ff1030';g.fillRect(-300,-300,A+600,A+600);g.restore()};
FXD.onclaw=x=>{const p=1-x.l/x.m,a=1-p;g.save();g.translate(x.x,x.y);g.rotate(x.a+Math.PI/2);g.globalCompositeOperation='lighter';g.strokeStyle='rgba(180,200,255,'+a+')';g.lineWidth=3*a+1;g.lineCap='round';
  g.beginPath();g.moveTo(-6,-30*Math.min(1,p*4));g.quadraticCurveTo(4,0,-6,30*Math.min(1,p*4));g.stroke();g.restore()};

// ---------- 2) 옷장 속 : 숨었다가 상대 뒤 옷장에서 튀어나옴 ----------
function onCloset(o,t){const a=Math.atan2(t.y-o.y,t.x-o.x),x2=clamp(t.x+Math.cos(a)*72,40,A-40),y2=clamp(t.y+Math.sin(a)*72,60,A-50);
  HZ.push({k:'oncloset',o,tg:t,t:0,x1:o.x,y1:o.y,x2,y2,ph:0});SFXa('oni_closet');o.hid=1;o.onc=1;wkPuffDark(o.x,o.y)}
function wkPuffDark(x,y){for(let i=0;i<10;i++){const a=rnd(0,TAU),v=rnd(30,90),l=rnd(.4,.7);Pt.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l,m:l,sh:3,col:'#10142e',r:rnd(10,16),gr:20,a0:.6,fr:.2})}}
HZX.oncloset=(h,dt)=>{const o=h.o;let e=h.tg;if(o.dead){o.hid=0;o.onc=0;return false}o.gcd=Math.max(o.gcd,.3);o.cast=null;
  if(h.ph==0){o.hid=1;o.x=h.x1;o.y=h.y1;if(e&&!e.dead&&h.t<.75){const a=Math.atan2(e.y-h.y1,e.x-h.x1),tx=clamp(e.x+Math.cos(a)*72,40,A-40),ty=clamp(e.y+Math.sin(a)*72,60,A-50);h.x2+=(tx-h.x2)*Math.min(1,dt*5);h.y2+=(ty-h.y2)*Math.min(1,dt*5)}
    if(h.t>=.55&&!h.k2){h.k2=1;SFXa('oni_closet')}
    if(h.t>=1.05){h.ph=1;h.bt=h.t;o.hid=0;o.onc=0;o.x=h.x2;o.y=h.y2+8;SFXa('oni_burst');shake=Math.max(shake,14);hs=.07;for(let i=0;i<14;i++)Pt.push({x:h.x2+rnd(-20,20),y:h.y2+rnd(-30,20),vx:rnd(-220,220),vy:rnd(-260,-40),l:rnd(.5,.8),m:.8,sh:2,col:['#6a4426','#4a2e18','#8a5a30'][i%3],r:rnd(3,6),rot:rnd(0,TAU),vr:rnd(-12,12),gy:500,fr:.4});
      if(e&&!e.dead&&!e.hid&&!e.jump&&Math.hypot(e.x-h.x2,e.y-h.y2)<150){hurt(e,10,o,e.x,e.y,0,1);e.stn=Math.max(e.stn,.6);e.cast=null;SFXa('oni_grab');h.gr=e;ring(e.x,e.y,8,70,'#4d6bff',6,.35)}}}
  if(h.ph==1&&h.gr&&!h.gr.dead&&h.t<h.bt+.5){const e2=h.gr,a=Math.atan2(o.y-e2.y,o.x-e2.x);e2.x=clamp(e2.x+Math.cos(a)*60*dt,e2.r,A-e2.r);e2.y=clamp(e2.y+Math.sin(a)*60*dt,e2.r,A-e2.r)}
  return h.ph==0||h.t<h.bt+.8};
HZD.oncloset=h=>{const fa=h.ph==1?clamp(1-(h.t-h.bt)/.8,0,1):1;
  // 내 옷장
  {const s=h.ph==0?back(clamp(h.t/.2,0,1)):clamp(1-(h.t-h.bt)/.25,0,1);if(s>0){g.save();g.translate(h.x1,h.y1-8);g.globalAlpha=fa;onClosetArt(.82*s,h.ph==0&&h.t>.25?.6+.4*Math.sin(h.t*20):0,0);g.restore()}}
  // 상대 뒤 옷장
  {const s=back(clamp((h.t-.25)/.25,0,1)),op=h.ph==1?clamp((h.t-h.bt)/.08,0,1):0;if(s>0){g.save();g.translate(h.x2,h.y2-8);g.globalAlpha=fa;onClosetArt(.82*s,h.ph==0&&h.t>.6?.5+.5*Math.sin(h.t*30):0,op);
    if(h.ph==0&&h.t>.6){g.save();g.globalCompositeOperation='lighter';[-1,1].forEach(sd=>glow('#9fc0ff',sd*5,-10,6,.6+.4*Math.sin(clock*12)));g.restore()}g.restore()}}};
HZP.oncloset=h=>{if(h.ph!=1)return;const q=h.t-h.bt;if(q>.55)return;const o=h.o,e=h.gr,fa=clamp((.55-q)/.2,0,1),tx=e&&!e.dead?e.x:h.x2,ty=e&&!e.dead?e.y:h.y2;
  g.save();g.translate(h.x2+(tx-h.x2)*.3,h.y2-14+(ty-h.y2)*.3);onMon(.75+.35*back(Math.min(1,q/.12)),clock*12,fa,1,1);g.restore()};
// 숨은 동안 안 맞음 (hid 상태)
const _ballON=ball;ball=function(f,t){if(f.onc)return;return _ballON(f,t)};

// ---------- 3) ULT 끝없는 추격 ----------
function onUlt(o,t){HZ.push({k:'onult',o,t:0,x:o.x,y:o.y,v:120,tg:t,ph:0,cd:0,stp:0,hb:0,fa:0});SFXa('oni_ult');o.hid=1;o.onc=1;shake=Math.max(shake,12);wkPuffDark(o.x,o.y)}
HZX.onult=(h,dt,EN)=>{const o=h.o,D=4.5;if(o.dead){o.hid=0;o.onc=0;return false}o.gcd=Math.max(o.gcd,.4);o.cast=null;
  if(h.t<D){o.hid=1;o.onc=1;let e=h.tg;if(!e||e.dead||e.hid){e=EN.filter(x=>!x.hid).sort((p,q)=>Math.hypot(p.x-h.x,p.y-h.y)-Math.hypot(q.x-h.x,q.y-h.y))[0];h.tg=e}
    h.v=Math.min(340,120+h.t*70);h.cd-=dt;
    if(e&&h.t>.5){const a=Math.atan2(e.y-h.y,e.x-h.x);let da=a-(h.a||a);da=Math.atan2(Math.sin(da),Math.cos(da));h.a=(h.a||a)+clamp(da,-6*dt,6*dt);h.x=clamp(h.x+Math.cos(h.a)*h.v*dt,30,A-30);h.y=clamp(h.y+Math.sin(h.a)*h.v*dt,40,A-30);
      // 쫓기는 쪽은 겁먹고 도망
      EN.forEach(x=>{if(Math.hypot(x.x-h.x,x.y-h.y)<260)onFear(x,h.x,h.y,.25)});
      if(h.cd<=0&&!e.jump&&Math.hypot(e.x-h.x,e.y-h.y)<e.r+34){h.cd=.6;hurt(e,9,o,e.x,e.y,0,1);e.stn=Math.max(e.stn,.35);SFXa('oni_grab');shake=Math.max(shake,14);FX.push({k:'onred',l:.25,m:.25});
        const ka=Math.atan2(e.y-h.y,e.x-h.x);e.x=clamp(e.x+Math.cos(ka)*50,e.r,A-e.r);e.y=clamp(e.y+Math.sin(ka)*50,e.r,A-e.r);for(let i=0;i<3;i++)FX.push({k:'onclaw',x:e.x,y:e.y,a:ka+(i-1)*.3,l:.35,m:.35});h.bite=.25}}
    h.bite=Math.max(0,(h.bite||0)-dt);
    // 발소리 · 심장소리 (빨라짐)
    h.stp-=dt;if(h.t>.5&&h.stp<=0){h.stp=Math.max(.17,.42-h.t*.06);SFXa('oni_step');shake=Math.max(shake,3);dustP(h.x,h.y+40,60)}
    h.hb-=dt;if(h.hb<=0){h.hb=Math.max(.32,.7-h.t*.09);SFXa('oni_heart')}
    if(h.t>2&&!h.gw){h.gw=1;SFXa('oni_growl')}
    o.x=h.x;o.y=h.y;return true}
  if(!h.end){h.end=1;o.hid=0;o.onc=0;o.x=h.x;o.y=h.y;wkPuffDark(h.x,h.y);ring(h.x,h.y,8,90,'#4d6bff',6,.4)}
  return h.t<D+.5};
HZP.onult=h=>{const D=4.5,a=Math.min(1,h.t/.5)*clamp((D+.4-h.t)/.5,0,1),o=h.o;
  if(a>0){g.save();g.globalAlpha=a*.88;const EN=F.filter(x=>x!=o&&!x.dead&&!x.hid);
    // 어둠 (적 주변만 조금 보임)
    g.fillStyle='#03040b';g.beginPath();g.rect(-300,-300,A+600,A+600);EN.forEach(e=>{g.moveTo(e.x+70,e.y);g.arc(e.x,e.y,70,0,TAU,true)});g.fill('evenodd');
    g.globalAlpha=a;EN.forEach(e=>{const gr=g.createRadialGradient(e.x,e.y,40,e.x,e.y,90);gr.addColorStop(0,'rgba(3,4,11,0)');gr.addColorStop(.75,'rgba(3,4,11,.88)');gr.addColorStop(1,'rgba(3,4,11,.88)');g.fillStyle=gr;g.beginPath();g.arc(e.x,e.y,90,0,TAU);g.fill()});
    // 심장 박동 테두리
    const hbp=Math.max(0,Math.sin(h.t*Math.PI*2*(1.4+h.t*.3)))**8;g.strokeStyle='rgba(200,10,30,'+(.25+.35*hbp)*a+')';g.lineWidth=18+hbp*10;g.strokeRect(0,0,A,A);g.restore()}
  if(h.t<D){const s=1.25+.15*Math.min(1,h.t/.4),dir=Math.cos(h.a||0)<0?-1:1;g.save();g.translate(h.x,h.y);g.globalCompositeOperation='lighter';glow('#3a4fff',0,0,90,.35);g.restore();
    g.save();g.translate(h.x,h.y);g.scale(dir,1);g.rotate(Math.sin(clock*16)*.05);onMon(s*(h.t<.4?back(h.t/.4):1),clock*(6+h.v/30),1,h.bite>0?1:.2,h.bite>0?1:0);g.restore()}};

// ---------- 새 캐릭터 칸 추가 (메뉴) ----------
{const i=DEF.length-1,d=DEF[i],gr=$('#grid');if(gr&&!gr.querySelector('[data-i="'+i+'"]')){gr.insertAdjacentHTML('beforeend',`<button class="tile" data-i="${i}" style="--c:${d.col};--h:${d.hi}"><canvas class="ic"></canvas><b>${d.name}</b><em class="b1">P1</em><em class="b2">P2</em><em class="b3">P3</em></button>`);
  const t=gr.querySelector('[data-i="'+i+'"]');t.addEventListener('click',()=>{audioOn();SFX('click');if(MENU_T){TSEL[ACT]=i;ACT=(ACT+1)%TSIZE;paintMenu();return}SEL[ACT]=i;ACT=(ACT+1)%MODE;initMenu()})}}

// ---------- 배지/아이콘 갱신 ----------
document.querySelectorAll('#grid .tile').forEach(t=>{const i=+t.dataset.i,vc=DEF.filter(x=>x.vof===i).length;let em=t.querySelector('.vb');if(vc){if(!em){em=document.createElement('em');em.className='vb';t.appendChild(em)}em.textContent='+'+vc}});
Object.keys(ICC).forEach(k=>delete ICC[k]);mkDict();
document.querySelectorAll('#grid .tile').forEach(t=>paintIc(t.querySelector('.ic'),DEF[+t.dataset.i],50));
;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ▶ 섹션 : extra7
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ===== extra7.js : 김지우 • 때리는형태 (붉은 분노 괴물) =====

const NEW17=['rg_roar','rg_charge','rg_wall','rg_grab','rg_slam','rg_leap','rg_land','rg_rage'];
NEW17.forEach(n=>{if(!SND.includes(n))SND.push(n);if(!AUD[n])AUD[n]=new SoundPool('sounds/'+n+'.mp3',n=='rg_slam'||n=='rg_land'?4:3)});
Object.assign(SLB,{rg_roar:'때리는형태 · 분노의 포효',rg_charge:'때리는형태 · 돌진',rg_wall:'때리는형태 · 벽에 쾅',rg_grab:'때리는형태 · 낚아채기',rg_slam:'때리는형태 · 패대기',rg_leap:'때리는형태 · 도약',rg_land:'때리는형태 · 착지 충격',rg_rage:'때리는형태 · 광폭화'});
const RGSK=[
  {n:'벽꿍 돌진',w:.35,cd:8,c:(o,t)=>!t.hid&&!t.jump&&dist(o,t)<480,f:(o,t)=>rgCharge(o,t)},
  {n:'패대기',w:.3,cd:9,c:(o,t)=>!t.hid&&!t.jump&&dist(o,t)<230,f:(o,t)=>rgSlam(o,t)},
  {n:'광폭화 · 대지 분쇄',w:.8,ult:1,c:(o,t)=>!t.hid,f:(o,t)=>rgUlt(o,t)}];
const RGI=DEF.findIndex(d=>d.k=='oni');
DEF.push({name:'김지우 • 때리는형태',gl:'분',k:'rage',vof:RGI,r:29,sp:200,col:'#ff2a2a',hi:'#ffd0c8',dk:'#3a0404',alt:{col:'#ff8a1c',hi:'#ffe6c8',dk:'#3a1a02'},alt2:{col:'#c42aff',hi:'#f2d8ff',dk:'#2a0640'},sk:RGSK});
INFO['김지우 • 때리는형태']={st:[10,7,5,4,7,10],p:'분노 · 잃은 체력이 많을수록 더 세게 때림 (최대 피해 40% 증가)',
  sk:[['6~12','상대에게 돌진해서 붙잡은 채 끝까지 밀고 가 벽에 처박음 · 멀리 끌고 갈수록 더 아픔'],['3.5×2+6','상대를 붙잡아 들어 올린 뒤 좌우로 바닥에 세 번 패대기치고 던져버림'],['7×2+10','거대해진 붉은 괴물이 상대에게 세 번 뛰어올라 내리찍음 · 착지할 때마다 땅이 갈라지고 충격파']]};

// ---------- 패시브 : 분노 ----------
const _hurtRG=hurt;hurt=function(t,n,o){if(o&&o.d&&o.d.k=='rage'&&t&&t!=o&&n>0){const a=[...arguments];a[1]=Math.round(n*(1+Math.max(0,100-o.hp)/250)*10)/10;return _hurtRG.apply(this,a)}return _hurtRG.apply(this,arguments)};

// ---------- 붉은 괴물 그림 (images 폴더 그림을 붉게 · 없으면 기본 괴물을 붉게) ----------
const RGC={};
function rgRed(key){if(RGC[key])return RGC[key];const im=typeof ONI!='undefined'&&ONI[key];if(!im)return null;try{const c=document.createElement('canvas');c.width=im.width;c.height=im.height;const x=c.getContext('2d');x.drawImage(im,0,0);
  const D=x.getImageData(0,0,c.width,c.height),p=D.data;for(let i=0;i<p.length;i+=4){if(!p[i+3])continue;const L=.3*p[i]+.59*p[i+1]+.11*p[i+2],k=Math.pow(L/255,1.15)*255;
    p[i]=Math.min(255,k*1.45+28);p[i+1]=Math.max(0,Math.min(255,k*.42-12));p[i+2]=Math.max(0,Math.min(255,k*.34-12))}x.putImageData(D,0,0);RGC[key]=c;return c}catch(e){return null}}
function rgMon(s,ph,al,arm){s=Math.max(.02,s);const im=(arm>.5?rgRed('arms'):null)||rgRed('idle')||rgRed('arms');
  if(im){const H=118*s,W=H*im.width/im.height,bob=Math.abs(Math.sin(ph))*5*s;g.save();g.globalAlpha=al==null?1:al;g.fillStyle='rgba(0,0,0,.45)';g.beginPath();g.ellipse(0,46*s,W*.42,10*s,0,0,TAU);g.fill();
    g.save();g.globalCompositeOperation='lighter';glow('#ff2a10',0,46*s-H*.5,H*.6,.28*(al==null?1:al));g.restore();g.translate(0,46*s-bob);g.rotate(Math.sin(ph)*.06);g.drawImage(im,-W/2,-H,W,H);g.restore();return}
  g.save();try{g.filter='hue-rotate(135deg) saturate(1.8) brightness(1.15)'}catch(e){}onMon(s,ph,al,1,arm);g.restore()}
function rgSteam(x,y,n){for(let i=0;i<n;i++){const l=rnd(.4,.8);Pt.push({x:x+rnd(-18,18),y:y+rnd(-30,10),vx:rnd(-20,20),vy:rnd(-90,-40),l,m:l,sh:3,col:i%2?'#ff3a2a':'#5a0a06',r:rnd(6,11),gr:16,a0:.45,fr:.3})}}
function rgDebris(x,y,n,v){for(let i=0;i<n;i++)rockP(x,y,rnd(0,TAU),rnd(v*.4,v));for(let i=0;i<n/2;i++)dustP(x,y,rnd(40,120))}
// 붉은 균열 (착지 · 벽)
FXD.rgcrater=x=>{const p=1-x.l/x.m,a=clamp(x.l/.6,0,1);g.save();g.translate(x.x,x.y);g.globalAlpha=a;g.fillStyle='rgba(20,4,2,.55)';g.beginPath();g.ellipse(0,0,x.r*.55,x.r*.4,0,0,TAU);g.fill();
  g.lineCap='round';(x.cr||(x.cr=Array.from({length:9},(_,i)=>({a:i*TAU/9+rnd(-.25,.25),l:rnd(.6,1.1)})))).forEach(c=>{let px=0,py=0;g.beginPath();g.moveTo(0,0);for(let k=1;k<=4;k++){const aa=c.a+((k*37)%5-2)*.12;px=Math.cos(aa)*x.r*c.l*k/4;py=Math.sin(aa)*x.r*c.l*k/4*.75;g.lineTo(px,py)}
    g.strokeStyle='#0a0202';g.lineWidth=5;g.stroke();g.save();g.globalCompositeOperation='lighter';g.strokeStyle='rgba(255,'+Math.floor(90+80*(1-p))+',30,'+(.9*(1-p*.7))+')';g.lineWidth=2;g.stroke();g.restore()});g.restore()};
FXD.rgwall=x=>{const a=clamp(x.l/.5,0,1);g.save();g.translate(x.x,x.y);g.rotate(x.a);g.globalAlpha=a;g.lineCap='round';for(let i=0;i<7;i++){const aa=(i-3)*.32+Math.PI;g.strokeStyle='#0a0202';g.lineWidth=4;g.beginPath();g.moveTo(0,0);g.lineTo(Math.cos(aa)*x.r*(.6+(i%3)*.2),Math.sin(aa)*x.r*(.6+(i%3)*.2));g.stroke()}
  g.save();g.globalCompositeOperation='lighter';glow('#ff3a10',0,0,x.r*.8,.5*a);g.restore();g.restore()};

// ---------- 아이콘 (네온 : 화난 눈 + 이 악문 입 + 핏줄) ----------
EMB.rage=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*9)*.05);
  neon(D,1.9,()=>{g.beginPath();g.moveTo(-15,-12);g.lineTo(-4,-6);g.moveTo(15,-12);g.lineTo(4,-6);g.moveTo(-12,6);g.lineTo(12,6);g.lineTo(12,13);g.lineTo(-12,13);g.closePath();for(let k=-8;k<=8;k+=4){g.moveTo(k,6);g.lineTo(k,13)}
    g.moveTo(-17,-20);g.lineTo(-13,-16);g.lineTo(-16,-13);g.moveTo(15,-21);g.lineTo(18,-17)});
  g.save();g.globalCompositeOperation='lighter';[-1,1].forEach(sd=>{glow('#ffb0a0',sd*8,-4,7,.9);g.fillStyle='#ffffff';g.beginPath();g.arc(sd*8,-3,2,0,TAU);g.fill()});g.restore()};
const _lowRG=lowHP;lowHP=function(f){_lowRG(f);if(f.d.k=='rage'&&!f.dead&&!f.hid&&phase!='menu'&&Math.random()<.25)rgSteam(f.x,f.y-f.r*.5,1)};

// ---------- 1) 벽꿍 돌진 ----------
function rgCharge(o,t){const a=ang(o,t);HZ.push({k:'rgch',o,tg:t,t:0,a,ph:0,gr:null,cx:0});SFXa('rg_charge');SFXa('rg_roar');o.onc=1;o.hid=1;rgSteam(o.x,o.y,8)}
HZX.rgch=(h,dt,EN)=>{const o=h.o;if(o.dead){o.onc=0;o.hid=0;return false}o.gcd=Math.max(o.gcd,.3);o.cast=null;const V=860;
  if(h.ph==0){const e=h.tg;if(e&&!e.dead&&h.t<.25){let da=ang(o,e)-h.a;da=Math.atan2(Math.sin(da),Math.cos(da));h.a+=clamp(da,-3*dt,3*dt)}
    const px=o.x,py=o.y;o.x=clamp(o.x+Math.cos(h.a)*V*dt,o.r,A-o.r);o.y=clamp(o.y+Math.sin(h.a)*V*dt,o.r,A-o.r);emit(40,dt,()=>dustP(o.x,o.y+o.r,rnd(30,80)));if(Math.random()<dt*20)shake=Math.max(shake,4);
    const hit=EN.find(x=>!x.hid&&!x.jump&&dist(o,x)<o.r+x.r+10);if(hit){h.ph=1;h.gr=hit;h.gt=h.t;h.sx=o.x;h.sy=o.y;SFXa('rg_grab');hurt(hit,2,o,hit.x,hit.y,0,0);hit.stn=Math.max(hit.stn,1);hit.cast=null}
    else if(h.t>.55||(o.x<=o.r+1||o.x>=A-o.r-1||o.y<=o.r+1||o.y>=A-o.r-1)&&h.t>.1){h.ph=3;h.et=h.t}}
  if(h.ph==1){const e=h.gr;if(!e||e.dead){h.ph=3;h.et=h.t}else{o.x=clamp(o.x+Math.cos(h.a)*V*dt,o.r,A-o.r);o.y=clamp(o.y+Math.sin(h.a)*V*dt,o.r,A-o.r);e.x=o.x+Math.cos(h.a)*(o.r+e.r);e.y=o.y+Math.sin(h.a)*(o.r+e.r);e.stn=Math.max(e.stn,.3);
    emit(70,dt,()=>{Pt.push({x:e.x+rnd(-8,8),y:e.y+rnd(-8,8),vx:-Math.cos(h.a)*rnd(80,200)+rnd(-40,40),vy:-Math.sin(h.a)*rnd(80,200)+rnd(-40,40),l:.35,m:.35,gl:1,sh:5,col:'#ffb070',r:1.8,fr:.1})});emit(30,dt,()=>dustP(e.x,e.y,rnd(40,100)));
    const wall=e.x<=e.r+2||e.x>=A-e.r-2||e.y<=e.r+2||e.y>=A-e.r-2;if(wall||h.t-h.gt>.7){e.x=clamp(e.x,e.r,A-e.r);e.y=clamp(e.y,e.r,A-e.r);const dd=Math.hypot(o.x-h.sx,o.y-h.sy),dmg=Math.round(Math.min(10,4+dd/45));
      hurt(e,dmg,o,e.x,e.y,0,1);e.stn=Math.max(e.stn,.7);SFXa('rg_wall');shake=Math.max(shake,wall?22:14);hs=.12;FX.push({k:'rgwall',x:e.x+Math.cos(h.a)*e.r,y:e.y+Math.sin(h.a)*e.r,a:h.a,r:70,l:1.6,m:1.6});rgDebris(e.x,e.y,16,260);ring(e.x,e.y,8,100,'#ff3a2a',8,.4);if(wall&&typeof wallFlash=='function')wallFlash(e.x,e.y,'#ff3a2a');h.ph=3;h.et=h.t}}}
  if(h.ph==3){if(!h.rel){h.rel=1;o.onc=0;o.hid=0;o.dx=-Math.cos(h.a);o.dy=-Math.sin(h.a)}return h.t<h.et+.3}
  return true};
HZP.rgch=h=>{const o=h.o;if(h.ph==3||o.dead)return;const dir=Math.cos(h.a)<0?-1:1;
  for(let k=1;k<4;k++){g.save();g.globalAlpha=.18;g.translate(o.x-Math.cos(h.a)*k*22,o.y-Math.sin(h.a)*k*22-20);g.scale(dir,1);rgMon(.8,clock*16,.35,1);g.restore()}
  g.save();g.translate(o.x,o.y-20);g.scale(dir,1);g.rotate(.18);rgMon(.85,clock*18,1,1);g.restore()};

// ---------- 2) 패대기 ----------
function rgSlam(o,t){HZ.push({k:'rgslam',o,tg:t,t:0,ph:0,n:0,cx:o.x,cy:o.y});SFXa('rg_grab');o.onc=1;o.hid=1}
HZX.rgslam=(h,dt)=>{const o=h.o,e=h.tg;if(o.dead||!e||e.dead){o.onc=0;o.hid=0;return false}o.gcd=Math.max(o.gcd,.3);o.cast=null;o.x=h.cx;o.y=h.cy;
  const G=.18,S=.32;e.stn=Math.max(e.stn,.3);e.cast=null;
  if(h.t<G){const u=h.t/G,a=Math.atan2(e.y-h.cy,e.x-h.cx),R=o.r+e.r+6,d=Math.hypot(e.x-h.cx,e.y-h.cy);const nd=d+(R-d)*Math.min(1,u*1.5);e.x=h.cx+Math.cos(a)*nd;e.y=h.cy+Math.sin(a)*nd;h.a0=a}
  else if(h.n<3){const k=Math.floor((h.t-G)/S),u=((h.t-G)%S)/S,R=o.r+e.r+14,from=h.a0+(k%2?Math.PI:0),an=from+Math.PI*(u<.7?Math.pow(u/.7,2):1);e.x=clamp(h.cx+Math.cos(an)*R,e.r,A-e.r);e.y=clamp(h.cy+Math.sin(an)*R,e.r,A-e.r);
    if(u>=.7&&h.n<=k){h.n=k+1;const last=h.n==3;hurt(e,last?6:3.5,o,e.x,e.y,0,1);SFXa('rg_slam');shake=Math.max(shake,last?20:13);hs=last?.1:.06;FX.push({k:'rgcrater',x:e.x,y:e.y+4,r:last?70:52,l:1.8,m:1.8});rgDebris(e.x,e.y,12,220);ring(e.x,e.y,6,last?110:70,'#ff3a2a',6,.35);
      if(last){const a=Math.atan2(e.y-h.cy,e.x-h.cx);e.flyA=a;e.flyT=.35;e.flyV=900;e.stn=Math.max(e.stn,.6);h.et=h.t}}}
  if(h.n>=3&&h.t>h.et+.25){o.onc=0;o.hid=0;return false}return true};
HZP.rgslam=h=>{const o=h.o,e=h.tg;if(o.dead||!e)return;const dir=e.x<o.x?-1:1;g.save();g.translate(o.x,o.y-18);g.scale(dir,1);g.rotate(Math.sin(clock*20)*.05);rgMon(.9,clock*10,1,1);g.restore();
  // 붙잡은 팔
  g.save();g.strokeStyle='#5a0a06';g.lineWidth=9;g.lineCap='round';g.beginPath();g.moveTo(o.x,o.y-30);g.quadraticCurveTo((o.x+e.x)/2,(o.y+e.y)/2-40,e.x,e.y-4);g.stroke();g.strokeStyle='#ff4a3a';g.lineWidth=3;g.stroke();g.restore()};

// ---------- 3) ULT 광폭화 · 대지 분쇄 ----------
function rgUlt(o,t){HZ.push({k:'rgult',o,t:0,n:0,x:o.x,y:o.y,sx:o.x,sy:o.y,tx:o.x,ty:o.y,j0:.5});SFXa('rg_rage');SFXa('rg_roar');o.onc=1;o.hid=1;shake=Math.max(shake,14);rgSteam(o.x,o.y,20);ring(o.x,o.y,10,160,'#ff2a2a',10,.6)}
HZX.rgult=(h,dt,EN)=>{const o=h.o;if(o.dead){o.onc=0;o.hid=0;return false}o.gcd=Math.max(o.gcd,.4);o.cast=null;const JD=.62;
  if(h.n<3&&h.t>=h.j0){const k=h.t-h.j0;if(!h.air){h.air=1;const e=EN.filter(x=>!x.hid).sort((p,q)=>Math.hypot(p.x-h.x,p.y-h.y)-Math.hypot(q.x-h.x,q.y-h.y))[0];h.sx=h.x;h.sy=h.y;
      h.tx=e?clamp(e.x+e.dx*e.sp*.3,40,A-40):h.x;h.ty=e?clamp(e.y+e.dy*e.sp*.3,40,A-40):h.y;SFXa('rg_leap')}
    const u=Math.min(1,k/JD);h.x=h.sx+(h.tx-h.sx)*u;h.y=h.sy+(h.ty-h.sy)*u;h.z=Math.sin(Math.PI*u)*150;
    if(u>=1){h.air=0;h.z=0;h.n++;const last=h.n==3,R=last?175:125;SFXa('rg_land');shake=Math.max(shake,last?28:18);hs=last?.14:.08;FX.push({k:'rgcrater',x:h.x,y:h.y+30,r:R*.75,l:2.4,m:2.4});ring(h.x,h.y+30,10,R,'#ff2a2a',12,.5);ring(h.x,h.y+30,10,R*.7,'#ffb070',5,.4);rgDebris(h.x,h.y+30,24,340);rgSteam(h.x,h.y,10);
      EN.forEach(e=>{if(e.hid||e.jump)return;const d=Math.hypot(e.x-h.x,e.y-(h.y+30));if(d<R+e.r){hurt(e,last?10:7,o,e.x,e.y,0,1);e.stn=Math.max(e.stn,.35);const a=Math.atan2(e.y-h.y,e.x-h.x);e.flyA=a;e.flyT=.2;e.flyV=last?800:550}});h.j0=h.t+.28}}
  if(h.n>=3&&h.t>h.j0){o.x=clamp(h.x,o.r,A-o.r);o.y=clamp(h.y+20,o.r,A-o.r);o.onc=0;o.hid=0;return false}
  o.x=clamp(h.x,o.r,A-o.r);o.y=clamp(h.y+20,o.r,A-o.r);return true};
HZD.rgult=h=>{if(!h.air)return;const u=clamp((h.t-(h.j0||0))/.62,0,1);g.save();g.translate(h.tx,h.ty+30);g.globalAlpha=.25+.5*u;g.fillStyle='#000';g.beginPath();g.ellipse(0,0,40+70*u,(40+70*u)*.35,0,0,TAU);g.fill();
  g.strokeStyle='#ff2a2a';g.lineWidth=3;g.setLineDash([10,8]);g.lineDashOffset=-clock*60;g.beginPath();g.ellipse(0,0,120,42,0,0,TAU);g.stroke();g.setLineDash([]);g.restore()};
HZP.rgult=h=>{const o=h.o;if(o.dead)return;const z=h.z||0,s=1.75+(h.t<.4?-.6*(1-h.t/.4):0)+z/600,dir=h.tx<h.sx?-1:1;
  g.save();g.translate(h.x,h.y-z);g.globalCompositeOperation='lighter';glow('#ff2a10',0,0,120,.35);g.restore();
  g.save();g.translate(h.x,h.y-z);g.scale(dir,1);rgMon(s,clock*(h.air?4:12),1,h.air?1:.2);g.restore()};

// ---------- 배지/아이콘 갱신 ----------
document.querySelectorAll('#grid .tile').forEach(t=>{const i=+t.dataset.i,vc=DEF.filter(x=>x.vof===i).length;let em=t.querySelector('.vb');if(vc){if(!em){em=document.createElement('em');em.className='vb';t.appendChild(em)}em.textContent='+'+vc}});
Object.keys(ICC).forEach(k=>delete ICC[k]);mkDict();
;
