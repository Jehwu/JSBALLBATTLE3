// ======================================================================
// sound.js : 효과음 만드는 곳 (mp3 없이 게임이 켜질 때 직접 만듦)
// 안에 들어있는 순서 : sound
// (순서가 중요해서 위에서부터 차례로 실행됨 · 섹션 위치를 바꾸지 말 것)
// ======================================================================



// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ▶ 섹션 : sound
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// sfxgen.js : 새 효과음들을 게임이 켜질 때 직접 만들어 씀 (mp3 파일 필요 없음)
// sounds 폴더에 같은 이름의 mp3가 있으면 그 파일을 우선 사용
(function(){
const SR=22050,PI2=Math.PI*2;
let seed=7;const R=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296},U=(a,b)=>a+(b-a)*R();
const N=d=>Math.floor(SR*d),Z=d=>new Float32Array(N(d));
const T=(d,f)=>{const x=Z(d);for(let i=0;i<x.length;i++)x[i]=f(i/SR);return x};
const mul=(x,f)=>{for(let i=0;i<x.length;i++)x[i]*=f(i/SR);return x};
const noise=d=>T(d,()=>R()*2-1);
const ed=(x,k)=>mul(x,t=>Math.exp(-t*k));
function biq(x,ty,f,q){q=q||.707;f=Math.min(f,SR*.45);const w=PI2*f/SR,c=Math.cos(w),s=Math.sin(w),al=s/(2*q);let b0,b1,b2;
  if(ty=='lp'){b0=(1-c)/2;b1=1-c;b2=b0}else{b0=(1+c)/2;b1=-(1+c);b2=b0}
  const a0=1+al,a1=-2*c,a2=1-al,y=new Float32Array(x.length);let x1=0,x2=0,y1=0,y2=0;
  for(let i=0;i<x.length;i++){const v=(b0*x[i]+b1*x1+b2*x2-a1*y1-a2*y2)/a0;x2=x1;x1=x[i];y2=y1;y1=v;y[i]=v}return y}
const lp=(x,f)=>biq(biq(x,'lp',f),'lp',f),hp=(x,f)=>biq(biq(x,'hp',f),'hp',f),bp=(x,lo,hi)=>lp(hp(x,lo),hi);
function sweep(f0,f1,d){let ph=0;return T(d,t=>{ph+=PI2*f0*Math.pow(f1/f0,t/d)/SR;return Math.sin(ph)})}
const sine=(f,d)=>T(d,t=>Math.sin(PI2*f*t));
function place(buf,x,at,g){g=g==null?1:g;const n=Math.min(x.length,N(.008)),i0=Math.floor(at*SR);for(let i=0;i<x.length&&i0+i<buf.length;i++){let v=x[i];if(i>x.length-n)v*=(x.length-i)/n;buf[i0+i]+=v*g}}
function add(a,b,g){for(let i=0;i<a.length&&i<b.length;i++)a[i]+=b[i]*(g==null?1:g);return a}
function fade(x,fi,fo){const n1=N(fi),n2=N(fo);for(let i=0;i<n1&&i<x.length;i++)x[i]*=i/n1;for(let i=0;i<n2&&i<x.length;i++)x[x.length-1-i]*=i/n2;return x}
function peak(x){let m=0;for(const v of x)m=Math.max(m,Math.abs(v));return m||1}
// 리버브 (Freeverb 방식)
function verb(x,dur,mix,bright){
  fade(x,0,.03);const L=x.length+N(dur),inp=new Float32Array(L);inp.set(x);const wet=new Float32Array(L);
  const fb=Math.min(.94,.72+dur*.11),dp=1-Math.min(.85,bright/9000);
  [1116,1188,1277,1356,1422,1491,1557,1617].forEach(n=>{n=Math.floor(n*SR/44100);const b=new Float32Array(n);let k=0,fs=0;for(let i=0;i<L;i++){const y=b[k];fs=y*(1-dp)+fs*dp;b[k]=inp[i]+fs*fb;wet[i]+=y;k=(k+1)%n}});
  [556,441,341,225].forEach(n=>{n=Math.floor(n*SR/44100);const b=new Float32Array(n);let k=0;for(let i=0;i<L;i++){const bo=b[k],v=wet[i];wet[i]=-v+bo;b[k]=v+bo*.5;k=(k+1)%n}});
  const s=peak(x)/peak(wet)*.9;for(let i=0;i<L;i++)inp[i]=inp[i]*(1-mix)+wet[i]*s*mix;return inp}
function saw(f,d,nh,vib){const x=Z(d);for(let k=1;k<=nh;k++){if(f*k>SR/2.2)break;for(let i=0;i<x.length;i++){const t=i/SR;x[i]+=Math.sin(PI2*f*k*t*(vib?vib(t):1))/k}}return x}

const G={};
G.h_wheel=()=>{const d=1.8,buf=Z(d);add(buf,mul(lp(noise(d),260),t=>.9*(.6+.4*Math.sin(PI2*3.1*t))));
  for(let k=.05;k<d;k+=.21)place(buf,ed(bp(noise(.03),300,1400),120),k,.9);
  [.12,.55,.98,1.38].forEach((at,k)=>{const sd=.24+U(0,.08),fo=U(-80,80);let ph=0;const sq=T(sd,t=>{ph+=PI2*(1150+380*Math.sin(PI2*(2.2+k*.3)*t)+fo)/SR;return(Math.tanh(Math.sin(ph)*3.5)+.35*Math.sin(ph*2.01))*Math.pow(Math.sin(Math.PI*t/sd),1.5)*(1+.5*Math.sin(PI2*33*t))});place(buf,bp(sq,700,4200),at,.55)});
  return verb(buf,1,.35,3500)};
G.h_curse=()=>{const d=1.4,dr=T(d,t=>Math.sin(PI2*98*t)+Math.sin(PI2*103.5*t)+.7*Math.sin(PI2*138.6*t)+.4*Math.sin(PI2*196*t+Math.sin(PI2*.7*t))),wh=Z(d);
  [700,1150,2400,3300].forEach(c=>{const r=U(3,7);add(wh,mul(bp(noise(d),Math.max(200,c*.8),c*1.25),t=>.5+.5*Math.sin(PI2*r*t)))});
  const x=T(d,t=>0);for(let i=0;i<x.length;i++){const t=i/SR;x[i]=(dr[i]*.35+wh[i]*.9)*Math.pow(Math.min(1,t/.9),2)*Math.min(1,(d-t)/.25)}return verb(x,1.6,.45,3000)};
G.h_burst=()=>{const buf=Z(1.2);place(buf,mul(bp(noise(.35),400,3000),t=>Math.pow(t/.35,3)),0,.6);place(buf,ed(sweep(140,38,.9),4.5),.33,1);place(buf,ed(bp(noise(.25),150,2500),14),.33,.8);
  place(buf,ed(T(.8,t=>Math.sin(PI2*233*t)+Math.sin(PI2*329.6*t)),5),.33,.25);return verb(buf,1.4,.35,2500)};
G.h_ult=()=>{const d=2.4,buf=Z(d);place(buf,add(ed(hp(noise(.02),1500),250),ed(sine(90,.02),120)),0,1);
  let ph=0;const hum=Z(d),sq=Z(d);for(let i=0;i<hum.length;i++){const t=i/SR;ph+=PI2*60*(.2+.8*Math.exp(-t*1.4))/SR;let s=0;for(let k=1;k<=8;k++)s+=Math.sin(ph*k)/Math.pow(k,.6);hum[i]=s;sq[i]=Math.sign(Math.sin(ph*2))*.4}
  const bz=bp(sq,150,3000);for(let i=0;i<hum.length;i++){const t=i/SR;hum[i]=(hum[i]*.6+bz[i]*.5)*Math.exp(-t*1.3)*(1-Math.exp(-t*60))}
  [.25,.42,.5,.71].forEach(k=>{for(let i=N(k);i<N(k+.04);i++)hum[i]*=.1});add(buf,hum);place(buf,ed(sweep(70,28,1.6),2.5),.05,.6);return verb(buf,1.8,.4,2500)};
G.h_flicker=()=>{const d=.7;let z=T(d,t=>Math.sign(Math.sin(PI2*120*t))*.5+Math.sin(PI2*240*t)*.4+(R()*2-1)*.15);z=bp(z,180,5000);
  let gate=Z(d),i=0;while(i<gate.length){const L=N(U(.015,.08)),v=R()<.6?1:.05;for(let j=i;j<i+L&&j<gate.length;j++)gate[j]=v;i+=L}gate=biq(gate,'lp',120);
  for(let j=0;j<z.length;j++)z[j]*=gate[j]*Math.min(1,(d-j/SR)/.15);for(let k=0;k<5;k++)place(z,ed(hp(noise(.006),3000),600),U(0,.6),.6);return verb(z,.6,.2,6000)};
G.h_glass=()=>{const buf=Z(1.9);for(let k=0;k<5;k++){const at=k*.11+U(0,.04);place(buf,ed(hp(noise(.5),2500),9),at,.7);place(buf,ed(sine(U(70,110),.12),30),at,.4)}
  for(let k=0;k<90;k++){const at=Math.pow(U(.05,1.3),1.3),dd=U(.03,.12);place(buf,ed(sine(U(2500,9000),dd),U(40,90)),at,U(.08,.3))}return verb(buf,1,.3,9000)};
G.kick=()=>{const buf=Z(.45);place(buf,ed(sweep(180,55,.25),16),0,1);place(buf,ed(bp(noise(.05),700,4000),70),0,.9);place(buf,ed(sine(310,.18),22),.003,.35);
  place(buf,mul(ed(bp(noise(.3),1500,7000),9),t=>Math.sqrt(.2+.8*t/.3)),.02,.25);return verb(buf,.5,.12,6000)};
G.juggle=()=>{const buf=Z(.25);place(buf,ed(sweep(260,150,.15),28),0,1);place(buf,ed(bp(noise(.02),1200,5000),160),0,.6);place(buf,ed(sine(480,.1),40),0,.25);return buf};
G.tackle=()=>{const buf=Z(.7);place(buf,mul(bp(noise(.38),800,6000),t=>Math.pow(Math.max(0,Math.sin(Math.PI*t/.38)),.7)),0,.55);place(buf,ed(sweep(120,45,.35),10),.28,1);place(buf,ed(bp(noise(.12),200,2500),30),.28,.9);return verb(buf,.5,.15,5000)};
G.whistle=()=>{const buf=Z(1.05);const blow=dd=>{let ph=0;const n=bp(noise(dd),2000,4500);return T(dd,t=>{ph+=PI2*2850*(1+.03*Math.sin(PI2*34*t))/SR;return((Math.sin(ph)+.25*Math.sin(ph*2))*(.75+.25*Math.sin(PI2*34*t))+n[Math.min(n.length-1,Math.floor(t*SR))]*.25)*Math.min(1,t/.02)*Math.min(1,(dd-t)/.04)})};
  place(buf,blow(.16),0,1);place(buf,blow(.62),.26,1);return verb(buf,.6,.15,8000)};
G.goal=()=>{const d=3.2,crowd=Z(d),voices=Z(d);
  [350,600,900,1400,2200,3200].forEach(c=>{const r=U(.5,2),p=U(0,6);add(crowd,mul(bp(noise(d),c*.75,c*1.3),t=>.7+.3*Math.sin(PI2*r*t+p)))});
  for(let v=0;v<60;v++){const f0=U(150,420),vr=U(4,7),vp=U(0,6),st=U(0,.4),gn=U(.3,1);let ph=0;for(let i=0;i<voices.length;i++){const t=i/SR;ph+=f0*(1+.04*Math.sin(PI2*vr*t+vp))/SR;voices[i]+=(2*(ph%1)-1)*Math.min(1,Math.max(0,(t-st)/.2))*gn}}
  const vo=add(add(mul(bp(voices,600,1100),()=>1.4),bp(voices,1000,1500),.9),bp(voices,2400,3000),.4);
  const x=Z(d);for(let i=0;i<x.length;i++){const t=i/SR,env=Math.pow(Math.min(1,t/.35),1.5)*(t<1.6?1:Math.exp(-(t-1.6)*1.4));x[i]=(crowd[i]*.5+vo[i]*.07)*env}
  const cl=Z(d);for(let k=0;k<220;k++)place(cl,ed(bp(noise(.015),900,5000),300),U(.3,3),U(.1,.35));for(let i=0;i<x.length;i++){const t=i/SR;x[i]+=cl[i]*(t>.3?1:0)*Math.exp(-Math.max(0,t-1.8)*1.2)}
  return verb(x,1.6,.35,6000)};
G.champ=()=>{const brass=(f,dd,vel)=>{const s=add(saw(f,dd,30,t=>1+.006*Math.sin(PI2*5.5*t)*Math.min(1,t/.3)),saw(f*1.003,dd,30),.5);return mul(lp(s,Math.min(8000,f*7)),t=>Math.min(1,t/.03)*Math.exp(-t*.6)*Math.min(1,(dd-t)/.08)*(vel||1))};
  const buf=Z(3.6),G4=392,C5=523.25,E5=659.25,G5=783.99,C6=1046.5;
  [[0,G4,.14],[.15,C5,.14],[.3,E5,.14],[.45,G5,.42],[.9,E5,.14],[1.05,G5,.9]].forEach(([at,f,dd])=>place(buf,brass(f,dd),at,.5));
  [C5,E5,G5,C6].forEach(f=>place(buf,brass(f,1.7,.6),1.05,.35));[130.81,196].forEach(f=>place(buf,brass(f,1.8,.8),1.05,.4));
  const roll=Z(1);for(let k=0;k<1;k+=.045)place(roll,ed(sine(95,.12),25),k,.4+.6*k);place(buf,roll,.05,.5);
  place(buf,add(ed(sine(90,.8),5),ed(lp(noise(.8),300),8)),1.05,.9);place(buf,ed(hp(noise(1.6),5000),2.5),1.05,.15);return verb(buf,1.8,.3,7000)};

// ----- 김티비 • 똥먹방 / 김가은 • 웹툰마스터 -----
const bell=(f,dd,dec)=>T(dd,t=>(Math.sin(PI2*f*t)+(f*2.76<SR/2?.4*Math.sin(PI2*f*2.76*t)*Math.exp(-t*6):0)+(f*5.4<SR/2?.2*Math.sin(PI2*f*5.4*t)*Math.exp(-t*10):0))*Math.exp(-t*(dec||4)));
const nsaw=(fn,d)=>{let ph=0;return T(d,t=>{ph+=fn(t)/SR;return 2*(ph%1)-1})};
G.tv_throw=()=>{const d=.42,x=mul(add(bp(noise(d),500,1500),bp(noise(d),1500,3500),.6),t=>Math.pow(Math.sin(Math.PI*t/d),1.6)*(t<d*.5?.6:1));return verb(x,.35,.15,5000)};
G.tv_splat=()=>{const buf=Z(.55);place(buf,ed(sweep(160,60,.14),28),0,1);
  place(buf,mul(ed(bp(noise(.32),300,1800),9),t=>Math.pow(.5+.5*Math.sin(PI2*28*t),2)),.01,.9);
  for(let k=0;k<4;k++)place(buf,ed(sweep(U(300,500),U(110,190),.08),38),U(.03,.26),.45);return verb(buf,.4,.15,3000)};
G.tv_neigh=()=>{const d=1.3,f=t=>(t<.15?600+400*t/.15:t<.95?1000-500*(t-.15)/.8:500-200*Math.min(1,(t-.95)/.3))*(1+.08*Math.sin(PI2*11*t)*Math.min(1,t/.2));
  const v=nsaw(f,d),env=t=>Math.max(0,Math.min(1,t/.05)*Math.min(1,(1.22-t)/.15))*(.75+.25*Math.sin(PI2*11*t));
  const x=add(add(bp(v,650,1350),bp(v,2100,3300),.5),bp(noise(d),1000,4000),.12);mul(x,env);
  place(x,ed(bp(noise(.16),300,1500),15),1.12,.6);return verb(x,.7,.2,5000)};
G.tv_gallop=()=>{const buf=Z(1.55);for(let s=.05;s<1.4;s+=.3)[[0,.9],[.07,.7],[.14,1]].forEach(([o,gn])=>{const hit=add(add(mul(ed(bp(noise(.03),1500,4500),120),()=>.6),ed(sine(U(380,520),.05),60),.8),ed(sine(90,.08),40),.6);place(buf,hit,s+o,gn*U(.85,1))});
  mul(buf,t=>Math.min(1,t/.2)*Math.min(1,(1.55-t)/.35));return verb(buf,.4,.15,4000)};
G.tv_chomp=()=>{const buf=Z(.4);place(buf,mul(ed(hp(noise(.14),1500),20),()=>R()<.3?1:.12),0,.7);place(buf,ed(sweep(220,90,.18),14),.02,.6);
  place(buf,mul(ed(bp(noise(.2),400,1500),12),t=>Math.pow(.5+.5*Math.sin(PI2*35*t),2)),.05,.5);return verb(buf,.3,.1,4000)};
G.tv_live=()=>{const buf=Z(1.4);[[0,1318.5],[.12,1661.2],[.24,1975.5],[.36,2637]].forEach(([at,f])=>place(buf,bell(f,.9,4),at,.4));place(buf,ed(hp(noise(.8),6000),5),.05,.08);return verb(buf,1,.3,8000)};
G.wm_panel=()=>{const buf=Z(.65);place(buf,mul(bp(noise(.2),800,3000),t=>(.5+.5*Math.sin(PI2*25*t))*(t/.2)),0,.4);place(buf,ed(sweep(150,50,.28),14),.2,1);
  place(buf,ed(hp(noise(.04),1500),80),.2,.9);place(buf,ed(bp(noise(.2),2000,6000),15),.22,.3);return verb(buf,.5,.15,5000)};
G.wm_punch=()=>{const buf=Z(.75);place(buf,mul(bp(noise(.15),600,4000),t=>Math.pow(t/.15,2)),0,.5);place(buf,ed(sweep(220,45,.4),9),.15,1);
  place(buf,ed(bp(noise(.08),300,4000),40),.15,1);place(buf,ed(sine(55,.5),6),.15,.5);return verb(buf,.6,.15,4000)};
G.wm_tierup=()=>{const buf=Z(1.3),C=[1046.5,1318.5,1568,2093];C.forEach((f,i)=>place(buf,bell(f,.9,5),i*.08,.45));C.forEach(f=>place(buf,bell(f,1,3),.32,.25));
  place(buf,mul(ed(hp(noise(1),6000),3),t=>.5+.5*Math.sin(PI2*14*t)),.2,.12);return verb(buf,1.2,.3,9000)};
G.wm_gem=()=>{const buf=Z(.5);place(buf,bell(2349,.45,9),0,1);place(buf,bell(3136,.3,12),.01,.5);place(buf,ed(hp(noise(.01),4000),300),0,.5);return verb(buf,.5,.25,9000)};
G.wm_ult=()=>{const d=1.8,buf=Z(d);[261.6,329.6,392,523.2].forEach(f=>place(buf,mul(lp(nsaw(t=>f*(1+.5*t/d),d),2200),t=>Math.min(1,t/1.2)*Math.min(1,(d-t)/.3)),0,.25));
  place(buf,mul(sweep(400,2400,1.5),t=>Math.sin(Math.PI*t/1.5)),0,.3);place(buf,mul(hp(noise(d),5000),t=>Math.pow(t/d,2)),0,.15);return verb(buf,1.6,.4,7000)};
G.wm_crash=()=>{const buf=Z(1.6);place(buf,ed(sweep(110,35,1),3.5),0,1);place(buf,ed(hp(noise(.3),1500),12),0,.8);
  for(let k=0;k<50;k++){const dd=U(.04,.14);place(buf,ed(sine(U(2000,8000),dd),U(40,90)),Math.pow(U(0,.8),1.4),U(.08,.25))}
  [523.25,659.25,783.99].forEach(f=>place(buf,bell(f,1.2,3),0,.3));return verb(buf,1.2,.35,9000)};

// ----- 김건우 • 레디언트 / 흉악범 • 절도범 -----
G.rd_flick=()=>{const buf=Z(.5);place(buf,ed(hp(noise(.03),2000),90),0,1);place(buf,ed(sweep(900,120,.06),50),0,.8);place(buf,ed(sine(120,.1),30),0,.7);place(buf,ed(bp(noise(.25),3000,7000),14),.02,.2);return verb(buf,.5,.15,8000)};
G.rd_head=()=>{const buf=Z(.5);place(buf,bell(3500,.5,8),0,1);place(buf,bell(4700,.3,12),.005,.4);place(buf,ed(hp(noise(.008),4000),400),0,.6);return verb(buf,.4,.2,9000)};
G.rd_flash=()=>{const buf=Z(1.4);place(buf,bell(2600,.12,30),0,.3);place(buf,bell(2600,.12,30),.07,.25);place(buf,ed(hp(noise(.14),800),28),.15,1);place(buf,ed(sweep(300,80,.16),20),.15,.9);
  place(buf,mul(sine(3800,1.1),t=>Math.min(1,t/.05)*Math.exp(-t*1.6)),.17,.18);return verb(buf,.6,.2,8000)};
G.rd_dash=()=>{const d=.35;return verb(mul(add(bp(noise(d),800,5000),bp(noise(d),300,900),.5),t=>Math.pow(Math.sin(Math.PI*t/d),1.4)*(.5+t/d)),.3,.12,6000)};
G.rd_plant=()=>{const buf=Z(1);[0,.12,.24,.36].forEach((at,k)=>{place(buf,ed(bp(noise(.02),1500,6000),180),at,.7);place(buf,ed(sine(900+k*120,.05),60),at,.3)});
  place(buf,mul(sweep(300,900,.4),t=>.4*Math.sin(Math.PI*t/.4)),.42,1);place(buf,bell(1760,.5,6),.85,.4);place(buf,bell(2349,.5,6),.85,.25);return verb(buf,.5,.15,7000)};
G.rd_beep=()=>{const buf=Z(.12);place(buf,mul(T(.1,t=>Math.sign(Math.sin(PI2*1950*t))*.4+Math.sin(PI2*3900*t)*.2),t=>Math.min(1,t/.004)*Math.exp(-t*25)),0,1);return lp(buf,7000)};
G.rd_boom=()=>{const buf=Z(2.2);place(buf,mul(sweep(200,1200,.35),t=>.35*Math.pow(t/.35,2)),0,1);place(buf,mul(hp(noise(.35),2000),t=>.3*Math.pow(t/.35,3)),0,1);
  place(buf,ed(hp(noise(.08),800),40),.36,1);place(buf,ed(sweep(130,28,1.6),2.2),.36,1);place(buf,ed(lp(noise(1.6),500),2.5),.36,.9);place(buf,ed(bp(noise(1),1500,6000),5),.38,.25);return verb(buf,1.8,.35,3500)};
G.th_snatch=()=>{const d=.3,buf=Z(d);place(buf,mul(bp(noise(d),1500,6000),t=>Math.pow(Math.sin(Math.PI*t/d),2)),0,.8);place(buf,mul(ed(bp(noise(.18),2000,5000),10),()=>R()<.25?1:.1),.05,.6);return verb(buf,.3,.12,7000)};
G.th_coin=()=>{const buf=Z(.6);for(let k=0;k<6;k++){const at=U(0,.3),f=U(3000,5200);place(buf,bell(f,.25,U(14,22)),at,U(.3,.6))}return verb(buf,.4,.2,9000)};
G.th_hook=()=>{const buf=Z(.55);place(buf,mul(bp(noise(.25),700,4000),t=>Math.sin(Math.PI*t/.25)),0,.7);place(buf,bell(1200,.12,30),.26,.6);place(buf,ed(bp(noise(.03),1500,6000),120),.26,.8);return verb(buf,.3,.12,6000)};
G.th_steal=()=>{const buf=Z(.6);[[0,880],[.08,660],[.16,440]].forEach(([at,f])=>place(buf,mul(T(.12,t=>Math.sin(PI2*f*t)+.3*Math.sin(PI2*f*3*t)),t=>Math.exp(-t*14)),at,.6));place(buf,ed(hp(noise(.3),5000),8),.05,.1);return verb(buf,.4,.15,8000)};
G.th_ult=()=>{const d=1.6,buf=Z(d);[0,.45].forEach(at=>place(buf,ed(sweep(70,45,.4),6),at,.9));place(buf,mul(bp(noise(.5),600,4000),t=>Math.sin(Math.PI*t/.5)),.05,.4);
  place(buf,mul(T(1.3,t=>Math.sin(PI2*622*t)+Math.sin(PI2*659*t)*.7),t=>.12*Math.min(1,t/.6)*Math.min(1,(1.3-t)/.3)),.25,1);return verb(buf,1.2,.35,5000)};
G.th_cash=()=>{const buf=Z(1.1);place(buf,ed(bp(noise(.04),800,5000),90),0,.9);place(buf,ed(sine(180,.06),50),0,.5);place(buf,bell(2000,.9,4),.07,.6);place(buf,bell(2660,.9,4),.07,.45);
  for(let k=0;k<6;k++)place(buf,bell(U(3200,5000),.2,20),U(.15,.45),U(.2,.4));return verb(buf,.6,.2,9000)};

// ----- 김민채 • 게이모드 -----
G.bl_throw=()=>{const buf=Z(.6);place(buf,mul(bp(noise(.3),900,4000),t=>Math.sin(Math.PI*t/.3)),0,.5);for(let k=0;k<3;k++)place(buf,ed(bp(noise(.04),2000,7000),60),.05+k*.06,.35);
  [1568,2093,2637].forEach((f,i)=>place(buf,bell(f,.3,10),.08+i*.05,.25));return verb(buf,.5,.25,9000)};
G.bl_charm=()=>{const buf=Z(.9);place(buf,mul(sweep(500,1400,.18),t=>Math.sin(Math.PI*t/.18)),0,.5);[[.15,1318.5],[.25,1760]].forEach(([at,f])=>place(buf,bell(f,.6,5),at,.45));
  place(buf,ed(sine(180,.12),25),.02,.3);place(buf,mul(ed(hp(noise(.5),6000),6),t=>.5+.5*Math.sin(PI2*16*t)),.15,.1);return verb(buf,.7,.3,9000)};
G.bl_string=()=>{const d=1,x=T(d,t=>{const f=330*(1+.002*Math.sin(PI2*5*t));let s=0;for(let k=1;k<=6;k++)s+=Math.sin(PI2*f*k*t)*Math.exp(-t*(3+k*1.5))/k;return s});place(x,ed(hp(noise(.01),3000),300),0,.4);return verb(x,.6,.2,7000)};
G.bl_link=()=>{const buf=Z(1.3);place(buf,ed(sweep(160,60,.2),20),0,.8);place(buf,ed(bp(noise(.06),300,3000),40),0,.6);[1046.5,1318.5,1568,2093].forEach((f,i)=>place(buf,bell(f,1,3.5),.05+i*.03,.3));
  place(buf,mul(ed(hp(noise(1),6000),3),t=>.5+.5*Math.sin(PI2*14*t)),.08,.12);return verb(buf,1,.3,9000)};
G.bl_ult=()=>{const buf=Z(2.2),sc=[523.25,659.25,783.99,987.77,1046.5,1318.5,1567.98,1975.53,2093];sc.forEach((f,i)=>place(buf,bell(f,1.2,3),i*.07,.3));
  [523.25,659.25,783.99].forEach(f=>place(buf,mul(lp(saw(f,1.6,8),2500),t=>.12*Math.min(1,t/.5)*Math.min(1,(1.6-t)/.4)),.55,1));place(buf,mul(hp(noise(1.6),6000),t=>.1*Math.sin(Math.PI*t/1.6)),.4,1);return verb(buf,1.6,.4,9000)};
G.bl_page=()=>{const d=.3,buf=Z(d);place(buf,mul(bp(noise(.22),1200,6000),t=>Math.pow(Math.sin(Math.PI*t/.22),2)*(.6+.4*Math.sin(PI2*30*t))),0,.7);place(buf,ed(hp(noise(.02),2500),150),.2,.5);return verb(buf,.3,.15,8000)};
G.bl_end=()=>{const buf=Z(2);[[0,[523.25,659.25,783.99]],[.18,[587.33,739.99,880]],[.36,[659.25,830.61,987.77,1318.5]]].forEach(([at,ch],i)=>ch.forEach(f=>place(buf,bell(f,i==2?1.4:.5,i==2?2.2:5),at,.3)));
  for(let k=0;k<10;k++)place(buf,bell(U(2500,5000),.3,14),U(.36,1),U(.1,.2));place(buf,mul(ed(hp(noise(1.4),6000),2.2),t=>.5+.5*Math.sin(PI2*12*t)),.36,.12);return verb(buf,1.4,.35,9000)};

// ----- 김티비 • 권루티비 -----
G.kr_pass=()=>{const d=.5,buf=Z(d);place(buf,mul(sweep(300,900,.4),t=>.4*Math.sin(Math.PI*t/.4)),0,1);place(buf,mul(bp(noise(.45),800,5000),t=>Math.pow(Math.sin(Math.PI*t/.45),2)),0,.5);return verb(buf,.4,.15,7000)};
G.kr_beat=()=>{const buf=Z(.35);place(buf,ed(sweep(120,45,.25),12),0,1);place(buf,ed(bp(noise(.03),2000,8000),120),0,.4);place(buf,ed(hp(noise(.08),6000),40),.12,.25);return buf};
G.kr_swap=()=>{const buf=Z(.6);place(buf,mul(sweep(400,2400,.18),t=>.4*Math.sin(Math.PI*t/.18)),0,1);place(buf,mul(sweep(2400,400,.18),t=>.4*Math.sin(Math.PI*t/.18)),.16,1);place(buf,ed(bp(noise(.08),1500,7000),30),.15,.5);return verb(buf,.4,.2,8000)};
G.kr_tear=()=>{const d=.45,buf=Z(d);place(buf,mul(bp(noise(.35),1500,8000),t=>(R()<.35?1:.2)*Math.min(1,t/.05)*Math.exp(-t*4)),0,.9);place(buf,ed(hp(noise(.04),3000),80),.32,.6);return verb(buf,.3,.12,8000)};
G.kr_shutter=()=>{const buf=Z(1);place(buf,ed(bp(noise(.02),2000,8000),200),0,.9);place(buf,ed(bp(noise(.03),1000,5000),150),.06,.8);place(buf,mul(sweep(2000,6000,.5),t=>.15*Math.exp(-t*3)),.08,1);place(buf,ed(sine(160,.15),30),.06,.4);return verb(buf,.4,.15,9000)};

// ----- 공병은 • 챌린저 -----
G.ch_hook=()=>{const buf=Z(.7);place(buf,mul(bp(noise(.5),1500,6000),t=>Math.sin(Math.PI*t/.5)*.5),0,1);for(let k=0;k<9;k++)place(buf,bell(U(1800,3200),.08,40),k*.05+U(0,.02),U(.15,.3));return verb(buf,.4,.15,8000)};
G.ch_pull=()=>{const buf=Z(.7);for(let k=0;k<7;k++)place(buf,bell(U(1500,2600),.06,45),k*.035,.25);place(buf,ed(sweep(160,55,.25),14),.25,1);place(buf,ed(bp(noise(.06),300,3000),40),.25,.7);return verb(buf,.4,.15,6000)};
G.ch_spin=()=>{const d=1.5,buf=Z(d);for(let k=0;k<6;k++)place(buf,mul(bp(noise(.22),1500,7000),t=>Math.pow(Math.sin(Math.PI*t/.22),2)),k*.25,.55);place(buf,mul(T(d,t=>Math.sin(PI2*(300+80*Math.sin(PI2*4*t))*t)),t=>.12*Math.min(1,t/.2)*Math.min(1,(d-t)/.2)),0,1);return verb(buf,.4,.15,8000)};
G.ch_flash=()=>{const buf=Z(.6);place(buf,mul(sweep(600,3200,.12),t=>.5*Math.sin(Math.PI*t/.12)),0,1);place(buf,ed(hp(noise(.1),3000),35),.05,.6);place(buf,bell(2637,.4,8),.08,.3);return verb(buf,.5,.25,9000)};
const choir=(fs,d,vow)=>{const out=Z(d);fs.forEach(f=>{for(let v=0;v<3;v++){const det=1+(v-1)*.006,vr=U(4.5,6),ph0=U(0,6);let ph=0;const x=T(d,t=>{ph+=f*det*(1+.004*Math.sin(PI2*vr*t+ph0))/SR;return 2*(ph%1)-1});add(out,x,.33)}});
  return add(add(mul(bp(out,(vow||1)*650,(vow||1)*1100),()=>1.3),bp(out,1000,1400),.6),bp(out,2400,3100),.35)};
G.ch_holy=()=>{const d=1.6,buf=Z(d);
  place(buf,mul(choir([110,164.81,220,261.63],d,.75),t=>Math.pow(Math.min(1,t/1.2),2)*Math.min(1,(d-t)/.12)),0,1);
  place(buf,mul(T(d,t=>Math.sin(PI2*55*t)+.5*Math.sin(PI2*110*t)),t=>.35*Math.pow(t/d,1.5)),0,1);
  [0,.5,1].forEach(at=>place(buf,bell(220,1.2,2.2),at,.22));place(buf,bell(329.63,1,2.5),1.05,.18);
  place(buf,mul(lp(noise(d),900),t=>.25*Math.pow(t/d,2)),0,1);return verb(buf,2.4,.5,4500)};
G.ch_sword=()=>{const d=3,buf=Z(d);place(buf,ed(hp(noise(.07),700),45),0,1);place(buf,ed(sweep(110,26,1.4),2.2),0,1.2);place(buf,ed(lp(noise(1.6),450),2.2),0,.9);
  place(buf,mul(choir([110,130.81,164.81,220],2.8,.8),t=>Math.min(1,t/.04)*Math.exp(-t*.9)),.01,1);
  place(buf,mul(T(2.6,t=>Math.sin(PI2*55*t)+.6*Math.sin(PI2*82.4*t)),t=>.5*Math.exp(-t*1.4)),0,1);
  [220,330,440].forEach((f,i)=>place(buf,bell(f,2.4,1.4),0,.32-i*.07));for(let k=0;k<10;k++)place(buf,bell(U(900,1800),.6,6),U(.1,1),U(.04,.08));return verb(buf,2.8,.5,3500)};
G.ch_dodge=()=>{const d=.18;return verb(mul(bp(noise(d),2000,8000),t=>Math.pow(Math.sin(Math.PI*t/d),2)),.2,.1,9000)};

// ----- 박지성 • 박르노 박바나 (v2) -----
const sat=(x,k)=>{for(let i=0;i<x.length;i++)x[i]=Math.tanh(x[i]*k)/Math.tanh(k);return x};
const sweepEnv=(f0,f1,d,curve)=>{let ph=0;return T(d,t=>{const u=t/d,f=f0+(f1-f0)*(curve?Math.pow(u,curve):u);ph+=PI2*f/SR;return Math.sin(ph)})};
const movBP=(x,c0,c1,q)=>{const y=new Float32Array(x.length),n=x.length,dmp=Math.max(.3,q*2.2);let lo=0,b=0;for(let i=0;i<n;i++){const c=Math.min(SR*.2,c0*Math.pow(c1/c0,i/n)),f=2*Math.sin(Math.PI*c/SR);const hi=x[i]-lo-dmp*b;b+=f*hi;lo+=f*b;y[i]=b}const m=peak(y);for(let i=0;i<n;i++)y[i]/=m;return y};
G.ge_life=()=>{const buf=Z(1.2);[784,987.8,1174.7,1568,1975.5,2349.3].forEach((f,i)=>place(buf,bell(f,.7,5),i*.045,.28));place(buf,mul(sweepEnv(300,1800,.6,1.5),t=>.18*Math.sin(Math.PI*t/.6)),0,1);
  place(buf,mul(bp(noise(.9),3000,9000),t=>.14*Math.exp(-t*3)*(.6+.4*Math.sin(PI2*18*t))),.05,1);place(buf,ed(sine(196,.6),5),0,.2);return verb(buf,1,.35,9000)};
G.ge_snake=()=>{const buf=Z(.55);place(buf,mul(bp(noise(.32),3500,9000),t=>.55*Math.sin(Math.PI*t/.32)*(.7+.3*Math.sin(PI2*30*t))),0,1);place(buf,sat(ed(sweepEnv(300,90,.09),35),2),.24,.9);place(buf,ed(bp(noise(.05),700,4000),70),.24,.7);return verb(buf,.3,.12,7000)};
G.ge_punch=()=>{const buf=Z(.2);place(buf,sat(mul(sweepEnv(170,48,.13,.5),t=>Math.exp(-t*24)),2.5),0,1);place(buf,ed(bp(noise(.05),900,3800),75),0,.9);place(buf,ed(hp(noise(.012),4500),320),0,.5);place(buf,ed(bp(noise(.09),200,900),40),.004,.35);return buf};
G.ge_muda=()=>{const buf=Z(1.6);place(buf,mul(bp(noise(.22),500,5000),t=>.5*Math.pow(t/.22,2.2)),0,1);place(buf,mul(sweepEnv(200,900,.22,2),t=>.12*Math.pow(t/.22,2)),0,1);
  place(buf,sat(mul(sweepEnv(110,28,.9,.4),t=>Math.exp(-t*4.5)),3),.22,1.2);place(buf,sat(ed(bp(noise(.3),150,6000),18),2),.22,1);place(buf,ed(lp(noise(.9),300),5),.22,.8);
  for(let k=0;k<10;k++)place(buf,ed(bp(noise(.03),1500,6000),90),.25+U(0,.5),U(.08,.2));return verb(buf,1.1,.3,4000)};
G.ge_launch=()=>{const d=1.5,buf=Z(d);const n=movBP(noise(d),3200,350,.12);place(buf,mul(n,t=>Math.min(1,t/.04)*Math.exp(-t*1.6)*.9),0,1);place(buf,mul(sweepEnv(950,180,d,.6),t=>.16*Math.exp(-t*2)),0,1);
  place(buf,ed(sine(70,.25),12),1.15,.25);place(buf,ed(bp(noise(.08),300,2000),40),1.15,.2);return verb(buf,1.2,.35,5000)};
G.ge_tree=()=>{const d=2.8,buf=Z(d);place(buf,mul(lp(noise(d),140),t=>.9*Math.min(1,t/.8)*Math.min(1,(d-t)/.6)),0,1);
  for(let k=0;k<7;k++){const at=.15+k*.24,f0=U(70,140);{let ph=0;place(buf,mul(T(.32,t=>{ph+=PI2*(f0+50*Math.sin(PI2*9*t))/SR;return Math.sin(ph)+.4*Math.sin(ph*2.1)}),t=>.3*Math.sin(Math.PI*t/.32)*(.6+.4*Math.sin(PI2*23*t))),at,1)}}
  place(buf,mul(bp(noise(1.6),2200,7000),t=>.16*(.5+.5*Math.sin(PI2*11*t))*Math.min(1,t/.5)*Math.min(1,(1.6-t)/.5)),.7,1);
  [392,440,523.25,587.33,659.25,783.99,880,1046.5,1174.7,1318.5].forEach((f,i)=>place(buf,bell(f,1.2,3),.55+i*.06,.16));
  place(buf,mul(choir([196,246.94,293.66,392],2,1.05),t=>.75*Math.min(1,t/.6)*Math.min(1,(2-t)/.6)),.6,1);place(buf,sat(ed(sweepEnv(90,35,.8),4),2),.0,.7);return verb(buf,2,.45,7000)};
G.ge_root=()=>{const buf=Z(.8);place(buf,sat(ed(sweepEnv(130,40,.35),9),2.5),0,1);place(buf,ed(lp(noise(.4),1400),10),0,.9);for(let k=0;k<8;k++)place(buf,ed(bp(noise(.025),1200,6000),100),U(0,.2),U(.2,.5));place(buf,mul(bp(noise(.4),3000,8000),t=>.1*Math.exp(-t*6)),.05,1);return verb(buf,.5,.2,5000)};
G.ge_arrow=()=>{const d=1.1,buf=Z(d);place(buf,mul(movBP(noise(.62),600,4500,.3),t=>.7*Math.pow(t/.62,2.4)),0,1);place(buf,mul(sweepEnv(250,1600,.62,2),t=>.1*Math.pow(t/.62,2)),0,1);
  place(buf,ed(hp(noise(.04),1500),70),.6,1);place(buf,T(.9,t=>(Math.sin(PI2*2480*t)+.7*Math.sin(PI2*3310*t)+.4*Math.sin(PI2*4970*t))*Math.exp(-t*5)*.3),.6,1);place(buf,sat(ed(sweepEnv(140,50,.3),12),2),.6,.8);return verb(buf,.9,.3,8000)};
G.ge_crack=()=>{const d=1.5,buf=Z(d);let at=.05;for(let k=0;k<16;k++){place(buf,ed(hp(noise(.03),2500+k*200),140),at,.25+k*.03);place(buf,bell(U(2500,5000),.12,30),at,.08);at+=.12*Math.pow(.88,k)+.02}
  [0,.5,.95].forEach((t0,i)=>{place(buf,ed(sine(55,.14),18),t0,.7+i*.15);place(buf,ed(sine(52,.14),18),t0+.17,.5+i*.12)});place(buf,mul(sweepEnv(120,700,d,2),t=>.18*Math.pow(t/d,2)),0,1);return verb(buf,1,.3,7000)};
G.ge_req=()=>{const d=4,buf=Z(d);place(buf,mul(choir([146.83,220,293.66,369.99],.6,.9),t=>Math.pow(t/.6,2)*.9),0,1);place(buf,mul(movBP(noise(.6),800,7000,.3),t=>.5*Math.pow(t/.6,2.5)),0,1);
  place(buf,sat(mul(sweepEnv(120,26,1.6,.4),t=>Math.exp(-t*2.2)),3),.6,1.3);place(buf,sat(ed(hp(noise(.1),700),35),2),.6,1);place(buf,ed(lp(noise(1.8),400),2.2),.6,.8);
  place(buf,mul(choir([146.83,220,293.66,369.99,440],3.2,.85),t=>Math.min(1,t/.06)*Math.exp(-t*.55)),.6,1.2);[293.66,440,587.33,739.99,880].forEach((f,i)=>place(buf,bell(f,3,1.1),.6+i*.04,.22));
  for(let k=0;k<24;k++)place(buf,bell(U(1800,5200),.5,9),.6+U(0,1.8),U(.03,.08));for(let k=0;k<10;k++)place(buf,ed(hp(noise(.02),3000),200),.7+U(0,1.2),U(.1,.25));return verb(buf,3,.5,6500)};
G.ge_rewind=()=>{const d=1,buf=Z(d);for(let k=0;k<22;k++){const at=k*.042,f=600+k*90;place(buf,mul(T(.05,t=>Math.sin(PI2*f*t*(1-t*6))),t=>Math.exp(-t*40)),at,.22)}
  const sw=mul(add(movBP(noise(.8),5000,500,.3),sweepEnv(1800,250,.8,.7),.25),t=>Math.pow(1-t/.8,1.5)*.7);sw.reverse();place(buf,sw,0,1);place(buf,bell(659.25,.5,6),.8,.3);place(buf,bell(493.88,.5,6),.82,.25);return verb(buf,.9,.35,7000)};
G.ge_cosmos=()=>{const d=3.2,buf=Z(d);place(buf,mul(T(d,t=>Math.sin(PI2*41*t)+.6*Math.sin(PI2*61.7*t)+.3*Math.sin(PI2*82*t+Math.sin(PI2*.3*t))),t=>.5*Math.min(1,t/.3)*Math.min(1,(d-t)/.6)),0,1);
  place(buf,mul(choir([110,164.81,220,261.63],d,.8),t=>.8*Math.min(1,t/.5)*Math.min(1,(d-t)/.7)),0,1);[0,.75].forEach(at=>{place(buf,bell(110,2.4,1),at,.35);place(buf,bell(164.81,2.4,1.2),at,.22)});
  const rs=mul(movBP(noise(.7),400,6000,.3),t=>Math.pow(t/.7,2.5)*.5);place(buf,rs,.0,1);place(buf,mul(hp(noise(d),6000),t=>.06*(.5+.5*Math.sin(PI2*.8*t))),0,1);return verb(buf,3,.5,5000)};

function wav(x,pk){fade(x,.003,.05);const s=(pk||.89)/peak(x),n=x.length,b=new ArrayBuffer(44+n*2),v=new DataView(b),w=(o,t)=>{for(let i=0;i<t.length;i++)v.setUint8(o+i,t.charCodeAt(i))};
  w(0,'RIFF');v.setUint32(4,36+n*2,true);w(8,'WAVE');w(12,'fmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,1,true);v.setUint32(24,SR,true);v.setUint32(28,SR*2,true);v.setUint16(32,2,true);v.setUint16(34,16,true);w(36,'data');v.setUint32(40,n*2,true);
  for(let i=0;i<n;i++)v.setInt16(44+i*2,Math.max(-1,Math.min(1,x[i]*s))*32767,true);return b}
function dataURI(buf){const u=new Uint8Array(buf);let s='';for(let i=0;i<u.length;i+=8192)s+=String.fromCharCode.apply(null,u.subarray(i,i+8192));return 'data:audio/wav;base64,'+btoa(s)}
const PK={gl_jab:.75,tr_beep:.45,tr_burst:.8,tr_strafe:.8,ez_bounce:.6,ez_msg:.6,jt_throw:.7,jt_hit:.75,hs_tap:.6,hs_chalk:.6,hs_paper:.65,sn_text:.5,sn_bone:.7,sn_warn:.55,kj_bump:.8,jw_shot:.8,jw_kata:.8,jw_casing:.5,oni_step:.85,oni_heart:.8,wk_strike:.75,wk_hit:.8,pc_shape:.7,pc_trap:.75,ge_punch:.75,ge_launch:.8,h_flicker:.75,juggle:.7,whistle:.7,tv_gallop:.8,wm_gem:.75,rd_head:.7,rd_beep:.6,th_coin:.7};
function use(n,buf){
  if(AUD[n]&&AUD[n].ok)return;            // sounds 폴더에 진짜 파일이 있으면 그걸 사용
  let url;try{url=URL.createObjectURL(new Blob([buf],{type:'audio/wav'}))}catch(e){url=dataURI(buf)}
  const pool=new SoundPool(url,3);pool.pool.forEach(a=>a.addEventListener('error',()=>{if(a.src.indexOf('data:')!=0){a.src=dataURI(buf);a.bad=0;a.load()}},{once:true}));AUD[n]=pool;
}
// ===== 원숭이왕 (중국풍) · 피카소 (스케치) =====
function pluck(f,d,br,dec){const n=Math.max(2,Math.round(SR/f)),b=new Float32Array(n);for(let i=0;i<n;i++)b[i]=R()*2-1;const x=Z(d),s=.5-.42*br,fb=Math.pow(.001,1/(f*(dec||1)));let k=0;
  for(let i=0;i<x.length;i++){const j=(k+1)%n;x[i]=b[k];b[k]=fb*((1-s)*b[k]+s*b[j]);k=j}return x}
function zheng(f,d,bend){let ph=0;const x=T(d,t=>{ph+=PI2*f*(1+(bend||0)*(1-Math.exp(-t*9)))/SR;return(Math.sin(ph)+.5*Math.sin(ph*2)*Math.exp(-t*3)+.3*Math.sin(ph*3)*Math.exp(-t*5)+.18*Math.sin(ph*4)*Math.exp(-t*8))*Math.exp(-t*2.6)*Math.min(1,t/.003)});place(x,ed(bp(noise(.02),1500,6000),150),0,.25);return x}
function gong(f,d,bend,bright){const rs=[1,1.52,2.08,2.69,3.32,4.1,5.2,6.3],x=Z(d);rs.forEach((r,k)=>{const fr=f*r*(1+U(-.006,.006)),am=1/(1+k*.55),dec=.7+k*.35;let ph=0;
  for(let i=0;i<x.length;i++){const t=i/SR,bl=k>2?Math.min(1,t/(.06+k*.03))*(bright||1):1;ph+=PI2*fr*(1+bend*(1-Math.exp(-t*4)))/SR;x[i]+=Math.sin(ph)*am*bl*Math.exp(-t*dec)}});place(x,ed(lp(noise(.06),500),40),0,.6);return x}
const clap=()=>{const x=ed(bp(noise(.05),1200,5200),110);add(x,ed(sine(1750,.05),70),.6);add(x,ed(sine(2650,.05),95),.35);return x};
const cymb=d=>{const x=ed(hp(noise(d),3200),3.2);for(let k=0;k<14;k++)add(x,ed(sine(U(3000,8500),d),U(3,7)),.04);return x};
function dizi(notes){const d=notes.reduce((m,n)=>Math.max(m,n[1]+n[2]),0)+.1,x=Z(d);notes.forEach(([f,at,du])=>{let ph=0;const y=T(du,t=>{ph+=PI2*f*(1+.006*Math.sin(PI2*5.5*t)*Math.min(1,t/.15))/SR;return(Math.sin(ph)+.22*Math.sin(ph*2)+.06*Math.sin(ph*3))*Math.min(1,t/.025)*Math.min(1,(du-t)/.04)});
  add(y,mul(bp(noise(du),f*1.5,f*3),t=>.12*Math.min(1,(du-t)/.04)));place(x,y,at,1)});return x}
function erhu(f0,f1,d,vib){let ph=0;const y=T(d,t=>{const f=f0+(f1-f0)*Math.min(1,t/(d*.35));ph+=f*(1+(vib||.012)*Math.sin(PI2*6*t)*Math.min(1,t/.2))/SR;return 2*(ph%1)-1});return mul(bp(y,500,3200),t=>Math.min(1,t/.06)*Math.min(1,(d-t)/.12))}
const PENT=[587.33,659.25,739.99,880,987.77,1174.66,1318.5,1479.98,1760];
G.wk_cloud=()=>{const buf=Z(1.1);place(buf,mul(movBP(noise(.5),400,3500,.25),t=>.6*Math.sin(Math.PI*t/.5)),0,1);
  place(buf,dizi([[PENT[0],.05,.07],[PENT[1],.11,.07],[PENT[2],.17,.07],[PENT[3],.23,.07],[PENT[4],.29,.07],[PENT[5],.35,.42]]),0,.55);place(buf,cymb(.6),.33,.12);return verb(buf,1.1,.35,7000)};
G.wk_swoop=()=>{const buf=Z(.45);place(buf,mul(movBP(noise(.4),700,2600,.2),t=>.8*Math.pow(Math.sin(Math.PI*t/.4),1.5)),0,1);place(buf,mul(lp(noise(.4),400),t=>.4*Math.sin(Math.PI*t/.4)),0,1);return verb(buf,.4,.15,6000)};
G.wk_hit=()=>{const buf=Z(.35);place(buf,sat(ed(sweepEnv(230,70,.14),30),2.5),0,1);place(buf,ed(bp(noise(.05),1000,5000),80),0,.8);place(buf,clap(),0,.55);place(buf,ed(T(.3,t=>Math.sin(PI2*2310*t)+.6*Math.sin(PI2*3470*t)),16),0,.08);return verb(buf,.35,.15,6000)};
G.wk_hair=()=>{const buf=Z(.9);place(buf,mul(bp(noise(.4),300,2200),t=>.55*Math.min(1,t/.05)*Math.exp(-t*5)),0,1);[880,987.77,1174.66,1318.5,1760].forEach((f,i)=>place(buf,pluck(f,.6,.75,.9),.14+i*.05,.32));return verb(buf,.8,.3,7000)};
G.wk_clone=()=>{const buf=Z(1.2);for(let k=0;k<5;k++)place(buf,ed(lp(noise(.12),1400),22),k*.035,.5);place(buf,gong(620,1,.06,.8),.05,.32);place(buf,clap(),.02,.5);place(buf,clap(),.2,.35);return verb(buf,.9,.3,6000)};
G.wk_strike=()=>{const buf=Z(.25);place(buf,clap(),0,.8);place(buf,sat(ed(sweepEnv(180,60,.1),35),2),0,.7);place(buf,ed(bp(noise(.03),700,3500),110),0,.5);return verb(buf,.25,.1,6000)};
G.wk_ult=()=>{const d=3,buf=Z(d);let at=0,sp=.17;for(let k=0;k<9;k++){place(buf,clap(),at,.5+k*.05);at+=sp;sp*=.8}
  place(buf,gong(150,2.4,-.05,1.2),.78,1.1);place(buf,cymb(1.6),.78,.5);place(buf,sat(ed(sweepEnv(120,50,.4),8),2),.78,.8);place(buf,ed(lp(noise(.3),300),10),.78,.6);
  place(buf,erhu(523.25,783.99,1.3,.02),.95,.22);place(buf,erhu(659.25,987.77,1.2,.02),1.0,.12);return verb(buf,2,.4,5000)};
G.wk_grow=()=>{const d=1.1,buf=Z(d);place(buf,sat(mul(sweepEnv(110,880,.95,2.2),t=>.4*Math.min(1,t/.05)*Math.min(1,(.95-t)/.1)),1.8),0,1);place(buf,mul(lp(noise(d),200),t=>.7*Math.min(1,t/.2)*Math.exp(-t*1.5)),0,1);
  PENT.slice(0,7).forEach((f,i)=>place(buf,zheng(f,.5,.01),.08+i*.1,.2));place(buf,ed(T(.6,t=>Math.sin(PI2*1980*t)+.7*Math.sin(PI2*2970*t)),7),.85,.12);return verb(buf,1.2,.35,6000)};
G.wk_spin=()=>{const d=2.5,buf=Z(d);place(buf,mul(lp(noise(d),500),t=>.55*Math.pow(Math.sin(Math.PI*Math.min(1,t/2.2)),.8)),0,1);
  [.68,1.05,1.42,1.9].forEach((at,k)=>{const L=.42-k*.04;place(buf,mul(movBP(noise(L),300,1600+k*300,.2),t=>Math.pow(Math.sin(Math.PI*t/L),2)),at-L/2,.85)});place(buf,cymb(.8),2.0,.25);return verb(buf,1.3,.3,4500)};
G.wk_gold=()=>{const buf=Z(1.4);place(buf,gong(880,1.2,.08,.7),0,.35);[1174.66,1479.98,1760,2349.3].forEach((f,i)=>place(buf,bell(f,1,4),.04+i*.05,.22));place(buf,mul(choir([146.83,220,293.66],1.1,.9),t=>.35*Math.min(1,t/.1)*Math.exp(-t*2)),0,1);return verb(buf,1.4,.4,7000)};
// --- 피카소 ---
function scrib(d,rate,c1,c2){const x=Z(d);let t0=0,up=0;while(t0<d-.03){const L=U(.7,1.3)/rate;const y=mul(bp(noise(L),up?c1:c2,(up?c1:c2)*2.2),t=>Math.pow(Math.sin(Math.PI*t/L),.7)*(.55+.45*(R()<.3?1:R())));place(x,y,t0,up?.8:1);
  for(let k=0;k<L*90;k++)place(x,ed(hp(noise(.004),3000),900),t0+U(0,L),U(.05,.25));t0+=L*.92;up^=1}return x}
G.pc_pencil=()=>{const buf=Z(.75);add(buf,scrib(.7,9,2600,3800),.9);place(buf,mul(bp(noise(.7),500,1300),t=>.1*Math.sin(Math.PI*t/.7)),0,1);return verb(buf,.3,.1,8000)};
G.pc_trap=()=>{const buf=Z(.6);place(buf,ed(hp(noise(.01),2500),400),0,.8);place(buf,ed(sine(1500,.04),80),0,.3);place(buf,mul(movBP(noise(.18),1500,5000,.2),t=>.5*Math.pow(t/.18,2)),.02,1);place(buf,ed(sweepEnv(300,900,.12),25),.2,.6);place(buf,ed(bp(noise(.04),600,2500),60),.2,.5);return verb(buf,.5,.2,7000)};
G.pc_color=()=>{const buf=Z(1.1);place(buf,sat(ed(sweepEnv(140,45,.25),14),2),0,.8);place(buf,mul(movBP(noise(.5),3500,350,.25),t=>Math.min(1,t/.01)*Math.exp(-t*7)),0,.9);
  for(let k=0;k<9;k++){const at=U(.02,.35),f0=U(250,700);place(buf,ed(sweepEnv(f0,f0*2.4,.06),40),at,.25)}[523.25,659.25,783.99,1046.5].forEach((f,i)=>place(buf,bell(f,.7,5),.05+i*.03,.18));return verb(buf,.8,.3,7000)};
G.pc_shape=()=>{const buf=Z(.3);place(buf,ed(sweepEnv(420,1250,.09,.6),26),0,.7);place(buf,ed(bp(noise(.02),1500,5000),160),0,.5);place(buf,ed(sine(1900,.08),50),.005,.15);return verb(buf,.3,.15,8000)};
G.pc_cube=()=>{const buf=Z(1);[0,.08,.15,.27].forEach((at,i)=>{place(buf,ed(bp(noise(.035),1400,5500),120),at,.7);const f=[466.16,659.25,349.23,987.77][i];place(buf,ed(T(.25,t=>Math.sin(PI2*f*t)+.3*Math.sin(PI2*f*4*t)*Math.exp(-t*40)),22),at,.4)});
  place(buf,mul(sweepEnv(1800,600,.35,.5),t=>.1*Math.sin(Math.PI*t/.35)),.3,1);place(buf,ed(T(.6,t=>Math.sin(PI2*2093*t)+Math.sin(PI2*2960*t)),6),.3,.1);return verb(buf,.8,.3,8000)};
G.pc_canvas=()=>{const buf=Z(1.4);place(buf,mul(lp(noise(.6),700),t=>.5*Math.sin(Math.PI*t/.6)),0,1);place(buf,mul(bp(noise(.55),900,6000),t=>.5*(.5+.5*Math.sin(PI2*(26-30*t)*t))*Math.sin(Math.PI*t/.55)),0,1);
  place(buf,ed(lp(noise(.12),300),20),.5,.8);place(buf,ed(sine(70,.2),15),.5,.5);[261.63,329.63,392,493.88,523.25].forEach((f,i)=>place(buf,bell(f,.9,3),.52+i*.07,.17));return verb(buf,1.2,.35,7000)};
G.pc_brush=()=>{const d=.55,buf=Z(d);place(buf,mul(movBP(noise(.45),700,2600,.35),t=>.8*Math.min(1,t/.04)*Math.pow(Math.max(0,1-t/.45),.8)*(.7+.3*Math.sin(PI2*17*t))),0,1);place(buf,mul(lp(noise(.45),350),t=>.35*Math.sin(Math.PI*t/.45)),0,1);
  for(let k=0;k<5;k++){const f0=U(220,480);place(buf,ed(sweepEnv(f0,f0*1.8,.05),45),U(.05,.35),.12)}return verb(buf,.4,.15,6000)};
G.pc_sign=()=>{const buf=Z(.9);add(buf,scrib(.42,16,3000,4400),.8);place(buf,bell(1318.5,.5,6),.42,.3);place(buf,bell(1975.5,.45,7),.45,.18);return verb(buf,.6,.25,8000)};
G.pc_splash=()=>{const buf=Z(1.6);place(buf,sat(ed(sweepEnv(110,32,.6),6),2.5),0,1);for(let k=0;k<3;k++)place(buf,mul(movBP(noise(.45),4000,300,.25),t=>Math.min(1,t/.01)*Math.exp(-t*6)),k*.06,.6);
  for(let k=0;k<14;k++){const f0=U(250,800);place(buf,ed(sweepEnv(f0,f0*2.2,.07),35),U(.03,.6),.18)}[523.25,659.25,783.99,1046.5,1318.5].forEach((f,i)=>place(buf,bell(f,.9,3.5),.1+i*.06,.2));return verb(buf,1.2,.35,7000)};
// ===== 권루티비 사운드 업그레이드 =====
G.kr_charge=()=>{const buf=Z(.7);place(buf,mul(sweepEnv(220,1100,.42,1.6),t=>.35*Math.pow(t/.42,1.5)),0,1);place(buf,mul(sweepEnv(330,1650,.42,1.6),t=>.15*Math.pow(t/.42,1.5)),0,1);
  place(buf,mul(movBP(noise(.42),500,6000,.25),t=>.35*Math.pow(t/.42,2)),0,1);for(let k=0;k<8;k++)place(buf,bell(U(1500,3500),.25,14),U(.05,.4),.09);place(buf,bell(1318.5,.35,8),.4,.25);return verb(buf,.6,.25,8000)};
G.kr_pass=()=>{const d=.6,buf=Z(d);place(buf,mul(movBP(noise(d),900,3200,.18),t=>.85*Math.sin(Math.PI*t/d)*(.55+.45*Math.sin(PI2*16*t))),0,1);place(buf,mul(sweepEnv(700,1100,d,1),t=>.12*Math.sin(Math.PI*t/d)*(.5+.5*Math.sin(PI2*16*t))),0,1);return verb(buf,.5,.2,7000)};
G.kr_stamp=()=>{const buf=Z(.7);place(buf,sat(ed(sweepEnv(150,42,.3),11),3),0,1);place(buf,ed(lp(noise(.2),900),24),0,.9);place(buf,ed(bp(noise(.05),1200,5000),90),0,.5);
  place(buf,mul(sweepEnv(420,180,.3,.6),t=>.25*Math.exp(-t*8)*(1+.6*Math.sin(PI2*28*t))),.04,1);place(buf,bell(1046.5,.4,8),.03,.12);return verb(buf,.6,.25,5000)};
G.kr_beat=()=>{const buf=Z(.45);place(buf,sat(ed(sweepEnv(130,45,.22),13),2.4),0,1);place(buf,ed(bp(noise(.03),2000,9000),110),0,.3);
  place(buf,add(ed(bp(noise(.16),1200,7000),22),ed(sine(190,.12),28),.6),.2,.75);place(buf,ed(hp(noise(.03),7000),120),.1,.25);place(buf,ed(hp(noise(.03),7000),120),.3,.2);
  place(buf,mul(saw(55,.38,6),t=>.35*Math.exp(-t*6)),0,1);return verb(buf,.3,.12,7000)};
G.kr_swap=()=>{const d=.42,buf=Z(d);let ph=0;const sc=T(d,t=>{const u=t/d,sp=Math.sin(PI2*(u<.5?3:5)*t*2.2);ph+=PI2*(260+620*Math.abs(sp))*(sp>0?1:.7)/SR;return(2*((ph/PI2)%1)-1)*Math.pow(Math.sin(Math.PI*u),.6)});
  place(buf,bp(sc,300,3800),0,.7);place(buf,mul(movBP(noise(d),600,4500,.2),t=>.4*Math.sin(Math.PI*t/d)),0,1);place(buf,ed(sweepEnv(900,220,.15),20),.25,.3);return verb(buf,.35,.15,6000)};
G.kr_shutter=()=>{const buf=Z(.5);[0,.085].forEach((at,i)=>{place(buf,ed(bp(noise(.025),1800,9000),180),at,i?.6:.9);place(buf,ed(T(.04,t=>Math.sin(PI2*(i?3200:4200)*t)),140),at,.25);place(buf,ed(lp(noise(.03),600),90),at,.4)});
  place(buf,mul(T(.18,t=>Math.sign(Math.sin(PI2*90*t))),t=>.06*Math.sin(Math.PI*t/.18)),.12,1);return verb(buf,.3,.12,9000)};
G.kr_tear=()=>{const d=.5,buf=Z(d);const n=bp(noise(d),900,7000),env=Z(d);let v=0;for(let i=0;i<env.length;i++){if(R()<.004)v=U(.4,1);v*=.9985;env[i]=v}
  for(let i=0;i<n.length;i++){const t=i/SR;n[i]*=env[i]*Math.pow(Math.sin(Math.PI*Math.min(1,t/d)),.4)*(.6+.4*R())}place(buf,n,0,1.2);
  for(let k=0;k<30;k++)place(buf,ed(hp(noise(.006),2500),600),U(0,.45),U(.1,.4));place(buf,ed(lp(noise(.08),500),30),.0,.3);return verb(buf,.35,.12,8000)};
// ===== 킬러 (소음기 · 청부업자) =====
const supp=()=>{const x=Z(.22);place(x,mul(bp(noise(.06),700,3200),t=>Math.exp(-t*70)),0,.9);place(x,sat(ed(sweepEnv(160,60,.08),45),2),0,.8);place(x,ed(hp(noise(.008),3500),700),.004,.6);
  place(x,ed(T(.05,t=>Math.sin(PI2*2650*t)+.6*Math.sin(PI2*3980*t)),90),.012,.18);place(x,mul(bp(noise(.12),300,1200),t=>.25*Math.exp(-t*25)),0,1);return x};
G.jw_shot=()=>{const buf=Z(.35);place(buf,supp(),0,1);return verb(buf,.25,.12,6000)};
G.jw_kata=()=>{const buf=Z(.4);place(buf,supp(),0,1);place(buf,supp(),.07,.9);return verb(buf,.3,.15,6000)};
G.jw_rack=()=>{const buf=Z(.4);[[0,1],[.13,.8]].forEach(([at,gn])=>{place(buf,ed(bp(noise(.03),1500,7000),160),at,gn);place(buf,ed(T(.04,t=>Math.sin(PI2*(at?2200:1700)*t)),110),at,.3*gn);place(buf,ed(lp(noise(.02),600),150),at,.4*gn)});
  place(buf,mul(bp(noise(.1),2000,6000),t=>.15*Math.sin(Math.PI*t/.1)),.02,1);return verb(buf,.25,.1,8000)};
G.jw_casing=()=>{const buf=Z(.5);[0,.11,.19,.25].forEach((at,i)=>{const f=U(4200,5600);place(buf,ed(T(.12,t=>Math.sin(PI2*f*t)+.6*Math.sin(PI2*f*1.47*t)+.3*Math.sin(PI2*f*2.1*t)),40+i*10),at,.35/(1+i*.4));place(buf,ed(hp(noise(.004),4000),900),at,.3/(1+i*.4))});return verb(buf,.3,.15,9000)};
G.jw_coin=()=>{const buf=Z(1.1);place(buf,ed(hp(noise(.01),3000),500),0,.7);place(buf,ed(T(.9,t=>(Math.sin(PI2*3150*t)+.7*Math.sin(PI2*4620*t)+.4*Math.sin(PI2*6900*t))*(.6+.4*Math.sin(PI2*(9+t*12)*t))),3.5),0,.35);
  place(buf,ed(T(.3,t=>Math.sin(PI2*2800*t)+.5*Math.sin(PI2*4200*t)),14),.5,.4);place(buf,ed(hp(noise(.008),2500),700),.5,.5);return verb(buf,.8,.3,9000)};
G.jw_throw=()=>{const buf=Z(.75);place(buf,mul(movBP(noise(.3),500,2400,.2),t=>.7*Math.sin(Math.PI*t/.3)),0,1);place(buf,sat(ed(sweepEnv(110,38,.35),10),2.5),.3,1);place(buf,ed(lp(noise(.25),700),16),.3,.9);
  place(buf,mul(bp(noise(.2),1500,5000),t=>.18*Math.exp(-t*12)),.31,1);return verb(buf,.5,.2,5000)};
G.jw_mark=()=>{const buf=Z(1.3);place(buf,mul(movBP(noise(.45),300,4000,.2),t=>.35*Math.pow(t/.45,2.5)),0,1);place(buf,mul(saw(55,1,8),t=>.5*Math.exp(-t*2.5)),.45,1);place(buf,sat(ed(sweepEnv(90,40,.4),7),2),.45,.8);
  place(buf,bell(1760,.8,4),.45,.25);place(buf,bell(1864.7,.8,4),.47,.15);return verb(buf,1.2,.35,6000)};
G.jw_ult=()=>{const d=2.4,buf=Z(d);place(buf,mul(movBP(noise(.8),200,6000,.25),t=>.45*Math.pow(t/.8,3)),0,1);const rev=mul(sweepEnv(300,1200,.8,2),t=>.08*Math.pow(t/.8,2));place(buf,rev,0,1);
  place(buf,sat(mul(sweepEnv(70,30,1.4,.6),t=>Math.exp(-t*2)),3),.8,1.2);place(buf,ed(lp(noise(.5),200),5),.8,.7);
  place(buf,mul(add(add(saw(110,1.5,10),saw(130.81,1.5,10),.8),saw(164.81,1.5,10),.7),t=>.25*Math.min(1,t/.05)*Math.exp(-t*1.4)),.8,1);[0,.3,.6,.9,1.05,1.2].forEach(at=>place(buf,ed(hp(noise(.03),6000),140),.8+at,.18));return verb(buf,1.6,.35,4500)};
G.jw_final=()=>{const d=2.6,buf=Z(d);place(buf,mul(movBP(noise(.7),300,2500,.2),t=>.35*Math.pow(t/.7,2)),0,1);
  place(buf,sat(mul(sweepEnv(90,25,1.6,.4),t=>Math.exp(-t*1.8)),3.5),.75,1.3);place(buf,mul(lp(noise(1.2),500),t=>Math.exp(-t*3)),.75,1);place(buf,ed(bp(noise(.15),300,3000),12),.75,.8);
  place(buf,bell(196,1.6,1.8),.85,.35);place(buf,bell(207.65,1.6,1.8),.86,.2);return verb(buf,2.2,.45,3500)};
// ===== 김지우 (저택 괴물) =====
function growl(d,f0){const x=Z(d);let ph=0;for(let i=0;i<x.length;i++){const t=i/SR,f=f0*(1+.15*Math.sin(PI2*1.3*t))*(1+.04*(R()*2-1));ph+=f/SR;x[i]=(2*(ph%1)-1)*(.6+.4*Math.sin(PI2*31*t))}
  const v=add(bp(x,200,900),bp(noise(d),300,1400),.5);return mul(v,t=>Math.min(1,t/.08)*Math.min(1,(d-t)/.2))}
G.oni_door=()=>{const d=1.1,buf=Z(d);let ph=0,i=0;const cr=Z(.75);while(i<cr.length){const L=Math.floor(SR*U(.004,.012)),f=U(280,520);for(let j=0;j<L&&i+j<cr.length;j++){ph+=f/SR;cr[i+j]=(2*(ph%1)-1)*Math.exp(-j/L*3)}i+=L}
  place(buf,mul(bp(cr,400,3000),t=>.6*Math.sin(Math.PI*Math.min(1,t/.75))),0,1);place(buf,sat(ed(sweepEnv(120,45,.3),12),2.5),.72,1);place(buf,ed(bp(noise(.08),300,2500),40),.72,.8);return verb(buf,1,.35,4000)};
G.oni_scare=()=>{const d=1.4,buf=Z(d);const fs=[311,329.6,349.2,466.2,493.9,622.3];fs.forEach(f=>place(buf,mul(saw(f,1.2,12,t=>1+.01*Math.sin(PI2*7*t)),t=>.22*Math.min(1,t/.01)*Math.exp(-t*2.2)),0,1));
  place(buf,mul(movBP(noise(.9),3000,900,.15),t=>.6*Math.min(1,t/.01)*Math.exp(-t*3)),0,1);place(buf,growl(.9,70),.02,.9);place(buf,sat(ed(sweepEnv(100,35,.4),8),3),0,1);return verb(buf,1.3,.35,6000)};
G.oni_growl=()=>{const buf=Z(1.3);place(buf,growl(1.1,58),0,1);place(buf,mul(lp(noise(1.1),150),t=>.5*Math.sin(Math.PI*t/1.1)),0,1);return verb(buf,1,.3,3000)};
G.oni_closet=()=>{const buf=Z(1);[0,.14,.21,.42,.5,.58,.71].forEach((at,i)=>{place(buf,ed(bp(noise(.05),250,1500),45),at,.7-i*.04);place(buf,ed(sine(U(110,160),.08),40),at,.4)});place(buf,mul(bp(noise(.3),600,2500),t=>.12*Math.sin(Math.PI*t/.3)),.3,1);return verb(buf,.6,.25,3500)};
G.oni_burst=()=>{const buf=Z(1.4);for(let k=0;k<6;k++)place(buf,ed(bp(noise(.12),200,4000),18),U(0,.08),.6);place(buf,sat(ed(sweepEnv(110,35,.5),6),3),0,1);for(let k=0;k<14;k++)place(buf,ed(bp(noise(.03),800,5000),80),U(.05,.45),U(.15,.35));place(buf,growl(1,64),.06,1);return verb(buf,1.2,.35,4000)};
G.oni_ult=()=>{const d=3,buf=Z(d);[55,58.3,82.4,87.3].forEach(f=>place(buf,mul(saw(f,2.6,14),t=>.25*Math.min(1,t/.3)*Math.min(1,(2.6-t)/.6)),0,1));
  place(buf,mul(T(1.6,t=>Math.sin(PI2*(1800+400*Math.sin(PI2*5*t))*t)+Math.sin(PI2*(1907+380*Math.sin(PI2*4.3*t))*t)),t=>.08*Math.min(1,t/.1)*Math.exp(-t*1.5)),.05,1);place(buf,sat(ed(sweepEnv(80,30,.8),4),3),0,1);place(buf,growl(1.6,52),.3,.8);return verb(buf,2.2,.45,3500)};
G.oni_step=()=>{const buf=Z(.4);place(buf,sat(ed(sweepEnv(85,40,.18),18),2.5),0,1);place(buf,ed(lp(noise(.1),400),30),0,.7);place(buf,ed(bp(noise(.15),400,1500),25),.02,.2);return verb(buf,.4,.2,2500)};
G.oni_heart=()=>{const buf=Z(.6);[[0,1],[.17,.7]].forEach(([at,gn])=>{place(buf,sat(ed(sweepEnv(70,38,.14),22),2),at,gn);place(buf,ed(lp(noise(.06),200),40),at,.4*gn)});return verb(buf,.3,.12,1500)};
G.oni_grab=()=>{const buf=Z(.7);for(let k=0;k<8;k++)place(buf,ed(bp(noise(.025),1200,6000),110),U(0,.15),U(.3,.6));place(buf,sat(ed(sweepEnv(140,50,.2),16),2.5),0,1);place(buf,growl(.5,80),.02,.8);return verb(buf,.5,.25,4000)};
// ===== 때리는형태 (화난 괴물) =====
function roar(d,f0,scr){const x=Z(d);let ph=0,ph2=0;for(let i=0;i<x.length;i++){const t=i/SR,u=t/d,f=f0*(1+.35*Math.sin(Math.PI*u))*(1+.05*(R()*2-1));ph+=f/SR;ph2+=f*2.02/SR;x[i]=((2*(ph%1)-1)+.5*(2*(ph2%1)-1))*(.55+.45*Math.sin(PI2*38*t))}
  let v=add(bp(x,180,1600),bp(noise(d),400,2600),.7);v=sat(v,2.5);if(scr){let p3=0;add(v,T(d,t=>{p3+=PI2*(700+500*Math.sin(Math.PI*t/d))/SR;return Math.sin(p3)*(.5+.5*Math.sin(PI2*22*t))}),.25)}
  return mul(v,t=>Math.min(1,t/.06)*Math.pow(Math.max(0,1-t/d),.6))}
G.rg_roar=()=>{const buf=Z(1.6);place(buf,roar(1.3,62,1),0,1);place(buf,mul(lp(noise(1.3),160),t=>.6*Math.sin(Math.PI*t/1.3)),0,1);return verb(buf,1.2,.3,3500)};
G.rg_rage=()=>{const d=2.2,buf=Z(d);place(buf,roar(1.8,50,1),.1,1);place(buf,sat(ed(sweepEnv(90,28,1),3),3),0,1);place(buf,mul(movBP(noise(1.5),200,3000,.2),t=>.35*Math.pow(t/1.5,1.5)),0,1);for(let k=0;k<5;k++)place(buf,sat(ed(sweepEnv(70,35,.3),12),2.5),.15+k*.3,.5);return verb(buf,1.6,.35,3500)};
G.rg_charge=()=>{const d=.9,buf=Z(d);for(let k=0;k<6;k++)place(buf,sat(ed(sweepEnv(80,40,.15),20),2.5),k*.12,.6);place(buf,mul(movBP(noise(d),300,1800,.2),t=>.5*Math.min(1,t/.2)*Math.min(1,(d-t)/.2)),0,1);return verb(buf,.6,.2,3000)};
G.rg_grab=()=>{const buf=Z(.6);place(buf,ed(lp(noise(.12),800),25),0,.9);place(buf,sat(ed(sweepEnv(130,60,.15),18),2),0,.8);place(buf,roar(.45,85,0),.03,.6);return verb(buf,.4,.2,3500)};
G.rg_wall=()=>{const buf=Z(1.4);place(buf,sat(ed(sweepEnv(100,26,.7),5),3.5),0,1.3);for(let k=0;k<5;k++)place(buf,ed(bp(noise(.2),150,4500),12),U(0,.05),.6);for(let k=0;k<20;k++)place(buf,ed(bp(noise(.03),900,5000),80),U(.05,.7),U(.1,.3));place(buf,ed(lp(noise(.8),250),4),0,.7);return verb(buf,1.3,.35,3500)};
G.rg_slam=()=>{const buf=Z(.9);place(buf,sat(ed(sweepEnv(95,30,.45),8),3),0,1.2);place(buf,ed(bp(noise(.15),150,3500),18),0,.8);for(let k=0;k<10;k++)place(buf,ed(bp(noise(.03),800,4500),80),U(.03,.4),U(.1,.25));return verb(buf,.8,.3,3500)};
G.rg_leap=()=>{const buf=Z(.8);place(buf,sat(ed(sweepEnv(110,45,.2),14),2.5),0,.8);place(buf,mul(movBP(noise(.6),400,2000,.2),t=>.6*Math.sin(Math.PI*t/.6)),.05,1);place(buf,roar(.5,75,0),.0,.4);return verb(buf,.6,.25,4000)};
G.rg_land=()=>{const d=1.8,buf=Z(d);place(buf,sat(mul(sweepEnv(80,22,1.2,.5),t=>Math.exp(-t*2.5)),3.5),0,1.4);place(buf,ed(lp(noise(1.2),300),3),0,.9);place(buf,ed(bp(noise(.25),200,5000),10),0,.7);for(let k=0;k<26;k++)place(buf,ed(bp(noise(.03),600,4500),70),U(.05,1),U(.08,.25));return verb(buf,1.6,.4,3000)};
// ===== 토타디 (카메라 · 스피커 · 변기) =====
G.tt_summon=()=>{const buf=Z(.9);place(buf,mul(sweepEnv(200,1600,.4,1.5),t=>.25*Math.pow(t/.4,1.2)),0,1);place(buf,mul(movBP(noise(.4),400,7000,.25),t=>.35*Math.pow(t/.4,2)),0,1);place(buf,sat(ed(sweepEnv(140,50,.25),14),2),.4,.8);place(buf,bell(1567.98,.5,6),.4,.25);place(buf,bell(2093,.45,7),.43,.15);return verb(buf,.7,.3,8000)};
G.tt_charge=()=>{const d=.6,buf=Z(d);let ph=0;place(buf,T(d,t=>{ph+=PI2*(300+2600*Math.pow(t/d,1.6))/SR;return(Math.sin(ph)+.3*Math.sin(ph*2.01))*.35*Math.min(1,t/.05)}),0,1);[0,.18,.33,.44,.52].forEach(at=>place(buf,ed(sine(2400,.05),60),at,.2));return verb(buf,.4,.15,8000)};
G.tt_beam=()=>{const d=.85,buf=Z(d);let ph=0;place(buf,mul(T(d,t=>{ph+=PI2*(110+8*Math.sin(PI2*30*t))/SR;let s=0;for(let k=1;k<9;k++)s+=Math.sin(ph*k)/k;return s}),t=>.4*Math.min(1,t/.02)*Math.min(1,(d-t)/.1)),0,1);
  place(buf,mul(bp(noise(d),2500,8000),t=>.25*(.6+.4*Math.sin(PI2*50*t))*Math.min(1,(d-t)/.1)),0,1);place(buf,sat(ed(sweepEnv(300,80,.15),18),2),0,.6);return verb(buf,.5,.2,8000)};
G.tt_spk=()=>{const buf=Z(.7);place(buf,ed(lp(noise(.02),2000),200),0,.6);place(buf,mul(sine(50,.4),t=>.6*Math.exp(-t*6)*(1-Math.exp(-t*80))),.03,1);place(buf,mul(bp(noise(.3),1000,6000),t=>.05*Math.exp(-t*6)),.03,1);place(buf,ed(sine(1000,.08),40),.25,.12);return verb(buf,.5,.2,6000)};
G.tt_bass=()=>{const d=.7,buf=Z(d);place(buf,sat(mul(sweepEnv(95,38,d,.6),t=>Math.exp(-t*4.5)*(1-Math.exp(-t*200))),2.8),0,1.3);place(buf,ed(bp(noise(.04),100,1200),70),0,.6);let ph=0;place(buf,mul(T(.45,t=>{ph+=PI2*(55*(1+.5*Math.sin(PI2*8*t)))/SR;return Math.sign(Math.sin(ph))}),t=>.18*Math.exp(-t*5)),0,1);return verb(buf,.4,.15,3000)};
G.tt_drop=()=>{const d=.5,buf=Z(d);place(buf,mul(sweepEnv(2200,700,d,.8),t=>.3*Math.min(1,t/.05)),0,1);place(buf,mul(movBP(noise(d),1500,600,.2),t=>.35*Math.pow(t/d,1.5)),0,1);return verb(buf,.4,.2,7000)};
G.tt_crash=()=>{const buf=Z(1);place(buf,sat(ed(sweepEnv(140,45,.25),12),2.5),0,1);for(let k=0;k<6;k++)place(buf,ed(hp(noise(.3),2500),9),U(0,.04),.35);for(let k=0;k<40;k++)place(buf,ed(T(.1,t=>Math.sin(PI2*U(2500,7000)*t)),U(30,70)),U(.02,.5),U(.05,.15));place(buf,mul(movBP(noise(.4),3000,400,.25),t=>.4*Math.exp(-t*7)),0,1);return verb(buf,.8,.3,7000)};
G.tt_flush=()=>{const d=1.5,buf=Z(d);place(buf,ed(bp(noise(.04),800,4000),80),0,.6);place(buf,mul(movBP(noise(1.3),600,2500,.3),t=>.6*Math.min(1,t/.15)*Math.pow(Math.max(0,1-t/1.3),.7)*(.7+.3*Math.sin(PI2*7*t))),.05,1);
  for(let k=0;k<26;k++){const f0=U(200,600);place(buf,ed(sweepEnv(f0,f0*2.6,.05),45),U(.1,1.2),U(.1,.25))}place(buf,mul(lp(noise(1.2),250),t=>.4*Math.sin(Math.PI*t/1.2)),.1,1);return verb(buf,.8,.3,5000)};
G.tt_vortex=()=>{const d=2.4,buf=Z(d);place(buf,mul(movBP(noise(d),300,1800,.3),t=>.7*Math.min(1,t/.3)*Math.min(1,(d-t)/.5)*(.75+.25*Math.sin(PI2*(3+t*3)*t))),0,1);place(buf,mul(lp(noise(d),180),t=>.6*Math.min(1,t/.4)*Math.min(1,(d-t)/.5)),0,1);
  for(let k=0;k<40;k++){const f0=U(150,500);place(buf,ed(sweepEnv(f0,f0*2.2,.06),40),U(.2,2),U(.08,.2))}return verb(buf,1.4,.35,4000)};
G.tt_geyser=()=>{const d=1.8,buf=Z(d);place(buf,sat(ed(sweepEnv(110,30,.8),4),3),0,1.2);place(buf,mul(movBP(noise(1.4),400,5000,.25),t=>.8*Math.min(1,t/.02)*Math.exp(-t*2.2)),0,1);for(let k=0;k<50;k++)place(buf,ed(bp(noise(.03),1500,7000),70),U(.1,1.4),U(.05,.18));place(buf,bell(1046.5,.8,4),.05,.15);return verb(buf,1.5,.4,6000)};
// ===== 김민재 (축구 수비) =====
function crowdN(d){const x=Z(d);[400,700,1100,1600,2300].forEach((c,k)=>{const r=U(.3,.8);add(x,mul(bp(noise(d),c*.7,c*1.3),t=>.4+.3*Math.sin(PI2*r*t+k)),.5)});return x}
G.kj_whistle=()=>{const buf=Z(.9);let ph=0;place(buf,mul(T(.7,t=>{ph+=PI2*(2650+120*Math.sign(Math.sin(PI2*28*t)))/SR;return Math.sin(ph)+.3*Math.sin(ph*2)}),t=>.35*Math.min(1,t/.02)*Math.min(1,(.7-t)/.05)),0,1);place(buf,mul(bp(noise(.7),2000,6000),t=>.12*Math.min(1,(.7-t)/.05)),0,1);return verb(buf,.6,.2,8000)};
G.kj_slide=()=>{const d=.6,buf=Z(d);place(buf,mul(bp(noise(d),500,4000),t=>.7*Math.min(1,t/.03)*Math.pow(1-t/d,.8)*(.7+.3*Math.sin(PI2*30*t))),0,1);place(buf,mul(lp(noise(d),300),t=>.4*Math.exp(-t*4)),0,1);return verb(buf,.4,.15,5000)};
G.kj_bump=()=>{const buf=Z(.4);place(buf,sat(ed(sweepEnv(120,55,.18),18),2.5),0,1);place(buf,ed(lp(noise(.12),700),30),0,.8);place(buf,ed(bp(noise(.05),300,1500),50),.01,.4);return verb(buf,.3,.12,3000)};
G.kj_block=()=>{const buf=Z(.35);place(buf,sat(ed(sweepEnv(260,90,.1),35),2.5),0,.9);place(buf,ed(bp(noise(.04),800,5000),90),0,.8);place(buf,ed(sine(520,.12),30),0,.2);return verb(buf,.3,.12,6000)};
G.kj_kick=()=>{const buf=Z(.9);place(buf,sat(ed(sweepEnv(200,60,.16),24),2.5),0,1);place(buf,ed(bp(noise(.04),900,5000),90),0,.8);place(buf,mul(movBP(noise(.5),2500,700,.2),t=>.35*Math.exp(-t*4)),.02,1);place(buf,mul(crowdN(.6),t=>.25*Math.sin(Math.PI*t/.6)),.15,1);return verb(buf,.6,.25,5000)};
G.kj_crowd=()=>{const d=2,buf=Z(d);place(buf,mul(crowdN(d),t=>.8*Math.min(1,t/.35)*Math.min(1,(d-t)/.6)),0,1);[0,.5,1].forEach(at=>place(buf,ed(lp(noise(.08),300),30),.2+at,.25));return verb(buf,1.2,.4,4000)};
G.kj_flag=()=>{const buf=Z(.5);place(buf,mul(bp(noise(.18),800,5000),t=>.6*Math.sin(Math.PI*t/.18)*(.6+.4*Math.sin(PI2*40*t))),0,1);place(buf,ed(hp(noise(.02),2000),200),.15,.6);return verb(buf,.3,.12,7000)};
G.kj_mark=()=>{const buf=Z(.6);place(buf,ed(sweepEnv(500,900,.1),20),0,.3);place(buf,ed(sweepEnv(700,1300,.1),20),.08,.3);place(buf,sat(ed(sweepEnv(110,50,.2),14),2),.05,.6);return verb(buf,.4,.15,6000)};
// ===== 샌즈 (8비트) =====
const sqw=(f,d,duty)=>T(d,t=>((f*t)%1)<(duty||.5)?1:-1);
function chip(d,rate){const x=Z(d);let v=0;const st=Math.max(1,Math.floor(SR/rate));for(let i=0;i<x.length;i++){if(i%st==0)v=R()*2-1;x[i]=v}return x}
G.sn_bone=()=>{const buf=Z(.3);let ph=0;place(buf,mul(T(.14,t=>{ph+=(900-4000*t)/SR;return(ph%1)<.5?1:-1}),t=>.35*Math.exp(-t*14)),0,1);place(buf,mul(chip(.06,6000),t=>.25*Math.exp(-t*40)),0,1);return buf};
G.sn_warn=()=>{const buf=Z(.6);[0,.14,.28].forEach(at=>place(buf,mul(sqw(1320,.09,.5),t=>.25),at,1));return buf};
G.sn_sweep=()=>{const buf=Z(.6);let ph=0;place(buf,mul(T(.5,t=>{ph+=(300+500*t)/SR;return(ph%1)<.25?1:-1}),t=>.22*Math.min(1,t/.02)*Math.min(1,(.5-t)/.1)),0,1);place(buf,mul(chip(.5,3000),t=>.15*Math.sin(Math.PI*t/.5)),0,1);return buf};
G.sn_blue=()=>{const buf=Z(.6);place(buf,mul(sqw(988,.08,.5),t=>.25),0,1);place(buf,mul(sqw(1318.5,.18,.5),t=>.25*Math.exp(-t*8)),.08,1);let ph=0;place(buf,mul(T(.3,t=>{ph+=(400-1100*t)/SR;return(ph%1)<.5?1:-1}),t=>.2*Math.exp(-t*6)),.2,1);return buf};
G.sn_slam=()=>{const buf=Z(.45);place(buf,mul(chip(.35,2500),t=>.5*Math.exp(-t*10)),0,1);let ph=0;place(buf,mul(T(.25,t=>{ph+=(160-400*t)/SR;return(ph%1)<.5?1:-1}),t=>.4*Math.exp(-t*10)),0,1);return buf};
G.sn_gbc=()=>{const d=.55,buf=Z(d);place(buf,mul(chip(d,1500),t=>.3*Math.pow(t/d,1.5)),0,1);let ph=0;place(buf,mul(T(d,t=>{ph+=(200+900*t/d)/SR;return(ph%1)<.5?1:-1}),t=>.18*Math.pow(t/d,1.2)),0,1);return buf};
G.sn_gbf=()=>{const d=.75,buf=Z(d);place(buf,mul(chip(d,4000),t=>.55*Math.min(1,t/.01)*Math.exp(-t*3.5)),0,1);place(buf,mul(chip(d,700),t=>.4*Math.exp(-t*4)),0,1);let ph=0;place(buf,mul(T(.4,t=>{ph+=(120-150*t)/SR;return(ph%1)<.5?1:-1}),t=>.35*Math.exp(-t*5)),0,1);return buf};
G.sn_text=()=>{const buf=Z(.06);place(buf,mul(sqw(220,.045,.5),t=>.3*Math.min(1,(.045-t)/.01)),0,1);return buf};
G.sn_miss=()=>{const buf=Z(.3);let ph=0;place(buf,mul(T(.18,t=>{ph+=(600+1800*t)/SR;return(ph%1)<.5?1:-1}),t=>.18*Math.exp(-t*8)),0,1);place(buf,mul(chip(.15,8000),t=>.12*Math.sin(Math.PI*t/.15)),0,1);return buf};
G.sn_ult=()=>{const d=2,buf=Z(d);[0,.4,.8].forEach((at,i)=>place(buf,mul(sqw([110,103.8,98][i],.5,.25),t=>.25*Math.exp(-t*3)),at,1));place(buf,mul(T(1.2,t=>Math.sin(PI2*55*t)),t=>.4*Math.exp(-t*2)),.8,1);place(buf,mul(chip(.4,1200),t=>.2*Math.exp(-t*6)),.8,1);return verb(buf,1,.25,4000)};
// ===== 최해솔 (학교) =====
const chime=(f,d)=>T(d,t=>(Math.sin(PI2*f*t)+.35*Math.sin(PI2*f*2*t)*Math.exp(-t*3)+.15*Math.sin(PI2*f*3.01*t)*Math.exp(-t*5))*Math.exp(-t*2.2)*Math.min(1,t/.004));
G.hs_bell=()=>{const buf=Z(2.6);[[659.25,0],[523.25,.42],[587.33,.84],[392,1.26]].forEach(([f,at])=>place(buf,chime(f,1.3),at,.38));return verb(buf,1.2,.35,6000)};
G.hs_run=()=>{const buf=Z(1);for(let k=0;k<8;k++){place(buf,ed(lp(noise(.06),900),40),k*.11,.6);place(buf,ed(bp(noise(.03),1500,5000),80),k*.11+.005,.3)}place(buf,mul(bp(noise(.9),400,1800),t=>.12*Math.sin(Math.PI*t/.9)),0,1);return verb(buf,.4,.15,5000)};
G.hs_bread=()=>{const buf=Z(.8);[0,.22,.42].forEach(at=>{place(buf,ed(bp(noise(.08),800,4500),40),at,.6);for(let k=0;k<5;k++)place(buf,ed(hp(noise(.008),2500),500),at+U(0,.06),.3)});place(buf,bell(1318.5,.4,7),.55,.18);return verb(buf,.4,.15,6000)};
G.hs_paper=()=>{const buf=Z(.4);place(buf,mul(bp(noise(.3),1500,7000),t=>.6*Math.sin(Math.PI*t/.3)*(.5+.5*Math.sin(PI2*35*t))),0,1);return verb(buf,.3,.12,8000)};
G.hs_grade=()=>{const buf=Z(.6);place(buf,mul(bp(noise(.22),2500,6500),t=>.5*Math.sin(Math.PI*t/.22)*(.6+.4*Math.sin(PI2*20*t))),0,1);place(buf,ed(lp(noise(.05),700),50),.24,.6);place(buf,bell(880,.3,10),.25,.15);return verb(buf,.4,.15,7000)};
G.hs_chalk=()=>{const buf=Z(.3);place(buf,mul(movBP(noise(.15),1500,4000,.2),t=>.4*Math.sin(Math.PI*t/.15)),0,1);return verb(buf,.2,.1,8000)};
G.hs_tap=()=>{const buf=Z(.25);place(buf,ed(bp(noise(.03),2000,7000),120),0,.8);place(buf,ed(T(.06,t=>Math.sin(PI2*2800*t)),90),0,.2);return verb(buf,.2,.1,8000)};
G.hs_slam=()=>{const buf=Z(1);place(buf,sat(ed(sweepEnv(150,45,.3),12),2.5),0,1);place(buf,ed(bp(noise(.12),200,4000),22),0,.9);place(buf,ed(lp(noise(.4),400),9),0,.5);return verb(buf,.9,.35,4000)};
G.hs_grow=()=>{const buf=Z(1);[523.25,659.25,783.99,1046.5].forEach((f,i)=>place(buf,bell(f,.6,5),i*.07,.25));place(buf,mul(sweepEnv(300,900,.3,1),t=>.1*Math.sin(Math.PI*t/.3)),0,1);return verb(buf,.8,.3,8000)};
// ===== 어쩌라고 =====
G.ez_say=()=>{const buf=Z(.6);let ph=0;place(buf,mul(T(.32,t=>{ph+=PI2*(620-260*t/.32+40*Math.sin(PI2*9*t))/SR;return Math.sin(ph)+.4*Math.sin(ph*2)+.2*Math.sin(ph*3)}),t=>.35*Math.min(1,t/.02)*Math.min(1,(.32-t)/.06)),0,1);place(buf,ed(sine(1500,.1),25),0,.15);place(buf,bell(1046.5,.3,9),.28,.15);return verb(buf,.4,.15,6000)};
G.ez_shield=()=>{const buf=Z(.8);place(buf,mul(sweepEnv(300,1400,.25,1.5),t=>.25*Math.sin(Math.PI*t/.25)),0,1);place(buf,bell(1568,.6,5),.2,.2);place(buf,bell(2093,.5,6),.24,.15);place(buf,mul(bp(noise(.4),2500,7000),t=>.1*Math.exp(-t*6)),.2,1);return verb(buf,.6,.25,8000)};
G.ez_reflect=()=>{const buf=Z(.4);place(buf,ed(sweepEnv(500,1600,.08,.6),30),0,.5);place(buf,ed(T(.2,t=>Math.sin(PI2*2200*t)+.5*Math.sin(PI2*3300*t)),20),0,.2);place(buf,ed(bp(noise(.03),1500,6000),100),0,.4);return verb(buf,.3,.12,8000)};
G.ez_letter=()=>{const buf=Z(.5);[0,.07,.14,.21].forEach((at,i)=>place(buf,mul(movBP(noise(.15),800,3500,.2),t=>.4*Math.sin(Math.PI*t/.15)),at,1));return verb(buf,.3,.12,7000)};
G.ez_bounce=()=>{const buf=Z(.3);let ph=0;place(buf,mul(T(.15,t=>{ph+=PI2*(220+900*Math.exp(-t*30))/SR;return Math.sin(ph)}),t=>.5*Math.exp(-t*18)),0,1);place(buf,ed(bp(noise(.02),1500,5000),150),0,.3);return verb(buf,.2,.1,6000)};
G.ez_msg=()=>{const buf=Z(.35);place(buf,bell(1318.5,.25,12),0,.35);place(buf,bell(1760,.25,12),.07,.3);return verb(buf,.3,.12,8000)};
G.ez_stamp=()=>{const buf=Z(1);place(buf,sat(ed(sweepEnv(140,40,.35),10),3),0,1.2);place(buf,ed(lp(noise(.15),900),25),0,.8);place(buf,ed(bp(noise(.06),1500,6000),60),0,.4);place(buf,bell(1046.5,.5,6),.05,.12);return verb(buf,.8,.3,4000)};
G.ez_ult=()=>{const buf=Z(1.2);[0,.08,.16,.24,.32].forEach((at,i)=>place(buf,bell([1318.5,1567.98,1760,2093,2637][i],.4,8),at,.22));place(buf,mul(sweepEnv(200,900,.5,1.4),t=>.15*Math.sin(Math.PI*t/.5)),0,1);return verb(buf,1,.3,8000)};
// ===== 제트 (바람) =====
function windN(d,c0,c1,q){return movBP(noise(d),c0,c1,q||.2)}
G.jt_dash=()=>{const d=.5,buf=Z(d);place(buf,mul(windN(d,500,4500,.15),t=>.9*Math.min(1,t/.02)*Math.pow(1-t/d,1.4)),0,1);place(buf,mul(lp(noise(d),300),t=>.4*Math.exp(-t*8)),0,1);place(buf,ed(hp(noise(.02),3000),200),0,.3);return verb(buf,.5,.2,8000)};
G.jt_up=()=>{const d=.9,buf=Z(d);place(buf,mul(windN(d,300,3000,.25),t=>.8*Math.min(1,t/.08)*Math.pow(1-t/d,1)),0,1);place(buf,mul(sweepEnv(200,700,.5,1),t=>.12*Math.sin(Math.PI*t/.5)),0,1);place(buf,sat(ed(sweepEnv(110,50,.15),20),2),0,.4);return verb(buf,.7,.3,7000)};
G.jt_smoke=()=>{const buf=Z(1.4);place(buf,ed(lp(noise(.15),1200),20),0,.7);place(buf,mul(bp(noise(1.2),1500,7000),t=>.45*Math.min(1,t/.02)*Math.exp(-t*2.2)),0,1);place(buf,sat(ed(sweepEnv(120,50,.2),14),2),0,.5);return verb(buf,1,.3,7000)};
G.jt_ult=()=>{const d=1.6,buf=Z(d);for(let k=0;k<5;k++){const f=U(2400,3200);place(buf,ed(T(.6,t=>Math.sin(PI2*f*t)+.6*Math.sin(PI2*f*1.52*t)+.3*Math.sin(PI2*f*2.31*t)),6),.08+k*.08,.15)}
  place(buf,mul(windN(1.2,200,5000,.2),t=>.6*Math.pow(t/1.2,1.2)*Math.min(1,(1.2-t)/.1)),0,1);place(buf,sat(ed(sweepEnv(90,40,.6),5),2.5),.5,.7);return verb(buf,1.4,.35,8000)};
G.jt_throw=()=>{const d=.35,buf=Z(d);place(buf,mul(windN(d,2500,900,.12),t=>.8*Math.min(1,t/.01)*Math.exp(-t*7)),0,1);place(buf,ed(T(.2,t=>Math.sin(PI2*3100*t)+.5*Math.sin(PI2*4650*t)),18),0,.12);return verb(buf,.3,.12,8000)};
G.jt_hit=()=>{const buf=Z(.35);place(buf,sat(ed(sweepEnv(260,90,.1),35),2),0,.8);place(buf,ed(bp(noise(.04),1200,6000),110),0,.7);place(buf,ed(T(.25,t=>Math.sin(PI2*2700*t)),25),0,.12);return verb(buf,.3,.12,6000)};
G.jt_fan=()=>{const buf=Z(.8);[0,.03,.06,.09,.12].forEach(at=>place(buf,mul(windN(.3,2800,800,.12),t=>.5*Math.exp(-t*8)),at,1));place(buf,ed(T(.5,t=>Math.sin(PI2*3300*t)+.5*Math.sin(PI2*4900*t)),9),0,.15);return verb(buf,.6,.25,8000)};
G.jt_slash=()=>{const buf=Z(.45);place(buf,mul(windN(.2,1500,6000,.12),t=>.7*Math.sin(Math.PI*t/.2)),0,1);place(buf,ed(T(.3,t=>Math.sin(PI2*3500*t)+.6*Math.sin(PI2*5200*t)),14),.08,.2);return verb(buf,.35,.15,8000)};
// ===== 테러리스트 (밀리터리) =====
const gunshot=(g0)=>{const x=Z(.4);place(x,sat(ed(bp(noise(.08),300,6000),45),3),0,1);place(x,sat(ed(sweepEnv(180,50,.12),30),2.5),0,.9);place(x,ed(hp(noise(.01),4000),600),0,.6);place(x,mul(lp(noise(.35),700),t=>.3*Math.exp(-t*9)),.01,1);return x};
G.tr_burst=()=>{const buf=Z(.7);[0,.07,.14].forEach(at=>place(buf,gunshot(),at,.85));return verb(buf,.6,.25,4500)};
G.tr_sand=()=>{const buf=Z(.5);place(buf,ed(lp(noise(.15),500),25),0,.9);place(buf,mul(bp(noise(.2),800,4000),t=>.25*Math.exp(-t*14)),0,1);place(buf,sat(ed(sweepEnv(90,45,.12),25),2),0,.6);return verb(buf,.3,.12,3000)};
G.tr_c4=()=>{const buf=Z(.5);place(buf,ed(bp(noise(.03),600,3000),80),0,.7);place(buf,ed(T(.08,t=>Math.sin(PI2*900*t)),40),.02,.3);place(buf,mul(bp(noise(.12),1500,5000),t=>.2*Math.sin(Math.PI*t/.12)),.1,1);return verb(buf,.3,.12,5000)};
G.tr_beep=()=>{const buf=Z(.12);place(buf,mul(T(.07,t=>Math.sign(Math.sin(PI2*2400*t))),t=>.25),0,1);return buf};
G.tr_boom=()=>{const d=2,buf=Z(d);place(buf,sat(mul(sweepEnv(85,22,1.4,.5),t=>Math.exp(-t*2.6)),3.5),0,1.4);place(buf,sat(ed(bp(noise(.4),100,5000),8),2.5),0,1);place(buf,ed(lp(noise(1.6),300),2.2),0,.9);for(let k=0;k<20;k++)place(buf,ed(bp(noise(.04),700,5000),60),U(.05,1),U(.05,.2));return verb(buf,1.8,.4,3000)};
G.tr_heli=()=>{const d=2.6,buf=Z(d);let ph=0;const th=T(d,t=>{ph+=12.5/SR;const k=(ph%1);return Math.exp(-k*14)});const n=lp(noise(d),500),hi=bp(noise(d),1500,4000);
  for(let i=0;i<buf.length;i++){const t=i/SR,e=Math.min(1,t/.8)*Math.min(1,(d-t)/.4);buf[i]=(n[i]*(.3+th[i]*1.4)+hi[i]*.15*th[i]+Math.sin(PI2*42*t)*.15)*e}return verb(buf,1,.25,3000)};
G.tr_strafe=()=>{const d=.9,buf=Z(d);for(let k=0;k<28;k++)place(buf,mul(gunshot(),t=>1),k*.03,.35);place(buf,mul(sweepEnv(900,700,d,1),t=>.08*Math.min(1,(d-t)/.1)),0,1);return verb(buf,.8,.3,4000)};
G.tr_rope=()=>{const d=.8,buf=Z(d);place(buf,mul(bp(noise(d),1200,5000),t=>.5*Math.min(1,t/.05)*Math.min(1,(d-t)/.15)*(.7+.3*Math.sin(PI2*45*t))),0,1);place(buf,mul(sweepEnv(1400,900,d,1),t=>.06),0,1);return verb(buf,.4,.15,6000)};
G.tr_radio=()=>{const d=.9,buf=Z(d);place(buf,ed(hp(noise(.03),2000),80),0,.5);place(buf,mul(bp(noise(.6),1200,3200),t=>.35*(.5+.5*Math.sign(Math.sin(PI2*7*t)))),.05,1);place(buf,mul(T(.12,t=>Math.sin(PI2*1600*t)),t=>.2),.7,1);return verb(buf,.3,.1,4000)};
G.tr_land=()=>{const buf=Z(.8);place(buf,sat(ed(sweepEnv(120,40,.3),10),3),0,1.1);place(buf,ed(lp(noise(.2),600),18),0,.8);place(buf,ed(bp(noise(.05),800,4000),60),0,.4);return verb(buf,.6,.25,3000)};
// ===== 만화 컷 · 가오란 · 김갑룡 (묵직한 타격음) =====
const hSub=(f0,f1,d,k,dr)=>sat(mul(sweepEnv(f0,f1,d,.4),t=>Math.exp(-t*k)*(1-Math.exp(-t*400))),dr||3);
const hCrack=(d,lo,hi,k)=>sat(ed(bp(noise(d),lo,hi),k),2.5);
const hWhoosh=(d,c0,c1)=>mul(movBP(noise(d),c0,c1,.2),t=>Math.pow(Math.sin(Math.PI*Math.min(1,t/d)),1.5));
const hRumble=(d,k)=>mul(lp(noise(d),180),t=>Math.exp(-t*k));
const hSlap=()=>ed(hp(noise(.025),1800),160);
function hPunch(big){const d=big?1.6:.7,x=Z(d);place(x,ed(bp(noise(big?.3:.15),140,750),big?12:22),0,big?1.3:1.1);place(x,hSub(big?120:150,big?28:45,big?1:.4,big?3:9,big?4:3),0,big?1.5:1.2);place(x,hCrack(big?.3:.12,180,4000,big?10:22),0,1);place(x,hSlap(),0,.7);place(x,hRumble(d,big?2.2:6),0,big?.9:.5);return x}
G.mg_cut=()=>{const buf=Z(.9);[0,.07].forEach((at,i)=>{place(buf,hSlap(),at,.9);place(buf,mul(bp(noise(.08),900,5000),t=>.6*Math.exp(-t*30)),at,1)});place(buf,hSub(95,48,.5,7,3),.12,1);place(buf,hRumble(.6,6),.12,.5);return verb(buf,.5,.2,4000)};
G.mg_hit=()=>{const buf=Z(1.8);place(buf,hWhoosh(.18,300,3000),0,.6);place(buf,hPunch(1),.16,1);return verb(buf,1.2,.3,3000)};
G.gl_jab=()=>{const buf=Z(.4);place(buf,hWhoosh(.07,900,3500),0,.6);place(buf,hSub(170,60,.14,24,2.5),.06,1);place(buf,hSlap(),.06,1);place(buf,hCrack(.06,600,3500,40),.06,.6);return verb(buf,.25,.1,4000)};
G.gl_str=()=>{const buf=Z(1.1);place(buf,hWhoosh(.16,400,3000),0,.8);place(buf,hPunch(0),.14,1.3);return verb(buf,.7,.25,3500)};
G.gl_flash=()=>{const buf=Z(.9);const sw=mul(hp(noise(.18),2500),t=>Math.pow(t/.18,3));place(buf,sw,0,.6);place(buf,hCrack(.1,1500,8000,30),.18,1);place(buf,hSub(200,80,.2,14,2),.18,.6);place(buf,mul(hp(noise(.5),4000),t=>.3*Math.exp(-t*7)),.18,1);return verb(buf,.6,.25,6000)};
G.gl_knee=()=>{const buf=Z(.5);place(buf,hSub(120,42,.22,14,3),0,1.2);place(buf,hCrack(.08,150,1800,30),0,.8);place(buf,hSlap(),0,.5);return verb(buf,.3,.12,2500)};
G.gl_elbow=()=>{const buf=Z(1.2);place(buf,hWhoosh(.14,500,2600),0,.7);place(buf,hPunch(0),.12,1.3);place(buf,hCrack(.25,100,2500,9),.12,.6);return verb(buf,.9,.3,3000)};
G.gl_god=()=>{const d=2.6,buf=Z(d);const rise=mul(movBP(noise(.5),150,6000,.18),t=>Math.pow(t/.5,3));place(buf,rise,0,.9);place(buf,mul(saw(55,.5,10),t=>.25*Math.pow(t/.5,2)),0,1);
  place(buf,hSub(110,20,1.8,1.6,4.5),.5,1.8);place(buf,hCrack(.5,80,6000,5),.5,1.2);place(buf,hSlap(),.5,1);place(buf,hRumble(2,1.3),.5,1.3);place(buf,mul(hp(noise(1),3000),t=>.4*Math.exp(-t*4)),.5,1);return verb(buf,2,.4,2500)};
G.gl_counter=()=>{const buf=Z(.8);place(buf,ed(hp(noise(.015),3000),300),0,1);place(buf,hPunch(0),.03,1.2);return verb(buf,.5,.2,4000)};
G.gp_punch=()=>{const buf=Z(1.6);place(buf,hWhoosh(.12,300,2200),0,.7);place(buf,hPunch(1),.1,1.3);return verb(buf,1.1,.3,2500)};
G.gp_wall=()=>{const buf=Z(1.5);place(buf,hSub(90,24,.8,4,4),0,1.4);for(let k=0;k<5;k++)place(buf,ed(bp(noise(.2),150,4500),12),U(0,.05),.6);for(let k=0;k<24;k++)place(buf,ed(bp(noise(.03),900,5000),80),U(.05,.8),U(.1,.3));place(buf,hRumble(1.2,2.5),0,.8);return verb(buf,1.2,.35,3000)};
G.gp_crack=()=>{const d=1.4,buf=Z(d);place(buf,mul(lp(noise(d),200),t=>.9*Math.min(1,t/.05)*Math.exp(-t*1.6)),0,1);for(let k=0;k<70;k++)place(buf,ed(bp(noise(.02),400,4000),120),Math.pow(U(0,1),1.4)*1.1,U(.15,.5));place(buf,hSub(80,35,.6,4,3),0,.8);return verb(buf,1,.3,3000)};
G.gp_spike=()=>{const buf=Z(.6);place(buf,hSub(140,55,.2,16,3),0,.8);place(buf,hCrack(.12,300,4000,20),0,1);for(let k=0;k<8;k++)place(buf,ed(bp(noise(.03),1000,5000),80),U(.02,.25),U(.15,.3));return verb(buf,.4,.15,3500)};
G.gp_aura=()=>{const d=2,buf=Z(d);place(buf,mul(movBP(noise(d),120,1800,.25),t=>.9*Math.min(1,t/.4)*Math.exp(-t*1.1)),0,1);place(buf,mul(saw(41,d,12),t=>.3*Math.min(1,t/.2)*Math.exp(-t*1.4)),0,1);[0,.45,.9].forEach((at,i)=>place(buf,hSub(70,35,.3,10,3),at,.8-i*.15));place(buf,hRumble(d,1.2),0,.8);return verb(buf,1.6,.35,2500)};
G.gp_charge=()=>{const d=.6,buf=Z(d);place(buf,hWhoosh(d,300,2000),0,.7);for(let k=0;k<3;k++)place(buf,hSub(85,38,.15,20,3),k*.13,.7);return verb(buf,.4,.15,2500)};
G.gp_ground=()=>{const d=2.8,buf=Z(d);place(buf,hWhoosh(.2,200,2500),0,.7);place(buf,hSub(80,16,2,1.4,4.5),.18,1.8);place(buf,hCrack(.5,80,5000,5),.18,1.2);place(buf,hRumble(2.4,1.1),.18,1.4);for(let k=0;k<50;k++)place(buf,ed(bp(noise(.04),500,4500),50),.2+U(0,1.8),U(.06,.22));return verb(buf,2.2,.4,2200)};
// 폰 스피커는 낮은 저음이 거의 안 나와서 → 저음에서 배음을 뽑아 중음으로 얹음 (폰에서도 묵직하게 '쿵' 들리게)
function hPhone(x){const lo=lp(x,170),h=new Float32Array(x.length);for(let i=0;i<x.length;i++){const v=Math.tanh(lo[i]*6);h[i]=v+Math.abs(v)*.7}
  const m=bp(h,170,1300),k=peak(x)/peak(m)*.9;for(let i=0;i<x.length;i++)x[i]+=m[i]*k;return x}
['mg_cut','mg_hit','gl_jab','gl_str','gl_flash','gl_knee','gl_elbow','gl_god','gl_counter','gp_punch','gp_wall','gp_crack','gp_spike','gp_aura','gp_charge','gp_ground'].forEach(n=>{const f=G[n];G[n]=()=>hPhone(f())});
// ===== 김민채 • 포켓몬카드 (게임보이 느낌 8비트 소리) =====
const pkSq=(f,d,duty)=>{let ph=0;return T(d,t=>{ph+=(typeof f=='function'?f(t):f)/SR;const p=ph%1;return p<(duty||.5)?1:-1})};
const pkNs=(d,hz)=>{let v=0,c=0;const step=Math.max(1,Math.floor(SR/(hz||8000)));return T(d,()=>{if(c++%step==0)v=R()<.5?1:-1;return v})};
const pkChip=(notes,dur,duty,dec)=>{const x=Z(notes.length*dur+.15);notes.forEach((f,i)=>place(x,mul(pkSq(f,dur*1.2,duty||.25),t=>.35*Math.exp(-t*(dec||10))),i*dur,1));return x};
G.pk_shuffle=()=>{const buf=Z(.6);for(let k=0;k<9;k++)place(buf,mul(bp(noise(.04),2000,8000),t=>.5*Math.exp(-t*60)),k*.045+U(0,.01),U(.6,1));place(buf,pkChip([988,1319],.06,.25,12),.42,1);return verb(buf,.3,.15,7000)};
G.pk_charge=()=>{const d=1,buf=Z(d);place(buf,mul(pkSq(t=>300+900*t*t,d,.5),t=>.14*Math.min(1,t/.1)*Math.min(1,(d-t)/.1)),0,1);place(buf,mul(bp(pkNs(d,9000),2500,9000),t=>.25*t*(.5+.5*Math.sign(Math.sin(PI2*24*t)))),0,1);return verb(buf,.4,.2,7000)};
G.pk_hit=()=>{const buf=Z(.35);place(buf,ed(hp(noise(.02),2500),220),0,1);place(buf,mul(pkSq(t=>900-600*Math.min(1,t/.08),.1,.5),t=>.2*Math.exp(-t*25)),0,1);place(buf,hSub(180,70,.12,25,2),0,.7);return buf};
G.pk_card=()=>{const buf=Z(.35);place(buf,mul(bp(noise(.22),1500,7000),t=>.7*Math.sin(Math.PI*t/.22)),0,1);place(buf,ed(hp(noise(.02),3000),200),.2,.8);place(buf,mul(pkSq(t=>1800-3000*t,.12,.5),t=>.12*Math.exp(-t*20)),0,1);return buf};
G.pk_flip=()=>{const buf=Z(.4);place(buf,ed(hp(noise(.015),2500),260),0,.9);place(buf,pkChip([1319,1760,2637],.045,.25,14),.02,1);return verb(buf,.3,.15,7000)};
G.pk_zap=()=>{const d=.5,buf=Z(d);place(buf,mul(pkSq(t=>900+700*Math.sin(PI2*38*t)-600*t,d,.5),t=>.35*Math.exp(-t*5)),0,1);place(buf,mul(bp(pkNs(d,9000),2000,8000),t=>.5*Math.exp(-t*7)*(.6+.4*Math.sign(Math.sin(PI2*30*t)))),0,1);place(buf,hSub(160,60,.15,20,2),0,.6);return verb(buf,.3,.15,6000)};
G.pk_thunder=()=>{const d=1.6,buf=Z(d);place(buf,hCrack(.25,800,9000,9),0,1.2);place(buf,mul(bp(pkNs(.6,7000),1500,8000),t=>.7*Math.exp(-t*6)),0,1);place(buf,mul(pkSq(t=>420-300*t,.5,.5),t=>.25*Math.exp(-t*4)),0,1);place(buf,hSub(90,30,1,2.5,4),.02,1.4);place(buf,hRumble(1.4,2),.05,1.2);return verb(buf,1.2,.3,4000)};
G.pk_fire=()=>{const d=1.1,buf=Z(d);place(buf,mul(movBP(noise(d),500,2400,.3),t=>.9*Math.min(1,t/.05)*Math.min(1,(d-t)/.25)),0,1);for(let k=0;k<30;k++)place(buf,ed(bp(noise(.015),1500,6000),180),U(0,d-.05),U(.1,.3));place(buf,mul(pkSq(t=>110+20*Math.sin(PI2*9*t),d,.5),t=>.1*Math.min(1,(d-t)/.2)),0,1);place(buf,hRumble(d,1),0,.6);return verb(buf,.6,.2,3500)};
G.pk_spin=()=>{const d=1.8,buf=Z(d);place(buf,mul(movBP(noise(d),300,2800,.25),t=>.8*Math.min(1,t/.2)*(.6+.4*Math.sin(PI2*6*t))*Math.min(1,(d-t)/.3)),0,1);place(buf,mul(pkSq(t=>140+200*t,d,.5),t=>.08*Math.min(1,(d-t)/.3)),0,1);place(buf,hRumble(d,.8),0,.8);return verb(buf,1,.3,3000)};
G.pk_psy=()=>{const d=1.4,buf=Z(d);place(buf,mul(T(d,t=>Math.sin(PI2*(330+200*t)*t+3*Math.sin(PI2*7*t))),t=>.3*Math.min(1,t/.15)*Math.min(1,(d-t)/.3)),0,1);place(buf,mul(pkSq(t=>660+40*Math.sin(PI2*12*t),d,.125),t=>.08*Math.min(1,t/.2)*Math.min(1,(d-t)/.3)),0,1);place(buf,mul(movBP(noise(d),300,3000,.3),t=>.25*Math.min(1,t/.3)),0,1);return verb(buf,1.2,.4,5000)};
G.pk_slam=()=>{const buf=Z(1.6);place(buf,mul(pkSq(t=>800-700*Math.min(1,t/.15),.18,.5),t=>.25),0,1);place(buf,hPunch(1),.15,1.3);place(buf,mul(bp(pkNs(.3,5000),400,5000),t=>.5*Math.exp(-t*10)),.15,1);return verb(buf,1,.3,3000)};
G.pk_burn=()=>{const buf=Z(.45);place(buf,mul(bp(noise(.35),1200,6000),t=>.5*Math.exp(-t*8)),0,1);for(let k=0;k<8;k++)place(buf,ed(hp(noise(.01),3000),300),U(0,.3),U(.2,.5));place(buf,mul(pkSq(t=>300-200*t,.15,.5),t=>.1*Math.exp(-t*15)),0,1);return buf};
G.pk_sup=()=>{const buf=Z(1);place(buf,mul(bp(pkNs(.35,6000),300,6000),t=>.8*Math.exp(-t*9)),0,1);place(buf,mul(pkSq(t=>600*Math.pow(.25,t/.3),.3,.5),t=>.25),0,1);place(buf,hSub(120,40,.4,6,3),0,1.1);return verb(buf,.6,.2,4000)};
G.pk_holo=()=>{const buf=Z(1.4);place(buf,pkChip([523,659,784,1047,1319,1568,2093],.06,.25,6),0,1);place(buf,mul(movBP(noise(1),1000,8000,.2),t=>.25*Math.sin(Math.PI*t)),0,1);place(buf,mul(add(sine(2093,1),sine(3136,1),.5),t=>.12*Math.min(1,t/.3)*Math.exp(-t*2)),.3,1);return verb(buf,1,.35,8000)};
// ===== 공병은 • 크레이지콩 (거대한 고릴라) =====
function kgVoice(d,f0,f1,growl,bright){let ph=0;const src=T(d,t=>{const u=t/d,f=f0+(f1-f0)*u+8*Math.sin(PI2*3.1*t)+(R()-.5)*6;ph+=f/SR;const s=2*(ph%1)-1;return s*(1+growl*Math.sin(PI2*31*t))});
  const n=noise(d),x=Z(d);add(x,bp(src,180,520),1);add(x,bp(src,600,1250),.75*bright);add(x,bp(src,1800,3200),.25*bright);add(x,bp(n,400,2600),.35);return lp(sat(x,3),3400)}
G.kg_roar=()=>{const d=2.2,buf=Z(d+.2);place(buf,mul(kgVoice(d,120,78,.55,1),t=>Math.min(1,t/.1)*Math.min(1,(d-t)/.7)*(1+.2*Math.sin(PI2*2*t))),0,1.1);place(buf,mul(saw(55,d,10),t=>.25*Math.min(1,t/.2)*Math.min(1,(d-t)/.6)),0,1);place(buf,hRumble(d,.9),0,.8);place(buf,hSub(70,40,1.4,1.8,3),0,.6);return verb(buf,1.6,.35,3000)};
G.kg_beat=()=>{const buf=Z(.5);place(buf,sat(mul(sweepEnv(130,62,.25),t=>Math.exp(-t*16)),3),0,1.2);place(buf,mul(bp(noise(.12),180,900),t=>.9*Math.exp(-t*30)),0,1);place(buf,ed(bp(noise(.03),900,3000),90),0,.4);return verb(buf,.5,.25,2200)};
G.kg_jump=()=>{const buf=Z(.9);place(buf,hWhoosh(.5,200,1800),0,.9);place(buf,mul(kgVoice(.35,150,110,.4,.7),t=>.8*Math.sin(Math.PI*t/.35)),0,.7);place(buf,hSub(110,45,.25,12,3),0,.7);return verb(buf,.6,.2,3000)};
G.kg_slam=()=>{const buf=Z(2.4);place(buf,hPunch(1),0,1.5);place(buf,hSub(70,18,1.6,1.6,4.5),0,1.6);place(buf,hCrack(.5,80,5000,5),0,1.1);place(buf,hRumble(2,1.1),0,1.3);for(let k=0;k<40;k++)place(buf,ed(bp(noise(.04),500,4500),50),U(.02,1.4),U(.06,.22));return verb(buf,1.8,.38,2400)};
G.kg_zap=()=>{const d=.5,buf=Z(d);place(buf,mul(bp(noise(d),2500,9000),t=>.6*Math.exp(-t*6)*(.4+.6*Math.abs(Math.sin(PI2*47*t)))),0,1);place(buf,mul(T(d,t=>Math.sign(Math.sin(PI2*(110+40*Math.sin(PI2*60*t))*t))),t=>.12*Math.exp(-t*7)),0,1);return verb(buf,.3,.12,7000)};
G.kg_rip=()=>{const d=1.1,buf=Z(d);place(buf,mul(lp(noise(d),250),t=>.9*Math.min(1,t/.08)*Math.exp(-t*1.8)),0,1);for(let k=0;k<45;k++)place(buf,ed(bp(noise(.025),300,4000),110),Math.pow(U(0,1),1.5)*.8,U(.15,.45));place(buf,hSub(90,40,.5,5,3),0,.9);place(buf,mul(kgVoice(.5,140,120,.5,.6),t=>.5*Math.sin(Math.PI*t/.5)),.05,1);return verb(buf,.9,.3,2500)};
G.kg_throw=()=>{const buf=Z(1);place(buf,mul(kgVoice(.4,170,110,.5,.8),t=>.9*Math.sin(Math.PI*t/.4)),0,1);place(buf,hWhoosh(.55,150,1600),.05,1);return verb(buf,.7,.25,3000)};
G.kg_rock=()=>{const buf=Z(2.2);place(buf,hSub(90,24,1.1,2.6,4),0,1.5);place(buf,hCrack(.4,100,6000,7),0,1.2);for(let k=0;k<60;k++)place(buf,ed(bp(noise(.03),400,5500),70),U(0,1.2)*U(0,1),U(.1,.4));place(buf,hRumble(1.8,1.5),0,1.2);return verb(buf,1.5,.35,2600)};
G.kg_axe=()=>{const d=.6,buf=Z(d+.3);place(buf,mul(movBP(noise(d),180,1400,.25),t=>Math.pow(Math.sin(Math.PI*t/d),2)*1.2),0,1);place(buf,mul(sweepEnv(90,140,d),t=>.35*Math.sin(Math.PI*t/d)),0,1);place(buf,mul(T(d,t=>Math.sin(PI2*(440+600*t/d)*t)),t=>.07*Math.sin(Math.PI*t/d)),0,1);return verb(buf,.5,.2,3500)};
G.kg_axehit=()=>{const buf=Z(1.6);place(buf,hPunch(0),0,1.3);place(buf,mul(add(sine(820,.6),sine(1230,.6),.6),t=>.18*Math.exp(-t*9)),0,1);place(buf,mul(bp(noise(.5),3000,9000),t=>.5*Math.exp(-t*8)),0,1);place(buf,hSub(100,30,.6,5,4),0,1);return verb(buf,1.1,.3,3500)};
G.kg_charge=()=>{const d=1,buf=Z(d+.2);place(buf,mul(T(d,t=>Math.sin(PI2*(110+330*t*t)*t)+.4*Math.sin(PI2*(220+660*t*t)*t)),t=>.4*Math.min(1,t/.15)*Math.min(1,(d-t)/.1)),0,1);place(buf,mul(movBP(noise(d),400,6000,.2),t=>.35*t),0,1);place(buf,mul(bp(noise(d),3000,9000),t=>.2*t*Math.abs(Math.sin(PI2*30*t))),0,1);return verb(buf,.8,.3,6000)};
G.kg_wave=()=>{const d=2,buf=Z(d+.3);place(buf,hSub(80,20,1.6,1.4,4.5),0,1.6);place(buf,mul(movBP(noise(d),3000,300,.3),t=>Math.min(1,t/.02)*Math.exp(-t*1.8)),0,1);place(buf,mul(T(d,t=>Math.sin(PI2*(900-700*t/d)*t)),t=>.15*Math.exp(-t*2)),0,1);place(buf,hRumble(d,1),0,1);return verb(buf,1.6,.4,3500)};
G.kg_step=()=>{const buf=Z(.5);place(buf,sat(mul(sweepEnv(70,40,.25),t=>Math.exp(-t*18)),2.5),0,1);place(buf,mul(lp(noise(.2),500),t=>.6*Math.exp(-t*20)),0,1);return buf};
['kg_beat','kg_slam','kg_rock','kg_axehit','kg_wave','kg_step','kg_rip'].forEach(n=>{const f=G[n];G[n]=()=>hPhone(f())});
// ===== 김건우 • 최재희 (말투 밈 · 어두운 톤) =====
function voxSrc(d,f0f){let ph=0;return T(d,t=>{const f=f0f(t)*(1+.012*Math.sin(PI2*5.3*t))+(R()-.5)*3;ph+=f/SR;const p=ph%1;return 1-2*p})}
function voxSeg(src,segs,breath){const out=new Float32Array(src.length),cr=N(.03);let i0=0;segs.forEach(([d,B],si)=>{const n=N(d),i1=Math.min(src.length,i0+n+cr),sl=src.slice(i0,i1),y=new Float32Array(sl.length);
  B.forEach(([lo,hi,am])=>add(y,bp(sl,lo,hi),am));if(breath)add(y,bp(noise(sl.length/SR),1200,4000),breath);for(let i=0;i<y.length;i++){const a=Math.min(1,i/cr),b=Math.min(1,(y.length-i)/cr);out[i0+i]+=y[i]*a*b}i0+=n});return out}
G.cj_um=()=>{const d=.8,src=voxSrc(d,t=>112-14*t);let x=voxSeg(src,[[.2,[[420,820,1],[820,1300,.6]]],[.6,[[120,420,1.3]]]],.05);x=mul(x,t=>Math.min(1,t/.03)*Math.min(1,(d-t)/.35));const buf=Z(1.2);place(buf,sat(x,2),0,1.1);return verb(buf,.8,.3,2500)};
G.cj_ye=()=>{const d=.42,src=voxSrc(d,t=>128+170*Math.pow(t/d,1.6));let x=voxSeg(src,[[.08,[[220,420,1],[2000,2700,.7]]],[.34,[[350,620,1],[1650,2250,.65]]]],.06);x=mul(x,t=>Math.min(1,t/.02)*Math.min(1,(d-t)/.08));const buf=Z(.9);place(buf,sat(x,2.2),0,1.2);place(buf,mul(sine(1760,.08),t=>.06),.02,1);return verb(buf,.5,.22,3500)};
G.cj_bubble=()=>{const buf=Z(.6);place(buf,mul(sweepEnv(260,520,.12),t=>.5*Math.exp(-t*20)),0,1);place(buf,mul(bp(noise(.3),400,2200),t=>.35*Math.sin(Math.PI*t/.3)),0,1);return verb(buf,.4,.25,2500)};
G.cj_dot=()=>{const buf=Z(.4);place(buf,sat(mul(sweepEnv(190,95,.12),t=>Math.exp(-t*30)),2),0,1);place(buf,ed(bp(noise(.02),900,3000),200),0,.5);return verb(buf,.35,.2,2000)};
G.cj_pop=()=>{const buf=Z(.9);place(buf,ed(bp(noise(.08),800,6000),40),0,1);place(buf,hSub(140,50,.3,10,3),0,1);place(buf,mul(sweepEnv(900,300,.15),t=>.12*Math.exp(-t*16)),0,1);return verb(buf,.6,.25,3000)};
G.cj_shout=()=>{const d=.9,src=voxSrc(d,t=>150-30*t);let x=voxSeg(src,[[.3,[[250,450,1],[700,1000,.6]]],[.3,[[220,380,1],[2000,2600,.6]]],[.3,[[600,950,1],[1100,1500,.7]]]],.12);x=mul(x,t=>Math.min(1,t/.03)*Math.min(1,(d-t)/.15));const buf=Z(1.3);place(buf,sat(x,4),0,.9);place(buf,hWhoosh(.7,250,2200),.1,.8);place(buf,hRumble(1,2),0,.5);return verb(buf,.8,.3,2600)};
G.cj_syl=()=>{const buf=Z(.6);place(buf,hSub(130,48,.25,12,3),0,1.1);place(buf,sat(ed(bp(noise(.08),300,3500),35),3),0,.8);place(buf,hSlap(),0,.6);return verb(buf,.4,.2,2500)};
G.cj_boom=()=>{const buf=Z(1.8);place(buf,hPunch(1),0,1.3);place(buf,sat(ed(bp(noise(.4),150,4000),8),3),0,.7);place(buf,hRumble(1.4,1.8),0,1);return verb(buf,1.3,.35,2400)};
G.cj_chant=()=>{const d=2.8,buf=Z(d+.4);
  for(let v=0;v<9;v++){const f0=U(95,175),off=U(0,.06),src=voxSrc(2.3,t=>f0*(t<1.05?1+.08*Math.min(1,t/.2):1.05-.05*Math.min(1,(t-1.05)/.3)));let x=voxSeg(src,[[1.05,[[220,400,1],[1900,2800,.55]]],[.7,[[270,520,1],[580,950,.8]]],[.55,[[130,420,1.1]]]],.08);
    x=mul(x,t=>Math.min(1,t/.04)*(t>1.0&&t<1.1?.35:1)*Math.min(1,(2.3-t)/.4));place(buf,sat(x,1.6),off+.15,.32)}
  place(buf,mul(bp(noise(d),300,2600),t=>.35*Math.min(1,t/.3)*Math.min(1,(d-t)/.5)*(.7+.3*Math.sin(PI2*1.3*t))),0,1);
  [0,.5,1.25,1.75].forEach(at=>{for(let k=0;k<14;k++)place(buf,ed(bp(noise(.03),1200,5000),90),at+U(0,.05),U(.15,.35))});
  place(buf,hSub(70,40,.6,4,3),.15,.6);place(buf,hSub(70,40,.6,4,3),1.4,.6);return verb(buf,1.6,.45,3000)};
G.cj_g=()=>{const d=.6,buf=Z(1.4);place(buf,mul(sweepEnv(1500,220,d,.7),t=>.25*Math.min(1,t/.05)),0,1);place(buf,hWhoosh(d,400,2400),0,.7);place(buf,hRumble(1,1.6),.3,.7);return verb(buf,.8,.3,3000)};
G.cj_gg=()=>{const d=1.6,buf=Z(d+.5);[0,.32].forEach(at=>{place(buf,hSub(90,32,.6,4,4),at,1.3);place(buf,mul(saw(at?49:55,.5,10),t=>.25*Math.exp(-t*4)),at,1)});
  place(buf,mul(T(1.1,t=>Math.sin(PI2*(330-160*t/1.1)*t)*(1+.4*Math.sin(PI2*7*t))),t=>.2*Math.min(1,t/.05)*Math.min(1,(1.1-t)/.3)),.6,1);place(buf,hRumble(d,1.2),0,.8);return verb(buf,1.4,.4,2200)};
['cj_dot','cj_pop','cj_syl','cj_boom','cj_g','cj_gg'].forEach(n=>{const f=G[n];G[n]=()=>hPhone(f())});
// ===== 박지성 • AURA (어두운 폰크 톤) =====
const au808=(f0,d,dr)=>sat(mul(T(d,(()=>{let ph=0;return t=>{const f=f0*(1+1.5*Math.exp(-t*30));ph+=f/SR;return Math.sin(PI2*ph)}})()),t=>Math.exp(-t*2.2)*Math.min(1,t/.003)),dr||3);
const auBell=(f,d)=>{const x=Z(d);[[1,1],[1.48,.6],[2.4,.3]].forEach(([r,a])=>add(x,bp(T(d,t=>((f*r*t)%1)<.5?1:-1),f*r*.7,f*r*1.4),a));return mul(x,t=>.5*Math.exp(-t*9)*Math.min(1,t/.002))};
G.au_walk=()=>{const d=1.6,buf=Z(d+.6);[0,.5].forEach(at=>{place(buf,hSub(60,38,.35,6,3),at,1);place(buf,mul(lp(noise(.2),300),t=>.5*Math.exp(-t*20)),at,1)});const sw=mul(movBP(noise(d),2500,300,.2),t=>.5*Math.pow(t/d,2));place(buf,sw,0,1);place(buf,mul(saw(41,d,8),t=>.12*Math.min(1,t/.4)),0,1);return verb(buf,1.6,.45,1800)};
G.au_flick=()=>{const buf=Z(.4);place(buf,mul(bp(noise(.12),3000,9000),t=>.6*Math.sin(Math.PI*t/.12)),0,1);place(buf,mul(sine(4200,.06),t=>.05*Math.exp(-t*40)),.05,1);return verb(buf,.6,.35,6000)};
G.au_cut=()=>{const buf=Z(1.4);place(buf,mul(add(add(sine(2350,.9),sine(3520,.9),.6),sine(4710,.9),.3),t=>.12*Math.exp(-t*5)),0,1);place(buf,ed(hp(noise(.05),3000),60),0,.8);place(buf,au808(46,1.2,4),0,1.2);place(buf,hCrack(.15,200,5000,20),0,.5);return verb(buf,1.2,.35,3000)};
G.au_turn=()=>{const buf=Z(1.4);place(buf,mul(bp(noise(.25),400,3000),t=>.6*Math.sin(Math.PI*t/.25)),0,1);place(buf,mul(saw(36,1.2,8),t=>.14*Math.min(1,t/.3)*Math.min(1,(1.2-t)/.3)),.1,1);place(buf,mul(sine(73,1.2),t=>.25*Math.min(1,t/.3)*Math.min(1,(1.2-t)/.3)),.1,1);return verb(buf,1.2,.4,1600)};
G.au_glass=()=>{const buf=Z(.8);place(buf,ed(hp(noise(.01),2500),300),0,.9);place(buf,mul(add(sine(1568,.5),sine(2093,.5),.5),t=>.05*Math.exp(-t*7)),.02,1);return verb(buf,.6,.35,5000)};
G.au_boom=()=>{const d=2.6,buf=Z(d+.5);place(buf,au808(42,2,5),0,1.4);place(buf,sat(ed(bp(noise(.6),80,3000),5),4),0,1);place(buf,hRumble(2.2,1),0,1.2);place(buf,mul(movBP(noise(1.2),2000,150,.3),t=>.4*Math.exp(-t*2)),0,1);return verb(buf,2.2,.5,1600)};
G.au_gain=()=>{const buf=Z(.9);place(buf,au808(49,.7,3.5),0,1);place(buf,auBell(1046,.4),0,.35);return verb(buf,.5,.25,3000)};
G.au_clap=()=>{const buf=Z(.9);place(buf,ed(hp(noise(.008),2000),500),0,1);place(buf,mul(bp(noise(.12),700,2400),t=>.8*Math.exp(-t*40)),0,1);place(buf,mul(sine(1180,.12),t=>.12*Math.exp(-t*35)),0,1);place(buf,ed(hp(noise(.006),3000),600),.012,.5);return verb(buf,.8,.3,4000)};
G.au_film=()=>{const d=1.6,buf=Z(d);for(let k=0;k<d*24;k++){const at=k/24;place(buf,mul(bp(noise(.012),1500,5000),t=>.35*Math.exp(-t*300)),at,Math.min(1,at/.2)*Math.min(1,(d-at)/.3))}place(buf,mul(lp(noise(d),600),t=>.12*Math.min(1,t/.2)*Math.min(1,(d-t)/.3)),0,1);place(buf,mul(sine(48,d),t=>.08*Math.min(1,t/.2)*Math.min(1,(d-t)/.3)),0,1);return buf};
G.au_cinema=()=>{const d=2.6,buf=Z(d+.8);[73.4,87.3,110,146.8,174.6,220].forEach((f,i)=>{place(buf,mul(lp(saw(f*(1+U(-.003,.003)),d,14),1600),t=>.13*Math.min(1,t/.03)*Math.exp(-t*1.2)),0,1)});place(buf,au808(40,2,3),0,1.2);place(buf,mul(lp(noise(1.2),200),t=>.6*Math.exp(-t*4)),0,1);place(buf,mul(hp(noise(1.6),5000),t=>.12*Math.exp(-t*2.5)),.02,1);return verb(buf,2.4,.5,2500)};
G.au_lvup=()=>{const d=1,buf=Z(d+.8);place(buf,mul(movBP(noise(.5),300,5000,.25),t=>.6*Math.pow(t/.5,2)),0,1);place(buf,au808(44,.9,4),.5,1);place(buf,auBell(784,.6),.5,.3);place(buf,auBell(932,.6),.56,.25);return verb(buf,1.2,.4,3000)};
G.au_down=()=>{const buf=Z(.9);place(buf,mul(T(.6,t=>Math.sin(PI2*(300-200*t/.6)*t)),t=>.25*Math.exp(-t*4)),0,1);place(buf,mul(lp(noise(.4),500),t=>.3*Math.exp(-t*8)),0,1);return verb(buf,.6,.3,2000)};
['au_cut','au_boom','au_walk','au_cinema','au_clap'].forEach(n=>{const f=G[n];G[n]=()=>hPhone(f())});
// ===== 도전 모드 카드 공개 =====
G.ch_flip=()=>{const buf=Z(.5);place(buf,mul(bp(noise(.12),1500,7000),t=>.6*Math.sin(Math.PI*t/.12)),0,1);place(buf,ed(hp(noise(.01),3000),300),.11,.6);return verb(buf,.3,.15,6000)};
G.ch_pre=()=>{const d=1,buf=Z(d+.4);place(buf,mul(movBP(noise(d),300,4000,.2),t=>.5*Math.pow(t/d,2)),0,1);place(buf,mul(sweepEnv(60,180,d,2),t=>.25*Math.pow(t/d,1.5)),0,1);for(let k=0;k<16;k++)place(buf,ed(hp(noise(.01),5000),200),Math.pow(k/16,.6)*d,.2+.3*k/16);return verb(buf,.6,.3,4000)};
G.ch_epic=()=>{const buf=Z(1.6);place(buf,hSub(110,40,.5,6,3),0,1);[392,466,587].forEach((f,i)=>place(buf,mul(add(sine(f,1),sine(f*2,1),.3),t=>.12*Math.exp(-t*3)),i*.04,1));place(buf,mul(hp(noise(.8),4000),t=>.2*Math.exp(-t*5)),0,1);return verb(buf,1.2,.4,5000)};
G.ch_leg=()=>{const d=2.2,buf=Z(d+.8);place(buf,au808(44,1.6,3),0,1.1);[[146.8,0],[220,0],[293.7,0],[349.2,0]].forEach(([f])=>place(buf,mul(lp(saw(f,d,12),2200),t=>.1*Math.min(1,t/.05)*Math.exp(-t*1.3)),0,1));
  [1175,1397,1760,2349].forEach((f,i)=>place(buf,mul(add(sine(f,.8),sine(f*2.01,.8),.25),t=>.1*Math.exp(-t*4)),.06+i*.07,1));place(buf,mul(hp(noise(1.4),5000),t=>.2*Math.exp(-t*2.5)),0,1);return verb(buf,2,.45,5000)};
G.ch_myth=()=>{const d=2.8,buf=Z(d+1);place(buf,au808(38,2.2,4),0,1.3);place(buf,hCrack(.4,100,8000,6),0,.8);[[73.4],[110],[146.8],[174.6],[220],[293.7]].forEach(([f])=>place(buf,mul(lp(saw(f*(1+U(-.004,.004)),d,14),2600),t=>.09*Math.min(1,t/.04)*Math.exp(-t*.9)),0,1));
  [1175,1480,1760,2217,2960].forEach((f,i)=>place(buf,mul(add(sine(f,1.2),sine(f*1.5,1.2),.3),t=>.09*Math.exp(-t*2.5)),.08+i*.08,1));place(buf,mul(movBP(noise(2),6000,600,.3),t=>.25*Math.exp(-t*1.2)),0,1);return verb(buf,2.6,.5,5000)};
// ===== 김티비 • 덕질 (가챠 · 피규어 · 어두운 신비 톤) =====
const otTick=(f,d,k)=>mul(add(sine(f,d),sine(f*2.7,d),.35),t=>Math.exp(-t*(k||30))*Math.min(1,t/.001));
const otPad=(fs,d,cut,amp)=>{const x=Z(d);fs.forEach(f=>add(x,lp(saw(f*(1+U(-.003,.003)),d,12),cut),amp));return mul(x,t=>Math.min(1,t/.05)*Math.exp(-t*1.4))};
G.ot_cap=()=>{const buf=Z(.9);place(buf,hWhoosh(.35,300,2200),0,.8);for(let k=0;k<7;k++)place(buf,mul(bp(noise(.02),1800,6000),t=>Math.exp(-t*160)),.05+k*.045+U(0,.02),U(.25,.5));place(buf,hSub(120,60,.2,14,2.5),.45,.7);place(buf,otTick(1400,.1,40),.45,.2);return verb(buf,.6,.25,4000)};
G.ot_pop=()=>{const buf=Z(1.1);place(buf,mul(bp(noise(.04),900,5000),t=>Math.exp(-t*70)),0,1);place(buf,mul(sweepEnv(620,240,.09),t=>.6*Math.exp(-t*30)),0,1);place(buf,hSub(140,46,.35,8,3),0,1);
  for(let k=0;k<10;k++)place(buf,otTick(U(1500,3200),.3,U(14,22)),.03+k*.03,.08);return verb(buf,1,.35,4500)};
G.ot_fig=()=>{const buf=Z(.6);place(buf,ed(bp(noise(.015),1500,6000),220),0,.9);place(buf,otTick(900,.12,45),0,.4);place(buf,hSub(110,55,.2,16,2),0,.7);return verb(buf,.4,.2,3500)};
G.ot_shard=()=>{const buf=Z(.6);for(let k=0;k<3;k++){place(buf,mul(bp(noise(.12),2500,8000),t=>.4*Math.sin(Math.PI*Math.min(1,t/.12))),k*.035,1);place(buf,otTick(U(2600,3400),.15,30),k*.035,.18)}place(buf,hSub(160,80,.12,20,2),0,.4);return verb(buf,.5,.3,6000)};
G.ot_hop=()=>{const buf=Z(.7);place(buf,mul(sweepEnv(180,420,.12,.6),t=>.35*Math.exp(-t*12)),0,1);place(buf,hSub(120,50,.25,10,3),.45,1);place(buf,mul(lp(noise(.15),600),t=>.6*Math.exp(-t*25)),.45,1);return verb(buf,.4,.2,2500)};
G.ot_aim=()=>{const d=1,buf=Z(d+.2);place(buf,mul(sweepEnv(300,1100,d,1.5),t=>.12*Math.min(1,t/.2)),0,1);[0,.3,.55,.72,.85,.94].forEach(at=>place(buf,mul(sine(1760,.04),t=>.12*Math.exp(-t*60)),at,1));place(buf,mul(sine(55,d),t=>.2*Math.min(1,t/.3)),0,1);return verb(buf,.5,.25,4000)};
G.ot_snipe=()=>{const buf=Z(2);place(buf,hPunch(0),0,1.1);place(buf,hCrack(.25,600,9000,16),0,1);place(buf,hSub(100,30,1,3.5,4),0,1.3);place(buf,mul(movBP(noise(1.2),5000,400,.3),t=>.35*Math.exp(-t*3)),.02,1);place(buf,otTick(3800,.6,6),.01,.08);return verb(buf,1.8,.45,3000)};
G.ot_meteor=()=>{const d=.7,buf=Z(d+.4);place(buf,mul(movBP(noise(d),6000,700,.25),t=>.8*Math.pow(t/d,1.2)*Math.min(1,(d-t)/.05+.2)),0,1);place(buf,mul(sweepEnv(900,300,d),t=>.06*t/d),0,1);place(buf,hRumble(d,1),.2,.4);return verb(buf,.8,.35,5000)};
G.ot_r=()=>{const buf=Z(1);place(buf,hSub(130,55,.35,10,3),0,1);place(buf,mul(bp(noise(.05),500,3000),t=>Math.exp(-t*50)),0,.6);place(buf,auBell(523,.5),.01,.25);return verb(buf,.7,.3,3000)};
G.ot_sr=()=>{const buf=Z(1.6);place(buf,hSub(120,45,.5,7,3),0,1.1);place(buf,mul(bp(noise(.08),400,4000),t=>Math.exp(-t*30)),0,.6);[587.3,698.5,880].forEach((f,i)=>place(buf,auBell(f,.9),.02+i*.05,.25));place(buf,mul(hp(noise(.6),5000),t=>.12*Math.exp(-t*5)),0,1);return verb(buf,1.3,.4,4000)};
G.ot_ssr=()=>{const d=2.6,buf=Z(d+.8);place(buf,au808(41,2,4),0,1.3);place(buf,hCrack(.35,200,7000,8),0,.6);place(buf,otPad([146.8,220,293.7,329.6,440],d,1800,.09),0,1);
  [1174.7,1318.5,1760,2349.3].forEach((f,i)=>place(buf,mul(add(sine(f,1.4),sine(f*2.01,1.4),.3),t=>.08*Math.exp(-t*2.4)),.05+i*.09,1));place(buf,mul(movBP(noise(2),7000,900,.3),t=>.25*Math.exp(-t*1.4)),0,1);return verb(buf,2.4,.5,4500)};
G.ot_result=()=>{const buf=Z(1.6);place(buf,hWhoosh(.4,400,4000),0,.6);place(buf,otPad([110,164.8,220,261.6],1.2,1500,.1),.15,1);for(let k=0;k<10;k++)place(buf,ed(bp(noise(.015),2000,7000),200),.15+k*.04,.25);return verb(buf,1.2,.4,4000)};
G.ot_banner=()=>{const buf=Z(1.4);place(buf,mul(movBP(noise(.5),400,5000,.25),t=>.6*Math.sin(Math.PI*Math.min(1,t/.5))),0,1);place(buf,otPad([73.4,110,146.8],1.1,900,.12),.1,1);place(buf,auBell(880,.6),.3,.12);return verb(buf,1.2,.4,3500)};
G.ot_tap=()=>{const buf=Z(.5);place(buf,ed(hp(noise(.008),2500),400),0,.7);place(buf,otTick(1046.5,.25,18),0,.25);place(buf,hSub(140,70,.12,20,2),0,.5);return verb(buf,.4,.25,5000)};
G.ot_case=()=>{const buf=Z(1.8);place(buf,hSub(90,30,1,3.5,4),0,1.4);place(buf,mul(bp(noise(.06),1200,6000),t=>Math.exp(-t*45)),0,.9);[1830,2710,3560].forEach((f,i)=>place(buf,mul(sine(f,.9),t=>.07*Math.exp(-t*(6+i*3))),0,1));place(buf,hRumble(1.2,3),0,.8);return verb(buf,1.4,.4,3500)};
G.ot_shutter=()=>{const buf=Z(.6);place(buf,ed(bp(noise(.012),1500,7000),300),0,1);place(buf,mul(sine(220,.05),t=>.3*Math.exp(-t*80)),0,1);place(buf,ed(bp(noise(.015),1000,5000),250),.07,.85);place(buf,mul(sine(180,.05),t=>.3*Math.exp(-t*80)),.07,1);place(buf,mul(hp(noise(.3),6000),t=>.1*Math.exp(-t*12)),.01,1);return verb(buf,.4,.2,5000)};
G.ot_crack=()=>{const buf=Z(.6);for(let k=0;k<14;k++)place(buf,ed(hp(noise(.01),3000),300),Math.pow(k/14,1.4)*.35,U(.3,.7));place(buf,mul(sine(2400,.3),t=>.05*Math.exp(-t*10)),0,1);return verb(buf,.4,.25,6000)};
G.ot_shatter=()=>{const buf=Z(2.4);place(buf,hPunch(1),0,1.1);place(buf,mul(hp(noise(.8),2500),t=>.8*Math.exp(-t*5)),0,1);for(let k=0;k<45;k++){const at=Math.pow(U(0,1),1.8)*1.1;place(buf,otTick(U(2000,6000),.25,U(18,40)),at,U(.05,.16))}place(buf,hSub(80,25,1.4,2.2,4),0,1.2);return verb(buf,2,.45,5000)};
G.ot_pay=()=>{const buf=Z(1);place(buf,hWhoosh(.22,800,5000),0,.6);[[.28,659.3],[.42,880]].forEach(([at,f])=>place(buf,mul(pkSq(f,.12,.5),t=>.07*Math.exp(-t*10)),at,1));place(buf,hSub(110,55,.2,14,2),.28,.5);return verb(buf,.6,.3,4000)};
['ot_snipe','ot_ssr','ot_case','ot_shatter','ot_r','ot_sr'].forEach(n=>{const f=G[n];G[n]=()=>hPhone(f())});
// ===== 흉악범 • 조커 (오르골 · 낮은 웃음 · 어두운 서커스) =====
// 웃음소리 : "하 하 하" 음절을 포먼트로 만들고 낮게 깔아 소름 끼치게
function jkLaughV(n,f0,f1,step,sy){const L=sy||.13,d=n*step+.3,buf=Z(d);for(let i=0;i<n;i++){const u=i/(n-1||1),f=f0+(f1-f0)*u,src=voxSrc(L,t=>f*(1+.18*Math.exp(-t*25))-40*t);let x=voxSeg(src,[[L,[[600,950,1],[1050,1450,.75],[2300,3000,.3]]]],0);
  x=mul(x,t=>Math.min(1,t/.008)*Math.exp(-t*9)*(t<L*.7?1:Math.max(0,1-(t-L*.7)/(L*.3))));place(buf,mul(bp(noise(.05),900,3500),t=>.35*Math.exp(-t*60)),i*step,1-.2*u);place(buf,x,i*step+.012,1-.25*u)}return buf}
G.jk_laugh=()=>{const buf=Z(1.8);const a=jkLaughV(6,170,118,.2),b=jkLaughV(6,85,60,.2);place(buf,sat(a,1.6),0,.9);place(buf,sat(b,2),.005,.65);place(buf,mul(sine(46,1.3),t=>.06*Math.min(1,t/.2)*Math.exp(-t*2)),0,1);return verb(buf,1.1,.28,2800)};
G.jk_card=()=>{const buf=Z(.6);place(buf,ed(hp(noise(.008),3000),500),0,.8);place(buf,mul(movBP(noise(.3),1200,5000,.2),t=>.7*Math.sin(Math.PI*Math.min(1,t/.3))),0,1);place(buf,hSub(140,60,.15,18,2.5),0,.6);return verb(buf,.5,.25,5000)};
G.jk_ric=()=>{const buf=Z(.5);place(buf,ed(hp(noise(.01),2500),350),0,1);place(buf,mul(add(sine(980,.3),sine(1470,.3),.5),t=>.12*Math.exp(-t*18)),0,1);place(buf,hSub(160,70,.12,20,2),0,.5);return verb(buf,.4,.25,5000)};
G.jk_burst=()=>{const buf=Z(1.2);place(buf,hSub(120,40,.4,7,3),0,1);place(buf,hWhoosh(.5,600,4000),0,.7);for(let k=0;k<32;k++)place(buf,ed(bp(noise(.02),1500,7000),180),Math.pow(U(0,1),1.5)*.6,U(.15,.4));return verb(buf,.9,.3,5000)};
G.jk_drop=()=>{const buf=Z(1);place(buf,mul(T(.34,t=>Math.sin(PI2*(1300-950*Math.pow(t/.34,.8))*t)),t=>.1*Math.min(1,t/.05)),0,1);place(buf,hSub(110,40,.4,8,3.5),.35,1.2);place(buf,mul(lp(noise(.2),700),t=>.7*Math.exp(-t*22)),.35,1);place(buf,ed(bp(noise(.03),600,3000),80),.35,.5);return verb(buf,.6,.25,3000)};
// 오르골 : 음이 살짝 어긋난 단조 멜로디
G.jk_tick=()=>{const d=.75,buf=Z(d+.8),M=[659.3,622.3,523.3,493.9,440,415.3];M.forEach((f,i)=>{const ff=f*(1+U(-.012,.012));place(buf,mul(add(add(sine(ff,.6),sine(ff*2.003,.6),.35),sine(ff*4.2,.6),.12),t=>.18*Math.exp(-t*6)*(1+.25*Math.sin(PI2*6*t))),i*.09,1)});
  for(let k=0;k<9;k++)place(buf,ed(hp(noise(.004),4000),900),k*.08,.08);place(buf,mul(sine(55,d),t=>.12*Math.min(1,t/.2)),0,1);return verb(buf,1,.4,4000)};
G.jk_boing=()=>{const d=.7,buf=Z(d+.3);place(buf,mul(T(d,t=>Math.sin(PI2*(150+300*(1-Math.exp(-t*20)))*t+5*Math.sin(PI2*16*t)*Math.exp(-t*4))),t=>.35*Math.exp(-t*4.5)),0,1);place(buf,mul(sine(1240,.4),t=>.05*Math.exp(-t*8)*(1+Math.sin(PI2*16*t))),0,1);place(buf,ed(hp(noise(.01),2000),300),0,.6);return verb(buf,.5,.25,3000)};
G.jk_punch=()=>{const buf=Z(1.2);place(buf,hPunch(0),0,1.3);place(buf,ed(bp(noise(.04),400,2500),60),0,.8);return verb(buf,.6,.25,2800)};
G.jk_confetti=()=>{const buf=Z(1.6);place(buf,au808(46,1.1,4),0,1.1);place(buf,mul(bp(noise(.06),700,6000),t=>Math.exp(-t*40)),0,1);for(let k=0;k<40;k++)place(buf,ed(hp(noise(.008),3000),500),.05+Math.pow(U(0,1),1.6)*.9,U(.06,.25));place(buf,mul(hp(noise(.8),3000),t=>.15*Math.exp(-t*4)),0,1);return verb(buf,1.2,.35,4000)};
G.jk_mark=()=>{const buf=Z(.45);place(buf,mul(lp(noise(.2),900),t=>.8*Math.exp(-t*14)*(.5+.5*Math.sin(PI2*38*t))),0,1);place(buf,mul(sweepEnv(260,120,.18),t=>.3*Math.exp(-t*14)),0,1);return verb(buf,.3,.2,2500)};
G.jk_gas=()=>{const d=1.4,buf=Z(d+.4);place(buf,au808(44,1.2,4),0,1);place(buf,mul(bp(noise(d),1500,8000),t=>.5*Math.min(1,t/.03)*Math.exp(-t*2.2)),0,1);place(buf,mul(lp(noise(d),300),t=>.5*Math.exp(-t*3)),0,1);return verb(buf,1.2,.4,3000)};
G.jk_spot=()=>{const d=1.6,buf=Z(d+.4);place(buf,hSub(80,40,.5,6,4),0,1.3);place(buf,ed(bp(noise(.03),800,5000),90),0,.9);place(buf,mul(sine(1500,.2),t=>.08*Math.exp(-t*25)),.005,1);place(buf,mul(lp(saw(60,d,12),500),t=>.12*Math.min(1,t/.3)*Math.min(1,(d-t)/.3)),.05,1);place(buf,mul(lp(saw(30,d,10),200),t=>.15*Math.min(1,(d-t)/.3)),.05,1);return verb(buf,1.6,.45,2500)};
G.jk_shuffle=()=>{const d=.6,buf=Z(d+.3);for(let k=0;k<34;k++){const u=k/34;place(buf,ed(bp(noise(.012),1800,7000),260),Math.pow(u,.8)*.42,.2+.3*u)}place(buf,mul(movBP(noise(.2),1500,5000,.2),t=>.5*Math.sin(Math.PI*Math.min(1,t/.2))),.42,1);return verb(buf,.5,.25,5000)};
G.jk_flip=()=>{const buf=Z(1);place(buf,ed(hp(noise(.01),3000),400),0,.9);place(buf,au808(52,.6,4),0,.9);place(buf,mul(bp(noise(.08),400,3000),t=>Math.exp(-t*35)),0,.5);place(buf,mul(add(sine(1661,.6),sine(2489,.6),.4),t=>.04*Math.exp(-t*7)),.01,1);return verb(buf,.8,.35,3500)};
G.jk_flush=()=>{const d=1.8,buf=Z(d+.6);place(buf,au808(37,1.6,4),0,1.2);[73.4,110,138.6,174.6,207.7].forEach(f=>place(buf,mul(lp(saw(f*(1+U(-.004,.004)),d,14),1500),t=>.12*Math.min(1,t/.02)*Math.exp(-t*1.6)),0,1));place(buf,mul(hp(noise(1),5000),t=>.15*Math.exp(-t*3)),0,1);return verb(buf,1.8,.5,2500)};
G.jk_wild=()=>{const d=2.2,buf=Z(d+.6);place(buf,mul(movBP(noise(.3),300,4000,.2),t=>.4*Math.pow(t/.3,2)),0,1);place(buf,au808(34,1.6,3),.3,.55);place(buf,hCrack(.3,100,6000,8),.3,.35);hPhone(buf);const lg=jkLaughV(7,150,95,.2,.14);place(buf,sat(lg,1.8),.5,2.6);const lg2=jkLaughV(7,75,48,.2,.14);place(buf,sat(lg2,2.2),.505,1.8);return verb(buf,1.6,.35,2600)};
G.jk_slam=()=>{const buf=Z(2.2);place(buf,hPunch(1),0,1.5);place(buf,hSub(70,20,1.5,1.8,4.5),0,1.4);place(buf,hCrack(.4,90,5000,6),0,1);for(let k=0;k<36;k++)place(buf,ed(bp(noise(.02),1500,7000),180),.05+Math.pow(U(0,1),1.5)*1,U(.08,.25));return verb(buf,1.8,.4,2800)};
['jk_punch','jk_slam','jk_flush','jk_flip','jk_confetti','jk_gas'].forEach(n=>{const f=G[n];G[n]=()=>hPhone(f())});
// ===== 언더테일 전투 시작 (심장 깜빡임) =====
G.ut_enc=()=>{const buf=Z(1);[0,.12,.24].forEach(at=>place(buf,mul(lp(pkSq(392,.06,.5),2600),t=>.3*Math.min(1,t/.002)*(t<.05?1:Math.max(0,1-(t-.05)/.01))),at,1));place(buf,hWhoosh(.18,600,3000),.3,.5);place(buf,hSub(120,60,.15,14,2),.46,.6);return verb(buf,.4,.2,4000)};
// ===== 김지우 • 괴담콜렉터 (속삭임 · 삐걱 · 촛불 · 낮은 공포 톤) =====
// 속삭임 : 숨소리만 있는 목소리 (포먼트 노이즈)
function gkWhis(n,step,f1,f2,amp){const d=n*step+.3,buf=Z(d);for(let i=0;i<n;i++){const L=step*.85,nz=noise(L),x=Z(L);add(x,bp(nz,f1[i%f1.length]*.85,f1[i%f1.length]*1.2),1);add(x,bp(nz,f2[i%f2.length]*.85,f2[i%f2.length]*1.15),.7);add(x,bp(nz,2600,4200),.25);
  place(buf,mul(x,t=>Math.min(1,t/.03)*Math.min(1,(L-t)/.06)*(.8+.2*Math.sin(PI2*6*t))),i*step,amp||1)}return buf}
G.gk_door=()=>{const d=.9,buf=Z(d+.4);let ph=0;place(buf,mul(T(d,t=>{const f=95+60*Math.sin(PI2*1.3*t)+20*Math.sin(PI2*7*t);ph+=f/SR;return((ph%1)<.18?1:-.2)}),t=>.35*Math.min(1,t/.05)*Math.min(1,(d-t)/.2)),0,1);
  for(let k=0;k<30;k++)place(buf,ed(bp(noise(.01),800,3000),300),Math.pow(k/30,1.3)*d,.12);place(buf,mul(sine(55,d),t=>.12*Math.min(1,t/.2)*Math.min(1,(d-t)/.2)),0,1);return verb(buf,1.2,.45,2500)};
G.gk_whisper=()=>{const buf=Z(2.2);place(buf,gkWhis(7,.11,[700,500,900,600,450,800,600],[1200,1800,1500,2200,1100,1700,1300],.9),.05,1);place(buf,gkWhis(7,.11,[700,600,900,500,450,700,600],[1200,2000,1500,1800,1100,1600,1300],.9),.6,.9);
  place(buf,mul(sine(41,2),t=>.12*Math.min(1,t/.4)*Math.min(1,(2-t)/.4)),0,1);return verb(buf,1.6,.55,3000)};
G.gk_paper=()=>{const d=.4,buf=Z(d+.3);place(buf,mul(bp(noise(d),1500,7000),t=>.6*Math.sin(Math.PI*t/d)*(.4+.6*(R()<.4?1:.3))),0,1);place(buf,hWhoosh(d,500,3500),0,.6);return verb(buf,.5,.25,5000)};
G.gk_wrap=()=>{const d=.7,buf=Z(d+.3);for(let k=0;k<14;k++)place(buf,mul(bp(noise(.05),1200,6000),t=>Math.sin(Math.PI*t/.05)),k*.045,.3+.3*R());place(buf,mul(lp(noise(d),500),t=>.4*Math.min(1,t/.1)*Math.exp(-t*3)),0,1);place(buf,hSub(110,55,.3,8,2.5),.6,.6);return verb(buf,.6,.3,3500)};
G.gk_slam=()=>{const buf=Z(1.2);place(buf,hSub(100,40,.5,7,3.5),0,1.2);place(buf,ed(bp(noise(.05),300,3000),50),0,1);place(buf,ed(bp(noise(.02),2000,6000),120),.01,.4);return verb(buf,1,.4,2500)};
G.gk_board=()=>{const buf=Z(1.4);place(buf,mul(bp(noise(.35),800,5000),t=>.5*Math.sin(Math.PI*Math.min(1,t/.35))),0,1);place(buf,mul(add(sine(185,1.2),sine(196,1.2),.8),t=>.1*Math.min(1,t/.3)*Math.exp(-t*1.2)),.1,1);return verb(buf,1.2,.45,3000)};
G.gk_pen=()=>{const d=1.3,buf=Z(d+.3);place(buf,mul(bp(noise(d),2500,7000),t=>.25*Math.min(1,t/.1)*Math.min(1,(d-t)/.2)*(.3+.7*Math.abs(Math.sin(PI2*5.5*t)))),0,1);place(buf,mul(sine(62,d),t=>.1*Math.min(1,t/.3)),0,1);return verb(buf,.8,.35,4000)};
G.gk_letter=()=>{const buf=Z(1.1);place(buf,mul(add(add(sine(311,.9),sine(466,.9),.6),sine(659,.9),.3),t=>.14*Math.exp(-t*4)*Math.min(1,t/.003)),0,1);place(buf,hSub(110,50,.3,10,2.5),0,.5);place(buf,ed(hp(noise(.01),3000),300),0,.3);return verb(buf,1,.45,3000)};
G.gk_hand=()=>{const buf=Z(1.4);place(buf,hWhoosh(.2,300,3000),0,.8);place(buf,hPunch(0),.17,1.1);place(buf,mul(T(.9,t=>Math.sin(PI2*(900+300*Math.sin(PI2*9*t))*t)+.6*Math.sin(PI2*(950)*t)),t=>.06*Math.min(1,t/.05)*Math.exp(-t*3)),.17,1);return verb(buf,1.2,.4,2800)};
G.gk_book=()=>{const buf=Z(1.4);place(buf,hSub(90,45,.4,8,3),0,.8);for(let k=0;k<3;k++)place(buf,mul(bp(noise(.12),1500,6000),t=>.5*Math.sin(Math.PI*t/.12)),.1+k*.13,.7);place(buf,mul(lp(saw(55,1.2,10),400),t=>.15*Math.min(1,t/.3)*Math.min(1,(1.2-t)/.3)),.1,1);return verb(buf,1.3,.5,2500)};
G.gk_candle=()=>{const buf=Z(1.2);place(buf,mul(bp(noise(.25),300,2500),t=>.7*Math.sin(Math.PI*Math.min(1,t/.25))),0,1);place(buf,mul(add(sine(147,.9),sine(155.6,.9),.8),t=>.13*Math.exp(-t*2.5)),.08,1);return verb(buf,1.2,.5,2500)};
G.gk_tale=()=>{const buf=Z(1.4);for(let k=0;k<8;k++)place(buf,ed(bp(noise(.03),2000,6000),90),k*.04,.25);[[.3,329.6],[.38,311.1],[.46,233.1]].forEach(([at,f])=>place(buf,mul(add(sine(f,.9),sine(f*2.01,.9),.3),t=>.13*Math.exp(-t*4)),at,1));return verb(buf,1.2,.45,3500)};
G.gk_snip=()=>{const buf=Z(1);[0,.16].forEach(at=>{place(buf,ed(hp(noise(.02),3000),220),at,.9);place(buf,mul(add(sine(2300,.3),sine(3450,.3),.5),t=>.08*Math.exp(-t*20)),at,1)});place(buf,hSub(110,45,.3,9,3),.16,.8);return verb(buf,.8,.35,4000)};
G.gk_elev=()=>{const buf=Z(1.6);place(buf,mul(sine(880,.25),t=>.12*Math.exp(-t*6)),0,1);place(buf,mul(bp(noise(.4),200,1500),t=>.4*Math.sin(Math.PI*Math.min(1,t/.4))),.15,1);place(buf,hSub(90,35,.6,5,4),.55,1.2);place(buf,ed(bp(noise(.04),500,4000),80),.55,.7);return verb(buf,1.2,.4,2500)};
G.gk_claw=()=>{const buf=Z(1);for(let k=0;k<3;k++)place(buf,mul(bp(noise(.12),1500,7000),t=>.6*Math.sin(Math.PI*t/.12)),k*.05,.8);place(buf,mul(T(.5,t=>Math.sin(PI2*(700-300*t)*t*(1+.1*Math.sin(PI2*30*t)))),t=>.06*Math.exp(-t*4)),.02,1);place(buf,hSub(120,50,.25,10,2.5),.1,.6);return verb(buf,.8,.35,3500)};
G.gk_mirror=()=>{const buf=Z(1.4);place(buf,ed(hp(noise(.3),2500),10),0,.6);for(let k=0;k<20;k++)place(buf,mul(sine(U(2000,5000),.3),t=>.05*Math.exp(-t*U(15,30))),Math.pow(R(),1.5)*.6,1);place(buf,hSub(90,40,.4,6,3),0,.7);return verb(buf,1.2,.45,4000)};
G.gk_dark=()=>{const d=1,buf=Z(d+.8);place(buf,mul(bp(noise(.3),300,2500),t=>.6*Math.sin(Math.PI*Math.min(1,t/.3))),0,1);place(buf,mul(add(add(sine(73.4,d),sine(77.8,d),.8),sine(110,d),.4),t=>.25*Math.min(1,t/.3)*Math.min(1,(d-t)/.2)),.1,1);return verb(buf,1.8,.55,1800)};
G.gk_found=()=>{const d=1.4,buf=Z(d+.8);place(buf,gkWhis(3,.22,[500,650,450],[900,1700,1100],1.4),0,1);place(buf,mul(T(.9,t=>Math.sin(PI2*(220+600*t*t)*t)+.5*Math.sin(PI2*(233+640*t*t)*t)),t=>.18*Math.min(1,t/.1)*Math.min(1,(.9-t)/.05)),.35,1);
  place(buf,au808(40,1.6,4),.75,1.3);place(buf,hCrack(.3,100,6000,8),.75,.6);return verb(buf,1.8,.5,2500)};
['gk_slam','gk_hand','gk_elev','gk_found','gk_book'].forEach(n=>{const f=G[n];G[n]=()=>hPhone(f())});
// ===== 김민채 • 다이어트 (운동 · 먹방 · 묵직한 저음) =====
G.dt_hoop=()=>{const d=1.2,buf=Z(d+.3);place(buf,mul(movBP(noise(d),300,1400,.25),t=>.6*Math.min(1,t/.15)*Math.min(1,(d-t)/.15)*(.55+.45*Math.sin(PI2*(5+5*t/d)*t))),0,1);place(buf,mul(T(d,t=>Math.sin(PI2*(90+60*t/d)*t)),t=>.18*Math.min(1,t/.2)*Math.min(1,(d-t)/.15)),0,1);return verb(buf,.6,.25,3000)};
G.dt_fling=()=>{const buf=Z(.9);place(buf,hWhoosh(.4,300,3000),0,1);place(buf,mul(sweepEnv(220,110,.3),t=>.25*Math.exp(-t*8)),0,1);return verb(buf,.6,.25,3500)};
G.dt_hoophit=()=>{const buf=Z(.6);place(buf,ed(bp(noise(.03),600,4000),80),0,1);place(buf,mul(add(sine(420,.3),sine(630,.3),.5),t=>.15*Math.exp(-t*25)),0,1);place(buf,hSub(130,60,.2,14,2.5),0,.6);return verb(buf,.4,.2,3000)};
G.dt_rope=()=>{const buf=Z(.5);place(buf,mul(bp(noise(.18),1200,6000),t=>.6*Math.pow(Math.sin(Math.PI*t/.18),2)),0,1);return verb(buf,.3,.15,5000)};
G.dt_land=()=>{const buf=Z(1);place(buf,hSub(85,30,.6,6,4),0,1.3);place(buf,mul(lp(noise(.3),400),t=>.8*Math.exp(-t*14)),0,1);place(buf,hRumble(.8,4),0,.6);return verb(buf,.8,.3,2000)};
G.dt_count=()=>{const buf=Z(.4);place(buf,mul(lp(pkSq(330,.1,.5),2000),t=>.1*Math.exp(-t*20)),0,1);place(buf,mul(sine(165,.15),t=>.2*Math.exp(-t*20)),0,1);return buf};
G.dt_huff=()=>{const buf=Z(1.6);for(let k=0;k<4;k++){const L=k%2?.28:.2;place(buf,mul(add(bp(noise(L),500,1400),bp(noise(L),1600,2800),.5),t=>.6*Math.sin(Math.PI*t/L)),k*.32,k%2?.6:.9)}return verb(buf,.5,.25,3000)};
G.dt_burn=()=>{const buf=Z(.8);place(buf,mul(bp(noise(.5),2000,7000),t=>.35*Math.exp(-t*6)*(.5+.5*R())),0,1);place(buf,mul(sweepEnv(300,700,.3),t=>.1*Math.exp(-t*8)),0,1);return verb(buf,.5,.3,4500)};
G.dt_snack=()=>{const buf=Z(1);place(buf,ed(bp(noise(.05),500,4000),60),0,.8);[0,.18,.36].forEach(at=>{place(buf,mul(bp(noise(.08),300,2500),t=>.6*Math.sin(Math.PI*t/.08)),at+.1,1);for(let k=0;k<5;k++)place(buf,ed(hp(noise(.008),3000),400),at+.1+U(0,.06),.25)});return verb(buf,.5,.2,3500)};
G.dt_food=()=>{const buf=Z(1.4);for(let k=0;k<6;k++){const at=k*.05+.35;place(buf,ed(bp(noise(.04),700,5000),70),at,.6);place(buf,mul(add(sine(U(900,1500),.3),sine(U(1800,2600),.3),.4),t=>.06*Math.exp(-t*14)),at,1)}place(buf,hWhoosh(.35,2500,400),0,.6);place(buf,hSub(90,40,.4,7,3),.35,.8);return verb(buf,1,.35,3500)};
G.dt_munch=()=>{const buf=Z(.5);for(let k=0;k<3;k++){place(buf,mul(lp(noise(.07),1400),t=>.8*Math.sin(Math.PI*t/.07)),k*.09,1);for(let j=0;j<4;j++)place(buf,ed(hp(noise(.006),2500),500),k*.09+U(0,.05),.2)}place(buf,mul(sweepEnv(160,90,.12),t=>.3*Math.exp(-t*20)),0,1);return verb(buf,.3,.15,3000)};
G.dt_grow=()=>{const d=1,buf=Z(d+.3);place(buf,mul(T(d,t=>{const f=70+180*Math.pow(t/d,1.5);return Math.sin(PI2*f*t)+.5*Math.sin(PI2*f*2.02*t)}),t=>.3*Math.min(1,t/.1)*Math.min(1,(d-t)/.1)*(1+.3*Math.sin(PI2*11*t))),0,1);place(buf,mul(lp(noise(d),600),t=>.3*t/d),0,1);return verb(buf,.6,.25,2500)};
G.dt_jump=()=>{const buf=Z(1);place(buf,hSub(110,50,.25,10,3),0,.9);place(buf,hWhoosh(.6,200,2000),.05,.9);return verb(buf,.6,.25,3000)};
G.dt_press=()=>{const buf=Z(2.4);place(buf,hPunch(1),0,1.5);place(buf,hSub(60,16,1.8,1.5,5),0,1.6);place(buf,hCrack(.5,80,4000,5),0,1);place(buf,hRumble(2,1.2),0,1.3);for(let k=0;k<30;k++)place(buf,ed(bp(noise(.04),400,4000),60),U(.02,1.2),U(.06,.2));return verb(buf,1.8,.4,2200)};
G.dt_scale=()=>{const buf=Z(1.2);place(buf,mul(T(.5,t=>Math.sin(PI2*(140+260*(1-Math.exp(-t*14)))*t+3*Math.sin(PI2*14*t)*Math.exp(-t*5))),t=>.25*Math.exp(-t*6)),0,1);[[.45,1320],[.6,1320]].forEach(([at,f])=>place(buf,mul(lp(pkSq(f,.09,.5),4000),t=>.06*Math.exp(-t*10)),at,1));return verb(buf,.6,.25,4000)};
G.dt_sigh=()=>{const d=1.1,buf=Z(d+.4),src=voxSrc(d,t=>150-45*t/d);let x=voxSeg(src,[[d,[[500,900,1],[1000,1500,.5]]]],.6);x=mul(x,t=>.6*Math.min(1,t/.08)*Math.pow(Math.max(0,1-t/d),1.2));place(buf,add(x,mul(bp(noise(d),600,2400),t=>.35*Math.min(1,t/.06)*Math.max(0,1-t/d)),1),0,1);return verb(buf,.9,.35,2500)};
['dt_land','dt_press','dt_hoophit','dt_jump'].forEach(n=>{const f=G[n];G[n]=()=>hPhone(f())});
// ===== 캐릭터 공방 기본 소리 (어떤 캐릭에도 어울리게 · 묵직한 톤) =====
G.cw_shot=()=>{const buf=Z(.7);place(buf,mul(sweepEnv(900,220,.12),t=>.3*Math.exp(-t*25)),0,1);place(buf,ed(bp(noise(.05),1200,6000),70),0,.7);place(buf,hSub(150,60,.15,16,2.5),0,.6);return verb(buf,.5,.25,4000)};
G.cw_zone=()=>{const d=.8,buf=Z(d+.3);place(buf,mul(T(d,t=>Math.sin(PI2*(220+40*Math.sin(PI2*8*t))*t)),t=>.18*Math.min(1,t/.1)*Math.min(1,(d-t)/.1)),0,1);place(buf,mul(sine(55,d),t=>.2*Math.min(1,t/.2)),0,1);return verb(buf,.6,.3,3000)};
G.cw_dash=()=>{const buf=Z(.9);place(buf,hWhoosh(.35,300,4000),0,1);place(buf,hSub(120,50,.3,9,3),.02,.7);return verb(buf,.5,.25,3500)};
G.cw_beam=()=>{const d=.6,buf=Z(d+.4);place(buf,mul(sweepEnv(200,900,d,1.6),t=>.15*Math.min(1,t/.1)),0,1);place(buf,mul(movBP(noise(d),400,5000,.2),t=>.25*t/d),0,1);return verb(buf,.6,.3,4000)};
G.cw_orb=()=>{const buf=Z(1);[0,.08].forEach((at,i)=>place(buf,mul(add(sine(i?466:349,.6),sine(i?932:698,.6),.3),t=>.12*Math.exp(-t*5)),at,1));place(buf,mul(movBP(noise(.5),800,4000,.2),t=>.2*Math.sin(Math.PI*Math.min(1,t/.5))),0,1);return verb(buf,.8,.4,4000)};
G.cw_trap=()=>{const buf=Z(.8);[0,.12,.24].forEach(at=>{place(buf,ed(bp(noise(.02),800,5000),160),at,.7);place(buf,mul(sine(1240,.08),t=>.08*Math.exp(-t*40)),at+.01,1)});place(buf,hSub(110,55,.2,12,2.5),.25,.5);return verb(buf,.5,.25,4000)};
G.cw_nova=()=>{const buf=Z(1.4);place(buf,hSub(100,35,.6,5,4),0,1.2);place(buf,mul(movBP(noise(.6),3000,300,.3),t=>.5*Math.exp(-t*4)),0,1);place(buf,mul(sweepEnv(600,150,.4),t=>.12*Math.exp(-t*5)),0,1);return verb(buf,1.2,.4,3000)};
G.cw_fall=()=>{const d=.9,buf=Z(d+.3);place(buf,mul(T(d,t=>Math.sin(PI2*(1400-1100*t/d)*t)),t=>.1*Math.min(1,t/.1)),0,1);place(buf,mul(movBP(noise(d),5000,600,.25),t=>.35*t/d),0,1);return verb(buf,.6,.3,4000)};
G.cw_boom=()=>{const buf=Z(1.8);place(buf,hPunch(1),0,1.2);place(buf,hCrack(.3,120,6000,9),0,.7);place(buf,hRumble(1.4,2.2),0,.8);return verb(buf,1.4,.35,2800)};
G.cw_zap=()=>{const d=.45,buf=Z(d+.3);place(buf,mul(bp(noise(d),2000,9000),t=>.6*Math.exp(-t*7)*(.4+.6*Math.abs(Math.sin(PI2*55*t)))),0,1);place(buf,hSub(130,50,.25,10,3),0,.8);return verb(buf,.5,.25,6000)};
['cw_boom','cw_nova','cw_dash'].forEach(n=>{const f=G[n];G[n]=()=>hPhone(f())});
window.GENSFX=Object.keys(G);
// 만들기 순서 : 지금 싸우는 캐릭터 소리를 먼저 · 로딩을 건너뛰어도 게임하면서 끝까지 계속 만듦
const GL=Object.keys(G),GI={};GL.forEach((n,i)=>GI[n]=i+1);let GQ=GL.slice(),GDONE=0;
window.GENPRI=names=>{const want=names.filter(n=>GI[n]&&GQ.includes(n));if(!want.length)return;GQ=want.concat(GQ.filter(n=>!want.includes(n)))};
window.GENSTAT=()=>[GDONE,GL.length];window.GRAW=window.GRAW||{};
function run(){const nx=()=>{if(!GQ.length)return;const n=GQ.shift();GDONE++;try{if(!(AUD[n]&&AUD[n].ok)&&!(window.GECLIP&&GECLIP[n])){seed=7+GI[n]*101;const x=G[n]();use(n,wav(x,PK[n]));window.GRAW[n]={x,s:(PK[n]||.89)/peak(x)}}}catch(e){SERR='효과음 생성 실패: '+n}
  const busy=typeof phase!='undefined'&&(phase=='play'||phase=='cd');setTimeout(nx,busy?160:15)};nx()}
setTimeout(run,600);
})();
// ===== 사운드 재생을 Web Audio로 (폰 · Acode에서 "만들어졌는데 안 들리는" 문제 해결) =====
// 폰 브라우저는 <audio>를 미리 불러오지 않아서 '준비됨' 표시가 안 뜨고 소리가 막히는 일이 있음
// → 만든 소리를 AudioBuffer로 바로 넣고, 한 번 터치해서 켜진 AudioContext로 재생
const GB={},GBACT={},GBDEC={};
function gbMake(n){if(GB[n]||!AC)return GB[n];const r=window.GRAW&&GRAW[n];if(!r)return null;try{const b=AC.createBuffer(1,r.x.length,22050),c=b.getChannelData(0);for(let i=0;i<c.length;i++)c[i]=Math.max(-1,Math.min(1,r.x[i]*r.s));GB[n]=b;delete GRAW[n]}catch(e){}return GB[n]}
function gbClip(n,uri){if(GB[n]||GBDEC[n]||!AC||!uri)return;GBDEC[n]=1;try{const bin=atob(uri.slice(uri.indexOf(',')+1)),u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);
  const ok=b=>{if(b)GB[n]=b},pr=AC.decodeAudioData(u.buffer,ok,()=>{});if(pr&&pr.then)pr.then(ok).catch(()=>{})}catch(e){}}
function gbInit(){if(!AC)return;if(AC.state!='running'){try{AC.resume()}catch(e){}}[window.GECLIP,window.KRCLIP].forEach(M=>{if(M)Object.keys(M).forEach(n=>gbClip(n,M[n]))})}
addEventListener('pointerdown',()=>setTimeout(gbInit,0));addEventListener('touchend',()=>{if(AC&&AC.state!='running'){try{AC.resume()}catch(e){}}});
const _SFXgb=SFX;SFX=function(n){if(!MUTE&&!SKIP&&UNL&&AC&&(GB[n]||gbMake(n))){const tn=performance.now()/1000;if(SL[n]&&tn-SL[n]<.045)return;SL[n]=tn;
  try{if(AC.state!='running')AC.resume();const so=AC.createBufferSource(),gn=AC.createGain();so.buffer=GB[n];gn.gain.value=vol(n)/.7;so.connect(gn).connect(MG);so.start();
    const L=GBACT[n]||(GBACT[n]=[]);L.push(so);so.onended=()=>{const i=L.indexOf(so);if(i>=0)L.splice(i,1)}}catch(e){}return}
  return _SFXgb(n)};
SFXa=function(n){if(GB[n]||(window.GRAW&&GRAW[n]))return SFX(n);const p=AUD[n];if(p&&p.ok)SFX(n)};
if(typeof sfxStop=='function'){const _stopGB=sfxStop;sfxStop=function(n){_stopGB(n);(GBACT[n]||[]).slice().forEach(s=>{try{s.stop()}catch(e){}});GBACT[n]=[]}}
;
