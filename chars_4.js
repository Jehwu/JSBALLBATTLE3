// ======================================================================
// chars_4.js : 변이 4묶음 : (기본 박지성 블래스터 그림) · 최재희 · AURA · 덕질 · 조커 · 괴담콜렉터 · 다이어트 · 감정없는싸이코패스 · 공기묘 · 아스고어 · 메타톤 · 언다인 · 플라위 · 파피루스 · 가스터 · 도티 · 미스터 비스트 · 겜브링 · 침착맨 · 감스트 · 우주하마 · 말왕 · 씩씩맨  ← 새 캐릭터는 이 파일 맨 아래에 추가
// 안에 들어있는 순서 : extra19 → extra20 → extra22 → extra23 → extra26 → extra27 → extra28 → extra29 → extra30
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

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ▶ 섹션 : extra26
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ===== extra26.js : 김지우 • 감정없는싸이코패스 · 공병은 • 공기묘 =====

// ======================================================================
// 김지우 • 감정없는싸이코패스 (무표정 · 무감정)
// 패시브 무감정 : 받는 피해 -12% · 기절과 둔화가 절반만 걸림 · 맞아도 표정 변화 없이 "…"
// 1) 감정 분석 : 상대를 스캔하며 심박수를 잼 · 스캔 중에 상대가 많이 움직일수록(당황할수록) 더 아픈 약점 공격
// 2) 무표정 응시 : 눈에서 뻗은 시선으로 상대를 계속 쳐다봄 · 쳐다볼수록 공포가 쌓여 느려지고 피해 · 끝까지 버티면 얼어붙음
// 3) ULT 감정 삭제 : 화면이 흑백 · "감정 관리자" 창에서 기쁨 · 슬픔 · 분노 · 공포 · 사랑을 하나씩 삭제 → 심전도가 일자로
// ======================================================================
const PSR='#ff2030',PSG='#7cff9a',PSF='"Galmuri11","Noto Sans KR",sans-serif',PSP='"Press Start 2P",monospace';
const NEW36=['ps_scan','ps_beat','ps_strike','ps_stare','ps_tick','ps_freeze','ps_win','ps_key','ps_del','ps_flat','ps_dots'];
NEW36.forEach(n=>{if(!SND.includes(n))SND.push(n);if(!AUD[n])AUD[n]=new SoundPool('sounds/'+n+'.mp3',['ps_beat','ps_tick','ps_key','ps_del'].includes(n)?5:3)});
Object.assign(SLB,{ps_scan:'싸이코패스 · 스캔',ps_beat:'싸이코패스 · 심박수',ps_strike:'싸이코패스 · 약점 공격',ps_stare:'싸이코패스 · 응시',ps_tick:'싸이코패스 · 공포 쌓임',ps_freeze:'싸이코패스 · 얼어붙음',ps_win:'싸이코패스 · 감정 관리자 창',ps_key:'싸이코패스 · 삭제 키',ps_del:'싸이코패스 · 감정 삭제',ps_flat:'싸이코패스 · 심전도 일자',ps_dots:'싸이코패스 · …'});
const PSSK=[
  {n:'감정 분석',w:.25,cd:8,c:(o,t)=>!t.hid&&dist(o,t)<500,f:(o,t)=>psScan(o,t)},
  {n:'무표정 응시',w:.25,cd:9.5,c:(o,t)=>!t.hid&&dist(o,t)<420,f:(o,t)=>psStare(o,t)},
  {n:'감정 삭제',w:.4,ult:1,c:(o,t)=>!t.hid,f:(o,t)=>psUlt(o,t)}];
const PSI=DEF.findIndex(d=>d.name=='김지우');
DEF.push({name:'김지우 • 감정없는싸이코패스',gl:'무',k:'psy',vof:PSI,r:27,sp:204,col:'#b8bcc6',hi:'#ffffff',dk:'#141418',alt:{col:'#2a2a30',hi:'#ff2030',dk:'#000000'},alt2:{col:'#e8e8e8',hi:'#20202a',dk:'#8a8a96'},sk:PSSK});
INFO['김지우 • 감정없는싸이코패스']={st:[8,8,7,7,6,10],p:'무감정 · 받는 피해 -12% · 기절과 둔화가 절반만 걸림 · 맞아도 표정 하나 안 바뀌고 "…"',
  sk:[['4~12','상대를 스캔하며 심박수를 잼 · 스캔하는 동안 상대가 많이 움직일수록 (당황할수록) 약점 공격이 세짐 · 분석이 끝나면 뒤로 순간이동해서 벰'],['0.6×6+2','눈에서 시선이 뻗어 상대를 계속 쳐다봄 · 공포가 쌓이며 느려지고 피해 · 끝까지 시선을 버티면 얼어붙음 (기절)'],['2.5×5+7','화면이 흑백 · "감정 관리자" 창이 열리고 기쁨 · 슬픔 · 분노 · 공포 · 사랑을 하나씩 삭제 · 삭제할 때마다 상대에게서 감정이 빠져나가 깨짐 · 다 지우면 심전도가 일자로 (기절)']]};
// 공통 : 감정 얼굴
const PSE=[['기쁨','#ffd23a'],['슬픔','#4a8aff'],['분노','#ff3a3a'],['공포','#a060ff'],['사랑','#ff7ac0']];
function psFace(i,x,y,R,al){g.save();g.translate(x,y);g.globalAlpha=al==null?1:al;g.fillStyle=PSE[i][1];g.strokeStyle='#0a0a0e';g.lineWidth=R*.12;g.beginPath();g.arc(0,0,R,0,TAU);g.fill();g.stroke();g.fillStyle='#0a0a0e';g.strokeStyle='#0a0a0e';g.lineWidth=R*.12;g.lineCap='round';
  const ey=-R*.2;if(i==2){g.beginPath();g.moveTo(-R*.55,ey-R*.25);g.lineTo(-R*.15,ey);g.moveTo(R*.55,ey-R*.25);g.lineTo(R*.15,ey);g.stroke()}
  g.beginPath();g.arc(-R*.33,ey+R*.05,R*.11,0,TAU);g.arc(R*.33,ey+R*.05,R*.11,0,TAU);g.fill();g.beginPath();
  if(i==0)g.arc(0,R*.15,R*.42,.2,Math.PI-.2);else if(i==1||i==2)g.arc(0,R*.62,R*.32,Math.PI+.4,TAU-.4);else if(i==3){g.ellipse(0,R*.38,R*.16,R*.22,0,0,TAU)}else{g.moveTo(-R*.3,R*.3);g.quadraticCurveTo(0,R*.55,R*.3,R*.3)}g.stroke();
  if(i==1){g.fillStyle='#bfe8ff';g.beginPath();g.ellipse(R*.45,R*.15,R*.08,R*.16,0,0,TAU);g.fill()}if(i==4){g.fillStyle='#ff3a6a';g.beginPath();g.ellipse(-R*.55,R*.2,R*.12,R*.07,0,0,TAU);g.ellipse(R*.55,R*.2,R*.12,R*.07,0,0,TAU);g.fill()}g.restore()}
// 패시브
const _hurtPS=hurt;hurt=function(t,n,o){if(t&&t.d&&t.d.k=='psy'&&o&&o!=t&&n>0&&!t.dead){const a=[...arguments];a[1]=Math.round(n*.88*10)/10;const r=_hurtPS.apply(this,a);if(!(t.psDot>0)&&!t.dead){t.psDot=2.2;t.psDotT=1.1;if(!SKIP)SFXa('ps_dots')}return r}return _hurtPS.apply(this,arguments)};
const _updPS=update;update=function(dt){_updPS(dt);if(!F)return;F.forEach(f=>{if(f.psDot>0)f.psDot-=dt;if(f.psDotT>0)f.psDotT-=dt;if(f.d.k=='psy'&&!f.dead&&phase=='play'){if(f.stn>0)f.stn=Math.max(0,f.stn-dt);if(f.slow>0)f.slow=Math.max(0,f.slow-dt)}})};
const _lowPS=lowHP;lowHP=function(f){_lowPS(f);if(f.psDotT>0&&!f.dead&&!f.hid){const u=1-f.psDotT/1.1;g.save();g.globalAlpha=u>.8?1-(u-.8)/.2:1;g.translate(f.x+f.r*.8,f.y-f.r-24);g.fillStyle='#ffffff';g.strokeStyle='#0a0a0e';g.lineWidth=2.5;g.beginPath();g.ellipse(0,0,22,13,0,0,TAU);g.moveTo(-8,10);g.lineTo(-14,19);g.lineTo(-2,12);g.fill();g.stroke();g.fillStyle='#0a0a0e';for(let i=0;i<3;i++)if(u>i*.15){g.beginPath();g.arc(-8+i*8,1,2.2,0,TAU);g.fill()}g.restore()}};
const _initPS=init;init=function(){_initPS.apply(this,arguments);if(F)F.forEach(f=>{f.psDot=0;f.psDotT=0})};
// 공통 : 심전도 줄
function psEcg(x,y,w,h,t,bpm,flat,col){g.save();g.translate(x,y);g.strokeStyle=col||PSG;g.lineWidth=2;g.lineJoin='round';g.globalCompositeOperation='lighter';g.beginPath();const per=60/Math.max(40,bpm);
  for(let i=0;i<=60;i++){const u=i/60,tt=t-(1-u)*1.2,ph=((tt%per)+per)%per/per;let v=0;if(!flat){if(ph<.06)v=-.15;else if(ph<.1)v=1;else if(ph<.14)v=-.55;else if(ph<.2)v=.1;else if(ph>.4&&ph<.5)v=.18}g.lineTo(-w/2+u*w,-v*h)}g.stroke();g.restore()}
// ---------- 1) 감정 분석 ----------
function psScan(o,t){HZ.push({k:'psscan',o,tg:t,t:0,mv:0,lx:t.x,ly:t.y,nb:0});SFXa('ps_scan')}
HZX.psscan=(h,dt,EN)=>{const o=h.o,e=h.tg;if(!e||e.dead||o.dead)return h.t<.2;
  if(h.t<1.25){h.mv+=Math.hypot(e.x-h.lx,e.y-h.ly);h.lx=e.x;h.ly=e.y;const bpm=72+h.mv*.35;h.bpm=bpm;h.nb-=dt;if(h.nb<=0){h.nb=60/bpm;SFXa('ps_beat')}}
  if(h.t>=1.25&&!h.hit){h.hit=1;const a=Math.atan2(e.y-o.y,e.x-o.x),sx=o.x,sy=o.y;FX.push({k:'ghost',x:o.x,y:o.y,r:o.r,c:o.d.col,l:.35,m:.35});o.x=clamp(e.x+Math.cos(a)*(e.r+o.r+18),o.r,A-o.r);o.y=clamp(e.y+Math.sin(a)*(e.r+o.r+18),o.r,A-o.r);
    h.sl={x1:sx,y1:sy,x2:o.x,y2:o.y,a};h.dm=Math.round((4+Math.min(8,h.mv*.035))*10)/10;SFXa('ps_strike');if(!e.hid){hurt(e,h.dm,o,e.x,e.y,0,h.dm>=7?1:0);if(typeof lkImp=='function')lkImp(e.x,e.y,60+h.dm*6,PSR);shake=Math.max(shake,6+h.dm)}}
  return h.t<1.9};
HZP.psscan=h=>{const o=h.o,e=h.tg;if(!e)return;const t=h.t;
  if(t<1.25&&!e.dead){const u=Math.min(1,t/.2),R=e.r+16+(1-u)*30,c=12;g.save();g.translate(e.x,e.y);g.strokeStyle=PSR;g.lineWidth=2.5;g.globalAlpha=.9;g.beginPath();[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([sx,sy])=>{g.moveTo(sx*R,sy*R-sy*c);g.lineTo(sx*R,sy*R);g.lineTo(sx*R-sx*c,sy*R)});g.stroke();
      g.strokeStyle='rgba(255,32,48,.35)';g.lineWidth=1;const sy2=-R+((t*1.6)%1)*R*2;g.beginPath();g.moveTo(-R,sy2);g.lineTo(R,sy2);g.stroke();g.restore();
    psEcg(e.x,e.y-e.r-34,90,14,t,h.bpm||72,0,h.bpm>140?PSR:PSG);g.save();g.font='10px '+PSF;g.textAlign='center';g.lineJoin='round';g.lineWidth=3;g.strokeStyle='#000';const s='심박수 '+Math.round(h.bpm||72)+' · 공포 '+Math.min(99,Math.round((h.bpm-72)/1.6))+'%';g.strokeText(s,e.x,e.y-e.r-52);g.fillStyle=h.bpm>140?'#ff6070':'#cfffda';g.fillText(s,e.x,e.y-e.r-52);g.restore();
    // 시선 줄 (얇게)
    g.save();g.strokeStyle='rgba(255,32,48,.3)';g.setLineDash([3,6]);g.beginPath();g.moveTo(o.x,o.y);g.lineTo(e.x,e.y);g.stroke();g.setLineDash([]);g.restore()}
  if(h.sl&&t<1.65){const k=(t-1.25)/.4,s=h.sl;g.save();g.globalAlpha=1-k;g.strokeStyle='#ffffff';g.lineWidth=2;g.beginPath();g.moveTo(s.x1,s.y1);g.lineTo(s.x2,s.y2);g.stroke();g.translate(e.x,e.y);g.rotate(s.a+.7);g.globalCompositeOperation='lighter';g.fillStyle=PSR;const L=70*(1+k*.3);g.beginPath();g.moveTo(-L,0);g.quadraticCurveTo(0,-5*(1-k),L,0);g.quadraticCurveTo(0,5*(1-k),-L,0);g.fill();g.restore();
    g.save();g.globalAlpha=1-k;g.font='12px '+PSF;g.textAlign='center';g.lineWidth=4;g.strokeStyle='#000';g.lineJoin='round';const tx='약점 : 공포 · '+h.dm;g.strokeText(tx,e.x,e.y-e.r-40-k*14);g.fillStyle='#ff6070';g.fillText(tx,e.x,e.y-e.r-40-k*14);g.restore()}};
// ---------- 2) 무표정 응시 ----------
function psStare(o,t){HZ.push({k:'psst',o,tg:t,t:0,n:0,lk:0});SFXa('ps_stare')}
HZX.psst=(h,dt,EN)=>{const o=h.o,e=h.tg;if(!e||e.dead||o.dead)return false;o.gcd=Math.max(o.gcd,.2);
  const on=!e.hid&&dist(o,e)<480;h.on=on;if(on){h.lk+=dt;e.slow=Math.max(e.slow,.5)}else h.lk=Math.max(0,h.lk-dt*.5);
  if(h.t>=.3*(h.n+1)&&h.n<6){h.n++;if(on){hurt(e,.6,o,e.x,e.y,0,0);SFXa('ps_tick')}}
  if(h.t>=1.85&&!h.fz){h.fz=1;if(h.lk>=1.4&&!e.hid){SFXa('ps_freeze');hurt(e,2,o,e.x,e.y,0,1);e.stn=Math.max(e.stn,.6);e.cast=null;h.frz=1;ring(e.x,e.y,e.r,e.r+50,'#d8d8e0',5,.4)}}
  return h.t<2.3};
HZP.psst=h=>{const o=h.o,e=h.tg;if(!e||o.dead)return;const t=h.t,fa=t<.15?t/.15:t>1.9?Math.max(0,1-(t-1.9)/.4):1;
  if(t<1.95&&h.on){// 흑백이 번지는 원
    g.save();g.globalCompositeOperation='saturation';g.globalAlpha=Math.min(.9,h.lk/1.2)*fa;g.fillStyle='hsl(0,0%,50%)';g.beginPath();g.arc(e.x,e.y,e.r*2.6,0,TAU);g.fill();g.restore();
    // 눈에서 나가는 두 줄 시선
    const a=Math.atan2(e.y-o.y,e.x-o.x),nx=-Math.sin(a),ny=Math.cos(a);g.save();g.globalAlpha=fa;g.globalCompositeOperation='lighter';[-1,1].forEach(sd=>{const sx=o.x+nx*sd*o.r*.32-ny*0,sy=o.y-o.r*.15+ny*sd*o.r*.32;g.strokeStyle='rgba(255,255,255,.75)';g.lineWidth=1.6;g.beginPath();g.moveTo(sx,sy);g.lineTo(e.x+nx*sd*4,e.y+ny*sd*4);g.stroke();g.strokeStyle='rgba(255,32,48,.35)';g.lineWidth=5;g.stroke()});g.restore();
    // 상대 위에 큰 눈
    g.save();g.globalAlpha=fa*(.6+.4*Math.min(1,h.lk));g.translate(e.x+rnd(-1,1)*h.lk,e.y-e.r-30);g.strokeStyle='#ffffff';g.lineWidth=2;g.beginPath();g.moveTo(-20,0);g.quadraticCurveTo(0,-13,20,0);g.quadraticCurveTo(0,13,-20,0);g.stroke();g.fillStyle=PSR;g.beginPath();g.arc(0,0,4.5,0,TAU);g.fill();g.fillStyle='#000';g.beginPath();g.arc(0,0,2,0,TAU);g.fill();g.restore();
    // 공포 게이지
    g.save();g.globalAlpha=fa;g.fillStyle='rgba(0,0,0,.6)';g.fillRect(e.x-22,e.y+e.r+8,44,4);g.fillStyle=h.lk>=1.4?PSR:'#d0d0d8';g.fillRect(e.x-22,e.y+e.r+8,44*Math.min(1,h.lk/1.4),4);g.restore()}
  // 김지우 : "……"
  g.save();g.globalAlpha=fa;g.font='14px '+PSF;g.textAlign='center';g.fillStyle='#d0d0d8';g.fillText('…'.repeat(1+Math.floor(t*3)%3),o.x,o.y-o.r-18);g.restore();
  if(h.frz&&t<2.3){const k=(t-1.85)/.45;g.save();g.globalAlpha=1-k;g.font='16px '+PSF;g.textAlign='center';g.lineWidth=4;g.strokeStyle='#000';g.lineJoin='round';g.strokeText('얼어붙었다',e.x,e.y-e.r-48-k*10);g.fillStyle='#ffffff';g.fillText('얼어붙었다',e.x,e.y-e.r-48-k*10);g.restore()}};
// ---------- 3) ULT 감정 삭제 ----------
const PSD=1.1;
function psUlt(o,t){if(!t||t.dead)t=tgt(o);if(!t)return;HZ.push({k:'psul',o,tg:t,t:0,n:0,P:[]})}
HZX.psul=(h,dt,EN)=>{const o=h.o;let e=h.tg;const u=h.t-PSD;h.u=u;if(u<0)return true;if(!h.lk&&(!e||e.dead)){e=tgt(o);h.tg=e}if(!e)return u<1;if(!o.dead){o.gcd=Math.max(o.gcd,.4);o.cast=null}
  if(!h.w){h.w=1;SFXa('ps_win')}if(!h.lk){h.lk=1;h.ex=e.x;h.ey=e.y}
  if(u<2.55&&!e.dead){e.x+=(h.ex-e.x)*Math.min(1,dt*8);e.y+=(h.ey-e.y)*Math.min(1,dt*8);e.stn=Math.max(e.stn,.15);e.cast=null}
  if(h.n<5&&u>=.55+h.n*.36){const i=h.n++;h.dt=u;SFXa('ps_key');SFXa('ps_del');h.P.push({i,t:u,x:e.x,y:e.y,a:rnd(0,TAU)});if(!e.dead&&!e.hid){hurt(e,2.5,o,e.x,e.y,0,0);shake=Math.max(shake,5)}}
  if(u>=2.5&&!h.fl){h.fl=u;SFXa('ps_flat');if(!e.dead&&!e.hid){hurt(e,7,o,e.x,e.y,0,1);e.stn=Math.max(e.stn,1);e.cast=null;e.psGray=1.6}shake=Math.max(shake,14)}
  return u<3.6};
const _updPSG=update;update=function(dt){_updPSG(dt);if(F)F.forEach(f=>{if(f.psGray>0)f.psGray-=dt})};
const _lowPSG=lowHP;lowHP=function(f){_lowPSG(f);if(f.psGray>0&&!f.dead){g.save();g.globalCompositeOperation='saturation';g.globalAlpha=Math.min(1,f.psGray);g.fillStyle='hsl(0,0%,50%)';g.beginPath();g.arc(f.x,f.y,f.r+3,0,TAU);g.fill();g.restore()}};
HZP.psul=h=>{const u=h.u;if(!(u>=0))return;const e=h.tg,fa=u<3.2?Math.min(1,u/.25):Math.max(0,1-(u-3.2)/.4);
  if(typeof auGray=='function')auGray(.92*fa);g.save();g.globalAlpha=.25*fa;g.fillStyle='#000';g.fillRect(-60,-60,A+120,A+120);g.restore();
  // 감정이 빠져나와 깨짐
  h.P.forEach(p=>{const k=u-p.t;if(k>.9)return;const up=Math.min(1,k/.25),x=p.x+Math.cos(p.a)*40*up,y=p.y-50*up;if(k<.35)psFace(p.i,x,y,15,1);else{const q=(k-.35)/.55;for(let j=0;j<10;j++){const a=j*TAU/10;g.save();g.globalAlpha=1-q;g.fillStyle=PSE[p.i][1];g.fillRect(x+Math.cos(a)*q*50-3,y+Math.sin(a)*q*50+q*q*40-3,6,6);g.restore()}}});
  // 감정 관리자 창
  const W=230,H=176,x0=A/2-W/2,y0=h.ey<A*.5?A-H-34:40,op=Math.min(1,u/.15);if(u<3.25){g.save();g.globalAlpha=fa;g.translate(0,(1-op)*-30);g.fillStyle='#000';g.fillRect(x0,y0,W,H);g.strokeStyle='#ffffff';g.lineWidth=3;g.strokeRect(x0,y0,W,H);g.fillStyle='#ffffff';g.fillRect(x0,y0,W,22);
    g.fillStyle='#000';g.font='11px '+PSF;g.textAlign='left';g.textBaseline='middle';g.fillText('감정 관리자.exe',x0+8,y0+11);g.textAlign='right';g.fillText('✕',x0+W-8,y0+11);
    PSE.forEach(([nm,c],i)=>{const ry=y0+34+i*24,del=i<h.n,cur=i==h.n&&u>=.3&&u<2.5;if(cur){g.fillStyle='rgba(255,255,255,.12)';g.fillRect(x0+4,ry-10,W-8,20)}psFace(i,x0+18,ry,8,del?.25:1);g.globalAlpha=fa*(del?.4:1);g.fillStyle='#fff';g.font='12px '+PSF;g.textAlign='left';g.fillText(nm,x0+34,ry+1);
      g.textAlign='right';g.fillStyle=del?'#666':cur&&Math.floor(u*8)%2?PSR:'#aaa';g.fillText(del?'삭제됨':'[ 삭제 ]',x0+W-10,ry+1);if(del){g.strokeStyle='#888';g.lineWidth=1.5;g.beginPath();g.moveTo(x0+30,ry+1);g.lineTo(x0+W-80,ry+1);g.stroke()}g.globalAlpha=fa});
    if(u>=2.5){g.fillStyle=PSR;g.font='11px '+PSF;g.textAlign='center';g.fillText('모든 감정을 삭제했습니다',A/2,y0+H-6)}g.restore()}
  // 심전도
  if(e&&h.lk){const flat=u>=2.5;psEcg(h.ex,h.ey+e.r+26,120,12,u,flat?0:130-h.n*12,flat,flat?PSR:PSG);if(flat&&u<3.4){g.save();g.globalAlpha=fa;g.font='14px '+PSP;g.textAlign='center';g.fillStyle=PSR;g.fillText('0 BPM',h.ex,h.ey+e.r+52);g.restore()}}};
Object.assign(DMGK,{psy:1.22});
EMB.psy=(f,D)=>{g.rotate(-f.rot);neon({col:'#d0d4dc',hi:'#ffffff'},1.6,()=>{g.beginPath();g.moveTo(-11,-3);g.lineTo(-5,-3);g.moveTo(5,-3);g.lineTo(11,-3);g.moveTo(-8,10);g.lineTo(8,10)});
  neon({col:PSR,hi:'#ffc0c4'},1.2,()=>{g.beginPath();[-8,0,8].forEach(x=>{g.moveTo(x+1.2,-17);g.arc(x,-17,1.2,0,TAU)})});g.save();g.globalCompositeOperation='lighter';glow('#d0d4dc',0,0,16,.2);g.restore()};

// ======================================================================
// 공병은 • 공기묘 (공병은의 기묘한 모험 · 스탠드 "크레이지 골드")
// 스탠드 그림은 images/kgm_stand (png · webp · jpg) 를 넣으면 나옴 · 없으면 금빛 기운만
// 패시브 복원 : 6초마다 그동안 받은 피해의 25%를 되돌림 (금빛 조각이 몸으로 돌아옴)
// 스탠드는 항상 공병은 뒤에 떠 있고, 스킬을 쓰면 앞으로 나와서 주먹을 날림
// 1) 고라라 러쉬 : 스탠드와 공병은 주변 여러 곳에서 주먹(팔뚝째)이 일직선으로 쏟아짐 → 마지막 한 방
// 2) 복원 결박 : 땅을 부숨 → 흩어진 조각이 원래 자리로 "복원"되며 상대를 끌어와 묶음
// 3) ULT 복원 봉인 : 땅을 부숴 조각을 흩뿌림 → 러쉬로 상대 몸을 조각내 흩뿌림 → "복원!" 모든 조각이 제자리로 날아오며 상대를 끌고 와
//    부서졌던 땅에 그대로 묻어서 고쳐버림 (금빛 바위에 봉인) → 바위째 "고라!" → 내 몸도 복원
// ======================================================================
// 스탠드 사진은 배경을 지우는 처리 없이 그대로 씀 (투명 png 추천)
{const L=[];['images/','','../images/'].forEach(d=>['png','webp','jpg','jpeg'].forEach(e=>L.push(d+'kgm_stand.'+e)));SLOT.kgm_stand=null;const go=i=>{if(i>=L.length)return;const im=new Image();im.onload=()=>{SLOT.kgm_stand=im};im.onerror=()=>go(i+1);im.src=L[i]};go(0)}
const GMC='#ffc83a',GMF='"Black Han Sans","Galmuri11",'+FB;
const NEW37=['kgm_rush','kgm_hit','kgm_fin','kgm_break','kgm_fix','kgm_bind','kgm_heal','kgm_ult','kgm_stand'];
NEW37.forEach(n=>{if(!SND.includes(n))SND.push(n);if(!AUD[n])AUD[n]=new SoundPool('sounds/'+n+'.mp3',n=='kgm_hit'?6:3)});
Object.assign(SLB,{kgm_rush:'공기묘 · 고라라 러쉬',kgm_hit:'공기묘 · 주먹 명중',kgm_fin:'공기묘 · 마무리 한 방',kgm_break:'공기묘 · 땅 부수기',kgm_fix:'공기묘 · 복원',kgm_bind:'공기묘 · 결박',kgm_heal:'공기묘 · 몸 복원',kgm_ult:'공기묘 · 전방위 러쉬',kgm_stand:'공기묘 · 스탠드 등장'});
const GMSK=[
  {n:'고라라 러쉬',w:.25,cd:8,c:(o,t)=>!t.hid&&dist(o,t)<360,f:(o,t)=>gmRush(o,t)},
  {n:'복원 결박',w:.3,cd:10,c:(o,t)=>!t.hid&&!t.jump&&dist(o,t)<460,f:(o,t)=>gmFix(o,t)},
  {n:'복원 봉인',w:.4,ult:1,c:(o,t)=>!t.hid,f:(o,t)=>gmUlt(o,t)}];
const GMI=DEF.findIndex(d=>d.name=='공병은');
DEF.push({name:'공병은 • 공기묘',gl:'묘',k:'kgm',vof:GMI,r:26,sp:214,col:'#e6b422',hi:'#fff6d0',dk:'#24143a',alt:{col:'#ff5ac8',hi:'#ffe0f4',dk:'#2a0420'},alt2:{col:'#3b74ff',hi:'#ffe08a',dk:'#0d1b4d'},sk:GMSK});
INFO['공병은 • 공기묘']={st:[8,8,7,6,7,10],p:'크레이지 골드 · 항상 뒤에 떠 있는 스탠드 · 6초마다 그동안 받은 피해의 25%를 되돌림 (금빛 조각이 몸으로 돌아옴)',
  sk:[['0.3×26+3.5','스탠드 크레이지 골드가 앞으로 나옴 · 스탠드와 공병은 주변 여러 곳에서 주먹이 일직선으로 쏟아짐 "고라라라라!" · 마지막에 큰 한 방으로 날려버림'],['3+2 · 결박','상대 근처 땅을 부숨 · 흩어진 조각들이 잠시 뒤 원래 자리로 "복원"되면서 상대를 가운데로 끌어와 묶음 (기절)'],['3+0.26×28+복원+6','땅을 부숴 조각을 흩뿌림 → 러쉬로 상대 몸을 조각내 흩뿌림 → "복원!" 모든 조각이 제자리로 날아오며 상대를 끌고 와 부서진 땅에 묻어서 고쳐버림 (금빛 바위에 봉인 · 기절) → 바위째 "고라!" · 내 몸도 복원 (+12)']]};
// 스탠드 (사진) + 금빛 기운
// k : 0 = 뒤에 대기 · 1 = 앞으로 나와서 공격 중
function gmStand(f,al,big,dir,k){if(al<=0)return;k=k||0;const im=SLOT.kgm_stand,H=f.r*((big?6:4.6)+k*.6),d=dir||(f.dx<0?-1:1),bob=Math.sin(clock*2.4+f.i)*4*(1-k),jit=k?rnd(-1.5,1.5):0;
  g.save();g.translate(f.x+d*f.r*(-1+1.7*k)+jit,f.y-f.r*(.45-.25*k)+bob);g.globalAlpha=al;
  g.save();g.globalCompositeOperation='lighter';glow(GMC,0,-H*.4,H*.6,.25+.2*k);glow('#fff3c0',0,-H*.4,H*.3,.12+.12*k);g.restore();
  if(im){const W=H*im.width/im.height;g.scale(d,1);g.drawImage(im,-W*.42,-H*.88,W,H)}g.restore()}
function gmStandPos(f){const d=f.gmDir||(f.dx<0?-1:1);return{x:f.x+d*f.r*.7,y:f.y-f.r*1.4}}
const _afterGM=afterImg;afterImg=function(f){_afterGM(f);if(f.dead||f.hid||phase=='menu'||!f.d)return;const own=f.d.k=='kgm';if(!own&&!(f.gmSt>0))return;
  const k=f.gmSt>0?Math.min(1,f.gmSt*4):0;f.gmK=(f.gmK||0)+(k-(f.gmK||0))*Math.min(1,LDT*10||.2);gmStand(f,own?Math.max(.82,f.gmK):Math.min(1,f.gmSt*3),f.gmBig&&f.gmSt>0,f.gmSt>0?f.gmDir:null,f.gmK)};
// 작은 주먹
// 주먹 (팔뚝째 · 일직선) : 금색 + 분홍 손목 보호대
function gmFist(x,y,a,s,al){g.save();g.translate(x,y);g.rotate(a);g.scale(s,s);g.globalAlpha=al==null?1:al;g.lineJoin='round';
  g.save();g.globalCompositeOperation='lighter';const gr=g.createLinearGradient(-58,0,-6,0);gr.addColorStop(0,'rgba(255,200,58,0)');gr.addColorStop(1,'rgba(255,225,130,.55)');g.fillStyle=gr;g.beginPath();g.moveTo(-58,-3);g.lineTo(-6,-9);g.lineTo(-6,9);g.lineTo(-58,3);g.fill();g.restore();
  // 팔뚝
  const ag=g.createLinearGradient(0,-7,0,7);ag.addColorStop(0,'#ffe9a0');ag.addColorStop(.5,'#e8b02a');ag.addColorStop(1,'#a8700e');g.fillStyle=ag;g.strokeStyle='#3a1a08';g.lineWidth=1.5;
  g.beginPath();g.moveTo(-40,-4.5);g.lineTo(-9,-6.5);g.lineTo(-9,6.5);g.lineTo(-40,4.5);g.closePath();g.fill();g.stroke();
  g.fillStyle='#d8406e';g.beginPath();g.moveTo(-17,-6.2);g.lineTo(-10,-6.8);g.lineTo(-10,6.8);g.lineTo(-17,6.2);g.closePath();g.fill();g.stroke();
  // 주먹
  const fg=g.createLinearGradient(0,-9,0,9);fg.addColorStop(0,'#fff0b0');fg.addColorStop(.45,'#ffcf4a');fg.addColorStop(1,'#c08410');g.fillStyle=fg;
  g.beginPath();g.moveTo(-10,-8);g.lineTo(3,-9);g.quadraticCurveTo(10,-9,10,-4.5);g.lineTo(10,4.5);g.quadraticCurveTo(10,9,3,9);g.lineTo(-10,8);g.closePath();g.fill();g.stroke();
  // 손가락 마디 4개
  g.beginPath();for(let i=1;i<4;i++){const yy=-9+i*4.5;g.moveTo(10,yy);g.lineTo(4,yy)}g.stroke();
  g.fillStyle='rgba(255,255,255,.55)';for(let i=0;i<4;i++){g.beginPath();g.arc(8,-6.75+i*4.5,1.1,0,TAU);g.fill()}
  // 엄지
  g.fillStyle='#f2bb34';g.beginPath();g.moveTo(-6,9);g.quadraticCurveTo(0,10.5,5,5.5);g.quadraticCurveTo(1,4.5,-6,5);g.closePath();g.fill();g.stroke();
  g.fillStyle='rgba(255,255,255,.6)';g.beginPath();g.ellipse(-2,-5.5,4,1.4,0,0,TAU);g.fill();g.restore()}
// 패시브 : 복원
const _hurtGM=hurt;hurt=function(t,n,o){if(t&&t.d&&t.d.k=='kgm'&&o!=t&&n>0&&!t.dead){const hp0=t.hp,r=_hurtGM.apply(this,arguments);t.gmD=(t.gmD||0)+Math.max(0,hp0-t.hp);return r}return _hurtGM.apply(this,arguments)};
const _updGM=update;update=function(dt){_updGM(dt);if(!F)return;F.forEach(f=>{if(f.gmSt>0)f.gmSt-=dt;if(f.d.k!='kgm'||f.dead||phase!='play')return;f.gmT=(f.gmT||0)+dt;
  if(f.gmT>=6){f.gmT=0;const hv=Math.round((f.gmD||0)*.25*10)/10;f.gmD=0;if(hv>=1){f.hp=Math.min(100,f.hp+hv);if(!SKIP){SFXa('kgm_heal');ft(f.x,f.y-f.r-30,'+'+hv+' 복원',GMC,18);for(let i=0;i<12;i++){const a=rnd(0,TAU),d=rnd(50,90);Pt.push({x:f.x+Math.cos(a)*d,y:f.y+Math.sin(a)*d,vx:-Math.cos(a)*d*2.2,vy:-Math.sin(a)*d*2.2,l:.45,m:.45,sh:10,cube:1,r:rnd(2,4),rot:rnd(0,TAU),vr:rnd(-8,8),col:i%2?GMC:'#fff6d0',fr:1})}}}}})};
const _initGM=init;init=function(){_initGM.apply(this,arguments);if(F)F.forEach(f=>{f.gmD=0;f.gmT=0;f.gmSt=0;f.gmBig=0})};
// 고라라 글자
function gmShout(x,y,txt,s,al,rot){g.save();g.translate(x,y);g.rotate(rot||-.12);g.scale(s,s);g.globalAlpha=al;g.font='900 30px '+GMF;g.textAlign='center';g.textBaseline='middle';g.lineJoin='round';g.lineWidth=7;g.strokeStyle='#1a0e2a';g.strokeText(txt,0,0);
  const gr=g.createLinearGradient(0,-16,0,16);gr.addColorStop(0,'#fff6d0');gr.addColorStop(.5,GMC);gr.addColorStop(1,'#b07810');g.fillStyle=gr;g.fillText(txt,0,0);g.restore()}
// ---------- 1) 고라라 러쉬 ----------
function gmRush(o,t){HZ.push({k:'gmrs',o,tg:t,t:0,ns:0,P:[],hc:new Map()});o.gmSt=1.9;o.gmBig=0;o.gmDir=t.x<o.x?-1:1;SFXa('kgm_stand');SFXa('kgm_rush')}
HZX.gmrs=(h,dt,EN)=>{const o=h.o;let e=h.tg;if(!e||e.dead){e=tgt(o);h.tg=e}if(o.dead)return h.P.length>0;o.gcd=Math.max(o.gcd,.25);o.slow=Math.max(o.slow,.3);if(e)o.gmDir=e.x<o.x?-1:1;
  if(e&&h.t<1.35&&h.t>=.1+h.ns*.05){h.ns++;const ba=Math.atan2(e.y-o.y,e.x-o.x),sp=gmStandPos(o);let sx,sy;
    if(h.ns%2){sx=sp.x+rnd(-26,26);sy=sp.y+rnd(-26,26)}else{const oa=ba+Math.PI/2*(Math.random()<.5?-1:1)*rnd(.4,1.2),od=rnd(40,95);sx=o.x+Math.cos(oa)*od;sy=o.y+Math.sin(oa)*od}
    const tx=e.x+rnd(-10,10),ty=e.y+rnd(-10,10);h.P.push({x:sx,y:sy,a:Math.atan2(ty-sy,tx-sx),v:900,t:0,s:rnd(.8,.95)})}
  if(e&&h.t>=1.42&&!h.fin){h.fin=1;const a=Math.atan2(e.y-o.y,e.x-o.x);h.P.push({x:o.x+Math.cos(a)*o.r,y:o.y+Math.sin(a)*o.r,a,v:760,t:0,s:1.45,big:1})}
  h.P=h.P.filter(p=>{p.t+=dt;p.x+=Math.cos(p.a)*p.v*dt;p.y+=Math.sin(p.a)*p.v*dt;if(p.t>.6||p.x<-20||p.x>A+20||p.y<-20||p.y>A+20)return false;
    for(const x of EN){if(x.hid||x.jump)continue;if(Math.hypot(x.x-p.x,x.y-p.y)<x.r+6*p.s){if(p.big){SFXa('kgm_fin');hurt(x,3.5,o,x.x,x.y,0,1);safePush(x,p.a,70);x.stn=Math.max(x.stn,.25);if(typeof lkImp=='function')lkImp(x.x,x.y,90,GMC);shake=Math.max(shake,14)}
      else{hurt(x,.3,o,p.x,p.y,0,0);safePush(x,p.a,3);if(Math.random()<.5)SFXa('kgm_hit');for(let i=0;i<2;i++)sparkP(p.x,p.y,rnd(-90,90),rnd(-90,90),GMC,2)}return false}}return true});
  return h.t<1.5||h.P.length>0};
HZP.gmrs=h=>{const o=h.o;h.P.forEach(p=>{gmFist(p.x-Math.cos(p.a)*16,p.y-Math.sin(p.a)*16,p.a,p.s,.28);gmFist(p.x,p.y,p.a,p.s,1)});if(h.t<1.5&&!o.dead){const k=h.t,al=k<.1?k/.1:k>1.3?Math.max(0,1-(k-1.3)/.2):1;gmShout(o.x+(o.gmDir||1)*-10,o.y-o.r-34+Math.sin(k*30)*2,'고라라라라!',1+.06*Math.sin(k*40),al)}};
// ---------- 2) 복원 결박 ----------
function gmFix(o,t){const x=clamp(t.x+t.dx*t.sp*.35,40,A-40),y=clamp(t.y+t.dy*t.sp*.35,40,A-40);HZ.push({k:'gmfx',o,tg:t,t:0,x,y,S:Array.from({length:16},(_,i)=>({a:i*TAU/16+rnd(-.15,.15),d:rnd(60,115),rot:rnd(0,TAU),sz:rnd(6,11)}))});o.gmSt=1.3;o.gmBig=0;o.gmDir=t.x<o.x?-1:1;SFXa('kgm_stand')}
HZX.gmfx=(h,dt,EN)=>{const o=h.o;
  if(h.t>=.3&&!h.br){h.br=1;SFXa('kgm_break');shake=Math.max(shake,10);FX.push({k:'crack',x:h.x,y:h.y,r:70,l:1.2,m:1.2});EN.forEach(x=>{if(!x.hid&&!x.jump&&Math.hypot(x.x-h.x,x.y-h.y)<70+x.r){hurt(x,3,o,x.x,x.y,0,0)}})}
  if(h.t>=1.0&&!h.fx){h.fx=1;SFXa('kgm_fix')}
  if(h.t>=1.25&&!h.bd){h.bd=1;SFXa('kgm_bind');EN.forEach(x=>{if(!x.hid&&!x.jump&&Math.hypot(x.x-h.x,x.y-h.y)<125+x.r){x.x=h.x+(x.x-h.x)*.25;x.y=h.y+(x.y-h.y)*.25;hurt(x,2,o,x.x,x.y,0,1);x.stn=Math.max(x.stn,.8);x.cast=null;h.got=x}});if(typeof lkImp=='function')lkImp(h.x,h.y,100,GMC);ring(h.x,h.y,120,10,GMC,6,.35)}
  return h.t<2.2};
HZD.gmfx=h=>{const t=h.t;if(t<.3){const u=t/.3;g.save();g.strokeStyle=GMC;g.globalAlpha=.5*u;g.setLineDash([6,6]);g.lineWidth=2;g.beginPath();g.arc(h.x,h.y,70,0,TAU);g.stroke();g.setLineDash([]);g.restore()}
  else if(t<1.25){g.save();g.globalAlpha=.4;g.fillStyle='rgba(20,10,0,.6)';g.beginPath();g.arc(h.x,h.y,46,0,TAU);g.fill();g.restore()}};
HZP.gmfx=h=>{const t=h.t;if(t<.3){const u=t/.3;gmFist(h.x-60*(1-u),h.y-90*(1-u),Math.atan2(90,60),1.3,u)}
  if(t>=.3&&t<1.5){const out=Math.min(1,(t-.3)/.2),back=t<1?0:Math.min(1,(t-1)/.25),k=out*(1-back);h.S.forEach(s=>{const x=h.x+Math.cos(s.a)*s.d*k,y=h.y+Math.sin(s.a)*s.d*k-Math.sin(Math.PI*out)*10*(1-back);g.save();g.translate(x,y);g.rotate(s.rot+t*4*(1-back));g.fillStyle=back>0?'#fff6d0':'#8a6a3a';g.strokeStyle=GMC;g.lineWidth=1.5;g.beginPath();g.moveTo(-s.sz,-s.sz*.5);g.lineTo(s.sz*.6,-s.sz*.7);g.lineTo(s.sz,s.sz*.4);g.lineTo(-s.sz*.3,s.sz*.7);g.closePath();g.fill();g.stroke();
      if(back>0){g.globalCompositeOperation='lighter';glow(GMC,0,0,s.sz*2,.6)}g.restore()});
    if(t>=1){const k=t-1;g.save();g.globalAlpha=Math.max(0,1-k/.5);g.font='900 22px '+GMF;g.textAlign='center';g.lineJoin='round';g.lineWidth=6;g.strokeStyle='#1a0e2a';g.strokeText('복원!',h.x,h.y-80-k*10);g.fillStyle=GMC;g.fillText('복원!',h.x,h.y-80-k*10);g.restore()}}
  if(h.got&&t<2.2&&!h.got.dead){const e=h.got,k=(t-1.25)/.95;g.save();g.translate(e.x,e.y);g.strokeStyle=GMC;g.lineWidth=3;g.globalAlpha=1-k*.6;for(let i=0;i<3;i++){g.beginPath();g.ellipse(0,(i-1)*e.r*.45,e.r*1.12,e.r*.32,.2*(i-1),0,TAU);g.stroke()}g.restore()}};
// ---------- 3) ULT 전방위 러쉬 ----------
const GMD=1.1;
function gmUlt(o,t){if(!t||t.dead)t=tgt(o);if(!t)return;HZ.push({k:'gmul',o,tg:t,t:0,ns:0,P:[],S:[],C:[]})}
function gmShard(x,y,sz,rot,c1,glw){g.save();g.translate(x,y);g.rotate(rot);g.fillStyle=c1;g.strokeStyle='#3a1a08';g.lineWidth=1.4;g.beginPath();g.moveTo(-sz,-sz*.5);g.lineTo(sz*.6,-sz*.75);g.lineTo(sz,sz*.35);g.lineTo(-sz*.25,sz*.75);g.closePath();g.fill();g.stroke();
  if(glw>0){g.globalCompositeOperation='lighter';glow(GMC,0,0,sz*2.2,.55*glw)}g.restore()}
HZX.gmul=(h,dt,EN)=>{const o=h.o;let e=h.tg;const u=h.t-GMD;h.u=u;if(u<0)return true;if(!e||e.dead||e.hid){if(!h.lk){e=tgt(o);h.tg=e}}if(!e)return u<.5;
  if(!o.dead){o.gcd=Math.max(o.gcd,.4);o.cast=null;o.gmSt=Math.max(o.gmSt,.3);o.gmBig=1;o.gmDir=e.x<o.x?-1:1}
  const live=!e.dead&&!e.hid;
  // ① 땅을 부숨 → 조각이 사방으로 흩어짐
  if(!h.lk){h.lk=1;h.cx=clamp(e.x,60,A-60);h.cy=clamp(e.y,60,A-60);SFXa('kgm_stand');SFXa('kgm_break');hurt(e,3,o,e.x,e.y,0,1);safePush(e,o.dead?0:ang(o,e),80);shake=Math.max(shake,18);
    FX.push({k:'crack',x:h.cx,y:h.cy,r:110,l:2.6,m:2.6});if(typeof lkImp=='function')lkImp(h.cx,h.cy,120,GMC);
    for(let i=0;i<24;i++){const a=i*TAU/24+rnd(-.12,.12),d=rnd(90,250),hx=h.cx+Math.cos(a)*rnd(4,46),hy=h.cy+Math.sin(a)*rnd(4,46);h.S.push({hx,hy,x:hx,y:hy,lx:clamp(h.cx+Math.cos(a)*d,14,A-14),ly:clamp(h.cy+Math.sin(a)*d,14,A-14),sz:rnd(7,13),rot:rnd(0,TAU),vr:rnd(-9,9)})}}
  // ② 러쉬 : 상대 주변 여러 곳에서 주먹 · 맞을 때마다 상대 몸에서 조각이 떨어져 나감
  if(live&&u>=.35&&u<1.9&&h.ns<28&&u>=.35+h.ns*.052){h.ns++;const sp=o.dead?{x:o.x,y:o.y}:gmStandPos(o),a=rnd(0,TAU),R=rnd(140,220);let sx,sy;if(h.ns%3==0){sx=sp.x+rnd(-20,20);sy=sp.y+rnd(-20,20)}else{sx=e.x+Math.cos(a)*R;sy=e.y+Math.sin(a)*R}
    h.P.push({x:sx,y:sy,a:Math.atan2(e.y-sy+rnd(-8,8),e.x-sx+rnd(-8,8)),v:950,t:0,s:rnd(.8,.95)});if(h.ns==1)SFXa('kgm_rush')}
  h.P=h.P.filter(p=>{p.t+=dt;p.x+=Math.cos(p.a)*p.v*dt;p.y+=Math.sin(p.a)*p.v*dt;if(p.t>.45)return false;if(live&&Math.hypot(e.x-p.x,e.y-p.y)<e.r+8){hurt(e,.26,o,p.x,p.y,0,0);safePush(e,p.a,2);if(Math.random()<.45)SFXa('kgm_hit');sparkP(p.x,p.y,rnd(-90,90),rnd(-90,90),GMC,2);
    if(h.C.length<14&&Math.random()<.55){const ca=p.a+rnd(-.9,.9),cd=rnd(70,160);h.C.push({x:e.x,y:e.y,sx:e.x,sy:e.y,lx:clamp(e.x+Math.cos(ca)*cd,14,A-14),ly:clamp(e.y+Math.sin(ca)*cd,14,A-14),t:0,sz:rnd(4,7),rot:rnd(0,TAU),c:e.d.col})}return false}return true});
  // 조각 움직임 (흩어짐)
  h.S.forEach(q=>{if(u<2){const k=Math.min(1,u/.35),ee=1-Math.pow(1-k,3);q.x=q.hx+(q.lx-q.hx)*ee;q.y=q.hy+(q.ly-q.hy)*ee-Math.sin(Math.PI*k)*30;q.rot+=q.vr*dt*(1-k)}});
  h.C.forEach(q=>{q.t+=dt;if(!h.rs){const k=Math.min(1,q.t/.3),ee=1-Math.pow(1-k,3);q.x=q.sx+(q.lx-q.sx)*ee;q.y=q.sy+(q.ly-q.sy)*ee-Math.sin(Math.PI*k)*18}});
  if(live&&u>=.3&&u<1.95){e.x+=(h.cx-e.x)*Math.min(1,dt*2.5);e.y+=(h.cy-e.y)*Math.min(1,dt*2.5);e.stn=Math.max(e.stn,.12);e.cast=null}
  // ③ 복원! : 모든 조각이 제자리로 · 상대를 부서진 땅으로 끌고 감 · 몸 조각은 상대에게 꽂히며 돌아감
  if(u>=2&&!h.rs){h.rs=1;h.ru=u;SFXa('kgm_fix');shake=Math.max(shake,8);h.C.forEach(q=>{q.sx=q.x;q.sy=q.y;q.t=0});h.S.forEach(q=>{q.sx=q.x;q.sy=q.y})}
  if(h.rs&&!h.sl){const k=Math.min(1,(u-2)/.5),ee=k*k*(3-2*k);
    if(live){e.x+=(h.cx-e.x)*Math.min(1,dt*9);e.y+=(h.cy-e.y)*Math.min(1,dt*9);e.stn=Math.max(e.stn,.15);e.cast=null}
    h.S.forEach(q=>{const px=q.x,py=q.y;q.x=q.sx+(q.hx-q.sx)*ee;q.y=q.sy+(q.hy-q.sy)*ee;q.rot+=dt*6*(1-k);if(live&&!q.hit&&Math.hypot(e.x-q.x,e.y-q.y)<e.r+9){q.hit=1;hurt(e,.13,o,q.x,q.y,0,0);sparkP(q.x,q.y,(q.x-px)*8,(q.y-py)*8,GMC,2)}});
    h.C.forEach(q=>{if(q.in)return;const kk=Math.min(1,q.t/.35);q.x=q.sx+((live?e.x:h.cx)-q.sx)*kk*kk;q.y=q.sy+((live?e.y:h.cy)-q.sy)*kk*kk;if(kk>=1){q.in=1;if(live){hurt(e,.25,o,e.x,e.y,0,0);if(Math.random()<.5)SFXa('kgm_hit')}}})}
  // ④ 봉인 : 땅이 고쳐지면서 상대가 금빛 바위에 묻힘
  if(u>=2.55&&!h.sl){h.sl=1;SFXa('kgm_bind');shake=Math.max(shake,16);hs=.08;if(live){e.x=h.cx;e.y=h.cy;e.stn=Math.max(e.stn,1.35);e.cast=null;h.got=1}ring(h.cx,h.cy,130,10,GMC,8,.4);if(typeof lkImp=='function')lkImp(h.cx,h.cy,100,GMC);
    h.rk=Array.from({length:9},(_,i)=>{const a=i*TAU/9+rnd(-.15,.15);return{a,d:rnd(.95,1.25)}});
    if(!o.dead){o.hp=Math.min(100,o.hp+12);SFXa('kgm_heal');ft(o.x,o.y-o.r-34,'+12 복원',GMC,20)}}
  if(h.sl&&!h.bst&&live){e.x+=(h.cx-e.x)*Math.min(1,dt*12);e.y+=(h.cy-e.y)*Math.min(1,dt*12);e.cast=null}
  // ⑤ 바위째 "고라!"
  if(u>=3.85&&!h.bst){h.bst=1;SFXa('kgm_fin');if(live){hurt(e,6,o,e.x,e.y,0,1);safePush(e,o.dead?0:ang(o,e),110);e.stn=Math.max(e.stn,.3)}shake=Math.max(shake,24);hs=.14;ring(h.cx,h.cy,10,170,GMC,10,.5);FX.push({k:'crack',x:h.cx,y:h.cy,r:90,l:1.6,m:1.6});
    if(!SKIP)for(let i=0;i<22;i++){const a=rnd(0,TAU),v=rnd(160,380);Pt.push({x:h.cx,y:h.cy,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l:.6,m:.6,sh:10,cube:1,r:rnd(3,6),rot:rnd(0,TAU),vr:rnd(-10,10),col:i%3?GMC:'#8a6a3a',fr:1})}}
  return u<4.3||h.P.length>0};
HZD.gmul=h=>{const u=h.u;if(!(u>=0)||!h.lk)return;const fa=u<3.9?Math.min(1,u/.2):Math.max(0,1-(u-3.9)/.4);if(typeof lkDim=='function')lkDim(.5*fa);
  if(u<2.55){const k=u<2?1:1-(u-2)/.55;g.save();g.globalAlpha=.75*k;g.fillStyle='#120a02';g.beginPath();for(let i=0;i<12;i++){const a=i*TAU/12,r=(i%2?40:56);g.lineTo(h.cx+Math.cos(a)*r,h.cy+Math.sin(a)*r)}g.closePath();g.fill();g.strokeStyle='rgba(255,200,58,.5)';g.lineWidth=2;g.stroke();g.restore()}
  if(h.rs&&!h.sl){g.save();g.globalAlpha=.6;g.strokeStyle=GMC;g.lineWidth=1.5;g.setLineDash([3,6]);h.S.forEach(q=>{g.beginPath();g.moveTo(q.x,q.y);g.lineTo(q.hx,q.hy);g.stroke()});g.setLineDash([]);g.restore()}};
HZP.gmul=h=>{const u=h.u;if(!(u>=0)||!h.lk)return;const e=h.tg;
  if(!h.sl){const gl=h.rs?1:0;h.S.forEach(q=>gmShard(q.x,q.y,q.sz,q.rot,h.rs?'#ffe08a':'#8a6a3a',gl));h.C.forEach(q=>{if(!q.in)gmShard(q.x,q.y,q.sz,q.rot+u*3,q.c||GMC,h.rs?.8:.3)})}
  h.P.forEach(p=>{gmFist(p.x-Math.cos(p.a)*16,p.y-Math.sin(p.a)*16,p.a,p.s,.28);gmFist(p.x,p.y,p.a,p.s,1)});
  // 금빛 바위 봉인
  if(h.sl&&!h.bst&&e&&!e.dead){const k=Math.min(1,(u-2.55)/.12),R=e.r*1.55*k,sh=u>3.6?rnd(-2,2):0;g.save();g.translate(e.x+sh,e.y);
    g.fillStyle='rgba(138,106,58,.92)';g.strokeStyle='#3a1a08';g.lineWidth=2.5;g.beginPath();h.rk.forEach((q,i)=>{const x=Math.cos(q.a)*R*q.d,y=Math.sin(q.a)*R*q.d;i?g.lineTo(x,y):g.moveTo(x,y)});g.closePath();g.fill();g.stroke();
    g.strokeStyle=GMC;g.lineWidth=2;g.beginPath();h.rk.forEach((q,i)=>{if(i%2)return;g.moveTo(Math.cos(q.a)*R*q.d*.85,Math.sin(q.a)*R*q.d*.85);g.lineTo(Math.cos(q.a+.4)*R*.35,Math.sin(q.a+.4)*R*.35)});g.stroke();
    g.globalCompositeOperation='lighter';glow(GMC,0,0,R*1.3,.25+.15*Math.sin(clock*10));g.restore();
    if(u<3.4){const kk=u-2.55;g.save();g.globalAlpha=Math.min(1,kk/.1)*Math.max(0,1-Math.max(0,kk-.6)/.25);g.font='900 22px '+GMF;g.textAlign='center';g.lineJoin='round';g.lineWidth=6;g.strokeStyle='#1a0e2a';g.strokeText('고정!',e.x,e.y-e.r*1.7-8);g.fillStyle=GMC;g.fillText('고정!',e.x,e.y-e.r*1.7-8);g.restore()}}
  // 외침
  if(u>=.35&&u<1.95){const k=u-.35;gmShout(A/2+Math.sin(k*30)*3,A*.16,'고라라라라라라!!',1.2+.05*Math.sin(k*40),Math.min(1,k/.1),-.08)}
  else if(u>=2&&u<2.6){const k=u-2;gmShout(A/2,A*.16,'복원!',k<.1?2.2-k*8:1.4,Math.max(0,1-Math.max(0,k-.4)/.2),-.05)}
  else if(u>=3.85&&u<4.4){const k=u-3.85,s=k<.1?2.4-k*10:1.4;gmShout(h.cx,h.cy-70,'고라!',s,Math.max(0,1-Math.max(0,k-.35)/.2),-.15)}};
Object.assign(DMGK,{kgm:1.14});
EMB.kgm=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*2.2)*.05);neon({col:GMC,hi:'#fff6d0'},1.7,()=>{g.beginPath();g.moveTo(-7,-15);g.lineTo(-9,-4);g.lineTo(-4,-4);g.lineTo(-6,6);g.moveTo(7,-15);g.lineTo(5,-4);g.lineTo(10,-4);g.lineTo(8,6)});
  neon(D,1.4,()=>{g.beginPath();g.moveTo(-13,10);g.lineTo(-4,16);g.lineTo(4,16);g.lineTo(13,10);g.moveTo(0,-19);g.lineTo(3,-13);g.lineTo(-3,-13);g.closePath()});
  neon({col:'#b07bff',hi:'#ead8ff'},1,()=>{g.beginPath();g.moveTo(-19,-12);g.lineTo(-15,-17);g.moveTo(19,-12);g.lineTo(15,-17)});g.save();g.globalCompositeOperation='lighter';glow(GMC,0,0,16,.3);g.restore()};
document.querySelectorAll('#grid .tile').forEach(t=>{const i=+t.dataset.i,vc=DEF.filter(x=>x.vof===i).length;let em=t.querySelector('.vb');if(vc){if(!em){em=document.createElement('em');em.className='vb';t.appendChild(em)}em.textContent='+'+vc}});
Object.keys(ICC).forEach(k=>delete ICC[k]);mkDict();
;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ▶ 섹션 : extra27
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ===== extra27.js : 언더테일 5인방 =====
// 박지성 • 아스고어 · 김티비 • 메타톤 · 김가은 • 언다인 · 흉악범 • 플라위 · 김지우 • 파피루스
// 사진 : images 폴더의 ut_*.png (배경 지운 도트 그림)
//   같은 이름으로 .gif 나 .mp4 를 넣으면 움직이는 그림으로 바뀜 (gif · 영상의 검은 배경은 자동으로 지움)
// 색 공격 규칙 (언더테일) : 파랑 = 움직이면 아픔 · 주황 = 멈춰 있으면 아픔 · 상대가 30% 확률로 읽고 피함 (MISS)
// ======================================================================

// ---------- 그림 불러오기 (gif → mp4 → png · webp · jpg) ----------
const UTI={},UTN=['ut_asgore','ut_asgore_atk','ut_mtt_box','ut_mtt_neo','ut_undyne','ut_undyne_x','ut_flowey','ut_flowey_x','ut_flowey_tv','ut_papyrus'];
function utKey(c){const x=c.getContext('2d'),D=x.getImageData(0,0,c.width,c.height),p=D.data;for(let i=0;i<p.length;i+=4){const m=Math.max(p[i],p[i+1],p[i+2]);if(m<34)p[i+3]=0;else if(m<60)p[i+3]=Math.min(p[i+3],(m-34)*10)}x.putImageData(D,0,0);return c}
function utLoad(n,probe){if(!probe){if(n in UTI)return;UTI[n]=null}const done=o=>{UTI[n]=o},fb=()=>{if(!probe)img(0)};
  const img=i=>{const L=['images/'+n+'.png','images/'+n+'.webp','images/'+n+'.jpg',n+'.png','../images/'+n+'.png'];if(i>=L.length)return;const im=new Image();im.onload=()=>done({im,w:im.width,h:im.height});im.onerror=()=>img(i+1);im.src=L[i]};
  const vid=()=>{fetch('images/'+n+'.mp4',{method:'HEAD'}).then(r=>{if(!r.ok)throw 0;vid2()}).catch(fb)};
  const vid2=()=>{try{const v=document.createElement('video');v.muted=true;v.loop=true;v.playsInline=true;v.setAttribute('playsinline','');v.preload='auto';v.onloadeddata=()=>{done({vid:v,w:v.videoWidth,h:v.videoHeight});try{v.play().catch(()=>{})}catch(e){}};v.onerror=fb;v.src='images/'+n+'.mp4'}catch(e){fb()}};
  const gif=()=>{if(typeof fetch!='function'||location.protocol=='file:'){fb();return}fetch('images/'+n+'.gif').then(r=>{if(!r.ok)throw 0;return r.arrayBuffer()}).then(async buf=>{
    if(typeof ImageDecoder=='undefined'){const im=new Image();im.onload=()=>done({im,w:im.width,h:im.height});im.src=URL.createObjectURL(new Blob([buf],{type:'image/gif'}));return}
    const dec=new ImageDecoder({data:buf,type:'image/gif'});await dec.tracks.ready;const N=dec.tracks.selectedTrack.frameCount,fr=[];let tot=0;
    for(let i=0;i<N;i++){const r=await dec.decode({frameIndex:i}),vf=r.image,c=document.createElement('canvas');c.width=vf.displayWidth;c.height=vf.displayHeight;c.getContext('2d').drawImage(vf,0,0);const d=Math.max(.02,(vf.duration||100000)/1e6);vf.close();fr.push({c:utKey(c),d});tot+=d}
    done({fr,tot,w:fr[0].c.width,h:fr[0].c.height})}).catch(()=>vid())};
  if(probe)gif();else img(0)}
UTN.forEach(n=>utLoad(n));
// gif · mp4 는 게임이 다 켜진 뒤에 하나씩 천천히 찾아봄
setTimeout(()=>{let i=0;const nx=()=>{if(i>=UTN.length)return;const n=UTN[i++],o=UTI[n];utLoad(n,1);setTimeout(nx,700)};nx()},6000);
function utSrc(n){const o=UTI[n];if(!o)return null;if(o.fr){let t=(clock||0)%o.tot;for(const f of o.fr){if(t<f.d)return f.c;t-=f.d}return o.fr[0].c}if(o.vid){if(o.vid.paused)try{o.vid.play().catch(()=>{})}catch(e){}return o.vid}return o.im}
// (x,y) = 그림 아래 가운데 (cen 이면 가운데) · h = 높이
// 그림 안에서 몸통이 한쪽으로 치우친 그림은 가운데로 맞춤 (언다인 각성 = 눈의 오라 때문에 오른쪽이 넓음)
const UTOFF={ut_undyne_x:.146,ut_undyne:-.12,ut_papyrus:.05,ut_asgore_atk:.04};
function utDraw(n,x,y,h,al,flip,cen,comp){const o=UTI[n],s=utSrc(n);if(!s||!o||!(al>0))return false;const w=h*o.w/o.h,ofs=(UTOFF[n]||0)*w;g.save();g.globalAlpha=Math.min(1,al);g.imageSmoothingEnabled=false;
  if(o.vid)g.globalCompositeOperation='screen';else if(comp)g.globalCompositeOperation=comp;g.translate(Math.round(x),Math.round(y));if(flip)g.scale(-1,1);g.drawImage(s,-w/2+ofs,cen?-h/2:-h,w,h);g.restore();return true}
function utW(n,h){const o=UTI[n];return o?h*o.w/o.h:h}

// ---------- 공통 ----------
const UTO='#fca600',UTB='#14a9ff',UTGR='#00e04a',UTYL='#ffff00',UTFN='"Galmuri11","Noto Sans KR",sans-serif',UTP8='"Press Start 2P","Galmuri11",monospace';
function utStill(e){return e.stn>0||e.frz>0||e.udPin>0||e.ppPin>0}
// 색 공격 판정 : true = 맞음
function utCol(e,col,read){if(col!='b'&&col!='o')return true;const st=utStill(e);if(col=='b'&&st){utMiss(e);return false}if(col=='o'&&st)return true;
  if(Math.random()<(read==null?.3:read)){if(col=='b')e.stn=Math.max(e.stn||0,.3);else e.dash=Math.max(e.dash||0,.2);utMiss(e);return false}return true}
function utMiss(e){if(!SKIP)ft(e.x,e.y-e.r-28,'MISS','#c8c8c8',17)}
function utTxt(txt,x,y,sz,col,al,align,font){if(!(al>0))return;g.save();g.globalAlpha=Math.min(1,al);g.font=sz+'px '+(font||UTFN);g.textAlign=align||'center';g.textBaseline='middle';g.lineJoin='round';g.lineWidth=Math.max(3,sz*.28);g.strokeStyle='#000';g.strokeText(txt,x,y);g.fillStyle=col||'#fff';g.fillText(txt,x,y);g.restore()}
// 언더테일 대사 상자
function utSay(txt,t,al,y){if(!(al>0))return;const w=A-48,h=58,x=24;y=y==null?A-82:y;g.save();g.globalAlpha=Math.min(1,al);g.fillStyle='#000';g.fillRect(x,y,w,h);g.strokeStyle='#fff';g.lineWidth=4;g.strokeRect(x,y,w,h);
  const s='* '+utTy(txt,t,.03);let fs=17;g.font=fs+'px '+UTFN;while(g.measureText('* '+txt).width>w-30&&fs>11){fs--;g.font=fs+'px '+UTFN}g.textAlign='left';g.textBaseline='middle';g.fillStyle='#fff';g.fillText(s,x+16,y+h/2+1);g.restore()}
// 스탠드처럼 공 뒤에 뜨는 도트 그림
const UTSP={};
function utBehind(f,n,h,al,ox,oy){const d=f.utDir||(f.dx<0?-1:1),bob=Math.sin(clock*2.6+f.i*1.7)*3;return utDraw(n,f.x-d*f.r*(ox==null?.55:ox),f.y+f.r*(oy==null?.45:oy)+bob,h,al,d<0)}
const _afterUT=afterImg;afterImg=function(f){_afterUT(f);if(f.dead||f.hid||phase=='menu'||!f.d)return;const fn=UTSP[f.d.k];if(fn)fn(f)};
// 불꽃 탄 (아스고어 · 플라위 화염)
function utFire(x,y,s,al,a){if(!(al>0))return;g.save();g.translate(x,y);g.rotate((a==null?-Math.PI/2:a)+Math.PI/2);g.scale(s,s);g.globalAlpha=Math.min(1,al);const fl=1+.12*Math.sin(clock*40+x);
  g.save();g.globalCompositeOperation='lighter';glow('#ff6a1a',0,0,20,.55);g.restore();
  g.fillStyle='#ff5a14';g.beginPath();g.moveTo(0,-15*fl);g.quadraticCurveTo(9,-3,7,4);g.quadraticCurveTo(5,10,0,10);g.quadraticCurveTo(-5,10,-7,4);g.quadraticCurveTo(-9,-3,0,-15*fl);g.fill();
  g.fillStyle='#ffc23a';g.beginPath();g.moveTo(0,-9*fl);g.quadraticCurveTo(5,-1,4,4);g.quadraticCurveTo(3,7,0,7);g.quadraticCurveTo(-3,7,-4,4);g.quadraticCurveTo(-5,-1,0,-9*fl);g.fill();
  g.fillStyle='#fffbe8';g.beginPath();g.ellipse(0,3,2.4,3.4,0,0,TAU);g.fill();g.restore()}
// 언더테일 버튼
function utBtn(x,y,w,h,lab,al,on,ic){if(!(al>0))return;g.save();g.globalAlpha=Math.min(1,al);g.fillStyle='#000';g.fillRect(x-w/2,y-h/2,w,h);g.strokeStyle=on?UTYL:UTO;g.lineWidth=3;g.strokeRect(x-w/2,y-h/2,w,h);
  g.font='13px '+UTP8;g.textAlign='center';g.textBaseline='middle';g.fillStyle=on?UTYL:UTO;g.fillText(lab,x+8,y+1);if(on&&typeof utHeart=='function')utHeart(x-w/2+14,y,1.6,'#ff0000');else{g.fillStyle=UTO;g.fillRect(x-w/2+9,y-5,8,10)}g.restore()}
// 효과음은 sound.js 가 직접 만들어서 넣음 → mp3 를 찾으러 가지 않음 (폰에서 요청이 너무 많아지면 다른 파일을 못 불러옴)
function utPush(n){if(!SND.includes(n))SND.push(n)}

// ======================================================================
// 박지성 • 아스고어 (괴물들의 왕 · 붉은 삼지창)
// 패시브 왕의 불꽃 : 6.5초마다 몸 주위에 불꽃 3개가 돌다가 상대에게 날아감 · 큰 몸 (받는 피해 -8%)
// 1) 불꽃 고리 : 상대 주위에 불꽃 고리 → 빙글빙글 돌며 조여옴 (빈틈 하나)
// 2) 삼지창 휘두르기 : 파랑 → 주황 두 번 크게 휘두름 (파랑은 움직이면, 주황은 멈춰 있으면 아픔)
// 3) ULT 자비는 없다 : FIGHT · ACT · ITEM · MERCY 버튼 → 삼지창이 MERCY 를 박살 → 파랑 · 주황 · 빨강 세 번 베기 → 하늘에서 내리꽂기 + 불기둥
// ======================================================================
const ASR='#ff1e32',ASDL=1.1;
['as_ring','as_fire','as_draw','as_swing','as_hit','as_menu','as_break','as_stab','as_erupt','as_orb','as_text'].forEach(utPush);
Object.assign(SLB,{as_ring:'아스고어 · 불꽃 고리',as_fire:'아스고어 · 불꽃 조이기',as_draw:'아스고어 · 삼지창 꺼냄',as_swing:'아스고어 · 휘두르기',as_hit:'아스고어 · 삼지창 명중',as_menu:'아스고어 · 버튼',as_break:'아스고어 · MERCY 파괴',as_stab:'아스고어 · 내리꽂기',as_erupt:'아스고어 · 불기둥',as_orb:'아스고어 · 왕의 불꽃',as_text:'아스고어 · 대사'});
const ASSK=[
  {n:'불꽃 고리',w:.3,cd:8.5,c:(o,t)=>!t.hid&&dist(o,t)<560,f:(o,t)=>asRing(o,t)},
  {n:'삼지창 휘두르기',w:.35,cd:10,c:(o,t)=>!t.hid&&!t.jump&&dist(o,t)<340,f:(o,t)=>asSweep(o,t)},
  {n:'자비는 없다',w:.4,ult:1,c:(o,t)=>!t.hid,f:(o,t)=>asUlt(o,t)}];
const ASI=DEF.findIndex(d=>d.name=='박지성');
DEF.push({name:'박지성 • 아스고어',gl:'왕',k:'asg',vof:ASI,r:29,sp:196,col:'#e0202e',hi:'#ffd36a',dk:'#2a0508',alt:{col:'#7a3cff',hi:'#ffe6a0',dk:'#14063a'},alt2:{col:'#ffb020',hi:'#fff0c0',dk:'#3a2200'},sk:ASSK});
INFO['박지성 • 아스고어']={st:[9,8,5,7,8,10],p:'왕의 불꽃 · 6.5초마다 몸 주위를 도는 불꽃 3개가 상대에게 날아감 · 큰 몸이라 받는 피해 -8%',
  sk:[['1.3×12','상대 주위에 불꽃 고리가 생김 · 빙글빙글 돌면서 조여옴 · 빈틈은 딱 한 군데'],['4.5×2','붉은 삼지창을 크게 두 번 휘두름 · 파랑은 움직이면 아프고 주황은 멈춰 있으면 아픔 (읽히면 MISS)'],['3×3+7+화상','FIGHT · ACT · ITEM · MERCY 버튼이 뜨고 삼지창이 MERCY 를 박살 냄 → 파랑 · 주황 · 빨강 세 번 베기 → 하늘에서 삼지창을 내리꽂고 불기둥']]};
// ---------- 붉은 삼지창 ----------
// (x,y) = 자루 끝 · a = 방향 · L = 길이
function asRib(P,w0,s){// 굽은 날 : 가운데 선을 따라 점점 가늘어지는 띠
  const n=18,pt=t=>{const u=1-t;return[u*u*u*P[0][0]+3*u*u*t*P[1][0]+3*u*t*t*P[2][0]+t*t*t*P[3][0],(u*u*u*P[0][1]+3*u*u*t*P[1][1]+3*u*t*t*P[2][1]+t*t*t*P[3][1])*s]};
  const L=[],R=[];for(let i=0;i<=n;i++){const t=i/n,a=pt(Math.max(0,t-.01)),b=pt(Math.min(1,t+.01)),c=pt(t),dx=b[0]-a[0],dy=b[1]-a[1],m=Math.hypot(dx,dy)||1,w=w0*(1-Math.pow(t,1.6))*.5+.4;L.push([c[0]-dy/m*w,c[1]+dx/m*w]);R.push([c[0]+dy/m*w,c[1]-dx/m*w])}
  g.beginPath();L.forEach((q,i)=>i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1]));for(let i=R.length-1;i>=0;i--)g.lineTo(R[i][0],R[i][1]);g.closePath();g.fill();g.stroke();return pt}
function asTri(x,y,a,L,al,glw){if(!(al>0))return;g.save();g.translate(x,y);g.rotate(a);g.globalAlpha=Math.min(1,al);const w=Math.max(3.5,L*.03),h0=L*.66,RED='#e8132b',HI='#ff8a94',DK='#1e0004';
  if(glw>0){g.save();g.globalCompositeOperation='lighter';g.lineCap='round';g.strokeStyle='#ff1a2a';g.globalAlpha=al*glw*.2;g.lineWidth=w*7;g.beginPath();g.moveTo(0,0);g.lineTo(L*.96,0);g.stroke();g.globalAlpha=al*glw*.4;g.lineWidth=w*3;g.stroke();
    glow('#ff2a3a',L*.84,0,L*.24,.55*glw*al);g.restore();g.globalAlpha=Math.min(1,al)}
  g.lineJoin='round';g.lineCap='round';g.strokeStyle=DK;g.lineWidth=Math.max(1.4,w*.3);g.fillStyle=RED;
  // 자루 끝 장식 (뾰족한 별)
  g.beginPath();for(let i=0;i<9;i++){const aa=Math.PI+(i-4)*.36,r=i%2?w*1.1:w*(i==4?3.4:2.4);g.lineTo(Math.cos(aa)*r,Math.sin(aa)*r)}g.closePath();g.fill();g.stroke();
  // 자루
  g.fillRect(0,-w/2,h0,w);g.strokeRect(0,-w/2,h0,w);g.fillStyle=HI;g.fillRect(w*1.2,-w/2+w*.16,h0-w*2.6,Math.max(1,w*.22));g.fillStyle='#9a0016';for(let i=1;i<=3;i++)g.fillRect(h0*.09*i-w*.25,-w*.62,w*.5,w*1.24);
  // 양옆 굽은 날 (초승달처럼 휘어 앞을 찌름)
  g.fillStyle=RED;[-1,1].forEach(s=>{const P=[[h0+w*.6,0],[h0+L*.035,L*.125],[h0+L*.16,L*.135],[L*.95,L*.07]],pt=asRib(P,w*2.2,s);
    const q=pt(.3),q2=pt(.36);g.beginPath();g.moveTo(q[0],q[1]);g.lineTo(q[0]-L*.035,q[1]+s*L*.045);g.lineTo(q2[0],q2[1]);g.closePath();g.fill();g.stroke();
    g.save();g.strokeStyle=HI;g.lineWidth=Math.max(1,w*.2);g.beginPath();for(let i=2;i<=14;i++){const c=pt(i/18);i==2?g.moveTo(c[0],c[1]-s*w*.25):g.lineTo(c[0],c[1]-s*w*.25)}g.stroke();g.restore()});
  // 가운데 창날
  g.fillStyle=RED;g.beginPath();g.moveTo(h0+w*1.4,-w*.7);g.lineTo(L*.86,-w*1.3);g.lineTo(L,0);g.lineTo(L*.86,w*1.3);g.lineTo(h0+w*1.4,w*.7);g.closePath();g.fill();g.stroke();
  g.strokeStyle=HI;g.lineWidth=Math.max(1,w*.2);g.beginPath();g.moveTo(h0+w*2,-w*.15);g.lineTo(L*.95,-w*.15);g.stroke();g.strokeStyle=DK;g.lineWidth=Math.max(1.4,w*.3);
  // 날 밑 고리
  g.fillStyle=RED;g.beginPath();g.arc(h0,0,w*1.7,0,TAU);g.fill();g.stroke();g.fillStyle=DK;g.beginPath();g.arc(h0,0,w*.75,0,TAU);g.fill();g.fillStyle=HI;g.beginPath();g.arc(h0-w*.7,-w*.7,w*.32,0,TAU);g.fill();
  g.restore()}
// 휘두른 자국 (색 띠)
function asTrail(px,py,a0,a1,r0,r1,col,al){if(!(al>0)||Math.abs(a1-a0)<.01)return;g.save();g.globalCompositeOperation='lighter';const lo=Math.min(a0,a1),hi=Math.max(a0,a1);
  for(let k=0;k<3;k++){g.globalAlpha=al*(.5-k*.14);g.fillStyle=k==2?'#ffffff':col;g.beginPath();g.arc(px,py,r1-k*4,lo,hi);g.arc(px,py,r0+(r1-r0)*(.25+k*.25),hi,lo,true);g.closePath();g.fill()}g.restore()}
function asColHex(c){return c=='b'?UTB:c=='o'?UTO:ASR}
// ---------- 패시브 ----------
const _hurtAS=hurt;hurt=function(t,n,o){if(t&&t.d&&t.d.k=='asg'&&o&&o!=t&&n>0&&!t.dead){const a=[...arguments];a[1]=Math.round(n*.92*10)/10;return _hurtAS.apply(this,a)}return _hurtAS.apply(this,arguments)};
const _updAS=update;update=function(dt){_updAS(dt);if(!F||phase!='play'||CIN||TSTOP||MAD)return;F.forEach(f=>{if(f.d.k!='asg'||f.dead||f.hid)return;f.asT=(f.asT||0)+dt;
  if(f.asT>=6.5){const e=tgt(f);if(e&&!e.dead&&dist(f,e)<460){f.asT=0;HZ.push({k:'asfo',o:f,t:0,B:[0,1,2].map(i=>({a:i*TAU/3,x:f.x,y:f.y,on:1}))});if(!SKIP)SFXa('as_orb')}}})};
const _initAS=init;init=function(){_initAS.apply(this,arguments);if(F)F.forEach(f=>{f.asT=0})};
HZX.asfo=(h,dt,EN)=>{const o=h.o;let live=0;h.B.forEach((b,i)=>{if(!b.on)return;live=1;if(h.t<.7||o.dead&&!b.go){if(o.dead){b.on=0;return}b.a+=dt*5;b.x=o.x+Math.cos(b.a)*(o.r+20);b.y=o.y+Math.sin(b.a)*(o.r+20);return}
    if(!b.go){b.go=1;const e=tgt(o)||EN[0];b.e=e;const aa=e?Math.atan2(e.y-b.y,e.x-b.x):b.a;b.vx=Math.cos(aa)*240;b.vy=Math.sin(aa)*240}
    const e=b.e;if(e&&!e.dead){const aa=Math.atan2(e.y-b.y,e.x-b.x),cur=Math.atan2(b.vy,b.vx);let da=Math.atan2(Math.sin(aa-cur),Math.cos(aa-cur));const na=cur+clamp(da,-dt*3.2,dt*3.2),sp=Math.min(380,Math.hypot(b.vx,b.vy)+dt*120);b.vx=Math.cos(na)*sp;b.vy=Math.sin(na)*sp}
    b.x+=b.vx*dt;b.y+=b.vy*dt;if(b.x<-30||b.x>A+30||b.y<-30||b.y>A+30||h.t>3){b.on=0;return}
    for(const x of EN){if(x.hid||x.jump)continue;if(Math.hypot(x.x-b.x,x.y-b.y)<x.r+8){b.on=0;hurt(x,1,o,b.x,b.y,0,0);for(let k=0;k<6;k++)fireP(b.x,b.y,rnd(-80,80),rnd(-120,-20),rnd(5,9),rnd(.25,.45));break}}});return live};
HZP.asfo=h=>{h.B.forEach(b=>{if(b.on)utFire(b.x,b.y,.85,Math.min(1,h.t/.2),b.go?Math.atan2(b.vy,b.vx):-Math.PI/2)})};
// 공 뒤 : 아스고어 (망토)
UTSP.asg=f=>{const k=f.asK||0;utBehind(f,'ut_asgore',f.r*3.3,.8+.2*k)};
// ---------- 1) 불꽃 고리 ----------
function asRing(o,t){const N=16,gp=Math.floor(rnd(0,N));HZ.push({k:'asrg',o,tg:t,t:0,cx:t.x,cy:t.y,R:190,rot:rnd(0,TAU),N,B:Array.from({length:N},(_,i)=>({a:i*TAU/N,on:i!=gp&&i!=(gp+1)%N}))});SFXa('as_ring')}
HZX.asrg=(h,dt,EN)=>{const e=h.tg;if(e&&!e.dead&&!e.hid){const fl=h.t>.55?3.2:1.4;h.cx+=(e.x-h.cx)*Math.min(1,dt*fl);h.cy+=(e.y-h.cy)*Math.min(1,dt*fl)}
  const u=h.t-.55;h.R=u<0?190:190*Math.max(0,1-u/1.45);h.rot+=dt*(u<0?.7:2);if(u>=0&&!h.go){h.go=1;SFXa('as_fire')}
  h.B.forEach(b=>{if(!b.on)return;b.x=h.cx+Math.cos(b.a+h.rot)*h.R;b.y=h.cy+Math.sin(b.a+h.rot)*h.R;if(u<0)return;
    for(const x of EN){if(x.hid||x.jump)continue;if(Math.hypot(x.x-b.x,x.y-b.y)<x.r+10){b.on=0;hurt(x,1.4,h.o,b.x,b.y,0,0);for(let k=0;k<5;k++)fireP(b.x,b.y,rnd(-90,90),rnd(-140,-20),rnd(5,10),rnd(.3,.5));break}}});
  if(h.R<=1&&!h.end){h.end=1;h.B.forEach(b=>{if(b.on){b.on=0;for(let k=0;k<3;k++)fireP(h.cx,h.cy,rnd(-160,160),rnd(-160,40),rnd(6,11),rnd(.3,.6))}})}
  return u<1.5};
HZD.asrg=h=>{const u=h.t-.55;if(u>.2)return;g.save();g.globalAlpha=.35*Math.min(1,h.t/.2)*(u>0?1-u/.2:1);g.strokeStyle='#ff8a2c';g.lineWidth=2;g.setLineDash([5,7]);g.lineDashOffset=-h.t*30;g.beginPath();g.arc(h.cx,h.cy,190,0,TAU);g.stroke();g.setLineDash([]);g.restore()};
HZP.asrg=h=>{const sp=Math.min(1,h.t/.45);h.B.forEach((b,i)=>{if(!b.on||b.x==null||i/h.N>sp)return;utFire(b.x,b.y,1.05,1,Math.atan2(h.cy-b.y,h.cx-b.x)+(h.t>.55?0:0))})};
// ---------- 2) 삼지창 휘두르기 (파랑 → 주황) ----------
function asSweep(o,t){const L=clamp(dist(o,t)+130,250,350);HZ.push({k:'assw',o,tg:t,t:0,L,base:ang(o,t),S:[{c:'b',s:1,t0:0},{c:'o',s:-1,t0:.8}],hit:new Set()});o.asK=1;SFXa('as_draw')}
function asSwA(h,S,t){const k=clamp((t-S.t0-.32)/.34,0,1),e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;return h.base+S.s*(-1.8+3.6*e)}
HZX.assw=(h,dt,EN)=>{const o=h.o;if(o.dead)return false;o.gcd=Math.max(o.gcd,.3);o.slow=Math.max(o.slow||0,.2);const e=h.tg;if(h.t<.3&&e&&!e.dead)h.base+=Math.atan2(Math.sin(ang(o,e)-h.base),Math.cos(ang(o,e)-h.base))*Math.min(1,dt*6);
  h.S.forEach((S,si)=>{const t=h.t-S.t0;if(t>=.32&&!S.snd){S.snd=1;SFXa('as_swing');shake=Math.max(shake,6)}if(t<.32||t>.7)return;const a=asSwA(h,S,h.t),pa=S.pa==null?a:S.pa;S.pa=a;
    for(const x of EN){if(x.hid||x.jump||h.hit.has(si+':'+x.i))continue;const d=dist(o,x);if(d>h.L+x.r||d<10)continue;const xa=ang(o,x),rel=s=>Math.atan2(Math.sin(s-xa),Math.cos(s-xa));
      if(rel(pa)*rel(a)<=0||Math.abs(rel(a))<.12){h.hit.add(si+':'+x.i);if(utCol(x,S.c,.2)){hurt(x,5.5,o,x.x,x.y,0,1);safePush(x,xa,70);SFXa('as_hit');for(let k=0;k<10;k++)sparkP(x.x,x.y,rnd(-200,200),rnd(-200,200),asColHex(S.c),3)}}}});
  if(h.t>1.6)o.asK=0;return h.t<1.7};
HZP.assw=h=>{const o=h.o;if(o.dead)return;h.S.forEach(S=>{const t=h.t-S.t0;if(t<0||t>.95)return;const col=asColHex(S.c),a=asSwA(h,S,h.t),fa=t<.32?Math.min(1,t/.12):t>.7?Math.max(0,1-(t-.7)/.25):1;
    if(t<.32){const pu=.5+.5*Math.sin(t*40);g.save();g.globalCompositeOperation='lighter';g.globalAlpha=.25*pu;g.fillStyle=col;g.beginPath();g.moveTo(o.x,o.y);g.arc(o.x,o.y,h.L,h.base-1.8,h.base+1.8);g.closePath();g.fill();g.restore();
      utTxt(S.c=='b'?'파랑 · 멈춰!':'주황 · 움직여!',o.x+Math.cos(h.base)*h.L*.55,o.y+Math.sin(h.base)*h.L*.55-10,16,col,fa)}
    else{const a0=h.base+S.s*-1.8;asTrail(o.x,o.y,a0,a,h.L*.35,h.L,col,fa*.85)}
    asTri(o.x-Math.cos(a)*h.L*.12,o.y-Math.sin(a)*h.L*.12,a,h.L*1.12,fa,t>=.32&&t<.7?1:.6)})};
// ---------- 3) ULT 자비는 없다 ----------
function asUlt(o,t){if(!t||t.dead)t=tgt(o);if(!t)return;HZ.push({k:'asul',o,tg:t,t:0,sh:[],fl:[],sw:[{c:'b'},{c:'o'},{c:'r'}].map((S,i)=>Object.assign(S,{t0:1.05+i*.56,a0:rnd(0,TAU),s:i%2?-1:1})),hit:new Set()})}
HZX.asul=(h,dt,EN)=>{const o=h.o,u=h.t-ASDL;h.u=u;if(u<0)return true;let e=h.tg;if(!h.lk){if(!e||e.dead)e=tgt(o);if(!e)return false;h.tg=e;h.lk=1;h.ex=clamp(e.x,90,A-90);h.ey=clamp(e.y,110,A-140);SFXa('as_menu');o.asK=1}
  const live=e&&!e.dead&&!e.hid;if(!o.dead){o.gcd=Math.max(o.gcd,.4);o.cast=null}
  if(live&&u<3.6){e.x+=(h.ex-e.x)*Math.min(1,dt*5);e.y+=(h.ey-e.y)*Math.min(1,dt*5);e.stn=Math.max(e.stn||0,.12);e.cast=null}
  // MERCY 박살
  if(u>=.62&&!h.br){h.br=1;SFXa('as_break');shake=Math.max(shake,14);const bx=A/2+1.5*130-0,by=A-44;for(let i=0;i<5;i++)for(let j=0;j<3;j++)h.sh.push({x:bx-60+i*24+12,y:by-18+j*13,vx:rnd(-220,220),vy:rnd(-380,-120),r:rnd(0,TAU),vr:rnd(-12,12),s:rnd(8,14)})}
  h.sh.forEach(p=>{p.vy+=900*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.r+=p.vr*dt});
  if(u>=1&&!h.tx1){h.tx1=1;SFXa('as_text')}
  // 세 번 베기
  h.sw.forEach((S,si)=>{const t=u-S.t0,L=300;S.px=h.ex-Math.cos(S.a0)*L*.62;S.py=h.ey-Math.sin(S.a0)*L*.62;if(t>=.2&&!S.snd){S.snd=1;SFXa('as_swing');shake=Math.max(shake,9)}if(t<.2||t>.6)return;
    const k=clamp((t-.2)/.3,0,1),a=S.a0+S.s*(-1.7+3.4*k),pa=S.pa==null?a:S.pa;S.pa=a;
    for(const x of EN){if(x.hid||x.jump||h.hit.has(si+':'+x.i))continue;const d=Math.hypot(x.x-S.px,x.y-S.py);if(d>L+x.r)continue;const xa=Math.atan2(x.y-S.py,x.x-S.px),rel=s=>Math.atan2(Math.sin(s-xa),Math.cos(s-xa));
      if(rel(pa)*rel(a)<=0){h.hit.add(si+':'+x.i);if(utCol(x,S.c,.2)){hurt(x,3,o,x.x,x.y,0,1);SFXa('as_hit');for(let q=0;q<12;q++)sparkP(x.x,x.y,rnd(-220,220),rnd(-220,220),asColHex(S.c),3)}}}
    if(k>=1&&!S.fl){S.fl=1;for(let q=0;q<6;q++){const aa=S.a0+S.s*(-1.4+2.8*q/5),rr=L*rnd(.55,.95);h.fl.push({x:S.px+Math.cos(aa)*rr,y:S.py+Math.sin(aa)*rr,t:-q*.04})}}});
  h.fl.forEach(p=>{p.t+=dt;if(p.t>0&&p.t<.5&&!SKIP&&Math.random()<dt*60)fireP(p.x+rnd(-8,8),p.y,rnd(-20,20),rnd(-320,-160),rnd(7,13),rnd(.35,.6))});
  // 내리꽂기
  if(u>=3.48&&!h.stb){h.stb=1;SFXa('as_stab')}
  if(u>=3.58&&!h.imp){h.imp=1;SFXa('as_erupt');shake=Math.max(shake,26);hs=.14;if(live){hurt(e,7,o,e.x,e.y,0,1);e.burn=Math.max(e.burn||0,1.2);e.bt=0}if(typeof lkImp=='function')lkImp(h.ex,h.ey,150,ASR);ring(h.ex,h.ey,10,190,'#ff5a1f',10,.55);ring(h.ex,h.ey,10,120,'#fff3c4',6,.4);
    FX.push({k:'crack',x:h.ex,y:h.ey,r:100,l:2.2,m:2.2});FX.push({k:'scorch',x:h.ex,y:h.ey,r:90,l:2.6,m:2.6,c:'#ff5a1f'});h.er=Array.from({length:12},(_,i)=>({a:i*TAU/12,d:0,on:1}));
    if(!SKIP)for(let q=0;q<40;q++)fireP(h.ex+rnd(-30,30),h.ey+rnd(-10,10),rnd(-120,120),rnd(-520,-200),rnd(9,16),rnd(.5,.9),PAL.magma)}
  if(h.er)h.er.forEach(b=>{if(!b.on)return;b.d+=dt*420;const x=h.ex+Math.cos(b.a)*b.d,y=h.ey+Math.sin(b.a)*b.d;b.x=x;b.y=y;if(b.d>420){b.on=0;return}for(const q of EN){if(q==e||q.hid||q.jump)continue;if(Math.hypot(q.x-x,q.y-y)<q.r+8){b.on=0;hurt(q,1.5,o,x,y,0,0);break}}});
  if(u>4.3){o.asK=0}return u<4.45};
HZD.asul=h=>{const u=h.u;if(!(u>=0))return;const fa=u<4?Math.min(1,u/.25):Math.max(0,1-(u-4)/.4);if(typeof lkDim=='function')lkDim(.5*fa);
  if(u>=2.8&&u<3.58){const k=(u-2.8)/.78;g.save();g.globalAlpha=.5*k;g.strokeStyle=ASR;g.lineWidth=3;g.setLineDash([6,6]);g.lineDashOffset=-u*60;g.beginPath();g.arc(h.ex,h.ey,60-30*k,0,TAU);g.stroke();g.setLineDash([]);g.restore()}};
HZP.asul=h=>{const u=h.u;if(!(u>=0)||!h.lk)return;
  // 버튼
  if(u<1.05){const sl=Math.min(1,u/.2),fo=u>.85?Math.max(0,1-(u-.85)/.2):1,y=A-44+(1-sl)*80;['FIGHT','ACT','ITEM','MERCY'].forEach((lb,i)=>{if(i==3&&u>=.62)return;const x=A/2+(i-1.5)*130;utBtn(x,y,118,38,lb,fo,i==3&&u>.3&&u<.62)})}
  h.sh.forEach(p=>{if(p.y>A+40)return;g.save();g.translate(p.x,p.y);g.rotate(p.r);g.fillStyle=UTO;g.fillRect(-p.s/2,-p.s/2,p.s,p.s*.7);g.restore()});
  // 날아와서 MERCY 를 베는 삼지창
  if(u>=.25&&u<.95){const k=clamp((u-.25)/.37,0,1),bx=A/2+1.5*130,by=A-44,sx=A+120,sy=-80,x=sx+(bx-sx)*k*k,y=sy+(by-sy)*k*k,a=Math.atan2(by-sy,bx-sx)+(1-k)*6;asTri(x-Math.cos(a)*230,y-Math.sin(a)*230,a,250,u<.62?1:Math.max(0,1-(u-.62)/.3),1)}
  // 아스고어 등장
  if(u>=.7&&u<3.9){const k=Math.min(1,(u-.7)/.3),fo=u>3.5?Math.max(0,1-(u-3.5)/.4):1,sh=u>=3.48&&u<3.8?rnd(-3,3):0;g.save();g.globalCompositeOperation='lighter';glow(ASR,A/2,120,160,.3*k*fo);g.restore();utDraw('ut_asgore_atk',A/2+sh,212,150,k*fo*.95)}
  if(u>=1&&u<2.7)utSay('아스고어가 붉은 삼지창을 들었다.',u-1,Math.min(1,(u-1)/.1)*(u>2.45?Math.max(0,1-(u-2.45)/.25):1));
  // 세 번 베기
  h.sw.forEach(S=>{const t=u-S.t0,L=300;if(t<0||t>.85||S.px==null)return;const col=asColHex(S.c),fa=t<.2?Math.min(1,t/.08):t>.6?Math.max(0,1-(t-.6)/.25):1,k=clamp((t-.2)/.3,0,1),a=S.a0+S.s*(-1.7+3.4*k);
    if(t<.2){g.save();g.globalCompositeOperation='lighter';g.globalAlpha=.22*(.5+.5*Math.sin(t*50));g.fillStyle=col;g.beginPath();g.moveTo(S.px,S.py);g.arc(S.px,S.py,L,S.a0-1.7,S.a0+1.7);g.closePath();g.fill();g.restore()}
    else asTrail(S.px,S.py,S.a0+S.s*-1.7,a,L*.3,L,col,fa*.9);
    asTri(S.px-Math.cos(a)*36,S.py-Math.sin(a)*36,a,L+36,fa,1)});
  h.fl.forEach(p=>{if(p.t<0||p.t>.6)return;const k=p.t/.6;g.save();g.globalCompositeOperation='lighter';g.globalAlpha=1-k;const gr=g.createLinearGradient(p.x,p.y,p.x,p.y-90);gr.addColorStop(0,'#ffd36b');gr.addColorStop(1,'rgba(255,60,20,0)');g.fillStyle=gr;g.fillRect(p.x-9*(1-k*.5),p.y-90*Math.min(1,p.t/.12),18*(1-k*.5),90*Math.min(1,p.t/.12));g.restore()});
  // 하늘에서 내리꽂기
  if(u>=2.8&&u<4.4){const L=330;let ty;if(u<3.48){const k=(u-2.8)/.68;ty=h.ey-150-140*(1-k)}else if(u<3.58){const k=(u-3.48)/.1;ty=h.ey-150+150*k}else ty=h.ey;const fo=u>4?Math.max(0,1-(u-4)/.4):Math.min(1,(u-2.8)/.15);
    asTri(h.ex,ty-L*.98,Math.PI/2,L,fo,u<3.58?1.3:.8);if(u>=3.58&&u<3.75){g.save();g.globalAlpha=1-(u-3.58)/.17;g.fillStyle='#fff';g.fillRect(-40,-40,A+80,A+80);g.restore()}}
  if(h.er)h.er.forEach(b=>{if(b.on&&b.x!=null)utFire(b.x,b.y,1.1,1,b.a)})};
EMB.asg=(f,D)=>{g.rotate(-f.rot-.6);neon({col:'#ff2a3a',hi:'#ffd0d0'},1.6,()=>{g.beginPath();g.moveTo(-20,0);g.lineTo(13,0);g.moveTo(9,0);g.lineTo(21,0);g.moveTo(9,0);g.quadraticCurveTo(10,-8,19,-7);g.moveTo(9,0);g.quadraticCurveTo(10,8,19,7)});
  neon(D,1.1,()=>{g.beginPath();g.arc(8,0,2.6,0,TAU);g.moveTo(-20,0);g.lineTo(-24,-3);g.moveTo(-20,0);g.lineTo(-24,3)});g.save();g.globalCompositeOperation='lighter';glow('#ff2a3a',0,0,16,.3);g.restore()};
Object.assign(DMGK,{asg:1.14});

// ======================================================================
// 김티비 • 메타톤 (살인 로봇 TV 스타)
// 1단계 상자 메타톤 : 껍데기라 체력 60 으로 시작 · 껍데기가 부서지면 (체력 0) 쓰러지지 않고 "메타톤 NEO" 로 변신 (체력 70 · 스킬 셋 전부 바뀜)
//   1) 퀴즈 쇼 : 상대 머리 위에 4지선다 퀴즈 · 상대 영혼이 답을 고름 · 틀리면 번개 (70%)
//   2) 폭탄 블록 쇼 : 십자 폭탄 블록 5개가 떨어짐 → 깜빡깜빡 → 십자 모양으로 펑
//   3) ULT 생방송 스포트라이트 : ON AIR · 조명 3개가 상대를 쫓아다니고 조명에 걸리면 번개 → 마지막에 조명이 모여 큰 번개
// 2단계 메타톤 NEO : 패시브 시청률 (때릴수록 시청률이 올라 주는 피해 최대 +25%)
//   1) NEO 캐논 : 팔 대포를 모아 굵은 빔
//   2) 디스코 레이저 : 미러볼이 내려와 파랑 · 주황 레이저를 돌림
//   3) ULT 그랜드 피날레 : 무대 조명 + 하트 폭탄 비 → 가슴의 하트에서 거대한 하트 빔 (시청률만큼 더 아픔)
// ======================================================================
const MTP='#ff3aa8',MTDL=1.1;
['mt_quiz','mt_tick','mt_right','mt_wrong','mt_zap','mt_drop','mt_beep','mt_boom','mt_onair','mt_light','mt_break','mt_ohyes','mt_charge','mt_beam','mt_disco','mt_laser','mt_crowd','mt_heart','mt_rate'].forEach(utPush);
Object.assign(SLB,{mt_quiz:'메타톤 · 퀴즈 쇼',mt_tick:'메타톤 · 퀴즈 째깍',mt_right:'메타톤 · 정답',mt_wrong:'메타톤 · 오답',mt_zap:'메타톤 · 번개',mt_drop:'메타톤 · 폭탄 블록 떨어짐',mt_beep:'메타톤 · 폭탄 삑삑',mt_boom:'메타톤 · 십자 폭발',mt_onair:'메타톤 · ON AIR',mt_light:'메타톤 · 조명',mt_break:'메타톤 · 껍데기 부서짐',mt_ohyes:'메타톤 · NEO 변신',mt_charge:'메타톤 · 캐논 충전',mt_beam:'메타톤 · NEO 캐논',mt_disco:'메타톤 · 미러볼',mt_laser:'메타톤 · 레이저',mt_crowd:'메타톤 · 관객 환호',mt_heart:'메타톤 · 하트 빔',mt_rate:'메타톤 · 시청률'});
const MTSK=[
  {n:'퀴즈 쇼',w:.3,cd:9,c:(o,t)=>!t.hid&&dist(o,t)<560,f:(o,t)=>mtQuiz(o,t)},
  {n:'폭탄 블록 쇼',w:.3,cd:10,c:(o,t)=>!t.hid&&dist(o,t)<520,f:(o,t)=>mtBomb(o,t)},
  {n:'생방송 스포트라이트',w:.4,ult:1,c:(o,t)=>!t.hid,f:(o,t)=>mtSpot(o,t)}];
const MTSK2=[
  {n:'NEO 캐논',w:.3,cd:7.5,c:(o,t)=>!t.hid&&dist(o,t)<600,f:(o,t)=>mtCannon(o,t)},
  {n:'디스코 레이저',w:.3,cd:10,c:(o,t)=>!t.hid&&dist(o,t)<520,f:(o,t)=>mtDisco(o,t)},
  {n:'그랜드 피날레',w:.4,ult:1,c:(o,t)=>!t.hid,f:(o,t)=>mtFinale(o,t)}];
const MTI=DEF.findIndex(d=>d.name=='김티비');
DEF.push({name:'김티비 • 메타톤',gl:'메',k:'mtt',vof:MTI,r:26,sp:214,col:'#ffc23a',hi:'#fff4cc',dk:'#2a1a00',alt:{col:'#c8ccd8',hi:'#ffffff',dk:'#16181f'},alt2:{col:'#3ad8ff',hi:'#dcfaff',dk:'#03222a'},sk:MTSK});
INFO['김티비 • 메타톤']={st:[8,9,8,8,8,10],p:'2단계 변신 · 처음엔 상자 껍데기라 체력 60 으로 시작 · 껍데기가 부서지면 쓰러지지 않고 "메타톤 NEO" 로 변신 (체력 70 · NEO 캐논 · 디스코 레이저 · 궁 그랜드 피날레) · NEO 는 때릴수록 시청률이 올라 주는 피해 최대 +25%',
  sk:[['6 · 70%','상대 머리 위에 4지선다 퀴즈가 뜨고 상대 영혼이 답을 고름 · 틀리면 하늘에서 번개 (정답이면 무사)'],['3×5','십자 모양 폭탄 블록 5개가 상대 주위에 떨어짐 → 깜빡깜빡 → 가로 세로로 펑'],['1.4×n+5','ON AIR · 조명 3개가 상대를 쫓아다니며 조명에 걸릴 때마다 번개 · 마지막엔 조명이 모여 큰 번개 (NEO 궁 : 하트 폭탄 비 + 거대한 하트 빔)']]};
// ---------- 변신 ----------
function mtNeoD(f){const base=f.d.col=='#ffc23a',alt2=f.d.col=='#3ad8ff';return Object.assign({},f.d,{col:base?MTP:alt2?'#9a5aff':'#ff4a5a',hi:base?'#ffd6f0':alt2?'#efe0ff':'#ffe0e2',dk:'#14000e',sk:MTSK2,mtNeo:1})}
function mtGo(f){f.mtNeo=2;f.hp=f.show=70;f.d=mtNeoD(f);f.cds=f.d.sk.map(s=>s.ult?0:1.2);f.ug=Math.max(f.ug||0,35);f.cast=null;f.mtR=f.mtR||0;f.r=27;
  if(F.length<4){const P=$('#p'+f.i);if(P){P.style.setProperty('--c',f.d.col);P.style.setProperty('--h',f.d.hi);paintIc($('#p'+f.i+' .ic'),f.d,34)}}
  if(!SKIP){SFXa('mt_ohyes');SFXa('mt_crowd');ring(f.x,f.y,10,220,MTP,10,.6);ring(f.x,f.y,10,140,'#ffffff',6,.5);for(let i=0;i<30;i++)sparkP(f.x,f.y,rnd(-320,320),rnd(-320,320),i%2?MTP:'#ffe680',3);ft(f.x,f.y-f.r-40,'오 예!',MTP,30)}}
function mtBreak(f){f.mtNeo=1;f.hp=0;f.cast=null;if(!SKIP)SFXa('mt_break');
  const tiles=[];for(let i=0;i<5;i++)for(let j=0;j<5;j++)tiles.push({i,j,vx:rnd(-260,260)+(i-2)*60,vy:rnd(-300,-80)+(j-2)*40,vr:rnd(-8,8)});
  if(!CIN&&!TSTOP&&!MAD&&(phase=='play'||phase=='demo')&&!SKIP){CIN={o:f,t:0,dur:2,tiles,tick(dt){this.o.gcd=Math.max(this.o.gcd,.4);if(this.t>=1.15&&!this.sw){this.sw=1;mtGo(this.o)}if(this.t>=this.dur)return false},draw(){mtCin(this)}}}else mtGo(f)}
function mtCin(c){const t=c.t,f=c.o,cx=A/2,cy=A*.44;g.save();g.globalAlpha=Math.min(.85,t*3);g.fillStyle='#000';g.fillRect(-40,-40,A+80,A+80);g.restore();
  if(t<1.15){const o=UTI.ut_mtt_box,s=utSrc('ut_mtt_box'),H=200,W=o?H*o.w/o.h:200,k=Math.max(0,t-.45);
    if(s&&o){g.save();g.imageSmoothingEnabled=false;c.tiles.forEach(q=>{const sw=o.w/5,sh=o.h/5,x=cx-W/2+q.i*W/5+q.vx*k,y=cy-H/2+q.j*H/5+q.vy*k+500*k*k;g.save();g.translate(x+W/10,y+H/10);g.rotate(q.vr*k);g.globalAlpha=Math.max(0,1-k*1.2);
      g.drawImage(s,q.i*sw,q.j*sh,sw,sh,-W/10,-H/10,W/5,H/5);g.restore()});g.restore()}
    if(t<.45&&Math.floor(t*14)%2){g.save();g.globalCompositeOperation='lighter';glow('#ffffff',cx,cy,170,.5);g.restore()}
    utSay('메타톤의 껍데기가 부서졌다…!',t,1,A-90)}
  else{const k=t-1.15,s=k<.25?1.4-k*1.6:1,H=190*s;g.save();g.globalCompositeOperation='lighter';glow(MTP,cx,cy,260,.45);for(let i=0;i<10;i++){const a=i*TAU/10+k*2;g.globalAlpha=.25;g.fillStyle=MTP;g.beginPath();g.moveTo(cx,cy);g.arc(cx,cy,420,a,a+.18);g.closePath();g.fill()}g.restore();
    if(!utDraw('ut_mtt_neo',cx,cy,H,Math.min(1,k/.15),0,1)){g.save();g.globalCompositeOperation='lighter';glow(MTP,cx,cy,90,.8);g.restore()}
    utTxt('메타톤 NEO',cx,cy+H*.62,30,MTP,Math.min(1,k/.2),'center',UTP8);utTxt('오 예!',cx,cy-H*.62,26,'#ffffff',Math.min(1,k/.15))}
  if(t>1.1&&t<1.25){g.save();g.globalAlpha=1-(t-1.1)/.15;g.fillStyle='#fff';g.fillRect(-40,-40,A+80,A+80);g.restore()}}
// ---------- 패시브 : 껍데기 · 변신 · 시청률 ----------
const _hurtMT=hurt;hurt=function(t,n,o){
  if(t&&t.d&&t.d.k=='mtt'&&!t.dead&&n>0&&phase=='play'){if(t.mtNeo==1)return;
    if(!t.mtNeo){const a=[...arguments];t.hp+=1000;const r=_hurtMT.apply(this,a);t.hp-=1000;if(t.hp<=0)mtBreak(t);return r}}
  if(o&&o.d&&o.d.k=='mtt'&&o.mtNeo==2&&t&&t!=o&&n>0&&!t.dead){const a=[...arguments];a[1]=Math.round(n*(1+Math.min(.25,(o.mtR||0)/40000))*10)/10;const r=_hurtMT.apply(this,a);const add=Math.round(n*137+40);o.mtR=(o.mtR||0)+add;o.mtRp=(o.mtRp||0)+add;return r}
  return _hurtMT.apply(this,arguments)};
const _initMT=init;init=function(){_initMT.apply(this,arguments);if(F)F.forEach(f=>{f.mtNeo=0;f.mtR=0;f.mtRp=0;f.mtRT=0;if(f.d.k=='mtt'){f.hp=f.show=60}})};
const _updMT=update;update=function(dt){_updMT(dt);if(!F)return;F.forEach(f=>{if(f.d.k!='mtt'||f.dead)return;f.mtRT=(f.mtRT||0)+dt;if(f.mtRp>0&&f.mtRT>.8){f.mtRT=0;if(!SKIP){ft(f.x,f.y-f.r-34,'시청률 +'+f.mtRp.toLocaleString(),'#ffe680',13);if(Math.random()<.4)SFXa('mt_rate')}f.mtRp=0}})};
const _lowMT=lowHP;lowHP=function(f){_lowMT(f);if(f.d.k=='mtt'&&f.mtNeo==2&&!f.dead&&!f.hid&&phase!='end'){utTxt('★ '+(f.mtR||0).toLocaleString(),f.x,f.y+f.r+16,11,'#ffe680',.9)}};
UTSP.mtt=f=>{if(f.mtNeo==2){utBehind(f,'ut_mtt_neo',f.r*2.6,.85,0,.2)}else if(!f.mtNeo){utBehind(f,'ut_mtt_box',f.r*2.9,.88,.6,.4)}};
// ---------- 1) 퀴즈 쇼 ----------
const MTQ=[['메타톤의 직업은?',['가수','배우','사회자','전부 다'],3],['김티비의 본명은?',['김티비','최해솔','메타톤','몰라요'],1],['가장 멋진 로봇은?',['메타톤','메타톤','메타톤','메타톤'],0],['1 + 1 = ?',['2','11','창문','메타톤'],0],
  ['이 게임 이름은?',['JS BALL BATTLE3','공 굴리기','메타톤 쇼','몰라'],0],['시청률 1위 프로그램은?',['뉴스','메타톤 쇼','드라마','예능'],1],['내 손에 들린 건?',['마이크','폭탄','하트','다 맞음'],3],['지금 몇 시?',['쇼 타임','밥 시간','잘 시간','몰라'],0]];
function mtQuiz(o,t){const q=MTQ[Math.floor(rnd(0,MTQ.length))],ok=Math.random()<.25,pick=ok?q[2]:[0,1,2,3].filter(i=>i!=q[2])[Math.floor(rnd(0,3))];HZ.push({k:'mtqz',o,tg:t,t:0,q,pick,ok,cur:Math.floor(rnd(0,4)),ct:0});SFXa('mt_quiz')}
HZX.mtqz=(h,dt,EN)=>{const e=h.tg;if(!e||e.dead)return h.t<.3;if(h.t>.3&&h.t<1.5){h.ct+=dt;if(h.ct>.17){h.ct=0;h.cur=(h.cur+1+Math.floor(rnd(0,3)))%4;if(!SKIP)SFXa('mt_tick')}}
  if(h.t>=1.5&&!h.lk){h.lk=1;h.cur=h.pick;if(h.ok){SFXa('mt_right');if(!SKIP)ft(e.x,e.y-e.r-30,'정답!','#7cff9a',20)}else SFXa('mt_wrong')}
  if(h.t>=1.72&&!h.zp&&!h.ok){h.zp=1;SFXa('mt_zap');if(!e.hid){hurt(e,7,h.o,e.x,e.y,0,1);e.stn=Math.max(e.stn||0,.35)}shake=Math.max(shake,12);h.zx=e.x;h.zy=e.y;FX.push({k:'stzap',x:e.x,y:e.y,l:.4,m:.4})}
  return h.t<2.2};
HZP.mtqz=h=>{const e=h.tg;if(!e)return;const t=h.t,op=t<.18?Math.ceil(t/.06)/3:t>1.95?Math.max(0,1-(t-1.95)/.25):1;if(op<=0)return;const W=330,H=132,x=clamp(e.x,W/2+8,A-W/2-8),y=clamp(e.y-e.r-H/2-28,H/2+8,A-H/2-8);
  g.save();g.globalAlpha=op;g.fillStyle=MTP;g.fillRect(x-W/2+5,y-H/2+5,W,H);g.fillStyle='#000';g.fillRect(x-W/2,y-H/2,W,H);g.strokeStyle='#fff';g.lineWidth=3;g.strokeRect(x-W/2,y-H/2,W,H);
  g.font='18px '+UTFN;g.textAlign='left';g.textBaseline='middle';g.fillStyle='#ffe680';g.fillText('Q. '+h.q[0],x-W/2+12,y-H/2+22);
  h.q[1].forEach((s,i)=>{const ax=x-W/2+16+(i%2)*(W/2),ay=y-H/2+60+Math.floor(i/2)*32,on=i==h.cur,res=h.lk&&i==h.pick;g.fillStyle=res?(h.ok?'#7cff9a':'#ff4a5a'):on?'#ffff00':'#fff';g.font='16px '+UTFN;g.fillText('ABCD'[i]+'. '+s,ax+18,ay);if(on&&typeof utHeart=='function')utHeart(ax+5,ay,1.6,'#ff0000')});
  if(t<1.5){const k=Math.max(0,1-(t-.3)/1.2);g.fillStyle='#fff';g.fillRect(x-W/2+8,y+H/2-8,(W-16)*k,3)}
  if(h.lk){g.font='bold 22px '+UTFN;g.textAlign='center';g.fillStyle=h.ok?'#7cff9a':'#ff4a5a';g.fillText(h.ok?'정답!':'땡!',x+W/2-34,y-H/2+22)}g.restore();
  if(h.zp&&t<2.05){const k=(t-1.72)/.33;g.save();g.globalCompositeOperation='lighter';g.globalAlpha=1-k;g.strokeStyle='#ffe680';g.lineWidth=6*(1-k)+2;g.beginPath();let px=h.zx+rnd(-20,20),py=-20;g.moveTo(px,py);for(let i=1;i<=8;i++){px=h.zx+rnd(-26,26)*(1-i/8);py=-20+(h.zy+20)*i/8;g.lineTo(px,py)}g.stroke();g.lineWidth=2;g.strokeStyle='#fff';g.stroke();glow('#ffe680',h.zx,h.zy,60,.6*(1-k));g.restore()}};
// ---------- 2) 폭탄 블록 쇼 ----------
function mtBomb(o,t){const P=[[t.x+t.dx*t.sp*.5,t.y+t.dy*t.sp*.5]];for(let i=0;i<4;i++){const a=i*TAU/4+rnd(-.4,.4)+Math.PI/4,d=rnd(60,110);P.push([t.x+Math.cos(a)*d,t.y+Math.sin(a)*d])}
  HZ.push({k:'mtbm',o,t:0,B:P.map((p,i)=>({x:clamp(p[0],30,A-30),y:clamp(p[1],30,A-30),d:i*.08,hit:new Set()}))});SFXa('mt_drop')}
HZX.mtbm=(h,dt,EN)=>{h.B.forEach(b=>{const t=h.t-b.d;if(t>=.3&&!b.ld){b.ld=1;if(!SKIP&&Math.random()<.5)SFXa('mt_beep')}if(t>=1.35&&!b.bm){b.bm=1;SFXa('mt_boom');shake=Math.max(shake,8)}
    if(b.bm&&t<1.6)EN.forEach(x=>{if(x.hid||x.jump||b.hit.has(x))return;const W=14+x.r;if(Math.abs(x.y-b.y)<W||Math.abs(x.x-b.x)<W){b.hit.add(x);hurt(x,3,h.o,x.x,x.y,0,0)}})});return h.t<2};
HZD.mtbm=h=>{h.B.forEach(b=>{const t=h.t-b.d;if(t<.3||t>=1.35)return;g.save();g.globalAlpha=.18+.12*Math.sin(t*20);g.fillStyle='#ff4a5a';g.fillRect(0,b.y-6,A,12);g.fillRect(b.x-6,0,12,A);g.restore()})};
HZP.mtbm=h=>{h.B.forEach(b=>{const t=h.t-b.d;if(t<0)return;if(t<1.35){const y=t<.3?b.y-220*(1-t/.3)*(1-t/.3):b.y,bl=t>.3&&Math.floor(t*(t>1?16:7))%2;g.save();g.translate(b.x,y);g.fillStyle=bl?'#ff3a4a':'#f2f2f2';g.strokeStyle='#000';g.lineWidth=2;
      g.beginPath();[[-5,-14],[5,-14],[5,-5],[14,-5],[14,5],[5,5],[5,14],[-5,14],[-5,5],[-14,5],[-14,-5],[-5,-5]].forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.closePath();g.fill();g.stroke();g.fillStyle='#000';g.font='bold 9px '+UTP8;g.textAlign='center';g.textBaseline='middle';g.fillText('B',0,1);g.restore()}
    else if(t<1.7){const k=(t-1.35)/.35;g.save();g.globalCompositeOperation='lighter';g.globalAlpha=1-k;g.fillStyle='#ffe680';const w=26*(1-k*.6);g.fillRect(0,b.y-w/2,A,w);g.fillRect(b.x-w/2,0,w,A);g.fillStyle='#fff';g.fillRect(0,b.y-w/5,A,w*.4);g.fillRect(b.x-w/5,0,w*.4,A);glow('#ff8a3a',b.x,b.y,50,.7*(1-k));g.restore()}})};
// ---------- 3) ULT 생방송 스포트라이트 ----------
function mtSpot(o,t){if(!t||t.dead)t=tgt(o);if(!t)return;HZ.push({k:'mtsp',o,tg:t,t:0,L:[0,1,2].map(i=>({sx:A*(.2+.3*i),x:A*(.2+.3*i),y:A*.5,acc:0,cd:0,ph:rnd(0,TAU)})),Z:[]})}
HZX.mtsp=(h,dt,EN)=>{const o=h.o,u=h.t-MTDL;h.u=u;if(u<0)return true;const e=h.tg;if(!h.on){h.on=1;SFXa('mt_onair')}if(!o.dead){o.gcd=Math.max(o.gcd,.4)}const live=e&&!e.dead&&!e.hid;
  h.L.forEach((l,i)=>{const fin=u>2.75;const tx=live?e.x+(fin?0:Math.cos(u*1.7+l.ph)*70):l.x,ty=live?e.y+(fin?0:Math.sin(u*2.1+l.ph)*55):l.y,sp=fin?6:2.2+i*.4;l.x+=(tx-l.x)*Math.min(1,dt*sp);l.y+=(ty-l.y)*Math.min(1,dt*sp);l.cd-=dt;
    if(u>.4&&u<2.75&&live&&Math.hypot(e.x-l.x,e.y-l.y)<46+e.r*.4){l.acc+=dt;if(l.acc>.22&&l.cd<=0){l.acc=0;l.cd=.5;hurt(e,1.4,o,e.x,e.y,0,0);h.Z.push({x:e.x,y:e.y,t:0});if(!SKIP)SFXa('mt_zap')}}else l.acc=Math.max(0,l.acc-dt)});
  if(u>=2.95&&!h.big){h.big=1;SFXa('mt_zap');SFXa('mt_crowd');shake=Math.max(shake,20);hs=.12;if(live){hurt(e,5,o,e.x,e.y,0,1);e.stn=Math.max(e.stn||0,.45)}h.bx=live?e.x:h.L[0].x;h.by=live?e.y:h.L[0].y;if(typeof lkImp=='function')lkImp(h.bx,h.by,130,'#ffe680');ring(h.bx,h.by,10,150,'#ffe680',8,.5)}
  h.Z.forEach(z=>z.t+=dt);h.Z=h.Z.filter(z=>z.t<.3);return u<3.5};
HZD.mtsp=h=>{const u=h.u;if(!(u>=0))return;const fa=u<3.2?Math.min(1,u/.3):Math.max(0,1-(u-3.2)/.3);if(typeof lkDim=='function')lkDim(.62*fa)};
HZP.mtsp=h=>{const u=h.u;if(!(u>=0))return;const fa=u<3.2?Math.min(1,u/.3):Math.max(0,1-(u-3.2)/.3);
  h.L.forEach(l=>{g.save();g.globalCompositeOperation='lighter';g.globalAlpha=.22*fa;const gr=g.createLinearGradient(l.sx,-20,l.x,l.y);gr.addColorStop(0,'rgba(255,240,200,.9)');gr.addColorStop(1,'rgba(255,240,200,.25)');g.fillStyle=gr;g.beginPath();g.moveTo(l.sx-10,-20);g.lineTo(l.sx+10,-20);g.lineTo(l.x+46,l.y);g.lineTo(l.x-46,l.y);g.closePath();g.fill();
    g.globalAlpha=.16*fa;g.fillStyle='#fff3c8';g.beginPath();g.ellipse(l.x,l.y,48,30,0,0,TAU);g.fill();g.globalAlpha=.5*fa;g.strokeStyle='#fff3c8';g.lineWidth=2;g.stroke();g.restore()});
  h.Z.forEach(z=>{const k=z.t/.3;g.save();g.globalCompositeOperation='lighter';g.globalAlpha=1-k;g.strokeStyle='#ffe680';g.lineWidth=5*(1-k)+1.5;g.beginPath();let px=z.x,py=-10;g.moveTo(px,py);for(let i=1;i<=7;i++){px=z.x+rnd(-18,18)*(1-i/7);py=-10+(z.y+10)*i/7;g.lineTo(px,py)}g.stroke();g.restore()});
  if(u>=2.95&&u<3.4){const k=(u-2.95)/.45;g.save();g.globalCompositeOperation='lighter';g.globalAlpha=1-k;g.fillStyle='#fff6c8';g.fillRect(h.bx-34*(1-k*.5),-20,68*(1-k*.5),h.by+20);glow('#ffe680',h.bx,h.by,120,.8*(1-k));g.restore()}
  const on=Math.floor(u*3)%2==0||u<.6;g.save();g.globalAlpha=fa;g.fillStyle='#000';g.fillRect(A/2-74,18,148,40);g.strokeStyle=on?'#ff2a3a':'#5a1018';g.lineWidth=3;g.strokeRect(A/2-74,18,148,40);g.restore();utTxt('● ON AIR',A/2,39,19,on?'#ff2a3a':'#7a2028',fa,'center',UTP8)};
// ---------- NEO 1) NEO 캐논 ----------
function mtCannon(o,t){HZ.push({k:'mtcn',o,tg:t,t:0,a:ang(o,t),hit:new Set()});SFXa('mt_charge')}
HZX.mtcn=(h,dt,EN)=>{const o=h.o;if(o.dead)return false;o.gcd=Math.max(o.gcd,.3);const e=h.tg;if(h.t<.42&&e&&!e.dead)h.a+=Math.atan2(Math.sin(ang(o,e)-h.a),Math.cos(ang(o,e)-h.a))*Math.min(1,dt*7);if(h.t<.8)o.slow=Math.max(o.slow||0,.15);
  if(h.t>=.5&&!h.fr){h.fr=1;SFXa('mt_beam');shake=Math.max(shake,12)}
  if(h.t>=.5&&h.t<.85)EN.forEach(x=>{if(x.hid||x.jump||h.hit.has(x))return;const dx=x.x-o.x,dy=x.y-o.y,al=dx*Math.cos(h.a)+dy*Math.sin(h.a),pe=Math.abs(-dx*Math.sin(h.a)+dy*Math.cos(h.a));if(al>0&&pe<16+x.r){h.hit.add(x);hurt(x,8,o,x.x,x.y,0,1);safePush(x,h.a,80)}});return h.t<1};
HZP.mtcn=h=>{const o=h.o;if(o.dead)return;const t=h.t,hx=o.x+Math.cos(h.a)*(o.r+8),hy=o.y+Math.sin(h.a)*(o.r+8);
  if(t<.5){const k=t/.5;g.save();g.globalCompositeOperation='lighter';glow(MTP,hx,hy,14+40*k,.7);for(let i=0;i<5;i++){const a=i*TAU/5+t*9,r=50*(1-k);g.fillStyle='#ffd6f0';g.beginPath();g.arc(hx+Math.cos(a)*r,hy+Math.sin(a)*r,2.5,0,TAU);g.fill()}g.globalAlpha=.4;g.strokeStyle=MTP;g.lineWidth=1.5;g.setLineDash([4,8]);g.beginPath();g.moveTo(hx,hy);g.lineTo(hx+Math.cos(h.a)*800,hy+Math.sin(h.a)*800);g.stroke();g.setLineDash([]);g.restore()}
  else{const k=(t-.5)/.5,w=(t<.85?28:28*(1-(t-.85)/.15))*(1+.1*Math.sin(t*60));if(w>0){g.save();g.translate(hx,hy);g.rotate(h.a);g.globalCompositeOperation='lighter';g.fillStyle=MTP;g.globalAlpha=.55;g.fillRect(0,-w/2,900,w);g.fillStyle='#ffd6f0';g.globalAlpha=.9;g.fillRect(0,-w/4,900,w/2);g.fillStyle='#fff';g.fillRect(0,-w/10,900,w/5);glow(MTP,0,0,w*1.6,.8);g.restore()}}};
// ---------- NEO 2) 디스코 레이저 ----------
function mtDisco(o,t){const x=clamp(t.x,80,A-80),y=clamp(t.y,80,A-80);HZ.push({k:'mtds',o,t:0,x,y,rot:rnd(0,TAU),cd:{}});SFXa('mt_disco')}
HZX.mtds=(h,dt,EN)=>{h.rot+=dt*(h.t<.5?0:1.5);if(h.t>=.5&&!h.lz){h.lz=1;SFXa('mt_laser')}
  if(h.t>=.5&&h.t<2.9)for(let b=0;b<4;b++){const a=h.rot+b*TAU/4,c=b%2?'o':'b';EN.forEach(x=>{if(x.hid||x.jump)return;const key=b+':'+x.i;if((h.cd[key]||0)>h.t)return;const dx=x.x-h.x,dy=x.y-h.y,al=dx*Math.cos(a)+dy*Math.sin(a),pe=Math.abs(-dx*Math.sin(a)+dy*Math.cos(a));
    if(al>10&&al<420&&pe<x.r+8){h.cd[key]=h.t+.45;if(utCol(x,c,.25))hurt(x,1.6,h.o,x.x,x.y,0,0)}})}return h.t<3.2};
HZP.mtds=h=>{const t=h.t,y=t<.5?h.y-200*(1-t/.5)*(1-t/.5):h.y,fo=t>2.9?Math.max(0,1-(t-2.9)/.3):1;g.save();g.globalAlpha=fo;g.strokeStyle='#888';g.lineWidth=1.5;g.beginPath();g.moveTo(h.x,-20);g.lineTo(h.x,y-16);g.stroke();g.restore();
  if(t>=.5&&t<2.9)for(let b=0;b<4;b++){const a=h.rot+b*TAU/4,col=b%2?UTO:UTB;g.save();g.translate(h.x,y);g.rotate(a);g.globalCompositeOperation='lighter';g.globalAlpha=.35;g.fillStyle=col;g.fillRect(0,-9,420,18);g.globalAlpha=.85;g.fillRect(0,-3.5,420,7);g.fillStyle='#fff';g.globalAlpha=.7;g.fillRect(0,-1,420,2);g.restore()}
  g.save();g.translate(h.x,y);g.globalAlpha=fo;g.globalCompositeOperation='lighter';glow('#ffffff',0,0,40,.35);g.restore();g.save();g.translate(h.x,y);g.globalAlpha=fo;g.fillStyle='#c8ccd8';g.beginPath();g.arc(0,0,16,0,TAU);g.fill();g.save();g.clip();
  for(let i=-3;i<=3;i++)for(let j=-3;j<=3;j++){const s=((i+j+Math.floor(t*12))%3+3)%3;g.fillStyle=s==0?'#ffffff':s==1?'#9aa0b4':'#5a6074';g.fillRect(i*5-2+((t*30)%5),j*5-2,4,4)}g.restore();g.strokeStyle='#000';g.lineWidth=1.5;g.beginPath();g.arc(0,0,16,0,TAU);g.stroke();g.restore()};
// ---------- NEO 3) ULT 그랜드 피날레 ----------
function mtFinale(o,t){if(!t||t.dead)t=tgt(o);if(!t)return;HZ.push({k:'mtfn',o,tg:t,t:0,H:[],r0:o.mtR||0})}
HZX.mtfn=(h,dt,EN)=>{const o=h.o,u=h.t-MTDL;h.u=u;if(u<0)return true;const e=h.tg;if(!h.lk){h.lk=1;SFXa('mt_crowd');h.top=e?e.y>A/2:true}const live=e&&!e.dead&&!e.hid;if(!o.dead){o.gcd=Math.max(o.gcd,.4);o.cast=null}
  if(live&&u<3.3){e.stn=Math.max(e.stn||0,.1);e.cast=null}
  if(u>=.5&&u<2.2&&h.H.length<10&&u>=.5+h.H.length*.17){const x=live?e.x+rnd(-55,55):A/2,y=live?e.y+rnd(-45,45):A/2;h.H.push({x:clamp(x,20,A-20),y:clamp(y,20,A-20),t:0});if(!SKIP)SFXa('mt_drop')}
  h.H.forEach(q=>{q.t+=dt;if(q.t>=.28&&!q.bm){q.bm=1;if(!SKIP)SFXa('mt_boom');EN.forEach(x=>{if(!x.hid&&!x.jump&&Math.hypot(x.x-q.x,x.y-q.y)<44+x.r)hurt(x,1.1,o,q.x,q.y,0,0)})}});
  if(u>=2.2&&!h.ch){h.ch=1;SFXa('mt_charge')}
  if(u>=2.75&&!h.fr){h.fr=1;SFXa('mt_heart');shake=Math.max(shake,24);hs=.12;h.a=live&&!o.dead?ang(o,e):0;if(live){hurt(e,6+Math.min(4,(o.mtR||0)/12500),o,e.x,e.y,0,1);safePush(e,h.a,120)}EN.forEach(x=>{if(x==e||x.hid)return;const dx=x.x-o.x,dy=x.y-o.y,al=dx*Math.cos(h.a)+dy*Math.sin(h.a),pe=Math.abs(-dx*Math.sin(h.a)+dy*Math.cos(h.a));if(al>0&&pe<40+x.r)hurt(x,4,o,x.x,x.y,0,1)})}
  if(u>=3.3&&!h.end){h.end=1;if(!SKIP)ft(A/2,A*.3,'시청률 최고 기록!','#ffe680',26)}return u<3.8};
HZD.mtfn=h=>{const u=h.u;if(!(u>=0))return;const fa=u<3.4?Math.min(1,u/.3):Math.max(0,1-(u-3.4)/.4);if(typeof lkDim=='function')lkDim(.6*fa)};
function mtHeartShape(x,y,s,col,al){g.save();g.translate(x,y);g.scale(s,s);g.globalAlpha=al;g.fillStyle=col;g.beginPath();g.moveTo(0,6);g.bezierCurveTo(-10,-2,-8,-10,0,-5);g.bezierCurveTo(8,-10,10,-2,0,6);g.fill();g.restore()}
HZP.mtfn=h=>{const u=h.u;if(!(u>=0)||!h.lk)return;const o=h.o,fa=u<3.4?Math.min(1,u/.3):Math.max(0,1-(u-3.4)/.4);
  const sy=h.top?200:A-60;g.save();g.globalCompositeOperation='lighter';[A*.2,A*.8].forEach(sx=>{g.globalAlpha=.16*fa;g.fillStyle='#ffd6f0';g.beginPath();g.moveTo(sx,h.top?-20:A+20);g.lineTo(A/2-80,sy-60);g.lineTo(A/2+80,sy-60);g.closePath();g.fill()});glow(MTP,A/2,sy-80,170,.35*fa);g.restore();
  utDraw('ut_mtt_neo',A/2+(u>2.75&&u<3?rnd(-3,3):0),sy,150,fa*.95);
  const R=Math.round(h.r0+Math.min(1,u/3.3)*52000);utTxt('시청률 '+R.toLocaleString(),A/2,h.top?24:A*.38,18,'#ffe680',fa,'center');
  h.H.forEach(q=>{if(q.t<.28){const k=q.t/.28;mtHeartShape(q.x,q.y-260*(1-k),2.2,MTP,1);g.save();g.globalAlpha=.3;g.strokeStyle=MTP;g.lineWidth=2;g.beginPath();g.arc(q.x,q.y,44*k,0,TAU);g.stroke();g.restore()}
    else if(q.t<.6){const k=(q.t-.28)/.32;g.save();g.globalCompositeOperation='lighter';glow(MTP,q.x,q.y,60,.8*(1-k));g.restore();mtHeartShape(q.x,q.y,2.2+k*5,'#ffd6f0',1-k)}});
  if(u>=2.2&&u<2.75&&!o.dead){const k=(u-2.2)/.55;g.save();g.globalCompositeOperation='lighter';glow(MTP,o.x,o.y,40+90*k,.7);g.restore();mtHeartShape(o.x,o.y,1.6+k*1.6,'#ffd6f0',1)}
  if(u>=2.75&&u<3.25&&h.a!=null&&!o.dead){const k=(u-2.75)/.5,w=80*(1-k*.7);g.save();g.translate(o.x,o.y);g.rotate(h.a);g.globalCompositeOperation='lighter';g.globalAlpha=1-k*.6;g.fillStyle=MTP;g.fillRect(0,-w/2,900,w);g.fillStyle='#ffd6f0';g.fillRect(0,-w/3,900,w*.66);g.fillStyle='#fff';g.fillRect(0,-w/8,900,w/4);
    for(let i=0;i<6;i++)mtHeartShape(60+((u*900+i*150)%900),Math.sin(i*2+u*8)*w*.25,2.4,'#ffffff',.8);g.restore()}};
EMB.mtt=(f,D)=>{g.rotate(-f.rot);if(D.mtNeo){neon({col:MTP,hi:'#ffd6f0'},1.6,()=>{g.beginPath();g.moveTo(0,12);g.bezierCurveTo(-16,0,-12,-14,0,-6);g.bezierCurveTo(12,-14,16,0,0,12)});neon(D,1.1,()=>{g.beginPath();g.moveTo(-22,-2);g.lineTo(-12,-8);g.lineTo(-12,4);g.closePath();g.moveTo(22,-2);g.lineTo(12,-8);g.lineTo(12,4);g.closePath()})}
  else{neon(D,1.5,()=>{g.beginPath();g.ellipse(0,-8,6,8,0,0,TAU);g.moveTo(0,0);g.lineTo(0,14);g.moveTo(-8,16);g.lineTo(8,16);g.moveTo(-10,-6);g.quadraticCurveTo(-10,6,0,6);g.quadraticCurveTo(10,6,10,-6)});neon({col:'#ffe680',hi:'#ffffff'},1,()=>{const st=(cx,cy,r)=>{for(let i=0;i<5;i++){const a=-Math.PI/2+i*TAU/5,b=a+TAU/10;g.lineTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r);g.lineTo(cx+Math.cos(b)*r*.45,cy+Math.sin(b)*r*.45)}g.closePath()};g.beginPath();st(16,-14,6);g.moveTo(-20,-16);st(-17,-14,4)})}
  g.save();g.globalCompositeOperation='lighter';glow(D.col,0,0,16,.3);g.restore()};
Object.assign(DMGK,{mtt:1.56});

// ======================================================================
// 김가은 • 언다인 (왕실 경비대장 · 창)
// 패시브 결의 : 체력 70 으로 시작 · 처음 쓰러지면 죽지 않고 "언다인 THE UNDYING" 으로 다시 일어남 (체력 55)
//   UNDYING : 창이 더 많고 빨라짐 · 받는 피해 -10% · 5초마다 창을 하나씩 던짐 · 궁이 "끝나지 않는 결의" 로 바뀜
// 1) 창 폭풍 : 상대 주위에 창이 원을 그리며 나타나 한꺼번에 날아옴 (노란 창은 지나쳤다가 되돌아옴)
// 2) 초록 영혼 : 상대 영혼을 초록색으로 → 그 자리에 묶이고 방패로 막아야 함 · 사방에서 창 (방패가 늦으면 맞음)
// 3) ULT 창의 비 : 땅에서 창이 줄지어 솟구침 → "으아아아!" 거대한 창을 던짐
//    UNDYING 궁 끝나지 않는 결의 : 나선형 창 폭풍 → 양옆 창 벽 → 세 방향 거대 창
// ======================================================================
const UDC='#3ad8ff',UDDL=1.1;
['ud_spear','ud_fly','ud_hit','ud_block','ud_green','ud_rise','ud_ngah','ud_throw','ud_crack','ud_reform','ud_beat','ud_ding'].forEach(utPush);
Object.assign(SLB,{ud_spear:'언다인 · 창 소환',ud_fly:'언다인 · 창 날아감',ud_hit:'언다인 · 창 명중',ud_block:'언다인 · 방패로 막음',ud_green:'언다인 · 초록 영혼',ud_rise:'언다인 · 땅에서 창',ud_ngah:'언다인 · 기합',ud_throw:'언다인 · 거대한 창',ud_crack:'언다인 · 영혼 금 감',ud_reform:'언다인 · 결의',ud_beat:'언다인 · 심장 소리',ud_ding:'언다인 · 경고'});
const UDSK=[
  {n:'창 폭풍',w:.25,cd:8,c:(o,t)=>!t.hid&&dist(o,t)<560,f:(o,t)=>udStorm(o,t)},
  {n:'초록 영혼',w:.3,cd:11,c:(o,t)=>!t.hid&&!t.jump&&dist(o,t)<520,f:(o,t)=>udGreen(o,t)},
  {n:'창의 비',w:.4,ult:1,c:(o,t)=>!t.hid,f:(o,t)=>udRain(o,t)}];
const UDSK2=[UDSK[0],UDSK[1],{n:'끝나지 않는 결의',w:.4,ult:1,c:(o,t)=>!t.hid,f:(o,t)=>udUndying(o,t)}];
const UDI=DEF.findIndex(d=>d.name=='김가은');
DEF.push({name:'김가은 • 언다인',gl:'창',k:'und',vof:UDI,r:26,sp:222,col:'#2a8cff',hi:'#d8ecff',dk:'#04142e',alt:{col:'#ff3a4a',hi:'#ffd8dc',dk:'#2a0408'},alt2:{col:'#36e06a',hi:'#dcffe4',dk:'#062a10'},sk:UDSK});
INFO['김가은 • 언다인']={st:[8,9,9,8,8,10],p:'결의 · 체력 70 으로 시작 · 처음 쓰러지면 죽지 않고 "언다인 THE UNDYING" 으로 다시 일어남 (체력 55) · UNDYING 은 창이 더 많고 빨라지고, 받는 피해 -10%, 5초마다 창을 던지고, 궁이 "끝나지 않는 결의" 로 바뀜',
  sk:[['1×8','상대 주위에 창이 원을 그리며 나타나 한꺼번에 날아옴 · 노란 창은 지나쳤다가 되돌아와서 한 번 더 노림'],['1.1×10','상대 영혼을 초록색으로 바꿔 그 자리에 묶음 · 사방에서 창이 날아오고 상대는 방패로 막아야 함 (늦으면 맞음)'],['1.5×n+7','땅에서 창이 줄지어 솟구침 → 기합과 함께 거대한 창을 던짐 (UNDYING : 나선 창 폭풍 → 창 벽 → 세 방향 거대 창)']]};
// ---------- 창 ----------
// (x,y) = 창 끝 · a = 창이 향하는 방향
function udSpear(x,y,a,L,col,al,glw){if(!(al>0))return;g.save();g.translate(x,y);g.rotate(a);g.scale(1.3,1.3);L/=1.15;g.globalAlpha=Math.min(1,al);if(glw){g.save();g.globalCompositeOperation='lighter';glow(col,-L*.4,0,L*.55,.35*glw);g.restore()}
  g.lineCap='square';g.strokeStyle='#000';g.lineWidth=5;g.beginPath();g.moveTo(-L,0);g.lineTo(-8,0);g.stroke();g.strokeStyle=col;g.lineWidth=2.6;g.stroke();
  g.fillStyle=col;g.strokeStyle='#000';g.lineWidth=1.5;g.beginPath();g.moveTo(0,0);g.lineTo(-11,-5.5);g.lineTo(-8,0);g.lineTo(-11,5.5);g.closePath();g.fill();g.stroke();
  g.beginPath();g.moveTo(-L,0);g.lineTo(-L-6,-4);g.lineTo(-L+3,0);g.lineTo(-L-6,4);g.closePath();g.fill();g.stroke();g.fillStyle='#fff';g.fillRect(-L*.8,-.6,L*.55,1.2);g.restore()}
function udBig(x,y,a,L,al,glw){if(!(al>0))return;g.save();g.translate(x,y);g.rotate(a);g.globalAlpha=Math.min(1,al);g.save();g.globalCompositeOperation='lighter';g.globalAlpha=al*.3*(glw||1);g.strokeStyle=UDC;g.lineCap='round';g.lineWidth=26;g.beginPath();g.moveTo(-L,0);g.lineTo(0,0);g.stroke();glow(UDC,-L*.2,0,L*.4,.6*(glw||1));g.restore();
  g.fillStyle=UDC;g.strokeStyle='#001826';g.lineWidth=2.5;g.fillRect(-L,-4.5,L-36,9);g.strokeRect(-L,-4.5,L-36,9);g.fillStyle='#ffffff';g.fillRect(-L+6,-1.5,L-46,3);
  g.fillStyle=UDC;g.beginPath();g.moveTo(0,0);g.lineTo(-44,-17);g.lineTo(-34,0);g.lineTo(-44,17);g.closePath();g.fill();g.stroke();g.beginPath();g.moveTo(-L,0);g.lineTo(-L-16,-12);g.lineTo(-L+8,0);g.lineTo(-L-16,12);g.closePath();g.fill();g.stroke();g.restore()}
function udI(o){return o.udX==2?1:0}
// ---------- 패시브 : 결의 ----------
function udUndD(f){const base=f.d.col=='#2a8cff';return Object.assign({},f.d,{col:base?'#8af4ff':f.d.col=='#ff3a4a'?'#ff8a94':'#9affb4',hi:'#ffffff',dk:'#021a2a',sk:UDSK2,udX:1})}
function udGo(f){f.udX=2;f.hp=f.show=55;f.d=udUndD(f);f.cds=f.d.sk.map(s=>s.ult?0:1);f.ug=Math.max(f.ug||0,40);f.cast=null;f.udAT=0;
  if(F.length<4){const P=$('#p'+f.i);if(P){P.style.setProperty('--c',f.d.col);P.style.setProperty('--h',f.d.hi);paintIc($('#p'+f.i+' .ic'),f.d,34)}}
  if(!SKIP){SFXa('ud_reform');ring(f.x,f.y,10,240,UDC,12,.6);ring(f.x,f.y,10,150,'#ffffff',6,.5);for(let i=0;i<30;i++)sparkP(f.x,f.y,rnd(-320,320),rnd(-320,320),i%2?UDC:'#ffffff',3);ft(f.x,f.y-f.r-40,'THE UNDYING','#8af4ff',24)}}
function udRise(f){f.udX=1;f.hp=0;f.cast=null;if(!SKIP)SFXa('ud_crack');
  if(!CIN&&!TSTOP&&!MAD&&(phase=='play'||phase=='demo')&&!SKIP){CIN={o:f,t:0,dur:2.4,tick(dt){this.o.gcd=Math.max(this.o.gcd,.4);if(this.t>=.55&&!this.b1){this.b1=1;SFXa('ud_beat')}if(this.t>=1.05&&!this.b2){this.b2=1;SFXa('ud_beat')}if(this.t>=1.45&&!this.sw){this.sw=1;udGo(this.o)}if(this.t>=this.dur)return false},draw(){udCin(this)}}}else udGo(f)}
function udCin(c){const t=c.t,cx=A/2,cy=A*.42;g.save();g.globalAlpha=Math.min(.9,t*3);g.fillStyle='#000';g.fillRect(-40,-40,A+80,A+80);g.restore();
  if(t<1.45){const sh=rnd(-2,2)*Math.min(1,t),fl=t>.9&&Math.floor(t*20)%2;if(!fl)utDraw('ut_undyne',cx+sh,cy+110,220,1-Math.max(0,t-1)*1.5);
    g.save();g.globalCompositeOperation='lighter';glow('#ffffff',cx,cy-40,40+30*Math.sin(t*12),.25);g.restore();
    if(typeof utHeart=='function'){const off=t>.5?Math.min(6,(t-.5)*14):0;g.save();g.translate(cx,cy-40);g.rotate(Math.PI);utHeart(0,0,3.4,'#ffffff',off>0?1:0,off);if(off>0)utHeart(0,0,3.4,'#ffffff',2,off);g.restore()}
    utSay(t<.8?'…아직이야.':'아직 안 끝났어!!',t<.8?t:t-.8,1,A-90)}
  else{const k=t-1.45,s=k<.25?1.35-k*1.4:1;g.save();g.globalCompositeOperation='lighter';glow(UDC,cx,cy,280,.4);g.restore();
    for(let i=0;i<12;i++){const a=i*TAU/12+k*1.5,r=150+10*Math.sin(k*6+i);udSpear(cx+Math.cos(a)*r,cy+Math.sin(a)*r,a+Math.PI,40,i%3?UDC:'#ffffff',Math.min(1,k/.2),1)}
    utDraw('ut_undyne_x',cx,cy+115*s,230*s,Math.min(1,k/.12));utTxt('THE UNDYING',cx,cy+150,26,'#8af4ff',Math.min(1,k/.2),'center',UTP8);utSay('언다인이 결의로 가득 찼다.',k-.1,Math.min(1,k/.15),A-90)}
  if(t>1.4&&t<1.6){g.save();g.globalAlpha=1-(t-1.4)/.2;g.fillStyle='#fff';g.fillRect(-40,-40,A+80,A+80);g.restore()}}
const _hurtUD=hurt;hurt=function(t,n,o){if(t&&t.d&&t.d.k=='und'&&!t.dead&&n>0&&phase=='play'){if(t.udX==1)return;
    if(!t.udX){t.hp+=1000;const r=_hurtUD.apply(this,arguments);t.hp-=1000;if(t.hp<=0)udRise(t);return r}
    if(t.udX==2&&o&&o!=t){const a=[...arguments];a[1]=Math.round(n*.9*10)/10;return _hurtUD.apply(this,a)}}
  return _hurtUD.apply(this,arguments)};
const _initUD=init;init=function(){_initUD.apply(this,arguments);if(F)F.forEach(f=>{f.udX=0;f.udAT=0;f.udPin=0;if(f.d.k=='und'){f.hp=f.show=70}})};
const _updUD=update;update=function(dt){_updUD(dt);if(!F)return;F.forEach(f=>{if(f.udPin>0){f.udPin-=dt;if(!f.dead){f.x=f.udPx;f.y=f.udPy;f.cast=null}}
    if(f.d.k=='und'&&f.udX==2&&!f.dead&&phase=='play'&&!CIN&&!TSTOP&&!MAD){f.udAT+=dt;if(f.udAT>=5){const e=tgt(f);if(e&&!e.dead&&!e.hid){f.udAT=0;HZ.push({k:'udst',o:f,tg:e,t:0,S:[udMk(f.x+rnd(-30,30),f.y-f.r-30,e,0,.35,2)],one:1});if(!SKIP)SFXa('ud_spear')}}}})};
UTSP.und=f=>{if(f.udX==2)utBehind(f,'ut_undyne_x',f.r*3.3,.88,.55,.42);else if(!f.udX)utBehind(f,'ut_undyne',f.r*3.2,.85,.55,.42)};
// ---------- 1) 창 폭풍 ----------
function udMk(x,y,e,t0,launch,dmg,yel){return{x,y,a:Math.atan2(e.y-y,e.x-x),t0,launch,dmg:dmg||1,yel:!!yel,on:1,st:0}}
function udStorm(o,t){const I=udI(o),N=I?12:8,R=210,a0=rnd(0,TAU),S=[];for(let i=0;i<N;i++){const a=a0+i*TAU/N;S.push(udMk(clamp(t.x+Math.cos(a)*R,10,A-10),clamp(t.y+Math.sin(a)*R,10,A-10),t,i*(I?.04:.06),(I?.38:.55)+i*(I?.05:.07),1,Math.random()<.25))}
  HZ.push({k:'udst',o,tg:t,t:0,S,sp:I?920:760});SFXa('ud_spear')}
HZX.udst=(h,dt,EN)=>{const e=h.tg;let live=0;const sp=h.sp||760;h.S.forEach(s=>{if(!s.on)return;live=1;const t=h.t;if(t<s.t0)return;
    if(t<s.launch){if(e&&!e.dead)s.a+=Math.atan2(Math.sin(Math.atan2(e.y-s.y,e.x-s.x)-s.a),Math.cos(Math.atan2(e.y-s.y,e.x-s.x)-s.a))*Math.min(1,dt*10);return}
    if(!s.go){s.go=1;s.vx=Math.cos(s.a)*sp;s.vy=Math.sin(s.a)*sp;s.tx=e?e.x:s.x;s.ty=e?e.y:s.y;if(!SKIP&&Math.random()<.4)SFXa('ud_fly')}
    if(s.yel&&!s.rev){const pass=(s.tx-s.x)*s.vx+(s.ty-s.y)*s.vy<0&&Math.hypot(s.tx-s.x,s.ty-s.y)>110;if(pass){s.rev=1;s.rt=0}}
    if(s.rev==1){s.rt+=dt;const k=Math.max(0,1-s.rt/.25);s.x+=s.vx*k*dt;s.y+=s.vy*k*dt;if(s.rt>=.3){s.rev=2;const tx=e&&!e.dead?e.x:s.tx,ty=e&&!e.dead?e.y:s.ty;s.a=Math.atan2(ty-s.y,tx-s.x);s.vx=Math.cos(s.a)*sp;s.vy=Math.sin(s.a)*sp}else{const tx=e&&!e.dead?e.x:s.tx,ty=e&&!e.dead?e.y:s.ty;s.a+=Math.atan2(Math.sin(Math.atan2(ty-s.y,tx-s.x)-s.a),Math.cos(Math.atan2(ty-s.y,tx-s.x)-s.a))*Math.min(1,dt*14)}}
    else{s.x+=s.vx*dt;s.y+=s.vy*dt}
    if(s.x<-60||s.x>A+60||s.y<-60||s.y>A+60){s.on=0;return}
    for(const x of EN){if(x.hid||x.jump)continue;if(Math.hypot(x.x-s.x,x.y-s.y)<x.r+5){s.on=0;hurt(x,s.dmg,h.o,s.x,s.y,0,0);if(!SKIP)SFXa('ud_hit');for(let k=0;k<4;k++)sparkP(s.x,s.y,rnd(-120,120),rnd(-120,120),s.yel?'#ffe23a':UDC,2);break}}});return live||h.t<.3};
HZP.udst=h=>{h.S.forEach(s=>{if(!s.on||h.t<s.t0)return;const ap=Math.min(1,(h.t-s.t0)/.15);udSpear(s.x,s.y,s.a,38,s.yel?'#ffe23a':UDC,ap,h.t<s.launch?1:.5)})};
// ---------- 2) 초록 영혼 ----------
function udGreen(o,t){const I=udI(o),N=I?14:10,iv=I?.14:.2,tr=I?.4:.5,D=[];let last=-1;for(let i=0;i<N;i++){let d=Math.floor(rnd(0,4));if(d==last&&Math.random()<.6)d=(d+2)%4;last=d;D.push({d,t0:.55+i*iv,tr,yel:i>2&&Math.random()<.22,on:1})}
  t.udPin=.55+N*iv+tr+.15;t.udPx=t.x;t.udPy=t.y;HZ.push({k:'udgr',o,tg:t,t:0,D,sa:ang(t,o)});SFXa('ud_green')}
HZX.udgr=(h,dt,EN)=>{const e=h.tg;if(!e||e.dead){return false}let live=0,next=null,best=9;
  h.D.forEach(s=>{if(!s.on)return;live=1;const t=h.t-s.t0;if(t<0)return;const k=t/s.tr,side=s.yel&&k>.55?(s.d+2)%4:s.d;s.side=side;s.k=k;const rem=s.tr-t;if(rem<best){best=rem;next=s}
    if(k>=1){s.on=0;const ia=side*Math.PI/2,diff=Math.abs(Math.atan2(Math.sin(h.sa-ia),Math.cos(h.sa-ia)));if(diff<.7){if(!SKIP){SFXa('ud_block');for(let q=0;q<5;q++)sparkP(e.x+Math.cos(ia)*(e.r+14),e.y+Math.sin(ia)*(e.r+14),rnd(-140,140),rnd(-140,140),'#ffffff',2)}}else{hurt(e,1.1,h.o,e.x,e.y,0,0);if(!SKIP)SFXa('ud_hit')}}});
  if(next){const ia=(next.k>.45&&next.yel?(next.d+2)%4:next.d)*Math.PI/2;h.sa+=clamp(Math.atan2(Math.sin(ia-h.sa),Math.cos(ia-h.sa)),-dt*9,dt*9)}
  return live||h.t<.6};
HZD.udgr=h=>{const e=h.tg;if(!e||e.dead)return;const fa=Math.min(1,h.t/.2);g.save();g.globalAlpha=.8*fa;g.strokeStyle=UTGR;g.lineWidth=3;g.strokeRect(e.x-e.r-34,e.y-e.r-34,e.r*2+68,e.r*2+68);g.restore()};
HZP.udgr=h=>{const e=h.tg;if(!e||e.dead)return;const fa=Math.min(1,h.t/.2);
  if(typeof utHeart=='function'){g.save();g.globalAlpha=fa;utHeart(e.x,e.y-e.r-18,2,UTGR);g.restore()}
  g.save();g.globalAlpha=fa;g.strokeStyle='#4aa8ff';g.lineWidth=6;g.lineCap='round';g.beginPath();g.arc(e.x,e.y,e.r+14,h.sa-.75,h.sa+.75);g.stroke();g.strokeStyle='#cfe8ff';g.lineWidth=2;g.stroke();g.restore();
  h.D.forEach(s=>{if(!s.on||h.t<s.t0)return;const ia=(s.side==null?s.d:s.side)*Math.PI/2,dd=(e.r+16)+(1-Math.min(1,s.k))*220;udSpear(e.x+Math.cos(ia)*dd,e.y+Math.sin(ia)*dd,ia+Math.PI,34,s.yel?'#ffe23a':UDC,1,.6)});
  if(h.t<.6)utTxt('초록 영혼!',e.x,e.y-e.r-44,16,UTGR,fa)};
// ---------- 3) ULT 창의 비 ----------
function udRain(o,t){if(!t||t.dead)t=tgt(o);if(!t)return;HZ.push({k:'udrn',o,tg:t,t:0,R:[],hit:new Set()})}
HZX.udrn=(h,dt,EN)=>{const o=h.o,u=h.t-UDDL;h.u=u;if(u<0)return true;const e=h.tg;const live=e&&!e.dead&&!e.hid;if(!o.dead){o.gcd=Math.max(o.gcd,.4);o.cast=null}
  if(h.R.length<4&&u>=h.R.length*.42){const ri=h.R.length,cx=live?e.x+e.dx*e.sp*.3:A/2,cy=live?e.y+e.dy*e.sp*.3:A/2,a=[0,Math.PI/2,Math.PI/4,-Math.PI/4][ri],P=[];for(let i=-4;i<=4;i++)P.push({x:clamp(cx+Math.cos(a)*i*36,14,A-14),y:clamp(cy+Math.sin(a)*i*36,14,A-14)});h.R.push({t:0,P,hit:new Set()});SFXa('ud_ding')}
  h.R.forEach(r=>{r.t+=dt;if(r.t>=.38&&!r.up){r.up=1;SFXa('ud_rise');shake=Math.max(shake,5)}if(r.up&&r.t<.62)EN.forEach(x=>{if(x.hid||x.jump||r.hit.has(x))return;if(r.P.some(p=>Math.hypot(x.x-p.x,x.y-p.y)<x.r+12)){r.hit.add(x);hurt(x,1.5,o,x.x,x.y,0,0)}})});
  if(u>=1.75&&!h.ng){h.ng=1;SFXa('ud_ngah')}
  if(u<2.55&&live){h.ax=e.x;h.ay=e.y}
  if(u>=2.55&&!h.th){h.th=1;SFXa('ud_throw');h.sx=o.dead?A/2:o.x;h.sy=o.dead?A/2:o.y-o.r-40;h.a=Math.atan2(h.ay-h.sy,h.ax-h.sx);h.px=h.sx;h.py=h.sy}
  if(h.th&&!h.done){h.px+=Math.cos(h.a)*1500*dt;h.py+=Math.sin(h.a)*1500*dt;EN.forEach(x=>{if(x.hid||h.hit.has(x))return;if(Math.hypot(x.x-h.px,x.y-h.py)<x.r+16){h.hit.add(x);hurt(x,x==e?7:3.5,o,x.x,x.y,0,1);safePush(x,h.a,120);shake=Math.max(shake,20);hs=.1;if(typeof lkImp=='function')lkImp(x.x,x.y,110,UDC)}});
    if(h.px<-10||h.px>A+10||h.py<-10||h.py>A+10){h.done=1;h.px=clamp(h.px,0,A);h.py=clamp(h.py,0,A);shake=Math.max(shake,8)}}
  return u<3.6};
HZD.udrn=h=>{const u=h.u;if(!(u>=0))return;h.R.forEach(r=>{if(r.t<.38){g.save();g.globalAlpha=.75;g.strokeStyle='#ffffff';g.lineWidth=2;r.P.forEach(p=>{g.strokeRect(p.x-9,p.y-9,18,18)});g.restore()}})};
HZP.udrn=h=>{const u=h.u;if(!(u>=0))return;const o=h.o;
  h.R.forEach(r=>{if(r.t<.38||r.t>.75)return;const k=r.t<.5?(r.t-.38)/.12:1-(r.t-.5)/.25;r.P.forEach(p=>udSpear(p.x,p.y-30*k+8,-Math.PI/2,26+20*k,UDC,Math.min(1,k*2),.5))});
  if(u>=1.65&&u<2.55&&!o.dead){const k=Math.min(1,(u-1.65)/.25),sx=o.x,sy=o.y-o.r-40,a=h.ax!=null?Math.atan2(h.ay-sy,h.ax-sx):-Math.PI/2;udBig(sx+Math.cos(a)*120,sy+Math.sin(a)*120,a,230*k,k,1+.3*Math.sin(u*30));utTxt('으아아아아!!',o.x,o.y-o.r-100+rnd(-2,2),26,'#ffffff',Math.min(1,(u-1.75)/.1))}
  if(h.th){const fo=h.done?Math.max(0,1-(u-2.9)/.5):1;udBig(h.px,h.py,h.a,230,fo,1.3);if(!h.done){g.save();g.globalCompositeOperation='lighter';g.globalAlpha=.35;g.strokeStyle=UDC;g.lineWidth=18;g.beginPath();g.moveTo(h.sx,h.sy);g.lineTo(h.px,h.py);g.stroke();g.restore()}}};
// ---------- UNDYING ULT 끝나지 않는 결의 ----------
function udUndying(o,t){if(!t||t.dead)t=tgt(o);if(!t)return;HZ.push({k:'udun',o,tg:t,t:0,S:[],W:[],G:[],ns:0})}
HZX.udun=(h,dt,EN)=>{const o=h.o,u=h.t-UDDL;h.u=u;if(u<0)return true;const e=h.tg,live=e&&!e.dead&&!e.hid;if(!o.dead){o.gcd=Math.max(o.gcd,.4);o.cast=null}if(!h.lk){h.lk=1;SFXa('ud_ngah');h.ex=live?e.x:A/2;h.ey=live?e.y:A/2}
  if(live&&u<3.7){h.ex=e.x;h.ey=e.y}
  if(u<1.8&&h.ns<28&&u>=h.ns*.06){const a=h.ns*.62,R=240,x=clamp(h.ex+Math.cos(a)*R,8,A-8),y=clamp(h.ey+Math.sin(a)*R,8,A-8);h.S.push({x,y,a:Math.atan2(h.ey-y,h.ex-x),t:0,on:1});h.ns++;if(!SKIP&&h.ns%3==0)SFXa('ud_spear')}
  h.S.forEach(s=>{if(!s.on)return;s.t+=dt;if(s.t<.28){s.a=Math.atan2(h.ey-s.y,h.ex-s.x);return}s.x+=Math.cos(s.a)*900*dt;s.y+=Math.sin(s.a)*900*dt;if(s.x<-40||s.x>A+40||s.y<-40||s.y>A+40){s.on=0;return}
    for(const x of EN){if(x.hid||x.jump)continue;if(Math.hypot(x.x-s.x,x.y-s.y)<x.r+5){s.on=0;hurt(x,.55,o,s.x,s.y,0,0);break}}});
  if(u>=1.8&&!h.wl){h.wl=1;SFXa('ud_rise');[-1,1].forEach(sd=>{for(let i=-3;i<=3;i++)h.W.push({sd,x:sd<0?-20:A+20,y:clamp(h.ey+i*34,10,A-10),on:1})})}
  h.W.forEach(w=>{if(!w.on)return;w.x+=-w.sd*560*dt;if((w.sd<0&&w.x>A+30)||(w.sd>0&&w.x<-30)){w.on=0;return}EN.forEach(x=>{if(!w.on||x.hid||x.jump)return;if(Math.hypot(x.x-w.x,x.y-w.y)<x.r+8){w.on=0;hurt(x,1.2,o,x.x,x.y,0,0)}})});
  if(u>=2.6&&h.G.length<3&&u>=2.6+h.G.length*.22){const a=-Math.PI/2+h.G.length*TAU/3+rnd(-.2,.2),R=330;h.G.push({sx:h.ex+Math.cos(a)*R,sy:h.ey+Math.sin(a)*R,a:a+Math.PI,t:0,hit:0});SFXa('ud_throw')}
  h.G.forEach(q=>{q.t+=dt;if(q.t>=.18&&!q.hit){q.hit=1;if(live&&Math.hypot(e.x-h.ex,e.y-h.ey)<80){hurt(e,3.5,o,e.x,e.y,0,1);shake=Math.max(shake,16);hs=.08;if(typeof lkImp=='function')lkImp(e.x,e.y,90,UDC)}}});
  return u<3.9};
HZD.udun=h=>{const u=h.u;if(!(u>=0))return;const fa=u<3.5?Math.min(1,u/.3):Math.max(0,1-(u-3.5)/.4);if(typeof lkDim=='function')lkDim(.5*fa)};
HZP.udun=h=>{const u=h.u;if(!(u>=0))return;h.S.forEach(s=>{if(s.on)udSpear(s.x,s.y,s.a,36,s.t<.28?'#ffffff':UDC,Math.min(1,s.t/.1),1)});h.W.forEach(w=>{if(w.on)udSpear(w.x,w.y,w.sd<0?0:Math.PI,40,'#ffe23a',1,.6)});
  h.G.forEach(q=>{const k=Math.min(1,q.t/.18),x=q.sx+(h.ex-q.sx)*k,y=q.sy+(h.ey-q.sy)*k,fo=q.t>.5?Math.max(0,1-(q.t-.5)/.3):1;udBig(x,y,q.a,200,fo,1.2)});
  if(u<.6)utTxt('끝나지 않는 결의',A/2,A*.18,24,'#8af4ff',Math.min(1,u/.1)*(u>.45?1-(u-.45)/.15:1))};
EMB.und=(f,D)=>{g.rotate(-f.rot+.8);neon({col:UDC,hi:'#e0faff'},1.6,()=>{g.beginPath();g.moveTo(-22,0);g.lineTo(16,0);g.moveTo(22,0);g.lineTo(13,-6);g.lineTo(15,0);g.lineTo(13,6);g.closePath();g.moveTo(-22,0);g.lineTo(-26,-4);g.moveTo(-22,0);g.lineTo(-26,4)});
  if(D.udX)neon({col:'#ffffff',hi:'#ffffff'},1.1,()=>{g.beginPath();g.arc(-4,-11,4,0,TAU);g.moveTo(-4,7);g.lineTo(-4,15)});else neon(D,1.1,()=>{g.beginPath();g.moveTo(-6,-14);g.lineTo(-2,-8);g.lineTo(2,-14);g.moveTo(-6,14);g.lineTo(-2,8);g.lineTo(2,14)});g.save();g.globalCompositeOperation='lighter';glow(UDC,0,0,16,.3);g.restore()};
Object.assign(DMGK,{und:1.42});

// ======================================================================
// 흉악범 • 플라위 (웃는 꽃 · 영혼 6개)
// 패시브 영혼 수집 : 스킬이 맞을 때마다 상대 몸에서 영혼을 하나씩 뽑아옴 (6초마다 하나 더) · 영혼 6개가 모이면 각성
// 체력 85 로 시작 · 각성 = "오메가 플라위" : TV 지지직 → 영혼 6개가 합쳐짐 → 거대한 모습 · 체력 +20 · 주는 피해 +15% · 받는 피해 -10% · 스킬 셋 전부 바뀜
// 1) 친절 알갱이 : "친절 알갱이를 받아!" 상대 주위에 하얀 알갱이 고리 → 한꺼번에 조여옴
// 2) 덩굴 채찍 : 땅을 뚫고 가시 덩굴이 줄지어 솟구치며 휘두름 · 마지막 덩굴이 묶음
// 3) ULT 죽어버려 : 기분 나쁜 웃음 → 빈틈 없는 알갱이 고리가 상대를 따라다니며 천천히 조여오다 한 번에 닫힘 (영혼 2개)
// 오메가 1) 화염 방사 · 2) X 폭탄 · 3) ULT 세이브 · 로드 : 파일을 저장 → 파리지옥 탄막 + X 폭탄 → 로드 (저장했던 체력으로 되돌아감)
// ======================================================================
const FLC=['#00ffff','#ff7f27','#0026ff','#d535d9','#00c000','#ffff00'],FLDL=1.1,FLG='#4ad94a';
['fl_laugh','fl_pellet','fl_close','fl_vine','fl_soul','fl_static','fl_awake','fl_flame','fl_bomb','fl_boom','fl_save','fl_load','fl_trap','fl_hee'].forEach(utPush);
Object.assign(SLB,{fl_laugh:'플라위 · 웃음',fl_pellet:'플라위 · 알갱이',fl_close:'플라위 · 조여오기',fl_vine:'플라위 · 덩굴',fl_soul:'플라위 · 영혼 흡수',fl_static:'플라위 · TV 지지직',fl_awake:'플라위 · 각성',fl_flame:'플라위 · 화염 방사',fl_bomb:'플라위 · 폭탄 떨어짐',fl_boom:'플라위 · X 폭발',fl_save:'플라위 · 세이브',fl_load:'플라위 · 로드',fl_trap:'플라위 · 파리지옥',fl_hee:'플라위 · 히히'});
const FLSK=[
  {n:'친절 알갱이',w:.3,cd:8,c:(o,t)=>!t.hid&&dist(o,t)<560,f:(o,t)=>flPellets(o,t)},
  {n:'덩굴 채찍',w:.3,cd:9.5,c:(o,t)=>!t.hid&&!t.jump&&dist(o,t)<430,f:(o,t)=>flVine(o,t)},
  {n:'죽어버려',w:.4,ult:1,c:(o,t)=>!t.hid,f:(o,t)=>flDie(o,t)}];
const FLSK2=[
  {n:'화염 방사',w:.3,cd:7,c:(o,t)=>!t.hid&&dist(o,t)<380,f:(o,t)=>flFlame(o,t)},
  {n:'X 폭탄',w:.3,cd:9,c:(o,t)=>!t.hid&&dist(o,t)<540,f:(o,t)=>flBomb(o,t)},
  {n:'세이브 · 로드',w:.4,ult:1,c:(o,t)=>!t.hid,f:(o,t)=>flSaveLoad(o,t)}];
const FLI=DEF.findIndex(d=>d.name=='흉악범');
DEF.push({name:'흉악범 • 플라위',gl:'꽃',k:'flw',vof:FLI,r:25,sp:218,col:'#ffd21e',hi:'#ffffff',dk:'#0b2a08',alt:{col:'#ff2a3a',hi:'#ffe0e2',dk:'#2a0004'},alt2:{col:'#4ad94a',hi:'#e6ffe0',dk:'#06200a'},sk:FLSK});
INFO['흉악범 • 플라위']={st:[8,8,8,8,9,10],p:'체력 85 로 시작 · 영혼 수집 · 스킬이 맞을 때마다 상대에게서 영혼을 하나씩 뽑아옴 (6초마다 하나 더) · 영혼 6개가 모이면 "오메가 플라위" 로 각성 (체력 +20 · 주는 피해 +15% · 받는 피해 -10% · 화염 방사 · X 폭탄 · 궁 세이브 · 로드)',
  sk:[['0.9×12','"친절 알갱이를 받아!" 상대 주위에 하얀 알갱이 고리가 생기고 한꺼번에 조여옴'],['1.4×2+묶기','땅을 뚫고 가시 덩굴이 상대 쪽으로 줄지어 솟구치며 휘두름 · 마지막 덩굴에 맞으면 묶임'],['0.5×30','기분 나쁜 웃음 → 빈틈 없는 알갱이 고리가 상대를 따라다니며 천천히 조여오다 한 번에 닫힘 · 영혼을 2개 뽑아옴 (오메가 궁 : 세이브 → 탄막 → 로드로 체력 되돌리기)']]};
// ---------- 그림 ----------
function flPellet(x,y,a,al,s){if(!(al>0))return;g.save();g.translate(x,y);g.rotate(a);g.scale(s||1,s||1);g.globalAlpha=Math.min(1,al);g.fillStyle='#ffffff';g.strokeStyle='#000';g.lineWidth=1.5;
  g.beginPath();g.moveTo(0,-7);g.quadraticCurveTo(3,-2,7,0);g.quadraticCurveTo(3,2,0,7);g.quadraticCurveTo(-3,2,-7,0);g.quadraticCurveTo(-3,-2,0,-7);g.fill();g.stroke();g.restore()}
function flSoulH(x,y,s,col,al){if(!(al>0)||typeof utHeart!='function')return;g.save();g.globalAlpha=Math.min(1,al);g.save();g.globalCompositeOperation='lighter';glow(col,x,y,s*9,.45);g.restore();utHeart(x,y,s,col);g.restore()}
function flVineArt(x,y,h,sw,al,th){if(!(al>0))return;g.save();g.translate(x,y);g.globalAlpha=Math.min(1,al);const tx=sw*h*.45,ty=-h;g.lineCap='round';
  g.strokeStyle='#0a3a08';g.lineWidth=12;g.beginPath();g.moveTo(0,0);g.quadraticCurveTo(-sw*20,-h*.55,tx,ty);g.stroke();g.strokeStyle='#3ec43a';g.lineWidth=8;g.stroke();g.strokeStyle='#9dff7a';g.lineWidth=2;g.beginPath();g.moveTo(-2,-4);g.quadraticCurveTo(-sw*20-2,-h*.55,tx-2,ty+4);g.stroke();
  g.fillStyle='#e8ffe0';for(let i=1;i<6;i++){const u=i/6,px=2*(1-u)*u*(-sw*20)+u*u*tx,py=2*(1-u)*u*(-h*.55)+u*u*ty,sd=i%2?1:-1;g.beginPath();g.moveTo(px+sd*4,py);g.lineTo(px+sd*11,py-5);g.lineTo(px+sd*4,py-6);g.closePath();g.fill()}
  if(th){g.fillStyle='#3ec43a';g.beginPath();g.ellipse(tx,ty,7,4,sw,0,TAU);g.fill()}g.restore()}
// ---------- 영혼 ----------
function flSoul(o,e,n){if(!o||o.d.k!='flw'||o.flX||o.dead)return;for(let i=0;i<(n||1);i++){if(o.flS>=6)break;const c=FLC[o.flS%6];o.flS++;FLQ.push({k:'flsl',o,t:-i*.15,x:e?e.x:o.x,y:e?e.y:o.y,c})}if(!SKIP)SFXa('fl_soul');if(o.flS>=6&&!o.flX)CXQ_FL.push(o)}
const CXQ_FL=[],FLQ=[];
HZX.flsl=(h,dt)=>{const o=h.o;if(o.dead)return false;if(h.t<0)return true;const k=Math.min(1,h.t/.55),e=k*k;h.cx=h.x+(o.x-h.x)*e;h.cy=h.y+(o.y-h.y)*e-Math.sin(Math.PI*k)*60;return h.t<.55};
HZP.flsl=h=>{if(h.cx==null)return;flSoulH(h.cx,h.cy,1.6,h.c,1)};
function flOmD(f){const base=f.d.col=='#ffd21e';return Object.assign({},f.d,{col:base?FLG:f.d.col=='#ff2a3a'?'#ff5a8a':'#c8ff4a',hi:'#ffd0e0',dk:'#0a1a06',sk:FLSK2,flX:1})}
function flGo(f){f.flX=2;f.hp=f.show=Math.min(100,f.hp+20);f.d=flOmD(f);f.r=28;f.cds=f.d.sk.map(s=>s.ult?0:1);f.ug=Math.max(f.ug||0,30);f.cast=null;
  if(F.length<4){const P=$('#p'+f.i);if(P){P.style.setProperty('--c',f.d.col);P.style.setProperty('--h',f.d.hi);paintIc($('#p'+f.i+' .ic'),f.d,34)}}
  if(!SKIP){SFXa('fl_laugh');ring(f.x,f.y,10,260,FLG,12,.6);for(let i=0;i<30;i++)sparkP(f.x,f.y,rnd(-340,340),rnd(-340,340),FLC[i%6],3)}}
function flAwake(f){if(f.flX)return;f.flX=1;f.cast=null;
  if(!CIN&&!TSTOP&&!MAD&&(phase=='play'||phase=='demo')&&!SKIP){SFXa('fl_static');CIN={o:f,t:0,dur:2.8,tick(dt){this.o.gcd=Math.max(this.o.gcd,.4);if(this.t>=.75&&!this.s1){this.s1=1;SFXa('fl_hee')}if(this.t>=1.65&&!this.sw){this.sw=1;SFXa('fl_awake');flGo(this.o)}if(this.t>=this.dur)return false},draw(){flCin(this)}}}else flGo(f)}
function flStatic(al,n){if(!(al>0))return;g.save();g.globalAlpha=al;for(let i=0;i<(n||220);i++){const v=Math.floor(rnd(0,255));g.fillStyle='rgb('+v+','+v+','+v+')';g.fillRect(Math.floor(rnd(0,A/6))*6,Math.floor(rnd(0,A/4))*4,6+Math.floor(rnd(0,3))*6,4)}g.restore()}
function flOmega(x,y,W,al,shk){const o=UTI.ut_flowey_x;if(!o)return false;const H=W*o.h/o.w,sx=shk?rnd(-shk,shk):0,sy=shk?rnd(-shk,shk):0;
  if(shk&&Math.random()<.3){utDraw('ut_flowey_x',x+sx-5,y+sy,H,al*.35,0,1,'lighter')}utDraw('ut_flowey_x',x+sx,y+sy,H,al,0,1);
  const tx=x+sx-W/2+W*.403,ty=y+sy-H/2+H*.062,tw=W*.194,th=H*.202;g.save();g.beginPath();g.rect(tx,ty,tw,th);g.clip();g.globalAlpha=al;g.fillStyle='#000';g.fillRect(tx,ty,tw,th);
  if(Math.random()<.75){const ti=UTI.ut_flowey_tv;if(ti){const hh=th*1.05,ww=hh*ti.w/ti.h;g.globalAlpha=al*(.7+.3*Math.random());g.imageSmoothingEnabled=false;g.drawImage(utSrc('ut_flowey_tv'),tx+tw/2-ww/2+rnd(-1,1),ty+th/2-hh/2,ww,hh)}}
  for(let i=0;i<14;i++){g.globalAlpha=al*.5;g.fillStyle=Math.random()<.5?'#fff':'#666';g.fillRect(tx+rnd(0,tw),ty+rnd(0,th),rnd(2,8),1.5)}g.restore();return true}
function flCin(c){const t=c.t,f=c.o,cx=A/2,cy=A*.42;g.save();g.globalAlpha=Math.min(.95,t*3);g.fillStyle='#000';g.fillRect(-40,-40,A+80,A+80);g.restore();
  if(t<.8){flStatic(.8,320);const ti=UTI.ut_flowey_tv;if(ti&&Math.floor(t*12)%3)utDraw('ut_flowey_tv',cx+rnd(-6,6),cy,330,.85,0,1)}
  else if(t<1.65){const k=(t-.8)/.85;flStatic(.15,60);for(let i=0;i<6;i++){const a=i*TAU/6+k*6,r=170*(1-k*k);flSoulH(cx+Math.cos(a)*r,cy+Math.sin(a)*r,3,FLC[i],1)}g.save();g.globalCompositeOperation='lighter';glow('#ffffff',cx,cy,40+120*k,.5*k);g.restore();utSay('6개의 영혼이… 하나가 된다.',t-.8,1,A-90)}
  else{const k=t-1.65;flOmega(cx,cy+10,A*1.02*(k<.2?1.2-k:1),Math.min(1,k/.1),k<.6?6:2);if(Math.random()<.12)flStatic(.35,140);utTxt('오메가 플라위',cx,A*.84,28,FLG,Math.min(1,k/.2),'center',UTFN)}
  if(t>1.6&&t<1.8){g.save();g.globalAlpha=1-(t-1.6)/.2;g.fillStyle='#fff';g.fillRect(-40,-40,A+80,A+80);g.restore()}}
// ---------- 패시브 ----------
const _hurtFL=hurt;hurt=function(t,n,o){if(t&&t.d&&t.d.k=='flw'&&t.flX==1&&n>0&&phase=='play')return;
  if(n>0&&o&&o.d&&o.d.k=='flw'&&o.flX==2&&t&&t!=o){const a=[...arguments];a[1]=Math.round(n*1.15*10)/10;return _hurtFL.apply(this,a)}
  if(n>0&&t&&t.d&&t.d.k=='flw'&&t.flX==2&&o&&o!=t){const a=[...arguments];a[1]=Math.round(n*.9*10)/10;return _hurtFL.apply(this,a)}return _hurtFL.apply(this,arguments)};
const _initFL=init;init=function(){_initFL.apply(this,arguments);CXQ_FL.length=0;FLQ.length=0;if(F)F.forEach(f=>{f.flS=0;f.flX=0;f.flT=0;if(f.d.k=='flw'){f.hp=f.show=85}})};
const _updFL=update;update=function(dt){_updFL(dt);if(!F)return;while(FLQ.length)HZ.push(FLQ.shift());while(CXQ_FL.length){const f=CXQ_FL.shift();if(!f.dead&&!f.flX&&phase=='play')flAwake(f)}
  if(phase!='play'||CIN||TSTOP||MAD)return;F.forEach(f=>{if(f.d.k!='flw'||f.dead||f.flX)return;f.flT=(f.flT||0)+dt;if(f.flT>=6){f.flT=0;flSoul(f,tgt(f))}})};
const _lowFL=lowHP;lowHP=function(f){_lowFL(f);if(f.d.k=='flw'&&!f.dead&&!f.hid&&!f.flX&&f.flS>0&&phase!='end'){for(let i=0;i<f.flS;i++){const a=clock*1.6+i*TAU/6;flSoulH(f.x+Math.cos(a)*(f.r+14),f.y+Math.sin(a)*(f.r+14)*.6-4,1.1,FLC[i],.95)}}};
UTSP.flw=f=>{if(f.flX==2){const W=f.r*7.2,o=UTI.ut_flowey_x,H=o?W*o.h/o.w:W*.6,bob=Math.sin(clock*2)*3;flOmega(f.x,f.y-f.r*.2-H*.32+bob,W,.92,f.flK?3:0)}else if(!f.flX){utBehind(f,'ut_flowey',f.r*1.9,.95,1.05,.62)}};
// ---------- 1) 친절 알갱이 ----------
function flPellets(o,t){const N=12;HZ.push({k:'flpl',o,tg:t,t:0,cx:t.x,cy:t.y,R:150,rot:rnd(0,TAU),N,P:Array.from({length:N},(_,i)=>({a:i*TAU/N,on:1})),got:0});SFXa('fl_pellet')}
HZX.flpl=(h,dt,EN)=>{const e=h.tg;if(h.t<.75&&e&&!e.dead&&!e.hid){h.cx+=(e.x-h.cx)*Math.min(1,dt*3);h.cy+=(e.y-h.cy)*Math.min(1,dt*3)}const u=h.t-.75;h.rot+=dt*(u<0?1.5:3);
  if(u>=0&&!h.go){h.go=1;SFXa('fl_close');if(e&&!e.dead){h.tx=e.x;h.ty=e.y}else{h.tx=h.cx;h.ty=h.cy}}
  if(u>=0){const k=Math.min(1,u/.45);h.R=150*(1-k*k);if(e&&!e.dead&&!e.hid){h.tx=e.x;h.ty=e.y}h.cx+=(h.tx-h.cx)*Math.min(1,dt*7);h.cy+=(h.ty-h.cy)*Math.min(1,dt*7)}
  let live=0;h.P.forEach(p=>{if(!p.on)return;live=1;p.x=h.cx+Math.cos(p.a+h.rot)*h.R;p.y=h.cy+Math.sin(p.a+h.rot)*h.R;if(u<0)return;
    for(const x of EN){if(x.hid||x.jump)continue;if(Math.hypot(x.x-p.x,x.y-p.y)<x.r+6){p.on=0;hurt(x,.9,h.o,p.x,p.y,0,0);if((h.got||0)<2&&(!h.gt||h.t-h.gt>.12)){h.got=(h.got||0)+1;h.gt=h.t;flSoul(h.o,x)}break}}});
  if(u>.5)h.P.forEach(p=>p.on=0);return live&&u<.6||u<0};
HZP.flpl=h=>{const sp=Math.min(1,h.t/.35);h.P.forEach((p,i)=>{if(!p.on||p.x==null||i/h.N>sp)return;flPellet(p.x,p.y,h.rot*3+i,1,1.5)});const o=h.o;
  if(h.t<1&&!o.dead){const al=Math.min(1,h.t/.1)*(h.t>.85?1-(h.t-.85)/.15:1);g.save();g.globalAlpha=al;const tx='친절 알갱이를 받아!';g.font='17px '+UTFN;const w=g.measureText(tx).width+20,bx=clamp(o.x-w/2,6,A-w-6),by=o.y-o.r-66;g.fillStyle='#fff';g.fillRect(bx,by,w,30);g.fillStyle='#000';g.textAlign='left';g.textBaseline='middle';g.fillText(tx,bx+10,by+15);g.beginPath();g.moveTo(o.x-6,by+28);g.lineTo(o.x,by+38);g.lineTo(o.x+4,by+28);g.fillStyle='#fff';g.fill();g.restore()}};
// ---------- 2) 덩굴 채찍 ----------
function flVine(o,t){const a=ang(o,t),d=dist(o,t),P=[];for(let i=0;i<7;i++){const k=Math.min(1,(i+1)/4);P.push({x:clamp(o.x+Math.cos(a)*d*k,16,A-16),y:clamp(o.y+Math.sin(a)*d*k,16,A-16),t0:.12+i*.13,sw:(i%2?1:-1)*rnd(.6,1),ch:i>=3})}
  HZ.push({k:'flvn',o,tg:t,t:0,P,hc:new Map(),got:0});SFXa('fl_vine')}
HZX.flvn=(h,dt,EN)=>{const e=h.tg;h.P.forEach((p,i)=>{const t=h.t-p.t0;if(p.ch&&t<0&&t>-.12&&e&&!e.dead&&!e.hid&&!p.lk){p.lk=1;p.x=clamp(e.x+e.dx*e.sp*.2+rnd(-10,10),16,A-16);p.y=clamp(e.y+e.dy*e.sp*.2+rnd(-10,10),16,A-16)}if(t>=.15&&!p.up){p.up=1;shake=Math.max(shake,4);if(!SKIP)for(let k=0;k<5;k++)rockP(p.x,p.y,rnd(0,TAU),rnd(60,140));
      EN.forEach(x=>{if(x.hid||x.jump)return;const c=h.hc.get(x)||0;if(c>=3)return;if(Math.hypot(x.x-p.x,x.y-p.y)<x.r+32){h.hc.set(x,c+1);hurt(x,1.8,h.o,x.x,x.y,0,0);if(i>=6){x.stn=Math.max(x.stn||0,.5);x.cast=null}if((h.got||0)<2){h.got=(h.got||0)+1;flSoul(h.o,x)}}})}});return h.t<1.9};
HZD.flvn=h=>{h.P.forEach(p=>{const t=h.t-p.t0;if(t<0||t>1.1)return;g.save();g.globalAlpha=Math.min(1,t/.1)*(t>.9?1-(t-.9)/.2:1)*.7;g.fillStyle='#120a04';g.beginPath();g.ellipse(p.x,p.y,18,8,0,0,TAU);g.fill();g.strokeStyle='#3a2a14';g.lineWidth=2;g.stroke();g.restore()})};
HZP.flvn=h=>{h.P.forEach(p=>{const t=h.t-p.t0-.12;if(t<0||t>1)return;const up=t<.12?t/.12:t>.7?1-(t-.7)/.3:1,sw=p.sw*(Math.sin(t*12)*.8);flVineArt(p.x,p.y,70*up,sw,up,1)})};
// ---------- 3) ULT 죽어버려 ----------
function flDie(o,t){if(!t||t.dead)t=tgt(o);if(!t)return;HZ.push({k:'fldi',o,tg:t,t:0,P:Array.from({length:30},(_,i)=>({a:i*TAU/30,on:1})),rot:0,R:220,got:0})}
HZX.fldi=(h,dt,EN)=>{const o=h.o,u=h.t-FLDL;h.u=u;if(u<0)return true;const e=h.tg,live=e&&!e.dead&&!e.hid;if(!h.lk){h.lk=1;SFXa('fl_laugh');h.cx=live?e.x:A/2;h.cy=live?e.y:A/2;h.top=h.cy>A/2;o.flK=1}if(!o.dead){o.gcd=Math.max(o.gcd,.4);o.cast=null}
  if(live&&u<2.2){h.cx+=(e.x-h.cx)*Math.min(1,dt*2.2);h.cy+=(e.y-h.cy)*Math.min(1,dt*2.2)}
  h.rot+=dt*(u<1.3?.8:u<2?1.4:3.2);h.R=u<1.3?220:u<2.05?220-100*(u-1.3)/.75:120*Math.max(0,1-(u-2.05)/.35);if(u>=2.05&&!h.cl){h.cl=1;SFXa('fl_close')}
  if(u>=.5)h.P.forEach(p=>{if(!p.on)return;p.x=h.cx+Math.cos(p.a+h.rot)*h.R;p.y=h.cy+Math.sin(p.a+h.rot)*h.R;if(u<1.3)return;for(const x of EN){if(x.hid||x.jump)continue;if(Math.hypot(x.x-p.x,x.y-p.y)<x.r+6){p.on=0;hurt(x,.5,o,p.x,p.y,0,0);if(!h.got){h.got=1;flSoul(o,x,2)}break}}});
  if(u>2.45){h.P.forEach(p=>p.on=0);o.flK=0}return u<2.9};
HZD.fldi=h=>{const u=h.u;if(!(u>=0))return;const fa=u<2.5?Math.min(1,u/.3):Math.max(0,1-(u-2.5)/.4);if(typeof lkDim=='function')lkDim(.55*fa);g.save();g.globalAlpha=.18*fa;g.fillStyle='#ff0020';g.fillRect(-40,-40,A+80,A+80);g.restore()};
HZP.fldi=h=>{const u=h.u;if(!(u>=0)||!h.lk)return;const fa=u<2.5?Math.min(1,u/.3):Math.max(0,1-(u-2.5)/.4);
  if(u<1.4){const y=h.top?150:A-40,sh=rnd(-3,3);g.save();if(Math.random()<.4){utDraw('ut_flowey',A/2+sh+6,y,150,fa*.5,0,0,'lighter')}utDraw('ut_flowey',A/2+sh,y,150,fa);g.restore();
    const L=[...'히히히히히히히'];L.forEach((ch,i)=>utTxt(ch,A/2-84+i*28+rnd(-2,2),(h.top?172:A-210)+Math.sin(u*14+i)*6,24,'#ffffff',fa*Math.min(1,(u-i*.06)/.08)))}
  if(u>=.5){const sp=Math.min(1,(u-.5)/.4);h.P.forEach((p,i)=>{if(!p.on||p.x==null||i/30>sp)return;flPellet(p.x,p.y,h.rot*4+i,1,1.4)})}};
// ---------- 오메가 1) 화염 방사 ----------
function flFlame(o,t){HZ.push({k:'flfl',o,tg:t,t:0,a:ang(o,t),tk:{}});SFXa('fl_flame')}
HZX.flfl=(h,dt,EN)=>{const o=h.o;if(o.dead)return false;const e=h.tg;o.gcd=Math.max(o.gcd,.3);o.slow=Math.max(o.slow||0,.15);if(e&&!e.dead)h.a+=clamp(Math.atan2(Math.sin(ang(o,e)-h.a),Math.cos(ang(o,e)-h.a)),-dt*1.6,dt*1.6);
  if(h.t>.2&&h.t<1.5){if(!SKIP)emit(90,dt,()=>{const a=h.a+rnd(-.28,.28),v=rnd(380,520);fireP(o.x+Math.cos(h.a)*o.r,o.y+Math.sin(h.a)*o.r,Math.cos(a)*v,Math.sin(a)*v,rnd(9,16),rnd(.45,.75),PAL.magma)});
    EN.forEach(x=>{if(x.hid||x.jump)return;if((h.tk[x.i]||0)>h.t)return;const d=dist(o,x),da=Math.abs(Math.atan2(Math.sin(ang(o,x)-h.a),Math.cos(ang(o,x)-h.a)));if(d<360+x.r&&da<.34+x.r/Math.max(60,d)){h.tk[x.i]=h.t+.2;hurt(x,.85,o,x.x,x.y,0,0)}})}return h.t<1.6};
HZD.flfl=h=>{const o=h.o;if(o.dead||h.t<.2||h.t>1.5)return;g.save();g.globalCompositeOperation='lighter';g.globalAlpha=.16;g.fillStyle='#ff8a2c';g.beginPath();g.moveTo(o.x,o.y);g.arc(o.x,o.y,360,h.a-.34,h.a+.34);g.closePath();g.fill();g.restore()};
// ---------- 오메가 2) X 폭탄 ----------
function flBomb(o,t){const B=[];for(let i=0;i<5;i++){const a=i*TAU/5+rnd(-.3,.3),d=i?rnd(70,120):0;B.push({x:clamp(t.x+Math.cos(a)*d,30,A-30),y:clamp(t.y+Math.sin(a)*d,30,A-30),d:i*.07,x8:i%2==0,hit:new Set()})}HZ.push({k:'flbm',o,t:0,B});SFXa('fl_bomb')}
function flBombHit(h,b,EN,dmg){EN.forEach(x=>{if(x.hid||x.jump||b.hit.has(x))return;const dx=x.x-b.x,dy=x.y-b.y,W=12+x.r,L=170;let on;if(b.x8)on=Math.abs(dx-dy)/1.414<W&&Math.abs(dx+dy)/1.414<L||Math.abs(dx+dy)/1.414<W&&Math.abs(dx-dy)/1.414<L;else on=Math.abs(dy)<W&&Math.abs(dx)<L||Math.abs(dx)<W&&Math.abs(dy)<L;if(on){b.hit.add(x);hurt(x,dmg,h.o,x.x,x.y,0,0)}})}
HZX.flbm=(h,dt,EN)=>{h.B.forEach(b=>{const t=h.t-b.d;if(t>=.95&&!b.bm){b.bm=1;SFXa('fl_boom');shake=Math.max(shake,9)}if(b.bm&&t<1.15)flBombHit(h,b,EN,2.6)});return h.t<1.7};
function flBombArt(x,y,t,al){g.save();g.translate(x,y);g.globalAlpha=al;g.fillStyle='#1a1a1a';g.strokeStyle='#fff';g.lineWidth=2;g.beginPath();g.arc(0,0,11,0,TAU);g.fill();g.stroke();g.strokeStyle='#c8a060';g.beginPath();g.moveTo(5,-9);g.quadraticCurveTo(10,-16,14,-14);g.stroke();if(Math.floor(t*14)%2){g.globalCompositeOperation='lighter';glow('#ffcf3f',14,-14,8,.9)}g.fillStyle='rgba(255,255,255,.4)';g.beginPath();g.arc(-4,-4,3,0,TAU);g.fill();g.restore()}
function flBlast(x,y,x8,k){g.save();g.translate(x,y);if(x8)g.rotate(Math.PI/4);g.globalCompositeOperation='lighter';g.globalAlpha=1-k;const w=24*(1-k*.6);g.fillStyle='#ff5a8a';g.fillRect(-170,-w/2,340,w);g.fillRect(-w/2,-170,w,340);g.fillStyle='#fff';g.fillRect(-170,-w/5,340,w*.4);g.fillRect(-w/5,-170,w*.4,340);g.restore();g.save();g.globalCompositeOperation='lighter';glow('#ff8aaa',x,y,50,.7*(1-k));g.restore()}
HZD.flbm=h=>{h.B.forEach(b=>{const t=h.t-b.d;if(t<.25||t>=.95)return;g.save();g.translate(b.x,b.y);if(b.x8)g.rotate(Math.PI/4);g.globalAlpha=.16+.1*Math.sin(t*22);g.fillStyle='#ff4a7a';g.fillRect(-170,-5,340,10);g.fillRect(-5,-170,10,340);g.restore()})};
HZP.flbm=h=>{h.B.forEach(b=>{const t=h.t-b.d;if(t<0)return;if(t<.95){const y=t<.25?b.y-200*(1-t/.25)*(1-t/.25):b.y;flBombArt(b.x,y,t,1)}else if(t<1.3)flBlast(b.x,b.y,b.x8,(t-.95)/.35)})};
// ---------- 오메가 3) ULT 세이브 · 로드 (단계별로 하나씩 · 보기 쉽게) ----------
// ① SAVE (체력 저장) → ② 파리지옥 3개가 차례로 조준선 → 알갱이 부채꼴 → ③ X 폭탄 3개 → ④ LOAD (저장한 체력으로 되돌아감)
function flSaveLoad(o,t){if(!t||t.dead)t=tgt(o);if(!t)return;HZ.push({k:'flsv',o,tg:t,t:0,T:[],P:[],B:[]})}
HZX.flsv=(h,dt,EN)=>{const o=h.o,u=h.t-FLDL;h.u=u;if(u<0)return true;const e=h.tg,live=e&&!e.dead&&!e.hid;if(!h.lk){h.lk=1;h.save=Math.round(o.hp);SFXa('fl_save');h.a0=rnd(0,TAU)}if(!o.dead){o.gcd=Math.max(o.gcd,.4);o.cast=null;o.flK=1;h.sx=o.x;h.sy=o.y-o.r-56}
  if(u>=1&&h.T.length<3&&u>=1+h.T.length*.42){const a=h.a0+h.T.length*TAU/3,x=live?clamp(e.x+Math.cos(a)*175,40,A-40):A/2,y=live?clamp(e.y+Math.sin(a)*175,40,A-40):A/2;h.T.push({x,y,t:0,a:0,sh:0});SFXa('fl_trap')}
  h.T.forEach(q=>{q.t+=dt;if(q.t<.32&&live)q.a=Math.atan2(e.y-q.y,e.x-q.x);if(q.t>=.4&&!q.sh){q.sh=1;for(let i=-2;i<=2;i++){const a=q.a+i*.2;h.P.push({x:q.x+Math.cos(q.a)*24,y:q.y+Math.sin(q.a)*24,vx:Math.cos(a)*300,vy:Math.sin(a)*300,on:1,r:rnd(0,TAU)})}if(!SKIP)SFXa('fl_pellet')}});
  h.P.forEach(p=>{if(!p.on)return;p.x+=p.vx*dt;p.y+=p.vy*dt;p.r+=dt*10;if(p.x<-20||p.x>A+20||p.y<-20||p.y>A+20){p.on=0;return}for(const x of EN){if(x.hid||x.jump)continue;if(Math.hypot(x.x-p.x,x.y-p.y)<x.r+8){p.on=0;hurt(x,.7,o,p.x,p.y,0,0);break}}});
  if(u>=2.45&&!h.bd){h.bd=1;SFXa('fl_bomb');for(let i=0;i<3;i++){const a=h.a0+i*TAU/3,d=i?95:0;h.B.push({x:clamp((live?e.x:A/2)+Math.cos(a)*d,30,A-30),y:clamp((live?e.y:A/2)+Math.sin(a)*d,30,A-30),d:i*.1,x8:i%2==1,hit:new Set()})}}
  h.B.forEach(b=>{const t=u-2.45-b.d;if(t>=.8&&!b.bm){b.bm=1;SFXa('fl_boom');shake=Math.max(shake,10)}if(b.bm&&t<1)flBombHit(h,b,EN,2.4)});
  if(u>=3.6&&!h.ld){h.ld=1;SFXa('fl_load');shake=Math.max(shake,10);h.hv=0;if(!o.dead&&o.hp<h.save){h.hv=Math.round((h.save-o.hp)*10)/10;o.hp=h.save;o.show=Math.max(o.show,o.hp)}}
  if(u>4.2)o.flK=0;return u<4.4};
HZD.flsv=h=>{const u=h.u;if(!(u>=0))return;const fa=u<4?Math.min(1,u/.3):Math.max(0,1-(u-4)/.4);if(typeof lkDim=='function')lkDim(.55*fa)};
function flPhase(txt,u0,u1,u){if(u<u0||u>u1)return;const k=u-u0,al=Math.min(1,k/.12)*(u>u1-.15?Math.max(0,(u1-u)/.15):1);utTxt(txt,A/2,34,17,'#ffffff',al)}
function flTrap(x,y,a,op,s,al){g.save();g.translate(x,y);g.rotate(a);g.scale(s,s);g.globalAlpha=al;g.lineWidth=2;g.strokeStyle='#0a2a0a';
  g.fillStyle='#2a8a2a';g.beginPath();g.ellipse(-8,0,12,10,0,0,TAU);g.fill();g.stroke();
  [-1,1].forEach(sd=>{g.save();g.rotate(sd*op*.7);g.fillStyle='#3ec43a';g.beginPath();g.moveTo(-2,0);g.quadraticCurveTo(10,sd*16,24,sd*2);g.lineTo(-2,0);g.closePath();g.fill();g.stroke();
    g.fillStyle='#ffffff';for(let i=0;i<4;i++){const px=3+i*5.5;g.beginPath();g.moveTo(px-2,sd*1.5);g.lineTo(px,sd*-4);g.lineTo(px+2,sd*1.5);g.closePath();g.fill()}g.restore()});
  g.fillStyle='#ff5a8a';g.beginPath();g.arc(2,0,3,0,TAU);g.fill();g.restore()}
HZP.flsv=h=>{const u=h.u;if(!(u>=0)||!h.lk)return;
  flPhase('① 세이브',0,1,u);flPhase('② 파리지옥',1,2.45,u);flPhase('③ X 폭탄',2.45,3.55,u);flPhase('④ 로드',3.55,4.3,u);
  // ① SAVE
  if(u<1.2&&h.sx!=null){const k=Math.min(1,u/.2),fo=u>.95?Math.max(0,1-(u-.95)/.25):1,s=1.8*(1+.1*Math.sin(u*10));g.save();g.translate(h.sx,h.sy);g.globalAlpha=k*fo;g.globalCompositeOperation='lighter';glow('#ffff60',0,0,44,.7);g.restore();
    g.save();g.translate(h.sx,h.sy);g.scale(s,s);g.globalAlpha=k*fo;g.fillStyle='#ffff00';g.strokeStyle='#000';g.lineWidth=1.5;g.beginPath();for(let i=0;i<8;i++){const a=-Math.PI/2+i*Math.PI/4,r=i%2?5:13;g.lineTo(Math.cos(a)*r,Math.sin(a)*r)}g.closePath();g.fill();g.stroke();g.restore();
    utTxt('SAVE · HP '+h.save,h.sx,h.sy-34,15,'#ffff60',k*fo,'center',UTP8);utSay('플라위가 파일을 저장했다.',u,k*fo,A-82)}
  // ② 파리지옥 : 조준선 → 발사
  h.T.forEach(q=>{if(q.t>1.1)return;const k=Math.min(1,q.t/.15),fo=q.t>.85?Math.max(0,1-(q.t-.85)/.25):1;
    if(q.t<.4){g.save();g.globalAlpha=.7*k;g.strokeStyle='#ff3a5a';g.lineWidth=2.5;g.setLineDash([8,6]);g.lineDashOffset=-q.t*60;g.beginPath();g.moveTo(q.x,q.y);g.lineTo(q.x+Math.cos(q.a)*260,q.y+Math.sin(q.a)*260);g.stroke();g.setLineDash([]);g.restore()}
    const op=q.t<.4?.15+.35*Math.abs(Math.sin(q.t*12)):q.t<.55?.9:.2;flTrap(q.x,q.y,q.a,op,2.2,k*fo)});
  h.P.forEach(p=>{if(p.on)flPellet(p.x,p.y,p.r,1,1.6)});
  // ③ X 폭탄
  h.B.forEach(b=>{const t=u-2.45-b.d;if(t<0)return;if(t<.8){const y=t<.25?b.y-200*(1-t/.25)*(1-t/.25):b.y;g.save();g.translate(b.x,b.y);if(b.x8)g.rotate(Math.PI/4);g.globalAlpha=.25+.15*Math.sin(t*22);g.fillStyle='#ff4a7a';g.fillRect(-170,-6,340,12);g.fillRect(-6,-170,12,340);g.restore();g.save();g.translate(b.x,y);g.scale(1.5,1.5);flBombArt(0,0,t,1);g.restore()}else if(t<1.15)flBlast(b.x,b.y,b.x8,(t-.8)/.35)});
  // ④ LOAD
  if(u>=3.55&&u<4.3){const k=(u-3.55)/.75,o=h.o;g.save();g.globalAlpha=(1-k)*.35;g.fillStyle='#00ffaa';g.fillRect(-40,-40,A+80,A+80);g.globalAlpha=(1-k)*.55;for(let y=0;y<A;y+=10){g.fillStyle=(Math.floor(y/10)%2)?'#ffffff':'#00ffaa';g.fillRect(0,(y-u*700)%A+(y-u*700<0?A:0),A,2)}g.restore();
    const s=k<.15?2-k/.15:1;utTxt('LOAD',A/2,A*.36,46*s,FLG,1-Math.max(0,k-.7)/.3,'center',UTP8);if(h.hv>0)utTxt('+'+h.hv+' 체력을 되돌렸다',A/2,A*.36+48,18,'#ffffff',1-Math.max(0,k-.7)/.3);
    if(!o.dead){g.save();g.globalCompositeOperation='lighter';glow(FLG,o.x,o.y,o.r*3,.6*(1-k));g.restore()}utSay('플라위가 파일을 불러왔다.',u-3.55,1-Math.max(0,k-.8)/.2,A-82)}};
EMB.flw=(f,D)=>{g.rotate(-f.rot);if(D.flX){neon({col:FLG,hi:'#e0ffe0'},1.4,()=>{g.beginPath();g.rect(-12,-14,24,18);g.moveTo(-6,4);g.lineTo(-10,14);g.moveTo(6,4);g.lineTo(10,14)});neon({col:'#ff5a8a',hi:'#ffd0e0'},1,()=>{g.beginPath();g.moveTo(-7,-9);g.lineTo(-2,-4);g.moveTo(7,-9);g.lineTo(2,-4);g.moveTo(-6,-1);g.lineTo(6,-1)})}
  else{neon(D,1.4,()=>{g.beginPath();for(let i=0;i<5;i++){const a=-Math.PI/2+i*TAU/5;g.moveTo(Math.cos(a)*7,Math.sin(a)*7-4);g.ellipse(Math.cos(a)*12,Math.sin(a)*12-4,6,4,a,Math.PI,Math.PI*3)}});neon({col:FLG,hi:'#e0ffe0'},1.2,()=>{g.beginPath();g.arc(0,-4,5,0,TAU);g.moveTo(0,1);g.quadraticCurveTo(4,9,0,17);g.moveTo(1,11);g.quadraticCurveTo(8,8,10,12)})}
  g.save();g.globalCompositeOperation='lighter';glow(D.col,0,0,16,.3);g.restore()};
Object.assign(DMGK,{flw:2.15});

// ======================================================================
// 김지우 • 파피루스 (위대한 파피루스 · 뼈 · 퍼즐)
// 패시브 스파게티 : 체력이 35 이하가 되면 딱 한 번 직접 만든 스파게티를 먹고 체력 +18 · 스킬이 맞으면 가끔 "냬헤헤헤!"
// 1) 뼈다귀 행진 : 뼈로 만든 벽이 빈틈 하나를 두고 세 번 지나감 (두 번째 벽은 파란 뼈 = 움직이면 아픔)
// 2) 퍼즐 타일 : 상대 발밑에 5×5 색깔 타일 퍼즐 · 노랑 = 전기 · 파랑 = 물 (느려짐) · 보라 = 미끌 · 빨강 = 못 지나감 · 분홍 = 안전 · 끝나면 노란 타일 전부 감전
// 3) ULT 블루 어택 · 스페셜 어택 : "넌 이제 파란색이야!" 상대가 바닥으로 떨어짐 → 바닥을 미끄러져 오는 뼈를 점프로 넘어야 함 → 거대한 뼈로 스페셜 어택
// ======================================================================
const PPR='#ff4a2a',PPDL=1.1;
['pp_bone','pp_nyeh','pp_blue','pp_jump','pp_puzzle','pp_lock','pp_zap','pp_giant','pp_spag','pp_slide','pp_fail'].forEach(utPush);
Object.assign(SLB,{pp_bone:'파피루스 · 뼈',pp_nyeh:'파피루스 · 냬헤헤헤',pp_blue:'파피루스 · 블루 어택',pp_jump:'파피루스 · 점프',pp_puzzle:'파피루스 · 퍼즐 섞기',pp_lock:'파피루스 · 퍼즐 완성',pp_zap:'파피루스 · 전기 타일',pp_giant:'파피루스 · 스페셜 어택',pp_spag:'파피루스 · 스파게티',pp_slide:'파피루스 · 뼈 벽',pp_fail:'파피루스 · 퍼즐 실패'});
const PPSK=[
  {n:'뼈다귀 행진',w:.3,cd:8.5,c:(o,t)=>!t.hid&&dist(o,t)<600,f:(o,t)=>ppParade(o,t)},
  {n:'퍼즐 타일',w:.3,cd:10,c:(o,t)=>!t.hid&&!t.jump&&dist(o,t)<520,f:(o,t)=>ppPuzzle(o,t)},
  {n:'블루 어택 · 스페셜 어택',w:.4,ult:1,c:(o,t)=>!t.hid,f:(o,t)=>ppBlue(o,t)}];
const PPI=DEF.findIndex(d=>d.name=='김지우');
DEF.push({name:'김지우 • 파피루스',gl:'뼈',k:'pap',vof:PPI,r:26,sp:216,col:'#ff4a2a',hi:'#ffffff',dk:'#2a0a04',alt:{col:'#14a9ff',hi:'#e0f4ff',dk:'#021a2e'},alt2:{col:'#ffb21a',hi:'#fff2cc',dk:'#2a1a00'},sk:PPSK});
INFO['김지우 • 파피루스']={st:[8,9,8,9,8,10],p:'스파게티 · 체력이 35 이하가 되면 딱 한 번 직접 만든 스파게티를 먹고 체력 +18 · 스킬이 맞으면 가끔 "냬헤헤헤!"',
  sk:[['1.6×3','뼈로 만든 벽이 빈틈 하나를 두고 세 번 지나감 · 두 번째 벽은 파란 뼈 (움직이면 아픔)'],['1.4×n+2','상대 발밑에 5×5 색깔 타일 퍼즐 · 노랑 = 전기 · 파랑 = 물 (느려짐) · 보라 = 미끌 · 빨강 = 못 지나감 · 분홍 = 안전 · 끝나면 노란 타일이 전부 감전'],['1.7×n+6','"넌 이제 파란색이야!" 상대가 바닥으로 떨어지고 미끄러져 오는 뼈를 점프로 넘어야 함 → 마지막엔 거대한 뼈로 스페셜 어택']]};
// ---------- 패시브 ----------
function ppNyeh(o){if(!o||o.d.k!='pap'||o.dead||(o.ppNt>0))return;if(Math.random()<.5){o.ppNt=4;o.ppSay=1.3;if(!SKIP)SFXa('pp_nyeh')}}
const _initPP=init;init=function(){_initPP.apply(this,arguments);if(F)F.forEach(f=>{f.ppSp=0;f.ppNt=0;f.ppSay=0;f.ppPin=0;f.ppSpT=0})};
const _updPP=update;update=function(dt){_updPP(dt);if(!F)return;F.forEach(f=>{if(f.ppNt>0)f.ppNt-=dt;if(f.ppSay>0)f.ppSay-=dt;if(f.ppSpT>0)f.ppSpT-=dt;if(f.ppPin>0)f.ppPin-=dt;
    if(f.d.k=='pap'&&!f.dead&&!f.ppSp&&f.hp<=35&&phase=='play'){f.ppSp=1;f.ppSpT=1.4;f.hp=Math.min(100,f.hp+18);f.show=Math.max(f.show,f.hp);if(!SKIP){SFXa('pp_spag');ft(f.x,f.y-f.r-40,'스파게티! +18','#ffb21a',22);for(let i=0;i<14;i++)sparkP(f.x,f.y,rnd(-160,160),rnd(-220,-40),i%2?'#ffd36b':'#ff4a2a',3)}}})};
const _lowPP=lowHP;lowHP=function(f){_lowPP(f);if(f.dead||f.hid)return;
  if(f.ppSay>0){const al=Math.min(1,f.ppSay/.2);utTxt('냬헤헤헤!',f.x,f.y-f.r-30-(1.3-f.ppSay)*10,16,'#ffffff',al)}
  if(f.ppSpT>0){const k=1-f.ppSpT/1.4,al=k<.1?k/.1:f.ppSpT<.3?f.ppSpT/.3:1,x=f.x,y=f.y-f.r-26;g.save();g.globalAlpha=al;g.fillStyle='#ffffff';g.strokeStyle='#000';g.lineWidth=2;g.beginPath();g.ellipse(x,y+6,22,7,0,0,TAU);g.fill();g.stroke();
    g.fillStyle='#ffcf5a';g.beginPath();g.ellipse(x,y+1,15,7,0,Math.PI,TAU);g.fill();g.strokeStyle='#e8a83a';g.lineWidth=1.5;for(let i=-2;i<=2;i++){g.beginPath();g.moveTo(x+i*5-4,y+3);g.quadraticCurveTo(x+i*5,y-6,x+i*5+4,y+3);g.stroke()}
    g.fillStyle='#e8302a';[[-5,-3],[4,-4],[0,0]].forEach(p=>{g.beginPath();g.arc(x+p[0],y+p[1],2.4,0,TAU);g.fill()});g.restore()}};
UTSP.pap=f=>{utBehind(f,'ut_papyrus',f.r*3.7,.85,.6,.45)};
function ppBoneV(x,y0,y1,col,al){const L=Math.abs(y1-y0);if(L<4)return;snBone(x,(y0+y1)/2,L,14,Math.PI/2,al,col)}
// ---------- 1) 뼈다귀 행진 ----------
function ppParade(o,t){const W=[];for(let i=0;i<3;i++){const dir=i%2?-1:1;W.push({dir,x:dir>0?-30:A+30,t0:.25+i*.6,cy:t.y,gp:rnd(-70,70),col:i==1?'b':'w',hit:new Set()})}HZ.push({k:'ppbn',o,tg:t,t:0,W});SFXa('pp_slide')}
HZX.ppbn=(h,dt,EN)=>{const e=h.tg;let live=0;h.W.forEach(w=>{if(h.t<w.t0){if(e&&!e.dead)w.cy=e.y;live=1;return}if(!w.go){w.go=1;if(!SKIP)SFXa('pp_bone')}w.x+=w.dir*380*dt;if(w.x<-40||w.x>A+40)return;live=1;
    EN.forEach(x=>{if(x.hid||x.jump||w.hit.has(x))return;if(Math.abs(x.x-w.x)<x.r+7&&Math.abs(x.y-w.cy)<160){const gy=w.cy+w.gp;if(Math.abs(x.y-gy)<38-x.r*.4){return}w.hit.add(x);if(utCol(x,w.col=='b'?'b':'r',.25)){hurt(x,2.2,h.o,x.x,x.y,0,0);ppNyeh(h.o)}}})});return live};
HZP.ppbn=h=>{h.W.forEach(w=>{if(!w.go||w.x<-40||w.x>A+40)return;const col=w.col=='b'?UTB:'#ffffff',gy=w.cy+w.gp,top=w.cy-160,bot=w.cy+160;
  for(let y=top;y<gy-40;y+=38)ppBoneV(w.x,y,Math.min(y+34,gy-40),col,1);for(let y=gy+40;y<bot;y+=38)ppBoneV(w.x,y,Math.min(y+34,bot),col,1);
  g.save();g.globalAlpha=.25;g.fillStyle=col;g.fillRect(w.x-w.dir*40,top,w.dir*40*.9,320);g.restore()})};
// ---------- 2) 퍼즐 타일 ----------
const PPT={y:['#ffe23a','전기'],b:['#2a7cff','물'],p:['#b44aff','미끌'],r:['#ff3a3a','벽'],k:['#ff9ad8','안전'],o:['#ff9a2a','오렌지']};
function ppRoll(){const r=Math.random();return r<.36?'y':r<.52?'k':r<.66?'b':r<.8?'p':r<.9?'r':'o'}
function ppPuzzle(o,t){const S=44,cx=clamp(t.x,S*2.5+4,A-S*2.5-4),cy=clamp(t.y,S*2.5+4,A-S*2.5-4),T=[];for(let i=0;i<25;i++)T.push(ppRoll());HZ.push({k:'pptl',o,tg:t,t:0,S,cx,cy,T,st:0,zp:{},msg:{}});SFXa('pp_puzzle')}
function ppCell(h,x,y){const i=Math.floor((x-(h.cx-h.S*2.5))/h.S),j=Math.floor((y-(h.cy-h.S*2.5))/h.S);if(i<0||j<0||i>4||j>4)return null;return j*5+i}
HZX.pptl=(h,dt,EN)=>{if(h.t<.9){h.st+=dt;if(h.st>.1){h.st=0;h.T=h.T.map(()=>ppRoll());if(!SKIP)SFXa('pp_puzzle')}return true}if(!h.lk){h.lk=1;SFXa('pp_lock')}
  if(h.t<3.3)EN.forEach(x=>{if(x.hid||x.jump)return;if(x==h.tg&&!h.esc){const m=x.r+2,x0=h.cx-h.S*2.5+m,x1=h.cx+h.S*2.5-m,y0=h.cy-h.S*2.5+m,y1=h.cy+h.S*2.5-m;if(x.x<x0){x.x=x0;x.dx=Math.abs(x.dx)}if(x.x>x1){x.x=x1;x.dx=-Math.abs(x.dx)}if(x.y<y0){x.y=y0;x.dy=Math.abs(x.dy)}if(x.y>y1){x.y=y1;x.dy=-Math.abs(x.dy)}}const c=ppCell(h,x.x,x.y);if(c==null)return;const ty=h.T[c];
    if(ty=='y'&&(h.zp[x.i]||0)<=h.t){h.zp[x.i]=h.t+.38;hurt(x,1.4,h.o,x.x,x.y,0,0);if(!SKIP)SFXa('pp_zap');for(let k=0;k<5;k++)sparkP(x.x,x.y,rnd(-150,150),rnd(-150,150),'#ffe23a',2);ppNyeh(h.o)}
    else if(ty=='b')x.slow=Math.max(x.slow||0,.3);else if(ty=='p'&&Math.random()<dt*3)safePush(x,rnd(0,TAU),40);
    else if(ty=='r'){const i=c%5,j=Math.floor(c/5),tx=h.cx-h.S*2.5+(i+.5)*h.S,tyy=h.cy-h.S*2.5+(j+.5)*h.S;safePush(x,Math.atan2(x.y-tyy,x.x-tx),dt*600)}
    else if(ty=='o'&&!h.msg[x.i]){h.msg[x.i]=1;if(!SKIP)ft(x.x,x.y-x.r-26,'오렌지 향…','#ff9a2a',14)}});
  if(h.t>=3.3&&!h.end){h.end=1;SFXa('pp_fail');shake=Math.max(shake,8);EN.forEach(x=>{if(x.hid||x.jump)return;const c=ppCell(h,x.x,x.y);if(c!=null&&h.T[c]=='y')hurt(x,2,h.o,x.x,x.y,0,1)})}return h.t<3.7};
HZD.pptl=h=>{const t=h.t,op=t<.15?t/.15:t>3.3?Math.max(0,1-(t-3.3)/.4):1,S=h.S,x0=h.cx-S*2.5,y0=h.cy-S*2.5;g.save();g.globalAlpha=op*.85;
  h.T.forEach((ty,c)=>{const i=c%5,j=Math.floor(c/5),x=x0+i*S,y=y0+j*S;g.fillStyle=PPT[ty][0];g.fillRect(x+1,y+1,S-2,S-2);if(ty=='y'&&t>.9&&Math.random()<.15){g.fillStyle='#fff';g.fillRect(x+rnd(4,S-8),y+rnd(4,S-8),4,4)}if(ty=='b'){g.fillStyle='rgba(255,255,255,.35)';g.fillRect(x+6,y+S*.4+Math.sin(t*6+c)*3,S-12,2)}});
  g.strokeStyle='#000';g.lineWidth=2;for(let i=0;i<=5;i++){g.beginPath();g.moveTo(x0+i*S,y0);g.lineTo(x0+i*S,y0+S*5);g.stroke();g.beginPath();g.moveTo(x0,y0+i*S);g.lineTo(x0+S*5,y0+i*S);g.stroke()}g.strokeStyle='#fff';g.lineWidth=3;g.strokeRect(x0-2,y0-2,S*5+4,S*5+4);
  if(t>=3.3&&t<3.6){g.globalCompositeOperation='lighter';g.globalAlpha=1-(t-3.3)/.3;h.T.forEach((ty,c)=>{if(ty!='y')return;const i=c%5,j=Math.floor(c/5);g.fillStyle='#fff6a0';g.fillRect(x0+i*S,y0+j*S,S,S)})}g.restore()};
HZP.pptl=h=>{const t=h.t;if(t<1.4){const o=h.o;utTxt(t<.9?'파피루스의 퍼즐!':'다 풀기 전엔 못 나가!',h.cx,h.cy-h.S*2.5-18,17,'#ffffff',Math.min(1,t/.1)*(t>1.2?1-(t-1.2)/.2:1))}if(t>=3.3&&t<3.7)utTxt('퍼즐 실패!',h.cx,h.cy,22,'#ffe23a',1-(t-3.3)/.4)};
// ---------- 3) ULT 블루 어택 · 스페셜 어택 ----------
function ppBlue(o,t){if(!t||t.dead)t=tgt(o);if(!t)return;HZ.push({k:'ppbl',o,tg:t,t:0,B:[],jt:-9,hit:new Set()})}
HZX.ppbl=(h,dt,EN)=>{const o=h.o,u=h.t-PPDL;h.u=u;if(u<0)return true;const e=h.tg,live=e&&!e.dead&&!e.hid;if(!h.lk){h.lk=1;SFXa('pp_blue');h.fy=A-(e?e.r:26)-4;h.dir=e&&e.x>A/2?-1:1}if(!o.dead){o.gcd=Math.max(o.gcd,.4);o.cast=null}
  if(live&&u<3.4){e.cast=null;e.ppPin=.1;const jt=u-h.jt,jh=jt>=0&&jt<.6?Math.sin(Math.PI*jt/.6)*105:0;e.jy=jh;const fy=h.fy-jh;e.y+=(fy-e.y)*Math.min(1,dt*(u<.4?6:30));e.x=clamp(e.x+(A/2-e.x)*dt*.3,e.r,A-e.r);e.stn=0}
  // 바닥 뼈
  if(u>=.5&&u<2.5&&h.B.length<7&&u>=.5+h.B.length*.28){const hgt=[44,70,52,96,60,84,48][h.B.length];h.B.push({x:h.dir>0?-20:A+20,h:hgt,on:1});if(!SKIP)SFXa('pp_bone')}
  h.B.forEach(b=>{if(!b.on)return;b.x+=h.dir*440*dt;if(b.x<-40||b.x>A+40){b.on=0;return}if(!live)return;const dx=(e.x-b.x)*h.dir;
    if(dx>40&&dx<95&&u-h.jt>.62){h.jt=u+(Math.random()<.22?rnd(.08,.16):0);if(!SKIP)SFXa('pp_jump')}
    if(Math.abs(e.x-b.x)<e.r+7&&!h.hit.has(b)){const clear=(h.fy+e.r)-b.h,bottom=e.y+e.r;if(bottom>clear){h.hit.add(b);hurt(e,2.2,o,e.x,e.y,0,0);ppNyeh(o)}}});
  // 스페셜 어택
  if(u>=2.75&&!h.sp){h.sp=1;SFXa('pp_giant');h.gx=h.dir>0?-60:A+60}
  if(h.sp&&!h.gh){h.gx+=h.dir*1300*dt;if(live&&Math.abs(e.x-h.gx)<e.r+20){h.gh=1;hurt(e,7,o,e.x,e.y,0,1);safePush(e,h.dir>0?0:Math.PI,140);shake=Math.max(shake,22);hs=.12;if(typeof lkImp=='function')lkImp(e.x,e.y,120,'#ffffff')}if(h.gx<-80||h.gx>A+80)h.gh=2}
  if(h.gh&&h.gx!=null&&h.gh!=2){h.gx+=h.dir*900*dt}
  return u<3.9};
HZD.ppbl=h=>{const u=h.u;if(!(u>=0)||!h.lk)return;const fa=u<3.5?Math.min(1,u/.3):Math.max(0,1-(u-3.5)/.4);if(typeof lkDim=='function')lkDim(.5*fa);g.save();g.globalAlpha=fa;g.strokeStyle='#ffffff';g.lineWidth=3;g.beginPath();g.moveTo(0,A-2);g.lineTo(A,A-2);g.stroke();g.restore()};
HZP.ppbl=h=>{const u=h.u;if(!(u>=0)||!h.lk)return;const e=h.tg,fa=u<3.5?Math.min(1,u/.3):Math.max(0,1-(u-3.5)/.4);
  utDraw('ut_papyrus',h.dir>0?A-90:90,A*.62,230,fa*.9,h.dir<0);
  if(e&&!e.dead&&u<3.4&&typeof utHeart=='function'){utHeart(e.x,e.y-e.r-16,2,UTB)}
  h.B.forEach(b=>{if(!b.on)return;ppBoneV(b.x,A-4-b.h,A-4,'#ffffff',1)});
  if(h.sp&&h.gx!=null&&h.gh!=2){const H=320;snBone(h.gx,A-4-H/2,H,40,Math.PI/2,1,'#ffffff');g.save();g.globalAlpha=.3;g.fillStyle='#fff';g.fillRect(h.gx-h.dir*120,A-4-H,h.dir*110,H);g.restore()}
  if(u<.9)utSay('넌 이제 파란색이야!! 냬헤헤!',u,Math.min(1,u/.1)*(u>.75?1-(u-.75)/.15:1),24);
  if(u>=2.6&&u<3.4)utTxt('스페셜 어택!!',A/2+rnd(-2,2),A*.22,32,'#ffffff',Math.min(1,(u-2.6)/.1)*(u>3.2?1-(u-3.2)/.2:1),'center',UTFN)};
EMB.pap=(f,D)=>{g.rotate(-f.rot);const bone=()=>{[-1,1].forEach(s=>{const c=Math.cos(s*.7),sn=Math.sin(s*.7),L=14;g.moveTo(-L*c,-L*sn);g.lineTo(L*c,L*sn);[-1,1].forEach(q=>{const ex=q*L*c,ey=q*L*sn,nx=-sn*3.2,ny=c*3.2;g.moveTo(ex+nx+2.6,ey+ny);g.arc(ex+nx,ey+ny,2.6,0,TAU);g.moveTo(ex-nx+2.6,ey-ny);g.arc(ex-nx,ey-ny,2.6,0,TAU)})})};
  neon({col:'#ffffff',hi:'#ffffff'},1.4,()=>{g.beginPath();bone()});neon(D,1.2,()=>{g.beginPath();g.moveTo(-14,14);g.quadraticCurveTo(0,21,14,14);g.moveTo(9,16);g.lineTo(14,24)});g.save();g.globalCompositeOperation='lighter';glow(D.col,0,0,16,.3);g.restore()};
Object.assign(DMGK,{pap:1.62});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ▶ 섹션 : extra28
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ===== extra28.js : 김건우 • 가스터 · 궁극기 봉인 시스템 · 사전 변신 미리보기 =====

// ======================================================================
// 김건우 • 가스터 (공허 속의 과학자 · 구멍 난 손)
// 패시브 산산조각 : 3 이상 맞으면 30% 확률로 몸이 픽셀로 부서졌다가 다른 곳에서 다시 맞춰짐 (그 공격 피해 절반 · 3.5초에 한 번)
// 1) 구멍 난 손 : 상대 양옆에 손이 나타나 손바닥 구멍에 빛을 모아 레이저 · 위치를 바꿔 세 번
// 2) 공허의 별 : 손 다섯 개가 상대를 둘러싸고 구멍끼리 레이저를 이어 별 모양 그물 → 빙글빙글 돌며 조여옴
// 3) ULT ENTRY 17 : 화면이 공허로 · 알 수 없는 기호 · 거대한 가스터 → 손 열 개가 둘러싸고 한꺼번에 레이저 → 공허가 무너짐
// ======================================================================
const GSV='#9a6bff',GSC='#7af0ff',GSDL=1.1,GSSYM=[...'☜☞☟☚⚐⚑◆◇❖⍟☼⌘◻⧫'].map(c=>c+'\uFE0E');
utLoad('ut_gaster');UTN.push('ut_gaster');
['gs_hand','gs_charge','gs_laser','gs_web','gs_shatter','gs_reform','gs_void','gs_text','gs_ult','gs_glitch','gs_drone'].forEach(utPush);
Object.assign(SLB,{gs_hand:'가스터 · 손 나타남',gs_charge:'가스터 · 구멍에 빛 모으기',gs_laser:'가스터 · 레이저',gs_web:'가스터 · 공허의 별',gs_shatter:'가스터 · 산산조각',gs_reform:'가스터 · 다시 맞춰짐',gs_void:'가스터 · 공허',gs_text:'가스터 · 알 수 없는 말',gs_ult:'가스터 · 일제 사격',gs_glitch:'가스터 · 지지직',gs_drone:'가스터 · 공허의 울림'});
const GSSK=[
  {n:'구멍 난 손',w:.3,cd:8,c:(o,t)=>!t.hid&&dist(o,t)<600,f:(o,t)=>gsHands(o,t)},
  {n:'공허의 별',w:.3,cd:10,c:(o,t)=>!t.hid&&dist(o,t)<560,f:(o,t)=>gsWeb(o,t)},
  {n:'ENTRY 17',w:.4,ult:1,c:(o,t)=>!t.hid,f:(o,t)=>gsUlt(o,t)}];
const GSI=DEF.findIndex(d=>d.name=='김건우');
DEF.push({name:'김건우 • 가스터',gl:'空',k:'gst',vof:GSI,r:26,sp:208,col:'#b8bcd0',hi:'#ffffff',dk:'#06060a',alt:{col:'#9a6bff',hi:'#ece4ff',dk:'#0a0420'},alt2:{col:'#ff3a6a',hi:'#ffe0e8',dk:'#200008'},sk:GSSK});
INFO['김건우 • 가스터']={st:[8,8,8,9,8,10],p:'산산조각 · 3 이상 맞으면 30% 확률로 몸이 픽셀로 부서졌다가 다른 곳에서 다시 맞춰짐 (그 공격은 피해 절반 · 3.5초에 한 번)',
  sk:[['2.2×6','상대 양옆에 구멍 난 손이 나타나 손바닥 구멍에 빛을 모았다가 레이저 · 위치를 바꿔가며 세 번'],['1.1×n','손 다섯 개가 상대를 둘러싸고 구멍끼리 레이저를 이어 별 모양 그물을 만듦 · 빙글빙글 돌며 조여옴'],['9+공허','화면이 공허로 바뀌고 알 수 없는 기호 · 거대한 가스터 → 손 열 개가 둘러싸고 한꺼번에 레이저 → 공허가 무너지며 끌어당김']]};
// ---------- 손 · 레이저 ----------
function gsHand(x,y,a,s,al,ch){if(!(al>0))return;g.save();g.translate(x,y);g.rotate(Math.sin(a)*.25+(Math.cos(a)<0?.15:-.15));g.scale(s,s);g.globalAlpha=Math.min(1,al);g.lineJoin='round';g.strokeStyle='#000';g.lineWidth=2.4;g.fillStyle='#f4f4f8';
  const R=(x0,y0,w,h,r)=>{g.beginPath();g.moveTo(x0+r,y0);g.lineTo(x0+w-r,y0);g.quadraticCurveTo(x0+w,y0,x0+w,y0+r);g.lineTo(x0+w,y0+h-r);g.quadraticCurveTo(x0+w,y0+h,x0+w-r,y0+h);g.lineTo(x0+r,y0+h);g.quadraticCurveTo(x0,y0+h,x0,y0+h-r);g.lineTo(x0,y0+r);g.quadraticCurveTo(x0,y0,x0+r,y0);g.closePath();g.fill();g.stroke()};
  [[-11,-21,15],[-5,-25,19],[1,-24,18],[7,-19,13]].forEach(([fx,fy,fh])=>R(fx,fy,5.4,fh,2.5));
  g.save();g.translate(-12,4);g.rotate(-.7);R(-3,-12,6,14,3);g.restore();R(-12,-8,24,22,6);
  g.fillStyle='#000';g.beginPath();g.arc(0,3,4.6,0,TAU);g.fill();
  if(ch>0){g.globalCompositeOperation='lighter';glow(GSV,0,3,6+16*ch,.8*ch);glow('#ffffff',0,3,3+5*ch,.9*ch)}g.restore()}
function gsBeam(x,y,a,L,w,al){if(!(al>0)||w<=0)return;g.save();g.translate(x,y);g.rotate(a);g.globalCompositeOperation='lighter';g.globalAlpha=Math.min(1,al);const fl=1+.12*Math.sin(clock*70);
  g.fillStyle=GSV;g.globalAlpha=al*.45;g.fillRect(0,-w*fl,L,w*2*fl);g.fillStyle=GSC;g.globalAlpha=al*.6;g.fillRect(0,-w*.55,L,w*1.1);g.fillStyle='#ffffff';g.globalAlpha=al;g.fillRect(0,-w*.22,L,w*.44);glow(GSV,0,0,w*3,.7*al);g.restore()}
function gsSeg(px,py,ax,ay,bx,by){const dx=bx-ax,dy=by-ay,L2=dx*dx+dy*dy||1,u=clamp(((px-ax)*dx+(py-ay)*dy)/L2,0,1);return Math.hypot(px-ax-dx*u,py-ay-dy*u)}
// ---------- 패시브 : 산산조각 ----------
const _hurtGS=hurt;hurt=function(t,n,o){if(t&&t.d&&t.d.k=='gst'&&o&&o!=t&&n>=3&&!t.dead&&!(t.gsCd>0)&&phase=='play'&&Math.random()<.3){t.gsCd=3.5;const a=[...arguments];a[1]=Math.round(n*.5*10)/10;const r=_hurtGS.apply(this,a);if(!t.dead)gsShatter(t);return r}return _hurtGS.apply(this,arguments)};
function gsShatter(f){const x0=f.x,y0=f.y;let nx=x0,ny=y0;for(let k=0;k<12;k++){const a=rnd(0,TAU),d=rnd(120,210);nx=clamp(x0+Math.cos(a)*d,f.r+10,A-f.r-10);ny=clamp(y0+Math.sin(a)*d,f.r+10,A-f.r-10);if(Math.hypot(nx-x0,ny-y0)>100)break}
  f.x=nx;f.y=ny;f.gsGl=.5;if(SKIP)return;SFXa('gs_shatter');for(let i=0;i<22;i++){const a=rnd(0,TAU),v=rnd(80,260);Pt.push({x:x0+rnd(-14,14),y:y0+rnd(-14,14),vx:Math.cos(a)*v,vy:Math.sin(a)*v,l:.5,m:.5,sh:10,cube:1,r:rnd(2,4),rot:0,vr:0,col:i%3?'#ffffff':'#000000',fr:2})}
  for(let i=0;i<16;i++){const a=rnd(0,TAU),d=rnd(40,80);Pt.push({x:nx+Math.cos(a)*d,y:ny+Math.sin(a)*d,vx:-Math.cos(a)*d*2.4,vy:-Math.sin(a)*d*2.4,l:.42,m:.42,sh:10,cube:1,r:rnd(2,3.5),rot:0,vr:0,col:i%2?'#ffffff':GSV,fr:1})}
  ft(nx,ny-f.r-30,GSSYM[Math.floor(rnd(0,GSSYM.length))]+GSSYM[Math.floor(rnd(0,GSSYM.length))],'#ffffff',20);setTimeout(()=>{try{SFXa('gs_reform')}catch(e){}},160)}
const _updGS=update;update=function(dt){_updGS(dt);if(!F)return;F.forEach(f=>{if(f.gsCd>0)f.gsCd-=dt;if(f.gsGl>0)f.gsGl-=dt})};
const _initGS=init;init=function(){_initGS.apply(this,arguments);if(F)F.forEach(f=>{f.gsCd=0;f.gsGl=0})};
// 공 뒤 : 가스터 (가끔 가로로 찢어지는 글리치)
UTSP.gst=f=>{const o=UTI.ut_gaster,s=utSrc('ut_gaster');if(!o||!s)return;const H=f.r*3.5,W=H*o.w/o.h,d=f.utDir||(f.dx<0?-1:1),x=f.x-d*f.r*.55,y=f.y+f.r*.45+Math.sin(clock*2.2+f.i)*3,gl=f.gsGl>0||Math.sin(clock*1.3+f.i*2)>.985;
  g.save();g.imageSmoothingEnabled=false;g.globalAlpha=.86*(gl?.75+.25*Math.random():1);const N=gl?6:1;for(let i=0;i<N;i++){const sy=o.h*i/N,sh=o.h/N,ox=gl?rnd(-8,8):0;g.drawImage(s,0,sy,o.w,sh,Math.round(x-W/2+ox),Math.round(y-H+H*i/N),W,H/N+1)}
  if(gl){g.globalCompositeOperation='lighter';g.globalAlpha=.25;g.drawImage(s,Math.round(x-W/2+4),Math.round(y-H),W,H)}g.restore()};
// ---------- 1) 구멍 난 손 ----------
function gsHands(o,t){HZ.push({k:'gshd',o,tg:t,t:0,b0:rnd(0,TAU),V:[0,1,2].map(i=>({t0:i*.55,H:[{},{}],hit:new Set()}))});SFXa('gs_hand')}
HZX.gshd=(h,dt,EN)=>{const e=h.tg,live=e&&!e.dead&&!e.hid;h.V.forEach((v,vi)=>{const t=h.t-v.t0;if(t<0)return;if(!v.snd){v.snd=1;if(vi)SFXa('gs_hand');SFXa('gs_charge')}
    v.H.forEach((q,qi)=>{const ang0=h.b0+vi*1.05+(qi?Math.PI:0);if(t<.45&&live){q.x=clamp(e.x+Math.cos(ang0)*175,24,A-24);q.y=clamp(e.y+Math.sin(ang0)*175,24,A-24);q.a=Math.atan2(e.y+e.dy*e.sp*.12-q.y,e.x+e.dx*e.sp*.12-q.x)}
      if(t>=.45&&t<.72&&q.a!=null)EN.forEach(x=>{if(x.hid||x.jump||v.hit.has(qi+':'+x.i))return;const dx=x.x-q.x,dy=x.y-q.y,al=dx*Math.cos(q.a)+dy*Math.sin(q.a),pe=Math.abs(-dx*Math.sin(q.a)+dy*Math.cos(q.a));if(al>0&&pe<x.r+9){v.hit.add(qi+':'+x.i);hurt(x,2.2,h.o,x.x,x.y,0,0);for(let k=0;k<5;k++)sparkP(x.x,x.y,rnd(-150,150),rnd(-150,150),k%2?GSV:'#ffffff',2)}})});
    if(t>=.45&&!v.fr){v.fr=1;SFXa('gs_laser');shake=Math.max(shake,6)}});return h.t<2.1};
HZP.gshd=h=>{h.V.forEach(v=>{const t=h.t-v.t0;if(t<0||t>.95)return;const ap=Math.min(1,t/.18),fo=t>.75?Math.max(0,1-(t-.75)/.2):1;v.H.forEach(q=>{if(q.x==null)return;const hx=q.x,hy=q.y;
    if(t<.45){g.save();g.globalAlpha=.4*ap;g.strokeStyle=GSV;g.lineWidth=1.5;g.setLineDash([3,7]);g.beginPath();g.moveTo(hx,hy);g.lineTo(hx+Math.cos(q.a)*600,hy+Math.sin(q.a)*600);g.stroke();g.setLineDash([]);g.restore()}
    else if(t<.8){const k=(t-.45)/.35;gsBeam(hx,hy,q.a,700,9*(1-k*.75),1-k*.5)}
    gsHand(hx,hy,q.a,1.25*(t<.18?.4+.6*ap:1),ap*fo,t<.45?t/.45:t<.6?1:0)})})};
// ---------- 2) 공허의 별 ----------
function gsWeb(o,t){HZ.push({k:'gswb',o,tg:t,t:0,cx:t.x,cy:t.y,rot:rnd(0,TAU),R:200,cd:{}});SFXa('gs_hand')}
function gsWebP(h){const P=[];for(let i=0;i<5;i++){const a=h.rot+i*TAU/5;P.push([h.cx+Math.cos(a)*h.R,h.cy+Math.sin(a)*h.R,a])}return P}
HZX.gswb=(h,dt,EN)=>{const e=h.tg;if(h.t<.55&&e&&!e.dead&&!e.hid){h.cx+=(e.x-h.cx)*Math.min(1,dt*3);h.cy+=(e.y-h.cy)*Math.min(1,dt*3)}h.rot+=dt*(h.t<.55?.5:1.15);
  if(h.t>=.55){const k=Math.min(1,(h.t-.55)/1.75);h.R=200-105*k*k}if(h.t>=.55&&!h.on){h.on=1;SFXa('gs_web')}
  if(h.t>=.55&&h.t<2.35){const P=gsWebP(h);EN.forEach(x=>{if(x.hid||x.jump||(h.cd[x.i]||0)>h.t)return;for(let i=0;i<5;i++){const a=P[i],b=P[(i+2)%5];if(gsSeg(x.x,x.y,a[0],a[1],b[0],b[1])<x.r+6){h.cd[x.i]=h.t+.3;hurt(x,1.1,h.o,x.x,x.y,0,0);break}}})}return h.t<2.7};
HZD.gswb=h=>{if(h.t>=.55)return;const P=gsWebP(h);g.save();g.globalAlpha=.45*Math.min(1,h.t/.2);g.strokeStyle=GSV;g.lineWidth=1.5;g.setLineDash([4,6]);g.beginPath();for(let i=0;i<5;i++){const a=P[i],b=P[(i+2)%5];g.moveTo(a[0],a[1]);g.lineTo(b[0],b[1])}g.stroke();g.setLineDash([]);g.restore()};
HZP.gswb=h=>{const P=gsWebP(h),fo=h.t>2.35?Math.max(0,1-(h.t-2.35)/.3):1;
  if(h.t>=.55&&h.t<2.35)for(let i=0;i<5;i++){const a=P[i],b=P[(i+2)%5];gsBeam(a[0],a[1],Math.atan2(b[1]-a[1],b[0]-a[0]),Math.hypot(b[0]-a[0],b[1]-a[1]),4.5,.95)}
  P.forEach(p=>gsHand(p[0],p[1],p[2]+Math.PI,1.1,Math.min(1,h.t/.2)*fo,h.t<.55?h.t/.55:1))};
// ---------- 3) ULT ENTRY 17 ----------
function gsUlt(o,t){if(!t||t.dead)t=tgt(o);if(!t)return;HZ.push({k:'gsul',o,tg:t,t:0,H:[],ns:0,cd:{}})}
HZX.gsul=(h,dt,EN)=>{const o=h.o,u=h.t-GSDL;h.u=u;if(u<0)return true;const e=h.tg,live=e&&!e.dead&&!e.hid;if(!h.lk){h.lk=1;SFXa('gs_void');SFXa('gs_text');h.ex=live?clamp(e.x,80,A-80):A/2;h.ey=live?clamp(e.y,90,A-90):A/2}if(!o.dead){o.gcd=Math.max(o.gcd,.4);o.cast=null}
  if(live&&u<3.5){e.x+=(h.ex-e.x)*Math.min(1,dt*4);e.y+=(h.ey-e.y)*Math.min(1,dt*4);e.stn=Math.max(e.stn||0,.12);e.cast=null}
  if(u>=1&&h.ns<10&&u>=1+h.ns*.1){const a=-Math.PI/2+h.ns*TAU/10;h.H.push({x:h.ex+Math.cos(a)*240,y:h.ey+Math.sin(a)*240,a:a+Math.PI,t:0});h.ns++;if(!SKIP&&h.ns%2)SFXa('gs_hand')}
  h.H.forEach(q=>q.t+=dt);if(u>=1.95&&!h.ch){h.ch=1;SFXa('gs_charge')}
  if(u>=2.35&&!h.fr){h.fr=1;SFXa('gs_ult');shake=Math.max(shake,26);hs=.14;if(live)hurt(e,9,o,e.x,e.y,0,1);EN.forEach(x=>{if(x==e||x.hid)return;if(h.H.some(q=>gsSeg(x.x,x.y,q.x,q.y,h.ex,h.ey)<x.r+10))hurt(x,4,o,x.x,x.y,0,1)});if(typeof lkImp=='function')lkImp(h.ex,h.ey,150,GSV)}
  if(u>=2.8&&!h.vd){h.vd=1;SFXa('gs_glitch')}
  if(u>=2.8&&u<3.5&&live&&(h.cd.v||0)<=u){h.cd.v=u+.17;hurt(e,.6,o,e.x,e.y,0,0)}
  if(u>=3.5&&!h.end){h.end=1;if(live){safePush(e,o.dead?rnd(0,TAU):ang(o,e),90)}}return u<3.95};
HZD.gsul=h=>{const u=h.u;if(!(u>=0))return;const fa=u<3.6?Math.min(1,u/.45):Math.max(0,1-(u-3.6)/.35);if(typeof lkDim=='function')lkDim(.9*fa)};
HZP.gsul=h=>{const u=h.u;if(!(u>=0)||!h.lk)return;
  // 알 수 없는 기호
  if(u<2.3){const L=GSSYM,n=Math.min(L.length,Math.floor(u/.08));let s='';for(let i=0;i<n;i++)s+=L[i];utTxt(s,A/2+(Math.random()<.1?rnd(-4,4):0),40,26,'#ffffff',Math.min(1,u/.1)*(u>2.05?1-(u-2.05)/.25:1),'center','sans-serif')}
  if(u<1.6)utSay('공허가… 너를 보고 있다.',u,Math.min(1,u/.1)*(u>1.4?1-(u-1.4)/.2:1),A-82);
  // 거대한 가스터 (녹아내리는 글리치)
  const o=UTI.ut_gaster,s=utSrc('ut_gaster');if(o&&s&&u>=.3&&u<2.7){const k=Math.min(1,(u-.3)/.4),fo=u>2.3?Math.max(0,1-(u-2.3)/.4):1,H=300,W=H*o.w/o.h,x=A/2,y=A*.5+H/2-30,N=14,melt=Math.max(0,u-1.4);g.save();g.imageSmoothingEnabled=false;g.globalAlpha=.55*k*fo;
    for(let i=0;i<N;i++){const sy=o.h*i/N,sh=o.h/N,ox=(Math.random()<.2?rnd(-14,14):0),dy=melt*melt*40*(i/N)*(1+Math.sin(i*3.1));g.drawImage(s,0,sy,o.w,sh,Math.round(x-W/2+ox),Math.round(y-H+H*i/N+dy),W,H/N+1)}g.restore()}
  // 손 열 개 · 일제 사격
  h.H.forEach(q=>{const ap=Math.min(1,q.t/.15),fo=u>2.75?Math.max(0,1-(u-2.75)/.3):1,ch=u<2.35?Math.min(1,q.t/.9):u<2.5?1:0;
    if(u>=1.95&&u<2.35){g.save();g.globalAlpha=.5;g.strokeStyle=GSV;g.lineWidth=1.2;g.setLineDash([3,5]);g.beginPath();g.moveTo(q.x,q.y);g.lineTo(h.ex,h.ey);g.stroke();g.setLineDash([]);g.restore()}
    if(u>=2.35&&u<2.8){const k=(u-2.35)/.45;gsBeam(q.x,q.y,q.a,240,9*(1-k*.7),1-k*.4)}
    gsHand(q.x,q.y,q.a,1.15,ap*fo,ch)});
  if(u>=2.35&&u<2.5){g.save();g.globalCompositeOperation='difference';g.globalAlpha=1-(u-2.35)/.15;g.fillStyle='#ffffff';g.fillRect(-40,-40,A+80,A+80);g.restore()}
  // 공허가 무너짐
  if(u>=2.8&&u<3.6){const k=(u-2.8)/.8,R=k<.5?90*k/.5:90*(1-(k-.5)/.5);g.save();g.fillStyle='#000';g.beginPath();g.arc(h.ex,h.ey,R,0,TAU);g.fill();g.strokeStyle='#ffffff';g.lineWidth=2;g.stroke();g.strokeStyle=GSV;g.lineWidth=4;g.globalAlpha=.6;g.beginPath();g.arc(h.ex,h.ey,R+5,0,TAU);g.stroke();g.restore();
    for(let i=0;i<5;i++){if(Math.random()<.5)continue;const y=rnd(0,A),hh=rnd(2,8);g.save();g.globalAlpha=.5;g.fillStyle=Math.random()<.5?'#ffffff':GSV;g.fillRect(0,y,A,hh);g.restore()}}};
EMB.gst=(f,D)=>{g.rotate(-f.rot);neon({col:'#ffffff',hi:'#ffffff'},1.3,()=>{g.beginPath();g.rect(-9,-4,18,16);[[-9,-4,-9,-15],[-3,-4,-3,-18],[3,-4,3,-17],[9,-4,9,-13]].forEach(([a,b,c,d2])=>{g.moveTo(a,b);g.lineTo(c,d2)});g.moveTo(-9,6);g.lineTo(-16,0)});
  neon({col:GSV,hi:'#e0d4ff'},1.4,()=>{g.beginPath();g.arc(0,4,3.6,0,TAU)});neon(D,1,()=>{g.beginPath();g.moveTo(-20,-18);g.lineTo(-15,-14);g.moveTo(20,18);g.lineTo(15,14)});g.save();g.globalCompositeOperation='lighter';glow(GSV,0,4,14,.35);g.restore()};
Object.assign(DMGK,{gst:1.6});

// ======================================================================
// 궁극기 봉인 시스템 (궁극기를 깔끔하게 보기)
// 누군가 궁극기를 쓰면 그 궁극기가 끝날 때까지 (최대 6초) 궁극기만 움직임
//   · 모두 (궁을 쓴 본인도) 다른 스킬을 못 씀 · 쓰려던 스킬은 취소
//   · 그 전에 깔아둔 장판 · 소환물 · 탄환 · 쿨타임 · 궁 게이지는 전부 멈춰 있다가 궁이 끝나면 그대로 이어짐
//   → 화면엔 궁극기만 보이고, 궁이 끝나면 궁 쓰기 직전 상태로 이어서 싸우니까 밸런스도 그대로
// ======================================================================
let ULK=null;
function ulkWrap(s){if(!s||!s.ult||s.ulkW)return;s.ulkW=1;const f0=s.f;s.f=function(o,t){const pre=new Set(HZ),preB=new Set(B),r=f0.apply(this,arguments);
  if(F&&phase=='play'&&o&&!o.dead&&!window.NOULK){ULK={o,t:0,H:HZ.filter(h=>!pre.has(h)),pre,preB};F.forEach(x=>{if(x!=o&&!x.dead){x.cast=null;if(!SKIP)ft(x.x,x.y-x.r-30,'봉인','#9aa0b4',15)}})}return r}}
DEF.forEach(d=>d.sk.forEach(ulkWrap));[MTSK2,UDSK2,FLSK2].forEach(L=>L.forEach(ulkWrap));if(typeof GERSK!='undefined')GERSK.forEach(ulkWrap);
const _updULK=update;update=function(dt){if(ULK){ULK.t+=dt;const alive=ULK.H.some(h=>HZ.includes(h))||CIN||TSTOP||MAD;if(!F||ULK.o.dead||phase!='play'||ULK.t>(window.ULKMAX||6)||(ULK.t>1&&!alive))ULK=null}
  // 봉인 동안 게이지가 멈추는 만큼 평소엔 궁 게이지가 더 빨리 참 (시간 충전 2.5배)
  // 5.1.4 : 체력이 상대보다 적으면 게이지가 더 빨리, 많으면 더 느리게 참 (0.5배 ~ 2배) → 궁 먼저 쓴 쪽이 한 번 더 써서 이기는 걸 막음
  if(!ULK||!F){_updULK(dt);if(F)F.forEach(f=>{const P=$('#p'+f.i);if(P)P.classList.remove('ulk');if(phase=='play'&&!f.dead&&!CIN&&!TSTOP&&!MAD&&!F.some(x=>x.cast&&x.cast.s.ult)){let cm=1;const K=window.CATCH==null?4:window.CATCH;if(K){const O=F.filter(x=>x!=f&&!x.dead);if(O.length)cm=Math.max(.5,Math.min(2,1+K*(O.reduce((q,x)=>q+x.hp,0)/O.length-f.hp)/100))}f.ug=Math.min(100,(f.ug||0)+dt*2.2*(window.UGX==null?1.5:window.UGX)*cm)}});return}
  const o=ULK.o,run=h=>!ULK.pre.has(h),snap=F.map(f=>[f.cds?f.cds.slice():null,f.ug||0]),hH=HZ.filter(h=>!run(h)),hB=B.filter(q=>ULK.preB.has(q));HZ=HZ.filter(run);B=B.filter(q=>!ULK.preB.has(q));
  F.forEach(f=>{if(f.dead)return;if(f.cast&&!(f==o&&f.cast.s.ult))f.cast=null;f.gcd=Math.max(f.gcd||0,.12)});
  try{_updULK(dt)}finally{HZ=HZ.concat(hH);B=B.concat(hB)}
  if(!F)return;F.forEach((f,i)=>{const s0=snap[i];if(s0[0]&&f.cds&&f.cds.length==s0[0].length)f.cds=f.cds.map((c,j)=>Math.max(c,s0[0][j]));if(s0[1]<100&&f.ug>s0[1])f.ug=Math.max(s0[1],f.ug-dt*2.2);const P=$('#p'+f.i);if(P)P.classList.toggle('ulk',!!ULK&&f!=o&&!f.dead)})};
// 봉인 때문에 궁이 끝까지 다 들어가게 되면서 바뀐 밸런스를 캐릭터별 피해 배율로 다시 맞춤 (전체 캐릭터 시뮬레이션 기준)
const ULKADJ={"ttd":0.72,"pica":0.888,"bl":0.88,"horror":0.817,"krl":0.943,"thief":0.811,"poop":0.848,"hsol":0.903,"radiant":0.937,"ezr":0.81,"ge":0.952,"master":0.933,"kong":0.969,"gold":0.982,"cjh":1.056,"diet":0.838,"wk":1.014,"gst":1.079,"aura":1.034,"magma":0.987,"kmj":1.029,"kaidan":0.98,"asg":1.105,"mtt":0.948,"heavy":1.14,"kgm":0.963,"und":0.919,"jett":0.848,"gun":1.115,"gaor":1.143,"monkey":1.158,"otaku":1.085,"ink":1.071,"flw":1.352,"wick":0.963,"terr":1.276,"sans":1.11,"pkc":1.13,"gapr":1.153,"oni":1.159,"rage":1.049,"soccer":1.027,"pap":1.002,"joker":1.012,"psy":1.056,"time":1.097,"rose":1.097,"chal":1.0};
Object.keys(ULKADJ).forEach(k=>{DMGK[k]=Math.round((DMGK[k]||1)*ULKADJ[k]*1000)/1000});
// 5.1.4 : 전체 데미지 15% 감소 (궁 한두 방에 너무 빨리 끝나지 않게)
const _hurtDA=hurt;hurt=function(t,n,o){const m=window.DMGALL==null?.85:window.DMGALL;if(m!=1&&o&&t&&o!=t&&n>0){const a=[...arguments];a[1]=Math.round(n*m*100)/100;return _hurtDA.apply(this,a)}return _hurtDA.apply(this,arguments)};
const _initULK=init;init=function(){ULK=null;return _initULK.apply(this,arguments)};
const _lowULK=lowHP;lowHP=function(f){_lowULK(f);if(!ULK||f==ULK.o||f.dead||f.hid||phase!='play')return;const x=f.x+f.r*.9,y=f.y-f.r-10;g.save();g.globalAlpha=.9;g.fillStyle='#9aa0b4';g.strokeStyle='#000';g.lineWidth=2;g.beginPath();g.rect(x-6,y-3,12,9);g.fill();g.stroke();g.beginPath();g.arc(x,y-3,4,Math.PI,TAU);g.lineWidth=4;g.stroke();g.strokeStyle='#9aa0b4';g.lineWidth=2;g.stroke();g.restore()};

// ======================================================================
// 사전 : 변신 캐릭터의 변신 장면 · 변신 후 스킬 미리보기
// ======================================================================
const TRX={
  mtt:{tag:'NEO',col:'#ff3aa8',n:'메타톤 NEO 변신',d:'껍데기 (체력 60) 가 부서지면 쓰러지지 않고 "오 예!" 하며 NEO 로 변신 · 체력 70',go:f=>mtBreak(f),set:f=>mtGo(f),sk:MTSK2,inf:[['8','팔 대포에 힘을 모아 굵은 빔 · 맞으면 밀려남'],['1.6×n','상대 위로 미러볼이 내려와 파랑 · 주황 레이저를 돌림 (파랑은 움직이면, 주황은 멈춰 있으면 아픔)'],['1.1×10+6~10','무대 조명 + 하트 폭탄 비 → 가슴의 하트에서 거대한 하트 빔 (시청률이 높을수록 더 아픔)']]},
  und:{tag:'UND',col:'#8af4ff',n:'THE UNDYING 부활',d:'처음 쓰러지면 영혼이 깨졌다가 결의로 다시 맞춰지며 부활 · 체력 55',go:f=>udRise(f),set:f=>udGo(f),sk:UDSK2,inf:[['1×12','(UNDYING) 창이 12개로 늘고 더 빨리 날아옴'],['1.1×14','(UNDYING) 창이 14개로 늘고 더 빨리 날아옴'],['0.55×28+1.2×n+3.5×3','나선형 창 폭풍 → 양옆에서 창 벽 → 세 방향에서 거대한 창']]},
  flw:{tag:'Ω',col:'#4ad94a',n:'오메가 플라위 각성',d:'영혼 6개가 모이면 TV 지지직 → 영혼이 하나로 합쳐지며 각성 · 체력 +20',go:f=>{f.flS=6;flAwake(f)},set:f=>flGo(f),sk:FLSK2,inf:[['0.85×n','큰 입에서 불을 내뿜어 부채꼴로 태움'],['2.6×5','폭탄 5개가 떨어져 X · + 모양으로 펑'],['0.7×15+2.4×3','① 세이브 → ② 파리지옥 조준 사격 → ③ X 폭탄 → ④ 로드 (저장했던 체력으로 되돌아감)']]}};
const _openInfoTR=openInfo;openInfo=function(i){_openInfoTR(i);const d=DEF[i],X=TRX[d.k];if(!X)return;const box=$('#dsk'),c=X.col;
  box.insertAdjacentHTML('beforeend',`<button class="dsk np trx" style="border-color:${c}88;cursor:pointer"><i style="color:${c}">✦</i><div><b>${X.n}</b><small>${X.d} (눌러서 미리보기)</small></div><em>변신</em></button>`+
    X.sk.map((s,j)=>`<button class="dsk${s.ult?' u':''}" data-tj="${j}" style="border-color:${c}66"><i style="color:${c}">${s.ult?X.tag+'·ULT':X.tag+(j+1)}</i><div><b>${s.n}</b><small>${X.inf[j][1]}</small></div><em>${X.inf[j][0]} DMG<br>${s.ult?'게이지':s.cd+'s'}</em></button>`).join(''));
  const lab=(a,b,c2)=>{$('#demot').textContent=a;$('#demon').textContent=b;$('#demod').textContent=c2};
  box.querySelector('.trx').addEventListener('click',()=>{audioOn();SFX('click');startDemo(DI,0);DEMO.next=99;lab(d.name+' · 변신',X.n,X.d);setTimeout(()=>{if(DEMO&&F[0])X.go(F[0])},500)});
  box.querySelectorAll('[data-tj]').forEach(b=>b.addEventListener('click',()=>{audioOn();SFX('click');const j=+b.dataset.tj;startDemo(DI,0);const f=F[0];X.set(f);f.cds=f.d.sk.map(()=>0);DEMO.j=j;DEMO.next=1.2;const s=X.sk[j];lab(d.name+' · '+X.tag+(s.ult?' ULT':' SKILL '+(j+1)),s.n,X.inf[j][1])}))};


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ▶ 섹션 : extra29
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ===== extra29.js : 유튜버 6인방 (v5.3) =====
// 김민채 • 도티 · 공병은 • 미스터 비스트 · 박지성 • 겜브링 · 김티비 • 침착맨 · 김가은 • 감스트 · 김지우 • 우주하마
// 사진 : images 폴더의 yt_*.png (배경 지운 사진) → 평소엔 안 보이고, 스킬을 쓸 때 공 뒤에서 튀어나옴 · 궁극기는 썸네일 컷인
// 목소리 : clips.js 의 ytv 섹션 (보내준 영상에서 잘라냄 : 개웃겨서 도티낳음 · 감스트 "이게 뭐야" · 우주하마 "우! 주! 하! 마!" · 최고민수 영상 대사)
// ======================================================================
const YTF='"Pretendard","Noto Sans KR","Apple SD Gothic Neo","Malgun Gothic",sans-serif',YTR='#ff0033',YTDL=1.1;
['yt_ddotty','yt_ddotty_mc','yt_beast','yt_gamb','yt_chim','yt_gamst','yt_gamst2','yt_gamst3','yt_uzu'].forEach(n=>utLoad(n));
const YTPX={yt_ddotty_mc:1};
// (x,y) = 그림 아래 가운데 (cen 이면 가운데) · 사진은 부드럽게, 도트 그림은 또렷하게
function ytDraw(n,x,y,h,al,flip,cen,rot){const o=UTI[n],s=utSrc(n);if(!o||!s||!(al>0)||!(h>0))return false;const w=h*o.w/o.h;g.save();g.globalAlpha=Math.min(1,al);g.imageSmoothingEnabled=!YTPX[n];g.translate(x,y);if(rot)g.rotate(rot);if(flip)g.scale(-1,1);g.drawImage(s,-w/2,cen?-h/2:-h,w,h);g.restore();return true}
function ytTxt(txt,x,y,sz,col,al,rot,st){if(!(al>0))return;g.save();g.globalAlpha=Math.min(1,al);g.translate(x,y);if(rot)g.rotate(rot);g.font='900 '+sz+'px '+YTF;g.textAlign='center';g.textBaseline='middle';g.lineJoin='round';g.lineWidth=Math.max(4,sz*.3);g.strokeStyle=st||'#000';g.strokeText(txt,0,0);g.fillStyle=col||'#fff';g.fillText(txt,0,0);g.restore()}
function ytLive(e){return e&&!e.dead&&!e.hid}
function ytHeal(f,n){if(f&&!f.dead){f.hp=Math.min(100,f.hp+n);if(!SKIP)ft(f.x,f.y-f.r-26,'+'+n,'#7dff9a',18)}}
// ---------- 스킬 쓸 때 공 뒤에서 사진이 튀어나옴 ----------
const YTPOP={};
function ytPopDraw(f){const p=f.ytP;if(!p||!UTI[p.n])return;const t=p.t,D=p.d||1.75;if(t>D)return;const ap=t<.24?1-Math.pow(1-t/.24,3):1,ov=t<.3?1+.16*Math.sin(Math.PI*Math.min(1,t/.3)):1,fo=t>D-.35?Math.max(0,(D-t)/.35):1,H=f.r*(p.big?5.4:4.4)*ov,
  x=f.x,y=f.y+f.r*.62-(1-ap)*f.r*.8+Math.sin(clock*3+f.i)*2;g.save();g.globalAlpha=.22*ap*fo;g.fillStyle='#000';g.beginPath();g.ellipse(x,y-3,H*.3,H*.05,0,0,TAU);g.fill();g.restore();ytDraw(p.n,x,y,H*(.35+.65*ap),ap*fo,0,0,Math.sin(t*9)*.05*(1-ap*.6))}
// 궁극기 썸네일 컷인 (u : 0 ~ 1.05)
function ytCut(n,u,title,sub,col){if(!(u>=0)||u>1.05)return;const k=u<.16?u/.16:u>.85?Math.max(0,(1.05-u)/.2):1,sl=1-Math.pow(1-Math.min(1,u/.22),3);lkDim(.55*k);
  g.save();g.globalAlpha=k;g.translate(A/2,A*.47);g.rotate(-.06);g.fillStyle='rgba(0,0,0,.82)';g.fillRect(-A,-78,A*2,156);g.fillStyle=col||YTR;g.fillRect(-A,-84,A*2,7);g.fillRect(-A,77,A*2,7);g.restore();
  g.save();g.globalAlpha=k;ytDraw(n,A*.27-(1-sl)*260,A*.47+84,190,1,0,0,-.06);g.restore();
  ytTxt(title,A*.66+(1-sl)*240,A*.44,title.length>6?40:50,'#ffffff',k,-.06,col||YTR);if(sub)ytTxt(sub,A*.66+(1-sl)*300,A*.44+48,20,'#ffe14a',k,-.06);
  g.save();g.globalAlpha=k;g.translate(A*.9+(1-sl)*200,A*.29);g.rotate(-.06);g.fillStyle=YTR;g.beginPath();g.roundRect?g.roundRect(-24,-17,48,34,9):g.rect(-24,-17,48,34);g.fill();g.fillStyle='#fff';g.beginPath();g.moveTo(-7,-9);g.lineTo(10,0);g.lineTo(-7,9);g.closePath();g.fill();g.restore()}
// 사각형 (회전 없는) 안에 가두기 · 원 안에 가두기
function ytBox(e,cx,cy,hw,hh){const mx=Math.max(0,hw-e.r),my=Math.max(0,hh-e.r);e.x=clamp(e.x,cx-mx,cx+mx);e.y=clamp(e.y,cy-my,cy+my)}
function ytCirc(e,cx,cy,R){const m=Math.max(0,R-e.r),dx=e.x-cx,dy=e.y-cy,d=Math.hypot(dx,dy);if(d>m&&d>0){e.x=cx+dx/d*m;e.y=cy+dy/d*m}}
function ytHitL(EN,set,key,x,y,R,n,o,heavy,fn){EN.forEach(e=>{if(e.hid||e.jump)return;const id=key+':'+e.i;if(set.has(id))return;if(Math.hypot(e.x-x,e.y-y)<R+e.r){set.add(id);hurt(e,n,o,e.x,e.y,0,heavy?1:0);if(fn)fn(e)}})}
function ytCube(x,y,cols,n,v){if(SKIP)return;for(let i=0;i<n;i++){const a=rnd(0,TAU),s=rnd(v*.3,v);Pt.push({x:x+rnd(-8,8),y:y+rnd(-8,8),vx:Math.cos(a)*s,vy:Math.sin(a)*s-60,l:.6,m:.6,sh:1,cube:1,r:rnd(2.5,4.5),rot:0,vr:0,gy:420,col:cols[i%cols.length],fr:.4})}}
const YTSND=[];function ytS(list,lab){list.forEach((n,i)=>{utPush(n);SLB[n]=lab[i]})}

// ======================================================================
// 김민채 • 도티 (초통령 · 마인크래프트)
// 패시브 리스폰 : 체력이 25 이하가 되면 딱 한 번 "아아악!" → 블록으로 부서졌다가 다른 곳에서 다시 태어남 (체력 +15 · 1.2초 무적)
// 1) 막장 탈출맵 : 상대 둘레에 블록이 하나씩 쌓여 가둠 → 가운데 TNT 가 치익… → 펑
// 2) 누구보다 빠르게 남들과는 다르게 : 상대를 꿰뚫으며 지그재그로 네 번 질주 (도트 잔상)
// 3) ULT 개웃겨서 도티낳음 : "ㅋㅋㅋㅋ" → "호잇짜!" 아기 도티가 여섯 번 태어나 "왜 나를 낳아?" 하며 들이받음 → "!짜잇호" 거대한 도티가 빨아들였다가 쾅
// ======================================================================
const DOG='#5bd16b',DOTX={};
function doTex(ty){if(DOTX[ty])return DOTX[ty];const c=document.createElement('canvas');c.width=c.height=8;const x=c.getContext('2d');let sd=ty.length*977+13;const R=()=>{sd=(sd*9301+49297)%233280;return sd/233280};
  const P={grass:['#6b4423','#7a5030','#5a3a1e'],stone:['#7d7d7d','#8f8f8f','#6b6b6b'],dia:['#7d7d7d','#8f8f8f','#6b6b6b'],plank:['#a07840','#b88a4a','#8a6634'],tnt:['#c8281e','#e0402a','#a01e16'],brick:['#9a4a3a','#b0584a','#7a3a2c']}[ty]||['#777','#888','#666'];
  for(let i=0;i<8;i++)for(let j=0;j<8;j++){x.fillStyle=P[Math.floor(R()*3)];x.fillRect(i,j,1,1)}
  if(ty=='grass')for(let i=0;i<8;i++){x.fillStyle=R()<.5?'#5bd16b':'#43b452';x.fillRect(i,0,1,2+(R()<.4?1:0))}
  if(ty=='dia')[[1,1],[5,2],[2,5],[6,6]].forEach(([a,b])=>{x.fillStyle='#4fe8de';x.fillRect(a,b,1,1);x.fillStyle='#d8fffb';x.fillRect(a+1,b,1,1)});
  if(ty=='plank'){x.fillStyle='#6a4a22';x.fillRect(0,3,8,1);x.fillRect(0,7,8,1)}
  if(ty=='brick'){x.fillStyle='#d8c8b8';[1,3,5,7].forEach(r=>x.fillRect(0,r,8,1));x.fillRect(3,0,1,1);x.fillRect(7,2,1,1);x.fillRect(3,4,1,1);x.fillRect(7,6,1,1)}
  if(ty=='tnt'){x.fillStyle='#f2f2f2';x.fillRect(0,3,8,2)}
  DOTX[ty]=c;return c}
const DOTY=['grass','stone','plank','brick','dia'],DOCOL={grass:['#5bd16b','#6b4423'],stone:['#8f8f8f','#6b6b6b'],plank:['#b88a4a','#8a6634'],brick:['#b0584a','#d8c8b8'],dia:['#4fe8de','#8f8f8f'],tnt:['#e0402a','#f2f2f2']};
function doBlock(x,y,s,ty,al,rot,wh){if(!(al>0)||!(s>0))return;g.save();g.globalAlpha=Math.min(1,al);g.translate(x,y);if(rot)g.rotate(rot);g.imageSmoothingEnabled=false;g.drawImage(doTex(ty),-s/2,-s/2,s,s);
  g.fillStyle='rgba(255,255,255,.18)';g.fillRect(-s/2,-s/2,s,s*.12);g.fillStyle='rgba(0,0,0,.25)';g.fillRect(-s/2,s*.38,s,s*.12);g.strokeStyle='rgba(0,0,0,.6)';g.lineWidth=1.5;g.strokeRect(-s/2,-s/2,s,s);
  if(ty=='tnt'&&s>=18){g.fillStyle='#111';g.font='900 '+Math.round(s*.3)+'px '+YTF;g.textAlign='center';g.textBaseline='middle';g.fillText('TNT',0,0)}
  if(wh>0){g.globalAlpha=Math.min(1,al)*wh;g.fillStyle='#fff';g.fillRect(-s/2,-s/2,s,s)}g.restore()}
function doBoom(x,y,R){if(SKIP)return;ytCube(x,y,['#ffffff','#ffd23a','#ff7a1a','#555555'],18,320);ring(x,y,10,R,'#ffffff',6,.35);ring(x,y,10,R*.75,'#ffb21a',10,.45);FX.push({k:'lkimp',x,y,R:R*.9,col:'#ffd23a',a:rnd(0,TAU),sd:Math.floor(rnd(0,999)),l:.18,m:.18})}
ytS(['do_block','do_break','do_fuse','do_boom','do_dash','do_resp','do_ult','do_pop'],['도티 · 블록 놓기','도티 · 블록 부서짐','도티 · TNT 치익','도티 · TNT 폭발','도티 · 누구보다 빠르게','도티 · 아아악! 리스폰','도티 · !짜잇호','도티 · 호잇짜!']);
const DOSK=[
  {n:'막장 탈출맵',w:.3,cd:9,c:(o,t)=>!t.hid&&dist(o,t)<560,f:(o,t)=>doCage(o,t)},
  {n:'누구보다 빠르게',w:.25,cd:7.5,c:(o,t)=>!t.hid&&dist(o,t)<430,f:(o,t)=>doDash(o,t)},
  {n:'개웃겨서 도티낳음',w:.4,ult:1,c:(o,t)=>!t.hid,f:(o,t)=>doUlt(o,t)}];
const DOI=DEF.findIndex(d=>d.name=='김민채');
DEF.push({name:'김민채 • 도티',gl:'블',k:'dto',vof:DOI,r:26,sp:214,col:DOG,hi:'#ffffff',dk:'#2b1a0c',alt:{col:'#c8281e',hi:'#ffe0dc',dk:'#2a0604'},alt2:{col:'#4fe8de',hi:'#e0fffb',dk:'#062a28'},sk:DOSK});
INFO['김민채 • 도티']={st:[8,8,9,8,8,10],p:'리스폰 · 체력이 25 이하가 되면 딱 한 번 "아아악!" 하고 블록으로 부서졌다가 다른 곳에서 다시 태어남 (체력 +15 · 1.2초 동안 무적)',
  sk:[['7 (TNT)','상대 둘레에 블록이 하나씩 쌓여 가둠 → 가운데 놓인 TNT 가 치익… 하다가 펑'],['2.6×4','"누구보다 빠르게 남들과는 다르게!" 상대를 꿰뚫으며 지그재그로 네 번 질주 · 도트 잔상'],['1.6×6+6','"ㅋㅋㅋㅋ" → "호잇짜!" 아기 도티가 여섯 번 태어나서 "왜 나를 낳아?" 하며 들이받음 → "!짜잇호" 거대한 도티가 빨아들였다가 쾅']]};
YTPOP.dto=(f,s)=>s.n=='누구보다 빠르게'?'yt_ddotty_mc':'yt_ddotty';
// ---------- 패시브 : 리스폰 ----------
const _hurtDO=hurt;hurt=function(t,n,o){if(t&&t.doInv>0&&o&&o!=t)return;const r=_hurtDO.apply(this,arguments);
  if(t&&t.d&&t.d.k=='dto'&&!t.doRs&&!t.dead&&t.hp>0&&t.hp<=25&&phase=='play'){t.doRs=1;doRespawn(t)}return r};
function doRespawn(f){const x0=f.x,y0=f.y;let nx=x0,ny=y0;for(let k=0;k<14;k++){nx=rnd(70,A-70);ny=rnd(70,A-70);if(Math.hypot(nx-x0,ny-y0)>200)break}
  f.hp=Math.min(100,f.hp+15);f.doInv=1.2;f.cast=null;if(!SKIP){SFXa('do_resp');ft(x0,y0-f.r-30,'아아악!','#ffffff',26);ytCube(x0,y0,['#5bd16b','#6b4423','#ffffff','#2b1a0c'],26,300)}f.x=nx;f.y=ny;
  if(!SKIP){ft(nx,ny-f.r-30,'리스폰! +15','#7dff9a',20);ring(nx,ny,f.r,f.r+60,DOG,5,.5)}}
// ---------- 1) 막장 탈출맵 ----------
function doCage(o,t){const S=36,R=78;HZ.push({k:'docg',o,tg:t,t:0,cx:clamp(t.x,R+10,A-R-10),cy:clamp(t.y,R+10,A-R-10),n:0,ty:DOTY[Math.floor(rnd(0,DOTY.length))],hit:new Set(),S,R});SFXa('do_block')}
function doCageP(h,i){const R=h.R,st=2*R/4,s=Math.floor(i/4),k=i%4;return s==0?[h.cx-R+st*k,h.cy-R]:s==1?[h.cx+R,h.cy-R+st*k]:s==2?[h.cx+R-st*k,h.cy+R]:[h.cx-R,h.cy+R-st*k]}
HZX.docg=(h,dt,EN)=>{const e=h.tg,live=ytLive(e);while(h.n<16&&h.t>=h.n*.03){h.n++;if(!SKIP&&h.n%3==0)SFXa('do_block')}
  if(live&&h.t>=.5&&h.t<1.85)ytBox(e,h.cx,h.cy,h.R-h.S/2,h.R-h.S/2);
  if(h.t>=.62&&!h.tn){h.tn=1;SFXa('do_block');setTimeout(()=>{try{SFXa('do_fuse')}catch(x){}},120)}
  if(h.t>=1.85&&!h.bm){h.bm=1;SFXa('do_boom');shake=Math.max(shake,14);hs=.08;ytHitL(EN,h.hit,'b',h.cx,h.cy,82,7,h.o,1);doBoom(h.cx,h.cy,120);SFXa('do_break');for(let i=0;i<16;i++){const p=doCageP(h,i);ytCube(p[0],p[1],DOCOL[h.ty],3,220)}}
  return h.t<2.25};
HZP.docg=h=>{if(h.t<1.85){for(let i=0;i<h.n;i++){const p=doCageP(h,i),a=h.t-i*.03,sc=a<.12?.4+.6*a/.12+.15*Math.sin(Math.PI*a/.12):1;doBlock(p[0],p[1],h.S*sc,h.ty,1)}
    if(h.t>=.62){const a=h.t-.62,sc=a<.12?.3+.7*a/.12:1,fl=h.t>1.05?(Math.sin(h.t*(10+(h.t-1)*30))>.2?.75:0):0;doBlock(h.cx,h.cy,30*sc*(1+(h.t>1.5?.12*(h.t-1.5)/.35:0)),'tnt',1,0,fl);
      if(!SKIP&&Math.random()<.6)Pt.push({x:h.cx+rnd(-3,3),y:h.cy-18,vx:rnd(-40,40),vy:rnd(-120,-60),l:.3,m:.3,gl:1,sh:8,col:Math.random()<.5?'#ffd23a':'#ffffff',r:1.8,rot:0,vr:0,fr:.3})}}
  else{const k=(h.t-1.85)/.4;g.save();g.globalAlpha=Math.max(0,1-k);g.globalCompositeOperation='lighter';glow('#ffd23a',h.cx,h.cy,140*(.5+k),.8);g.restore()}};
// ---------- 2) 누구보다 빠르게 남들과는 다르게 ----------
function doDash(o,t){HZ.push({k:'dods',o,tg:t,t:0,leg:-1,a0:ang(o,t),tr:[],hit:new Set()});SFXa('do_dash');if(!SKIP)ft(o.x,o.y-o.r-34,'누구보다 빠르게!','#ffffff',20)}
HZX.dods=(h,dt,EN)=>{const o=h.o,e=h.tg;if(o.dead)return false;const L=.21,leg=Math.floor(h.t/L);o.cast=null;o.gcd=Math.max(o.gcd,.3);
  if(leg>=4){return h.t<4*L+.25}
  if(leg!=h.leg){h.leg=leg;h.sx=o.x;h.sy=o.y;const ex=ytLive(e)?e.x+e.dx*e.sp*.1:o.x+Math.cos(h.a0)*150,ey=ytLive(e)?e.y+e.dy*e.sp*.1:o.y+Math.sin(h.a0)*150,a=Math.atan2(ey-o.y,ex-o.x)+(leg%2?.4:-.4);h.ex=clamp(ex+Math.cos(a)*115,o.r+6,A-o.r-6);h.ey=clamp(ey+Math.sin(a)*115,o.r+6,A-o.r-6);
    if(leg)SFXa('do_dash');if(leg==2&&!SKIP)ft(o.x,o.y-o.r-34,'남들과는 다르게!','#ffe14a',20)}
  const u=Math.min(1,(h.t-leg*L)/L),k=u<.5?2*u*u:1-Math.pow(-2*u+2,2)/2;o.x=h.sx+(h.ex-h.sx)*k;o.y=h.sy+(h.ey-h.sy)*k;h.tr.push({x:o.x,y:o.y,t:h.t});if(h.tr.length>26)h.tr.shift();
  ytHitL(EN,h.hit,'l'+leg,o.x,o.y,o.r+6,2.6,o,0,x=>{if(!SKIP)ytCube(x.x,x.y,['#5bd16b','#ffffff'],5,200)});return true};
HZD.dods=h=>{const o=h.o;h.tr.forEach((p,i)=>{const a=(i/h.tr.length)*.55*(1-Math.max(0,h.t-.84)/.25);if(a<=0)return;g.save();g.globalAlpha=a;g.fillStyle=i%2?DOG:'#2b1a0c';const s=o.r*1.5*(.5+.5*i/h.tr.length);g.fillRect(Math.round(p.x-s/2),Math.round(p.y-s/2),s,s);g.restore()})};
// ---------- 3) ULT 개웃겨서 도티낳음 ----------
function doUlt(o,t){if(!t||t.dead)t=tgt(o);if(!t)return;HZ.push({k:'doul',o,tg:t,t:0,K:[],L:[],hit:new Set(),nb:0});SFXa('yt_dotti')}
HZX.doul=(h,dt,EN)=>{const o=h.o,u=h.t-YTDL;h.u=u;if(u<0)return true;const e=h.tg,live=ytLive(e);if(!o.dead){o.gcd=Math.max(o.gcd,.4);o.cast=null}
  if(!h.lk){h.lk=1;for(let i=0;i<9;i++)h.L.push({x:rnd(60,A-60),y:rnd(90,A-90),t0:.45+i*.08,s:rnd(22,38),r:rnd(-.3,.3)})}
  if(live&&u>=1&&u<3.3)e.slow=Math.max(e.slow||0,.3);
  // 호잇짜! 아기 도티 여섯
  while(h.nb<6&&u>=1.2+h.nb*.3){const i=h.nb++,a=(live?rnd(0,TAU):0)+i*TAU/6,cx=live?e.x:A/2,cy=live?e.y:A/2;h.K.push({i,x:clamp(cx+Math.cos(a)*150,30,A-30),y:clamp(cy+Math.sin(a)*150,40,A-30),t0:u,why:i%2==1});SFXa('do_pop');if(!SKIP)ft(h.K[h.K.length-1].x,h.K[h.K.length-1].y-36,'호잇짜!','#ffe14a',18)}
  h.K.forEach(b=>{if(b.dn)return;const a=u-b.t0;if(a<.35)return;if(a>1.3){b.dn=1;return}const tx=live?e.x:A/2,ty=live?e.y:A/2,dx=tx-b.x,dy=ty-b.y,d=Math.hypot(dx,dy)||1;b.x+=dx/d*620*dt;b.y+=dy/d*620*dt;
    for(const x of EN){if(x.hid||x.jump)continue;if(Math.hypot(x.x-b.x,x.y-b.y)<x.r+16){b.dn=1;b.px=b.x;b.py=b.y;b.pt=u;hurt(x,1.6,o,b.x,b.y,0,0);if(!SKIP){SFXa('do_block');for(let k=0;k<5;k++)sparkP(b.x,b.y,rnd(-150,150),rnd(-150,150),k%2?'#ffe14a':'#ffffff',2.4)}break}}});
  // !짜잇호 : 거대한 도티가 빨아들임 → 쾅
  if(u>=3.3&&!h.zz){h.zz=1;SFXa('do_ult');h.gx=live?e.x:A/2;h.gy=live?clamp(e.y,140,A-40):A/2;if(!SKIP)ft(A/2,A*.2,'!짜잇호','#ffffff',1)}
  if(u>=3.3&&u<3.95&&live){e.x+=(h.gx-e.x)*Math.min(1,dt*5);e.y+=(h.gy-e.y)*Math.min(1,dt*5);e.stn=Math.max(e.stn||0,.12);e.cast=null}
  if(u>=3.95&&!h.im){h.im=1;SFXa('do_boom');shake=Math.max(shake,22);hs=.12;ytHitL(EN,h.hit,'g',h.gx,h.gy,80,6,o,1,x=>safePush(x,o.dead?rnd(0,TAU):ang(o,x),70));doBoom(h.gx,h.gy,150)}
  return u<4.6};
HZD.doul=h=>{const u=h.u;if(!(u>=0))return;const fa=u<4.3?Math.min(1,u/.4):Math.max(0,1-(u-4.3)/.3);lkDim(.5*fa);g.save();g.globalAlpha=.12*fa;g.fillStyle='#ff6fa8';g.fillRect(-40,-40,A+80,A+80);g.restore()};
HZP.doul=h=>{const u=h.u;if(!(u>=0))return;
  // ㅋㅋㅋㅋ (개웃겨서)
  h.L.forEach(l=>{const a=u-l.t0;if(a<0||a>1.4)return;const k=Math.min(1,a/.12),fo=a>1.1?(1.4-a)/.3:1;ytTxt('ㅋㅋㅋㅋ',l.x+Math.sin(u*40+l.s)*3,l.y,l.s*(.6+.4*k),'#ffffff',fo*k,l.r,'#ff4d8d')});
  if(u>=.5&&u<1.9)ytTxt('개웃겨서…',A/2,A*.18,40,'#ffffff',Math.min(1,(u-.5)/.15)*(u>1.6?(1.9-u)/.3:1),-.04,'#ff4d8d');
  h.K.forEach(b=>{const a=u-b.t0;if(b.dn){if(b.pt!=null&&u-b.pt<.35){const k=(u-b.pt)/.35;g.save();g.globalAlpha=1-k;g.strokeStyle='#ffe14a';g.lineWidth=3;g.beginPath();g.arc(b.px,b.py,10+k*30,0,TAU);g.stroke();g.restore()}return}
    const pop=a<.2?a/.2*(1+.3*Math.sin(Math.PI*a/.2)):1;if(a<.3){g.save();g.globalCompositeOperation='lighter';glow('#ffe14a',b.x,b.y,50*(1-a/.3),.8);g.restore()}
    ytDraw('yt_ddotty',b.x,b.y+18,54*pop,1,0,0,Math.sin(u*14+b.i)*.15);if(b.why&&a>.25)ytTxt('왜 나를 낳아?',b.x,b.y-46,14,'#ffffff',Math.min(1,(a-.25)/.1),0,'#ff4d8d')});
  if(u>=3.25&&u<4.6){const k=Math.min(1,(u-3.25)/.3),fo=u>4.25?Math.max(0,1-(u-4.25)/.35):1,sq=u>=3.95&&u<4.15?1-.15*Math.sin(Math.PI*(u-3.95)/.2):1;ytDraw('yt_ddotty',clamp(h.gx,110,A-110),Math.max(h.gy,150)+110*sq,240*k*sq,fo,0,0,0);
    if(u<3.95){g.save();g.globalAlpha=.5*k;g.strokeStyle='#ffe14a';g.lineWidth=2;for(let i=0;i<10;i++){const a=i*TAU/10+u*4,r=120*(1-((u*2+i*.1)%1));g.beginPath();g.moveTo(h.gx+Math.cos(a)*r,h.gy+Math.sin(a)*r);g.lineTo(h.gx+Math.cos(a)*(r+16),h.gy+Math.sin(a)*(r+16));g.stroke()}g.restore()}
    ytTxt('!짜잇호',A/2,A*.18,52,'#ffffff',k*fo,.04,'#ff4d8d')}
  ytCut('yt_ddotty',u,'개웃겨서','도티낳음',DOG)};
EMB.dto=(f,D)=>{g.rotate(-f.rot);neon({col:DOG,hi:'#e8ffe8'},1.4,()=>{g.beginPath();g.moveTo(0,-14);g.lineTo(13,-7);g.lineTo(13,8);g.lineTo(0,15);g.lineTo(-13,8);g.lineTo(-13,-7);g.closePath();g.moveTo(0,1);g.lineTo(13,-7);g.moveTo(0,1);g.lineTo(-13,-7);g.moveTo(0,1);g.lineTo(0,15)})};

// ======================================================================
// 공병은 • 미스터 비스트 (세계 1등 유튜버 · 기브어웨이)
// 패시브 기브어웨이 : 7초마다 돈다발 4장을 뿌림 (상대에게 날아감)
// 1) $1 vs $1,000,000 : 상대 머리 위에 카드 두 장 → 룰렛 → $1 이면 동전 하나 · $1,000,000 이면 거대한 돈가방이 쾅
// 2) LAST TO LEAVE : 상대를 원 안에 가두고 3 · 2 · 1 → 끝까지 남는 동안 돈이 계속 쏟아짐
// 3) ULT BEAST GAMES : 썸네일 컷인 → 3 · 2 · 1 조준 → 돈 폭풍 소용돌이 → 거대한 황금 금고가 쾅
// ======================================================================
const MBB='#29a8ff',MBP='#ff3fa8',MBG='#ffd23a',MBM='#3fbf5a';
function mbBill(x,y,a,s,al){if(!(al>0))return;g.save();g.globalAlpha=Math.min(1,al);g.translate(x,y);g.rotate(a);g.scale(s,s*(.55+.45*Math.abs(Math.cos(a*3+clock*6))));g.fillStyle='#2f9a4a';g.fillRect(-12,-6,24,12);g.strokeStyle='#bff5c8';g.lineWidth=1.2;g.strokeRect(-10.5,-4.5,21,9);
  g.fillStyle='#bff5c8';g.beginPath();g.arc(0,0,3.6,0,TAU);g.fill();g.fillStyle='#1e6a32';g.font='900 6px '+YTF;g.textAlign='center';g.textBaseline='middle';g.fillText('$',0,.5);g.restore()}
function mbCoin(x,y,r,al,sp){if(!(al>0))return;g.save();g.globalAlpha=Math.min(1,al);g.translate(x,y);g.scale(Math.abs(Math.cos(sp||0))*.8+.2,1);g.fillStyle='#c89a10';g.beginPath();g.arc(0,0,r,0,TAU);g.fill();g.fillStyle=MBG;g.beginPath();g.arc(0,0,r*.82,0,TAU);g.fill();
  g.fillStyle='#8a6a00';g.font='900 '+Math.round(r*1.2)+'px '+YTF;g.textAlign='center';g.textBaseline='middle';g.fillText('$',0,1);g.restore()}
function mbCard(x,y,w,h,txt,on,al,gold){if(!(al>0))return;g.save();g.globalAlpha=Math.min(1,al);g.translate(x,y);const s=on?1.12:1;g.scale(s,s);g.fillStyle=gold?'#2a1e00':'#1a1a1a';g.fillRect(-w/2,-h/2,w,h);g.strokeStyle=on?(gold?MBG:'#ffffff'):'#666';g.lineWidth=on?4:2;g.strokeRect(-w/2,-h/2,w,h);
  g.font='900 '+(gold?15:22)+'px '+YTF;g.textAlign='center';g.textBaseline='middle';g.fillStyle=gold?MBG:'#cfcfcf';g.fillText(txt,0,1);if(on){g.globalCompositeOperation='lighter';glow(gold?MBG:'#ffffff',0,0,w*.7,.35)}g.restore()}
ytS(['mb_card','mb_coin','mb_cash','mb_slam','mb_bill','mb_ring','mb_count','mb_storm','mb_vault'],['비스트 · 룰렛 딸깍','비스트 · $1 동전','비스트 · 백만 달러!','비스트 · 돈가방 쾅','비스트 · 돈 뿌리기','비스트 · LAST TO LEAVE','비스트 · 카운트다운','비스트 · 돈 폭풍','비스트 · 황금 금고']);
const MBSK=[
  {n:'$1 vs $1,000,000',w:.3,cd:8,c:(o,t)=>!t.hid&&dist(o,t)<600,f:(o,t)=>mbVs(o,t)},
  {n:'LAST TO LEAVE',w:.3,cd:10,c:(o,t)=>!t.hid&&dist(o,t)<560,f:(o,t)=>mbLast(o,t)},
  {n:'BEAST GAMES',w:.4,ult:1,c:(o,t)=>!t.hid,f:(o,t)=>mbUlt(o,t)}];
const MBI=DEF.findIndex(d=>d.name=='공병은');
DEF.push({name:'공병은 • 미스터 비스트',gl:'$',k:'bst',vof:MBI,r:26,sp:212,col:MBB,hi:'#ffffff',dk:'#04182a',alt:{col:MBP,hi:'#ffe0f0',dk:'#2a0418'},alt2:{col:MBG,hi:'#fff6d0',dk:'#2a2000'},sk:MBSK});
INFO['공병은 • 미스터 비스트']={st:[8,8,8,9,8,10],p:'기브어웨이 · 7초마다 돈다발 4장을 뿌림 (상대에게 날아가며 한 장에 0.8)',
  sk:[['1.5 / 9','상대 머리 위에 $1 · $1,000,000 카드 두 장 → 룰렛! $1 이면 동전 하나 · $1,000,000 이면 거대한 돈가방이 쾅 (45%)'],['1.3×n','"LAST TO LEAVE" 상대를 원 안에 가두고 3 · 2 · 1 → 갇혀 있는 동안 돈이 계속 쏟아짐'],['0.5×n+8','썸네일 컷인 → 3 · 2 · 1 조준 → 돈 폭풍 소용돌이 → 거대한 황금 금고가 쾅']]};
YTPOP.bst=()=>'yt_beast';
// ---------- 패시브 : 기브어웨이 ----------
function mbBills(o,t,n,dmg,spd){HZ.push({k:'mbbl',o,tg:t,t:0,dmg,P:Array.from({length:n},(_,i)=>{const a=ang(o,t)+(i-(n-1)/2)*.32+rnd(-.08,.08);return{x:o.x,y:o.y,vx:Math.cos(a)*spd,vy:Math.sin(a)*spd,a:rnd(0,TAU),on:1}})});SFXa('mb_bill')}
HZX.mbbl=(h,dt,EN)=>{const e=h.tg;let any=0;h.P.forEach(p=>{if(!p.on)return;any=1;if(ytLive(e)&&h.t>.12){const d=Math.atan2(e.y-p.y,e.x-p.x),c=Math.atan2(p.vy,p.vx);let df=d-c;while(df>Math.PI)df-=TAU;while(df<-Math.PI)df+=TAU;const nc=c+clamp(df,-2.6*dt,2.6*dt),sp=Math.hypot(p.vx,p.vy);p.vx=Math.cos(nc)*sp;p.vy=Math.sin(nc)*sp}
  p.x+=p.vx*dt;p.y+=p.vy*dt;p.a+=dt*7;if(p.x<-20||p.x>A+20||p.y<-20||p.y>A+20||h.t>1.6){p.on=0;return}
  for(const x of EN){if(x.hid||x.jump)continue;if(Math.hypot(x.x-p.x,x.y-p.y)<x.r+9){p.on=0;hurt(x,h.dmg,h.o,p.x,p.y,0,0);if(!SKIP)for(let k=0;k<3;k++)sparkP(p.x,p.y,rnd(-120,120),rnd(-120,120),'#bff5c8',2);break}}});return any};
HZP.mbbl=h=>{h.P.forEach(p=>{if(p.on)mbBill(p.x,p.y,p.a,1.15,1)})};
// ---------- 1) $1 vs $1,000,000 ----------
function mbVs(o,t){HZ.push({k:'mbvs',o,tg:t,t:0,big:Math.random()<.45,hit:new Set(),x:t.x,y:t.y,nt:0});SFXa('mb_card')}
HZX.mbvs=(h,dt,EN)=>{const e=h.tg;if(h.t<1&&ytLive(e)){h.x=e.x;h.y=e.y}
  const sw=h.t<.95?Math.floor(Math.pow(h.t/.95,.55)*9):-1;if(sw!=h.nt&&sw>=0){h.nt=sw;if(!SKIP)SFXa('mb_card')}
  if(h.t>=.95&&!h.rv){h.rv=1;h.lx=h.x;h.ly=h.y;if(h.big)SFXa('mb_cash');else SFXa('mb_coin');if(!SKIP)ft(h.x,h.y-120,h.big?'$1,000,000!!':'$1…',h.big?MBG:'#cfcfcf',h.big?26:20)}
  const imp=h.big?1.3:1.15;if(h.t>=imp&&!h.im){h.im=1;if(h.big){SFXa('mb_slam');shake=Math.max(shake,16);hs=.09;ytHitL(EN,h.hit,'b',h.lx,h.ly,62,9,h.o,1,x=>{safePush(x,ang({x:h.lx,y:h.ly},x),70)});if(!SKIP){for(let k=0;k<26;k++){const a=rnd(0,TAU),v=rnd(120,380);Pt.push({x:h.lx,y:h.ly,vx:Math.cos(a)*v,vy:Math.sin(a)*v-80,l:.9,m:.9,sh:1,cube:1,r:rnd(3,5),rot:0,vr:0,gy:300,col:k%3?'#2f9a4a':MBG,fr:.6})}ring(h.lx,h.ly,10,110,MBG,8,.4)}}
    else{ytHitL(EN,h.hit,'c',h.lx,h.ly,26,1.5,h.o,0)}}
  return h.t<1.8};
HZP.mbvs=h=>{const t=h.t;if(t<1.1){const fo=t>.95?Math.max(0,1-(t-.95)/.15):Math.min(1,t/.12),x=h.x,y=h.y-h.tg.r-62,on=t<.95?h.nt%2:(h.big?1:0);mbCard(x-34,y,54,44,'$1',on==0&&t>=.05,fo,0);mbCard(x+34,y,64,44,'$1,000,000',on==1&&t>=.05,fo,1)}
  if(t>=.95){const imp=h.big?1.3:1.15;if(t<imp){const k=(t-.95)/(imp-.95);if(h.big){g.save();g.globalAlpha=.3*k;g.fillStyle='#000';g.beginPath();g.ellipse(h.lx,h.ly+6,60*k,22*k,0,0,TAU);g.fill();g.restore();const y=h.ly-(1-k*k)*360;g.save();g.translate(h.lx,y);g.rotate((1-k)*.4);g.fillStyle='#3a2410';g.fillRect(-48,-30,96,60);g.strokeStyle=MBG;g.lineWidth=4;g.strokeRect(-48,-30,96,60);g.fillStyle='#2a1a08';g.fillRect(-14,-40,28,12);g.fillStyle=MBG;g.font='900 30px '+YTF;g.textAlign='center';g.textBaseline='middle';g.fillText('$',0,2);g.restore()}
      else mbCoin(h.lx,h.ly-(1-k*k)*240,11,1,t*30)}
    else{const a=t-imp;if(h.big&&a<.5){ytTxt('$1,000,000',h.lx,h.ly-50-a*40,24,MBG,1-a/.5)}else if(!h.big&&a<.4){mbCoin(h.lx+a*30,h.ly-a*60,11,1-a/.4,t*30)}}}};
// ---------- 2) LAST TO LEAVE ----------
function mbLast(o,t){HZ.push({k:'mbls',o,tg:t,t:0,cx:clamp(t.x,120,A-120),cy:clamp(t.y,120,A-120),R:108,nt:0,B:[]});SFXa('mb_ring')}
HZX.mbls=(h,dt,EN)=>{const e=h.tg,live=ytLive(e);if(live&&h.t>=.25&&h.t<2.75)ytCirc(e,h.cx,h.cy,h.R-4);
  [.45,.95,1.45].forEach((s,i)=>{if(h.t>=s&&h.nt<=i){h.nt=i+1;SFXa('mb_count')}});
  if(h.t>=.5&&h.t<2.75&&live&&h.t>=(h.nx||.5)){h.nx=h.t+.55;h.B.push({x:e.x+rnd(-12,12),y:e.y,t0:h.t});hurt(e,1.3,h.o,e.x,e.y,0,0);if(!SKIP)SFXa('mb_bill')}
  if(h.t>=2.75&&!h.end){h.end=1;SFXa('mb_cash');if(!SKIP)ft(h.cx,h.cy-h.R-20,'끝까지 남았다! $10,000','#ffe14a',20)}return h.t<3.1};
HZD.mbls=h=>{const fo=h.t>2.75?Math.max(0,1-(h.t-2.75)/.35):Math.min(1,h.t/.25);g.save();g.globalAlpha=.16*fo;g.fillStyle='#ff0033';g.beginPath();g.arc(h.cx,h.cy,h.R,0,TAU);g.fill();g.restore()};
HZP.mbls=h=>{const fo=h.t>2.75?Math.max(0,1-(h.t-2.75)/.35):Math.min(1,h.t/.25);g.save();g.globalAlpha=fo;g.strokeStyle='#ff0033';g.lineWidth=6;g.setLineDash([16,8]);g.lineDashOffset=-clock*60;g.beginPath();g.arc(h.cx,h.cy,h.R,0,TAU);g.stroke();g.setLineDash([]);g.strokeStyle='#ffffff';g.lineWidth=2;g.beginPath();g.arc(h.cx,h.cy,h.R-5,0,TAU);g.stroke();g.restore();
  ytTxt('LAST TO LEAVE',h.cx,h.cy-h.R-16,17,'#ffffff',fo,0,'#ff0033');const c=h.t<.45?'':h.t<.95?'3':h.t<1.45?'2':h.t<1.95?'1':'';if(c){const a=(h.t-.45)%.5;ytTxt(c,h.cx,h.cy-6,52*(1.25-a*.5),'#ffffff',.85*(1-a/.5)+.15)}
  h.B.forEach(b=>{const a=h.t-b.t0;if(a<.6)mbBill(b.x+Math.sin(a*12)*10,b.y-90*(1-a/.6)-10,a*8,1.3,1-a/.6)})};
// ---------- 3) ULT BEAST GAMES ----------
function mbUlt(o,t){if(!t||t.dead)t=tgt(o);if(!t)return;HZ.push({k:'mbul',o,tg:t,t:0,P:[],nt:0,hit:new Set()})}
HZX.mbul=(h,dt,EN)=>{const o=h.o,u=h.t-YTDL;h.u=u;if(u<0)return true;const e=h.tg,live=ytLive(e);if(!h.lk){h.lk=1;SFXa('mb_cash')}if(!o.dead){o.gcd=Math.max(o.gcd,.4);o.cast=null}
  if(live){if(u<3.7){h.ex=e.x;h.ey=e.y}if(u>=.9&&u<3.7)e.slow=Math.max(e.slow||0,.3)}else if(h.ex==null){h.ex=A/2;h.ey=A/2}
  [.95,1.35,1.75].forEach((s,i)=>{if(u>=s&&h.nt<=i){h.nt=i+1;SFXa('mb_count')}});
  if(u>=2.15&&!h.st){h.st=1;SFXa('mb_storm')}
  if(u>=2.15&&u<3.65){const n=SKIP?0:6;for(let i=0;i<n;i++){const a=rnd(0,TAU),R=rnd(260,380);h.P.push({a,R,w:rnd(2.2,3.6),t0:u,s:rnd(.9,1.4)})}
    if(live&&u>=(h.nx||2.15)){h.nx=u+.12;hurt(e,.5,o,e.x,e.y,0,0)}EN.forEach(x=>{if(x==e||x.hid||u<(x.mbn||0))return;if(Math.hypot(x.x-h.ex,x.y-h.ey)<130){x.mbn=u+.25;hurt(x,.3,o,x.x,x.y,0,0)}})}
  if(u>=3.7&&!h.vl){h.vl=1;h.vx=h.ex;h.vy=h.ey}
  if(u>=4.05&&!h.im){h.im=1;SFXa('mb_vault');shake=Math.max(shake,24);hs=.13;ytHitL(EN,h.hit,'v',h.vx,h.vy,78,8,o,1,x=>safePush(x,o.dead?rnd(0,TAU):ang(o,x),80));if(!SKIP){lkImp(h.vx,h.vy,150,MBG);for(let k=0;k<40;k++){const a=rnd(0,TAU),v=rnd(150,460);Pt.push({x:h.vx,y:h.vy,vx:Math.cos(a)*v,vy:Math.sin(a)*v-100,l:1,m:1,sh:1,cube:1,r:rnd(3,5),rot:0,vr:0,gy:320,col:k%3?'#2f9a4a':MBG,fr:.6})}}}
  return u<4.75};
HZD.mbul=h=>{const u=h.u;if(!(u>=0))return;const fa=u<4.45?Math.min(1,u/.35):Math.max(0,1-(u-4.45)/.3);lkDim(.62*fa)};
HZP.mbul=h=>{const u=h.u;if(!(u>=0)||h.ex==null)return;
  if(u>=.9&&u<2.15){const c=u<1.35?'3':u<1.75?'2':'1',a=(u-.95)%.4;ytTxt(c,A/2,130,90*(1.2-a*.6),'#ffffff',Math.max(.2,1-a/.4),0,YTR);ytTxt('$1,000,000',A/2,205,30,MBG,Math.min(1,(u-.9)/.15));
    const k=Math.min(1,(u-.9)/.5),R=90-50*k;g.save();g.strokeStyle=YTR;g.lineWidth=3;g.globalAlpha=.9;g.translate(h.ex,h.ey);g.rotate(u*2);g.beginPath();g.arc(0,0,R,0,TAU);g.stroke();[0,1,2,3].forEach(i=>{g.rotate(Math.PI/2);g.beginPath();g.moveTo(R-12,0);g.lineTo(R+14,0);g.stroke()});g.restore()}
  // 돈 폭풍 소용돌이
  h.P=h.P.filter(p=>u-p.t0<1.3);h.P.forEach(p=>{const a=u-p.t0,R=p.R*(1-a/1.3),an=p.a+a*p.w;mbBill(h.ex+Math.cos(an)*R,h.ey+Math.sin(an)*R*.8,an*2,p.s,Math.min(1,a/.15)*(a>1.1?(1.3-a)/.2:1))});
  if(u>=2.15&&u<3.7){g.save();g.globalCompositeOperation='lighter';glow(MBG,h.ex,h.ey,80+20*Math.sin(u*20),.35);g.restore()}
  if(u>=3.7&&u<4.05){const k=(u-3.7)/.35;g.save();g.globalAlpha=.35*k;g.fillStyle='#000';g.beginPath();g.ellipse(h.vx,h.vy+8,70*k,26*k,0,0,TAU);g.fill();g.restore();mbCoin(h.vx,h.vy-(1-k*k)*420,64,1,0)}
  else if(u>=4.05&&u<4.75){const a=u-4.05;mbCoin(h.vx,h.vy,64*(1-a/.7*.3),1-a/.7,0);ytTxt('GIVEAWAY!',A/2,A*.3,46,MBG,Math.min(1,a/.08)*(a>.5?(.7-a)/.2:1),-.05,YTR)}
  ytCut('yt_beast',u,'BEAST GAMES','$1,000,000',MBB)};
EMB.bst=(f,D)=>{g.rotate(-f.rot);neon({col:MBG,hi:'#fff6d0'},1.6,()=>{g.beginPath();g.moveTo(9,-9);g.quadraticCurveTo(0,-15,-8,-9);g.quadraticCurveTo(-12,-2,0,0);g.quadraticCurveTo(12,2,8,9);g.quadraticCurveTo(0,15,-9,9);g.moveTo(0,-16);g.lineTo(0,16)})};

// ======================================================================
// 박지성 • 겜브링 (하브~ · 어메이징 프로그 · 피드 앤 그로우)
// 패시브 버그다! : 3 이상 맞으면 25% 확률로 "버그다!" → 래그돌처럼 날아감 (그 공격 피해 절반 · 4초에 한 번)
// 1) 야!!!!!!! : 소리 지르면 "야" "!" "!" "!" "!" 글자가 날아감 · 마지막 느낌표는 크게 (잠깐 기절)
// 2) 어메이징 프로그 : 풍선 단 개구리를 던지면 경기장을 미친 듯이 튕겨 다님 → 풍선이 터지며 펑
// 3) ULT 피드 앤 그로우 : "하브~!" 거대한 물고기로 변신 → 쫓아가서 호로록 세 번 (먹을 때마다 커짐) → "빠브~"
// ======================================================================
const GBY='#ffd21a',GBB='#2a6bff';
ytS(['gb_yell','gb_frog','gb_boing','gb_pop','gb_bug','gb_hav','gb_chomp','gb_suck','gb_grow'],['겜브링 · 야!!!!','겜브링 · 개구리','겜브링 · 띠용','겜브링 · 풍선 펑','겜브링 · 버그다!','겜브링 · 하브~','겜브링 · 호로록 꿀꺽','겜브링 · 호로록','겜브링 · 피드 앤 그로우']);
const GBSK=[
  {n:'야!!!!!!!',w:.25,cd:7,c:(o,t)=>!t.hid&&dist(o,t)<520,f:(o,t)=>gbYell(o,t)},
  {n:'어메이징 프로그',w:.3,cd:9,c:(o,t)=>!t.hid&&dist(o,t)<600,f:(o,t)=>gbFrog(o,t)},
  {n:'피드 앤 그로우',w:.4,ult:1,c:(o,t)=>!t.hid,f:(o,t)=>gbUlt(o,t)}];
const GBI=DEF.findIndex(d=>d.name=='박지성');
DEF.push({name:'박지성 • 겜브링',gl:'겜',k:'gbr',vof:GBI,r:26,sp:212,col:GBY,hi:'#ffffff',dk:'#2a2000',alt:{col:GBB,hi:'#e0e8ff',dk:'#020a2a'},alt2:{col:'#3fd96a',hi:'#e0ffe8',dk:'#04200c'},sk:GBSK});
INFO['박지성 • 겜브링']={st:[8,8,8,8,9,10],p:'버그다! · 3 이상 맞으면 25% 확률로 "버그다!" 하며 래그돌처럼 날아감 (그 공격 피해 절반 · 4초에 한 번)',
  sk:[['1.6×4+3','"야!!!!!!!" 소리 지르면 글자가 그대로 날아감 · 마지막 느낌표는 크게 (잠깐 기절)'],['2×n+3','풍선 단 개구리를 던지면 경기장을 미친 듯이 튕겨 다니며 들이받음 → 풍선이 터지며 펑'],['4.5×3','"하브~!" 거대한 물고기로 변신 → 쫓아가서 호로록 세 번 (먹을 때마다 더 커짐) → "빠브~"']]};
YTPOP.gbr=()=>'yt_gamb';
// ---------- 패시브 : 버그다! ----------
const _hurtGB=hurt;hurt=function(t,n,o){if(t&&t.d&&t.d.k=='gbr'&&o&&o!=t&&n>=3&&!t.dead&&!(t.gbCd>0)&&phase=='play'&&Math.random()<.25){t.gbCd=4;const a=[...arguments];a[1]=Math.round(n*.5*10)/10;const r=_hurtGB.apply(this,a);
  if(!t.dead){const an=Math.atan2(t.y-o.y,t.x-o.x)+rnd(-.6,.6);t.gbRag={vx:Math.cos(an)*620,vy:Math.sin(an)*620,t:.5};t.cast=null;if(!SKIP){SFXa('gb_bug');ft(t.x,t.y-t.r-30,'버그다!','#7af0ff',24)}}return r}return _hurtGB.apply(this,arguments)};
// ---------- 1) 야!!!!!!! ----------
function gbYell(o,t){const L=['야','!','!','!','!'];HZ.push({k:'gbyl',o,tg:t,t:0,P:L.map((c,i)=>({c,t0:i*.09,big:i==4}))});SFXa('gb_yell');shake=Math.max(shake,6)}
HZX.gbyl=(h,dt,EN)=>{const o=h.o,e=h.tg;let any=0;h.P.forEach(p=>{if(p.dn)return;any=1;if(h.t<p.t0)return;if(!p.go){p.go=1;const a=(ytLive(e)?ang(o,e):(p.a||0))+rnd(-.12,.12);p.x=o.x;p.y=o.y;p.vx=Math.cos(a)*560;p.vy=Math.sin(a)*560}
  p.x+=p.vx*dt;p.y+=p.vy*dt;if(p.x<-30||p.x>A+30||p.y<-30||p.y>A+30||h.t-p.t0>1.3){p.dn=1;return}
  for(const x of EN){if(x.hid||x.jump)continue;if(Math.hypot(x.x-p.x,x.y-p.y)<x.r+(p.big?22:14)){p.dn=1;hurt(x,p.big?3:1.6,o,p.x,p.y,0,p.big?1:0);if(p.big){x.stn=Math.max(x.stn||0,.4);x.cast=null}shake=Math.max(shake,p.big?10:4);if(!SKIP)for(let k=0;k<5;k++)sparkP(p.x,p.y,rnd(-160,160),rnd(-160,160),GBY,2.4);break}}});return any};
HZP.gbyl=h=>{h.P.forEach(p=>{if(!p.go||p.dn)return;const a=h.t-p.t0,s=(p.big?66:42)*Math.min(1,.4+a*4);ytTxt(p.c,p.x+rnd(-2,2),p.y+rnd(-2,2),s,p.big?'#ff3a3a':'#ffffff',1,Math.sin(a*30)*.15,'#000')})};
// ---------- 2) 어메이징 프로그 ----------
function gbFrogD(x,y,a,s,al,lim,bl){if(!(al>0))return;g.save();g.globalAlpha=Math.min(1,al);
  if(bl>0){[[-16,-62,'#ff4d6d'],[2,-70,'#ffd21a'],[18,-58,'#3fd96a']].forEach(([bx,by,c])=>{g.strokeStyle='rgba(255,255,255,.6)';g.lineWidth=1;g.beginPath();g.moveTo(x,y-8);g.lineTo(x+bx*s,y+by*s+14*s);g.stroke();g.fillStyle=c;g.beginPath();g.ellipse(x+bx*s,y+by*s,11*s*bl,13*s*bl,0,0,TAU);g.fill();g.fillStyle='rgba(255,255,255,.5)';g.beginPath();g.arc(x+bx*s-4*s,y+by*s-5*s,3*s,0,TAU);g.fill()})}
  g.translate(x,y);g.rotate(a);g.scale(s,s);g.strokeStyle='#2f8a2a';g.lineWidth=5;g.lineCap='round';[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([sx,sy],i)=>{const w=Math.sin(lim+i*1.7)*.7;g.beginPath();g.moveTo(sx*8,sy*6);g.lineTo(sx*(16+6*Math.cos(w)),sy*(10+8*Math.sin(w)));g.stroke()});
  g.fillStyle='#4cc23f';g.beginPath();g.ellipse(0,0,15,12,0,0,TAU);g.fill();g.fillStyle='#e8f2c8';g.beginPath();g.ellipse(0,4,9,6,0,0,TAU);g.fill();
  [[-6,-9],[6,-9]].forEach(([ex,ey])=>{g.fillStyle='#4cc23f';g.beginPath();g.arc(ex,ey,5.5,0,TAU);g.fill();g.fillStyle='#fff';g.beginPath();g.arc(ex,ey,4,0,TAU);g.fill();g.fillStyle='#111';g.beginPath();g.arc(ex+Math.sin(lim*3)*1.5,ey,2,0,TAU);g.fill()});
  g.strokeStyle='#1e5a1a';g.lineWidth=1.5;g.beginPath();g.arc(0,-1,6,.2,Math.PI-.2);g.stroke();g.restore()}
function gbFrog(o,t){const a=ang(o,t);HZ.push({k:'gbfr',o,tg:t,t:0,x:o.x,y:o.y,vx:Math.cos(a)*560,vy:Math.sin(a)*560,a:0,va:9,cd:{},hit:new Set()});SFXa('gb_frog')}
HZX.gbfr=(h,dt,EN)=>{const e=h.tg;if(h.t<2.5){if(ytLive(e)&&h.t>(h.cdg||0)){const d=Math.atan2(e.y-h.y,e.x-h.x),c=Math.atan2(h.vy,h.vx);let df=d-c;while(df>Math.PI)df-=TAU;while(df<-Math.PI)df+=TAU;const nc=c+clamp(df,-5.5*dt,5.5*dt);h.vx=Math.cos(nc)*500;h.vy=Math.sin(nc)*500}
    h.x+=h.vx*dt;h.y+=h.vy*dt;h.a+=h.va*dt;const m=16;let b=0;if(h.x<m){h.x=m;h.vx=Math.abs(h.vx);b=1}if(h.x>A-m){h.x=A-m;h.vx=-Math.abs(h.vx);b=1}if(h.y<m){h.y=m;h.vy=Math.abs(h.vy);b=1}if(h.y>A-m){h.y=A-m;h.vy=-Math.abs(h.vy);b=1}
    if(b){h.va=rnd(-16,16);if(!SKIP&&(!h.sb||h.t-h.sb>.12)){h.sb=h.t;SFXa('gb_boing')}}
    EN.forEach(x=>{if(x.hid||x.jump||(h.cd[x.i]||0)>h.t)return;const dx=x.x-h.x,dy=x.y-h.y,d=Math.hypot(dx,dy);if(d<x.r+16){h.cd[x.i]=h.t+.4;h.cdg=h.t+.22;hurt(x,2,h.o,h.x,h.y,0,0);const nx=dx/(d||1),ny=dy/(d||1),vd=h.vx*nx+h.vy*ny;if(vd>0){h.vx-=2*vd*nx;h.vy-=2*vd*ny}h.vx+=rnd(-120,120);h.vy+=rnd(-120,120);h.va=rnd(-18,18);if(!SKIP){SFXa('gb_boing');ft(h.x,h.y-30,'개굴!','#7dff6a',16)}}})}
  else if(!h.pp){h.pp=1;SFXa('gb_pop');shake=Math.max(shake,10);ytHitL(EN,h.hit,'p',h.x,h.y,64,3,h.o,1);if(!SKIP){ring(h.x,h.y,8,90,'#ffd21a',6,.35);for(let k=0;k<16;k++)sparkP(h.x,h.y,rnd(-260,260),rnd(-260,260),['#ff4d6d','#ffd21a','#3fd96a'][k%3],3)}}
  return h.t<2.8};
HZP.gbfr=h=>{if(h.t<2.5){const bl=h.t>2.15?1+(h.t-2.15)*1.4:1;gbFrogD(h.x,h.y,h.a,1.15,1,h.t*14,bl)}else{const k=(h.t-2.5)/.3;gbFrogD(h.x,h.y-k*20,h.a+k*6,1.15,1-k,h.t*20,0)}};
// ---------- 3) ULT 피드 앤 그로우 ----------
function gbFish(x,y,a,R,al,mo,col){if(!(al>0))return;g.save();g.globalAlpha=Math.min(1,al);g.translate(x,y);g.rotate(a);const w=Math.sin(clock*12)*.35;
  g.fillStyle='#3a6ab8';g.beginPath();g.moveTo(-R*.85,0);g.lineTo(-R*1.65,-R*.6+w*R*.3);g.lineTo(-R*1.45,0);g.lineTo(-R*1.65,R*.6+w*R*.3);g.closePath();g.fill();
  g.beginPath();g.moveTo(-R*.2,-R*.72);g.quadraticCurveTo(R*.1,-R*1.25,R*.45,-R*.7);g.fill();
  g.fillStyle=col||'#5a8ad8';g.beginPath();g.ellipse(0,0,R*1.05,R*.82,0,0,TAU);g.fill();g.fillStyle='#d8e8ff';g.beginPath();g.ellipse(R*.1,R*.32,R*.8,R*.38,0,0,TAU);g.fill();
  // 입 (mo : 0 다묾 ~ 1 쩍)
  const ma=.08+mo*.55;g.fillStyle='#2a0a14';g.beginPath();g.moveTo(R*.3,0);g.lineTo(R*1.12,-R*ma);g.lineTo(R*1.12,R*ma);g.closePath();g.fill();
  g.fillStyle='#fff';for(let i=0;i<4;i++){const px=R*(.55+i*.15);g.beginPath();g.moveTo(px,-R*ma*(px/R)*.85);g.lineTo(px+R*.06,-R*ma*(px/R)*.85+R*.12);g.lineTo(px+R*.12,-R*ma*(px/R)*.85);g.fill();g.beginPath();g.moveTo(px,R*ma*(px/R)*.85);g.lineTo(px+R*.06,R*ma*(px/R)*.85-R*.12);g.lineTo(px+R*.12,R*ma*(px/R)*.85);g.fill()}
  g.fillStyle='#fff';g.beginPath();g.arc(R*.45,-R*.36,R*.2,0,TAU);g.fill();g.fillStyle='#111';g.beginPath();g.arc(R*.5,-R*.36,R*.1,0,TAU);g.fill();g.restore()}
function gbUlt(o,t){if(!t||t.dead)t=tgt(o);if(!t)return;HZ.push({k:'gbul',o,tg:t,t:0,r0:o.r,R:o.r,ch:0,a:ang(o,t),hit:new Set(),mo:0,B:[]})}
HZX.gbul=(h,dt,EN)=>{const o=h.o,u=h.t-YTDL;h.u=u;if(u<0)return true;const e=h.tg,live=ytLive(e);if(!h.lk){h.lk=1;SFXa('gb_hav')}
  if(o.dead){o.r=h.r0;return false}o.gcd=Math.max(o.gcd,.4);o.cast=null;
  if(u>=.85&&!h.gr){h.gr=1;SFXa('gb_grow')}
  const tgR=u<.85?h.r0:u<4.2?h.r0*(1.55+h.ch*.22):h.r0;h.R+=(tgR-h.R)*Math.min(1,dt*(u>=4.2?10:5));o.r=h.R;
  if(u>=.85&&u<4.2&&live){const a=ang(o,e);let df=a-h.a;while(df>Math.PI)df-=TAU;while(df<-Math.PI)df+=TAU;h.a+=clamp(df,-5*dt,5*dt);const ph=(u-.85)%1,sp=ph>.72?700:260;o.x=clamp(o.x+Math.cos(h.a)*sp*dt,o.r,A-o.r);o.y=clamp(o.y+Math.sin(h.a)*sp*dt,o.r,A-o.r);e.slow=Math.max(e.slow||0,.25)}
  [1.85,2.85,3.85].forEach((c,i)=>{if(u>=c&&h.ch<=i){h.ch=i+1;SFXa('gb_chomp');shake=Math.max(shake,12);const mx=o.x+Math.cos(h.a)*o.r*.9,my=o.y+Math.sin(h.a)*o.r*.9;ytHitL(EN,h.hit,'c'+i,mx,my,o.r*.9+30,4.5,o,1,x=>{if(!SKIP)ft(x.x,x.y-x.r-28,'호로록!','#7af0ff',22)});if(!SKIP)for(let k=0;k<10;k++)sparkP(mx,my,rnd(-200,200),rnd(-200,200),'#d8e8ff',3)}});
  const ph=(u-.85)%1;h.mo=u<.85||u>=4.2?0:ph<.25?0:ph<.95?Math.min(1,(ph-.25)/.2):Math.max(0,1-(ph-.95)/.05);if(u>=.85&&ph>.3&&ph<.7&&!SKIP&&Math.random()<.08)SFXa('gb_suck');
  if(!SKIP&&Math.random()<.5)h.B.push({x:o.x+rnd(-o.r,o.r),y:o.y+rnd(-o.r,o.r),t0:u,s:rnd(3,7)});h.B=h.B.filter(b=>u-b.t0<.8);
  if(u>=4.2&&!h.by){h.by=1;if(!SKIP)ft(o.x,o.y-h.r0-40,'빠브~','#ffffff',26)}
  if(u>=4.6){o.r=h.r0;return false}return true};
HZP.gbul=h=>{const u=h.u;if(!(u>=0))return;const o=h.o;h.B.forEach(b=>{const a=u-b.t0;g.save();g.globalAlpha=.6*(1-a/.8);g.strokeStyle='#d8f0ff';g.lineWidth=1.5;g.beginPath();g.arc(b.x,b.y-a*50,b.s,0,TAU);g.stroke();g.restore()});
  if(u>=.6&&u<4.55){const k=Math.min(1,(u-.6)/.25),fo=u>4.2?Math.max(0,1-(u-4.2)/.3):1;gbFish(o.x,o.y,h.a,h.R*1.08*(.6+.4*k),fo*k,h.mo)}
  if(u<1.2)ytTxt('하브~!',o.x,o.y-h.R-46,30,GBY,Math.min(1,u/.1)*(u>1?(1.2-u)/.2:1));
  ytCut('yt_gamb',u,'피드 앤 그로우','하브~!',GBY)};
EMB.gbr=(f,D)=>{g.rotate(-f.rot);neon({col:GBY,hi:'#fff6c8'},1.4,()=>{g.beginPath();g.moveTo(-14,-6);g.quadraticCurveTo(0,-10,14,-6);g.quadraticCurveTo(18,8,10,9);g.quadraticCurveTo(6,3,0,3);g.quadraticCurveTo(-6,3,-10,9);g.quadraticCurveTo(-18,8,-14,-6);g.moveTo(-9,-3);g.lineTo(-9,2);g.moveTo(-11.5,-.5);g.lineTo(-6.5,-.5)});
  neon({col:'#ff4d6d',hi:'#ffd0d8'},1.2,()=>{g.beginPath();g.arc(7,-2,1.5,0,TAU);g.moveTo(11,1.5);g.arc(10,1.5,1.2,0,TAU)})};

// ======================================================================
// 김티비 • 침착맨 (침투부 · 오히려 좋아 · 킹받네)
// 패시브 오히려 좋아 : 5 이상 맞으면 "오히려 좋아" → 4초 동안 주는 피해 +25% · 체력 +2 (6초에 한 번)
// 1) 킹받네 : 세모입 모양 세모 세 개를 부채꼴로 · 맞을 때마다 킹받음 쌓임 → 3번 쌓이면 "킹받아서 폭발!" (기절)
// 2) 이말년 그림체 : 펜이 엉성한 졸라맨 병사 넷을 쓱쓱 그림 → "돌격!" 하고 달려감
// 3) ULT 최고민수 초대석 : 주식 차트가 떡상 → "최고민수야 고맙다! -60%가 됐어!" → 거대한 빨간 화살표가 내리꽂힘
// ======================================================================
const CMC='#9fb4c8',CMR='#ff3a3a';
ytS(['cm_tri','cm_mad','cm_burst','cm_pen','cm_march','cm_chart','cm_crash','cm_ok'],['침착맨 · 세모입','침착맨 · 킹받음','침착맨 · 킹받아서 폭발','침착맨 · 펜으로 쓱쓱','침착맨 · 졸라맨 돌격','침착맨 · 떡상','침착맨 · 떡락','침착맨 · 오히려 좋아']);
const CMSK=[
  {n:'킹받네',w:.25,cd:6.5,c:(o,t)=>!t.hid&&dist(o,t)<520,f:(o,t)=>cmTri(o,t)},
  {n:'이말년 그림체',w:.3,cd:10,c:(o,t)=>!t.hid&&dist(o,t)<600,f:(o,t)=>cmDood(o,t)},
  {n:'최고민수 초대석',w:.4,ult:1,c:(o,t)=>!t.hid,f:(o,t)=>cmUlt(o,t)}];
const CMI=DEF.findIndex(d=>d.name=='김티비');
DEF.push({name:'김티비 • 침착맨',gl:'침',k:'chm',vof:CMI,r:26,sp:206,col:CMC,hi:'#ffffff',dk:'#1a2230',alt:{col:'#ffd23a',hi:'#fff6d0',dk:'#2a2000'},alt2:{col:CMR,hi:'#ffe0e0',dk:'#2a0606'},sk:CMSK});
INFO['김티비 • 침착맨']={st:[8,9,7,8,8,10],p:'오히려 좋아 · 5 이상 맞으면 "오히려 좋아" → 4초 동안 주는 피해 +25% · 체력 +2 (6초에 한 번)',
  sk:[['1.5×3+5','세모입 모양 세모 세 개를 부채꼴로 · 맞을 때마다 킹받음이 쌓여서 3번 쌓이면 "킹받아서 폭발!" (5 · 잠깐 기절)'],['2.2×4','펜이 엉성한 졸라맨 병사 넷을 쓱쓱 그림 → "돌격!" 하고 상대에게 달려감'],['3+10','최고민수 초대석 · 주식 차트가 떡상 → "최고민수야 고맙다! -60%가 됐어!" → 거대한 빨간 화살표가 내리꽂힘 (2초 동안 느려짐)']]};
YTPOP.chm=()=>'yt_chim';
// ---------- 패시브 : 오히려 좋아 ----------
const _hurtCM=hurt;hurt=function(t,n,o){if(o&&o.cmBuf>0&&t!=o&&n>0){const a=[...arguments];a[1]=Math.round(n*1.25*10)/10;arguments[1]=a[1];n=a[1]}
  const hp0=t&&t.hp,r=_hurtCM.apply(this,arguments);if(t&&t.d&&t.d.k=='chm'&&o&&o!=t&&!t.dead&&hp0-t.hp>=5&&!(t.cmCd>0)&&phase=='play'){t.cmCd=6;t.cmBuf=4;t.hp=Math.min(100,t.hp+2);if(!SKIP){SFXa('cm_ok');ft(t.x,t.y-t.r-32,'오히려 좋아','#ffe14a',22)}}return r};
// 킹받음 표시 (빨간 화난 표시)
function cmMad(x,y,s,al){if(!(al>0))return;g.save();g.globalAlpha=Math.min(1,al);g.translate(x,y);g.scale(s,s);g.strokeStyle=CMR;g.lineWidth=2.6;g.lineCap='round';[0,1,2,3].forEach(i=>{g.save();g.rotate(i*Math.PI/2+.78);g.beginPath();g.moveTo(2.5,-4.5);g.quadraticCurveTo(2.5,-2.5,4.5,-2.5);g.stroke();g.restore()});g.restore()}
// ---------- 1) 킹받네 ----------
function cmTri(o,t){const a0=ang(o,t);HZ.push({k:'cmtr',o,tg:t,t:0,P:[-.26,0,.26].map(d=>({x:o.x,y:o.y,vx:Math.cos(a0+d)*480,vy:Math.sin(a0+d)*480,r:0}))});SFXa('cm_tri');if(!SKIP)ft(o.x,o.y-o.r-32,'킹받네~','#ffffff',20)}
HZX.cmtr=(h,dt,EN)=>{let any=0;h.P.forEach(p=>{if(p.dn)return;any=1;p.x+=p.vx*dt;p.y+=p.vy*dt;p.r+=dt*12;if(p.x<-20||p.x>A+20||p.y<-20||p.y>A+20||h.t>1.3){p.dn=1;return}
  for(const x of EN){if(x.hid||x.jump)continue;if(Math.hypot(x.x-p.x,x.y-p.y)<x.r+12){p.dn=1;x.cmK=(x.cmK||0)+1;x.cmKt=8;hurt(x,1.5,h.o,p.x,p.y,0,0);if(x.cmK>=3&&!x.dead){x.cmK=0;hurt(x,5,h.o,x.x,x.y,0,1);x.stn=Math.max(x.stn||0,.5);x.cast=null;SFXa('cm_burst');shake=Math.max(shake,12);if(!SKIP){ft(x.x,x.y-x.r-34,'킹받아서 폭발!','#ff5a5a',22);ring(x.x,x.y,x.r,x.r+70,CMR,7,.4)}}else{SFXa('cm_mad')}break}}});return any};
HZP.cmtr=h=>{h.P.forEach(p=>{if(p.dn)return;g.save();g.translate(p.x,p.y);g.rotate(p.r);g.fillStyle='#ffffff';g.strokeStyle='#000';g.lineWidth=3;g.lineJoin='round';g.beginPath();g.moveTo(0,-13);g.lineTo(12,9);g.lineTo(-12,9);g.closePath();g.fill();g.stroke();g.fillStyle='#d8484a';g.beginPath();g.moveTo(0,-5);g.lineTo(5,4);g.lineTo(-5,4);g.closePath();g.fill();g.restore()})};
// ---------- 2) 이말년 그림체 ----------
function cmStick(x,y,s,a,pr,run,al,face){if(!(al>0))return;g.save();g.globalAlpha=Math.min(1,al);g.translate(x,y);g.scale(s*(face<0?-1:1),s);g.strokeStyle='#111';g.lineWidth=3;g.lineCap='round';g.lineJoin='round';const jt=()=>rnd(-.6,.6);
  const seg=(k,f)=>{if(pr>k)f(Math.min(1,(pr-k)/.2))};const lg=Math.sin(run*14)*7;
  seg(0,q=>{g.fillStyle='#fff';g.beginPath();g.arc(0+jt(),-22,8,0,TAU*q);g.fill();g.stroke()});
  seg(.2,q=>{g.beginPath();g.moveTo(0,-14);g.lineTo(jt(),-14+14*q);g.stroke()});
  seg(.4,q=>{g.beginPath();g.moveTo(0,0);g.lineTo(-6-lg*.5,13*q);g.moveTo(0,0);g.lineTo(6+lg*.5,13*q);g.stroke()});
  seg(.6,q=>{g.beginPath();g.moveTo(0,-10);g.lineTo(9*q,-6-lg*.3);g.moveTo(0,-10);g.lineTo(-8*q,-4);g.stroke();g.lineWidth=2;g.beginPath();g.moveTo(9,-6-lg*.3);g.lineTo(9+18*q,-14-lg*.3);g.stroke()});
  seg(.8,q=>{g.lineWidth=2;g.beginPath();g.moveTo(-3,-24);g.lineTo(-1,-23);g.moveTo(3,-24);g.lineTo(5,-23);g.stroke();g.beginPath();g.moveTo(-2,-18);g.lineTo(2,-19);g.lineTo(4,-18);g.stroke()});g.restore()}
function cmDood(o,t){const a=ang(o,t),px=-Math.sin(a),py=Math.cos(a);HZ.push({k:'cmdd',o,tg:t,t:0,S:[-1.5,-.5,.5,1.5].map((q,i)=>({x:clamp(o.x+px*q*44-Math.cos(a)*20,20,A-20),y:clamp(o.y+py*q*44-Math.sin(a)*20,20,A-20),t0:i*.14,sp:rnd(290,340)}))});SFXa('cm_pen')}
HZX.cmdd=(h,dt,EN)=>{const e=h.tg;if(h.t>=.85&&!h.go){h.go=1;SFXa('cm_march');if(!SKIP)ft(h.o.x,h.o.y-h.o.r-32,'돌격!','#ffffff',22)}let any=h.t<.85;
  h.S.forEach(s=>{if(s.dn)return;any=1;if(h.t<.85)return;if(ytLive(e)){const a=Math.atan2(e.y-s.y,e.x-s.x);s.face=Math.cos(a)<0?-1:1;s.x+=Math.cos(a)*s.sp*dt;s.y+=Math.sin(a)*s.sp*dt}else{s.x+=s.face*s.sp*dt}
    if(h.t>2.9){s.dn=1;return}for(const x of EN){if(x.hid||x.jump)continue;if(Math.hypot(x.x-s.x,x.y-s.y)<x.r+12){s.dn=1;s.px=s.x;s.py=s.y;s.pt=h.t;hurt(x,2.2,h.o,s.x,s.y,0,0);if(!SKIP){SFXa('cm_mad');for(let k=0;k<6;k++)sparkP(s.x,s.y,rnd(-150,150),rnd(-150,150),'#111',2)}break}}});return any||h.S.some(s=>s.pt&&h.t-s.pt<.3)};
HZP.cmdd=h=>{h.S.forEach(s=>{if(s.dn){if(s.pt&&h.t-s.pt<.3){const k=(h.t-s.pt)/.3;g.save();g.globalAlpha=1-k;g.strokeStyle='#111';g.lineWidth=2;g.beginPath();for(let i=0;i<10;i++){const a=i*2.4;g.lineTo(s.px+Math.cos(a)*(6+k*16)+rnd(-2,2),s.py+Math.sin(a)*(6+k*16))}g.stroke();g.restore()}return}
  const pr=h.t<.85?Math.max(0,(h.t-s.t0)/.55):1.2;cmStick(s.x,s.y,1.55,0,pr,h.t>=.85?h.t:0,1,s.face||1);
  if(h.t<.85&&pr>0&&pr<1){const tip=[[0,-22],[0,-6],[6,13],[22,-14],[4,-18]][Math.min(4,Math.floor(pr*5))];g.save();g.translate(s.x+tip[0]*1.55,s.y+tip[1]*1.55);g.rotate(-.6);g.fillStyle='#222';g.fillRect(-2,-22,4,20);g.fillStyle='#ffd23a';g.fillRect(-2,-26,4,4);g.restore()}})};
// ---------- 3) ULT 최고민수 초대석 ----------
function cmUlt(o,t){if(!t||t.dead)t=tgt(o);if(!t)return;HZ.push({k:'cmul',o,tg:t,t:0,hit:new Set()})}
HZX.cmul=(h,dt,EN)=>{const o=h.o,u=h.t-YTDL;h.u=u;if(u<0)return true;const e=h.tg,live=ytLive(e);if(!h.lk){h.lk=1;SFXa('cm_chart')}if(!o.dead){o.gcd=Math.max(o.gcd,.4);o.cast=null}
  if(live&&u<3.35){h.ex=e.x;h.ey=e.y}else if(h.ex==null){h.ex=A/2;h.ey=A/2}
  if(u>=1.55&&!h.up){h.up=1;ytHitL(EN,h.hit,'u',h.ex,h.ey,60,3,o,0,x=>{x.stn=Math.max(x.stn||0,.35);x.cast=null});if(!SKIP)ft(h.ex,h.ey-60,'떡상!','#4dff7a',26)}
  if(u>=1.95&&!h.vo){h.vo=1;SFXa('yt_cm60')}
  if(live&&u>=2.2&&u<3.35)e.slow=Math.max(e.slow||0,.4);
  if(u>=3.0&&!h.cr){h.cr=1;SFXa('cm_crash')}
  if(u>=3.45&&!h.im){h.im=1;shake=Math.max(shake,24);hs=.12;ytHitL(EN,h.hit,'d',h.ex,h.ey,70,10,o,1,x=>{x.slow=Math.max(x.slow||0,2)});if(!SKIP){lkImp(h.ex,h.ey,150,CMR);ring(h.ex,h.ey,10,140,CMR,10,.45)}}
  return u<4.55};
HZD.cmul=h=>{const u=h.u;if(!(u>=0))return;const fa=u<4.25?Math.min(1,u/.35):Math.max(0,1-(u-4.25)/.3);lkDim(.6*fa)};
function cmChartY(x){return x<.55?1-x/.55*.85:.15+Math.pow((x-.55)/.45,1.6)*1.05}
HZP.cmul=h=>{const u=h.u;if(!(u>=0)||h.ex==null)return;const fa=u<4.25?Math.min(1,(u-.8)/.3):Math.max(0,1-(u-4.25)/.3);
  if(u>=.8&&fa>0){const X=40,Y=60,W=A-80,H=210;g.save();g.globalAlpha=fa*.92;g.fillStyle='#0c1018';g.fillRect(X,Y,W,H);g.strokeStyle='#2a3448';g.lineWidth=1;for(let i=1;i<6;i++){g.beginPath();g.moveTo(X+W*i/6,Y);g.lineTo(X+W*i/6,Y+H);g.stroke()}for(let i=1;i<4;i++){g.beginPath();g.moveTo(X,Y+H*i/4);g.lineTo(X+W,Y+H*i/4);g.stroke()}
    g.strokeStyle='#ffffff';g.lineWidth=2;g.strokeRect(X,Y,W,H);g.restore();ytTxt('최고민수 초대석',X+W/2,Y-2,22,'#ffffff',fa,0,'#1a2230');
    const pr=u<1.1?0:u<1.6?(u-1.1)/.5*.55:u<3.0?.55:u<3.4?.55+(u-3)/.4*.45:1;g.save();g.globalAlpha=fa;g.lineWidth=5;g.lineJoin='round';
    const N=40;let lx=0,ly=0;for(let i=0;i<=N;i++){const x=i/N;if(x>pr)break;const yy=cmChartY(x)+Math.sin(i*1.7)*.03,px=X+12+x*(W-24),py=Y+12+yy*(H-24)*.82;if(i){g.strokeStyle=x<.55?'#2ee66a':'#ff3a3a';g.beginPath();g.moveTo(lx,ly);g.lineTo(px,py);g.stroke()}lx=px;ly=py}g.restore();
    if(u>=1.5&&u<3.0)ytTxt('▲ 떡상',X+W*.5,Y+40,24,'#2ee66a',fa);if(u>=3.25)ytTxt('-60%',X+W*.78,Y+H*.62,54,CMR,fa*Math.min(1,(u-3.25)/.1),-.08)}
  // 떡상 화살표 (아래에서 위로)
  if(u>=1.25&&u<1.9){const k=Math.min(1,(u-1.25)/.3),fo=u>1.7?Math.max(0,1-(u-1.7)/.2):1;g.save();g.globalAlpha=fo;g.fillStyle='#2ee66a';g.translate(h.ex,h.ey+40-k*60);g.beginPath();g.moveTo(0,-46);g.lineTo(30,-6);g.lineTo(12,-6);g.lineTo(12,40);g.lineTo(-12,40);g.lineTo(-12,-6);g.lineTo(-30,-6);g.closePath();g.fill();g.restore()}
  // 떡락 화살표 (위에서 내리꽂음)
  if(u>=3.0&&u<4.1){const k=Math.min(1,(u-3.0)/.45),fo=u>3.7?Math.max(0,1-(u-3.7)/.4):1,y=h.ey-(1-k*k)*480-30;g.save();g.globalAlpha=fo;if(k<1){g.globalAlpha=.3*k*fo;g.fillStyle='#000';g.beginPath();g.ellipse(h.ex,h.ey+10,60*k,20*k,0,0,TAU);g.fill();g.globalAlpha=fo}
    g.translate(h.ex,y);g.fillStyle=CMR;g.strokeStyle='#fff';g.lineWidth=4;g.beginPath();g.moveTo(0,40);g.lineTo(48,-12);g.lineTo(20,-12);g.lineTo(20,-90);g.lineTo(-20,-90);g.lineTo(-20,-12);g.lineTo(-48,-12);g.closePath();g.fill();g.stroke();g.restore()}
  if(u>=1.95&&u<3.4)ytTxt('"최고민수야 고맙다!"',A/2,A-70,24,'#ffffff',Math.min(1,(u-1.95)/.1)*(u>3.2?(3.4-u)/.2:1),0,'#1a2230');
  ytCut('yt_chim',u,'초대석','오히려 좋아',CMC)};
EMB.chm=(f,D)=>{g.rotate(-f.rot);neon({col:'#ffffff',hi:'#ffffff'},1.4,()=>{g.beginPath();g.moveTo(0,-3);g.lineTo(8,9);g.lineTo(-8,9);g.closePath();g.moveTo(-10,-10);g.lineTo(-4,-8);g.moveTo(10,-10);g.lineTo(4,-8)});neon({col:CMR,hi:'#ffd0d0'},1,()=>{g.beginPath();g.moveTo(0,2);g.lineTo(3.5,7);g.lineTo(-3.5,7);g.closePath()})};

// ======================================================================
// 김가은 • 감스트 (피파 대통령 · 관제탑 댄스 · 고오오올!)
// 패시브 피파 대통령 : 6초마다 축구공을 하나 차서 벽에 튕기며 상대를 노림
// 1) 슈퍼 슈팅 : 불붙은 바나나킥 · 벽에 세 번까지 튕기며 상대를 쫓아감
// 2) 관제탑 댄스 : 손을 위아래로 흔들 때마다 상대 위치에 신호 빔이 십자로 교차 · 네 박자
// 3) ULT 이게 뭐야?! : 중계 화면에서 실점 → "이게 뭐야! 이게 뭐야! 이게 뭐야!" 글자가 세 번 내리꽂힘 → 마지막에 책상 쾅!
// ======================================================================
const GMR='#d42a4a',GMB='#1f4fc8';
function gmBall(x,y,r,rot,al){if(!(al>0))return;g.save();g.globalAlpha=Math.min(1,al);g.translate(x,y);g.rotate(rot||0);g.fillStyle='#ffffff';g.beginPath();g.arc(0,0,r,0,TAU);g.fill();g.strokeStyle='#111';g.lineWidth=1.4;g.stroke();g.fillStyle='#111';
  const pg=(cx,cy,s)=>{g.beginPath();for(let i=0;i<5;i++){const a=-Math.PI/2+i*TAU/5;g.lineTo(cx+Math.cos(a)*s,cy+Math.sin(a)*s)}g.closePath();g.fill()};pg(0,0,r*.36);for(let i=0;i<5;i++){const a=-Math.PI/2+i*TAU/5;g.save();g.beginPath();g.arc(0,0,r,0,TAU);g.clip();pg(Math.cos(a)*r*.92,Math.sin(a)*r*.92,r*.3);g.restore()}g.restore()}
ytS(['gm_kick','gm_bounce','gm_whistle','gm_crowd','gm_beam','gm_slam'],['감스트 · 슈팅','감스트 · 공 튕김','감스트 · 휘슬','감스트 · 관중 탄식','감스트 · 관제탑 신호','감스트 · 책상 쾅']);
const GAMSK=[
  {n:'슈퍼 슈팅',w:.25,cd:6.5,c:(o,t)=>!t.hid&&dist(o,t)<600,f:(o,t)=>gmShot(o,t,3.2,1)},
  {n:'관제탑 댄스',w:.3,cd:10,c:(o,t)=>!t.hid&&dist(o,t)<600,f:(o,t)=>gmDance(o,t)},
  {n:'이게 뭐야?!',w:.4,ult:1,c:(o,t)=>!t.hid,f:(o,t)=>gamUlt(o,t)}];
const GAMI=DEF.findIndex(d=>d.name=='김가은');
DEF.push({name:'김가은 • 감스트',gl:'감',k:'gms',vof:GAMI,r:27,sp:204,col:GMR,hi:'#ffffff',dk:'#0a1a4a',alt:{col:GMB,hi:'#e0e8ff',dk:'#020a2a'},alt2:{col:'#2fd66a',hi:'#e0ffe8',dk:'#04200c'},sk:GAMSK});
INFO['김가은 • 감스트']={st:[8,8,8,9,8,10],p:'피파 대통령 · 6초마다 축구공을 하나 차서 벽에 튕기며 상대를 노림 (1.8)',
  sk:[['3.2','불붙은 바나나킥 · 휘어져 날아가다 벽에 세 번까지 튕기며 상대를 쫓아감'],['1.8×8','관제탑 댄스 · 손을 위아래로 흔들 때마다 상대가 있던 자리에 신호 빔이 십자로 교차 (네 박자)'],['3.2×3+5.5','중계 화면에서 실점 → "이게 뭐야! 이게 뭐야! 이게 뭐야!" 글자가 세 번 내리꽂힘 (맞을 때마다 잠깐 멈춤) → 마지막에 책상 쾅!']]};
YTPOP.gms=(f,s)=>s.ult?'yt_gamst3':s.n=='관제탑 댄스'?'yt_gamst2':'yt_gamst';
// ---------- 공 (슈퍼 슈팅 · 패시브) ----------
function gmShot(o,t,dmg,fire,nb){const a=ang(o,t),cv=(Math.random()<.5?-1:1)*(fire?1.1:.5);HZ.push({k:'gmsh',o,tg:t,t:0,x:o.x+Math.cos(a)*o.r,y:o.y+Math.sin(a)*o.r,a:a-cv*.35,cv,sp:fire?660:520,b:fire?3:1,dmg,fire,rot:0,tr:[]});SFXa('gm_kick')}
HZX.gmsh=(h,dt,EN)=>{if(h.dn)return h.t-h.dn<.3;const e=h.tg;h.a+=h.cv*dt;if(ytLive(e)&&h.t>.25){const d=Math.atan2(e.y-h.y,e.x-h.x);let df=d-h.a;while(df>Math.PI)df-=TAU;while(df<-Math.PI)df+=TAU;h.a+=clamp(df,-1.6*dt,1.6*dt)}
  h.x+=Math.cos(h.a)*h.sp*dt;h.y+=Math.sin(h.a)*h.sp*dt;h.rot+=dt*18;h.tr.push({x:h.x,y:h.y});if(h.tr.length>12)h.tr.shift();
  const m=10;let b=0;if(h.x<m||h.x>A-m){h.a=Math.PI-h.a;h.x=clamp(h.x,m,A-m);b=1}if(h.y<m||h.y>A-m){h.a=-h.a;h.y=clamp(h.y,m,A-m);b=1}if(b){h.b--;h.cv*=-.6;if(!SKIP)SFXa('gm_bounce');if(h.b<0){h.dn=h.t;return true}}
  for(const x of EN){if(x.hid||x.jump)continue;if(Math.hypot(x.x-h.x,x.y-h.y)<x.r+10){hurt(x,h.dmg,h.o,h.x,h.y,0,h.fire?1:0);safePush(x,h.a,h.fire?50:24);h.dn=h.t;if(!SKIP){SFXa('gm_bounce');ring(h.x,h.y,6,50,'#ffffff',4,.3)}return true}}return h.t<2.4};
HZP.gmsh=h=>{const fo=h.dn?Math.max(0,1-(h.t-h.dn)/.3):1;if(h.fire)h.tr.forEach((p,i)=>{const k=i/h.tr.length;g.save();g.globalCompositeOperation='lighter';glow(i%2?'#ff7a1a':'#ffd23a',p.x,p.y,6+10*k,.5*k*fo);g.restore()});gmBall(h.x,h.y,h.fire?11:9,h.rot,fo)};
// ---------- 패시브 : 피파 대통령 (update 에서) ----------
// ---------- 2) 관제탑 댄스 ----------
function gmHand(x,y,s,a,al){if(!(al>0))return;g.save();g.globalAlpha=Math.min(1,al);g.translate(x,y);g.rotate(a);g.scale(s,s);g.fillStyle='#ffe0c8';g.strokeStyle='#5a3020';g.lineWidth=1.6;
  [[-6,-14],[-2,-17],[2,-17],[6,-14]].forEach(([fx,fy])=>{g.beginPath();g.ellipse(fx,fy+5,2.2,6,0,0,TAU);g.fill();g.stroke()});g.beginPath();g.ellipse(-9,0,2.4,5.5,-.8,0,TAU);g.fill();g.stroke();g.beginPath();g.ellipse(0,0,8,8,0,0,TAU);g.fill();g.stroke();g.restore()}
function gmDance(o,t){HZ.push({k:'gmdn',o,tg:t,t:0,B:[],nb:0,hit:new Set()});if(!SKIP)ft(o.x,o.y-o.r-36,'관제탑!','#ffffff',22)}
HZX.gmdn=(h,dt,EN)=>{const o=h.o,e=h.tg;if(o.dead)return false;[.25,.6,.95,1.3].forEach((b,i)=>{if(h.t>=b&&h.nb<=i){h.nb=i+1;h.B.push({x:ytLive(e)?e.x:A/2,y:ytLive(e)?e.y:A/2,t0:h.t,d:i%2?Math.PI/4:0,i});SFXa('gm_beam')}});
  h.B.forEach(b=>{const a=h.t-b.t0;if(a>=.28&&!b.f){b.f=1;shake=Math.max(shake,5);EN.forEach(x=>{if(x.hid||x.jump)return;for(let q=0;q<2;q++){const an=b.d+q*Math.PI/2,dx=x.x-b.x,dy=x.y-b.y,pe=Math.abs(-dx*Math.sin(an)+dy*Math.cos(an));if(pe<x.r+14){hurt(x,1.8,o,x.x,x.y,0,0);break}}})}});return h.t<1.95};
HZD.gmdn=h=>{h.B.forEach(b=>{const a=h.t-b.t0;if(a>=.28)return;g.save();g.globalAlpha=.55*Math.min(1,a/.1);g.strokeStyle=b.i%2?GMB:GMR;g.lineWidth=2;g.setLineDash([10,8]);g.translate(b.x,b.y);for(let q=0;q<2;q++){g.save();g.rotate(b.d+q*Math.PI/2);g.beginPath();g.moveTo(-A*1.5,0);g.lineTo(A*1.5,0);g.stroke();g.restore()}g.setLineDash([]);g.restore()})};
HZP.gmdn=h=>{const o=h.o;h.B.forEach(b=>{const a=h.t-b.t0;if(a<.28||a>.6)return;const k=(a-.28)/.32,w=16*(1-k);g.save();g.translate(b.x,b.y);g.globalCompositeOperation='lighter';for(let q=0;q<2;q++){g.save();g.rotate(b.d+q*Math.PI/2);g.globalAlpha=.6*(1-k);g.fillStyle=b.i%2?GMB:GMR;g.fillRect(-A*1.5,-w,A*3,w*2);g.globalAlpha=1-k;g.fillStyle='#fff';g.fillRect(-A*1.5,-w*.3,A*3,w*.6);g.restore()}g.restore()});
  if(h.t<1.8&&!o.dead){const ph=h.t*Math.PI*2/.7,up=Math.sin(ph);gmHand(o.x-o.r-8,o.y-6-up*20,1.3,-.3,1);gmHand(o.x+o.r+8,o.y-6+up*20,1.3,.3,1)}};
// ---------- 3) ULT 이게 뭐야?! ----------
const GMWT=[.55,1.25,2.0];
function gamUlt(o,t){if(!t||t.dead)t=tgt(o);if(!t)return;HZ.push({k:'gamul',o,tg:t,t:0,hit:new Set(),nw:0,W:[]})}
HZX.gamul=(h,dt,EN)=>{const o=h.o,u=h.t-YTDL;h.u=u;if(u<0)return true;const e=h.tg,live=ytLive(e);if(!h.lk){h.lk=1;SFXa('gm_whistle')}if(!o.dead){o.gcd=Math.max(o.gcd,.4);o.cast=null}
  if(live&&u<3.75){h.ex=e.x;h.ey=e.y}else if(h.ex==null){h.ex=A/2;h.ey=A/2}
  if(u>=1.25&&!h.gl){h.gl=1;SFXa('gm_crowd')}
  if(u>=1.4&&!h.vo){h.vo=1;SFXa('yt_gamwhat')}
  if(live&&u>=1.4&&u<3.75)e.slow=Math.max(e.slow||0,.35);
  GMWT.forEach((c,i)=>{const tt=1.4+c;if(u>=tt&&h.nw<=i){h.nw=i+1;h.W.push({x:h.ex,y:h.ey,t0:u,i});SFXa('uz_slam');shake=Math.max(shake,14);hs=.06;ytHitL(EN,h.hit,'w'+i,h.ex,h.ey,70,3.2,o,0,x=>{x.stn=Math.max(x.stn||0,.25);x.cast=null});if(!SKIP)ring(h.ex,h.ey,20,110,i%2?GMB:GMR,7,.35)}});
  if(u>=3.75&&!h.sl){h.sl=1;h.sx=h.ex;h.sy=h.ey}
  if(u>=4.0&&!h.im){h.im=1;SFXa('gm_slam');shake=Math.max(shake,26);hs=.13;ytHitL(EN,h.hit,'s',h.sx,h.sy,85,5.5,o,1,x=>safePush(x,o.dead?rnd(0,TAU):ang(o,x),80));if(!SKIP){lkImp(h.sx,h.sy,160,GMR);ytCube(h.sx,h.sy,['#8a5a30','#5a3a1e','#ffffff'],20,320)}}
  return u<4.65};
HZD.gamul=h=>{const u=h.u;if(!(u>=0))return;const fa=u<4.35?Math.min(1,u/.4):Math.max(0,1-(u-4.35)/.3);lkDim(.55*fa)};
HZP.gamul=h=>{const u=h.u;if(!(u>=0)||h.ex==null)return;const fa=u<4.35?1:Math.max(0,1-(u-4.35)/.3);
  // 중계 화면 : 실점
  if(u>=.85&&u<2.2){const k=Math.min(1,(u-.85)/.2)*(u>1.95?(2.2-u)/.25:1),X=A/2-120,Y=56,W=240,H=140;g.save();g.globalAlpha=k;g.fillStyle='#111';g.fillRect(X-8,Y-8,W+16,H+16);g.fillStyle='#2a8a3a';g.fillRect(X,Y,W,H);g.strokeStyle='#fff';g.lineWidth=2;g.strokeRect(X+6,Y+6,W-12,H-12);g.beginPath();g.moveTo(X+W/2,Y+6);g.lineTo(X+W/2,Y+H-6);g.stroke();g.strokeRect(X+W-40,Y+H/2-28,34,56);
    const bk=Math.min(1,Math.max(0,(u-1)/.35));gmBall(X+W*.3+bk*(W*.62),Y+H*.55-bk*8,7,u*20,1);ytTxt('LIVE',X+26,Y+16,12,'#fff',1,0,YTR);g.restore();if(u>=1.35)ytTxt('실점…',A/2,Y+H+28,26,'#ff5a5a',k,0,'#000')}
  // 이게 뭐야! ×3
  h.W.forEach(w=>{const a=u-w.t0;if(a>1.4)return;const fo=a>1.1?(1.4-a)/.3:1,sc=a<.08?1.5-a/.08*.5:1;ytTxt('이게 뭐야!',w.x,w.y-60-w.i*8,44*sc,w.i%2?'#ffe14a':'#ffffff',fo*fa,(w.i-1)*.12,GMR)});
  GMWT.forEach((c,i)=>{const tt=1.4+c,a=u-(tt-.18);if(a<0||a>=.18||h.nw>i)return;const k=a/.18;ytTxt('이게 뭐야!',h.ex,h.ey-60-(1-k)*300,44,'#ffffff',k,(i-1)*.12,GMR)});
  // 화난 감스트
  if(u>=1.35&&u<3.9){const k=Math.min(1,(u-1.35)/.2),fo=u>3.7?(3.9-u)/.2:1;ytDraw('yt_gamst3',A*.17+Math.sin(u*45)*5,A-10,190*k,fo,0,0,Math.sin(u*30)*.06)}
  // 책상 쾅
  if(u>=3.75&&u<4.65){const k=Math.min(1,(u-3.75)/.25),y=h.sy+70-(1-k*k)*420;if(u<4)ytTxt('책상 쾅!',A/2,A*.18,48,'#ffffff',k,0,GMR);ytDraw('yt_gamst3',h.sx,y,200,u>4.35?(4.65-u)/.3:1,0,0,(1-k)*.3);if(u>=4)ytTxt('쾅!!',A/2,A*.18,64,'#ffe14a',u>4.35?(4.65-u)/.3:1,-.05,GMR)}
  ytCut('yt_gamst3',u,'이게 뭐야?!','북중미 월드컵 남아공전',GMR)};
EMB.gms=(f,D)=>{g.rotate(-f.rot);neon({col:'#ffffff',hi:'#ffffff'},1.3,()=>{g.beginPath();g.arc(0,0,12,0,TAU);for(let i=0;i<5;i++){const a=-Math.PI/2+i*TAU/5;g.moveTo(Math.cos(a)*4.5,Math.sin(a)*4.5);g.lineTo(Math.cos(a)*12,Math.sin(a)*12)}g.moveTo(4.5,0);for(let i=0;i<=5;i++){const a=-Math.PI/2+i*TAU/5;g.lineTo(Math.cos(a)*4.5,Math.sin(a)*4.5)}})};

// ======================================================================
// 김지우 • 우주하마 (물뚱땡 · 그림판 · 우!주!하!마!)
// 패시브 물뚱땡 : 8초마다 물을 벌컥벌컥 마시고 체력 +3
// 1) 흔들어 제끼라우! : 승리 쌈바 · 엉덩이를 흔들 때마다 ")) ((" 가 상대에게 날아감
// 2) 앞니 콱! : 상대 옆에 파란 하마 얼굴이 튀어나와 앞니 두 개로 콱
// 3) ULT 우!주!하!마! : 우주로 → 3 · 2 · 1 → "우! 주! 하! 마!" 한 글자씩 내리꽂힘 → "따!!" 거대한 하마가 우주에서 쿵 → 행복마이 댄스파티!
// ======================================================================
const UZB='#6b93c4',UZP=['#ff2a2a','#ffe600','#22e04a','#1e90ff','#ff38d6','#ff8c00'];
ytS(['uz_shake','uz_bite','uz_drink','uz_count','uz_slam','uz_space','uz_samba','uz_fall'],['우주하마 · 흔들어 제끼라우','우주하마 · 앞니 콱','우주하마 · 물 벌컥','우주하마 · 카운트다운','우주하마 · 글자 쿵','우주하마 · 우주로','우주하마 · 흔들어 제끼라우','우주하마 · 거대 하마 쿵']);
const UZSK=[
  {n:'흔들어 제끼라우!',w:.25,cd:8,c:(o,t)=>!t.hid&&dist(o,t)<560,f:(o,t)=>uzShake(o,t)},
  {n:'앞니 콱!',w:.25,cd:7,c:(o,t)=>!t.hid&&dist(o,t)<600,f:(o,t)=>uzBite(o,t)},
  {n:'우!주!하!마!',w:.4,ult:1,c:(o,t)=>!t.hid,f:(o,t)=>uzUlt(o,t)}];
const UZI=DEF.findIndex(d=>d.name=='김지우');
DEF.push({name:'김지우 • 우주하마',gl:'하',k:'uzh',vof:UZI,r:28,sp:200,col:UZB,hi:'#ffffff',dk:'#141a2a',alt:{col:'#a46bff',hi:'#efe4ff',dk:'#14082a'},alt2:{col:'#ff8c3a',hi:'#ffe8d6',dk:'#2a1004'},sk:UZSK});
INFO['김지우 • 우주하마']={st:[8,9,7,8,8,10],p:'물뚱땡 · 8초마다 물을 벌컥벌컥 마시고 체력 +3',
  sk:[['0.95×8','"흔들어 제끼라우!" 승리 쌈바 · 엉덩이를 흔들 때마다 ")) ((" 가 상대에게 날아감'],['7','상대 옆에 파란 하마 얼굴이 불쑥 튀어나와 앞니 두 개로 콱!'],['1.8×4+7','우주로 → 3 · 2 · 1 → "우! 주! 하! 마!" 한 글자씩 내리꽂힘 → "따!!" 거대한 하마가 우주에서 쿵 → 행복마이 댄스파티!']]};
YTPOP.uzh=()=>'yt_uzu';
// ---------- 1) 흔들어 제끼라우! ----------
function uzShake(o,t){HZ.push({k:'uzsh',o,tg:t,t:0,P:[],n:0});SFXa('uz_shake');setTimeout(()=>{try{SFXa('uz_samba')}catch(x){}},150);if(!SKIP)ft(o.x,o.y-o.r-36,'흔들어 제끼라우!','#ffe600',22)}
HZX.uzsh=(h,dt,EN)=>{const o=h.o,e=h.tg;while(h.n<8&&h.t>=.2+h.n*.2&&!o.dead){const i=h.n++,a=(ytLive(e)?ang(o,e):rnd(0,TAU))+(i%2?.18:-.18);h.P.push({x:o.x,y:o.y,a,c:i%2?'((':'))',col:UZP[i%UZP.length],t0:h.t})}
  let any=h.n<8&&!o.dead;h.P.forEach(p=>{if(p.dn)return;any=1;if(ytLive(e)){const d=Math.atan2(e.y-p.y,e.x-p.x);let df=d-p.a;while(df>Math.PI)df-=TAU;while(df<-Math.PI)df+=TAU;p.a+=clamp(df,-2.2*dt,2.2*dt)}p.x+=Math.cos(p.a)*440*dt;p.y+=Math.sin(p.a)*440*dt;
    if(p.x<-30||p.x>A+30||p.y<-30||p.y>A+30||h.t-p.t0>1.4){p.dn=1;return}for(const x of EN){if(x.hid||x.jump)continue;if(Math.hypot(x.x-p.x,x.y-p.y)<x.r+14){p.dn=1;hurt(x,.95,o,p.x,p.y,0,0);if(!SKIP)for(let k=0;k<4;k++)sparkP(p.x,p.y,rnd(-140,140),rnd(-140,140),p.col,2.2);break}}});return any};
HZP.uzsh=h=>{const o=h.o;h.P.forEach(p=>{if(!p.dn)ytTxt(p.c,p.x,p.y,30,p.col,1,p.a,'#000')});if(h.t<1.85&&!o.dead){const s=Math.sin(h.t*Math.PI*2/.4);ytTxt(s>0?'))':'((',o.x+(s>0?1:-1)*(o.r+16),o.y+6,26,'#ffffff',.9,0,'#1e3a8a')}};
// ---------- 2) 앞니 콱! ----------
function uzBite(o,t){const a=rnd(0,TAU);HZ.push({k:'uzbt',o,tg:t,t:0,a,x:t.x,y:t.y,hit:new Set()});SFXa('gb_pop')}
HZX.uzbt=(h,dt,EN)=>{const e=h.tg;if(h.t<.55&&ytLive(e)){h.x=e.x;h.y=e.y}if(h.t>=.62&&!h.b){h.b=1;SFXa('uz_bite');shake=Math.max(shake,12);hs=.07;ytHitL(EN,h.hit,'b',h.x,h.y,40,7,h.o,1,x=>{x.stn=Math.max(x.stn||0,.3);x.cast=null;if(!SKIP)ft(x.x,x.y-x.r-30,'콱!','#ffffff',26)})}return h.t<1.15};
HZP.uzbt=h=>{const t=h.t,fo=t>.9?Math.max(0,1-(t-.9)/.25):1,side=Math.cos(h.a)<0?-1:1;
  // 옆에서 불쑥 → 상대에게 덮치며 콱
  let x,y,S;if(t<.5){const ap=Math.min(1,t/.22);x=h.x+side*95;y=h.y+40;S=120*(.4+.6*ap)*(1+.04*Math.sin(t*30))}else if(t<.62){const k=(t-.5)/.12;x=h.x+side*95*(1-k);y=h.y+40+k*20;S=120+40*k}else{const a=t-.62;x=h.x;y=h.y+60;S=160*(1-.12*Math.min(1,a/.08))}
  ytDraw('yt_uzu',x,y,S,fo,side>0,0,t<.5?side*-.15:0);
  if(t>=.62&&t<1.15){const a=t-.62;g.save();g.globalAlpha=Math.max(0,1-a/.5);g.fillStyle='#ffffff';g.strokeStyle='#000';g.lineWidth=2.5;[-13,13].forEach(dx=>{g.beginPath();g.rect(h.x+dx-8,h.y-10,16,20);g.fill();g.stroke()});g.restore()}
  if(t>=.62&&t<.8){g.save();g.globalAlpha=1-(t-.62)/.18;g.strokeStyle='#fff';g.lineWidth=4;for(let i=0;i<8;i++){const a=i*TAU/8;g.beginPath();g.moveTo(h.x+Math.cos(a)*34,h.y+Math.sin(a)*34);g.lineTo(h.x+Math.cos(a)*60,h.y+Math.sin(a)*60);g.stroke()}g.restore()}};
// ---------- 3) ULT 우!주!하!마! ----------
function uzUlt(o,t){if(!t||t.dead)t=tgt(o);if(!t)return;const S=[];for(let i=0;i<70;i++)S.push([rnd(0,A),rnd(0,A),rnd(.5,2.2),rnd(0,6)]);HZ.push({k:'uzul',o,tg:t,t:0,S,nc:0,hit:new Set(),L:[]})}
const UZSY=[['우',.13],['주',.63],['하',1.38],['마',1.88]];
HZX.uzul=(h,dt,EN)=>{const o=h.o,u=h.t-YTDL;h.u=u;if(u<0)return true;const e=h.tg,live=ytLive(e);if(!h.lk){h.lk=1;SFXa('uz_space');h.ex=live?clamp(e.x,90,A-90):A/2;h.ey=live?clamp(e.y,110,A-90):A/2}if(!o.dead){o.gcd=Math.max(o.gcd,.4);o.cast=null}
  if(live&&u>=.9&&u<4.3){e.x+=(h.ex-e.x)*Math.min(1,dt*3.5);e.y+=(h.ey-e.y)*Math.min(1,dt*3.5);e.stn=Math.max(e.stn||0,.12);e.cast=null}
  [1.0,1.3,1.6].forEach((c,i)=>{if(u>=c&&h.nc<=i){h.nc=i+1;SFXa('uz_count')}});
  if(u>=1.9&&!h.vo){h.vo=1;SFXa('yt_uzc')}
  UZSY.forEach(([c,at],i)=>{const tt=1.9+at;if(u>=tt&&!h.L[i]){h.L[i]=1;SFXa('uz_slam');shake=Math.max(shake,13);hs=.05;ytHitL(EN,h.hit,'s'+i,h.ex,h.ey,64,1.8,o,0);if(!SKIP){ring(h.ex,h.ey,20,110,UZP[i%UZP.length],7,.35);ytCube(h.ex,h.ey,['#ffffff',UZP[i]],8,240)}}});
  if(u>=3.95&&!h.fs){h.fs=1;SFXa('uz_fall')}
  if(u>=4.25&&!h.im){h.im=1;shake=Math.max(shake,26);hs=.13;ytHitL(EN,h.hit,'h',h.ex,h.ey,90,7,o,1,x=>safePush(x,o.dead?rnd(0,TAU):ang(o,x),60));if(!SKIP){lkImp(h.ex,h.ey,170,UZB);ring(h.ex,h.ey,20,180,'#ffffff',10,.5)}SFXa('uz_samba')}
  return u<4.75};
HZD.uzul=h=>{const u=h.u;if(!(u>=0))return;const fa=u<4.45?Math.min(1,u/.4):Math.max(0,1-(u-4.45)/.3);g.save();g.globalAlpha=.88*fa;const gr=g.createLinearGradient(0,0,0,A);gr.addColorStop(0,'#05031a');gr.addColorStop(1,'#1a0a3a');g.fillStyle=gr;g.fillRect(-40,-40,A+80,A+80);
  h.S.forEach(s=>{g.globalAlpha=fa*(.4+.6*Math.abs(Math.sin(clock*2+s[3])));g.fillStyle='#fff';g.fillRect(s[0],s[1],s[2],s[2])});g.restore()};
HZP.uzul=h=>{const u=h.u;if(!(u>=0)||h.ex==null)return;
  if(u>=.95&&u<1.9){const c=u<1.3?'3':u<1.6?'2':'1',a=(u-1.0)%.3;ytTxt(c,A/2,120,86*(1.2-a),'#ffffff',Math.max(.25,1-a/.3),0,UZB)}
  UZSY.forEach(([c,at],i)=>{const tt=1.9+at,a=u-(tt-.18);if(a<0||u>4.3)return;const k=Math.min(1,a/.18),y=h.ey-(1-k*k)*360-10,ox=(i-1.5)*58;ytTxt(c,h.ex+ox*Math.min(1,Math.max(0,u-tt)*6),y,74,UZP[i],1,(i%2?.12:-.12),'#000')});
  if(u>=1.9&&u<3.9){const fo=u>3.6?(3.9-u)/.3:1;ytTxt('우! 주! 하! 마!',A/2,A-60,26,'#ffffff',fo*Math.min(1,(u-1.9)/.1),0,'#1e3a8a')}
  if(u>=3.9&&u<4.75){const k=Math.min(1,(u-3.9)/.35),y=h.ey+90-(1-k*k)*520;if(u<4.25){g.save();g.globalAlpha=.35*k;g.fillStyle='#000';g.beginPath();g.ellipse(h.ex,h.ey+20,110*k,30*k,0,0,TAU);g.fill();g.restore()}ytDraw('yt_uzu',h.ex+(u>4.25?Math.sin(u*40)*4:0),y,230,u>4.55?(4.75-u)/.2:1,0,0,(1-k)*.4);
    if(u>=3.9&&u<4.3)ytTxt('따!!',A/2,A*.24,70,'#ffffff',Math.min(1,(u-3.9)/.08),0,'#ff2a2a');if(u>=4.25)ytTxt('행복마이 댄스파티!',A/2,A*.24,32,'#ffe600',Math.min(1,(u-4.25)/.08)*(u>4.6?(4.75-u)/.15:1),Math.sin(u*18)*.08,'#000')}
  ytCut('yt_uzu',u,'우주하마','우! 주! 하! 마!',UZB)};
EMB.uzh=(f,D)=>{g.rotate(-f.rot);neon({col:'#ffffff',hi:'#ffffff'},1.4,()=>{g.beginPath();g.rect(-8,-2,6,8);g.rect(2,-2,6,8);g.moveTo(-14,-3);g.lineTo(14,-5)});neon(D,1,()=>{g.beginPath();g.arc(-5,-11,1.2,0,TAU);g.moveTo(6.2,-11);g.arc(5,-11,1.2,0,TAU)})};

// ---------- 공통 : 사진 튀어나오기 · 패시브 타이머 ----------
['dto','bst','gbr','chm','gms','uzh'].forEach(k=>{UTSP[k]=f=>ytPopDraw(f)});
const _afterYT=afterImg;afterImg=function(f){_afterYT(f);if(f.dead||f.hid||!f.d||phase=='menu')return;if(f.cmK>0&&f.cmKt>0){for(let i=0;i<f.cmK;i++)cmMad(f.x-8+i*16-(f.cmK-1)*0,f.y-f.r-14-Math.abs(Math.sin(clock*8+i))*3,1.15,Math.min(1,f.cmKt))}
  if(f.doInv>0&&Math.sin(clock*40)>0){g.save();g.globalAlpha=.5;g.strokeStyle='#ffffff';g.lineWidth=3;g.strokeRect(f.x-f.r-4,f.y-f.r-4,f.r*2+8,f.r*2+8);g.restore()}
  if(f.cmBuf>0){g.save();g.globalCompositeOperation='lighter';glow('#ffe14a',f.x,f.y,f.r*1.8,.25+.1*Math.sin(clock*10));g.restore()}
  if(f.uzDr>0){const a=1-f.uzDr/.8;g.save();g.globalAlpha=1-a;g.fillStyle='#4aa8ff';for(let i=0;i<5;i++)g.fillRect(f.x+Math.sin(i*2+a*6)*f.r*.8,f.y-f.r-6-a*30-i*6,4,6);g.restore()}};
const _updYT=update;update=function(dt){_updYT(dt);if(!F)return;const frz=(typeof ULK!='undefined'&&ULK)||CIN||TSTOP||MAD;
  F.forEach(f=>{const k=f.d&&f.d.k;
    if(YTPOP[k]){if(f.cast&&f.cast!==f.ytC){f.ytC=f.cast;f.ytP={n:YTPOP[k](f,f.cast.s),t:0,big:!!f.cast.s.ult}}if(f.ytP){f.ytP.t+=dt;if(f.ytP.t>(f.ytP.d||1.75))f.ytP=null}}
    ['doInv','gbCd','cmCd','cmBuf','cmKt','uzDr'].forEach(q=>{if(f[q]>0)f[q]-=dt});if(f.cmKt<=0)f.cmK=0;
    if(f.gbRag){const r=f.gbRag;r.t-=dt;f.x=clamp(f.x+r.vx*dt,f.r,A-f.r);f.y=clamp(f.y+r.vy*dt,f.r,A-f.r);r.vx*=Math.pow(.02,dt);r.vy*=Math.pow(.02,dt);f.rot+=dt*25;if(f.x<=f.r||f.x>=A-f.r)r.vx*=-1;if(f.y<=f.r||f.y>=A-f.r)r.vy*=-1;if(r.t<=0)f.gbRag=null}
    if(f.dead||phase!='play'||frz)return;const t=tgt(f);
    if(k=='bst'){f.mbT=(f.mbT||0)+dt;if(f.mbT>=7&&t&&!t.hid){f.mbT=0;mbBills(f,t,4,.8,380)}}
    if(k=='gms'){f.gmT=(f.gmT||0)+dt;if(f.gmT>=6&&t&&!t.hid){f.gmT=0;gmShot(f,t,1.8,0)}}
    if(k=='uzh'){f.uzT=(f.uzT||0)+dt;if(f.uzT>=8){f.uzT=0;f.uzDr=.8;SFXa('uz_drink');ytHeal(f,3)}}})};
const _initYT=init;init=function(){_initYT.apply(this,arguments);if(F)F.forEach(f=>{f.ytP=null;f.ytC=null;f.doRs=0;f.doInv=0;f.gbCd=0;f.gbRag=null;f.cmCd=0;f.cmBuf=0;f.cmK=0;f.cmKt=0;f.mbT=0;f.gmT=0;f.uzT=0;f.uzDr=0})};
[['dto',DOSK],['bst',MBSK],['gbr',GBSK],['chm',CMSK],['gms',GAMSK],['uzh',UZSK]].forEach(([k,L])=>L.forEach(sk=>{const f0=sk.f;sk.f=function(o,t){if(o&&(!o.ytP||o.ytP.t>.7))o.ytP={n:YTPOP[k](o,sk),t:0,big:!!sk.ult};return f0.apply(this,arguments)}}));
// 궁극기 봉인 · 밸런스
[DOSK,MBSK,GBSK,CMSK,GAMSK,UZSK].forEach(L=>L.forEach(ulkWrap));
Object.assign(DMGK,{dto:1.36,bst:1.907,gbr:2.3,chm:2.1,gms:1.99,uzh:1.69});


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ▶ 섹션 : extra30
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ===== extra30.js : 유튜버 추가 (v5.4) · 흉악범 • 말왕 · 김건우 • 씩씩맨 =====
// 사진 : yt_mlw (말왕) · yt_mlw_jok (족발뼈) · yt_ssm (씩씩맨) · yt_ssm_thumb (폐급맨 출근 브이로그 썸네일) · yt_creeper (크리퍼)
// 목소리 : clips.js 의 ytv2 섹션 (보내준 영상에서 잘라냄 : 장충동 왕족발 보쌈 · 이거보세요오!! · 유유유유 매그네릭 · 이건 못참지)
// ======================================================================
['yt_mlw','yt_mlw_jok','yt_ssm','yt_ssm_thumb','yt_creeper'].forEach(n=>utLoad(n));YTPX.yt_creeper=1;
// 사진을 유튜브 영상 카드처럼 (둥근 네모 · 그대로)
function ytCard(n,x,y,w,al,rot){const o=UTI[n],s=utSrc(n);if(!o||!s||!(al>0))return;const h=w*o.h/o.w;g.save();g.globalAlpha=Math.min(1,al);g.translate(x,y);if(rot)g.rotate(rot);g.fillStyle='#000';g.fillRect(-w/2-4,-h/2-4,w+8,h+8);g.drawImage(s,-w/2,-h/2,w,h);
  g.fillStyle=YTR;g.fillRect(-w/2,h/2-4,w*.7,4);g.fillStyle='rgba(0,0,0,.75)';g.fillRect(w/2-34,h/2-20,30,14);g.fillStyle='#fff';g.font='700 10px '+YTF;g.textAlign='center';g.textBaseline='middle';g.fillText('10:24',w/2-19,h/2-13);g.restore()}

// ======================================================================
// 흉악범 • 말왕 (근육 · 장충동 왕족발 보쌈 · 매그네릭)
// 패시브 이건 못 참지~ : 체력이 40 이하가 되면 딱 한 번 족발을 뜯고 체력 +14 · 4초 동안 주는 피해 +20%
// 1) 장충동 왕족발 보쌈 : 노래를 부르며 상대에게 다가가 거대한 족발뼈를 세 번 휘두름
// 2) 이거 보세요오오! : 근육 자랑 → "이거 / 보세요 / 오오오!!" 세 번 점점 커지는 충격파 (마지막은 잠깐 기절)
// 3) ULT 유유유유유유 매그네릭~ : "유" 할 때마다 자석처럼 끌려옴 → 딱 붙어서 빙글빙글 → "~릭!" 멀리 던져버림
// ======================================================================
const MLO='#ff8a3a';
ytS(['ml_swing','ml_bonk','ml_ring','ml_magnet','ml_fling','ml_eat'],['말왕 · 족발뼈 휘두르기','말왕 · 족발뼈 퍽','말왕 · 이거 보세요 충격파','말왕 · 매그네릭 자력','말왕 · 던지기','말왕 · 족발 뜯기']);
const MLSK=[
  {n:'장충동 왕족발 보쌈',w:.3,cd:8,c:(o,t)=>!t.hid&&dist(o,t)<480,f:(o,t)=>mlJok(o,t)},
  {n:'이거 보세요오오!',w:.25,cd:9,c:(o,t)=>!t.hid&&dist(o,t)<300,f:(o,t)=>mlIgo(o,t)},
  {n:'유유유유 매그네릭',w:.4,ult:1,c:(o,t)=>!t.hid,f:(o,t)=>mlUlt(o,t)}];
const MLI=DEF.findIndex(d=>d.name=='흉악범');
DEF.push({name:'흉악범 • 말왕',gl:'말',k:'mlw',vof:MLI,r:28,sp:204,col:MLO,hi:'#ffffff',dk:'#3a1a08',alt:{col:'#2a2f4a',hi:'#e0e4ff',dk:'#05060e'},alt2:{col:'#ff4a6a',hi:'#ffe0e6',dk:'#2a0410'},sk:MLSK});
INFO['흉악범 • 말왕']={st:[9,8,7,7,8,10],p:'이건 못 참지~ · 체력이 40 이하가 되면 딱 한 번 족발을 뜯고 체력 +14 · 4초 동안 주는 피해 +20%',
  sk:[['2.4×3','"장충동 왕족발 보쌈~" 노래를 부르며 상대에게 다가가 거대한 족발뼈를 세 번 휘두름'],['1.5+1.5+2.5','근육 자랑하며 "이거 / 보세요 / 오오오!!" 세 번 점점 커지는 충격파 · 마지막은 잠깐 기절'],['0.7×6+0.4×n+7','"유" 할 때마다 자석처럼 끌려옴 → 딱 붙어서 빙글빙글 돌다가 "~릭!" 멀리 던져버림']]};
YTPOP.mlw=(f,s)=>s.n=='장충동 왕족발 보쌈'?'yt_mlw_jok':'yt_mlw';
// 족발 그림
function mlJokD(x,y,a,s,al){if(!(al>0))return;g.save();g.globalAlpha=Math.min(1,al);g.translate(x,y);g.rotate(a);g.scale(s,s);g.lineJoin='round';
  g.fillStyle='#f2ead8';g.strokeStyle='#5a3a1e';g.lineWidth=2;g.beginPath();g.rect(-4,-5,30,10);g.fill();g.stroke();[[28,-6],[28,6]].forEach(([bx,by])=>{g.beginPath();g.arc(bx,by,6,0,TAU);g.fill();g.stroke()});
  g.fillStyle='#8a4a1e';g.beginPath();g.ellipse(-16,0,20,13,0,0,TAU);g.fill();g.stroke();g.fillStyle='#b8682a';g.beginPath();g.ellipse(-19,-4,11,6,-.3,0,TAU);g.fill();g.fillStyle='rgba(255,230,180,.6)';g.beginPath();g.ellipse(-12,-7,6,2.5,-.3,0,TAU);g.fill();g.restore()}
function mlNote(x,y,s,al,col){if(!(al>0))return;g.save();g.globalAlpha=Math.min(1,al);g.translate(x,y);g.scale(s,s);g.fillStyle=col||'#fff';g.strokeStyle='#000';g.lineWidth=1.5;g.beginPath();g.ellipse(0,0,5,3.6,-.4,0,TAU);g.fill();g.stroke();g.fillRect(3.5,-16,2.2,16);g.beginPath();g.moveTo(5.7,-16);g.quadraticCurveTo(12,-12,9,-6);g.lineTo(5.7,-11);g.fill();g.restore()}
// ---------- 패시브 : 이건 못 참지~ ----------
const _hurtML=hurt;hurt=function(t,n,o){if(o&&o.mlBuf>0&&t!=o&&n>0){arguments[1]=Math.round(n*1.2*10)/10}const r=_hurtML.apply(this,arguments);
  if(t&&t.d&&t.d.k=='mlw'&&!t.mlEat&&!t.dead&&t.hp>0&&t.hp<=40&&phase=='play'){t.mlEat=1;t.mlBuf=4;t.mlNom=1.2;t.hp=Math.min(100,t.hp+14);SFXa('yt_mot');setTimeout(()=>{try{SFXa('ml_eat')}catch(x){}},500);if(!SKIP){ft(t.x,t.y-t.r-34,'이건 못 참지~','#ffe14a',22);ft(t.x,t.y-t.r-8,'+14','#7dff9a',18)}}return r};
// ---------- 1) 장충동 왕족발 보쌈 ----------
function mlJok(o,t){HZ.push({k:'mljk',o,tg:t,t:0,ns:0,N:[],hit:new Set(),a:ang(o,t)});SFXa('yt_jok')}
const MLSW=[.35,1.15,1.95];
HZX.mljk=(h,dt,EN)=>{const o=h.o,e=h.tg;if(o.dead)return false;o.cast=null;o.gcd=Math.max(o.gcd,.3);
  if(ytLive(e)&&h.t<2.3){const d=dist(o,e),a=ang(o,e);if(d>o.r+e.r+30){o.x=clamp(o.x+Math.cos(a)*230*dt,o.r,A-o.r);o.y=clamp(o.y+Math.sin(a)*230*dt,o.r,A-o.r)}h.ta=a}
  MLSW.forEach((s,i)=>{if(h.t>=s&&h.ns<=i){h.ns=i+1;h.sw={t0:h.t,dir:i%2?-1:1,a0:(h.ta!=null?h.ta:h.a)-(i%2?-1:1)*2.4};SFXa('ml_swing')}});
  if(h.sw){const k=(h.t-h.sw.t0)/.28;if(k<=1){h.ja=h.sw.a0+h.sw.dir*4.8*k;const R=96;EN.forEach(x=>{if(x.hid||x.jump)return;const id=h.ns+':'+x.i;if(h.hit.has(id))return;const dx=x.x-o.x,dy=x.y-o.y,d=Math.hypot(dx,dy);if(d<R+x.r){let df=Math.atan2(dy,dx)-h.ja;while(df>Math.PI)df-=TAU;while(df<-Math.PI)df+=TAU;if(Math.abs(df)<.6){h.hit.add(id);hurt(x,2.4,o,x.x,x.y,0,0);safePush(x,Math.atan2(dy,dx),40);SFXa('ml_bonk');shake=Math.max(shake,8);if(!SKIP)ft(x.x,x.y-x.r-26,'퍽!','#ffffff',20)}}})}}
  if(!SKIP&&Math.random()<dt*7)h.N.push({x:o.x+rnd(-20,20),y:o.y-o.r,t0:h.t,vx:rnd(-40,40),c:['#ffe14a','#ffffff','#ff8a3a'][Math.floor(rnd(0,3))]});h.N=h.N.filter(q=>h.t-q.t0<1);
  return h.t<2.6};
HZP.mljk=h=>{const o=h.o;h.N.forEach(q=>{const a=h.t-q.t0;mlNote(q.x+q.vx*a,q.y-a*70,1.2,1-a,q.c)});
  if(!o.dead){let a=h.ja!=null&&h.sw&&h.t-h.sw.t0<.4?h.ja:(h.ta!=null?h.ta:h.a)+Math.sin(h.t*6)*.4;if(h.sw&&h.t-h.sw.t0<.28){g.save();g.globalAlpha=.35;g.strokeStyle='#ffe0b0';g.lineWidth=18;g.beginPath();const a0=h.sw.a0,a1=h.ja;g.arc(o.x,o.y,o.r+50,Math.min(a0,a1),Math.max(a0,a1));g.stroke();g.restore()}
    mlJokD(o.x+Math.cos(a)*(o.r+44),o.y+Math.sin(a)*(o.r+44),a+Math.PI,1.5,1)}
  if(h.t<2.5)ytTxt('장충동 왕족발 보쌈~',o.x,o.y-o.r-50,17,'#ffe14a',Math.min(1,h.t/.1)*(h.t>2.2?(2.5-h.t)/.3:1),0,'#3a1a08')};
// ---------- 2) 이거 보세요오오! ----------
function mlIgo(o,t){HZ.push({k:'mlig',o,t:0,W:[],nw:0,hit:new Set()});SFXa('yt_igo')}
const MLIG=[[.15,'이거',140,1.5],[.6,'보세요',190,1.5],[1.1,'오오오!!',260,2.5]];
HZX.mlig=(h,dt,EN)=>{const o=h.o;if(o.dead)return false;o.cast=null;o.gcd=Math.max(o.gcd,.3);
  MLIG.forEach(([s,w,R,dm],i)=>{if(h.t>=s&&h.nw<=i){h.nw=i+1;h.W.push({t0:h.t,R,dm,i,x:o.x,y:o.y,w});SFXa('ml_ring');shake=Math.max(shake,4+i*4)}});
  h.W.forEach(w=>{const a=h.t-w.t0,r=w.R*Math.min(1,a/.35);EN.forEach(x=>{if(x.hid||x.jump)return;const id=w.i+':'+x.i;if(h.hit.has(id))return;const d=Math.hypot(x.x-w.x,x.y-w.y);if(d<r+x.r&&d>r-40-x.r){h.hit.add(id);hurt(x,w.dm,o,x.x,x.y,0,w.i==2?1:0);safePush(x,Math.atan2(x.y-w.y,x.x-w.x),30+w.i*25);if(w.i==2){x.stn=Math.max(x.stn||0,.5);x.cast=null}}})});
  return h.t<1.75};
HZP.mlig=h=>{h.W.forEach(w=>{const a=h.t-w.t0;if(a>.6)return;const k=Math.min(1,a/.35),r=w.R*k,fo=1-a/.6;g.save();g.globalAlpha=fo;g.strokeStyle=w.i==2?'#ffe14a':'#ffffff';g.lineWidth=8-w.i*1.5+(1-k)*6;g.beginPath();g.arc(w.x,w.y,r,0,TAU);g.stroke();g.globalAlpha=fo*.15;g.fillStyle=MLO;g.fill();g.restore();
    ytTxt(w.w,w.x,w.y-h.o.r-40-w.i*14,22+w.i*10,w.i==2?'#ffe14a':'#ffffff',Math.min(1,a/.06)*fo+.2*(a<.6),w.i==2?-.08:0,'#3a1a08')})};
// ---------- 3) ULT 유유유유유유 매그네릭~ ----------
function mlMagD(x,y,a,s,al){if(!(al>0))return;g.save();g.globalAlpha=Math.min(1,al);g.translate(x,y);g.rotate(a);g.scale(s,s);g.lineCap='butt';g.lineWidth=12;g.strokeStyle='#e8283a';g.beginPath();g.arc(0,0,16,Math.PI*.5,Math.PI*1.5);g.stroke();
  g.strokeStyle='#e8283a';g.beginPath();g.moveTo(0,-16);g.lineTo(10,-16);g.stroke();g.strokeStyle='#2a6bff';g.beginPath();g.moveTo(0,16);g.lineTo(10,16);g.stroke();g.strokeStyle='#ddd';g.beginPath();g.moveTo(10,-16);g.lineTo(17,-16);g.moveTo(10,16);g.lineTo(17,16);g.stroke();g.restore()}
function mlUlt(o,t){if(!t||t.dead)t=tgt(o);if(!t)return;HZ.push({k:'mlul',o,tg:t,t:0,np:0,P:[],hit:new Set(),sp:0})}
const MLYU=[.05,.33,.6,.88,1.15,1.42];
HZX.mlul=(h,dt,EN)=>{const o=h.o,u=h.t-YTDL;h.u=u;if(u<0)return true;const e=h.tg,live=ytLive(e);if(!h.lk){h.lk=1;SFXa('ml_magnet')}if(!o.dead){o.gcd=Math.max(o.gcd,.4);o.cast=null}
  if(u>=.6&&!h.vo){h.vo=1;SFXa('yt_mag')}
  MLYU.forEach((c,i)=>{const tt=.6+c;if(u>=tt&&h.np<=i){h.np=i+1;h.P.push({t0:u,x:o.x,y:o.y});if(live&&!o.dead){const a=ang(e,o),d=dist(e,o),pull=Math.min(Math.max(0,d-o.r-e.r-6),55);e.x=clamp(e.x+Math.cos(a)*pull,e.r,A-e.r);e.y=clamp(e.y+Math.sin(a)*pull,e.r,A-e.r);hurt(e,.7,o,e.x,e.y,0,0);e.stn=Math.max(e.stn||0,.2);e.cast=null}if(!SKIP)SFXa('ml_magnet')}});
  if(live&&u>=.6&&u<2.05)e.slow=Math.max(e.slow||0,.3);
  // 딱 붙어서 빙글빙글
  if(u>=2.05&&u<3.25&&live&&!o.dead){if(h.oa==null)h.oa=ang(o,e);h.oa+=dt*(6+4*(u-2.05));const R=o.r+e.r+6,tx=o.x+Math.cos(h.oa)*R,ty=o.y+Math.sin(h.oa)*R;e.x+=(tx-e.x)*Math.min(1,dt*14);e.y+=(ty-e.y)*Math.min(1,dt*14);e.stn=Math.max(e.stn||0,.15);e.cast=null;if(u>=(h.nt||2.05)){h.nt=u+.2;hurt(e,.4,o,e.x,e.y,0,0)}}
  if(u>=3.25&&!h.fl){h.fl=1;SFXa('ml_fling');shake=Math.max(shake,22);hs=.12;if(live&&!o.dead){const a=h.oa!=null?h.oa:ang(o,e);hurt(e,7,o,e.x,e.y,0,1);if(!e.dead){safePush(e,a,190);e.stn=Math.max(e.stn||0,.45)}if(!SKIP){lkImp(e.x,e.y,140,MLO);ft(e.x,e.y-e.r-30,'~릭!','#ffffff',28)}}}
  return u<4.2};
HZD.mlul=h=>{const u=h.u;if(!(u>=0))return;const fa=u<3.9?Math.min(1,u/.4):Math.max(0,1-(u-3.9)/.3);lkDim(.5*fa)};
HZP.mlul=h=>{const u=h.u;if(!(u>=0))return;const o=h.o,e=h.tg;
  // 자기장 선
  if(u>=.6&&u<3.3&&!o.dead&&ytLive(e)){const a=ang(o,e),d=dist(o,e);g.save();g.globalAlpha=.55;for(let i=-2;i<=2;i++){g.strokeStyle=i<0?'#ff3a4a':'#3a7aff';g.lineWidth=2;g.setLineDash([8,8]);g.lineDashOffset=clock*80;g.beginPath();g.moveTo(o.x,o.y);const mx=(o.x+e.x)/2-Math.sin(a)*i*26,my=(o.y+e.y)/2+Math.cos(a)*i*26;g.quadraticCurveTo(mx,my,e.x,e.y);g.stroke()}g.setLineDash([]);g.restore();mlMagD(o.x+Math.cos(a)*(o.r+20),o.y+Math.sin(a)*(o.r+20),a+Math.PI,1.3,1)}
  h.P.forEach((p,i)=>{const a=u-p.t0;if(a>.7)return;const tx=ytLive(e)?e.x:p.x,ty=ytLive(e)?e.y:p.y,k=Math.min(1,a/.25);ytTxt('유',p.x+(tx-p.x)*k,p.y+(ty-p.y)*k-20,40-a*20,i%2?'#3a7aff':'#ff3a4a',1-a/.7,0,'#fff')});
  if(u>=.6&&u<2.1){let s='';for(let i=0;i<h.np;i++)s+='유';ytTxt(s,A/2,A*.18,40,'#ffffff',1,0,'#e8283a')}
  if(u>=2.05&&u<3.6)ytTxt('매그네릭~',A/2,A*.18,48,'#ffffff',Math.min(1,(u-2.05)/.1)*(u>3.3?(3.6-u)/.3:1),Math.sin(u*10)*.05,'#2a6bff');
  if(u>=2.05&&u<3.25&&!o.dead){g.save();g.globalCompositeOperation='lighter';glow('#ff6a3a',o.x,o.y,o.r*3,.35);glow('#3a7aff',o.x,o.y,o.r*2.2,.25);g.restore()}
  ytCut('yt_mlw',u,'매그네릭~','유유유유유유',MLO)};
EMB.mlw=(f,D)=>{g.rotate(-f.rot);neon({col:MLO,hi:'#fff0e0'},1.5,()=>{g.beginPath();g.moveTo(-14,4);g.quadraticCurveTo(-14,-10,-4,-8);g.quadraticCurveTo(2,-14,6,-6);g.quadraticCurveTo(14,-4,12,6);g.quadraticCurveTo(0,12,-14,4);g.moveTo(-4,-8);g.quadraticCurveTo(-2,-2,4,-3)})};

// ======================================================================
// 김건우 • 씩씩맨 (말왕의 매니저 · 폐급맨 · 크리퍼 토스 · Alt+F4)
// 패시브 Alt+F4 강종 : 죽을 만큼 맞으면 그 공격을 무시하고 게임을 강제 종료 → 1.3초 동안 사라졌다가 다른 곳에서 재접속 (한 판에 두 번)
// 1) ○○맨 룰렛 : 머리 위 이름표가 돌아감 → 씩씩맨 (씩씩한 펀치 돌진) · 횡령맨 (상대 궁 게이지 훔치기) · 폐급맨 (출근 브이로그 썸네일이 날아가고 본인은 넘어짐)
// 2) 씩씩하게 파이팅! : "파이팅!" 상대에게 세 번 껑충껑충 뛰어들며 착지 충격파
// 3) ULT 크리퍼 토스 : 크리퍼를 번쩍 들어 상대에게 휙 던짐 (킬패스~) → 쾅 떨어져서 쫓아가며 치이익… → 대폭발
// ======================================================================
const SSB='#5ab0ff';
ytS(['ss_slot','ss_punch','ss_coin','ss_trip','ss_hop','ss_land','ss_altf4','ss_back','ss_toss','ss_hiss','ss_boom'],['씩씩맨 · 룰렛','씩씩맨 · 씩씩한 펀치','씩씩맨 · 횡령','씩씩맨 · 폐급 꽈당','씩씩맨 · 파이팅 점프','씩씩맨 · 착지','씩씩맨 · Alt+F4','씩씩맨 · 재접속','씩씩맨 · 크리퍼 토스','씩씩맨 · 크리퍼 치이익','씩씩맨 · 크리퍼 폭발']);
const SSSK=[
  {n:'○○맨 룰렛',w:.25,cd:8,c:(o,t)=>!t.hid&&dist(o,t)<520,f:(o,t)=>ssSlot(o,t)},
  {n:'씩씩하게 파이팅!',w:.25,cd:9,c:(o,t)=>!t.hid&&dist(o,t)<560,f:(o,t)=>ssHop(o,t)},
  {n:'크리퍼 토스',w:.4,ult:1,c:(o,t)=>!t.hid,f:(o,t)=>ssUlt(o,t)}];
const SSI=DEF.findIndex(d=>d.name=='김건우');
DEF.push({name:'김건우 • 씩씩맨',gl:'씩',k:'ssm',vof:SSI,r:26,sp:214,col:SSB,hi:'#ffffff',dk:'#0a2440',alt:{col:'#5bd16b',hi:'#e8ffe8',dk:'#0a2a0e'},alt2:{col:'#ffd23a',hi:'#fff6d0',dk:'#2a2000'},sk:SSSK});
INFO['김건우 • 씩씩맨']={st:[8,8,9,8,8,10],p:'Alt+F4 강종 · 죽을 만큼 맞으면 그 공격을 무시하고 게임을 강제 종료 → 1.3초 동안 사라졌다가 다른 곳에서 재접속 (한 판에 두 번)',
  sk:[['6 / 2.5 / 3','머리 위 이름표 룰렛 → 씩씩맨 (씩씩한 펀치 돌진 6) · 횡령맨 (상대 궁 게이지 25 훔치기 + 2.5) · 폐급맨 (출근 브이로그 썸네일이 날아가 3 · 본인은 꽈당)'],['2.2×3','"파이팅!" 상대에게 세 번 껑충껑충 뛰어들며 착지할 때마다 충격파'],['2.5+11','크리퍼를 번쩍 들어 상대에게 휙 (킬패스~) → 쾅 떨어져서 쫓아가며 치이익… → 대폭발']]};
YTPOP.ssm=()=>'yt_ssm';
// ---------- 패시브 : Alt+F4 강종 ----------
const _hurtSS=hurt;hurt=function(t,n,o){if(t&&t.d&&t.d.k=='ssm'&&o&&o!=t&&!t.dead&&!t.hid&&phase=='play'&&(t.ssA||0)<2&&n>0){const hp0=t.hp;t.hp+=1000;const r=_hurtSS.apply(this,arguments);const dealt=hp0+1000-t.hp;
    if(hp0-dealt<=0){t.hp=hp0;ssAltF4(t)}else t.hp=hp0-dealt;return r}return _hurtSS.apply(this,arguments)};
function ssAltF4(f){f.ssA=(f.ssA||0)+1;f.ssOff=1.3;f.ssWin={x:f.x,y:f.y,t:0};f.hid=1;f.cast=null;f.shield=0;SFXa('ss_altf4');if(!SKIP)ft(f.x,f.y-f.r-30,'Alt + F4','#ffffff',24)}
function ssKey(x,y,w,txt,al,dn){if(!(al>0))return;g.save();g.globalAlpha=Math.min(1,al);g.translate(x,y+(dn?3:0));g.fillStyle='#888';g.fillRect(-w/2,-14+4,w,28);g.fillStyle='#f4f4f4';g.fillRect(-w/2,-14-(dn?0:3),w,28);g.strokeStyle='#333';g.lineWidth=1.5;g.strokeRect(-w/2,-14-(dn?0:3),w,28);g.fillStyle='#222';g.font='800 14px '+YTF;g.textAlign='center';g.textBaseline='middle';g.fillText(txt,0,-(dn?0:3));g.restore()}
// ---------- 1) ○○맨 룰렛 ----------
const SSNM=['씩씩맨','횡령맨','폐급맨'];
function ssSlot(o,t){const r=Math.random(),pick=r<.45?0:r<.75?1:2;HZ.push({k:'sssl',o,tg:t,t:0,pick,nt:0,hit:new Set()});SFXa('ss_slot')}
HZX.sssl=(h,dt,EN)=>{const o=h.o,e=h.tg;if(o.dead)return false;const tk=h.t<.7?Math.floor(Math.pow(h.t/.7,.6)*10):-1;if(tk!=h.nt&&tk>=0){h.nt=tk;if(!SKIP)SFXa('ss_slot')}
  if(h.t>=.7&&!h.rv){h.rv=1;h.ex=ytLive(e)?e.x:o.x;h.ey=ytLive(e)?e.y:o.y;if(!SKIP)ft(o.x,o.y-o.r-56,SSNM[h.pick]+'!',h.pick==2?'#9a9a9a':h.pick==1?'#ffd23a':'#7af0ff',22)}
  if(h.pick==0&&h.t>=.7&&h.t<1.15&&ytLive(e)){o.cast=null;o.gcd=Math.max(o.gcd,.3);const a=ang(o,e);o.x=clamp(o.x+Math.cos(a)*720*dt,o.r,A-o.r);o.y=clamp(o.y+Math.sin(a)*720*dt,o.r,A-o.r);ytHitL(EN,h.hit,'p',o.x,o.y,o.r+8,6,o,1,x=>{safePush(x,a,80);SFXa('ss_punch');shake=Math.max(shake,14);if(!SKIP)ft(x.x,x.y-x.r-28,'씩씩하게!','#ffffff',22)})}
  if(h.pick==1&&h.t>=.75&&!h.st){h.st=1;if(ytLive(e)){const g0=Math.min(25,e.ug||0);e.ug=Math.max(0,(e.ug||0)-25);o.ug=Math.min(100,(o.ug||0)+g0);hurt(e,2.5,o,e.x,e.y,0,0);SFXa('ss_coin')}h.cx=h.ex;h.cy=h.ey}
  if(h.pick==2){if(h.t>=.75&&!h.tr){h.tr=1;SFXa('ss_trip');o.stn=Math.max(o.stn||0,.6);o.cast=null;h.cx=o.x;h.cy=o.y}if(h.tr&&!h.cd){const tx=ytLive(e)?e.x:h.ex,ty=ytLive(e)?e.y:h.ey,dx=tx-h.cx,dy=ty-h.cy,d=Math.hypot(dx,dy)||1;h.cx+=dx/d*520*dt;h.cy+=dy/d*520*dt;if(d<(ytLive(e)?e.r:0)+20||h.t>2){h.cd=h.t;if(ytLive(e)&&d<e.r+24){hurt(e,3,o,e.x,e.y,0,0);SFXa('ss_punch')}}}}
  return h.t<(h.pick==2?2.3:1.6)};
HZP.sssl=h=>{const o=h.o,t=h.t;if(t<1.3&&!o.dead){const nm=t<.7?SSNM[h.nt%3]:SSNM[h.pick],x=o.x,y=o.y-o.r-34,fo=t>1.05?(1.3-t)/.25:1;g.save();g.globalAlpha=fo;g.fillStyle='#111';g.fillRect(x-44,y-14,88,26);g.strokeStyle=t<.7?'#ffffff':(h.pick==2?'#9a9a9a':h.pick==1?'#ffd23a':'#7af0ff');g.lineWidth=3;g.strokeRect(x-44,y-14,88,26);g.restore();ytTxt(nm,x,y,16,'#ffffff',fo,0,'#000')}
  if(h.pick==1&&h.st&&t<1.6){const a=(t-.75)/.85;for(let i=0;i<7;i++){const k=Math.min(1,Math.max(0,a*1.4-i*.06)),x=h.cx+(o.x-h.cx)*k,y=h.cy+(o.y-h.cy)*k-Math.sin(Math.PI*k)*60;if(k>0&&k<1)mbCoin(x+i*3,y,7,1,t*20+i)}ytTxt('횡령!',h.cx,h.cy-40,22,'#ffd23a',1-a,0,'#000')}
  if(h.pick==2&&h.tr){if(!h.cd||t-h.cd<.3){const fo=h.cd?1-(t-h.cd)/.3:1;ytCard('yt_ssm_thumb',h.cx,h.cy,110,fo,Math.sin(t*8)*.2)}if(t<1.4&&!o.dead)ytTxt('꽈당…',o.x,o.y+o.r+18,16,'#cfcfcf',1,0,'#000')}};
// ---------- 2) 씩씩하게 파이팅! ----------
function ssHop(o,t){HZ.push({k:'sshp',o,tg:t,t:0,n:-1,hit:new Set(),R:[]});if(!SKIP)ft(o.x,o.y-o.r-34,'파이팅!','#ffffff',22)}
HZX.sshp=(h,dt,EN)=>{const o=h.o,e=h.tg;if(o.dead)return false;o.cast=null;o.gcd=Math.max(o.gcd,.3);const L=.42,n=Math.floor(h.t/L);if(n>=3)return h.t<3*L+.35;
  if(n!=h.n){h.n=n;h.sx=o.x;h.sy=o.y;const tx=ytLive(e)?e.x+e.dx*e.sp*.15:o.x,ty=ytLive(e)?e.y+e.dy*e.sp*.15:o.y,a=Math.atan2(ty-o.y,tx-o.x),d=Math.min(dist(o,{x:tx,y:ty}),170);h.ex=clamp(o.x+Math.cos(a)*d,o.r,A-o.r);h.ey=clamp(o.y+Math.sin(a)*d,o.r,A-o.r);SFXa('ss_hop')}
  const u=Math.min(1,(h.t-n*L)/(L*.8));o.x=h.sx+(h.ex-h.sx)*u;o.y=h.sy+(h.ey-h.sy)*u;h.z=Math.sin(Math.PI*u)*40;
  if(u>=1&&!h['l'+n]){h['l'+n]=1;h.R.push({x:o.x,y:o.y,t0:h.t});SFXa('ss_land');shake=Math.max(shake,7);ytHitL(EN,h.hit,'h'+n,o.x,o.y,74,2.2,o,n==2,x=>safePush(x,ang(o,x),36))}return true};
HZD.sshp=h=>{h.R.forEach(r=>{const a=h.t-r.t0;if(a>.4)return;g.save();g.globalAlpha=1-a/.4;g.strokeStyle=SSB;g.lineWidth=6;g.beginPath();g.arc(r.x,r.y,20+a/.4*60,0,TAU);g.stroke();g.restore()});
  const o=h.o;if(h.z>0&&!o.dead){g.save();g.globalAlpha=.3;g.fillStyle='#000';g.beginPath();g.ellipse(o.x,o.y+o.r*.8,o.r*(1-h.z/120),o.r*.3,0,0,TAU);g.fill();g.restore()}};
HZP.sshp=h=>{const o=h.o;if(h.z>2&&!o.dead&&h.t<1.3)ytTxt('씩씩!',o.x,o.y-o.r-24-h.z,16,'#ffffff',1,0,SSB)};
// ---------- 3) ULT 크리퍼 토스 ----------
function ssUlt(o,t){if(!t||t.dead)t=tgt(o);if(!t)return;HZ.push({k:'ssul',o,tg:t,t:0,hit:new Set()})}
HZX.ssul=(h,dt,EN)=>{const o=h.o,u=h.t-YTDL;h.u=u;if(u<0)return true;const e=h.tg,live=ytLive(e);if(!o.dead){o.gcd=Math.max(o.gcd,.4);o.cast=null}
  if(u>=.95&&!h.lift){h.lift=1;h.ox=o.dead?A/2:o.x;h.oy=o.dead?A/2:o.y}
  if(u>=1.35&&!h.ts){h.ts=1;SFXa('ss_toss');h.sx=o.dead?h.ox:o.x;h.sy=(o.dead?h.oy:o.y)-50;h.lx=live?clamp(e.x+e.dx*e.sp*.5,30,A-30):A/2;h.ly=live?clamp(e.y+e.dy*e.sp*.5,40,A-30):A/2;if(!SKIP)ft(h.sx,h.sy-30,'킬패스~','#ffffff',22)}
  if(h.ts&&u<2.05){const k=(u-1.35)/.7;h.cx=h.sx+(h.lx-h.sx)*k;h.cy=h.sy+(h.ly-h.sy)*k-Math.sin(Math.PI*k)*170;h.rot=k*TAU}
  if(u>=2.05&&!h.ld){h.ld=1;h.cx=h.lx;h.cy=h.ly;h.rot=0;SFXa('ss_land');shake=Math.max(shake,10);ytHitL(EN,h.hit,'l',h.cx,h.cy,40,2.5,o,0);setTimeout(()=>{try{SFXa('ss_hiss')}catch(x){}},80)}
  if(h.ld&&u<3.45&&live){const dx=e.x-h.cx,dy=e.y-h.cy,d=Math.hypot(dx,dy)||1;if(d>e.r+14){h.cx+=dx/d*170*dt;h.cy+=dy/d*170*dt}e.slow=Math.max(e.slow||0,.3)}
  if(u>=3.45&&!h.bm){h.bm=1;SFXa('ss_boom');shake=Math.max(shake,28);hs=.14;ytHitL(EN,h.hit,'b',h.cx,h.cy,120,11,o,1,x=>safePush(x,Math.atan2(x.y-h.cy,x.x-h.cx),110));doBoom(h.cx,h.cy,170);if(!SKIP)ytCube(h.cx,h.cy,['#3fbf3f','#2a8a2a','#0e3a0e','#9a9a9a'],24,360)}
  return u<4.3};
HZD.ssul=h=>{const u=h.u;if(!(u>=0))return;const fa=u<4?Math.min(1,u/.4):Math.max(0,1-(u-4)/.3);lkDim(.45*fa);if(h.ts&&u<2.05){const k=(u-1.35)/.7;g.save();g.globalAlpha=.35*k;g.fillStyle='#000';g.beginPath();g.ellipse(h.lx,h.ly+18,30*k,10*k,0,0,TAU);g.fill();g.restore()}};
HZP.ssul=h=>{const u=h.u;if(!(u>=0))return;const o=h.o,H=74;
  if(h.lift&&!h.ts&&!o.dead){const k=Math.min(1,(u-.95)/.2);ytDraw('yt_creeper',o.x,o.y-o.r-4-k*20,H*k,1,0,0,0);ytTxt('으쌰!',o.x,o.y-o.r-H-30,18,'#ffffff',k,0,SSB)}
  if(h.ts&&!h.bm){const sw=h.ld?Math.min(1,(u-2.05)/1.4):0,fl=h.ld&&Math.sin(u*(14+sw*30))>.2?.7:0,sc=1+sw*.25+(sw>.85?Math.sin(u*60)*.06:0);ytDraw('yt_creeper',h.cx,h.cy+H*sc/2,H*sc,1,0,0,h.rot||0);
    if(fl>0){g.save();g.globalAlpha=fl*.8;g.globalCompositeOperation='lighter';glow('#ffffff',h.cx,h.cy,H*.6*sc,.9);g.restore()}if(h.ld)ytTxt('치이익…',h.cx,h.cy-H*sc/2-18,18,'#ffffff',1,0,'#1e6a1e')}
  if(h.bm&&u<4.2){const a=u-3.45;ytTxt('펑!!',A/2,A*.2,70,'#ffffff',a<.6?1:Math.max(0,(.85-a)/.25),-.05,'#1e6a1e')}
  ytCut('yt_ssm',u,'크리퍼 토스','킬패스~',SSB)};
EMB.ssm=(f,D)=>{g.rotate(-f.rot);neon({col:SSB,hi:'#e0f0ff'},1.4,()=>{g.beginPath();g.rect(-12,-12,24,24);g.moveTo(-7,-5);g.lineTo(-3,-5);g.lineTo(-3,-1);g.lineTo(-7,-1);g.closePath();g.moveTo(7,-5);g.lineTo(3,-5);g.lineTo(3,-1);g.lineTo(7,-1);g.closePath();g.moveTo(-2,-1);g.lineTo(-2,3);g.lineTo(-5,3);g.lineTo(-5,8);g.moveTo(2,-1);g.lineTo(2,3);g.lineTo(5,3);g.lineTo(5,8)})};

// ---------- 공통 (사진 · 타이머 · 재접속) ----------
['mlw','ssm'].forEach(k=>{UTSP[k]=f=>ytPopDraw(f)});
[['mlw',MLSK],['ssm',SSSK]].forEach(([k,L])=>L.forEach(sk=>{const f0=sk.f;sk.f=function(o,t){if(o&&(!o.ytP||o.ytP.t>.7))o.ytP={n:YTPOP[k](o,sk),t:0,big:!!sk.ult};return f0.apply(this,arguments)}}));
const _afterYT2=afterImg;afterImg=function(f){_afterYT2(f);if(f.dead||!f.d||phase=='menu')return;
  if(f.mlNom>0&&!f.hid){const a=1-f.mlNom/1.2;mlJokD(f.x+f.r*.9,f.y-f.r*.3,-.6+Math.sin(a*30)*.3,1.2,1);if(Math.random()<.3)sparkP(f.x+f.r,f.y-f.r*.4,rnd(-60,60),rnd(-80,-20),'#b8682a',2)}
  if(f.mlBuf>0&&!f.hid){g.save();g.globalCompositeOperation='lighter';glow('#ff8a3a',f.x,f.y,f.r*1.8,.22+.1*Math.sin(clock*10));g.restore()}};
const _updYT2=update;update=function(dt){_updYT2(dt);if(!F)return;F.forEach(f=>{const k=f.d&&f.d.k;
    if(YTPOP[k]&&(k=='mlw'||k=='ssm')){if(f.cast&&f.cast!==f.ytC){f.ytC=f.cast;f.ytP={n:YTPOP[k](f,f.cast.s),t:0,big:!!f.cast.s.ult}}}
    ['mlBuf','mlNom'].forEach(q=>{if(f[q]>0)f[q]-=dt});
    if(f.ssWin){f.ssWin.t+=dt;if(f.ssWin.t>2.4)f.ssWin=null}
    if(f.ssOff>0){f.ssOff-=dt;f.hid=1;f.cast=null;if(f.ssOff<=0){f.hid=0;let nx=f.x,ny=f.y;const T=tgt(f);for(let i=0;i<12;i++){nx=rnd(70,A-70);ny=rnd(70,A-70);if(!T||Math.hypot(nx-T.x,ny-T.y)>200)break}f.x=nx;f.y=ny;f.gcd=Math.max(f.gcd||0,.4);SFXa('ss_back');if(!SKIP){ft(nx,ny-f.r-30,'재접속…','#7af0ff',20);ring(nx,ny,f.r,f.r+60,SSB,5,.5)}}}})};
// Alt+F4 강제 종료 창 (사라진 자리에 2.4초 동안)
const SSWD=f=>{const w=f.ssWin;if(!w)return;const t=w.t,fo=t>2?Math.max(0,(2.4-t)/.4):Math.min(1,t/.1),x=clamp(w.x,110,A-110),y=clamp(w.y,80,A-80);
  ssKey(x-38,y-58,52,'Alt',fo,t<.35);ssKey(x+20,y-58,40,'F4',fo,t<.35);ytTxt('+',x-6,y-60,18,'#fff',fo);
  g.save();g.globalAlpha=fo;g.fillStyle='#f0f0f0';g.fillRect(x-100,y-30,200,74);g.fillStyle='#2a5ab8';g.fillRect(x-100,y-30,200,18);g.fillStyle='#fff';g.font='700 11px '+YTF;g.textAlign='left';g.textBaseline='middle';g.fillText('Minecraft',x-94,y-21);g.fillText('✕',x+86,y-21);
  g.fillStyle='#d42a2a';g.beginPath();g.arc(x-76,y+12,11,0,TAU);g.fill();g.fillStyle='#fff';g.font='900 14px '+YTF;g.textAlign='center';g.fillText('!',x-76,y+13);g.fillStyle='#111';g.font='700 12px '+YTF;g.textAlign='left';g.fillText('게임이 강제 종료되었습니다',x-58,y+6);g.fillStyle='#555';g.font='11px '+YTF;g.fillText('하드코어 사망 직전 · 강종컨 '+(f.ssA||1)+'/2',x-58,y+24);g.restore()};
// 씩씩맨이 있는 판에는 창을 맨 위에 그리는 칸 하나를 계속 띄워둠
HZP.sswin=h=>{if(F)F.forEach(f=>SSWD(f))};HZX.sswin=()=>true;
const _initYT2=init;init=function(){_initYT2.apply(this,arguments);if(F){F.forEach(f=>{f.mlEat=0;f.mlBuf=0;f.mlNom=0;f.ssA=0;f.ssOff=0;f.ssWin=null});if(F.some(f=>f.d&&f.d.k=='ssm'))HZ.push({k:'sswin',o:F.find(f=>f.d.k=='ssm'),t:0})}};
[MLSK,SSSK].forEach(L=>L.forEach(ulkWrap));
Object.assign(DMGK,{mlw:2.5,ssm:1.87});
// ---------- 마무리 : 목록 · 사전 다시 그리기 ----------
document.querySelectorAll('#grid .tile').forEach(t=>{const i=+t.dataset.i,vc=DEF.filter(x=>x.vof===i).length;let em=t.querySelector('.vb');if(vc){if(!em){em=document.createElement('em');em.className='vb';t.appendChild(em)}em.textContent='+'+vc}});
Object.keys(ICC).forEach(k=>delete ICC[k]);mkDict();
;
