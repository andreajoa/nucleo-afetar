"use client";
import {useState} from "react";
import {Plus,Minus} from "lucide-react";
import {faqs} from "@/lib/data";
export function Faq({count}:{count?:number}){const [expanded,setExpanded]=useState<number|null>(0);return <div className="faq-list">{faqs.slice(0,count).map((item,i)=><div className="faq-item" key={item.q}><h3><button className="faq-button" aria-expanded={expanded===i} aria-controls={`faq-answer-${i}`} onClick={()=>setExpanded(expanded===i?null:i)}><span>{item.q}</span>{expanded===i?<Minus size={20}/>:<Plus size={20}/>}</button></h3><div id={`faq-answer-${i}`} className={`faq-answer ${expanded===i?"faq-open":""}`} hidden={expanded!==i}><p>{item.a}</p></div></div>)}</div>}
