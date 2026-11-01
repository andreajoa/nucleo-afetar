"use client";
import {useEffect,useRef,useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {ArrowRight,ArrowUpRight} from "@/components/Icons";

const slides=[
  {eyebrow:"ACOLHIMENTO • APRENDIZAGEM",title:"Toda criança tem seu tempo.",highlight:"E merece ser compreendida.",description:"Antes de pensar em métodos, enxergamos histórias, potencialidades e caminhos possíveis para aprender.",image:"1",alt:"Criança construindo com blocos com apoio de uma educadora"},
  {eyebrow:"DESENVOLVIMENTO • CONQUISTAS",title:"Aprender também acontece",highlight:"enquanto brincamos.",description:"Brincar, explorar e descobrir são oportunidades para ampliar habilidades, autonomia e participação.",image:"2",alt:"Criança explorando brinquedos de construção com acompanhamento pedagógico"},
  {eyebrow:"EDUCAÇÃO INCLUSIVA • PERTENCIMENTO",title:"A inclusão começa",highlight:"quando ninguém fica de fora.",description:"Adaptamos os caminhos para que as diferenças sejam respeitadas e a aprendizagem seja possível.",image:"3",alt:"Criança escrevendo com apoio de uma educadora"},
  {eyebrow:"EMOÇÕES • AUTORREGULAÇÃO",title:"Acolher o que a criança sente",highlight:"também é ensinar.",description:"Escuta, brincadeira e mediação ajudam a transformar desafios cotidianos em possibilidades.",image:"4",alt:"Criança explorando emoções e ritmo com mediação de educadora"},
  {eyebrow:"FAMÍLIA • VÍNCULO",title:"Quando a família participa,",highlight:"a caminhada ganha sentido.",description:"Famílias também precisam de acolhimento e orientações práticas para apoiar cada descoberta.",image:"5",alt:"Família compartilhando momento de leitura e vínculo"}
] as const;
export function HeroCarousel(){
  const [current,setCurrent]=useState(0);
  const [paused,setPaused]=useState(false);
  const root=useRef<HTMLElement>(null);
  const visible=useRef(true);
  const [reduceMotion,setReduceMotion]=useState(false);
  useEffect(()=>{
    const media=window.matchMedia("(prefers-reduced-motion: reduce)");
    const change=()=>setReduceMotion(media.matches);
    change();media.addEventListener("change",change);
    const io=new IntersectionObserver(e=>{visible.current=!!e[0]?.isIntersecting},{threshold:.05});
    if(root.current)io.observe(root.current);
    return ()=>{media.removeEventListener("change",change);io.disconnect()};
  },[]);
  useEffect(()=>{
    if(paused||reduceMotion)return;
    const tick=window.setInterval(()=>{if(visible.current&&!document.hidden)setCurrent(v=>(v+1)%slides.length)},8000);
    return ()=>window.clearInterval(tick);
  },[paused,reduceMotion]);
  const go=(n:number)=>setCurrent((n+slides.length)%slides.length);
  const slide=slides[current];
  return <section className="hero-carousel section-pad" aria-roledescription="carrossel" aria-label="Histórias de acolhimento e aprendizagem" ref={root} onMouseEnter={()=>visible.current=false} onMouseLeave={()=>visible.current=true} onFocusCapture={()=>visible.current=false} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget))visible.current=true}}>
    <div className="container hero-carousel-layout">
      <div className="hero-carousel-copy" key={current}>
        <span className="eyebrow"><span className="eyebrow-dot"/> {slide.eyebrow}</span>
        <h1>{slide.title} <em>{slide.highlight}</em></h1>
        <p>{slide.description}</p>
        <div className="hero-carousel-actions">
          <Link href="/servicos" className="button button-dark">Conheça nossos atendimentos <ArrowUpRight size={18}/></Link>
          <Link href="/sobre" className="text-link">Nossa história <ArrowRight size={17}/></Link>
        </div>
        <p className="hero-carousel-location">Um projeto social feito com afeto na Baixada Santista.</p>
      </div>
      <div className="hero-carousel-art" aria-hidden="true">
        {slides.map((s,i)=><picture key={s.image} className={"hero-carousel-picture"+(current===i?" active":"")} aria-hidden={current!==i}>
          <source media="(max-width: 760px)" srcSet={`/images/campanha/hero-${s.image}-mobile.webp`}/>
          <Image src={`/images/campanha/hero-${s.image}.webp`} width={1500} height={850} priority={i===0} loading={i===0?"eager":"lazy"} sizes="(max-width: 760px) 96vw, (max-width: 1100px) 60vw, 56vw" alt="" unoptimized={false}/>
        </picture>)}
      </div>
      <div className="hero-carousel-controls" aria-label="Navegação dos destaques">
        <span className="hero-carousel-counter">{String(current+1).padStart(2,"0")} <span>/</span> 05</span>
        <div className="hero-carousel-dots">{slides.map((s,i)=><button key={s.image} type="button" aria-label={`Mostrar destaque ${i+1}: ${s.eyebrow}`} aria-current={i===current?"true":undefined} className={i===current?"selected":""} onClick={()=>go(i)}><span/></button>)}</div>
        <button className="hero-carousel-pause" type="button" onClick={()=>setPaused(p=>!p)} aria-label={paused?"Retomar troca automática":"Pausar troca automática"}>{paused?"Retomar":"Pausar"}</button>
        <button type="button" className="hero-carousel-next" onClick={()=>go(current+1)} aria-label="Próximo destaque"><ArrowRight size={21}/></button>
      </div>
    </div>
  </section>;
}
