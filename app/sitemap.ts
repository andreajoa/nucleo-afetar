import type {MetadataRoute} from "next";
import {SITE_URL} from "@/lib/data";
export default function sitemap():MetadataRoute.Sitemap{const paths=["","sobre","servicos","equipe","contato","perguntas-frequentes","conteudos","privacidade","termos-de-uso","cookies","acessibilidade"];return paths.map(p=>({url:`${SITE_URL}/${p}`,changeFrequency:p?"monthly":"weekly",priority:p?0.65:1}))}
