import Link from "next/link";
import {ArrowUpRight} from "@/components/Icons";
export default function NotFound(){return <section className="not-found section-pad"><div className="container"><span className="eyebrow">PÁGINA NÃO ENCONTRADA</span><h1>Nem todo caminho é direto. <em>Vamos encontrar outro?</em></h1><p>Esta página não está disponível. Você pode voltar para o início e continuar conhecendo o Núcleo Afetar.</p><Link href="/" className="button button-dark">Voltar para o início <ArrowUpRight size={17}/></Link></div></section>}
