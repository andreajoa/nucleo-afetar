export const dynamic = "force-static";
import type {MetadataRoute} from "next";
import {SITE_URL,services} from "@/lib/data";
export default function sitemap():MetadataRoute.Sitemap{const paths=["","sobre","servicos","equipe","contato","perguntas-frequentes","conteudos","privacidade","termos-de-uso","cookies","acessibilidade"];paths.push(...services.map(s=>`servicos/${s.id}`));return paths.map(p=>({url:`${SITE_URL}/${p}`,changeFrequency:p?"monthly":"weekly",priority:p?0.65:1}))}
