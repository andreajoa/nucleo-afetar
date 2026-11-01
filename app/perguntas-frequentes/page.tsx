import type {Metadata} from "next";
import Link from "next/link";
import {PageHero} from "@/components/PageHero";
import {Faq} from "@/components/Faq";
import {ArrowUpRight} from "@/components/Icons";
export const metadata:Metadata={title:"Perguntas frequentes",description:"Tire dúvidas sobre o Núcleo Afetar: público atendido, laudos, orientação familiar, contribuições e atuação na Baixada Santista."};
export default function Perguntas(){return <><PageHero eyebrow="RESPONDENDO ÀS SUAS DÚVIDAS" title="Toda pergunta" italic="tem lugar aqui." description="Algumas respostas para ajudar sua família a conhecer nossa proposta e decidir como iniciar uma conversa."/><section className="section-pad"><div className="container faq-full"><Faq/><div className="faq-contact"><h2>Não encontrou o que precisava?</h2><p>Converse com a equipe. Vamos ouvir sua dúvida com atenção.</p><Link href="/contato" className="button button-dark">Fale com a equipe <ArrowUpRight size={17}/></Link></div></div></section></>}
