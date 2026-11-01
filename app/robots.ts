export const dynamic = "force-static";
import type {MetadataRoute} from "next";
import {SITE_URL} from "@/lib/data";
export default function robots():MetadataRoute.Robots{return {rules:{userAgent:"*",allow:!!process.env.NEXT_PUBLIC_SITE_URL?"/":undefined,disallow:!process.env.NEXT_PUBLIC_SITE_URL?"/":undefined},sitemap:`${SITE_URL}/sitemap.xml`}}
