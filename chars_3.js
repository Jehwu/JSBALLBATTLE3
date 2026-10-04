// ======================================================================
// chars_3.js : 변이 3묶음 : 만화 컷 연출 · 가오란 웡서왓 · 김갑룡 · 포켓몬카드 · 크레이지콩
// 안에 들어있는 순서 : extra15 → extra16 → extra17
// (순서가 중요해서 위에서부터 차례로 실행됨 · 섹션 위치를 바꾸지 말 것)
// ======================================================================



// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ▶ 섹션 : extra15
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ===== extra15.js : 만화 컷 연출 + 김지우 • 가오란 · 김가은 • 김갑룡 =====

// ======================================================================
// 만화 컷 연출 : 화면이 만화책 한 페이지가 되어 칸들이 휙 들어온 뒤 기술이 나감
// ======================================================================
const MGQ=[];
const _updMG=update;update=function(dt){_updMG(dt);while(MGQ.length){const f=MGQ.shift();try{f()}catch(e){}}};
function mgDots(x,col){const c=document.createElement('canvas');c.width=c.height=10;const y=c.getContext('2d');y.fillStyle=col;y.beginPath();y.arc(3,3,2.1,0,TAU);y.arc(8,8,2.1,0,TAU);y.fill();return x.createPattern(c,'repeat')}
function mgIcon(d){const k='mg_'+d.name;if(mgIcon[k])return mgIcon[k];const src=ICON(d,52),c=document.createElement('canvas');c.width=c.height=208;const x=c.getContext('2d');
  try{x.filter='grayscale(1) contrast(2.2) brightness(1.1)'}catch(e){}x.drawImage(src,0,0,208,208);mgIcon[k]=c;return c}
// 컷에 넣을 그림 : images 폴더의 (캐릭터)_cut1 · _cut2 (각성 컷은 _over1 · _over2)
const CUTIMG={};function cutImg(n){if(n in CUTIMG)return CUTIMG[n];CUTIMG[n]=null;const L=[];['images/','','../images/'].forEach(d=>['png','webp','jpg','jpeg'].forEach(e=>L.push(d+n+'.'+e)));
  const go=i=>{if(i>=L.length)return;const im=new Image();im.onload=()=>{CUTIMG[n]=im};im.onerror=()=>go(i+1);im.src=L[i]};go(0);return null}
['gaor','gapr'].forEach(k=>['cut1','cut2','over1','over2'].forEach(s=>cutImg(k+'_'+s)));
function mangaCut(o,opt,fn){if(CIN||TSTOP||MAD||(phase!='play'&&phase!='demo')){fn();return}SFXa('mg_cut');const pg=mgBuild(o,opt);
  CIN={o,t:0,dur:opt.dur||1.4,opt,fn,pg,
    tick(dt){this.o.gcd=Math.max(this.o.gcd,.5);if(this.t>=.2&&!this.s2){this.s2=1;SFXa(opt.snd||'mg_hit');shake=Math.max(shake,10)}if(this.t>=this.dur){MGQ.push(this.fn);return false}},
    draw(){mgDraw(this)}}}
// 컷 페이지 미리 만들어 두기 (첫 발동 때 멈칫 없게)
const MGO={gaor:[{title:'신권',sub:'GOD GLOW',line:'네가 보는 것은\n그 앞에 있는 것이다',sfx:'번쩍',col:'#ffcc33',snd:'mg_hit'}],
  gapr:[{title:'전설의 주먹',sub:'0세대',line:'너는 생각이 너무 많아.\n쉽게 가자.',sfx:'콰앙',col:'#9b4dff',snd:'mg_hit'},{img:'over',title:'극복의 경지',line:'지킬 게 있는 한\n나는 지지 않는다',sfx:'극복',col:'#9b4dff',dur:1.2,snd:'gp_aura'}]};
const _initMGO=init;init=function(){_initMGO.apply(this,arguments);if(typeof SKIP!='undefined'&&SKIP)return;const L=F.filter(f=>MGO[f.d.k]);L.forEach((f,i)=>MGO[f.d.k].forEach((O,j)=>setTimeout(()=>{try{mgBuild(f,O)}catch(e){}},200+(i*2+j)*150)))};
function mgPolyX(x,P){x.beginPath();P.forEach(([a,b],i)=>i?x.lineTo(a,b):x.moveTo(a,b));x.closePath()}
function mgSpeedX(x,cx,cy,R,n,col,seed){x.fillStyle=col;for(let i=0;i<n;i++){const a=i*TAU/n+((i*53+seed)%7)*.03,r0=R*(.25+((i*31)%5)*.06),w=.008+((i*17)%4)*.005;x.beginPath();x.moveTo(cx+Math.cos(a)*r0,cy+Math.sin(a)*r0);x.lineTo(cx+Math.cos(a-w)*R*2,cy+Math.sin(a-w)*R*2);x.lineTo(cx+Math.cos(a+w)*R*2,cy+Math.sin(a+w)*R*2);x.closePath();x.fill()}}
function mgCover(x,im,bx,by,bw,bh){const s=Math.max(bw/im.width,bh/im.height),w=im.width*s,h=im.height*s;x.drawImage(im,bx+(bw-w)/2,by+(bh-h)/2,w,h)}
// 한 번만 그려 두고 (칸 3장) 매 프레임에는 붙이기만 함 → 끊김 없음
const MGC={};function mgBuild(o,O){const S=1.25,col=O.col||o.d.col,k=o.d.k,pre=O.img||'cut',im1=cutImg(k+'_'+pre+'1')||cutImg(k+'_cut1'),im3=cutImg(k+'_'+pre+'2')||cutImg(k+'_cut2');
  const ck=[k,O.title,col,!!im1,!!im3].join('|');if(MGC[ck])return MGC[ck];
  const P1=[[0,0],[A,0],[A,A*.47],[0,A*.6]],P2=[[0,A*.6+12],[A*.5,A*.535+12],[A*.43,A],[0,A]],P3=[[A*.5+12,A*.533],[A,A*.47+12],[A,A],[A*.43+12,A]];
  const mk=(P,fill)=>{const c=document.createElement('canvas');c.width=c.height=Math.round(A*S);const x=c.getContext('2d');x.scale(S,S);mgPolyX(x,P);x.save();x.clip();fill(x);x.restore();mgPolyX(x,P);x.lineWidth=6;x.strokeStyle='#111';x.lineJoin='miter';x.stroke();return c};
  const c1=mk(P1,x=>{if(im1){mgCover(x,im1,0,0,A,A*.6)}else{x.fillStyle=col;x.fillRect(0,0,A,A*.62);x.fillStyle=mgDots(x,'rgba(0,0,0,.28)');x.fillRect(0,0,A,A*.62);mgSpeedX(x,A*.35,A*.28,A*.5,64,'rgba(255,255,255,.55)',3);const z=A*.62;x.save();x.translate(A*.33,A*.3);x.rotate(-.06);x.drawImage(mgIcon(o.d),-z/2,-z/2,z,z);x.restore()}
    if(O.title){x.save();x.translate(A*.6,A*.06);x.font='900 30px "Black Han Sans",'+FB;const w=x.measureText(O.title).width+30;x.fillStyle='#fff';x.strokeStyle='#111';x.lineWidth=3;x.fillRect(0,0,w,46);x.strokeRect(0,0,w,46);x.fillStyle='#111';x.textBaseline='middle';x.fillText(O.title,15,24);
      if(O.sub){x.font='700 13px '+FB;const w2=x.measureText(O.sub).width+16;x.fillStyle='#111';x.fillRect(0,48,w2,22);x.fillStyle='#fff';x.fillText(O.sub,8,59)}x.restore()}});
  const c2=mk(P2,x=>{x.fillStyle='#fff';x.fillRect(0,A*.5,A*.6,A*.5);x.fillStyle=mgDots(x,'rgba(0,0,0,.14)');x.fillRect(0,A*.5,A*.6,A*.5);
    if(O.line){const L=O.line.split('\n');x.save();x.translate(A*.22,A*.8);x.fillStyle='#fff';x.strokeStyle='#111';x.lineWidth=3;x.beginPath();x.ellipse(0,0,A*.2,A*.11+L.length*6,0,0,TAU);x.fill();x.stroke();x.beginPath();x.moveTo(A*.12,-A*.08);x.lineTo(A*.2,-A*.16);x.lineTo(A*.16,-A*.05);x.fill();
      x.font='700 18px '+FB;x.fillStyle='#111';x.textAlign='center';x.textBaseline='middle';L.forEach((l,i)=>x.fillText(l,0,(i-(L.length-1)/2)*24));x.restore()}});
  const c3=mk(P3,x=>{if(im3)mgCover(x,im3,A*.43,A*.47,A*.57,A*.53);else{x.fillStyle='#fff';x.fillRect(A*.4,A*.45,A*.6,A*.55);mgSpeedX(x,A*.74,A*.76,A*.42,80,'#111',7)}});
  const c4=null;
  return MGC[ck]={c1,c2,c3,c4,col,S}}
function mgDraw(c){const t=c.t,O=c.opt,D=c.dur,pg=c.pg,ease=u=>1-Math.pow(1-clamp(u,0,1),3),out=clamp((t-(D-.2))/.2,0,1);
  g.save();g.globalAlpha=Math.min(1,t/.08)*(1-out*.6);g.fillStyle='#f4efe4';g.fillRect(-20,-20,A+40,A+40);g.globalAlpha=1-out*.6;
  [[pg.c1,0,-1,0],[pg.c2,-1,0,1],[pg.c3,1,0,2]].forEach(([cv,dx,dy,k])=>{const u=ease((t-k*.06)/.22);if(u<=0)return;g.drawImage(cv,dx*(1-u)*A,dy*(1-u)*A,A,A)});
  g.restore();if(out>0){g.save();g.globalAlpha=Math.sin(out*Math.PI);g.fillStyle='#fff';g.fillRect(-300,-300,A+600,A+600);g.restore()}}

// ======================================================================
// 공통 그림 : 권투 글러브
// ======================================================================
function punchFX(x,y,a,col,big){FX.push({k:'burst',x,y,c:col||'#ffffff',a:rnd(0,1),l:big?.35:.2,m:big?.35:.2});ring(x,y,4,big?90:40,col||'#ffffff',big?8:4,.25);for(let i=0;i<(big?14:5);i++){const aa=a+rnd(-.9,.9);Pt.push({x,y,vx:Math.cos(aa)*rnd(100,300),vy:Math.sin(aa)*rnd(100,300),l:.25,m:.25,gl:1,sh:5,col:i%2?'#ffffff':(col||'#ffd27a'),r:1.8,fr:.1})}}

// ======================================================================
// 김지우 • 가오란 (태국의 투신)
// ======================================================================
const NEW25=['mg_cut','mg_hit','gl_jab','gl_str','gl_flash','gl_knee','gl_elbow','gl_god','gl_counter'];
const NEW26=['gp_punch','gp_wall','gp_crack','gp_spike','gp_aura','gp_charge','gp_ground'];
NEW25.concat(NEW26).forEach(n=>{if(!SND.includes(n))SND.push(n);if(!AUD[n])AUD[n]=new SoundPool('sounds/'+n+'.mp3',n=='gl_jab'||n=='gp_punch'?6:3)});
Object.assign(SLB,{mg_cut:'만화 컷 · 페이지 넘김',mg_hit:'만화 컷 · 쾅',gl_jab:'가오란 · 잽',gl_str:'가오란 · 스트레이트',gl_flash:'가오란 · 플래시',gl_knee:'가오란 · 니킥',gl_elbow:'가오란 · 팔꿈치',gl_god:'가오란 · 신권',gl_counter:'가오란 · 크로스 카운터',
  gp_punch:'김갑룡 · 주먹',gp_wall:'김갑룡 · 벽에 쾅',gp_crack:'김갑룡 · 땅 갈라짐',gp_spike:'김갑룡 · 바위 솟구침',gp_aura:'김갑룡 · 극복의 경지',gp_charge:'김갑룡 · 돌진',gp_ground:'김갑룡 · 땅 내려찍기'});
// 신권 모으는 시간 조금 길게
const GLSK=[
  {n:'플래시 · 컴비네이션',w:.2,cd:7,c:(o,t)=>!t.hid&&!t.jump&&dist(o,t)<380,f:(o,t)=>glCombo(o,t)},
  {n:'무에타이 · 클린치',w:.25,cd:9,c:(o,t)=>!t.hid&&!t.jump&&dist(o,t)<300,f:(o,t)=>glClinch(o,t)},
  {n:'신권 · 갓 글로우',w:.4,ult:1,c:(o,t)=>!t.hid&&!t.jump,f:(o,t)=>mangaCut(o,MGO.gaor[0],()=>glGod(o,t))}];
const GLI=DEF.findIndex(d=>d.k=='oni');
DEF.push({name:'김지우 • 가오란 웡서왓',gl:'란',k:'gaor',vof:GLI,r:27,sp:220,col:'#ffcc33',hi:'#fff4cc',dk:'#3a2a02',alt:{col:'#e8323c',hi:'#ffdcdc',dk:'#3a0408'},alt2:{col:'#4aa8ff',hi:'#dceeff',dk:'#082040'},sk:GLSK});
INFO['김지우 • 가오란 웡서왓']={st:[10,7,8,6,7,10],p:'크로스 카운터 · 가까이서 맞을 때 22% 확률로 피해를 절반만 받고 바로 반격 (5)',
  sk:[['1.5×3+6','순식간에 파고들어 잽 세 번 → 눈부신 플래시(1.2초 동안 스킬 못 씀) → 스트레이트로 날려버림'],['2.5×3+7','목을 잡고 클린치 · 무릎으로 세 번 차올린 뒤 팔꿈치로 내리찍음'],['24','만화 컷과 함께 신권 · 금빛 주먹 한 방이 경기장을 가로지르며 충격파']]};

// ======================================================================
// 공통 타격 연출 (웹툰 액션 느낌) : 임팩트 프레임 · 기운 주먹 · 기운 불꽃 · 잔상 띠
// ======================================================================
// 임팩트 프레임 : 맞는 순간 아주 짧게 흑백 반전 + 가시 섬광
function lkImp(x,y,R,col){FX.push({k:'lkimp',x,y,R,col,a:rnd(0,TAU),sd:Math.floor(rnd(0,999)),l:.18,m:.18})}
FXD.lkimp=x=>{const p=1-x.l/x.m,R=x.R*(.75+p*.5),inv=p<.38;g.save();g.translate(x.x,x.y);g.globalAlpha=inv?1:Math.max(0,1-(p-.38)/.62);
  g.fillStyle=inv?'rgba(6,4,10,.94)':'rgba(255,255,255,.9)';g.beginPath();g.arc(0,0,R*.58,0,TAU);g.fill();
  g.fillStyle=inv?'#ffffff':x.col;g.beginPath();for(let i=0;i<20;i++){const a=x.a+i*TAU/20,r1=R*(.12+((i*7+x.sd)%5)*.035),r2=R*(.7+((i*13+x.sd)%7)*.08)*(i%2?.72:1),w=.075;g.moveTo(Math.cos(a-w)*r1,Math.sin(a-w)*r1);g.lineTo(Math.cos(a)*r2,Math.sin(a)*r2);g.lineTo(Math.cos(a+w)*r1,Math.sin(a+w)*r1)}g.fill();
  g.globalCompositeOperation='lighter';glow(x.col,0,0,R,.9*(1-p));glow('#ffffff',0,0,R*.38,1-p);g.restore()};
// 방향 충격파 (부채꼴 호가 앞으로 퍼짐)
function lkCone(x,y,a,col,big){FX.push({k:'lkcone',x,y,a,col,b:big?1.6:1,l:.32,m:.32})}
FXD.lkcone=x=>{const p=1-x.l/x.m,e=1-Math.pow(1-p,2);g.save();g.translate(x.x,x.y);g.rotate(x.a);g.globalCompositeOperation='lighter';g.lineCap='round';
  for(let k=0;k<3;k++){const R=(18+e*120*x.b)+k*18*x.b,sp=.75-k*.12;g.globalAlpha=(1-p)*(1-k*.25);g.strokeStyle=k?x.col:'#ffffff';g.lineWidth=(k?5:9)*(1-p)*x.b+1;g.beginPath();g.arc(-10,0,R,-sp,sp);g.stroke()}
  g.globalAlpha=(1-p)*.8;for(let i=-5;i<=5;i++){const L=40+e*170*x.b;g.strokeStyle=i%2?'rgba(255,255,255,.7)':x.col;g.lineWidth=1.5;g.beginPath();g.moveTo(20+e*30,i*6*x.b);g.lineTo(20+L,i*15*x.b);g.stroke()}g.restore()};
// 기운 주먹 (위에서 본 주먹 · +x 방향으로 뻗음)
function lkFistPath(){g.beginPath();g.moveTo(-13,-8.5);g.lineTo(2,-11.5);[-8,-2.7,2.7,8].forEach(y=>g.arc(10,y,3.1,-Math.PI/2,Math.PI/2));g.lineTo(2,11.5);g.quadraticCurveTo(-4,14,-9,11);g.lineTo(-13,8.5);g.closePath()}
function lkFist(s,col,al,flame){if(al<=0||s<=0)return;g.save();g.scale(s,s);
  g.save();g.globalCompositeOperation='lighter';glow(col,0,0,24,al*.7);
  if(flame){for(let i=0;i<6;i++){const y=(i-2.5)*4.2,L=20+((i*7)%3)*9+Math.sin(clock*22+i*1.7)*6;g.globalAlpha=al*.45;g.fillStyle=col;g.beginPath();g.moveTo(-10,y-4);g.quadraticCurveTo(-10-L*.5,y-2.5,-10-L,y+Math.sin(clock*16+i)*3);g.quadraticCurveTo(-10-L*.5,y+2.5,-10,y+4);g.fill()}}
  g.restore();g.globalAlpha=al;const gr=g.createLinearGradient(-14,0,14,0);gr.addColorStop(0,col);gr.addColorStop(.75,col);gr.addColorStop(1,'#ffffff');g.fillStyle=gr;lkFistPath();g.fill();
  g.globalCompositeOperation='lighter';g.strokeStyle='#ffffff';g.lineWidth=1.4;g.stroke();g.lineWidth=1;[-5.3,0,5.3].forEach(y=>{g.beginPath();g.moveTo(3,y);g.lineTo(9.5,y);g.stroke()});
  g.beginPath();g.moveTo(-6,9.5);g.quadraticCurveTo(1,13,7,10.5);g.stroke();g.restore()}
// 기운 불꽃 (공 둘레에서 위로 타오름)
function lkAura(x,y,r,col,k){if(k<=0)return;g.save();g.translate(x,y);g.globalCompositeOperation='lighter';glow(col,0,0,r*(1.6+k*.8),.28*k);
  for(let i=0;i<12;i++){const a=i*TAU/12+Math.sin(clock*1.7+i)*.15,ph=(clock*1.9+i*.413)%1,bx=Math.cos(a)*r*.92,by=Math.sin(a)*r*.92,h=r*(.5+1.1*k)*(1-ph*.6)*(.75+.35*Math.sin(i*2.7+clock*6)),w=r*.3;
    const tx=bx*1.05+Math.sin(clock*6+i*2)*5,ty=by-h-ph*8;g.globalAlpha=(1-ph)*.5*Math.min(1,k);g.fillStyle=col;g.beginPath();g.moveTo(bx-w,by);g.quadraticCurveTo(bx-w*.5,by-h*.55,tx,ty);g.quadraticCurveTo(bx+w*.5,by-h*.55,bx+w,by);g.fill();
    g.globalAlpha*=.55;g.fillStyle='#ffffff';g.beginPath();g.moveTo(bx-w*.4,by);g.quadraticCurveTo(bx-w*.2,by-h*.35,bx*1.02,by-h*.55);g.quadraticCurveTo(bx+w*.2,by-h*.35,bx+w*.4,by);g.fill()}g.restore()}
// 잔상 띠 (지나간 길을 따라 가늘어지는 빛 띠)
function lkRibbon(P,w,col,al){if(P.length<2||al<=0)return;g.save();g.globalCompositeOperation='lighter';g.lineCap='round';g.lineJoin='round';
  for(let i=1;i<P.length;i++){const u=i/P.length;g.globalAlpha=al*u;g.strokeStyle=col;g.lineWidth=w*u;g.beginPath();g.moveTo(P[i-1].x,P[i-1].y);g.lineTo(P[i].x,P[i].y);g.stroke();g.strokeStyle='#ffffff';g.lineWidth=w*u*.35;g.stroke()}g.restore()}
// 휘두름 자국 (초승달 모양)
function lkSwoosh(x,y,a0,a1,R,w,col,al){if(al<=0)return;g.save();g.translate(x,y);g.globalCompositeOperation='lighter';g.globalAlpha=al;const n=16;g.beginPath();
  for(let i=0;i<=n;i++){const u=i/n,a=a0+(a1-a0)*u,r=R+w*Math.sin(Math.PI*u)*.5;i?g.lineTo(Math.cos(a)*r,Math.sin(a)*r):g.moveTo(Math.cos(a)*r,Math.sin(a)*r)}
  for(let i=n;i>=0;i--){const u=i/n,a=a0+(a1-a0)*u,r=R-w*Math.sin(Math.PI*u)*.5;g.lineTo(Math.cos(a)*r,Math.sin(a)*r)}g.closePath();g.fillStyle=col;g.fill();
  g.strokeStyle='#ffffff';g.lineWidth=2;g.beginPath();for(let i=0;i<=n;i++){const u=i/n,a=a0+(a1-a0)*u,r=R+w*Math.sin(Math.PI*u)*.5;i?g.lineTo(Math.cos(a)*r,Math.sin(a)*r):g.moveTo(Math.cos(a)*r,Math.sin(a)*r)}g.stroke();g.restore()}
// 번개 가지
function lkBolt(x1,y1,x2,y2,col,w){const n=7,P=[[x1,y1]],dx=x2-x1,dy=y2-y1,L=Math.hypot(dx,dy)||1;for(let i=1;i<n;i++){const u=i/n,j=(Math.random()-.5)*L*.35;P.push([x1+dx*u-dy/L*j,y1+dy*u+dx/L*j])}P.push([x2,y2]);
  g.save();g.globalCompositeOperation='lighter';g.lineJoin='round';g.lineCap='round';g.strokeStyle=col;g.lineWidth=w*2.5;g.globalAlpha=.45;g.beginPath();P.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.stroke();g.globalAlpha=1;g.strokeStyle='#ffffff';g.lineWidth=w;g.stroke();g.restore()}
// 날아가는 상대 뒤에 남는 빛 줄기
function lkTrail(e,col,t){e.lkTr={col,t,m:t,P:[]}}
const _updLKT=update;update=function(dt){_updLKT(dt);if(F)F.forEach(f=>{if(f.lkTr){f.lkTr.t-=dt;f.lkTr.P.push({x:f.x,y:f.y});if(f.lkTr.P.length>10)f.lkTr.P.shift();if(f.lkTr.t<=0)f.lkTr=null}})};
const _lowLKT=lowHP;lowHP=function(f){_lowLKT(f);if(f.lkTr&&!f.dead)lkRibbon(f.lkTr.P,f.r*1.5,f.lkTr.col,.8*f.lkTr.t/f.lkTr.m)};
// 경기장 어둡게 (궁 동안)
function lkDim(a){if(a<=0)return;g.save();g.globalAlpha=a;g.fillStyle='#05030a';g.fillRect(-40,-40,A+80,A+80);g.restore()}
// 글러브 (반짝이는 권투 글러브)
function glove(s,col,al){g.save();g.scale(s,s);g.globalAlpha=al==null?1:al;col=col||'#d81e1e';
  const gr=g.createRadialGradient(5,-5,1,2,0,15);gr.addColorStop(0,'#ffffff');gr.addColorStop(.18,'#ffb0a0');gr.addColorStop(.5,col);gr.addColorStop(1,'#3a0404');
  g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.ellipse(4,3,13,11,0,0,TAU);g.fill();
  g.fillStyle=gr;g.strokeStyle='#1a0202';g.lineWidth=1.8;g.beginPath();g.moveTo(-8,-8);g.quadraticCurveTo(0,-13,8,-11);g.quadraticCurveTo(16,-8,15,1);g.quadraticCurveTo(14,10,5,11);g.lineTo(-8,9);g.closePath();g.fill();g.stroke();
  g.beginPath();g.moveTo(-3,7);g.quadraticCurveTo(-2,0,6,1);g.quadraticCurveTo(10,2,9,6);g.stroke();
  g.fillStyle='#f6f1e4';g.fillRect(-14,-7,7,14);g.strokeRect(-14,-7,7,14);g.strokeStyle='#c8202a';g.lineWidth=1.2;g.beginPath();g.moveTo(-13,-3);g.lineTo(-8,3);g.moveTo(-8,-3);g.lineTo(-13,3);g.stroke();
  g.fillStyle='rgba(255,255,255,.55)';g.beginPath();g.ellipse(7,-6,4.5,2.2,-.35,0,TAU);g.fill();g.restore()}

// 권투하는 몸 : 어깨에서 팔이 나와 글러브(또는 맨주먹)를 뻗음 · e1=앞손, e2=뒷손 (0=가드, 1=끝까지 뻗음)
function lkBody(o,a,e1,e2,reach,kind,col,up){const px=-Math.sin(a),py=Math.cos(a),ca=Math.cos(a),sa=Math.sin(a),R=o.r;
  [[-1,e1],[1,e2]].forEach(([sd,ex])=>{const u=ex<0?0:1-Math.pow(1-Math.min(1,ex),2),sx=o.x-ca*R*.15+px*sd*R*.9,sy=o.y-sa*R*.15+py*sd*R*.9;
    let gx=o.x+ca*(R*1.05+u*reach)+px*sd*R*(.62-.5*u),gy=o.y+sa*(R*1.05+u*reach)+py*sd*R*(.62-.5*u);if(up&&sd==1){gx=o.x+px*R*.7-ca*R*.2;gy=o.y+py*R*.7-sa*R*.2-R*1.5*up}
    const bx=(sx+gx)/2+px*sd*R*.55*(1-u),by=(sy+gy)/2+py*sd*R*.55*(1-u);
    g.save();g.lineCap='round';g.strokeStyle='#1a0e04';g.lineWidth=R*.5;g.beginPath();g.moveTo(sx,sy);g.quadraticCurveTo(bx,by,gx,gy);g.stroke();g.strokeStyle=kind=='fist'?'#d9a074':'#c98a58';g.lineWidth=R*.34;g.stroke();g.strokeStyle='rgba(255,230,200,.45)';g.lineWidth=R*.1;g.stroke();g.restore();
    g.save();g.translate(gx,gy);g.rotate(up&&sd==1?-Math.PI/2:a);if(kind=='fist'){g.save();g.globalCompositeOperation='lighter';glow(col,0,0,R*.9,.5+.4*u);g.restore();lkSkin(R*.046)}else glove(R*.052);g.restore()});
  g.save();g.translate(o.x-ca*R*.1,o.y-sa*R*.1);g.rotate(a);g.fillStyle='rgba(0,0,0,.25)';g.beginPath();g.ellipse(-R*.2,0,R*.55,R*1.05,0,0,TAU);g.fill();g.restore()}
// 맨주먹 (살색)
function lkSkin(s){g.save();g.scale(s,s);const gr=g.createLinearGradient(-13,0,14,0);gr.addColorStop(0,'#a8704a');gr.addColorStop(.7,'#e6b48a');gr.addColorStop(1,'#ffe2c4');g.fillStyle=gr;g.strokeStyle='#2a1406';g.lineWidth=1.8;lkFistPath();g.fill();g.stroke();
  g.lineWidth=1.2;[-5.3,0,5.3].forEach(y=>{g.beginPath();g.moveTo(3,y);g.lineTo(9.5,y);g.stroke()});g.beginPath();g.moveTo(-6,9.5);g.quadraticCurveTo(1,13,7,10.5);g.stroke();g.fillStyle='rgba(255,255,255,.45)';[-8,-2.7,2.7,8].forEach(y=>{g.beginPath();g.arc(10.5,y-1,1.3,0,TAU);g.fill()});g.restore()}

// ======================================================================
// 김지우 • 가오란
// ======================================================================
const GLC='#ffcc33';
// 패시브 : 크로스 카운터
const _hurtGL=hurt;hurt=function(t,n,o){if(t&&t.d&&t.d.k=='gaor'&&o&&o!=t&&n>0&&!t.dead&&!(t.glcd>0)&&dist(t,o)<o.r+t.r+130&&Math.random()<.22){t.glcd=1.2;const a=[...arguments];a[1]=Math.round(n*.5*10)/10;const r=_hurtGL.apply(this,a);
  if(!o.dead){SFXa('gl_counter');const an=ang(t,o);t.glc={a:an,t:0};_hurtGL(o,5,t,o.x,o.y,0,1);const hx=o.x-Math.cos(an)*o.r,hy=o.y-Math.sin(an)*o.r;lkImp(hx,hy,60,GLC);lkCone(hx,hy,an,GLC,0);ft(t.x,t.y-t.r-36,'카운터!',GLC,24);hs=.08;shake=Math.max(shake,10)}return r}return _hurtGL.apply(this,arguments)};
const _updGL=update;update=function(dt){_updGL(dt);if(F)F.forEach(f=>{if(f.glcd>0)f.glcd-=dt;if(f.glc){f.glc.t+=dt;if(f.glc.t>.28)f.glc=null}})};
const _lowGL=lowHP;lowHP=function(f){_lowGL(f);if(f.glc&&!f.dead){const u=f.glc.t/.28,r=Math.sin(Math.PI*Math.min(1,u*1.6));g.save();g.translate(f.x,f.y);g.rotate(f.glc.a);lkSwoosh(0,0,-.5,.5,f.r+18+r*20,16*r,GLC,.6*(1-u));g.translate(f.r+r*34,0);glove(1.5);g.restore()}};
EMB.gaor=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*3)*.05);g.save();g.rotate(-.35);g.scale(.84,.84);g.translate(2,0);
  neon({col:D.col,hi:'#ffffff'},1.1,()=>{g.beginPath();[-6,0,6].forEach(y=>{g.moveTo(-23,y);g.lineTo(-29+Math.abs(y)*.3,y)})});
  neon(D,1.9,()=>{g.beginPath();g.moveTo(-11,-6);g.quadraticCurveTo(-11,-15,0,-15);g.lineTo(7,-15);g.quadraticCurveTo(18,-15,18,-3);g.quadraticCurveTo(18,11,5,11);g.lineTo(-11,11);g.closePath();
    g.moveTo(-5,11);g.quadraticCurveTo(-5,1,4,0);g.quadraticCurveTo(12,0,13,5);g.moveTo(4,-15);g.quadraticCurveTo(10,-10,8,-4);
    g.moveTo(-11,-5);g.lineTo(-19,-5);g.lineTo(-19,10);g.lineTo(-11,10)});
  neon({col:'#ff3030',hi:'#ffe0e0'},1.2,()=>{g.beginPath();g.moveTo(-18,-1);g.lineTo(-12,5);g.moveTo(-12,-1);g.lineTo(-18,5)});g.restore();
  const s=.6+Math.sin(clock*5)*.25;neon({col:'#fff7b0',hi:'#ffffff'},1.1,()=>{g.beginPath();g.moveTo(15,-21);g.lineTo(15,-21-6*s);g.moveTo(15,-21);g.lineTo(15+6*s,-21);g.moveTo(15,-21);g.lineTo(15,-21+6*s);g.moveTo(15,-21);g.lineTo(15-6*s,-21)})};

// 1) 플래시 · 컴비네이션 : 파고들기 → 잽 1·2·3 → 눈앞 섬광 → 스트레이트
function glCombo(o,t){HZ.push({k:'glc',o,tg:t,t:0,sx:o.x,sy:o.y,n:0,pz:[],P:[{x:o.x,y:o.y}],nums:[]});SFXa('gl_jab');for(let i=0;i<6;i++)dustP(o.x,o.y+o.r*.6,rnd(40,90))}
HZX.glc=(h,dt)=>{const o=h.o,e=h.tg;if(o.dead||!e||e.dead)return false;o.gcd=Math.max(o.gcd,.3);o.cast=null;h.pz.forEach(p=>p.t+=dt);h.pz=h.pz.filter(p=>p.t<.16);
  const a=ang(o,e);h.a=a;h.P.push({x:o.x,y:o.y});if(h.P.length>12)h.P.shift();
  if(h.t<.16){const d=dist(o,e)-o.r-e.r-16;if(d>0){const st=Math.min(d,1700*dt);o.x+=Math.cos(a)*st;o.y+=Math.sin(a)*st}return true}
  const P=[.24,.36,.48];if(h.n<3&&h.t>=P[h.n]){h.n++;SFXa('gl_jab');hurt(e,1.5,o,e.x,e.y,0,0);const sd=h.n%2?-1:1;h.pz.push({t:0,sd,s:1.6});h.nums.push({n:h.n,t:h.t,x:e.x+rnd(-14,14),y:e.y-e.r-20});
    const hx=e.x-Math.cos(a)*e.r,hy=e.y-Math.sin(a)*e.r;lkImp(hx,hy,34+h.n*6,GLC);punchFX(hx,hy,a+Math.PI,'#ffffff',0);e.sq=.6;e.sa=a;e.x=clamp(e.x+Math.cos(a)*6,e.r,A-e.r);e.y=clamp(e.y+Math.sin(a)*6,e.r,A-e.r);shake=Math.max(shake,4)}
  if(h.t>=.62&&!h.fls){h.fls=1;h.ft=h.t;SFXa('gl_flash');e.gcd=Math.max(e.gcd,1.2);e.cast=null;e.glBlind=1.2;FX.push({k:'glflare',x:e.x,y:e.y-4,l:.5,m:.5})}
  if(h.t>=.95&&!h.st){h.st=1;h.stt=h.t;SFXa('gl_str');hurt(e,6,o,e.x,e.y,0,1);const hx=e.x-Math.cos(a)*e.r,hy=e.y-Math.sin(a)*e.r;lkImp(hx,hy,96,GLC);lkCone(hx,hy,a,GLC,1);punchFX(e.x,e.y,a,GLC,1);
    e.flyA=a;e.flyT=.28;e.flyV=850;lkTrail(e,GLC,.4);shake=Math.max(shake,16);hs=.09}
  return h.t<1.35};
// 렌즈 플레어 (눈앞에서 번쩍)
FXD.glflare=x=>{const p=1-x.l/x.m,al=p<.15?p/.15:1-(p-.15)/.85;g.save();g.translate(x.x,x.y);g.globalCompositeOperation='lighter';glow('#ffffff',0,0,70+p*60,al);glow('#ffe08a',0,0,150,al*.6);
  const s=1+p*.8;[[1,.06,260],[.06,1,120]].forEach(([sx,sy,L])=>{const gr=g.createRadialGradient(0,0,0,0,0,L*s);gr.addColorStop(0,'rgba(255,255,255,'+al+')');gr.addColorStop(.5,'rgba(255,230,150,'+al*.5+')');gr.addColorStop(1,'rgba(255,200,80,0)');g.save();g.scale(sx,sy);g.fillStyle=gr;g.beginPath();g.arc(0,0,L*s,0,TAU);g.fill();g.restore()});
  g.rotate(p*2);g.fillStyle='rgba(255,255,240,'+al+')';for(let k=0;k<4;k++){g.rotate(TAU/4);g.beginPath();g.moveTo(0,-5);g.lineTo(46*s,0);g.lineTo(0,5);g.fill()}
  g.strokeStyle='rgba(255,240,190,'+al*.7+')';g.lineWidth=3;g.beginPath();g.arc(0,0,30+p*90,0,TAU);g.stroke();g.restore();
  if(p<.6){g.save();g.font='900 24px "Black Han Sans",'+FB;g.textAlign='center';g.lineJoin='round';g.lineWidth=7;g.strokeStyle='#111';g.strokeText('플래시!',x.x,x.y-62);g.fillStyle='#ffe08a';g.fillText('플래시!',x.x,x.y-62);g.restore()}};
const _updGLB=update;update=function(dt){_updGLB(dt);if(F)F.forEach(f=>{if(f.glBlind>0)f.glBlind-=dt})};
const _lowGLB=lowHP;lowHP=function(f){_lowGLB(f);if(f.glBlind>0&&!f.dead&&!f.hid){const a=Math.min(1,f.glBlind/.25);g.save();g.translate(f.x,f.y);g.globalCompositeOperation='lighter';glow('#ffffff',0,0,f.r*1.4,.35*a);g.restore();
  g.save();g.translate(f.x,f.y-f.r-22);g.globalAlpha=a;g.fillStyle='#fff';g.strokeStyle='#111';g.lineWidth=2;g.beginPath();g.moveTo(-12,0);g.quadraticCurveTo(0,-9,12,0);g.quadraticCurveTo(0,9,-12,0);g.fill();g.stroke();
  g.strokeStyle='#e8202c';g.lineWidth=2.5;g.beginPath();g.moveTo(-6,-5);g.lineTo(6,5);g.moveTo(6,-5);g.lineTo(-6,5);g.stroke();g.restore()}};
HZD.glc=h=>{const o=h.o;if(o.dead)return;if(h.t<.3)lkRibbon(h.P,o.r*1.7,GLC,.7*(1-h.t/.3))};
HZP.glc=h=>{const o=h.o,e=h.tg;if(o.dead||!e)return;const R=o.r;if(h.st&&h.rch==null){h.rch=Math.min(90,Math.max(8,dist(o,e)-R-e.r*.6-R*1.05));h.ra=h.a}const a=h.st?h.ra:(h.a||ang(o,e)),reach=h.st?h.rch:Math.min(90,Math.max(8,dist(o,e)-R-e.r*.6-R*1.05)),px=-Math.sin(a),py=Math.cos(a),ca=Math.cos(a),sa=Math.sin(a);
  lkAura(o.x,o.y,R,GLC,h.t<.95?.5:Math.max(0,1-(h.t-.95)/.3));
  let e1=0,e2=0;h.pz.forEach(p=>{const u=p.t/.16;e1=Math.max(e1,u<.3?u/.3:1-(u-.3)/.7)});
  if(h.st&&h.t<h.stt+.32){const q=(h.t-h.stt)/.32;e2=q<.3?1:1-(q-.3)/.7}
  // 잽 빛 꼬리
  if(e1>.2){const sx=o.x-px*R*.9,sy=o.y-py*R*.9,L=R*1.05+e1*reach;g.save();g.translate(sx,sy);g.rotate(a);g.globalCompositeOperation='lighter';const gr=g.createLinearGradient(0,0,L,0);gr.addColorStop(0,'rgba(255,204,51,0)');gr.addColorStop(1,'rgba(255,245,210,'+(.8*e1)+')');g.fillStyle=gr;g.beginPath();g.moveTo(0,-2);g.lineTo(L,-R*.45);g.lineTo(L,R*.45);g.lineTo(0,2);g.fill();g.restore()}
  // 스트레이트 빛 꼬리
  if(e2>0){const sx=o.x+px*R*.9,sy=o.y+py*R*.9,L=R*1.05+reach;g.save();g.translate(sx,sy);g.rotate(a);g.globalCompositeOperation='lighter';const gr=g.createLinearGradient(0,0,L,0);gr.addColorStop(0,'rgba(255,204,51,0)');gr.addColorStop(1,'rgba(255,250,225,'+e2+')');g.fillStyle=gr;g.beginPath();g.moveTo(0,-4);g.lineTo(L,-R*.9*e2);g.lineTo(L,R*.9*e2);g.lineTo(0,4);g.fill();g.restore()}
  lkBody(o,a,e1,e2,reach,'glove',GLC);
  // 스트레이트 준비 : 뒷손에 금빛이 모임
  if(h.fls&&!h.st){const u=clamp((h.t-.75)/.2,0,1),gx=o.x+ca*R*1.05+px*R*.62,gy=o.y+sa*R*1.05+py*R*.62;g.save();g.translate(gx,gy);g.globalCompositeOperation='lighter';glow(GLC,0,0,18+u*30,.5+u*.5);for(let k=0;k<8;k++){const an=k*TAU/8+h.t*7,r=10+46*(1-u);glow('#fff0b0',Math.cos(an)*r,Math.sin(an)*r,4,u)}g.restore()}
  // 1 · 2 · 3 숫자
  h.nums.forEach(q=>{const k=h.t-q.t;if(k>.5)return;const sc=k<.08?2.2-1.2*k/.08:1;g.save();g.translate(q.x,q.y-k*30);g.scale(sc,sc);g.globalAlpha=1-Math.max(0,k-.3)/.2;g.font='900 28px "Black Han Sans",'+FB;g.textAlign='center';g.lineJoin='round';g.lineWidth=7;g.strokeStyle='#111';g.strokeText(q.n,0,0);g.fillStyle='#fff';g.fillText(q.n,0,0);g.restore()})};

// 2) 무에타이 · 클린치 : 목을 잡고 무릎 1·2·3 → 팔꿈치 내려찍기
function glClinch(o,t){HZ.push({k:'glcl',o,tg:t,t:0,n:0,kn:[],nums:[]});SFXa('gl_jab')}
HZX.glcl=(h,dt)=>{const o=h.o,e=h.tg;if(o.dead||!e||e.dead)return false;o.gcd=Math.max(o.gcd,.3);o.cast=null;h.kn.forEach(k=>k.t+=dt);h.kn=h.kn.filter(k=>k.t<.24);
  const a=Math.atan2(e.y-o.y,e.x-o.x);if(h.t<.15){const d=dist(o,e)-o.r-e.r+6;o.x+=Math.cos(a)*d*Math.min(1,dt*14);o.y+=Math.sin(a)*d*Math.min(1,dt*14);return true}
  if(!h.ca){h.ca=a;h.ox=o.x;h.oy=o.y;e.stn=Math.max(e.stn,1.2);ft(e.x,e.y-e.r-40,'클린치!',GLC,22);lkImp(e.x-Math.cos(a)*e.r,e.y-Math.sin(a)*e.r,40,GLC)}o.x=h.ox;o.y=h.oy;e.x=clamp(o.x+Math.cos(h.ca)*(o.r+e.r-4),e.r,A-e.r);e.y=clamp(o.y+Math.sin(h.ca)*(o.r+e.r-4),e.r,A-e.r);e.stn=Math.max(e.stn,.2);e.cast=null;
  const K=[.32,.58,.84];if(h.n<3&&h.t>=K[h.n]){h.n++;SFXa('gl_knee');hurt(e,2.5,o,e.x,e.y,0,0);h.kn.push({t:0,sd:h.n%2?-1:1});h.nums.push({n:h.n,t:h.t});e.sq=1;e.sa=-Math.PI/2;shake=Math.max(shake,8);lkImp(e.x,e.y+e.r*.5,44+h.n*8,GLC);punchFX(e.x,e.y+e.r*.3,-Math.PI/2,'#ffffff',0)}
  if(h.t>=1.1&&!h.el){h.el=1;h.et=h.t;SFXa('gl_elbow');hurt(e,7,o,e.x,e.y,0,1);lkImp(e.x,e.y-e.r*.3,100,GLC);punchFX(e.x,e.y-e.r,Math.PI/2,GLC,1);FX.push({k:'crack',x:e.x,y:e.y,r:64,l:1.6,m:1.6});ring(e.x,e.y,e.r,e.r+90,GLC,8,.4);for(let i=0;i<10;i++)dustP(e.x,e.y,rnd(80,160));e.stn=Math.max(e.stn,.45);shake=Math.max(shake,18);hs=.1}
  return h.t<1.45};
function glArm(x1,y1,x2,y2,bx,by){g.save();g.lineCap='round';g.strokeStyle='#2a1604';g.lineWidth=13;g.beginPath();g.moveTo(x1,y1);g.quadraticCurveTo(bx,by,x2,y2);g.stroke();g.strokeStyle='#c98a58';g.lineWidth=8.5;g.stroke();g.strokeStyle='rgba(255,220,180,.6)';g.lineWidth=2.5;g.stroke();
  g.fillStyle='#c98a58';g.strokeStyle='#2a1604';g.lineWidth=2;g.beginPath();g.arc(x2,y2,6.5,0,TAU);g.fill();g.stroke();g.restore()}
HZP.glcl=h=>{const o=h.o,e=h.tg;if(o.dead||!e)return;const ca=h.ca||ang(o,e);lkAura(o.x,o.y,o.r,GLC,.55);
  if(h.ca&&!h.el){[-1,1].forEach(sd=>{const px=-Math.sin(ca)*sd*17,py=Math.cos(ca)*sd*17;glArm(o.x+px,o.y+py,e.x-Math.cos(ca)*3+px*.35,e.y-Math.sin(ca)*3+py*.35-e.r*.45,e.x+px*1.6-Math.cos(ca)*e.r*.6,e.y+py*1.6-16)})}
  h.kn.forEach(k=>{const u=k.t/.24,r=Math.sin(Math.PI*Math.min(1,u*1.3)),kx=e.x+k.sd*8,ky=e.y+e.r*1.3-r*e.r*1.5;
    lkSwoosh(kx,e.y+e.r*1.6,-Math.PI/2-.9*k.sd,-Math.PI/2,e.r*1.1,18*r,GLC,.7*(1-u));
    g.save();g.translate(kx,ky);g.globalCompositeOperation='lighter';glow(GLC,0,-8,36*r,.9);g.restore();
    g.save();g.translate(kx,ky);g.fillStyle='#c98a58';g.strokeStyle='#2a1604';g.lineWidth=2.5;g.beginPath();g.moveTo(-9,18);g.lineTo(-11,0);g.quadraticCurveTo(0,-16,11,0);g.lineTo(9,18);g.closePath();g.fill();g.stroke();g.fillStyle='#ffcc33';g.fillRect(-12,5,24,5);g.strokeRect(-12,5,24,5);g.restore()});
  h.nums.forEach(q=>{const k=h.t-q.t;if(k>.45)return;const sc=k<.08?2-k/.08:1;g.save();g.translate(e.x+22,e.y-e.r-26-k*26);g.scale(sc,sc);g.globalAlpha=1-Math.max(0,k-.25)/.2;g.font='900 26px "Black Han Sans",'+FB;g.textAlign='center';g.lineJoin='round';g.lineWidth=7;g.strokeStyle='#111';g.strokeText(q.n,0,0);g.fillStyle=GLC;g.fillText(q.n,0,0);g.restore()});
  // 팔꿈치 : 높이 들어올렸다가 크게 내려찍음
  if(h.t>.92&&!h.el){const u=clamp((h.t-.92)/.18,0,1);g.save();g.translate(e.x-20,e.y-e.r-58-u*14);g.rotate(-.5-u*.4);g.save();g.globalCompositeOperation='lighter';glow(GLC,0,0,26+u*20,.6);g.restore();g.fillStyle='#c98a58';g.strokeStyle='#2a1604';g.lineWidth=2.5;g.beginPath();g.moveTo(-20,-9);g.lineTo(14,-9);g.lineTo(5,12);g.closePath();g.fill();g.stroke();g.restore()}
  if(h.el&&h.t<h.et+.32){const u=(h.t-h.et)/.32;lkSwoosh(e.x,e.y,-Math.PI*.95,-Math.PI*.15,e.r+34,30*(1-u*.5),GLC,.85*(1-u));
    g.save();g.translate(e.x+6,e.y-e.r*.5);g.rotate(.5);g.globalAlpha=1-u;g.fillStyle='#c98a58';g.strokeStyle='#2a1604';g.lineWidth=2.5;g.beginPath();g.moveTo(-24,-10);g.lineTo(18,-10);g.lineTo(7,13);g.closePath();g.fill();g.stroke();g.restore()}};

// 3) ULT 신권 · 갓 글로우 : 경기장이 어두워지고 금빛이 모였다가 거대한 빛의 주먹이 가로지름
function glGod(o,t){if(!t||t.dead)t=tgt(o);if(!t)return;HZ.push({k:'glgod',o,tg:t,t:0,sx:o.x,sy:o.y,a:ang(o,t),pc:Array.from({length:30},()=>({a:rnd(0,TAU),r:rnd(90,190),s:rnd(.8,1.4)}))});SFXa('gl_god')}
HZX.glgod=(h,dt,EN)=>{const o=h.o,e=h.tg;if(o.dead)return false;o.gcd=Math.max(o.gcd,.4);o.cast=null;const W=.5;
  if(h.t<W){if(e&&!e.dead){h.a=ang(o,e);e.slow=Math.max(e.slow,.3)}o.x=h.sx;o.y=h.sy;if(Math.random()<.4)dustP(o.x+rnd(-30,30),o.y+o.r,rnd(30,70));return true}
  if(!h.go){h.go=1;const d=e&&!e.dead?dist(o,e)-o.r-e.r-6:120;h.fx=o.x;h.fy=o.y;o.x=clamp(o.x+Math.cos(h.a)*d,o.r,A-o.r);o.y=clamp(o.y+Math.sin(h.a)*d,o.r,A-o.r);h.hx=o.x+Math.cos(h.a)*(o.r+10);h.hy=o.y+Math.sin(h.a)*(o.r+10);shake=Math.max(shake,28);hs=.2;FX.push({k:'frost',l:.16,m:.16,c:'#fff4cc'});
    lkImp(h.hx,h.hy,170,GLC);lkCone(h.hx,h.hy,h.a,GLC,1);ring(h.hx,h.hy,20,300,'#fff0b0',12,.6);ring(h.hx,h.hy,10,200,GLC,6,.5);
    EN.forEach(x=>{if(x.hid||x.jump)return;const px=x.x-o.x,py=x.y-o.y,al=px*Math.cos(h.a)+py*Math.sin(h.a),pe=Math.abs(-px*Math.sin(h.a)+py*Math.cos(h.a));if(x==e||(al>0&&pe<60+x.r)){hurt(x,x==e?24:12,o,x.x,x.y,0,1);x.flyA=h.a;x.flyT=.4;x.flyV=1100;x.stn=Math.max(x.stn,.5);lkTrail(x,GLC,.5)}});punchFX(h.hx,h.hy,h.a,GLC,1)}
  return h.t<1.7};
HZD.glgod=h=>{const q=h.go?h.t-.5:0;lkDim(h.go?.55*clamp(1-(q-.3)/.6,0,1):.55*Math.min(1,h.t/.2))};
HZP.glgod=h=>{const o=h.o;if(o.dead)return;
  if(!h.go){const u=h.t/.5;lkAura(o.x,o.y,o.r,GLC,.6+u*1.2);g.save();g.translate(o.x,o.y);g.globalCompositeOperation='lighter';
    for(let k=0;k<10;k++){const an=k*TAU/10+h.t*.6,L=A*(.3+.15*Math.sin(k*3+h.t*9));g.globalAlpha=.18*u;g.fillStyle='#fff0b0';g.beginPath();g.moveTo(0,0);g.lineTo(Math.cos(an-.025)*L,Math.sin(an-.025)*L);g.lineTo(Math.cos(an+.025)*L,Math.sin(an+.025)*L);g.fill()}
    g.globalAlpha=1;(h.pc||[]).forEach(p=>{const r=p.r*(1-u),an=p.a+u*4*p.s;glow('#fff0b0',Math.cos(an)*r,Math.sin(an)*r,6,.9);g.strokeStyle='rgba(255,220,120,.6)';g.lineWidth=2;g.beginPath();g.arc(0,0,Math.max(1,r),an-.5,an);g.stroke()});
    glow('#ffffff',0,0,20+u*30,u);g.restore();lkBody(o,h.a,0,0,0,'glove',GLC);{const R=o.r,gx=o.x+Math.cos(h.a)*R*1.05-Math.sin(h.a)*R*.62,gy=o.y+Math.sin(h.a)*R*1.05+Math.cos(h.a)*R*.62;g.save();g.translate(gx,gy);g.globalCompositeOperation='lighter';glow(GLC,0,0,24+u*40,.6+u*.4);glow('#ffffff',0,0,8+u*14,u);g.restore()}return}
  const q=h.t-.5,fa=clamp(1-(q-.45)/.7,0,1);lkAura(o.x,o.y,o.r,GLC,fa*1.2);
  // 빛줄기
  g.save();g.translate(h.fx,h.fy);g.rotate(h.a);g.globalCompositeOperation='lighter';g.globalAlpha=fa;const L=A*1.5,w=80*(1-q*.4);const gr=g.createLinearGradient(0,-w,0,w);gr.addColorStop(0,'rgba(255,204,51,0)');gr.addColorStop(.3,'rgba(255,215,110,.65)');gr.addColorStop(.5,'#ffffff');gr.addColorStop(.7,'rgba(255,215,110,.65)');gr.addColorStop(1,'rgba(255,204,51,0)');g.fillStyle=gr;g.fillRect(0,-w,L*Math.min(1,q/.1),w*2);
  for(let k=0;k<5;k++){const r=30+((q*560+k*70)%320);g.strokeStyle='rgba(255,240,200,'+Math.max(0,1-r/340)+')';g.lineWidth=5;g.beginPath();g.ellipse(r*.9,0,r*.22,r*.85,0,0,TAU);g.stroke()}g.restore();
  // 거대한 빛의 주먹
  lkBody(o,h.a,0,q<.35?1:Math.max(0,1-(q-.35)/.4),30,'glove',GLC);const mv=Math.min(1,q/.12),d0=Math.hypot(h.hx-h.fx,h.hy-h.fy);g.save();g.translate(h.fx+Math.cos(h.a)*d0*mv,h.fy+Math.sin(h.a)*d0*mv);g.rotate(h.a);lkFist(4.4*(1-q*.25),GLC,fa,1);g.restore()};

// ======================================================================
// 김가은 • 김갑룡 (전설의 주먹) · 상징색 보라
// ======================================================================
const GPC='#a35cff',GPH='#e6d2ff';
const GPSK=[
  {n:'의로운 주먹',w:.35,cd:7,c:(o,t)=>!t.hid&&!t.jump&&dist(o,t)<360,f:(o,t)=>gpPunch(o,t)},
  {n:'대지 가르기',w:.3,cd:9,c:(o,t)=>!t.hid&&dist(o,t)<520,f:(o,t)=>gpFissure(o,t)},
  {n:'전설의 주먹',w:.4,ult:1,c:(o,t)=>!t.hid,f:(o,t)=>mangaCut(o,MGO.gapr[0],()=>gpUlt(o,t))}];
const GPI=DEF.findIndex(d=>d.name=='김가은');
DEF.push({name:'김가은 • 김갑룡',gl:'갑',k:'gapr',vof:GPI,r:29,sp:200,col:'#9b4dff',hi:'#ecdcff',dk:'#1c0838',alt:{col:'#2a2a30',hi:'#d8d8e0',dk:'#08080a'},alt2:{col:'#d4af37',hi:'#fff4d0',dk:'#3a2a04'},sk:GPSK});
INFO['김가은 • 김갑룡']={st:[10,8,6,5,6,10],p:'극복의 경지 · 체력 40 이하가 되면 만화 컷과 함께 각성 · 이후 주는 피해 15% 증가, 받는 피해 15% 감소',
  sk:[['7 + 벽꿍','보랏빛 기운을 모아 거대한 기운의 주먹을 꽂음 · 날아간 상대가 벽에 부딪히면 4 더'],['7 + 띄움','주먹으로 땅을 내리쳐 보랏빛 균열이 상대에게 달려감 · 균열을 따라 바위가 솟구쳐 맞은 적을 띄우고 기절시킴'],['5×3+10','만화 컷 뒤 경기장이 어두워지고 번개 기운을 두른 채 세 번 들이받음 · 하늘에서 거대한 주먹이 떨어져 경기장이 갈라짐']]};

// 패시브 : 극복의 경지
const _updGP=update;update=function(dt){_updGP(dt);if(!F||phase!='play')return;F.forEach(f=>{if(f.d.k!='gapr'||f.dead||f.over||f.hp>40||CIN||TSTOP||MAD)return;f.over=1;f.overT=0;
  mangaCut(f,MGO.gapr[1],()=>{SFXa('gp_aura');lkImp(f.x,f.y,120,GPC);ring(f.x,f.y,f.r,f.r+140,GPC,12,.7);ring(f.x,f.y,f.r,f.r+90,'#ffffff',5,.5);shake=Math.max(shake,14);f.hp=Math.min(100,f.hp+3);ft(f.x,f.y-f.r-14,'+3','#7bff8a',22)})})};
const _hurtGP=hurt;hurt=function(t,n,o){if(n>0){if(o&&o.d&&o.d.k=='gapr'&&o.over&&t!=o){const a=[...arguments];a[1]=Math.round(n*1.15*10)/10;return _hurtGP.apply(this,a)}if(t&&t.d&&t.d.k=='gapr'&&t.over&&o&&o!=t){const a=[...arguments];a[1]=Math.round(n*.85*10)/10;return _hurtGP.apply(this,a)}}return _hurtGP.apply(this,arguments)};
const _lowGP=lowHP;lowHP=function(f){_lowGP(f);if(f.d.k=='gapr'&&!f.dead&&!f.hid){lkAura(f.x,f.y,f.r,GPC,f.over?.9:.25);if(f.over&&Math.random()<.12){const a=rnd(0,TAU);lkBolt(f.x+Math.cos(a)*f.r,f.y+Math.sin(a)*f.r,f.x+Math.cos(a)*(f.r+26),f.y+Math.sin(a)*(f.r+26)-10,GPC,1.5)}}};
EMB.gapr=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*2)*.04);
  neon({col:D.col,hi:'#ffd0c0'},1.1,()=>{g.beginPath();g.moveTo(-15,-12);g.lineTo(-21,-17);g.lineTo(-19,-21);g.moveTo(16,-10);g.lineTo(22,-14);g.lineTo(23,-19);g.moveTo(-17,6);g.lineTo(-23,9)});
  neon(D,1.9,()=>{g.beginPath();g.moveTo(-14,-6);[-10.5,-3.5,3.5,10.5].forEach((x,i)=>{g.arc(x,-7-(i==1||i==2?1:0),3.5,Math.PI,0)});g.lineTo(14,6);g.quadraticCurveTo(14,13,8,14);g.lineTo(-8,14);g.quadraticCurveTo(-14,13,-14,6);g.closePath();
    [-7,0,7].forEach(x=>{g.moveTo(x,-7);g.lineTo(x,0)});
    g.moveTo(-14,3);g.quadraticCurveTo(-6,-1,4,1);g.quadraticCurveTo(8,2,6,6)});
  g.save();g.globalCompositeOperation='lighter';glow(D.col,0,0,17,.35+Math.sin(clock*4)*.1);g.restore()};

// 1) 의로운 주먹 : 기운을 모았다가 거대한 보랏빛 주먹을 꽂음
function gpPunch(o,t){HZ.push({k:'gpp',o,tg:t,t:0,sx:o.x,sy:o.y});SFXa('gp_charge')}
HZX.gpp=(h,dt)=>{const o=h.o,e=h.tg;if(o.dead||!e||e.dead)return h.t<1.2&&h.hit;o.gcd=Math.max(o.gcd,.3);o.cast=null;
  if(!h.hit){const a=ang(o,e);h.a=a;const d=dist(o,e)-o.r-e.r-10;if(h.t<.3){if(d>0){o.x+=Math.cos(a)*Math.min(d,520*dt);o.y+=Math.sin(a)*Math.min(d,520*dt)}if(Math.random()<.5)dustP(o.x,o.y+o.r*.6,rnd(30,60))}
    else{h.hit=1;h.ht=h.t;SFXa('gp_punch');hurt(e,7,o,e.x,e.y,0,1);const hx=e.x-Math.cos(a)*e.r,hy=e.y-Math.sin(a)*e.r;lkImp(hx,hy,110,GPC);lkCone(hx,hy,a,GPC,1);punchFX(hx,hy,a,GPH,1);e.flyA=a;e.flyT=.45;e.flyV=1000;e.gpW=1;lkTrail(e,GPC,.5);shake=Math.max(shake,18);hs=.12}}
  else if(e.gpW&&!(e.flyT>0)){e.gpW=0;const wall=e.x<=e.r+2||e.x>=A-e.r-2||e.y<=e.r+2||e.y>=A-e.r-2;if(wall){SFXa('gp_wall');hurt(e,4,o,e.x,e.y,0,1);lkImp(e.x,e.y,90,GPC);FX.push({k:'crack',x:e.x,y:e.y,r:70,l:1.8,m:1.8});for(let i=0;i<10;i++)rockP(e.x,e.y,rnd(0,TAU),rnd(80,200));shake=Math.max(shake,16);if(typeof wallFlash=='function')wallFlash(e.x,e.y,GPC)}}
  return !h.hit||h.t<h.ht+.8};
HZP.gpp=h=>{const o=h.o;if(o.dead)return;const a=h.a||0;
  if(!h.hit){const u=h.t/.3;lkAura(o.x,o.y,o.r,GPC,.5+u*1.1);lkBody(o,a,0,0,0,'fist',GPC);const R=o.r,gx=o.x+Math.cos(a)*R*1.05-Math.sin(a)*R*.62,gy=o.y+Math.sin(a)*R*1.05+Math.cos(a)*R*.62;g.save();g.translate(gx,gy);g.rotate(a);lkFist(.9+u*1.1,GPC,.35+u*.5,1);g.restore();return}
  const q=h.t-h.ht;lkAura(o.x,o.y,o.r,GPC,Math.max(0,1.2-q*2));
  if(h.rch==null){const e=h.tg;h.rch=e?Math.min(70,Math.max(10,dist(o,e)-o.r*2.05-e.r*.6)):30}lkBody(o,a,0,q<.15?1:Math.max(0,1-(q-.15)/.4),h.rch,'fist',GPC);
  if(q<.4){const u=q/.4,e=h.tg,reach=e?Math.max(30,dist(o,e)):80;g.save();g.translate(o.x,o.y);g.rotate(a);g.globalCompositeOperation='lighter';const gr=g.createLinearGradient(0,0,reach,0);gr.addColorStop(0,'rgba(163,92,255,0)');gr.addColorStop(1,'rgba(240,225,255,'+(1-u)+')');g.fillStyle=gr;g.beginPath();g.moveTo(o.r*.5,-8);g.lineTo(reach,-30*(1-u*.4));g.lineTo(reach,30*(1-u*.4));g.lineTo(o.r*.5,8);g.fill();g.restore();
    g.save();g.translate(o.x+Math.cos(a)*(o.r+30+u*20),o.y+Math.sin(a)*(o.r+30+u*20));g.rotate(a);lkFist(3.4*(1-u*.25),GPC,1-u,1);g.restore()}};

// 2) 대지 가르기 : 주먹으로 땅을 내리치면 보랏빛 균열이 달려가고 바위가 솟구침
function gpFissure(o,t){const a=ang(o,t);HZ.push({k:'gpfs',o,tg:t,t:0,a,sx:o.x,sy:o.y,L:Math.min(560,dist(o,t)+120),pts:[],sp:[],br:[],hit:new Set(),head:0});SFXa('gp_charge')}
HZX.gpfs=(h,dt,EN)=>{const o=h.o;if(o.dead)return false;const W=.35,V=760;
  if(h.t<W){o.gcd=Math.max(o.gcd,.3);o.cast=null;const e=h.tg;if(e&&!e.dead){h.a=ang(o,e);h.L=Math.min(560,dist(o,e)+120)}h.sx=o.x;h.sy=o.y;return true}
  if(!h.slam){h.slam=1;SFXa('gp_punch');SFXa('gp_crack');shake=Math.max(shake,16);lkImp(o.x,o.y,100,GPC);FX.push({k:'crack',x:o.x,y:o.y,r:70,l:1.8,m:1.8});ring(o.x,o.y,8,100,GPC,9,.45);for(let i=0;i<14;i++)rockP(o.x,o.y,rnd(0,TAU),rnd(80,200));for(let i=0;i<6;i++)dustP(o.x,o.y,rnd(60,120))}
  h.head=Math.min(h.L,(h.t-W)*V);
  while(h.pts.length*14<h.head){const d=h.pts.length*14,j=(Math.random()-.5)*22,x=h.sx+Math.cos(h.a)*d-Math.sin(h.a)*j,y=h.sy+Math.sin(h.a)*d+Math.cos(h.a)*j;h.pts.push([x,y]);
    if(h.pts.length%3==0){const an=h.a+(Math.random()<.5?1:-1)*rnd(.7,1.3),L=rnd(14,34);h.br.push([x,y,x+Math.cos(an)*L,y+Math.sin(an)*L])}
    if(h.pts.length%4==0&&d>40){h.sp.push({x,y,t:h.t,s:rnd(.85,1.2)});SFXa('gp_spike');dustP(x,y,rnd(60,120));for(let i=0;i<5;i++)rockP(x,y,rnd(0,TAU),rnd(60,170));
      EN.forEach(e=>{if(h.hit.has(e)||e.hid||e.jump)return;if(Math.hypot(e.x-x,e.y-y)<e.r+34){h.hit.add(e);hurt(e,7,o,e.x,e.y,0,1);lkImp(e.x,e.y+e.r*.4,70,GPC);e.stn=Math.max(e.stn,.7);e.cast=null;e.gpUp=.5;shake=Math.max(shake,10)}})}}
  if(h.head>=h.L&&!h.end){h.end=1;h.et=h.t}
  return !h.end||h.t<h.et+1.1};
const _updGPU=update;update=function(dt){_updGPU(dt);if(F)F.forEach(f=>{if(f.gpUp>0)f.gpUp-=dt})};
const _lowGPU=lowHP;lowHP=function(f){_lowGPU(f);if(f.gpUp>0&&!f.dead){const u=1-f.gpUp/.5,z=Math.sin(Math.PI*u)*40;g.save();g.globalAlpha=.6;g.strokeStyle='#fff';g.lineWidth=2;g.setLineDash([4,4]);g.beginPath();g.moveTo(f.x,f.y+f.r);g.lineTo(f.x,f.y+f.r+z*.5);g.stroke();g.setLineDash([]);g.font='900 16px "Black Han Sans",'+FB;g.textAlign='center';g.lineJoin='round';g.lineWidth=5;g.strokeStyle='#1c0838';g.strokeText('띄움!',f.x,f.y-f.r-26-z*.3);g.fillStyle=GPH;g.fillText('띄움!',f.x,f.y-f.r-26-z*.3);g.restore()}};
HZD.gpfs=h=>{const o=h.o,fa=h.end?clamp(1-(h.t-h.et)/1.1,0,1):1;
  if(!h.slam){const u=h.t/.35;g.save();g.globalAlpha=.3+.5*u;g.strokeStyle=GPC;g.lineWidth=4;g.setLineDash([14,10]);g.lineDashOffset=-clock*90;g.beginPath();g.moveTo(o.x,o.y);g.lineTo(o.x+Math.cos(h.a)*h.L,o.y+Math.sin(h.a)*h.L);g.stroke();g.setLineDash([]);g.restore();return}
  if(h.pts.length>1){const pl=()=>{g.beginPath();h.pts.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y))};g.save();g.globalAlpha=fa;g.lineCap='round';g.lineJoin='round';
    g.strokeStyle='rgba(0,0,0,.35)';g.lineWidth=26;pl();g.stroke();g.strokeStyle='#07030c';g.lineWidth=13;pl();g.stroke();
    g.strokeStyle='#07030c';g.lineWidth=4;h.br.forEach(b=>{g.beginPath();g.moveTo(b[0],b[1]);g.lineTo(b[2],b[3]);g.stroke()});
    g.globalCompositeOperation='lighter';const pu=.7+.3*Math.sin(clock*12);g.strokeStyle='rgba(163,92,255,'+(.35*pu)+')';g.lineWidth=22;pl();g.stroke();g.strokeStyle='rgba(205,160,255,'+pu+')';g.lineWidth=5;pl();g.stroke();g.strokeStyle='#ffffff';g.lineWidth=1.6;pl();g.stroke();
    g.strokeStyle='rgba(190,140,255,.7)';g.lineWidth=1.6;h.br.forEach(b=>{g.beginPath();g.moveTo(b[0],b[1]);g.lineTo(b[2],b[3]);g.stroke()});
    for(let i=0;i<h.pts.length;i+=2){const [x,y]=h.pts[i],ph=(clock*1.3+i*.17)%1;glow(GPC,x+Math.sin(i)*4,y-ph*30,4*(1-ph),.8*(1-ph))}g.restore()}};
HZP.gpfs=h=>{const o=h.o;
  if(!h.slam&&!o.dead){const u=h.t/.35;lkAura(o.x,o.y,o.r,GPC,.5+u);lkBody(o,h.a,0,0,0,'fist',GPC,.4+u*.6);g.save();g.translate(o.x-Math.sin(h.a)*o.r*.7-Math.cos(h.a)*o.r*.2,o.y+Math.cos(h.a)*o.r*.7-Math.sin(h.a)*o.r*.2-o.r*1.5*(.4+u*.6));g.rotate(-Math.PI/2);lkFist(.9+u*.8,GPC,.4+u*.5,1);g.restore()}
  else if(h.t<.55&&!o.dead){const u=(h.t-.35)/.2;lkBody(o,h.a,0,u<.5?1-u*2:0,8,'fist',GPC);g.save();g.translate(o.x,o.y-20+u*14);g.rotate(Math.PI/2);lkFist(2.4*(1-u*.4),GPC,1-u,1);g.restore()}
  h.sp.forEach(s=>{const k=h.t-s.t;if(k>.75)return;const u=k<.07?k/.07:k<.5?1:1-(k-.5)/.25,H=52*u*s.s;if(H<=0)return;g.save();g.translate(s.x,s.y);
    g.fillStyle='rgba(0,0,0,.3)';g.beginPath();g.ellipse(2,6,26*s.s,8,0,0,TAU);g.fill();
    [[-14,.75,-.25],[13,.85,.22],[0,1.2,0]].forEach(([dx,m,rt])=>{const hh=H*m;g.save();g.translate(dx,4);g.rotate(rt);const gr=g.createLinearGradient(0,-hh,0,0);gr.addColorStop(0,'#6b5a7a');gr.addColorStop(1,'#2a2030');g.fillStyle=gr;g.strokeStyle='#0c0810';g.lineWidth=2;g.beginPath();g.moveTo(-10,0);g.lineTo(-3,-hh);g.lineTo(3,-hh+7);g.lineTo(10,0);g.closePath();g.fill();g.stroke();
      g.globalCompositeOperation='lighter';g.strokeStyle='rgba(200,150,255,.85)';g.lineWidth=1.8;g.beginPath();g.moveTo(3,-hh+7);g.lineTo(10,0);g.stroke();g.fillStyle='rgba(255,255,255,.22)';g.beginPath();g.moveTo(-3,-hh);g.lineTo(-7,-2);g.lineTo(-2,-2);g.fill();g.restore()});
    g.globalCompositeOperation='lighter';glow(GPC,0,0,34*u,.6);g.restore()})};

// 3) ULT 전설의 주먹 : 경기장이 어두워지고 번개 기운 → 세 번 들이받기 → 하늘에서 거대한 주먹
function gpUlt(o,t){HZ.push({k:'gpu',o,t:0,n:0,ch:null,tr:[]});SFXa('gp_aura')}
HZX.gpu=(h,dt,EN)=>{const o=h.o;if(o.dead)return false;o.gcd=Math.max(o.gcd,.4);o.cast=null;h.tr.push({x:o.x,y:o.y,t:h.t});h.tr=h.tr.filter(q=>h.t-q.t<.3);
  if(h.n<3&&!h.ch&&h.t>=.25+h.n*.5){const e=EN.filter(x=>!x.hid).sort((p,q)=>dist(o,p)-dist(o,q))[0];if(e){const a=ang(o,e);h.ch={a,t:0,e,hit:0,sx:o.x,sy:o.y,d:dist(o,e)+60};h.n++;SFXa('gp_charge')}else h.n=3}
  if(h.ch){const c=h.ch;c.t+=dt;const u=Math.min(1,c.t/.26);o.x=clamp(c.sx+Math.cos(c.a)*c.d*u,o.r,A-o.r);o.y=clamp(c.sy+Math.sin(c.a)*c.d*u,o.r,A-o.r);
    if(!c.hit&&!c.e.dead&&dist(o,c.e)<o.r+c.e.r+8){c.hit=1;c.hx=c.e.x;c.hy=c.e.y;hurt(c.e,5,o,c.e.x,c.e.y,0,1);SFXa('gp_punch');lkImp(c.e.x-Math.cos(c.a)*c.e.r,c.e.y-Math.sin(c.a)*c.e.r,90,GPC);lkCone(c.e.x,c.e.y,c.a,GPC,0);safePush(c.e,c.a,60);c.e.stn=Math.max(c.e.stn,.35);shake=Math.max(shake,12);hs=.06}if(u>=1)h.ch=null}
  if(h.n>=3&&!h.ch&&!h.fall&&h.t>=1.6){h.fall=1;h.ft=h.t;h.fx=o.x;h.fy=o.y}
  if(h.fall&&!h.gd&&h.t>=h.ft+.3){h.gd=1;h.gt=h.t;SFXa('gp_ground');shake=Math.max(shake,30);hs=.16;FX.push({k:'frost',l:.15,m:.15,c:'#efe2ff'});FX.push({k:'crack',x:o.x,y:o.y,r:170,l:2.8,m:2.8});lkImp(o.x,o.y,220,GPC);ring(o.x,o.y,10,280,GPC,16,.7);ring(o.x,o.y,10,190,'#ffffff',7,.5);
    for(let i=0;i<30;i++)rockP(o.x,o.y,rnd(0,TAU),rnd(120,380));for(let i=0;i<10;i++)dustP(o.x,o.y,rnd(100,220));EN.forEach(x=>{if(x.hid||x.jump)return;if(Math.hypot(x.x-o.x,x.y-o.y)<210+x.r){hurt(x,10,o,x.x,x.y,0,1);const a=ang(o,x);x.flyA=a;x.flyT=.25;x.flyV=700;x.stn=Math.max(x.stn,.4);lkTrail(x,GPC,.35)}})}
  return !h.gd||h.t<h.gt+.9};
HZD.gpu=h=>{const o=h.o;lkDim(h.gd?.5*clamp(1-(h.t-h.gt)/.8,0,1):.5*Math.min(1,h.t/.25));
  h.tr.forEach(q=>{const a=1-(h.t-q.t)/.3;g.save();g.globalAlpha=a*.45;g.drawImage(ICON(o.d,52),q.x-o.r*1.1,q.y-o.r*1.1,o.r*2.2,o.r*2.2);g.restore()});
  if(h.fall&&!h.gd){const u=(h.t-h.ft)/.3;g.save();g.globalAlpha=.25+.45*u;g.fillStyle='#05020a';g.beginPath();g.ellipse(h.fx,h.fy+6,90*(1.4-u*.6),32*(1.4-u*.6),0,0,TAU);g.fill();g.strokeStyle=GPC;g.lineWidth=3;g.setLineDash([10,8]);g.beginPath();g.arc(h.fx,h.fy,210,0,TAU);g.stroke();g.setLineDash([]);g.restore()}};
HZP.gpu=h=>{const o=h.o;if(o.dead)return;const k=h.gd?Math.max(0,1.4-(h.t-h.gt)*2):1.4;lkAura(o.x,o.y,o.r,GPC,k);
  if(!h.gd&&Math.random()<.6){for(let i=0;i<2;i++){const a=rnd(0,TAU);lkBolt(o.x+Math.cos(a)*o.r,o.y+Math.sin(a)*o.r,o.x+Math.cos(a)*(o.r+rnd(26,50)),o.y+Math.sin(a)*(o.r+rnd(26,50))-12,GPC,2)}}
  if(h.ch){const c=h.ch;lkRibbon(h.tr.map(q=>({x:q.x,y:q.y})),o.r*1.8,GPC,.8);lkBody(o,c.a,0,1,10,'fist',GPC);g.save();g.translate(o.x+Math.cos(c.a)*(o.r+14),o.y+Math.sin(c.a)*(o.r+14));g.rotate(c.a);lkFist(2.2,GPC,.95,1);g.restore()}
  // 하늘에서 떨어지는 거대한 주먹
  if(h.fall&&!h.gd){const u=(h.t-h.ft)/.3,e=u*u;g.save();g.translate(h.fx,h.fy-420*(1-e)-30);g.rotate(Math.PI/2);lkFist(6.5,GPC,.4+.6*u,1);g.restore()}
  if(h.gd&&h.t<h.gt+.5){const u=(h.t-h.gt)/.5;g.save();g.translate(o.x,o.y-30+u*10);g.rotate(Math.PI/2);lkFist(6.5*(1-u*.3),GPC,1-u,1);g.restore();
    g.save();g.globalCompositeOperation='lighter';const w=110*(1-u),gr=g.createLinearGradient(o.x-w,0,o.x+w,0);gr.addColorStop(0,'rgba(163,92,255,0)');gr.addColorStop(.5,'rgba(240,225,255,'+(1-u)+')');gr.addColorStop(1,'rgba(163,92,255,0)');g.fillStyle=gr;g.fillRect(o.x-w,-40,w*2,o.y+40);g.restore()}};

// ---------- 밸런스 (대지 가르기로 바뀐 뒤 다시 맞춤) ----------
Object.assign(DMGK,{gapr:1.22,gaor:.95});

// ---------- 배지/아이콘 갱신 ----------
document.querySelectorAll('#grid .tile').forEach(t=>{const i=+t.dataset.i,vc=DEF.filter(x=>x.vof===i).length;let em=t.querySelector('.vb');if(vc){if(!em){em=document.createElement('em');em.className='vb';t.appendChild(em)}em.textContent='+'+vc}});
Object.keys(ICC).forEach(k=>delete ICC[k]);mkDict();
;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ▶ 섹션 : extra16
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ===== extra16.js : 김민채 • 포켓몬카드 =====
// 스킬을 쓸 때마다 덱에서 카드가 랜덤으로 뽑힘 → 뽑힌 카드의 포켓몬이 기술을 씀
// 카드 그림 : images 폴더에 pk_pikachu · pk_charizard · pk_mewtwo (png/webp/jpg) 를 넣으면
//             카드 안 + 카드 위에 떠오르는 홀로그램으로 크게 나옴 (없으면 속성 마크 + 이름)

const PKT={e:{c:'#f8d030',d:'#6a5200',lb:'전기',nm:'피카츄',mv:'10만볼트',im:'pk_pikachu'},f:{c:'#f05a28',d:'#5a1400',lb:'불꽃',nm:'리자몽',mv:'화염방사',im:'pk_charizard'},p:{c:'#a040f0',d:'#2a0a50',lb:'에스퍼',nm:'뮤츠',mv:'사이코키네시스',im:'pk_mewtwo'}};
['pk_pikachu','pk_charizard','pk_mewtwo'].forEach(n=>cutImg(n));
const NEW27=['pk_card','pk_flip','pk_zap','pk_thunder','pk_fire','pk_spin','pk_psy','pk_slam','pk_burn','pk_sup','pk_holo','pk_shuffle','pk_charge','pk_hit'];
NEW27.forEach(n=>{if(!SND.includes(n))SND.push(n);if(!AUD[n])AUD[n]=new SoundPool('sounds/'+n+'.mp3',n=='pk_zap'||n=='pk_card'||n=='pk_hit'||n=='pk_burn'?5:3)});
Object.assign(SLB,{pk_card:'포켓몬카드 · 카드 던지기',pk_flip:'포켓몬카드 · 카드 뒤집기',pk_zap:'포켓몬카드 · 전기',pk_thunder:'포켓몬카드 · 10만볼트',pk_fire:'포켓몬카드 · 화염방사',pk_spin:'포켓몬카드 · 불꽃 회오리',pk_psy:'포켓몬카드 · 사이코키네시스',pk_slam:'포켓몬카드 · 내던지기',pk_burn:'포켓몬카드 · 불붙은 땅',pk_sup:'포켓몬카드 · 효과가 굉장했다',pk_holo:'포켓몬카드 · 반짝 카드',pk_shuffle:'포켓몬카드 · 카드 섞기',pk_charge:'포켓몬카드 · 기 모으기',pk_hit:'포켓몬카드 · 카드 명중'});

const PKSK=[
  {n:'카드 뽑기',w:.25,cd:7,c:(o,t)=>!t.hid&&dist(o,t)<460,f:(o,t)=>pkDraw(o,t)},
  {n:'카드 난사',w:.25,cd:8,c:(o,t)=>!t.hid&&dist(o,t)<420,f:(o,t)=>pkBarrage(o,t)},
  {n:'풀 덱 · 총공격',w:.4,ult:1,c:(o,t)=>!t.hid,f:(o,t)=>pkAll(o,t)}];
const PKI=DEF.findIndex(d=>d.name=='김민채');
DEF.push({name:'김민채 • 포켓몬카드',gl:'카',k:'pkc',vof:PKI,r:27,sp:212,col:'#3d7dca',hi:'#ffe14a',dk:'#0a1a3a',alt:{col:'#e3350d',hi:'#fff1c0',dk:'#3a0a00'},alt2:{col:'#2a2a2a',hi:'#d8d8d8',dk:'#080808'},sk:PKSK});
INFO['김민채 • 포켓몬카드']={st:[7,6,8,7,8,9],p:'덱 · 스킬을 쓸 때마다 피카츄 / 리자몽 / 뮤츠 카드 중 하나가 랜덤으로 뽑힘',
  sk:[['랜덤','카드를 한 장 뽑아 그 포켓몬의 기술 · 피카츄=번개 3번 + 큰 번개(기절) · 리자몽=긴 화염방사 + 불붙은 땅 · 뮤츠=상대를 띄웠다가 벽으로 내던짐'],['2×5','카드 다섯 장을 수리검처럼 연속으로 던짐 · 카드마다 속성이 터짐 (전기=찌릿 · 불꽃=폭발 · 에스퍼=밀쳐냄)'],['26','반짝이는 카드 석 장을 펼쳐 세 포켓몬이 차례로 총공격 · 번개 폭풍 → 불꽃 회오리 → 사이코 내려꽂기']]};

// ---------- 카드 그리기 ----------
function pkSym(ty,s){g.save();g.scale(s,s);g.lineJoin='round';g.lineCap='round';
  if(ty=='e'){g.beginPath();g.moveTo(1.5,-7);g.lineTo(-4,1);g.lineTo(0,1);g.lineTo(-1.5,7);g.lineTo(4,-1);g.lineTo(0,-1);g.closePath();g.fill()}
  else if(ty=='f'){g.beginPath();g.moveTo(0,-7.5);g.quadraticCurveTo(6,-1,4.5,3);g.quadraticCurveTo(3,7,0,7);g.quadraticCurveTo(-3,7,-4.5,3);g.quadraticCurveTo(-5,-1,-1.5,-3);g.quadraticCurveTo(0,-5,0,-7.5);g.fill()}
  else{g.beginPath();g.ellipse(0,0,6.5,4,0,0,TAU);g.fill();g.globalCompositeOperation='destination-out';g.beginPath();g.arc(0,0,2.2,0,TAU);g.fill()}g.restore()}
function pkRR(x,y,w,h,r){g.beginPath();g.moveTo(x+r,y);g.lineTo(x+w-r,y);g.quadraticCurveTo(x+w,y,x+w,y+r);g.lineTo(x+w,y+h-r);g.quadraticCurveTo(x+w,y+h,x+w-r,y+h);g.lineTo(x+r,y+h);g.quadraticCurveTo(x,y+h,x,y+h-r);g.lineTo(x,y+r);g.quadraticCurveTo(x,y,x+r,y);g.closePath()}
// flip : -1 뒷면 ~ 1 앞면 (가로 폭이 flip 절댓값)
function pkCard(x,y,s,rot,flip,ty,al,holo){const W=40,H=56,T=PKT[ty];g.save();g.translate(x,y);g.rotate(rot);g.scale(s*Math.max(.04,Math.abs(flip)),s);g.globalAlpha=al==null?1:al;
  g.fillStyle='rgba(0,0,0,.35)';pkRR(-W/2+3,-H/2+4,W,H,4);g.fill();
  if(flip<0){const gr=g.createLinearGradient(0,-H/2,0,H/2);gr.addColorStop(0,'#2b4f9a');gr.addColorStop(1,'#132a5a');g.fillStyle=gr;pkRR(-W/2,-H/2,W,H,4);g.fill();g.strokeStyle='#e8eefc';g.lineWidth=2.5;g.stroke();
    g.save();pkRR(-W/2+4,-H/2+4,W-8,H-8,3);g.clip();g.strokeStyle='rgba(140,180,255,.35)';g.lineWidth=2;for(let k=0;k<6;k++){g.beginPath();g.arc(0,0,4+k*5,k*.6,k*.6+4.2);g.stroke()}g.restore();
    g.fillStyle='#ffe14a';g.beginPath();for(let k=0;k<10;k++){const a=-Math.PI/2+k*TAU/10,r=k%2?3:7;k?g.lineTo(Math.cos(a)*r,Math.sin(a)*r):g.moveTo(Math.cos(a)*r,Math.sin(a)*r)}g.closePath();g.fill()}
  else{g.fillStyle=T.c;pkRR(-W/2,-H/2,W,H,4);g.fill();g.strokeStyle='#ffffff';g.lineWidth=2.5;g.stroke();
    // 그림 칸
    const ax=-W/2+4,ay=-H/2+9,aw=W-8,ah=26,im=cutImg(T.im);g.save();g.fillStyle='#ffffff';g.fillRect(ax-1,ay-1,aw+2,ah+2);pkRR(ax,ay,aw,ah,1);g.clip();
    if(im){const k=Math.max(aw/im.width,ah/im.height);g.drawImage(im,ax+(aw-im.width*k)/2,ay+(ah-im.height*k)/2,im.width*k,im.height*k)}
    else{const gr=g.createRadialGradient(0,ay+ah/2,2,0,ay+ah/2,28);gr.addColorStop(0,'#ffffff');gr.addColorStop(.35,T.c);gr.addColorStop(1,T.d);g.fillStyle=gr;g.fillRect(ax,ay,aw,ah);g.fillStyle='rgba(255,255,255,.9)';g.save();g.translate(0,ay+ah/2);pkSym(ty,1.5);g.restore()}
    g.restore();
    // 윗줄 · 아랫줄
    g.fillStyle='rgba(255,255,255,.85)';g.fillRect(-W/2+4,-H/2+3,W-8,4.5);g.fillStyle=T.d;g.fillRect(-W/2+5,-H/2+4,14,2.5);g.fillRect(W/2-11,-H/2+4,6,2.5);
    g.fillStyle='rgba(255,255,255,.9)';pkRR(-W/2+4,ay+ah+3,W-8,14,2);g.fill();g.save();g.translate(-W/2+10,ay+ah+10);g.fillStyle=T.c;g.beginPath();g.arc(0,0,4,0,TAU);g.fill();g.fillStyle='#fff';pkSym(ty,.42);g.restore();
    g.fillStyle=T.d;g.fillRect(-W/2+16,ay+ah+7,W-22,2);g.fillRect(-W/2+16,ay+ah+11,W-28,2);
    // 반짝 (홀로)
    if(holo){g.save();pkRR(-W/2,-H/2,W,H,4);g.clip();g.globalCompositeOperation='lighter';const sx=((clock*90)%120)-60;const gr=g.createLinearGradient(sx-14,-H/2,sx+14,H/2);gr.addColorStop(0,'rgba(255,255,255,0)');gr.addColorStop(.35,'rgba(255,120,220,.35)');gr.addColorStop(.5,'rgba(255,255,255,.75)');gr.addColorStop(.65,'rgba(120,220,255,.35)');gr.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=gr;g.fillRect(-W/2,-H/2,W,H);g.restore()}}
  g.restore()}

// ---------- 배틀 메시지 상자 ----------
let PKMSG=null;function pkMsg(t,o){PKMSG={t,a:0,l:2.2};const w=o||F.find(f=>f.d.k=='pkc')||F[0];if(w&&!HZ.some(h=>h.k=='pkmsgH'))HZ.push({k:'pkmsgH',o:w,t:0})}
HZX.pkmsgH=()=>!!PKMSG;HZP.pkmsgH=()=>pkMsgDraw();
const _updPKM=update;update=function(dt){_updPKM(dt);if(PKMSG){PKMSG.a+=dt;PKMSG.l-=dt;if(PKMSG.l<=0)PKMSG=null}};
const _initPKM=init;init=function(){_initPKM.apply(this,arguments);PKMSG=null};
function pkMsgDraw(){if(!PKMSG)return;const m=PKMSG,al=Math.min(1,m.a/.12)*Math.min(1,m.l/.25),n=Math.floor(m.a*26),txt=m.t.slice(0,n);g.save();g.globalAlpha=al;const x=50,y=A-76,w=A-100,h=54;
  g.fillStyle='#f8f8f8';g.fillRect(x,y,w,h);g.strokeStyle='#283048';g.lineWidth=5;g.strokeRect(x,y,w,h);g.strokeStyle='#7890b8';g.lineWidth=2;g.strokeRect(x+6,y+6,w-12,h-12);
  g.fillStyle='#202028';g.font='700 19px "Galmuri11","Noto Sans KR",sans-serif';g.textBaseline='middle';g.fillText(txt,x+20,y+h/2+1);if(n>=m.t.length&&Math.sin(m.a*10)>0){g.fillStyle='#e04040';g.beginPath();g.moveTo(x+w-26,y+h-20);g.lineTo(x+w-16,y+h-20);g.lineTo(x+w-21,y+h-13);g.fill()}g.restore()}

// ---------- 카드 위에 떠오르는 포켓몬 (홀로그램) ----------
function pkHolo(x,y,ty,s,al){if(al<=0)return;const T=PKT[ty],im=cutImg(T.im),W=96*s,H=96*s;g.save();g.translate(x,y);g.globalAlpha=al;
  // 바닥 빛 기둥
  g.save();g.globalCompositeOperation='lighter';const gr=g.createLinearGradient(0,0,0,-H*1.1);gr.addColorStop(0,T.c);gr.addColorStop(1,'rgba(255,255,255,0)');g.globalAlpha=al*.35;g.fillStyle=gr;g.beginPath();g.moveTo(-W*.22,0);g.lineTo(W*.22,0);g.lineTo(W*.55,-H*1.1);g.lineTo(-W*.55,-H*1.1);g.fill();g.restore();
  const by=-H*.62+Math.sin(clock*3)*4;
  if(im){g.save();g.beginPath();g.ellipse(0,by,W*.5,H*.5,0,0,TAU);g.clip();const k=Math.max(W/im.width,H/im.height);g.drawImage(im,-im.width*k/2,by-im.height*k/2,im.width*k,im.height*k);
    g.globalCompositeOperation='lighter';g.fillStyle='rgba(255,255,255,.07)';for(let yy=-H*.5;yy<H*.5;yy+=4)g.fillRect(-W*.5,by+yy+((clock*30)%4),W,1.5);g.restore();
    g.save();g.globalCompositeOperation='lighter';g.strokeStyle=T.c;g.lineWidth=3;g.beginPath();g.ellipse(0,by,W*.5,H*.5,0,0,TAU);g.stroke();glow(T.c,0,by,W*.7,.35);g.restore()}
  else{g.save();g.globalCompositeOperation='lighter';glow(T.c,0,by,W*.6,.7);g.restore();g.fillStyle=T.d;g.beginPath();g.arc(0,by,W*.34,0,TAU);g.fill();g.strokeStyle='#ffffff';g.lineWidth=3;g.stroke();g.fillStyle=T.c;g.beginPath();g.arc(0,by,W*.28,0,TAU);g.fill();g.fillStyle='#ffffff';g.save();g.translate(0,by);pkSym(ty,2.6*s);g.restore()}
  // 이름표
  g.font='900 '+Math.round(17*s+4)+'px "Galmuri11","Black Han Sans",'+FB;g.textAlign='center';g.lineJoin='round';g.lineWidth=6;g.strokeStyle='#101018';g.strokeText(T.nm,0,by-H*.5-10);g.fillStyle=T.c;g.fillText(T.nm,0,by-H*.5-10);g.restore()}

// ---------- 카드 뽑는 연출 (공통) : 석 장이 펼쳐짐 → 하나 골라 뒤집힘 → 옆에 소환 ----------
// 반환한 c 를 매 프레임 pkDeckTick / pkDeckDraw
function pkDeck(o,ty){SFXa('pk_shuffle');return{o,ty,t:0,a0:rnd(0,TAU)}}
function pkDeckTick(c,dt){c.t+=dt;if(c.t>=.42&&!c.fl){c.fl=1;SFXa('pk_flip');const o=c.o;ring(o.x,o.y-70,10,70,PKT[c.ty].c,5,.4)}
  const o=c.o,s=o.x<A/2?1:-1;c.hx=clamp(o.x+s*62,40,A-40);c.hy=clamp(o.y-6,175,A-20)}
function pkDeckDraw(c,fade){const o=c.o,t=c.t,fa=fade==null?1:fade;if(fa<=0)return;
  if(t<.42){// 석 장이 머리 위에서 부채꼴로 펼쳐져 돎
    const u=Math.min(1,t/.2);['e','f','p'].forEach((ty,i)=>{const a=-Math.PI/2+(i-1)*.55*u+Math.sin(t*20+i)*.04*(1-u),r=46+20*u;pkCard(o.x+Math.cos(a)*r,o.y+Math.sin(a)*r-10,1.15,a+Math.PI/2,-1,ty,fa,0)});
    const pick=Math.floor(t*14)%3,a=-Math.PI/2+(pick-1)*.55,r=66;g.save();g.translate(o.x+Math.cos(a)*r,o.y+Math.sin(a)*r-10);g.rotate(a+Math.PI/2);g.strokeStyle='#ffe14a';g.lineWidth=3;g.globalAlpha=fa;pkRR(-25,-34,50,68,5);g.stroke();g.restore();return}
  if(t<.75){// 골라진 카드가 커지면서 뒤집힘
    const u=(t-.42)/.33,fl=-1+Math.min(1,u*1.6)*2,x=clamp(o.x,70,A-70),y=Math.max(150,o.y-80-u*10);g.save();g.translate(x,y);g.globalCompositeOperation='lighter';glow(PKT[c.ty].c,0,0,80*u,.6*fa);g.restore();pkCard(x,y,1.6+u*.8,0,fl,c.ty,fa,u>.6);
    if(u>.55){const k=(u-.55)/.45;g.save();g.translate(x,y-78);g.scale(.6+k*.4,.6+k*.4);g.globalAlpha=fa*k;g.font='900 30px "Galmuri11","Black Han Sans",'+FB;g.textAlign='center';g.lineJoin='round';g.lineWidth=8;g.strokeStyle='#101018';g.strokeText(PKT[c.ty].nm+'!',0,0);g.fillStyle=PKT[c.ty].c;g.fillText(PKT[c.ty].nm+'!',0,0);g.restore()}return}
  // 옆에 소환되어 떠 있음
  const u=Math.min(1,(t-.75)/.2),x0=clamp(o.x,70,A-70),y0=Math.max(150,o.y-90),x=x0+(c.hx-x0)*u,y=y0+(c.hy-y0)*u;c.cx=x;c.cy=y;pkCard(x,y,2.4-u*.9,Math.sin(clock*2)*.05,1,c.ty,fa,1);pkHolo(x,y-46,c.ty,1,fa*Math.min(1,u*1.5))}

// ---------- 1) 카드 뽑기 ----------
function pkDraw(o,t){const ty=window.PKFORCE||['e','f','p'][Math.floor(Math.random()*3)];HZ.push({k:'pkdr',o,tg:t,t:0,ty,c:pkDeck(o,ty),n:0,hit:new Set(),pts:[]});pkMsg('김민채의 '+PKT[ty].nm+' 카드! '+PKT[ty].mv+'!',o)}
const PKD=1;// 뽑기 연출이 끝나고 기술 시작까지
HZX.pkdr=(h,dt,EN)=>{const o=h.o,c=h.c;pkDeckTick(c,dt);if(o.dead)return false;let e=h.tg;if(!e||e.dead){e=tgt(o);h.tg=e}o.gcd=Math.max(o.gcd,.3);const q=h.t-PKD;if(q<0||!e)return h.t<PKD+3;
  if(h.ty=='e'){// 피카츄 : 표적 → 번개 3번 → 큰 번개
    if(!h.ch){h.ch=1;SFXa('pk_charge')}
    const S=[.45,.7,.95];if(h.n<3&&q>=S[h.n]){h.n++;if(!e.hid){SFXa('pk_zap');hurt(e,3.5,o,e.x,e.y,0,0);lkImp(e.x,e.y,50,'#f8d030');h.bx=e.x;h.by=e.y;h.bt=h.t;e.slow=Math.max(e.slow,.5)}}
    if(q>=1.35&&!h.big){h.big=1;h.bx=e.x;h.by=e.y;h.bt=h.t;if(!e.hid){SFXa('pk_thunder');hurt(e,5,o,e.x,e.y,0,1);e.stn=Math.max(e.stn,.9);e.cast=null;lkImp(e.x,e.y,120,'#f8d030');ring(e.x,e.y,10,150,'#f8d030',9,.5);shake=Math.max(shake,16);hs=.1;FX.push({k:'frost',l:.1,m:.1,c:'#fff8c0'});SFXa('pk_sup');pkMsg('효과가 굉장했다!',o)}}
    return q<1.9}
  if(h.ty=='f'){// 리자몽 : 긴 화염방사 → 불붙은 땅
    const sx=c.cx||o.x,sy=(c.cy||o.y)-30;h.sx=sx;h.sy=sy;const ta=Math.atan2(e.y-sy,e.x-sx);h.fa=h.fa==null?ta:h.fa+Math.atan2(Math.sin(ta-h.fa),Math.cos(ta-h.fa))*Math.min(1,dt*5);
    if(q>=.2&&q<1.6){if(!h.go){h.go=1;SFXa('pk_fire')}const a=h.fa,L=260;for(let i=0;i<4;i++){const aa=a+rnd(-.2,.2),v=rnd(320,460);Pt.push({x:sx+Math.cos(a)*16,y:sy+Math.sin(a)*16,vx:Math.cos(aa)*v,vy:Math.sin(aa)*v,l:.55,m:.55,gl:1,sh:3,col:i%2?'#ffb040':'#ff5a1a',r:rnd(9,16),gr:34,a0:.9,fr:.8})}
      h.n+=dt;if(h.n>=.15){h.n=0;EN.forEach(x=>{if(x.hid||x.jump)return;const dx=x.x-sx,dy=x.y-sy,d=Math.hypot(dx,dy),da=Math.abs(Math.atan2(Math.sin(Math.atan2(dy,dx)-a),Math.cos(Math.atan2(dy,dx)-a)));if(d<L+x.r&&da<.3+x.r/Math.max(d,1)){hurt(x,1.1,o,x.x,x.y,0,0);if(Math.random()<.5)h.pts.push({x:x.x+rnd(-14,14),y:x.y+rnd(-14,14),t:h.t})}})}}
    h.pts=h.pts.filter(p=>h.t-p.t<2.2);h.bn=(h.bn||0)+dt;if(h.bn>=.5){h.bn=0;EN.forEach(x=>{if(x.hid||x.jump)return;if(h.pts.some(p=>Math.hypot(p.x-x.x,p.y-x.y)<34+x.r)){hurt(x,.8,o,x.x,x.y,0,0);SFXa('pk_burn')}})}
    return q<2.4}
  if(h.ty=='p'){// 뮤츠 : 띄우기 → 흔들기 → 벽으로 내던짐
    if(!h.lift){h.lift=1;h.lx=e.x;h.ly=e.y;h.le=e;SFXa('pk_psy')}const L=h.le;if(L.dead)return q<2;
    if(q<1.1){L.x=clamp(h.lx+Math.sin(q*30)*q*5,L.r,A-L.r);L.y=clamp(h.ly-q*8,L.r,A-L.r);L.stn=Math.max(L.stn,.2);L.cast=null;L.pkUp=Math.min(1,q/.4);return true}
    if(!h.thr){h.thr=1;L.pkUp=0;SFXa('pk_slam');const a=Math.atan2(L.y-o.y,L.x-o.x);hurt(L,9,o,L.x,L.y,0,1);lkImp(L.x,L.y,120,'#a040f0');L.flyA=a;L.flyT=.4;L.flyV=1100;lkTrail(L,'#a040f0',.45);L.pkW=1;shake=Math.max(shake,16);hs=.1}
    else if(L.pkW&&!(L.flyT>0)){L.pkW=0;const wall=L.x<=L.r+2||L.x>=A-L.r-2||L.y<=L.r+2||L.y>=A-L.r-2;if(wall){hurt(L,3,o,L.x,L.y,0,1);lkImp(L.x,L.y,90,'#a040f0');FX.push({k:'crack',x:L.x,y:L.y,r:70,l:1.8,m:1.8});for(let i=0;i<10;i++)rockP(L.x,L.y,rnd(0,TAU),rnd(80,200));SFXa('pk_sup');pkMsg('효과가 굉장했다!',o)}}
    return q<2}
  return false};
const _lowPKU=lowHP;lowHP=function(f){_lowPKU(f);if(f.pkUp>0&&!f.dead){const u=f.pkUp;g.save();g.translate(f.x,f.y);g.globalCompositeOperation='lighter';glow('#a040f0',0,0,f.r*2.4,.55*u);g.strokeStyle='rgba(210,160,255,.8)';g.lineWidth=2.5;for(let i=0;i<3;i++){g.beginPath();g.ellipse(0,0,f.r+8+i*8,(f.r+8+i*8)*.38,clock*2.5+i,0,TAU);g.stroke()}g.restore();
  g.save();g.globalAlpha=.35*u;g.fillStyle='#000';g.beginPath();g.ellipse(f.x,f.y+f.r+16*u,f.r*.8,f.r*.3,0,0,TAU);g.fill();g.restore()}};
const _initPKU=init;init=function(){_initPKU.apply(this,arguments);if(F)F.forEach(f=>{f.pkUp=0;f.pkW=0})};
HZD.pkdr=h=>{if(h.ty=='f'){h.pts.forEach(p=>{const k=h.t-p.t,al=k<.2?k/.2:Math.max(0,1-(k-1.6)/.6);g.save();g.translate(p.x,p.y);g.globalAlpha=al*.6;g.fillStyle='#2a0a00';g.beginPath();g.ellipse(0,4,26,11,0,0,TAU);g.fill();g.globalCompositeOperation='lighter';glow('#ff6a20',0,0,30,al*.7);
    for(let i=0;i<3;i++){const ph=(clock*2+i*.33+p.x*.01)%1;g.globalAlpha=al*(1-ph);g.fillStyle=i%2?'#ffb040':'#ff5a1a';g.beginPath();g.moveTo(-6+i*6,2);g.quadraticCurveTo(-4+i*6,-10-ph*14,-1+i*6+Math.sin(clock*9+i)*2,-18-ph*18);g.quadraticCurveTo(2+i*6,-10-ph*14,4+i*6,2);g.fill()}g.restore()})}
  if(h.ty=='e'&&!h.big&&h.t>PKD&&h.tg&&!h.tg.dead){const e=h.tg,u=(h.t-PKD)%.25/.25;g.save();g.translate(e.x,e.y);g.strokeStyle='rgba(248,208,48,.85)';g.lineWidth=3;g.setLineDash([8,6]);g.lineDashOffset=-clock*60;g.beginPath();g.arc(0,0,e.r+14+u*6,0,TAU);g.stroke();g.setLineDash([]);g.beginPath();[[1,0],[-1,0],[0,1],[0,-1]].forEach(([a,b])=>{g.moveTo(a*(e.r+6),b*(e.r+6));g.lineTo(a*(e.r+24),b*(e.r+24))});g.stroke();g.restore()}};
HZP.pkdr=h=>{const o=h.o,c=h.c,q=h.t-PKD,end=h.ty=='e'?1.9:h.ty=='f'?2:1.9,fa=q>end-.4?Math.max(0,(end-q)/.4):1;if(!o.dead)pkDeckDraw(c,fa);if(q<0)return;
  if(h.ty=='e'){const sx=c.cx||o.x,sy=(c.cy||o.y)-60;if(!h.big&&Math.random()<.7)lkBolt(sx+rnd(-20,20),sy-30,sx+rnd(-30,30),sy-80,'#f8d030',1.5);
    if(h.bt!=null){const k=h.t-h.bt,al=1-k/(h.big?.5:.25);if(al>0){if(h.big){g.save();g.globalCompositeOperation='lighter';const w=40*al,gr=g.createLinearGradient(h.bx-w,0,h.bx+w,0);gr.addColorStop(0,'rgba(248,208,48,0)');gr.addColorStop(.5,'rgba(255,255,230,'+al+')');gr.addColorStop(1,'rgba(248,208,48,0)');g.fillStyle=gr;g.fillRect(h.bx-w,-40,w*2,h.by+40);g.restore();for(let k2=0;k2<3;k2++)lkBolt(h.bx+rnd(-40,40),-20,h.bx,h.by,'#f8d030',4*al)}
      else{lkBolt(h.bx+rnd(-30,30),-20,h.bx,h.by,'#f8d030',3*al);lkBolt(sx,sy,h.bx,h.by,'#fff0a0',1.5*al)}}}}
  if(h.ty=='f'&&h.go&&q<1.6&&h.sx!=null){const a=h.fa,u=Math.min(1,(q-.2)/.12),al=q>1.45?1-(q-1.45)/.15:1,L=260*u;g.save();g.translate(h.sx,h.sy);g.rotate(a);g.globalCompositeOperation='lighter';g.globalAlpha=al;
    const gr=g.createLinearGradient(0,0,L,0);gr.addColorStop(0,'rgba(255,250,200,1)');gr.addColorStop(.25,'rgba(255,170,50,.85)');gr.addColorStop(1,'rgba(240,60,20,0)');g.fillStyle=gr;g.beginPath();g.moveTo(8,-7);g.quadraticCurveTo(L*.5,-L*.3,L,-L*.24+Math.sin(clock*22)*8);g.lineTo(L,L*.24+Math.sin(clock*25)*8);g.quadraticCurveTo(L*.5,L*.3,8,7);g.fill();
    g.fillStyle='rgba(255,255,230,.8)';g.beginPath();g.moveTo(8,-3);g.quadraticCurveTo(L*.4,-L*.08,L*.7,0);g.quadraticCurveTo(L*.4,L*.08,8,3);g.fill();glow('#fff0b0',12,0,26,1);g.restore()}
  if(h.ty=='p'&&h.le&&!h.le.dead&&q<1.1){const e=h.le,sx=c.cx||o.x,sy=(c.cy||o.y)-60;g.save();g.globalCompositeOperation='lighter';g.strokeStyle='rgba(200,140,255,'+(.5+.3*Math.sin(clock*20))+')';g.lineWidth=4;g.beginPath();g.moveTo(sx,sy);g.quadraticCurveTo((sx+e.x)/2,Math.min(sy,e.y)-60,e.x,e.y);g.stroke();g.lineWidth=1.5;g.strokeStyle='#ffffff';g.stroke();g.restore()}};

// ---------- 2) 카드 난사 : 카드 5장을 수리검처럼 ----------
function pkBarrage(o,t){HZ.push({k:'pkbr',o,tg:t,t:0,n:0,cs:[]});pkMsg('김민채의 카드 난사!',o)}
HZX.pkbr=(h,dt,EN)=>{const o=h.o;if(o.dead&&!h.cs.length)return false;let e=h.tg;if(!e||e.dead){e=tgt(o);h.tg=e}
  if(!o.dead&&h.n<5&&h.t>=.15+h.n*.17&&e){h.n++;const ty=['e','f','p'][Math.floor(Math.random()*3)],a=Math.atan2(e.y-o.y,e.x-o.x)+(h.n-3)*.12;h.cs.push({x:o.x+Math.cos(a)*o.r,y:o.y+Math.sin(a)*o.r,a,v:500,ty,t:0,tg:e,rot:0});SFXa('pk_card');o.gcd=Math.max(o.gcd,.3)}
  h.cs=h.cs.filter(q=>{q.t+=dt;q.rot+=dt*22;const tg=q.tg;if(tg&&!tg.dead&&!tg.hid){const ta=Math.atan2(tg.y-q.y,tg.x-q.x);q.a+=Math.atan2(Math.sin(ta-q.a),Math.cos(ta-q.a))*Math.min(1,dt*6)}q.x+=Math.cos(q.a)*q.v*dt;q.y+=Math.sin(q.a)*q.v*dt;
    if(q.x<0||q.x>A||q.y<0||q.y>A||q.t>1.2)return false;for(const x of EN){if(x.hid||x.jump)continue;if(Math.hypot(x.x-q.x,x.y-q.y)<x.r+12){pkCardHit(o,x,q);return false}}return true});
  return h.n<5||h.cs.length>0};
function pkCardHit(o,e,q){const T=PKT[q.ty];SFXa('pk_hit');hurt(e,2,o,q.x,q.y,0,0);lkImp(q.x,q.y,46,T.c);
  if(q.ty=='e'){SFXa('pk_zap');e.slow=Math.max(e.slow,.6);for(let k=0;k<3;k++){const a=rnd(0,TAU);FX.push({k:'pkzap',x:e.x,y:e.y,x2:e.x+Math.cos(a)*50,y2:e.y+Math.sin(a)*50,l:.18,m:.18})}}
  else if(q.ty=='f'){SFXa('pk_burn');ring(q.x,q.y,6,60,'#ff8a3a',6,.3);for(let i=0;i<10;i++){const a=rnd(0,TAU);Pt.push({x:q.x,y:q.y,vx:Math.cos(a)*rnd(80,200),vy:Math.sin(a)*rnd(80,200),l:.45,m:.45,gl:1,sh:3,col:i%2?'#ffb040':'#ff5a1a',r:rnd(6,11),gr:20,a0:.9,fr:.6})}}
  else{ring(q.x,q.y,6,70,'#c080ff',5,.35);safePush(e,q.a,26)}}
FXD.pkzap=x=>{const p=1-x.l/x.m;lkBolt(x.x,x.y,x.x2,x.y2,'#f8d030',2*(1-p))};
HZP.pkbr=h=>{h.cs.forEach(q=>{g.save();g.translate(q.x,q.y);g.globalCompositeOperation='lighter';glow(PKT[q.ty].c,0,0,26,.6);g.strokeStyle=PKT[q.ty].c;g.lineWidth=6;g.globalAlpha=.4;g.beginPath();g.moveTo(0,0);g.lineTo(-Math.cos(q.a)*40,-Math.sin(q.a)*40);g.stroke();g.restore();pkCard(q.x,q.y,1.2,q.rot,1,q.ty,1,1)})};

// ---------- 3) ULT 풀 덱 · 총공격 ----------
function pkAll(o,t){SFXa('pk_holo');pkMsg('김민채의 풀 덱! 총공격!',o);if(CIN||TSTOP||MAD||(phase!='play'&&phase!='demo')){pkAllGo(o,t);return}
  CIN={o,t:0,dur:1.3,tick(dt){this.o.gcd=Math.max(this.o.gcd,.5);if(this.t>=this.dur){MGQ.push(()=>pkAllGo(o,t));return false}},draw(){pkAllCut(this)}}}
function pkAllCut(c){const t=c.t,out=Math.max(0,(t-1.05)/.25);g.save();g.globalAlpha=.8*(1-out);g.fillStyle='#06040e';g.fillRect(-40,-40,A+80,A+80);g.restore();
  g.save();g.translate(A/2,A/2);g.globalCompositeOperation='lighter';g.globalAlpha=1-out;for(let k=0;k<18;k++){const a=k*TAU/18+t*.7;g.fillStyle=['rgba(248,208,48,.22)','rgba(240,90,40,.22)','rgba(160,64,240,.22)'][k%3];g.beginPath();g.moveTo(0,0);g.lineTo(Math.cos(a-.09)*700,Math.sin(a-.09)*700);g.lineTo(Math.cos(a+.09)*700,Math.sin(a+.09)*700);g.fill()}g.restore();
  ['e','f','p'].forEach((ty,i)=>{const d=i*.12,u=clamp((t-d)/.35,0,1),e=1-Math.pow(1-u,3),fl=clamp((t-.35-d)/.2,0,1)*2-1,x=A/2+(i-1)*150*e,y=A/2-20+Math.abs(i-1)*24*e,r=(i-1)*.18*e;pkCard(x,y,(1.2+e*2.1)*(1-out*.4),r,fl,ty,1-out,fl>0);
    if(fl>.5){g.save();g.globalAlpha=1-out;g.font='900 20px "Galmuri11","Black Han Sans",'+FB;g.textAlign='center';g.lineJoin='round';g.lineWidth=6;g.strokeStyle='#101018';g.strokeText(PKT[ty].nm,x,y+90);g.fillStyle=PKT[ty].c;g.fillText(PKT[ty].nm,x,y+90);g.restore()}});
  if(t>.6){const k=Math.min(1,(t-.6)/.15);g.save();g.translate(A/2,110);g.scale(1.6-k*.6,1.6-k*.6);g.globalAlpha=k*(1-out);g.font='900 44px "Galmuri11","Black Han Sans",'+FB;g.textAlign='center';g.lineJoin='round';g.lineWidth=10;g.strokeStyle='#101018';g.strokeText('총공격!',0,0);g.fillStyle='#ffe14a';g.fillText('총공격!',0,0);g.restore()}
  pkMsgDraw()}
function pkAllGo(o,t){if(o.dead)return;if(!t||t.dead||t.hid)t=tgt(o);HZ.push({k:'pkall',o,tg:t,t:0,n:0,sp:0})}
HZX.pkall=(h,dt,EN)=>{const o=h.o;if(o.dead)return false;let e=h.tg;if(!e||e.dead){e=tgt(o);h.tg=e}o.gcd=Math.max(o.gcd,.4);o.cast=null;if(!e)return h.t<3.4;
  // 1단계 번개 폭풍 (0.3~1.1)
  const S=[.35,.6,.85];if(h.n<3&&h.t>=S[h.n]){h.n++;SFXa('pk_thunder');h.bx=e.x;h.by=e.y;h.bt=h.t;if(!e.hid){hurt(e,3,o,e.x,e.y,0,h.n==3?1:0);lkImp(e.x,e.y,70+h.n*15,'#f8d030');e.stn=Math.max(e.stn,.3);shake=Math.max(shake,10)}}
  // 2단계 불꽃 회오리 (1.2~2.2)
  if(h.t>=1.2&&!h.ft){h.ft=1;h.tx=e.x;h.ty=e.y;SFXa('pk_spin')}if(h.ft&&h.t<2.2){h.tx+=(e.x-h.tx)*Math.min(1,dt*2);h.ty+=(e.y-h.ty)*Math.min(1,dt*2);h.sp+=dt;if(h.sp>=.2){h.sp=0;EN.forEach(x=>{if(x.hid||x.jump)return;if(Math.hypot(x.x-h.tx,x.y-h.ty)<70+x.r){hurt(x,1.5,o,x.x,x.y,0,0);const a=Math.atan2(h.ty-x.y,h.tx-x.x);x.x=clamp(x.x+Math.cos(a+1.3)*10,x.r,A-x.r);x.y=clamp(x.y+Math.sin(a+1.3)*10,x.r,A-x.r)}})}
    if(Math.random()<.9)Pt.push({x:h.tx+rnd(-40,40),y:h.ty,vx:rnd(-30,30),vy:rnd(-220,-120),l:.6,m:.6,gl:1,sh:3,col:'#ff8a3a',r:rnd(6,11),gr:-20,a0:.85,fr:.5})}
  // 3단계 사이코 내려꽂기 (2.3~3.2)
  if(h.t>=2.3&&!h.lf){h.lf=1;h.le=e;h.lx=e.x;h.ly=e.y;SFXa('pk_psy')}if(h.lf&&!h.sl&&h.le&&!h.le.dead){const L=h.le,q=h.t-2.3;L.x=clamp(h.lx+Math.sin(q*30)*4,L.r,A-L.r);L.y=clamp(h.ly-q*10,L.r,A-L.r);L.stn=Math.max(L.stn,.2);L.cast=null;L.pkUp=Math.min(1,q/.3)}
  if(h.t>=3&&!h.sl){h.sl=1;const L=h.le;if(L&&!L.dead){L.pkUp=0;SFXa('pk_slam');hurt(L,10,o,L.x,L.y,0,1);lkImp(L.x,L.y,170,'#a040f0');FX.push({k:'crack',x:L.x,y:L.y,r:110,l:2.4,m:2.4});ring(L.x,L.y,10,220,'#c080ff',12,.6);for(let i=0;i<18;i++)rockP(L.x,L.y,rnd(0,TAU),rnd(100,280));L.stn=Math.max(L.stn,.5);shake=Math.max(shake,24);hs=.14;SFXa('pk_sup');pkMsg('효과가 굉장했다!',o)}}
  return h.t<3.5};
HZD.pkall=h=>{lkDim(h.t<3.1?.45:Math.max(0,.45-(h.t-3.1)*1.2));if(h.ft&&h.t<2.2){g.save();g.translate(h.tx,h.ty);g.globalAlpha=.5;g.fillStyle='#401000';g.beginPath();g.ellipse(0,8,84,32,0,0,TAU);g.fill();g.restore()}};
HZP.pkall=h=>{const o=h.o;if(o.dead)return;const fa=h.t>3.1?Math.max(0,1-(h.t-3.1)/.4):Math.min(1,h.t/.2);
  // 세 장이 김민채 주위에 떠 있음 · 지금 공격하는 카드가 앞으로
  const cur=h.t<1.15?0:h.t<2.25?1:2;['e','f','p'].forEach((ty,i)=>{const a=-Math.PI/2+(i-1)*1.1+Math.sin(clock*1.5)*.05,on=i==cur,R=o.r+52+(on?14:0),x=o.x+Math.cos(a)*R,y=o.y+Math.sin(a)*R-10;if(on){g.save();g.translate(x,y);g.globalCompositeOperation='lighter';glow(PKT[ty].c,0,0,60,.7*fa);g.restore()}pkCard(x,y,on?1.9:1.3,a+Math.PI/2,1,ty,fa*(on?1:.6),on);if(on)pkHolo(x,y-40,ty,.75,fa)});
  if(h.bt!=null){const k=h.t-h.bt,al=1-k/.35;if(al>0){g.save();g.globalCompositeOperation='lighter';const w=36*al,gr=g.createLinearGradient(h.bx-w,0,h.bx+w,0);gr.addColorStop(0,'rgba(248,208,48,0)');gr.addColorStop(.5,'rgba(255,255,230,'+al+')');gr.addColorStop(1,'rgba(248,208,48,0)');g.fillStyle=gr;g.fillRect(h.bx-w,-40,w*2,h.by+40);g.restore();for(let k2=0;k2<3;k2++)lkBolt(h.bx+rnd(-40,40),-20,h.bx,h.by,'#f8d030',3.5*al)}}
  if(h.ft&&h.t<2.3){const q=h.t-1.2,al=q<1?Math.min(1,q/.15):Math.max(0,1-(q-1)/.3);g.save();g.translate(h.tx,h.ty);g.globalCompositeOperation='lighter';g.globalAlpha=al;for(let k=0;k<8;k++){const yy=-k*24,w=26+k*12+Math.sin(clock*9+k)*4,rot=clock*(8-k*.4)+k;g.save();g.translate(Math.sin(clock*4+k)*6,yy);g.strokeStyle=k%2?'rgba(255,170,60,.9)':'rgba(255,90,30,.85)';g.lineWidth=8-k*.6;g.beginPath();g.ellipse(0,0,w,w*.32,0,rot,rot+4.6);g.stroke();g.restore()}glow('#ff8a3a',0,-50,130,.6);glow('#fff0b0',0,0,44,.8);g.restore()}
  if(h.lf&&!h.sl&&h.le&&!h.le.dead){const e=h.le;g.save();g.globalCompositeOperation='lighter';g.strokeStyle='rgba(200,140,255,.7)';g.lineWidth=4;g.beginPath();g.moveTo(o.x,o.y-60);g.quadraticCurveTo((o.x+e.x)/2,Math.min(o.y,e.y)-90,e.x,e.y);g.stroke();g.restore()}
  if(h.sl&&h.t<3.35&&h.le){const e=h.le,q=(h.t-3)/.35;g.save();g.translate(e.x,e.y);g.globalCompositeOperation='lighter';g.globalAlpha=1-q;g.fillStyle='rgba(220,180,255,.85)';g.fillRect(-30*(1-q),-A,60*(1-q),A);g.restore()}};

// ---------- 밸런스 ----------
Object.assign(DMGK,{pkc:1.12});

// ---------- 배지/아이콘 갱신 ----------
EMB.pkc=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*2.5)*.06);[[-7,-3,-.28,'f'],[7,-3,.28,'p'],[0,0,0,'e']].forEach(([x,y,r,ty])=>{g.save();g.translate(x,y);g.rotate(r);g.fillStyle=PKT[ty].c;g.strokeStyle='#ffffff';g.lineWidth=1.6;pkRR(-7.5,-10.5,15,21,2);g.fill();g.stroke();g.fillStyle='rgba(255,255,255,.9)';g.save();g.translate(0,-1.5);pkSym(ty,.7);g.restore();g.restore()});
  g.save();g.globalCompositeOperation='lighter';glow(D.hi,0,0,16,.3);g.restore()};
document.querySelectorAll('#grid .tile').forEach(t=>{const i=+t.dataset.i,vc=DEF.filter(x=>x.vof===i).length;let em=t.querySelector('.vb');if(vc){if(!em){em=document.createElement('em');em.className='vb';t.appendChild(em)}em.textContent='+'+vc}});
Object.keys(ICC).forEach(k=>delete ICC[k]);mkDict();
;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ▶ 섹션 : extra17
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ===== extra17.js : 공병은 • 크레이지콩 (거대한 고릴라) =====
// · 패시브 포효 : 체력이 처음 50 아래로 떨어지면 가슴을 두드리며 포효 → 주변 기절 · 이후 주는 피해 20% 증가
// · 1) 비스트 글러브 · 내려찍기 : 하늘로 뛰어올랐다가 강철 장갑으로 땅을 내려찍음 (전기 충격파)
// · 2) 바위 던지기 : 땅에서 큰 바위를 뜯어 머리 위로 들었다가 던짐
// · 3) ULT 킹의 도끼 : 가슴을 두드리며 포효 → 파랗게 빛나는 도끼로 세 번 베고 → 내려찍어 파란 충격파

const KGC='#6b4426',KGB='#4ad8ff';
const NEW28=['kg_roar','kg_beat','kg_jump','kg_slam','kg_zap','kg_rip','kg_throw','kg_rock','kg_axe','kg_axehit','kg_charge','kg_wave','kg_step'];
NEW28.forEach(n=>{if(!SND.includes(n))SND.push(n);if(!AUD[n])AUD[n]=new SoundPool('sounds/'+n+'.mp3',n=='kg_axe'||n=='kg_step'?4:3)});
Object.assign(SLB,{kg_roar:'크레이지콩 · 포효',kg_beat:'크레이지콩 · 가슴 두드리기',kg_jump:'크레이지콩 · 뛰어오르기',kg_slam:'크레이지콩 · 내려찍기',kg_zap:'크레이지콩 · 글러브 전기',kg_rip:'크레이지콩 · 바위 뜯기',kg_throw:'크레이지콩 · 던지기',kg_rock:'크레이지콩 · 바위 박살',kg_axe:'크레이지콩 · 도끼 휘두르기',kg_axehit:'크레이지콩 · 도끼 명중',kg_charge:'크레이지콩 · 도끼 충전',kg_wave:'크레이지콩 · 도끼 충격파',kg_step:'크레이지콩 · 쿵쿵'});

const KGSK=[
  {n:'비스트 글러브 · 내려찍기',w:.3,cd:8,c:(o,t)=>!t.hid&&!t.jump&&dist(o,t)<420,f:(o,t)=>kgLeap(o,t)},
  {n:'바위 던지기',w:.3,cd:9,c:(o,t)=>!t.hid&&dist(o,t)>110&&dist(o,t)<520,f:(o,t)=>kgRock(o,t)},
  {n:'킹의 도끼',w:.4,ult:1,c:(o,t)=>!t.hid,f:(o,t)=>kgAxe(o,t)}];
const KGI=DEF.findIndex(d=>d.name=='공병은');
DEF.push({name:'공병은 • 크레이지콩',gl:'콩',k:'kong',vof:KGI,r:31,sp:196,col:'#7a4e2c',hi:'#ffd59a',dk:'#1e1006',alt:{col:'#6a6e78',hi:'#e8ecf4',dk:'#14161c'},alt2:{col:'#2a2a2e',hi:'#ffcf6a',dk:'#060608'},sk:KGSK});
INFO['공병은 • 크레이지콩']={st:[9,9,5,6,7,9],p:'포효 · 체력이 처음 50 아래로 떨어지면 가슴을 두드리며 포효 · 가까운 적 기절 · 이후 주는 피해 20% 증가',
  sk:[['9 + 기절','하늘로 뛰어올라 상대 위에 떨어지며 강철 장갑으로 땅을 내려찍음 · 전기 충격파가 퍼져 주변 기절'],['10','땅에서 큰 바위를 뜯어 머리 위로 들었다가 상대에게 던짐 · 떨어진 곳 주변이 박살'],['5×3 + 9','가슴을 두드리며 포효(공포로 느려짐) · 파랗게 빛나는 도끼로 세 번 베며 돌진 · 마지막에 내려찍어 앞으로 파란 충격파']]};

// ---------- 그림 : 털 난 팔 + 주먹 ----------
function kgFist(s,glove){g.save();g.scale(s,s);
  if(glove){const gr=g.createLinearGradient(-14,0,16,0);gr.addColorStop(0,'#8a6a00');gr.addColorStop(.5,'#ffd21a');gr.addColorStop(1,'#fff3a0');g.fillStyle=gr;g.strokeStyle='#1a1400';g.lineWidth=1.8;lkFistPath();g.fill();g.stroke();
    g.strokeStyle='#5a4600';g.lineWidth=1.4;[-5.3,0,5.3].forEach(y=>{g.beginPath();g.moveTo(2,y);g.lineTo(10,y);g.stroke()});g.fillStyle='#8a8f98';[-8,-2.7,2.7,8].forEach(y=>{g.fillRect(10,y-2,3.5,4)});
    g.fillStyle='#3a3a40';g.fillRect(-14,-9,5,18);g.strokeRect(-14,-9,5,18);g.fillStyle='#ffe85a';g.fillRect(-7,-10,3,20)}
  else{const gr=g.createLinearGradient(-14,0,16,0);gr.addColorStop(0,'#1e140c');gr.addColorStop(.6,'#3a2a20');gr.addColorStop(1,'#5a4a42');g.fillStyle=gr;g.strokeStyle='#0a0604';g.lineWidth=1.8;lkFistPath();g.fill();g.stroke();
    g.fillStyle='#6a5a52';[-8,-2.7,2.7,8].forEach(y=>{g.beginPath();g.arc(11,y,2.2,0,TAU);g.fill()});g.strokeStyle='#0a0604';g.lineWidth=1;[-5.3,0,5.3].forEach(y=>{g.beginPath();g.moveTo(3,y);g.lineTo(9,y);g.stroke()})}
  g.restore()}
// 어깨(sx,sy) → 주먹(gx,gy) 굵은 털 팔
function kgArm(sx,sy,gx,gy,bx,by,R,glove,fa){g.save();g.globalAlpha=fa==null?1:fa;g.lineCap='round';g.strokeStyle='#120a04';g.lineWidth=R*.78;g.beginPath();g.moveTo(sx,sy);g.quadraticCurveTo(bx,by,gx,gy);g.stroke();g.strokeStyle='#4a2e18';g.lineWidth=R*.6;g.stroke();
  // 털 결
  g.strokeStyle='rgba(150,100,60,.55)';g.lineWidth=1.6;for(let i=1;i<8;i++){const u=i/8,x=(1-u)*(1-u)*sx+2*(1-u)*u*bx+u*u*gx,y=(1-u)*(1-u)*sy+2*(1-u)*u*by+u*u*gy,a=Math.atan2(gy-sy,gx-sx)+Math.PI/2;for(const sd of[-1,1]){g.beginPath();g.moveTo(x+Math.cos(a)*sd*R*.22,y+Math.sin(a)*sd*R*.22);g.lineTo(x+Math.cos(a)*sd*R*.36-Math.cos(a-Math.PI/2)*4,y+Math.sin(a)*sd*R*.36-Math.sin(a-Math.PI/2)*4);g.stroke()}}
  g.translate(gx,gy);g.rotate(Math.atan2(gy-by,gx-bx));if(glove){g.save();g.globalCompositeOperation='lighter';glow('#ffe85a',0,0,R*.9,.35);g.restore()}kgFist(R*.058,glove);g.restore()}
// 몸 : e1 왼팔 · e2 오른팔(장갑) 뻗기 · up 두 팔 들기
function kgBody(o,a,e1,e2,reach,up,glove,fa){const R=o.r,px=-Math.sin(a),py=Math.cos(a),ca=Math.cos(a),sa=Math.sin(a);
  [[-1,e1],[1,e2]].forEach(([sd,ex])=>{const u=Math.min(1,Math.max(0,ex)),sx=o.x-ca*R*.1+px*sd*R*.92,sy=o.y-sa*R*.1+py*sd*R*.92;let gx=o.x+ca*(R*1.0+u*reach)+px*sd*R*(.75-.55*u),gy=o.y+sa*(R*1.0+u*reach)+py*sd*R*(.75-.55*u);
    if(up>0){gx+=(o.x+px*sd*R*.75-gx)*up;gy+=(o.y-R*1.7+py*sd*R*.3-gy)*up}
    const bx=(sx+gx)/2+px*sd*R*.5*(1-u),by=(sy+gy)/2+py*sd*R*.5*(1-u);kgArm(sx,sy,gx,gy,bx,by,R,glove&&sd==1,fa)})}
// 공중 : f.kAir (0~1) 동안 공이 떠오르고 커짐
const _ballKG=ball;ball=function(f,t){if(!f.kAir||f.dead)return _ballKG(f,t);const z=f.kAir.z||0,s=1+z/220;g.save();g.fillStyle='rgba(0,0,0,.4)';g.beginPath();g.ellipse(f.x,f.y+f.r*.6,f.r*(1-z/260),f.r*.36*(1-z/260),0,0,TAU);g.fill();g.restore();
  g.save();g.translate(f.x,f.y-z);g.scale(s,s);g.translate(-f.x,-f.y);_ballKG(f,t);g.restore()};

// ---------- 패시브 : 포효 ----------
const _updKG=update;update=function(dt){_updKG(dt);if(!F||phase!='play'&&phase!='demo')return;F.forEach(f=>{if(f.d.k!='kong'||f.dead)return;
  if(!f.kgRoar&&f.hp<=50&&!CIN&&!TSTOP&&!MAD){f.kgRoar=1;f.kgRage=1;HZ.push({k:'kgroar',o:f,t:0,small:1})}
  if(f.kgStepT==null)f.kgStepT=0;f.kgStepT+=dt;if(f.kgStepT>.55&&!f.cast&&!f.kAir){f.kgStepT=0;if(Math.random()<.35)SFXa('kg_step')}})};
const _hurtKG=hurt;hurt=function(t,n,o){if(o&&o.d&&o.d.k=='kong'&&o.kgRage&&t!=o&&n>0){const a=[...arguments];a[1]=Math.round(n*1.2*10)/10;return _hurtKG.apply(this,a)}return _hurtKG.apply(this,arguments)};
const _updKGA=update;update=function(dt){_updKGA(dt);if(F)F.forEach(f=>{if(f.kAir&&!HZ.some(h=>h.o==f&&(h.k=='kglp'||h.k=='kgax')))f.kAir=null})};
const _initKG=init;init=function(){_initKG.apply(this,arguments);if(F)F.forEach(f=>{f.kgRoar=0;f.kgRage=0;f.kAir=null;f.kgFear=0})};
// 가슴 두드리기 + 포효 (패시브와 궁에서 같이 씀)
HZX.kgroar=(h,dt,EN)=>{const o=h.o;if(o.dead)return false;o.gcd=Math.max(o.gcd,.3);o.cast=null;const D=h.small?1:.95;
  const B=[.05,.17,.29,.41];B.forEach((b,i)=>{if(h.t>=b&&!(h['b'+i])){h['b'+i]=1;SFXa('kg_beat');shake=Math.max(shake,5);ring(o.x,o.y,o.r,o.r+30,'#ffd59a',3,.25)}});
  if(h.t>=.5&&!h.ro){h.ro=1;SFXa('kg_roar');shake=Math.max(shake,18);ft(o.x,o.y-o.r-34,'포효!','#ffd59a',26);ring(o.x,o.y,o.r,o.r+240,'#ffd59a',8,.7);ring(o.x,o.y,o.r,o.r+170,'#ffffff',4,.55);
    EN.forEach(x=>{if(x.hid||x.jump)return;const d=dist(o,x);if(d<240+x.r){if(h.small){x.stn=Math.max(x.stn,.7);x.cast=null}else{x.slow=Math.max(x.slow,1.6);x.kgFear=1.6}const a=ang(o,x);safePush(x,a,30)}})}
  return h.t<D};
HZP.kgroar=h=>{const o=h.o;if(o.dead)return;const t=h.t,beat=t<.5,ph=Math.floor(t/.12)%2;
  // 가슴 두드리기 : 두 주먹이 번갈아 가슴(공 앞쪽)을 침
  const a=-Math.PI/2+.0001;if(beat){const R=o.r;[-1,1].forEach(sd=>{const hit=(sd<0)==(ph==0),gx=o.x+sd*R*.35,gy=o.y+(hit?-R*.05:R*.45),sx=o.x+sd*R*.95,sy=o.y-R*.05;kgArm(sx,sy,gx,gy,o.x+sd*R*1.3,o.y+R*.5,R,0)})}
  else{const q=t-.5;kgBody(o,a,.3,.3,10,.9,0);
    if(q<.45){const u=q/.45;g.save();g.translate(o.x,o.y);g.globalCompositeOperation='lighter';for(let k=0;k<4;k++){const r=o.r+((u*260+k*65)%260);g.strokeStyle='rgba(255,220,170,'+Math.max(0,.7-r/380)+')';g.lineWidth=6-k;g.beginPath();g.arc(0,0,r,0,TAU);g.stroke()}g.restore()}
    // 입 벌림
    g.save();g.translate(o.x,o.y+o.r*.25);g.fillStyle='#2a0606';g.beginPath();g.ellipse(0,0,o.r*.36,o.r*.24*(1+Math.sin(t*40)*.1),0,0,TAU);g.fill();g.fillStyle='#f4ead8';for(const sd of[-1,1]){g.beginPath();g.moveTo(sd*o.r*.24,-o.r*.16);g.lineTo(sd*o.r*.16,-o.r*.16);g.lineTo(sd*o.r*.2,o.r*.02);g.fill()}g.restore()}};
const _lowKGF=lowHP;lowHP=function(f){_lowKGF(f);if(f.kgFear>0&&!f.dead){g.save();g.translate(f.x,f.y-f.r-18);g.font='900 14px "Black Han Sans",'+FB;g.textAlign='center';g.lineJoin='round';g.lineWidth=4;g.strokeStyle='#000';g.strokeText('공포',0,0);g.fillStyle='#ffd59a';g.fillText('공포',0,0);g.restore()}};
const _updKGF=update;update=function(dt){_updKGF(dt);if(F)F.forEach(f=>{if(f.kgFear>0)f.kgFear-=dt})};

// ---------- 1) 비스트 글러브 · 내려찍기 ----------
function kgLeap(o,t){const tx=clamp(t.x+(t.dx||0)*(t.sp||0)*.35,o.r,A-o.r),ty=clamp(t.y+(t.dy||0)*(t.sp||0)*.35,o.r,A-o.r);HZ.push({k:'kglp',o,tg:t,t:0,sx:o.x,sy:o.y,tx,ty,arcs:[]});SFXa('kg_jump');for(let i=0;i<10;i++)dustP(o.x,o.y+o.r*.6,rnd(60,140));FX.push({k:'crack',x:o.x,y:o.y,r:40,l:1,m:1})}
HZX.kglp=(h,dt,EN)=>{const o=h.o;if(o.dead){o.kAir=null;return false}o.gcd=Math.max(o.gcd,.3);o.cast=null;const D=.6;
  if(h.t<D){const u=h.t/D,e=u<.5?2*u*u:1-Math.pow(-2*u+2,2)/2;o.x=h.sx+(h.tx-h.sx)*e;o.y=h.sy+(h.ty-h.sy)*e;o.kAir={z:Math.sin(Math.PI*u)*150};if(Math.random()<.4)SFXa('kg_zap');return true}
  if(!h.land){h.land=1;o.kAir=null;o.x=h.tx;o.y=h.ty;SFXa('kg_slam');SFXa('kg_zap');shake=Math.max(shake,24);hs=.12;FX.push({k:'frost',l:.1,m:.1,c:'#fff8d0'});lkImp(o.x,o.y,150,'#ffe85a');FX.push({k:'crack',x:o.x,y:o.y,r:120,l:2.6,m:2.6});ring(o.x,o.y,10,170,'#ffe85a',12,.55);ring(o.x,o.y,10,120,'#ffffff',6,.45);
    for(let i=0;i<24;i++)rockP(o.x,o.y,rnd(0,TAU),rnd(100,300));for(let i=0;i<14;i++)dustP(o.x,o.y,rnd(100,220));for(let i=0;i<9;i++){const a=i*TAU/9+rnd(-.2,.2);h.arcs.push({a,L:rnd(110,170)})}
    EN.forEach(x=>{if(x.hid||x.jump)return;const d=dist(o,x);if(d<115+x.r){hurt(x,9,o,x.x,x.y,0,1);x.stn=Math.max(x.stn,.6);x.cast=null;safePush(x,ang(o,x),40)}})}
  return h.t<D+.7};
HZD.kglp=h=>{if(h.land)return;const u=h.t/.6;g.save();g.translate(h.tx,h.ty);g.globalAlpha=.4+.4*u;g.strokeStyle='#ffe85a';g.lineWidth=4;g.setLineDash([12,9]);g.lineDashOffset=-clock*70;g.beginPath();g.arc(0,0,115,0,TAU);g.stroke();g.setLineDash([]);g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.ellipse(0,6,38*u+10,14*u+4,0,0,TAU);g.fill();g.restore()};
HZP.kglp=h=>{const o=h.o;if(o.dead)return;
  if(!h.land){const u=h.t/.6,z=Math.sin(Math.PI*u)*150,s=1+z/220;g.save();g.translate(o.x,o.y-z);g.scale(s,s);g.translate(-o.x,-o.y);kgBody(o,-Math.PI/2,0,0,0,Math.min(1,u*2.2),1);g.restore();
    if(Math.random()<.6){const gx=o.x+o.r*.75*s,gy=o.y-z-o.r*1.7*s;lkBolt(gx,gy,gx+rnd(-30,30),gy+rnd(-30,30),'#ffe85a',1.6)}return}
  const q=h.t-.6,fa=Math.max(0,1-q/.7);
  // 두 주먹이 땅에 박힘
  if(q<.4)kgBody(o,Math.PI/2,1,1,6,0,1,1-q/.4);
  // 땅으로 퍼지는 전기
  if(q<.45)h.arcs.forEach(r=>{const L=r.L*Math.min(1,q/.12);lkBolt(o.x,o.y,o.x+Math.cos(r.a)*L,o.y+Math.sin(r.a)*L,'#ffe85a',2.4*(1-q/.45))});
  g.save();g.translate(o.x,o.y);g.globalCompositeOperation='lighter';glow('#ffe85a',0,0,130*fa,.4*fa);g.restore()};

// ---------- 2) 바위 던지기 ----------
function kgRock(o,t){HZ.push({k:'kgrk',o,tg:t,t:0,a:ang(o,t),sx:o.x,sy:o.y,sd:Math.floor(rnd(0,999))});SFXa('kg_rip')}
HZX.kgrk=(h,dt,EN)=>{const o=h.o;let e=h.tg;if(!e||e.dead){e=tgt(o);h.tg=e}if(!h.thr){if(o.dead)return false;o.gcd=Math.max(o.gcd,.3);o.cast=null;o.x=h.sx;o.y=h.sy;if(e)h.a=ang(o,e);
    if(h.t<.15&&Math.random()<.5){dustP(o.x+Math.cos(h.a)*o.r,o.y+Math.sin(h.a)*o.r,rnd(40,90))}
    if(h.t>=.12&&!h.cr){h.cr=1;h.crx=o.x+Math.cos(h.a)*(o.r+20);h.cry=o.y+Math.sin(h.a)*(o.r+20);FX.push({k:'crack',x:h.crx,y:h.cry,r:50,l:2.4,m:2.4});for(let i=0;i<12;i++)rockP(h.crx,h.cry,rnd(0,TAU),rnd(60,160));shake=Math.max(shake,8)}
    if(h.t>=.7){h.thr=1;h.tt=h.t;SFXa('kg_throw');const tx=e?clamp(e.x+(e.dx||0)*(e.sp||0)*.5,30,A-30):o.x+Math.cos(h.a)*250,ty=e?clamp(e.y+(e.dy||0)*(e.sp||0)*.5,30,A-30):o.y+Math.sin(h.a)*250;h.bx0=o.x;h.by0=o.y-o.r*1.6;h.tx=tx;h.ty=ty;h.fd=clamp(dist({x:h.bx0,y:h.by0},{x:tx,y:ty})/650,.35,.75)}
    return true}
  const q=h.t-h.tt;if(q<h.fd)return true;
  if(!h.boom){h.boom=1;SFXa('kg_rock');shake=Math.max(shake,18);hs=.08;lkImp(h.tx,h.ty,110,'#ffd59a');FX.push({k:'crack',x:h.tx,y:h.ty,r:90,l:2.6,m:2.6});ring(h.tx,h.ty,10,120,'#ffd59a',9,.5);for(let i=0;i<26;i++)rockP(h.tx,h.ty,rnd(0,TAU),rnd(100,320));for(let i=0;i<14;i++)dustP(h.tx,h.ty,rnd(80,200));
    EN.forEach(x=>{if(x.hid||x.jump)return;const d=Math.hypot(x.x-h.tx,x.y-h.ty);if(d<75+x.r){hurt(x,10,o,x.x,x.y,0,1);x.stn=Math.max(x.stn,.35);safePush(x,Math.atan2(x.y-h.ty,x.x-h.tx),36)}})}
  return q<h.fd+.6};
function kgBoulder(x,y,s,rot,sd){g.save();g.translate(x,y);g.rotate(rot);g.scale(s,s);const P=[];for(let i=0;i<11;i++){const a=i*TAU/11,r=22*(.82+((i*37+sd)%9)/9*.3);P.push([Math.cos(a)*r,Math.sin(a)*r])}
  g.fillStyle='rgba(0,0,0,.25)';g.beginPath();P.forEach(([a,b],i)=>i?g.lineTo(a+3,b+4):g.moveTo(a+3,b+4));g.closePath();g.fill();
  const gr=g.createRadialGradient(-7,-8,2,0,0,26);gr.addColorStop(0,'#9a948c');gr.addColorStop(.6,'#5e5850');gr.addColorStop(1,'#2e2a26');g.fillStyle=gr;g.strokeStyle='#14110e';g.lineWidth=2.2;g.beginPath();P.forEach(([a,b],i)=>i?g.lineTo(a,b):g.moveTo(a,b));g.closePath();g.fill();g.stroke();
  g.strokeStyle='rgba(20,16,12,.7)';g.lineWidth=1.5;g.beginPath();g.moveTo(-10,-4);g.lineTo(-2,2);g.lineTo(4,-6);g.moveTo(2,2);g.lineTo(6,10);g.moveTo(-14,8);g.lineTo(-6,10);g.stroke();
  g.fillStyle='rgba(255,255,255,.18)';g.beginPath();g.ellipse(-8,-10,7,3.5,-.5,0,TAU);g.fill();g.fillStyle='rgba(90,110,60,.6)';g.beginPath();g.ellipse(8,-12,6,3,.3,0,TAU);g.fill();g.restore()}
HZD.kgrk=h=>{if(h.cr){const k=h.t-.12;g.save();g.translate(h.crx,h.cry);g.globalAlpha=Math.max(0,1-k/2.4)*.7;g.fillStyle='#0c0a08';g.beginPath();g.ellipse(0,0,30,16,h.a,0,TAU);g.fill();g.restore()}
  if(h.thr&&!h.boom){const q=(h.t-h.tt)/h.fd,x=h.bx0+(h.tx-h.bx0)*q,y=h.by0+(h.ty-h.by0)*q;g.save();g.globalAlpha=.4;g.fillStyle='#000';g.beginPath();g.ellipse(h.bx0+(h.tx-h.bx0)*q,(h.sy)+(h.ty-h.sy)*q+8,26*(.6+q*.4),10*(.6+q*.4),0,0,TAU);g.fill();g.restore();
    g.save();g.translate(h.tx,h.ty);g.globalAlpha=.5;g.strokeStyle='#ffd59a';g.lineWidth=3;g.setLineDash([10,8]);g.beginPath();g.arc(0,0,75,0,TAU);g.stroke();g.setLineDash([]);g.restore()}};
HZP.kgrk=h=>{const o=h.o;if(!h.thr){if(o.dead)return;const t=h.t;
    if(t<.3){// 땅을 파고 들어 올림
      const u=t/.3;kgBody(o,h.a,1-u*.4,1-u*.4,14,0,0);if(h.cr){const lift=u;kgBoulder(h.crx+(o.x-h.crx)*lift*.3,h.cry-lift*30,1+u*.6,0,h.sd)}}
    else{const u=Math.min(1,(t-.3)/.25),bx=o.x+(h.crx-o.x)*(1-u)*.7,by=o.y-o.r*1.6*u+(h.cry-o.y)*(1-u)*.7-30*(1-u);kgBody(o,h.a,0,0,0,u,0);kgBoulder(bx,by-Math.sin(t*12)*2*(t>.55?1:0),1.6+u*.35,Math.sin(t*6)*.05,h.sd);
      if(t>.55){g.save();g.translate(o.x,o.y);g.globalCompositeOperation='lighter';glow('#ffd59a',0,-o.r,40,.3);g.restore()}}
    return}
  const q=(h.t-h.tt)/h.fd;if(q<1){const x=h.bx0+(h.tx-h.bx0)*q,y=h.by0+(h.ty-h.by0)*q-Math.sin(Math.PI*q)*140,s=1.95+Math.sin(Math.PI*q)*.7;g.save();g.globalCompositeOperation='lighter';g.strokeStyle='rgba(255,230,190,.35)';g.lineWidth=18;g.lineCap='round';const pq=Math.max(0,q-.15),px=h.bx0+(h.tx-h.bx0)*pq,py=h.by0+(h.ty-h.by0)*pq-Math.sin(Math.PI*pq)*140;g.beginPath();g.moveTo(px,py);g.lineTo(x,y);g.stroke();g.restore();kgBoulder(x,y,s,h.t*9,h.sd);
    if(!o.dead&&h.t-h.tt<.2)kgBody(o,h.a,0,1,30,0,0,1-(h.t-h.tt)/.2)}};

// ---------- 3) ULT 킹의 도끼 ----------
function kgAxeDraw(s,ch,al){g.save();g.scale(s,s);g.globalAlpha=al==null?1:al;
  // 손잡이 (뼈)
  const hg=g.createLinearGradient(0,-3,0,3);hg.addColorStop(0,'#efe4cc');hg.addColorStop(1,'#a8987a');g.fillStyle=hg;g.strokeStyle='#2a2216';g.lineWidth=1.5;g.beginPath();g.moveTo(-30,-2.6);g.lineTo(16,-3);g.lineTo(16,3);g.lineTo(-30,2.6);g.closePath();g.fill();g.stroke();
  g.beginPath();g.arc(-31,0,4,0,TAU);g.fill();g.stroke();g.strokeStyle='#5a4a30';g.lineWidth=2;[-18,-12,-6].forEach(x=>{g.beginPath();g.moveTo(x,-3);g.lineTo(x+3,3);g.stroke()});
  // 날 (뾰족뾰족한 등지느러미 모양)
  g.save();g.translate(14,0);const P=[[0,-6],[6,-14],[10,-10],[15,-22],[19,-12],[25,-18],[26,-6],[30,0],[26,6],[25,18],[19,12],[15,22],[10,10],[6,14],[0,6]];
  if(ch>0){g.save();g.globalCompositeOperation='lighter';glow(KGB,16,0,40,ch*.8);g.restore()}
  const bg=g.createLinearGradient(0,0,30,0);bg.addColorStop(0,'#2c3038');bg.addColorStop(1,'#596070');g.fillStyle=bg;g.strokeStyle='#0c0e12';g.lineWidth=1.8;g.beginPath();P.forEach(([a,b],i)=>i?g.lineTo(a,b):g.moveTo(a,b));g.closePath();g.fill();g.stroke();
  if(ch>0){g.globalCompositeOperation='lighter';g.strokeStyle='rgba(120,230,255,'+(.5+.5*ch)+')';g.lineWidth=2.5;g.beginPath();P.slice(1,-1).forEach(([a,b],i)=>i?g.lineTo(a,b):g.moveTo(a,b));g.stroke();g.strokeStyle='#ffffff';g.lineWidth=1;g.stroke();
    g.fillStyle='rgba(74,216,255,'+(.25*ch)+')';g.beginPath();P.forEach(([a,b],i)=>i?g.lineTo(a,b):g.moveTo(a,b));g.closePath();g.fill()}
  g.restore();g.restore()}
function kgAxe(o,t){HZ.push({k:'kgax',o,tg:t,t:0,n:0,sw:[],P:[]});HZ.push({k:'kgroar',o,t:0})}
HZX.kgax=(h,dt,EN)=>{const o=h.o;if(o.dead)return false;let e=h.tg;if(!e||e.dead){e=tgt(o);h.tg=e}o.gcd=Math.max(o.gcd,.4);o.cast=null;h.P.push({x:o.x,y:o.y});if(h.P.length>10)h.P.shift();const T0=1;
  if(h.t<T0)return true;// 포효 중
  if(h.t>=T0&&!h.chg){h.chg=1;SFXa('kg_charge')}
  const C=T0+.45;if(h.t<C){if(Math.random()<.8){const a=rnd(0,TAU),r=rnd(60,120);Pt.push({x:o.x+Math.cos(a)*r,y:o.y+Math.sin(a)*r,vx:-Math.cos(a)*r*2.2,vy:-Math.sin(a)*r*2.2,l:.4,m:.4,gl:1,sh:5,col:KGB,r:2.2,fr:.1})}return true}
  // 세 번 베기
  const S=[C,C+.42,C+.84];if(h.n<3&&h.t>=S[h.n]&&e){h.n++;const a=ang(o,e);h.sa=a;h.sd=h.n%2?1:-1;h.st=h.t;h.sx=o.x;h.sy=o.y;h.d=Math.max(0,dist(o,e)-o.r-e.r-20);SFXa('kg_axe')}
  if(h.st!=null&&h.t-h.st<.2&&h.n<=3&&!h.fin){const u=(h.t-h.st)/.2;o.x=clamp(h.sx+Math.cos(h.sa)*h.d*u,o.r,A-o.r);o.y=clamp(h.sy+Math.sin(h.sa)*h.d*u,o.r,A-o.r);
    if(u>.55&&h.hitN!=h.n){h.hitN=h.n;EN.forEach(x=>{if(x.hid||x.jump)return;const d=dist(o,x),da=Math.abs(Math.atan2(Math.sin(ang(o,x)-h.sa),Math.cos(ang(o,x)-h.sa)));if(d<o.r+x.r+70&&da<1.5){hurt(x,5,o,x.x,x.y,0,1);SFXa('kg_axehit');lkImp(x.x,x.y,80,KGB);safePush(x,h.sa,40);x.stn=Math.max(x.stn,.3);shake=Math.max(shake,12);hs=.06}})}}
  // 마지막 내려찍기
  const F0=C+1.3;if(h.t>=F0&&!h.fin){h.fin=1;h.fa=e?ang(o,e):h.sa||0;h.ft=h.t;SFXa('kg_jump')}
  if(h.fin&&!h.chop&&h.t>=h.ft+.35){h.chop=1;SFXa('kg_axehit');SFXa('kg_wave');shake=Math.max(shake,28);hs=.15;FX.push({k:'frost',l:.12,m:.12,c:'#d8f6ff'});const hx=o.x+Math.cos(h.fa)*(o.r+30),hy=o.y+Math.sin(h.fa)*(o.r+30);lkImp(hx,hy,160,KGB);FX.push({k:'crack',x:hx,y:hy,r:110,l:2.6,m:2.6});for(let i=0;i<20;i++)rockP(hx,hy,rnd(0,TAU),rnd(100,300));
    h.wx=hx;h.wy=hy;EN.forEach(x=>{if(x.hid||x.jump)return;const px=x.x-hx,py=x.y-hy,al=px*Math.cos(h.fa)+py*Math.sin(h.fa),pe=Math.abs(-px*Math.sin(h.fa)+py*Math.cos(h.fa));if((al>-40&&al<A*1.2&&pe<46+x.r)||Math.hypot(px,py)<80+x.r){hurt(x,9,o,x.x,x.y,0,1);x.stn=Math.max(x.stn,.6);x.cast=null;lkTrail(x,KGB,.35);safePush(x,h.fa,50)}})}
  if(h.fin&&!h.chop){const u=(h.t-h.ft)/.35;o.kAir={z:Math.sin(Math.PI*Math.min(1,u))*70}}else if(o.kAir&&h.fin)o.kAir=null;
  return !h.chop||h.t<h.ft+1.2};
HZD.kgax=h=>{const T0=1;lkDim(h.chop?Math.max(0,.5-(h.t-h.ft-.35)*.8):.5*Math.min(1,h.t/.3));
  if(h.chop){const q=h.t-h.ft-.35,L=A*1.4*Math.min(1,q/.2),al=Math.max(0,1-q/.85);g.save();g.translate(h.wx,h.wy);g.rotate(h.fa);g.globalAlpha=al;g.fillStyle='#04080c';g.fillRect(0,-10,L,20);g.globalCompositeOperation='lighter';const gr=g.createLinearGradient(0,-46,0,46);gr.addColorStop(0,'rgba(74,216,255,0)');gr.addColorStop(.5,'rgba(200,245,255,.95)');gr.addColorStop(1,'rgba(74,216,255,0)');g.fillStyle=gr;g.fillRect(0,-46*(1-q*.4),L,92*(1-q*.4));g.restore()}};
HZP.kgax=h=>{const o=h.o;if(o.dead)return;const T0=1,C=T0+.45;if(h.t<T0)return;const ch=Math.min(1,(h.t-T0)/.45);
  if(o.kAir){}
  let aa=h.sa!=null?h.sa:(h.tg?ang(o,h.tg):0);
  if(h.t<C){// 도끼를 높이 들고 충전
    kgBody(o,aa,0,0,0,.8,0);g.save();g.translate(o.x+o.r*.6,Math.max(70,o.y-o.r*1.6));g.rotate(-Math.PI/2+Math.sin(clock*10)*.05);kgAxeDraw(1.5,ch);g.restore();
    g.save();g.translate(o.x+o.r*.6,Math.max(70,o.y-o.r*1.6)-40);g.globalCompositeOperation='lighter';glow(KGB,0,0,40+ch*40,ch*.7);g.restore();return}
  // 휘두르기 자국
  if(h.st!=null&&!h.fin){const u=Math.min(1,(h.t-h.st)/.28),sd=h.sd,a0=aa-sd*1.6,a1=aa+sd*1.6*(u*2-1);lkRibbon(h.P,o.r*1.4,KGB,.5);lkSwoosh(o.x,o.y,a0,a0+(a1-a0)*Math.min(1,u*1.4),o.r+64,46*(1-u*.4),KGB,.9*(1-Math.max(0,u-.6)/.4));lkSwoosh(o.x,o.y,a0,a0+(a1-a0)*Math.min(1,u*1.4),o.r+64,14,'#ffffff',.7*(1-u));
    const ax=aa+sd*1.6*(Math.min(1,u*1.4)*2-1);kgBody(o,ax,0,1,20,0,0);g.save();g.translate(o.x+Math.cos(ax)*(o.r+22),o.y+Math.sin(ax)*(o.r+22));g.rotate(ax);kgAxeDraw(1.6,1);g.restore();return}
  if(h.fin){const u=Math.min(1,(h.t-h.ft)/.35),z=o.kAir?o.kAir.z:0,fa=h.fa,rot=h.chop?fa:fa-Math.PI*.9*(1-u);
    g.save();g.translate(0,-z);kgBody(o,rot,0,1,24,0,0);g.save();g.translate(o.x+Math.cos(rot)*(o.r+26),o.y+Math.sin(rot)*(o.r+26));g.rotate(rot);kgAxeDraw(2.1*(h.chop?Math.max(.6,1-(h.t-h.ft-.35)):1),1);g.restore();g.restore();
    if(!h.chop)lkSwoosh(o.x,o.y-z,fa-Math.PI*.9,rot,o.r+70,40*u,KGB,.7*u)}};

// ---------- 밸런스 ----------
Object.assign(DMGK,{kong:1.42});

// ---------- 아이콘 ----------
EMB.kong=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*2)*.04);
  neon(D,1.8,()=>{g.beginPath();g.moveTo(-15,-6);g.quadraticCurveTo(-14,-17,0,-17);g.quadraticCurveTo(14,-17,15,-6);g.moveTo(-15,-6);g.quadraticCurveTo(-18,8,-9,14);g.quadraticCurveTo(0,18,9,14);g.quadraticCurveTo(18,8,15,-6);
    g.moveTo(-13,-5);g.quadraticCurveTo(-6,-9,0,-5);g.quadraticCurveTo(6,-9,13,-5)});
  neon({col:'#ffd59a',hi:'#ffffff'},1.3,()=>{g.beginPath();g.ellipse(-6,-1,2.2,1.4,0,0,TAU);g.moveTo(8.2,-1);g.ellipse(6,-1,2.2,1.4,0,0,TAU);g.moveTo(-3,5);g.quadraticCurveTo(0,3,3,5);g.moveTo(-7,10);g.quadraticCurveTo(0,13,7,10)});
  g.save();g.globalCompositeOperation='lighter';glow('#ffd59a',0,0,16,.25);g.restore()};
document.querySelectorAll('#grid .tile').forEach(t=>{const i=+t.dataset.i,vc=DEF.filter(x=>x.vof===i).length;let em=t.querySelector('.vb');if(vc){if(!em){em=document.createElement('em');em.className='vb';t.appendChild(em)}em.textContent='+'+vc}});
Object.keys(ICC).forEach(k=>delete ICC[k]);mkDict();
;
