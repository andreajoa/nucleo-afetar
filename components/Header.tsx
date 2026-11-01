"use client";
import {useState} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {Brand} from "./Brand";
import {ArrowUpRight,Menu,X} from "./Icons";
const links=[{href:"/sobre",label:"O programa"},{href:"/servicos",label:"Atendimentos"},{href:"/equipe",label:"Nossa equipe"},{href:"/perguntas-frequentes",label:"Dúvidas"}];
export function Header(){const [open,setOpen]=useState(false);const path=usePathname();return <header className="site-header"><div className="container header-inner"><Brand/><nav id="mobile-main-nav" className={`main-nav ${open?"nav-open":""}`} aria-label="Navegação principal">{links.map(link=><Link href={link.href} key={link.href} aria-current={path===link.href?"page":undefined} onClick={()=>setOpen(false)}>{link.label}</Link>)}<Link className="mobile-contact" href="/contato" onClick={()=>setOpen(false)}>Fale com a equipe <ArrowUpRight size={17}/></Link></nav><Link className="button button-dark header-cta" href="/contato">Vamos conversar <ArrowUpRight size={16}/></Link><button className="menu-toggle" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls="mobile-main-nav" aria-label={open?"Fechar menu":"Abrir menu"}>{open?<X/>:<Menu/>}</button></div></header>}
