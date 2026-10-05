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
const SPFX={asg:['as_'],mtt:['mt_'],und:['ud_'],flw:['fl_'],pap:['pp_'],psy:['ps_'],kgm:['kgm_'],kaidan:['gk_'],diet:['dt_'],otaku:['ot_'],joker:['jk_'],pkc:['pk_'],kong:['kg_'],cjh:['cj_'],aura:['au_'],horror:['h_'],soccer:['kick','juggle','tackle','whistle','goal'],poop:['tv_'],master:['wm_'],radiant:['rd_'],thief:['th_'],bl:['bl_'],krl:['kr_'],chal:['ch_'],ge:['ge_'],ger:['ge_'],wk:['wk_'],pica:['pc_'],wick:['jw_'],oni:['oni_'],rage:['rg_','oni_'],ttd:['tt_'],kmj:['kj_'],sans:['sn_'],hsol:['hs_'],ezr:['ez_'],jett:['jt_'],terr:['tr_'],gaor:['gl_','mg_'],gapr:['gp_','mg_']};
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
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ▶ 섹션 : 패치노트
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ===== 패치노트 · 버전 =====
// 메뉴 오른쪽 위 작은 버튼 → 지금까지의 대형 업데이트 목록 (새 버전이 나오면 빨간 점)
// 업데이트할 때 VER 를 올리고 PATCH 맨 위에 한 칸 추가
// ======================================================================
const VER='5.0.0';
const PATCH=[
  {v:'5.0',t:'UNDERTALE',s:'언더테일 5인방 상륙',c:[42,43,44,45,46],f:['변신하는 캐릭터 3명 : 메타톤 (상자 → NEO) · 언다인 (쓰러지면 THE UNDYING) · 플라위 (영혼 6개 → 오메가)','언더테일 도트 그림이 공 뒤에 함께 등장 · VS 화면 · 궁극기 배너에도 도트 초상화','파랑 · 주황 공격 (파랑은 움직이면, 주황은 멈춰 있으면 아픔)','메뉴 오른쪽 위 패치노트 · 버전 표시'],x:['그림 자리에 gif · mp4 를 넣으면 움직이는 그림으로 나옴']},
  {v:'4.5',t:'C.H.A.O.S',s:'혼돈의 모드 · 도전 모드 2.0',c:[40,41],f:['C.H.A.O.S 모드 : 봇으로 시작 · 랜덤 스킬 3개 · 라운드마다 스킬 증강 · 5라운드','도전 모드 2.0 : 갈림길 지도 · 상점 · 이벤트 · 유물'],x:['카오스에서 내 캐릭터 표시 · 다시 시작 버그 수정','캐릭터 공방 모드 정리']},
  {v:'4.0',t:'언더테일 스타일',s:'스킬 배너 · VS · 설정',c:[36,37,38,39],f:['스킬 · 궁극기 배너가 언더테일 대사 상자로','새 VS 연출 (심장 → 전투 상자 → VS 베기)','설정 : 캐릭터별 효과음 켜고 끄기'],x:['사전 스킬 설명 잘림 수정','아이콘을 네온 스타일로 통일']},
  {v:'3.5',t:'도전',s:'혼자 끝까지 올라가는 도전 모드',c:[34,35],f:['도전 모드 · 경기장 기믹 모드','언더테일 느낌의 메뉴 화면','효과음을 게임이 직접 만듦 (mp3 없이)'],x:['캐릭터 사전 정리 (기본 캐릭터별로 묶기)','아이콘 다듬기 · 기본 박지성 블래스터 그림 교체']},
  {v:'3.0',t:'만화 컷',s:'궁극기가 만화 한 페이지로',c:[30,31,32,33],f:['만화 컷 연출 (images 폴더에 컷 사진 넣기)']},
  {v:'2.5',t:'해골과 소환',s:'소환물 · 블래스터 · 독',c:[23,24,25,26,27,28,29],f:['images 폴더에 사진을 넣으면 게임에 나옴 (스탠드 · 소환물 · 블래스터)'],x:['구석에 갇히는 버그 · 모서리 연속 튕김 수정']},
  {v:'2.0',t:'스탠드와 괴물',s:'새 기본 캐릭터 김지우',c:[17,18,19,20,21,22],f:['새 기본 캐릭터 김지우 (저택 괴물 술래잡기)','스탠드가 항상 뒤에 떠 있는 캐릭터'],x:['기존 스킬 퀄리티 업그레이드 (권루티비 · 트릭 카드 · 풀오토 사격 · 중거리 슛)']},
  {v:'1.5',t:'변이',s:'같은 친구 · 다른 모습',c:[7,8,9,10,11,12,13,14,15,16],f:['변이 캐릭터 시스템 (기본 캐릭터 + 변이)','전체 연출 업그레이드']},
  {v:'1.0',t:'개막',s:'JS BALL BATTLE3 시작',c:[0,1,2,3,4,5,6],f:['1대1 · 3인 난투 · 토너먼트 (JS CHAMPIONS)','캐릭터 선택 · 카운트다운 연출']}];
function pnSeen(){try{return localStorage.getItem('jsbb3_ver')}catch(e){return null}}
function pnMark(){try{localStorage.setItem('jsbb3_ver',VER)}catch(e){}const d=document.querySelector('#pnbtn i');if(d)d.style.display='none'}
(function(){const H=$('#hub');if(!H)return;const b=document.createElement('button');b.id='pnbtn';b.innerHTML='<b>패치노트</b><small>v'+VER.replace(/\.0$/,'')+'</small><i'+(pnSeen()==VER?' style="display:none"':'')+'></i>';H.appendChild(b);
  const o=document.createElement('div');o.id='pnote';o.innerHTML='<div class="pnbox"><div class="pnhd"><div><b>* PATCH NOTES</b><small>JS BALL BATTLE3 · 현재 버전 v'+VER+'</small></div><button class="pnx">✕</button></div><div class="pnlist"></div></div>';document.body.appendChild(o);
  const L=o.querySelector('.pnlist');L.innerHTML=PATCH.map((p,i)=>`<div class="pnc${i==0?' open':''}" data-i="${i}"><div class="pnt"><em>v${p.v}</em><b>${p.t}</b>${i==0?'<span>NEW</span>':''}<u>${i==0?'−':'+'}</u></div><small class="pns">${p.s}</small>
    <div class="pnd">${p.c&&p.c.length?'<h4>신규 캐릭터</h4><div class="pnch">'+p.c.filter(k=>DEF[k]).map(k=>`<span><canvas data-k="${k}"></canvas>${DEF[k].name}</span>`).join('')+'</div>':''}${p.f&&p.f.length?'<h4>새로운 것</h4><ul>'+p.f.map(x=>'<li>'+x+'</li>').join('')+'</ul>':''}${p.x&&p.x.length?'<h4>개선</h4><ul class="pnx2">'+p.x.map(x=>'<li>'+x+'</li>').join('')+'</ul>':''}</div></div>`).join('');
  const paint=c=>{c.querySelectorAll('canvas[data-k]').forEach(cv=>{if(cv.dataset.p)return;cv.dataset.p=1;try{paintIc(cv,DEF[+cv.dataset.k],18)}catch(e){}})};
  L.querySelectorAll('.pnc').forEach(c=>c.querySelector('.pnt').addEventListener('click',()=>{const on=!c.classList.contains('open');c.classList.toggle('open',on);c.querySelector('u').textContent=on?'−':'+';if(on)paint(c);try{SFX('click')}catch(e){}}));
  const close=()=>{o.classList.remove('on');try{SFX('click')}catch(e){}};o.querySelector('.pnx').addEventListener('click',close);o.addEventListener('click',e=>{if(e.target==o)close()});
  b.addEventListener('click',e=>{e.stopPropagation();try{audioOn();SFX('click')}catch(x){}paint(L.querySelector('.pnc.open')||L);o.classList.add('on');L.scrollTop=0;pnMark()})})();
// ---------- 언더테일 5인방 : VS · 궁극기 배너의 도트 초상화를 실제 그림으로 ----------
const UTPORT={asg:()=>'ut_asgore',mtt:D=>D.mtNeo?'ut_mtt_neo':'ut_mtt_box',und:D=>D.udX?'ut_undyne_x':'ut_undyne',flw:D=>D.flX?'ut_flowey_x':'ut_flowey',pap:()=>'ut_papyrus'};
const _utSpriteUT=utSprite;utSprite=function(D,cx,cy,S,n){const m=UTPORT[D&&D.k],nm=m&&m(D),o=nm&&typeof UTI!='undefined'&&UTI[nm];if(o&&typeof utDraw=='function'){const sc=Math.min(S/o.w,S/o.h),h=o.h*sc;if(utDraw(nm,cx,cy,h,1,0,1))return}return _utSpriteUT.apply(this,arguments)};
