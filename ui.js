// ======================================================================
// ui.js : 화면 꾸미기 : 사전 정리 · 아이콘 · 언더테일 화면 · 캐릭터 고르기 · 애니메이션
// 안에 들어있는 순서 : extra21 → ui
// (순서가 중요해서 위에서부터 차례로 실행됨 · 섹션 위치를 바꾸지 말 것)
// ======================================================================



// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ▶ 섹션 : extra21
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ===== extra21.js : 사전 정리 (기본 캐릭터별로 묶기) · 아이콘 다듬기 =====

// ---------- 아이콘 : 유리 광택 + 테두리 빛 · 변이는 오른쪽 아래에 기본 캐릭터 얼굴 배지 ----------
const _paintIcX=paintIc;paintIc=function(el,d,sz,opt){if(!el||!d)return;el.width=el.height=sz*2;const x=el.getContext('2d');x.clearRect(0,0,sz*2,sz*2);
  const S=sz*2,cx=sz,cy=sz-8*sz/84,R=52*sz/84;
  // 바닥 그림자 빛 (캐릭터 색)
  if(/^#[0-9a-f]{6}$/i.test(d.col)){const sg=x.createRadialGradient(cx,cy+R*.2,R*.3,cx,cy+R*.2,R*1.45);sg.addColorStop(0,d.col+'55');sg.addColorStop(1,d.col+'00');x.fillStyle=sg;x.fillRect(0,0,S,S)}
  x.drawImage(ICON(d,sz),0,0);
  // 테두리 빛
  x.save();x.strokeStyle=d.hi;x.globalAlpha=.55;x.lineWidth=Math.max(1,sz/40);x.beginPath();x.arc(cx,cy,R+sz*.03,0,Math.PI*2);x.stroke();x.restore();
  // 유리 광택 (위쪽 반달)
  x.save();x.beginPath();x.arc(cx,cy,R*.98,0,Math.PI*2);x.clip();const gr=x.createLinearGradient(0,cy-R,0,cy);gr.addColorStop(0,'rgba(255,255,255,.32)');gr.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=gr;x.beginPath();x.ellipse(cx-R*.12,cy-R*.42,R*.78,R*.5,-.2,0,Math.PI*2);x.fill();
  x.fillStyle='rgba(255,255,255,.55)';x.beginPath();x.ellipse(cx-R*.45,cy-R*.55,R*.13,R*.07,-.6,0,Math.PI*2);x.fill();x.restore();
  // 변이 배지 : 기본 캐릭터 얼굴
  const di=DEF.findIndex(q=>q.name==d.name),bi=di>=0?baseOf(di):-1;if(bi>=0&&bi!=di&&!(opt&&opt.nob)){const br=R*.36,bx=cx+R*.78,by=cy+R*.72;x.save();x.fillStyle='#000';x.beginPath();x.arc(bx,by,br+sz*.04,0,Math.PI*2);x.fill();x.strokeStyle=DEF[bi].col;x.lineWidth=Math.max(1.5,sz/24);x.stroke();
    x.beginPath();x.arc(bx,by,br,0,Math.PI*2);x.clip();const bs=Math.round(sz*.62);x.drawImage(ICON(DEF[bi],bs),bx-br*1.62,by-br*1.62+br*.16,br*3.24,br*3.24);x.restore()}};

// ---------- 사전 : 기본 캐릭터마다 칸을 나누고 변이를 줄줄이 ----------
mkDict=function(){const G=$('#dgrid');if(!G)return;G.classList.add('grp');
  const bases=DEF.map((d,i)=>i).filter(i=>DEF[i].vof==null);
  G.innerHTML=bases.map(b=>{const vs=VARS(b);return `<section class="dsec" style="--c:${DEF[b].col};--h:${DEF[b].hi}"><div class="dsh"><canvas class="ic"></canvas><b>${DEF[b].name}</b><small>형태 ${vs.length}개</small></div><div class="dsg">${vs.map((v,k)=>`<button class="tile" data-d="${v}" style="--c:${DEF[v].col};--h:${DEF[v].hi}"><canvas class="ic"></canvas><b>${k==0?'기본':(DEF[v].name.split('•')[1]||DEF[v].name).trim()}</b></button>`).join('')}</div></section>`}).join('');
  G.querySelectorAll('.dsec').forEach((s,j)=>paintIc(s.querySelector('.dsh .ic'),DEF[bases[j]],22,{nob:1}));
  G.querySelectorAll('.tile').forEach(t=>{paintIc(t.querySelector('.ic'),DEF[+t.dataset.d],50);t.addEventListener('click',()=>{audioOn();SFX('click');openInfo(+t.dataset.d)})})};
mkDict();
// 메뉴 타일 · 슬롯 다시 그리기 (새 아이콘으로)
document.querySelectorAll('#grid .tile').forEach(t=>{t.dataset.fv='';paintIc(t.querySelector('.ic'),DEF[+t.dataset.i],50)});
;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ▶ 섹션 : ui
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ===== ui.js : 화면 애니메이션 + 사운드 만들기 우선순위 =====

// ---------- 지금 싸우는 캐릭터 소리를 먼저 만들기 ----------
const SPFX={kaidan:['gk_'],diet:['dt_'],otaku:['ot_'],joker:['jk_'],pkc:['pk_'],kong:['kg_'],cjh:['cj_'],aura:['au_'],horror:['h_'],soccer:['kick','juggle','tackle','whistle','goal'],poop:['tv_'],master:['wm_'],radiant:['rd_'],thief:['th_'],bl:['bl_'],krl:['kr_'],chal:['ch_'],ge:['ge_'],ger:['ge_'],wk:['wk_'],pica:['pc_'],wick:['jw_'],oni:['oni_'],rage:['rg_','oni_'],ttd:['tt_'],kmj:['kj_'],sans:['sn_'],hsol:['hs_'],ezr:['ez_'],jett:['jt_'],terr:['tr_'],gaor:['gl_','mg_'],gapr:['gp_','mg_']};
function sndPri(ks){if(!window.GENPRI||!window.GENSFX)return;const P=[];ks.forEach(k=>(SPFX[k]||[]).forEach(p=>P.push(p)));if(!P.length)return;GENPRI(GENSFX.filter(n=>P.some(p=>n==p||n.startsWith(p))))}
const _initUI=init;init=function(){const r=_initUI.apply(this,arguments);try{if(F)sndPri(F.map(f=>f.d.k))}catch(e){}return r};

// ---------- 사운드 만드는 중 표시 ----------
(function(){const b=document.createElement('div');b.id='sgen';b.innerHTML='<i></i><span></span>';document.body.appendChild(b);
  const tick=()=>{if(!window.GENSTAT){setTimeout(tick,500);return}const [d,n]=GENSTAT();b.querySelector('span').textContent='사운드 만드는 중 '+d+' / '+n;b.querySelector('i').style.width=(d/n*100)+'%';
    if(d>=n){b.classList.add('done');b.querySelector('span').textContent='사운드 준비 완료';setTimeout(()=>b.remove(),2200);return}b.classList.toggle('show',true);setTimeout(tick,300)};setTimeout(tick,800)})();

// ---------- 차례로 나타나는 애니메이션 (순서값 넣기) ----------
function uiStagger(sel,step){document.querySelectorAll(sel).forEach((el,i)=>{el.style.setProperty('--d',(Math.min(i,24)*(step||.03))+'s');el.classList.remove('uin');void el.offsetWidth;el.classList.add('uin')})}
const _mkMenuUI=mkMenu;mkMenu=function(){_mkMenuUI.apply(this,arguments);uiStagger('#grid .tile',.025)};
const _mkDictUI=mkDict;mkDict=function(){_mkDictUI.apply(this,arguments);uiStagger('#dgrid .tile',.02)};
const _openInfoUI=openInfo;openInfo=function(){_openInfoUI.apply(this,arguments);uiStagger('#dsk .dsk',.06)};
const _scrUI=scr;scr=function(id){_scrUI.apply(this,arguments);
  if(id=='hub')uiStagger('#hub .hb',.08);if(id=='modes')uiStagger('#modes .mc',.08);if(id=='menu')uiStagger('#grid .tile',.02);if(id=='dict')uiStagger('#dgrid .tile',.015);if(id=='set')uiStagger('#sgrid > *',.012)};
// 선택 슬롯 바뀔 때 튀어오르기
const _paintMenuUI=paintMenu;paintMenu=function(){_paintMenuUI.apply(this,arguments);const s=document.querySelector('.slot.on');if(s&&s.dataset.lastName!=s.querySelector('b').textContent){s.dataset.lastName=s.querySelector('b').textContent;s.classList.remove('bump');void s.offsetWidth;s.classList.add('bump')}};

// ---------- 버튼 누르면 물결 ----------
document.addEventListener('pointerdown',e=>{const b=e.target.closest('.btn,.hb,.mc,.tile,.dsk,.back,#mode button,#vrow button,.ts,#tsize button,.vreset,#dclose');if(!b)return;const r=b.getBoundingClientRect(),s=document.createElement('span');s.className='rip';const d=Math.max(r.width,r.height)*2;
  s.style.cssText=`width:${d}px;height:${d}px;left:${e.clientX-r.left-d/2}px;top:${e.clientY-r.top-d/2}px`;b.appendChild(s);setTimeout(()=>s.remove(),650)},{passive:true});

// ---------- 경기 시작할 때 HUD 내려오기 ----------
const _updUI=update;let uiPh='';update=function(dt){_updUI(dt);if(phase!=uiPh){if(phase=='cd'||(phase=='play'&&uiPh=='')){const h=$('#hud');if(h){h.classList.remove('drop');void h.offsetWidth;h.classList.add('drop')}}
  if(phase=='end'){}uiPh=phase}};

// ---------- 결과 화면 : 이긴 캐릭터 색 ----------
const _winUI=winTick;winTick=function(dt){_winUI(dt);const m=$('#msg');if(m&&typeof win!='undefined'&&win)m.style.setProperty('--wc',win.d.col)};

// ======================================================================
// 언더테일 느낌 : 영혼 하트 커서 · 대사창 · 전투 시작 하트 · 별 배경
// ======================================================================
const UT_HEART='<svg viewBox="0 0 9 8" shape-rendering="crispEdges"><path fill="#ff0000" d="M1 0h2v1h1v1h1V1h1V0h2v1h1v3H8v1H7v1H6v1H5v1H4V7H3V6H2V5H1V4H0V1h1z"/></svg>';
(function(){const s=document.createElement('div');s.id='soul';s.innerHTML=UT_HEART;document.body.appendChild(s);
  const f=document.createElement('div');f.id='utflash';f.innerHTML=UT_HEART;document.body.appendChild(f);
  const box=document.createElement('div');box.id='utbox';const hb=document.querySelector('#hub .hbtns');if(hb)hb.after(box)})();
let soulEl=null;
function soulTo(el){const s=$('#soul');if(!s)return;el=null;if(!el||!document.body.classList.contains('m')||el.offsetParent===null){s.classList.remove('on');soulEl=null;return}soulEl=el;
  document.querySelectorAll('.sel').forEach(x=>{if(x!=el)x.classList.remove('sel')});el.classList.add('sel');const r=el.getBoundingClientRect(),inTile=el.classList.contains('tile');
  const x=inTile?r.left+4:r.left+14,y=inTile?r.top+4:r.top+r.height/2-8;s.style.transform=`translate(${x}px,${y}px)`;s.classList.add('on')}
document.addEventListener('pointerdown',e=>{const b=e.target.closest('.hb,.mc,.dsk,.tile,.btn');if(b)setTimeout(()=>soulTo(b),10)},{passive:true});
// 화면이 바뀌면 첫 버튼으로
const _scrUT=scr;scr=function(id){_scrUT.apply(this,arguments);setTimeout(()=>{const first={hub:'#hub .hb',modes:'#modes .mc',dinfo:'#dsk .dsk',menu:'#grid .tile.act',dict:'#dgrid .tile'}[id];soulTo(first?document.querySelector(first):null)},380);if(id=='hub')utType()};
addEventListener('resize',()=>{if(soulEl)soulTo(soulEl)});
setInterval(()=>{if(soulEl&&!document.body.classList.contains('m'))soulTo(null);else if(soulEl)soulTo(soulEl)},400);
// 대사창 (한 글자씩)
const UT_LINES=['* 공들이 싸울 준비를 하고 있다.','* 결의로 가득 찼다.','* 김민채가 무언가를 먹고 있다.','* 박지성이 수상하게 웃는다.','* 어디선가 "어쩌라고"가 들려온다.','* 오늘도 김티비는 L을 가져갔다.','* 김건우가 바람처럼 지나갔다.','* 평화로운 하루다... 아마도.'];
let utI=0,utT=null;function utType(){const b=$('#utbox');if(!b)return;clearTimeout(utT);const L=UT_LINES[utI++%UT_LINES.length];let k=0;b.textContent='';
  const st=()=>{if(!$('#hub').classList.contains('on'))return;b.textContent=L.slice(0,++k);if(k%2==0&&typeof SFXa=='function')SFXa('sn_text');if(k<L.length)utT=setTimeout(st,55);else utT=setTimeout(utType,2600)};st()}
setTimeout(()=>{if($('#hub')&&$('#hub').classList.contains('on'))utType()},600);
// 전투 시작 : 하트 깜빡 연출
function utFlash(){const f=$('#utflash');if(!f)return;f.classList.remove('on');void f.offsetWidth;f.classList.add('on');soulTo(null);try{SFXa('sn_blue')}catch(e){}setTimeout(()=>f.classList.remove('on'),950)}
['#start','#go','#bnext','#cagain'].forEach(s=>{const b=$(s);if(b)b.addEventListener('click',e=>{if(b.dataset.utok)return;e.stopImmediatePropagation();e.preventDefault();if(b.dataset.utw)return;b.dataset.utw=1;utFlash();setTimeout(()=>{delete b.dataset.utw;b.dataset.utok=1;b.click();delete b.dataset.utok},780)},true)});
// 메뉴 배경 : 까만 우주 + 깜빡이는 별
const UTS=Array.from({length:70},()=>({x:Math.random(),y:Math.random(),s:Math.random()<.85?2:3,p:Math.random()*6,v:.2+Math.random()*.8}));
drawMenu=function(){g.fillStyle='#000';g.fillRect(0,0,W,H);const n=F?F.length:0;
  g.save();g.globalCompositeOperation='lighter';if(F)F.forEach((f,i)=>glow(f.d.col,W*(n==3?[.1,.5,.9][i]:[.08,.92][i]),H*.32,Math.max(W,H)*.45,.09));g.restore();
  UTS.forEach(q=>{const a=.25+.75*Math.max(0,Math.sin(clock*q.v*2+q.p));g.globalAlpha=a;g.fillStyle='#fff';const x=Math.floor(q.x*W),y=Math.floor((q.y*H+clock*q.v*6)%H);g.fillRect(x,y,q.s,q.s)});
  g.globalAlpha=1;g.fillStyle='rgba(255,255,255,.05)';for(let y=0;y<H;y+=4)g.fillRect(0,y,W,1)};
setTimeout(()=>{const h=$('#hub');if(h&&h.classList.contains('on'))soulTo(document.querySelector('#hub .hb'))},900);

// ======================================================================
// 언더테일 스타일 : 카운트다운 · FIGHT · K.O. (토너먼트는 원래대로)
// ======================================================================
const UTPF='"Press Start 2P","Galmuri11",monospace',UTKF='"Galmuri11","Noto Sans KR",sans-serif';
const UTH=['.XX...XX.','XXXX.XXXX','XXXXXXXXX','XXXXXXXXX','.XXXXXXX.','..XXXXX..','...XXX...','....X....'];
function utHeart(cx,cy,s,col,half,off){g.fillStyle=col;UTH.forEach((r,y)=>{for(let x=0;x<9;x++){if(r[x]!='X')continue;const crack=[4,3,5,4,3,4,4,4][y];if(half==1&&x>crack)continue;if(half==2&&x<=crack)continue;const ox=half==1?-off:half==2?off:0;g.fillRect(cx+(x-4.5)*s+ox,cy+(y-4)*s,s+.5,s+.5)}})}
function utBox(cx,cy,w,h,a){g.save();g.globalAlpha=a;g.fillStyle='#000';g.fillRect(cx-w/2,cy-h/2,w,h);g.strokeStyle='#fff';g.lineWidth=6;g.strokeRect(cx-w/2,cy-h/2,w,h);g.restore()}
count=function(){const n=Math.ceil(tm),u=n-tm,step=Math.floor(clamp(u,0,.999)*4)/4,pop=u<.12?1+(.12-u)*3:1;
  const bw=230,bh=210,cx=A/2,cy=A/2,open=clamp((3-tm)/.15,0,1);utBox(cx,cy,bw*Math.min(1,open*1.2),bh*open,.92);if(open<1)return;
  g.save();g.translate(cx+(u<.1?rnd(-3,3):0),cy-24);g.scale(pop,pop);g.font='88px '+UTPF;g.textAlign='center';g.textBaseline='middle';g.fillStyle=n==1?'#ffff00':'#fff';g.fillText(n,0,0);g.restore();
  const beat=1+.18*Math.max(0,Math.sin((1-u)*Math.PI*2))**6;utHeart(cx,cy+52,4*beat,'#ff0000');
  g.save();g.font='14px '+UTKF;g.fillStyle='#fff';g.textAlign='center';g.fillText('* '+['','전투 시작!','곧 시작된다...','결의로 가득 찼다.'][n]||'',cx,cy+bh/2+26);g.restore();
  g.save();g.strokeStyle='rgba(255,255,255,.5)';g.lineWidth=2;g.beginPath();g.arc(cx,cy-24,74,-Math.PI/2,-Math.PI/2+TAU*(1-step));g.stroke();g.restore()};
const _fightUT=fightTxt;fightTxt=function(){if(TOURM){_fightUT();return}const e=.9-fight,a=clamp(fight*4,0,1),cx=A/2,cy=A/2,w=280,h=86;
  g.save();g.globalAlpha=a;const s=e<.12?Math.floor(e/.04)*.33+.01:1;g.translate(cx,cy);g.scale(Math.min(1,s),Math.min(1,s));const lit=e>.22;
  g.fillStyle='#000';g.fillRect(-w/2,-h/2,w,h);g.strokeStyle=lit?'#ffff00':'#ff7f27';g.lineWidth=6;g.strokeRect(-w/2,-h/2,w,h);
  // 칼 아이콘
  g.save();g.translate(-w/2+44,0);g.rotate(-Math.PI/4);g.fillStyle=lit?'#ffff00':'#ff7f27';g.fillRect(-4,-26,8,34);g.fillRect(-12,8,24,6);g.fillRect(-3,14,6,12);g.restore();
  if(lit)utHeart(-w/2+44,0,3.2,'#ff0000');
  g.font='34px '+UTPF;g.textAlign='center';g.textBaseline='middle';g.fillStyle=lit?'#ffff00':'#ff7f27';g.fillText('FIGHT',22,2);g.restore();
  if(e>.32&&e<.6){const q=(e-.32)/.28;g.save();g.globalAlpha=a*(1-q);g.strokeStyle='#fff';g.lineWidth=10*(1-q)+2;g.beginPath();g.moveTo(-40,A*.2+q*40);g.lineTo(A+40,A*.8-q*40);g.stroke();g.restore()}};
const _bigUT=big;big=function(txt,alpha,sc,col){if(txt!=='K.O.'||TOURM)return _bigUT.apply(this,arguments);const t=typeof endT=='number'?endT:1,cx=A/2,cy=A/2-30;
  g.save();g.globalAlpha=alpha;g.fillStyle='rgba(0,0,0,.55)';g.fillRect(-300,-300,A+600,A+600);
  if(t<.55){const sh=t>.3?rnd(-2,2):0;utHeart(cx+sh,cy,9,'#ff0000',t>.3?1:0,0);if(t>.3)utHeart(cx+sh,cy,9,'#ff0000',2,0)}
  else{const q=t-.55,off=Math.min(12,q*60);utHeart(cx,cy,9,'#ff0000',1,off);utHeart(cx,cy,9,'#ff0000',2,off);
    if(q>.35){for(let i=0;i<6;i++){const an=-Math.PI/2+(i-2.5)*.5,d=(q-.35)*260,gy=(q-.35)*(q-.35)*500;g.fillStyle='#ff0000';g.fillRect(cx+Math.cos(an)*d-4,cy+Math.sin(an)*d+gy-4,8,8)}}}
  g.font='60px '+UTPF;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#600';g.fillText('K.O.',cx+4,cy+124);g.fillStyle='#fff';g.fillText('K.O.',cx,cy+120);g.restore()};
// ===== 캐릭터 고르기 개편 =====
// · 변이가 있는 캐릭터를 누르면 아래에서 '형태 고르기' 창이 올라옴 (그림 카드로 고름)
// · 캐릭터를 골라도 다음 플레이어로 넘어가지 않음 → P1 / P2 / P3 칸을 눌러야 바뀜 (토너먼트는 그대로)
function fsEl(){let el=$('#fsheet');if(el)return el;el=document.createElement('div');el.id='fsheet';el.innerHTML='<div class="fs-box"><div class="fs-hd"><div class="fs-t"></div><button class="fs-x">X</button></div><div class="fs-list"></div></div>';document.body.appendChild(el);
  el.addEventListener('click',e=>{if(e.target==el)fsClose()});el.querySelector('.fs-x').addEventListener('click',()=>{SFX('click');fsClose()});return el}
function fsClose(){const el=$('#fsheet');if(el)el.classList.remove('on')}
function fsOpen(i){const el=fsEl(),vs=VARS(i),cur=MENU_T?TSEL[ACT]:SEL[ACT],nm=DEF[i].name;
  el.querySelector('.fs-t').innerHTML='* '+nm+' · 형태를 골라라<small>'+(MENU_T?'SLOT '+(ACT+1):'P'+(ACT+1))+' 캐릭터 · 형태 '+vs.length+'개</small>';
  el.querySelector('.fs-list').innerHTML=vs.map((v,k)=>{const d=DEF[v],u=d.sk.find(s=>s.ult);return `<button class="fc${v==cur?' on':''}${k==0?' base':''}" data-v="${v}" style="transition-delay:${.04+k*.04}s"><i class="hr"></i><canvas></canvas><b>${k==0?'기본':(d.name.split('•')[1]||d.name).trim()}</b><small>${k==0?d.name:'ULT · '+(u?u.n:'')}</small></button>`}).join('');
  el.querySelectorAll('.fc').forEach(b=>{paintIc(b.querySelector('canvas'),DEF[+b.dataset.v],56);b.addEventListener('click',()=>{SFX('click');if(MENU_T){TSEL[ACT]=+b.dataset.v;fsClose();paintMenu()}else{SEL[ACT]=+b.dataset.v;fsClose();initMenu()}})});
  void el.offsetWidth;el.classList.add('on')}
function fsBind(){document.querySelectorAll('#grid .tile').forEach(t=>{const n=t.cloneNode(true);t.replaceWith(n);paintIc(n.querySelector('.ic'),DEF[+n.dataset.i],50);
  n.addEventListener('click',()=>{audioOn();SFX('click');const i=+n.dataset.i;if(MENU_T){if(baseOf(TSEL[ACT])!=i){TSEL[ACT]=i;paintMenu()}if(VARS(i).length>1)fsOpen(i);return}
    if(VARS(i).length>1){if(baseOf(SEL[ACT])!=i){SEL[ACT]=i;initMenu()}fsOpen(i)}else{SEL[ACT]=i;initMenu()}})})}
const _mkMenuFS=mkMenu;mkMenu=function(){_mkMenuFS.apply(this,arguments);fsBind()};
const _paintMenuFS=paintMenu;paintMenu=function(){_paintMenuFS.apply(this,arguments);const vr=$('#vrow');if(vr)vr.classList.toggle('hideV',true);
  document.querySelectorAll('#grid .tile').forEach(t=>{const i=+t.dataset.i;let sm=t.querySelector('small.fm');if(!sm){sm=document.createElement('small');sm.className='fm';t.querySelector('b').after(sm)}
    let v=i;if(!MENU_T){const qs=[ACT,0,1,2].filter(q=>q<MODE&&baseOf(SEL[q])==i);if(qs.length)v=SEL[qs[0]]}else if(TSEL&&baseOf(TSEL[ACT])==i)v=TSEL[ACT];
    if(t.dataset.fv!=v){t.dataset.fv=v;paintIc(t.querySelector('.ic'),DEF[v],50)}sm.textContent=v!=i?'• '+(DEF[v].name.split('•')[1]||'').trim():''})};
if($('#grid')&&$('#grid').children.length){fsBind();if(phase=='menu')paintMenu()}

// ---------- 설정 : 전체 볼륨 3개만 보이고 · 캐릭터를 누르면 그 캐릭터 소리만 조절 ----------
const SBASE={heavy:['slam','gulp','chew','spit'],gold:['skillshot','rush','floor1','floor2','floor3','floor4','floor5','floor6','floor7'],time:['knife','beam','tstop'],gun:['gun'],ink:['arrow','swing'],rose:['throw','slash'],monkey:['throw']};
const SCHAL=['ch_flip','ch_pre','ch_epic','ch_leg','ch_myth'];
const SGRP={bgm:{n:'배경음악',ic:'♪',c:'#7fb0ff',L:()=>['bgm_menu','bgm_battle','bgm_tour','bgm_final']},
  com:{n:'공통 효과음',ic:'✦',c:'#ffcf3f',L:()=>['hit','tick','heavy','cast','ult','cd','go','vs','ko','click','champ']},
  chal:{n:'도전 모드 카드',ic:'♦',c:'#ff8fb8',L:()=>SCHAL}};
function sndOf(i){const d=DEF[i],P=SPFX[d.k]||[],L=(SBASE[d.k]||[]).slice();SND.forEach(n=>{if(!SCHAL.includes(n)&&P.some(p=>n==p||n.startsWith(p))&&!L.includes(n))L.push(n)});return L.filter(n=>SND.includes(n))}
function sLabel(k){const s=SLB[k]||k,i=s.indexOf(' · ');return i>0&&s.slice(0,i).indexOf('(')<0?s.slice(i+3):s}
let SVIEW=null,SSCR=0;
mkSet=function(){const G2=$('#sgrid');if(!G2)return;SVIEW=null;G2.innerHTML='';G2.classList.add('sgl');const tt=$('#set .sh b');if(tt)tt.textContent='설정 · 사운드';
  const H=(t,sm)=>{const h=document.createElement('div');h.className='vh';h.innerHTML=t+(sm?'<small>'+sm+'</small>':'');G2.appendChild(h)};
  H('전체 볼륨');['m','b','s'].forEach(k=>G2.appendChild(setRow(k,1)));
  H('소리 하나씩 조절','캐릭터를 누르면 그 캐릭터 소리만 나와요');
  const sp=document.createElement('div');sp.className='sgsp';sp.innerHTML=Object.keys(SGRP).map(k=>`<button class="sgt sgx" data-g="${k}" style="--c:${SGRP[k].c}"><i>${SGRP[k].ic}</i><b>${SGRP[k].n}</b><small>${SGRP[k].L().length}개</small></button>`).join('');G2.appendChild(sp);
  const bases=DEF.map((d,i)=>i).filter(i=>DEF[i].vof==null);
  bases.forEach(b=>{const vs=VARS(b).filter(v=>sndOf(v).length);if(!vs.length)return;const s=document.createElement('section');s.className='sgsec';s.style.setProperty('--c',DEF[b].col);s.style.setProperty('--h',DEF[b].hi);
    s.innerHTML=`<div class="sgh"><canvas class="ic"></canvas><b>${DEF[b].name}</b></div><div class="sgg">${vs.map(v=>`<button class="sgt" data-d="${v}" style="--c:${DEF[v].col};--h:${DEF[v].hi}"><canvas class="ic"></canvas><b>${v==b?'기본':(DEF[v].name.split('•')[1]||DEF[v].name).trim()}</b><small>${sndOf(v).length}개</small></button>`).join('')}</div>`;G2.appendChild(s);
    paintIc(s.querySelector('.sgh .ic'),DEF[b],15,{nob:1});s.querySelectorAll('.sgt').forEach(t=>paintIc(t.querySelector('.ic'),DEF[+t.dataset.d],30,{nob:1}))});
  G2.querySelectorAll('.sgt').forEach(t=>t.addEventListener('click',()=>{audioOn();SFX('click');SSCR=G2.scrollTop;sOpen(t.dataset.g||+t.dataset.d)}));
  const rb=document.createElement('button');rb.className='vreset';rb.textContent='기본값으로 되돌리기';rb.addEventListener('click',()=>{VOL={m:1,b:1,s:1,p:{}};saveVol();mkSet()});G2.appendChild(rb);
  if(typeof uiStagger=='function')uiStagger('#sgrid .sgt',.012)};
function sOpen(id){const G2=$('#sgrid');SVIEW=id;G2.innerHTML='';const isG=typeof id=='string',L=isG?SGRP[id].L().filter(k=>k.indexOf('bgm')==0||SND.includes(k)):sndOf(id),nm=isG?SGRP[id].n:DEF[id].name,col=isG?SGRP[id].c:DEF[id].col;
  const tt=$('#set .sh b');if(tt)tt.textContent='사운드 · '+nm;
  const top=document.createElement('div');top.className='sgtop';top.style.setProperty('--c',col);top.innerHTML=`<button class="sgbk">‹ 목록</button>${isG?`<i>${SGRP[id].ic}</i>`:'<canvas class="ic"></canvas>'}<div><b>${nm}</b><small>소리 ${L.length}개 · ▶ 눌러서 들어보기</small></div>`;G2.appendChild(top);
  if(!isG)paintIc(top.querySelector('.ic'),DEF[id],26);
  top.querySelector('.sgbk').addEventListener('click',()=>{SFX('click');sBack()});
  // 이 캐릭터 소리 한번에
  if(L.length>1){const av=L.reduce((a,k)=>a+pv(k),0)/L.length,d=document.createElement('div');d.className='vrow sgall';d.innerHTML='<div class="vl"><b>이 목록 전부 한번에</b></div><input type="range" min="0" max="100" step="1" value="'+Math.round(av*100)+'"><span class="vp">'+Math.round(av*100)+'%</span>';
    const r=d.querySelector('input'),p=d.querySelector('.vp');r.addEventListener('input',()=>{p.textContent=r.value+'%';L.forEach(k=>VOL.p[k]=r.value/100);saveVol();G2.querySelectorAll('.vrow[data-k]').forEach(row=>{const ri=row.querySelector('input');ri.value=r.value;row.querySelector('.vp').textContent=r.value+'%'})});G2.appendChild(d)}
  L.forEach(k=>{const row=setRow(k);row.dataset.k=k;row.querySelector('.vl').innerHTML='<b>'+sLabel(k)+'</b>';G2.appendChild(row)});
  G2.scrollTop=0;if(typeof uiStagger=='function')uiStagger('#sgrid .vrow',.02)}
function sBack(){if(PREVB){PREVB=0;playBGM('bgm_menu',1)}mkSet();const G2=$('#sgrid');if(G2)G2.scrollTop=SSCR}
// 위쪽 ‹ 버튼 : 캐릭터 소리 화면이면 목록으로 · 목록이면 원래대로 홈으로
$('#set').addEventListener('click',e=>{if(SVIEW!=null&&e.target.closest('.sh .back')){e.stopPropagation();SFX('click');sBack()}},true);

// ======================================================================
// 언더테일 스타일 2 : VS 인카운터 · 스킬 배너 · 궁극기 배너 (토너먼트 인트로는 원래대로)
// ======================================================================
if(!SND.includes('ut_enc')){SND.push('ut_enc');if(!AUD.ut_enc)AUD.ut_enc=new SoundPool('sounds/ut_enc.mp3',2)}
SLB.ut_enc='전투 시작 · 심장 깜빡임';
if(typeof SGRP!='undefined'){const _L=SGRP.com.L;SGRP.com.L=()=>_L().concat(['ut_enc'])}
// 도트 초상화 : 아이콘을 작게 줄였다 키워서 픽셀 느낌
const UTPX={};
function utPix(D,n){const k=D.name+D.col+n;if(UTPX[k])return UTPX[k];const c=document.createElement('canvas');c.width=c.height=n;const x=c.getContext('2d');x.drawImage(ICON(D,40),0,0,n,n);
  try{const im=x.getImageData(0,0,n,n),d=im.data;for(let i=0;i<d.length;i+=4){for(let j=0;j<3;j++)d[i+j]=Math.min(255,Math.round(d[i+j]/40)*40);d[i+3]=d[i+3]>100?255:0}x.putImageData(im,0,0)}catch(e){}return UTPX[k]=c}
function utSprite(D,cx,cy,S,n){const c=utPix(D,n||30);g.save();g.imageSmoothingEnabled=false;g.drawImage(c,Math.round(cx-S/2),Math.round(cy-S/2),S,S);g.restore()}
// 글자 하나씩 타이핑
function utTy(txt,t,spd){const L=[...txt];return L.slice(0,clamp(Math.floor(t/spd),0,L.length)).join('')}
function utFit(txt,px,font,maxW){g.font=px+'px '+font;const w=g.measureText(txt).width;return w>maxW?Math.floor(px*maxW/w):px}

// ---------- VS : 언더테일 전투 시작 (심장 깜빡 → 상자로 날아감 → 상자 열림 → VS 베기) ----------
intro=function(){const p=clamp((4.4-tm)/1.4,0,1),T0=p*1.4,n=F.length,out=p>.9?Math.floor((p-.9)/.1*4)/4:0,vis=1-out;
  g.save();g.fillStyle='rgba(0,0,0,'+(.95*vis)+')';g.fillRect(-300,-300,A+600,A+600);g.fillStyle='rgba(255,255,255,.035)';for(let y=0;y<A;y+=4)g.fillRect(0,y,A,1);
  const W=n==3?178:236,H=n==3?250:290,cy=A*.42,sx=i=>n==3?A*(.18+.32*i):A*(.25+.5*i);
  F.forEach((f,i)=>{const D=f.d,bx=sx(i),hx0=A/2+(i-(n-1)/2)*46,hy0=A*.5;
    // 1) 심장 깜빡임
    if(T0<.3){if(Math.floor(T0/.06)%2==0)utHeart(hx0,hy0,4,D.col)}
    // 2) 상자로 날아감
    else if(T0<.46){const u=(T0-.3)/.16,e=u*u,x=hx0+(bx-hx0)*e,y=hy0+(cy-hy0)*e;for(let k=1;k<4;k++){g.globalAlpha=.25*(4-k)/3*vis;utHeart(hx0+(bx-hx0)*Math.max(0,e-k*.08),hy0+(cy-hy0)*Math.max(0,e-k*.08),4,D.col)}g.globalAlpha=vis;utHeart(x,y,4,D.col)}
    if(T0<.46)return;
    // 3) 상자 열림 (계단식)
    const k=T0-.46,op=Math.min(1,Math.ceil(k/.03)/4),w=W*op,h=H*Math.min(1,op*1.3);g.globalAlpha=vis;
    g.fillStyle=D.col;g.fillRect(bx-w/2+6,cy-h/2+6,w,h);g.fillStyle='#000';g.fillRect(bx-w/2,cy-h/2,w,h);g.strokeStyle='#fff';g.lineWidth=4;g.strokeRect(bx-w/2,cy-h/2,w,h);if(op<1)return;
    const S=n==3?104:132,bob=Math.round(Math.sin(clock*5+i*2)*2),sy=cy-H/2+14+S/2;
    g.save();g.globalCompositeOperation='lighter';glow(D.col,bx,sy,S*.75,.35);g.restore();
    if(k<.12){g.fillStyle='#fff';g.globalAlpha=vis*(1-k/.12);g.fillRect(bx-S/2,sy-S/2,S,S);g.globalAlpha=vis}
    utSprite(D,bx,sy+bob,S,n==3?28:32);
    g.textAlign='center';g.textBaseline='middle';const ny=sy+S/2+20,fs=utFit(D.name,n==3?15:19,UTKF,W-20);g.font=fs+'px '+UTKF;g.fillStyle='#fff';g.fillText(D.name,bx,ny);
    // HP 막대
    const bw=W-64,hy=ny+26;g.font='9px '+UTPF;g.textAlign='left';g.fillStyle='#fff';g.fillText('HP',bx-W/2+14,hy+1);g.fillStyle='#c00';g.fillRect(bx-W/2+40,hy-6,bw,12);g.fillStyle='#ff0';g.fillRect(bx-W/2+40,hy-6,bw*Math.min(1,k/.3),12);
    g.font='12px '+UTKF;g.textAlign='center';g.fillStyle='#ff0';const ul='* ULT · '+D.sk[2].n,ufs=utFit(ul,n==3?11:12,UTKF,W-16);g.font=ufs+'px '+UTKF;g.fillText(ul,bx,hy+24)});
  g.globalAlpha=vis;
  // 4) VS : 흰 베기 + 글리치
  if(T0>.62){const k=T0-.62,vx=A/2,vy=n==3?A*.75:cy,sh=k<.12?rnd(-5,5):0,s=k<.06?2-k/.06:1;
    if(k<.2){const q=k/.2;g.save();g.globalAlpha=vis*(1-q);g.strokeStyle='#fff';g.lineWidth=14*(1-q)+2;g.beginPath();g.moveTo(vx-260,vy-150+q*20);g.lineTo(vx+260,vy+150-q*20);g.stroke();g.restore()}
    g.save();g.translate(vx+sh,vy);g.scale(s,s);g.font='62px '+UTPF;g.textAlign='center';g.textBaseline='middle';g.lineJoin='round';g.lineWidth=12;g.strokeStyle='#000';g.strokeText('VS',0,4);
    const gl=k<.3||Math.random()<.06;if(gl){g.globalCompositeOperation='lighter';g.fillStyle='#ff0040';g.fillText('VS',-4,4);g.fillStyle='#00e5ff';g.fillText('VS',4,4);g.globalCompositeOperation='source-over'}
    g.fillStyle='#fff';g.fillText('VS',0,4);utHeart(0,46,3,'#ff0000');g.restore()}
  // 5) 아래 대사 상자
  if(T0>.5){const bw=A-56,by=A*.86,txt=n==2?F[0].d.name+' 와(과) '+F[1].d.name+' 이(가) 마주쳤다!':n==3?'세 명이 한꺼번에 덤벼든다!':'모두가 덤벼든다!';
    g.fillStyle='#000';g.fillRect(A/2-bw/2,by-30,bw,60);g.strokeStyle='#fff';g.lineWidth=4;g.strokeRect(A/2-bw/2,by-30,bw,60);
    const fs=utFit('* '+txt,17,UTKF,bw-36);g.font=fs+'px '+UTKF;g.textAlign='left';g.textBaseline='middle';g.fillStyle='#fff';g.fillText('* '+utTy(txt,T0-.5,.015),A/2-bw/2+18,by+1)}
  g.restore()};
const _updUTV=update;update=function(dt){if(phase=='cd'&&!TOURM&&!vsd){const T0=4.4-tm;if(T0>=.02&&!F.utEnc){F.utEnc=1;SFXa('ut_enc')}if(T0>=.62){vsd=1;SFX('vs');shake=Math.max(shake,14)}}_updUTV(dt)};

// ---------- 스킬 배너 : 대사 상자 ----------
function utSkill(){const D=bn.d,t=bn.t,txt=bn.txt;g.save();g.font='18px '+UTKF;const tw=g.measureText('* '+txt).width,w=Math.max(180,tw+66),h=44,y=26,side=bn.side?1:0,x=side?A-14-w:14;
  if(t>1.2&&Math.floor(t*16)%2){g.restore();return}
  const op=t<.09?Math.ceil(t/.03)/3:1,ww=w*op,xx=side?x+w-ww:x;
  g.fillStyle=D.col;g.fillRect(xx+5,y+5,ww,h);g.fillStyle='#000';g.fillRect(xx,y,ww,h);g.strokeStyle='#fff';g.lineWidth=3;g.strokeRect(xx,y,ww,h);
  if(op<1){g.restore();return}
  const beat=1+.15*Math.max(0,Math.sin(t*9))**8;utHeart(x+24,y+h/2,2.4*beat,D.col);
  g.textAlign='left';g.textBaseline='middle';g.fillStyle='#fff';g.fillText('* '+utTy(txt,t-.08,.035),x+42,y+h/2+1);
  if(t>.08&&t<.3){const q=(t-.08)/.22;g.save();g.beginPath();g.rect(x,y,w,h);g.clip();g.globalAlpha=.55*(1-q);g.fillStyle='#fff';g.beginPath();const sx=x-30+q*(w+60);g.moveTo(sx,y);g.lineTo(sx+18,y);g.lineTo(sx-2,y+h);g.lineTo(sx-20,y+h);g.fill();g.restore()}
  g.restore()}
// ---------- 궁극기 배너 : 전투 상자 + 도트 초상화 + 공격 게이지 ----------
ultTitle=function(){const D=bn.d,t=bn.t,txt=bn.txt,cy=A*.5,W=A-24,H=134,x0=12;
  const out=t>1.22?Math.min(1,Math.ceil((t-1.22)/.07)/4):0,op=t<.12?Math.ceil(t/.03)/4:1,hh=H*op*(1-out);
  g.save();g.globalAlpha=.55*(1-out)*Math.min(1,t/.1);g.fillStyle='#000';g.fillRect(-300,-300,A+600,A+600);g.globalAlpha=1;
  if(hh<2){g.restore();return}
  const sk=t>.62&&t<.74?rnd(-4,4):0;g.translate(sk,0);
  g.fillStyle=D.col;g.fillRect(x0+7,cy-hh/2+7,W,hh);g.fillStyle='#000';g.fillRect(x0,cy-hh/2,W,hh);g.strokeStyle='#fff';g.lineWidth=5;g.strokeRect(x0,cy-hh/2,W,hh);
  if(op<1||out>0){g.restore();return}
  // 초상화
  const px=x0+16,py=cy-H/2+13,PS=108;g.strokeStyle='#fff';g.lineWidth=3;g.strokeRect(px,py,PS,PS);g.save();g.beginPath();g.rect(px,py,PS,PS);g.clip();g.save();g.globalCompositeOperation='lighter';glow(D.col,px+PS/2,py+PS/2,PS*.7,.4);g.restore();
  const jt=t>.62?Math.round(Math.sin(t*60)*2):0;utSprite(D,px+PS/2+jt,py+PS/2+2,PS+18,26);
  // 빨간 베기 (언더테일 공격)
  if(t>.62&&t<.86){const q=(t-.62)/.24;g.globalAlpha=1-q;g.fillStyle='#ff0000';g.beginPath();g.moveTo(px-10,py+PS+10);g.quadraticCurveTo(px+PS*.5,py+PS*.5-14*(1-q),px+PS+10,py-10);g.quadraticCurveTo(px+PS*.5+8,py+PS*.5+10,px-10,py+PS+10);g.fill()}g.restore();
  // 글자
  const tx=px+PS+20,tw=x0+W-tx-18;g.textAlign='left';g.textBaseline='middle';g.font='12px '+UTPF;g.fillStyle='#ff0';g.fillText('* ULTIMATE',tx,cy-40);
  const uw=g.measureText('* ULTIMATE').width;g.font=utFit(D.name,13,UTKF,tw-uw-14)+'px '+UTKF;g.fillStyle='#9a9a9a';g.fillText(D.name,tx+uw+14,cy-39);
  const fs=utFit(txt,40,UTKF,tw),L=[...txt],nn=clamp(Math.floor((t-.1)/.05),0,L.length);g.font=fs+'px '+UTKF;let cx=tx;
  for(let i=0;i<nn;i++){const ch=L[i],cw=g.measureText(ch).width,age=t-.1-i*.05,s=age<.08?1.6-age/.08*.6:1,jy=t>.62?rnd(-1.5,1.5):0;g.save();g.translate(cx+cw/2,cy+6+jy);g.scale(s,s);g.fillStyle=D.col;g.fillText(ch,-cw/2+3,3);g.fillStyle='#fff';g.fillText(ch,-cw/2,0);g.restore();cx+=cw}
  // 공격 게이지
  const my=cy+42,mw=tw,mh=16;g.strokeStyle='#fff';g.lineWidth=2;g.strokeRect(tx,my-mh/2,mw,mh);g.save();g.beginPath();g.rect(tx,my-mh/2,mw,mh);g.clip();
  for(let i=0;i<12;i++){const u=i/11,xx=tx+u*mw,c=Math.abs(u-.5);g.fillStyle=c<.06?'#ff0':c<.2?'#3a3a3a':'#1a1a1a';g.fillRect(xx-mw/24,my-mh/2,mw/12-2,mh)}
  g.fillStyle='rgba(255,255,255,.25)';g.fillRect(tx+mw/2-1,my-mh/2,2,mh);
  const bu=clamp((t-.22)/.4,0,1),bxx=tx+bu*mw*.5+(t>.62?0:0);if(t<1.2){g.fillStyle=t>.62&&Math.floor(t*20)%2?'#ff0':'#fff';g.fillRect(bxx-4,my-mh/2-2,8,mh+4);g.fillStyle='#000';g.fillRect(bxx-1,my-mh/2,2,mh)}g.restore();
  g.restore()};
banner=function(){if(typeof CIN!='undefined'&&CIN&&CIN.draw)CIN.draw();if(!bn)return;if(bn.ult){ultTitle();return}utSkill()};
;
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ▶ 섹션 : 캐릭터 공방
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ======================================================================
// 캐릭터 공방 : 기본 캐릭터를 골라 이름 · 색 · 아이콘 · 스킬 3개 · 패시브를 직접 조립한 나만의 변이
// 스킬 = 모양 (탄환 · 장판 · 돌진 · 레이저 · 소환구 · 지뢰 · 충격파 · 낙하) + 효과 2개까지 + 위력 1~3
// 포인트 36 안에서만 조립 가능 · 폰에 저장 (localStorage) · 코드로 친구에게 공유
// ======================================================================
const CWSH={shot:{n:'탄환',d:'적에게 탄을 여러 발 쏨',c:3,D:15,cd:7,rg:520},zone:{n:'장판 폭발',d:'적이 갈 자리에 표시 → 잠시 뒤 폭발',c:3,D:11.5,cd:8,rg:520},dash:{n:'돌진',d:'적에게 돌진해 들이받음',c:3,D:13,cd:8,rg:380},beam:{n:'레이저',d:'힘을 모았다가 일직선 레이저',c:4,D:17,cd:9,rg:560},
  orb:{n:'소환구',d:'곁에 떠다니며 4번 쏘는 구슬',c:4,D:15,cd:9,rg:480},trap:{n:'지뢰',d:'적 주변에 지뢰 · 가까운 적에게 기어가 폭발',c:3,D:18,cd:9,rg:480},nova:{n:'충격파',d:'나를 중심으로 퍼지는 고리',c:3,D:12,cd:7,rg:210},fall:{n:'낙하',d:'하늘에서 떨어져 내리꽂힘',c:3,D:12.5,cd:8,rg:540}};
const CWFX={burn:{n:'화상',d:'불이 붙어 추가 피해',c:2},frost:{n:'빙결',d:'1.6초 동안 느려짐',c:2},stun:{n:'기절',d:'0.45초 기절',c:4},vamp:{n:'흡혈',d:'준 피해의 25% 회복',c:4},knock:{n:'넉백',d:'멀리 밀어냄',c:1},pull:{n:'끌어당김',d:'내 쪽으로 끌어옴',c:2},
  split:{n:'분열',d:'맞으면 작은 탄 3개로 갈라짐',c:3},chain:{n:'연쇄 번개',d:'번개가 한 번 더 떨어짐 (40%)',c:3},pierce:{n:'관통',d:'탄이 적을 뚫고 지나감',c:2,only:['shot','orb']},big:{n:'거대화',d:'범위 1.5배 · 피해 +10%',c:2},fast:{n:'빠른 장전',d:'쿨타임 28% 감소',c:3,noult:1}};
const CWPS={tank:{n:'단단함',d:'받는 피해 -12%',c:4},swift:{n:'날렵함',d:'이동 속도 +15%',c:3},leech:{n:'흡혈귀',d:'준 피해의 8% 회복',c:4},berserk:{n:'광전사',d:'체력 40 이하면 주는 피해 +30%',c:3},regen:{n:'재생',d:'1초마다 체력 0.3 회복',c:4},focus:{n:'집중',d:'쿨타임이 15% 빨리 돎',c:4},giant:{n:'거대',d:'크기 +20% · 피해 +8% · 이동 -8%',c:3},luck:{n:'행운',d:'15% 확률로 피해 2배',c:4}};
const CWPW=[1,1.35,1.7],CWPC=[0,3,6],CWB=36,CWSND={shot:'cw_shot',zone:'cw_zone',dash:'cw_dash',beam:'cw_beam',orb:'cw_orb',trap:'cw_trap',nova:'cw_nova',fall:'cw_fall'};
const NEW35=['cw_shot','cw_zone','cw_dash','cw_beam','cw_orb','cw_trap','cw_nova','cw_fall','cw_boom','cw_zap'];
NEW35.forEach(n=>{if(!SND.includes(n))SND.push(n);if(!AUD[n])AUD[n]=new SoundPool('sounds/'+n+'.mp3',4)});
Object.assign(SLB,{cw_shot:'공방 · 탄환',cw_zone:'공방 · 장판 표시',cw_dash:'공방 · 돌진',cw_beam:'공방 · 레이저',cw_orb:'공방 · 소환구',cw_trap:'공방 · 지뢰 설치',cw_nova:'공방 · 충격파',cw_fall:'공방 · 낙하',cw_boom:'공방 · 폭발',cw_zap:'공방 · 연쇄 번개'});
// 아이콘 기본 모양 (점 좌표 -100~100)
const CWICP={star:[[0,-90,21,-29,86,-28,34,11,53,73,0,35,-53,73,-34,11,-86,-28,-21,-29,0,-90]],heart:[[0,80,-70,10,-80,-40,-45,-75,0,-45,45,-75,80,-40,70,10,0,80]],bolt:[[20,-90,-40,10,0,10,-20,90,40,-10,0,-10,20,-90]],
  crown:[[-80,50,-80,-40,-40,0,0,-70,40,0,80,-40,80,50,-80,50],[-80,70,80,70]],flame:[[0,-90,40,-30,50,20,30,70,0,85,-30,70,-50,20,-35,-20,-10,-5,0,-90],[0,30,15,55,0,70,-15,55,0,30]],eye:[[-90,0,-45,-45,0,-55,45,-45,90,0,45,45,0,55,-45,45,-90,0],[0,-25,25,0,0,25,-25,0,0,-25]],
  sword:[[0,-95,15,-75,15,40,-15,40,-15,-75,0,-95],[-45,40,45,40],[0,40,0,85]],skull:[[-60,10,-65,-40,-35,-75,35,-75,65,-40,60,10,35,30,35,65,-35,65,-35,30,-60,10],[-35,-20,-15,-20],[15,-20,35,-20],[-10,45,-10,60],[10,45,10,60]],
  moon:[[30,-80,-30,-70,-70,-20,-60,40,-20,80,40,80,75,45,30,45,-5,15,-10,-35,30,-80]],note:[[-30,60,-30,-70,60,-90,60,40],[-30,-30,60,-50],[-55,60,-30,75,-5,60,-30,45,-55,60],[35,40,60,55,85,40,60,25,35,40]]};
function cwCost(sp){let c=CWPS[sp.ps]?CWPS[sp.ps].c:0;sp.sk.forEach(s=>{c+=CWSH[s.sh].c+CWPC[s.pw-1];s.fx.forEach(f=>c+=CWFX[f]?CWFX[f].c:0)});return c}
function cwDmg(s,ult){return .93*CWSH[s.sh].D*CWPW[s.pw-1]*(ult?1.5:1)*(s.fx.includes('big')?1.1:1)}
function cwCd(s,j){return Math.round(CWSH[s.sh].cd*(s.fx.includes('fast')?.72:1)*(j==1?1.15:1)*10)/10}
function cwPieces(s,ult){return{shot:ult?7:3,orb:ult?12:4,trap:ult?5:3,beam:ult?3:1,dash:ult?3:1}[s.sh]||1}
function cwDmgTxt(s,ult){const D=cwDmg(s,ult),n=cwPieces(s,ult),r=v=>Math.round(v*10)/10;return n>1?r(D/n)+'×'+n:''+r(D)}

// ---------- 스킬 실행 ----------
function cwCast(o,t,s,ult){if(!t||t.dead)t=tgt(o);if(!t)return;const D=cwDmg(s,ult),bg=s.fx.includes('big')?1.5:1,K=ult?1:0,sh=s.sh,a=ang(o,t);SFXa(s.snd||CWSND[sh]);
  const h={k:'cwz',o,tg:t,t:0,s,D,bg,K,sh,a,B:[],ch:[],hit:new Set(),col:o.d.col,hi:o.d.hi};
  const lead=d=>({x:clamp(t.x+t.dx*t.sp*d,30,A-30),y:clamp(t.y+t.dy*t.sp*d,30,A-30)});
  if(sh=='shot'){const n=cwPieces(s,ult),sp=K?.16:.2;for(let i=0;i<n;i++){const aa=a+(i-(n-1)/2)*sp;h.B.push({x:o.x+Math.cos(aa)*(o.r+6),y:o.y+Math.sin(aa)*(o.r+6),a:aa,v:600,t:0,r:7*bg,dm:D/n,hs:[]})}h.end=0}
  else if(sh=='zone'){const p=lead(.75);h.x=p.x;h.y=p.y;h.R=70*bg*(K?1.6:1);h.dl=.75}
  else if(sh=='fall'){const p=lead(.9);h.x=p.x;h.y=p.y;h.R=60*bg*(K?1.7:1);h.dl=.9}
  else if(sh=='dash'){h.n=K?3:1;h.i=0;h.P=[];h.sg=null}
  else if(sh=='beam'){h.w=20*bg*(K?2:1);h.ch2=.55;h.n=K?3:1;h.fi=0}
  else if(sh=='orb'){h.orbs=Array.from({length:K?3:1},(_,i)=>({a:i*TAU/(K?3:1),x:o.x,y:o.y}));h.ns=0}
  else if(sh=='trap'){const n=cwPieces(s,ult);h.M=[];for(let i=0;i<n;i++){const aa=rnd(0,TAU),d=rnd(40,80);h.M.push({x:clamp(t.x+Math.cos(aa)*d,24,A-24),y:clamp(t.y+Math.sin(aa)*d,24,A-24),t:0,ax:o.x,ay:o.y,dm:D/n,boom:0})}}
  else if(sh=='nova'){h.R=150*bg*(K?1.6:1)}
  HZ.push(h)}
function cwHit(h,x,dm,depth){const o=h.o;if(!x||x.dead||x.hid)return;const hp0=x.hp;hurt(x,dm,o,x.x,x.y,0,dm>=5?1:0);const dealt=Math.max(0,hp0-x.hp),F2=h.s.fx;
  if(F2.includes('burn')){x.burn=Math.max(x.burn||0,.55)}
  if(F2.includes('frost'))x.slow=Math.max(x.slow,1.6);
  if(F2.includes('stun')){x.stn=Math.max(x.stn,.45);x.cast=null}
  if(F2.includes('vamp')&&!o.dead)o.hp=Math.min(100,o.hp+dealt*.25);
  if(F2.includes('knock')&&!x.dead)safePush(x,Math.atan2(x.y-o.y,x.x-o.x),50);
  if(F2.includes('pull')&&!x.dead)safePush(x,Math.atan2(o.y-x.y,o.x-x.x),45);
  if(!depth&&F2.includes('split')&&!(h.spl>=4)){h.spl=(h.spl||0)+1;for(let i=0;i<3;i++){const a=rnd(0,TAU);h.B.push({x:x.x+Math.cos(a)*(x.r+8),y:x.y+Math.sin(a)*(x.r+8),a,v:430,t:0,r:5,dm:dm*.22,mini:1,hs:[x]})}}
  if(!depth&&F2.includes('chain'))h.ch.push({t:h.t+.18,x,dm:dm*.4})}
function cwBoom(h,x,y,R){SFXa('cw_boom');shake=Math.max(shake,h.K?16:8);ring(x,y,6,R+10,h.hi,h.K?9:6,.45);ring(x,y,6,R*.7,h.col,4,.35);if(typeof lkImp=='function')lkImp(x,y,R*1.1,h.hi);for(let i=0;i<(h.K?18:9);i++)sparkP(x,y,rnd(-220,220),rnd(-220,220),i%2?h.col:h.hi,rnd(2,4))}
HZX.cwz=(h,dt,EN)=>{const o=h.o,s=h.s,t=h.t;let e=h.tg;if(!e||e.dead){e=tgt(o);h.tg=e}const pierce=s.fx.includes('pierce');
  if(h.sh=='zone'||h.sh=='fall'){if(!h.bm&&t>=h.dl){h.bm=1;cwBoom(h,h.x,h.y,h.R);EN.forEach(x=>{if(!x.hid&&!x.jump&&Math.hypot(x.x-h.x,x.y-h.y)<h.R+x.r*.5)cwHit(h,x,h.D)})}h.end=h.bm&&t>h.dl+.25}
  else if(h.sh=='nova'){const rr=Math.min(1,t/.45)*h.R;h.rr=rr;EN.forEach(x=>{if(x.hid||h.hit.has(x))return;if(Math.hypot(x.x-o.x,x.y-o.y)<rr+x.r){h.hit.add(x);cwHit(h,x,h.D)}});h.end=t>=.6}
  else if(h.sh=='dash'){if(o.dead){h.end=1}else if(!h.sg&&h.i<h.n&&e){const a=Math.atan2(e.y-o.y,e.x-o.x)+(h.i==1?.5:h.i==2?-.5:0),L=Math.min(Math.hypot(e.x-o.x,e.y-o.y)+90,340);h.sg={sx:o.x,sy:o.y,a,L,d:0};h.hit=new Set();if(h.i)SFXa(s.snd||'cw_dash')}
    if(h.sg){const g2=h.sg,st=Math.min(950*dt,g2.L-g2.d);g2.d+=st;o.x=clamp(o.x+Math.cos(g2.a)*st,o.r,A-o.r);o.y=clamp(o.y+Math.sin(g2.a)*st,o.r,A-o.r);o.gcd=Math.max(o.gcd,.25);o.cast=null;h.P.push({x:o.x,y:o.y,t});
      EN.forEach(x=>{if(x.hid||x.jump||h.hit.has(x))return;if(Math.hypot(x.x-o.x,x.y-o.y)<x.r+o.r+6){h.hit.add(x);cwHit(h,x,h.D/h.n);shake=Math.max(shake,8)}});if(g2.d>=g2.L-.5){h.sg=null;h.i++;h.pz=t}}
    h.P=h.P.filter(p=>t-p.t<.3);if(h.i>=h.n&&!h.sg)h.end=1;else if(!h.sg&&h.i<h.n&&!e)h.end=1}
  else if(h.sh=='beam'){if(!o.dead&&h.fi<h.n){const tc=h.ch2+h.fi*.28;if(t<tc-.15&&e){const ta=Math.atan2(e.y-o.y,e.x-o.x);h.a+=Math.atan2(Math.sin(ta-h.a),Math.cos(ta-h.a))*Math.min(1,dt*8)}o.gcd=Math.max(o.gcd,.25);
      if(t>=tc){h.fi++;h.ft=t;SFXa(h.fi==1?'cw_zap':'cw_zap');shake=Math.max(shake,h.K?12:7);const sx=o.x,sy=o.y,ex=sx+Math.cos(h.a)*900,ey=sy+Math.sin(h.a)*900;h.bl={sx,sy,ex,ey};EN.forEach(x=>{if(x.hid||x.jump)return;if(segD(x.x,x.y,sx,sy,ex,ey)<x.r+h.w*.5)cwHit(h,x,h.D/h.n)})}}
    h.end=(h.fi>=h.n&&t>h.ft+.3)||(o.dead&&h.fi==0)}
  else if(h.sh=='orb'){if(o.dead){h.end=1}else{h.orbs.forEach((b,i)=>{b.a+=dt*2.4;const tx=o.x+Math.cos(b.a)*(o.r+26),ty=o.y+Math.sin(b.a)*(o.r+26);b.x+=(tx-b.x)*Math.min(1,dt*10);b.y+=(ty-b.y)*Math.min(1,dt*10)});
      const per=h.K?.3:.85,tot=cwPieces(s,h.K);if(h.ns<tot&&t>=.35+h.ns*per&&e&&!e.hid){const b=h.orbs[h.ns%h.orbs.length],a=Math.atan2(e.y-b.y,e.x-b.x);h.B.push({x:b.x,y:b.y,a,v:620,t:0,r:6*h.bg,dm:h.D/tot,hs:[]});h.ns++;SFXa('cw_shot')}
      h.end=h.ns>=tot||t>5}}
  else if(h.sh=='trap'){h.M.forEach(m=>{m.t+=dt;if(m.boom)return;if(m.t<.35)return;const arm=m.t>.6;if(arm){const q=EN.filter(x=>!x.hid&&!x.dead).sort((a,b)=>Math.hypot(a.x-m.x,a.y-m.y)-Math.hypot(b.x-m.x,b.y-m.y))[0];if(q&&Math.hypot(q.x-m.x,q.y-m.y)<150){const a2=Math.atan2(q.y-m.y,q.x-m.x);m.x+=Math.cos(a2)*110*dt;m.y+=Math.sin(a2)*110*dt}}let go=m.t>4.5;if(arm)EN.forEach(x=>{if(!x.hid&&!x.jump&&Math.hypot(x.x-m.x,x.y-m.y)<x.r+22*h.bg)go=true});
      if(go){m.boom=1;cwBoom(h,m.x,m.y,46*h.bg);EN.forEach(x=>{if(!x.hid&&!x.jump&&Math.hypot(x.x-m.x,x.y-m.y)<52*h.bg+x.r*.5)cwHit(h,x,m.dm)})}});h.end=h.M.every(m=>m.boom)}
  else if(h.sh=='shot'){h.end=1}
  // 탄 (탄환 · 소환구 · 분열)
  h.B=h.B.filter(b=>{b.t+=dt;b.x+=Math.cos(b.a)*b.v*dt;b.y+=Math.sin(b.a)*b.v*dt;if(b.t>1.4||b.x<-20||b.x>A+20||b.y<-20||b.y>A+20)return false;
    for(const x of EN){if(x.hid||x.jump||b.hs.includes(x))continue;if(Math.hypot(x.x-b.x,x.y-b.y)<x.r+b.r){b.hs.push(x);cwHit(h,x,b.dm,b.mini);if(!(pierce&&!b.mini))return false}}return true});
  // 연쇄 번개
  h.ch=h.ch.filter(c=>{if(t<c.t)return true;const others=EN.filter(x=>!x.dead&&!x.hid&&x!=c.x),y=others.length?others.sort((a,b)=>dist(a,c.x)-dist(b,c.x))[0]:c.x;if(y&&!y.dead){FX.push({k:'stzap',x:y.x,y:y.y,l:.35,m:.35});SFXa('cw_zap');cwHit(h,y,c.dm,1)}return false});
  return !(h.end&&!h.B.length&&!h.ch.length)||t<.05};
HZP.cwz=h=>{const o=h.o,t=h.t,C=h.col,Hi=h.hi;
  if(h.sh=='zone'||h.sh=='fall'){if(!h.bm){const u=t/h.dl;g.save();g.translate(h.x,h.y);g.strokeStyle=C;g.globalAlpha=.4+.5*u;g.lineWidth=3;g.setLineDash([10,7]);g.lineDashOffset=-t*40;g.beginPath();g.arc(0,0,h.R,0,TAU);g.stroke();g.setLineDash([]);g.globalAlpha=.18+.25*u*(.6+.4*Math.sin(t*30));g.fillStyle=C;g.beginPath();g.arc(0,0,h.R*u,0,TAU);g.fill();g.restore();
      if(h.sh=='fall'){const yy=h.y-(1-u*u)*520,sz=(h.K?26:16)*h.bg;g.save();g.globalCompositeOperation='lighter';const gr=g.createLinearGradient(h.x,yy-120,h.x,yy);gr.addColorStop(0,C+'00');gr.addColorStop(1,Hi);g.strokeStyle=gr;g.lineWidth=sz*.9;g.lineCap='round';g.beginPath();g.moveTo(h.x,yy-120);g.lineTo(h.x,yy);g.stroke();glow(Hi,h.x,yy,sz*2.2,1);g.restore();g.save();g.fillStyle='#0a0a12';g.strokeStyle=Hi;g.lineWidth=2;g.beginPath();g.arc(h.x,yy,sz*.7,0,TAU);g.fill();g.stroke();g.restore()}}
    else if(t-h.dl<.25){const k=(t-h.dl)/.25;g.save();g.globalCompositeOperation='lighter';glow(Hi,h.x,h.y,h.R*1.4*(1-k*.4),1-k);g.restore()}}
  else if(h.sh=='nova'&&t<.6){const k=Math.min(1,t/.45),al=t<.45?1:1-(t-.45)/.15;g.save();g.globalAlpha=al;g.globalCompositeOperation='lighter';g.strokeStyle=C;g.lineWidth=(h.K?22:12)*(1-k)+3;g.beginPath();g.arc(o.x,o.y,h.rr||1,0,TAU);g.stroke();g.strokeStyle=Hi;g.lineWidth=3;g.stroke();g.restore()}
  else if(h.sh=='dash'){h.P.forEach((p,i)=>{g.save();g.globalAlpha=.35*(1-(t-p.t)/.3);g.globalCompositeOperation='lighter';glow(C,p.x,p.y,o.r*1.5,.6);g.restore()});if(h.sg){g.save();g.globalCompositeOperation='lighter';g.strokeStyle=Hi;g.lineWidth=4;g.beginPath();g.moveTo(h.sg.sx,h.sg.sy);g.lineTo(o.x,o.y);g.stroke();g.restore()}}
  else if(h.sh=='beam'&&!o.dead){if(h.fi<h.n){const tc=h.ch2+h.fi*.28,p=clamp(1-(tc-t)/h.ch2,0,1);g.save();g.strokeStyle=C;g.globalAlpha=.3+.5*p;g.lineWidth=1+3*p;g.setLineDash([12,8]);g.beginPath();g.moveTo(o.x,o.y);g.lineTo(o.x+Math.cos(h.a)*700,o.y+Math.sin(h.a)*700);g.stroke();g.setLineDash([]);g.globalCompositeOperation='lighter';glow(Hi,o.x+Math.cos(h.a)*(o.r+6),o.y+Math.sin(h.a)*(o.r+6),6+20*p,p);g.restore()}
    if(h.bl&&t-h.ft<.3){const k=(t-h.ft)/.3,b=h.bl;g.save();g.globalCompositeOperation='lighter';g.lineCap='round';g.strokeStyle=C;g.globalAlpha=1-k;g.lineWidth=h.w*(1-k*.6);g.beginPath();g.moveTo(b.sx,b.sy);g.lineTo(b.ex,b.ey);g.stroke();g.strokeStyle='#ffffff';g.lineWidth=h.w*.35*(1-k);g.stroke();g.restore()}}
  else if(h.sh=='orb'&&!h.end&&!o.dead){h.orbs.forEach(b=>{g.save();g.globalCompositeOperation='lighter';glow(C,b.x,b.y,18*h.bg,.8);g.restore();g.save();g.fillStyle='#0a0a12';g.strokeStyle=Hi;g.lineWidth=2;g.beginPath();g.arc(b.x,b.y,7*h.bg,0,TAU);g.fill();g.stroke();g.fillStyle=Hi;g.beginPath();g.arc(b.x,b.y,2.5,0,TAU);g.fill();g.restore()})}
  else if(h.sh=='trap'){h.M.forEach(m=>{if(m.boom)return;let x=m.x,y=m.y;if(m.t<.35){const u=m.t/.35;x=m.ax+(m.x-m.ax)*u;y=m.ay+(m.y-m.ay)*u-Math.sin(Math.PI*u)*60}g.save();g.translate(x,y);g.fillStyle='#0a0a12';g.strokeStyle=C;g.lineWidth=2;g.beginPath();g.arc(0,0,9*h.bg,0,TAU);g.fill();g.stroke();
      const bl=m.t>.6&&Math.sin(m.t*(m.t>3.8?40:12))>0;g.fillStyle=bl?'#ff3040':Hi;g.beginPath();g.arc(0,0,3,0,TAU);g.fill();if(m.t>.6){g.strokeStyle=C;g.globalAlpha=.25;g.setLineDash([4,5]);g.beginPath();g.arc(0,0,22*h.bg,0,TAU);g.stroke();g.setLineDash([])}g.restore()})}
  h.B.forEach(b=>{g.save();g.globalCompositeOperation='lighter';glow(C,b.x,b.y,b.r*2.6,.8);g.restore();g.save();g.fillStyle=Hi;g.beginPath();g.arc(b.x,b.y,b.r*.55,0,TAU);g.fill();g.restore()})};
// 패시브
const _hurtCW=hurt;hurt=function(t,n,o){if(!(n>0)||!t)return _hurtCW.apply(this,arguments);const a=[...arguments];let m=1;
  if(t.d&&t.d.cw&&o!=t&&t.d.cw.ps=='tank')m*=.88;
  if(o&&o.d&&o.d.cw&&t!=o){const P=o.d.cw.ps;if(P=='berserk'&&o.hp<=40)m*=1.3;if(P=='giant')m*=1.08;if(P=='luck'&&Math.random()<.15){m*=2;ft(t.x,t.y-t.r-40,'치명타!','#ffe066',18)}}
  a[1]=Math.round(n*m*10)/10;const hp0=t.hp,r=_hurtCW.apply(this,a);if(o&&o.d&&o.d.cw&&o.d.cw.ps=='leech'&&t!=o&&!o.dead)o.hp=Math.min(100,o.hp+Math.max(0,hp0-t.hp)*.08);return r};
const _updCW=update;update=function(dt){_updCW(dt);if(!F||phase!='play')return;F.forEach(f=>{if(f.dead||!f.d.cw)return;const P=f.d.cw.ps;if(P=='regen')f.hp=Math.min(100,f.hp+dt*.3);if(P=='focus')f.cds=f.cds.map(v=>v-dt*.15)})};
const _initCW=init;init=function(){_initCW.apply(this,arguments);if(F)F.forEach(f=>{if(!f.d.cw)return;const P=f.d.cw.ps;if(P=='swift')f.sp*=1.15;if(P=='giant'){f.r*=1.2;f.sp*=.92}})};
// 아이콘 (네온 선)
function cwPath(S,sc){g.beginPath();S.forEach(st=>{for(let i=0;i<st.length;i+=2){const x=st[i]/100*sc,y=st[i+1]/100*sc;i?g.lineTo(x,y):g.moveTo(x,y)}})}
function cwEmb(sp){return(f,D)=>{g.rotate(-f.rot+Math.sin(clock*2)*.04);const S=sp.ic&&sp.ic.length?sp.ic:(CWICP[sp.icp]||CWICP.star);neon(D,1.7,()=>cwPath(S,18));g.save();g.globalCompositeOperation='lighter';glow(D.col,0,0,16,.25);g.restore()}}
// 등록
function cwSkillDef(s,j){const ult=j==2,sh=CWSH[s.sh];return{n:s.n||(ult?'궁극 ':'')+sh.n,w:ult?.4:.3,cd:cwCd(s,j),ult:ult?1:undefined,cw:1,c:(o,t)=>!t.hid&&dist(o,t)<sh.rg*(ult&&s.sh=='nova'?1.25:1),f:(o,t)=>cwCast(o,t,s,ult)}}
function cwInfo(sp){const P=CWPS[sp.ps],avg=sp.sk.reduce((a,s)=>a+s.pw,0)/3,bigs=sp.sk.filter(s=>s.fx.includes('big')).length,longR=sp.sk.filter(s=>['shot','beam','fall','zone'].includes(s.sh)).length;
  return{st:[clamp(Math.round(5+avg*1.3),1,10),clamp(6+(sp.ps=='tank'?2:0)+(sp.ps=='regen'||sp.ps=='leech'?1:0),1,10),clamp(7+(sp.ps=='swift'?2:0)-(sp.ps=='giant'?1:0),1,10),clamp(5+longR,1,10),clamp(6+bigs,1,10),clamp(7+sp.sk[2].pw,1,10)],
    p:(P?P.n+' · '+P.d:'')+' · 직접 만든 캐릭터',sk:sp.sk.map((s,j)=>[cwDmgTxt(s,j==2),CWSH[s.sh].d+(s.fx.length?' · '+s.fx.map(f=>CWFX[f].n).join(' · '):'')+(s.pw>1?' · 위력 '+s.pw:'')])}}
function cwDefOf(sp){const B=DEF[sp.b];return{name:B.name+' • '+sp.nm,gl:[...sp.nm][0]||'?',k:'cw'+sp.id,vof:sp.b,heavy:B.heavy,r:B.r,sp:B.sp,col:sp.c[0],hi:sp.c[1],dk:sp.c[2],alt:{col:'#e8e8ee',hi:sp.c[0],dk:'#202028'},alt2:{col:'#2a2a30',hi:sp.c[1],dk:'#000000'},sk:sp.sk.map(cwSkillDef),cw:sp}}
function cwFind(id){return DEF.findIndex(d=>d.cw&&d.cw.id==id)}
function cwRegister(sp){const nd=cwDefOf(sp);let i=cwFind(sp.id);if(DEF.some((d,j)=>j!=i&&d.name==nd.name)){nd.name+=' '+sp.id.slice(-2)}
  if(i>=0){const od=DEF[i];if(od.name!=nd.name)delete INFO[od.name];Object.keys(od).forEach(k=>delete od[k]);Object.assign(od,nd)}else{DEF.push(nd);i=DEF.length-1}
  INFO[nd.name]=cwInfo(sp);EMB[nd.k]=cwEmb(sp);return i}
function cwRefresh(){Object.keys(ICC).forEach(k=>delete ICC[k]);if(typeof UTPX!='undefined')Object.keys(UTPX).forEach(k=>delete UTPX[k]);
  document.querySelectorAll('#grid .tile').forEach(t=>{const i=+t.dataset.i,vc=DEF.filter(x=>x.vof===i).length;let em=t.querySelector('.vb');if(vc){if(!em){em=document.createElement('em');em.className='vb';t.appendChild(em)}em.textContent='+'+vc}else if(em)em.remove()});
  try{mkDict()}catch(e){}try{document.querySelectorAll('#grid .tile').forEach(t=>{t.dataset.fv='';paintIc(t.querySelector('.ic'),DEF[+t.dataset.i],50)})}catch(e){}}
function cwRemove(id){const i=cwFind(id);if(i<0)return;const d=DEF[i];delete INFO[d.name];delete EMB[d.k];DEF.splice(i,1);const fix=v=>v==i?d.vof:v>i?v-1:v;if(Array.isArray(SEL))SEL=SEL.map(fix);if(typeof TSEL!='undefined'&&Array.isArray(TSEL))TSEL=TSEL.map(fix)}
// 저장 · 불러오기 · 공유 코드
let CW=[];
function cwLoad(){try{CW=JSON.parse(localStorage.getItem('jsbb3_cw'))||[]}catch(e){CW=[]}CW=CW.filter(cwValid);CW.forEach(sp=>{try{cwRegister(sp)}catch(e){}});cwRefresh()}
function cwSave(){try{localStorage.setItem('jsbb3_cw',JSON.stringify(CW));return true}catch(e){return false}}
function cwValid(sp){try{return sp&&typeof sp.nm=='string'&&DEF[sp.b]&&DEF[sp.b].vof==null&&!DEF[sp.b].cw&&Array.isArray(sp.sk)&&sp.sk.length==3&&sp.sk.every(s=>CWSH[s.sh]&&[1,2,3].includes(s.pw)&&Array.isArray(s.fx)&&s.fx.length<=2&&s.fx.every(f=>CWFX[f]))&&CWPS[sp.ps]&&Array.isArray(sp.c)&&sp.c.length==3&&sp.c.every(c=>/^#[0-9a-f]{6}$/i.test(c))&&cwCost(sp)<=CWB}catch(e){return false}}
function cwCode(sp){const o=Object.assign({},sp);o.bn=DEF[sp.b].name;delete o.id;return 'JSBB3-'+btoa(unescape(encodeURIComponent(JSON.stringify(o))))}
function cwDecode(str){try{str=(str||'').trim().replace(/^JSBB3-/,'');const o=JSON.parse(decodeURIComponent(escape(atob(str))));if(o.bn){const b=DEF.findIndex(d=>d.name==o.bn);if(b>=0)o.b=b}o.id='c'+Date.now().toString(36);o.nm=String(o.nm).slice(0,8);if(o.ic)o.ic=o.ic.slice(0,24).map(st=>st.slice(0,400).map(v=>clamp(Math.round(+v)||0,-100,100)));delete o.bn;return cwValid(o)?o:null}catch(e){return null}}

if(typeof SGRP!='undefined')SGRP.cw={n:'캐릭터 공방',ic:'✎',c:'#9fffd0',L:()=>NEW35};

// ---------- 캐릭터 공방 화면 ----------
const CWPAL=[['#ff4d8d','#ffd6e6','#3a0618'],['#3fb6ff','#e0f4ff','#06223a'],['#7bff5a','#eaffdf','#0c3a06'],['#ffc23a','#fff4d0','#3a2604'],['#b46bff','#efdfff','#1e0a3a'],['#ff5a2a','#ffe0d2','#3a0e04'],['#2ee6c5','#d8fff7','#053a30'],['#e8e8ee','#ffffff','#202028'],['#ff2a3a','#ffd0d4','#1a0004'],['#5a6aff','#dde2ff','#0a0e3a']];
let WS={v:'list',d:null,tab:'base',del:null,code:null};
(function(){const hb=document.querySelector('#hub .hbtns'),dict=$('#hdict');if(hb&&dict){dict.insertAdjacentHTML('afterend','<button class="hb" id="hws"><b>캐릭터 공방</b><small>WORKSHOP</small></button>')}
  document.body.insertAdjacentHTML('beforeend','<div id="ws" class="scr"><div class="sh"><button class="back wsback">‹</button><b id="wst">캐릭터 공방</b></div><div id="wsb"></div></div>');
  $('#hws').addEventListener('click',()=>{audioOn();SFX('click');WS.v='list';scr('ws');wsList()});
  $('#ws .wsback').addEventListener('click',()=>{SFX('click');if(WS.v=='edit'){WS.v='list';wsList()}else goHome()})})();
const _scrWS=scr;scr=function(id){_scrWS.apply(this,arguments);const w=$('#ws');if(w)w.classList.toggle('on',id=='ws')};
function wsBases(){return DEF.map((d,i)=>i).filter(i=>DEF[i].vof==null&&!DEF[i].cw)}
function wsNew(){const b=wsBases()[0],P=CWPAL[Math.floor(Math.random()*CWPAL.length)];return{id:'c'+Date.now().toString(36),b,nm:'',c:P.slice(),ic:[],icp:'star',sk:[{n:'',sh:'shot',pw:1,fx:[],snd:''},{n:'',sh:'zone',pw:1,fx:[],snd:''},{n:'',sh:'fall',pw:2,fx:[],snd:''}],ps:'tank'}}
function wsEsc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function wsToast(t){let el=$('#wstoast');if(!el){el=document.createElement('div');el.id='wstoast';document.body.appendChild(el)}el.textContent='* '+t;el.classList.remove('on');void el.offsetWidth;el.classList.add('on')}
// 미리보기 아이콘
function wsPrev(cv,sp,sz){const d=cwDefOf(sp);d.name='__cwprev';d.k='cwprev';EMB.cwprev=cwEmb(sp);Object.keys(ICC).forEach(k=>{if(k.indexOf('__cwprev')==0)delete ICC[k]});paintIc(cv,d,sz,{nob:1})}
// ---------- 목록 ----------
function wsList(){WS.v='list';$('#wst').textContent='캐릭터 공방';const B=$('#wsb');
  B.innerHTML=`<div class="wsbox">* 기본 캐릭터를 골라 이름 · 색 · 아이콘 · 스킬 · 패시브를 직접 조립해라.<br>* 포인트 ${CWB} 안에서만 만들 수 있다. 만든 캐릭터는 사전 · 캐릭터 선택 · 도전 모드 · 토너먼트에 나온다.</div>
  <button class="wsbig" id="wsnew">+ 새 캐릭터 만들기</button>
  <div class="wsh">* 내 캐릭터 (${CW.length})</div><div id="wsl">${CW.length?'':'<div class="wsemp">아직 없음</div>'}</div>
  <div class="wsh">* 코드로 가져오기</div><div class="wsimp"><textarea id="wscode" placeholder="친구가 보낸 JSBB3- 로 시작하는 코드를 붙여넣기"></textarea><button class="wsbtn" id="wsimp">가져오기</button></div>`;
  const L=$('#wsl');CW.forEach(sp=>{const i=cwFind(sp.id),d=DEF[i];if(!d)return;const row=document.createElement('div');row.className='wsit';row.style.setProperty('--c',d.col);
    row.innerHTML=`<canvas class="ic"></canvas><div class="wsin"><b>${wsEsc(d.name)}</b><small>${sp.sk.map(s=>CWSH[s.sh].n).join(' · ')} · ${CWPS[sp.ps].n}</small></div><div class="wsib"><button data-a="e">수정</button><button data-a="s">공유</button><button data-a="d" class="${WS.del==sp.id?'warn':''}">${WS.del==sp.id?'정말?':'삭제'}</button></div>${WS.code==sp.id?`<div class="wscd"><textarea readonly>${cwCode(sp)}</textarea><button data-a="c">코드 복사</button></div>`:''}`;
    L.appendChild(row);paintIc(row.querySelector('.ic'),d,30,{nob:1});
    row.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{SFX('click');const a=b.dataset.a;
      if(a=='e'){WS.del=null;WS.code=null;wsEdit(JSON.parse(JSON.stringify(sp)))}
      else if(a=='s'){WS.code=WS.code==sp.id?null:sp.id;WS.del=null;wsList()}
      else if(a=='c'){const ta=row.querySelector('.wscd textarea');ta.select();try{navigator.clipboard.writeText(ta.value).then(()=>wsToast('코드를 복사했다.'),()=>{document.execCommand('copy');wsToast('코드를 복사했다.')})}catch(e){try{document.execCommand('copy')}catch(e2){}wsToast('코드를 길게 눌러 복사해라.')}}
      else if(a=='d'){if(WS.del!=sp.id){WS.del=sp.id;wsList();return}WS.del=null;cwRemove(sp.id);CW=CW.filter(q=>q.id!=sp.id);cwSave();cwRefresh();wsToast('삭제했다.');wsList()}}))});
  $('#wsnew').addEventListener('click',()=>{SFX('click');wsEdit(wsNew())});
  $('#wsimp').addEventListener('click',()=>{SFX('click');const sp=cwDecode($('#wscode').value);if(!sp){wsToast('코드가 이상하다… 다시 확인해라.');return}CW.push(sp);cwRegister(sp);cwSave();cwRefresh();wsToast(DEF[sp.b].name+' • '+sp.nm+' 를(을) 가져왔다!');wsList()});
  if(typeof uiStagger=='function')uiStagger('#wsb .wsit',.04)}
// ---------- 만들기 ----------
const WSTABS=[['base','기본'],['icon','아이콘'],['s0','스킬 1'],['s1','스킬 2'],['s2','궁극기'],['ps','패시브']];
function wsEdit(sp){WS.v='edit';WS.d=sp;WS.tab='base';$('#wst').textContent='캐릭터 만들기';const B=$('#wsb');
  B.innerHTML=`<div class="wstop"><canvas class="ic" id="wspv"></canvas><div class="wsn"><b id="wsnm"></b><div class="wspt"><i id="wsptb"></i></div><small id="wspt"></small></div></div>
  <div class="wstabs">${WSTABS.map(([k,n])=>`<button data-t="${k}">${n}</button>`).join('')}</div><div id="wsc"></div>
  <div class="wsfoot"><button class="wsbtn" id="wscan">취소</button><button class="wsbtn pri" id="wssave">저장</button><button class="wsbtn pri" id="wstest">저장 후 테스트</button></div>`;
  B.querySelectorAll('.wstabs button').forEach(b=>b.addEventListener('click',()=>{SFX('click');WS.tab=b.dataset.t;wsTab()}));
  $('#wscan').addEventListener('click',()=>{SFX('click');wsList()});$('#wssave').addEventListener('click',()=>wsCommit(0));$('#wstest').addEventListener('click',()=>wsCommit(1));wsTab()}
function wsTop(){const sp=WS.d,c=cwCost(sp),over=c>CWB;wsPrev($('#wspv'),sp,40);$('#wsnm').textContent=DEF[sp.b].name+' • '+(sp.nm||'???');$('#wspt').textContent='포인트 '+c+' / '+CWB+(over?' · 초과!':'');$('#wspt').classList.toggle('over',over);
  const bar=$('#wsptb');bar.style.width=Math.min(100,c/CWB*100)+'%';bar.classList.toggle('over',over);$('#wssave').disabled=over;$('#wstest').disabled=over}
function wsTab(){const sp=WS.d,C=$('#wsc');document.querySelectorAll('.wstabs button').forEach(b=>b.classList.toggle('on',b.dataset.t==WS.tab));
  if(WS.tab=='base'){const bs=wsBases();C.innerHTML=`<div class="wsh">* 누구의 변이로 만들까?</div><div class="wsgrid">${bs.map(i=>`<button class="wsbase${sp.b==i?' on':''}" data-b="${i}" style="--c:${DEF[i].col}"><canvas class="ic"></canvas><b>${DEF[i].name}</b></button>`).join('')}</div>
    <div class="wsh">* 이름 (최대 8글자)</div><div class="wsname"><span>${DEF[sp.b].name} •</span><input id="wsnmi" maxlength="8" value="${wsEsc(sp.nm)}" placeholder="이름"></div>
    <div class="wsh">* 색</div><div class="wscol">${['메인','빛','어둠'].map((n,k)=>`<label><input type="color" data-k="${k}" value="${sp.c[k]}"><span>${n}</span></label>`).join('')}</div>
    <div class="wspal">${CWPAL.map((p,k)=>`<button data-p="${k}" style="background:linear-gradient(135deg,${p[0]} 55%,${p[1]} 55% 75%,${p[2]} 75%)"></button>`).join('')}</div>`;
    C.querySelectorAll('.wsbase').forEach(b=>{paintIc(b.querySelector('.ic'),DEF[+b.dataset.b],26,{nob:1});b.addEventListener('click',()=>{SFX('click');sp.b=+b.dataset.b;wsTab()})});
    $('#wsnmi').addEventListener('input',e=>{sp.nm=e.target.value.trim().slice(0,8);wsTop()});
    C.querySelectorAll('.wscol input').forEach(inp=>inp.addEventListener('input',()=>{sp.c[+inp.dataset.k]=inp.value;wsTop()}));
    C.querySelectorAll('.wspal button').forEach(b=>b.addEventListener('click',()=>{SFX('click');sp.c=CWPAL[+b.dataset.p].slice();wsTab()}))}
  else if(WS.tab=='icon'){C.innerHTML=`<div class="wsh">* 손가락으로 그리면 네온 아이콘이 된다.</div><div class="wspad"><canvas id="wsdraw"></canvas></div><div class="wsrow"><button class="wsbtn" id="wsundo">되돌리기</button><button class="wsbtn" id="wsclr">전부 지우기</button></div>
    <div class="wsh">* 또는 기본 모양 고르기</div><div class="wsicp">${Object.keys(CWICP).map(k=>`<button data-k="${k}" class="${!sp.ic.length&&sp.icp==k?'on':''}"><canvas></canvas></button>`).join('')}</div>`;
    wsPad();C.querySelectorAll('.wsicp button').forEach(b=>{const cv=b.querySelector('canvas'),x=cv.getContext('2d');cv.width=cv.height=80;const pg=g;g=x;g.save();g.translate(40,40);neon({col:sp.c[0],hi:sp.c[1]},2.4,()=>cwPath(CWICP[b.dataset.k],28));g.restore();g=pg;
      b.addEventListener('click',()=>{SFX('click');sp.ic=[];sp.icp=b.dataset.k;wsTab()})});
    $('#wsundo').addEventListener('click',()=>{SFX('click');sp.ic.pop();wsPadDraw();wsTop()});$('#wsclr').addEventListener('click',()=>{SFX('click');sp.ic=[];wsPadDraw();wsTop()})}
  else if(WS.tab[0]=='s'){const j=+WS.tab[1],s=sp.sk[j],ult=j==2;
    const fxOk=f=>{const F2=CWFX[f];return!(F2.only&&!F2.only.includes(s.sh))&&!(F2.noult&&ult)};
    const snds=SND.filter(n=>n.indexOf('bgm')!=0);
    C.innerHTML=`<div class="wsh">* ${ult?'궁극기 (피해 1.5배 · 범위 · 개수 증가)':'스킬 '+(j+1)} 이름</div><input class="wsin1" id="wssn" maxlength="10" value="${wsEsc(s.n)}" placeholder="${(ult?'궁극 ':'')+CWSH[s.sh].n}">
    <div class="wsh">* 모양</div><div class="wsshp">${Object.keys(CWSH).map(k=>`<button data-s="${k}" class="${s.sh==k?'on':''}"><b>${CWSH[k].n}</b><small>${CWSH[k].d}</small><em>${CWSH[k].c}P</em></button>`).join('')}</div>
    <div class="wsh">* 위력</div><div class="wspw">${[1,2,3].map(p=>`<button data-p="${p}" class="${s.pw==p?'on':''}">위력 ${p}<em>+${CWPC[p-1]}P</em></button>`).join('')}</div>
    <div class="wsh">* 효과 (2개까지)</div><div class="wsfx">${Object.keys(CWFX).map(f=>{const on=s.fx.includes(f),ok=fxOk(f)&&(on||s.fx.length<2);return`<button data-f="${f}" class="${on?'on':''}" ${ok?'':'disabled'}><b>${CWFX[f].n}</b><small>${CWFX[f].d}</small><em>${CWFX[f].c}P</em></button>`}).join('')}</div>
    <div class="wsh">* 효과음</div><div class="wsrow"><select id="wssnd"><option value="">기본 (모양에 맞는 소리)</option>${snds.map(n=>`<option value="${n}" ${s.snd==n?'selected':''}>${wsEsc(SLB[n]||n)}</option>`).join('')}</select><button class="wsbtn" id="wsplay">▶</button></div>
    <div class="wsinfo">피해 ${cwDmgTxt(s,ult)} · ${ult?'궁극기 게이지':'쿨타임 '+cwCd(s,j)+'초'} · 사거리 ${CWSH[s.sh].rg}</div>`;
    $('#wssn').addEventListener('input',e=>{s.n=e.target.value.trim().slice(0,10)});
    C.querySelectorAll('.wsshp button').forEach(b=>b.addEventListener('click',()=>{SFX('click');s.sh=b.dataset.s;s.fx=s.fx.filter(fxOk);wsTab()}));
    C.querySelectorAll('.wspw button').forEach(b=>b.addEventListener('click',()=>{SFX('click');s.pw=+b.dataset.p;wsTab()}));
    C.querySelectorAll('.wsfx button').forEach(b=>b.addEventListener('click',()=>{SFX('click');const f=b.dataset.f;if(s.fx.includes(f))s.fx=s.fx.filter(q=>q!=f);else if(s.fx.length<2)s.fx.push(f);wsTab()}));
    $('#wssnd').addEventListener('change',e=>{s.snd=e.target.value;audioOn();SFX(s.snd||CWSND[s.sh])});$('#wsplay').addEventListener('click',()=>{audioOn();const n=s.snd||CWSND[s.sh];if(typeof SL!='undefined')SL[n]=0;SFX(n)})}
  else{C.innerHTML=`<div class="wsh">* 패시브 하나</div><div class="wsps">${Object.keys(CWPS).map(k=>`<button data-k="${k}" class="${sp.ps==k?'on':''}"><b>${CWPS[k].n}</b><small>${CWPS[k].d}</small><em>${CWPS[k].c}P</em></button>`).join('')}</div>`;
    C.querySelectorAll('.wsps button').forEach(b=>b.addEventListener('click',()=>{SFX('click');sp.ps=b.dataset.k;wsTab()}))}
  wsTop()}
// 그림판
let WSPAD=null;
function wsPad(){const cv=$('#wsdraw'),S=Math.min(280,cv.parentElement.clientWidth||280);cv.style.width=cv.style.height=S+'px';cv.width=cv.height=S*2;WSPAD={cv,S,cur:null};wsPadDraw();
  const pos=e=>{const r=cv.getBoundingClientRect(),x=(e.clientX-r.left)/r.width*2-1,y=(e.clientY-r.top)/r.height*2-1;return[clamp(Math.round(x/.9*100),-100,100),clamp(Math.round(y/.9*100),-100,100)]};
  cv.addEventListener('pointerdown',e=>{e.preventDefault();cv.setPointerCapture(e.pointerId);const sp=WS.d;if(sp.ic.length>=24)return;const [x,y]=pos(e);WSPAD.cur=[x,y];sp.ic.push(WSPAD.cur);wsPadDraw()});
  cv.addEventListener('pointermove',e=>{if(!WSPAD.cur)return;e.preventDefault();const c=WSPAD.cur,[x,y]=pos(e),lx=c[c.length-2],ly=c[c.length-1];if(Math.hypot(x-lx,y-ly)<5||c.length>=400)return;c.push(x,y);wsPadDraw()});
  const end=()=>{if(!WSPAD||!WSPAD.cur)return;const sp=WS.d,c=WSPAD.cur;if(c.length<4){c.push(c[0]+2,c[1]+2)}WSPAD.cur=null;wsPadDraw();wsTop()};cv.addEventListener('pointerup',end);cv.addEventListener('pointercancel',end)}
function wsPadDraw(){if(!WSPAD)return;const {cv}=WSPAD,x=cv.getContext('2d'),W=cv.width,sp=WS.d;x.fillStyle='#000';x.fillRect(0,0,W,W);x.strokeStyle='#222';x.lineWidth=1;for(let i=1;i<8;i++){x.beginPath();x.moveTo(i*W/8,0);x.lineTo(i*W/8,W);x.moveTo(0,i*W/8);x.lineTo(W,i*W/8);x.stroke()}
  x.strokeStyle=sp.c[0];x.globalAlpha=.5;x.lineWidth=3;x.beginPath();x.arc(W/2,W/2,W*.47,0,TAU);x.stroke();x.globalAlpha=1;
  const pg=g;g=x;g.save();g.translate(W/2,W/2);neon({col:sp.c[0],hi:sp.c[1]},W/90,()=>cwPath(sp.ic.length?sp.ic:[],W*.45));g.restore();g=pg;
  if(!sp.ic.length){x.fillStyle='#666';x.font=(W/18)+'px '+UTKF;x.textAlign='center';x.fillText('여기에 그려라',W/2,W/2)}}
// 저장
function wsCommit(test){const sp=WS.d;SFX('click');if(!sp.nm){WS.tab='base';wsTab();wsToast('이름을 지어줘라.');return}if(cwCost(sp)>CWB){wsToast('포인트가 넘쳤다.');return}
  sp.sk.forEach(s=>{s.fx=s.fx.filter(f=>CWFX[f])});const k=CW.findIndex(q=>q.id==sp.id);if(k>=0)CW[k]=sp;else CW.push(sp);const i=cwRegister(sp);const ok=cwSave();cwRefresh();
  wsToast(ok?DEF[i].name+' 저장 완료!':'저장했지만 폰에 기록이 안 됐다 (다음에 켜면 사라질 수 있음)');
  if(test){wsTest(i);return}wsList()}
function wsTest(i){const pool=DEF.map((d,j)=>j).filter(j=>!DEF[j].cw&&baseOf(j)!=baseOf(i));MODE=2;SEL=[i,pool[Math.floor(Math.random()*pool.length)],0];MENU_T=0;TOURM=null;if(typeof CHMENU!='undefined'){CHMENU=0;STGM=0;STG=null;CHAL=null;if(typeof chalHide=='function')chalHide()}
  $('#ws').classList.remove('on');document.body.classList.remove('m');$('#menu').classList.remove('on');init()}
cwLoad();
;
