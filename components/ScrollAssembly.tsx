"use client";
import {useEffect,useRef,useState} from "react";
import Link from "next/link";
import {ArrowUpRight} from "@/components/Icons";
import {AsteriskMark} from "@/components/AsteriskMark";

const chapters=[
  {label:"OBSERVAR",title:"Primeiro, a criança explora.",text:"Um brinquedo, uma ideia, uma tentativa. Cada gesto revela possibilidades de aprender."},
  {label:"APROXIMAR",title:"O apoio chega com respeito.",text:"A profissional observa e se aproxima sem interromper a iniciativa da criança."},
  {label:"CONSTRUIR JUNTOS",title:"Uma pequena ajuda abre caminhos.",text:"Com uma pista e a participação da criança, as peças começam a se conectar."},
  {label:"CELEBRAR",title:"A conquista continua sendo dela.",text:"O que parecia difícil ganha sentido quando existe vínculo, mediação e oportunidade."}
] as const;
const clamp=(v:number)=>Math.max(0,Math.min(1,v));
export function ScrollAssembly(){
  const host=useRef<HTMLElement>(null);
  const [chapter,setChapter]=useState(0);
  const [motionOff,setMotionOff]=useState(false);
  useEffect(()=>{
    const media=window.matchMedia("(prefers-reduced-motion: reduce)");
    const change=()=>setMotionOff(media.matches);change();media.addEventListener("change",change);
    return ()=>media.removeEventListener("change",change);
  },[]);
  useEffect(()=>{
    const element=host.current;
    if(!element)return;
    if(motionOff){element.style.setProperty("--approach","1");element.style.setProperty("--guide","1");element.style.setProperty("--connect","1");element.style.setProperty("--celebrate","1");element.style.setProperty("--progress","1");setChapter(3);return}
    let pending=false;
    const update=()=>{
      pending=false;
      const rect=element.getBoundingClientRect();
      const scrollable=Math.max(1,rect.height-window.innerHeight);
      const p=clamp(-rect.top/scrollable);
      element.style.setProperty("--progress",String(p));
      element.style.setProperty("--approach",String(clamp((p-.16)/.25)));
      element.style.setProperty("--guide",String(clamp((p-.39)/.17)));
      element.style.setProperty("--connect",String(clamp((p-.55)/.26)));
      element.style.setProperty("--celebrate",String(clamp((p-.83)/.12)));
      setChapter(old=>{const next=Math.min(3,Math.floor(p*4));return old===next?old:next});
    };
    const onScroll=()=>{if(!pending){pending=true;requestAnimationFrame(update)}};
    update();
    window.addEventListener("scroll",onScroll,{passive:true});
    window.addEventListener("resize",onScroll);
    return ()=>{window.removeEventListener("scroll",onScroll);window.removeEventListener("resize",onScroll)};
  },[motionOff]);
  return <section ref={host} className={"build-scroll"+(motionOff?" build-static":"")} aria-label="Uma história de aprendizagem construída com apoio">
    <div className="build-sticky">
      <div className="container build-layout">
        <div className="build-copy">
          <span className="eyebrow"><span className="eyebrow-dot"/> A APRENDIZAGEM ACONTECE NO ENCONTRO</span>
          <h2 className="display-title">Pequenas peças. <em>Grandes possibilidades.</em></h2>
          <div className="build-story-copy" key={chapter}>
            <span className="build-chapter">0{chapter+1} / 04 · {chapters[chapter].label}</span>
            <h3>{chapters[chapter].title}</h3>
            <p>{chapters[chapter].text}</p>
          </div>
          <div className="build-progress" aria-hidden="true"><div/></div>
          <p className="build-instruction">{motionOff?"Veja como a mediação favorece uma conquista.":"Role a página para acompanhar a construção."}</p>
          <Link href="/servicos" className="text-link">Como ajudamos cada criança <ArrowUpRight size={16}/></Link>
        </div>
        <div className="build-art" aria-hidden="true">
          <div className="build-glow"/>
          <svg className="build-petal" viewBox="0 0 300 300" fill="none"><path d="M150 263C70 221 89 122 150 33c61 89 80 188 0 230Z M150 263C73 275 32 211 39 131c75 5 125 52 111 132Z M150 263c77 12 118-52 111-132-75 5-125 52-111 132Z" stroke="#c4a77c" strokeWidth="2.2" opacity=".28"/></svg>
          <div className="build-rug"/>
          <svg className="build-child" viewBox="0 0 250 340" role="presentation">
            <ellipse cx="122" cy="326" rx="91" ry="14" fill="#d9c8b2" opacity=".65"/>
            <path d="M60 251q-45 30-31 58l100-5 38-55" fill="#c7b298"/><path d="M164 248q50 16 53 51l-98 7-30-38" fill="#d6c4aa"/>
            <path d="M56 289q-10 12-8 21h57q11-7 0-18" fill="#fff8ef"/><path d="M159 292q14 7 8 20h64q9-13-5-21" fill="#fff8ef"/>
            <path d="M76 149Q120 131 173 151l19 114q-69 29-137-7Z" fill="#4d7890"/>
            <path d="M79 164q-29 31-12 75l38 18 16-23-25-25 17-30" fill="#527e96"/>
            <path d="M166 166q25 24 20 61l-21 23-17-15 12-27-13-21" fill="#4b718c"/>
            <path d="M112 231q15 9 25 0l9 19q-19 16-34 0" fill="#e1a780"/>
            <rect x="105" y="119" width="35" height="42" rx="15" fill="#ddaa88"/>
            <ellipse cx="124" cy="78" rx="66" ry="74" fill="#e8b38f"/>
            <path d="M60 86q-21-47 10-65 10-37 45-25 29-11 45 11 43 2 35 48 16 30-12 57l-9-30q-35-27-65-32-28 24-46 16l-3 28Z" fill="#48372f"/>
            <circle cx="74" cy="32" r="23" fill="#48372f"/><circle cx="103" cy="15" r="25" fill="#48372f"/><circle cx="142" cy="13" r="23" fill="#48372f"/><circle cx="171" cy="35" r="24" fill="#48372f"/>
            <ellipse cx="98" cy="97" rx="4" ry="5" fill="#40312c"/><ellipse cx="152" cy="97" rx="4" ry="5" fill="#40312c"/>
            <path d="M111 119q13 12 27 0" stroke="#9b584a" strokeWidth="3.3" strokeLinecap="round" fill="none"/>
          </svg>
          <svg className="build-mentor" viewBox="0 0 265 385" role="presentation">
            <ellipse cx="130" cy="367" rx="99" ry="15" fill="#d9c8b2" opacity=".5"/>
            <path d="M80 277Q51 325 65 354h75q19-49 12-78" fill="#874457"/>
            <path d="M141 276q20 27 26 77h74q2-57-49-106" fill="#9b5467"/>
            <path d="M85 339q-16 13-7 27h76q10-10-6-27M178 340q-5 17 8 27h70q8-14-9-28" fill="#ddc9b7"/>
            <path d="M86 139q62-23 100 19l35 114q-53 38-151 11L62 192Z" fill="#f3e4cf"/>
            <path d="M185 167q46 32 37 77l-47 34-15-19 29-32-28-21" fill="#f1dfc9"/>
            <path d="M89 167q-40 17-44 58l-26 34 16 13 42-30 32-34" fill="#eed8bf"/>
            <path d="M22 260q-12 2-15 14t14 19q18 0 21-17" fill="#d6a083"/>
            <path d="M172 261q-13-3-21 8t7 18q16 2 24-12" fill="#d6a083"/>
            <rect x="114" y="119" width="33" height="43" rx="14" fill="#dda78d"/>
            <ellipse cx="126" cy="83" rx="61" ry="68" fill="#e2ae90"/>
            <path d="M65 89Q39 47 71 23q9-34 42-23 33-22 64 11 25 20 15 57l-8 40-19-35q-31-18-57-40-17 37-42 40Z" fill="#47352f"/>
            <circle cx="107" cy="12" r="28" fill="#47352f"/><circle cx="135" cy="-2" r="25" fill="#47352f"/>
            <circle cx="105" cy="88" r="3.5" fill="#40312c"/><circle cx="150" cy="88" r="3.5" fill="#40312c"/>
            <path d="M113 112q12 11 24 0" stroke="#a05d51" strokeWidth="3" strokeLinecap="round" fill="none"/>
          </svg>
          <div className="build-blocks" aria-hidden="true">
            <div className="build-block base-one"/>
            <div className="build-block base-two"/>
            <div className="build-block base-three"/>
            <div className="build-block upper-one"/>
            <div className="build-block upper-two"/>
            <div className="build-block roof"/>
          </div>
          <div className="build-success"><AsteriskMark/><span>Conseguimos juntos!</span></div>
        </div>
      </div>
    </div>
  </section>;
}
