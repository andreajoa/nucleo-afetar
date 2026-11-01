import type {Metadata,Viewport} from "next";
import "./globals.css";
import {Header} from "@/components/Header";
import {Footer} from "@/components/Footer";
import {Reveal} from "@/components/Reveal";
import {SITE_NAME,SITE_TAGLINE,SITE_URL} from "@/lib/data";
export const metadata:Metadata={metadataBase:new URL(SITE_URL),title:{default:`${SITE_NAME} | Aprendizagem com afeto na Baixada Santista`,template:`%s | ${SITE_NAME}`},description:`${SITE_TAGLINE} Apoio neuropsicopedagógico, orientação parental e acompanhamento pedagógico para famílias da Baixada Santista.`,applicationName:SITE_NAME,keywords:["neuropsicopedagogia Baixada Santista","orientação parental Santos","educação inclusiva São Vicente","reforço escolar Praia Grande","aprendizagem infantil Cubatão","autismo TDAH aprendizagem"],openGraph:{type:"website",locale:"pt_BR",siteName:SITE_NAME,title:SITE_NAME,description:SITE_TAGLINE,images:[{url:"/images/equipe-nucleo-afetar.webp",width:1122,height:1402,alt:"Equipe do Programa Núcleo Afetar"}]},robots:{index:Boolean(process.env.NEXT_PUBLIC_SITE_URL),follow:true},icons:{icon:[{url:"/icon.svg",type:"image/svg+xml"}],apple:"/apple-icon.png"}};
export const viewport:Viewport={width:"device-width",initialScale:1,themeColor:"#F8F4ED"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><Header/><main id="conteudo">{children}</main><Footer/><Reveal/></body></html>}
