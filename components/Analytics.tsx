"use client";
import {useEffect} from "react";
import {usePathname} from "next/navigation";

/** Visitas e ações do site para o /painel (estatísticas da NexaCloud). Não guarda IP nem dados pessoais e respeita
 * "não rastrear" do navegador. O /painel em si não conta como visita. */
const ENDPOINT="https://app.nexaclouds.online/api/collect";
const SITE="nucleoafetar";

function send(body:Record<string,unknown>){
  try{
    const q=new URLSearchParams(location.search);
    const data=JSON.stringify({site:SITE,path:location.pathname,ref:document.referrer,utm_source:q.get("utm_source"),utm_campaign:q.get("utm_campaign"),...body});
    if(!navigator.sendBeacon?.(ENDPOINT,new Blob([data],{type:"text/plain"})))fetch(ENDPOINT,{method:"POST",body:data,keepalive:true,headers:{"content-type":"text/plain"}}).catch(()=>{});
  }catch{/* estatística nunca atrapalha o site */}
}

function labelOf(href:string){
  if(/wa\.me|whatsapp/i.test(href))return "whatsapp";
  if(/instagram\.com/i.test(href))return "instagram";
  if(href.startsWith("mailto:"))return "email";
  if(href.startsWith("tel:"))return "telefone";
  if(/google\.com\/maps|waze\.com/i.test(href))return "como_chegar";
  return null;
}

export function Analytics(){
  const path=usePathname();
  useEffect(()=>{if(!path.startsWith("/painel"))send({kind:"view"});},[path]);
  useEffect(()=>{
    const click=(e:MouseEvent)=>{const a=(e.target as Element)?.closest?.("a[href]");const l=a&&labelOf(a.getAttribute("href")||"");if(l)send({kind:"event",label:l});};
    const lead=()=>send({kind:"event",label:"formulario_enviado"});
    document.addEventListener("click",click);window.addEventListener("na:lead",lead);
    return()=>{document.removeEventListener("click",click);window.removeEventListener("na:lead",lead);};
  },[]);
  return null;
}
