import Link from "next/link";
export function Mark({className=""}:{className?:string}) {return <svg className={className} viewBox="0 0 96 96" fill="none" aria-hidden="true">
<path d="M48 8C40 18 33 27 33 39c0 9 6 16 15 21 9-5 15-12 15-21C63 27 56 18 48 8Z" fill="#832B3D" stroke="#C6A16F" strokeWidth="1.8"/>
<path d="M48 54c-3-9-15-18-20-26-5 12-2 23 12 32M48 54c3-9 15-18 20-26 5 12 2 23-12 32" stroke="#832B3D" strokeWidth="2.6" strokeLinecap="round"/>
<path d="M34 57C23 53 16 45 16 34c-6 17-2 26 22 32M62 57c11-4 18-12 18-23 6 17 2 26-22 32" stroke="#C6A16F" strokeWidth="2"/>
<path d="M48 45c-5-10-17-2-10 8l10 11 10-11c7-10-5-18-10-8Z" stroke="#F2D8A8" strokeWidth="2.6"/>
<path d="M48 78C34 66 12 64 12 77c0 14 22 12 36 1 14-11 36-13 36-1 0 14-22 12-36 1Z" stroke="#3B7285" strokeWidth="4.1" strokeLinecap="round" strokeLinejoin="round"/>
</svg>}
export function Brand({inverse=false}:{inverse?:boolean}) {return <Link href="/" className={`brand ${inverse?"brand-inverse":""}`} aria-label="Programa Núcleo Afetar, início"><Mark className="brand-mark"/><span className="brand-name"><small>PROGRAMA</small><strong>NÚCLEO AFETAR</strong></span></Link>}
