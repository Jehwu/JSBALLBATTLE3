// ======================================================================
// modes.js : 모드 : 기본 배틀(1:1 / 1:1:1) · 도전 모드 · 특수맵 배틀 · 도전 모드 2.0 (갈림길) · C.H.A.O.S
// 안에 들어있는 순서 : extra18 → extra24 → extra25
// (순서가 중요해서 위에서부터 차례로 실행됨 · 섹션 위치를 바꾸지 말 것)
// ======================================================================



// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ▶ 섹션 : extra18
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ===== extra18.js : 도전 모드 · 경기장 기믹 모드 =====
// 도전 모드 : 캐릭 하나로 연속해서 싸움 · 체력은 다음 판으로 이어짐 · 판 사이에 강화 카드 3장 중 하나 · 5판마다 보스
// 특수맵 배틀 : 1대1 / 1대1대1 에서 경기장이 바뀜 (용암 · 빙판 · 좁아지는 링 · 회전 톱니 · 아이템 상자 · 랜덤)

let CHMENU=0,STGM=0,CHAL=null,STG=null,STGSEL='rand';
['ch_flip','ch_pre','ch_epic','ch_leg','ch_myth'].forEach(n=>{if(!SND.includes(n))SND.push(n);if(!AUD[n])AUD[n]=new SoundPool('sounds/'+n+'.mp3',3)});Object.assign(SLB,{ch_flip:'도전 · 카드 뒤집기',ch_pre:'도전 · 좋은 카드 예고',ch_epic:'도전 · 에픽 등장',ch_leg:'도전 · 전설 등장',ch_myth:'도전 · 신화 등장'});
const ENV={d:{k:'dust',hi:'#ffffff',col:'#ffffff',dk:'#000000',name:'경기장'},x:-9999,y:-9999,ug:0,i:-1,r:1,dead:0,hp:999};
const UTF='"Galmuri11","Noto Sans KR",sans-serif';

// ---------------------------------------------------------------- 모드 버튼
(function(){const L=$('#modes .mlist');if(!L)return;L.insertAdjacentHTML('beforeend','<button class="mc chal" data-x="C"><i>RUN</i><b>도전 모드</b><small>체력을 이어가며 연속으로 싸움 · 판마다 강화 · 5판마다 보스</small></button><button class="mc stg" data-x="S"><i>MAP</i><b>특수맵 배틀</b><small>용암 · 빙판 · 좁아지는 링 · 회전 톱니 · 아이템 상자</small></button>');
  document.querySelectorAll('#modes .mc[data-m]').forEach(b=>b.addEventListener('click',()=>{CHMENU=0;STGM=0;STG=null;CHAL=null},true));
  $('#modes .mc[data-x="C"]').addEventListener('click',()=>{audioOn();SFX('click');CHMENU=1;STGM=0;STG=null;MENU_T=0;MODE=2;ACT=0;$('#mtitle').textContent='도전 모드 · 캐릭터 선택';initMenu()});
  $('#modes .mc[data-x="S"]').addEventListener('click',()=>{audioOn();SFX('click');STGM=1;CHMENU=0;MENU_T=0;MODE=BM;ACT=0;$('#mtitle').textContent='특수맵 배틀 · 캐릭터 선택';initMenu()});
  // 1대1 · 3인 난투를 '기본 배틀' 하나로 합침 (안에서 1:1 / 1:1:1 고름)
  const b2=$('#modes .mc[data-m="2"]'),b3=$('#modes .mc[data-m="3"]');if(b3)b3.style.display='none';
  if(b2){b2.innerHTML='<i>VS</i><b>기본 배틀</b><small>1:1 정면 승부 · 1:1:1 3인 난투</small>';b2.addEventListener('click',()=>{if(BM==3){MODE=3;ACT=0;initMenu()}$('#mtitle').textContent='기본 배틀 · 캐릭터 선택'})}})();
let BM=2;
(function(){const sl=$('#slots');if(!sl)return;sl.insertAdjacentHTML('beforebegin','<div id="mtog"><button data-n="2">1 : 1</button><button data-n="3">1 : 1 : 1</button></div>');
  document.querySelectorAll('#mtog button').forEach(b=>b.addEventListener('click',()=>{SFX('click');BM=+b.dataset.n;MODE=BM;ACT=0;initMenu();$('#mtitle').textContent=(STGM?'특수맵 배틀':'기본 배틀')+' · 캐릭터 선택'}))})();
// 경기장 고르는 줄
const STAGES={rand:{n:'랜덤',d:'매 판 아무 경기장',c:'#ffffff'},lava:{n:'용암 지대',d:'바닥에서 용암이 솟음',c:'#ff6a20'},ice:{n:'빙판',d:'미끄러움 · 고드름 낙하',c:'#8fd3f5'},ring:{n:'좁아지는 링',d:'안전 구역이 줄어듦',c:'#b070ff'},saw:{n:'회전 톱니',d:'가운데 톱날 막대가 돎',c:'#d8dce6'},box:{n:'아이템 상자',d:'먼저 먹는 쪽이 이득',c:'#ffe14a'}};
(function(){const v=$('#vrow');if(!v)return;v.insertAdjacentHTML('afterend','<div id="stgrow"></div>');const r=$('#stgrow');
  r.innerHTML='<div class="sgt">* 경기장을 골라라</div><div class="sgl">'+Object.keys(STAGES).map(k=>`<button data-g="${k}" style="--sc:${STAGES[k].c}"><b>${STAGES[k].n}</b><small>${STAGES[k].d}</small></button>`).join('')+'</div>';
  r.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{SFX('click');STGSEL=b.dataset.g;paintMenu()}))})();
const _paintMenuX=paintMenu;paintMenu=function(){if(CHMENU)ACT=0;_paintMenuX.apply(this,arguments);const M=$('#menu');M.classList.toggle('chm',!!CHMENU&&!MENU_T);M.classList.toggle('stm',!!STGM&&!MENU_T);M.classList.toggle('tg',!CHMENU&&!MENU_T);document.querySelectorAll('#mtog button').forEach(b=>b.classList.toggle('on',+b.dataset.n==MODE));
  const sb=$('#start');if(sb)sb.textContent=CHMENU&&!MENU_T?'도전 시작':'FIGHT';if(CHMENU&&!MENU_T)$('#hint').textContent='도전할 캐릭터를 골라';
  document.querySelectorAll('#stgrow button').forEach(b=>b.classList.toggle('on',b.dataset.g==STGSEL))};
// FIGHT 누르면 (하트 연출이 끝난 진짜 클릭에서) 도전 시작
$('#start').addEventListener('click',e=>{if(!CHMENU||MENU_T||!$('#start').dataset.utok)return;e.stopImmediatePropagation();e.preventDefault();chalStart()},true);
const _goHomeX=goHome;goHome=function(){CHMENU=0;STGM=0;STG=null;CHAL=null;chalHide();return _goHomeX.apply(this,arguments)};
const _initMenuX=initMenu;initMenu=function(){CHAL=null;chalHide();return _initMenuX.apply(this,arguments)};
const _initX=init;init=function(){_initX.apply(this,arguments);if(STGM&&!CHAL){const ks=Object.keys(STAGES).filter(k=>k!='rand');STG=stgNew(STGSEL=='rand'?ks[Math.floor(Math.random()*ks.length)]:STGSEL)}else STG=null};

// ================================================================ 도전 모드
// 카드 등급 : 일반 · 희귀 · 에픽 · 전설 · 신화
const TIER={c:{n:'일반',col:'#cfcfcf',w:50},r:{n:'희귀',col:'#4a9cff',w:28},e:{n:'에픽',col:'#b45aff',w:14},l:{n:'전설',col:'#ffb020',w:6},m:{n:'신화',col:'#ff3050',w:2}};
const CHUP=[
  // 일반
  {k:'heal',t:'c',ic:'heal',n:'회복',d:'체력 30 회복'},
  {k:'pow',t:'c',ic:'pow',n:'파워업',d:'주는 피해 +12%',max:5},
  {k:'def',t:'c',ic:'def',n:'강철 몸',d:'받는 피해 -10%',max:4},
  {k:'spd',t:'c',ic:'spd',n:'신속',d:'이동 속도 +10%',max:3},
  {k:'regen',t:'c',ic:'regen',n:'재생',d:'1초마다 체력 0.4 회복',max:3},
  {k:'cd',t:'c',ic:'cd',n:'숫돌',d:'스킬 쿨타임이 15% 빨리 돎',max:3},
  {k:'tough',t:'c',ic:'def',n:'굳은살',d:'3 이하의 약한 공격은 절반만 아픔',max:1},
  {k:'kit',t:'c',ic:'heal',n:'응급 키트',d:'판마다 한 번 · 체력 35 아래가 되면 20 회복',max:1},
  // 희귀
  {k:'vamp',t:'r',ic:'vamp',n:'흡혈',d:'준 피해의 12%만큼 회복',max:2},
  {k:'thorn',t:'r',ic:'thorn',n:'가시 갑옷',d:'맞을 때마다 때린 적에게 2.5 반사',max:2},
  {k:'crit',t:'r',ic:'crit',n:'치명타',d:'18% 확률로 피해 2배',max:3},
  {k:'shield',t:'r',ic:'shield',n:'방패',d:'매 판 시작 때 첫 공격을 막음',max:1},
  {k:'ult',t:'r',ic:'ult',n:'궁 충전',d:'매 판 궁 게이지 40%로 시작',max:2},
  {k:'first',t:'r',ic:'pow',n:'기선 제압',d:'매 판 첫 공격 피해 3배',max:1},
  {k:'rage',t:'r',ic:'fire',n:'역전의 의지',d:'체력 30 이하일 때 주는 피해 +40%',max:1},
  {k:'dodge',t:'r',ic:'ghost',n:'잔상',d:'12% 확률로 공격을 피함',max:2},
  // 에픽
  {k:'giant',t:'e',ic:'giant',n:'거인화',d:'몸이 12% 커지고 주는 피해 +10%',max:2},
  {k:'exec',t:'e',ic:'skull',n:'처형인',d:'체력 25 이하인 적에게 피해 2배',max:1},
  {k:'chain',t:'e',ic:'bolt',n:'연쇄 번개',d:'때릴 때 20% 확률로 번개 3 추가',max:2},
  {k:'frost',t:'e',ic:'snow',n:'서리 손',d:'때릴 때 15% 확률로 1초 얼림',max:2},
  {k:'burn',t:'e',ic:'fire',n:'불꽃 손',d:'때린 적이 3초 동안 불탐 (1초마다 1)',max:1},
  {k:'pact',t:'e',ic:'vamp',n:'피의 계약',d:'주는 피해 +35% · 받는 피해 +12%',max:1},
  {k:'ultg',t:'e',ic:'ult',n:'궁 폭주',d:'궁 게이지가 2배 빨리 참',max:1},
  {k:'bonus',t:'e',ic:'heal',n:'승리의 만찬',d:'판을 이기면 체력 15 더 회복',max:2},
  // 전설
  {k:'rev',t:'l',ic:'rev',n:'오뚝이',d:'한 번 쓰러져도 체력 50으로 부활',max:1},
  {k:'haste',t:'l',ic:'cd',n:'시간 가속',d:'쿨타임 40% 빨리 · 이동 +15%',max:1},
  {k:'inv',t:'l',ic:'shield',n:'무적 개시',d:'매 판 시작 후 3초 동안 무적',max:1},
  {k:'lord',t:'l',ic:'vamp',n:'흡혈귀 군주',d:'준 피해의 25%만큼 회복',max:1},
  {k:'twin',t:'l',ic:'ghost',n:'그림자 분신',d:'때릴 때 30% 확률로 같은 피해 한 번 더',max:1},
  {k:'storm',t:'l',ic:'bolt',n:'폭풍의 눈',d:'2초마다 가까운 적에게 번개 4',max:1},
  // 신화
  {k:'god',t:'m',ic:'halo',n:'신의 가호',d:'매 판 공격 3번을 완전히 막음',max:1},
  {k:'doom',t:'m',ic:'skull',n:'종말의 일격',d:'10% 확률로 피해 5배',max:1},
  {k:'imm',t:'m',ic:'rev',n:'불사',d:'두 번까지 체력 60으로 부활',max:1},
  {k:'abs',t:'m',ic:'crit',n:'절대자',d:'주는 피해 +25% · 받는 피해 -25% · 이동 +20% · 쿨타임 25% 빨리',max:1},
  {k:'time',t:'m',ic:'cd',n:'시간 정지',d:'매 판 시작할 때 상대가 3초 동안 멈춤',max:1}];
CHUP.forEach(u=>{u.c=TIER[u.t].col;u.rare=u.t!='c'});
function chalBest(){try{return JSON.parse(localStorage.getItem('jsbb3_chal'))||{r:0}}catch(e){return{r:0}}}
function chalSaveBest(r,name){try{const b=chalBest();if(r>b.r)localStorage.setItem('jsbb3_chal',JSON.stringify({r,name}))}catch(e){}}
function chalStart(){CHAL={r:1,hp:100,pi:SEL[0],up:{},hist:[],best:chalBest().r||0,rev:0,rr:3};chalRound()}
function chalRound(){const c=CHAL,boss=c.r%5==0;let pool=DEF.map((d,i)=>i).filter(i=>i!=c.pi&&baseOf(i)!=baseOf(c.pi));if(!pool.length)pool=DEF.map((d,i)=>i).filter(i=>i!=c.pi);
  const ei=pool[Math.floor(Math.random()*pool.length)];SEL=[c.pi,ei,0];MODE=2;MENU_T=0;TOURM=null;document.body.classList.remove('m');$('#menu').classList.remove('on');chalHide();
  const hi=Math.max(0,c.r-10);c.eTake=Math.max(.45,Math.max(.7,1.35-(c.r-1)*.045)-hi*.03)*(boss?.86:1);c.eDeal=(.55+(c.r-1)*.06+hi*.08)*(boss?1.05:1);c.handled=0;c.boss=boss;
  init();const P=F[0],E=F[1],U=c.up;P.hp=c.hp;P.show=c.hp;P.sp*=(1+.1*(U.spd||0))*(U.haste?1.15:1)*(U.abs?1.2:1);if(U.shield)P.shield=1;if(U.ult)P.ug=Math.min(100,40*U.ult);if(U.giant)P.r*=1+.12*U.giant;
  P.chInv=U.inv?3:0;P.chGod=U.god?3:0;P.chKit=U.kit?1:0;P.chFirst=U.first?1:0;P.chSt=0;if(U.time)E.chTime=1;
  if(boss){E.chB=1;E.r*=1.3;E.d=Object.assign({},E.d,{name:'BOSS · '+E.d.name})}P.d=Object.assign({},P.d,{name:P.d.name});buildHUD();chalHud()}
function chalHud(){let h=$('#chhud');if(!h){h=document.createElement('div');h.id='chhud';document.body.appendChild(h)}h.innerHTML='<b>ROUND '+CHAL.r+'</b>'+(CHAL.boss?'<i>BOSS</i>':'')+'<span>'+CHUP.filter(u=>CHAL.up[u.k]).map(u=>`<em style="--uc:${u.c}">${u.n}${CHAL.up[u.k]>1?' ×'+CHAL.up[u.k]:''}</em>`).join('')+'</span>';h.classList.add('on')}
function chalHide(){const a=$('#chal');if(a)a.classList.remove('on');const h=$('#chhud');if(h)h.classList.remove('on')}
function chalPick3(boss){const U=CHAL.up,ok=u=>!(u.max&&(U[u.k]||0)>=u.max)&&!(u.k=='heal'&&CHAL.hp>=95)&&!(u.k=='rev'&&U.imm)&&!(u.k=='imm'&&U.rev);const out=[];
  if(CHAL.hp<55)out.push(CHUP[0]);
  const W=boss?{c:15,r:33,e:30,l:16,m:6}:{c:50,r:28,e:14,l:6,m:2},TO=['m','l','e','r','c'];let guard=0;
  while(out.length<3&&guard++<60){let s=0;for(const t in W)s+=W[t];let r=Math.random()*s,tier='c';for(const t in W){r-=W[t];if(r<=0){tier=t;break}}
    for(let i=TO.indexOf(tier);i<TO.length;i++){const c=CHUP.filter(u=>u.t==TO[i]&&ok(u)&&!out.includes(u));if(c.length){out.push(c[Math.floor(Math.random()*c.length)]);break}}}
  return out}
function chalEl(){let el=$('#chal');if(!el){el=document.createElement('div');el.id='chal';document.body.appendChild(el)}return el}
function chalIcon(cv,k,col){const x=cv.getContext('2d'),S=cv.width;x.clearRect(0,0,S,S);x.save();x.translate(S/2,S/2);x.scale(S/64,S/64);x.fillStyle=col;x.strokeStyle=col;x.lineWidth=5;x.lineCap='round';x.lineJoin='round';const P=(pts)=>{x.beginPath();pts.forEach(([a,b],i)=>i?x.lineTo(a,b):x.moveTo(a,b));x.closePath()};
  const heart=(s)=>{x.save();x.scale(s,s);x.beginPath();x.moveTo(0,16);x.bezierCurveTo(-26,-2,-16,-24,0,-10);x.bezierCurveTo(16,-24,26,-2,0,16);x.fill();x.restore()};
  switch(k){
    case'heal':heart(1);x.fillStyle='#000';x.fillRect(-3,-12,6,18);x.fillRect(-9,-6,18,6);break;
    case'pow':P([[-4,-24],[10,-24],[2,-4],[12,-4],[-8,24],[-2,2],[-12,2]]);x.fill();break;
    case'def':P([[0,-24],[20,-16],[18,6],[0,24],[-18,6],[-20,-16]]);x.fill();x.fillStyle='#000';P([[0,-14],[11,-9],[10,4],[0,14]]);x.fill();break;
    case'cd':x.beginPath();x.arc(0,2,20,0,TAU);x.stroke();x.beginPath();x.moveTo(0,2);x.lineTo(0,-10);x.moveTo(0,2);x.lineTo(9,8);x.stroke();x.fillRect(-5,-26,10,6);break;
    case'ult':for(let i=0;i<8;i++){const a=i*TAU/8;x.beginPath();x.moveTo(Math.cos(a)*10,Math.sin(a)*10);x.lineTo(Math.cos(a)*24,Math.sin(a)*24);x.stroke()}x.beginPath();x.arc(0,0,8,0,TAU);x.fill();break;
    case'vamp':P([[-18,-14],[18,-14],[12,-4],[6,16],[2,-4],[-2,-4],[-6,16],[-12,-4]]);x.fill();break;
    case'thorn':x.beginPath();x.arc(0,0,12,0,TAU);x.fill();for(let i=0;i<8;i++){const a=i*TAU/8;P([[Math.cos(a-.25)*11,Math.sin(a-.25)*11],[Math.cos(a)*26,Math.sin(a)*26],[Math.cos(a+.25)*11,Math.sin(a+.25)*11]]);x.fill()}break;
    case'spd':P([[-6,-20],[16,0],[-6,20],[0,0]]);x.fill();P([[-22,-14],[-6,0],[-22,14],[-16,0]]);x.fill();break;
    case'shield':x.beginPath();x.arc(0,0,22,0,TAU);x.stroke();x.beginPath();x.arc(0,0,12,0,TAU);x.fill();break;
    case'crit':P(Array.from({length:10},(_,i)=>{const a=-Math.PI/2+i*TAU/10,r=i%2?10:25;return[Math.cos(a)*r,Math.sin(a)*r]}));x.fill();break;
    case'regen':x.fillRect(-5,-22,10,44);x.fillRect(-22,-5,44,10);break;
    case'giant':x.beginPath();x.arc(0,6,18,0,TAU);x.fill();P([[-16,-12],[-10,-26],[-3,-16],[0,-28],[3,-16],[10,-26],[16,-12]]);x.fill();break;
    case'rev':heart(.9);x.strokeStyle='#fff';x.lineWidth=3;x.beginPath();x.ellipse(0,-22,14,4,0,0,TAU);x.stroke();break;
    case'skull':x.beginPath();x.arc(0,-4,18,0,TAU);x.fill();x.fillRect(-10,8,20,12);x.fillStyle='#000';x.beginPath();x.arc(-7,-4,5,0,TAU);x.arc(7,-4,5,0,TAU);x.fill();x.fillRect(-6,12,3,8);x.fillRect(3,12,3,8);break;
    case'bolt':P([[4,-26],[-12,2],[0,2],[-6,26],[14,-4],[2,-4]]);x.fill();break;
    case'snow':for(let i=0;i<6;i++){const a=i*TAU/6;x.beginPath();x.moveTo(0,0);x.lineTo(Math.cos(a)*24,Math.sin(a)*24);x.moveTo(Math.cos(a)*14,Math.sin(a)*14);x.lineTo(Math.cos(a+.4)*20,Math.sin(a+.4)*20);x.moveTo(Math.cos(a)*14,Math.sin(a)*14);x.lineTo(Math.cos(a-.4)*20,Math.sin(a-.4)*20);x.stroke()}break;
    case'fire':x.beginPath();x.moveTo(0,-26);x.quadraticCurveTo(20,-6,14,10);x.quadraticCurveTo(8,24,0,24);x.quadraticCurveTo(-8,24,-14,10);x.quadraticCurveTo(-18,-4,-6,-10);x.quadraticCurveTo(-2,-16,0,-26);x.fill();x.fillStyle='#000';x.beginPath();x.ellipse(0,12,6,9,0,0,TAU);x.fill();break;
    case'ghost':x.beginPath();x.arc(0,-4,18,Math.PI,0);x.lineTo(18,20);x.lineTo(10,14);x.lineTo(4,20);x.lineTo(-4,14);x.lineTo(-10,20);x.lineTo(-18,14);x.closePath();x.fill();x.fillStyle='#000';x.beginPath();x.arc(-6,-6,4,0,TAU);x.arc(6,-6,4,0,TAU);x.fill();break;
    case'halo':x.beginPath();x.ellipse(0,-18,18,6,0,0,TAU);x.stroke();x.beginPath();x.moveTo(-20,24);x.quadraticCurveTo(-24,-4,0,-6);x.quadraticCurveTo(24,-4,20,24);x.closePath();x.fill();break}
  x.restore()}
function chalWin(){const c=CHAL;c.hp=Math.min(100,Math.max(1,F[0].hp)+12+15*(c.up.bonus||0));const cleared=c.r;c.r++;c.wasBoss=cleared%5==0;c.cleared=cleared;if(c.rr==null)c.rr=3;chalShow(chalPick3(c.wasBoss))}
// 카드 화면 : 뒷면으로 깔렸다가 한 장씩 뒤집힘 · 에픽 이상은 뜸 들였다가 크게 등장
function chalShow(opts){const c=CHAL,el=chalEl(),nb=c.r%5==0;c.opts=opts;
  el.innerHTML=`<div class="chb"><div class="cht">* ROUND ${c.cleared} 클리어!</div><div class="chs">체력 ${Math.round(c.hp)} / 100${c.wasBoss?' · <span class="bw2">보스 보상 : 높은 등급 카드가 잘 나옴</span>':''}${nb?' · <span class="bw">다음은 보스!</span>':''}</div><div class="chhp"><i style="width:${c.hp}%"></i></div><div class="chq">* 강화를 하나 골라라.</div><div class="chc">${opts.map((u,i)=>`<button class="cu t-${u.t} hid" data-k="${u.k}" style="--uc:${u.c}"><span class="bk"></span><i>${TIER[u.t].n}</i><canvas width="96" height="96"></canvas><b>${u.n}</b><small>${u.d}</small>${c.up[u.k]?'<em>보유 '+c.up[u.k]+'</em>':''}</button>`).join('')}</div><div class="chr"><button class="btn" id="chrr"${c.rr>0?'':' disabled'}>다시 뽑기 <span>${c.rr}/3</span></button></div><div class="chban"></div><div class="chfl"></div></div>`;
  let busy=1;el.dataset.busy=1;const cards=[...el.querySelectorAll('.cu')];
  cards.forEach(b=>{const u=CHUP.find(q=>q.k==b.dataset.k);chalIcon(b.querySelector('canvas'),u.ic,u.c);b.addEventListener('click',()=>{if(el.dataset.busy)return;el.dataset.busy=1;SFX('click');b.classList.add('pick');
    setTimeout(()=>{delete el.dataset.busy;if(u.k=='heal')c.hp=Math.min(100,c.hp+30);else{c.up[u.k]=(c.up[u.k]||0)+1;if(u.k=='rev')c.rev+=1;if(u.k=='imm')c.rev+=2}c.hist.push(u.k);chMap()},450)})});
  $('#chrr').addEventListener('click',()=>{if(el.dataset.busy||c.rr<=0)return;c.rr--;SFX('click');el.querySelectorAll('.cu').forEach(b=>b.classList.add('out'));el.dataset.busy=1;setTimeout(()=>chalShow(chalPick3(c.wasBoss)),280)});
  void el.offsetWidth;el.classList.add('on');
  // 한 장씩 공개
  let tt=350;cards.forEach((b,i)=>{const u=CHUP.find(q=>q.k==b.dataset.k),big=u.t=='e'||u.t=='l'||u.t=='m',pre=u.t=='m'?1100:u.t=='l'?800:u.t=='e'?450:0;
    setTimeout(()=>{if(big){b.classList.add('pre');try{SFXa('ch_pre')}catch(e){}}},tt);
    setTimeout(()=>{b.classList.remove('hid','pre');b.classList.add('show');chalBurst(el,b,u.t);try{SFXa(u.t=='m'?'ch_myth':u.t=='l'?'ch_leg':u.t=='e'?'ch_epic':'ch_flip')}catch(e){}},tt+pre);
    tt+=pre+260});
  setTimeout(()=>{delete el.dataset.busy},tt+200)}
function chalBurst(el,b,t){if(t=='c'||t=='r')return;const T=TIER[t];for(let i=0;i<(t=='m'?26:t=='l'?18:10);i++){const s=document.createElement('span');s.className='csp';const a=Math.random()*Math.PI*2,d=60+Math.random()*(t=='m'?140:90);s.style.cssText=`--dx:${Math.cos(a)*d}px;--dy:${Math.sin(a)*d}px;--sc:${T.col};animation-delay:${Math.random()*.12}s`;b.appendChild(s);setTimeout(()=>s.remove(),1300)}
  if((t=='l'||t=='m')&&el.querySelector('.chban')){const ban=el.querySelector('.chban');ban.textContent=t=='m'?'신화 등장!':'전설 등장!';ban.style.setProperty('--uc',T.col);ban.className='chban on t-'+t;setTimeout(()=>{ban.className='chban'},1500);
    const fl=el.querySelector('.chfl');fl.className='chfl on t-'+t;setTimeout(()=>{fl.className='chfl'},700);const bx=el.querySelector('.chb');bx.classList.remove('shk');void bx.offsetWidth;bx.classList.add('shk')}}
function chalLose(){const c=CHAL,reach=c.r,el=chalEl(),best=c.best,nr=reach>best;chalSaveBest(reach,DEF[c.pi].name);
  el.innerHTML=`<div class="chb end"><div class="cht">* 도전 끝</div><div class="chbig">ROUND ${reach}</div><div class="chs">${nr?'<span class="nr">NEW RECORD!</span>':'최고 기록 ROUND '+best}</div><div class="chq">* ${DEF[c.pi].name}의 강화</div><div class="chl">${CHUP.filter(u=>c.up[u.k]).map(u=>`<em style="--uc:${u.c}">${u.n}${c.up[u.k]>1?' ×'+c.up[u.k]:''}</em>`).join('')||'<em style="--uc:#888">없음</em>'}</div><div class="btns"><button class="btn" id="chmenu">MENU</button><button class="btn pri" id="chagain">다시 도전</button></div></div>`;
  $('#chmenu').addEventListener('click',()=>{SFX('click');initMenu()});$('#chagain').addEventListener('click',()=>{SFX('click');chalStart()});void el.offsetWidth;el.classList.add('on')}
// 판이 끝나면 원래 결과창 대신 도전 화면 · 매 프레임 강화 효과
const _updCH=update;update=function(dt){_updCH(dt);if(!CHAL||!F)return;
  if(phase=='end'&&shown&&!CHAL.handled){CHAL.handled=1;$('#msg').className='';const $h=$('#chhud');if($h)$h.classList.remove('on');if(win&&win.i==0&&!F[0].dead)chalWin();else chalLose()}
  const P=F[0],E=F[1],U=CHAL.up;if(P&&P.chInv>0&&phase=='cd'){}
  if(phase=='play'&&P&&!P.dead){const rate=.15*(U.cd||0)+(U.haste?.4:0)+(U.abs?.25:0);if(rate)P.cds=P.cds.map(v=>v-dt*rate);if(U.regen)P.hp=Math.min(100,P.hp+dt*.4*U.regen);if(P.chTh>0)P.chTh-=dt;if(P.chInv>0)P.chInv-=dt;
    if(E&&E.chTime){E.chTime=0;E.stn=Math.max(E.stn,3);E.cast=null;E.chTS=3;ft(E.x,E.y-E.r-34,'시간 정지!','#ff3050',22)}
    if(U.storm){P.chSt+=dt;if(P.chSt>=2){P.chSt=0;const e=F.filter(x=>x!=P&&!x.dead&&!x.hid).sort((a,b)=>dist(P,a)-dist(P,b))[0];if(e&&dist(P,e)<260){FX.push({k:'stzap',x:e.x,y:e.y,l:.35,m:.35});_hurtCH(e,4,P,e.x,e.y,0,0)}}}
    F.forEach(e=>{if(e.chBrn>0&&!e.dead){e.chBrn-=dt;e.chBt=(e.chBt||0)+dt;if(e.chBt>=1){e.chBt=0;_hurtCH(e,1,P,e.x,e.y,0,0);for(let i=0;i<4;i++)Pt.push({x:e.x+rnd(-10,10),y:e.y,vx:rnd(-20,20),vy:rnd(-90,-50),l:.5,m:.5,gl:1,sh:3,col:'#ff8a3a',r:rnd(4,7),gr:-10,a0:.8,fr:.5})}}if(e.chTS>0)e.chTS-=dt})}
  if(phase=='cd'&&P&&P.chInv>0){}};
const _hurtCH=hurt;hurt=function(t,n,o){if(!CHAL||!F||!(n>0)||phase!='play')return _hurtCH.apply(this,arguments);const P=F[0],U=CHAL.up,a=[...arguments];
  if(t==P&&o!=P){
    if(P.chInv>0){if(!(P.chInvF>0)){ft(P.x,P.y-P.r-30,'무적','#ffb020',16)}return}
    if(P.chGod>0){P.chGod--;ft(P.x,P.y-P.r-30,'신의 가호!','#ffe14a',18);ring(P.x,P.y,P.r,P.r+50,'#ffe14a',5,.4);return}
    if(U.dodge&&Math.random()<.12*U.dodge){ft(P.x,P.y-P.r-30,'회피!','#c8d8ff',18);FX.push({k:'ghost',x:P.x,y:P.y,r:P.r,c:'#c8d8ff',l:.4,m:.4});return}
    if(U.tough&&n<=3)n*=.5;
    n*=CHAL.eDeal*Math.pow(.9,U.def||0)*(U.pact?1.12:1)*(U.abs?.75:1);
    if(U.thorn&&o&&o!=ENV&&!o.dead&&!(P.chTh>0)){P.chTh=.35;_hurtCH(o,2.5*U.thorn,P,o.x,o.y,0,0);ft(o.x,o.y-o.r-26,'가시!','#d0a060',16)}
    if(CHAL.rev>0&&P.hp-n*1.3<=0){CHAL.rev--;P.hp=U.imm?60:50;ft(P.x,P.y-P.r-34,'부활!','#ffffff',30);ring(P.x,P.y,P.r,P.r+120,'#ffffff',10,.6);if(typeof lkImp=='function')lkImp(P.x,P.y,120,'#ffe14a');shake=Math.max(shake,14);chalHud();return}
    a[1]=Math.round(n*10)/10;const hp0=P.hp,r=_hurtCH.apply(this,a);if(U.ultg&&!P.dead)P.ug=Math.min(100,(P.ug||0)+Math.max(0,hp0-P.hp)*.8);
    if(P.chKit&&!P.dead&&P.hp<35){P.chKit=0;P.hp=Math.min(100,P.hp+20);ft(P.x,P.y-P.r-30,'응급 키트 +20','#7bff8a',18)}return r}
  if(t!=P&&o==P){n*=CHAL.eTake*(1+.12*(U.pow||0))*(1+.1*(U.giant||0))*(U.pact?1.35:1)*(U.abs?1.25:1)*(U.rage&&P.hp<=30?1.4:1)*(U.exec&&t.hp<=25?2:1);
    if(P.chFirst){P.chFirst=0;n*=3;ft(t.x,t.y-t.r-44,'기선 제압!','#4a9cff',20)}
    if(U.doom&&Math.random()<.1){n*=5;ft(t.x,t.y-t.r-48,'종말!','#ff3050',28);if(typeof lkImp=='function')lkImp(t.x,t.y,110,'#ff3050');shake=Math.max(shake,14)}
    else if(U.crit&&Math.random()<.18*U.crit){n*=2;ft(t.x,t.y-t.r-44,'치명타!','#ff5050',22)}
    a[1]=Math.round(n*10)/10;const hp0=t.hp,r=_hurtCH.apply(this,a),dealt=Math.max(0,hp0-t.hp);
    if(!P.dead){const vs=.12*(U.vamp||0)+(U.lord?.25:0);if(vs)P.hp=Math.min(100,P.hp+dealt*vs);if(U.ultg)P.ug=Math.min(100,(P.ug||0)+dealt*1.2)}
    if(!t.dead&&dealt>0){if(U.chain&&Math.random()<.2*U.chain){FX.push({k:'stzap',x:t.x,y:t.y,l:.35,m:.35});_hurtCH(t,3,P,t.x,t.y,0,0)}
      if(U.frost&&Math.random()<.15*U.frost&&!t.dead){t.stn=Math.max(t.stn,1);t.cast=null;t.slow=Math.max(t.slow,1.5);ft(t.x,t.y-t.r-30,'얼음!','#8fd3f5',18);for(let i=0;i<8;i++)Pt.push({x:t.x,y:t.y,vx:rnd(-120,120),vy:rnd(-120,120),l:.5,m:.5,sh:10,col:'#d6f3ff',r:rnd(2,4),rot:rnd(0,TAU),vr:rnd(-8,8),fr:.4})}
      if(U.burn)t.chBrn=3;
      if(U.twin&&Math.random()<.3&&!t.dead){FX.push({k:'ghost',x:P.x,y:P.y,r:P.r,c:'#b0b0ff',l:.35,m:.35});_hurtCH(t,dealt,P,t.x,t.y,0,0)}}
    return r}
  if(t!=P)n*=CHAL.eTake;a[1]=Math.round(n*10)/10;return _hurtCH.apply(this,a)};
// 무적 · 신의 가호 · 시간 정지 표시
const _lowCHX=lowHP;lowHP=function(f){_lowCHX(f);if(!CHAL||f.dead||f.hid)return;
  if(f.chInv>0&&phase=='play'){g.save();g.translate(f.x,f.y);g.globalCompositeOperation='lighter';g.strokeStyle='rgba(255,190,60,'+(.5+.3*Math.sin(clock*14))+')';g.lineWidth=3;g.beginPath();g.arc(0,0,f.r+10,0,TAU);g.stroke();glow('#ffb020',0,0,f.r*2,.25);g.restore()}
  if(f.chGod>0){for(let i=0;i<f.chGod;i++){const a=clock*1.5+i*TAU/3;g.save();g.translate(f.x+Math.cos(a)*(f.r+16),f.y+Math.sin(a)*(f.r+16));g.globalCompositeOperation='lighter';glow('#ffe14a',0,0,10,.8);g.fillStyle='#fff6c0';g.beginPath();g.arc(0,0,3.5,0,TAU);g.fill();g.restore()}}
  if(f.chTS>0){g.save();g.translate(f.x,f.y);g.strokeStyle='rgba(255,60,80,.8)';g.lineWidth=2;g.setLineDash([5,5]);g.beginPath();g.arc(0,0,f.r+8,0,TAU);g.stroke();g.setLineDash([]);g.font='900 13px '+UTF;g.textAlign='center';g.fillStyle='#ff6070';g.fillText(Math.ceil(f.chTS),0,-f.r-12);g.restore()}};
// 보스 표시
const _lowCH=lowHP;lowHP=function(f){_lowCH(f);if(!f.chB||f.dead||f.hid)return;if(typeof lkAura=='function')lkAura(f.x,f.y,f.r,'#ff3040',.7);g.save();g.translate(f.x,f.y-f.r-16+Math.sin(clock*3)*2);g.fillStyle='#ffd23a';g.strokeStyle='#3a2600';g.lineWidth=2;g.beginPath();g.moveTo(-14,6);g.lineTo(-16,-8);g.lineTo(-7,-1);g.lineTo(0,-12);g.lineTo(7,-1);g.lineTo(16,-8);g.lineTo(14,6);g.closePath();g.fill();g.stroke();g.fillStyle='#ff3040';g.beginPath();g.arc(0,-1,2.5,0,TAU);g.fill();g.restore()};
const _initCHB=init;init=function(){_initCHB.apply(this,arguments);if(F)F.forEach(f=>{f.chB=0;f.chTh=0;f.chInv=0;f.chGod=0;f.chTime=0;f.chTS=0;f.chBrn=0;f.chKit=0;f.chFirst=0})};

// ================================================================ 경기장 기믹
function stgNew(k){return{k,t:0,sp:0,pools:[],ic:[],boxes:[],saw:{a:rnd(0,TAU)},ring:{r:440},hc:new Map(),pc:F?F.map(f=>({x:f.x,y:f.y,vx:0,vy:0})):[]}}
function stgHit(f,n,key,cd){const S=STG,k=key+f.i;const t=S.hc.get(k)||0;if(S.t-t<cd)return false;S.hc.set(k,S.t);hurt(f,n,ENV,f.x,f.y,0,0);return true}
const _updSTG=update;update=function(dt){const pre=STG&&STG.k=='ice'&&phase=='play'&&F?F.map(f=>({x:f.x,y:f.y})):null;_updSTG(dt);const S=STG;if(!S||!F||phase!='play')return;S.t+=dt;const al=F.filter(f=>!f.dead&&!f.hid);
  if(S.k=='lava'){S.sp+=dt;if(S.sp>=2.4&&S.pools.length<5){S.sp=0;const tg=al[Math.floor(Math.random()*al.length)];const x=tg&&Math.random()<.6?clamp(tg.x+rnd(-90,90),70,A-70):rnd(70,A-70),y=tg&&Math.random()<.6?clamp(tg.y+rnd(-90,90),70,A-70):rnd(70,A-70);S.pools.push({x,y,R:rnd(48,72),t:0,life:7.5})}
    S.pools.forEach(p=>p.t+=dt);S.pools=S.pools.filter(p=>p.t<p.life);S.pools.forEach(p=>{if(p.t<1.1)return;if(!p.er){p.er=1;SFXa('heavy');for(let i=0;i<10;i++)Pt.push({x:p.x,y:p.y,vx:rnd(-120,120),vy:rnd(-220,-80),l:.7,m:.7,gl:1,sh:3,col:'#ff8a2c',r:rnd(4,8),gy:300,fr:.6})}
      al.forEach(f=>{if(Math.hypot(f.x-p.x,f.y-p.y)<p.R+f.r*.4){if(stgHit(f,2,'lava',.5)){for(let i=0;i<4;i++)Pt.push({x:f.x+rnd(-10,10),y:f.y,vx:rnd(-20,20),vy:rnd(-90,-50),l:.5,m:.5,gl:1,sh:3,col:'#ff8a3a',r:rnd(4,7),gr:-10,a0:.8,fr:.5})}}})})}
  if(S.k=='ice'){if(pre)F.forEach((f,i)=>{if(f.dead)return;const p=pre[i],c=S.pc[i]||(S.pc[i]={vx:0,vy:0}),dx=f.x-p.x,dy=f.y-p.y,L=Math.hypot(dx,dy);
      if(L<f.sp*dt*1.6+2&&!f.kAir){const k=Math.min(1,dt*2.4);c.vx+=(dx/dt-c.vx)*k;c.vy+=(dy/dt-c.vy)*k;let nx=p.x+c.vx*dt,ny=p.y+c.vy*dt;if(nx<f.r){nx=f.r;c.vx=Math.abs(c.vx)*.7}if(nx>A-f.r){nx=A-f.r;c.vx=-Math.abs(c.vx)*.7}if(ny<f.r){ny=f.r;c.vy=Math.abs(c.vy)*.7}if(ny>A-f.r){ny=A-f.r;c.vy=-Math.abs(c.vy)*.7}f.x=nx;f.y=ny;
        if(Math.hypot(c.vx,c.vy)>60&&Math.random()<.3)Pt.push({x:f.x+rnd(-8,8),y:f.y+f.r*.7,vx:-c.vx*.1,vy:-c.vy*.1,l:.5,m:.5,sh:3,col:'#e8f8ff',r:rnd(3,6),a0:.6,fr:.5})}
      else{c.vx=Math.max(-400,Math.min(400,dx/dt));c.vy=Math.max(-400,Math.min(400,dy/dt))}});
    S.sp+=dt;if(S.sp>=2.8){S.sp=0;const tg=al[Math.floor(Math.random()*al.length)];if(tg)S.ic.push({x:clamp(tg.x+rnd(-50,50),40,A-40),y:clamp(tg.y+rnd(-50,50),40,A-40),t:0})}
    S.ic.forEach(q=>q.t+=dt);S.ic=S.ic.filter(q=>{if(q.t>=1&&!q.hit){q.hit=1;SFXa('slam');FX.push({k:'crack',x:q.x,y:q.y,r:40,l:1.2,m:1.2});for(let i=0;i<10;i++)Pt.push({x:q.x,y:q.y,vx:rnd(-160,160),vy:rnd(-160,160),l:.6,m:.6,sh:10,col:'#d6f3ff',r:rnd(2,5),rot:rnd(0,TAU),vr:rnd(-10,10),fr:.4});
      al.forEach(f=>{if(Math.hypot(f.x-q.x,f.y-q.y)<44+f.r*.5){hurt(f,6,ENV,f.x,f.y,0,0);f.slow=Math.max(f.slow,1.2)}})}return q.t<1.6})}
  if(S.k=='ring'){const R=S.ring;R.r=S.t<5?440:Math.max(150,440-(S.t-5)*7);al.forEach(f=>{const d=Math.hypot(f.x-A/2,f.y-A/2);if(d>R.r-f.r*.3){stgHit(f,2.5,'ring',.5);const a=Math.atan2(A/2-f.y,A/2-f.x);f.x+=Math.cos(a)*40*dt;f.y+=Math.sin(a)*40*dt}})}
  if(S.k=='saw'){const W=S.saw;W.a+=dt*(1.05+Math.min(.6,S.t*.01));const L=240,ca=Math.cos(W.a),sa=Math.sin(W.a);
    al.forEach(f=>{const px=f.x-A/2,py=f.y-A/2,along=px*ca+py*sa,perp=-px*sa+py*ca;if(Math.abs(along)>L+30)return;
      const tip=Math.abs(along)>L-36&&Math.hypot(Math.abs(along)-L+6,perp)<28+f.r;const bar=Math.abs(along)<=L&&Math.abs(perp)<9+f.r;
      if(tip||bar){if(stgHit(f,tip?5:3,'saw',.7)){const sd=perp>=0?1:-1,nx=-sa*sd,ny=ca*sd;f.x=clamp(f.x+nx*30,f.r,A-f.r);f.y=clamp(f.y+ny*30,f.r,A-f.r);f.dx=nx;f.dy=ny;SFXa('heavy');for(let i=0;i<8;i++)sparkP(f.x-nx*f.r,f.y-ny*f.r,nx*rnd(80,220)+rnd(-60,60),ny*rnd(80,220)+rnd(-60,60),'#ffe9a0',2)}}})}
  if(S.k=='box'){S.sp+=dt;if(S.sp>=4.2&&S.boxes.length<2){S.sp=0;S.boxes.push({x:rnd(80,A-80),y:rnd(80,A-80),t:0})}S.boxes.forEach(b=>b.t+=dt);
    S.boxes=S.boxes.filter(b=>{if(b.t<.5)return true;const f=al.find(f=>Math.hypot(f.x-b.x,f.y-b.y)<f.r+20);if(!f)return b.t<14;stgItem(f,b);return false})}};
function stgItem(f,b){const it=['heal','shield','rage','bomb','zap'][Math.floor(Math.random()*5)];SFXa('ult');ring(b.x,b.y,8,70,'#ffe14a',6,.4);
  const en=F.filter(x=>x!=f&&!x.dead&&!x.hid);
  if(it=='heal'){f.hp=Math.min(100,f.hp+15);ft(f.x,f.y-f.r-34,'회복 +15','#7bff8a',22)}
  else if(it=='shield'){f.shield=1;ft(f.x,f.y-f.r-34,'방어막!','#e3f6ff',22)}
  else if(it=='rage'){f.stRage=6;ft(f.x,f.y-f.r-34,'분노! 피해 +30%','#ff5050',20)}
  else if(it=='bomb'){ft(f.x,f.y-f.r-34,'폭탄!','#ffb040',22);FX.push({k:'stbomb',x:b.x,y:b.y,l:.9,m:.9,o:f})}
  else{ft(f.x,f.y-f.r-34,'번개!','#ffe14a',22);en.forEach(e=>{FX.push({k:'stzap',x:e.x,y:e.y,l:.35,m:.35});hurt(e,6,f,e.x,e.y,0,1);e.stn=Math.max(e.stn,.5);e.cast=null})}}
const _hurtSTG=hurt;hurt=function(t,n,o){if(STG&&o&&o.stRage>0&&t!=o&&n>0){const a=[...arguments];a[1]=Math.round(n*1.3*10)/10;return _hurtSTG.apply(this,a)}return _hurtSTG.apply(this,arguments)};
const _updSTR=update;update=function(dt){_updSTR(dt);if(F)F.forEach(f=>{if(f.stRage>0)f.stRage-=dt})};
FXD.stbomb=x=>{const p=1-x.l/x.m;if(p<.7){const u=p/.7;g.save();g.translate(x.x,x.y);g.fillStyle='#222';g.beginPath();g.arc(0,0,13,0,TAU);g.fill();g.strokeStyle='#ff5030';g.lineWidth=3;g.beginPath();g.arc(0,0,60,0,TAU*u);g.stroke();if(Math.sin(clock*30)>0){g.fillStyle='#ff3020';g.beginPath();g.arc(0,0,5,0,TAU);g.fill()}g.restore()}
  else{if(!x.bm){x.bm=1;SFXa('slam');shake=Math.max(shake,16);if(typeof lkImp=='function')lkImp(x.x,x.y,120,'#ffb040');ring(x.x,x.y,10,120,'#ffb040',10,.5);F.forEach(e=>{if(e==x.o||e.dead||e.hid)return;if(Math.hypot(e.x-x.x,e.y-x.y)<90+e.r)hurt(e,8,x.o,e.x,e.y,0,1)})}}};
FXD.stzap=x=>{const p=1-x.l/x.m;if(typeof lkBolt=='function'){lkBolt(x.x+rnd(-30,30),-20,x.x,x.y,'#ffe14a',4*(1-p))}};
// 그림 (바닥 위 · 공 아래)
let STICE=null;function stIceTex(){if(STICE)return STICE;const c=document.createElement('canvas');c.width=c.height=600;const x=c.getContext('2d');x.fillStyle='rgba(170,220,255,.22)';x.fillRect(0,0,600,600);x.strokeStyle='rgba(255,255,255,.35)';x.lineWidth=1.5;
  for(let i=0;i<26;i++){let px=Math.random()*600,py=Math.random()*600;x.beginPath();x.moveTo(px,py);for(let k=0;k<4;k++){px+=(Math.random()-.5)*90;py+=(Math.random()-.5)*90;x.lineTo(px,py)}x.stroke()}
  x.fillStyle='rgba(255,255,255,.18)';for(let i=0;i<40;i++){x.beginPath();x.ellipse(Math.random()*600,Math.random()*600,Math.random()*40+10,Math.random()*6+2,Math.random()*3,0,TAU);x.fill()}return STICE=c}
const _floorSTG=floorFX;floorFX=function(){_floorSTG.apply(this,arguments);const S=STG;if(!S||phase=='menu')return;
  if(S.k=='lava'){g.save();g.fillStyle='rgba(60,10,0,.25)';g.fillRect(0,0,A,A);S.pools.forEach(p=>{if(p.t<1.1){const u=p.t/1.1;g.save();g.translate(p.x,p.y);g.globalAlpha=.5+.4*Math.sin(clock*14);g.strokeStyle='#ff6a20';g.lineWidth=3;g.setLineDash([8,6]);g.beginPath();g.arc(0,0,p.R*u,0,TAU);g.stroke();g.setLineDash([]);for(let i=0;i<3;i++){const a=clock*3+i*2;g.fillStyle='rgba(255,140,40,.6)';g.beginPath();g.arc(Math.cos(a)*p.R*.5*u,Math.sin(a)*p.R*.4*u,3+2*Math.sin(clock*9+i),0,TAU);g.fill()}g.restore();return}
      const k=p.t-1.1,al=Math.min(1,k/.3)*Math.min(1,(p.life-p.t)/.8),R=p.R*(1+.04*Math.sin(clock*3+p.x));g.save();g.translate(p.x,p.y);g.globalAlpha=al;const gr=g.createRadialGradient(0,0,2,0,0,R);gr.addColorStop(0,'#fff3c4');gr.addColorStop(.3,'#ffb03a');gr.addColorStop(.7,'#ff4a0a');gr.addColorStop(1,'#5a1204');g.fillStyle=gr;g.beginPath();g.arc(0,0,R,0,TAU);g.fill();
        g.strokeStyle='#2a0600';g.lineWidth=4;g.stroke();g.globalCompositeOperation='lighter';glow('#ff6a20',0,0,R*1.6,.35*al);for(let i=0;i<4;i++){const ph=(clock*.8+i*.25+p.x*.01)%1;g.fillStyle='rgba(255,230,160,'+(.6*(1-ph))+')';g.beginPath();g.arc(Math.cos(i*1.7+p.y)*R*.5,Math.sin(i*2.3+p.x)*R*.5,2+6*ph,0,TAU);g.fill()}g.restore()});g.restore()}
  if(S.k=='ice'){g.drawImage(stIceTex(),0,0,A,A);S.ic.forEach(q=>{const u=Math.min(1,q.t);if(q.t<1){g.save();g.translate(q.x,q.y);g.fillStyle='rgba(0,20,40,'+(.2+.35*u)+')';g.beginPath();g.ellipse(0,4,44*u+6,16*u+3,0,0,TAU);g.fill();g.strokeStyle='rgba(200,240,255,.7)';g.setLineDash([6,5]);g.lineWidth=2;g.beginPath();g.arc(0,0,44,0,TAU);g.stroke();g.setLineDash([]);g.restore();
      const yy=q.y-260*(1-u*u);g.save();g.translate(q.x,yy);g.fillStyle='#e8f8ff';g.strokeStyle='#5aa8d8';g.lineWidth=2;g.beginPath();g.moveTo(-10,-34);g.lineTo(10,-34);g.lineTo(0,8);g.closePath();g.fill();g.stroke();g.restore()}})}
  if(S.k=='ring'){const R=S.ring.r;g.save();g.beginPath();g.rect(0,0,A,A);g.arc(A/2,A/2,R,0,TAU,true);g.fillStyle='rgba(90,30,160,'+(.38+.06*Math.sin(clock*3))+')';g.fill('evenodd');g.restore();g.save();g.globalCompositeOperation='lighter';g.strokeStyle='rgba(200,140,255,.85)';g.lineWidth=4;g.beginPath();g.arc(A/2,A/2,R,0,TAU);g.stroke();g.strokeStyle='rgba(170,90,255,.3)';g.lineWidth=16;g.stroke();
      for(let i=0;i<24;i++){const a=i*TAU/24+clock*.4;g.fillStyle='rgba(220,180,255,.6)';g.beginPath();g.arc(A/2+Math.cos(a)*R,A/2+Math.sin(a)*R,2.5,0,TAU);g.fill()}g.restore()}
  if(S.k=='saw'){const W=S.saw,L=240;g.save();g.translate(A/2,A/2);g.fillStyle='rgba(0,0,0,.3)';g.beginPath();g.arc(4,6,26,0,TAU);g.fill();g.rotate(W.a);g.fillStyle='rgba(0,0,0,.3)';g.fillRect(-L+4,-6+6,L*2,14);
      const gr=g.createLinearGradient(0,-9,0,9);gr.addColorStop(0,'#c8ccd6');gr.addColorStop(.5,'#8a909e');gr.addColorStop(1,'#4a505c');g.fillStyle=gr;g.strokeStyle='#14161c';g.lineWidth=2;g.fillRect(-L,-8,L*2,16);g.strokeRect(-L,-8,L*2,16);g.fillStyle='#ffd23a';for(let x=-L+20;x<L-20;x+=40){g.fillRect(x,-8,14,16)}
      [-1,1].forEach(sd=>{g.save();g.translate(sd*(L-6),0);g.rotate(clock*14*sd);g.fillStyle='#d8dce6';g.strokeStyle='#222';g.lineWidth=2;g.beginPath();for(let i=0;i<16;i++){const a=i*TAU/16,r=i%2?22:30;i?g.lineTo(Math.cos(a)*r,Math.sin(a)*r):g.moveTo(Math.cos(a)*r,Math.sin(a)*r)}g.closePath();g.fill();g.stroke();g.fillStyle='#555';g.beginPath();g.arc(0,0,7,0,TAU);g.fill();g.restore()});
      g.rotate(-W.a);g.fillStyle='#3a3f4c';g.strokeStyle='#14161c';g.lineWidth=3;g.beginPath();g.arc(0,0,22,0,TAU);g.fill();g.stroke();g.fillStyle='#ffd23a';g.beginPath();g.arc(0,0,8,0,TAU);g.fill();g.restore()}
  if(S.k=='box'){S.boxes.forEach(b=>{const u=Math.min(1,b.t/.5),yy=b.y-(1-u)*200,bob=u>=1?Math.sin(clock*3+b.x)*3:0,blink=b.t>11&&Math.sin(clock*20)>0;if(blink)return;g.save();g.fillStyle='rgba(0,0,0,'+(.35*u)+')';g.beginPath();g.ellipse(b.x,b.y+14,18*u,7*u,0,0,TAU);g.fill();g.translate(b.x,yy-bob);
      g.save();g.globalCompositeOperation='lighter';glow('#ffe14a',0,0,40,.4);g.restore();g.fillStyle='#c8202a';g.strokeStyle='#3a0606';g.lineWidth=2;g.fillRect(-15,-12,30,26);g.strokeRect(-15,-12,30,26);g.fillStyle='#ffd23a';g.fillRect(-4,-12,8,26);g.fillRect(-17,-16,34,8);g.strokeRect(-17,-16,34,8);
      g.fillStyle='#fff';g.font='900 14px '+UTF;g.textAlign='center';g.textBaseline='middle';g.fillText('?',0,3);g.restore()})}
  // 시작 전에 경기장 이름
  if(phase=='cd'){const st=STAGES[S.k];g.save();g.globalAlpha=Math.min(1,(4.4-tm)/.4);g.font='700 14px '+UTF;g.textAlign='center';g.fillStyle='#ffffff';g.fillText('STAGE',A/2,64);g.font='900 34px '+UTF;g.lineJoin='round';g.lineWidth=8;g.strokeStyle='#000';g.strokeText(st.n,A/2,100);g.fillStyle=st.c;g.fillText(st.n,A/2,100);g.font='700 15px '+UTF;g.lineWidth=5;g.strokeText('* '+st.d,A/2,126);g.fillStyle='#ddd';g.fillText('* '+st.d,A/2,126);g.restore()}};
// 도전 모드 라운드 표시 (시작 전에 크게)
const _floorCH=floorFX;floorFX=function(){_floorCH.apply(this,arguments);if(!CHAL||phase!='cd'||!F)return;g.save();g.globalAlpha=Math.min(1,(4.4-tm)/.4);g.textAlign='center';g.lineJoin='round';g.font='900 38px '+UTF;g.lineWidth=8;g.strokeStyle='#000';const t=CHAL.boss?'BOSS ROUND '+CHAL.r:'ROUND '+CHAL.r;g.strokeText(t,A/2,96);g.fillStyle=CHAL.boss?'#ff4050':'#ffe14a';g.fillText(t,A/2,96);g.restore()};
;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ▶ 섹션 : extra24
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ===== extra24.js : 도전 모드 2.0 (갈림길 루트) =====
// 5칸마다 구역이 바뀜 · 칸마다 갈림길에서 다음 칸을 직접 고름 · 마지막 칸은 보스
// 전투 · 엘리트 (더 셈 · 보상 좋음) · 상점 (골드로 카드 · 유물 · 회복) · 이벤트 (언더테일 선택지) · 휴식 (회복 · 단련) · 보물 (유물)
const CHN={battle:{n:'전투',c:'#ffffff'},elite:{n:'엘리트',c:'#ff8040'},boss:{n:'보스',c:'#ff3050'},shop:{n:'상점',c:'#ffd23a'},event:{n:'이벤트',c:'#8fd3f5'},rest:{n:'휴식',c:'#7bff8a'},treasure:{n:'보물',c:'#ffb020'}};
const CHRL=[{k:'doll',n:'저주받은 인형',d:'매 판 시작 때 적 체력 -15',ic:'skull',c:'#c080ff'},{k:'coin',n:'행운의 동전',d:'얻는 골드 +50%',ic:'crit',c:'#ffd23a'},{k:'glass',n:'모래시계',d:'매 판 궁 게이지 25%로 시작',ic:'cd',c:'#8fd3f5'},{k:'knife',n:'피 묻은 칼',d:'판을 이기면 체력 8 더 회복',ic:'vamp',c:'#ff4050'},
  {k:'crown',n:'가시 왕관',d:'주는 피해 +25% · 받는 피해 +10%',ic:'thorn',c:'#ffb020'},{k:'feather',n:'깃털',d:'이동 속도 +12%',ic:'spd',c:'#e8f4ff'},{k:'potion',n:'수상한 약병',d:'매 판 시작 때 랜덤 버프 (방어막 · 궁 30% · 체력 10)',ic:'heal',c:'#7bff8a'},{k:'dice',n:'도박사의 주사위',d:'얻으면 카드 리롤 +2',ic:'crit',c:'#ff8fb8'},
  {k:'turtle',n:'거북 등껍질',d:'매 판 처음 4초 동안 받는 피해 절반',ic:'def',c:'#7bd67b'},{k:'charm',n:'부적',d:'엘리트 · 보스에게 주는 피해 +25%',ic:'halo',c:'#ffe14a'},{k:'heart',n:'심장 조각',d:'휴식 회복 +20',ic:'heal',c:'#ff6080'},{k:'ring',n:'해골 반지',d:'체력 50 이하일 때 준 피해의 10% 회복',ic:'skull',c:'#d0d0d0'},{k:'magnet',n:'자석',d:'상점 가격 25% 할인',ic:'bolt',c:'#ff6040'}];
(function(){const s=$('#modes .mc[data-x="C"] small');if(s)s.textContent='갈림길을 골라 나아감 · 상점 · 이벤트 · 유물 · 5칸마다 보스'})();
function chSeg(st){const Fl=[];for(let k=0;k<5;k++){if(k==4){Fl.push([{t:'boss',x:.5}]);continue}const first=st==1&&k==0,n=first?3:(Math.random()<.5?2:3),row=[];
    for(let i=0;i<n;i++){let t='battle';if(!first){const W=[['battle',40],['elite',k>=1?14:0],['event',22],['shop',k>=1&&!row.some(q=>q.t=='shop')?11:0],['rest',k>=2&&!row.some(q=>q.t=='rest')?13:0],['treasure',k>=1?6:0]];let s=W.reduce((a,b)=>a+b[1],0),r=Math.random()*s;for(const [q,w] of W){r-=w;if(r<=0){t=q;break}}}row.push({t,x:(i+1)/(n+1)+rnd(-.04,.04)})}
    Fl.push(row)}
  for(let k=0;k<4;k++){const A2=Fl[k],B2=Fl[k+1];A2.forEach(a=>{const near=B2.map((b,j)=>[Math.abs(b.x-a.x),j]).sort((p,q)=>p[0]-q[0]);a.to=[near[0][1]];if(B2.length>1&&Math.random()<.45)a.to.push(near[1][1])});
    B2.forEach((b,j)=>{if(!A2.some(a=>a.to.includes(j))){const ni=A2.map((a,i)=>[Math.abs(a.x-b.x),i]).sort((p,q)=>p[0]-q[0])[0][1];A2[ni].to.push(j)}})}
  return{st,F:Fl}}
function chJ(w){const c=w.charCodeAt(w.length-1)-44032;return c>=0&&c<11172&&c%28?'이':'가'}
function chRelicRand(){const c=CHAL,L=CHRL.filter(r=>!c.rl[r.k]);return L.length?L[Math.floor(Math.random()*L.length)]:null}
function chGetRelic(r){const c=CHAL;c.rl[r.k]=1;if(r.k=='dice')c.rr=(c.rr||0)+2}
function chRandCard(tiers){const U=CHAL.up,L=CHUP.filter(u=>tiers.includes(u.t)&&u.k!='heal'&&!(u.max&&(U[u.k]||0)>=u.max)&&!(u.k=='rev'&&U.imm)&&!(u.k=='imm'&&U.rev));return L.length?L[Math.floor(Math.random()*L.length)]:null}
function chGive(u){const c=CHAL;if(!u)return;if(u.k=='heal'){c.hp=Math.min(100,c.hp+30);return}c.up[u.k]=(c.up[u.k]||0)+1;if(u.k=='rev')c.rev+=1;if(u.k=='imm')c.rev+=2;c.hist.push(u.k)}
function chIco(cv,t,col){const x=cv.getContext('2d'),S=cv.width;x.clearRect(0,0,S,S);if(t=='elite'){chalIcon(cv,'skull',col);return}if(t=='rest'){chalIcon(cv,'fire',col);return}
  x.save();x.translate(S/2,S/2);x.scale(S/64,S/64);x.strokeStyle=col;x.fillStyle=col;x.lineWidth=5;x.lineCap='round';x.lineJoin='round';
  if(t=='battle'){[[-1],[1]].forEach(([sd])=>{x.beginPath();x.moveTo(-18*sd,-20);x.lineTo(16*sd,18);x.stroke();x.beginPath();x.moveTo(8*sd,20);x.lineTo(20*sd,8);x.stroke()})}
  else if(t=='boss'){x.beginPath();x.moveTo(-22,14);x.lineTo(-24,-14);x.lineTo(-10,0);x.lineTo(0,-22);x.lineTo(10,0);x.lineTo(24,-14);x.lineTo(22,14);x.closePath();x.fill();x.fillRect(-22,18,44,6)}
  else if(t=='shop'){x.beginPath();x.arc(0,4,20,0,TAU);x.stroke();x.font='22px "Press Start 2P",monospace';x.textAlign='center';x.textBaseline='middle';x.fillText('G',1,6)}
  else if(t=='event'){x.font='34px "Press Start 2P",monospace';x.textAlign='center';x.textBaseline='middle';x.fillText('?',2,4)}
  else if(t=='treasure'){x.strokeRect(-20,-6,40,24);x.beginPath();x.moveTo(-20,-6);x.quadraticCurveTo(0,-26,20,-6);x.stroke();x.fillRect(-4,-2,8,10)}
  x.restore()}
// ---------- 시작 · 지도 ----------
chalStart=function(){CHAL={r:1,hp:100,pi:SEL[0],up:{},hist:[],best:chalBest().r||0,rev:0,rr:3,gold:0,rl:{},seg:chSeg(1),k:-1,at:-1,node:null};chMap()};
function chTop(){const c=CHAL;return`<div class="chs">체력 ${Math.round(c.hp)} / 100 · <span class="chg">${c.gold} G</span> · 리롤 ${c.rr}</div><div class="chhp"><i style="width:${c.hp}%"></i></div>${Object.keys(c.rl).length?`<div class="chrl">${CHRL.filter(r=>c.rl[r.k]).map(r=>`<em style="--uc:${r.c}" title="${r.d}">${r.n}</em>`).join('')}</div>`:''}`}
function chMap(){const c=CHAL;if(!c)return;if(c.r>c.seg.st+4){c.seg=chSeg(c.r);c.k=-1;c.at=-1}const S=c.seg,el=chalEl(),zone=Math.floor((c.r-1)/5)+1;chalHide();
  const can=c.k<0?S.F[0].map((n,i)=>i):S.F[c.k][c.at].to,nk=c.k+1;
  const pos=(k,n)=>({x:n.x*100,y:94-k*21});
  let lines='';S.F.forEach((row,k)=>{if(k==4)return;row.forEach((n,i)=>{n.to.forEach(j=>{const a=pos(k,n),b=pos(k+1,S.F[k+1][j]),on=(k==c.k&&i==c.at&&can.includes(j))||(n.vis&&S.F[k+1][j].vis);lines+=`<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" class="${on?'on':''}"/>`})})});
  let nodes='';S.F.forEach((row,k)=>row.forEach((n,i)=>{const p=pos(k,n),ok=k==nk&&can.includes(i),cur=k==c.k&&i==c.at;nodes+=`<button class="chn${ok?' can':''}${n.vis?' vis':''}${cur?' cur':''}${n.t=='boss'?' boss':''}" data-k="${k}" data-i="${i}" style="left:${p.x}%;top:${p.y}%;--nc:${CHN[n.t].c}" ${ok?'':'disabled'}><canvas width="64" height="64"></canvas><b>${CHN[n.t].n}</b></button>`}));
  el.innerHTML=`<div class="chb chmapb"><div class="cht">* 구역 ${zone} · ROUND ${c.r}</div>${chTop()}<div class="chq">* 갈 길을 골라라.</div><div class="chmap"><svg viewBox="0 0 100 100" preserveAspectRatio="none">${lines}</svg>${nodes}</div>
    <div class="chleg">${['battle','elite','event','shop','rest','treasure'].map(t=>`<span style="--nc:${CHN[t].c}">${CHN[t].n}</span>`).join('')}</div></div>`;
  el.querySelectorAll('.chn').forEach(b=>{const n=S.F[+b.dataset.k][+b.dataset.i];chIco(b.querySelector('canvas'),n.t,CHN[n.t].c);b.addEventListener('click',()=>{if(b.disabled)return;SFX('click');const k=+b.dataset.k,i=+b.dataset.i;c.k=k;c.at=i;n.vis=1;c.node={t:n.t};chGo(n.t)})});
  void el.offsetWidth;el.classList.add('on')}
function chGo(t){if(t=='battle'||t=='elite'||t=='boss'){chalRound();return}if(t=='shop')chShop();else if(t=='rest')chRest();else if(t=='treasure')chTreasure();else chEvent()}
function chDone(){const c=CHAL;c.r++;chMap()}
// ---------- 전투 ----------
chalRound=function(){const c=CHAL,nd=c.node||{t:'battle'},boss=nd.t=='boss',elite=nd.t=='elite',RL=c.rl;let pool=DEF.map((d,i)=>i).filter(i=>i!=c.pi&&baseOf(i)!=baseOf(c.pi));if(!pool.length)pool=DEF.map((d,i)=>i).filter(i=>i!=c.pi);
  const ei=nd.mirror?c.pi:pool[Math.floor(Math.random()*pool.length)];SEL=[c.pi,ei,0];MODE=2;MENU_T=0;TOURM=null;document.body.classList.remove('m');$('#menu').classList.remove('on');chalHide();
  const hi=Math.max(0,c.r-10);c.eTake=Math.max(.45,Math.max(.7,1.35-(c.r-1)*.045)-hi*.03)*(boss?.86:1)*(elite?.84:1);c.eDeal=(.55+(c.r-1)*.06+hi*.08)*(boss?1.05:1)*(elite?1.15:1);c.handled=0;c.boss=boss;c.elite=elite;
  init();const P=F[0],E=F[1],U=c.up;P.hp=c.hp;P.show=c.hp;P.sp*=(1+.1*(U.spd||0))*(U.haste?1.15:1)*(U.abs?1.2:1)*(RL.feather?1.12:1);if(U.shield)P.shield=1;if(U.ult)P.ug=Math.min(100,40*U.ult);if(U.giant)P.r*=1+.12*U.giant;
  P.chInv=U.inv?3:0;P.chGod=U.god?3:0;P.chKit=U.kit?1:0;P.chFirst=U.first?1:0;P.chSt=0;P.chT0=0;if(U.time)E.chTime=1;
  if(RL.glass)P.ug=Math.max(P.ug||0,25);if(RL.potion){const r=Math.floor(Math.random()*3);if(r==0)P.shield=1;else if(r==1)P.ug=Math.min(100,(P.ug||0)+30);else P.hp=Math.min(100,P.hp+10)}if(RL.doll){E.hp=Math.max(10,E.hp-15);E.show=E.hp}
  if(boss){E.chB=1;E.r*=1.3;E.d=Object.assign({},E.d,{name:'BOSS · '+E.d.name})}
  else if(elite){const M=nd.mirror?'거울':nd.mimic?'미믹':['거대','광폭','재생','철벽'][Math.floor(Math.random()*4)];E.chEl=M;if(M=='거대')E.r*=1.25;if(M=='광폭')E.sp*=1.25;if(M=='철벽')E.shield=1;if(M=='미믹')E.sp*=1.15;E.d=Object.assign({},E.d,{name:'엘리트 · '+M+' · '+E.d.name})}
  P.d=Object.assign({},P.d,{name:P.d.name});buildHUD();chalHud()};
chalWin=function(){const c=CHAL,RL=c.rl,g0=c.boss?70:c.elite?45:Math.round(rnd(16,26)),gg=Math.round(g0*(RL.coin?1.5:1));c.gold+=gg;c.lastGold=gg;
  c.hp=Math.min(100,Math.max(1,F[0].hp)+12+15*(c.up.bonus||0)+(RL.knife?8:0));const cleared=c.r;c.r++;c.wasBoss=c.boss||c.elite;c.cleared=cleared;if(c.rr==null)c.rr=3;c.newRel=null;
  if(c.boss||(c.elite&&Math.random()<.4)){const r=chRelicRand();if(r){chGetRelic(r);c.newRel=r}}
  if(c.node&&c.node.reward=='leg'){const L=[chRandCard(['l','m']),chRandCard(['l','m']),chRandCard(['e','l'])].filter(Boolean);const u=[...new Set(L)];chalShow(u.length?u:chalPick3(true));return}
  chalShow(chalPick3(c.wasBoss))};
const _chalShow2=chalShow;chalShow=function(opts){_chalShow2(opts);const c=CHAL,el=chalEl(),s=el.querySelector('.chs');if(s&&c.lastGold)s.insertAdjacentHTML('beforeend',` · <span class="chg">+${c.lastGold} G (${c.gold} G)</span>`);
  if(c.newRel){const r=c.newRel;el.querySelector('.chb').insertAdjacentHTML('afterbegin',`<div class="chnr" style="--uc:${r.c}"><canvas width="64" height="64"></canvas><div><b>유물 획득 · ${r.n}</b><small>${r.d}</small></div></div>`);chalIcon(el.querySelector('.chnr canvas'),r.ic,r.c);c.newRel=null}};
const _chalHud2=chalHud;chalHud=function(){_chalHud2();const h=$('#chhud');if(h&&CHAL){h.insertAdjacentHTML('beforeend',`<i class="g">${CHAL.gold}G</i>`+(CHAL.elite?'<i>ELITE</i>':''))}};
// ---------- 공통 상자 ----------
function chBox(title,body,btns){const el=chalEl();chalHide();el.innerHTML=`<div class="chb"><div class="cht">${title}</div>${chTop()}${body}<div class="chch">${btns.map((b,i)=>`<button class="chop" data-i="${i}" ${b.off?'disabled':''}><span>♥</span>${b.n}${b.s?`<small>${b.s}</small>`:''}</button>`).join('')}</div></div>`;
  el.querySelectorAll('.chop').forEach(b=>b.addEventListener('click',()=>{if(b.disabled)return;SFX('click');btns[+b.dataset.i].f()}));void el.offsetWidth;el.classList.add('on');return el}
function chMsg(title,txt,next){chBox(title,`<div class="chev">${txt}</div>`,[{n:'계속',f:next||chDone}])}
// ---------- 상점 ----------
function chShop(){const c=CHAL,disc=c.rl.magnet?.75:1,PR={c:40,r:70,e:110,l:170,m:260};
  if(!c.shop||c.shop.r!=c.r){const cards=[];for(let i=0;i<3;i++){const t=[['c','r'],['r','e'],['e','l','m']][i],u=chRandCard(t);if(u&&!cards.some(q=>q.u==u))cards.push({ty:'card',u,p:Math.round(PR[u.t]*disc)})}const rl=chRelicRand(),keep=DEF.filter(d=>d.vof==null&&!d.cw);
    c.shop={r:c.r,who:keep[Math.floor(Math.random()*keep.length)].name,items:[...cards,rl?{ty:'relic',rl,p:Math.round(150*disc)}:null,{ty:'heal',p:Math.round(45*disc)},{ty:'rr',p:Math.round(35*disc)}].filter(Boolean)}}
  const S=c.shop,el=chalEl();chalHide();
  el.innerHTML=`<div class="chb"><div class="cht">* 상점</div>${chTop()}<div class="chev">* ${S.who}${chJ(S.who)} 장사를 하고 있다. "골드 있으면 사가~"</div><div class="chshop">${S.items.map((it,i)=>{const nm=it.ty=='card'?it.u.n:it.ty=='relic'?it.rl.n:it.ty=='heal'?'회복약':'리롤 +1',ds=it.ty=='card'?it.u.d:it.ty=='relic'?it.rl.d:it.ty=='heal'?'체력 30 회복':'카드 다시 뽑기 1번 추가',col=it.ty=='card'?it.u.c:it.ty=='relic'?it.rl.c:it.ty=='heal'?'#7bff8a':'#ff8fb8',tag=it.ty=='card'?TIER[it.u.t].n:it.ty=='relic'?'유물':'소모품';
    return`<button class="chsi${it.sold?' sold':''}" data-i="${i}" style="--uc:${col}" ${it.sold||c.gold<it.p?'disabled':''}><i>${tag}</i><canvas width="64" height="64"></canvas><b>${nm}</b><small>${ds}</small><em>${it.sold?'판매 완료':it.p+' G'}</em></button>`}).join('')}</div><div class="chch"><button class="chop" id="chout"><span>♥</span>나간다</button></div></div>`;
  el.querySelectorAll('.chsi').forEach(b=>{const it=S.items[+b.dataset.i];chalIcon(b.querySelector('canvas'),it.ty=='card'?it.u.ic:it.ty=='relic'?it.rl.ic:it.ty=='heal'?'heal':'crit',it.ty=='card'?it.u.c:it.ty=='relic'?it.rl.c:it.ty=='heal'?'#7bff8a':'#ff8fb8');
    b.addEventListener('click',()=>{if(b.disabled||it.sold||c.gold<it.p)return;SFXa('th_cash');c.gold-=it.p;it.sold=1;if(it.ty=='card')chGive(it.u);else if(it.ty=='relic')chGetRelic(it.rl);else if(it.ty=='heal')c.hp=Math.min(100,c.hp+30);else c.rr++;chShop()})});
  $('#chout').addEventListener('click',()=>{SFX('click');chDone()});void el.offsetWidth;el.classList.add('on')}
// ---------- 휴식 ----------
function chRest(){const c=CHAL,heal=35+(c.rl.heart?20:0),own=CHUP.filter(u=>c.up[u.k]&&!(u.max&&c.up[u.k]>=u.max));
  chBox('* 휴식',`<div class="chev">* 모닥불이 타닥거린다. 따뜻하다.<br>* 결의로 가득 찼다.</div>`,[{n:'쉰다',s:'체력 +'+heal,f:()=>{c.hp=Math.min(100,c.hp+heal);chMsg('* 휴식','* 푹 쉬었다. 체력이 '+Math.round(c.hp)+'이(가) 되었다.')}},
    {n:'단련한다',s:own.length?'가진 강화 하나를 한 단계 더':'단련할 강화가 없다',off:!own.length,f:()=>{chBox('* 단련','<div class="chev">* 무엇을 단련할까?</div>',own.map(u=>({n:u.n+' ×'+(c.up[u.k]+1),s:u.d,f:()=>{chGive(u);chMsg('* 단련',`* ${u.n}이(가) 더 강해졌다!`)}})))}}])}
// ---------- 보물 ----------
function chTreasure(){const c=CHAL,r=chRelicRand();if(!r){c.gold+=80;chMsg('* 보물','* 상자 안에는 골드만 가득했다. (+80 G)');return}
  const el=chBox('* 보물',`<div class="chev">* 상자를 열었다!</div><div class="chnr big" style="--uc:${r.c}"><canvas width="64" height="64"></canvas><div><b>${r.n}</b><small>${r.d}</small></div></div>`,[{n:'챙긴다',f:()=>{chGetRelic(r);chDone()}}]);chalIcon(el.querySelector('.chnr canvas'),r.ic,r.c)}
// ---------- 이벤트 (언더테일 선택지) ----------
const CHEV=[
  c=>({t:'* 수상한 상자가 있다. 덜컹거린다…',ch:[{n:'연다',f:()=>{if(Math.random()<.5){const r=chRelicRand();if(r){chGetRelic(r);chMsg('* 상자',`* 유물을 찾았다! <b style="color:${r.c}">${r.n}</b><br>* ${r.d}`)}else{c.gold+=60;chMsg('* 상자','* 골드가 들어 있었다. (+60 G)')}}else chMsg('* 상자','* 상자가 이빨을 드러냈다! 미믹이다!',()=>{c.node={t:'elite',mimic:1};chalRound()})}},{n:'그냥 간다',f:()=>chMsg('* 상자','* 뒤에서 덜컹거리는 소리가 계속 들렸다…')}]}),
  c=>({t:'* 떠돌이 상인이 체력을 사겠다고 한다. "체력 조금만 팔아…"',ch:[{n:'체력 20 판다',s:'+70 G',off:c.hp<=25,f:()=>{c.hp-=20;c.gold+=70;chMsg('* 상인','* 몸이 조금 무거워졌다. 지갑은 가벼워지지 않았다. (+70 G)')}},{n:'거절한다',f:()=>chMsg('* 상인','* 상인이 아쉬운 표정으로 사라졌다.')}]}),
  c=>({t:'* 피 묻은 제단이 있다. 피를 바치면 힘을 준다고 적혀 있다.',ch:[{n:'피를 바친다',s:'체력 -15 · 에픽 이상 카드',off:c.hp<=18,f:()=>{c.hp-=15;const u=chRandCard(['e','l']);chGive(u);chMsg('* 제단',u?`* 힘이 솟는다… <b style="color:${u.c}">${u.n}</b><br>* ${u.d}`:'* 아무 일도 없었다…')}},{n:'떠난다',f:()=>chMsg('* 제단','* 제단에서 눈을 돌렸다.')}]}),
  c=>({t:'* 반짝이는 샘물이 있다.',ch:[{n:'마신다',s:'체력 +25',f:()=>{c.hp=Math.min(100,c.hp+25);chMsg('* 샘물','* 시원하다! 체력이 회복되었다.')}},{n:'동전을 던진다',s:'-30 G · 희귀 이상 카드',off:c.gold<30,f:()=>{c.gold-=30;const u=chRandCard(['r','e','l']);chGive(u);chMsg('* 샘물',u?`* 소원이 이루어졌다. <b style="color:${u.c}">${u.n}</b>`:'* 퐁당.')}}]}),
  c=>({t:'* 김티비 • 덕질이 가챠를 권한다. "한 번만… 딱 한 번만 돌려봐…"',ch:[{n:'돌린다',s:'-60 G · 랜덤 등급 카드',off:c.gold<60,f:()=>{c.gold-=60;const r=Math.random()*100,t=r<2?'m':r<8?'l':r<22?'e':r<50?'r':'c',u=chRandCard([t])||chRandCard(['c','r','e']);chGive(u);chMsg('* 가챠',u?`* 결과는… <b style="color:${u.c}">[${TIER[u.t].n}] ${u.n}</b>!<br>* ${t=='m'||t=='l'?'김티비가 비명을 질렀다.':'김티비가 "다음엔 나와…" 라고 중얼거렸다.'}`:'* 꽝.')}},{n:'거절한다',f:()=>chMsg('* 가챠','* 김티비가 "천장까지 얼마 안 남았는데…" 라며 아쉬워했다.')}]}),
  c=>({t:'* 거울 속의 내가 말을 건다. "나랑 싸워볼래?"',ch:[{n:'싸운다',s:'나와 똑같은 상대 · 이기면 전설 카드',f:()=>{c.node={t:'elite',mirror:1,reward:'leg'};chalRound()}},{n:'도망친다',f:()=>chMsg('* 거울','* 거울 속의 내가 비웃었다.')}]}),
  c=>({t:'* 갈림길에 낡은 표지판이 있다. 왼쪽은 "돈", 오른쪽은 "힘".',ch:[{n:'왼쪽',s:'+50 G',f:()=>{c.gold+=50;chMsg('* 표지판','* 길바닥에 골드가 떨어져 있었다. (+50 G)')}},{n:'오른쪽',s:'희귀 카드 1장',f:()=>{const u=chRandCard(['r']);chGive(u);chMsg('* 표지판',u?`* <b style="color:${u.c}">${u.n}</b>을(를) 얻었다.`:'* 아무것도 없었다.')}}]}),
  c=>({t:'* 김민채 • 다이어트가 같이 운동하자고 한다. "줄넘기 100개만!"',ch:[{n:'같이 한다',s:'체력 -10 · 신속 +1',off:c.hp<=12,f:()=>{c.hp-=10;chGive(CHUP.find(u=>u.k=='spd'));chMsg('* 운동','* 땀이 비 오듯 흐른다. 몸이 가벼워졌다!')}},{n:'치킨을 사준다',s:'-40 G · 체력 +30 · 강철 몸 +1',off:c.gold<40,f:()=>{c.gold-=40;c.hp=Math.min(100,c.hp+30);chGive(CHUP.find(u=>u.k=='def'));chMsg('* 치킨','* 둘이 치킨을 나눠 먹었다. "다이어트는 내일부터…"')}}]}),
  c=>({t:'* 김지우 • 괴담콜렉터가 무서운 이야기를 들려주겠다고 한다…',ch:[{n:'끝까지 듣는다',s:'50% 잔상 +1 · 50% 체력 -15',f:()=>{if(Math.random()<.5){chGive(CHUP.find(u=>u.k=='dodge'));chMsg('* 괴담','* 무서워서 몸이 저절로 피하게 되었다. (잔상 +1)')}else{c.hp=Math.max(1,c.hp-15);chMsg('* 괴담','* …뒤를 돌아봤다. 아무도 없었다. 심장이 아프다. (체력 -15)')}}},{n:'귀를 막는다',f:()=>chMsg('* 괴담','* "겁쟁이…" 라는 속삭임이 들렸다.')}]}),
  c=>({t:'* 주사위 게임이다. 짝수가 나오면 건 돈의 두 배!',ch:[{n:'50 G 건다',off:c.gold<50,f:()=>{const d=1+Math.floor(Math.random()*6);if(d%2==0){c.gold+=50;chMsg('* 주사위',`* ${d}! 짝수다! (+50 G)`)}else{c.gold-=50;chMsg('* 주사위',`* ${d}… 홀수다. (-50 G)`)}}},{n:'안 한다',f:()=>chMsg('* 주사위','* 현명한 선택이었을지도 모른다.')}]})];
function chEvent(){const c=CHAL;c.evSeen=c.evSeen||[];let pool=CHEV.map((f,i)=>i).filter(i=>!c.evSeen.includes(i));if(!pool.length){c.evSeen=[];pool=CHEV.map((f,i)=>i)}const i=pool[Math.floor(Math.random()*pool.length)];c.evSeen.push(i);const E=CHEV[i](c);
  chBox('* 이벤트',`<div class="chev">${E.t}</div>`,E.ch)}
// 카드 고른 뒤 → 지도
// ---------- 유물 효과 ----------
const _hurtRL=hurt;hurt=function(t,n,o){if(!CHAL||!F||!(n>0)||phase!='play')return _hurtRL.apply(this,arguments);const P=F[0],RL=CHAL.rl,a=[...arguments];let m=1;
  if(t==P&&o!=P){if(RL.crown)m*=1.1;if(RL.turtle&&P.chT0<4)m*=.5}
  if(o==P&&t!=P){if(RL.crown)m*=1.25;if(RL.charm&&(CHAL.boss||CHAL.elite))m*=1.25}
  a[1]=Math.round(n*m*10)/10;const hp0=t.hp,r=_hurtRL.apply(this,a);if(o==P&&t!=P&&RL.ring&&P.hp<=50&&!P.dead)P.hp=Math.min(100,P.hp+Math.max(0,hp0-t.hp)*.1);return r};
const _updRL=update;update=function(dt){_updRL(dt);if(!CHAL||!F||phase!='play')return;const P=F[0];if(P)P.chT0=(P.chT0||0)+dt;F.forEach(f=>{if(f.chEl=='재생'&&!f.dead)f.hp=Math.min(100,f.hp+dt*.7)})};
const _initRL=init;init=function(){_initRL.apply(this,arguments);if(F)F.forEach(f=>{f.chEl=0})};
// 엘리트 표시
const _lowRL=lowHP;lowHP=function(f){_lowRL(f);if(!f.chEl||f.dead||f.hid)return;if(typeof lkAura=='function')lkAura(f.x,f.y,f.r,'#ff8040',.6);g.save();g.translate(f.x,f.y-f.r-16+Math.sin(clock*3)*2);g.fillStyle='#ff8040';g.strokeStyle='#2a1000';g.lineWidth=2;g.beginPath();g.moveTo(0,-10);g.lineTo(10,0);g.lineTo(0,10);g.lineTo(-10,0);g.closePath();g.fill();g.stroke();g.fillStyle='#2a1000';g.font='900 12px '+UTF;g.textAlign='center';g.textBaseline='middle';g.fillText('!',0,1);g.restore()};
;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ▶ 섹션 : extra25
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ===== extra25.js : C.H.A.O.S 모드 =====
// 캐릭터 대신 "봇"으로 시작 · 모든 캐릭터의 스킬 중에서 랜덤 3개 (스킬 2 + 궁 1 · 리롤 3번)
// 5라운드 · 라운드가 끝날 때마다 증강 3개 중 하나 (실버 · 골드 · 프리즘) · 상대 봇도 같은 수만큼 증강
// 라운드마다 "시스템 오류" (거대화 · 폭탄 낙하 · 좌표 오류 …) · 마지막 라운드는 3인 난투
// 늘어지지 않게 : 18초가 지나면 "시스템 과열" → 모두 받는 피해가 계속 커짐
let CX=null,CXNO=0;const CXQ=[];
const CXBOT={name:'C.H.A.O.S 봇',gl:'봇',k:'cxbot',r:26,sp:212};
const CXEN=[['#ff3d6e','#ffd6e0','#2a0410'],['#ffb020','#fff0c8','#2a1a00'],['#9d6bff','#eadcff','#160a2a'],['#5aff7a','#e0ffe6','#06280e']];
const CXHP=[1.4,1.2,1.05,.92,.85];
const CXEV={none:{n:'정상 작동',d:'아직은 평범하다…'},giant:{n:'거대화 오류',d:'모두 몸이 커짐'},tiny:{n:'축소 오류',d:'모두 작아지고 빨라짐'},bomb:{n:'폭탄 낙하',d:'하늘에서 폭탄이 계속 떨어짐'},cd:{n:'쿨타임 폭주',d:'스킬 쿨타임이 두 배로 빨리 돎'},
  ult:{n:'궁극기 과충전',d:'궁 게이지가 가득 찬 채로 시작'},tele:{n:'좌표 오류',d:'4초마다 서로 위치가 뒤바뀜'},vamp:{n:'흡혈 버그',d:'모두 준 피해의 20% 회복'},final:{n:'최종 오류',d:'폭탄 낙하 + 쿨타임 폭주 · 3인 난투'}};
const CXT={s:{n:'실버',c:'#c8d0dc'},g:{n:'골드',c:'#ffc23a'},p:{n:'프리즘',c:'#ff6af0'}};
// 증강 = 내 스킬 하나를 골라서 강화 (라운드마다 스킬 레벨이 올라감) · sl : sk 일반 스킬 / ult 궁극기 / any 아무 스킬
const CXA=[
  {k:'dmg',t:'s',sl:'any',n:'위력 강화',d:'피해 +30%',ic:'pow',max:3},{k:'cdr',t:'s',sl:'sk',n:'과부하 회로',d:'쿨타임 -25%',ic:'cd',max:3},{k:'quick',t:'s',sl:'sk',n:'즉시 실행',d:'시전 딜레이 없음 · 쿨타임 -10%',ic:'spd',max:1},
  {k:'leech',t:'s',sl:'any',n:'흡수 코드',d:'이 스킬로 준 피해의 30% 회복',ic:'vamp',max:2},{k:'ultst',t:'s',sl:'ult',n:'예열',d:'라운드 시작 때 궁 게이지 +50%',ic:'ult',max:2},
  {k:'crit',t:'g',sl:'any',n:'치명적 오류',d:'이 스킬 피해가 25% 확률로 2배',ic:'crit',max:2},{k:'stun',t:'g',sl:'sk',n:'정지 패킷',d:'맞은 적 0.5초 기절 (2초에 한 번)',ic:'skull',max:1},
  {k:'guard',t:'g',sl:'any',n:'방화벽',d:'쓸 때마다 공격 1번을 막는 보호막',ic:'shield',max:1},{k:'echo',t:'g',sl:'sk',n:'메아리',d:'0.5초 뒤에 한 번 더 발동',ic:'ghost',max:1},
  {k:'ultg',t:'g',sl:'ult',n:'궁 폭주',d:'궁 게이지가 2배 빨리 참',ic:'ult',max:1},{k:'chain',t:'g',sl:'any',n:'전류 누수',d:'맞힐 때 번개가 튐 (+3 · 0.6초에 한 번)',ic:'bolt',max:1},
  {k:'over',t:'p',sl:'sk',n:'폭주 모드',d:'피해 +50% · 쿨타임 -35%',ic:'cd',max:1},{k:'triple',t:'p',sl:'sk',n:'삼중 실행',d:'0.45초 · 0.9초 뒤에 두 번 더 발동',ic:'ghost',max:1},
  {k:'refill',t:'p',sl:'ult',n:'무한 루프',d:'궁을 쓰면 게이지 50%가 바로 다시 참',ic:'rev',max:1},{k:'udbl',t:'p',sl:'ult',n:'궁 과부하',d:'궁 피해 +60% · 쓰면 체력 +15',ic:'ult',max:1},
  {k:'clone',t:'p',sl:null,n:'오류 복제',d:'랜덤 스킬 하나를 더 장착',ic:'crit',max:2}];
(function(){const L=$('#modes .mlist');if(!L)return;L.insertAdjacentHTML('beforeend','<button class="mc cxm" data-x="X"><i>ERR</i><b>C.H.A.O.S</b><small>봇으로 시작 · 랜덤 스킬 3개 · 라운드마다 증강 · 5라운드</small></button>');
  $('#modes .mc[data-x="X"]').addEventListener('click',()=>{audioOn();SFX('click');cxStart()})})();
function cxPool(){const S=[],U=[];DEF.forEach((d,i)=>d.sk.forEach((s,j)=>{(s.ult?U:S).push({s,o:i,j})}));return{S,U}}
function cxPick(L,ex){const c=L.filter(q=>!ex.some(e=>e.s==q.s));return c[Math.floor(Math.random()*c.length)]}
function cxKit(){const P=cxPool(),a=cxPick(P.S,[]),b=cxPick(P.S,[a]),u=cxPick(P.U,[]);return[a,b,u]}
function cxUnit(name,col,me){return{name,col,kit:cxKit(),U:{},sl:{},me}}
function cxCanAug(u,a,slot){if(!a.sl)return!(a.max&&(u.U[a.k]||0)>=a.max);const L=u.sl[slot]||{};if(a.max&&(L[a.k]||0)>=a.max)return false;if(a.k=='echo'&&L.triple||a.k=='triple'&&L.echo)return false;return true}
function cxSlots(u,kind){return u.kit.map((k,i)=>i).filter(i=>kind=='any'||(kind=='ult'?u.kit[i].s.ult:!u.kit[i].s.ult))}
function cxLv(u,i){const L=u.sl[i]||{};return 1+Object.values(L).reduce((a,b)=>a+b,0)}
function cxRoll(u,r){const W=[{s:60,g:32,p:8},{s:50,g:38,p:12},{s:40,g:42,p:18},{s:30,g:45,p:25},{s:30,g:45,p:25}][Math.min(4,r-1)];const out=[];let guard=0;
  while(out.length<3&&guard++<80){let s=W.s+W.g+W.p,x=Math.random()*s,t='s';for(const k of['s','g','p']){x-=W[k];if(x<=0){t=k;break}}const L=CXA.filter(a=>a.t==t);const a=L[Math.floor(Math.random()*L.length)];
    let slot=null;if(a.sl){const sl=cxSlots(u,a.sl).filter(i=>cxCanAug(u,a,i));if(!sl.length)continue;slot=sl[Math.floor(Math.random()*sl.length)]}else if(!cxCanAug(u,a))continue;
    if(out.some(o=>o.a==a&&o.slot==slot))continue;out.push({a,slot})}return out}
function cxApply(u,o){const a=o.a;if(a.sl){const L=u.sl[o.slot]||(u.sl[o.slot]={});L[a.k]=(L[a.k]||0)+1}else{u.U[a.k]=(u.U[a.k]||0)+1;if(a.k=='clone'){const P=cxPool(),n=cxPick(P.S,u.kit);if(n)u.kit.push(n)}}}
// 스킬을 쓰는 동안만 원래 캐릭터의 k 로 바꿔서 실행 (그림 · 컷 · 효과가 원래 캐릭터 것을 찾을 수 있게)
function cxRun(s,ok,j,o,t){const k0=o.d.k;o.d.k=ok;o.cxLast=j;o.cxLT=s.ult?5.5:3;try{s.f(o,t)}finally{o.d.k=k0}}
function cxSkill(k,L,j){const s=k.s,s2=Object.assign({},s),cnt=v=>L[v]||0,ok=DEF[k.o].k;if(!s.ult){s2.cd=Math.round(s.cd*Math.pow(.75,cnt('cdr'))*Math.pow(.9,cnt('quick'))*(cnt('over')?.65:1)*10)/10;if(cnt('quick'))s2.w=.05}
  const rep=s.ult?[]:cnt('triple')?[.45,.9]:cnt('echo')?[.5]:[];
  s2.f=(o,t)=>{if(cnt('guard'))o.cxSh=Math.max(o.cxSh||0,1);if(s.ult){if(cnt('udbl')&&!o.dead){o.hp=Math.min(100,o.hp+15);if(!SKIP)ft(o.x,o.y-o.r-30,'+15','#ff6af0',16)}if(cnt('refill'))CXQ.push({t:.25,fn:()=>{if(!o.dead)o.ug=Math.max(o.ug||0,50)}})}
    cxRun(s,ok,j,o,t);rep.forEach((d,n)=>CXQ.push({t:d,fn:()=>{if(o.dead)return;const tt=t&&!t.dead&&!t.hid?t:tgt(o);if(tt){cxRun(s,ok,j,o,tt);if(!SKIP)ft(o.x,o.y-o.r-30,rep.length>1?'삼중 실행!':'메아리!','#3ff0ff',14)}}}))};return s2}
function cxDef(u,i){const c=u.col;return Object.assign({},CXBOT,{name:u.name,col:c[0],hi:c[1],dk:c[2],sk:u.kit.map((k,j)=>cxSkill(k,u.sl[j]||{},j)),cx:1})}
// ---------- 화면 ----------
function cxEl(){return chalEl()}
function cxHide(){const a=$('#chal');if(a)a.classList.remove('on')}
function cxCard(k,lab){const d=DEF[k.o],I=(INFO[d.name]||{sk:[]}).sk[k.j]||[];return`<div class="cu cxk${k.s.ult?' t-l':' t-r'}" style="--uc:${d.col}"><i>${lab}</i><canvas class="ic" data-o="${k.o}"></canvas><b>${k.s.n}</b><small>${I[1]||''}</small><em>${d.name}${I[0]?' · '+I[0]+' DMG':''}</em></div>`}
function cxPaint(el){el.querySelectorAll('canvas.ic[data-o]').forEach(cv=>paintIc(cv,DEF[+cv.dataset.o],30))}
function cxStart(){const sel0=CX&&CX.sel0||SEL.slice(),mode0=CX?CX.mode0:MODE;CX={on:1,r:1,rr:3,res:[],handled:1,sel0,mode0,me:cxUnit('나 · C.H.A.O.S',['#3ff0ff','#e0ffff','#03282c'],1),evs:[],ev:'none',best:cxBest()};const ks=['giant','tiny','bomb','cd','ult','tele','vamp'].sort(()=>Math.random()-.5);CX.plan=['none',ks[0],ks[1],ks[2],'final'];
  scr('none');document.body.classList.add('m');cxDraft()}
function cxBest(){try{return+localStorage.getItem('jsbb3_cx')||0}catch(e){return 0}}
function cxDraft(){const c=CX,u=c.me,el=cxEl();
  el.innerHTML=`<div class="chb cxb"><div class="cht cxt">* SYSTEM BOOT · C.H.A.O.S</div><div class="chs">모든 캐릭터의 스킬 중에서 랜덤으로 3개를 받았다. · 리롤 <b class="cxrr">${c.rr}</b>번 남음</div><div class="chq">* 마음에 안 드는 스킬은 🎲로 바꿔라.</div>
    <div class="chc cxdraft">${u.kit.map((k,i)=>`<div class="cxslot">${cxCard(k,i==2?'궁극기':'스킬 '+(i+1))}<button class="cxre" data-i="${i}" ${c.rr<=0?'disabled':''}>🎲 바꾸기</button></div>`).join('')}</div>
    <div class="cxinfo">* 5라운드 · 라운드가 끝날 때마다 증강을 하나씩 고름 · 상대 봇도 똑같이 강해짐<br>* 라운드마다 시스템 오류가 생김 · 마지막 5라운드는 3인 난투</div>
    <div class="btns"><button class="btn" id="cxback">MENU</button><button class="btn pri" id="cxgo">부팅 시작</button></div></div>`;
  cxPaint(el);el.querySelectorAll('.cxre').forEach(b=>b.addEventListener('click',()=>{if(c.rr<=0)return;c.rr--;SFX('click');const i=+b.dataset.i,P=cxPool(),L=u.kit[i].s.ult?P.U:P.S;u.kit[i]=cxPick(L,u.kit);try{SFXa('ch_flip')}catch(e){}cxDraft();const card=cxEl().querySelectorAll('.cxslot')[i];if(card){card.classList.add('flip')}}));
  $('#cxback').addEventListener('click',()=>{SFX('click');cxHide();goHome()});$('#cxgo').addEventListener('click',()=>{SFX('click');cxRound()});void el.offsetWidth;el.classList.add('on')}
function cxEnemy(i){const c=CX,u=cxUnit('버그 봇 #'+(c.r*10+i),CXEN[(c.r+i)%CXEN.length],0);for(let k=0;k<c.r-1;k++){const o=cxRoll(u,k+1);if(o.length)cxApply(u,o[Math.floor(Math.random()*o.length)])}return u}
function cxRound(){const c=CX,n=c.r==5?3:2;c.ev=c.plan[c.r-1];c.evs=c.ev=='final'?['bomb','cd']:[c.ev];c.ens=[];for(let i=1;i<n;i++)c.ens.push(cxEnemy(i));
  SEL=[3,4,5];MODE=n;MENU_T=0;TOURM=null;if(typeof CHAL!='undefined'){CHAL=null;CHMENU=0;STGM=0;STG=null}cxHide();document.body.classList.remove('m');$('#menu').classList.remove('on');scr('none');
  init();const units=[c.me,...c.ens];F.forEach((f,i)=>{const u=units[i],U=u.U;f.d=cxDef(u,i);f.cxu=u;f.r=26;f.sp=212;f.hp=100;f.show=100;f.cds=f.d.sk.map(s=>s.ult?rnd(9,12):rnd(1,2.5));
    f.ug=Math.min(100,50*((u.sl[u.kit.findIndex(k=>k.s.ult)]||{}).ultst||0));f.cxSh=0;f.cxLT=0;f.cxLast=-1;f.cxStT=0;f.cxChT=0;
    if(c.evs.includes('giant'))f.r*=1.35;if(c.evs.includes('tiny')){f.r*=.72;f.sp*=1.15}if(c.evs.includes('ult'))f.ug=100});
  c.t=0;c.heat=1;c.evT=0;c.handled=0;CXQ.length=0;buildHUD();try{if(typeof sndPri=='function')sndPri(units.flatMap(u=>u.kit.map(k=>DEF[k.o].k)))}catch(e){}}
function cxAfter(won){const c=CX;c.res.push(won);if(c.r>=5){cxEnd();return}const opts=cxRoll(c.me,c.r);c.aug=opts;c.arr=1;cxAug()}
function cxDots(){const c=CX;return'<div class="cxdots">'+[0,1,2,3,4].map(i=>`<span class="${i<c.res.length?(c.res[i]?'w':'l'):i==c.res.length?'n':''}">${i<c.res.length?(c.res[i]?'승':'패'):i+1}</span>`).join('')+'</div>'}
function cxKitHtml(u){return'<div class="cxkit">'+u.kit.map((k,i)=>{const L=u.sl[i]||{},lv=cxLv(u,i),tags=Object.keys(L).map(q=>CXA.find(a=>a.k==q).n+(L[q]>1?'×'+L[q]:'')).join(' · ');return`<em style="--uc:${DEF[k.o].col}">${k.s.ult?'ULT':'S'+(i+1)} ${k.s.n} <b class="cxlv">Lv.${lv}</b>${tags?' <small>'+tags+'</small>':''}</em>`}).join('')+'</div>'}
function cxAug(){const c=CX,u=c.me,el=cxEl(),won=c.res[c.res.length-1],nx=CXEV[c.plan[c.r]];
  el.innerHTML=`<div class="chb cxb"><div class="cht cxt">* ROUND ${c.r} ${won?'승리!':'패배…'}</div>${cxDots()}<div class="chs">다음 라운드 · <b style="color:#ff6af0">시스템 오류 : ${nx.n}</b> · ${nx.d}</div>
    <div class="chq">* 강화할 스킬 증강을 하나 골라라.</div><div class="chc">${c.aug.map((o,i)=>{const a=o.a,T=CXT[a.t],tg=o.slot!=null?u.kit[o.slot]:null;return`<button class="cu cxa t-${a.t}" data-i="${i}" style="--uc:${T.c}"><i>${T.n}</i><canvas width="96" height="96"></canvas><b>${a.n}</b><small>${tg?'<span class="cxtg">['+tg.s.n+'] Lv.'+cxLv(u,o.slot)+' → '+(cxLv(u,o.slot)+1)+'</span><br>':''}${a.d}</small></button>`}).join('')}</div>
    <div class="chrrw"><button class="btn" id="cxar" ${c.arr<=0?'disabled':''}>다시 뽑기 ${c.arr}/1</button></div><div class="chq">* 지금 내 봇</div>${cxKitHtml(u)}</div>`;
  el.querySelectorAll('.cxa').forEach(b=>{const o=c.aug[+b.dataset.i];chalIcon(b.querySelector('canvas'),o.a.ic,CXT[o.a.t].c);b.addEventListener('click',()=>{SFX('click');b.classList.add('pick');try{SFXa(o.a.t=='p'?'ch_leg':o.a.t=='g'?'ch_epic':'ch_flip')}catch(e){}cxApply(u,o);setTimeout(()=>{c.r++;cxRound()},380)})});
  $('#cxar').addEventListener('click',()=>{if(c.arr<=0)return;c.arr--;SFX('click');c.aug=cxRoll(u,c.r);cxAug()});
  if(c.aug.some(o=>o.a.t=='p'))try{SFXa('ch_pre')}catch(e){}void el.offsetWidth;el.classList.add('on')}
function cxEnd(){const c=CX,w=c.res.filter(Boolean).length,G=['F','C','B','A','S','S+'][w],best=c.best,nr=w>best;try{if(nr)localStorage.setItem('jsbb3_cx',w)}catch(e){}const el=cxEl();
  el.innerHTML=`<div class="chb end cxb"><div class="cht cxt">* SYSTEM SHUTDOWN</div><div class="cxg g${w}">${G}</div><div class="chs">${w} / 5 라운드 승리 · ${nr?'<span class="nr">NEW RECORD!</span>':'최고 기록 '+best+'승'}</div>${cxDots()}<div class="chq">* 최종 봇</div>${cxKitHtml(c.me)}
    <div class="btns"><button class="btn" id="cxm">MENU</button><button class="btn pri" id="cxa2">다시 부팅</button></div></div>`;
  $('#cxm').addEventListener('click',()=>{SFX('click');cxHide();goHome()});$('#cxa2').addEventListener('click',()=>{SFX('click');cxStart()});try{SFXa(w>=4?'ch_myth':w>=2?'ch_epic':'au_down')}catch(e){}void el.offsetWidth;el.classList.add('on')}
function cxOff(){if(CX&&CX.sel0){SEL=CX.sel0.slice();MODE=CX.mode0||2}if(SEL.length<3)SEL=[...SEL,0,1,2].slice(0,3);CX=null;CXQ.length=0}
const _goHomeCX=goHome;goHome=function(){cxOff();return _goHomeCX.apply(this,arguments)};
const _initMenuCX=initMenu;initMenu=function(){cxOff();return _initMenuCX.apply(this,arguments)};
// ---------- 전투 중 ----------
function cxNear(f,R){return F.filter(e=>e!=f&&!e.dead&&!e.hid).sort((a,b)=>dist(f,a)-dist(f,b)).filter(e=>dist(f,e)<R)[0]}
const _hurtCX=hurt;hurt=function(t,n,o){if(!CX||!CX.on||!F||!(n>0)||phase!='play'||!t||!t.cxu)return _hurtCX.apply(this,arguments);const a=[...arguments];let m=CXHP[CX.r-1]*(CX.heat||1),L=null;
  if(o!=t){if(t.cxSh>0){t.cxSh--;ft(t.x,t.y-t.r-30,'방화벽!','#9fd8ff',16);ring(t.x,t.y,t.r,t.r+40,'#9fd8ff',4,.35);return}
    if(o&&o.cxu&&o.cxLT>0&&o.cxLast>=0){L=o.cxu.sl[o.cxLast]||{};const ul=o.cxu.kit[o.cxLast]&&o.cxu.kit[o.cxLast].s.ult;m*=1+.3*(L.dmg||0);if(L.over)m*=1.5;if(ul&&L.udbl)m*=1.6;if(L.crit&&Math.random()<.25*L.crit){m*=2;if(!SKIP)ft(t.x,t.y-t.r-42,'치명적 오류!','#ffc23a',16)}}}
  a[1]=Math.round(n*m*10)/10;
  const hp0=t.hp,r=_hurtCX.apply(this,a),dealt=Math.max(0,hp0-t.hp);
  if(o&&o.cxu&&o!=t&&!o.dead&&dealt>0){if(CX.evs.includes('vamp'))o.hp=Math.min(100,o.hp+dealt*.2);
    if(L){if(L.leech)o.hp=Math.min(100,o.hp+dealt*.3*L.leech);if(L.stun&&!t.dead&&!(t.cxStT>0)){t.cxStT=2;t.stn=Math.max(t.stn||0,.5);t.cast=null;if(!SKIP)ft(t.x,t.y-t.r-30,'정지!','#9fd8ff',15)}
      if(L.chain&&!CXNO&&!t.dead&&!(o.cxChT>0)){o.cxChT=.6;CXNO=1;FX.push({k:'stzap',x:t.x,y:t.y,l:.35,m:.35});hurt(t,3,o,t.x,t.y,0,0);CXNO=0}}}
  return r};
const _updCX=update;update=function(dt){_updCX(dt);
  if(CXQ.length){for(let i=CXQ.length-1;i>=0;i--){const q=CXQ[i];q.t-=dt;if(q.t<=0){CXQ.splice(i,1);if(phase=='play')try{q.fn()}catch(e){}}}}
  if(!CX||!CX.on||!F)return;
  if(phase=='end'&&shown&&!CX.handled){CX.handled=1;$('#msg').className='';cxAfter(!!(win&&win.i==0&&!F[0].dead));return}
  if(phase!='play')return;CX.t+=dt;const h0=CX.heat;CX.heat=CX.t>18?1+(CX.t-18)*.12:1;if(h0<=1&&CX.heat>1&&!SKIP){SFXa('ult');shake=Math.max(shake,8)}
  F.forEach(f=>{if(f.dead||!f.cxu)return;const u=f.cxu;if(f.cxLT>0)f.cxLT-=dt;if(f.cxStT>0)f.cxStT-=dt;if(f.cxChT>0)f.cxChT-=dt;
    if(CX.evs.includes('cd'))f.cds=f.cds.map(v=>v-dt);
    if((u.sl[u.kit.findIndex(k=>k.s.ult)]||{}).ultg)f.ug=Math.min(100,(f.ug||0)+dt*2.2)});
  if(CX.evs.includes('bomb')){CX.evT+=dt;if(CX.evT>=1.3){CX.evT=0;const al=F.filter(f=>!f.dead&&!f.hid),tg=al[Math.floor(Math.random()*al.length)];if(tg)FX.push({k:'stbomb',x:clamp(tg.x+rnd(-80,80),40,A-40),y:clamp(tg.y+rnd(-80,80),40,A-40),l:.9,m:.9,o:ENV})}}
  if(CX.evs.includes('tele')){CX.tp=(CX.tp||0)+dt;if(CX.tp>=4){CX.tp=0;const al=F.filter(f=>!f.dead&&!f.hid);if(al.length>=2){const a2=al[0],b2=al[1+Math.floor(Math.random()*(al.length-1))];[a2,b2].forEach(f=>FX.push({k:'ghost',x:f.x,y:f.y,r:f.r,c:f.d.col,l:.45,m:.45}));const x=a2.x,y=a2.y;a2.x=b2.x;a2.y=b2.y;b2.x=x;b2.y=y;SFXa('kr_swap');ring(a2.x,a2.y,a2.r,a2.r+60,'#ff6af0',5,.4);ring(b2.x,b2.y,b2.r,b2.r+60,'#ff6af0',5,.4)}}}};
// 라운드 표시 · 과열 · 아이콘
const _floorCX=floorFX;floorFX=function(){_floorCX.apply(this,arguments);if(!CX||!CX.on||!F)return;
  if(phase=='cd'){const E=CXEV[CX.ev];g.save();g.globalAlpha=Math.min(1,(4.4-tm)/.4);g.textAlign='center';g.lineJoin='round';g.font='900 34px '+UTF;g.lineWidth=8;g.strokeStyle='#000';const t=(CX.r==5?'FINAL ':'')+'ROUND '+CX.r+' / 5';g.strokeText(t,A/2,92);g.fillStyle=CX.r==5?'#ff6af0':'#3ff0ff';g.fillText(t,A/2,92);
    g.font='700 16px '+UTF;g.lineWidth=5;g.strokeText('* 시스템 오류 : '+E.n,A/2,122);g.fillStyle='#ffffff';g.fillText('* 시스템 오류 : '+E.n,A/2,122);g.restore()}
  if(phase=='play'&&CX.heat>1){const k=Math.min(1,(CX.heat-1)/1.2),pu=.5+.5*Math.sin(clock*8);g.save();g.strokeStyle='rgba(255,40,60,'+(.25+.45*k*pu)+')';g.lineWidth=10+14*k;g.strokeRect(0,0,A,A);g.font='900 15px '+UTF;g.textAlign='center';g.fillStyle='rgba(255,90,100,'+(.6+.4*pu)+')';g.fillText('⚠ 시스템 과열 · 받는 피해 ×'+(CX.heat).toFixed(1),A/2,A-14);g.restore()}};
const _lowCX=lowHP;lowHP=function(f){_lowCX(f);if(!f.cxu||f.dead||f.hid)return;if(f.cxSh>0){for(let i=0;i<f.cxSh;i++){const a=clock*2+i*Math.PI;g.save();g.translate(f.x+Math.cos(a)*(f.r+12),f.y+Math.sin(a)*(f.r+12));g.globalCompositeOperation='lighter';glow('#9fd8ff',0,0,9,.8);g.restore()}}
  // 내 캐릭터 표시 : 흰 점선 고리 + 머리 위 "▼ 나"
  if(f.cxu.me&&phase!='end'){const bob=Math.sin(clock*5)*3,y=f.y-f.r-26+bob;g.save();g.translate(f.x,f.y);g.rotate(clock*1.6);g.strokeStyle='rgba(255,255,255,.85)';g.lineWidth=2.2;g.setLineDash([7,6]);g.beginPath();g.arc(0,0,f.r+8,0,TAU);g.stroke();g.setLineDash([]);g.restore();
    g.save();g.translate(f.x,y);g.fillStyle='#ffffff';g.strokeStyle='#000';g.lineWidth=3;g.beginPath();g.moveTo(-7,-4);g.lineTo(7,-4);g.lineTo(0,5);g.closePath();g.stroke();g.fill();
    g.font='900 15px '+UTF;g.textAlign='center';g.lineJoin='round';g.lineWidth=5;g.strokeText('나',0,-10);g.fillStyle='#3ff0ff';g.fillText('나',0,-10);g.restore()}};
EMB.cxbot=(f,D)=>{g.rotate(-f.rot);const jt=Math.random()<.08?rnd(-3,3):0,q=()=>{g.beginPath();g.moveTo(-8,-8);g.quadraticCurveTo(-8,-17,0,-17);g.quadraticCurveTo(9,-17,9,-9);g.quadraticCurveTo(9,-3,2,0);g.lineTo(1,5);g.moveTo(1,11);g.lineTo(1,12)};
  g.save();g.translate(-1.8+jt,0);neon({col:'#ff2a6a',hi:'#ff9ab8'},1.3,q);g.restore();g.save();g.translate(1.8-jt,0);neon({col:'#2af0ff',hi:'#b8faff'},1.3,q);g.restore();neon(D,1.8,q);
  neon({col:D.col,hi:D.hi},1,()=>{g.beginPath();g.moveTo(-19,-4);g.lineTo(-13,-4);g.lineTo(-13,6);g.moveTo(19,4);g.lineTo(13,4);g.lineTo(13,-6);g.moveTo(-6,18);g.lineTo(6,18)});g.save();g.globalCompositeOperation='lighter';glow(D.col,0,0,16,.25);g.restore()};
;
