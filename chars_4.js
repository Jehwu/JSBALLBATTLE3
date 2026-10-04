// ======================================================================
// chars_4.js : 변이 4묶음 : (기본 박지성 블래스터 그림) · 최재희 · AURA · 덕질 · 조커 · 괴담콜렉터 · 다이어트  ← 새 캐릭터는 이 파일 맨 아래에 추가
// 안에 들어있는 순서 : extra19 → extra20 → extra22 → extra23
// (순서가 중요해서 위에서부터 차례로 실행됨 · 섹션 위치를 바꾸지 말 것)
// ======================================================================



// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ▶ 섹션 : extra19
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ===== extra19.js : 기본 박지성 해골 블래스터 그림 교체 + 김건우 • 최재희 =====

// ---------- 기본 박지성 · 해골 블래스터 → 샌즈의 가스터 블래스터 그림으로 ----------
(function(){const _dB=drawBlaster;drawBlaster=function(h){if(typeof snBlasterArt!='function')return _dB(h);const D=h.o.d,ap=back(clamp(h.t/.25,0,1)),fade=h.fired?clamp((h.ch+.55-h.t)/.2,0,1):1,ca=Math.cos(h.a0),sa=Math.sin(h.a0);
  if(!h.fired){const p=h.t/h.ch;g.save();g.globalCompositeOperation='lighter';glow(D.col,h.x+ca*34,h.y+sa*34,10+34*p,.9*p);glow('#ffffff',h.x+ca*34,h.y+sa*34,4+10*p,p);g.restore();g.save();g.globalAlpha=.25+.55*p;g.strokeStyle=D.hi;g.lineWidth=1+4*p;g.setLineDash([10,8]);g.lineDashOffset=-clock*80;g.beginPath();g.moveTo(h.x,h.y);g.lineTo(h.x+ca*900,h.y+sa*900);g.stroke();g.restore()}
  else if(h.t<h.ch+.4){const bt=h.t-h.ch,w=(bt<.06?bt/.06:1)*(1-clamp((bt-.25)/.15,0,1))*30;if(typeof snBeam=='function')snBeam(h.x+ca*20,h.y+sa*20,h.a0,900,w*1.4,1);else{g.save();g.translate(h.x,h.y);g.rotate(h.a0);g.globalCompositeOperation='lighter';g.fillStyle='#ffffff';g.fillRect(20,-w*.5,900,w);g.restore()}}
  const open=h.fired?1:Math.min(1,h.t/h.ch),glw=h.fired?Math.max(0,1-(h.t-h.ch)/.4):Math.min(1,h.t/h.ch);g.save();g.translate(h.x-(h.fired?ca*16*Math.min(1,(h.t-h.ch)/.1):0),h.y-(h.fired?sa*16*Math.min(1,(h.t-h.ch)/.1):0));g.rotate(h.a0);snBlasterArt(1.05*ap,open,glw,fade);g.restore()}})();

// ======================================================================
// 김건우 • 최재희 (말투 밈 : 엄 · 예? · 쥐~이~랄~ · 티~원~ · 줴줴이야~)
// ======================================================================
const CJC='#e0283c',CJF='"Black Han Sans","Galmuri11",'+FB;
const NEW29=['cj_um','cj_dot','cj_pop','cj_ye','cj_shout','cj_syl','cj_boom','cj_chant','cj_g','cj_gg','cj_bubble'];
NEW29.forEach(n=>{if(!SND.includes(n))SND.push(n);if(!AUD[n])AUD[n]=new SoundPool('sounds/'+n+'.mp3',n=='cj_dot'||n=='cj_syl'?5:3)});
Object.assign(SLB,{cj_um:'최재희 · 엄…',cj_dot:'최재희 · 점 하나',cj_pop:'최재희 · 말풍선 터짐',cj_ye:'최재희 · 예?',cj_shout:'최재희 · 쥐~이~랄~',cj_syl:'최재희 · 글자 명중',cj_boom:'최재희 · 랄 폭발',cj_chant:'최재희 · 티~원~ 응원',cj_g:'최재희 · G 떨어짐',cj_gg:'최재희 · 줴줴이야~',cj_bubble:'최재희 · 말풍선 날아감'});
const CJSK=[
  {n:'엄…',w:.25,cd:8,c:(o,t)=>!t.hid&&!t.jump&&dist(o,t)<440,f:(o,t)=>cjUm(o,t)},
  {n:'쥐~이~랄~',w:.3,cd:7,c:(o,t)=>!t.hid&&dist(o,t)<480,f:(o,t)=>cjJr(o,t)},
  {n:'티~원~ 줴줴이야~',w:.4,ult:1,c:(o,t)=>!t.hid,f:(o,t)=>cjT1(o,t)}];
const CJI=DEF.findIndex(d=>d.name=='김건우');
DEF.push({name:'김건우 • 최재희',gl:'재',k:'cjh',vof:CJI,r:26,sp:214,col:'#d01f36',hi:'#ffd6dc',dk:'#1a0206',alt:{col:'#1e1e24',hi:'#ff5a6a',dk:'#050506'},alt2:{col:'#f2f2f2',hi:'#d01f36',dk:'#202020'},sk:CJSK});
INFO['김건우 • 최재희']={st:[7,6,8,8,7,9],p:'예? · 맞을 때 18% 확률로 "예?" 하고 못 들은 척 · 그 공격은 무시 (3초에 한 번)',
  sk:[['2.5×3+3','"엄…" 말풍선이 날아가 상대를 가둠 · 엄. 엄.. 엄... 점이 하나씩 찍힐 때마다 피해 · 마지막에 말풍선이 터짐'],['3+3+5','쥐~ 이~ 랄~ 세 글자가 물결치며 날아감 · 마지막 "랄"은 크게 터짐'],['7+7+6','경기장이 어두운 무대로 바뀌고 "티~원~!" 응원 · 하늘에서 거대한 G 두 개가 떨어지고 "줴줴이야~"로 마무리 (기절)']]};

// 공통 : 말풍선
function cjBubble(x,y,R,txt,al,tail,fs){g.save();g.translate(x,y);g.globalAlpha=al==null?1:al;g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.ellipse(4,5,R*1.15,R*.85,0,0,TAU);g.fill();
  g.fillStyle='#ffffff';g.strokeStyle='#14080a';g.lineWidth=4;g.beginPath();g.ellipse(0,0,R*1.15,R*.85,0,0,TAU);if(tail){g.moveTo(-R*.35,R*.7);g.lineTo(-R*.8,R*1.25);g.lineTo(-R*.05,R*.82)}g.fill();g.stroke();
  if(txt){g.fillStyle='#14080a';g.font='900 '+(fs||Math.round(R*.75))+'px '+CJF;g.textAlign='center';g.textBaseline='middle';g.fillText(txt,0,2)}g.restore()}
// 패시브 : 예?
const _hurtCJ=hurt;hurt=function(t,n,o){if(t&&t.d&&t.d.k=='cjh'&&o&&o!=t&&n>0&&!t.dead&&!(t.cjYe>0)&&Math.random()<.18){t.cjYe=3;t.cjQ=0;SFXa('cj_ye');return}return _hurtCJ.apply(this,arguments)};
const _updCJ=update;update=function(dt){_updCJ(dt);if(F)F.forEach(f=>{if(f.cjYe>0)f.cjYe-=dt;if(f.cjQ!=null){f.cjQ+=dt;if(f.cjQ>.9)f.cjQ=null}})};
const _lowCJ=lowHP;lowHP=function(f){_lowCJ(f);if(f.cjQ!=null&&!f.dead){const u=f.cjQ/.9,s=u<.15?u/.15*1.3:1.3-Math.min(.3,(u-.15)*2),al=u>.75?1-(u-.75)/.25:1;g.save();g.translate(f.x+f.r*.9,f.y-f.r-26);g.rotate(.15*Math.sin(u*20)*(1-u));g.scale(s,s);
  cjBubble(0,0,20,'예?',al,1,17);g.restore();g.save();g.globalAlpha=al;g.translate(f.x-f.r*.6,f.y-f.r-34);g.rotate(-.25);g.font='900 34px '+CJF;g.textAlign='center';g.lineJoin='round';g.lineWidth=6;g.strokeStyle='#14080a';g.strokeText('?',0,0);g.fillStyle=CJC;g.fillText('?',0,0);g.restore()}};
const _initCJ=init;init=function(){_initCJ.apply(this,arguments);if(F)F.forEach(f=>{f.cjYe=0;f.cjQ=null;f.cjLock=null})};

// 1) 엄… : 말풍선이 날아가 상대를 가두고 점이 찍힐 때마다 피해
function cjUm(o,t){const a=ang(o,t);HZ.push({k:'cjum',o,tg:t,t:0,x:o.x+Math.cos(a)*(o.r+30),y:o.y+Math.sin(a)*(o.r+30),a,st:0,n:0});SFXa('cj_bubble')}
HZX.cjum=(h,dt,EN)=>{const o=h.o;let e=h.tg;if(!h.st){if(!e||e.dead||e.hid){if(h.t>.3)return false;e=tgt(o);h.tg=e;if(!e)return false}
    const ta=Math.atan2(e.y-h.y,e.x-h.x);h.a+=Math.atan2(Math.sin(ta-h.a),Math.cos(ta-h.a))*Math.min(1,dt*4);const v=200+h.t*260;h.x+=Math.cos(h.a)*v*dt;h.y+=Math.sin(h.a)*v*dt;
    if(Math.hypot(e.x-h.x,e.y-h.y)<e.r+28){h.st=1;h.tt=h.t;h.ex=e.x;h.ey=e.y;SFXa('cj_um');e.cast=null}
    return h.t<1.6}
  const q=h.t-h.tt;if(!e.dead){e.x=h.ex;e.y=h.ey;e.stn=Math.max(e.stn,.2);e.cast=null}
  const S=[.38,.74,1.1];if(h.n<3&&q>=S[h.n]){h.n++;SFXa('cj_dot');if(!e.dead){hurt(e,2.5,o,e.x,e.y,0,0);shake=Math.max(shake,4)}}
  if(q>=1.42&&!h.pop){h.pop=1;SFXa('cj_pop');if(!e.dead){hurt(e,3,o,e.x,e.y,0,1);if(typeof lkImp=='function')lkImp(e.x,e.y,70,'#ffffff')}for(let i=0;i<14;i++){const a=rnd(0,TAU);Pt.push({x:h.ex+Math.cos(a)*30,y:h.ey+Math.sin(a)*24,vx:Math.cos(a)*rnd(120,260),vy:Math.sin(a)*rnd(120,260),l:.5,m:.5,sh:10,col:'#ffffff',r:rnd(3,6),rot:rnd(0,TAU),vr:rnd(-10,10),fr:.5})}ring(h.ex,h.ey,20,90,'#ffffff',6,.35)}
  return q<1.75};
HZP.cjum=h=>{if(!h.st){const s=1+.06*Math.sin(h.t*16);cjBubble(h.x,h.y-10,40*s,'엄',1,1,32);return}
  const q=h.t-h.tt;if(h.pop){return}const e=h.tg,R=(e?e.r:26)+24,u=Math.min(1,q/.15);
  // 어색한 침묵 : 주변 색이 빠짐
  g.save();g.globalCompositeOperation='saturation';g.globalAlpha=.85*u;g.fillStyle='hsl(0,0%,50%)';g.beginPath();g.arc(h.ex,h.ey,R*2.4,0,TAU);g.fill();g.restore();
  g.save();g.translate(h.ex,h.ey);g.globalAlpha=.9*u;g.fillStyle='rgba(255,255,255,.55)';g.strokeStyle='#14080a';g.lineWidth=4;g.beginPath();g.ellipse(0,0,R*1.15*u,R*.95*u,0,0,TAU);g.fill();g.stroke();
  g.restore();cjBubble(h.ex+R*.5,h.ey-R-44,38,'엄'+'.'.repeat(h.n),1,1,30);
  for(let i=0;i<h.n;i++){const ph=(q*2+i)%1;g.save();g.globalAlpha=1-ph;g.font='700 14px '+UTF;g.fillStyle='#bbb';g.textAlign='center';g.fillText('…',h.ex+(i-1)*34,h.ey-R-36-ph*20);g.restore()}};

// 2) 쥐~이~랄~ : 세 글자가 물결치며 날아감
function cjJr(o,t){HZ.push({k:'cjjr',o,tg:t,t:0,n:0,sy:[]});SFXa('cj_shout')}
HZX.cjjr=(h,dt,EN)=>{const o=h.o;let e=h.tg;if(!e||e.dead){e=tgt(o);h.tg=e}const CH=['쥐','이','랄'];
  if(!o.dead&&h.n<3&&h.t>=h.n*.2){const a=e?ang(o,e):0;h.sy.push({ch:CH[h.n],i:h.n,x:o.x,y:o.y,bx:o.x,by:o.y,a,t:0,P:[],big:h.n==2});h.n++;o.gcd=Math.max(o.gcd,.3)}
  h.sy=h.sy.filter(s=>{s.t+=dt;if(e&&!e.dead&&!e.hid){const ta=Math.atan2(e.y-s.by,e.x-s.bx);s.a+=Math.atan2(Math.sin(ta-s.a),Math.cos(ta-s.a))*Math.min(1,dt*3.2)}const v=s.big?400:470;s.bx+=Math.cos(s.a)*v*dt;s.by+=Math.sin(s.a)*v*dt;
    const w=Math.sin(s.t*13+s.i*2)*(26+s.i*4);s.x=s.bx-Math.sin(s.a)*w;s.y=s.by+Math.cos(s.a)*w;s.P.push({x:s.x,y:s.y});if(s.P.length>14)s.P.shift();
    if(s.x<-40||s.x>A+40||s.y<-40||s.y>A+40||s.t>1.4)return false;
    for(const x of EN){if(x.hid||x.jump)continue;if(Math.hypot(x.x-s.x,x.y-s.y)<x.r+(s.big?28:20)){if(s.big){SFXa('cj_boom');hurt(x,5,o,x.x,x.y,0,1);if(typeof lkImp=='function')lkImp(s.x,s.y,110,CJC);ring(s.x,s.y,10,110,CJC,9,.45);shake=Math.max(shake,14);EN.forEach(y=>{if(y!=x&&!y.hid&&Math.hypot(y.x-s.x,y.y-s.y)<90+y.r)hurt(y,3,o,y.x,y.y,0,0)})}
      else{SFXa('cj_syl');hurt(x,3,o,x.x,x.y,0,0);if(typeof lkImp=='function')lkImp(s.x,s.y,50,CJC);safePush(x,s.a,18)}return false}}return true});
  return h.n<3||h.sy.length>0};
HZP.cjjr=h=>{h.sy.forEach(s=>{// 물결 꼬리 (~)
  if(s.P.length>2){g.save();g.globalCompositeOperation='lighter';g.lineCap='round';g.lineJoin='round';for(let i=1;i<s.P.length;i++){const u=i/s.P.length;g.strokeStyle='rgba(224,40,60,'+(u*.7)+')';g.lineWidth=(s.big?14:9)*u;g.beginPath();g.moveTo(s.P[i-1].x,s.P[i-1].y);g.lineTo(s.P[i].x,s.P[i].y);g.stroke()}g.restore()}
  const fs=s.big?76:56,wob=Math.sin(s.t*30)*.12;g.save();g.translate(s.x,s.y);g.rotate(wob);g.save();g.globalCompositeOperation='lighter';glow(CJC,0,0,fs*.9,.6);g.restore();
  g.font='900 '+fs+'px '+CJF;g.textAlign='center';g.textBaseline='middle';g.lineJoin='round';g.lineWidth=9;g.strokeStyle='#14080a';g.strokeText(s.ch,0,0);g.fillStyle='#ffffff';g.fillText(s.ch,0,0);g.lineWidth=2;g.strokeStyle=CJC;g.strokeText(s.ch,0,0);
  g.font='900 '+Math.round(fs*.6)+'px '+CJF;g.fillStyle=CJC;g.fillText('~',fs*.62,fs*.18);g.restore()})};

// 3) ULT 티~원~ … 줴줴이야~
function cjT1(o,t){if(!t||t.dead)t=tgt(o);if(!t)return;HZ.push({k:'cjt1',o,tg:t,t:0,n:0,gs:[]});SFXa('cj_chant')}
HZX.cjt1=(h,dt,EN)=>{const o=h.o;let e=h.tg;if(!e||e.dead){e=tgt(o);h.tg=e}if(!o.dead){o.gcd=Math.max(o.gcd,.4);o.cast=null}if(!e)return h.t<3.6;
  if(h.t<1.5&&e&&!e.dead)e.slow=Math.max(e.slow,.4);
  const G=[1.5,1.95];if(h.n<2&&h.t>=G[h.n]){h.gs.push({x:e.x,y:e.y,t0:h.t,i:h.n});h.n++;SFXa('cj_g')}
  h.gs.forEach(q=>{if(!q.hit&&h.t-q.t0>=.28){q.hit=1;SFXa('heavy');shake=Math.max(shake,20);hs=.1;if(typeof lkImp=='function')lkImp(q.x,q.y,140,CJC);FX.push({k:'crack',x:q.x,y:q.y,r:90,l:2.2,m:2.2});for(let i=0;i<16;i++)rockP(q.x,q.y,rnd(0,TAU),rnd(100,260));
    EN.forEach(x=>{if(x.hid||x.jump)return;if(Math.hypot(x.x-q.x,x.y-q.y)<70+x.r){hurt(x,7,o,x.x,x.y,0,1);x.stn=Math.max(x.stn,.3)}})}});
  if(h.t>=2.55&&!h.gg){h.gg=1;SFXa('cj_gg');if(!e.dead&&!e.hid){hurt(e,6,o,e.x,e.y,0,1);e.stn=Math.max(e.stn,.9);e.cast=null;ring(e.x,e.y,10,160,CJC,10,.6);shake=Math.max(shake,14)}}
  return h.t<3.6};
HZD.cjt1=h=>{const fa=h.t<3?Math.min(1,h.t/.3):Math.max(0,1-(h.t-3)/.6);if(typeof lkDim=='function')lkDim(.62*fa);
  // 무대 조명
  g.save();g.globalCompositeOperation='lighter';for(let i=0;i<4;i++){const bx=A*(.12+i*.25),sw=Math.sin(h.t*1.6+i*1.7)*.5,L=A*1.25;g.globalAlpha=fa*.22;g.fillStyle=i%2?'#ff3048':'#ffffff';g.beginPath();g.moveTo(bx,-20);g.lineTo(bx+Math.sin(sw-.12)*L,-20+Math.cos(sw-.12)*L);g.lineTo(bx+Math.sin(sw+.12)*L,-20+Math.cos(sw+.12)*L);g.closePath();g.fill()}g.restore();
  h.gs.forEach(q=>{const k=h.t-q.t0;if(k<.28){const u=k/.28;g.save();g.globalAlpha=.25+.45*u;g.fillStyle='#000';g.beginPath();g.ellipse(q.x,q.y+10,70*(.4+u*.6),24*(.4+u*.6),0,0,TAU);g.fill();g.restore()}})};
HZP.cjt1=h=>{const fa=h.t<3?Math.min(1,h.t/.3):Math.max(0,1-(h.t-3)/.6);
  // 관중 (아래쪽 실루엣 + 응원봉)
  g.save();g.globalAlpha=fa;for(let i=0;i<16;i++){const x=i*A/15,bob=Math.abs(Math.sin(h.t*7+i*.7))*10,y=A+8;g.fillStyle='#08040a';g.beginPath();g.arc(x,y-30-bob*.3,15,0,TAU);g.fill();g.fillRect(x-20,y-18-bob*.3,40,30);
    const hx=x+(i%2?12:-12),hy=y-58-bob;g.strokeStyle='#08040a';g.lineWidth=6;g.lineCap='round';g.beginPath();g.moveTo(x+(i%2?8:-8),y-20);g.lineTo(hx,hy);g.stroke();g.save();g.globalCompositeOperation='lighter';glow(i%3?'#ff3048':'#ffffff',hx,hy-8,16,.9);g.restore()}g.restore();
  // 티~원~! 응원 글자
  [.3,.95].forEach((t0,j)=>{const k=h.t-t0;if(k<0||k>.75)return;const s=k<.1?1.6-k*6:1,al=k>.55?1-(k-.55)/.2:1;g.save();g.translate(A/2,110+j*6);g.scale(s,s);g.globalAlpha=al*fa;const T='티~원~!';g.font='900 64px '+CJF;g.textAlign='center';g.textBaseline='middle';g.lineJoin='round';
    let x0=-g.measureText(T).width/2;for(const ch of T){const w=g.measureText(ch).width,yy=Math.sin(h.t*12+x0*.05)*8;g.lineWidth=12;g.strokeStyle='#14080a';g.strokeText(ch,x0+w/2,yy);g.fillStyle=ch=='~'?CJC:'#ffffff';g.fillText(ch,x0+w/2,yy);x0+=w}g.restore()});
  // 하늘에서 떨어지는 G
  h.gs.forEach(q=>{const k=h.t-q.t0;let y,s=1,al=1;if(k<.28){const u=k/.28;y=q.y-420*(1-u*u)}else{y=q.y;const kk=k-.28;s=1+Math.max(0,.08-kk*.3);al=Math.max(0,1-Math.max(0,kk-.6)/.4)}if(al<=0)return;
    g.save();g.translate(q.x,y-20);g.scale(s,s);g.globalAlpha=al*fa;g.font='900 150px '+CJF;g.textAlign='center';g.textBaseline='middle';g.lineJoin='round';g.lineWidth=16;g.strokeStyle='#100206';g.strokeText('G',0,0);
    const gr=g.createLinearGradient(0,-70,0,70);gr.addColorStop(0,'#ff8a96');gr.addColorStop(.45,CJC);gr.addColorStop(1,'#5a0a14');g.fillStyle=gr;g.fillText('G',0,0);g.lineWidth=3;g.strokeStyle='#ffd0d6';g.strokeText('G',-3,-3);g.restore()});
  // 줴줴이야~
  if(h.gg){const k=h.t-2.55,al=Math.min(1,k/.15)*Math.max(0,1-Math.max(0,k-.75)/.3),x=A/2+(1-Math.min(1,k/.25))*300;g.save();g.translate(x,A/2);g.rotate(-.06);g.globalAlpha=al;g.fillStyle='rgba(10,2,4,.85)';g.fillRect(-A,-46,A*2,92);g.strokeStyle=CJC;g.lineWidth=4;g.beginPath();g.moveTo(-A,-46);g.lineTo(A,-46);g.moveTo(-A,46);g.lineTo(A,46);g.stroke();
    const T='줴줴이야~';g.font='900 66px '+CJF;g.textAlign='center';g.textBaseline='middle';g.lineJoin='round';let x0=-g.measureText(T).width/2;for(const [i,ch] of [...T].entries()){const w=g.measureText(ch).width,yy=Math.sin(k*10+i*.9)*10;g.lineWidth=10;g.strokeStyle='#000';g.strokeText(ch,x0+w/2,yy);g.fillStyle=ch=='~'?CJC:'#ffffff';g.fillText(ch,x0+w/2,yy);x0+=w}g.restore()}};

// 밸런스
Object.assign(DMGK,{cjh:1.08});

// 아이콘 : 말풍선 + 물결
EMB.cjh=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*2.5)*.06);neon(D,1.8,()=>{g.beginPath();g.ellipse(0,-3,17,12,0,0,TAU);g.moveTo(-6,8);g.lineTo(-12,17);g.lineTo(0,9)});
  neon({col:D.col,hi:'#ffffff'},1.5,()=>{g.beginPath();g.moveTo(-10,-3);g.quadraticCurveTo(-6,-9,-2,-3);g.quadraticCurveTo(2,3,6,-3);g.quadraticCurveTo(9,-8,11,-4)});
  g.save();g.globalCompositeOperation='lighter';glow(D.col,0,0,16,.3);g.restore()};
document.querySelectorAll('#grid .tile').forEach(t=>{const i=+t.dataset.i,vc=DEF.filter(x=>x.vof===i).length;let em=t.querySelector('.vb');if(vc){if(!em){em=document.createElement('em');em.className='vb';t.appendChild(em)}em.textContent='+'+vc}});
Object.keys(ICC).forEach(k=>delete ICC[k]);mkDict();
;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ▶ 섹션 : extra20
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ===== extra20.js : 박지성 • AURA =====
// 패시브 아우라 파밍 : 때리면 +AURA · 맞으면 -AURA · 아우라 5단계 (평범 → AURA → SIGMA → PHANTOM → ABSOLUTE)
//   단계가 오를 때마다 색 · 모양이 바뀌고 피해 증가 · 스킬도 강화됨 (맞아서 아우라가 줄면 단계도 내려감)
// 1) 시그마 워크 : 흑백이 된 채 천천히 걸어가 스쳐 지나감 → 한 박자 늦게 베임
// 2) 뒤돌아보지 않는 폭발 : 상대에게 등을 돌리고 선글라스 · 뒤에서 폭발
// 3) ULT 앱솔루트 시네마 : 슬레이트 '딱!' → 흑백 필름 · 슬로모션으로 세 번 스침 → 정지 화면 + ABSOLUTE CINEMA → 한꺼번에 베임

const AUC='#9fc2ff',AUF='"Russo One","Black Han Sans",'+FB,AUS='"Cinzel","Noto Serif KR",serif';
const AUT=[{n:'평범',c:'#8a96b0',th:0,dm:0},{n:'AURA',c:'#7fb0ff',th:2000,dm:.06},{n:'SIGMA',c:'#b07bff',th:5000,dm:.12},{n:'PHANTOM',c:'#ff4060',th:9000,dm:.2},{n:'ABSOLUTE',c:'#fff0b8',th:14000,dm:.3}];
function auTier(f){const p=f.auP||0;let t=0;for(let i=0;i<AUT.length;i++)if(p>=AUT[i].th)t=i;return t}
const NEW30=['au_walk','au_flick','au_cut','au_turn','au_boom','au_gain','au_clap','au_film','au_cinema','au_lvup','au_glass','au_down'];
NEW30.forEach(n=>{if(!SND.includes(n))SND.push(n);if(!AUD[n])AUD[n]=new SoundPool('sounds/'+n+'.mp3',n=='au_gain'?4:3)});
Object.assign(SLB,{au_walk:'AURA · 시그마 워크',au_flick:'AURA · 스쳐 지나감',au_cut:'AURA · 늦게 베임',au_turn:'AURA · 등 돌리기',au_boom:'AURA · 뒤에서 폭발',au_gain:'AURA · 아우라 +',au_clap:'AURA · 슬레이트 딱',au_film:'AURA · 필름 돌아가는 소리',au_cinema:'AURA · 앱솔루트 시네마',au_lvup:'AURA · 단계 상승',au_glass:'AURA · 선글라스',au_down:'AURA · 단계 하락'});
const AUSK=[
  {n:'시그마 워크',w:.25,cd:8,c:(o,t)=>!t.hid&&!t.jump&&dist(o,t)<380,f:(o,t)=>auWalk(o,t)},
  {n:'뒤돌아보지 않는 폭발',w:.3,cd:9,c:(o,t)=>!t.hid&&dist(o,t)<520,f:(o,t)=>auTurn(o,t)},
  {n:'앱솔루트 시네마',w:.4,ult:1,c:(o,t)=>!t.hid,f:(o,t)=>auUlt(o,t)}];
const AUI=DEF.findIndex(d=>d.name=='박지성');
DEF.push({name:'박지성 • AURA',gl:'오',k:'aura',vof:AUI,r:27,sp:208,col:'#1c1d26',hi:'#cfe0ff',dk:'#000000',alt:{col:'#e8e8ee',hi:'#20222c',dk:'#9a9aa6'},alt2:{col:'#2a1040',hi:'#d8b0ff',dk:'#000000'},sk:AUSK});
INFO['박지성 • AURA']={st:[8,7,7,8,8,10],p:'아우라 파밍 · 때리면 +AURA, 맞으면 -AURA · 5단계 (2천 AURA · 5천 SIGMA · 9천 PHANTOM · 1만4천 ABSOLUTE) · 단계마다 색과 모양이 바뀌고 피해 +6/12/20/30% · SIGMA부터 워크 범위 증가 · PHANTOM부터 폭발 2번 · ABSOLUTE면 워크가 두 번 벰',
  sk:[['10','세상이 흑백이 된 채 천천히 걸어가 상대를 스쳐 지나감 · 한 박자 늦게 베임'],['11','상대에게 등을 돌리고 선글라스를 씀 · 표시된 자리에서 검은 폭발 (+1,000 AURA)'],['5×3+6','슬레이트 "딱!" · 화면이 흑백 필름이 되고 슬로모션으로 세 번 스쳐 지나감 · 정지 화면에 ABSOLUTE CINEMA · 그동안 벤 자국이 한꺼번에 터짐 (+2,500 AURA)']]};

// ---------- 아우라 숫자 · 단계 ----------
function auFmt(n){return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')}
function auTxt(x,y,txt,col,s){const w=txt.length*7*(s||1)+10;FX.push({k:'autx',x:clamp(x,w,A-w),y:clamp(y,40,A-20),txt,col,s:s||1,l:1.3,m:1.3})}
FXD.autx=x=>{const p=1-x.l/x.m,s=(p<.08?1.6-p*7.5:1)*x.s,al=p>.75?1-(p-.75)/.25:1;g.save();g.translate(x.x,x.y-p*40);g.scale(s,s);g.globalAlpha=al;g.font='400 22px '+AUF;g.textAlign='center';g.textBaseline='middle';g.lineJoin='round';g.lineWidth=6;g.strokeStyle='#000';g.strokeText(x.txt,0,0);g.fillStyle=x.col;g.fillText(x.txt,0,0);g.restore()};
function auAdd(f,n){f.auP=Math.max(0,(f.auP||0)+n)}
const _hurtAU=hurt;hurt=function(t,n,o){if(o&&o.d&&o.d.k=='aura'&&t!=o&&n>0&&!t.dead){const a=[...arguments];a[1]=Math.round(n*(1+AUT[auTier(o)].dm)*10)/10;const hp0=t.hp,r=_hurtAU.apply(this,a),d=Math.max(0,hp0-t.hp);
    if(d>0){const gain=Math.round(d*rnd(130,200)/10)*10;auAdd(o,gain);if(!(o.auTx>0)){o.auTx=.7;auTxt(o.x,o.y-o.r-30,'+'+auFmt(gain)+' AURA',AUT[auTier(o)].c,.8);if(!SKIP)SFXa('au_gain')}}return r}
  if(t&&t.d&&t.d.k=='aura'&&o&&o!=t&&n>0&&!t.dead){const hp0=t.hp,r=_hurtAU.apply(this,arguments),d=Math.max(0,hp0-t.hp);if(d>0){const loss=Math.round(d*110/10)*10;auAdd(t,-loss);if(!(t.auTl>0)){t.auTl=.5;auTxt(t.x,t.y+t.r+16,'-'+auFmt(loss)+' AURA','#ff5a6a',.65)}}return r}
  return _hurtAU.apply(this,arguments)};
const _updAU=update;update=function(dt){_updAU(dt);if(!F)return;F.forEach(f=>{if(f.auTx>0)f.auTx-=dt;if(f.auTl>0)f.auTl-=dt;if(f.d.k!='aura')return;f.auShow+=((f.auP||0)-f.auShow)*Math.min(1,dt*6);if(f.auUp>0)f.auUp-=dt;
  const t=auTier(f);if(f.auT==null)f.auT=t;if(t!=f.auT&&!f.dead){const up=t>f.auT;f.auT=t;if(up){f.auUp=1.2;if(!SKIP)SFXa('au_lvup');ring(f.x,f.y,f.r,f.r+150,AUT[t].c,10,.6);ring(f.x,f.y,f.r,f.r+90,'#ffffff',4,.5);if(typeof lkImp=='function')lkImp(f.x,f.y,110,AUT[t].c);shake=Math.max(shake,10);FX.push({k:'aulv',x:f.x,y:f.y,t,l:1.6,m:1.6})}else{if(!SKIP)SFXa('au_down');auTxt(f.x,f.y-f.r-30,'AURA DOWN · '+AUT[t].n,'#8a8a96',.8)}}})};
FXD.aulv=x=>{const p=1-x.l/x.m,T=AUT[x.t],s=p<.1?2-p*10:1,al=p>.7?1-(p-.7)/.3:1;g.save();g.translate(clamp(x.x,120,A-120),clamp(x.y-70,60,A-60));g.scale(s,s);g.globalAlpha=al;g.textAlign='center';g.textBaseline='middle';g.lineJoin='round';
  g.font='400 13px '+AUF;g.lineWidth=4;g.strokeStyle='#000';g.strokeText('AURA LV UP',0,-20);g.fillStyle='#ffffff';g.fillText('AURA LV UP',0,-20);g.font='400 34px '+AUF;g.lineWidth=8;g.strokeText(T.n,0,10);g.fillStyle=T.c;g.fillText(T.n,0,10);g.restore()};
const _initAU=init;init=function(){_initAU.apply(this,arguments);if(F)F.forEach(f=>{f.auP=0;f.auShow=0;f.auGl=0;f.auT=0;f.auUp=0})};
// 단계별 모습
const _lowAU=lowHP;lowHP=function(f){_lowAU(f);if(f.d.k!='aura'||f.dead||f.hid)return;const t=auTier(f),T=AUT[t],k=[.22,.5,.8,1,1.3][t];
  if(t>=4){g.save();g.translate(f.x,f.y);g.globalCompositeOperation='lighter';g.rotate(clock*.4);for(let i=0;i<12;i++){g.rotate(TAU/12);g.fillStyle='rgba(255,240,190,.12)';g.beginPath();g.moveTo(0,0);g.lineTo(f.r*3.2,-6);g.lineTo(f.r*3.2,6);g.fill()}g.restore()}
  if(t>=3&&typeof lkAura=='function')lkAura(f.x,f.y,f.r*1.08,'#300008',.8);
  if(typeof lkAura=='function')lkAura(f.x,f.y,f.r,T.c,k);
  if(t>=2){const n=t>=4?6:4;for(let i=0;i<n;i++){const a=clock*(1.6+t*.2)+i*TAU/n,R=f.r+16+Math.sin(clock*3+i)*3;g.save();g.translate(f.x+Math.cos(a)*R,f.y+Math.sin(a)*R*.8);g.rotate(a);g.globalCompositeOperation='lighter';glow(T.c,0,0,9,.7);g.fillStyle=t>=4?'#fff6d8':T.c;g.beginPath();g.moveTo(0,-6);g.lineTo(3,0);g.lineTo(0,6);g.lineTo(-3,0);g.closePath();g.fill();g.restore()}}
  if(t>=3&&Math.random()<.18&&typeof lkBolt=='function'){const a=rnd(0,TAU);lkBolt(f.x+Math.cos(a)*f.r,f.y+Math.sin(a)*f.r,f.x+Math.cos(a)*(f.r+30),f.y+Math.sin(a)*(f.r+30)-10,t>=4?'#fff0b8':'#ff2040',1.6)}
  if(t>=4){g.save();g.translate(f.x,f.y-f.r-12+Math.sin(clock*2)*2);g.globalCompositeOperation='lighter';g.strokeStyle='#fff3c8';g.lineWidth=3;g.beginPath();g.ellipse(0,0,f.r*.75,f.r*.22,0,0,TAU);g.stroke();glow('#ffe9a0',0,0,f.r*.9,.45);g.restore()}
  if(t>=1)auEyes(f,0,t>=3?.9:.45,t>=3?T.c:null);
  if(f.auUp>0){const u=1-f.auUp/1.2;g.save();g.translate(f.x,f.y);g.globalCompositeOperation='lighter';g.strokeStyle=T.c;g.globalAlpha=1-u;g.lineWidth=6*(1-u)+1;g.beginPath();g.arc(0,0,f.r+u*90,0,TAU);g.stroke();g.restore()}
  g.save();g.font='400 11px '+AUF;g.textAlign='center';g.lineJoin='round';g.lineWidth=4;g.strokeStyle='#000';const s=T.n+' · '+auFmt(f.auShow||0);g.strokeText(s,f.x,f.y+f.r+22);g.fillStyle=T.c;g.fillText(s,f.x,f.y+f.r+22);
  if(t<4){const nx=AUT[t+1].th,pv=T.th,u=clamp(((f.auShow||0)-pv)/(nx-pv),0,1);g.fillStyle='rgba(0,0,0,.6)';g.fillRect(f.x-22,f.y+f.r+27,44,3);g.fillStyle=T.c;g.fillRect(f.x-22,f.y+f.r+27,44*u,3)}g.restore();
  // 선글라스
  if(f.auGl>0){const u=Math.min(1,f.auGl),y=f.y-f.r*.15-(1-u)*40;g.save();g.globalAlpha=Math.min(1,u*2);g.translate(f.x,y);g.fillStyle='#050505';g.strokeStyle='#000';g.lineWidth=2;g.fillRect(-f.r*.85,-4,f.r*1.7,3);[-1,1].forEach(sd=>{g.beginPath();g.moveTo(sd*f.r*.1,-3);g.lineTo(sd*f.r*.8,-3);g.lineTo(sd*f.r*.72,f.r*.32);g.lineTo(sd*f.r*.2,f.r*.32);g.closePath();g.fill()});
    g.fillStyle='rgba(255,255,255,.55)';[-1,1].forEach(sd=>{g.fillRect(sd*f.r*.55-3,0,4,2)});g.restore()}};
const _updAUG=update;update=function(dt){_updAUG(dt);if(F)F.forEach(f=>{if(f.auGlT>0){f.auGlT-=dt;f.auGl=Math.min(1,(f.auGl||0)+dt*4)}else if(f.auGl>0)f.auGl=Math.max(0,f.auGl-dt*2)})};
// 화면 흑백 (지금까지 그린 것의 색을 뺌)
function auGray(a,x,y,R){if(a<=0)return;g.save();g.globalCompositeOperation='saturation';g.globalAlpha=Math.min(1,a);g.fillStyle='hsl(0,0%,50%)';if(R){g.beginPath();g.arc(x,y,R,0,TAU);g.fill()}else g.fillRect(-60,-60,A+120,A+120);g.restore()}

// ---------- 1) 시그마 워크 ----------
function auWalk(o,t){HZ.push({k:'auwk',o,tg:t,t:0,P:[]});SFXa('au_walk')}
HZX.auwk=(h,dt,EN)=>{const o=h.o;if(o.dead)return false;let e=h.tg;if(!e||e.dead){if(!h.pass)return false}o.gcd=Math.max(o.gcd,.3);o.cast=null;
  if(!h.pass){const a=ang(o,e);h.a=a;const d=dist(o,e),mv=Math.max(0,Math.min(d-o.r-e.r-12,115*dt));o.x+=Math.cos(a)*mv;o.y+=Math.sin(a)*mv;if(h.t<.9)e.slow=Math.max(e.slow,.6);h.P.push({x:o.x,y:o.y,t:h.t});h.P=h.P.filter(q=>h.t-q.t<.6);
    const TR=auTier(o),RR=TR>=2?250:190;h.RR=RR;EN.forEach(x=>{if(dist(o,x)<RR)x.slow=Math.max(x.slow,TR>=2?.5:.35)});
    if((d<o.r+e.r+18&&h.t>=.9)||h.t>=1.7){h.pass=1;h.pt=h.t;h.ex=e.x;h.ey=e.y;h.sx=o.x;h.sy=o.y;const nx=clamp(e.x+Math.cos(a)*(e.r+o.r+26),o.r,A-o.r),ny=clamp(e.y+Math.sin(a)*(e.r+o.r+26),o.r,A-o.r);o.x=nx;o.y=ny;SFXa('au_flick')}
    return true}
  if(!h.cut&&h.t>=h.pt+.32){h.cut=1;h.t4=auTier(o)>=4;SFXa('au_cut');if(e&&!e.dead&&!e.hid){hurt(e,10,o,e.x,e.y,0,1);e.slow=Math.max(e.slow,1);if(typeof lkImp=='function')lkImp(e.x,e.y,90,AUT[auTier(o)].c);shake=Math.max(shake,12);hs=.12}}
  if(h.t4&&!h.cut2&&h.t>=h.pt+.62){h.cut2=1;SFXa('au_cut');if(e&&!e.dead&&!e.hid){hurt(e,5,o,e.x,e.y,0,1);if(typeof lkImp=='function')lkImp(e.x,e.y,80,'#fff0b8')}}
  return h.t<h.pt+.9};
HZP.auwk=h=>{const o=h.o;if(o.dead)return;
  if(!h.pass){const u=Math.min(1,h.t/.25);h.P.forEach((q,i)=>{if(i%3)return;g.save();g.globalAlpha=.25*(1-(h.t-q.t)/.6);g.drawImage(ICON(o.d,52),q.x-o.r,q.y-o.r,o.r*2,o.r*2);g.restore()});
    const RR=h.RR||190;auGray(.9*u,o.x,o.y,RR+10);g.save();g.translate(o.x,o.y);g.globalCompositeOperation='lighter';g.strokeStyle='rgba(160,195,255,.35)';g.lineWidth=2;g.setLineDash([3,9]);g.beginPath();g.arc(0,0,RR,0,TAU);g.stroke();g.setLineDash([]);g.restore();
    if(typeof lkAura=='function')lkAura(o.x,o.y,o.r,AUC,1.1);auEyes(o,h.a||0,1);return}
  const q=h.t-h.pt;if(q<.32){auGray(.9,h.ex,h.ey,200);g.save();g.globalCompositeOperation='lighter';g.strokeStyle='#ffffff';g.lineWidth=2;g.globalAlpha=1;g.beginPath();g.moveTo(h.sx,h.sy);g.lineTo(o.x,o.y);g.stroke();g.restore();auEyes(o,h.a,1)}
  else{const k=(q-.32)/.5,al=Math.max(0,1-k);g.save();g.translate(h.ex,h.ey);g.rotate((h.a||0)+.6);g.globalCompositeOperation='lighter';g.globalAlpha=al;const L=110*(1+k*.3);g.fillStyle='#ffffff';g.beginPath();g.moveTo(-L,0);g.quadraticCurveTo(0,-7*(1-k),L,0);g.quadraticCurveTo(0,7*(1-k),-L,0);g.fill();glow(AUC,0,0,60,al*.7);g.restore()}};
function auEyes(o,a,al,col){col=col||AUC;g.save();g.translate(o.x,o.y-o.r*.18);g.globalCompositeOperation='lighter';g.globalAlpha=al;[-1,1].forEach(sd=>{const x=sd*o.r*.36;g.strokeStyle='#ffffff';g.lineWidth=2.5;g.lineCap='round';g.beginPath();g.moveTo(x-6,0);g.lineTo(x+6,-1);g.stroke();glow(col,x,0,12,.9);
  g.strokeStyle='rgba(160,195,255,.5)';g.lineWidth=1.5;g.beginPath();g.moveTo(x+sd*6,-1);g.lineTo(x+sd*28,-4+Math.sin(clock*8+sd)*2);g.stroke()});g.restore()}

// ---------- 2) 뒤돌아보지 않는 폭발 ----------
function auTurn(o,t){HZ.push({k:'autn',o,tg:t,t:0,x:t.x,y:t.y});o.auGlT=2;SFXa('au_turn')}
HZX.autn=(h,dt,EN)=>{const o=h.o;let e=h.tg;if(h.t<.82&&e&&!e.dead){h.x+=(e.x-h.x)*Math.min(1,dt*8);h.y+=(e.y-h.y)*Math.min(1,dt*8)}if(!o.dead&&h.t<1.05){o.gcd=Math.max(o.gcd,.3);const a=Math.atan2(o.y-h.y,o.x-h.x);o.dx=Math.cos(a);o.dy=Math.sin(a)}
  if(h.t>=.25&&!h.gl){h.gl=1;SFXa('au_glass')}
  if(h.t>=1.05&&!h.bm){h.bm=1;SFXa('au_boom');shake=Math.max(shake,22);hs=.1;FX.push({k:'crack',x:h.x,y:h.y,r:100,l:2.4,m:2.4});if(typeof lkImp=='function')lkImp(h.x,h.y,150,'#8a60ff');ring(h.x,h.y,10,170,'#ffffff',8,.5);ring(h.x,h.y,10,130,'#6a40d0',14,.55);
    for(let i=0;i<22;i++)rockP(h.x,h.y,rnd(0,TAU),rnd(100,300));for(let i=0;i<16;i++){const a=rnd(0,TAU),v=rnd(40,140);Pt.push({x:h.x,y:h.y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-30,l:1.4,m:1.4,sh:3,col:i%2?'#14101c':'#2a2040',r:rnd(18,30),gr:30,a0:.75,fr:.25})}
    let hit=0;EN.forEach(x=>{if(x.hid||x.jump)return;if(Math.hypot(x.x-h.x,x.y-h.y)<105+x.r){hurt(x,11,o,x.x,x.y,0,1);x.stn=Math.max(x.stn,.3);safePush(x,Math.atan2(x.y-h.y,x.x-h.x),50);hit=1}});
    if(!o.dead){auAdd(o,1000);auTxt(o.x,o.y-o.r-40,'+1,000 AURA','#ffffff',1.2)}h.t3=auTier(o)>=3}
  if(h.t3&&!h.bm2&&h.t>=1.4){h.bm2=1;SFXa('au_boom');shake=Math.max(shake,16);if(typeof lkImp=='function')lkImp(h.x,h.y,120,'#ff4060');ring(h.x,h.y,10,150,'#ff4060',10,.5);EN.forEach(x=>{if(x.hid||x.jump)return;if(Math.hypot(x.x-h.x,x.y-h.y)<120+x.r)hurt(x,5,o,x.x,x.y,0,1)})}
  return h.t<2.1};
HZD.autn=h=>{if(h.bm)return;const u=Math.min(1,h.t/1.05);g.save();g.translate(h.x,h.y);g.strokeStyle='rgba(180,150,255,'+(.4+.5*u)+')';g.lineWidth=3;g.setLineDash([10,8]);g.lineDashOffset=clock*60;g.beginPath();g.arc(0,0,95,0,TAU);g.stroke();g.setLineDash([]);
  g.rotate(clock*1.5);g.lineWidth=2;g.beginPath();for(let i=0;i<4;i++){const a=i*Math.PI/2;g.moveTo(Math.cos(a)*20,Math.sin(a)*20);g.lineTo(Math.cos(a)*(40+30*(1-u)),Math.sin(a)*(40+30*(1-u)))}g.stroke();g.fillStyle='rgba(120,80,220,'+(.15+.25*u)+')';g.beginPath();g.arc(0,0,95*u,0,TAU);g.fill();g.restore()};
HZP.autn=h=>{const o=h.o;if(!h.bm||h.t>1.9)return;const k=(h.t-1.05)/.85;g.save();g.translate(h.x,h.y);g.globalCompositeOperation='lighter';glow('#8a60ff',0,0,160*(1-k*.5),.8*(1-k));glow('#ffffff',0,0,60*(1-k),(1-k));g.restore();
  g.save();g.translate(h.x,h.y);g.globalAlpha=Math.max(0,1-k)*.8;g.fillStyle='#0a0810';for(let i=0;i<9;i++){const a=i*TAU/9+h.t,r=60+k*70;g.beginPath();g.arc(Math.cos(a)*r*.6,Math.sin(a)*r*.6-k*30,26+k*24,0,TAU);g.fill()}g.restore()};

// ---------- 3) ULT 앱솔루트 시네마 ----------
// 0.0 슬레이트 '딱!' → 0.55~2.0 흑백 필름 · 슬로모션으로 세 번 스쳐 지나감 (벤 자국만 남음)
// → 2.05 정지 화면 · ABSOLUTE CINEMA + 두 손 → 2.7 벤 자국이 한꺼번에 터짐
function auUlt(o,t){if(!t||t.dead)t=tgt(o);if(!t)return;HZ.push({k:'auul',o,tg:t,t:0,n:0,cuts:[],lines:[],gr:Array.from({length:70},()=>[rnd(0,A),rnd(0,A),rnd(1,3)])});SFXa('au_clap')}
HZX.auul=(h,dt,EN)=>{const o=h.o;if(o.dead)return false;let e=h.tg;if(!e||e.dead){e=tgt(o);h.tg=e}o.gcd=Math.max(o.gcd,.4);o.cast=null;
  EN.forEach(x=>{x.slow=Math.max(x.slow,.6);if(h.t>.5&&h.t<2.75){x.stn=Math.max(x.stn,.15);x.cast=null}});
  if(h.t>=.5&&!h.fm){h.fm=1;SFXa('au_film')}
  const P=[.75,1.2,1.65];if(h.n<3&&h.t>=P[h.n]&&e&&!e.dead){h.n++;const a=Math.atan2(e.y-o.y,e.x-o.x)+(h.n==2?.9:h.n==3?-.9:0),sx=o.x,sy=o.y;const nx=clamp(e.x+Math.cos(a)*(e.r+o.r+40),o.r,A-o.r),ny=clamp(e.y+Math.sin(a)*(e.r+o.r+40),o.r,A-o.r);o.x=nx;o.y=ny;
    h.lines.push({x1:sx,y1:sy,x2:nx,y2:ny,t:h.t});h.cuts.push({e,a:Math.atan2(ny-sy,nx-sx),t:h.t});SFXa('au_flick')}
  if(h.t>=2.05&&!h.fz){h.fz=1;SFXa('au_cinema');shake=Math.max(shake,6)}
  if(h.t>=2.75&&!h.bm){h.bm=1;SFXa('au_cut');shake=Math.max(shake,26);hs=.16;FX.push({k:'frost',l:.12,m:.12,c:'#ffffff'});
    h.cuts.forEach((c,i)=>{const x=c.e;if(x&&!x.dead&&!x.hid){hurt(x,5,o,x.x,x.y,0,1);if(typeof lkImp=='function')lkImp(x.x+rnd(-8,8),x.y+rnd(-8,8),110+i*20,'#ffffff')}});
    if(e&&!e.dead&&!e.hid){hurt(e,6,o,e.x,e.y,0,1);ring(e.x,e.y,10,170,'#ffffff',10,.6);e.stn=Math.max(e.stn,.5)}auAdd(o,2500);auTxt(o.x,o.y-o.r-44,'+2,500 AURA','#ffffff',1.3)}
  return h.t<3.5};
function auHand(x,y,s,sd,al){g.save();g.translate(x,y);g.scale(s*sd,s);g.rotate(-.18);g.globalAlpha=al;g.fillStyle='#e8e8e8';g.strokeStyle='#0a0a0a';g.lineWidth=3/s;g.lineJoin='round';
  g.beginPath();g.moveTo(-24,60);g.lineTo(-26,4);g.quadraticCurveTo(-26,-6,-18,-8);g.lineTo(22,-8);g.quadraticCurveTo(30,-6,30,6);g.lineTo(26,60);g.closePath();g.fill();g.stroke();
  [[-20,-8,-66],[-7,-8,-80],[6,-8,-76],[18,-6,-58]].forEach(([fx,fy,ty])=>{g.beginPath();g.moveTo(fx-5.5,fy);g.lineTo(fx-5,ty+6);g.quadraticCurveTo(fx,ty-2,fx+5,ty+6);g.lineTo(fx+5.5,fy);g.closePath();g.fill();g.stroke()});
  g.beginPath();g.moveTo(-25,22);g.quadraticCurveTo(-46,8,-50,-14);g.quadraticCurveTo(-46,-20,-40,-14);g.quadraticCurveTo(-34,2,-22,6);g.closePath();g.fill();g.stroke();
  g.strokeStyle='rgba(0,0,0,.35)';g.lineWidth=1.5/s;g.beginPath();g.moveTo(-14,20);g.quadraticCurveTo(0,32,18,22);g.moveTo(-8,40);g.quadraticCurveTo(4,44,16,38);g.stroke();g.restore()}
HZD.auul=h=>{};
HZP.auul=h=>{const o=h.o,t=h.t,fa=t<3.1?1:Math.max(0,1-(t-3.1)/.4),bw=t<.45?0:Math.min(1,(t-.45)/.15)*fa;
  // 흑백 필름
  if(bw>0){auGray(bw);g.save();g.globalAlpha=bw*.35;g.fillStyle='#000';g.fillRect(-60,-60,A+120,A+120);g.restore();
    g.save();g.globalAlpha=bw*.5;h.gr.forEach(p=>{if(Math.random()<.5){g.fillStyle=Math.random()<.5?'#fff':'#000';g.fillRect((p[0]+rnd(-80,80)+A)%A,(p[1]+rnd(-80,80)+A)%A,p[2],p[2])}});if(Math.random()<.3){g.fillStyle='rgba(255,255,255,.25)';g.fillRect(rnd(0,A),0,1.5,A)}g.restore();
    const vg=g.createRadialGradient(A/2,A/2,A*.3,A/2,A/2,A*.75);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,'+(.75*bw)+')');g.fillStyle=vg;g.fillRect(-60,-60,A+120,A+120);
    // 필름 띠 (양옆 구멍)
    g.save();g.globalAlpha=bw;g.fillStyle='#050505';g.fillRect(-60,-60,84,A+120);g.fillRect(A-24,-60,84,A+120);g.fillStyle='#d8d8d8';const off=(t*260)%40;for(let y=-40+off;y<A+40;y+=40){g.fillRect(4,y,12,20);g.fillRect(A-16,y,12,20)}g.restore()}
  // 슬로모션 중 : 지나간 길 (흰 선)
  h.lines.forEach(L=>{const k=t-L.t;if(k>1.6&&!h.fz)return;const al=h.bm?Math.max(0,1-(t-2.75)/.3):Math.min(1,k/.05);g.save();g.globalAlpha=al;g.strokeStyle='#ffffff';g.lineWidth=2.5;g.lineCap='round';g.beginPath();g.moveTo(L.x1,L.y1);g.lineTo(L.x2,L.y2);g.stroke();g.restore()});
  // 상대에게 남은 벤 자국
  if(!h.bm)h.cuts.forEach(c=>{const x=c.e;if(!x||x.dead)return;g.save();g.translate(x.x,x.y);g.rotate(c.a);g.strokeStyle='#ffffff';g.lineWidth=3;g.globalAlpha=.6+.4*Math.sin(t*20);g.beginPath();g.moveTo(-x.r-8,0);g.lineTo(x.r+8,0);g.stroke();g.restore()});
  if(h.bm&&t<3.05){const k=(t-2.75)/.3;h.cuts.forEach(c=>{const x=c.e;if(!x)return;g.save();g.translate(x.x,x.y);g.rotate(c.a);g.globalCompositeOperation='lighter';g.globalAlpha=1-k;g.fillStyle='#ffffff';const L=120*(1+k*.5);g.beginPath();g.moveTo(-L,0);g.quadraticCurveTo(0,-9*(1-k),L,0);g.quadraticCurveTo(0,9*(1-k),-L,0);g.fill();g.restore()})}
  if(t>.4&&!o.dead)auEyes(o,0,fa,'#ffffff');
  // 정지 화면 : ABSOLUTE CINEMA + 두 손
  if(h.fz&&t<3.3){const k=t-2.05,u=Math.min(1,k/.35),al=t>2.95?Math.max(0,1-(t-2.95)/.35):1;
    const hy=A+30-u*170;auHand(A*.2,hy,1.55,-1,al);auHand(A*.8,hy,1.55,1,al);
    g.save();g.globalAlpha=al*Math.min(1,k/.25);g.textAlign='center';g.textBaseline='middle';g.font='700 46px '+AUS;g.lineJoin='round';g.lineWidth=7;g.strokeStyle='#000';
    g.strokeText('ABSOLUTE',A/2,A*.32);g.fillStyle='#ffffff';g.fillText('ABSOLUTE',A/2,A*.32);g.strokeText('CINEMA',A/2,A*.32+54);g.fillText('CINEMA',A/2,A*.32+54);g.restore()}
  // 슬레이트 (딱!)
  if(t<.75){const u=Math.min(1,t/.15),cl=t<.45?(1-Math.min(1,t/.45))*.6:0,al=t>.55?1-(t-.55)/.2:1;g.save();g.translate(A/2,A*.3+(1-u)*-80);g.globalAlpha=al;g.scale(1.3,1.3);
    g.fillStyle='#141414';g.strokeStyle='#e8e8e8';g.lineWidth=2;g.fillRect(-70,-10,140,70);g.strokeRect(-70,-10,140,70);g.fillStyle='#e8e8e8';g.font='700 11px '+AUS;g.textAlign='left';g.fillText('SCENE  AURA',-62,12);g.fillText('TAKE   1',-62,30);g.fillText('ROLL   ∞',-62,48);
    g.save();g.translate(-70,-10);g.rotate(-cl);g.fillStyle='#141414';g.fillRect(0,-16,140,16);g.strokeRect(0,-16,140,16);g.fillStyle='#e8e8e8';for(let i=0;i<7;i++){g.beginPath();g.moveTo(8+i*20,-16);g.lineTo(18+i*20,-16);g.lineTo(10+i*20,0);g.lineTo(0+i*20,0);g.closePath();g.fill()}g.restore();g.restore()}};

// ---------- 밸런스 ----------
Object.assign(DMGK,{aura:1.03});

// ---------- 아이콘 ----------
EMB.aura=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*2)*.04);neon({col:AUC,hi:'#ffffff'},1.6,()=>{g.beginPath();g.moveTo(-15,-3);g.lineTo(-4,-5);g.moveTo(4,-5);g.lineTo(15,-3)});
  neon({col:AUC,hi:'#e8f0ff'},1.2,()=>{g.beginPath();for(let i=0;i<5;i++){const x=-12+i*6;g.moveTo(x,16);g.quadraticCurveTo(x-3,8,x+1,1+Math.sin(clock*4+i)*2)}});
  g.save();g.globalCompositeOperation='lighter';glow(AUC,-9,-4,7,.8);glow(AUC,9,-4,7,.8);g.restore()};
document.querySelectorAll('#grid .tile').forEach(t=>{const i=+t.dataset.i,vc=DEF.filter(x=>x.vof===i).length;let em=t.querySelector('.vb');if(vc){if(!em){em=document.createElement('em');em.className='vb';t.appendChild(em)}em.textContent='+'+vc}});
Object.keys(ICC).forEach(k=>delete ICC[k]);mkDict();
;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ▶ 섹션 : extra22
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ===== extra22.js : 김티비 • 덕질 · 흉악범 • 조커 =====

// ======================================================================
// 김티비 • 덕질 (가챠 · 피규어 덕후)
// 패시브 천장 : 뽑을 때마다 천장 +1 · 40이면 SSR 확정 · 체력 40% 아래로 처음 내려가면 현질 (천장 +15)
// 1) 캡슐 뽑기 : 캡슐을 던짐 → 등급에 따라 피규어가 나옴 (R 아크릴 스탠드 · SR SD 피규어 · SSR 1/7 스케일 피규어)
// 2) 10연차 : 별똥별 10개가 떨어짐 · 떨어지기 직전에 색이 바뀌며 등급 공개 · 끝나면 결과 화면
// 3) ULT 한정판 진열장 : 픽업 배너 → 뽑기 → 금색 별똥별 → 상대를 유리 진열장에 가둠 → 사진 3장 찰칵 → 진열장 박살
// ======================================================================
const OTF='"Russo One","Black Han Sans",'+FB;
const OTR=[{n:'R',s:3,c:'#4aa8ff',d:'#0b2a55'},{n:'SR',s:4,c:'#b46bff',d:'#2a0d55'},{n:'SSR',s:5,c:'#ffc23a',d:'#4a2c00'}];
const OTPITY=40;
const NEW31=['ot_cap','ot_pop','ot_fig','ot_shard','ot_hop','ot_aim','ot_snipe','ot_meteor','ot_r','ot_sr','ot_ssr','ot_result','ot_banner','ot_tap','ot_case','ot_shutter','ot_crack','ot_shatter','ot_pay'];
NEW31.forEach(n=>{if(!SND.includes(n))SND.push(n);if(!AUD[n])AUD[n]=new SoundPool('sounds/'+n+'.mp3',['ot_r','ot_sr','ot_shard','ot_meteor','ot_hop'].includes(n)?6:3)});
Object.assign(SLB,{ot_cap:'덕질 · 캡슐 던지기',ot_pop:'덕질 · 캡슐 열림',ot_fig:'덕질 · 피규어 등장',ot_shard:'덕질 · 아크릴 조각 발사',ot_hop:'덕질 · SD 피규어 점프',ot_aim:'덕질 · 스케일 피규어 조준',ot_snipe:'덕질 · 스케일 피규어 저격',ot_meteor:'덕질 · 별똥별',ot_r:'덕질 · R 등급 (파랑)',ot_sr:'덕질 · SR 등급 (보라)',ot_ssr:'덕질 · SSR 등급 (금색)',ot_result:'덕질 · 10연차 결과',ot_banner:'덕질 · 픽업 배너',ot_tap:'덕질 · 뽑기 버튼',ot_case:'덕질 · 진열장 쾅',ot_shutter:'덕질 · 사진 찰칵',ot_crack:'덕질 · 유리 금감',ot_shatter:'덕질 · 진열장 박살',ot_pay:'덕질 · 현질 결제'});
const OTSK=[
  {n:'캡슐 뽑기',w:.25,cd:8,c:(o,t)=>!t.hid&&dist(o,t)<520,f:(o,t)=>otCap(o,t)},
  {n:'10연차',w:.3,cd:11,c:(o,t)=>!t.hid&&dist(o,t)<560,f:(o,t)=>otTen(o,t)},
  {n:'한정판 진열장',w:.4,ult:1,c:(o,t)=>!t.hid,f:(o,t)=>otUlt(o,t)}];
const OTI=DEF.findIndex(d=>d.name=='김티비');
DEF.push({name:'김티비 • 덕질',gl:'덕',k:'otaku',vof:OTI,r:26,sp:208,col:'#9a5cff',hi:'#ffe29a',dk:'#160a33',alt:{col:'#3fb6ff',hi:'#e8f6ff',dk:'#06243a'},alt2:{col:'#ff8a3c',hi:'#fff1d6',dk:'#3a1a04'},sk:OTSK});
INFO['김티비 • 덕질']={st:[7,7,7,8,7,10],p:'천장 · 뽑을 때마다 천장 +1 (R 74% · SR 22% · SSR 4%) · 26부터 SSR 확률 상승 · 40이면 SSR 확정 · 10번째마다 SR 이상 · 체력이 처음 40% 아래로 내려가면 현질해서 천장 +15',
  sk:[['R 1.1×9 · SR 3×4 · SSR 3+7×2','캡슐을 던져 1번 뽑음 · R 아크릴 스탠드는 아크릴 조각을 쏘고 · SR SD 피규어는 콩콩 뛰어가 내려찍고 · SSR 1/7 스케일 피규어는 조준해서 관통 저격'],['R .8 · SR 1.8 · SSR 5 (×10)','10연차 · 별똥별 10개가 하얗게 떨어지다가 닿기 직전에 등급 색으로 바뀜 · 금색이면 빛기둥 · 끝나면 10연차 결과 화면'],['3+3×3+9','한정 픽업 배너에서 뽑기 → 금색 별똥별이 상대에게 떨어져 유리 진열장에 가둠 (회전 받침대) · 사진 3장 찰칵 찰칵 찰칵 · 진열장이 박살나며 SOLD OUT']]};

function otRoll(o){o.otP=(o.otP||0)+1;o.ot10=(o.ot10||0)+1;let r=0;
  if(o.otP>=OTPITY)r=2;else{const p5=.04+Math.max(0,o.otP-26)*.07;if(Math.random()<p5)r=2;else if(o.ot10>=10||Math.random()<.22)r=1}
  if(r>=1)o.ot10=0;if(r==2){if(o.otP>=OTPITY&&!SKIP)auTxt(o.x,o.y-o.r-46,'천장 도달 · SSR 확정',OTR[2].c,.85);o.otP=0}return r}
// 공통 : 별 · 캡슐 · 피규어 그림
function otStar(x,y,R,col,al){g.save();g.translate(x,y);g.globalAlpha=al==null?1:al;g.fillStyle=col;g.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2?R*.45:R;g.lineTo(Math.cos(a)*rr,Math.sin(a)*rr)}g.closePath();g.fill();g.restore()}
function otStars(x,y,n,R,col,al){for(let i=0;i<n;i++)otStar(x+(i-(n-1)/2)*R*2.1,y,R,col,al)}
function otCapsule(x,y,R,col,open,rot,al){g.save();g.translate(x,y);g.rotate(rot||0);g.globalAlpha=al==null?1:al;const op=open||0;
  // 아래 반쪽 (흰 플라스틱)
  g.save();g.translate(0,op*R*1.1);g.rotate(op*.6);const gb=g.createLinearGradient(-R,0,R,R);gb.addColorStop(0,'#f4f4fa');gb.addColorStop(1,'#8a8aa0');g.fillStyle=gb;g.beginPath();g.arc(0,0,R,0,Math.PI);g.closePath();g.fill();g.strokeStyle='#14101e';g.lineWidth=2;g.stroke();g.restore();
  // 위 반쪽 (투명한 색 플라스틱)
  g.save();g.translate(0,-op*R*1.1);g.rotate(-op*.8);const gt=g.createLinearGradient(-R,-R,R,0);gt.addColorStop(0,col);gt.addColorStop(1,'#14101e');g.globalAlpha*=.92;g.fillStyle=gt;g.beginPath();g.arc(0,0,R,Math.PI,TAU);g.closePath();g.fill();g.strokeStyle='#14101e';g.lineWidth=2;g.stroke();
  g.fillStyle='rgba(255,255,255,.55)';g.beginPath();g.ellipse(-R*.38,-R*.55,R*.28,R*.12,-.5,0,TAU);g.fill();g.restore();
  if(op<.05){g.fillStyle='#14101e';g.fillRect(-R,-1.5,R*2,3)}g.restore()}
function otSc(x,y,s,fn){g.save();g.translate(x,y);g.scale(s,s);g.translate(-x,-y);fn();g.restore()}
function otBase(x,y,w,col){g.save();g.fillStyle='rgba(0,0,0,.45)';g.beginPath();g.ellipse(x,y+3,w*1.1,w*.34,0,0,TAU);g.fill();const gr=g.createLinearGradient(x-w,0,x+w,0);gr.addColorStop(0,'#05040a');gr.addColorStop(.5,'#2a2440');gr.addColorStop(1,'#05040a');g.fillStyle=gr;g.fillRect(x-w,y-4,w*2,6);g.beginPath();g.ellipse(x,y+2,w,w*.3,0,0,TAU);g.fill();
  g.beginPath();g.ellipse(x,y-4,w,w*.3,0,0,TAU);g.fillStyle='#1a1530';g.fill();g.strokeStyle=col;g.lineWidth=2;g.stroke();g.restore()}
// 머리카락 달린 작은 얼굴 (피규어 공통)
function otHead(R,hair,col,eye){g.fillStyle='#ffe6d6';g.beginPath();g.arc(0,0,R,0,TAU);g.fill();g.fillStyle=hair;g.beginPath();g.arc(0,-R*.15,R*1.08,Math.PI*1.02,TAU*.99);g.lineTo(R*1.05,R*.5);g.lineTo(R*.7,-R*.1);g.lineTo(R*.35,R*.2);g.lineTo(0,-R*.2);g.lineTo(-R*.35,R*.2);g.lineTo(-R*.7,-R*.1);g.lineTo(-R*1.05,R*.5);g.closePath();g.fill();
  [-1,1].forEach(sd=>{g.fillStyle='#14101e';g.beginPath();g.ellipse(sd*R*.4,R*.28,R*.17,R*.25,0,0,TAU);g.fill();g.fillStyle=eye||col;g.beginPath();g.ellipse(sd*R*.4,R*.33,R*.12,R*.16,0,0,TAU);g.fill();g.fillStyle='#ffffff';g.beginPath();g.arc(sd*R*.36,R*.2,R*.07,0,TAU);g.fill()})}
// R : 아크릴 스탠드
function otAcryl(x,y,col,al,sh){g.save();g.globalAlpha=al;otBase(x,y,18,col);g.translate(x,y-4);g.rotate(sh||0);
  g.fillStyle='rgba(200,225,255,.13)';g.strokeStyle='rgba(220,240,255,.75)';g.lineWidth=1.5;g.beginPath();g.moveTo(-15,0);g.lineTo(-15,-50);g.quadraticCurveTo(-15,-56,-9,-56);g.lineTo(9,-56);g.quadraticCurveTo(15,-56,15,-50);g.lineTo(15,0);g.closePath();g.fill();g.stroke();
  g.save();g.translate(0,-36);otHead(9,'#2a1d4a',col);g.restore();g.fillStyle=col;g.beginPath();g.moveTo(-8,-26);g.lineTo(8,-26);g.lineTo(11,-4);g.lineTo(-11,-4);g.closePath();g.fill();
  g.globalCompositeOperation='lighter';g.strokeStyle='rgba(255,255,255,.5)';g.lineWidth=2;g.beginPath();g.moveTo(-10,-10);g.lineTo(6,-52);g.stroke();g.restore()}
// SR : SD 피규어 (머리 큰 2등신)
function otSD(x,y,z,sq,col,al,face){g.save();g.globalAlpha=al;otBase(x,y,17,col);g.translate(x,y-4-z);g.scale(1+sq*.25,1-sq*.25);
  g.fillStyle='#2a1d4a';g.beginPath();g.ellipse(-5,-3,3.5,5,0,0,TAU);g.ellipse(5,-3,3.5,5,0,0,TAU);g.fill();
  g.fillStyle=col;g.beginPath();g.moveTo(-9,-20);g.lineTo(9,-20);g.lineTo(12,-6);g.lineTo(-12,-6);g.closePath();g.fill();g.fillStyle='#ffffff';g.fillRect(-2,-20,4,8);
  g.save();g.translate(0,-36);g.scale(face||1,1);otHead(16,'#3a2a60',col);g.fillStyle='#ff9ab0';g.globalAlpha*=.6;g.beginPath();g.ellipse(-9,9,3,1.6,0,0,TAU);g.ellipse(9,9,3,1.6,0,0,TAU);g.fill();g.restore();g.restore()}
// SSR : 1/7 스케일 피규어 (긴 총을 든 저격수)
function otScale(x,y,a,col,al,recoil){g.save();g.globalAlpha=al;otBase(x,y,26,col);
  g.save();g.globalCompositeOperation='lighter';glow(col,x,y-40,44,.25);g.restore();g.translate(x,y-4);const fc=Math.cos(a)<0?-1:1;g.scale(fc,1);
  // 다리 · 부츠
  g.strokeStyle='#14101e';g.lineWidth=5;g.lineCap='round';g.beginPath();g.moveTo(-4,-30);g.lineTo(-7,-2);g.moveTo(4,-30);g.lineTo(8,-2);g.stroke();g.fillStyle='#14101e';g.fillRect(-11,-6,7,6);g.fillRect(5,-6,7,6);
  // 코트 (나풀거림)
  const fl=Math.sin(clock*3)*3;g.fillStyle='#1c1430';g.beginPath();g.moveTo(-8,-58);g.lineTo(8,-58);g.lineTo(14+fl,-24);g.lineTo(-14+fl*.5,-22);g.closePath();g.fill();g.strokeStyle=col;g.lineWidth=1.5;g.stroke();
  g.fillStyle=col;g.fillRect(-7,-56,14,4);g.fillRect(-7,-40,14,3);
  // 긴 머리
  g.fillStyle='#e8e4f8';g.beginPath();g.moveTo(-9,-76);g.quadraticCurveTo(-20+fl,-50,-14+fl,-28);g.lineTo(-6,-48);g.closePath();g.fill();
  g.save();g.translate(0,-70);otHead(10,'#e8e4f8',col,'#ff4a6a');g.restore();
  // 총
  const la=fc>0?a:Math.PI-a;g.save();g.translate(4-recoil*4,-50);g.rotate(clamp(la,-1.2,1.2));g.fillStyle='#0c0a14';g.fillRect(-10,-3,58,6);g.fillRect(40,-2,22,3);g.fillStyle='#2a2440';g.fillRect(4,-8,16,5);g.fillStyle=col;g.fillRect(-10,-3,6,6);g.restore();
  g.fillStyle='#ffe6d6';g.beginPath();g.arc(8,-48,3,0,TAU);g.fill();g.restore();
  // 이름표
  g.save();g.globalAlpha=al;g.fillStyle='#0a0814';g.fillRect(x-22,y+4,44,10);g.strokeStyle=col;g.lineWidth=1;g.strokeRect(x-22,y+4,44,10);g.fillStyle=col;g.font='700 7px '+OTF;g.textAlign='center';g.textBaseline='middle';g.fillText('1/7 SCALE',x,y+9.5);g.restore()}

// 패시브 : 천장 표시 · 현질
const _lowOT=lowHP;lowHP=function(f){_lowOT(f);if(f.d.k!='otaku'||f.dead||f.hid)return;const p=f.otP||0,hot=p>=30;
  if(hot){g.save();g.globalCompositeOperation='lighter';glow(OTR[2].c,f.x,f.y,f.r*2.2,.22+.12*Math.sin(clock*6));g.restore();if(Math.random()<.2)sparkP(f.x+rnd(-f.r,f.r),f.y+rnd(-f.r,f.r),0,-40,OTR[2].c,2)}
  g.save();g.font='400 10px '+OTF;g.textAlign='center';g.lineJoin='round';g.lineWidth=4;g.strokeStyle='#000';const s='천장 '+p+'/'+OTPITY;g.strokeText(s,f.x,f.y+f.r+21);g.fillStyle=hot?OTR[2].c:'#cdb8ff';g.fillText(s,f.x,f.y+f.r+21);
  g.fillStyle='rgba(0,0,0,.6)';g.fillRect(f.x-22,f.y+f.r+26,44,3);g.fillStyle=hot?OTR[2].c:OTR[1].c;g.fillRect(f.x-22,f.y+f.r+26,44*p/OTPITY,3);g.restore();
  if(f.otPayT>0){const u=1-f.otPayT/1.4,al=u>.8?1-(u-.8)/.2:1;g.save();g.globalAlpha=al;g.translate(f.x+(u<.3?(-60+u/.3*60):0),f.y-f.r-34);g.rotate(-.12);
    const cg=g.createLinearGradient(-22,-14,22,14);cg.addColorStop(0,'#2a2440');cg.addColorStop(1,'#0a0814');g.fillStyle=cg;g.fillRect(-22,-14,44,28);g.strokeStyle=OTR[2].c;g.lineWidth=1.5;g.strokeRect(-22,-14,44,28);g.fillStyle=OTR[2].c;g.fillRect(-16,-6,10,7);
    g.fillStyle='#ffffff';g.font='700 6px '+OTF;g.textAlign='left';g.fillText('**** 0707',-16,9);g.restore();
    if(u>.3){g.save();g.globalAlpha=al;g.font='400 13px '+OTF;g.textAlign='center';g.lineWidth=4;g.strokeStyle='#000';g.strokeText('결제 완료 · 천장 +15',f.x,f.y-f.r-58);g.fillStyle=OTR[2].c;g.fillText('결제 완료 · 천장 +15',f.x,f.y-f.r-58);g.restore()}}};
const _updOT=update;update=function(dt){_updOT(dt);if(F)F.forEach(f=>{if(f.otPayT>0)f.otPayT-=dt;if(f.d.k=='otaku'&&!f.dead&&!f.otPay&&f.hp<=40&&phase=='play'){f.otPay=1;f.otP=Math.min(OTPITY-1,(f.otP||0)+15);f.otPayT=1.4;if(!SKIP)SFXa('ot_pay')}})};
const _initOT=init;init=function(){_initOT.apply(this,arguments);if(F)F.forEach(f=>{f.otP=0;f.ot10=0;f.otPay=0;f.otPayT=0})};

// ---------- 1) 캡슐 뽑기 ----------
function otCap(o,t){const r=otRoll(o),a=ang(o,t),d=dist(o,t),L=clamp(d-95,60,260),tx=clamp(o.x+Math.cos(a)*L+rnd(-30,30),40,A-40),ty=clamp(o.y+Math.sin(a)*L+rnd(-30,30),50,A-30);
  HZ.push({k:'otcap',o,tg:t,t:0,r,x0:o.x,y0:o.y,x:tx,y:ty,tp:r==2?1.1:.85,sh:[],nv:0,fx:tx,fy:ty,z:0,hop:null,nh:0,aim:a,lk:0,fire:0,beam:null,rc:0});SFXa('ot_cap')}
const OTLIFE=[3.5,4.1,3.5];
HZX.otcap=(h,dt,EN)=>{const o=h.o;let e=h.tg;if(!e||e.dead){e=tgt(o);h.tg=e}const t=h.t,C=OTR[h.r];
  if(t>=.45&&!h.land){h.land=1;SFXa('ot_fig')}
  if(t>=h.tp&&!h.pop){h.pop=1;SFXa('ot_pop');SFXa(['ot_r','ot_sr','ot_ssr'][h.r]);ring(h.x,h.y,6,h.r==2?150:90,C.c,h.r==2?9:5,.5);for(let i=0;i<(h.r==2?26:12);i++)sparkP(h.x,h.y,rnd(-220,220),rnd(-260,60),C.c,rnd(2,4));
    if(h.r==2){shake=Math.max(shake,10);if(typeof lkImp=='function')lkImp(h.x,h.y-20,110,C.c);EN.forEach(x=>{if(!x.hid&&!x.jump&&Math.hypot(x.x-h.x,x.y-h.y)<75+x.r)hurt(x,3,o,x.x,x.y,0,0)})}
    if(!SKIP)auTxt(h.x,h.y-70,C.n,C.c,h.r==2?1.1:.75)}
  if(!h.pop)return true;const q=t-h.tp,L=OTLIFE[h.r];if(o.dead)return q<.3&&h.sh.length>0;
  if(h.r==0&&q<L){const V=[.45,1.6,2.75];if(h.nv<3&&q>=V[h.nv]&&e&&!e.hid){h.nv++;const a=Math.atan2(e.y-(h.y-40),e.x-h.x);for(let i=-1;i<=1;i++)h.sh.push({x:h.x,y:h.y-40,a:a+i*.14,t:0});SFXa('ot_shard')}}
  if(h.r==1&&q<L&&e){if(!h.hop&&q>=.35+h.nh*.92&&h.nh<4&&!e.hid){const a=Math.atan2(e.y-h.fy,e.x-h.fx),dd=Math.min(150,Math.hypot(e.x-h.fx,e.y-h.fy));h.hop={t:0,sx:h.fx,sy:h.fy,ex:clamp(h.fx+Math.cos(a)*dd,20,A-20),ey:clamp(h.fy+Math.sin(a)*dd,30,A-10)};h.nh++;SFXa('ot_hop')}
    if(h.hop){const p=h.hop;p.t+=dt;const u=Math.min(1,p.t/.45);h.fx=p.sx+(p.ex-p.sx)*u;h.fy=p.sy+(p.ey-p.sy)*u;h.z=Math.sin(Math.PI*u)*55;
      if(u>=1){h.hop=null;h.z=0;h.sq=1;ring(h.fx,h.fy,6,60,C.c,5,.35);shake=Math.max(shake,5);EN.forEach(x=>{if(!x.hid&&!x.jump&&Math.hypot(x.x-h.fx,x.y-h.fy)<52+x.r){hurt(x,3,o,x.x,x.y,0,0);safePush(x,Math.atan2(x.y-h.fy,x.x-h.fx),26)}})}}}
  if(h.sq>0)h.sq=Math.max(0,h.sq-dt*5);
  if(h.r==2&&q<L&&e){const F2=[1.15,2.6];const nf=F2[h.fire];if(nf!=null){if(q>=nf-1&&!h.aiming){h.aiming=1;SFXa('ot_aim')}if(q<nf-.22){const ta=Math.atan2(e.y-(h.y-62),e.x-h.x);h.aim+=Math.atan2(Math.sin(ta-h.aim),Math.cos(ta-h.aim))*Math.min(1,dt*7)}
    if(q>=nf){h.fire++;h.aiming=0;h.rc=1;SFXa('ot_snipe');shake=Math.max(shake,12);const sx=h.x+Math.cos(h.aim)*48,sy=h.y-62+Math.sin(h.aim)*48,ex=sx+Math.cos(h.aim)*900,ey=sy+Math.sin(h.aim)*900;h.beam={x1:sx,y1:sy,x2:ex,y2:ey,t:0};
      EN.forEach(x=>{if(x.hid||x.jump)return;if(segD(x.x,x.y,sx,sy,ex,ey)<x.r+12){hurt(x,7,o,x.x,x.y,0,1);if(typeof lkImp=='function')lkImp(x.x,x.y,90,C.c)}})}}}
  if(h.rc>0)h.rc=Math.max(0,h.rc-dt*4);if(h.beam)h.beam.t+=dt;
  h.sh=h.sh.filter(s=>{s.t+=dt;s.x+=Math.cos(s.a)*540*dt;s.y+=Math.sin(s.a)*540*dt;if(s.t>1||s.x<-20||s.x>A+20||s.y<-20||s.y>A+20)return false;for(const x of EN){if(x.hid||x.jump)continue;if(Math.hypot(x.x-s.x,x.y-s.y)<x.r+8){hurt(x,1.1,o,s.x,s.y,0,0);return false}}return true});
  return q<L+.35||h.sh.length>0};
HZP.otcap=h=>{const t=h.t,C=OTR[h.r];
  if(!h.pop){let x,y,z,rot,R=13;if(t<.45){const u=t/.45;x=h.x0+(h.x-h.x0)*u;y=h.y0+(h.y-h.y0)*u;z=Math.sin(Math.PI*u)*90;rot=t*14}else{x=h.x;y=h.y;z=t<.6?Math.abs(Math.sin((t-.45)/.15*Math.PI))*14:0;const w=(t-.45)/(h.tp-.45);rot=Math.sin(t*(30+w*30))*.35*w}
    g.save();g.fillStyle='rgba(0,0,0,.4)';g.beginPath();g.ellipse(x,y+R,R*(1-z/200),R*.35*(1-z/200),0,0,TAU);g.fill();g.restore();
    const w=t<.45?0:(t-.45)/(h.tp-.45),tease=h.r==2?Math.max(0,(w-.25)/.75):h.r==1?Math.max(0,(w-.7)/.3):0,col=tease>0?C.c:'#8fa0c0';
    if(h.r==2&&t>.6){g.save();g.translate(x,y-z);g.globalCompositeOperation='lighter';for(let i=0;i<8;i++){const a=i*TAU/8+t*2;g.globalAlpha=tease*.35;g.fillStyle=C.c;g.beginPath();g.moveTo(0,0);g.lineTo(Math.cos(a-.06)*160*tease,Math.sin(a-.06)*160*tease);g.lineTo(Math.cos(a+.06)*160*tease,Math.sin(a+.06)*160*tease);g.fill()}g.restore()}
    if(tease>0){g.save();g.globalCompositeOperation='lighter';glow(C.c,x,y-z,R*3,.5*tease);g.restore()}
    otCapsule(x,y-z,R,col,0,rot);return}
  const q=t-h.tp,L=OTLIFE[h.r],al=q>L?Math.max(0,1-(q-L)/.3):Math.min(1,q/.12);
  // 캡슐 껍데기
  if(q<.5)otCapsule(h.x,h.y-q*30,13,C.c,Math.min(1,q/.2)*1.4,0,1-q/.5);
  // 등장 빛
  if(q<.4){g.save();g.globalCompositeOperation='lighter';g.globalAlpha=1-q/.4;const gr=g.createLinearGradient(0,h.y-200,0,h.y);gr.addColorStop(0,C.c+'00');gr.addColorStop(1,C.c);g.fillStyle=gr;g.fillRect(h.x-22,h.y-200,44,200);g.restore()}
  // 뒤쪽 빛 (등급 색)
  g.save();g.globalCompositeOperation='lighter';glow(C.c,h.fx,h.fy-20,40+8*Math.sin(clock*4),.22*al);g.restore();
  if(h.r==0)otSc(h.x,h.y,1.3,()=>otAcryl(h.x,h.y,C.c,al,Math.sin(clock*2)*.03));
  else if(h.r==1){const e=h.tg,fc=e&&e.x<h.fx?-1:1;otSc(h.fx,h.fy,1.3,()=>otSD(h.fx,h.fy,h.z||0,h.sq||0,C.c,al,fc))}
  else{otSc(h.x,h.y,1.25,()=>otScale(h.x,h.y,h.aim,C.c,al,h.rc||0));
    if(h.aiming){const sx=h.x+Math.cos(h.aim)*48,sy=h.y-62+Math.sin(h.aim)*40;g.save();g.strokeStyle='#ff3a5a';g.globalAlpha=.55+.4*Math.sin(clock*30);g.lineWidth=1.2;g.setLineDash([6,5]);g.beginPath();g.moveTo(sx,sy);g.lineTo(sx+Math.cos(h.aim)*700,sy+Math.sin(h.aim)*700);g.stroke();g.setLineDash([]);g.restore()}
    if(h.beam&&h.beam.t<.35){const b=h.beam,k=b.t/.35;g.save();g.globalCompositeOperation='lighter';g.lineCap='round';g.strokeStyle=C.c;g.globalAlpha=1-k;g.lineWidth=16*(1-k)+2;g.beginPath();g.moveTo(b.x1,b.y1);g.lineTo(b.x2,b.y2);g.stroke();g.strokeStyle='#ffffff';g.lineWidth=5*(1-k)+1;g.stroke();glow(C.c,b.x1,b.y1,40*(1-k),1);g.restore()}}
  // 아크릴 조각
  h.sh.forEach(s=>{g.save();g.translate(s.x,s.y);g.rotate(s.t*20);g.globalCompositeOperation='lighter';glow(C.c,0,0,12,.6);g.fillStyle='rgba(210,235,255,.85)';g.fillRect(-5,-3,10,6);g.restore()})};

// ---------- 2) 10연차 : 별똥별 ----------
function otTen(o,t){const rs=[];for(let i=0;i<10;i++)rs.push(otRoll(o));if(!rs.some(r=>r>=1))rs[9]=1;HZ.push({k:'otten',o,tg:t,t:0,rs,st:[],n:0,pl:[]});SFXa('ot_banner')}
HZX.otten=(h,dt,EN)=>{const o=h.o;let e=h.tg;if(!e||e.dead){e=tgt(o);h.tg=e}
  if(h.n<10&&h.t>=.3+h.n*.13&&e){const r=h.rs[h.n],sd=Math.random()<.5?-1:1,lx=clamp(e.x+e.dx*e.sp*.35+rnd(-22,22),20,A-20),ly=clamp(e.y+e.dy*e.sp*.35+rnd(-22,22),20,A-20);
    h.st.push({r,i:h.n,sx:clamp(lx+sd*rnd(160,320),-60,A+60),sy:-50,x:lx,y:ly,t:0,d:r==2?.62:.42});if(h.n%3==0||r==2)SFXa('ot_meteor');h.n++;if(!o.dead)o.gcd=Math.max(o.gcd,.2)}
  h.st.forEach(s=>{s.t+=dt;if(!s.hit&&s.t>=s.d){s.hit=1;const R=[32,42,64][s.r],D=[.8,1.8,5][s.r],C=OTR[s.r];SFXa(['ot_r','ot_sr','ot_ssr'][s.r]);ring(s.x,s.y,4,R+20,C.c,s.r==2?8:4,.4);for(let i=0;i<(s.r==2?20:6);i++)sparkP(s.x,s.y,rnd(-200,200),rnd(-200,200),C.c,rnd(1.5,3.5));
    if(s.r==2){h.pl.push({x:s.x,y:s.y,t:0});shake=Math.max(shake,14);hs=.08;if(typeof lkImp=='function')lkImp(s.x,s.y,120,C.c)}else shake=Math.max(shake,s.r?5:2);
    EN.forEach(x=>{if(!x.hid&&!x.jump&&Math.hypot(x.x-s.x,x.y-s.y)<R+x.r)hurt(x,D,o,x.x,x.y,0,s.r==2?1:0)})}});
  h.pl.forEach(p=>p.t+=dt);
  const last=h.st.length==10?Math.max(...h.st.map(s=>s.d-s.t)):1;if(h.n>=10&&last<=-.25&&!h.res){h.res=h.t;SFXa('ot_result')}
  return !h.res||h.t<h.res+1.25};
HZP.otten=h=>{
  h.st.forEach(s=>{const C=OTR[s.r];if(s.hit){if(s.t-s.d<.35){const k=(s.t-s.d)/.35;g.save();g.globalCompositeOperation='lighter';glow(C.c,s.x,s.y,(s.r==2?90:50)*(1-k*.5),1-k);g.restore()}return}
    const u=s.t/s.d,e2=u*u,x=s.sx+(s.x-s.sx)*e2,y=s.sy+(s.y-s.sy)*e2,rev=u>.58,col=rev?C.c:'#e8f0ff',a=Math.atan2(s.y-s.sy,s.x-s.sx);
    // 떨어질 자리
    g.save();g.strokeStyle=rev?C.c:'rgba(232,240,255,.6)';g.globalAlpha=.35+.4*u;g.lineWidth=1.5;g.beginPath();g.arc(s.x,s.y,(s.r==2&&rev?40:24)*(1.3-u*.3),0,TAU);g.stroke();g.restore();
    g.save();g.globalCompositeOperation='lighter';const L=(rev&&s.r==2?190:120),tx=x-Math.cos(a)*L,ty=y-Math.sin(a)*L,gr=g.createLinearGradient(tx,ty,x,y);gr.addColorStop(0,col+'00');gr.addColorStop(1,col);g.strokeStyle=gr;g.lineCap='round';g.lineWidth=rev&&s.r==2?9:5;g.beginPath();g.moveTo(tx,ty);g.lineTo(x,y);g.stroke();
    glow(col,x,y,rev&&s.r==2?34:18,1);g.fillStyle='#ffffff';g.beginPath();g.arc(x,y,3,0,TAU);g.fill();
    if(rev&&s.r==2&&Math.random()<.7)sparkP(x,y,rnd(-60,60),rnd(-60,60),C.c,2);g.restore()});
  // SSR 빛기둥
  h.pl.forEach(p=>{if(p.t>.7)return;const k=p.t/.7,w=46*(1-k*.6);g.save();g.globalCompositeOperation='lighter';const gr=g.createLinearGradient(0,-40,0,p.y);gr.addColorStop(0,'rgba(255,194,58,0)');gr.addColorStop(1,'rgba(255,194,58,'+(.75*(1-k))+')');g.fillStyle=gr;g.fillRect(p.x-w/2,-40,w,p.y+40);g.fillStyle='rgba(255,255,255,'+(.6*(1-k))+')';g.fillRect(p.x-w/8,-40,w/4,p.y+40);g.restore();
    g.save();g.globalAlpha=1-Math.max(0,(k-.6)/.4);g.font='400 26px '+OTF;g.textAlign='center';g.lineJoin='round';g.lineWidth=6;g.strokeStyle='#000';g.strokeText('SSR',p.x,p.y-56-k*20);g.fillStyle=OTR[2].c;g.fillText('SSR',p.x,p.y-56-k*20);g.restore()});
  // 10연차 결과 화면
  if(h.res){const k=h.t-h.res,al=Math.min(1,k/.15)*(k>1?Math.max(0,1-(k-1)/.25):1),W=44,Hh=60,x0=A/2-(W+6)*5+3,y0=70;
    g.save();g.globalAlpha=al;g.fillStyle='rgba(6,4,14,.82)';g.fillRect(x0-14,y0-30,(W+6)*10+22,Hh+52);g.strokeStyle='#4a3a70';g.lineWidth=1;g.strokeRect(x0-14,y0-30,(W+6)*10+22,Hh+52);
    g.font='400 12px '+OTF;g.textAlign='center';g.fillStyle='#e8e0ff';g.fillText('10연차 결과',A/2,y0-14);
    h.rs.forEach((r,i)=>{const C=OTR[r],kk=Math.min(1,Math.max(0,(k-i*.04)/.12)),x=x0+i*(W+6),sc=Math.abs(Math.cos((1-kk)*Math.PI/2));g.save();g.translate(x+W/2,y0+Hh/2);g.scale(Math.max(.05,kk),1);
      const gr=g.createLinearGradient(0,-Hh/2,0,Hh/2);gr.addColorStop(0,C.c);gr.addColorStop(1,C.d);g.fillStyle=gr;g.fillRect(-W/2,-Hh/2,W,Hh);g.strokeStyle=r==2?'#fff3c8':'#0a0814';g.lineWidth=r==2?2:1;g.strokeRect(-W/2,-Hh/2,W,Hh);
      g.save();g.translate(0,-4);g.scale(.62,.62);g.fillStyle='rgba(10,8,20,.65)';g.beginPath();g.arc(0,-10,11,0,TAU);g.fill();g.fillRect(-12,2,24,22);g.restore();
      g.fillStyle='rgba(0,0,0,.5)';g.fillRect(-W/2,Hh/2-13,W,13);otStars(0,Hh/2-6.5,C.s,2.4,r==2?'#ffe29a':'#ffffff');
      if(r==2){g.globalCompositeOperation='lighter';glow(C.c,0,0,W,.35+.2*Math.sin(clock*8))}g.restore()});g.restore()}};

// ---------- 3) ULT 한정판 진열장 ----------
const OTD=1.15; // 궁극기 배너가 사라진 뒤에 픽업 배너가 뜨도록 잠깐 기다림
function otUlt(o,t){if(!t||t.dead)t=tgt(o);if(!t)return;HZ.push({k:'otul',o,tg:t,t:0,u:-OTD,n:0})}
HZX.otul=(h,dt,EN)=>{const o=h.o;h.u=h.t-OTD;if(h.u<0)return true;if(!h.bs){h.bs=1;SFXa('ot_banner')}let e=h.tg;if(!h.lk&&(!e||e.dead)){e=tgt(o);h.tg=e}if(!e)return h.u<1;if(!o.dead){o.gcd=Math.max(o.gcd,.4);o.cast=null}
  if(h.u<1.35&&!e.dead)e.slow=Math.max(e.slow,.5);
  if(h.u>=.52&&!h.uap){h.uap=1;SFXa('ot_tap')}
  if(h.u>=.75&&!h.mt){h.mt=1;SFXa('ot_meteor')}
  if(h.u>=1.35&&!h.lk){h.lk=1;h.ex=e.x;h.ey=e.y;SFXa('ot_ssr');SFXa('ot_case');shake=Math.max(shake,16);hs=.1;if(!e.dead&&!e.hid)hurt(e,3,o,e.x,e.y,0,1);ring(e.x,e.y,8,150,OTR[2].c,9,.5)}
  if(h.lk&&h.u<2.95&&!e.dead){e.x=h.ex;e.y=h.ey;e.stn=Math.max(e.stn,.2);e.cast=null;e.rot=(e.rot||0)+dt*2.4}
  const P=[1.65,2.05,2.45];if(h.lk&&h.n<3&&h.u>=P[h.n]){h.n++;h.fl=h.u;SFXa('ot_shutter');if(!e.dead&&!e.hid)hurt(e,3,o,e.x,e.y,0,0)}
  if(h.u>=2.72&&!h.ck){h.ck=1;SFXa('ot_crack')}
  if(h.u>=2.95&&!h.br){h.br=1;SFXa('ot_shatter');shake=Math.max(shake,24);hs=.14;
    for(let i=0;i<34;i++)cubeP(h.ex,h.ey-10,rnd(0,TAU),rnd(120,420),i%4?'#cfe8ff':OTR[2].c);
    if(!e.dead&&!e.hid){hurt(e,9,o,e.x,e.y,0,1);e.stn=Math.max(e.stn,.4);safePush(e,ang(o,e),40)}if(typeof lkImp=='function')lkImp(h.ex,h.ey,150,'#cfe8ff')}
  return h.u<3.7};
HZD.otul=h=>{if(!(h.u>=0))return;const fa=h.u<3.2?Math.min(1,h.u/.25):Math.max(0,1-(h.u-3.2)/.5);if(typeof lkDim=='function')lkDim(.55*fa)};
HZP.otul=h=>{if(!(h.u>=0))return;const t=h.u,G5=OTR[2].c,e=h.tg;
  // 픽업 배너
  if(t<.8){const u=Math.min(1,t/.25),ou=t>.62?(t-.62)/.18:0,x=A/2+(1-(1-Math.pow(1-u,3)))*420-ou*520,y=A*.42,W=310,H=176;g.save();g.translate(x,y);g.globalAlpha=1-ou;
    const gr=g.createLinearGradient(-W/2,-H/2,W/2,H/2);gr.addColorStop(0,'#0c0820');gr.addColorStop(.6,'#24124a');gr.addColorStop(1,'#3a1a10');g.fillStyle=gr;g.fillRect(-W/2,-H/2,W,H);
    g.save();g.beginPath();g.rect(-W/2,-H/2,W,H);g.clip();g.globalCompositeOperation='lighter';for(let i=0;i<6;i++){g.globalAlpha=(1-ou)*.08;g.fillStyle=G5;g.beginPath();const bx=-W/2+40+i*50+((t*80)%50);g.moveTo(bx,-H/2);g.lineTo(bx+20,-H/2);g.lineTo(bx-40,H/2);g.lineTo(bx-60,H/2);g.fill()}g.restore();
    g.strokeStyle=G5;g.lineWidth=2.5;g.strokeRect(-W/2,-H/2,W,H);g.strokeStyle='rgba(255,226,154,.35)';g.lineWidth=1;g.strokeRect(-W/2+6,-H/2+6,W-12,H-12);
    g.save();g.translate(-82,58);g.scale(1.05,1.05);otScale(0,0,-.25,G5,1,0);g.restore();
    g.textAlign='left';g.textBaseline='middle';g.font='400 12px '+OTF;g.fillStyle='#ff5a7a';g.fillText('LIMITED PICK UP',-10,-58);g.font='400 30px '+OTF;g.lineJoin='round';g.lineWidth=5;g.strokeStyle='#000';g.strokeText('한정 픽업',-10,-28);g.fillStyle=G5;g.fillText('한정 픽업',-10,-28);
    otStars(36,4,5,6,G5);g.font='400 10px '+OTF;g.fillStyle='#cdb8ff';g.fillText('1/7 SCALE FIGURE · 기간 한정',-10,26);
    const pr=t>.5&&t<.6?.92:1;g.save();g.translate(62,60);g.scale(pr,pr);g.fillStyle=G5;g.beginPath();g.roundRect?g.roundRect(-46,-14,92,28,6):g.rect(-46,-14,92,28);g.fill();g.fillStyle='#1a1006';g.font='400 13px '+OTF;g.textAlign='center';g.fillText('뽑기 ×1',0,1);g.restore();
    if(t>.52){const k=(t-.52)/.25;g.strokeStyle='#ffffff';g.globalAlpha=(1-ou)*Math.max(0,1-k);g.lineWidth=3;g.beginPath();g.arc(62,60,10+k*40,0,TAU);g.stroke()}g.restore()}
  // 금색 별똥별
  if(t>=.75&&t<1.35&&e){const u=(t-.75)/.6,e2=u*u,ex=h.lk?h.ex:e.x,ey=h.lk?h.ey:e.y,sx=A*.08,sy=-60,x=sx+(ex-sx)*e2,y=sy+(ey-sy)*e2,col=u>.45?G5:'#e8f0ff',a=Math.atan2(ey-sy,ex-sx);
    g.save();g.globalCompositeOperation='lighter';const L=240,gr=g.createLinearGradient(x-Math.cos(a)*L,y-Math.sin(a)*L,x,y);gr.addColorStop(0,col+'00');gr.addColorStop(1,col);g.strokeStyle=gr;g.lineWidth=14;g.lineCap='round';g.beginPath();g.moveTo(x-Math.cos(a)*L,y-Math.sin(a)*L);g.lineTo(x,y);g.stroke();glow(col,x,y,46,1);g.restore();
    g.save();g.strokeStyle=col;g.globalAlpha=.6;g.lineWidth=2;g.beginPath();g.arc(ex,ey,60-u*20,0,TAU);g.stroke();g.restore()}
  if(!h.lk)return;const ex=h.ex,ey=h.ey,R=(e?e.r:26),k=t-1.35;
  // 빛기둥
  if(k<.6){const q=k/.6;g.save();g.globalCompositeOperation='lighter';const gr=g.createLinearGradient(0,-40,0,ey);gr.addColorStop(0,'rgba(255,194,58,0)');gr.addColorStop(1,'rgba(255,194,58,'+(.85*(1-q))+')');g.fillStyle=gr;g.fillRect(ex-60*(1-q*.5),-40,120*(1-q*.5),ey+40);g.restore()}
  // 진열장
  if(!h.br){const drop=Math.max(0,1-k/.12),W=R*2+30,top=ey-R-46-drop*200,bot=ey+R+10;
    otBase(ex,bot+6,W*.62,G5);
    g.save();g.fillStyle='rgba(170,210,255,.10)';g.fillRect(ex-W/2,top,W,bot-top);g.strokeStyle='rgba(220,240,255,.85)';g.lineWidth=2.5;g.strokeRect(ex-W/2,top,W,bot-top);g.fillStyle='#0c0a16';g.fillRect(ex-W/2-4,top-7,W+8,8);g.strokeStyle=G5;g.lineWidth=1.5;g.strokeRect(ex-W/2-4,top-7,W+8,8);
    g.globalCompositeOperation='lighter';g.strokeStyle='rgba(255,255,255,.35)';g.lineWidth=5;g.beginPath();g.moveTo(ex-W/2+8,bot-12);g.lineTo(ex-W/2+26,top+10);g.stroke();g.lineWidth=2;g.beginPath();g.moveTo(ex-W/2+18,bot-6);g.lineTo(ex-W/2+36,top+18);g.stroke();g.restore();
    // 한정판 스티커
    g.save();g.translate(ex+W/2-6,top+18);g.rotate(.25);g.fillStyle=G5;g.beginPath();for(let i=0;i<16;i++){const a=i*TAU/16,rr=i%2?13:16;g.lineTo(Math.cos(a)*rr,Math.sin(a)*rr)}g.closePath();g.fill();g.fillStyle='#1a1006';g.font='400 7px '+OTF;g.textAlign='center';g.textBaseline='middle';g.fillText('한정판',0,-3);g.fillText('1/7',0,5);g.restore();
    // 금
    if(h.ck){const cq=Math.min(1,(t-2.72)/.2);g.save();g.strokeStyle='rgba(255,255,255,.9)';g.lineWidth=1.5;g.beginPath();[[-.3,-.2],[.25,.1],[-.1,.35],[.35,-.3]].forEach(([dx,dy],i)=>{const cx=ex+dx*W,cy=(top+bot)/2+dy*(bot-top);for(let j=0;j<4;j++){const a=j*1.7+i;g.moveTo(cx,cy);g.lineTo(cx+Math.cos(a)*30*cq,cy+Math.sin(a)*30*cq)}});g.stroke();g.restore()}
    // 사진 찍기 : 뷰파인더
    if(k>.2){const fv=h.fl?Math.max(0,1-(t-h.fl)/.25):0,pad=18+fv*14,x1=ex-W/2-pad,x2=ex+W/2+pad,y1=top-pad-8,y2=bot+pad+8,c=18;g.save();g.strokeStyle='#ffffff';g.lineWidth=3;g.beginPath();
      [[x1,y1,1,1],[x2,y1,-1,1],[x1,y2,1,-1],[x2,y2,-1,-1]].forEach(([x,y,sx,sy])=>{g.moveTo(x,y+sy*c);g.lineTo(x,y);g.lineTo(x+sx*c,y)});g.stroke();
      g.fillStyle='#ff3a4a';g.beginPath();g.arc(x1+8,y1-12,4,0,TAU);g.fill();g.font='400 11px '+OTF;g.fillStyle='#ffffff';g.textAlign='left';g.fillText(h.n+'/3',x1+16,y1-8);g.restore()}}
  // 플래시
  if(h.fl&&t-h.fl<.2){g.save();g.globalAlpha=(1-(t-h.fl)/.2)*.8;g.fillStyle='#ffffff';g.fillRect(-60,-60,A+120,A+120);g.restore()}
  // SOLD OUT
  if(h.br&&t<3.7){const q=t-2.95,s=q<.1?2.2-q*12:1,al=q>.5?Math.max(0,1-(q-.5)/.25):1;g.save();g.translate(ex,ey-10);g.rotate(-.2);g.scale(s,s);g.globalAlpha=al;g.strokeStyle='#ff2a4a';g.lineWidth=5;g.strokeRect(-92,-24,184,48);g.lineWidth=2;g.strokeRect(-86,-18,172,36);
    g.font='400 34px '+OTF;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#ff2a4a';g.fillText('SOLD OUT',0,2);g.restore()}};
Object.assign(DMGK,{otaku:1.28});
// 아이콘 : 가챠 캡슐 + 별
EMB.otaku=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*2.2)*.08);g.save();g.globalCompositeOperation='lighter';glow(D.hi,0,-4,18,.35);g.restore();
  g.save();g.beginPath();g.arc(0,0,15,Math.PI,TAU);g.closePath();const gt=g.createLinearGradient(-15,-15,15,0);gt.addColorStop(0,D.col);gt.addColorStop(1,D.dk);g.fillStyle=gt;g.fill();g.beginPath();g.arc(0,0,15,0,Math.PI);g.closePath();g.fillStyle='#ecebf5';g.fill();
  g.strokeStyle=D.dk;g.lineWidth=2;g.beginPath();g.arc(0,0,15,0,TAU);g.moveTo(-15,0);g.lineTo(15,0);g.stroke();g.restore();
  otStar(0,-7,6.5,D.hi);g.fillStyle='rgba(255,255,255,.6)';g.beginPath();g.ellipse(-7,-9,3.5,1.6,-.5,0,TAU);g.fill();
  [[-17,-14,.8],[16,-12,1],[14,10,.6]].forEach(([x,y,s],i)=>{const tw=.6+.4*Math.sin(clock*5+i*2);otStar(x,y,3.6*s*tw,D.hi,tw)})};

// ======================================================================
// 흉악범 • 조커 (카드 · 광대 · 혼돈)
// 패시브 스마일 : 때릴 때마다 상대에게 웃는 얼굴 표식 · 3개가 모이면 웃음 가스가 터짐 (피해 + 혼란)
// 1) 와일드 카드 : 조커 카드가 벽과 상대 사이를 미친 듯이 튕겨 다니다가 카드 52장으로 흩어짐
// 2) 깜짝 선물 : 하늘에서 선물 상자 · 오르골이 울리다가 용수철 권투 장갑이 튀어나와 강타 · 상자 폭발
// 3) ULT 쇼타임 : 조명 · 커튼 → 카드 5장이 상대를 둘러쌈 → 10 J Q K A 한 장씩 뒤집으며 베기 (로열 플러시)
//    → 마지막 조커 카드가 떨어져 웃으며 내리찍음
// ======================================================================
const JKC='#6a1fa0',JKG='#b6ff4a',JKR='#ff2a3a',JKF='"Cinzel","Noto Serif KR",serif';
const NEW32=['jk_card','jk_ric','jk_burst','jk_drop','jk_tick','jk_boing','jk_punch','jk_confetti','jk_mark','jk_gas','jk_laugh','jk_spot','jk_shuffle','jk_flip','jk_flush','jk_wild','jk_slam'];
NEW32.forEach(n=>{if(!SND.includes(n))SND.push(n);if(!AUD[n])AUD[n]=new SoundPool('sounds/'+n+'.mp3',['jk_ric','jk_mark','jk_flip'].includes(n)?5:3)});
Object.assign(SLB,{jk_card:'조커 · 카드 던지기',jk_ric:'조커 · 카드 튕김',jk_burst:'조커 · 카드 흩어짐',jk_drop:'조커 · 선물 상자 떨어짐',jk_tick:'조커 · 오르골',jk_boing:'조커 · 용수철',jk_punch:'조커 · 권투 장갑',jk_confetti:'조커 · 상자 폭발',jk_mark:'조커 · 스마일 표식',jk_gas:'조커 · 웃음 가스',jk_laugh:'조커 · 웃음소리',jk_spot:'조커 · 조명 켜짐',jk_shuffle:'조커 · 카드 섞기',jk_flip:'조커 · 카드 뒤집기',jk_flush:'조커 · 로열 플러시',jk_wild:'조커 · 조커 카드',jk_slam:'조커 · 내려찍기'});
const JKSK=[
  {n:'와일드 카드',w:.25,cd:7,aim:1,c:(o,t)=>!t.hid&&dist(o,t)<520,f:(o,t)=>jkWild(o,t)},
  {n:'깜짝 선물',w:.3,cd:9.5,c:(o,t)=>!t.hid&&!t.jump&&dist(o,t)<500,f:(o,t)=>jkBox(o,t)},
  {n:'쇼타임',w:.4,ult:1,c:(o,t)=>!t.hid,f:(o,t)=>jkUlt(o,t)}];
const JKI=DEF.findIndex(d=>d.name=='흉악범');
DEF.push({name:'흉악범 • 조커',gl:'광',k:'joker',vof:JKI,r:25,sp:222,col:'#6a1fa0',hi:'#b6ff4a',dk:'#12031e',alt:{col:'#c8102e',hi:'#ffffff',dk:'#1a0005'},alt2:{col:'#2a2a2e',hi:'#ff2a3a',dk:'#000000'},sk:JKSK});
INFO['흉악범 • 조커']={st:[8,7,8,8,6,10],p:'스마일 · 때릴 때마다 상대에게 웃는 얼굴 표식 (최대 3개) · 3개가 모이면 웃음 가스가 터져 4 피해 + 1.2초 혼란 (제멋대로 비틀거림)',
  sk:[['3.5×튕김+1×10','조커 카드가 벽과 상대 사이를 미친 듯이 튕겨 다님 (최대 5번) · 끝나면 카드 10장으로 흩어짐'],['6+2.5','하늘에서 선물 상자가 떨어짐 · 오르골이 울리다가 용수철 권투 장갑이 튀어나와 강타 (기절) · 상자가 폭죽처럼 터짐'],['2.5×5+8','조명이 꺼지고 커튼이 내려옴 · 카드 5장이 상대를 둘러싸고 10 J Q K A를 한 장씩 뒤집으며 벰 · ROYAL FLUSH · 마지막 조커 카드가 떨어져 웃으며 내리찍음 (웃음 가스까지)']]};

// 공통 : 광대 얼굴
function jkJester(s,al,grin){g.save();g.scale(s,s);g.globalAlpha=al==null?1:al;g.lineJoin='round';g.lineCap='round';
  // 모자 뿔 3개 + 방울
  [[-1,JKC],[0,JKG],[1,JKC]].forEach(([sd,c])=>{g.fillStyle=c;g.strokeStyle='#0a0410';g.lineWidth=2.2;g.beginPath();g.moveTo(sd*8-7,-8);g.quadraticCurveTo(sd*20-4,-22,sd*24+(sd?0:0),sd?-30:-36);g.quadraticCurveTo(sd*12+5,-18,sd*8+7,-8);g.closePath();g.fill();g.stroke()});
  [[-24,-30],[0,-36],[24,-30]].forEach(([x,y],i)=>{g.fillStyle='#ffd34a';g.strokeStyle='#0a0410';g.lineWidth=1.6;g.beginPath();g.arc(x,y,3.6,0,TAU);g.fill();g.stroke()});
  g.fillStyle='#14061e';g.fillRect(-17,-11,34,6);g.strokeStyle=JKG;g.lineWidth=1.2;g.strokeRect(-17,-11,34,6);
  // 얼굴
  g.fillStyle='#f3efe4';g.strokeStyle='#0a0410';g.lineWidth=2.2;g.beginPath();g.moveTo(-16,-5);g.quadraticCurveTo(-17,14,0,20);g.quadraticCurveTo(17,14,16,-5);g.closePath();g.fill();g.stroke();
  // 다이아 눈 · 눈물 다이아
  [-1,1].forEach(sd=>{g.fillStyle='#0a0410';g.beginPath();g.moveTo(sd*7,-2);g.lineTo(sd*10.5,1.5);g.lineTo(sd*7,5);g.lineTo(sd*3.5,1.5);g.closePath();g.fill();g.fillStyle=sd<0?JKC:JKG;g.beginPath();g.moveTo(sd*7,6.5);g.lineTo(sd*8.6,9);g.lineTo(sd*7,11.5);g.lineTo(sd*5.4,9);g.closePath();g.fill();
    g.fillStyle=JKG;g.beginPath();g.arc(sd*7-.8,.8,1,0,TAU);g.fill()});
  // 웃음
  const gw=grin==null?1:grin;g.fillStyle=JKR;g.strokeStyle='#0a0410';g.lineWidth=1.8;g.beginPath();g.moveTo(-11,9);g.quadraticCurveTo(0,13+5*gw,11,9);g.quadraticCurveTo(0,20+5*gw,-11,9);g.closePath();g.fill();g.stroke();
  g.strokeStyle='#ffffff';g.lineWidth=1.2;g.beginPath();g.moveTo(-8,11);g.quadraticCurveTo(0,14+4*gw,8,11);g.stroke();
  g.strokeStyle='#0a0410';g.lineWidth=1.4;g.beginPath();g.moveTo(-12,8);g.lineTo(-14,6);g.moveTo(12,8);g.lineTo(14,6);g.stroke();g.restore()}
// 공통 : 트럼프 카드 (face : 'back' · 'joker' · '10' 'J' 'Q' 'K' 'A')
function jkCard(x,y,w,rot,face,flip,al){const h=w*1.42;g.save();g.translate(x,y);g.rotate(rot||0);g.scale(flip==null?1:Math.max(.02,Math.abs(flip)),1);g.globalAlpha=al==null?1:al;
  g.fillStyle='rgba(0,0,0,.35)';g.fillRect(-w/2+3,-h/2+4,w,h);
  if(face=='back'){const gr=g.createLinearGradient(-w/2,-h/2,w/2,h/2);gr.addColorStop(0,'#3a0d5a');gr.addColorStop(1,'#14031f');g.fillStyle=gr;g.fillRect(-w/2,-h/2,w,h);g.strokeStyle='#f3efe4';g.lineWidth=Math.max(1,w*.05);g.strokeRect(-w/2+w*.08,-h/2+w*.08,w*.84,h-w*.16);
    g.save();g.beginPath();g.rect(-w/2+w*.12,-h/2+w*.12,w*.76,h-w*.24);g.clip();g.strokeStyle='rgba(182,255,74,.35)';g.lineWidth=Math.max(.6,w*.02);g.beginPath();for(let i=-6;i<=6;i++){g.moveTo(i*w*.18-h,-h);g.lineTo(i*w*.18+h,h);g.moveTo(i*w*.18+h,-h);g.lineTo(i*w*.18-h,h)}g.stroke();g.restore();
    g.fillStyle=JKR;g.beginPath();g.moveTo(-w*.16,0);g.quadraticCurveTo(0,w*.18,w*.16,0);g.quadraticCurveTo(0,w*.07,-w*.16,0);g.fill()}
  else{g.fillStyle='#f6f2e8';g.fillRect(-w/2,-h/2,w,h);g.strokeStyle='#14061e';g.lineWidth=Math.max(1,w*.03);g.strokeRect(-w/2,-h/2,w,h);
    if(face=='joker'){g.save();g.translate(0,h*.06);jkJester(w/56);g.restore();g.fillStyle=JKC;g.font='700 '+Math.round(w*.13)+'px '+JKF;g.textAlign='center';g.textBaseline='middle';
      ['J','O','K','E','R'].forEach((ch,i)=>{g.fillText(ch,-w*.38,-h*.4+i*w*.14);g.save();g.rotate(Math.PI);g.fillText(ch,-w*.38,-h*.4+i*w*.14);g.restore()})}
    else{g.fillStyle='#14061e';g.textAlign='center';g.textBaseline='middle';g.font='700 '+Math.round(w*.2)+'px '+JKF;g.fillText(face,-w*.33,-h*.38);g.font=Math.round(w*.16)+'px serif';g.fillText('♠',-w*.33,-h*.24);
      g.save();g.rotate(Math.PI);g.font='700 '+Math.round(w*.2)+'px '+JKF;g.fillText(face,-w*.33,-h*.38);g.font=Math.round(w*.16)+'px serif';g.fillText('♠',-w*.33,-h*.24);g.restore();
      g.font='700 '+Math.round(w*.42)+'px '+JKF;g.fillText(face,0,-h*.06);g.font=Math.round(w*.3)+'px serif';g.fillText('♠',0,h*.22)}}
  g.restore()}

// 패시브 : 스마일 표식 → 웃음 가스
let JKNM=0;
const _hurtJK=hurt;hurt=function(t,n,o){if(o&&o.d&&o.d.k=='joker'&&t&&t!=o&&n>0&&!t.dead&&!JKNM){const hp0=t.hp,r=_hurtJK.apply(this,arguments);if(hp0-t.hp>0&&!t.dead&&!(t.jkMc>0)){t.jkMc=.35;t.jkM=(t.jkM||0)+1;t.jkMt=0;if(!SKIP)SFXa('jk_mark');if(t.jkM>=3){t.jkM=0;jkGas(o,t)}}return r}
  return _hurtJK.apply(this,arguments)};
const JKQ=[];
function jkGas(o,t){JKQ.push({k:'jkgas',o,x:t.x,y:t.y,t:0,P:Array.from({length:14},()=>[rnd(0,TAU),rnd(.4,1),rnd(10,22)])});SFXa('jk_gas');if(!(o.jkLc>0)){o.jkLc=2.2;SFXa('jk_laugh')}}
HZX.jkgas=(h,dt,EN)=>{if(h.t>=.12&&!h.hit){h.hit=1;JKNM=1;EN.forEach(x=>{if(x.hid||x.dead)return;if(Math.hypot(x.x-h.x,x.y-h.y)<85+x.r){hurt(x,4,h.o,x.x,x.y,0,0);x.jkCf=1.2;x.jkCa=rnd(0,TAU);x.cast=null}});JKNM=0}return h.t<1.4};
HZP.jkgas=h=>{const u=Math.min(1,h.t/.3),al=h.t>.9?Math.max(0,1-(h.t-.9)/.5):1;g.save();h.P.forEach(([a,s,r],i)=>{const R=(30+60*u)*s,x=h.x+Math.cos(a+h.t*.6)*R,y=h.y+Math.sin(a+h.t*.6)*R*.8-h.t*14;g.globalAlpha=al*.55;glow(i%3?'#5a2a80':'#7aa83a',x,y,r*(1+u*1.6),1)});g.restore();
  g.save();g.globalAlpha=al;g.font='700 '+(18+u*8)+'px '+JKF;g.textAlign='center';g.lineJoin='round';g.lineWidth=4;g.strokeStyle='#0a0410';['HA','HA','HA'].forEach((s,i)=>{const x=h.x+(i-1)*34,y=h.y-30-h.t*40-i*8+Math.sin(h.t*14+i)*4;g.strokeText(s,x,y);g.fillStyle=i==1?JKG:'#d8b0ff';g.fillText(s,x,y)});g.restore()};
const _updJK=update;update=function(dt){_updJK(dt);if(JKQ.length){JKQ.forEach(q=>HZ.push(q));JKQ.length=0}if(!F)return;F.forEach(f=>{if(f.jkMc>0)f.jkMc-=dt;if(f.jkLc>0)f.jkLc-=dt;if(f.jkM>0){f.jkMt=(f.jkMt||0)+dt;if(f.jkMt>8){f.jkM=0}}
  if(f.jkCf>0&&!f.dead){f.jkCf-=dt;if(Math.random()<dt*3)f.jkCa=rnd(0,TAU);if(phase=='play'&&!TSTOP&&!MAD){f.x=clamp(f.x+Math.cos(f.jkCa)*95*dt,f.r,A-f.r);f.y=clamp(f.y+Math.sin(f.jkCa)*95*dt,f.r,A-f.r);f.slow=Math.max(f.slow,.3)}}})};
const _lowJK=lowHP;lowHP=function(f){_lowJK(f);if(f.dead||f.hid)return;
  if(f.jkM>0){for(let i=0;i<f.jkM;i++){const a=clock*2.2+i*TAU/3,x=f.x+Math.cos(a)*(f.r+12),y=f.y+Math.sin(a)*(f.r+12)*.8;g.save();g.translate(x,y);g.fillStyle='#0a0410';g.beginPath();g.arc(0,0,7,0,TAU);g.fill();g.strokeStyle=JKR;g.lineWidth=2;g.lineCap='round';g.beginPath();g.arc(0,-.5,4.5,.35,Math.PI-.35);g.stroke();g.fillStyle=JKG;g.fillRect(-3,-3,1.6,1.6);g.fillRect(1.4,-3,1.6,1.6);g.restore()}}
  if(f.jkCf>0){g.save();g.translate(f.x,f.y-f.r-14);g.rotate(clock*6);g.strokeStyle=JKG;g.lineWidth=2;g.beginPath();for(let i=0;i<20;i++){const a=i*.5,r=i*.5;g.lineTo(Math.cos(a)*r,Math.sin(a)*r)}g.stroke();g.restore()}};
const _initJK=init;init=function(){_initJK.apply(this,arguments);JKQ.length=0;if(F)F.forEach(f=>{f.jkM=0;f.jkMc=0;f.jkCf=0;f.jkLc=0})};

// ---------- 1) 와일드 카드 ----------
function jkWild(o,t){const a=ang(o,t);HZ.push({k:'jkwc',o,tg:t,t:0,x:o.x+Math.cos(a)*(o.r+10),y:o.y+Math.sin(a)*(o.r+10),a,b:0,hc:new Map(),P:[],cs:null});SFXa('jk_card')}
HZX.jkwc=(h,dt,EN)=>{const o=h.o;let e=h.tg;if(!e||e.dead){e=tgt(o);h.tg=e}
  if(!h.cs){if(h.b>0&&e&&!e.hid){const ta=Math.atan2(e.y-h.y,e.x-h.x);h.a+=Math.atan2(Math.sin(ta-h.a),Math.cos(ta-h.a))*Math.min(1,dt*2.6)}
    const v=640;h.x+=Math.cos(h.a)*v*dt;h.y+=Math.sin(h.a)*v*dt;h.P.push({x:h.x,y:h.y,r:h.t*16});if(h.P.length>8)h.P.shift();
    let bx=0;if(h.x<16&&Math.cos(h.a)<0){h.a=Math.PI-h.a;bx=1}if(h.x>A-16&&Math.cos(h.a)>0){h.a=Math.PI-h.a;bx=1}if(h.y<16&&Math.sin(h.a)<0){h.a=-h.a;bx=1}if(h.y>A-16&&Math.sin(h.a)>0){h.a=-h.a;bx=1}
    if(bx){h.b++;SFXa('jk_ric');for(let i=0;i<6;i++)sparkP(h.x,h.y,rnd(-150,150),rnd(-150,150),JKG,2)}
    for(const x of EN){if(x.hid||x.jump)continue;if(Math.hypot(x.x-h.x,x.y-h.y)<x.r+20&&(h.hc.get(x)||0)<=h.t){h.hc.set(x,h.t+.4);hurt(x,3.5,o,h.x,h.y,0,0);if(typeof lkImp=='function')lkImp(h.x,h.y,60,JKG);h.a=Math.atan2(h.y-x.y,h.x-x.x)+rnd(-.9,.9);h.b++;SFXa('jk_ric');shake=Math.max(shake,6)}}
    if(h.b>=5||h.t>1.9){h.cs=[];for(let i=0;i<10;i++){const a=i*TAU/10+rnd(-.1,.1);h.cs.push({x:h.x,y:h.y,a,t:0,rt:rnd(0,TAU)})}h.ct=0;SFXa('jk_burst');ring(h.x,h.y,6,80,JKC,5,.35)}
    return true}
  h.cs=h.cs.filter(c=>{c.t+=dt;c.x+=Math.cos(c.a)*480*dt;c.y+=Math.sin(c.a)*480*dt;if(c.t>.55)return false;for(const x of EN){if(x.hid||x.jump)continue;if(Math.hypot(x.x-c.x,x.y-c.y)<x.r+9){hurt(x,1,o,c.x,c.y,0,0);return false}}return true});
  return h.cs.length>0};
HZP.jkwc=h=>{if(!h.cs){h.P.forEach((p,i)=>{const u=i/h.P.length;g.save();g.globalCompositeOperation='lighter';glow(i%2?JKC:JKG,p.x,p.y,10+u*8,u*.5);g.restore()});
    g.save();g.globalCompositeOperation='lighter';glow(JKG,h.x,h.y,30,.55);g.restore();h.P.forEach((p,i)=>{if(i%3==0)jkCard(p.x,p.y,30,p.r,'back',null,.18+.25*i/h.P.length)});jkCard(h.x,h.y,34,h.t*16,'joker',Math.cos(h.t*9));return}
  h.cs.forEach(c=>jkCard(c.x,c.y,13,c.rt+c.t*18,c.t*10%2<1?'back':'A',null,1-c.t/.55))};

// ---------- 2) 깜짝 선물 ----------
function jkBox(o,t){const a=ang(t,o)+rnd(-.5,.5),px=clamp(t.x+t.dx*t.sp*.45+Math.cos(a)*80,40,A-40),py=clamp(t.y+t.dy*t.sp*.45+Math.sin(a)*80,60,A-30);HZ.push({k:'jkbx',o,tg:t,t:0,x:px,y:py,ga:0,gl:0});SFXa('jk_drop')}
HZX.jkbx=(h,dt,EN)=>{const o=h.o;let e=h.tg;if(!e||e.dead){e=tgt(o);h.tg=e}const t=h.t;
  if(t>=.35&&!h.ld){h.ld=1;shake=Math.max(shake,6);for(let i=0;i<6;i++)dustP(h.x,h.y+12,rnd(30,80))}
  if(t>=.42&&!h.tk){h.tk=1;SFXa('jk_tick')}
  if(t<1.0&&e)h.ga=Math.atan2(e.y-(h.y-22),e.x-h.x);
  if(t>=.95&&!h.bo){h.bo=1;SFXa('jk_boing')}
  if(t>=.95)h.gl=Math.min(1,(t-.95)/.1)*(t>1.25?Math.max(0,1-(t-1.25)/.2):1);
  if(t>=1.05&&!h.pu){h.pu=1;const L=150,gx=h.x+Math.cos(h.ga)*L,gy=h.y-22+Math.sin(h.ga)*L;EN.forEach(x=>{if(x.hid||x.jump)return;if(segD(x.x,x.y,h.x,h.y-22,gx,gy)<x.r+24){SFXa('jk_punch');hurt(x,6,o,x.x,x.y,0,1);x.stn=Math.max(x.stn,.45);x.cast=null;safePush(x,h.ga,70);if(typeof lkImp=='function')lkImp(x.x,x.y,90,JKR)}})}
  if(t>=1.45&&!h.ex){h.ex=1;SFXa('jk_confetti');shake=Math.max(shake,10);ring(h.x,h.y,8,110,JKG,6,.4);for(let i=0;i<30;i++)cubeP(h.x,h.y,rnd(0,TAU),rnd(80,320),[JKC,JKG,JKR,'#ffd34a','#ffffff'][i%5]);EN.forEach(x=>{if(!x.hid&&!x.jump&&Math.hypot(x.x-h.x,x.y-h.y)<72+x.r)hurt(x,2.5,o,x.x,x.y,0,0)})}
  return t<2};
HZP.jkbx=h=>{const t=h.t;if(h.ex){const k=(t-1.45)/.55;g.save();g.globalAlpha=Math.max(0,1-k);for(let i=0;i<8;i++){const a=i*TAU/8,R=20+k*70;glow(i%2?'#5a2a80':'#3a1a50',h.x+Math.cos(a)*R,h.y+Math.sin(a)*R*.7,26+k*20,.7)}g.restore();return}
  const fall=t<.35?1-t/.35:0,z=fall*fall*380,sh=t>.42&&t<.95?Math.sin(t*60)*(t-.42)*.25:0,sq=t>=.35&&t<.45?Math.sin((t-.35)/.1*Math.PI)*.18:0;
  g.save();g.fillStyle='rgba(0,0,0,.45)';g.beginPath();g.ellipse(h.x,h.y+14,31*(1-fall*.5),10*(1-fall*.5),0,0,TAU);g.fill();g.restore();
  g.save();g.translate(h.x,h.y+14-z);g.rotate(sh);g.scale((1+sq)*1.3,(1-sq)*1.3);
  // 상자 (앞면 · 윗면)
  g.fillStyle=JKC;g.strokeStyle='#0a0410';g.lineWidth=2;g.fillRect(-20,-32,40,32);g.strokeRect(-20,-32,40,32);g.fillStyle=JKG;g.fillRect(-4,-32,8,32);
  g.fillStyle='#0a0410';g.font='700 18px '+JKF;g.textAlign='center';g.textBaseline='middle';g.fillText('?',-12,-15);g.fillText('?',12,-15);
  if(!h.bo){g.fillStyle='#8a3ac8';g.beginPath();g.moveTo(-22,-32);g.lineTo(22,-32);g.lineTo(16,-40);g.lineTo(-16,-40);g.closePath();g.fill();g.stroke();g.fillStyle=JKG;g.fillRect(-4,-40,8,8);
    g.save();g.translate(0,-42);g.fillStyle=JKG;[-1,1].forEach(sd=>{g.beginPath();g.ellipse(sd*8,0,8,4.5,sd*.4,0,TAU);g.fill();g.stroke()});g.restore()}
  g.restore();
  // 날아가는 뚜껑
  if(h.bo&&t<1.6){const k=t-.95;g.save();g.translate(h.x+k*90,h.y-34-k*160+k*k*420);g.rotate(k*12);g.fillStyle='#8a3ac8';g.strokeStyle='#0a0410';g.lineWidth=2;g.fillRect(-20,-5,40,9);g.strokeRect(-20,-5,40,9);g.restore()}
  // 오르골 음표
  if(t>.42&&t<.95){for(let i=0;i<3;i++){const p=((t-.42)*1.6+i/3)%1;g.save();g.globalAlpha=1-p;g.fillStyle=i%2?JKG:'#d8b0ff';g.font='16px serif';g.textAlign='center';g.fillText('♪',h.x+(i-1)*20+Math.sin(p*6)*6,h.y-56-p*40);g.restore()}}
  // 용수철 + 권투 장갑
  if(h.gl>0){const L=150*h.gl,sx=h.x,sy=h.y-22,gx=sx+Math.cos(h.ga)*L,gy=sy+Math.sin(h.ga)*L,nx=-Math.sin(h.ga),ny=Math.cos(h.ga);g.save();g.strokeStyle='#d8d8e0';g.lineWidth=3;g.beginPath();g.moveTo(sx,sy);const n=12;for(let i=1;i<n;i++){const u=i/n,w=(i%2?1:-1)*8;g.lineTo(sx+(gx-sx)*u+nx*w,sy+(gy-sy)*u+ny*w)}g.lineTo(gx,gy);g.stroke();
    g.translate(gx,gy);g.rotate(h.ga);g.scale(1.35,1.35);g.fillStyle='#ffffff';g.fillRect(-8,-9,8,18);g.fillStyle=JKR;g.strokeStyle='#2a0006';g.lineWidth=2;g.beginPath();g.ellipse(10,0,15,13,0,0,TAU);g.fill();g.stroke();g.beginPath();g.ellipse(6,-12,7,5,-.4,0,TAU);g.fill();g.stroke();
    g.fillStyle='rgba(255,255,255,.4)';g.beginPath();g.ellipse(12,-4,6,3,0,0,TAU);g.fill();g.restore()}};

// ---------- 3) ULT 쇼타임 ----------
const JKRK=['10','J','Q','K','A'];
function jkUlt(o,t){if(!t||t.dead)t=tgt(o);if(!t)return;HZ.push({k:'jkult',o,tg:t,t:0,n:0,cs:[],sl:[]});SFXa('jk_spot')}
HZX.jkult=(h,dt,EN)=>{const o=h.o;let e=h.tg;if(!h.lk&&(!e||e.dead)){e=tgt(o);h.tg=e}if(!e)return h.t<1;if(!o.dead){o.gcd=Math.max(o.gcd,.4);o.cast=null}
  EN.forEach(x=>{x.slow=Math.max(x.slow,.5)});
  if(h.t>=.45&&!h.lk){h.lk=1;h.ex=e.x;h.ey=e.y;SFXa('jk_shuffle');for(let i=0;i<5;i++){const a=-Math.PI/2+(i-2)*.62,R=120;h.cs.push({i,sx:o.x,sy:o.y,x:clamp(e.x+Math.cos(a)*R,40,A-40),y:clamp(e.y+Math.sin(a)*R*.95,50,A-50),a})}}
  if(h.lk&&h.t<2.95&&!e.dead){e.x=h.ex;e.y=h.ey;e.stn=Math.max(e.stn,.2);e.cast=null}
  if(h.lk&&h.n<5&&h.t>=1.0+h.n*.24){const c=h.cs[h.n];h.n++;c.ft=h.t;SFXa('jk_flip');h.sl.push({x1:c.x,y1:c.y,x2:h.ex,y2:h.ey,t:h.t});if(!e.dead&&!e.hid){JKNM=1;hurt(e,2.5,o,e.x,e.y,0,0);JKNM=0;if(typeof lkImp=='function')lkImp(e.x+rnd(-8,8),e.y+rnd(-8,8),70,h.n%2?JKG:'#ffffff')}shake=Math.max(shake,6)}
  if(h.t>=2.2&&!h.fs){h.fs=1;SFXa('jk_flush')}
  if(h.t>=2.6&&!h.wd){h.wd=1;SFXa('jk_wild')}
  if(h.t>=2.88&&!h.sm){h.sm=1;SFXa('jk_slam');shake=Math.max(shake,26);hs=.14;FX.push({k:'crack',x:h.ex,y:h.ey,r:80,l:2,m:2});for(let i=0;i<26;i++)cubeP(h.ex,h.ey,rnd(0,TAU),rnd(120,380),[JKC,JKG,JKR,'#ffffff'][i%4]);
    if(!e.dead&&!e.hid){JKNM=1;hurt(e,8,o,e.x,e.y,0,1);JKNM=0;e.stn=Math.max(e.stn,.4);if(!e.dead){e.jkM=0;jkGas(o,e)}}ring(h.ex,h.ey,10,180,JKG,10,.6)}
  return h.t<3.8};
HZD.jkult=h=>{const fa=h.t<3.3?Math.min(1,h.t/.2):Math.max(0,1-(h.t-3.3)/.5);if(typeof lkDim=='function')lkDim(.78*fa);
  // 스포트라이트
  const o=h.o,tx=h.lk?h.ex:o.x,ty=h.lk?h.ey:o.y;g.save();g.globalCompositeOperation='lighter';g.globalAlpha=fa*.45;const gr=g.createRadialGradient(tx,ty,10,tx,ty,140);gr.addColorStop(0,'rgba(255,250,220,.6)');gr.addColorStop(1,'rgba(255,250,220,0)');g.fillStyle=gr;g.beginPath();g.moveTo(A/2-30,-40);g.lineTo(A/2+30,-40);g.lineTo(tx+130,ty+40);g.lineTo(tx-130,ty+40);g.closePath();g.fill();g.beginPath();g.ellipse(tx,ty+10,130,46,0,0,TAU);g.fill();g.restore()};
HZP.jkult=h=>{const t=h.t,fa=t<3.3?Math.min(1,t/.2):Math.max(0,1-(t-3.3)/.5);
  // 커튼
  const cd=t<.4?t/.4:t>3.3?Math.max(0,1-(t-3.3)/.5):1;g.save();[-1,1].forEach(sd=>{const W=110*cd,x0=sd<0?-20:A+20;const gr=g.createLinearGradient(x0,0,x0-sd*W,0);gr.addColorStop(0,'#3a0008');gr.addColorStop(1,'#8a0a1e');g.fillStyle=gr;g.beginPath();g.moveTo(x0,-40);g.lineTo(x0-sd*W,-40);
    for(let y=-40;y<=A+40;y+=30)g.lineTo(x0-sd*(W-8*Math.sin(y*.05+clock)),y);g.lineTo(x0,A+40);g.closePath();g.fill();g.strokeStyle='rgba(0,0,0,.35)';g.lineWidth=2;for(let i=1;i<5;i++){g.beginPath();g.moveTo(x0-sd*W*i/5,-40);g.lineTo(x0-sd*W*i/5,A+40);g.stroke()}});
  g.fillStyle='#5a0012';g.beginPath();g.moveTo(-20,-40);for(let x=-20;x<=A+20;x+=40)g.quadraticCurveTo(x+20,-40+46*cd,x+40,-40);g.fill();g.strokeStyle='#ffd34a';g.lineWidth=2;g.stroke();g.restore();
  // SHOWTIME
  if(t>.1&&t<1){const k=t-.1,s=k<.12?1.8-k*6.5:1,al=k>.7?1-(k-.7)/.2:1;g.save();g.translate(A/2,A*.2);g.scale(s,s);g.globalAlpha=al*fa;g.textAlign='center';g.textBaseline='middle';g.font='700 50px '+JKF;g.lineJoin='round';g.lineWidth=8;g.strokeStyle='#0a0410';g.strokeText('SHOWTIME',0,0);
    const gr=g.createLinearGradient(0,-25,0,25);gr.addColorStop(0,'#e8ffb0');gr.addColorStop(1,'#6aa018');g.fillStyle=gr;g.fillText('SHOWTIME',0,0);g.restore()}
  // 카드 5장
  h.cs.forEach(c=>{const k=Math.min(1,(t-.45-c.i*.05)/.38);if(k<=0)return;const e2=1-Math.pow(1-k,3),x=c.sx+(c.x-c.sx)*e2,y=c.sy+(c.y-c.sy)*e2,rot=(1-e2)*6+(c.a+Math.PI/2)*.35;let fl=1,face='back';
    if(c.ft){const q=(t-c.ft)/.14;if(q<1){fl=Math.cos(q*Math.PI);face=q<.5?'back':JKRK[c.i]}else face=JKRK[c.i]}
    const al=h.sm?Math.max(0,1-(t-2.88)/.25):1;if(c.ft&&t-c.ft<.4){g.save();g.globalCompositeOperation='lighter';glow(JKG,x,y,60*(1-(t-c.ft)/.4),.8*al);g.restore()}jkCard(x,y,48,rot,face,fl,al)});
  // 카드 베기 (카드 모양 빛)
  h.sl.forEach(s=>{const k=(t-s.t)/.3;if(k>1)return;const a=Math.atan2(s.y2-s.y1,s.x2-s.x1),L=Math.hypot(s.x2-s.x1,s.y2-s.y1);g.save();g.translate(s.x1,s.y1);g.rotate(a);g.globalCompositeOperation='lighter';g.globalAlpha=1-k;g.fillStyle=JKG;g.beginPath();g.moveTo(0,0);g.quadraticCurveTo(L*.5,-10*(1-k),L+30,0);g.quadraticCurveTo(L*.5,10*(1-k),0,0);g.fill();g.fillStyle='#ffffff';g.fillRect(0,-1,L+20,2);g.restore()});
  // ROYAL FLUSH
  if(t>2.2&&t<3.1){const k=t-2.2,al=Math.min(1,k/.1)*(k>.65?Math.max(0,1-(k-.65)/.25):1),x=A/2+(1-Math.min(1,k/.18))*-260;g.save();g.translate(x,A*.78);g.rotate(-.05);g.globalAlpha=al*fa;g.fillStyle='rgba(10,4,16,.86)';g.fillRect(-A,-34,A*2,68);g.strokeStyle=JKG;g.lineWidth=2;g.strokeRect(-A,-34,A*2,68);
    g.font='700 40px '+JKF;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#f3efe4';g.fillText('ROYAL FLUSH',0,2);g.restore()}
  // 조커 카드 : 떨어짐 → 뒤집힘 → 내리찍기
  if(h.lk&&t>2.3&&(!h.sm||t<3.2)){const ex=h.ex,ey=h.ey;let y,s=1,fl=1,face='back',rot=0;if(t<2.6){const k=(t-2.3)/.3;y=-100+(ey-60+100)*(1-Math.pow(1-k,3));rot=(1-k)*3}else if(t<2.75){y=ey-60;const q=(t-2.6)/.15;fl=Math.cos(q*Math.PI);face=q<.5?'back':'joker'}else if(t<2.88){y=ey-60-(t-2.75)/.13*30;face='joker';s=1+(t-2.75)*1.5}else{const q=(t-2.88)/.32;y=ey;face='joker';s=1.2+q*.6;g.globalAlpha=1}
    const al=t>2.88?Math.max(0,1-(t-2.88)/.32):1;g.save();g.globalCompositeOperation='lighter';glow(JKG,ex,y,110*s,.45*al);g.restore();jkCard(ex,y,96*s,rot,face,fl,al)}
  // HA HA HA
  if(t>2.62&&t<3.5){const k=t-2.62;g.save();g.globalAlpha=Math.min(1,k/.08)*(k>.6?Math.max(0,1-(k-.6)/.28):1);g.textAlign='center';g.textBaseline='middle';g.lineJoin='round';
    [[-.3,.22,-.2,64],[.32,.3,.15,54],[0,.12,0,80],[-.18,.62,.1,46],[.24,.66,-.12,50]].forEach(([dx,dy,r,fs],i)=>{const sc=1+Math.max(0,.4-k*2)+Math.sin(k*20+i)*.04;g.save();g.translate(A/2+dx*A,dy*A+Math.sin(k*10+i)*5);g.rotate(r);g.scale(sc,sc);g.font='700 '+fs+'px '+JKF;g.lineWidth=fs*.16;g.strokeStyle='#0a0410';g.strokeText('HA',0,0);g.fillStyle=i%2?'#d8b0ff':JKG;g.fillText('HA',0,0);g.restore()});g.restore()}};
Object.assign(DMGK,{joker:1.33});
// 아이콘 : 조커 (광대 얼굴 + 카드)
EMB.joker=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*2.4)*.06);
  g.save();g.rotate(-.35);g.translate(-13,6);g.fillStyle='#f3efe4';g.strokeStyle='#0a0410';g.lineWidth=1.5;g.fillRect(-7,-10,14,20);g.strokeRect(-7,-10,14,20);g.fillStyle=JKR;g.font='700 9px '+JKF;g.textAlign='center';g.textBaseline='middle';g.fillText('J',0,0);g.restore();
  g.save();g.rotate(.35);g.translate(13,6);g.fillStyle='#f3efe4';g.strokeStyle='#0a0410';g.lineWidth=1.5;g.fillRect(-7,-10,14,20);g.strokeRect(-7,-10,14,20);g.fillStyle='#0a0410';g.font='9px serif';g.textAlign='center';g.textBaseline='middle';g.fillText('♠',0,0);g.restore();
  g.save();g.globalCompositeOperation='lighter';glow(JKG,0,-4,20,.3);g.restore();g.save();g.translate(0,2);jkJester(.78,1,.6+.4*Math.sin(clock*3));g.restore()};
document.querySelectorAll('#grid .tile').forEach(t=>{const i=+t.dataset.i,vc=DEF.filter(x=>x.vof===i).length;let em=t.querySelector('.vb');if(vc){if(!em){em=document.createElement('em');em.className='vb';t.appendChild(em)}em.textContent='+'+vc}});
Object.keys(ICC).forEach(k=>delete ICC[k]);mkDict();
;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ▶ 섹션 : extra23
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ===== extra23.js : 김지우 • 괴담콜렉터 · 김민채 • 다이어트 =====

// ======================================================================
// 김지우 • 괴담콜렉터 (괴담 수첩에 무서운 이야기를 모음)
// 패시브 괴담 수집 : 스킬로 맞힐 때마다 괴담 조각 · 3개면 괴담 1편 완성 (최대 6편) · 괴담 1편마다 피해 +3%
// 1) 빨간 휴지 파란 휴지 : 화장실 칸 문이 열리며 "빨간 휴지 줄까… 파란 휴지 줄까…" → 휴지가 날아와 칭칭 감음
// 2) 분신사바 : 상대 밑에 종이가 깔리고 펜이 혼자 움직여 "뒤 돌 아 봐" → 뒤에서 하얀 손이 잡아챔
// 3) ULT 백물어 : 촛불을 켜고 모은 괴담을 하나씩 읽음 · 한 편마다 촛불이 꺼지며 괴담이 덮침 → 다 꺼지면 "찾았다"
// ======================================================================
const KDF='"Galmuri11","Noto Sans KR",sans-serif',KDP='"Press Start 2P",monospace',KDC='#9fd0ff',KDR='#c8102e',KDB='#2d5bd6';
const KDN=['빨간 휴지 파란 휴지','분신사바','빨간 마스크','4층 엘리베이터','홍콩할매','자정의 거울'];
const NEW33=['gk_door','gk_whisper','gk_paper','gk_wrap','gk_slam','gk_board','gk_pen','gk_letter','gk_hand','gk_book','gk_candle','gk_tale','gk_snip','gk_elev','gk_claw','gk_mirror','gk_dark','gk_found'];
NEW33.forEach(n=>{if(!SND.includes(n))SND.push(n);if(!AUD[n])AUD[n]=new SoundPool('sounds/'+n+'.mp3',['gk_letter','gk_candle','gk_paper'].includes(n)?5:3)});
Object.assign(SLB,{gk_door:'괴담콜렉터 · 화장실 문 삐걱',gk_whisper:'괴담콜렉터 · 휴지 줄까… 속삭임',gk_paper:'괴담콜렉터 · 휴지 날아감',gk_wrap:'괴담콜렉터 · 휴지 칭칭',gk_slam:'괴담콜렉터 · 문 쾅',gk_board:'괴담콜렉터 · 분신사바 종이',gk_pen:'괴담콜렉터 · 펜이 혼자 움직임',gk_letter:'괴담콜렉터 · 글자 하나',gk_hand:'괴담콜렉터 · 하얀 손',gk_book:'괴담콜렉터 · 괴담 수첩',gk_candle:'괴담콜렉터 · 촛불 꺼짐',gk_tale:'괴담콜렉터 · 괴담 수집',gk_snip:'괴담콜렉터 · 빨간 마스크 가위',gk_elev:'괴담콜렉터 · 엘리베이터 문',gk_claw:'괴담콜렉터 · 홍콩할매 할퀴기',gk_mirror:'괴담콜렉터 · 거울 금감',gk_dark:'괴담콜렉터 · 촛불 다 꺼짐',gk_found:'괴담콜렉터 · 찾았다'});
const KDSK=[
  {n:'빨간 휴지 파란 휴지',w:.25,cd:8,c:(o,t)=>!t.hid&&dist(o,t)<520,f:(o,t)=>kdTp(o,t)},
  {n:'분신사바',w:.3,cd:10,c:(o,t)=>!t.hid&&!t.jump&&dist(o,t)<520,f:(o,t)=>kdBs(o,t)},
  {n:'백물어',w:.4,ult:1,c:(o,t)=>!t.hid,f:(o,t)=>kdUlt(o,t)}];
const KDI=DEF.findIndex(d=>d.name=='김지우');
DEF.push({name:'김지우 • 괴담콜렉터',gl:'괴',k:'kaidan',vof:KDI,r:27,sp:204,col:'#7fa6c9',hi:'#f0f6ff',dk:'#070b12',alt:{col:'#c23a4a',hi:'#ffe0e4',dk:'#1a0306'},alt2:{col:'#a89a6a',hi:'#fff6dc',dk:'#14110a'},sk:KDSK});
INFO['김지우 • 괴담콜렉터']={st:[8,7,7,8,7,10],p:'괴담 수집 · 스킬로 맞힐 때마다 괴담 조각 1개 · 3개 모이면 괴담 1편 완성 (처음 1편 · 최대 6편) · 괴담 1편마다 주는 피해 +3% · 궁극기는 모은 괴담 수만큼 촛불을 켬',
  sk:[['빨강 1.5×4+2 · 파랑 1.2×3+속박','상대 옆에 화장실 칸 문이 생기고 "빨간 휴지 줄까… 파란 휴지 줄까…" · 빨간 휴지면 칭칭 감겨 피를 흘리고 · 파란 휴지면 꽁꽁 묶여 못 움직임'],['1.5×4+4','상대 밑에 분신사바 종이가 깔리고 펜이 혼자 "뒤 · 돌 · 아 · 봐"를 씀 · 다 쓰면 상대 뒤에서 하얀 손이 튀어나와 잡아챔'],['2.5×괴담+6+괴담','촛불을 켜고 괴담 수첩을 읽음 (괴담 3~6편) · 한 편 읽을 때마다 촛불이 하나씩 꺼지며 그 괴담이 덮침 · 마지막 촛불이 꺼지면 어둠 속에서 "찾았다"']]};

// 패시브 : 괴담 수집
const _hurtKD=hurt;hurt=function(t,n,o){if(o&&o.d&&o.d.k=='kaidan'&&t&&t!=o&&n>0&&!t.dead){const a=[...arguments];a[1]=Math.round(n*(1+.03*(o.gkT||1))*10)/10;const hp0=t.hp,r=_hurtKD.apply(this,a);
    if(hp0-t.hp>0&&!(o.gkC>0)&&(o.gkT||1)<6){o.gkC=.45;o.gkF=(o.gkF||0)+1;if(o.gkF>=3){o.gkF=0;o.gkT=Math.min(6,(o.gkT||1)+1);o.gkNew=1.4;if(!SKIP){SFXa('gk_tale');auTxt(o.x,o.y-o.r-40,'괴담 수집 · '+KDN[(o.gkT-1)%6],KDC,.75)}}}return r}
  return _hurtKD.apply(this,arguments)};
const _updKD=update;update=function(dt){_updKD(dt);if(F)F.forEach(f=>{if(f.gkC>0)f.gkC-=dt;if(f.gkNew>0)f.gkNew-=dt})};
const _initKD=init;init=function(){_initKD.apply(this,arguments);if(F)F.forEach(f=>{f.gkT=1;f.gkF=0;f.gkC=0;f.gkNew=0})};
function kdBook(x,y,s,open,al){g.save();g.translate(x,y);g.scale(s,s);g.globalAlpha=al==null?1:al;const op=open==null?1:open;
  g.fillStyle='#1a1410';g.fillRect(-22*op-2,-15,44*op+4,30);g.fillStyle='#e8e0cc';g.beginPath();g.moveTo(0,-12);g.quadraticCurveTo(-11*op,-16,-21*op,-12);g.lineTo(-21*op,12);g.quadraticCurveTo(-11*op,8,0,12);g.closePath();g.fill();
  g.beginPath();g.moveTo(0,-12);g.quadraticCurveTo(11*op,-16,21*op,-12);g.lineTo(21*op,12);g.quadraticCurveTo(11*op,8,0,12);g.closePath();g.fill();
  g.strokeStyle='rgba(60,40,30,.5)';g.lineWidth=1;for(let i=0;i<4;i++){g.beginPath();g.moveTo(-18*op,-6+i*5);g.lineTo(-4,-6+i*5);g.moveTo(4,-6+i*5);g.lineTo(18*op,-6+i*5);g.stroke()}
  g.fillStyle=KDR;g.fillRect(-1,-14,2,28);g.restore()}
const _lowKD=lowHP;lowHP=function(f){_lowKD(f);if(f.d.k!='kaidan'||f.dead||f.hid)return;const n=f.gkT||1;
  g.save();g.font='400 10px '+KDF;g.textAlign='center';g.lineJoin='round';g.lineWidth=4;g.strokeStyle='#000';const s='괴담 '+n+'편';g.strokeText(s,f.x+6,f.y+f.r+21);g.fillStyle=n>=6?'#ff6a7a':KDC;g.fillText(s,f.x+6,f.y+f.r+21);
  kdBook(f.x-22,f.y+f.r+18,.32);for(let i=0;i<3;i++){g.fillStyle=i<(f.gkF||0)?KDC:'rgba(255,255,255,.18)';g.fillRect(f.x-10+i*8,f.y+f.r+26,6,3)}g.restore();
  if(f.gkNew>0){const u=1-f.gkNew/1.4;g.save();g.globalAlpha=u<.8?1:1-(u-.8)/.2;const x=f.x+Math.sin(u*9)*20*(1-u),y=f.y-f.r-60+u*60;g.translate(x,y);g.rotate(Math.sin(u*12)*.4);g.fillStyle='#e8e0cc';g.fillRect(-9,-12,18,24);g.fillStyle=KDR;g.font='9px serif';g.textAlign='center';g.fillText('怪',0,4);g.restore()}};

function kdTy(txt,t,spd){const L=[...txt];return L.slice(0,clamp(Math.floor(t/spd),0,L.length)).join('')}
// 공통 : 하얀 귀신 손
function kdHand(x,y,a,s,al){g.save();g.translate(x,y);g.rotate(a);g.scale(s,s);g.globalAlpha=al;g.fillStyle='#e8eef2';g.strokeStyle='#0a0e14';g.lineWidth=2;
  g.beginPath();g.moveTo(-40,-7);g.lineTo(-4,-9);g.lineTo(-4,9);g.lineTo(-40,7);g.closePath();g.fill();
  [[-9,-3.5,22],[-3,-1.2,26],[3,1.2,24],[9,3.5,19]].forEach(([yy,,L],i)=>{g.beginPath();g.moveTo(-6,yy-2.6);g.lineTo(L-4,yy-2+i*.4);g.quadraticCurveTo(L+1,yy,L-4,yy+2.4);g.lineTo(-6,yy+2.6);g.closePath();g.fill();g.stroke()});
  g.beginPath();g.moveTo(-6,-10);g.quadraticCurveTo(4,-18,8,-14);g.quadraticCurveTo(2,-9,-4,-6);g.fill();g.stroke();
  g.fillStyle='rgba(120,10,20,.6)';[[14,-3],[19,1],[16,4]].forEach(([xx,yy])=>{g.beginPath();g.arc(xx,yy,1.2,0,TAU);g.fill()});g.restore()}

// ---------- 1) 빨간 휴지 파란 휴지 ----------
function kdTp(o,t){const a=ang(t,o)+rnd(-.9,.9),x=clamp(t.x+Math.cos(a)*85,40,A-40),y=clamp(t.y+Math.sin(a)*85,60,A-30);HZ.push({k:'kdtp',o,tg:t,t:0,x,y,red:Math.random()<.5,n:0});SFXa('gk_door')}
HZX.kdtp=(h,dt,EN)=>{const o=h.o;let e=h.tg;if(!h.lk&&(!e||e.dead)){e=tgt(o);h.tg=e}if(!e)return h.t<1;
  if(h.t>=.3&&!h.w){h.w=1;SFXa('gk_whisper')}
  if(h.t>=1.0&&!h.lk){h.lk=1;h.ex=e.x;h.ey=e.y;SFXa('gk_paper');if(!SKIP)auTxt(h.x,h.y-70,h.red?'빨간 휴지!':'파란 휴지!',h.red?'#ff4a5a':'#5a8aff',.9)}
  if(h.lk&&!h.wr&&h.t>=1.2){h.wr=1;if(!e.dead&&!e.hid&&Math.hypot(e.x-h.ex,e.y-h.ey)<120){h.got=1;SFXa('gk_wrap');if(!h.red){e.stn=Math.max(e.stn,.9);e.cast=null}}}
  if(h.got&&!e.dead){if(!h.red&&h.t<2.1){e.x+=(h.ex-e.x)*Math.min(1,dt*6);e.y+=(h.ey-e.y)*Math.min(1,dt*6)}e.slow=Math.max(e.slow,h.red?.3:.8);
    const tk=h.red?[1.45,1.75,2.05,2.35]:[1.5,1.85,2.2];if(h.n<tk.length&&h.t>=tk[h.n]){h.n++;hurt(e,h.red?1.5:1.2,o,e.x,e.y,0,0);if(h.red)for(let i=0;i<5;i++)sparkP(e.x,e.y,rnd(-80,80),rnd(-120,20),'#a00010',2)}
    if(h.t>=2.5&&!h.fin){h.fin=1;if(h.red)hurt(e,2,o,e.x,e.y,0,1);else{hurt(e,1.6,o,e.x,e.y,0,1)}}}
  if(h.t>=2.6&&!h.sl){h.sl=1;SFXa('gk_slam');shake=Math.max(shake,5)}
  return h.t<3};
function kdDoor(x,y,op,al){g.save();g.globalAlpha=al;g.translate(x,y);g.fillStyle='rgba(0,0,0,.5)';g.beginPath();g.ellipse(0,4,32,8,0,0,TAU);g.fill();
  g.fillStyle='#03050a';g.fillRect(-24,-74,48,76);g.save();g.globalCompositeOperation='lighter';glow('#3a0a14',0,-36,40,.5*op);g.restore();
  // 안쪽 : 어둠 속 눈
  if(op>.4){g.fillStyle='#ff2030';g.globalAlpha=al*(op-.4)/.6*(.6+.4*Math.sin(clock*7));g.fillRect(-8,-46,4,2);g.fillRect(4,-46,4,2);g.globalAlpha=al}
  g.fillStyle='#5a6470';g.fillRect(-28,-80,4,84);g.fillRect(24,-80,4,84);g.fillRect(-28,-82,56,5);
  const w=48*(1-op*.82);g.fillStyle='#8a96a3';g.fillRect(-24,-74,w,70);g.strokeStyle='#2a3038';g.lineWidth=2;g.strokeRect(-24,-74,w,70);g.fillStyle='#2a3038';if(w>20)g.fillRect(-24+w-8,-42,4,8);
  g.fillStyle='rgba(0,0,0,.3)';g.fillRect(-24,-4,48,4);g.restore()}
function kdRibbon(x1,y1,x2,y2,col,u,ph){const L=Math.hypot(x2-x1,y2-y1),a=Math.atan2(y2-y1,x2-x1);g.save();g.translate(x1,y1);g.rotate(a);g.strokeStyle=col;g.lineWidth=7;g.lineCap='round';g.beginPath();for(let i=0;i<=20;i++){const q=i/20*u;g.lineTo(q*L,Math.sin(q*12+ph)*10*(1-q*.5))}g.stroke();g.strokeStyle='rgba(255,255,255,.55)';g.lineWidth=2;g.stroke();g.restore()}
HZP.kdtp=h=>{const t=h.t,op=t<.25?0:Math.min(1,(t-.25)/.4)*(t>2.6?Math.max(0,1-(t-2.6)/.08):1),al=t<.25?t/.25:t>2.7?Math.max(0,1-(t-2.7)/.3):1,col=h.red?KDR:KDB;
  g.save();g.translate(h.x,h.y);g.scale(1.25,1.25);g.translate(-h.x,-h.y);kdDoor(h.x,h.y,op,al);g.restore();
  // 속삭임
  if(t>.3&&t<1.1){const L=[['빨간 휴지 줄까…',.3],['파란 휴지 줄까…',.65]];L.forEach(([s,t0],i)=>{const k=t-t0;if(k<0)return;g.save();g.globalAlpha=Math.min(1,k/.1)*(t>.95?Math.max(0,1-(t-.95)/.15):1);g.font='17px '+KDF;g.textAlign='center';const vis=kdTy(s,k,.04);let x0=h.x-g.measureText(s).width/2;for(const ch of vis){const cw=g.measureText(ch).width;g.fillStyle=i?'#7aa0ff':'#ff6070';g.fillText(ch,x0+cw/2+rnd(-1,1),h.y-118-i*22+rnd(-1,1));x0+=cw}g.restore()})}
  // 휴지
  if(h.lk){const e=h.tg,ex=h.got&&e&&!e.dead?e.x:h.ex,ey=h.got&&e&&!e.dead?e.y:h.ey;if(t<1.25){const u=Math.min(1,(t-1)/.2);for(let i=0;i<3;i++)kdRibbon(h.x,h.y-50,ex,ey,i==1?'#f4f0e8':col,u,i*2+t*8)}
    if(h.got&&t<2.65){const R=(e?e.r:26)+6,k=Math.min(1,(t-1.2)/.25),fa=t>2.45?Math.max(0,1-(t-2.45)/.2):1;g.save();g.globalAlpha=fa;g.translate(ex,ey);for(let j=0;j<4;j++){g.strokeStyle=j%2?'#f4f0e8':col;g.lineWidth=6;g.beginPath();const a0=j*.8+t*(h.red?3:1);g.ellipse(0,(j-1.5)*R*.38,R*1.02,R*.32,Math.sin(t*2+j)*.15,a0,a0+TAU*k);g.stroke()}g.restore();
      if(h.red&&Math.random()<.4){g.save();g.fillStyle='#8a0010';g.beginPath();g.arc(ex+rnd(-R,R),ey+R*.6,rnd(1.5,3),0,TAU);g.fill();g.restore()}}}};

// ---------- 2) 분신사바 ----------
const KDL=['뒤','돌','아','봐'];
function kdBs(o,t){HZ.push({k:'kdbs',o,tg:t,t:0,x:t.x,y:t.y,rot:rnd(-.3,.3),n:0,px:t.x,py:t.y,P:[]});SFXa('gk_board')}
HZX.kdbs=(h,dt,EN)=>{const o=h.o,e=h.tg;if(!e||e.dead)return h.t<.3;const ST=[.45,.78,1.11,1.44];
  if(h.t<1.7){e.slow=Math.max(e.slow,.7);h.x+=(e.x-h.x)*Math.min(1,dt*1.5);h.y+=(e.y-h.y)*Math.min(1,dt*1.5)}
  if(h.t>=.3&&!h.pe){h.pe=1;SFXa('gk_pen')}
  // 펜 목표 : 글자 자리
  const tgI=Math.min(3,h.n),la=h.rot+(-2.2+tgI*1.1),tx=h.x+Math.cos(la)*52,ty=h.y+Math.sin(la)*36;h.px+=(tx-h.px)*Math.min(1,dt*9);h.py+=(ty-h.py)*Math.min(1,dt*9);h.P.push({x:h.px,y:h.py});if(h.P.length>40)h.P.shift();
  if(h.n<4&&h.t>=ST[h.n]){h.n++;h.lt=h.t;SFXa('gk_letter');if(!e.hid){hurt(e,1.5,o,e.x,e.y,0,0);e.stn=Math.max(e.stn,.12)}}
  if(h.t>=1.75&&!h.hd){h.hd=1;h.ha=Math.atan2(e.y-o.y,e.x-o.x);SFXa('gk_hand')}
  if(h.hd&&!h.gr&&h.t>=1.92){h.gr=1;if(!e.hid&&!e.jump){hurt(e,4,o,e.x,e.y,0,1);e.stn=Math.max(e.stn,.5);e.cast=null;safePush(e,h.ha+Math.PI,40);shake=Math.max(shake,10)}}
  return h.t<2.5};
HZD.kdbs=h=>{const al=h.t<.2?h.t/.2:h.t>2.2?Math.max(0,1-(h.t-2.2)/.3):1;g.save();g.translate(h.x,h.y);g.rotate(h.rot);g.globalAlpha=al;
  g.fillStyle='rgba(0,0,0,.4)';g.fillRect(-76,-52,156,108);g.fillStyle='#ece6d6';g.fillRect(-80,-56,160,112);g.strokeStyle='rgba(120,100,80,.25)';g.lineWidth=1;for(let i=-50;i<56;i+=12){g.beginPath();g.moveTo(-80,i);g.lineTo(80,i);g.stroke()}
  g.strokeStyle='#8a0010';g.lineWidth=2;g.beginPath();g.ellipse(0,0,22,16,0,0,TAU);g.stroke();g.font='14px '+KDF;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#2a1a14';g.fillText('O',-62,-40);g.fillText('X',62,-40);
  const CH='ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ';g.font='10px '+KDF;g.fillStyle='rgba(40,20,14,.65)';[...CH].forEach((c,i)=>{const a=-Math.PI+i/(CH.length-1)*Math.PI;g.fillText(c,Math.cos(a)*68,Math.sin(a)*44+6)});
  KDL.forEach((c,i)=>{const la=-2.2+i*1.1,on=i<h.n;g.font='16px '+KDF;g.fillStyle=on?'#c8102e':'rgba(40,20,14,.4)';g.fillText(c,Math.cos(la)*52,Math.sin(la)*36)});g.restore();
  // 펜 자국
  if(h.P.length>2){g.save();g.globalAlpha=al*.8;g.strokeStyle='#8a0010';g.lineWidth=1.6;g.beginPath();h.P.forEach((p,i)=>i?g.lineTo(p.x,p.y):g.moveTo(p.x,p.y));g.stroke();g.restore()}};
HZP.kdbs=h=>{const al=h.t<.2?h.t/.2:h.t>2.2?Math.max(0,1-(h.t-2.2)/.3):1;
  // 펜 (혼자 움직임)
  if(h.t>.25&&h.t<2.3){g.save();g.globalAlpha=al;g.translate(h.px,h.py);g.rotate(-.7+Math.sin(h.t*14)*.08);g.fillStyle='#c8102e';g.fillRect(-3,-40,6,36);g.fillStyle='#1a1a1a';g.beginPath();g.moveTo(-3,-4);g.lineTo(3,-4);g.lineTo(0,2);g.closePath();g.fill();g.fillStyle='#f0f0f0';g.fillRect(-3,-44,6,5);g.restore()}
  // 주문
  if(h.t<1.6){g.save();g.globalAlpha=al*Math.min(1,h.t/.2)*.9;g.font='13px '+KDF;g.textAlign='center';g.fillStyle='#c8d8e8';g.fillText('분신사바 분신사바…',h.x+rnd(-.8,.8),h.y-74);g.restore()}
  // 방금 쓴 글자 크게
  if(h.lt&&h.t-h.lt<.4){const k=(h.t-h.lt)/.4;g.save();g.globalAlpha=1-k;g.font=(30+k*20)+'px '+KDF;g.textAlign='center';g.textBaseline='middle';g.lineWidth=5;g.strokeStyle='#000';g.strokeText(KDL[h.n-1],h.x,h.y-100-k*16);g.fillStyle='#ff2a3a';g.fillText(KDL[h.n-1],h.x,h.y-100-k*16);g.restore()}
  // 뒤에서 튀어나오는 손
  const e=h.tg;if(h.hd&&e&&h.t<2.45){const k=h.t-1.75,u=Math.min(1,k/.17),fa=k>.5?Math.max(0,1-(k-.5)/.2):1,a=h.ha+Math.PI,R=e.r+60*(1-u)+6,x=e.x+Math.cos(h.ha)*R,y=e.y+Math.sin(h.ha)*R;
    g.save();g.globalAlpha=fa*.6;g.strokeStyle='#05070a';g.lineWidth=14;g.lineCap='round';g.beginPath();g.moveTo(e.x+Math.cos(h.ha)*(R+60),e.y+Math.sin(h.ha)*(R+60));g.lineTo(x,y);g.stroke();g.restore();kdHand(x,y,a,1.1,fa);
    if(k>.17&&k<.4){g.save();g.globalAlpha=(1-(k-.17)/.23)*.7;g.fillStyle='#000';g.fillRect(-60,-60,A+120,A+120);g.restore()}}};

// ---------- 3) ULT 백물어 ----------
const KDD=1.1;
function kdUlt(o,t){if(!t||t.dead)t=tgt(o);if(!t)return;const N=clamp(o.gkT||1,3,6);HZ.push({k:'kdul',o,tg:t,t:0,N,n:0,cs:[],v:[]})}
HZX.kdul=(h,dt,EN)=>{const o=h.o;let e=h.tg;const u=h.t-KDD;h.u=u;if(u<0)return true;if(!h.lk&&(!e||e.dead)){e=tgt(o);h.tg=e}if(!e)return u<1;if(!o.dead){o.gcd=Math.max(o.gcd,.4);o.cast=null}
  if(!h.bk){h.bk=1;SFXa('gk_book')}
  if(u>=.3&&!h.lk){h.lk=1;h.ex=e.x;h.ey=e.y;for(let i=0;i<h.N;i++){const a=-Math.PI/2+i*TAU/h.N;h.cs.push({x:clamp(e.x+Math.cos(a)*95,20,A-20),y:clamp(e.y+Math.sin(a)*80,30,A-10),on:1})}}
  if(h.lk&&!e.dead&&!h.fin2){e.x+=(h.ex-e.x)*Math.min(1,dt*8);e.y+=(h.ey-e.y)*Math.min(1,dt*8);e.stn=Math.max(e.stn,.15);e.cast=null}
  const T0=.75,ST=.4,tD=T0+h.N*ST+.05;
  if(h.lk&&h.n<h.N&&u>=T0+h.n*ST){const i=h.n++;h.cs[i].on=0;h.cs[i].off=u;h.v.push({i:(o.gkT>=6?i:i)%6,t:u});SFXa('gk_candle');const vs=['gk_paper','gk_letter','gk_snip','gk_elev','gk_claw','gk_mirror'][i%6];SFXa(vs);if(!e.dead&&!e.hid){hurt(e,2.5,o,e.x,e.y,0,0);shake=Math.max(shake,6)}}
  if(u>=tD&&!h.dk){h.dk=1;SFXa('gk_dark')}
  if(u>=tD+.45&&!h.fd){h.fd=1;SFXa('gk_found')}
  if(u>=tD+.75&&!h.fin2){h.fin2=1;shake=Math.max(shake,26);hs=.14;if(!e.dead&&!e.hid){hurt(e,6+h.N,o,e.x,e.y,0,1);e.stn=Math.max(e.stn,.5);if(typeof lkImp=='function')lkImp(e.x,e.y,150,'#e8eef2')}for(let i=0;i<20;i++)sparkP(h.ex,h.ey,rnd(-260,260),rnd(-260,260),'#cfe0ff',3)}
  h.tD=tD;return u<tD+1.3};
HZD.kdul=h=>{const u=h.u;if(!(u>=0))return;const tD=h.tD||9,on=h.cs.filter(c=>c.on).length,dark=u<tD?.55+.3*(1-on/Math.max(1,h.N)):u<tD+.75?.97:Math.max(0,.97-(u-tD-.75)/.5),fa=Math.min(1,u/.3);if(typeof lkDim=='function')lkDim(dark*fa)};
function kdCandle(x,y,on,off,u){g.save();g.translate(x,y);g.fillStyle='rgba(0,0,0,.4)';g.beginPath();g.ellipse(0,2,9,3,0,0,TAU);g.fill();g.fillStyle='#e8e2d0';g.fillRect(-5,-22,10,22);g.fillStyle='#c8c0a8';g.fillRect(-5,-22,10,3);g.strokeStyle='#222';g.lineWidth=1;g.beginPath();g.moveTo(0,-22);g.lineTo(0,-26);g.stroke();
  if(on){const fl=Math.sin(clock*20+x)*1.5;g.save();g.globalCompositeOperation='lighter';glow('#ffb04a',0,-32,46,.55);glow('#fff0c0',0,-31,12,.9);g.restore();g.fillStyle='#ffd27a';g.beginPath();g.moveTo(0,-40+fl);g.quadraticCurveTo(5,-30,0,-26);g.quadraticCurveTo(-5,-30,0,-40+fl);g.fill()}
  else if(off!=null&&u-off<1){const k=u-off;g.globalAlpha=1-k;g.strokeStyle='#9aa4b0';g.lineWidth=2;g.beginPath();for(let i=0;i<8;i++)g.lineTo(Math.sin(i*1.2+k*6)*4*i/8,-26-i*5-k*20);g.stroke()}g.restore()}
// 괴담 장면 (한 편씩)
function kdVignette(i,x,y,k,R){const a=Math.max(0,1-k/.45);if(a<=0)return;g.save();g.globalAlpha=a;g.translate(x,y);
  if(i==0){[KDR,'#f4f0e8',KDB].forEach((c,j)=>{g.strokeStyle=c;g.lineWidth=7;g.beginPath();g.ellipse(0,(j-1)*12,R*1.1,R*.35,.2*(j-1),k*8,k*8+TAU*Math.min(1,k*4));g.stroke()})}
  else if(i==1){g.strokeStyle='#ff2a3a';g.lineWidth=6;g.lineCap='round';const L=R*1.4*Math.min(1,k*6);g.beginPath();g.moveTo(-L,-L);g.lineTo(L,L);g.moveTo(L,-L);g.lineTo(-L,L);g.stroke()}
  else if(i==2){const c=Math.min(1,k*5),op=.7*(1-c);[-1,1].forEach(sd=>{g.save();g.rotate(sd*op);g.fillStyle='#d8dde4';g.strokeStyle='#222';g.lineWidth=2;g.beginPath();g.moveTo(-R*1.6,sd*3);g.lineTo(R*.6,sd*1);g.lineTo(R*.6,sd*5);g.closePath();g.fill();g.stroke();g.strokeStyle=KDR;g.lineWidth=4;g.beginPath();g.ellipse(R*.95,sd*8,9,6,0,0,TAU);g.stroke();g.restore()});
    g.fillStyle='rgba(255,255,255,.9)';g.font='12px '+KDF;g.textAlign='center';g.fillText('나 예뻐?',0,-R-22)}
  else if(i==3){const c=Math.min(1,k*5),W=R*1.5;g.fillStyle='#7a828c';g.strokeStyle='#22262c';g.lineWidth=2;g.fillRect(-W,-R*1.6,W*c,R*3.2);g.strokeRect(-W,-R*1.6,W*c,R*3.2);g.fillRect(W-W*c,-R*1.6,W*c,R*3.2);g.strokeRect(W-W*c,-R*1.6,W*c,R*3.2);
    g.fillStyle='#000';g.fillRect(-14,-R*1.6-24,28,18);g.fillStyle='#ff3040';g.font='14px '+KDP;g.textAlign='center';g.textBaseline='middle';g.fillText('4',0,-R*1.6-14)}
  else if(i==4){[-1,1].forEach(sd=>{g.save();g.globalCompositeOperation='lighter';glow('#d0ff40',sd*R*.8,-R*1.4,14,.9);g.restore();g.fillStyle='#000';g.fillRect(sd*R*.8-1,-R*1.4-6,2,12)});g.strokeStyle='#e8eef2';g.lineWidth=4;g.lineCap='round';const L=Math.min(1,k*6);for(let j=-1;j<=1;j++){g.beginPath();g.moveTo(-R+j*10,-R);g.lineTo(-R+j*10+R*2*L,-R+R*2*L);g.stroke()}}
  else{g.strokeStyle='rgba(220,235,255,.95)';g.lineWidth=2;g.beginPath();for(let j=0;j<9;j++){const an=j*TAU/9,L=R*1.5*Math.min(1,k*6);g.moveTo(0,0);g.lineTo(Math.cos(an)*L*.5,Math.sin(an)*L*.5+3);g.lineTo(Math.cos(an+.1)*L,Math.sin(an+.1)*L)}g.stroke()}
  g.restore()}
function kdFace(x,y,s,al){g.save();g.translate(x,y);g.scale(s,s);g.globalAlpha=al;
  // 긴 머리 (뒤)
  g.fillStyle='#030406';g.beginPath();g.moveTo(-62,-50);g.quadraticCurveTo(0,-104,62,-50);g.lineTo(74,130);g.quadraticCurveTo(30,112,0,140);g.quadraticCurveTo(-30,112,-74,130);g.closePath();g.fill();
  const fg=g.createRadialGradient(6,0,8,0,4,58);fg.addColorStop(0,'#eef3f5');fg.addColorStop(1,'#6e7c88');g.fillStyle=fg;g.beginPath();g.ellipse(0,8,38,52,0,0,TAU);g.fill();
  // 눈 하나 (다른 쪽은 머리카락에 가려짐)
  g.fillStyle='#14070a';g.beginPath();g.ellipse(13,0,10,7,-.1,0,TAU);g.fill();g.fillStyle='#e8e0d8';g.beginPath();g.ellipse(13,0,7,5,-.1,0,TAU);g.fill();g.fillStyle='#b0101e';g.beginPath();g.arc(12,0,3,0,TAU);g.fill();g.fillStyle='#000';g.beginPath();g.arc(12,0,1.4,0,TAU);g.fill();
  g.strokeStyle='rgba(60,20,30,.6)';g.lineWidth=1.5;g.beginPath();g.moveTo(4,10);g.quadraticCurveTo(13,14,22,9);g.stroke();
  // 입 : 가는 미소
  g.strokeStyle='#2a0a10';g.lineWidth=2;g.beginPath();g.moveTo(-6,34);g.quadraticCurveTo(6,40,18,31);g.stroke();
  // 앞 머리카락 (얼굴 반을 가림)
  g.fillStyle='#030406';g.beginPath();g.moveTo(-40,-38);g.quadraticCurveTo(-4,-62,8,-40);g.quadraticCurveTo(-2,10,4,70);g.quadraticCurveTo(-20,60,-42,76);g.closePath();g.fill();
  g.strokeStyle='#030406';g.lineWidth=1.4;for(let i=0;i<9;i++){const xx=4+i*3.5;g.beginPath();g.moveTo(xx-6,-44);g.quadraticCurveTo(xx+Math.sin(i)*4,10,xx-2+Math.sin(i*2)*5,40+i*4);g.stroke()}
  g.restore()}
HZP.kdul=h=>{const u=h.u;if(!(u>=0))return;const o=h.o,tD=h.tD||9,e=h.tg;
  // 괴담 수첩
  if(u<tD&&!o.dead){const op=Math.min(1,u/.3);kdBook(o.x,o.y-o.r-34+Math.sin(clock*3)*2,1.1,op,1);if(Math.random()<.3)sparkP(o.x+rnd(-20,20),o.y-o.r-40,0,-30,KDC,1.5)}
  h.cs.forEach(c=>kdCandle(c.x,c.y,c.on,c.off,u));
  // 괴담 이름 (언더테일 대사 상자)
  if(h.n>0&&u<tD){const v=h.v[h.v.length-1],k=u-v.t,bw=300,bx=A/2,by=A-70;g.save();g.fillStyle='#000';g.fillRect(bx-bw/2,by-24,bw,48);g.strokeStyle='#fff';g.lineWidth=4;g.strokeRect(bx-bw/2,by-24,bw,48);g.font='16px '+KDF;g.textAlign='left';g.textBaseline='middle';g.fillStyle='#fff';
    g.fillText('* '+kdTy(KDN[v.i]+'…',k,.04),bx-bw/2+16,by+1);g.font='10px '+KDP;g.fillStyle='#ff0';g.textAlign='right';g.fillText(h.n+'/'+h.N,bx+bw/2-12,by+1);g.restore()}
  if(h.lk&&e){const R=e.r;h.v.forEach(v=>kdVignette(v.i,h.ex,h.ey,u-v.t,R))}
  // 찾았다
  if(u>=tD+.4&&u<tD+1.3){const k=u-tD-.4,s=1+Math.min(1,k/.35)*.35,al=k<.1?k/.1:k>.65?Math.max(0,1-(k-.65)/.25):1;kdFace(h.ex+(k<.35?rnd(-2,2):0),h.ey-30,s,al);
    if(k<.5){g.save();g.globalAlpha=al;g.font='26px '+KDF;g.textAlign='center';const s2='찾았다';let x0=h.ex-g.measureText(s2).width/2;for(const ch of kdTy(s2,k,.1)){const cw=g.measureText(ch).width;g.fillStyle='#ff2030';g.fillText(ch,x0+cw/2+rnd(-2,2),h.ey-130+rnd(-2,2));x0+=cw}g.restore()}}};
Object.assign(DMGK,{kaidan:1.14});
// 아이콘 : 괴담 수첩 + 촛불
EMB.kaidan=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*1.8)*.05);g.save();g.translate(0,5);g.fillStyle='#1a1410';g.fillRect(-17,-11,34,22);g.fillStyle='#e8e0cc';g.fillRect(-15,-9,14,18);g.fillRect(1,-9,14,18);g.fillStyle=KDR;g.fillRect(-1,-10,2,20);
  g.fillStyle='#8a0010';g.font='10px serif';g.textAlign='center';g.textBaseline='middle';g.fillText('怪',-8,0);g.fillStyle='rgba(60,40,30,.6)';for(let i=0;i<3;i++)g.fillRect(4,-5+i*5,8,1);g.restore();
  const fl=Math.sin(clock*18)*1;g.save();g.globalCompositeOperation='lighter';glow('#ffb04a',0,-16,16,.6);g.restore();g.fillStyle='#e8e2d0';g.fillRect(-2.5,-12,5,7);g.fillStyle='#ffd27a';g.beginPath();g.moveTo(0,-22+fl);g.quadraticCurveTo(3.5,-15,0,-12);g.quadraticCurveTo(-3.5,-15,0,-22+fl);g.fill();
  g.fillStyle='rgba(255,40,50,.9)';g.fillRect(-13,-20,2.5,1.5);g.fillRect(10.5,-20,2.5,1.5)};

// ======================================================================
// 김민채 • 다이어트 (여전히 무겁지만 다이어트 중 · 요요 주의)
// 패시브 요요 : 몸무게 170kg에서 시작 · 운동 스킬을 쓰면 빠지고 (최소 120kg) 체력이 75 · 50 · 25 아래로 떨어질 때마다 스트레스 폭식 +8kg
//   가벼울수록 작아지고 빨라짐 · 무거울수록 커지고 느려지지만 몸으로 하는 공격이 세짐
// 1) 훌라후프 : 허리에서 훌라후프가 점점 커지며 돌다가 상대에게 굴러감 (-7kg)
// 2) 줄넘기 : 그 자리에서 줄넘기 · 착지할 때마다 땅이 울림 · 1! 2! 3! 4! 5! … 100! (-9kg)
// 3) ULT 치팅데이 : 하늘에서 음식이 쏟아짐 → 다 먹고 +40kg → 높이 뛰어올라 내리찍기 → 체중계 "다이어트는 내일부터…"
// ======================================================================
const DTC='#4fd18b',DTF='"Galmuri11","Noto Sans KR",sans-serif';
const NEW34=['dt_hoop','dt_fling','dt_hoophit','dt_rope','dt_land','dt_count','dt_huff','dt_burn','dt_snack','dt_food','dt_munch','dt_grow','dt_jump','dt_press','dt_scale','dt_sigh'];
NEW34.forEach(n=>{if(!SND.includes(n))SND.push(n);if(!AUD[n])AUD[n]=new SoundPool('sounds/'+n+'.mp3',['dt_munch','dt_land','dt_rope','dt_count','dt_hoophit'].includes(n)?5:3)});
Object.assign(SLB,{dt_hoop:'다이어트 · 훌라후프 돌리기',dt_fling:'다이어트 · 훌라후프 던지기',dt_hoophit:'다이어트 · 훌라후프 맞음',dt_rope:'다이어트 · 줄넘기 휙',dt_land:'다이어트 · 착지 쿵',dt_count:'다이어트 · 줄넘기 숫자',dt_huff:'다이어트 · 헉헉',dt_burn:'다이어트 · 살 빠짐',dt_snack:'다이어트 · 스트레스 폭식',dt_food:'다이어트 · 음식 쏟아짐',dt_munch:'다이어트 · 와구와구',dt_grow:'다이어트 · 몸이 불어남',dt_jump:'다이어트 · 높이 점프',dt_press:'다이어트 · 내리찍기',dt_scale:'다이어트 · 체중계 삐빅',dt_sigh:'다이어트 · 내일부터…'});
const DTSK=[
  {n:'훌라후프',w:.25,cd:7.5,c:(o,t)=>!t.hid&&dist(o,t)<420,f:(o,t)=>dtHoop(o,t)},
  {n:'줄넘기',w:.3,cd:10,c:(o,t)=>!t.hid&&dist(o,t)<340,f:(o,t)=>dtRope(o,t)},
  {n:'치팅데이',w:.4,ult:1,c:(o,t)=>!t.hid&&dist(o,t)<460,f:(o,t)=>dtUlt(o,t)}];
const DTI=DEF.findIndex(d=>d.name=='김민채');
DEF.push({name:'김민채 • 다이어트',gl:'다',k:'diet',heavy:1,vof:DTI,r:36,sp:160,col:'#4fd18b',hi:'#eaffef',dk:'#062a16',alt:{col:'#ff7a3c',hi:'#fff0e0',dk:'#3a1404'},alt2:{col:'#4aa8ff',hi:'#e6f4ff',dk:'#061e3a'},sk:DTSK});
INFO['김민채 • 다이어트']={st:[7,8,6,7,7,10],p:'요요 · 170kg에서 시작 · 운동하면 살이 빠지고 (최소 120kg) 체력이 75 · 50 · 25 아래로 떨어질 때마다 스트레스 폭식 +8kg · 가벼우면 작고 빨라지고 · 무거우면 크고 느리지만 몸으로 하는 공격이 세짐',
  sk:[['1.6×n+5 (몸무게 비례)','허리에서 훌라후프를 돌림 · 점점 커지며 닿는 상대를 계속 때리다가 상대에게 던져 벽을 튕기며 굴러감 · -7kg'],['1.3×5+3.5 (몸무게 비례)','그 자리에서 줄넘기 · 착지할 때마다 땅이 울려 주변 피해 · 1! 2! 3! 4! 5! … 마지막 "100!"은 높이 뛰어 크게 쿵 (기절) · -9kg'],['15+몸무게','하늘에서 치킨 · 피자 · 케이크가 쏟아짐 → 와구와구 다 먹고 +40kg → 높이 뛰어올라 상대에게 내리찍기 (무거울수록 셈) → 체중계 삐빅 "다이어트는 내일부터…"']]};

// 패시브 : 몸무게
const dtWf=f=>(f.dtW||170)/170;
function dtLose(f,kg){const w0=f.dtW||170;f.dtW=Math.max(120,w0-kg);const d=Math.round(w0-f.dtW);if(d>0&&!SKIP){auTxt(f.x,f.y-f.r-34,'-'+d+'kg',DTC,.8);SFXa('dt_burn');for(let i=0;i<8;i++)sparkP(f.x+rnd(-f.r,f.r),f.y+rnd(-f.r,f.r),rnd(-40,40),rnd(-120,-40),'#bfffd8',2)}f.dtSw=1.6;if(f.dtW<=130&&!f.dtLt){f.dtLt=1;if(!SKIP)auTxt(f.x,f.y-f.r-58,'몸이 가벼워졌다!','#bfffd8',.8)}}
const _updDT=update;update=function(dt){_updDT(dt);if(!F)return;F.forEach(f=>{if(f.d.k!='diet'||f.dead)return;const W=f.dtW||170,tr=24+(W-110)*.2;f.r+=(tr-f.r)*Math.min(1,dt*4);f.sp=clamp(160+(170-W)*1.5,95,240);if(f.dtSw>0)f.dtSw-=dt;if(f.dtSn>0)f.dtSn-=dt;
  if(phase=='play'){[75,50,25].forEach((th,i)=>{if(f.hp<th&&!(f.dtH&1<<i)){f.dtH=(f.dtH||0)|1<<i;f.dtW=Math.min(220,W+8);f.dtSn=1;if(!SKIP){SFXa('dt_snack');auTxt(f.x,f.y-f.r-34,'스트레스 폭식 +8kg','#ffb04a',.8)}}})}})};
const _initDT=init;init=function(){_initDT.apply(this,arguments);if(F)F.forEach(f=>{f.dtW=170;f.dtH=0;f.dtSw=0;f.dtSn=0;f.dtZ=0;f.dtLt=0})};
// 공중에 뜬 그림 (줄넘기)
const _ballDT=ball;ball=function(f,t){if(f&&f.dtZ>0&&phase!='icon'){g.save();g.translate(0,-f.dtZ);const r=_ballDT.apply(this,arguments);g.restore();return r}return _ballDT.apply(this,arguments)};
function dtFood(i,x,y,s,rot){g.save();g.translate(x,y);g.rotate(rot||0);g.scale(s,s);g.lineJoin='round';g.strokeStyle='#2a1406';g.lineWidth=2;
  if(i==0){g.fillStyle='#f4efe4';g.beginPath();g.ellipse(13,-1,5,3.5,0,0,TAU);g.fill();g.stroke();g.fillRect(4,-2,9,4);g.fillStyle='#c8762a';g.beginPath();g.ellipse(-4,0,12,9,-.2,0,TAU);g.fill();g.stroke();g.fillStyle='#e8a050';g.beginPath();g.ellipse(-7,-3,5,3,-.3,0,TAU);g.fill()}
  else if(i==1){g.fillStyle='#e8b04a';g.beginPath();g.moveTo(-14,-10);g.lineTo(14,-10);g.lineTo(0,16);g.closePath();g.fill();g.stroke();g.fillStyle='#d08a2a';g.fillRect(-15,-13,30,5);g.fillStyle='#c0202a';[[-5,-4],[4,-3],[0,5]].forEach(([a,b])=>{g.beginPath();g.arc(a,b,2.6,0,TAU);g.fill()})}
  else if(i==2){g.fillStyle='#fff4e8';g.beginPath();g.moveTo(-14,8);g.lineTo(14,8);g.lineTo(14,-4);g.lineTo(-6,-10);g.lineTo(-14,-4);g.closePath();g.fill();g.stroke();g.fillStyle='#ff8fb8';g.fillRect(-14,0,28,3);g.fillStyle='#e0203a';g.beginPath();g.arc(2,-10,3.5,0,TAU);g.fill()}
  else{g.fillStyle='#d8963a';g.beginPath();g.ellipse(0,-5,14,7,0,Math.PI,TAU);g.fill();g.stroke();g.fillStyle='#4a8a2a';g.fillRect(-15,-5,30,3);g.fillStyle='#6a3416';g.fillRect(-14,-2,28,5);g.fillStyle='#d8963a';g.fillRect(-14,3,28,4);g.strokeRect(-14,-5,28,12)}
  g.restore()}
const _lowDT=lowHP;lowHP=function(f){_lowDT(f);if(f.d.k!='diet'||f.dead||f.hid)return;const W=Math.round(f.dtW||170),z=f.dtZ||0;
  if(z>0){g.save();g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.ellipse(f.x,f.y+f.r*.8,f.r*(1-z/200),f.r*.3*(1-z/200),0,0,TAU);g.fill();g.restore()}
  g.save();g.font='400 11px '+DTF;g.textAlign='center';g.lineJoin='round';g.lineWidth=4;g.strokeStyle='#000';const s=W+'kg';g.strokeText(s,f.x,f.y+f.r+20);g.fillStyle=W<=135?'#bfffd8':W>=185?'#ffb04a':'#ffffff';g.fillText(s,f.x,f.y+f.r+20);
  g.fillStyle='rgba(0,0,0,.6)';g.fillRect(f.x-24,f.y+f.r+25,48,3);g.fillStyle=W>=185?'#ffb04a':DTC;g.fillRect(f.x-24,f.y+f.r+25,48*clamp((W-120)/100,0,1),3);g.restore();
  if(f.dtSw>0){for(let i=0;i<2;i++){const p=((clock*1.4+i*.5)%1),sd=i?1:-1;g.save();g.globalAlpha=Math.min(1,f.dtSw)*(1-p);g.fillStyle='#bfe8ff';g.beginPath();const x=f.x+sd*f.r*.75,y=f.y-f.r*.5-z+p*20;g.moveTo(x,y-6);g.quadraticCurveTo(x+4,y,x,y+3);g.quadraticCurveTo(x-4,y,x,y-6);g.fill();g.restore()}}
  if(f.dtSn>0){const u=1-f.dtSn;g.save();g.globalAlpha=u<.8?1:1-(u-.8)/.2;dtFood(Math.floor(clock)%4,f.x+(1-Math.min(1,u*2))*40,f.y-f.r-10-z-(1-Math.min(1,u*2))*20,.8*(1-Math.max(0,u-.5)),u*6);g.restore()}};

// ---------- 1) 훌라후프 ----------
function dtHoop(o,t){HZ.push({k:'dthp',o,tg:t,t:0,R:o.r+6,hc:new Map(),b:0});SFXa('dt_hoop');dtLose(o,7)}
HZX.dthp=(h,dt,EN)=>{const o=h.o;let e=h.tg;if(!e||e.dead){e=tgt(o);h.tg=e}const wf=dtWf(o);
  if(!h.th){if(o.dead)return false;h.x=o.x;h.y=o.y;h.R=o.r+6+64*Math.min(1,h.t/.8);
    EN.forEach(x=>{if(x.hid||x.jump)return;const d=Math.hypot(x.x-o.x,x.y-o.y);if(d<h.R+x.r&&(h.hc.get(x)||0)<=h.t){h.hc.set(x,h.t+.3);hurt(x,1.6*wf,o,x.x,x.y,0,0);safePush(x,Math.atan2(x.y-o.y,x.x-o.x),16);SFXa('dt_hoophit')}});
    if(h.t>=1.2){h.th=1;h.a=e?ang(o,e):0;h.hc=new Map();SFXa('dt_fling')}return true}
  if(!h.end){const v=540;h.x+=Math.cos(h.a)*v*dt;h.y+=Math.sin(h.a)*v*dt;let bx=0;if(h.x<h.R*.4&&Math.cos(h.a)<0){h.a=Math.PI-h.a;bx=1}if(h.x>A-h.R*.4&&Math.cos(h.a)>0){h.a=Math.PI-h.a;bx=1}if(h.y<h.R*.3&&Math.sin(h.a)<0){h.a=-h.a;bx=1}if(h.y>A-h.R*.3&&Math.sin(h.a)>0){h.a=-h.a;bx=1}
    if(bx){h.b++;SFXa('dt_hoophit');shake=Math.max(shake,4)}if(e&&!e.hid&&h.b>0){const ta=Math.atan2(e.y-h.y,e.x-h.x);h.a+=Math.atan2(Math.sin(ta-h.a),Math.cos(ta-h.a))*Math.min(1,dt*2)}
    EN.forEach(x=>{if(x.hid||x.jump)return;if(Math.hypot(x.x-h.x,x.y-h.y)<h.R*.55+x.r&&(h.hc.get(x)||0)<=h.t){h.hc.set(x,h.t+.5);hurt(x,5*wf,o,x.x,x.y,0,wf>1.1?1:0);safePush(x,h.a,30);SFXa('dt_hoophit');shake=Math.max(shake,8)}});
    if(h.b>=2||h.t>2.9){h.end=h.t}return true}
  return h.t<h.end+.3};
function dtHoopDraw(x,y,R,ph,al,tilt){g.save();g.translate(x,y);g.globalAlpha=al;g.lineWidth=5;g.lineCap='butt';const n=12;for(let i=0;i<n;i++){const a0=ph+i*TAU/n;g.strokeStyle=i%2?'#ffffff':DTC;g.beginPath();g.ellipse(0,0,R,R*tilt,0,a0,a0+TAU/n);g.stroke()}g.restore()}
HZP.dthp=h=>{const o=h.o;if(!h.th){if(o.dead)return;const z=o.dtZ||0;g.save();g.globalCompositeOperation='lighter';glow(DTC,o.x,o.y,h.R*1.2,.15);g.restore();
    for(let k=1;k<4;k++)dtHoopDraw(o.x,o.y-z,h.R,-h.t*18-k*.35,.18/k,.42);dtHoopDraw(o.x,o.y-z,h.R,-h.t*18,1,.42);return}
  const al=h.end?Math.max(0,1-(h.t-h.end)/.3):1,ph=-h.t*20;for(let k=1;k<4;k++)dtHoopDraw(h.x-Math.cos(h.a)*k*12,h.y-Math.sin(h.a)*k*12,h.R*.6,ph,al*.2/k,.9);dtHoopDraw(h.x,h.y,h.R*.6,ph,al,.9)};

// ---------- 2) 줄넘기 ----------
const DTJ=[.15,.47,.79,1.11,1.43,1.82],DTN=['1!','2!','3!','4!','5!','100!'];
function dtRope(o,t){HZ.push({k:'dtrp',o,t:0,n:0,ln:0});dtLose(o,9)}
HZX.dtrp=(h,dt,EN)=>{const o=h.o;if(o.dead){o.dtZ=0;return false}o.gcd=Math.max(o.gcd,.3);if(h.px==null){h.px=o.x;h.py=o.y}if(h.t<2.3){o.x=h.px;o.y=h.py}const wf=dtWf(o);
  let z=0;DTJ.forEach((t0,i)=>{const big=i==5,du=big?.42:.28,u=(h.t-t0)/du;if(u>=0&&u<1)z=Math.sin(Math.PI*u)*(big?70:24)});o.dtZ=z;
  if(h.n<6&&h.t>=DTJ[h.n]){h.n++;SFXa('dt_rope')}
  const ln=DTJ.filter((t0,i)=>h.t>=t0+(i==5?.42:.28)).length;
  if(ln>h.ln){h.ln=ln;const i=ln-1,big=i==5,R=(big?190:150)+(o.dtW||170)*.3;SFXa('dt_land');SFXa('dt_count');shake=Math.max(shake,big?20:7);ring(o.x,o.y,o.r,R,DTC,big?10:5,.45);ring(o.x,o.y,o.r,R*.7,'#ffffff',3,.35);for(let k=0;k<(big?16:6);k++)dustP(o.x+rnd(-o.r,o.r),o.y+o.r*.7,rnd(60,160));if(big)FX.push({k:'crack',x:o.x,y:o.y,r:90,l:2,m:2});
    if(!SKIP)auTxt(o.x,o.y-o.r-38-i*4,DTN[i],big?'#ffe066':'#ffffff',big?1.1:.65);
    EN.forEach(x=>{if(x.hid||x.jump)return;if(Math.hypot(x.x-o.x,x.y-o.y)<R+x.r*.5){hurt(x,(big?3.5:1.3)*wf,o,x.x,x.y,0,big?1:0);x.slow=Math.max(x.slow,.6);if(big){x.stn=Math.max(x.stn,.4);safePush(x,ang(o,x),36)}}})}
  if(h.t>=2.3&&!h.hf){h.hf=1;SFXa('dt_huff');o.dtSw=2}
  if(h.t>=2.35){o.dtZ=0;return false}return true};
HZP.dtrp=h=>{const o=h.o;if(o.dead||h.t>2.3)return;const z=o.dtZ||0,R=o.r,ph=h.t*TAU/.32,hy=o.y-z;
  // 줄 : 손 양쪽에서 원을 그리며 돎 (위로 갈 땐 뒤 · 아래로 올 땐 앞)
  const sw=Math.cos(ph),top=hy-R-26,bot=o.y+R*.9,ry=sw>0?top+(1-sw)*0:bot,cy=(top+bot)/2,yy=cy-sw*(bot-top)/2;
  g.save();g.strokeStyle='#ffe066';g.lineWidth=3;g.lineCap='round';g.beginPath();g.moveTo(o.x-R-4,hy);g.quadraticCurveTo(o.x,yy*2-hy,o.x+R+4,hy);g.stroke();
  g.fillStyle='#ff7a3c';g.fillRect(o.x-R-9,hy-3,8,6);g.fillRect(o.x+R+1,hy-3,8,6);g.restore()};

// ---------- 3) ULT 치팅데이 ----------
const DTD=1.1;
function dtUlt(o,t){if(!t||t.dead)t=tgt(o);if(!t)return;HZ.push({k:'dtul',o,tg:t,t:0,fd:[],n:0})}
HZX.dtul=(h,dt,EN)=>{const o=h.o;let e=h.tg;const u=h.t-DTD;h.u=u;if(u<0)return true;if(o.dead)return false;if(!e||e.dead){e=tgt(o);h.tg=e}
  if(u<1.4){o.gcd=Math.max(o.gcd,.4);o.cast=null;o.slow=Math.max(o.slow,1)}
  if(!h.fs){h.fs=1;SFXa('dt_food');for(let i=0;i<6;i++){const a=rnd(0,TAU),d=rnd(45,80);h.fd.push({i:i%4,x:clamp(o.x+Math.cos(a)*d,20,A-20),y:clamp(o.y+Math.sin(a)*d,30,A-10),t0:i*.05,rot:rnd(-.5,.5),eat:null})}}
  if(u>=.5&&!h.gw){h.gw=1;SFXa('dt_grow')}
  if(u>=.55&&h.n<6&&u>=.55+h.n*.13){const f=h.fd[h.n++];f.eat=u;SFXa('dt_munch');o.dtW=Math.min(230,(o.dtW||170)+40/6);o.sq=1;o.sa=0;if(h.n==6&&!SKIP)auTxt(o.x,o.y-o.r-50,'+40kg','#ffb04a',1.1)}
  if(u>=1.45&&!h.jp&&e){h.jp=1;SFXa('dt_jump');const r=o.r;o.jump={t:0,dur:.8,sx:o.x,sy:o.y,tx:clamp(e.x+e.dx*e.sp*.6,r,A-r),ty:clamp(e.y+e.dy*e.sp*.6,r,A-r)};h.lx=o.jump.tx;h.ly=o.jump.ty}
  if(h.jp&&!h.pr&&!o.jump){h.pr=u;SFXa('dt_press');shake=Math.max(shake,28);const W=o.dtW||170,R=150;ring(o.x,o.y,10,R+20,'#ffb04a',12,.6);
    EN.forEach(x=>{if(x.hid||x.jump)return;if(Math.hypot(x.x-o.x,x.y-o.y)<R+x.r){hurt(x,Math.max(2,(W-150)*.16),o,x.x,x.y,0,1);x.stn=Math.max(x.stn,.45)}})}
  if(h.pr&&!h.sc&&u>=h.pr+.25){h.sc=u;SFXa('dt_scale')}
  if(h.sc&&!h.sg&&u>=h.sc+.55){h.sg=1;SFXa('dt_sigh')}
  return !h.sc||u<h.sc+1.5};
HZP.dtul=h=>{const u=h.u;if(!(u>=0))return;const o=h.o;
  // 하늘에서 음식
  h.fd.forEach(f=>{if(f.eat!=null&&u-f.eat>.15)return;const k=u-f.t0;if(k<0)return;let x=f.x,y,s=1.3;if(k<.4){y=f.y-(1-k/.4)*(1-k/.4)*360}else y=f.y-Math.abs(Math.sin((k-.4)*14))*Math.max(0,6-(k-.4)*30);
    if(f.eat!=null){const q=(u-f.eat)/.15;x=f.x+(o.x-f.x)*q;y=f.y+(o.y-f.y)*q;s=1.3*(1-q)}
    if(k<.4){g.save();g.fillStyle='rgba(0,0,0,.3)';g.beginPath();g.ellipse(f.x,f.y+8,12*k/.4,4*k/.4,0,0,TAU);g.fill();g.restore()}dtFood(f.i,x,y,s,f.rot)});
  // 치팅데이!!
  if(u<1.3){const k=u,s=k<.1?1.8-k*8:1,al=k>1?1-(k-1)/.3:1;g.save();g.globalAlpha=al;g.translate(A/2,A*.2);g.rotate(-.06);g.scale(s,s);const bw=270;g.fillStyle='#ffb04a';g.fillRect(-bw/2+6,-28+6,bw,56);g.fillStyle='#000';g.fillRect(-bw/2,-28,bw,56);g.strokeStyle='#fff';g.lineWidth=4;g.strokeRect(-bw/2,-28,bw,56);
    g.font='30px '+DTF;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#ffb04a';g.fillText('치팅데이!!',3,3);g.fillStyle='#fff';g.fillText('치팅데이!!',0,0);g.restore()}
  // 와구와구
  if(u>.55&&u<1.4&&!o.dead){for(let i=0;i<3;i++){const p=(u*3+i/3)%1;g.save();g.globalAlpha=1-p;g.font='14px '+DTF;g.textAlign='center';g.fillStyle='#ffe066';g.fillText(['냠','와구','쩝'][i],o.x+(i-1)*30,o.y-o.r-20-p*30);g.restore()}}
  // 착지 목표
  if(h.jp&&!h.pr&&h.lx!=null){g.save();g.strokeStyle='#ffb04a';g.lineWidth=3;g.setLineDash([10,8]);g.lineDashOffset=-u*60;g.beginPath();g.arc(h.lx,h.ly,150,0,TAU);g.stroke();g.setLineDash([]);g.restore()}
  // 체중계
  if(h.sc&&!o.dead){const k=u-h.sc,al=k>1.2?Math.max(0,1-(k-1.2)/.3):Math.min(1,k/.1),W=o.dtW||170,x=o.x,y=o.y+o.r+30;g.save();g.globalAlpha=al;
    g.fillStyle='#e8ecf0';g.strokeStyle='#1a1e24';g.lineWidth=2.5;g.fillRect(x-36,y-8,72,26);g.strokeRect(x-36,y-8,72,26);g.fillStyle='#14181e';g.fillRect(x-20,y-3,40,16);
    const shown=Math.round(Math.min(1,k/.45)*W+(k<.45?rnd(-20,20):0));g.font='11px "Press Start 2P",monospace';g.textAlign='center';g.textBaseline='middle';g.fillStyle=k>.45&&Math.floor(k*6)%2?'#ff4a4a':'#7cff9a';g.fillText(shown,x,y+6);
    if(k>.55){const t2='다이어트는 내일부터…',bw=210,by=o.y-o.r-64<28?Math.min(A-24,o.y+o.r+76):o.y-o.r-64,bx=clamp(x,bw/2+6,A-bw/2-6);g.fillStyle='#000';g.fillRect(bx-bw/2,by-18,bw,34);g.strokeStyle='#fff';g.lineWidth=3;g.strokeRect(bx-bw/2,by-18,bw,34);g.font='13px '+DTF;g.fillStyle='#fff';const L=[...t2];g.fillText('* '+L.slice(0,clamp(Math.floor((k-.55)/.04),0,L.length)).join(''),bx,by)}
    g.restore()}};
Object.assign(DMGK,{diet:1.22});
// 아이콘 : 덤벨 + 줄자
EMB.diet=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*2)*.05);g.save();g.strokeStyle='#ffe066';g.lineWidth=2.5;g.setLineDash([2.5,2.5]);g.beginPath();g.ellipse(0,9,17,5,0,0,TAU);g.stroke();g.setLineDash([]);g.restore();
  g.save();g.rotate(-.35);g.fillStyle='#d8dde4';g.fillRect(-11,-3,22,4);g.fillStyle='#2a2f38';g.strokeStyle=D.hi;g.lineWidth=1.4;[[-16,-9],[10,-9]].forEach(([x,y])=>{g.fillRect(x,y-0,6,14);g.strokeRect(x,y,6,14)});g.fillStyle=D.col;g.fillRect(-19,-6,3,8);g.fillRect(16,-6,3,8);g.restore();
  g.fillStyle='#ffffff';g.font='8px '+DTF;g.textAlign='center';g.textBaseline='middle';g.fillText('kg',0,9);
  g.save();g.globalCompositeOperation='lighter';glow(D.col,0,-2,18,.25);g.restore()};
document.querySelectorAll('#grid .tile').forEach(t=>{const i=+t.dataset.i,vc=DEF.filter(x=>x.vof===i).length;let em=t.querySelector('.vb');if(vc){if(!em){em=document.createElement('em');em.className='vb';t.appendChild(em)}em.textContent='+'+vc}});
Object.keys(ICC).forEach(k=>delete ICC[k]);mkDict();
;

// ---------- 아이콘 통일 : 덕질 · 조커 · 포켓몬카드 · 괴담콜렉터 · 다이어트도 네온 선으로 ----------
function nStar(x,y,R){for(let i=0;i<=10;i++){const a=-Math.PI/2+i*Math.PI/5,r=i%2?R*.45:R;i?g.lineTo(x+Math.cos(a)*r,y+Math.sin(a)*r):g.moveTo(x+Math.cos(a)*r,y+Math.sin(a)*r)}}
function nRR(x,y,w,h,r){g.moveTo(x+r,y);g.lineTo(x+w-r,y);g.quadraticCurveTo(x+w,y,x+w,y+r);g.lineTo(x+w,y+h-r);g.quadraticCurveTo(x+w,y+h,x+w-r,y+h);g.lineTo(x+r,y+h);g.quadraticCurveTo(x,y+h,x,y+h-r);g.lineTo(x,y+r);g.quadraticCurveTo(x,y,x+r,y)}
EMB.otaku=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*2.2)*.06);
  neon(D,1.8,()=>{g.beginPath();g.arc(0,1,14,0,TAU);g.moveTo(-14,1);g.lineTo(14,1)});
  neon({col:'#ffc23a',hi:'#fff4d0'},1.4,()=>{g.beginPath();nStar(0,-6,6)});
  neon({col:D.col,hi:'#ffffff'},1.1,()=>{g.beginPath();[[-18,-12],[17,-10],[15,12]].forEach(([x,y],i)=>{const s=2.6+Math.sin(clock*5+i*2)*.9;g.moveTo(x-s,y);g.lineTo(x+s,y);g.moveTo(x,y-s);g.lineTo(x,y+s)})});
  g.save();g.globalCompositeOperation='lighter';glow(D.col,0,0,16,.28);g.restore()};
EMB.joker=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*2.4)*.06);
  neon(D,1.7,()=>{g.beginPath();g.moveTo(-13,-6);g.quadraticCurveTo(-20,-14,-19,-21);g.quadraticCurveTo(-11,-15,-5,-8);g.moveTo(-5,-8);g.quadraticCurveTo(-3,-18,0,-24);g.quadraticCurveTo(3,-18,5,-8);g.moveTo(5,-8);g.quadraticCurveTo(11,-15,19,-21);g.quadraticCurveTo(20,-14,13,-6);g.moveTo(-14,-6);g.lineTo(14,-6);
    g.moveTo(-13,-5);g.quadraticCurveTo(-14,12,0,16);g.quadraticCurveTo(14,12,13,-5)});
  neon({col:'#b6ff4a',hi:'#f0ffd8'},1.2,()=>{g.beginPath();[[-19,-22],[0,-26],[19,-22]].forEach(([x,y])=>{g.moveTo(x+2,y);g.arc(x,y,2,0,TAU)});[-1,1].forEach(sd=>{g.moveTo(sd*6,-2);g.lineTo(sd*8.5,1);g.lineTo(sd*6,4);g.lineTo(sd*3.5,1);g.closePath()})});
  neon({col:'#ff2a3a',hi:'#ffd0d4'},1.4,()=>{g.beginPath();g.moveTo(-8,7);g.quadraticCurveTo(0,13+Math.sin(clock*3)*1.5,8,7);g.moveTo(-9,6);g.lineTo(-10,4);g.moveTo(9,6);g.lineTo(10,4)});
  g.save();g.globalCompositeOperation='lighter';glow(D.hi,0,-2,16,.25);g.restore()};
EMB.pkc=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*2.5)*.06);
  [[-7,-2,-.3],[7,-2,.3]].forEach(([x,y,r])=>{g.save();g.translate(x,y);g.rotate(r);neon({col:D.col,hi:D.hi},1.4,()=>{g.beginPath();nRR(-6.5,-9.5,13,19,2)});g.restore()});
  neon(D,1.8,()=>{g.beginPath();nRR(-7.5,-10.5,15,21,2.5)});
  neon({col:'#ffd23a',hi:'#fff6c8'},1.4,()=>{g.beginPath();g.moveTo(2,-6);g.lineTo(-3,1);g.lineTo(1,1);g.lineTo(-2,7);g.lineTo(4,-1);g.lineTo(0,-1);g.closePath()});
  g.save();g.globalCompositeOperation='lighter';glow(D.hi,0,0,16,.28);g.restore()};
EMB.kaidan=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*1.8)*.05);
  neon(D,1.7,()=>{g.beginPath();g.moveTo(0,0);g.quadraticCurveTo(-8,-3,-16,0);g.lineTo(-16,14);g.quadraticCurveTo(-8,11,0,14);g.quadraticCurveTo(8,11,16,14);g.lineTo(16,0);g.quadraticCurveTo(8,-3,0,0);g.lineTo(0,14);
    g.moveTo(-12,4);g.lineTo(-4,4);g.moveTo(-12,8);g.lineTo(-4,8);g.moveTo(4,4);g.lineTo(12,4);g.moveTo(4,8);g.lineTo(12,8)});
  const fl=Math.sin(clock*18)*1;neon({col:'#ffb04a',hi:'#fff0c8'},1.3,()=>{g.beginPath();g.rect(-2.5,-11,5,7);g.moveTo(0,-21+fl);g.quadraticCurveTo(4,-15,0,-12.5);g.quadraticCurveTo(-4,-15,0,-21+fl)});
  neon({col:'#ff2030',hi:'#ffc0c4'},1,()=>{g.beginPath();g.moveTo(-14,-18);g.lineTo(-10,-18);g.moveTo(10,-18);g.lineTo(14,-18)});
  g.save();g.globalCompositeOperation='lighter';glow('#ffb04a',0,-14,12,.4);glow(D.col,0,6,16,.2);g.restore()};
EMB.diet=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*2)*.05);
  g.save();g.rotate(-.35);neon(D,1.7,()=>{g.beginPath();g.moveTo(-9,0);g.lineTo(9,0);g.rect(-15,-8,5,16);g.rect(10,-8,5,16);g.moveTo(-18,-4);g.lineTo(-18,4);g.moveTo(18,-4);g.lineTo(18,4)});g.restore();
  neon({col:'#ffe066',hi:'#fff8d8'},1.2,()=>{g.beginPath();g.ellipse(0,11,15,4.5,0,0,TAU)});
  neon({col:'#8fd8ff',hi:'#e8f8ff'},1.1,()=>{g.beginPath();const y=-16+((clock*.8)%1)*4;g.moveTo(13,y-4);g.quadraticCurveTo(16,y,13,y+3);g.quadraticCurveTo(10,y,13,y-4)});
  g.save();g.globalCompositeOperation='lighter';glow(D.col,0,0,16,.25);g.restore()};
Object.keys(ICC).forEach(k=>delete ICC[k]);if(typeof UTPX!='undefined')Object.keys(UTPX).forEach(k=>delete UTPX[k]);mkDict();
;
