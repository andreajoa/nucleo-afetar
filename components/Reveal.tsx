"use client";
import {useEffect} from "react";
export function Reveal(){useEffect(()=>{if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;document.documentElement.classList.add("js-ready");const els=document.querySelectorAll("[data-reveal]");const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("is-visible");observer.unobserve(e.target)}}),{threshold:.12});els.forEach(el=>observer.observe(el));return ()=>observer.disconnect()},[]);return null}
