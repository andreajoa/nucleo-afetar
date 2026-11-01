import type {SVGProps} from "react";
/** Stable decorative asterisk: drawn as SVG so mobile browsers never replace it with a colored emoji. */
export function AsteriskMark(props:SVGProps<SVGSVGElement>){
  return <svg aria-hidden="true" focusable="false" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M50 9V91M9 50H91M21 21L79 79M79 21L21 79"/>
  </svg>;
}
