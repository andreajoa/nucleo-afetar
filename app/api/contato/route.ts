import {NextRequest,NextResponse} from "next/server";
import {services,SITE_URL} from "@/lib/data";
export const runtime="nodejs";
const attempts=new Map<string,{count:number;until:number}>();
export async function POST(req:NextRequest){
 const origin=req.headers.get("origin");if(!origin||![new URL(SITE_URL).origin,req.nextUrl.origin].includes(origin))return NextResponse.json({error:"Origem inválida"},{status:403});
 if(!req.headers.get("content-type")?.includes("application/json"))return NextResponse.json({error:"Formato inválido"},{status:415});
 let b:Record<string,unknown>;try{const raw=await req.text();if(raw.length>12000)return NextResponse.json({error:"Mensagem muito longa"},{status:413});b=JSON.parse(raw);if(!b||typeof b!=="object"||Array.isArray(b))throw Error();}catch{return NextResponse.json({error:"Dados inválidos"},{status:400});}
 if(b.website)return NextResponse.json({error:"Solicitação inválida"},{status:400});
 const bounds:Record<string,number>={name:100,email:254,phone:30,city:100,service:150,message:3000};for(const [key,max] of Object.entries(bounds)){if((key!=="phone"&&!b[key])||(b[key]!==undefined&&typeof b[key]!=="string")||String(b[key]||"").length>max)return NextResponse.json({error:"Verifique os campos"},{status:400});}
 if(!String(b.name).trim()||!String(b.city).trim()||! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(b.email))||String(b.message).trim().length<10||b.consent!=="on"||![...services.map(s=>s.title),"Preciso de orientação para escolher"].includes(String(b.service))||! /^[a-f0-9-]{36}$/i.test(String(b.requestId)))return NextResponse.json({error:"Verifique os campos"},{status:400});
 const ip=req.headers.get("x-forwarded-for")?.split(",")[0]||"unknown";const now=Date.now();for(const [key,v] of attempts)if(v.until<now)attempts.delete(key);const count=attempts.get(ip)||{count:0,until:now+600000};if(count.count>=5)return NextResponse.json({error:"Tente mais tarde"},{status:429,headers:{"Retry-After":"600"}});count.count++;attempts.set(ip,count);
 const key=process.env.RESEND_API_KEY;if(!key)return NextResponse.json({error:"Envio indisponível"},{status:503});
 const text=`Novo contato pelo site do Programa Núcleo Afetar\n\nNome: ${b.name}\nE-mail: ${b.email}\nTelefone: ${b.phone||"Não informado"}\nCidade: ${b.city}\nInteresse: ${b.service}\n\nMensagem:\n${b.message}\n\nAdulto responsável autorizou o contato pelo formulário.`;
 try{const response=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${key}`,"Content-Type":"application/json","Idempotency-Key":`contato-${b.requestId}`},body:JSON.stringify({from:"Programa Núcleo Afetar <contato@nucleoafetar.com.br>",to:["nucleoafetar@proton.me"],reply_to:String(b.email),subject:"Novo contato pelo site — Núcleo Afetar",text}),signal:AbortSignal.timeout(12000)});if(!response.ok)return NextResponse.json({error:"Falha no envio"},{status:502});return NextResponse.json({ok:true});}catch{return NextResponse.json({error:"Falha no envio"},{status:502});}
}
