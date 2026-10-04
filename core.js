// ======================================================================
// core.js : 게임 엔진 · 화면 · 기본 캐릭터 7명 (김민채 · 공병은 · 박지성 · 김티비 · 김가은 · 흉악범 · 김건우) + 각성 · 곤지암병은 · 해버지
// 안에 들어있는 순서 : core1 → core2 → core3
// (순서가 중요해서 위에서부터 차례로 실행됨 · 섹션 위치를 바꾸지 말 것)
// ======================================================================



// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ▶ 섹션 : core1
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
let AC=null,MG=null,NB=null,MUTE=0,SERR='';const SL={};
const SND=['gun','throw','arrow','skillshot','knife','slash','swing','floor1','floor2','floor3','floor4','floor5','floor6','floor7','tstop','hit','tick','heavy','cast','ult','cd','go','vs','ko','slam','gulp','chew','spit','beam','rush','click','h_wheel','h_curse','h_burst','h_ult','h_flicker','h_glass','kick','juggle','tackle','whistle','goal','champ'],BUF={};let BGM=null,BGMn='';
const AUD={};let BGMA=null,AERR=0;
// 볼륨 설정 (설정 화면에서 조절, 폰에 저장)
const DV={bgm_menu:.35,bgm_battle:.12,bgm_tour:.12,bgm_final:.18};
let VOL={m:1,b:1,s:1,p:{}},PREVB=0;try{const v=JSON.parse(localStorage.getItem('jsbb3_vol'));if(v&&v.p)VOL=v}catch(e){}
const isB=n=>n.indexOf('bgm_')==0;
const pv=n=>VOL.p[n]!=null?VOL.p[n]:(DV[n]!=null?DV[n]:.85);
const vol=n=>Math.max(0,Math.min(1,pv(n)*(isB(n)?VOL.b:VOL.s)*VOL.m));
function saveVol(){try{localStorage.setItem('jsbb3_vol',JSON.stringify(VOL))}catch(e){}if(BGMA&&BGMn)BGMA.volume=vol(BGMn)}
// 제미나이 방식 그대로: new Audio('sounds/이름.mp3') 묶음을 만들어두고 play()
class SoundPool{constructor(src,size){this.pool=Array.from({length:size},()=>{const a=new Audio(src);a.preload='auto';a.addEventListener('canplaythrough',()=>{a.ok=1},{once:true});a.addEventListener('error',()=>{if(!a.bad){a.bad=1;AERR++;SERR=src.replace('sounds/','')+' 못 읽음'}},{once:true});return a});this.i=0}play(v){const s=this.pool[this.i];s.volume=v;try{s.currentTime=0}catch(e){}const pr=s.play();if(pr&&pr.catch)pr.catch(()=>{});this.i=(this.i+1)%this.pool.length}get ok(){return this.pool.some(a=>a.ok)}}
const hasS=n=>!!(BUF[n]||AUD[n]);
let LSD=0,UNL=0;function loadSnd(){if(LSD)return;LSD=1;SND.forEach(n=>{AUD[n]=new SoundPool('sounds/'+n+'.mp3',n=='hit'||n=='tick'||n=='gun'||n.startsWith('floor')?5:3)});['bgm_menu','bgm_battle','bgm_tour','bgm_final'].forEach(n=>{const a=new Audio('sounds/'+n+'.mp3');a.loop=true;a.preload='auto';a.addEventListener('canplaythrough',()=>{a.ok=1},{once:true});a.addEventListener('error',()=>{AERR++;SERR=n+'.mp3 못 읽음'},{once:true});AUD[n]=a})}
function playBuf(n){const so=AC.createBufferSource(),gn=AC.createGain();so.buffer=BUF[n];so.playbackRate.value=n=='click'||n=='cd'?1:rnd(.94,1.06);gn.gain.value=1;so.connect(gn).connect(MG);so.start()}
function stopBGM(){if(BGM){try{BGM.stop()}catch(e){}BGM=null}if(BGMA){try{BGMA.pause()}catch(e){}BGMA=null}}
function playBGM(n,force){if(!UNL)return;if(!n){BGMn='';stopBGM();return}if(BGMn==n&&!force&&(BGM||BGMA))return;BGMn=n;stopBGM();if(MUTE)return;let aa=AUD[n]||(n!='bgm_menu'?AUD.bgm_battle:null);if(aa){BGMA=aa;try{aa.loop=true;aa.volume=vol(n);try{aa.currentTime=0}catch(e){}const pr=aa.play();if(pr&&pr.catch)pr.catch(()=>{})}catch(e){}return}const bb=BUF[n]||(n!='bgm_menu'?BUF.bgm_battle:null);if(bb&&AC){const so=AC.createBufferSource(),gn=AC.createGain();so.buffer=bb;so.loop=true;gn.gain.value=.35;so.connect(gn).connect(MG);so.start();BGM=so}}
function audioOn(){UNL=1;loadSnd();try{if(!AC){const C=window.AudioContext||window.webkitAudioContext;if(C){AC=new C();MG=AC.createGain();MG.gain.value=.7;MG.connect(AC.destination)}}if(AC&&AC.state!='running')AC.resume()}catch(e){}if(!BGMA&&!BGM&&BGMn)playBGM(BGMn,1)}
function SFX(n){
  if(MUTE||SKIP||!UNL)return;const tn=performance.now()/1000;if(SL[n]&&tn-SL[n]<.045)return;SL[n]=tn;const t0=AC?AC.currentTime:0;
  if(AUD[n]){try{AUD[n].play(vol(n))}catch(e){}return}
  if(BUF[n]){try{playBuf(n)}catch(e){}return}
  if(!AC)return;
  try{
    const tone=(type,f0,f1,d,v,dl)=>{const o=AC.createOscillator(),gn=AC.createGain(),st=t0+(dl||0);o.type=type;o.frequency.setValueAtTime(f0,st);o.frequency.exponentialRampToValueAtTime(Math.max(20,f1),st+d);gn.gain.setValueAtTime(v,st);gn.gain.exponentialRampToValueAtTime(.001,st+d);o.connect(gn).connect(MG);o.start(st);o.stop(st+d+.02)};
    const noise=(d,v,ft,fq,dl)=>{if(!NB){NB=AC.createBuffer(1,AC.sampleRate,AC.sampleRate);const c=NB.getChannelData(0);for(let i=0;i<c.length;i++)c[i]=Math.random()*2-1}const so=AC.createBufferSource(),fl=AC.createBiquadFilter(),gn=AC.createGain(),st=t0+(dl||0);so.buffer=NB;fl.type=ft;fl.frequency.value=fq;gn.gain.setValueAtTime(v,st);gn.gain.exponentialRampToValueAtTime(.001,st+d);so.connect(fl).connect(gn).connect(MG);so.start(st);so.stop(st+d+.02)};
    switch(n){
      case'hit':noise(.09,.35,'bandpass',1800);tone('square',260,90,.09,.12);break;
      case'tick':noise(.04,.12,'highpass',3000);break;
      case'heavy':noise(.3,.55,'lowpass',900);tone('sine',140,40,.32,.5);break;
      case'cast':tone('sine',420,980,.16,.12);break;
      case'ult':tone('sawtooth',90,420,1.3,.1);tone('sine',180,840,1.3,.12);noise(1.2,.12,'bandpass',1200);break;
      case'shoot':tone('triangle',900,320,.12,.1);break;
      case'cd':tone('sine',880,880,.14,.22);tone('sine',1760,1760,.08,.06);break;
      case'go':tone('square',523,1046,.4,.12);tone('sine',262,523,.4,.2);noise(.3,.2,'highpass',2000);break;
      case'vs':noise(.4,.4,'lowpass',600);tone('sine',90,40,.5,.5);break;
      case'ko':noise(.8,.5,'lowpass',700);tone('sine',220,30,1,.5);break;
      case'slam':noise(.45,.7,'lowpass',500);tone('sine',110,28,.55,.7);break;
      case'gulp':tone('sine',380,70,.4,.4);noise(.2,.2,'lowpass',500,.05);break;
      case'chew':noise(.07,.25,'lowpass',700);tone('square',120,80,.06,.08);break;
      case'spit':tone('triangle',220,900,.18,.25);break;
      case'gun':noise(.08,.5,'highpass',1200);tone('square',180,60,.08,.15);break;
      case'throw':noise(.18,.25,'bandpass',900);break;
      case'arrow':tone('triangle',700,300,.15,.15);noise(.12,.15,'highpass',3000);break;
      case'skillshot':tone('sawtooth',300,1200,.18,.1);noise(.15,.15,'bandpass',2000);break;
      case'knife':tone('sine',3200,2800,.25,.08);noise(.05,.15,'highpass',5000);break;
      case'slash':noise(.2,.35,'bandpass',2500);tone('sine',900,200,.18,.1);break;
      case'swing':noise(.3,.35,'bandpass',500);break;
      case'tstop':tone('sine',1400,90,1.1,.28);tone('sawtooth',70,28,1.5,.22);noise(1.1,.3,'lowpass',380);tone('sine',2600,2600,1.2,.07,.25);tone('triangle',1300,1300,1.2,.05,.25);break;
      case'beam':tone('sawtooth',220,110,.5,.12);noise(.5,.25,'highpass',1500);break;
      case'rush':noise(.05,.18,'bandpass',900);break;
      case'click':tone('sine',700,900,.06,.12);break;
    }
  }catch(e){}
}
let $=s=>document.querySelector(s),cv=$('#c'),g=cv.getContext('2d'),A=600,TAU=Math.PI*2;
const rnd=(a,b)=>a+Math.random()*(b-a),dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y),ang=(a,b)=>Math.atan2(b.y-a.y,b.x-a.x);
let CIN=null,SLOW=0,zk=0,zx=300,zy=300,TSTOP=null,ACT=0;
const FD="'Russo One','Black Han Sans','Noto Sans KR',sans-serif",FB="'Noto Sans KR',sans-serif";let LDT=.016,MP=[];
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),back=x=>{const c=1.7;return 1+(c+1)*Math.pow(x-1,3)+c*Math.pow(x-1,2)};
let W,H,S,ox,oy,k,dpr=1,last=0,clock=0;
let DEMO=null,DI=0,PAUSE=0,SKIP=0,SEL=[0,1,2],MODE=2,KO=null,MENU_T=0,TSIZE=8,TSEL=[],TOUR=null,TOURM=null,TM0=4.4,MAD=null,CF=[],cdN=0,vsd=0,AM=[],CH=[];
let F,B,Pt,T,FX,HZ,cine,bn,phase,tm,fight,shake,hs,ts,lock,win,endT,shown,cz,cfx,cfy;

function rs(){
  dpr=Math.min(devicePixelRatio||1,2.5);W=innerWidth;H=innerHeight;
  cv.width=W*dpr;cv.height=H*dpr;
  const hud=$('#hud'),mw=Math.min(W-20,900);
  hud.style.cssText='left:'+((W-mw)/2)+'px;width:'+mw+'px;top:10px';
  const hh=(hud.offsetHeight||84)+12;
  S=Math.max(200,Math.min(W-24,H-hh-24,1100));ox=(W-S)/2;
  const top=Math.max(10,(H-S-hh)/2);oy=top+hh;
  hud.style.cssText='left:'+((W-mw)/2)+'px;width:'+mw+'px;top:'+top+'px';
  k=S/A;
}
addEventListener('resize',rs);rs();

const ALT=(d,n)=>Object.assign({},d,n>1?d.alt2:d.alt,{name:d.name+' '+(n+1)+'P'});
function pickD(i){const n=SEL.slice(0,i).filter(x=>x==SEL[i]).length,d=DEF[SEL[i]];return n?ALT(d,n):d}
function tgt(f){let b=null,bd=1e9;for(const x of F){if(x==f||x.dead)continue;const d=dist(f,x)+(x.hid?600:0);if(d<bd){bd=d;b=x}}return b}
const DEF=[
{name:'김민채',gl:'채',k:'heavy',heavy:1,r:36,sp:160,col:'#ff6fa8',hi:'#ffd6e7',dk:'#5a1238',alt:{col:'#b05cff',hi:'#ecd4ff',dk:'#3a1460'},alt2:{col:'#ff9a3c',hi:'#ffe2c2',dk:'#5a2a08'},sk:[
  {n:'지진 쿵',w:.8,cd:8,tel:'ring',c:(o,t)=>dist(o,t)<250&&!t.hid,f:(o,t)=>{HZ.push({k:'quake',x:o.x,y:o.y,t:0,o,hit:0});o.sq=1;o.sa=Math.PI/2;shake=Math.max(shake,12);hs=.06;SFX('slam');FX.push({k:'crack',x:o.x,y:o.y,r:70,l:3,m:3});for(let i=0;i<12;i++)rockP(o.x,o.y,rnd(0,TAU),rnd(60,170));for(let i=0;i<8;i++)dustP(o.x,o.y,rnd(60,120))}},
  {n:'170kg 바디프레스',w:.8,cd:11,tel:'land',c:(o,t)=>dist(o,t)<380&&!t.hid,f:(o,t)=>{const r=o.r;o.jump={t:0,dur:.75,sx:o.x,sy:o.y,tx:clamp(t.x+t.dx*t.sp*.75,r,A-r),ty:clamp(t.y+t.dy*t.sp*.75,r,A-r)}}},
  {n:'한입에 꿀꺽',w:1.8,ult:1,c:(o,t)=>dist(o,t)<360&&!t.hid,f:(o,t)=>{t.jump=null;t.rush=0;t.cast=null;o.gulp={t:0,st:0,tg:t,x0:t.x,y0:t.y,n:0,c:0}}}]},
{name:'공병은',gl:'병',k:'gold',r:26,sp:215,col:'#3b74ff',hi:'#ffe08a',dk:'#0d1b4d',alt:{col:'#ff7a1a',hi:'#fff0b0',dk:'#4d1f05'},alt2:{col:'#2fd6a8',hi:'#d2fff1',dk:'#063d30'},sk:[
  {n:'Q 스킬샷',w:.8,cd:5,ind:1,f:(o,t)=>{const d=dist(o,t)/650;shoot(o,Math.atan2(t.y+t.dy*t.sp*d-o.y,t.x+t.dx*t.sp*d-o.x),650,12,'shot',0,9)}},
  {n:'스탠드 러시',w:.7,cd:11,aim:1,c:(o,t)=>dist(o,t)<330&&!t.hid,f:(o,t)=>{o.rush=1.1;o.rt=0;o.gg=0;o.ft2=0}},
  {n:'7단 콤보',w:1.8,ult:1,f:(o,t)=>{HZ.push({k:'floor',o,t:0,dur:4.05,nb:.45,dir:rnd(0,TAU),beats:0,fl:0})}}]},
{name:'박지성',gl:'지',k:'time',r:26,sp:205,col:'#ffc61a',hi:'#fff4b8',dk:'#4a3200',alt:{col:'#36d1a0',hi:'#d4fff0',dk:'#0b3d2e'},alt2:{col:'#ff5a5a',hi:'#ffd5d5',dk:'#4a0d0d'},sk:[
  {n:'킬브릭',w:.7,cd:8,c:(o,t)=>!t.hid,f:(o,t)=>{const px=clamp(t.x+t.dx*t.sp*.7,0,A-1),py=clamp(t.y+t.dy*t.sp*.7,0,A-1),gx=Math.floor(px/60),gy=Math.floor(py/60),cl=[],ty=Math.floor(rnd(0,3));if(ty==0){for(let d=-2;d<=2;d++){cl.push([gx+d,gy]);if(d)cl.push([gx,gy+d])}}else if(ty==1){for(let x=0;x<10;x++)if(x!=Math.floor(rnd(0,10)))cl.push([x,gy])}else{for(let y=0;y<10;y++)if(y!=Math.floor(rnd(0,10)))cl.push([gx,y])}HZ.push({k:'kb',o,t:0,tel:.8,act:.9,hs:[],cells:cl.filter(([x,y])=>x>=0&&x<10&&y>=0&&y<10).map(([x,y])=>[x*60,y*60])});SFX('click')}},
  {n:'해골 블래스터',w:.7,cd:10,c:(o,t)=>!t.hid,f:(o,t)=>{for(let i=0;i<2;i++){const ch=.6+i*.25,px=t.x+t.dx*t.sp*ch,py=t.y+t.dy*t.sp*ch,a=rnd(0,TAU),x=clamp(px+Math.cos(a)*190,30,A-30),y=clamp(py+Math.sin(a)*190,30,A-30);HZ.push({k:'blaster',o,t:0,ch,x,y,a0:Math.atan2(py-y,px-x),fired:0,hit:0})}}},
  {n:'시간 정지',w:1.8,ult:1,f:(o,t)=>{TSTOP={o,t:0,dur:2.6,kn:[],tp:0};o.gcd=3.6;FX.push({k:'tss',x:o.x,y:o.y,l:.8,m:.8});SFX('tstop')}}]},
{name:'김티비',gl:'티',k:'gun',r:26,sp:210,col:'#ff4d6d',hi:'#ffd0d8',dk:'#4a0a16',alt:{col:'#22e5d6',hi:'#d2fffb',dk:'#06403c'},alt2:{col:'#c8ccd8',hi:'#ffffff',dk:'#2a2d36'},sk:[
  {n:'풀오토 사격',w:.6,cd:6,aim:1,c:(o,t)=>dist(o,t)<420&&!t.hid,f:(o,t)=>{o.auto=1.4;o.at=0}},
  {n:'채팅 도배',w:.7,cd:9,c:(o,t)=>!t.hid,f:(o,t)=>{const dx=t.x-o.x,dy=t.y-o.y,ax=Math.abs(dx)>Math.abs(dy)?1:0,sg=(ax?dx:dy)>0?1:-1;HZ.push({k:'wall',o,t:0,ax,sg,x0:sg>0?-40:A+40,pos:sg>0?-40:A+40,hs:[]});SFX('cast')}},
  {n:'풀 버스트',w:1.8,ult:1,f:(o,t)=>{F.filter(x=>x!=o&&!x.dead).forEach(e=>HZ.push({k:'lock',o,e,t:0,ch:1.1,fired:0}))}}]},
{name:'김가은',gl:'가',k:'ink',r:26,sp:205,col:'#7bdc3c',hi:'#eaffd6',dk:'#1d3b0a',alt:{col:'#ff9f1c',hi:'#ffe9c7',dk:'#4a2a00'},alt2:{col:'#a78bfa',hi:'#efe9ff',dk:'#2a1a5a'},sk:[
  {n:'직업 스킬',w:.7,cd:6,c:(o,t)=>!t.hid,f:(o,t)=>JOB(o,t)},
  {n:'잉크 드로잉',w:.7,cd:9,c:(o,t)=>!t.hid,f:(o,t)=>{const px=t.x+t.dx*t.sp*.6,py=t.y+t.dy*t.sp*.6,a=Math.atan2(py-o.y,px-o.x),L=Math.hypot(px-o.x,py-o.y)+170,sd=rnd(-1,1)*60,P0=[o.x+Math.cos(a)*30,o.y+Math.sin(a)*30],P2=[o.x+Math.cos(a)*L,o.y+Math.sin(a)*L],P1=[(P0[0]+P2[0])/2-Math.sin(a)*sd,(P0[1]+P2[1])/2+Math.cos(a)*sd],pts=[];for(let i=0;i<=24;i++){const u=i/24,v=1-u;pts.push([clamp(v*v*P0[0]+2*v*u*P1[0]+u*u*P2[0],5,A-5),clamp(v*v*P0[1]+2*v*u*P1[1]+u*u*P2[1],5,A-5)])}HZ.push({k:'ink',o,t:0,pts,hs:[]});SFX('cast')}},
  {n:'웹툰 컷',w:1.8,ult:1,f:(o,t)=>{HZ.push({k:'toon',o,t:0,step:0})}}]},
{name:'흉악범',gl:'범',k:'rose',r:25,sp:225,col:'#e0245e',hi:'#ffd3e0',dk:'#3d0718',alt:{col:'#d4af37',hi:'#fff3c4',dk:'#3a2a05'},alt2:{col:'#7c5cff',hi:'#e6e0ff',dk:'#1e1250'},sk:[
  {n:'트릭 카드',w:.6,cd:6.5,aim:1,c:(o,t)=>!t.hid,f:(o,t)=>{const a=ang(o,t);for(let i=-2;i<=2;i++)B.push({x:o.x,y:o.y,vx:Math.cos(a+i*.32)*560,vy:Math.sin(a+i*.32)*560,a:a+i*.32,o,dmg:5,k:'card',slow:0,r:15,age:0,D:o.d,boom:1,hs:[]});SFX('throw')}},
  {n:'사라지는 마술',w:.5,cd:9,c:(o,t)=>!t.hid&&!t.jump&&dist(o,t)<420,f:(o,t)=>{HZ.push({k:'decoy',o,x:t.x,y:t.y,tg:t,t:0,dur:.9,boom:0});FX.push({k:'ghost',x:o.x,y:o.y,r:o.r,c:o.d.col,l:.5,m:.5});for(let i=0;i<14;i++){const b=rnd(0,TAU);petalP(o.x,o.y,Math.cos(b)*130,Math.sin(b)*130)}const a=Math.atan2(t.dy,t.dx);o.x=clamp(t.x-Math.cos(a)*(t.r+o.r+6),o.r,A-o.r);o.y=clamp(t.y-Math.sin(a)*(t.r+o.r+6),o.r,A-o.r);for(let i=0;i<14;i++){const b=rnd(0,TAU);petalP(o.x,o.y,Math.cos(b)*130,Math.sin(b)*130)}FX.push({k:'slash',x:t.x,y:t.y,a:a+Math.PI/2,c:o.d.col,l:.35,m:.35});hurt(t,6,o,t.x,t.y,0,1);ft(t.x,t.y-t.r-40,'뒤를 조심해','#ff5c8a',22);SFX('slash')}},
  {n:'매드무비',w:1.8,ult:1,f:(o,t)=>{MAD={o,t:0,cuts:0,kf:[]};o.gcd=5;SFX('ult')}}]},
{name:'김건우',gl:'건',k:'monkey',r:23,sp:245,master:1,col:'#c07a32',hi:'#ffe7a3',dk:'#3d2108',alt:{col:'#2bb3a0',hi:'#d6fff8',dk:'#063a33'},alt2:{col:'#9aa3b5',hi:'#ffffff',dk:'#242832'},sk:[
  {n:'바나나 트랩',w:.6,cd:8,c:(o,t)=>!t.hid,f:(o,t)=>{for(let i=0;i<3;i++){const dl=.5+i*.35;HZ.push({k:'nana',o,t:0,x0:o.x,y0:o.y,x:clamp(t.x+t.dx*t.sp*dl+rnd(-30,30),20,A-20),y:clamp(t.y+t.dy*t.sp*dl+rnd(-30,30),20,A-20),fl:.35+i*.06,life:6})}SFX('throw')}},
  {n:'연막 원탭',w:.6,cd:10,c:(o,t)=>!t.hid&&dist(o,t)<460,f:(o,t)=>{HZ.push({k:'smoke',o,t:0,x:clamp(t.x,40,A-40),y:clamp(t.y,40,A-40),r:85,dur:3,shot:0})}},
  {n:'몽키 레이드',w:1.8,ult:1,f:(o,t)=>{const EN=F.filter(x=>x!=o&&!x.dead);for(let i=0;i<7;i++){const e=EN[i%EN.length],a=rnd(0,TAU);HZ.push({k:'ape',o,e,t:-i*.2,sx:clamp(e.x+Math.cos(a)*420,-40,A+40),sy:clamp(e.y+Math.sin(a)*420,-40,A+40),dur:.55,hit:0})}}}]},
{name:'김민채 • 각성',gl:'채',k:'magma',heavy:2,vof:0,r:40,sp:130,col:'#ff5a1f',hi:'#ffd27a',dk:'#2a0d05',alt:{col:'#ff2e63',hi:'#ffc2d1',dk:'#2a0510'},alt2:{col:'#7a5cff',hi:'#d9d0ff',dk:'#150a33'},sk:[
  {n:'용암 분출',w:.8,cd:9,tel:'line',c:(o,t)=>!t.hid,f:(o,t)=>{const a=Math.atan2(t.y+t.dy*t.sp*.6-o.y,t.x+t.dx*t.sp*.6-o.x),sp=[];for(let i=0;i<4;i++){const d=o.r+60+i*85;sp.push({x:clamp(o.x+Math.cos(a)*d,30,A-30),y:clamp(o.y+Math.sin(a)*d,30,A-30),dl:.35+i*.18,done:0})}HZ.push({k:'gey',o,t:0,sp,hs:[]});SFX('cast')}},
  {n:'1700kg 운석 낙하',w:.6,cd:14,c:(o,t)=>!t.hid,f:(o,t)=>{o.lp={t:0,tg:t};FX.push({k:'pillar',x:o.x,y:o.y,c:o.d.col,l:.6,m:.6});SFX('slam');shake=Math.max(shake,8)}},
  {n:'지옥의 아가리',w:1.8,ult:1,f:(o,t)=>{F.filter(x=>x!=o&&!x.dead).forEach(e=>HZ.push({k:'maw',o,e,t:0,x:e.x,y:e.y,done:0}))}}]},
{name:'공병은 • 곤지암병은',gl:'곤',k:'horror',vof:1,r:26,sp:210,col:'#8fd6bd',hi:'#effff8',dk:'#06231a',alt:{col:'#d0283e',hi:'#ffd5db',dk:'#2b050b'},alt2:{col:'#9b7bff',hi:'#ece6ff',dk:'#170d3a'},sk:[
  {n:'빈 휠체어',w:.6,cd:6,c:(o,t)=>!t.hid,f:(o,t)=>hWheel(o,t)},
  {n:'저주 표식',w:.6,cd:10,c:(o,t)=>!t.hid&&!t.jump,f:(o,t)=>hCurse(o,t)},
  {n:'정전 병동',w:1.8,ult:1,f:(o,t)=>hWard(o,t)}]},
{name:'박지성 • 해버지',gl:'해',k:'soccer',vof:2,r:26,sp:215,col:'#e62635',hi:'#ffe4e6',dk:'#3d0509',alt:{col:'#2d6bff',hi:'#dbe6ff',dk:'#0a1a4a'},alt2:{col:'#1fbf6a',hi:'#d8ffe9',dk:'#06361d'},sk:[
  {n:'중거리 슛',w:.6,cd:5.5,aim:1,c:(o,t)=>!t.hid,f:(o,t)=>fKick(o,t)},
  {n:'산소탱크',w:.5,cd:9,c:(o,t)=>!t.hid&&dist(o,t)<480,f:(o,t)=>fTank(o,t)},
  {n:'해버지 슈퍼골',w:1.8,ult:1,f:(o,t)=>fGoal(o,t)}]}
];
function JOB(o,t){
  const J=['체어맨','메딕','아처','파이어맨'];let j=o.job%4;if(j==1&&o.hp>80)j=2;o.job=j+1;
  FX.push({k:'badge',x:o.x,y:o.y-o.r-46,txt:J[j],c:o.d.col,l:1.6,m:1.6});bn={txt:'직업 · '+J[j],d:o.d,side:o.i,t:0};
  if(j==0){const d=dist(o,t);if(d>110){const a=ang(o,t),L=Math.min(d-70,170);FX.push({k:'ghost',x:o.x,y:o.y,r:o.r,c:o.d.col,l:.4,m:.4});o.x=clamp(o.x+Math.cos(a)*L,o.r,A-o.r);o.y=clamp(o.y+Math.sin(a)*L,o.r,A-o.r)}o.swing={t:0,a:ang(o,t),hit:0};SFX('swing')}
  else if(j==1){const hv=Math.min(18,100-o.hp);o.hp+=hv;ft(o.x,o.y-o.r-10,'+'+Math.round(hv),'#7bff8a',26);ring(o.x,o.y,o.r,o.r+60,'#7bff8a',6,.5);for(let i=0;i<14;i++)Pt.push({x:o.x+rnd(-24,24),y:o.y+rnd(-10,20),vx:rnd(-20,20),vy:rnd(-110,-50),l:rnd(.6,1),m:1,sh:12,col:i%2?'#7bff8a':'#ffffff',r:rnd(4,7),fr:.5});SFX('spit')}
  else if(j==2){const a=ang(o,t);for(let i=-1;i<=1;i++)shoot(o,a+i*.12,650,7,'arrow',0,8)}
  else{o.br=1;o.ba=ang(o,t);o.bt2=0;o.bk='gas'}
}
const INFO={
'김민채':{st:[7,10,3,3,8,8],p:'170kg · 받는 피해 25% 감소 · 부딪히면 상대만 튕겨 나감',sk:[['11','제자리 땅 찍기 · 지진파가 퍼지며 맞으면 기절'],['15','점프해서 상대 위치에 착지 · 범위 피해 + 기절'],['5×3+3','입을 벌려 빨아들이고 삼킨 뒤 세 번 씹고 뱉기']]},
'공병은':{st:[8,5,8,8,5,7],p:'',sk:[['12','롤 스킬샷 · 바닥 범위 표시 후 빠른 화살'],['2×연타','스탠드 소환 · 붙어서 주먹 연타'],['3×6+10','바닥이 미끄러지고 비트마다 피해(7번) · 마지막 DROP']]},
'박지성':{st:[6,5,7,8,8,7],p:'',sk:[['12','바닥 격자 경고 후 빨간 킬브릭이 솟음'],['9','해골포 2개가 조준 후 빔 발사'],['1.5×16','시간 정지 · 칼을 겹겹이 깔고 시간 재개']]},
'김티비':{st:[7,4,7,9,6,8],p:'',sk:[['2×연사','1.4초 동안 예광탄 연사'],['12','채팅 말풍선 벽이 아레나를 휩쓸며 밀어냄'],['24','LOCK 조준 후 레일건 한 방']]},
'김가은':{st:[6,7,6,5,6,8],p:'',sk:[['직업별','체어맨 휘두르기 14 · 메딕 회복 18 · 아처 7×3 · 파이어맨 소화기'],['13','펜으로 붓선을 그은 뒤 선 전체가 터짐'],['7+7+12','만화 세 칸이 차례로 터지며 전체 공격']]},
'흉악범':{st:[6,4,8,7,6,9],p:'',sk:[['5×5장','카드 5장을 부채꼴로 던지고 부메랑처럼 회수'],['6+7','뒤로 순간이동해 베고 상대 몸에 장미 폭탄'],['7×5발','매드무비 · 5발 중 맞힌 만큼 킬 · 5킬이면 ACE']]},
'김건우':{st:[6,5,10,6,5,6],p:'니케 스승 · 김티비 상대로 피해 25% 증가',sk:[['6','바나나 껍질 3개 설치 · 밟으면 미끄러짐'],['14','연막을 깔고 그 안의 상대에게 헤드샷'],['3×7','원숭이 7마리가 사방에서 덮침']]},
'김민채 • 각성':{st:[9,9,2,6,9,8],p:'1700kg · 모든 피해 20% 감소 · 부딪히면 화상',sk:[['10','앞으로 용암 기둥 4개가 차례로 분출'],['10+웅덩이','하늘로 솟구쳤다가 상대 위로 낙하 · 용암 웅덩이 생성'],['17','상대 발밑에서 용암 아가리가 솟아 물어뜯음 · 체력 조금 회복']]},
'공병은 • 곤지암병은':{st:[7,5,7,8,7,8],p:'폐병원의 기운 · 어디선가 삐걱거리는 소리',sk:[['12','주인 없는 휠체어가 혼자 굴러가 쫓아가서 들이받음 · 잠깐 기절'],['14','상대 발밑에 저주 표식이 따라붙고 3초 뒤 터짐 · 둔화'],['3×N+12','형광등이 칸마다 꺼졌다 켜짐 · 꺼진 칸에 서 있으면 계속 피해 · 마지막에 전등이 전부 깨짐']]},
'박지성 • 해버지':{st:[7,6,9,8,5,8],p:'산소탱크 · 두 개의 심장',sk:[['12','벽에 두 번까지 튕기는 중거리 슛'],['10+4','멈추지 않는 질주로 쫓아가 태클 · 맞으면 기절'],['24','공을 띄워 저글링한 뒤 휘어지는 슈퍼골 · 골대까지 날려버림']]}
};
const baseOf=i=>DEF[i]&&DEF[i].vof!=null?DEF[i].vof:i;
const VARS=i=>{const b=baseOf(i);return[b,...DEF.map((d,j)=>j).filter(j=>DEF[j].vof===b)]};
const GL=['炎','氷','雷','龍'];
const ICC={};
function ICON(d,sz){
  const key=d.name+d.col+sz;if(ICC[key])return ICC[key];
  const c=document.createElement('canvas');c.width=c.height=sz*2;const pg=g,ph=phase;g=c.getContext('2d');phase='icon';
  try{g.scale(2,2);g.translate(sz/2,sz/2);g.scale(sz/84,sz/84);ball({d,i:0,x:0,y:-4,r:26,dead:0,hid:0,dash:0,tr:[],jump:null,rush:0,cast:null,flash:0,slow:0,sq:0,sa:0,fat:0,gulp:null,rot:0,shield:0,sf:0},{x:1,y:0})}finally{g=pg;phase=ph}
  return ICC[key]=c;
}
function paintIc(el,d,sz){if(!el||!d)return;el.width=el.height=sz*2;const x=el.getContext('2d');x.clearRect(0,0,sz*2,sz*2);x.drawImage(ICON(d,sz),0,0)}
function buildHUD(){
  document.body.classList.toggle('ten',F.length>3);if(F.length>3){CH=[];rs();return}
  $('#p2').style.display=F.length>2?'':'none';$('#p1').classList.toggle('r',F.length==2);
  CH=F.map((f,i)=>{
    const d=f.d,P=$('#p'+i);P.style.setProperty('--c',d.col);P.style.setProperty('--h',d.hi);P.classList.remove('dead');
    $('#p'+i+' .nm b').textContent=d.name;paintIc($('#p'+i+' .ic'),d,34);
    $('#p'+i+' .sk').innerHTML=d.sk.map((s,j)=>`<div class="chip${s.ult?' u':''}"><s></s><span>${s.ult?'ULT':j+1}</span></div>`).join('');
    return[...document.querySelectorAll('#p'+i+' .chip s')];
  });
  rs();
}
function init(){
  const SP=MODE>3?Array.from({length:MODE},(_,i)=>{const a=i*TAU/MODE-Math.PI/2;return[A/2+Math.cos(a)*A*.37,A/2+Math.sin(a)*A*.37]}):MODE==3?[[300,140],[140,440],[460,440]]:[[150,300],[450,300]];F=SEL.slice(0,MODE).map((di,i)=>{const d=pickD(i),[sx,sy]=SP[i];let a;do{a=rnd(0,TAU)}while(Math.abs(Math.cos(a))<.3||Math.abs(Math.sin(a))<.3||Math.cos(a-Math.atan2(A/2-sy,A/2-sx))>.8);return{d,i,x:sx,y:sy,dx:Math.cos(a),dy:Math.sin(a),hp:100,show:100,r:d.r||26,sp:d.sp||200,cds:d.sk.map(s=>s.ult?rnd(11,14):rnd(1.5,3.5)),gcd:1.5,shield:0,slow:0,dash:0,hit:0,tr:[],flash:0,dead:0,sq:0,sa:0,rot:0,cast:null,sf:0,frz:0,burn:0,bt:0,stn:0,br:0,ba:0,bt2:0,bk:'',auto:0,slide:0,swing:null,lp:null,at:0,job:0,ug:0,rush:0,rt:0,gg:0,jump:null,gulp:null,hid:0}});
  TSTOP=null;MAD=null;KO=null;SLOW=0;zk=0;B=[];Pt=[];T=[];FX=[];HZ=[];cine=0;bn=null;phase='cd';tm=4.4;cdN=0;vsd=0;fight=0;shake=0;hs=0;ts=1;lock=0;win=null;endT=0;shown=0;cz=1;cfx=A/2;cfy=A/2;
  $('#msg').className='';buildHUD();AM=Array.from({length:12},()=>({x:rnd(0,A),y:rnd(0,A),r:rnd(1.5,3.5),s:rnd(10,35),p:rnd(0,TAU),c:Math.random()<.5?0:1}));
}

const PAL={magma:['#fff3c4','#ffd27a','#ff8a2c','#ff3d0a','#5a1204'],gas:['#ffffff','#f1f4f8','#d5dbe4','#aab3c2'],heart:['#ffffff','#ffd1e6','#ff8cc2','#ff5fa2','#a0205e'],gold:['#ffffff','#fff3c0','#ffe08a','#5a9bff','#2f6bff'],fire:['#fff6d0','#ffd36b','#ff8a2c','#e4482a','#7a1d12'],drg:['#f2ffe8','#9dffb8','#2fd67e','#138a52','#0b3b25'],ice:['#ffffff','#d6f3ff','#8fd3f5','#3f9bd0'],elec:['#ffffff','#fff3a0','#ffe45c','#b48cff']};
const SPR={};
function spr(c,soft){
  const key=c+(soft?'s':'');if(SPR[key])return SPR[key];
  const o=document.createElement('canvas');o.width=o.height=64;const x=o.getContext('2d'),gr=x.createRadialGradient(32,32,0,32,32,32);
  if(soft){gr.addColorStop(0,c+'cc');gr.addColorStop(.5,c+'55');gr.addColorStop(1,c+'00')}
  else{gr.addColorStop(0,c+'ff');gr.addColorStop(.3,c+'cc');gr.addColorStop(.62,c+'40');gr.addColorStop(1,c+'00')}
  x.fillStyle=gr;x.fillRect(0,0,64,64);return SPR[key]=o;
}
function glow(c,x,y,r,a){if(r<=0||a<=0)return;g.globalAlpha=a;g.drawImage(spr(c),x-r,y-r,r*2,r*2)}
function emit(rate,dt,fn){let n=rate*dt;while(n>=1){fn();n--}if(Math.random()<n)fn()}
function fireP(x,y,vx,vy,r,l,pal){Pt.push({x,y,vx,vy,l,m:l,gl:1,sh:4,pal:pal||PAL.fire,r,gr:-r*.8/l,gy:-90,fr:.2})}
function smokeP(x,y,r,l){Pt.push({x,y,vx:rnd(-15,15),vy:rnd(-30,-10),l,m:l,sh:3,col:'#26252b',r,gr:22,a0:.42,fr:.3})}
function emberP(x,y,col){const l=rnd(.5,1);Pt.push({x,y,vx:rnd(-70,70),vy:rnd(-150,-40),l,m:l,gl:1,sh:6,col,r:rnd(1.2,2.4),gy:-20,fr:.5})}
function mistP(x,y,r,l){Pt.push({x,y,vx:rnd(-20,20),vy:rnd(-20,20),l,m:l,gl:1,sh:4,pal:PAL.ice,r,gr:18,a0:.35,fr:.2})}
function shardP(x,y,vx,vy,r){const l=rnd(.5,.9);Pt.push({x,y,vx,vy,l,m:l,sh:1,col:['#e3f6ff','#a6dcf5','#5fb8e6'][Math.floor(rnd(0,3))],r,rot:rnd(0,TAU),vr:rnd(-10,10),gy:380,fr:.3})}
function snowP(x,y){const l=rnd(.6,1.2);Pt.push({x,y,vx:rnd(-25,25),vy:rnd(-10,25),l,m:l,sh:6,col:'#ffffff',r:rnd(1.2,2.2),fr:.4})}
function zapP(x,y,a,s){const l=rnd(.15,.3);Pt.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,l,m:l,gl:1,sh:5,col:Math.random()<.5?'#ffffff':'#ffe45c',r:2.2,fr:.02})}
function heartPath(){g.beginPath();g.moveTo(0,6);g.bezierCurveTo(-12,-2,-10,-12,-4,-12);g.bezierCurveTo(-1,-12,0,-9,0,-7);g.bezierCurveTo(0,-9,1,-12,4,-12);g.bezierCurveTo(10,-12,12,-2,0,6);g.closePath()}
function heartP(x,y,vx,vy,r,col){const l=rnd(.5,.9);Pt.push({x,y,vx,vy,l,m:l,sh:7,col,r,rot:rnd(-1,1),vr:rnd(-2,2),gy:-30,fr:.3})}
function sparkP(x,y,vx,vy,col,r){const l=rnd(.3,.6);Pt.push({x,y,vx,vy,l,m:l,gl:1,sh:8,col,r,rot:rnd(0,TAU),vr:rnd(-4,4),fr:.3})}
function cubeP(x,y,a,v,col){const l=rnd(1,1.6);Pt.push({x,y,z:rnd(0,10),vz:rnd(200,440),vx:Math.cos(a)*v,vy:Math.sin(a)*v,l,m:l,sh:10,cube:1,r:rnd(3,6),rot:rnd(0,TAU),vr:rnd(-12,12),col,fr:.5})}
function rockP(x,y,a,v){const l=rnd(1,1.6);Pt.push({x,y,z:rnd(0,10),vz:rnd(180,420),vx:Math.cos(a)*v,vy:Math.sin(a)*v,l,m:l,sh:10,r:rnd(3,7),rot:rnd(0,TAU),vr:rnd(-12,12),col:['#3a3f4c','#4a5060','#2b3039'][Math.floor(rnd(0,3))],fr:.5})}
function dustP(x,y,v){const a=rnd(0,TAU),l=rnd(.7,1.3);Pt.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v*.6,l,m:l,sh:3,col:'#8d8576',r:rnd(10,18),gr:40,a0:.5,fr:.15})}
function neon(D,w,draw){g.save();g.lineCap='round';g.lineJoin='round';g.globalCompositeOperation='lighter';g.strokeStyle=D.col;g.globalAlpha=.5;g.lineWidth=w*2.8;draw();g.stroke();g.restore();g.save();g.lineCap='round';g.lineJoin='round';g.strokeStyle=D.hi;g.lineWidth=w;draw();g.stroke();g.restore()}
function petalP(x,y,vx,vy){const l=rnd(.7,1.2);Pt.push({x,y,vx,vy,l,m:l,sh:13,col:['#e0245e','#b0103a','#ff5c8a'][Math.floor(rnd(0,3))],r:rnd(3,6),rot:rnd(0,TAU),vr:rnd(-8,8),gy:40,fr:.4})}
function goldG(y0,y1){const gr=g.createLinearGradient(0,y0,0,y1);gr.addColorStop(0,'#fff6d0');gr.addColorStop(.45,'#f2c94c');gr.addColorStop(.55,'#b8860b');gr.addColorStop(1,'#ffe9a3');return gr}
function poly(pts){g.beginPath();pts.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.closePath()}
function jag(x1,y1,x2,y2,n,amp){const dx=x2-x1,dy=y2-y1,L=Math.hypot(dx,dy)||1,nx=-dy/L,ny=dx/L,o=[[x1,y1]];for(let i=1;i<n;i++){const q=rnd(-1,1)*amp;o.push([x1+dx*i/n+nx*q,y1+dy*i/n+ny*q])}o.push([x2,y2]);return o}
function segD(px,py,ax,ay,bx,by){const dx=bx-ax,dy=by-ay,L=dx*dx+dy*dy||1,u=clamp(((px-ax)*dx+(py-ay)*dy)/L,0,1);return Math.hypot(px-ax-dx*u,py-ay-dy*u)}
function dpos(h,q){const w=Math.sin(q*.028+h.ph)*18;return[h.sx+h.ux*q-h.uy*w,h.sy+h.uy*q+h.ux*w]}
const GROUND=k=>k=='scorch'||k=='frost'||k=='spk'||k=='crack';
function GUST(o,t){
  let rf=0;
  B.forEach(q=>{if(q.o!=o&&dist(q,o)<240){q.o=o;q.rf=1;const a=ang(q,t),v=Math.hypot(q.vx,q.vy)*1.15;q.vx=Math.cos(a)*v;q.vy=Math.sin(a)*v;q.a=a;rf=1;ring(q.x,q.y,4,40,'#b9ffcf',4,.3)}});
  if(dist(o,t)<210&&!t.dead){const a=ang(o,t);t.dx=Math.cos(a);t.dy=Math.sin(a);t.dash=0;hurt(t,6,o,t.x,t.y,0,0)}
  FX.push({k:'gust',x:o.x,y:o.y,a:rnd(0,TAU),l:.55,m:.55});
  for(let i=0;i<26;i++){const a=rnd(0,TAU),v=rnd(200,420),l=rnd(.3,.5);Pt.push({x:o.x+Math.cos(a)*30,y:o.y+Math.sin(a)*30,vx:Math.cos(a+1.2)*v,vy:Math.sin(a+1.2)*v,l,m:l,gl:1,sh:5,col:i%2?'#ffffff':'#b9ffcf',r:2.5,fr:.05})}
  if(rf)ft(o.x,o.y-o.r-26,'반사!','#b9ffcf',18);
}
function trail(q,dt){
  if(TRL[q.k]){TRL[q.k](q,dt);return}
  const bx=-q.vx*.12,by=-q.vy*.12;
  if(q.k=='flame'){
    emit(110,dt,()=>fireP(q.x+rnd(-4,4),q.y+rnd(-4,4),bx+rnd(-35,35),by+rnd(-35,35),rnd(9,15),rnd(.25,.45)));
    emit(14,dt,()=>smokeP(q.x,q.y,rnd(6,10),rnd(.6,1)));emit(18,dt,()=>emberP(q.x,q.y,'#ffd36b'));
  }else if(q.k=='lance'){
    emit(50,dt,()=>mistP(q.x-q.vx*.03+rnd(-3,3),q.y-q.vy*.03+rnd(-3,3),rnd(7,11),rnd(.3,.5)));
    emit(18,dt,()=>shardP(q.x,q.y,bx*.5+rnd(-30,30),by*.5+rnd(-30,30),rnd(1.5,3)));emit(20,dt,()=>snowP(q.x,q.y));
  }else if(q.k=='bolt'){
    emit(60,dt,()=>zapP(q.x,q.y,rnd(0,TAU),rnd(80,220)));
    emit(30,dt,()=>Pt.push({x:q.x,y:q.y,vx:0,vy:0,l:.18,m:.18,gl:1,sh:4,pal:PAL.elec,r:rnd(10,14)}));
  }else if(q.k=='shot'){
    emit(70,dt,()=>{const l=rnd(.15,.3);Pt.push({x:q.x,y:q.y,vx:-q.vx*.2+rnd(-30,30),vy:-q.vy*.2+rnd(-30,30),l,m:l,gl:1,sh:5,col:Math.random()<.5?q.D.hi:'#ffffff',r:2,fr:.1})});
    emit(40,dt,()=>Pt.push({x:q.x,y:q.y,vx:0,vy:0,l:.22,m:.22,gl:1,sh:4,pal:['#ffffff',q.D.hi,q.D.col],r:rnd(9,13)}));
  }else if(q.k=='heart'){
    emit(30,dt,()=>sparkP(q.x+rnd(-6,6),q.y+rnd(-6,6),rnd(-20,20),rnd(-20,20),'#fff0f7',rnd(1.5,3)));
    emit(10,dt,()=>heartP(q.x,q.y,rnd(-20,20),rnd(-40,-10),rnd(2.5,4),q.D.hi));
  }else if(q.k=='card'){
    emit(16,dt,()=>petalP(q.x,q.y,rnd(-30,30),rnd(-30,30)));
  }else if(q.k=='tracer'||q.k=='chat'||q.k=='hs'){
  }else emit(30,dt,()=>Pt.push({x:q.x,y:q.y,vx:rnd(-20,20),vy:rnd(-20,20),l:.35,m:.35,sh:0,rot:0,vr:0,col:q.D.hi,r:3}));
}
let FL=null;
function floor(){
  if(FL)return FL;FL=document.createElement('canvas');FL.width=FL.height=A*2;const x=FL.getContext('2d');x.scale(2,2);
  x.fillStyle='#10131a';x.fillRect(0,0,A,A);
  const ts=75;
  for(let i=0;i<Math.ceil(A/75);i++)for(let j=0;j<Math.ceil(A/75);j++){
    const v=((i*37+j*91)%7)/7;x.fillStyle='rgb('+Math.round(27+v*8)+','+Math.round(32+v*8)+','+Math.round(42+v*9)+')';x.fillRect(i*ts+2,j*ts+2,ts-4,ts-4);
    x.fillStyle='rgba(255,255,255,.045)';x.fillRect(i*ts+2,j*ts+2,ts-4,3);x.fillRect(i*ts+2,j*ts+2,3,ts-4);
    x.fillStyle='rgba(0,0,0,.35)';x.fillRect(i*ts+2,j*ts+ts-5,ts-4,3);x.fillRect(i*ts+ts-5,j*ts+2,3,ts-4);
    if((i*13+j*7)%5==0){x.strokeStyle='rgba(0,0,0,.45)';x.lineWidth=1.5;x.beginPath();let cx=i*ts+12+((i*j*17)%46),cy=j*ts+10;x.moveTo(cx,cy);for(let q=0;q<4;q++){cx+=((i+q*7)%9)-4;cy+=12+((j+q)%4)*3;x.lineTo(cx,cy)}x.stroke()}
  }
  x.strokeStyle='rgba(255,255,255,.06)';x.lineWidth=3;x.beginPath();x.arc(A/2,A/2,92,0,TAU);x.stroke();
  x.lineWidth=1.5;x.beginPath();x.arc(A/2,A/2,80,0,TAU);x.stroke();
  for(let i=0;i<12;i++){const a=i*TAU/12,r2=i%3?88:104;x.beginPath();x.moveTo(A/2+Math.cos(a)*80,A/2+Math.sin(a)*80);x.lineTo(A/2+Math.cos(a)*r2,A/2+Math.sin(a)*r2);x.stroke()}
  const lg=x.createRadialGradient(A/2,A/2,40,A/2,A/2,A*.7);lg.addColorStop(0,'rgba(120,140,190,.10)');lg.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=lg;x.fillRect(0,0,A,A);
  return FL;
}
function shoot(o,a,sp,dmg,kind,slow,r){SFX({shot:'skillshot',tracer:'gun',hs:'gun',arrow:'arrow',chair:'throw',card:'throw'}[kind]||'throw');
  B.push({x:o.x+Math.cos(a)*o.r,y:o.y+Math.sin(a)*o.r,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,a,o,dmg,k:kind,slow,r,age:0,D:o.d});
}
function spark(x,y,kind,n,sp){
  for(let i=0;i<n;i++){
    const a=rnd(0,TAU),v=rnd(.2,1)*sp,vx=Math.cos(a)*v,vy=Math.sin(a)*v;
    if(kind=='fire'||kind=='drg'||kind=='magma'){
      const pal=PAL[kind];fireP(x,y,vx*.7,vy*.7,rnd(8,16),rnd(.3,.6),pal);
      if(i%3==0)smokeP(x+vx*.05,y+vy*.05,rnd(6,11),rnd(.6,1.1));
      if(i%2==0){const l=rnd(.3,.6);Pt.push({x,y,vx:vx*1.3,vy:vy*1.3,l,m:l,gl:1,sh:5,col:pal[1],r:2,fr:.08,gy:60})}
    }else if(kind=='ice'){
      if(i%2==0)shardP(x,y,vx,vy-60,rnd(3,7));else mistP(x+vx*.04,y+vy*.04,rnd(8,15),rnd(.4,.7));
      if(i%3==0)snowP(x,y);
    }else if(kind=='heavy'){
      if(i%2==0)rockP(x,y,a,v*.5);else dustP(x,y,v*.25);
      if(i%4==0)Pt.push({x,y,vx:0,vy:0,l:.3,m:.3,gl:1,sh:4,pal:PAL.heart,r:rnd(10,18)});
    }else if(kind=='heart'){
      if(i%2==0)heartP(x,y,vx*.8,vy*.8-40,rnd(5,9),['#ff5fa2','#ff8cc2','#ffd1e6'][i%3]);else sparkP(x,y,vx,vy,'#fff0f7',rnd(2,4));
      if(i%3==0)Pt.push({x,y,vx:vx*.3,vy:vy*.3,l:.35,m:.35,gl:1,sh:4,pal:PAL.heart,r:rnd(8,14)});
    }else if(kind=='rose'){
      petalP(x,y,vx*.8,vy*.8);if(i%3==0)sparkP(x,y,vx*.3,vy*.3,'#ffd3e0',rnd(2,4));
    }else if(kind=='ink'){
      const l=rnd(.5,.9);Pt.push({x,y,vx:vx*.8,vy:vy*.8,l,m:l,sh:6,col:i%3?'#0c0c10':'#9be36b',r:rnd(2,5),fr:.12});
    }else if(kind=='gold'||kind=='time'||kind=='gun'||kind=='monkey'){
      const l=rnd(.2,.4);Pt.push({x,y,vx:vx*1.5,vy:vy*1.5,l,m:l,gl:1,sh:5,col:i%2?'#ffe08a':'#7fb0ff',r:2.4,fr:.05});
      if(i%3==0)sparkP(x,y,vx*.3,vy*.3,'#fff3c0',rnd(3,5));
      if(i%4==0)Pt.push({x,y,vx:0,vy:0,l:.25,m:.25,gl:1,sh:4,pal:PAL.gold,r:rnd(10,18)});
    }else if(kind=='elec'){
      zapP(x,y,a,v*1.6);if(i%3==0)Pt.push({x,y,vx:vx*.3,vy:vy*.3,l:.25,m:.25,gl:1,sh:4,pal:PAL.elec,r:rnd(8,16)});
    }else{
      const l=rnd(.4,.8);Pt.push({x,y,vx,vy,l,m:l,sh:2,col:'#8b93a6',r:rnd(3,6),rot:rnd(0,TAU),vr:rnd(-8,8),gy:200});
      if(i%3==0)smokeP(x,y,rnd(5,9),.6);
    }
  }
  if(Pt.length>900)Pt.splice(0,Pt.length-900);
}
function ring(x,y,r0,r1,col,w,l){FX.push({k:'ring',x,y,r0,r1,col,w,l,m:l})}
function ft(x,y,txt,col,size){T.push({x,y,txt,col,size,l:1})}

function hurt(t,n,o,x,y,slow,heavy){
  if(t.dead)return;
  if(t.d.heavy>1)n=Math.round(n*.8*10)/10;else if(t.d.heavy&&n>2)n=Math.round(n*.75);
  if(o&&o.d.master&&t.d.name.indexOf('김티비')==0){n=Math.round(n*1.25+.2);if(!o.mt){o.mt=1;ft(o.x,o.y-o.r-36,'스승의 손맛','#ff4655',22)}}
  if(t.shield>0){t.shield=0;t.sf=.25;spark(x,y,'ice',22,340);ring(x,y,6,60,'#e3f6ff',5,.4);ring(t.x,t.y,t.r,t.r+50,'#e3f6ff',3,.5);ft(t.x,t.y-t.r-26,'방어!','#e3f6ff',18);shake=Math.max(shake,5);hs=.05;return}
  t.hp=Math.max(0,t.hp-n);t.flash=.12;SFX(heavy?'heavy':n>2?'hit':'tick');if(slow)t.slow=1.5;if(!F.some(x=>x.cast&&x.cast.s.ult)&&!TSTOP&&!MAD){o.ug=Math.min(100,(o.ug||0)+n*1.2);t.ug=Math.min(100,(t.ug||0)+n*.8)}
  spark(x,y,o.d.k,n>2?14:3,260);if(n>2)ring(x,y,6,heavy?60:38,o.d.hi,4,.35);
  if(heavy){SLOW=Math.max(SLOW,.22);zk=1;zx=x;zy=y;FX.push({k:'x',x,y,col:o.d.hi,l:.35,m:.35});FX.push({k:'burst',x,y,c:o.d.hi,a:rnd(0,1),l:.3,m:.3})}
  dmgT(t,n,heavy);if(heavy&&n>=10)FX.push({k:'imp',x,y,c:o.d.hi,l:.2,m:.2});
  if(n>2){shake=Math.max(shake,heavy?12:6);hs=heavy?.1:.06}
  if(n>2){t.sq=1;t.sa=ang(o,t)}
  const bar=$('#p'+t.i+' .bar');if(bar&&F.length<4){bar.classList.remove('hit');void bar.offsetWidth;bar.classList.add('hit')}
  if(t.hp<=0&&phase=='play'&&!t.dead){
    t.dead=1;KO=t;SFX('ko');t.cast=null;F.forEach(x=>{if(x.gulp&&x.gulp.tg==t)x.gulp=null});if(TSTOP&&TSTOP.o==t)TSTOP=null;if(MAD&&MAD.o==t)MAD=null;
    const al=F.filter(x=>!x.dead);
    if(al.length<=1){phase='end';win=al[0]||o;TSTOP=null;MAD=null;endT=0;ts=.25;bn=null}else{ft(t.x,t.y-t.r-30,'K.O.','#ffffff',44);SLOW=.5;zk=1.5;zx=t.x;zy=t.y}
    spark(t.x,t.y,t.d.k,40,480);spark(t.x,t.y,'dust',20,300);shatter(t);
    ring(t.x,t.y,10,160,'#fff',6,.6);ring(t.x,t.y,10,110,t.d.col,10,.8);shake=22;cfx=t.x;cfy=t.y;
  }
}

function step(dt){
  lock-=dt;const U=F.find(x=>x.cast&&x.cast.s.ult);
  F.slice().sort(()=>Math.random()-.5).forEach(f=>{const i=f.i;
    if(f.dead)return;const t=tgt(f);if(!t)return;
    if((U&&f!=U&&F.length<4)||(TSTOP&&f!=TSTOP.o)||(MAD&&f!=MAD.o)||(CIN&&f!=CIN.o))return;
    ['shield','slow','dash','flash','gcd','sf','frz','burn','stn','bc','fat','slide'].forEach(q=>{if(f[q]>0)f[q]-=dt});
    if(f.burn>0){f.bt+=dt;if(f.bt>=.5){f.bt=0;const s0=f.shield;f.shield=0;hurt(f,2,(tgt(f)||f),f.x,f.y-f.r*.5,0,0);f.shield=s0;spark(f.x,f.y,(tgt(f)||f).d.k,3,120)}}
    if(f.frz>0||f.stn>0){f.cast=null;f.br=0;f.rush=0;f.auto=0;f.swing=null}
    f.cds=f.cds.map(c=>c-dt);f.ug=Math.min(100,(f.ug||0)+dt*2.2);f.sq=Math.max(0,f.sq-dt*4);
    const m=(f.dash>0?2.7:1)*(f.slow>0?.65:1)*(f.cast?.35:1)*(f.frz>0||f.stn>0?0:1)*(f.br>0?.45:1)*(f.auto>0?.35:1)*(f.swing||f.lp?0:1)*(f.slide>0?2.3:1)*(f.jump||f.gulp?0:1)*(f.rush>0?(dist(f,t)>f.r+t.r+30?1.9:.1):1);
    f.x+=f.dx*f.sp*m*dt;f.y+=f.dy*f.sp*m*dt;
    f.rot+=f.sp*m*dt/f.r*(f.dx>=0?1:-1);
    let w=-1;
    if(f.x<f.r){f.x=f.r;f.dx=Math.abs(f.dx);w=0}
    if(f.x>A-f.r){f.x=A-f.r;f.dx=-Math.abs(f.dx);w=0}
    if(f.y<f.r){f.y=f.r;f.dy=Math.abs(f.dy);w=1}
    if(f.y>A-f.r){f.y=A-f.r;f.dy=-Math.abs(f.dy);w=1}
    if(f.wcd>0)f.wcd-=dt;if(w>=0&&!(f.wcd>0)){f.wcd=.3;f.sq=1;f.sa=w?Math.PI/2:0;spark(f.x,f.y,'dust',4,110);wallHit(f)}
    f.tr.push([f.x,f.y]);
    const mx=f.dash>0?14:0;while(f.tr.length>mx)f.tr.shift();
    if(f.slow>0&&Math.random()<dt*20)Pt.push({x:f.x+rnd(-20,20),y:f.y+rnd(-20,20),vx:0,vy:-30,l:.5,m:.5,sh:1,rot:0,vr:3,col:'#e3f6ff',r:4});
    if(f.br>0){
      f.br-=dt;let da=ang(f,t)-f.ba;da=Math.atan2(Math.sin(da),Math.cos(da));f.ba+=da*Math.min(1,dt*2.5);
      const mx=f.x+Math.cos(f.ba)*f.r,my=f.y+Math.sin(f.ba)*f.r;
      emit(170,dt,()=>{const a=f.ba+rnd(-.32,.32),v=rnd(380,470),l=rnd(.45,.65);Pt.push({x:mx,y:my,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l,m:l,gl:1,sh:4,pal:f.bk=='gas'?PAL.gas:PAL.drg,r:rnd(9,14),gr:30,fr:.6})});
      if(f.bk=='gas')emit(45,dt,()=>{const d=rnd(40,210);Pt.push({x:mx+Math.cos(f.ba)*d+rnd(-16,16),y:my+Math.sin(f.ba)*d+rnd(-16,16),vx:Math.cos(f.ba)*70,vy:Math.sin(f.ba)*70,l:rnd(.7,1.1),m:1.1,sh:3,col:'#e6ebf2',r:rnd(12,22),gr:34,a0:.5,fr:.3})});
      if(f.bk!='gas')emit(22,dt,()=>smokeP(mx+Math.cos(f.ba)*rnd(60,180),my+Math.sin(f.ba)*rnd(60,180),rnd(8,14),rnd(.6,1)));
      f.bt2+=dt;if(f.bt2>=.1){f.bt2=0;let d2=ang(f,t)-f.ba;d2=Math.atan2(Math.sin(d2),Math.cos(d2));if(!t.dead&&dist(f,t)<230&&Math.abs(d2)<.4){hurt(t,2,f,t.x,t.y,0,0);if(f.bk=='gas'){t.slow=.8;const pa=ang(f,t);t.x=clamp(t.x+Math.cos(pa)*7,t.r,A-t.r);t.y=clamp(t.y+Math.sin(pa)*7,t.r,A-t.r)}}}
    }
    if(f.jump){
      const j=f.jump;j.t+=dt;const u=Math.min(1,j.t/j.dur);f.x=j.sx+(j.tx-j.sx)*u;f.y=j.sy+(j.ty-j.sy)*u;
      if(u>=1){
        f.jump=null;shake=Math.max(shake,16);hs=.08;SFX('slam');
        ring(f.x,f.y,10,140,f.d.hi,10,.5);ring(f.x,f.y,10,100,f.d.col,18,.4);for(let i=0;i<22;i++)rockP(f.x,f.y,rnd(0,TAU),rnd(80,280));for(let i=0;i<14;i++)dustP(f.x,f.y,rnd(80,200));FX.push({k:'burst',x:f.x,y:f.y,c:f.d.hi,a:rnd(0,1),l:.35,m:.35});FX.push({k:'frost',l:.12,m:.12,c:'#ffffff'});
        FX.push({k:'crack',x:f.x,y:f.y,r:95,l:3,m:3});
        F.forEach(e=>{if(e==f||e.dead||e.hid||e.jump)return;if(dist(f,e)<95+e.r*.5){hurt(e,15,f,e.x,e.y,0,1);const a=ang(f,e);e.dx=Math.cos(a);e.dy=Math.sin(a);e.stn=.3}})
      }
    }
    if(f.rush>0){
      f.rush-=dt;const d0=dist(f,t),a0=ang(f,t);
      if(!t.hid){f.dx=Math.cos(a0);f.dy=Math.sin(a0)}
      f.rt+=dt;
      f.ft2+=dt;while(f.ft2>=.03){f.ft2-=.03;FX.push({k:'fist',x:f.x+rnd(-14,14),y:f.y-26+rnd(-14,14),a:a0+rnd(-.45,.45),d:Math.max(20,Math.min(d0-10,95)),l:.13,m:.13,c:f.d.hi,c2:f.d.col})}
      if(f.rt>=.08){f.rt=0;
        if(d0<f.r+t.r+40&&!t.dead&&!t.hid&&!t.jump){hurt(t,2,f,t.x-Math.cos(a0)*t.r,t.y-Math.sin(a0)*t.r,0,0);SFX('rush');t.x=clamp(t.x+Math.cos(a0)*4,t.r,A-t.r);t.y=clamp(t.y+Math.sin(a0)*4,t.r,A-t.r)}
        if(d0<f.r+t.r+40&&!t.hid)FX.push({k:'burst',x:t.x,y:t.y,c:f.d.hi,a:rnd(0,1),l:.15,m:.15});
      }
      f.gg-=dt;if(f.gg<=0){f.gg=.3;ft(f.x+rnd(-40,40),f.y-f.r-46+rnd(-12,12),'ゴゴゴ','#b48cff',24)}
    }
    if(f.gulp){
      const G=f.gulp,tg=G.tg;G.t+=dt;
      if(G.st==0){
        const u=Math.min(1,G.t/.7),e=u*u;tg.x=G.x0+(f.x-G.x0)*e;tg.y=G.y0+(f.y-G.y0)*e;tg.stn=Math.max(tg.stn,.2);tg.sq=.9;tg.sa=Math.atan2(f.y-tg.y,f.x-tg.x);
        emit(110,dt,()=>{const a=rnd(0,TAU),r=rnd(70,170),sa=a+.7;Pt.push({x:f.x+Math.cos(a)*r,y:f.y+Math.sin(a)*r,vx:-Math.cos(sa)*r*2.4,vy:-Math.sin(sa)*r*2.4,l:.4,m:.4,gl:1,sh:5,col:Math.random()<.5?f.d.hi:'#ffffff',r:2.4,fr:.6})});
        emit(25,dt,()=>{const a=rnd(0,TAU),r=rnd(80,160);Pt.push({x:f.x+Math.cos(a)*r,y:f.y+Math.sin(a)*r,vx:-Math.cos(a)*r*1.6,vy:-Math.sin(a)*r*1.6,l:.5,m:.5,sh:3,col:'#8d8576',r:rnd(8,13),a0:.4,fr:.6})});
        if(Math.random()<dt*10)shake=Math.max(shake,4);
        if(u>=1){G.st=1;G.t=0;tg.hid=1;tg.cast=null;f.sq=1;f.sa=0;ft(f.x,f.y-f.r-30,'꿀꺽!',f.d.hi,34);shake=Math.max(shake,14);spark(f.x,f.y,'heart',20,260);SFX('gulp')}
      }else{
        tg.x=f.x;tg.y=f.y;tg.stn=Math.max(tg.stn,.2);G.c+=dt;f.fat=1;
        if(G.c>=.3){G.c=0;G.n++;hurt(tg,5,f,f.x,f.y-f.r*.3,0,0);f.sq=1;f.sa=Math.PI/2;ft(f.x+rnd(-20,20),f.y-f.r-20,'냠',f.d.hi,22);SFX('chew')}
        if(tg.dead)f.gulp=null;
        else if(G.n>=3){
          const a=rnd(0,TAU);tg.hid=0;tg.x=clamp(f.x+Math.cos(a)*(f.r+tg.r+6),tg.r,A-tg.r);tg.y=clamp(f.y+Math.sin(a)*(f.r+tg.r+6),tg.r,A-tg.r);
          tg.dx=Math.cos(a);tg.dy=Math.sin(a);tg.stn=.6;tg.dash=0;ft(f.x,f.y-f.r-34,'꺼억!',f.d.hi,36);for(let i=0;i<14;i++)dustP(f.x,f.y,rnd(80,200));spark(tg.x,tg.y,'heavy',16,320);ring(f.x,f.y,10,140,f.d.col,10,.5);hurt(tg,3,f,tg.x,tg.y,0,1);f.gulp=null;SFX('spit');
        }
      }
    }
    if(f.auto>0){f.auto-=dt;f.at+=dt;if(f.at>=.08&&!t.hid){f.at=0;const a=ang(f,t)+rnd(-.1,.1);shoot(f,a,720,2,'tracer',0,5);FX.push({k:'muz',x:f.x+Math.cos(a)*(f.r+6),y:f.y+Math.sin(a)*(f.r+6),a,l:.06,m:.06});Pt.push({x:f.x,y:f.y,z:8,vz:rnd(120,220),vx:Math.cos(a+1.8)*rnd(60,120),vy:Math.sin(a+1.8)*rnd(60,120),l:1,m:1,sh:10,cube:1,r:1.8,rot:rnd(0,TAU),vr:rnd(-20,20),col:'#e2b84a',fr:.4})}}
    if(f.swing){
      const S2=f.swing;S2.t+=dt;const u=S2.t/.34;
      if(!S2.hit&&u>=.45){S2.hit=1;SFX('heavy');F.forEach(e=>{if(e==f||e.dead||e.hid||e.jump)return;let da=ang(f,e)-S2.a;da=Math.atan2(Math.sin(da),Math.cos(da));if(dist(f,e)<f.r+e.r+62&&Math.abs(da)<1.9){hurt(e,14,f,e.x,e.y,0,1);const a=ang(f,e);e.dx=Math.cos(a);e.dy=Math.sin(a);e.stn=.3;e.x=clamp(e.x+Math.cos(a)*30,e.r,A-e.r);e.y=clamp(e.y+Math.sin(a)*30,e.r,A-e.r)}})}
      if(u>=1)f.swing=null;
    }
    if(f.slide>0)emit(14,dt,()=>dustP(f.x,f.y+f.r*.6,30));
    if(f.lp){
      const L=f.lp;L.t+=dt;
      if(L.t>=.35&&L.t<1.25){f.hid=1;const e=L.tg&&!L.tg.dead?L.tg:tgt(f);if(e){const k2=Math.min(1,dt*3.5);f.x=clamp(f.x+(e.x-f.x)*k2,f.r,A-f.r);f.y=clamp(f.y+(e.y-f.y)*k2,f.r,A-f.r)}}
      else if(L.t>=1.25&&L.t<1.5){f.hid=1;const v=(L.t-1.25)/.25;emit(90,dt,()=>fireP(f.x+rnd(-20,20),f.y-(1-v*v)*520+rnd(-20,20),rnd(-40,40),rnd(-200,-80),rnd(12,20),rnd(.3,.5),PAL.magma))}
      else if(L.t>=1.5){
        f.hid=0;f.lp=null;shake=Math.max(shake,18);hs=.1;SFX('slam');ring(f.x,f.y,10,160,f.d.hi,12,.5);ring(f.x,f.y,10,110,f.d.col,20,.45);
        for(let i=0;i<26;i++)rockP(f.x,f.y,rnd(0,TAU),rnd(100,320));for(let i=0;i<24;i++)fireP(f.x,f.y,rnd(-260,260),rnd(-260,260),rnd(10,20),rnd(.4,.8),PAL.magma);
        FX.push({k:'crack',x:f.x,y:f.y,r:110,l:3,m:3});FX.push({k:'frost',l:.12,m:.12,c:'#ffd27a'});HZ.push({k:'pool',o:f,x:f.x,y:f.y,r:80,t:0,dur:2.4,tk:0});
        F.forEach(e=>{if(e==f||e.dead||e.hid||e.jump)return;if(dist(f,e)<105+e.r*.5){hurt(e,10,f,e.x,e.y,0,1);const a=ang(f,e);e.dx=Math.cos(a);e.dy=Math.sin(a);e.stn=.35;e.x=clamp(e.x+Math.cos(a)*40,e.r,A-e.r);e.y=clamp(e.y+Math.sin(a)*40,e.r,A-e.r)}});
      }
    }
    const ek=f.d.k;
    if(ek=='fire')emit(10,dt,()=>fireP(f.x+rnd(-12,12),f.y-rnd(0,14),rnd(-10,10),rnd(-60,-30),rnd(5,9),rnd(.3,.5)));
    else if(ek=='ice')emit(6,dt,()=>snowP(f.x+rnd(-24,24),f.y+rnd(-24,24)));
    else if(ek=='elec')emit(8,dt,()=>zapP(f.x+rnd(-20,20),f.y+rnd(-20,20),rnd(0,TAU),rnd(60,140)));
    else if(ek=='magma'){if(!f.hid)emit(6,dt,()=>emberP(f.x+rnd(-f.r*.7,f.r*.7),f.y+rnd(-f.r*.5,f.r*.5),'#ff8a2c'))}
    else if(ek=='heavy'){if(!f.hid&&!f.jump)emit(2,dt,()=>dustP(f.x+rnd(-f.r*.6,f.r*.6),f.y+f.r*.7,22))}
    else if(ek=='gold')emit(2,dt,()=>sparkP(f.x+rnd(-22,22),f.y+rnd(-22,22),0,-20,f.d.hi,rnd(1.5,2.5)));
    else emit(8,dt,()=>emberP(f.x+rnd(-15,15),f.y+rnd(-15,15),'#9dffb8'));
    if(f.burn>0)emit(30,dt,()=>fireP(f.x+rnd(-18,18),f.y+rnd(-14,10),rnd(-10,10),rnd(-90,-50),rnd(7,12),rnd(.3,.5),PAL[(tgt(f)||f).d.k=='drg'?'drg':'fire']));
    if(f.cast){
      const c=f.cast;c.t+=dt;if(c.s.ult&&Math.random()<dt*100)Pt.push({x:f.x+rnd(-40,40),y:f.y+30,vx:rnd(-20,20),vy:-rnd(200,420),fr:.5,l:.8,m:.8,sh:f.d.k=='ice'?1:0,rot:0,vr:6,col:f.d.hi,r:rnd(3,6)});
      if(Math.random()<dt*50){const a=rnd(0,TAU);Pt.push({x:f.x+Math.cos(a)*56,y:f.y+Math.sin(a)*56,vx:-Math.cos(a)*170,vy:-Math.sin(a)*170,fr:.5,l:.3,m:.3,sh:0,rot:0,vr:0,col:f.d.hi,r:3})}
      if(c.t>=c.s.w){
        c.s.f(f,t);f.cds[c.j]=c.s.cd||0;f.gcd=F.length>3?2.2:3.2;f.cast=null;lock=F.length>3?.25:2.4;if(c.s.ult){f.ug=0;SLOW=.4;zk=1.4;zx=f.x;zy=f.y;FX.push({k:'frost',l:.2,m:.2,c:'#ffffff'})}
        ring(f.x,f.y,f.r,f.r+54,f.d.hi,5,.4);f.sq=1;f.sa=ang(f,t);shake=Math.max(shake,c.s.ult?14:4);if(c.s.ult){ring(f.x,f.y,10,300,f.d.hi,14,.7);ring(f.x,f.y,10,200,f.d.col,22,.5);hs=.12}
      }
    }else if(f.gcd<=0&&f.frz<=0&&f.stn<=0&&!f.jump&&!f.gulp&&!(f.rush>0)&&!(f.auto>0)&&!f.swing&&!f.lp&&!(f.slide>0)&&!f.hid){
      for(let j=f.d.sk.length-1;j>=0;j--){
        const s=f.d.sk[j];
        if((s.ult?f.ug<100:f.cds[j]>0)||(s.c&&!s.c(f,t)))continue;
        if(!s.u&&(lock>0||F.filter(x=>x.cast).length>=(F.length>3?3:1)))continue;
        f.cast={j,t:0,s};SFX(s.ult?'ult':'cast');bn={txt:s.n,d:f.d,side:i,t:0,ult:s.ult};break;
      }
    }
  });

  if((U&&F.length<4)||TSTOP||MAD||CIN)return;
  HZ=HZ.filter(h=>{
    h.t+=dt;const EN=F.filter(x=>x!=h.o&&!x.dead),t=tgt(h.o)||h.o;if(HZX[h.k])return HZX[h.k](h,dt,EN,t);
    if(h.k=='gey'){
      let last=0;h.sp.forEach(q=>{last=Math.max(last,q.dl);if(!q.done&&h.t>=q.dl){q.done=1;SFX('slam');shake=Math.max(shake,7);
        for(let i=0;i<16;i++)fireP(q.x+rnd(-12,12),q.y,rnd(-60,60),rnd(-420,-200),rnd(10,18),rnd(.5,.9),PAL.magma);for(let i=0;i<8;i++)rockP(q.x,q.y,rnd(0,TAU),rnd(60,160));
        FX.push({k:'pillar',x:q.x,y:q.y,c:h.o.d.col,l:.55,m:.55});FX.push({k:'scorch',x:q.x,y:q.y,r:44,l:2.5,m:2.5,c:'#ff5a1f'});
        EN.forEach(e=>{if(e.hid||e.jump||h.hs.includes(e))return;if(Math.hypot(e.x-q.x,e.y-q.y)<46+e.r*.5){h.hs.push(e);hurt(e,10,h.o,e.x,e.y,0,1)}})}});
      return h.t<last+.3;
    }
    if(h.k=='pool'){
      h.tk+=dt;emit(10,dt,()=>fireP(h.x+rnd(-h.r*.7,h.r*.7),h.y+rnd(-h.r*.5,h.r*.5),0,rnd(-60,-20),rnd(5,9),rnd(.4,.7),PAL.magma));
      if(h.tk>=.6){h.tk=0;EN.forEach(e=>{if(!e.hid&&!e.jump&&Math.hypot(e.x-h.x,e.y-h.y)<h.r){hurt(e,2,h.o,e.x,e.y,0,0);e.slow=.5}})}
      return h.t<h.dur;
    }
    if(h.k=='maw'){
      const e=h.e;if(e.dead)return false;
      if(h.t<.7){h.x=e.x;h.y=e.y;emit(30,dt,()=>fireP(h.x+rnd(-50,50),h.y+rnd(-30,30),0,rnd(-80,-30),rnd(6,10),rnd(.3,.5),PAL.magma));if(Math.random()<dt*10)shake=Math.max(shake,4)}
      else if(!h.done&&h.t>=.95){h.done=1;SFX('gulp');shake=Math.max(shake,20);hs=.12;
        if(!e.hid&&!e.jump&&Math.hypot(e.x-h.x,e.y-h.y)<85){hurt(e,17,h.o,e.x,e.y,0,1);e.stn=.6;e.burn=1;const hv=Math.min(4,100-h.o.hp);if(hv>0){h.o.hp+=hv;ft(h.o.x,h.o.y-h.o.r-10,'+'+Math.round(hv),'#ffd27a',24)}ft(e.x,e.y-e.r-40,'와작!',h.o.d.hi,34)}
        for(let i=0;i<30;i++)fireP(h.x,h.y,rnd(-300,300),rnd(-300,100),rnd(10,20),rnd(.4,.8),PAL.magma);for(let i=0;i<14;i++)rockP(h.x,h.y,rnd(0,TAU),rnd(100,260))}
      return h.t<1.6;
    }
    if(h.k=='decoy'){
      if(h.tg&&!h.tg.dead&&!h.tg.hid){h.x=h.tg.x;h.y=h.tg.y}
      if(h.t>=h.dur&&!h.boom){h.boom=1;for(let i=0;i<26;i++){const a=rnd(0,TAU),v=rnd(80,260);petalP(h.x,h.y,Math.cos(a)*v,Math.sin(a)*v)}ring(h.x,h.y,8,90,h.o.d.col,8,.4);SFX('slam');EN.forEach(e=>{if(!e.hid&&!e.jump&&Math.hypot(e.x-h.x,e.y-h.y)<90)hurt(e,7,h.o,e.x,e.y,0,1)})}
      return !h.boom;
    }
    if(h.k=='wall'){
      const pos=h.x0+h.sg*h.t*420;h.pos=pos;
      EN.forEach(e=>{if(e.hid||e.jump)return;const inb=h.ax?Math.abs(e.x-pos)<34+e.r:Math.abs(e.y-pos)<34+e.r;if(!inb)return;if(!h.hs.includes(e)){h.hs.push(e);hurt(e,12,h.o,e.x,e.y,0,1);ft(e.x,e.y-e.r-30,'도배!',h.o.d.hi,26)}if(h.ax)e.x=clamp(e.x+h.sg*420*dt,e.r,A-e.r);else e.y=clamp(e.y+h.sg*420*dt,e.r,A-e.r)});
      return h.t<(A+80)/420;
    }
    if(h.k=='nana'){
      if(h.t<h.fl)return true;if(!h.dn){h.dn=1;spark(h.x,h.y,'dust',4,80)}
      for(const e of EN){if(e.hid||e.jump)continue;if(Math.hypot(e.x-h.x,e.y-h.y)<e.r+14){hurt(e,6,h.o,e.x,e.y,0,0);e.slide=.9;e.cast=null;e.gcd=Math.max(e.gcd,.9);e.rush=0;e.auto=0;e.br=0;const a=Math.atan2(e.dy,e.dx)+rnd(-.7,.7);e.dx=Math.cos(a);e.dy=Math.sin(a);ft(e.x,e.y-e.r-30,'미끄덩!','#ffd43b',26);SFX('spit');return false}}
      return h.t<h.life;
    }
    if(h.k=='smoke'){
      EN.forEach(e=>{if(!e.hid&&Math.hypot(e.x-h.x,e.y-h.y)<h.r){e.slow=Math.max(e.slow,.15);e.gcd=Math.max(e.gcd,.15)}});
      emit(16,dt,()=>{const a=rnd(0,TAU),r=rnd(0,h.r*.8);Pt.push({x:h.x+Math.cos(a)*r,y:h.y+Math.sin(a)*r,vx:rnd(-12,12),vy:rnd(-12,12),l:rnd(.8,1.3),m:1.3,sh:3,col:'#9aa0ad',r:rnd(18,28),gr:10,a0:.45,fr:.5})});
      if(!h.shot&&h.t>=.7){h.shot=1;const e=tgt(h.o);if(e&&!e.hid){const a=ang(h.o,e);shoot(h.o,a,1400,14,'hs',0,6);FX.push({k:'muz',x:h.o.x+Math.cos(a)*(h.o.r+6),y:h.o.y+Math.sin(a)*(h.o.r+6),a,l:.08,m:.08});}}
      return h.t<h.dur;
    }
    if(h.k=='ape'){
      const e=h.e;if(h.t<0)return true;if(e.dead)return false;
      if(h.t>=h.dur&&!h.hit){h.hit=1;if(!e.hid&&!e.jump){hurt(e,3,h.o,e.x,e.y,0,0);ft(e.x+rnd(-20,20),e.y-e.r-24,'우끼!',h.o.d.hi,22)}spark(e.x,e.y,'dust',6,160);shake=Math.max(shake,5);SFX('slam')}
      return h.t<h.dur+.25;
    }
    if(h.k=='lock'){
      const e=h.e;if(e.dead)return false;
      if(h.t>=h.ch&&!h.fired){h.fired=1;FX.push({k:'rail',x:h.o.x,y:h.o.y,x2:e.x,y2:e.y,c:h.o.d.col,l:.4,m:.4});FX.push({k:'frost',l:.12,m:.12,c:'#ffffff'});SFX('beam');shake=Math.max(shake,16);if(!e.hid)hurt(e,24,h.o,e.x,e.y,0,1)}
      return h.t<h.ch+.3;
    }
    if(h.k=='ink'){
      const dr=.45;
      if(h.t>=dr&&!h.on){h.on=1;SFX('slam');shake=Math.max(shake,7);h.pts.forEach((q,i)=>{if(i%3==0)spark(q[0],q[1],'ink',4,170)})}
      if(h.on&&h.t<dr+.3)EN.forEach(e=>{if(h.hs.includes(e)||e.hid||e.jump)return;for(let i=1;i<h.pts.length;i++){if(segD(e.x,e.y,h.pts[i-1][0],h.pts[i-1][1],h.pts[i][0],h.pts[i][1])<e.r+14){h.hs.push(e);hurt(e,13,h.o,e.x,e.y,0,1);break}}});
      return h.t<1.5;
    }
    if(h.k=='toon'){
      for(let i=0;i<3;i++){const ht=.5+i*.5;if(h.t>=ht&&h.step<=i){h.step=i+1;SFX(i==2?'slam':'heavy');shake=Math.max(shake,i==2?18:10);EN.forEach(e=>{if(!e.hid)hurt(e,i==2?12:7,h.o,e.x,e.y,0,i==2)})}}
      return h.t<2.2;
    }
    if(h.k=='kb'){
      if(!h.up&&h.t>=h.tel){h.up=1;SFX('slam');shake=Math.max(shake,9);h.cells.forEach(([x,y])=>{for(let i=0;i<2;i++)cubeP(x+30,y+30,rnd(0,TAU),rnd(40,120),'#ff3b30')})}
      if(h.up&&h.t<h.tel+h.act)EN.forEach(e=>{if(h.hs.includes(e)||e.hid||e.jump)return;if(h.cells.some(([x,y])=>e.x>x-e.r*.4&&e.x<x+60+e.r*.4&&e.y>y-e.r*.4&&e.y<y+60+e.r*.4)){h.hs.push(e);hurt(e,12,h.o,e.x,e.y,0,1);for(let i=0;i<14;i++)cubeP(e.x,e.y,rnd(0,TAU),rnd(120,300),[e.d.col,e.d.hi,e.d.dk][i%3]);ft(e.x,e.y-e.r-30,'KILLBRICK','#ff3b30',24)}});
      if(h.t>=h.tel+h.act&&!h.down){h.down=1;h.cells.forEach(([x,y])=>{for(let i=0;i<4;i++)cubeP(x+30,y+30,rnd(0,TAU),rnd(60,180),i%2?'#ff3b30':'#9c1a14')})}
      return h.t<h.tel+h.act+.25;
    }
    if(h.k=='brick'){
      if(h.t<h.dl)return true;
      shake=Math.max(shake,10);SFX('slam');ring(h.x,h.y,6,h.r+30,h.pc[2],8,.4);
      for(let i=0;i<12;i++)cubeP(h.x,h.y,rnd(0,TAU),rnd(80,240),h.pc[i%3]);for(let i=0;i<5;i++)dustP(h.x,h.y,rnd(50,110));
      FX.push({k:'crack',x:h.x,y:h.y,r:45,l:2,m:2});
      if(!t.dead&&!t.hid&&!t.jump&&Math.hypot(t.x-h.x,t.y-h.y)<h.r+t.r*.4)hurt(t,5,h.o,t.x,t.y,0,1);
      return false;
    }
    if(h.k=='blaster'){
      if(h.t>=h.ch&&!h.fired){h.fired=1;SFX('beam');shake=Math.max(shake,8)}
      h.hs=h.hs||[];if(h.fired&&h.t<h.ch+.35)EN.forEach(e=>{if(h.hs.includes(e)||e.hid||e.jump)return;if(segD(e.x,e.y,h.x,h.y,h.x+Math.cos(h.a0)*900,h.y+Math.sin(h.a0)*900)<e.r+16){h.hs.push(e);hurt(e,9,h.o,e.x,e.y,0,1)}});
      return h.t<h.ch+.55;
    }
    if(h.k=='quake'){
      const rr=h.t*520;
      emit(70,dt,()=>{const a=rnd(0,TAU),x=h.x+Math.cos(a)*rr,y=h.y+Math.sin(a)*rr;if(x>10&&x<A-10&&y>10&&y<A-10){if(Math.random()<.5)rockP(x,y,a,rnd(30,90));else dustP(x,y,40)}});
      h.hs=h.hs||[];EN.forEach(e=>{if(h.hs.includes(e)||e.hid||e.jump)return;const d=dist(h,e);if(d<=rr+e.r&&d<330){h.hs.push(e);hurt(e,11,h.o,e.x,e.y,0,1);e.stn=.45;const a=Math.atan2(e.y-h.y,e.x-h.x);e.dx=Math.cos(a);e.dy=Math.sin(a)}});
      return rr<340;
    }
    if(h.k=='floor'){
      h.fl=Math.max(0,h.fl-dt*3);
      EN.forEach(e=>{if(!e.hid){e.x=clamp(e.x+Math.cos(h.dir)*150*dt,e.r,A-e.r);e.y=clamp(e.y+Math.sin(h.dir)*150*dt,e.r,A-e.r)}});
      h.nb-=dt;
      if(h.nb<=0&&h.beats<7){
        h.nb=.55;h.beats++;h.fl=1;h.dir+=rnd(1.8,3.6);shake=Math.max(shake,8);ring(A/2,A/2,40,420,h.o.d.hi,6,.45);{const fn='floor'+(h.beats);if(hasS(fn))SFX(fn)}
        const last=h.beats==7;
        if(last){FX.push({k:'frost',l:.18,m:.18,c:'#ffffff'});shake=20;hs=.1;ring(A/2,A/2,20,520,'#ffffff',14,.6)}
        EN.forEach(e=>{if(e.hid||e.dead)return;hurt(e,last?10:3,h.o,e.x,e.y,0,last);ring(e.x,e.y,6,last?150:90,h.o.d.col,last?14:8,.4);ft(e.x,e.y-e.r-34,['BOOM','BAP','BOOM','BAP','BOOM','BAP','DROP!'][h.beats-1],h.o.d.hi,last?44:26)});
        for(let i=0;i<6;i++)Pt.push({x:rnd(40,A-40),y:rnd(40,A-40),vx:0,vy:-60,l:.8,m:.8,sh:9,col:['#ffe08a','#ff5fa2','#7fd6ff'][i%3],r:22,txt:Math.random()<.5?'♪':'♫'});
      }
      return h.t<h.dur;
    }
    if(h.k=='dragon'){
      const hs=h.t*h.sp,[hx,hy]=dpos(h,hs),[tx2,ty2]=dpos(h,Math.max(0,hs-260));
      emit(160,dt,()=>{const q=hs-rnd(0,280);if(q<0)return;const [x,y]=dpos(h,q);fireP(x+rnd(-8,8),y+rnd(-8,8),rnd(-30,30),rnd(-30,30),rnd(8,15),rnd(.35,.6),PAL.drg)});
      emit(60,dt,()=>fireP(hx+h.ux*36,hy+h.uy*36,h.ux*260+rnd(-60,60),h.uy*260+rnd(-60,60),rnd(10,16),rnd(.25,.4),PAL.drg));
      if(!h.hit&&!t.dead&&segD(t.x,t.y,tx2,ty2,hx,hy)<62){h.hit=1;const sh=t.shield>0;hurt(t,18,h.o,t.x,t.y,0,1);FX.push({k:'boom',x:t.x,y:t.y,r:110,pal:PAL.drg,l:.5,m:.5});if(!sh&&!t.dead){t.dx=h.ux;t.dy=h.uy;t.burn=2;t.cast=null;t.br=0}}
      if(Math.random()<dt*6)shake=Math.max(shake,5);
      return hs<h.len+340;
    }
    if(h.k=='nova'){
      const rr=h.t*620;
      if(!h.done&&!t.dead&&rr>=Math.hypot(t.x-h.x,t.y-h.y)){
        h.done=1;const sh=t.shield>0;hurt(t,22,h.o,t.x,t.y,1,1);
        if(!sh&&!t.dead){t.frz=1.4;t.cast=null;t.dash=0;spark(t.x,t.y,'ice',34,380);ring(t.x,t.y,t.r,t.r+70,'#e3f6ff',8,.6)}
      }
      if(rr<760){
        emit(70,dt,()=>{const a=rnd(0,TAU),sx=h.x+Math.cos(a)*rr,sy=h.y+Math.sin(a)*rr;if(sx>15&&sx<A-15&&sy>15&&sy<A-15)FX.push({k:'spk',x:sx,y:sy,s:rnd(.55,1.1),a:rnd(-.35,.35),l:1.3,m:1.3})});
        emit(50,dt,()=>{const a=rnd(0,TAU);mistP(h.x+Math.cos(a)*rr,h.y+Math.sin(a)*rr,rnd(12,20),rnd(.4,.7))});
      }
      return rr<900;
    }
    if(h.k=='met'&&!h.v){const q=(h.t/h.dl)**2,mx=h.x+(1-q)*180,my=h.y-(1-q)*480;emit(90,dt,()=>fireP(mx+rnd(-10,10),my+rnd(-10,10),rnd(-40,40)+60,rnd(-40,40)-150,rnd(14,24),rnd(.3,.5)));emit(20,dt,()=>smokeP(mx,my,rnd(10,16),rnd(.8,1.2)))}
    if(h.t<h.dl)return true;
    ring(h.x,h.y,10,h.r+34,h.o.d.hi,9,.5);ring(h.x,h.y,6,h.r,h.o.d.col,16,.4);
    spark(h.x,h.y,h.v?'elec':'fire',28,440);spark(h.x,h.y,'dust',8,260);shake=Math.max(shake,13);FX.push({k:'boom',x:h.x,y:h.y,r:h.r*2.2,pal:h.v?PAL.elec:PAL.fire,l:.45,m:.45});for(let i=0;i<12;i++)emberP(h.x,h.y,h.v?'#fff3a0':'#ffd36b');
    FX.push({k:'scorch',x:h.x,y:h.y,r:h.r,l:4,m:4,c:h.v?'#ffe45c':'#ff6a1c'});if(h.v){FX.push({k:'bolt',x:h.x,y:h.y,l:.35,m:.35});FX.push({k:'frost',l:.25,m:.25,c:'#fff'})}
    if(!t.dead&&Math.hypot(t.x-h.x,t.y-h.y)<h.r+t.r*.5){const sh=t.shield>0;hurt(t,h.dmg,h.o,t.x,t.y,0,1);if(!sh&&!t.dead){if(h.v)t.stn=.7;else t.burn=1.5}}
    return false;
  });
  for(let ii=0;ii<F.length;ii++)for(let jj=ii+1;jj<F.length;jj++){const a=F[ii],b=F[jj];if(a.dead||b.dead)continue;
  const dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy)||1;
  if(d<a.r+b.r&&!a.hid&&!b.hid&&!a.jump&&!b.jump){
    const nx=dx/d,ny=dy/d,ov=a.r+b.r-d;
    const wa=b.d.heavy&&!a.d.heavy?.85:a.d.heavy&&!b.d.heavy?.15:.5;
    a.x-=nx*ov*wa;a.y-=ny*ov*wa;b.x+=nx*ov*(1-wa);b.y+=ny*ov*(1-wa);
    const hv=a.d.heavy&&!b.d.heavy?a:b.d.heavy&&!a.d.heavy?b:null;
    if(hv&&!(hv.bc>0)){const lt=hv==a?b:a,ba=ang(hv,lt);hv.bc=1.2;if(hv.d.heavy>1)lt.burn=.6;lt.dx=Math.cos(ba);lt.dy=Math.sin(ba);hurt(lt,2,hv,(a.x+b.x)/2,(a.y+b.y)/2,0,0);ft(lt.x,lt.y-lt.r-30,'쿵!',hv.d.hi,22);ring(lt.x,lt.y,6,60,hv.d.col,6,.3)}
    const da=a.dx*nx+a.dy*ny;if(da>0){a.dx-=2*da*nx;a.dy-=2*da*ny}
    const db=b.dx*nx+b.dy*ny;if(db<0){b.dx-=2*db*nx;b.dy-=2*db*ny}
    const mx=(a.x+b.x)/2,my=(a.y+b.y)/2;
    spark(mx,my,'dust',8,200);ring(mx,my,4,24,'#cfd5e2',3,.25);shake=Math.max(shake,4);
    a.sq=b.sq=1;a.sa=b.sa=Math.atan2(ny,nx);
    [[a,b],[b,a]].forEach(([x,y])=>{if(x.dash>0&&!x.hit){x.hit=1;x.dash=.1;const br=y.shield>0;if(br){y.shield=0;spark(mx,my,'ice',20,360);ring(y.x,y.y,y.r,y.r+60,'#e3f6ff',5,.5)}hurt(y,br?6:10,x,mx,my,0,1)}});
  }}

  B=B.filter(q=>{
    if(q.boom){if(q.age>.6&&!q.back){q.back=1;q.hs=[]}if(q.back){if(q.o.dead)return false;const a=Math.atan2(q.o.y-q.y,q.o.x-q.x);q.vx=Math.cos(a)*600;q.vy=Math.sin(a)*600;q.a=a;if(Math.hypot(q.o.y-q.y,q.o.x-q.x)<q.o.r)return false}}
    if(q.home&&tgt(q.o)){const t2=tgt(q.o);let da=Math.atan2(t2.y-q.y,t2.x-q.x)-q.a;da=Math.atan2(Math.sin(da),Math.cos(da));q.a+=clamp(da,-1.5*dt,1.5*dt);const v=Math.hypot(q.vx,q.vy);q.vx=Math.cos(q.a)*v;q.vy=Math.sin(q.a)*v}
    if(q.k=='chat'){const v=Math.hypot(q.vx,q.vy)||1,nv=Math.min(380,v+420*dt);q.vx*=nv/v;q.vy*=nv/v}
    q.age+=dt;q.x+=q.vx*dt;q.y+=q.vy*dt;
    trail(q,dt);
    for(const t of F){if(t==q.o||t.dead||t.hid||t.jump)continue;if(Math.hypot(q.x-t.x,q.y-t.y)<t.r+q.r){if(q.boom){if(!q.hs.includes(t)){q.hs.push(t);hurt(t,q.dmg,q.o,q.x,q.y,0,0)}continue}hurt(t,q.dmg,q.o,q.x,q.y,q.slow,0);if(q.k=='hs'){ft(t.x,t.y-t.r-44,'HEADSHOT','#ff4655',30);FX.push({k:'burst',x:t.x,y:t.y,c:'#ff4655',a:0,l:.3,m:.3})}return false}}
    if(q.bnc>0)bounceB(q);
    if(!q.boom&&(q.x<0||q.x>A||q.y<0||q.y>A)){spark(clamp(q.x,0,A),clamp(q.y,0,A),q.o.d.k,5,140);return false}
    return true;
  });
}
;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ▶ 섹션 : core2
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function update(dt){
  clock+=dt;AM.forEach(m=>{m.y-=m.s*dt;m.x+=Math.sin(clock+m.p)*8*dt;if(m.y<-5){m.y=A+5;m.x=rnd(0,A)}});
  const sm=SLOW>0?.3:1;if(SLOW>0)SLOW-=dt;zk*=Math.pow(.015,dt);const sdt=hs>0?0:dt*ts*sm,fdt=dt*ts*sm*(hs>0?.2:1);
  if(hs>0)hs-=dt;
  Pt=Pt.filter(p=>{if(p.vz!=null){p.vz-=1100*fdt;p.z+=p.vz*fdt;if(p.z<0){p.z=0;p.vz=-p.vz*.35;if(p.vz<40)p.vz=0;p.vx*=.55;p.vy*=.55;p.vr*=.5}}p.vy+=(p.gy||0)*fdt;if(p.gr)p.r=Math.max(.5,p.r+p.gr*fdt);p.x+=p.vx*fdt;p.y+=p.vy*fdt;p.rot=(p.rot||0)+(p.vr||0)*fdt;const f=Math.pow(p.fr||.04,fdt);p.vx*=f;p.vy*=f;p.l-=fdt;return p.l>0});
  T=T.filter(x=>{if(x.vy!=null){x.vy+=430*fdt;x.vx*=Math.pow(.15,fdt);x.x+=x.vx*fdt;x.y+=x.vy*fdt}else x.y-=40*fdt;x.l-=fdt*1.05;return x.l>0});
  FX=FX.filter(x=>{x.l-=fdt;if(x.l<=0&&x.k=='spk')for(let i=0;i<3;i++)shardP(x.x,x.y-10,rnd(-80,80),rnd(-160,-40),rnd(2,4));return x.l>0});
  if(bn){bn.t+=dt;if(bn.t>1.5)bn=null}
  F.forEach(f=>{f.show+=(f.hp-f.show)*Math.min(1,fdt*3)});
  shake*=Math.pow(.003,dt);
  if(fight>0)fight-=dt;
  if(phase=='menu'&&Math.floor(clock*4)!=Math.floor((clock-dt)*4)){try{const tot=SND.length+4,ok=Object.keys(AUD).filter(k=>AUD[k].ok||(typeof GB!='undefined'&&(GB[k]||(window.GRAW&&GRAW[k])))).length,pr=(typeof location!='undefined'?location.protocol:'?');
    $('#sdbg').textContent=!AC?'화면을 한 번 터치하면 사운드가 켜져요\n실행 주소: '+pr:('사운드 '+ok+'/'+tot+' 준비됨'+(MUTE?' · 음소거 중':'')+(AC.state!='running'?' · 오디오 '+AC.state:'')+'\n실행 주소: '+pr+(AERR&&!ok?' · 읽기 실패 '+AERR+'개':'')+(SERR&&!ok?'\n'+SERR.slice(0,60):'')+(AUD.gun?'\n찾는 위치: '+decodeURI(AUD.gun.pool[0].src):''))}catch(e){}}
  if(UNL&&!PREVB){const bg=phase=='menu'||phase=='demo'?'bgm_menu':phase=='tour'?'':phase=='champ'?'bgm_final':TOURM?(TOURM.final?'bgm_final':'bgm_tour'):'bgm_battle';if(BGMn!=bg)playBGM(bg)}
  if(phase=='cd'){
    tm-=dt;cine+=((tm>3?1:0)-cine)*Math.min(1,dt*6);
    if(!vsd&&tm<3.42){vsd=1;SFX('vs');shake=Math.max(shake,16)}
    const n=Math.ceil(tm);if(tm<3&&n>0&&n!=cdN){if(!cdN)SFX('cd');cdN=n;shake=Math.max(shake,9);ring(A/2,A/2,40,300,'#fff',6,.5)}
    if(tm<=0&&TOURM){for(let i=0;i<(TOURM.final?160:70);i++)Pt.push({x:rnd(0,A),y:rnd(-200,0),vx:rnd(-40,40),vy:rnd(60,220),l:rnd(1.5,2.6),m:2.6,sh:2,col:['#f2c94c','#ffe9a3','#b8860b','#ffffff'][i%4],r:rnd(3,6),rot:rnd(0,TAU),vr:rnd(-10,10),gy:60,fr:.6})}
    if(tm<=0){phase='play';SFX('go');fight=.9;shake=18;FX.push({k:'frost',l:.3,m:.3,c:'#fff'});ring(A/2,A/2,20,420,'#ffd24a',16,.6)}
  }
  else if(phase=='menu'){F.forEach(f=>{f.rot+=dt*(f.i?-1.6:1.6)})}
  else if(phase=='play'||phase=='demo'){
    if(phase=='demo'&&DEMO)demoTick(dt);
    step(sdt);
    if(TSTOP){
      const T2=TSTOP,o2=T2.o;T2.t+=dt;T2.tp=T2.tp||0;
      const EN=F.filter(x=>x!=o2&&!x.dead);
      T2.ne=T2.ne||Math.max(1,EN.length);
      if(EN.length&&T2.tp<4*T2.ne&&T2.t>.55+T2.tp*.42/T2.ne){
        const e=EN[T2.tp%EN.length],ba=rnd(0,TAU);FX.push({k:'ghost',x:o2.x,y:o2.y,r:o2.r,c:o2.d.col,l:.7,m:.7});
        o2.x=clamp(e.x+Math.cos(ba)*125,o2.r,A-o2.r);o2.y=clamp(e.y+Math.sin(ba)*125,o2.r,A-o2.r);FX.push({k:'tsr',x:o2.x,y:o2.y,l:.25,m:.25});
        for(let q=0;q<4;q++){const a=ba+Math.PI+(q-1.5)*.5+T2.tp*.4,rr=q%2?102:74;T2.kn.push({x0:o2.x,y0:o2.y,x:e.x+Math.cos(a)*rr,y:e.y+Math.sin(a)*rr,t:-q*.05,tg:e})}
        T2.tp++;SFX('knife');shake=Math.max(shake,4);
      }
      T2.kn.forEach(k=>k.t+=dt);
      if(T2.t>=T2.dur){
        T2.kn.forEach(k=>{const e=k.tg.dead?tgt(o2):k.tg;if(!e)return;const a=Math.atan2(e.y-k.y,e.x-k.x);B.push({x:k.x,y:k.y,vx:Math.cos(a)*900,vy:Math.sin(a)*900,a,o:o2,dmg:1.5,k:'knife',slow:0,r:8,age:0,D:o2.d})});
        TSTOP=null;EN.forEach(e=>ft(e.x,e.y-e.r-40,'시간 재개',o2.d.hi,28));shake=14;FX.push({k:'tsr',x:o2.x,y:o2.y,l:.5,m:.5});FX.push({k:'frost',l:.15,m:.15,c:'#ffffff'});
      }
    }
    if(MAD){
      const M2=MAD,o2=M2.o;M2.t+=dt;M2.sh=M2.sh||0;const EN=F.filter(x=>x!=o2&&!x.dead),tot=5;
      if(EN.length&&M2.sh<tot&&M2.t>.5+M2.sh*.42){
        const e=EN[M2.sh%EN.length],ba=rnd(0,TAU),dd=rnd(120,230);FX.push({k:'ghost',x:o2.x,y:o2.y,r:o2.r,c:o2.d.col,l:.5,m:.5});
        o2.x=clamp(e.x+Math.cos(ba)*dd,o2.r,A-o2.r);o2.y=clamp(e.y+Math.sin(ba)*dd,o2.r,A-o2.r);
        const a=ang(o2,e)+rnd(-.2,.2),ex=o2.x+Math.cos(a)*900,ey=o2.y+Math.sin(a)*900,hit=!e.hid&&segD(e.x,e.y,o2.x,o2.y,ex,ey)<e.r;
        FX.push({k:'muz',x:o2.x+Math.cos(a)*(o2.r+6),y:o2.y+Math.sin(a)*(o2.r+6),a,l:.08,m:.08});
        FX.push({k:'trc',x:o2.x,y:o2.y,x2:hit?e.x:ex,y2:hit?e.y:ey,c:o2.d.col,l:.22,m:.22});M2.sh++;SFX('gun');
        if(hit){M2.cuts++;hurt(e,7,o2,e.x,e.y,0,1);spark(e.x,e.y,'rose',14,260);M2.kf.push({at:M2.t,n:e.d.name,txt:M2.cuts>=5?'ACE':M2.cuts+'K'});zk=1.8;zx=e.x;zy=e.y}
        else ft(e.x,e.y-e.r-30,'MISS','#9aa0ad',22);
      }
      if(M2.sh>=tot&&M2.t>=.5+tot*.42+.7){MAD=null;FX.push({k:'tsr',x:o2.x,y:o2.y,l:.4,m:.4})}
    }
    const U=F.find(f=>f.cast&&f.cast.s.ult);
    const U4=U&&F.length<4;cine+=((U4?1:0)-cine)*Math.min(1,dt*6);cz+=((U4?1.22:1)-cz)*Math.min(1,dt*5);
    cfx+=((U?U.x:A/2)-cfx)*Math.min(1,dt*5);cfy+=((U?U.y:A/2)-cfy)*Math.min(1,dt*5);
  }
  else if(phase=='end'){
    endT+=dt;winTick(dt);F.forEach(f=>f.ghost=0);B=[];HZ=[];cine*=Math.pow(.02,dt);
    if(endT>1.2)ts=Math.min(1,ts+dt*.8);
    cz+=(1.3-cz)*Math.min(1,dt*2);
    const l=KO||F.find(f=>f.dead);cfx+=(l.x-cfx)*Math.min(1,dt*2);
    if(endT>1.9&&!shown){shown=1;
      if(TOURM){const wE=win.i==0?TOURM.a:TOURM.b,rr=TOURM.r,mm=TOURM.m;TOUR.rounds[rr+1][mm]=wE;TOUR.m++;if(TOUR.m>=TOUR.rounds[TOUR.r].length/2){TOUR.r++;TOUR.m=0}
        $('#mt').innerHTML='<small>'+(TOURM.final?'GRAND FINAL':rname(rr)+' · '+(mm+1)+'경기')+'</small>'+win.d.name;$('#mt').style.color='#f2c94c';
        $('#go').style.display=$('#home').style.display='none';$('#tnext').style.display='';$('#tnext').textContent=TOUR.rounds[TOUR.r].length==1?'CHAMPION':'BRACKET';}
      else{$('#mt').innerHTML='<small>WINNER</small>'+win.d.name;$('#mt').style.color=win.d.hi;$('#go').style.display=$('#home').style.display='';$('#tnext').style.display='none'}
      $('#msg').className='on'}
  }
  if(F.length<4)F.forEach((f,i)=>{
    $('#p'+i+' .bar i').style.width=f.hp+'%';
    $('#p'+i+' .bar u').style.width=f.show+'%';
    $('#n'+i).textContent=Math.ceil(f.hp);$('#p'+i).classList.toggle('dead',!!f.dead);$('#p'+i).classList.toggle('low',!f.dead&&f.hp<=25);$('#p'+i+' .ug i').style.width=f.ug+'%';$('#p'+i+' .ug').classList.toggle('full',f.ug>=100);
    f.d.sk.forEach((s,j)=>{CH[i][j].style.height=(s.ult?100-f.ug:clamp(f.cds[j]/s.cd,0,1)*100)+'%';if(s.ult)CH[i][j].parentNode.classList.toggle('rdy',f.ug>=100)});
  });
}

function flame(s,fl){
  g.beginPath();g.moveTo(11*s,0);
  g.bezierCurveTo(11*s,-9*s,2*s,-11*s,-6*s,-8*s);
  g.quadraticCurveTo(-20*s,-6*s+fl*3*s,-34*s,fl*5*s);
  g.quadraticCurveTo(-20*s,6*s+fl*3*s,-6*s,8*s);
  g.bezierCurveTo(2*s,11*s,11*s,9*s,11*s,0);g.fill();
}
function bullet(q){
  if(BUL[q.k]){g.save();g.translate(q.x,q.y);BUL[q.k](q);g.restore();return}
  const D=q.D;
  g.save();g.translate(q.x,q.y);
  if(q.k=='flame'){
    g.save();g.globalCompositeOperation='lighter';glow('#ff6a1c',0,0,46,.55);glow('#ffd36b',0,0,22,.9);g.restore();
    g.rotate(q.a);const fl=Math.sin(q.age*38);
    g.fillStyle='#c2321a';flame(1.25,fl);g.fillStyle='#ff8a2c';flame(.95,-fl);g.fillStyle='#ffd36b';flame(.62,fl);g.fillStyle='#fff6d0';flame(.32,-fl);
  }else if(q.k=='lance'){
    g.save();g.globalCompositeOperation='lighter';g.rotate(q.a);g.scale(1.9,.8);glow('#7fd0ff',0,0,24,.55);g.restore();
    g.rotate(q.a);
    const O=[[30,0],[8,-8],[-22,-5],[-32,0],[-22,5],[8,8]];
    poly(O);g.lineWidth=4;g.strokeStyle='#0d2c44';g.lineJoin='round';g.stroke();
    poly([[30,0],[8,-8],[-22,-5],[-32,0]]);g.fillStyle='#effaff';g.fill();
    poly([[30,0],[8,8],[-22,5],[-32,0]]);g.fillStyle='#6fbfe8';g.fill();
    g.strokeStyle='#ffffff';g.lineWidth=1.5;g.beginPath();g.moveTo(28,0);g.lineTo(-30,0);g.stroke();
    g.strokeStyle='#bfe9ff';g.beginPath();g.moveTo(8,-8);g.lineTo(4,0);g.lineTo(8,8);g.stroke();
    const sx=((q.age*160)%90)-45;
    g.save();poly(O);g.clip();g.fillStyle='#ffffffcc';g.beginPath();g.moveTo(sx,-10);g.lineTo(sx+6,-10);g.lineTo(sx-2,10);g.lineTo(sx-8,10);g.fill();g.restore();
    [[-40,-6,.5],[-46,5,.4]].forEach(([x,y,c])=>{g.save();g.translate(x+Math.sin(q.age*20)*1.5,y);g.scale(c,c);poly([[10,0],[0,-5],[-10,0],[0,5]]);g.fillStyle='#d6f3ff';g.fill();g.restore()});
  }else if(q.k=='bolt'){
    g.save();g.globalCompositeOperation='lighter';glow('#9a63f2',0,0,40,.6);glow('#ffe45c',0,0,22,.9);
    g.globalAlpha=1;g.strokeStyle='#fff6b0';g.lineWidth=2;g.lineJoin='round';
    for(let j=0;j<3;j++){let a=rnd(0,TAU),r=6;g.beginPath();g.moveTo(Math.cos(a)*r,Math.sin(a)*r);for(let z=0;z<4;z++){a+=rnd(-.6,.6);r+=rnd(4,7);g.lineTo(Math.cos(a)*r,Math.sin(a)*r)}g.stroke()}
    g.restore();
    g.fillStyle='#fff';g.beginPath();g.arc(0,0,6,0,TAU);g.fill();
  }else if(q.k=='shot'){
    g.rotate(q.a);
    g.save();g.globalCompositeOperation='lighter';g.save();g.scale(2.6,.6);glow(D.col,-8,0,26,.7);g.restore();glow(D.hi,4,0,16,.9);g.restore();
    const L=48;g.lineCap='round';
    g.strokeStyle=D.col;g.lineWidth=7;g.beginPath();g.moveTo(-L,0);g.lineTo(10,0);g.stroke();
    g.strokeStyle='#ffffff';g.lineWidth=2.5;g.beginPath();g.moveTo(-L+6,0);g.lineTo(12,0);g.stroke();
    poly([[22,0],[10,-7],[4,0],[10,7]]);g.fillStyle=D.hi;g.fill();g.lineWidth=2;g.strokeStyle=D.dk;g.stroke();
    g.save();g.translate(-14,0);g.scale(.35,1);g.strokeStyle=D.hi;g.lineWidth=2.5;g.beginPath();g.arc(0,0,10+Math.sin(q.age*30)*2,0,TAU);g.stroke();g.restore();
  }else if(q.k=='heart'){
    g.save();g.globalCompositeOperation='lighter';glow(D.col,0,0,30,.6);g.restore();
    g.rotate(Math.sin(q.age*8)*.3);const hs2=1.25+Math.sin(q.age*14)*.12;g.scale(hs2,hs2);
    heartPath();g.lineWidth=5;g.lineJoin='round';g.strokeStyle=D.dk;g.stroke();
    heartPath();const hg=g.createLinearGradient(0,-12,0,6);hg.addColorStop(0,D.hi);hg.addColorStop(1,D.col);g.fillStyle=hg;g.fill();
    g.fillStyle='#ffffffcc';g.beginPath();g.ellipse(-5,-8,2.6,1.6,-.6,0,TAU);g.fill();
  }else if(q.k=='tracer'||q.k=='hs'){
    g.rotate(q.a);g.save();g.globalCompositeOperation='lighter';g.scale(q.k=='hs'?4:2.2,.5);glow(q.k=='hs'?'#ff4655':D.col,-6,0,12,.9);g.restore();
    g.strokeStyle=q.k=='hs'?'#ffffff':'#fff6d0';g.lineWidth=2.4;g.lineCap='round';g.beginPath();g.moveTo(-22,0);g.lineTo(6,0);g.stroke();
  }else if(q.k=='chat'){
    const w=Math.max(34,q.txt.length*13+16),h2=24,sc2=back(clamp((q.age+.6)/.25,0,1));g.scale(sc2,sc2);
    g.save();g.globalCompositeOperation='lighter';glow(D.col,0,0,30,.4);g.restore();
    g.fillStyle='#ffffff';g.strokeStyle=D.col;g.lineWidth=2.5;g.lineJoin='round';
    g.beginPath();g.moveTo(-w/2+6,-h2/2);g.lineTo(w/2-6,-h2/2);g.quadraticCurveTo(w/2,-h2/2,w/2,-h2/2+6);g.lineTo(w/2,h2/2-6);g.quadraticCurveTo(w/2,h2/2,w/2-6,h2/2);g.lineTo(-w/2+16,h2/2);g.lineTo(-w/2+6,h2/2+8);g.lineTo(-w/2+8,h2/2);g.lineTo(-w/2+6,h2/2);g.quadraticCurveTo(-w/2,h2/2,-w/2,h2/2-6);g.lineTo(-w/2,-h2/2+6);g.quadraticCurveTo(-w/2,-h2/2,-w/2+6,-h2/2);g.closePath();g.fill();g.stroke();
    g.fillStyle='#111';g.textAlign='center';g.textBaseline='middle';g.font='700 13px '+FB;g.fillText(q.txt,0,1);
  }else if(q.k=='chair'){
    g.rotate(q.age*14);drawChair();
  }else if(q.k=='arrow'){
    g.rotate(q.a);g.strokeStyle='#d8c9a6';g.lineWidth=2.5;g.beginPath();g.moveTo(-22,0);g.lineTo(14,0);g.stroke();
    poly([[22,0],[12,-5],[14,0],[12,5]]);g.fillStyle='#cfd6e0';g.fill();g.strokeStyle='#2a2f3a';g.lineWidth=1.2;g.stroke();
    g.fillStyle=D.col;poly([[-22,0],[-29,-6],[-18,-1]]);g.fill();poly([[-22,0],[-29,6],[-18,1]]);g.fill();
  }else if(q.k=='card'){
    g.rotate(q.age*18);g.save();g.globalCompositeOperation='lighter';glow(D.col,0,0,22,.5);g.restore();
    g.fillStyle='#fffaf5';g.strokeStyle='#1a0a10';g.lineWidth=1.5;g.beginPath();g.moveTo(-7,-10);g.lineTo(7,-10);g.lineTo(7,10);g.lineTo(-7,10);g.closePath();g.fill();g.stroke();
    g.strokeStyle=D.col;g.lineWidth=1.2;g.strokeRect(-5,-8,10,16);g.fillStyle=D.col;g.beginPath();g.ellipse(0,0,3.4,4.4,0,0,TAU);g.fill();g.fillStyle='#2f7a3a';g.fillRect(-.6,3.5,1.2,4);
  }else if(q.k=='knife'){
    g.rotate(q.a);g.scale(1.3,1.3);drawKnife(D);
  }else{
    g.fillStyle=D.hi;g.beginPath();g.arc(0,0,q.r,0,TAU);g.fill();
  }
  g.restore();
}

function hex(r){g.beginPath();for(let i=0;i<6;i++){const a=i*TAU/6;i?g.lineTo(Math.cos(a)*r,Math.sin(a)*r):g.moveTo(Math.cos(a)*r,Math.sin(a)*r)}g.closePath()}

function ball(f,t){
  if(f.dead||f.hid)return;if(f.ghost&&HZ.some(h=>h.k=='dark'&&h.o==f&&!h.done))return;
  const D=f.d;
  let sc=1;
  if(phase=='cd'){const sp=clamp((3-tm-.2-(F.length>3?.06:.35)*f.i)/.5,0,1);if(sp<=0)return;sc=back(sp)}
  if(f.dash>0&&f.tr.length>1){
    g.lineCap='round';g.lineJoin='round';
    [[D.col,2],[D.hi,1.1]].forEach(([c,wd])=>{
      g.strokeStyle=c;
      for(let i=1;i<f.tr.length;i++){
        g.lineWidth=f.r*wd*i/f.tr.length;g.beginPath();g.moveTo(f.tr[i-1][0],f.tr[i-1][1]);g.lineTo(f.tr[i][0],f.tr[i][1]);g.stroke();
      }
    });
  }
  const jh=f.jump?Math.sin(Math.PI*Math.min(1,f.jump.t/f.jump.dur))*120:0;
  g.fillStyle='#0006';g.beginPath();g.ellipse(f.x+5,f.y+f.r*.9,f.r*.95*sc*(1-jh/250),f.r*.42*sc*(1-jh/250),0,0,TAU);g.fill();
  if(f.rush>0&&t){
    const a=ang(f,t),jt=Math.sin(clock*40)*1.2;g.save();g.translate(f.x-Math.cos(a)*8+jt,f.y-Math.sin(a)*8-36);
    g.save();g.globalCompositeOperation='lighter';glow(D.col,0,-8,95,.6);glow('#b48cff',0,-30,50,.35);g.restore();
    g.globalAlpha=.88;g.lineJoin='round';
    const tg2=g.createLinearGradient(0,-30,0,30);tg2.addColorStop(0,D.col);tg2.addColorStop(1,D.dk);
    [-1,1].forEach(sd=>{const ph=Math.sin(clock*45+sd*1.6),ex=Math.cos(a)*(30+ph*14)+sd*12,ey=Math.sin(a)*(30+ph*14)+6;
      g.strokeStyle=D.dk;g.lineWidth=11;g.lineCap='round';g.beginPath();g.moveTo(sd*28,-18);g.lineTo(ex,ey);g.stroke();
      g.strokeStyle=D.hi;g.lineWidth=2;g.stroke()});
    poly([[-32,-24],[32,-24],[18,28],[-18,28]]);g.fillStyle=tg2;g.fill();g.strokeStyle=D.hi;g.lineWidth=3;g.stroke();
    g.fillStyle=D.dk;g.beginPath();g.arc(-30,-20,11,0,TAU);g.arc(30,-20,11,0,TAU);g.fill();g.stroke();
    g.strokeStyle=D.hi;g.globalAlpha=.55;g.lineWidth=2;g.beginPath();g.moveTo(-14,-10);g.lineTo(14,-10);g.moveTo(0,-22);g.lineTo(0,22);g.moveTo(-12,6);g.lineTo(12,6);g.stroke();
    g.globalAlpha=.9;g.fillStyle=D.dk;g.beginPath();g.arc(0,-42,15,0,TAU);g.fill();g.strokeStyle=D.hi;g.lineWidth=3;g.stroke();
    g.beginPath();g.moveTo(-15,-46);g.lineTo(0,-62);g.lineTo(15,-46);g.stroke();
    g.save();g.globalCompositeOperation='lighter';glow(D.hi,-5,-43,6,1);glow(D.hi,5,-43,6,1);g.restore();
    g.restore();
  }
  g.save();g.translate(f.x,f.y-jh);if(jh)g.scale(1+jh/400,1+jh/400);
  const p=f.cast?f.cast.t/f.cast.s.w:0;
  if(f.cast)g.translate(rnd(-1,1)*p*2,rnd(-1,1)*p*2);
  const fz=1+.38*Math.max(0,f.fat||0)+(f.gulp&&f.gulp.st==1?.05*Math.sin(clock*22):0);g.scale(sc*fz*(1+.025*Math.sin(clock*5+f.i)),sc*fz*(1+.025*Math.sin(clock*5+f.i)));
  g.rotate(f.sa);g.scale((1-.3*f.sq)*(1+.12*p),(1+.22*f.sq)*(1+.12*p));g.rotate(-f.sa);
  const R=f.r;
  g.save();g.globalCompositeOperation='lighter';glow(D.col,0,0,R*1.9,.3);g.restore();
  const bg=g.createRadialGradient(-R*.35,-R*.45,R*.08,0,0,R);bg.addColorStop(0,'#3b4153');bg.addColorStop(.55,'#161922');bg.addColorStop(1,'#07080c');
  g.beginPath();g.arc(0,0,R,0,TAU);g.fillStyle=bg;g.fill();
  g.save();g.beginPath();g.arc(0,0,R,0,TAU);g.clip();
  const rg=g.createRadialGradient(0,0,R*.5,0,0,R*1.02);rg.addColorStop(0,D.col+'00');rg.addColorStop(1,D.col+'b0');g.fillStyle=rg;g.fillRect(-R,-R,R*2,R*2);
  g.rotate(f.rot*.5);g.strokeStyle=D.col;g.globalAlpha=.6;g.lineWidth=1.6;g.beginPath();g.arc(0,0,R*.82,0,1.2);g.stroke();g.beginPath();g.arc(0,0,R*.82,Math.PI,Math.PI+1.2);g.stroke();
  g.restore();
  g.lineWidth=2.5;g.strokeStyle=D.col;g.beginPath();g.arc(0,0,R-1.2,0,TAU);g.stroke();
  g.lineWidth=1.2;g.strokeStyle=D.hi;g.globalAlpha=.7;g.beginPath();g.arc(0,0,R-4.5,-2.7,-.7);g.stroke();g.globalAlpha=1;
  g.fillStyle='rgba(255,255,255,.2)';g.beginPath();g.ellipse(-R*.38,-R*.5,R*.3,R*.13,-.6,0,TAU);g.fill();
  if(f.flash>0){g.globalAlpha=.85;g.fillStyle='#fff';g.beginPath();g.arc(0,0,R,0,TAU);g.fill();g.globalAlpha=1}
  if(f.slow>0){g.globalAlpha=.35;g.fillStyle='#bfe9ff';g.beginPath();g.arc(0,0,R,0,TAU);g.fill();g.globalAlpha=1}
  g.save();g.rotate(f.rot);g.scale(f.r/26,f.r/26);
  if(f.flash<=0){
    if(EMB[D.k])EMB[D.k](f,D);
    else if(D.k=='fire'){g.rotate(-Math.PI/2);g.fillStyle=D.dk;g.translate(6,0);flame(.9,Math.sin(clock*12));g.fillStyle=D.hi;flame(.5,Math.sin(clock*12))}
    else if(D.k=='elec'){g.fillStyle='#ffe45c';g.strokeStyle=D.dk;g.lineWidth=2.5;g.beginPath();g.moveTo(5,-14);g.lineTo(-7,2);g.lineTo(-1,2);g.lineTo(-5,14);g.lineTo(8,-3);g.lineTo(2,-3);g.closePath();g.fill();g.stroke()}
    else if(D.k=='magma'){g.save();g.globalCompositeOperation='lighter';g.strokeStyle='#ff8a2c';g.lineWidth=1.8;g.lineCap='round';g.globalAlpha=.7+.3*Math.sin(clock*4);g.beginPath();g.moveTo(-24,-6);g.lineTo(-14,-2);g.lineTo(-18,8);g.moveTo(22,-10);g.lineTo(13,-4);g.lineTo(18,6);g.lineTo(10,14);g.moveTo(-8,21);g.lineTo(0,15);g.lineTo(8,22);g.stroke();g.restore();
      g.rotate(-f.rot+Math.sin(clock*3)*.04);
      [-9,0,9].forEach((x,i)=>{g.save();g.translate(x,-20-(i==1?3:0));g.rotate(-Math.PI/2);g.fillStyle='#ff5a1f';flame(.38,Math.sin(clock*12+i));g.fillStyle='#ffd27a';flame(.2,Math.sin(clock*12+i));g.restore()});
      neon(D,2.2,()=>{g.beginPath();g.moveTo(-15,-8);g.lineTo(-19,-20);g.lineTo(-8,-14);g.moveTo(15,-8);g.lineTo(19,-20);g.lineTo(8,-14);g.moveTo(-12,-8);g.lineTo(-4,-4);g.moveTo(12,-8);g.lineTo(4,-4);g.moveTo(9,6);g.ellipse(0,6,9,6.5,0,0,TAU);g.moveTo(-8,11);g.quadraticCurveTo(-14,10,-15,2);g.moveTo(8,11);g.quadraticCurveTo(14,10,15,2)});
      g.save();g.globalCompositeOperation='lighter';glow('#ff3d0a',-7,-1,7,1);glow('#ff3d0a',7,-1,7,1);g.restore();
      g.fillStyle='#fff3c4';g.beginPath();g.arc(-7,-1,1.6,0,TAU);g.arc(7,-1,1.6,0,TAU);g.fill()}
    else if(D.k=='dummy'){g.rotate(-f.rot);g.strokeStyle=D.hi;g.lineWidth=2.5;g.beginPath();g.arc(0,0,15,0,TAU);g.stroke();g.beginPath();g.arc(0,0,8,0,TAU);g.stroke();g.fillStyle='#ff4655';g.beginPath();g.arc(0,0,3,0,TAU);g.fill()}
    else if(D.k=='heavy'){g.rotate(-f.rot+Math.sin(clock*3)*.04);
      neon(D,2.2,()=>{g.beginPath();g.moveTo(-15,-8);g.lineTo(-19,-20);g.lineTo(-8,-14);g.moveTo(15,-8);g.lineTo(19,-20);g.lineTo(8,-14);g.moveTo(-12,-8);g.lineTo(-4,-4);g.moveTo(12,-8);g.lineTo(4,-4);g.moveTo(9,6);g.ellipse(0,6,9,6.5,0,0,TAU);g.moveTo(-8,11);g.quadraticCurveTo(-14,10,-15,2);g.moveTo(8,11);g.quadraticCurveTo(14,10,15,2)});
      g.fillStyle=D.hi;g.beginPath();g.ellipse(-3.3,6,1.6,2.4,0,0,TAU);g.ellipse(3.3,6,1.6,2.4,0,0,TAU);g.fill();
      g.save();g.globalCompositeOperation='lighter';glow(D.col,-7,-1,6,1);glow(D.col,7,-1,6,1);g.restore();
      g.fillStyle='#fff';g.beginPath();g.arc(-7,-1,1.5,0,TAU);g.arc(7,-1,1.5,0,TAU);g.fill()}
    else if(D.k=='time'){g.rotate(-f.rot+Math.sin(clock*3)*.04);
      const PX=['..#####..','.#######.','#########','##..#..##','##..#..##','#########','.###.###.','..#.#.#..','..#####..'],u=3.1;
      g.save();g.globalCompositeOperation='lighter';glow(D.col,0,0,24,.45);g.restore();
      g.fillStyle=D.hi;PX.forEach((row,y)=>[...row].forEach((c,x)=>{if(c=='#')g.fillRect((x-4.5)*u,(y-4.5)*u,u+.35,u+.35)}));
      g.save();g.globalCompositeOperation='lighter';glow(D.col,-6.2,-1.5,5,1);glow(D.col,6.2,-1.5,5,1);g.restore()}
    else if(D.k=='gold'){g.rotate(-f.rot+Math.sin(clock*4)*.04);
      neon(D,2.4,()=>{g.beginPath();g.arc(0,-1,17,Math.PI*1.05,Math.PI*1.95);g.moveTo(-17,-3);g.lineTo(-17,9);g.moveTo(17,-3);g.lineTo(17,9);g.moveTo(-17,8);g.quadraticCurveTo(-14,15,-5,14)});
      g.fillStyle=D.hi;g.fillRect(-21,-4,6,14);g.fillRect(15,-4,6,14);
      g.save();g.globalCompositeOperation='lighter';g.fillStyle=D.col;g.fillRect(-10,-3,20,4);glow(D.hi,0,-1,12,.7);g.restore();
      g.fillStyle='#fff';g.fillRect(-10,-2,20,1.4);g.fillStyle=D.hi;g.beginPath();g.arc(-4,14,2,0,TAU);g.fill()}
    else if(D.k=='gun'){g.rotate(-f.rot);
      neon(D,2.2,()=>{g.beginPath();g.moveTo(11,0);g.arc(0,0,11,0,TAU);g.moveTo(0,-19);g.lineTo(0,-6);g.moveTo(0,6);g.lineTo(0,19);g.moveTo(-19,0);g.lineTo(-6,0);g.moveTo(6,0);g.lineTo(19,0)});
      g.fillStyle=D.hi;g.beginPath();g.arc(0,0,2.2,0,TAU);g.fill();
      g.save();g.globalCompositeOperation='lighter';glow('#ff2d4a',14,-14,7,.6+.4*Math.sin(clock*6));g.restore();g.fillStyle='#ff2d4a';g.beginPath();g.arc(14,-14,2.6,0,TAU);g.fill()}
    else if(D.k=='ink'){g.rotate(-f.rot+.55);
      neon(D,2.2,()=>{g.beginPath();g.moveTo(0,-19);g.lineTo(9,-3);g.lineTo(5,11);g.lineTo(-5,11);g.lineTo(-9,-3);g.closePath();g.moveTo(0,-19);g.lineTo(0,1);g.moveTo(-6,16);g.lineTo(6,16)});
      g.fillStyle=D.hi;g.beginPath();g.arc(0,3,2.4,0,TAU);g.fill();
      g.save();g.globalCompositeOperation='lighter';glow(D.col,0,-19,7,.9);g.restore()}
    else if(D.k=='monkey'){g.rotate(-f.rot);
      neon(D,2.1,()=>{g.beginPath();g.moveTo(-12,-1);g.arc(-17,-1,5,0,TAU);g.moveTo(22,-1);g.arc(17,-1,5,0,TAU);g.moveTo(0,-6);g.bezierCurveTo(-4,-14,-14,-12,-12,-2);g.bezierCurveTo(-14,8,-6,14,0,14);g.bezierCurveTo(6,14,14,8,12,-2);g.bezierCurveTo(14,-12,4,-14,0,-6);g.moveTo(-4,8);g.quadraticCurveTo(0,11,4,8)});
      g.fillStyle=D.hi;g.beginPath();g.arc(-5,-3,1.9,0,TAU);g.arc(5,-3,1.9,0,TAU);g.fill();
      g.save();g.globalCompositeOperation='lighter';g.fillStyle='#ff4655';poly([[-6,-22],[0,-16],[6,-22],[3,-22],[0,-19],[-3,-22]]);g.fill();glow('#ff4655',0,-19,6,.6);g.restore()}
    else if(D.k=='rose'){g.rotate(-f.rot+Math.sin(clock*2)*.05);
      neon(D,2,()=>{g.beginPath();g.moveTo(3.5,-4);g.arc(0,-4,3.5,0,TAU*.85);g.moveTo(-7,-6);g.quadraticCurveTo(-8,-15,0,-14);g.quadraticCurveTo(8,-15,7,-6);g.quadraticCurveTo(6,3,0,4);g.quadraticCurveTo(-6,3,-7,-6);g.moveTo(-11,-9);g.quadraticCurveTo(-13,4,0,7);g.quadraticCurveTo(13,4,11,-9);g.moveTo(0,7);g.lineTo(0,19);g.moveTo(0,13);g.quadraticCurveTo(-8,9,-11,13);g.moveTo(0,15);g.quadraticCurveTo(8,11,10,15)});
      g.save();g.globalCompositeOperation='lighter';glow(D.col,0,-5,10,.8);g.restore()}
    else if(D.k=='drg'){g.strokeStyle=D.dk;g.lineWidth=3.5;g.lineCap='round';for(let i=-1;i<=1;i++){g.beginPath();g.moveTo(-11,i*8-6);g.quadraticCurveTo(0,i*8+4,11,i*8-2);g.stroke()}}
    else{g.strokeStyle=D.dk;g.lineWidth=3;g.lineCap='round';for(let i=0;i<6;i++){g.save();g.rotate(i*TAU/6);g.beginPath();g.moveTo(0,0);g.lineTo(13,0);g.moveTo(8,0);g.lineTo(11,-3.5);g.moveTo(8,0);g.lineTo(11,3.5);g.stroke();g.restore()}}
  }
  g.restore();
  if(f.slow>0){g.fillStyle='#e3f6ff';g.strokeStyle=D.dk;g.lineWidth=2;for(let i=0;i<3;i++){const a=i*TAU/3+clock;g.save();g.translate(Math.cos(a)*f.r,Math.sin(a)*f.r);g.rotate(a);g.beginPath();g.moveTo(8,0);g.lineTo(-3,-4);g.lineTo(-3,4);g.closePath();g.fill();g.stroke();g.restore()}}
  g.restore();
  if(f.cast){
    g.save();g.translate(f.x,f.y);
    g.strokeStyle=D.hi;g.globalAlpha=.4+.6*p;g.lineWidth=3;
    g.beginPath();g.arc(0,0,f.r+8+36*(1-p),0,TAU);g.setLineDash([10,8]);g.lineDashOffset=-clock*40;g.stroke();g.setLineDash([]);
    g.rotate(clock*4);for(let i=0;i<4;i++){g.rotate(TAU/4);g.beginPath();g.moveTo(f.r+14+36*(1-p),0);g.lineTo(f.r+24+36*(1-p),0);g.stroke()}
    g.restore();
    if(f.cast.s.tel=='line'){const a=Math.atan2(t.y+t.dy*t.sp*.6-f.y,t.x+t.dx*t.sp*.6-f.x);g.save();g.strokeStyle=D.col;g.globalAlpha=.75;g.lineWidth=2.5;g.setLineDash([8,6]);for(let i=0;i<4;i++){const d=f.r+60+i*85;g.beginPath();g.arc(f.x+Math.cos(a)*d,f.y+Math.sin(a)*d,46*Math.min(1,p*1.3),0,TAU);g.stroke()}g.restore()}
    if(f.cast.s.tel=='ring'){g.save();g.translate(f.x,f.y);g.strokeStyle=D.col;g.globalAlpha=.65;g.lineWidth=3;g.setLineDash([12,8]);g.lineDashOffset=-clock*40;g.beginPath();g.arc(0,0,330,0,TAU);g.stroke();g.setLineDash([]);g.globalAlpha=.16;g.fillStyle=D.col;g.beginPath();g.arc(0,0,330*p,0,TAU);g.fill();g.restore()}
    if(f.cast.s.tel=='land'){const lx=clamp(t.x+t.dx*t.sp*.75,f.r,A-f.r),ly=clamp(t.y+t.dy*t.sp*.75,f.r,A-f.r);g.save();g.translate(lx,ly);g.strokeStyle=D.col;g.globalAlpha=.75;g.lineWidth=3;g.beginPath();g.arc(0,0,95,0,TAU);g.stroke();g.globalAlpha=.2;g.fillStyle=D.col;g.beginPath();g.arc(0,0,95*p,0,TAU);g.fill();g.globalAlpha=.8;g.lineWidth=2;g.beginPath();g.moveTo(-14,0);g.lineTo(14,0);g.moveTo(0,-14);g.lineTo(0,14);g.stroke();g.restore()}
    if(f.cast.s.ind){
      const d=dist(f,t)/650,ia=Math.atan2(t.y+t.dy*t.sp*d-f.y,t.x+t.dx*t.sp*d-f.x);
      g.save();g.translate(f.x,f.y);g.rotate(ia);
      g.globalAlpha=.18+.2*p;g.fillStyle=D.col;g.fillRect(f.r,-13,620,26);
      g.globalAlpha=.45;g.fillStyle=D.hi;g.fillRect(f.r,-13,620*p,26);
      g.globalAlpha=.95;g.strokeStyle=D.hi;g.lineWidth=2;g.strokeRect(f.r,-13,620,26);
      g.globalAlpha=.7;g.lineWidth=3;for(let q=0;q<6;q++){const x=f.r+30+((q*100+clock*300)%600);g.beginPath();g.moveTo(x,-7);g.lineTo(x+8,0);g.lineTo(x,7);g.stroke()}
      g.restore();
    }
    if(f.cast.s.aim){
      g.save();g.strokeStyle=D.hi;g.globalAlpha=.35*p;g.lineWidth=3;g.setLineDash([10,10]);g.lineDashOffset=-clock*80;
      g.beginPath();g.moveTo(f.x,f.y);g.lineTo(t.x,t.y);g.stroke();g.restore();
    }
  }
  if(f.shield>0){
    const ap=clamp(f.shield/.35,0,1),fm=back(clamp((1.8-f.shield)/.25,0,1));
    g.save();g.translate(f.x,f.y);g.rotate(clock*.8);g.scale(fm,fm);g.globalAlpha=ap;
    hex(f.r+14);g.fillStyle='#e3f6ff26';g.fill();
    g.lineWidth=5;g.strokeStyle=f.sf>0?'#fff':D.dk;g.stroke();
    g.lineWidth=2.5;g.strokeStyle=f.sf>0?'#fff':D.hi;g.stroke();
    g.globalAlpha=ap*.35;g.lineWidth=1.5;g.strokeStyle=D.hi;
    for(let i=0;i<6;i++){g.beginPath();g.moveTo(0,0);g.lineTo(Math.cos(i*TAU/6)*(f.r+14),Math.sin(i*TAU/6)*(f.r+14));g.stroke()}
    hex(f.r*.5);g.stroke();
    g.restore();
  }
}

function drawFX(x){
  if(FXD[x.k]){FXD[x.k](x);return}
  if(x.k=='pillar'){const p=1-x.l/x.m,w=(1-p)*34+6,hgt=280*(p<.3?p/.3:1);g.save();g.globalCompositeOperation='lighter';const gr=g.createLinearGradient(0,x.y-hgt,0,x.y);gr.addColorStop(0,'rgba(255,90,31,0)');gr.addColorStop(1,'rgba(255,210,122,'+(1-p)+')');g.fillStyle=gr;g.fillRect(x.x-w/2,x.y-hgt,w,hgt);glow('#ff8a2c',x.x,x.y,60*(1-p)+10,1-p);g.restore();return}
  if(x.k=='trc'){const p=1-x.l/x.m;g.save();g.globalCompositeOperation='lighter';g.lineCap='round';g.globalAlpha=1-p;g.strokeStyle=x.c;g.lineWidth=7*(1-p)+1;g.beginPath();g.moveTo(x.x,x.y);g.lineTo(x.x2,x.y2);g.stroke();g.strokeStyle='#ffffff';g.lineWidth=2;g.stroke();glow(x.c,x.x2,x.y2,36*(1-p),1-p);g.restore();return}
  if(x.k=='slash'){const p=1-x.l/x.m;g.save();g.translate(x.x,x.y);g.rotate(x.a);g.globalCompositeOperation='lighter';g.lineCap='round';g.globalAlpha=1-p;g.strokeStyle=x.c;g.lineWidth=14*(1-p)+2;g.beginPath();g.arc(0,0,48,-1.1+p*.4,1.1+p*.4);g.stroke();g.strokeStyle='#ffffff';g.lineWidth=4*(1-p)+1;g.beginPath();g.arc(0,0,48,-.8+p*.4,.8+p*.4);g.stroke();g.restore();return}
  if(x.k=='muz'){g.save();g.translate(x.x,x.y);g.rotate(x.a);g.globalCompositeOperation='lighter';glow('#ffd36b',6,0,16,1);g.fillStyle='#fff6d0';poly([[24,0],[4,-5],[0,0],[4,5]]);g.fill();g.restore();return}
  if(x.k=='rail'){const p=1-x.l/x.m,w=(1-p)*26;g.save();g.globalCompositeOperation='lighter';g.lineCap='round';g.strokeStyle=x.c;g.globalAlpha=.75;g.lineWidth=w*1.8+1;g.beginPath();g.moveTo(x.x,x.y);g.lineTo(x.x2,x.y2);g.stroke();g.strokeStyle='#ffffff';g.globalAlpha=1;g.lineWidth=w*.6+1;g.stroke();glow(x.c,x.x2,x.y2,100*(1-p),1-p);glow('#ffffff',x.x2,x.y2,40*(1-p),1-p);g.restore();return}
  if(x.k=='badge'){const p=1-x.l/x.m,s2=back(clamp(p/.15,0,1)),w=x.txt.length*26+40;g.save();g.translate(x.x,x.y-p*14);g.scale(s2,s2);g.globalAlpha=clamp(x.l/.3,0,1);g.save();g.globalCompositeOperation='lighter';glow(x.c,0,0,w*.7,.45);g.restore();poly([[-w/2+10,-19],[w/2,-19],[w/2-10,19],[-w/2,19]]);g.fillStyle=x.c;g.fill();g.lineWidth=3.5;g.strokeStyle='#07080c';g.stroke();g.font='26px '+FD;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#07080c';g.fillText(x.txt,0,1);g.restore();return}
  if(x.k=='ghost'){const p=1-x.l/x.m;g.save();g.globalAlpha=(1-p)*.7;g.strokeStyle=x.c;g.lineWidth=3;g.beginPath();g.arc(x.x,x.y,x.r*(1+p*.35),0,TAU);g.stroke();g.globalAlpha=(1-p)*.22;g.fillStyle=x.c;g.fill();g.restore();return}
  if(x.k=='tss'){const p=1-x.l/x.m,r=(p<.55?p/.55:1-(p-.55)/.45)*900;g.save();g.globalCompositeOperation='difference';g.fillStyle='#ffffff';g.beginPath();g.arc(x.x,x.y,Math.max(1,r),0,TAU);g.fill();g.restore();return}
  if(x.k=='tsr'){const p=1-x.l/x.m;g.save();g.globalAlpha=1-p;g.strokeStyle='#ffffff';g.lineWidth=8*(1-p)+1;g.beginPath();g.arc(x.x,x.y,20+p*700,0,TAU);g.stroke();g.restore();return}
  if(x.k=='burst'){
    const p=1-x.l/x.m;g.save();g.translate(x.x,x.y);g.globalCompositeOperation='lighter';g.strokeStyle=x.c;g.globalAlpha=1-p;g.lineCap='round';
    for(let i=0;i<12;i++){const a=i*TAU/12+x.a,r0=18+p*60,r1=r0+28*(1-p)+10;g.lineWidth=4*(1-p)+1;g.beginPath();g.moveTo(Math.cos(a)*r0,Math.sin(a)*r0);g.lineTo(Math.cos(a)*r1,Math.sin(a)*r1);g.stroke()}
    g.restore();return;
  }
  if(x.k=='fist'){
    const p=1-x.l/x.m,e=Math.sin(p*Math.PI),cx=x.x+Math.cos(x.a)*(22+x.d*e),cy=x.y+Math.sin(x.a)*(22+x.d*e);
    g.save();g.translate(cx,cy);g.rotate(x.a);
    g.save();g.globalCompositeOperation='lighter';glow(x.c2,0,0,22,.6);g.restore();
    g.globalAlpha=.9;g.strokeStyle=x.c;g.lineWidth=2;g.lineCap='round';
    for(let i=-1;i<=1;i++){g.beginPath();g.moveTo(-14,i*6);g.lineTo(-30-12*e,i*6);g.stroke()}
    g.fillStyle=x.c2;g.strokeStyle='#0b0d12';g.lineWidth=2.5;g.beginPath();g.moveTo(-9,-9);g.lineTo(5,-9);g.quadraticCurveTo(9,-9,9,-5);g.lineTo(9,5);g.quadraticCurveTo(9,9,5,9);g.lineTo(-9,9);g.closePath();g.fill();g.stroke();
    g.lineWidth=1.5;for(let i=-1;i<=1;i++){g.beginPath();g.moveTo(4,i*5);g.lineTo(9,i*5);g.stroke()}
    g.restore();return;
  }
  if(x.k=='crack'){
    const a=Math.min(1,x.l)*.8;g.save();g.translate(x.x,x.y);g.globalAlpha=a*.5;g.fillStyle='#07080c';g.beginPath();g.ellipse(0,0,x.r*.45,x.r*.3,0,0,TAU);g.fill();
    g.globalAlpha=a;g.strokeStyle='#07080c';g.lineWidth=3;g.lineCap='round';g.lineJoin='round';
    for(let i=0;i<9;i++){const an=i*TAU/9+x.x*.01;g.beginPath();g.moveTo(0,0);for(let q=1;q<=3;q++){const aa=an+(((i*q*7)%5)-2)*.09;g.lineTo(Math.cos(aa)*x.r*q/3,Math.sin(aa)*x.r*q/3*.75)}g.stroke()}
    g.restore();return;
  }
  if(x.k=='bolt'||x.k=='zap'){
    const p=1-x.l/x.m,bl=x.k=='bolt',x1=x.x,y1=bl?x.y-720:x.y,x2=bl?x.x:x.x2,y2=bl?x.y:x.y2;
    if(!x.pts){x.pts=jag(x1,y1,x2,y2,bl?16:10,bl?26:14);x.br=[];for(let b=0;b<(bl?4:2);b++){const i=Math.floor(rnd(2,x.pts.length-2)),[sx,sy]=x.pts[i],a=Math.atan2(y2-y1,x2-x1)+rnd(-1,1)*1.1,L=rnd(40,110);x.br.push(jag(sx,sy,sx+Math.cos(a)*L,sy+Math.sin(a)*L,5,12))}}
    g.save();g.globalCompositeOperation='lighter';g.lineJoin='round';g.lineCap='round';
    const fl=Math.random()<.3?.6:1,path=pts=>{g.beginPath();pts.forEach(([a,b],i)=>i?g.lineTo(a,b):g.moveTo(a,b))};
    [['#7b4bd6',22,.35],['#ffe45c',9,.9],['#ffffff',3.5,1]].forEach(([c,w,a])=>{g.strokeStyle=c;g.globalAlpha=a*(1-p)*fl;g.lineWidth=w*(1-p*.5);path(x.pts);g.stroke();g.lineWidth=w*.5*(1-p*.5);x.br.forEach(b=>{path(b);g.stroke()})});
    glow('#ffe45c',x2,y2,90*(1-p*.5),.8*(1-p));glow('#ffffff',x2,y2,36,1-p);
    g.restore();return;
  }
  if(x.k=='boom'){
    const p=1-x.l/x.m;g.save();g.globalCompositeOperation='lighter';
    glow(x.pal[Math.min(x.pal.length-1,Math.floor(p*x.pal.length))],x.x,x.y,x.r*(.4+.8*Math.sqrt(p)),1-p);
    glow('#ffffff',x.x,x.y,x.r*.5*(1-p),1-p);
    g.restore();return;
  }
  if(x.k=='gust'){
    const p=1-x.l/x.m,e=1-Math.pow(1-p,3);g.save();g.translate(x.x,x.y);g.globalCompositeOperation='lighter';g.lineCap='round';
    for(let i=0;i<3;i++){g.rotate(x.a+i*2.1+e*1.2);g.globalAlpha=(1-p)*.85;g.strokeStyle=i?'#b9ffcf':'#ffffff';g.lineWidth=(10-i*2)*(1-p)+1;g.beginPath();g.arc(0,0,30+e*(200-i*30),0,2.2);g.stroke()}
    g.restore();return;
  }
  if(x.k=='spk'){
    const p=1-x.l/x.m,gw=back(clamp(p/.15,0,1)),fade=clamp(x.l/.3,0,1);
    g.save();g.translate(x.x,x.y);g.scale(x.s*gw,x.s*gw);g.globalAlpha=fade;g.lineJoin='round';
    [[0,-32,7],[-9,-19,5],[9,-21,5]].forEach(([dx,h,w])=>{
      g.save();g.translate(dx,0);g.rotate(x.a+dx*.04);
      poly([[0,h],[w,-2],[0,4],[-w,-2]]);g.fillStyle='#0d2c44';g.fill();g.lineWidth=3;g.strokeStyle='#0d2c44';g.stroke();
      poly([[0,h],[w,-2],[0,3]]);g.fillStyle='#7cc6ea';g.fill();
      poly([[0,h],[-w,-2],[0,3]]);g.fillStyle='#effaff';g.fill();
      g.restore();
    });
    g.restore();return;
  }
  if(x.k=='scorch'||x.k=='frost'){
    const p=1-x.l/x.m;g.save();
    if(x.k=='frost'){g.globalAlpha=.3*Math.sin(Math.min(1,p*1.6)*Math.PI/2)*(1-p);g.fillStyle=x.c||'#a8dcf5';g.fillRect(-300,-300,A+600,A+600)}
    else{
      g.globalAlpha=Math.min(1,x.l/1.5)*.7;g.translate(x.x,x.y);g.fillStyle='#07080c';
      g.beginPath();g.ellipse(0,0,x.r*.9,x.r*.55,0,0,TAU);g.fill();
      g.strokeStyle=x.c||'#e4572e';g.lineWidth=3;
      for(let i=0;i<7;i++){const a=i*TAU/7+x.x;g.beginPath();g.moveTo(Math.cos(a)*x.r*.2,Math.sin(a)*x.r*.12);g.lineTo(Math.cos(a)*x.r*.8,Math.sin(a)*x.r*.5);g.stroke()}
      g.globalCompositeOperation='lighter';glow(x.c||'#ff6a1c',0,0,x.r*.9,Math.max(0,(x.l-2.5)/1.5)*.6);
    }
    g.restore();return;
  }
  drawFXold(x);
}
function drawFXold(x){
  const p=1-x.l/x.m;
  g.save();
  if(x.k=='ring'){
    g.globalAlpha=1-p;g.strokeStyle=x.col;g.lineWidth=x.w*(1-p)+1;
    g.beginPath();g.arc(x.x,x.y,x.r0+(x.r1-x.r0)*(1-Math.pow(1-p,3)),0,TAU);g.stroke();
  }else{
    g.translate(x.x,x.y);g.rotate(.6);g.globalAlpha=1-p;g.strokeStyle=x.col;g.lineCap='round';
    const L=14+46*(1-Math.pow(1-p,3));g.lineWidth=7*(1-p)+1;
    g.beginPath();g.moveTo(-L,0);g.lineTo(L,0);g.moveTo(0,-L);g.lineTo(0,L);g.stroke();
  }
  g.restore();
}

function ultTitle(){
  const D=bn.d,t=bn.t,inT=Math.min(1,t/.18),out=t>1.2?clamp((t-1.2)/.3,0,1):0,sy=inT*(1-out),y=A*.5-55,h=110*sy;
  g.save();g.beginPath();g.rect(0,0,A,A);g.clip();
  g.fillStyle='#0b0d12';g.fillRect(-300,y-8*sy,A+600,h+16*sy);
  g.fillStyle=D.col;g.fillRect(-300,y,A+600,h);
  g.fillStyle=D.hi+'55';
  for(let i=0;i<10;i++){const x=((i*90+t*500)%(A+200))-100;g.beginPath();g.moveTo(x,y);g.lineTo(x+40,y);g.lineTo(x-10,y+h);g.lineTo(x-50,y+h);g.fill()}
  const e=1-Math.pow(1-Math.min(1,t/.35),3),tx=A/2+(bn.side?1:-1)*(1-e)*A*.8+(bn.side?-1:1)*out*A;
  g.font='20px '+FD;g.textAlign='center';g.textBaseline='middle';
  g.lineWidth=5;g.lineJoin='round';g.strokeStyle='#0b0d12';g.strokeText('궁 극 기',tx,y+h*.2);g.fillStyle=D.hi;g.fillText('궁 극 기',tx,y+h*.2);
  g.font='58px '+FD;g.lineWidth=10;
  g.strokeText(bn.txt,tx,y+h*.62);g.fillStyle='#fff';g.fillText(bn.txt,tx,y+h*.62);
  {const isz=150*sy,ix=bn.side?A-isz-6+(1-e)*220:6-(1-e)*220;if(isz>1)g.drawImage(ICON(D,150),ix,y+h/2-isz/2-6,isz,isz)}
  g.restore();
}
function frozen(f){
  if(f.dead||f.hid)return;
  if(phase=='play'&&!f.cast&&f.ug>=100){g.save();g.translate(f.x,f.y);g.strokeStyle=f.d.hi;g.globalAlpha=.5+.4*Math.sin(clock*8);g.lineWidth=3;g.setLineDash([6,6]);g.lineDashOffset=-clock*30;g.beginPath();g.arc(0,0,f.r+7+2*Math.sin(clock*8),0,TAU);g.stroke();g.restore()}
  if(f.slide>0){g.save();g.translate(f.x,f.y-f.r-8);for(let i=0;i<3;i++){const a=clock*9+i*TAU/3;g.fillStyle='#ffd43b';g.save();g.translate(Math.cos(a)*16,Math.sin(a)*6);g.rotate(a);poly([[0,-5],[1.5,-1.5],[5,0],[1.5,1.5],[0,5],[-1.5,1.5],[-5,0],[-1.5,-1.5]]);g.fill();g.restore()}g.restore()}
  if(f.stn>0){g.save();g.translate(f.x,f.y);g.strokeStyle='#ffe45c';g.lineWidth=2.5;g.lineCap='round';for(let i=0;i<3;i++){const a=i*TAU/3+clock*9;g.beginPath();g.moveTo(Math.cos(a)*f.r,Math.sin(a)*f.r);for(let j=1;j<4;j++){const aa=a+j*.22,rr=f.r+(j%2?10:2);g.lineTo(Math.cos(aa)*rr,Math.sin(aa)*rr)}g.stroke()}g.restore()}
  if(!(f.frz>0))return;
  const a=Math.min(1,f.frz/.3),s=back(clamp((1.4-f.frz)/.2,0,1));
  g.save();g.translate(f.x,f.y);g.scale(s,s);g.globalAlpha=.85*a;
  g.beginPath();g.moveTo(0,-f.r-22);g.lineTo(f.r+12,-f.r*.5);g.lineTo(f.r+16,f.r*.6);g.lineTo(0,f.r+20);g.lineTo(-f.r-16,f.r*.6);g.lineTo(-f.r-12,-f.r*.5);g.closePath();
  g.fillStyle='#bfe6f7';g.fill();g.lineWidth=4;g.strokeStyle='#12405e';g.stroke();
  g.strokeStyle='#fff';g.lineWidth=2.5;g.beginPath();g.moveTo(-10,-f.r-6);g.lineTo(-f.r-2,-f.r*.3);g.moveTo(8,-f.r+2);g.lineTo(f.r-2,-f.r*.2);g.stroke();
  g.restore();
}
function drawDragon(h){
  const D=h.o.d,hs=h.t*h.sp,N=20,gap=15;
  for(let i=N;i>=1;i--){
    const q=hs-i*gap;if(q<0)continue;
    const [x,y]=dpos(h,q),[x2,y2]=dpos(h,q+4),a=Math.atan2(y2-y,x2-x),r=5+(1-i/N)*17;
    g.save();g.translate(x,y);g.rotate(a);
    g.fillStyle='#ffd36b';g.strokeStyle='#3a2a05';g.lineWidth=2;g.beginPath();g.moveTo(-r*.6,-r*.7);g.lineTo(-r*1.3,-r*1.6);g.lineTo(r*.3,-r*.8);g.closePath();g.fill();g.stroke();
    g.beginPath();g.ellipse(0,0,r*1.15,r,0,0,TAU);g.fillStyle=D.dk;g.fill();
    g.beginPath();g.ellipse(-1,-1.5,r,r*.85,0,0,TAU);g.fillStyle=D.col;g.fill();
    g.beginPath();g.ellipse(0,r*.45,r*.8,r*.35,0,0,TAU);g.fillStyle='#d9f7c0';g.fill();
    g.strokeStyle=D.dk;g.lineWidth=1.5;g.beginPath();g.arc(-r*.2,-r*.1,r*.5,-1,1);g.stroke();
    g.restore();
  }
  const [hx,hy]=dpos(h,hs),[px,py]=dpos(h,hs-6),a=Math.atan2(hy-py,hx-px);
  g.save();g.translate(hx,hy);g.rotate(a);
  g.strokeStyle='#ffd36b';g.lineWidth=5;g.lineCap='round';g.beginPath();g.moveTo(-4,-12);g.quadraticCurveTo(-20,-22,-34,-14);g.moveTo(-4,12);g.quadraticCurveTo(-20,22,-34,14);g.stroke();
  const jo=4+Math.sin(clock*18)*3;
  g.fillStyle=D.dk;g.beginPath();g.moveTo(-14,4);g.lineTo(30,6+jo);g.lineTo(26,14+jo);g.lineTo(-10,16);g.closePath();g.fill();
  g.beginPath();g.moveTo(-18,-16);g.quadraticCurveTo(10,-20,38,-4);g.lineTo(40,4);g.quadraticCurveTo(10,8,-18,14);g.closePath();g.fillStyle=D.col;g.fill();g.lineWidth=3;g.strokeStyle=D.dk;g.stroke();
  g.strokeStyle=D.hi;g.lineWidth=2;g.beginPath();g.moveTo(30,4);g.quadraticCurveTo(10,30+Math.sin(clock*8)*8,-30,26);g.moveTo(28,-6);g.quadraticCurveTo(8,-30-Math.sin(clock*8)*8,-30,-26);g.stroke();
  g.save();g.globalCompositeOperation='lighter';glow('#ffe45c',6,-8,14,1);glow('#2fd67e',40,8,30,.8);g.restore();
  g.fillStyle='#fff8c0';g.beginPath();g.ellipse(6,-8,5,2.5,-.2,0,TAU);g.fill();
  g.restore();
}
function drawFloor(h){
  const D=h.o.d,fa=Math.min(1,h.t/.3)*clamp((h.dur-h.t)/.4,0,1),ts=75,off=h.t*150,cols=[D.col,D.hi,'#ff5fa2','#7fd6ff'],fl=h.fl||0;
  g.save();g.beginPath();g.rect(0,0,A,A);g.clip();g.globalCompositeOperation='lighter';
  const ox2=((Math.cos(h.dir)*off)%ts+ts)%ts,oy2=((Math.sin(h.dir)*off)%ts+ts)%ts;
  for(let i=-1;i<9;i++)for(let j=-1;j<9;j++){g.globalAlpha=fa*(((i+j)&1)?.08:.2)+fl*.22*fa;g.fillStyle=cols[(((i+j+h.beats)%4)+4)%4];g.fillRect(i*ts+ox2+3,j*ts+oy2+3,ts-6,ts-6)}
  g.save();g.translate(A/2,A/2);g.rotate(h.dir);g.strokeStyle=D.hi;g.lineWidth=7;g.lineCap='round';g.lineJoin='round';g.globalAlpha=fa*.35;
  for(let r=-4;r<=4;r++)for(let m=0;m<7;m++){const x=((m*140+off*1.2)%980)-490,y=r*95;g.beginPath();g.moveTo(x-14,y-18);g.lineTo(x+6,y);g.lineTo(x-14,y+18);g.stroke()}
  g.restore();
  for(let q=0;q<20;q++){const hh=(10+50*fl+22*Math.abs(Math.sin(clock*9+q*1.7)))*fa,bw=A/20;g.globalAlpha=fa*.55;g.fillStyle=cols[q%4];g.fillRect(q*bw+3,A-hh,bw-6,hh);g.fillRect(q*bw+3,0,bw-6,hh*.7)}
  for(let q=0;q<3;q++){
    const a=clock*1.3+q*2.1,x0=[0,A,A/2][q],y0=q==2?A:0,ex=A/2+Math.cos(a)*240,ey=A/2+Math.sin(a)*240,nx=-(ey-y0),ny=ex-x0,L=Math.hypot(nx,ny)||1;
    g.globalAlpha=fa*.16;g.fillStyle=cols[q];g.beginPath();g.moveTo(x0,y0);g.lineTo(ex+nx/L*60,ey+ny/L*60);g.lineTo(ex-nx/L*60,ey-ny/L*60);g.closePath();g.fill();
  }
  g.restore();
}
function drawQuake(h){
  const rr=h.t*520,p=Math.min(1,rr/340),N=56;
  g.save();g.beginPath();g.rect(0,0,A,A);g.clip();g.globalAlpha=1-p*.7;g.lineJoin='round';
  g.beginPath();for(let i=0;i<=N;i++){const a=i*TAU/N,r1=rr+((i*37)%7)/7*12;const x=h.x+Math.cos(a)*r1,y=h.y+Math.sin(a)*r1;i?g.lineTo(x,y):g.moveTo(x,y)}
  g.lineWidth=20*(1-p)+4;g.strokeStyle='#22262f';g.stroke();g.lineWidth=7*(1-p)+2;g.strokeStyle='#9a917f';g.stroke();
  g.globalCompositeOperation='lighter';g.lineWidth=4;g.strokeStyle=h.o.d.col;g.globalAlpha=(1-p)*.8;g.beginPath();g.arc(h.x,h.y,Math.max(1,rr-14),0,TAU);g.stroke();
  g.restore();
}
function drawKB(h){
  const p=h.t;g.save();
  h.cells.forEach(([x,y])=>{
    if(p<h.tel){
      const u=p/h.tel,bl=Math.sin(u*u*44)>0;
      g.globalAlpha=(.1+.25*u)*(bl?1:.45);g.fillStyle='#ff3b30';g.fillRect(x+3,y+3,54,54);
      g.globalAlpha=.85;g.strokeStyle='#ff3b30';g.lineWidth=2;g.setLineDash([8,6]);g.lineDashOffset=-clock*40;g.strokeRect(x+4,y+4,52,52);g.setLineDash([]);
    }else{
      const q=p-h.tel,rise=back(clamp(q/.18,0,1)),down=clamp((p-h.tel-h.act)/.25,0,1),hh=16*rise*(1-down),fl=.8+.2*Math.sin(clock*30+x);
      g.globalAlpha=1-down;
      g.save();g.globalCompositeOperation='lighter';glow('#ff3b30',x+30,y+30-hh,52,.4*fl);g.restore();g.globalAlpha=1-down;
      g.fillStyle='#7a120c';g.fillRect(x+2,y+58-hh,56,hh+2);
      const tg2=g.createLinearGradient(0,y-hh,0,y+58-hh);tg2.addColorStop(0,'#ff5a4e');tg2.addColorStop(1,'#d8261b');
      g.fillStyle=tg2;g.fillRect(x+2,y+2-hh,56,56);g.strokeStyle='#4d0904';g.lineWidth=2;g.strokeRect(x+2,y+2-hh,56,56+hh);
      [[16,16],[44,16],[16,44],[44,44]].forEach(([sx,sy])=>{g.fillStyle='#a31a12';g.beginPath();g.ellipse(x+sx,y+sy-hh+2,8,7,0,0,TAU);g.fill();g.fillStyle='#ff6f63';g.beginPath();g.ellipse(x+sx,y+sy-hh,8,7,0,0,TAU);g.fill();g.fillStyle='rgba(255,255,255,.35)';g.beginPath();g.ellipse(x+sx-2.5,y+sy-hh-2.5,3,2,-.6,0,TAU);g.fill()});
      g.fillStyle='rgba(255,255,255,.18)';g.fillRect(x+4,y+4-hh,52,3);
    }
  });
  g.restore();g.globalAlpha=1;
}
function drawBrick(h){
  const p=clamp(h.t/h.dl,0,1),q=p*p,P=h.pc;
  g.save();g.translate(h.x,h.y);g.globalAlpha=.3+.5*p;g.strokeStyle=P[2];g.lineWidth=3;g.setLineDash([8,6]);g.lineDashOffset=-clock*40;g.beginPath();g.arc(0,0,h.r,0,TAU);g.stroke();g.setLineDash([]);
  g.globalAlpha=.2+.35*p;g.fillStyle='#000';g.beginPath();g.ellipse(0,4,h.r*(.4+.5*p),h.r*.4*(.4+.5*p),0,0,TAU);g.fill();g.restore();
  const yo=-(1-q)*440,w=62,hh=26,dp=16;
  g.save();g.translate(h.x,h.y+yo-12);g.lineJoin='round';g.lineWidth=2.5;g.strokeStyle=P[1];
  g.fillStyle=P[0];g.fillRect(-w/2,-hh/2,w,hh);g.strokeRect(-w/2,-hh/2,w,hh);
  g.fillStyle=P[2];g.fillRect(-w/2,-hh/2-dp,w,dp);g.strokeRect(-w/2,-hh/2-dp,w,dp);
  [-w/4,w/4].forEach(x=>{g.fillStyle=P[0];g.fillRect(x-8,-hh/2-dp/2-5,16,5);g.beginPath();g.ellipse(x,-hh/2-dp/2-5,8,4,0,0,TAU);g.fillStyle=P[2];g.fill();g.stroke()});
  g.fillStyle='#ffffff30';g.fillRect(-w/2+3,-hh/2+3,w-6,4);
  g.restore();
}
function drawBlaster(h){
  const D=h.o.d,ap=back(clamp(h.t/.25,0,1)),fade=h.fired?clamp((h.ch+.55-h.t)/.2,0,1):1,ca=Math.cos(h.a0),sa=Math.sin(h.a0);
  if(!h.fired){const p=h.t/h.ch;g.save();g.globalCompositeOperation='lighter';glow(D.col,h.x+ca*34,h.y+sa*34,10+34*p,.9*p);glow('#ffffff',h.x+ca*34,h.y+sa*34,4+10*p,p);g.restore();g.save();g.globalAlpha=.25+.55*p;g.strokeStyle=D.hi;g.lineWidth=1+4*p;g.setLineDash([10,8]);g.lineDashOffset=-clock*80;g.beginPath();g.moveTo(h.x,h.y);g.lineTo(h.x+ca*900,h.y+sa*900);g.stroke();g.restore()}
  else if(h.t<h.ch+.4){const bt=h.t-h.ch,w=(bt<.06?bt/.06:1)*(1-clamp((bt-.25)/.15,0,1))*30;g.save();g.translate(h.x,h.y);g.rotate(h.a0);g.globalCompositeOperation='lighter';g.globalAlpha=.6;g.fillStyle=D.col;g.fillRect(20,-w*.9,900,w*1.8);g.globalAlpha=1;g.fillStyle='#ffffff';g.fillRect(20,-w*.5,900,w);g.strokeStyle='#ffffff';g.lineWidth=2;g.globalAlpha=.7;for(let r=0;r<5;r++){const rx=((clock*1100+r*180)%900)+30;g.beginPath();g.ellipse(rx,0,5,w*1.15+2,0,0,TAU);g.stroke()}g.restore()}
  g.save();g.translate(h.x,h.y);g.rotate(h.a0);g.scale(ap*fade*1.2,ap*fade*1.2*(ca<0?-1:1));
  const jaw=h.fired?.55:Math.min(1,h.t/h.ch)*.25;g.lineJoin='round';
  g.fillStyle='#f4f4f0';g.strokeStyle='#1a1a22';g.lineWidth=3;
  g.beginPath();g.moveTo(-26,-20);g.quadraticCurveTo(10,-28,28,-10);g.lineTo(30,-2);g.lineTo(-10,-4);g.lineTo(-26,4);g.closePath();g.fill();g.stroke();
  g.save();g.translate(-14,4);g.rotate(jaw);g.beginPath();g.moveTo(-4,0);g.lineTo(42,0);g.lineTo(38,10);g.lineTo(0,12);g.closePath();g.fill();g.stroke();
  g.fillStyle='#1a1a22';for(let i=0;i<4;i++)g.fillRect(8+i*8,0,2,5);g.restore();
  g.fillStyle='#1a1a22';g.beginPath();g.ellipse(-2,-12,7,6,0,0,TAU);g.fill();
  g.save();g.globalCompositeOperation='lighter';glow(D.col,-2,-12,14,1);glow('#ffffff',-2,-12,5,1);g.restore();
  g.strokeStyle='#1a1a22';g.beginPath();g.moveTo(-22,-14);g.lineTo(-36,-26);g.moveTo(-22,0);g.lineTo(-38,4);g.stroke();
  g.restore();
}
function drawKnife(D){
  poly([[18,0],[2,-4],[-6,-3],[-6,3],[2,4]]);g.fillStyle='#e8edf5';g.fill();g.strokeStyle='#2a2f3a';g.lineWidth=1.5;g.stroke();
  g.fillStyle=D.col;g.fillRect(-8,-7,3,14);g.fillStyle='#2a2f3a';g.fillRect(-17,-2.5,9,5);
  g.strokeStyle='#ffffff';g.lineWidth=1;g.beginPath();g.moveTo(15,0);g.lineTo(0,0);g.stroke();
}
function drawMad(){
  const M2=MAD,a=Math.min(1,M2.t/.3);g.save();
  g.globalAlpha=a*.28;g.globalCompositeOperation='color';g.fillStyle='#b0103a';g.fillRect(-300,-300,A+600,A+600);g.globalCompositeOperation='source-over';
  g.globalAlpha=a*.14;g.fillStyle='#ffffff';for(let i=0;i<140;i++)g.fillRect(rnd(0,A),rnd(0,A),1.6,1.6);
  g.globalAlpha=a;g.fillStyle='#000';g.fillRect(-300,-300,A+600,352);g.fillRect(-300,A-52,A+600,352);
  g.font='14px '+FD;g.textBaseline='middle';g.textAlign='left';g.fillStyle='#ff2d55';if(Math.sin(clock*8)>0){g.beginPath();g.arc(22,26,5,0,TAU);g.fill()}
  g.fillStyle='#ffffff';g.fillText('REC  00:0'+Math.floor(M2.t)+':'+String(Math.floor((M2.t%1)*24)).padStart(2,'0'),34,27);
  g.textAlign='right';g.fillStyle='#ffd3e0';g.fillText('MAD MOVIE · '+M2.o.d.name,A-16,27);
  M2.kf.slice(-4).forEach((k,i)=>{const y=74+i*26,w=170;g.globalAlpha=a*.85;g.fillStyle='rgba(10,4,8,.75)';g.fillRect(A-14-w,y-11,w,22);g.fillStyle=M2.o.d.col;g.fillRect(A-14-w,y-11,3,22);g.globalAlpha=a;g.font='12px '+FD;g.textAlign='right';g.fillStyle='#ffffff';g.fillText(M2.o.d.name+'  ✦  '+k.n,A-22,y+1)});
  const last=M2.kf[M2.kf.length-1];
  if(last){const q=M2.t-last.at,sc=back(clamp(q/.12,0,1))*(last.txt=='ACE'?1.5:1);g.save();g.globalAlpha=a*clamp((.9-q)/.3,0,1);g.translate(A/2,A-110);g.scale(sc,sc);g.font='64px '+FD;g.textAlign='center';g.lineJoin='round';g.lineWidth=12;g.strokeStyle='#000';g.strokeText(last.txt,0,0);g.fillStyle=last.txt=='ACE'?goldG(-30,30):'#ffffff';g.fillText(last.txt,0,0);g.restore()}
  g.restore();
  ball(M2.o,tgt(M2.o)||M2.o);
}
function drawStop(){
  const T2=TSTOP,o=T2.o,tg=tgt(o)||o,ap=Math.min(1,T2.t/.4)*clamp((T2.dur-T2.t)/.3,0,1);
  g.save();g.globalAlpha=ap;g.globalCompositeOperation='saturation';g.fillStyle='#808080';g.fillRect(-300,-300,A+600,A+600);g.restore();
  g.save();g.globalAlpha=ap*.25;g.fillStyle='#2a1f4a';g.fillRect(-300,-300,A+600,A+600);g.restore();
  g.save();g.translate(A/2,A/2);g.globalAlpha=ap*.35;g.strokeStyle=o.d.hi;g.lineCap='round';g.lineWidth=4;g.beginPath();g.arc(0,0,210,0,TAU);g.stroke();g.lineWidth=2;g.beginPath();g.arc(0,0,195,0,TAU);g.stroke();
  for(let i=0;i<12;i++){g.save();g.rotate(i*TAU/12);g.lineWidth=i%3?3:6;g.beginPath();g.moveTo(0,-195);g.lineTo(0,i%3?-182:-170);g.stroke();g.restore()}
  const sh=Math.floor(T2.t*2)*TAU/60;g.lineWidth=6;g.beginPath();g.moveTo(0,0);g.lineTo(Math.sin(1.1)*110,-Math.cos(1.1)*110);g.stroke();g.lineWidth=2.5;g.beginPath();g.moveTo(0,0);g.lineTo(Math.sin(sh)*170,-Math.cos(sh)*170);g.stroke();
  g.restore();
  ball(o,tg);
  T2.kn.forEach(k=>{if(k.t<0)return;const u=Math.min(1,k.t/.18),e=1-Math.pow(1-u,3),x=k.x0+(k.x-k.x0)*e,y=k.y0+(k.y-k.y0)*e,a=Math.atan2(k.tg.y-k.y,k.tg.x-k.x)+(1-e)*5;
    g.save();g.translate(x,y);g.rotate(a);g.save();g.globalCompositeOperation='lighter';glow(o.d.col,0,0,18,.6);if(u<1){g.globalAlpha=.6;g.strokeStyle='#fff';g.lineWidth=2;g.beginPath();g.moveTo(-10,0);g.lineTo(-60*(1-u),0);g.stroke()}g.restore();
    g.scale(1.45,1.45);drawKnife(o.d);if(u>=1){const sh=(clock*1.6+k.x*.013)%1;g.globalAlpha=.85*(1-sh);g.strokeStyle='#fff';g.lineWidth=1.3;g.beginPath();g.moveTo(16-sh*24,-3);g.lineTo(12-sh*24,3);g.stroke()}g.restore()});
}
;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ▶ 섹션 : core3
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function drawLock(h){
  if(h.fired)return;const e=h.e,u=clamp(h.t/h.ch,0,1),r=110-80*u,D=h.o.d;
  g.save();g.globalAlpha=.25+.4*u;g.strokeStyle=D.col;g.lineWidth=1.5;g.setLineDash([6,8]);g.lineDashOffset=-clock*60;g.beginPath();g.moveTo(h.o.x,h.o.y);g.lineTo(e.x,e.y);g.stroke();g.restore();
  g.save();g.translate(e.x,e.y);g.rotate(u*1.5);g.strokeStyle=u>.8&&Math.sin(clock*60)>0?'#ffffff':D.col;g.lineWidth=3;g.lineCap='square';
  for(let i=0;i<4;i++){g.save();g.rotate(i*Math.PI/2);g.beginPath();g.moveTo(r,-r*.4);g.lineTo(r,-r);g.lineTo(r*.4,-r);g.stroke();g.restore()}
  g.rotate(-u*1.5);g.globalAlpha=.75;g.lineWidth=1.5;g.beginPath();g.moveTo(-r-12,0);g.lineTo(-8,0);g.moveTo(8,0);g.lineTo(r+12,0);g.moveTo(0,-r-12);g.lineTo(0,-8);g.moveTo(0,8);g.lineTo(0,r+12);g.stroke();
  g.globalAlpha=1;g.font='13px '+FD;g.fillStyle=D.col;g.textAlign='left';g.textBaseline='middle';g.fillText(u>.8?'FIRE':'LOCK',r*.45+6,-r*.75);
  g.restore();
}
function drawInk(h){
  const D=h.o.d,dr=.45,n=h.pts.length-1,k2=Math.floor(Math.min(1,h.t/dr)*n),fade=clamp((1.5-h.t)/.5,0,1),P=h.pts;
  g.save();g.lineCap='round';g.lineJoin='round';
  if(h.on){g.save();g.globalCompositeOperation='lighter';g.strokeStyle=D.col;g.globalAlpha=fade*Math.max(0,1-(h.t-dr)/.4);g.lineWidth=36;g.beginPath();P.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.stroke();g.restore()}
  g.globalAlpha=fade;
  for(let i=1;i<=k2;i++){const w=6+11*Math.sin(i/n*Math.PI);g.strokeStyle='#0c0c10';g.lineWidth=w+4;g.beginPath();g.moveTo(P[i-1][0],P[i-1][1]);g.lineTo(P[i][0],P[i][1]);g.stroke()}
  for(let i=1;i<=k2;i++){const w=6+11*Math.sin(i/n*Math.PI);g.strokeStyle=D.col;g.lineWidth=w*.45;g.beginPath();g.moveTo(P[i-1][0],P[i-1][1]);g.lineTo(P[i][0],P[i][1]);g.stroke()}
  if(!h.on&&k2>0){const [x,y]=P[k2],[x0,y0]=P[k2-1],a=Math.atan2(y-y0,x-x0);g.save();g.translate(x,y);g.rotate(a+Math.PI/2);g.save();g.globalCompositeOperation='lighter';glow(D.col,0,0,20,.8);g.restore();
    poly([[0,6],[8,-14],[4,-30],[-4,-30],[-8,-14]]);g.fillStyle=D.hi;g.fill();g.strokeStyle='#0c0c10';g.lineWidth=2;g.stroke();g.beginPath();g.moveTo(0,6);g.lineTo(0,-14);g.stroke();g.restore()}
  g.restore();g.globalAlpha=1;
}
function drawToon(h){
  const p=h.t,D=h.o.d,a=Math.min(1,p/.3)*clamp((2.2-p)/.3,0,1),PN=[[[0,0],[205,0],[185,A],[0,A]],[[205,0],[405,0],[425,A],[185,A]],[[405,0],[A,0],[A,A],[425,A]]],CX=[100,305,510],TX=['쾅!','퍽!','콰아앙!!'];
  g.save();g.globalAlpha=a;g.fillStyle='rgba(255,250,235,.08)';g.fillRect(0,0,A,A);
  for(let i=0;i<3;i++){const ht=.5+i*.5;if(p<ht)continue;const q=p-ht;
    g.save();poly(PN[i]);g.clip();
    g.globalAlpha=a*Math.max(0,.35-q*.2);g.fillStyle=D.col;for(let x=0;x<A;x+=18)for(let y=0;y<A;y+=18){const d=Math.hypot(x-CX[i],y-300);g.beginPath();g.arc(x+(y/18%2)*9,y,Math.max(0,7-d/60),0,TAU);g.fill()}
    g.globalAlpha=a*Math.max(0,1-q*1.2)*.6;g.strokeStyle='#0b0b0f';g.lineWidth=2;for(let k=0;k<28;k++){const an=k*TAU/28,r0=90+((k*37)%5)*14;g.beginPath();g.moveTo(CX[i]+Math.cos(an)*r0,300+Math.sin(an)*r0);g.lineTo(CX[i]+Math.cos(an)*480,300+Math.sin(an)*480);g.stroke()}
    g.restore();
    const sc=back(clamp(q/.15,0,1))*(i==2?1.25:1);g.save();g.globalAlpha=a*clamp((1.6-q)/.3,0,1);g.translate(CX[i],300+(i-1)*-60);g.rotate(-.15+i*.12);g.scale(sc,sc);g.font=(i==2?78:84)+'px '+FD;g.textAlign='center';g.textBaseline='middle';g.lineJoin='round';g.lineWidth=14;g.strokeStyle='#0b0b0f';g.strokeText(TX[i],0,0);g.fillStyle=i==2?'#ffffff':D.hi;g.fillText(TX[i],0,0);g.restore();
  }
  g.lineWidth=12;g.strokeStyle='#f5f2e8';g.beginPath();g.moveTo(205,-10);g.lineTo(185,A+10);g.moveTo(405,-10);g.lineTo(425,A+10);g.stroke();
  g.lineWidth=3;g.strokeStyle='#0b0b0f';[[-7,1],[7,1]].forEach(([o2])=>{g.beginPath();g.moveTo(205+o2,-10);g.lineTo(185+o2,A+10);g.moveTo(405+o2,-10);g.lineTo(425+o2,A+10);g.stroke()});
  g.lineWidth=8;g.strokeStyle='#0b0b0f';g.strokeRect(4,4,A-8,A-8);
  g.restore();
}
function drawChair(){
  g.lineJoin='round';g.strokeStyle='#2a1a0c';g.lineWidth=2.5;
  g.fillStyle='#5a3a1e';[[-11,-11],[11,-11],[-11,11],[11,11]].forEach(([x,y])=>g.fillRect(x-3,y-3,6,6));
  g.fillStyle='#b07a44';g.fillRect(-12,-12,24,24);g.strokeRect(-12,-12,24,24);
  g.fillStyle='#7a4e28';g.fillRect(-12,-17,24,6);g.strokeRect(-12,-17,24,6);
  g.strokeStyle='rgba(255,255,255,.25)';g.beginPath();g.moveTo(-9,-5);g.lineTo(9,-5);g.moveTo(-9,2);g.lineTo(9,2);g.stroke();
}
function chatBubble(txt,col){
  const w=Math.max(34,txt.length*13+16),h2=24;
  g.fillStyle='#ffffff';g.strokeStyle=col;g.lineWidth=2.5;g.lineJoin='round';
  g.beginPath();g.moveTo(-w/2+6,-h2/2);g.lineTo(w/2-6,-h2/2);g.quadraticCurveTo(w/2,-h2/2,w/2,-h2/2+6);g.lineTo(w/2,h2/2-6);g.quadraticCurveTo(w/2,h2/2,w/2-6,h2/2);g.lineTo(-w/2+16,h2/2);g.lineTo(-w/2+6,h2/2+8);g.lineTo(-w/2+8,h2/2);g.lineTo(-w/2+6,h2/2);g.quadraticCurveTo(-w/2,h2/2,-w/2,h2/2-6);g.lineTo(-w/2,-h2/2+6);g.quadraticCurveTo(-w/2,-h2/2,-w/2+6,-h2/2);g.closePath();g.fill();g.stroke();
  g.fillStyle='#111';g.textAlign='center';g.textBaseline='middle';g.font='700 13px '+FB;g.fillText(txt,0,1);
}
function drawWall(h){
  const D=h.o.d,pos=h.pos,M=['ㅋㅋㅋㅋㅋ','도배 ㄱㄱ','GG','??','레전드','ㄹㅇㅋㅋ','캬','방장 ㅎㅇ','와'];
  g.save();
  const gr2=h.ax?g.createLinearGradient(pos-60,0,pos+60,0):g.createLinearGradient(0,pos-60,0,pos+60);gr2.addColorStop(0,D.col+'00');gr2.addColorStop(.5,D.col+'55');gr2.addColorStop(1,D.col+'00');
  g.fillStyle=gr2;if(h.ax)g.fillRect(pos-60,0,120,A);else g.fillRect(0,pos-60,A,120);
  g.strokeStyle=D.hi;g.globalAlpha=.6;g.lineWidth=3;
  for(let q=0;q<8;q++){const al=((q*80+h.t*500)%A),bk=-h.sg*40;g.beginPath();if(h.ax){g.moveTo(pos+bk,al);g.lineTo(pos+bk*2.4,al)}else{g.moveTo(al,pos+bk);g.lineTo(al,pos+bk*2.4)}g.stroke()}
  g.globalAlpha=1;
  for(let q=0;q<10;q++){const al=q*62+((h.t*70)%62)-20,jt=Math.sin(q*2.3+h.t*6)*14;g.save();if(h.ax)g.translate(pos+jt,al);else g.translate(al,pos+jt);g.scale(.95,.95);chatBubble(M[(q*7+Math.floor(h.t*3))%M.length],D.col);g.restore()}
  g.restore();
}
function drawNana(h){
  const u=clamp(h.t/h.fl,0,1);let x=h.x,y=h.y,z=0;if(u<1){x=h.x0+(h.x-h.x0)*u;y=h.y0+(h.y-h.y0)*u;z=Math.sin(Math.PI*u)*80}
  g.save();g.globalAlpha=clamp((h.life-h.t)/.4,0,1);
  if(u>=1){g.strokeStyle='#ffd43b';g.globalAlpha*=.35+.2*Math.sin(clock*6);g.lineWidth=2;g.beginPath();g.arc(x,y,20,0,TAU);g.stroke();g.globalAlpha=clamp((h.life-h.t)/.4,0,1)}
  g.fillStyle='#0006';g.beginPath();g.ellipse(x,y+4,12,5,0,0,TAU);g.fill();
  g.translate(x,y-z);g.rotate(u<1?h.t*12:.4);g.lineJoin='round';
  for(let i=0;i<3;i++){g.save();g.rotate(i*TAU/3);g.beginPath();g.moveTo(0,0);g.quadraticCurveTo(10,-5,17,2);g.quadraticCurveTo(8,5,0,0);g.fillStyle='#ffd43b';g.fill();g.strokeStyle='#5a4300';g.lineWidth=1.6;g.stroke();g.restore()}
  g.fillStyle='#fff3b0';g.beginPath();g.arc(0,0,4,0,TAU);g.fill();g.fillStyle='#5a4300';g.fillRect(-1.5,-8,3,5);
  g.restore();
}
function drawSmoke(h){
  const fa=Math.min(1,h.t/.25)*clamp((h.dur-h.t)/.4,0,1);
  g.save();g.globalAlpha=fa*.9;
  for(let i=0;i<7;i++){const a=i*TAU/7+h.t*.4,r=i?h.r*.45:0,rr=h.r*(i?.62:.8);g.drawImage(spr('#6b7180',1),h.x+Math.cos(a)*r-rr,h.y+Math.sin(a)*r-rr,rr*2,rr*2)}
  g.globalAlpha=fa*.75;g.fillStyle='#4a4f5a';g.beginPath();g.arc(h.x,h.y,h.r*.78,0,TAU);g.fill();
  g.globalAlpha=fa*.35;g.strokeStyle=h.o.d.col;g.lineWidth=2;g.beginPath();g.arc(h.x,h.y,h.r,0,TAU);g.stroke();
  g.restore();
  if(!h.shot){const e=tgt(h.o);if(e){const u=clamp(h.t/.7,0,1);g.save();g.globalCompositeOperation='lighter';g.globalAlpha=.25+.6*u;g.strokeStyle='#ff4655';g.lineWidth=1+2*u;g.beginPath();g.moveTo(h.o.x,h.o.y);g.lineTo(e.x,e.y);g.stroke();glow('#ff4655',e.x,e.y,14+10*u,.8*u);g.restore()}}
}
function drawApe(h){
  if(h.t<0)return;const e=h.e,u=clamp(h.t/h.dur,0,1),x=h.sx+(e.x-h.sx)*u,y=h.sy+(e.y-h.sy)*u,z=Math.sin(Math.PI*u)*90,D=h.o.d,fade=u>=1?clamp(1-(h.t-h.dur)/.25,0,1):1;
  g.save();g.globalAlpha=fade;g.fillStyle='#0005';g.beginPath();g.ellipse(x,y+10,14*(1-z/200),6*(1-z/200),0,0,TAU);g.fill();
  g.translate(x,y-z);g.rotate(Math.sin(h.t*20)*.3);g.lineJoin='round';
  g.strokeStyle=D.col;g.lineWidth=4;g.lineCap='round';g.beginPath();g.moveTo(-12,6);g.lineTo(-23,-9);g.moveTo(12,6);g.lineTo(23,-9);g.stroke();
  g.fillStyle=D.col;g.strokeStyle='#1a0e04';g.lineWidth=2;[-1,1].forEach(sd=>{g.beginPath();g.arc(sd*15,-2,6,0,TAU);g.fill();g.stroke()});
  g.beginPath();g.arc(0,0,15,0,TAU);g.fill();g.stroke();
  g.fillStyle=D.hi;g.beginPath();g.ellipse(-4,-2,5,6,0,0,TAU);g.ellipse(4,-2,5,6,0,0,TAU);g.ellipse(0,5,8,6,0,0,TAU);g.fill();
  g.fillStyle='#1a0e04';g.beginPath();g.arc(-4,-2,1.8,0,TAU);g.arc(4,-2,1.8,0,TAU);g.fill();g.lineWidth=1.5;g.beginPath();g.arc(0,5,3,.2,Math.PI-.2);g.stroke();
  g.restore();
}
function drawGear(f){
  if(f.dead||f.hid)return;const D=f.d;
  if(f.swing){
    const S2=f.swing,u=clamp(S2.t/.34,0,1),e=1-Math.pow(1-u,2),a=S2.a-1.9+3.8*e,R2=f.r+44;
    g.save();g.translate(f.x,f.y);
    g.save();g.globalCompositeOperation='lighter';g.lineCap='round';g.strokeStyle=D.hi;g.globalAlpha=.6*(1-u*.5);g.lineWidth=18;g.beginPath();g.arc(0,0,R2,S2.a-1.9,a);g.stroke();g.globalAlpha=1;g.strokeStyle='#ffffff';g.lineWidth=3;g.beginPath();g.arc(0,0,R2+8,Math.max(S2.a-1.9,a-.8),a);g.stroke();g.restore();
    g.rotate(a);g.translate(R2,0);g.rotate(Math.PI/2);g.scale(1.6,1.6);drawChair();g.restore();
  }
  if(f.br>0&&f.bk=='gas'){g.save();g.translate(f.x,f.y);g.rotate(f.ba);g.lineJoin='round';g.fillStyle='#d63031';g.strokeStyle='#3a0b0b';g.lineWidth=2;g.fillRect(f.r-8,-8,18,16);g.strokeRect(f.r-8,-8,18,16);g.fillStyle='#2a2a2a';g.fillRect(f.r+10,-3,11,6);g.fillStyle='#ffffff';g.fillRect(f.r-4,-8,4,16);g.restore()}
}
function drawDecoy(h){
  const u=clamp(h.t/h.dur,0,1);g.save();g.translate(h.x,h.y);g.rotate(clock*3);g.globalAlpha=.85;for(let i=0;i<6;i++){g.rotate(TAU/6);g.fillStyle=i%2?'#e0245e':'#b0103a';g.beginPath();g.ellipse(14+8*u,0,9,5,0,0,TAU);g.fill()}g.restore();g.save();g.globalCompositeOperation='lighter';glow(h.o.d.col,h.x,h.y,30+40*u,.5+.4*u);g.restore();g.save();
  g.globalAlpha=.8;g.strokeStyle=h.o.d.col;g.lineWidth=2;g.setLineDash([4,4]);g.lineDashOffset=-clock*30;g.beginPath();g.arc(h.x,h.y,32,0,TAU);g.stroke();g.restore();
}
function drawGey(h){
  h.sp.forEach(q=>{if(q.done)return;const u=clamp(h.t/q.dl,0,1);g.save();g.translate(q.x,q.y);g.strokeStyle='#ff8a2c';g.globalAlpha=.5+.4*u;g.lineWidth=2.5;g.setLineDash([8,6]);g.lineDashOffset=-clock*40;g.beginPath();g.arc(0,0,46,0,TAU);g.stroke();g.setLineDash([]);g.globalAlpha=.25*u;g.fillStyle='#ff5a1f';g.beginPath();g.arc(0,0,46*u,0,TAU);g.fill();g.restore()});
}
function drawPool(h){
  const fa=Math.min(1,h.t/.2)*clamp((h.dur-h.t)/.5,0,1);g.save();g.globalAlpha=fa;g.translate(h.x,h.y);
  g.fillStyle='#1a0602';g.beginPath();for(let i=0;i<=16;i++){const a=i*TAU/16,r=h.r*(1+.08*Math.sin(i*2.7+h.t*2));i?g.lineTo(Math.cos(a)*r,Math.sin(a)*r*.75):g.moveTo(Math.cos(a)*r,Math.sin(a)*r*.75)}g.closePath();g.fill();
  const gr=g.createRadialGradient(0,0,4,0,0,h.r);gr.addColorStop(0,'#ffd27a');gr.addColorStop(.5,'#ff5a1f');gr.addColorStop(1,'#5a1204');g.save();g.scale(1,.75);g.fillStyle=gr;g.beginPath();g.arc(0,0,h.r*.82,0,TAU);g.fill();g.restore();
  g.strokeStyle='#ffe2a0';g.lineWidth=1.5;for(let k=0;k<6;k++){const bx=Math.cos(k*1.7)*h.r*.5,by=Math.sin(k*2.3)*h.r*.32,br=3+3*Math.abs(Math.sin(h.t*3+k));g.beginPath();g.arc(bx,by,br,0,TAU);g.stroke()}
  g.globalCompositeOperation='lighter';glow('#ff8a2c',0,0,h.r*1.1,.35*fa);g.restore();
}
function drawMaw(h){
  const t=h.t;g.save();g.translate(h.x,h.y);const u=clamp(t/.7,0,1);
  g.save();g.globalCompositeOperation='lighter';glow('#ff5a1f',0,0,70+50*u,.35+.3*u);g.restore();
  g.strokeStyle='#ffb347';g.lineWidth=3;g.lineCap='round';for(let i=0;i<10;i++){const a=i*TAU/10+.3;g.beginPath();g.moveTo(0,0);g.lineTo(Math.cos(a)*90*u,Math.sin(a)*60*u);g.stroke()}
  if(t>.7){const v=clamp((t-.7)/.25,0,1),sink=clamp((t-1.2)/.4,0,1);g.globalAlpha=1-sink;g.scale(1-.3*sink,1-.3*sink);
    [-1,1].forEach(sd=>{g.save();g.translate(0,sd*(70*(1-v)+8));g.lineJoin='round';
      g.beginPath();g.moveTo(-85,0);g.quadraticCurveTo(0,sd*95,85,0);g.closePath();const jg=g.createLinearGradient(0,0,0,sd*90);jg.addColorStop(0,'#3a0c04');jg.addColorStop(1,'#120302');g.fillStyle=jg;g.fill();g.strokeStyle='#ff5a1f';g.lineWidth=3;g.stroke();
      g.fillStyle='#ffd27a';for(let k=-3;k<=3;k++){g.beginPath();g.moveTo(k*22-8,0);g.lineTo(k*22,-sd*16);g.lineTo(k*22+8,0);g.closePath();g.fill()}
      g.restore()})}
  g.restore();
}
function drawLeap(f){
  if(!f.lp||f.dead)return;const L=f.lp,D=f.d;if(L.t<.35)return;
  const u=clamp((L.t-.35)/1.15,0,1);g.save();g.translate(f.x,f.y);g.globalAlpha=.35+.4*u;g.fillStyle='#000';g.beginPath();g.ellipse(0,f.r*.4,f.r*(.5+.9*u),f.r*.45*(.5+.9*u),0,0,TAU);g.fill();
  g.strokeStyle=D.col;g.lineWidth=3;g.setLineDash([10,8]);g.lineDashOffset=-clock*60;g.globalAlpha=.8;g.beginPath();g.arc(0,0,105,0,TAU);g.stroke();g.setLineDash([]);
  g.globalAlpha=.15+.2*u;g.fillStyle=D.col;g.beginPath();g.arc(0,0,105*u,0,TAU);g.fill();g.restore();
  if(L.t>=1.25){const v=clamp((L.t-1.25)/.25,0,1),yy=f.y-(1-v*v)*520,sz=f.r*3.2;g.save();g.globalCompositeOperation='lighter';glow('#ff8a2c',f.x,yy,f.r*3,.9);g.restore();g.drawImage(ICON(D,84),f.x-sz/2,yy-sz/2,sz,sz)}
}
function drawHZ(h){
  if(HZD[h.k]){HZD[h.k](h);return}
  if(h.k=='gey'){drawGey(h);return}
  if(h.k=='pool'){drawPool(h);return}
  if(h.k=='maw'){drawMaw(h);return}
  if(h.k=='decoy'){drawDecoy(h);return}
  if(h.k=='smoke')return;
  if(h.k=='wall'){drawWall(h);return}
  if(h.k=='nana'){drawNana(h);return}
  if(h.k=='ape'){drawApe(h);return}
  if(h.k=='toon')return;
  if(h.k=='lock'){drawLock(h);return}
  if(h.k=='ink'){drawInk(h);return}
  if(h.k=='kb'){drawKB(h);return}
  if(h.k=='brick'){drawBrick(h);return}
  if(h.k=='blaster'){drawBlaster(h);return}
  if(h.k=='quake'){drawQuake(h);return}
  if(h.k=='floor'){drawFloor(h);return}
  if(h.k=='dragon'){drawDragon(h);return}
  const D=h.o.d;
  if(h.k=='nova'){
    const rr=h.t*620;
    g.save();g.beginPath();g.rect(0,0,A,A);g.clip();
    g.fillStyle=D.hi+'26';g.beginPath();g.arc(h.x,h.y,rr,0,TAU);g.fill();
    g.lineWidth=16;g.strokeStyle=D.hi;g.beginPath();g.arc(h.x,h.y,rr,0,TAU);g.stroke();
    g.lineWidth=7;g.strokeStyle=D.col;g.beginPath();g.arc(h.x,h.y,Math.max(1,rr-14),0,TAU);g.stroke();
    g.fillStyle=D.hi;
    for(let i=0;i<56;i++){const a=i*TAU/56,hh=14+12*Math.abs(Math.sin(i*2.7));g.save();g.translate(h.x+Math.cos(a)*(rr+8),h.y+Math.sin(a)*(rr+8));g.rotate(a);g.beginPath();g.moveTo(hh,0);g.lineTo(0,-7);g.lineTo(0,7);g.closePath();g.fill();g.restore()}
    g.restore();return;
  }
  const p=h.t/h.dl;
  g.save();g.translate(h.x,h.y);
  g.fillStyle=D.col+'33';g.beginPath();g.arc(0,0,h.r,0,TAU);g.fill();
  g.strokeStyle=D.hi;g.lineWidth=3;g.setLineDash([12,8]);g.lineDashOffset=-clock*50;g.beginPath();g.arc(0,0,h.r,0,TAU);g.stroke();g.setLineDash([]);
  g.fillStyle=D.col+'88';g.beginPath();g.arc(0,0,h.r*p,0,TAU);g.fill();
  g.restore();
  if(h.v)return;const q=p*p,fl=Math.sin(h.t*40);
  g.save();g.translate(h.x+(1-q)*180,h.y-(1-q)*480);g.rotate(Math.atan2(480,-180));
  g.save();g.globalCompositeOperation='lighter';glow('#ff6a1c',0,0,70,.7);glow('#ffd36b',0,0,34,.9);g.restore();
  g.fillStyle=D.dk;flame(2.6,fl);g.fillStyle=D.col;flame(2.2,-fl);g.fillStyle=D.hi;flame(1.5,fl);g.fillStyle='#fff3c4';flame(.8,-fl);
  poly([[16,0],[9,-11],[-3,-13],[-12,-5],[-10,8],[2,13],[12,9]]);g.fillStyle='#2a1a14';g.fill();g.lineWidth=3;g.strokeStyle='#120a08';g.stroke();
  g.strokeStyle='#ffb347';g.lineWidth=2;g.beginPath();g.moveTo(-6,-6);g.lineTo(2,0);g.lineTo(-2,7);g.moveTo(2,0);g.lineTo(10,-3);g.stroke();
  g.restore();
}
function intro(){
  const p=clamp((4.4-tm)/1.4,0,1),e=1-Math.pow(1-Math.min(1,p*2.2),3),out=clamp((p-.86)/.14,0,1),n=F.length,cw=A/n,sl=70,m=(1-e)+out;
  F.forEach((f,i)=>{
    const D=f.d,tx=cw*(i+.5),mid=n==3&&i==1;
    g.save();g.translate(mid?0:(i<n/2?-1:1)*m*A*1.1,mid?-m*A:0);
    const x0=i*cw,x1=(i+1)*cw;
    g.beginPath();g.moveTo(i?x0+sl/2:-300,110);g.lineTo(i<n-1?x1+sl/2:A+300,110);g.lineTo(i<n-1?x1-sl/2:A+300,A-110);g.lineTo(i?x0-sl/2:-300,A-110);g.closePath();
    const pg=g.createLinearGradient(0,110,0,A-110);pg.addColorStop(0,D.col);pg.addColorStop(1,D.dk);g.fillStyle=pg;g.fill();g.lineWidth=6;g.strokeStyle='#07080c';g.stroke();
    g.save();g.clip();g.globalAlpha=.12;g.fillStyle='#ffffff';g.font='900 '+Math.round(cw*1.3)+'px '+FB;g.textAlign='center';g.textBaseline='middle';g.fillText(D.gl,tx,A*.5);
    g.globalAlpha=.08;for(let q=0;q<10;q++){const x=((q*70+p*240+800)%(A+160))-80;g.beginPath();g.moveTo(x,110);g.lineTo(x+24,110);g.lineTo(x-30,A-110);g.lineTo(x-54,A-110);g.fill()}
    g.restore();
    const isz=n==3?96:120;g.drawImage(ICON(D,isz),tx-isz/2,A*.5-isz-30,isz,isz);
    g.textAlign='center';g.textBaseline='middle';g.lineJoin='round';g.lineWidth=10;g.strokeStyle='#07080c';
    g.font=(n==3?34:52)+'px '+FD;g.strokeText(D.name,tx,A*.5+18);g.fillStyle='#fff';g.fillText(D.name,tx,A*.5+18);
    g.font=(n==3?12:15)+'px '+FD;g.lineWidth=5;g.strokeText('ULT · '+D.sk[2].n,tx,A*.5+56);g.fillStyle=D.hi;g.fillText('ULT · '+D.sk[2].n,tx,A*.5+56);
    g.restore();
  });
  if(p>.5){
    const q=clamp((p-.5)/.2,0,1);
    g.save();g.translate(A/2,A/2+(n==3?150:0));g.rotate(-.12);const sc=3.2-2.2*back(q);g.scale(sc,sc);g.globalAlpha=clamp(q*3,0,1)*(1-out);
    g.font='92px '+FD;g.textAlign='center';g.textBaseline='middle';g.lineJoin='round';
    g.lineWidth=16;g.strokeStyle='#07080c';g.strokeText('VS',0,0);g.fillStyle='#ffcf3f';g.fillText('VS',0,0);
    g.restore();
  }
}
function rnameEn(r){const n=TOUR.N>>r;return n==2?'GRAND FINAL':n==4?'SEMIFINAL':n==8?'QUARTERFINAL':'ROUND OF 16'}
function rname(r){const n=TOUR.N>>r;return n==2?'결승':n==4?'4강':n+'강'}
function tourIntro(){
  const T0=TM0-tm,len=TM0-3,p=clamp(T0/len,0,1),fin=TOURM.final,e1=1-Math.pow(1-clamp(T0/.6,0,1),3),out=clamp((p-.9)/.1,0,1);
  g.save();g.fillStyle='rgba(4,3,2,'+(.88*Math.min(1,T0*3)*(1-out))+')';g.fillRect(-300,-300,A+600,A+600);
  if(fin){g.save();g.globalCompositeOperation='lighter';for(let i=0;i<5;i++){const a=Math.sin(clock*.8+i)*.5;g.globalAlpha=.09*(1-out);g.fillStyle='#ffe9a3';g.beginPath();g.moveTo(A*(.1+i*.2),-100);g.lineTo(A/2+Math.sin(a)*320-70,A+60);g.lineTo(A/2+Math.sin(a)*320+70,A+60);g.closePath();g.fill()}g.restore()}
  g.globalAlpha=clamp(T0*2,0,1)*(1-out);g.textAlign='center';g.textBaseline='middle';
  const ty=A*.15;g.font='700 '+(fin?46:28)+'px Cinzel,serif';g.fillStyle=goldG(ty-26,ty+26);g.fillText(rnameEn(TOURM.r),A/2,ty);
  g.font='15px '+FD;g.fillStyle='#b8954a';g.fillText(rname(TOURM.r)+(fin?'':' · '+(TOURM.m+1)+'경기'),A/2,ty+(fin?38:28));
  g.strokeStyle='#d4af37';g.lineWidth=1.5;g.beginPath();g.moveTo(A/2-190*e1,ty+(fin?56:46));g.lineTo(A/2+190*e1,ty+(fin?56:46));g.stroke();
  [[F[0],-1],[F[1],1]].forEach(([f,sd])=>{const D=f.d,cx=A/2+sd*150+sd*(1-e1)*420+sd*out*420,cy=A*.56;g.save();g.translate(cx,cy);
    poly([[-105,-130],[105,-130],[105,110],[85,130],[-105,130]]);const cg=g.createLinearGradient(0,-130,0,130);cg.addColorStop(0,'#17120a');cg.addColorStop(1,'#060504');g.fillStyle=cg;g.fill();g.strokeStyle=goldG(-130,130);g.lineWidth=2.5;g.stroke();
    g.save();g.globalCompositeOperation='lighter';glow(D.col,0,-30,110,.35);g.restore();
    g.drawImage(ICON(D,130),-65,-112,130,130);
    g.font='24px '+FD;g.fillStyle='#ffffff';g.fillText(D.name,0,48);g.font='12px '+FD;g.fillStyle='#d4af37';g.fillText('ULT · '+D.sk[2].n,0,80);
    g.restore()});
  if(T0>.5){const q=back(clamp((T0-.5)/.3,0,1));g.save();g.translate(A/2,A*.56);g.scale(q,q);g.font='700 '+(fin?64:52)+'px Cinzel,serif';g.fillStyle='#000';g.fillText('VS',3,4);g.fillStyle=goldG(-32,32);g.fillText('VS',0,0);g.restore()}
  g.restore();
}
function tourCount(){
  const n=Math.ceil(tm),u=n-tm,fin=TOURM.final,e=1-Math.pow(1-clamp(u*4,0,1),3);
  g.save();g.fillStyle='#000';g.fillRect(-300,-300,A+600,342);g.fillRect(-300,A-42,A+600,342);g.fillStyle='#d4af37';g.fillRect(0,42,A,1.5);g.fillRect(0,A-43.5,A,1.5);
  g.font='12px Cinzel,serif';g.textAlign='center';g.textBaseline='middle';g.fillStyle='#b8954a';g.fillText(rnameEn(TOURM.r)+'   ·   '+F[0].d.name+'  vs  '+F[1].d.name,A/2,21);
  g.translate(A/2,A/2);
  if(fin){g.save();g.globalCompositeOperation='lighter';glow('#f2c94c',0,0,260,.25*(1-u));g.restore()}
  g.strokeStyle='#2a200a';g.lineWidth=10;g.beginPath();g.arc(0,0,130,0,TAU);g.stroke();
  g.strokeStyle=goldG(-130,130);g.lineWidth=6;g.beginPath();g.arc(0,0,130,-Math.PI/2,-Math.PI/2+TAU*(1-u));g.stroke();
  for(let i=0;i<60;i++){g.save();g.rotate(i*TAU/60+clock*.15);g.fillStyle=i%5?'#5a4614':'#d4af37';g.fillRect(-1,-152,2,i%5?6:12);g.restore()}
  if(fin){g.save();g.rotate(-clock*.3);g.strokeStyle='rgba(212,175,55,.45)';g.lineWidth=1.5;g.setLineDash([3,9]);g.beginPath();g.arc(0,0,175,0,TAU);g.stroke();g.restore()}
  const sc=(1+(1-e)*.8)*(fin?1.15:1);g.globalAlpha=1-clamp((u-.85)/.15,0,1);g.scale(sc,sc);
  g.font='700 150px Cinzel,serif';g.textAlign='center';g.textBaseline='middle';g.fillStyle='#000';g.fillText(n,6,8);g.fillStyle=goldG(-70,70);g.fillText(n,0,0);
  g.restore();
}
function count(){
  const n=Math.ceil(tm),u=n-tm,c=['#fff','#ff5a4a','#ffd24a','#f2f4f8'][n]||'#fff',e=1-Math.pow(1-clamp(u*4,0,1),3);
  g.save();g.translate(A/2,A/2);g.strokeStyle=c;g.lineCap='round';
  g.lineWidth=10;g.globalAlpha=.9;g.beginPath();g.arc(0,0,130,-Math.PI/2,-Math.PI/2+TAU*(1-u));g.stroke();
  g.lineWidth=4;g.globalAlpha=(1-u)*.8;g.beginPath();g.arc(0,0,80+u*320,0,TAU);g.stroke();
  g.fillStyle=c;
  for(let i=0;i<12;i++){g.save();g.rotate(i*TAU/12+u*2);g.globalAlpha=1-u;g.fillRect(150+u*50,-3,22,6);g.restore()}
  g.restore();
  big(n,1-clamp((u-.82)/.18,0,1),(1+(1-e)*1.4)*(1+u*.12),c);
}
function fightTxt(){
  const e=.9-fight,q=back(clamp(e*5,0,1)),a=clamp(fight*4,0,1);
  g.save();g.globalAlpha=a*.9;g.fillStyle='#ffd24a';
  g.fillRect(-300,A/2-86*(1-e*.6),A+600,6);g.fillRect(-300,A/2+80*(1-e*.6),A+600,6);
  g.restore();
  big('FIGHT!',a,1.7-.7*q,'#ffd24a');
}
function banner(){
  if(bn&&bn.ult){ultTitle();return}
  if(!bn)return;
  const w=220,h=40,y=36,inT=Math.min(1,bn.t/.22),out=bn.t>1.2?(bn.t-1.2)/.3:0;
  const sl=(1-(1-Math.pow(1-inT,3)))+out;
  const x0=bn.side?A-w+sl*w:-sl*w;
  g.save();
  g.beginPath();g.moveTo(x0+16,y);g.lineTo(x0+w,y);g.lineTo(x0+w-16,y+h);g.lineTo(x0,y+h);g.closePath();
  g.fillStyle=bn.d.col;g.fill();g.lineWidth=4;g.strokeStyle='#0b0d12';g.stroke();
  g.fillStyle=bn.d.hi;g.fillRect(x0+(bn.side?10:0),y+h+3,w-10,4);
  g.font='24px '+FD;g.textAlign='center';g.textBaseline='middle';
  g.lineWidth=5;g.strokeStyle='#0b0d12';g.strokeText(bn.txt,x0+w/2,y+h/2+1);g.fillStyle='#fff';g.fillText(bn.txt,x0+w/2,y+h/2+1);
  g.restore();
}

function big(txt,alpha,sc,col){
  g.save();g.globalAlpha=alpha;g.translate(A/2,A/2);g.transform(1,0,-.18,1,0,0);g.scale(sc,sc);
  g.font='130px '+FD;g.textAlign='center';g.textBaseline='middle';
  g.lineJoin='round';g.lineWidth=16;g.strokeStyle='#0b0d12';g.strokeText(txt,0,0);g.fillStyle=col;g.fillText(txt,0,0);
  g.restore();
}

function draw(){
  g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
  if(phase=='menu'){drawMenu();return}
  if(phase=='tour'||phase=='champ'){drawTourBG();return}
  const sx=(Math.random()-.5)*shake,sy=(Math.random()-.5)*shake;
  g.save();g.translate(ox+sx,oy+sy);g.scale(k,k);g.beginPath();g.rect(-16,-16,A+32,A+32);g.clip();
  if(zk>.01){const zz=1+.07*zk;g.translate(zx,zy);g.scale(zz,zz);g.translate(-zx,-zy)}
  g.save();g.translate(A/2,A/2);g.scale(cz,cz);g.translate(-(A/2+(cfx-A/2)*(cz-1)/.3*.5),-(A/2+(cfy-A/2)*(cz-1)/.3*.5));
  g.save();g.beginPath();g.rect(0,0,A,A);g.clip();
  g.drawImage(floor(),0,0,A,A);floorFX();
  if(TOURM){g.fillStyle='rgba(8,6,2,.45)';g.fillRect(0,0,A,A);g.strokeStyle='rgba(212,175,55,.3)';g.lineWidth=2;g.beginPath();g.arc(A/2,A/2,92,0,TAU);g.stroke();g.font='700 20px Cinzel,serif';g.textAlign='center';g.textBaseline='middle';g.fillStyle='rgba(212,175,55,.2)';g.fillText(TOURM.final?'GRAND FINAL':'JS CHAMPIONS',A/2,A/2)}
  g.restore();

  AM.forEach(m=>{g.globalAlpha=.1+.08*Math.sin(clock*2+m.p);g.fillStyle=F[m.c].d.hi;g.beginPath();g.arc(m.x,m.y,m.r,0,TAU);g.fill()});g.globalAlpha=1;
  FX.forEach(x=>GROUND(x.k)&&drawFX(x));
  if(cine>.02){g.fillStyle='rgba(6,8,14,'+.6*cine+')';g.fillRect(-300,-300,A+600,A+600)}
  if(phase!='cd'||tm<2.3){g.save();g.globalCompositeOperation='lighter';F.forEach(f=>{if(!f.dead)glow(f.d.col,f.x,f.y+6,f.r*4.2,.28)});B.forEach(q=>glow(q.D.col,q.x,q.y,60,.22));g.restore();g.globalAlpha=1}
  F.forEach(f=>{if(f.jump){const j=f.jump,u=Math.min(1,j.t/j.dur);g.save();g.translate(j.tx,j.ty);g.strokeStyle=f.d.col;g.globalAlpha=.5+.4*u;g.lineWidth=4;g.setLineDash([12,8]);g.lineDashOffset=-clock*60;g.beginPath();g.arc(0,0,95,0,TAU);g.stroke();g.setLineDash([]);g.fillStyle=f.d.col+'33';g.beginPath();g.arc(0,0,95*u,0,TAU);g.fill();g.restore()}});g.globalAlpha=1;
  HZ.forEach(drawHZ);B.forEach(bullet);
  F.forEach(afterImg);F.forEach(f=>ball(f,tgt(f)||f));F.forEach(lowHP);F.forEach(frozen);F.forEach(drawGulp);F.forEach(drawGear);F.forEach(drawLeap);
  FX.forEach(x=>!GROUND(x.k)&&drawFX(x));
  drawParticles();
  HZ.forEach(h=>{if(h.k=='smoke')drawSmoke(h)});
  HZ.forEach(h=>{if(h.k=='toon')drawToon(h)});
  HZ.forEach(h=>{if(HZP[h.k])HZP[h.k](h)});
  if(TSTOP)drawStop();
  if(MAD)drawMad();
  T.forEach(x=>{
    if(x.dm){drawDmg(x);return}
    const pp=1+.7*Math.max(0,(x.l-.85)/.15);
    g.save();g.translate(x.x,x.y);g.scale(pp,pp);g.globalAlpha=Math.min(1,x.l*1.6);
    g.font=`${x.size}px ${FD}`;g.textAlign='center';
    g.lineWidth=5;g.lineJoin='round';g.strokeStyle='#0b0d12';g.strokeText(x.txt,0,0);
    g.fillStyle=x.col;g.fillText(x.txt,0,0);g.restore();
  });
  if(phase=='end')winFX();
  banner();

  if(phase=='cd'){if(TOURM){tm>3?tourIntro():tourCount()}else{tm>3?intro():count()}}
  else if(fight>0)fightTxt();
  if(phase=='end'&&endT>.1&&endT<1.9)big('K.O.',clamp((1.9-endT)*3,0,1),.4+.9*back(clamp((endT-.1)/.3,0,1)),'#ff5a4a');

  g.restore();
  const vg=g.createRadialGradient(A/2,A/2,A*.35,A/2,A/2,A*.78);vg.addColorStop(0,'#0000');vg.addColorStop(1,'#000a');g.fillStyle=vg;g.fillRect(0,0,A,A);
  if(cine>.02){g.fillStyle='#0b0d12';const bh=44*cine;g.fillRect(0,0,A,bh);g.fillRect(0,A-bh,A,bh)}
  g.lineWidth=14;g.strokeStyle=TOURM?'#2a200a':'#454b5a';g.strokeRect(-7,-7,A+14,A+14);
  g.lineWidth=3;g.strokeStyle=TOURM?'#d4af37':'#7b8294';g.strokeRect(-1,-1,A+2,A+2);
  g.fillStyle=TOURM?'#f2c94c':'#9aa1b3';
  [[-7,-7],[A+7,-7],[-7,A+7],[A+7,A+7]].forEach(([x,y])=>{g.beginPath();g.arc(x,y,6,0,TAU);g.fill();g.strokeStyle='#12151c';g.lineWidth=2;g.stroke()});
  drawWalls();
  g.restore();
}

function drawGulp(f){
  const G=f.gulp;if(!G||f.dead)return;const tg=G.tg,a=ang(f,tg);
  if(G.st==0){
    const op=Math.min(1,G.t/.25),R=f.r*1.65,o=1.05*op;
    g.save();g.translate(f.x,f.y);g.rotate(a);
    g.save();g.globalCompositeOperation='lighter';glow(f.d.col,f.r,0,100,.45*op);g.restore();
    g.fillStyle='#2a0716';g.beginPath();g.moveTo(0,0);g.arc(0,0,R,-o,o);g.closePath();g.fill();g.lineWidth=4;g.strokeStyle=f.d.dk;g.stroke();
    g.fillStyle='#ffffff';for(const sd of[-1,1])for(let i=0;i<4;i++){g.save();g.rotate(sd*o*(1-i/4.5));g.beginPath();g.moveTo(R,-4);g.lineTo(R-10,0);g.lineTo(R,4);g.fill();g.restore()}
    g.fillStyle='#ff5f8f';g.beginPath();g.ellipse(R*.55,0,R*.35,R*.17,0,0,TAU);g.fill();
    g.restore();
  }else{
    g.save();g.globalAlpha=.55;g.fillStyle=tg.d.col;g.beginPath();g.arc(f.x+Math.cos(clock*7)*f.r*.55,f.y+Math.sin(clock*7)*f.r*.4,tg.r*.45,0,TAU);g.fill();g.restore();
  }
}
function drawP(p){
  const q=Math.max(0,p.l/p.m),a=(p.a0||1)*Math.min(1,q*1.5);
  if(p.sh==4){const pal=p.pal,c=pal?pal[Math.min(pal.length-1,Math.floor((1-q)*pal.length))]:p.col;g.globalAlpha=a;g.drawImage(spr(c),p.x-p.r,p.y-p.r,p.r*2,p.r*2);return}
  if(p.sh==3){g.globalAlpha=a;g.drawImage(spr(p.col,1),p.x-p.r,p.y-p.r,p.r*2,p.r*2);return}
  if(p.sh==5){g.globalAlpha=a;g.strokeStyle=p.col;g.lineWidth=p.r;g.lineCap='round';g.beginPath();g.moveTo(p.x,p.y);g.lineTo(p.x-p.vx*.035,p.y-p.vy*.035);g.stroke();return}
  if(p.sh==10){
    g.globalAlpha=Math.min(1,q*3);g.fillStyle='#00000055';g.beginPath();g.ellipse(p.x,p.y+2,p.r,p.r*.5,0,0,TAU);g.fill();
    g.save();g.translate(p.x,p.y-p.z);g.rotate(p.rot);const r=p.r;
    if(p.cube)poly([[-r,-r],[r,-r],[r,r],[-r,r]]);else poly([[r,0],[r*.3,-r*.9],[-r*.8,-r*.5],[-r*.7,r*.6],[r*.2,r*.8]]);g.fillStyle=p.col;g.fill();g.strokeStyle='#0b0d12';g.lineWidth=1.5;g.stroke();
    poly([[r,0],[r*.3,-r*.9],[-r*.2,-r*.2]]);g.fillStyle='#ffffff26';g.fill();g.restore();return;
  }
  if(p.sh==7){g.save();g.translate(p.x,p.y);g.rotate((p.rot||0)*.2);g.scale(p.r/10,p.r/10);g.globalAlpha=a;heartPath();g.fillStyle=p.col;g.fill();g.restore();return}
  if(p.sh==8){g.save();g.translate(p.x,p.y);g.rotate(p.rot||0);g.globalAlpha=a;g.fillStyle=p.col;const r=p.r;g.beginPath();g.moveTo(0,-r*2);g.quadraticCurveTo(0,0,r*2,0);g.quadraticCurveTo(0,0,0,r*2);g.quadraticCurveTo(0,0,-r*2,0);g.quadraticCurveTo(0,0,0,-r*2);g.fill();g.restore();return}
  if(p.sh==9){g.globalAlpha=a;g.font=Math.round(p.r)+'px '+FB;g.textAlign='center';g.textBaseline='middle';g.fillStyle=p.col;g.fillText(p.txt,p.x,p.y);return}
  if(p.sh==13){g.save();g.translate(p.x,p.y);g.rotate(p.rot||0);g.globalAlpha=a;g.fillStyle=p.col;g.beginPath();g.ellipse(0,0,p.r,p.r*.55,0,0,TAU);g.fill();g.fillStyle='rgba(0,0,0,.18)';g.beginPath();g.ellipse(p.r*.3,0,p.r*.5,p.r*.25,0,0,TAU);g.fill();g.restore();return}
  if(p.sh==12){g.globalAlpha=a;g.fillStyle=p.col;const r=p.r;g.fillRect(p.x-r/3,p.y-r,r*2/3,r*2);g.fillRect(p.x-r,p.y-r/3,r*2,r*2/3);return}
  if(p.sh==6){g.globalAlpha=a;g.fillStyle=p.col;g.beginPath();g.arc(p.x,p.y,p.r,0,TAU);g.fill();return}
  g.save();g.translate(p.x,p.y);g.rotate(p.rot||0);g.globalAlpha=q;g.fillStyle=p.col;
  if(p.sh==1){g.beginPath();g.moveTo(p.r*1.8,0);g.lineTo(-p.r*.6,-p.r*.8);g.lineTo(-p.r,0);g.lineTo(-p.r*.6,p.r*.8);g.closePath();g.fill();g.strokeStyle='#ffffffaa';g.lineWidth=1;g.beginPath();g.moveTo(p.r*1.8,0);g.lineTo(-p.r*.6,-p.r*.8);g.stroke()}
  else if(p.sh==2)g.fillRect(-p.r/2,-p.r/2,p.r,p.r);
  else{g.beginPath();g.arc(0,0,p.r*Math.max(.3,q),0,TAU);g.fill()}
  g.restore();
}
function drawParticles(){
  for(const p of Pt)if(!p.gl)drawP(p);
  g.save();g.globalCompositeOperation='lighter';for(const p of Pt)if(p.gl)drawP(p);g.restore();
  g.globalAlpha=1;
}
function drawTourBG(){
  g.fillStyle='#060504';g.fillRect(0,0,W,H);
  g.save();g.globalCompositeOperation='lighter';glow('#d4af37',W/2,-H*.1,Math.max(W,H)*.85,.16);
  for(let i=0;i<4;i++){const a=Math.sin(clock*.4+i*1.7)*.35,x0=W*(.15+i*.23);g.globalAlpha=.045;g.fillStyle='#ffe9a3';g.beginPath();g.moveTo(x0,-20);g.lineTo(x0+Math.sin(a)*H-90,H);g.lineTo(x0+Math.sin(a)*H+90,H);g.closePath();g.fill()}
  g.restore();
  if(MP.length<60)MP.push({x:rnd(0,W),y:H+10,v:rnd(10,40),r:rnd(.8,2.2),ph:rnd(0,TAU)});
  g.fillStyle='#f2c94c';MP=MP.filter(q=>{q.y-=q.v*LDT;q.x+=Math.sin(clock+q.ph)*.3;g.globalAlpha=Math.max(0,.3+.3*Math.sin(clock*3+q.ph));g.beginPath();g.arc(q.x,q.y,q.r,0,TAU);g.fill();return q.y>-10});g.globalAlpha=1;
  if(phase=='champ')drawChamp();
  const vg=g.createRadialGradient(W/2,H/2,Math.min(W,H)*.3,W/2,H/2,Math.max(W,H)*.75);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.7)');g.fillStyle=vg;g.fillRect(0,0,W,H);
}
function drawChamp(){
  const c=TOUR&&TOUR.rounds[TOUR.r][0];if(!c)return;const s=Math.min(W,H*.8)*.36,cx=W/2,cy=H*.36;
  g.save();g.translate(cx,cy);g.rotate(clock*.15);g.globalCompositeOperation='lighter';for(let i=0;i<16;i++){g.rotate(TAU/16);g.globalAlpha=.06;g.fillStyle='#ffe9a3';g.beginPath();g.moveTo(0,0);g.lineTo(Math.max(W,H),-60);g.lineTo(Math.max(W,H),60);g.closePath();g.fill()}g.restore();
  g.save();g.translate(cx,cy);const gg=goldG(-s,s*.9);g.lineJoin='round';g.lineCap='round';
  [-1,1].forEach(sd=>{g.beginPath();g.moveTo(sd*s*.5,-s*.66);g.bezierCurveTo(sd*s*1.02,-s*.72,sd*s*1.02,-s*.12,sd*s*.3,-s*.02);g.lineWidth=s*.11;g.strokeStyle='#5a4210';g.stroke();g.lineWidth=s*.075;g.strokeStyle=gg;g.stroke()});
  g.fillStyle=gg;g.strokeStyle='#5a4210';g.lineWidth=3;
  g.beginPath();g.moveTo(-s*.62,-s*.75);g.lineTo(s*.62,-s*.75);g.quadraticCurveTo(s*.6,s*.05,0,s*.18);g.quadraticCurveTo(-s*.6,s*.05,-s*.62,-s*.75);g.closePath();g.fill();g.stroke();
  g.beginPath();g.ellipse(0,-s*.75,s*.62,s*.07,0,0,TAU);g.fillStyle='#8a6a1c';g.fill();g.stroke();
  g.fillStyle=gg;g.fillRect(-s*.08,s*.15,s*.16,s*.32);g.fillRect(-s*.32,s*.47,s*.64,s*.1);g.fillRect(-s*.42,s*.57,s*.84,s*.14);g.strokeStyle='#5a4210';g.lineWidth=2;g.strokeRect(-s*.42,s*.57,s*.84,s*.14);
  g.globalAlpha=.35;g.fillStyle='#ffffff';g.beginPath();g.ellipse(-s*.3,-s*.4,s*.06,s*.28,.15,0,TAU);g.fill();g.globalAlpha=1;
  const isz=s*.62;g.drawImage(ICON(DEF[c.c],Math.round(isz)),-isz/2,-s*.7,isz,isz);
  g.restore();
  if(CF.length<120)CF.push({x:rnd(0,W),y:-10,vy:rnd(40,110),vx:rnd(-20,20),r:rnd(3,6),rot:rnd(0,TAU),vr:rnd(-6,6),c:['#f2c94c','#ffe9a3','#ffffff','#b8860b'][Math.floor(rnd(0,4))]});
  CF=CF.filter(q=>{q.y+=q.vy*LDT;q.x+=q.vx*LDT+Math.sin(clock*2+q.rot)*.4;q.rot+=q.vr*LDT;g.save();g.translate(q.x,q.y);g.rotate(q.rot);g.fillStyle=q.c;g.fillRect(-q.r/2,-q.r,q.r,q.r*2);g.restore();return q.y<H+20});
}
function drawMenu(){
  g.fillStyle='#07080c';g.fillRect(0,0,W,H);
  const n=F.length;g.save();g.globalCompositeOperation='lighter';
  F.forEach((f,i)=>glow(f.d.col,W*(n==3?[.1,.5,.9][i]:[.08,.92][i]),H*.32,Math.max(W,H)*.5,.17));g.restore();
  const hz=H*.62;g.save();g.strokeStyle='#ffcf3f';g.lineWidth=1;
  for(let i=-14;i<=14;i++){g.globalAlpha=.07;g.beginPath();g.moveTo(W/2+i*16,hz);g.lineTo(W/2+i*W*.2,H);g.stroke()}
  const sp=(clock*.35)%1;for(let j=0;j<12;j++){const u=(j+sp)/12,y=hz+(H-hz)*u*u;g.globalAlpha=.12*u+.015;g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.stroke()}
  g.restore();
  g.save();g.globalCompositeOperation='lighter';const hg=g.createLinearGradient(0,hz-50,0,hz+6);hg.addColorStop(0,'rgba(255,207,63,0)');hg.addColorStop(1,'rgba(255,207,63,.16)');g.fillStyle=hg;g.fillRect(0,hz-50,W,56);
  for(let i=0;i<4;i++){const x=((clock*40+i*W*.37)%(W*1.6))-W*.3;g.globalAlpha=.03;g.fillStyle='#fff';g.beginPath();g.moveTo(x,0);g.lineTo(x+60,0);g.lineTo(x-140,H);g.lineTo(x-200,H);g.fill()}
  g.restore();
  if(MP.length<26)MP.push({x:rnd(0,W),y:H+20,v:rnd(15,45),r:rnd(1,2.2),ph:rnd(0,TAU)});
  g.fillStyle='#ffffff';MP=MP.filter(q=>{q.y-=q.v*LDT;q.x+=Math.sin(clock+q.ph)*.3;g.globalAlpha=.2;g.beginPath();g.arc(q.x,q.y,q.r,0,TAU);g.fill();return q.y>-10});
  g.globalAlpha=1;const vg=g.createRadialGradient(W/2,H/2,Math.min(W,H)*.3,W/2,H/2,Math.max(W,H)*.75);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.65)');g.fillStyle=vg;g.fillRect(0,0,W,H);
}
function loop(t){
  const dt=Math.min(.033,(t-last)/1000||0);last=t;LDT=dt;
  if(!PAUSE)update(dt);draw();requestAnimationFrame(loop);
}
function paintMenu(){
  [0,1,2].forEach(sd=>{
    const d=pickD(sd),el=document.querySelector('.slot[data-s="'+sd+'"]');if(!el)return;
    el.classList.toggle('on',ACT==sd);el.style.setProperty('--c',d.col);el.style.setProperty('--h',d.hi);
    el.querySelector('b').textContent=d.name;paintIc(el.querySelector('.ic'),d,60);
    el.querySelector('ul').innerHTML=d.sk.map(k=>`<li class="${k.ult?'u':''}">${k.ult?'ULT · ':''}${k.n}</li>`).join('');
  });
  document.querySelectorAll('.tile').forEach(t=>{const i=+t.dataset.i;[0,1,2].forEach(q=>t.classList.toggle('p'+(q+1),q<MODE&&baseOf(SEL[q])==i));t.classList.toggle('act',baseOf(SEL[ACT])==i)});
  {const cur=MENU_T?(fillT(),TSEL[ACT]):SEL[ACT],vs=VARS(cur);
    $('#vrow').innerHTML=vs.length>1?vs.map(v=>`<button data-v="${v}" class="${v==cur?'on':''}" style="--h:${DEF[v].hi}">${v==baseOf(cur)?'기본':(DEF[v].name.split('•')[1]||DEF[v].name).trim()}</button>`).join(''):'';
    document.querySelectorAll('#vrow button').forEach(b=>b.addEventListener('click',()=>{SFX('click');const v=+b.dataset.v;if(MENU_T){TSEL[ACT]=v;paintMenu()}else{SEL[ACT]=v;initMenu()}}))}
  $('#hint').textContent=MENU_T?'SLOT '+(ACT+1)+' 선택 중':'P'+(ACT+1)+' 선택 중';
  if(MENU_T){fillT();$('#tslots').innerHTML=TSEL.slice(0,TSIZE).map((c,i)=>`<button class="ts${i==ACT?' on':''}" data-t="${i}"><canvas data-c="${c}"></canvas><i>${i+1}</i></button>`).join('');
    document.querySelectorAll('.ts').forEach(b=>{paintIc(b.querySelector('canvas'),DEF[+b.querySelector('canvas').dataset.c],26);b.addEventListener('click',()=>{SFX('click');ACT=+b.dataset.t;paintMenu()})});
    document.querySelectorAll('.tile').forEach(t=>{t.classList.toggle('act',baseOf(TSEL[ACT])==+t.dataset.i);[1,2,3].forEach(q=>t.classList.remove('p'+q))})}
}
function initMenu(){TOURM=null;if(MENU_T)MODE=2;init();phase='menu';tm=0;document.body.classList.add('m');const M=$('#menu');scr('menu');$('#demo').classList.remove('on');M.classList.toggle('m3',MODE==3&&!MENU_T);M.classList.toggle('mt',!!MENU_T);$('#msg').className='';$('#bracket').classList.remove('on');$('#champ').classList.remove('on');paintMenu()}
function scr(id){if(id!='set'&&PREVB){PREVB=0}['hub','modes','dict','dinfo','set'].forEach(x=>$('#'+x).classList.toggle('on',x==id));$('#menu').classList.toggle('on',id=='menu')}
function goHome(){TOURM=null;DEMO=null;init();phase='menu';tm=0;document.body.classList.add('m');$('#msg').className='';$('#bracket').classList.remove('on');$('#champ').classList.remove('on');$('#demo').classList.remove('on');scr('hub')}
function drawHex(el,st,D){
  el.width=440;el.height=400;const c=el.getContext('2d');c.setTransform(2,0,0,2,0,0);c.clearRect(0,0,220,200);const cx=110,cy=102,R=68,L=['공격','생존','속도','사거리','범위','궁극기'];
  for(let k=1;k<=5;k++){c.beginPath();for(let i=0;i<6;i++){const a=-Math.PI/2+i*TAU/6,r=R*k/5;i?c.lineTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r):c.moveTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r)}c.closePath();c.strokeStyle=k==5?'#3a3f4c':'#22262f';c.lineWidth=1;c.stroke()}
  for(let i=0;i<6;i++){const a=-Math.PI/2+i*TAU/6;c.strokeStyle='#22262f';c.beginPath();c.moveTo(cx,cy);c.lineTo(cx+Math.cos(a)*R,cy+Math.sin(a)*R);c.stroke();c.fillStyle='#aab1c3';c.font='700 11px "Noto Sans KR",sans-serif';c.textAlign='center';c.textBaseline='middle';c.fillText(L[i]+' '+st[i],cx+Math.cos(a)*(R+24),cy+Math.sin(a)*(R+14))}
  c.beginPath();st.forEach((v,i)=>{const a=-Math.PI/2+i*TAU/6,r=R*v/10;i?c.lineTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r):c.moveTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r)});c.closePath();c.fillStyle=D.col+'59';c.fill();c.strokeStyle=D.hi;c.lineWidth=2;c.stroke();
  st.forEach((v,i)=>{const a=-Math.PI/2+i*TAU/6,r=R*v/10;c.fillStyle=D.hi;c.beginPath();c.arc(cx+Math.cos(a)*r,cy+Math.sin(a)*r,2.6,0,TAU);c.fill()});
}
function mkDict(){
  $('#dgrid').innerHTML=DEF.map((d,i)=>`<button class="tile" data-d="${i}" style="--c:${d.col};--h:${d.hi}"><canvas class="ic"></canvas><b>${d.name}</b></button>`).join('');
  document.querySelectorAll('#dgrid .tile').forEach(t=>{paintIc(t.querySelector('.ic'),DEF[+t.dataset.d],50);t.addEventListener('click',()=>{audioOn();SFX('click');openInfo(+t.dataset.d)})});
}
function openInfo(i){
  DI=i;const d=DEF[i],I=INFO[d.name]||{st:[5,5,5,5,5,5],sk:[]};$('#dname').textContent=d.name;paintIc($('#dic'),d,104);drawHex($('#dhex'),I.st,d);
  $('#dsk').innerHTML=(I.p?`<div class="dsk np"><i>P</i><div><b>패시브</b><small>${I.p}</small></div><em></em></div>`:'')+d.sk.map((s,j)=>`<button class="dsk${s.ult?' u':''}" data-j="${j}"><i>${s.ult?'ULT':j+1}</i><div><b>${s.n}</b><small>${(I.sk[j]||[])[1]||''}</small></div><em>${(I.sk[j]||[])[0]||''} DMG<br>${s.ult?'게이지':s.cd+'s'}</em></button>`).join('');
  document.querySelectorAll('#dsk button').forEach(b=>b.addEventListener('click',()=>{audioOn();SFX('click');startDemo(DI,+b.dataset.j)}));scr('dinfo');
}
function startDemo(i,j){
  DEMO={i,j,t:0,next:.6};MODE=2;SEL=[i,0,SEL[2]||0];init();
  const dm=F[1];dm.d={name:'허수아비',gl:'허',k:'dummy',r:26,sp:110,col:'#8a8f9c',hi:'#d5d9e2',dk:'#2a2d36',sk:DEF[0].sk};dm.r=26;dm.sp=110;dm.dummy=1;
  F[0].x=170;F[0].y=300;dm.x=430;dm.y=300;phase='demo';tm=0;fight=0;document.body.classList.add('m');scr('none');$('#demo').classList.add('on');
  const s=DEF[i].sk[j];$('#demot').textContent=DEF[i].name+(s.ult?' · ULT':' · SKILL '+(j+1));$('#demon').textContent=s.n;$('#demod').textContent=((INFO[DEF[i].name]||{sk:[]}).sk[j]||[])[1]||'';
}
function demoTick(dt){
  const D2=DEMO,f=F[0],dm=F[1];D2.t+=dt;F.forEach(x=>{x.ug=0;x.dead=0;if(x.hp<45)x.hp=100});dm.gcd=99;dm.cast=null;dm.lp=null;
  const busy=f.cast||TSTOP||MAD||f.gulp||f.jump||f.lp||f.rush>0||f.swing||f.auto>0;
  if(!f.cast)f.gcd=99;
  if(D2.t>=D2.next&&!busy){const s=f.d.sk[D2.j];f.cast={j:D2.j,t:0,s};bn={txt:s.n,d:f.d,side:0,t:0,ult:s.ult};SFX(s.ult?'ult':'cast');D2.next=D2.t+(s.ult?7.5:3.8)}
}
function endDemo(){DEMO=null;TSTOP=null;MAD=null;$('#demo').classList.remove('on');init();HZ=[];B=[];phase='menu';document.body.classList.add('m');scr('dinfo')}
function fillT(){while(TSEL.length<16)TSEL.push(Math.floor(Math.random()*DEF.length))}
function startTour(){
  fillT();const N=TSIZE,tot={},seen={},ent=TSEL.slice(0,N).map((c,i)=>({c,id:i}));ent.forEach(e=>tot[e.c]=(tot[e.c]||0)+1);
  ent.forEach(e=>{seen[e.c]=(seen[e.c]||0)+1;e.lab=DEF[e.c].name+(tot[e.c]>1?' '+String.fromCharCode(64+seen[e.c]):'')});
  const rounds=[ent];for(let n=N/2;n>=1;n/=2)rounds.push(Array(n).fill(null));TOUR={N,rounds,r:0,m:0};showBracket();
}
function showBracket(){
  phase='tour';TOURM=null;MP=[];document.body.classList.add('m');$('#menu').classList.remove('on');$('#msg').className='';$('#champ').classList.remove('on');$('#bracket').classList.add('on');
  const R=TOUR.rounds.length-1;$('#brounds').innerHTML=TOUR.rounds.slice(0,R).map((_,r)=>`<span class="${r==TOUR.r?'on':r<TOUR.r?'done':''}">${rname(r)}</span>`).join('');
  const cur=TOUR.rounds[TOUR.r],nx=TOUR.rounds[TOUR.r+1],fin=cur.length==2;$('#bsub').textContent=fin?'GRAND FINAL':rnameEn(TOUR.r)+' · MATCH '+(TOUR.m+1);
  let h='';for(let m=0;m<cur.length/2;m++){const a=cur[2*m],b=cur[2*m+1],w=nx[m];h+=`<div class="bm${m==TOUR.m?' cur':''}"><span class="no">${m+1}</span><div class="be${w?(w==a?' win':' lose'):''}"><canvas data-c="${a.c}"></canvas><b>${a.lab}</b></div><span class="v">VS</span><div class="be r${w?(w==b?' win':' lose'):''}"><canvas data-c="${b.c}"></canvas><b>${b.lab}</b></div></div>`}
  $('#bmatches').innerHTML=h;document.querySelectorAll('#bmatches canvas').forEach(c=>paintIc(c,DEF[+c.dataset.c],30));
  $('#bnext').textContent=fin?'GRAND FINAL':'NEXT MATCH';const el=document.querySelector('.bm.cur');if(el&&el.scrollIntoView)el.scrollIntoView({block:'center'});
}
function startMatch(){
  const cur=TOUR.rounds[TOUR.r],a=cur[2*TOUR.m],b=cur[2*TOUR.m+1],fin=cur.length==2;
  TOURM={a,b,final:fin,r:TOUR.r,m:TOUR.m};MODE=2;SEL=[a.c,b.c,SEL[2]||0];
  $('#bracket').classList.remove('on');document.body.classList.remove('m');
  init();F[0].d=Object.assign({},F[0].d,{name:a.lab});F[1].d=Object.assign({},F[1].d,{name:b.lab});buildHUD();TM0=fin?6.4:5.2;tm=TM0;
}
function showChamp(){phase='champ';TOURM=null;CF=[];MP=[];$('#msg').className='';document.body.classList.add('m');$('#champ').classList.add('on');$('#cname').textContent=TOUR.rounds[TOUR.r][0].lab;SFXa('champ')}
function mkMenu(){
  $('#grid').innerHTML=DEF.map((d,i)=>{if(d.vof!=null)return '';const vc=DEF.filter(x=>x.vof===i).length;return `<button class="tile" data-i="${i}" style="--c:${d.col};--h:${d.hi}"><canvas class="ic"></canvas><b>${d.name}</b><em class="b1">P1</em><em class="b2">P2</em><em class="b3">P3</em>${vc?'<em class="vb">+'+vc+'</em>':''}</button>`}).join('');
  document.querySelectorAll('.tile').forEach(t=>{paintIc(t.querySelector('.ic'),DEF[+t.dataset.i],50);t.addEventListener('click',()=>{audioOn();SFX('click');if(MENU_T){TSEL[ACT]=+t.dataset.i;ACT=(ACT+1)%TSIZE;paintMenu();return}SEL[ACT]=+t.dataset.i;ACT=(ACT+1)%MODE;initMenu()})});
  document.querySelectorAll('#tsize button').forEach(b=>b.addEventListener('click',()=>{audioOn();SFX('click');TSIZE=+b.dataset.t;document.querySelectorAll('#tsize button').forEach(x=>x.classList.toggle('on',x==b));if(ACT>=TSIZE)ACT=0;paintMenu()}));
  document.querySelectorAll('.slot').forEach(sl=>sl.addEventListener('click',()=>{audioOn();SFX('click');ACT=+sl.dataset.s;paintMenu()}));
  document.querySelectorAll('#mode button').forEach(b=>b.addEventListener('click',()=>{audioOn();SFX('click');MENU_T=b.dataset.m=='T'?1:0;MODE=MENU_T?2:+b.dataset.m;ACT=0;document.querySelectorAll('#mode button').forEach(x=>x.classList.toggle('on',x==b));if(ACT>=MODE)ACT=0;initMenu()}));
}
$('#start').addEventListener('click',()=>{audioOn();SFX('click');if(MENU_T){startTour();return}document.body.classList.remove('m');$('#menu').classList.remove('on');init()});
$('#rand').addEventListener('click',()=>{audioOn();SFX('click');if(MENU_T){TSEL=TSEL.map(()=>Math.floor(Math.random()*DEF.length));paintMenu();return}SEL=SEL.map(()=>Math.floor(Math.random()*DEF.length));initMenu()});
$('#go').addEventListener('click',()=>{SFX('click');init()});
addEventListener('pointerdown',audioOn);
$('#snd').addEventListener('click',()=>{audioOn();MUTE^=1;$('#snd').textContent=MUTE?'🔇':'🔊';if(MUTE)stopBGM();else playBGM(BGMn||'bgm_menu',1)});
$('#home').addEventListener('click',initMenu);
const inMatch=()=>phase=='cd'||phase=='play'||phase=='end';
$('#bexit').addEventListener('click',()=>{if(!inMatch())return;audioOn();SFX('click');PAUSE=1;$('#cfms').textContent=TOURM?'이 경기는 무효가 되고 대진표로 돌아가요':'메인 메뉴로 돌아가요';$('#cfm').classList.add('on')});
$('#cno').addEventListener('click',()=>{SFX('click');PAUSE=0;$('#cfm').classList.remove('on')});
$('#cyes').addEventListener('click',()=>{SFX('click');PAUSE=0;$('#cfm').classList.remove('on');TSTOP=null;MAD=null;if(TOURM&&TOUR){TOURM=null;showBracket()}else initMenu()});
$('#bskip').addEventListener('click',()=>{if(!inMatch()||shown)return;audioOn();SKIP=1;let n=0;try{while(!shown&&n<60000){update(.016);n++}}finally{SKIP=0}Pt=[];FX=[];T=[];B=[];HZ=[];TSTOP=null;MAD=null;SFX('ko')});
$('#tnext').addEventListener('click',()=>{audioOn();SFX('click');if(TOUR.rounds[TOUR.r].length==1)showChamp();else showBracket()});
$('#bnext').addEventListener('click',()=>{audioOn();SFX('click');startMatch()});
$('#bquit').addEventListener('click',()=>{SFX('click');TOUR=null;goHome()});
$('#cmenu').addEventListener('click',()=>{SFX('click');TOUR=null;goHome()});
$('#cagain').addEventListener('click',()=>{audioOn();SFX('click');startTour()});
$('#hplay').addEventListener('click',()=>{audioOn();SFX('click');scr('modes')});
$('#hdict').addEventListener('click',()=>{audioOn();SFX('click');scr('dict')});
$('#hset').addEventListener('click',()=>{audioOn();SFX('click');mkSet();scr('set')});
document.querySelectorAll('.back').forEach(b=>b.addEventListener('click',()=>{SFX('click');const t2=b.dataset.b;if(t2=='home')goHome();else scr(t2)}));
document.querySelectorAll('.mc').forEach(b=>b.addEventListener('click',()=>{audioOn();SFX('click');const m=b.dataset.m;MENU_T=m=='T'?1:0;MODE=MENU_T?2:+m;ACT=0;$('#mtitle').textContent=MENU_T?'토너먼트 · 참가자 선택':m=='3'?'3인 난투 · 캐릭터 선택':'1대1 · 캐릭터 선택';initMenu()}));
$('#dclose').addEventListener('click',()=>{SFX('click');endDemo()});

// ===== 설정: 사운드별 볼륨 =====
const SLB={m:'전체 볼륨',b:'배경음악 전체',s:'효과음 전체',bgm_menu:'메인 화면 음악',bgm_battle:'전투 음악',bgm_tour:'토너먼트 전투 음악',bgm_final:'결승 · 우승 음악',
gun:'총 (풀오토 · 헤드샷 · 매드무비)',throw:'던지기 (카드 · 바나나)',arrow:'가은 화살',skillshot:'병은 Q 스킬샷',knife:'지성 칼',slash:'흉악범 뒤잡기',swing:'가은 의자',beam:'블래스터 · 레일건',
floor1:'7단 콤보 1타',floor2:'7단 콤보 2타',floor3:'7단 콤보 3타',floor4:'7단 콤보 4타',floor5:'7단 콤보 5타',floor6:'7단 콤보 6타',floor7:'7단 콤보 7타 (막타)',
tstop:'지성 시간 정지',hit:'맞는 소리 (보통)',tick:'맞는 소리 (약)',heavy:'맞는 소리 (강)',cast:'스킬 시전',ult:'궁극기 발동',cd:'카운트다운',go:'FIGHT',vs:'VS (시작할 때)',ko:'KO',
slam:'민채 쿵',h_wheel:'곤지암 · 휠체어',h_curse:'곤지암 · 저주 걸기',h_burst:'곤지암 · 저주 터짐',h_ult:'곤지암 · 정전 시작',h_flicker:'곤지암 · 형광등 깜빡',h_glass:'곤지암 · 전등 깨짐',kick:'해버지 · 슛',juggle:'해버지 · 저글링 · 공 튕김',tackle:'해버지 · 태클',whistle:'해버지 · 휘슬',goal:'해버지 · 골 함성',champ:'토너먼트 우승',gulp:'민채 꿀꺽',chew:'민채 씹기',spit:'민채 뱉기',rush:'병은 스탠드 러시',click:'버튼 클릭'};
function setRow(k,isG){const v=isG?VOL[k]:pv(k);const d=document.createElement('div');d.className='vrow';
d.innerHTML='<div class="vl"><b>'+SLB[k]+'</b>'+(isG?'':'<small>'+k+'.mp3</small>')+'</div><input type="range" min="0" max="100" step="1" value="'+Math.round(v*100)+'"><span class="vp">'+Math.round(v*100)+'%</span>'+(isG?'':'<button class="vplay">▶</button>');
const r=d.querySelector('input'),p=d.querySelector('.vp');
r.addEventListener('input',()=>{const x=r.value/100;p.textContent=r.value+'%';if(isG)VOL[k]=x;else VOL.p[k]=x;saveVol()});
if(!isG)d.querySelector('.vplay').addEventListener('click',()=>{audioOn();if(isB(k)){if(PREVB==k){PREVB=0;playBGM('bgm_menu',1)}else{PREVB=k;playBGM(k,1)}}else{SL[k]=0;SFX(k)}});
return d}
function mkSet(){const g2=$('#sgrid');g2.innerHTML='';const H=t=>{const h=document.createElement('div');h.className='vh';h.textContent=t;g2.appendChild(h)};
H('전체');['m','b','s'].forEach(k=>g2.appendChild(setRow(k,1)));
H('배경음악');['bgm_menu','bgm_battle','bgm_tour','bgm_final'].forEach(k=>g2.appendChild(setRow(k)));
H('효과음');SND.forEach(k=>g2.appendChild(setRow(k)));
const rb=document.createElement('button');rb.className='vreset';rb.textContent='기본값으로 되돌리기';rb.addEventListener('click',()=>{VOL={m:1,b:1,s:1,p:{}};saveVol();mkSet()});g2.appendChild(rb)}
;
