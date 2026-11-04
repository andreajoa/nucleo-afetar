import type {Metadata} from "next";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {createHmac,timingSafeEqual} from "node:crypto";
import styles from "./painel.module.css";

/** Painel da dona do Núcleo Afetar: visitas, de onde as pessoas são, páginas, origem e ações (WhatsApp, Instagram,
 * formulário). Senha em PAINEL_SENHA; dados das estatísticas da NexaCloud (NEXA_SITE_TOKEN), nada de dado pessoal. */
export const metadata:Metadata={title:"Painel",robots:{index:false,follow:false}};
export const dynamic="force-dynamic";

const COOKIE="na_painel";
const sessao=()=>createHmac("sha256",process.env.PAINEL_SENHA||"").update("painel-v1").digest("hex");
const igual=(a:string,b:string)=>a.length===b.length&&timingSafeEqual(Buffer.from(a),Buffer.from(b));

async function entrar(form:FormData){
  "use server";
  const senha=String(form.get("senha")||"");
  const certa=process.env.PAINEL_SENHA||"";
  if(!certa||!igual(senha,certa))redirect("/painel?erro=1");
  (await cookies()).set(COOKIE,sessao(),{httpOnly:true,secure:true,sameSite:"lax",path:"/painel",maxAge:60*60*24*30});
  redirect("/painel");
}
async function sair(){
  "use server";
  (await cookies()).delete(COOKIE);
  redirect("/painel");
}

type Par={k:string;v:number};
type Dados={range:{days:number;from:string;to:string};totals:{views:number;visitors:number;previousVisitors:number};
  series:{day:string;views:number;visitors:number}[];pages:{path:string;views:number;visitors:number}[];
  sources:Par[];countries:Par[];regions:Par[];cities:Par[];devices:Par[];events:{label:string;n:number;visitors:number}[];
  hours:{hour:number;views:number}[];recent:{at:number;path:string;city:string|null;region:string|null;country:string|null;device:string;source:string}[]};

const PAGINAS:Record<string,string>={"/":"Início","/servicos":"Serviços","/sobre":"Sobre","/equipe":"Equipe","/contato":"Contato",
  "/perguntas-frequentes":"Perguntas frequentes","/conteudos":"Conteúdos","/privacidade":"Privacidade","/termos-de-uso":"Termos de uso","/acessibilidade":"Acessibilidade","/cookies":"Cookies"};
const ACOES:Record<string,string>={formulario_enviado:"Formulários enviados",whatsapp:"Cliques no WhatsApp",instagram:"Cliques no Instagram",
  email:"Cliques no e-mail",telefone:"Cliques no telefone",como_chegar:"Pediram rota (como chegar)"};
const APARELHOS:Record<string,string>={mobile:"Celular",desktop:"Computador",tablet:"Tablet"};
const ORIGENS:Record<string,string>={direto:"Direto (digitou ou salvou)","www.google.com":"Google","www.instagram.com":"Instagram","l.instagram.com":"Instagram",
  "instagram":"Instagram","m.facebook.com":"Facebook","l.facebook.com":"Facebook","www.bing.com":"Bing","chatgpt.com":"ChatGPT"};
const nf=new Intl.NumberFormat("pt-BR");
const nomePagina=(p:string)=>PAGINAS[p]||(p.startsWith("/conteudos/")?"Conteúdo: "+p.slice(11).replace(/-/g," "):p);

function Lista({titulo,itens,vazio="Ainda sem dados"}:{titulo:string;itens:{k:string;v:number}[];vazio?:string}){
  const max=Math.max(1,...itens.map(i=>i.v));
  return <section className={styles.card}><h2>{titulo}</h2>{itens.length?<ul className={styles.lista}>{itens.map(i=><li key={i.k}>
    <div className={styles.linha}><span>{i.k}</span><strong>{nf.format(i.v)}</strong></div><div className={styles.barra}><i style={{width:`${i.v/max*100}%`}}/></div></li>)}</ul>:<p className={styles.vazio}>{vazio}</p>}</section>;
}

export default async function Painel({searchParams}:{searchParams:Promise<{dias?:string;erro?:string}>}){
  const sp=await searchParams;
  const ok=!!process.env.PAINEL_SENHA&&igual((await cookies()).get(COOKIE)?.value||"",sessao());
  if(!ok)return <main className={styles.wrap} id="conteudo"><form action={entrar} className={styles.login}>
    <span className="eyebrow">ÁREA RESTRITA</span><h1>Painel do <em>Núcleo Afetar</em></h1>
    <p>Visitas do site, de onde as pessoas são e o que elas fazem.</p>
    <label>Senha<input type="password" name="senha" required autoFocus autoComplete="current-password"/></label>
    {sp.erro&&<p className={styles.erro}>Senha incorreta. Tente de novo.</p>}
    <button type="submit">Entrar</button></form></main>;

  const dias=[7,30,90].includes(Number(sp.dias))?Number(sp.dias):30;
  let d:Dados|null=null;
  try{const r=await fetch(`https://app.nexaclouds.online/api/sites/nucleoafetar/stats?days=${dias}`,{headers:{authorization:`Bearer ${process.env.NEXA_SITE_TOKEN||""}`},cache:"no-store"});if(r.ok)d=await r.json();}catch{/* mostra aviso abaixo */}
  if(!d)return <main className={styles.wrap} id="conteudo"><section className={styles.card}><h1>Painel</h1><p>Não foi possível carregar as estatísticas agora. Tente em alguns minutos.</p></section></main>;

  const ev=(l:string)=>d!.events.find(e=>e.label===l)?.n??0;
  const formularios=ev("formulario_enviado"),contatos=formularios+ev("whatsapp");
  const variacao=d.totals.previousVisitors?Math.round((d.totals.visitors-d.totals.previousVisitors)/d.totals.previousVisitors*100):null;
  const conversao=d.totals.visitors?(contatos/d.totals.visitors*100):0;
  const maxDia=Math.max(1,...d.series.map(s=>s.visitors));
  const topHora=[...d.hours].sort((a,b)=>b.views-a.views)[0];
  const origem=d.sources.map(s=>({k:ORIGENS[s.k]||s.k,v:s.v})).reduce((acc:Par[],s)=>{const f=acc.find(x=>x.k===s.k);if(f)f.v+=s.v;else acc.push({...s});return acc;},[]);

  return <main className={styles.wrap} id="conteudo">
    <header className={styles.topo}><div><span className="eyebrow">PAINEL</span><h1>Como está o <em>Núcleo Afetar</em></h1>
      <p>{d.range.from.split("-").reverse().join("/")} a {d.range.to.split("-").reverse().join("/")}</p></div>
      <nav className={styles.periodo}>{[7,30,90].map(n=><a key={n} href={`/painel?dias=${n}`} aria-current={n===dias?"page":undefined}>{n} dias</a>)}
      <form action={sair}><button type="submit" className={styles.sair}>Sair</button></form></nav></header>

    <div className={styles.kpis}>
      <section className={styles.kpi}><small>Pessoas que visitaram</small><strong>{nf.format(d.totals.visitors)}</strong>
        <span>{variacao===null?"primeiro período":`${variacao>=0?"▲":"▼"} ${Math.abs(variacao)}% vs. período anterior`}</span></section>
      <section className={styles.kpi}><small>Páginas vistas</small><strong>{nf.format(d.totals.views)}</strong><span>{d.totals.visitors?(d.totals.views/d.totals.visitors).toFixed(1):"0"} por pessoa</span></section>
      <section className={styles.kpi}><small>Formulários enviados</small><strong>{nf.format(formularios)}</strong><span>pedidos de primeiro contato</span></section>
      <section className={styles.kpi}><small>Cliques no WhatsApp</small><strong>{nf.format(ev("whatsapp"))}</strong><span>Instagram: {nf.format(ev("instagram"))}</span></section>
      <section className={styles.kpi}><small>Visitas que viraram contato</small><strong>{conversao.toFixed(1).replace(".",",")}%</strong><span>formulário + WhatsApp</span></section>
    </div>

    <section className={styles.card}><h2>Pessoas por dia</h2>{d.series.length?<div className={styles.grafico}>{d.series.map(s=>
      <div key={s.day} title={`${s.day.split("-").reverse().join("/")}: ${s.visitors} pessoas`}><i style={{height:`${s.visitors/maxDia*100}%`}}/></div>)}</div>:<p className={styles.vazio}>Ainda sem visitas registradas.</p>}
      {topHora&&<p className={styles.dica}>Horário com mais visitas: <strong>{topHora.hour}h</strong> (horário de Brasília). Bom momento para postar no Instagram.</p>}</section>

    <div className={styles.grade}>
      <Lista titulo="Páginas mais visitadas" itens={d.pages.map(p=>({k:nomePagina(p.path),v:p.views}))}/>
      <Lista titulo="De onde as pessoas chegam" itens={origem}/>
      <Lista titulo="Cidades" itens={d.cities.map(c=>({k:c.k.replace(/, $/,""),v:c.v}))}/>
      <Lista titulo="Estados" itens={d.regions}/>
      <Lista titulo="Países" itens={d.countries.map(c=>({k:c.k==="BR"?"Brasil":c.k,v:c.v}))}/>
      <Lista titulo="Aparelho" itens={d.devices.map(x=>({k:APARELHOS[x.k]||x.k,v:x.v}))}/>
      <Lista titulo="O que as pessoas fizeram" itens={d.events.map(e=>({k:ACOES[e.label]||e.label,v:e.n}))} vazio="Nenhuma ação ainda"/>
    </div>

    <section className={styles.card}><h2>Últimas visitas</h2>{d.recent.length?<div className={styles.tabela}><table><thead><tr><th>Quando</th><th>Página</th><th>De onde</th><th>Chegou por</th><th>Aparelho</th></tr></thead>
      <tbody>{d.recent.map((r,i)=><tr key={i}><td>{new Date(r.at*1000).toLocaleString("pt-BR",{timeZone:"America/Sao_Paulo",day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"})}</td>
      <td>{nomePagina(r.path)}</td><td>{[r.city,r.region].filter(Boolean).join(", ")||(r.country==="BR"?"Brasil":r.country)||"—"}</td><td>{ORIGENS[r.source]||r.source}</td><td>{APARELHOS[r.device]||r.device}</td></tr>)}</tbody></table></div>
      :<p className={styles.vazio}>Ainda sem visitas registradas.</p>}</section>

    <p className={styles.nota}>Os nomes e mensagens de quem preenche o formulário chegam no e-mail contato@nucleoafetar.com.br e no atendimento do Instagram. Este painel não guarda IP nem dados pessoais dos visitantes.</p>
  </main>;
}
