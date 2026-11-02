import Link from "next/link";
import {ArrowUpRight,ServiceIcon} from "./Icons";
import type {services} from "@/lib/data";
export function ServiceCard({item}:{item:(typeof services)[number]}){return <Link href={`/servicos/${item.id}`} className="service-card" data-reveal><div className="service-top"><span>{item.number} / 07</span><ArrowUpRight size={19}/></div><div className="service-symbol"><ServiceIcon name={item.icon}/></div><h3>{item.title}</h3><p>{item.description}</p><span className="service-bottom">Saiba mais <ArrowUpRight size={16}/></span></Link>}
