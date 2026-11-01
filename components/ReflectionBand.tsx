import Image from "next/image";
import Link from "next/link";
import {ArrowUpRight} from "@/components/Icons";
export function ReflectionBand(){
 return <section className="reflection-band" aria-labelledby="reflexao-title">
   <div className="container reflection-inner">
    <div className="reflection-copy">
     <span className="eyebrow light">UM CONVITE À REFLEXÃO</span>
     <h2 id="reflexao-title">E se, antes de perguntar o que falta, <em>a gente enxergasse o que já existe?</em></h2>
     <Link href="/sobre" className="reflection-link">Conheça nosso olhar <ArrowUpRight size={17}/></Link>
    </div>
    <Image src="/images/campanha/reflexao-faixa.webp" width={1700} height={567} alt="" aria-hidden="true" className="reflection-photo" sizes="(max-width: 640px) 98vw, 54vw"/>
   </div>
 </section>
}
