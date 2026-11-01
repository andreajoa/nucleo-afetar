import {Brain,HeartHandshake,BookOpen,PencilLine,Sparkles,UsersRound,MessagesSquare,ArrowUpRight,ArrowRight,Instagram,MapPin,Check,Mail,Heart,Menu,X} from "lucide-react";
const icons={brain:Brain,heart:HeartHandshake,book:BookOpen,pencil:PencilLine,sparkles:Sparkles,people:UsersRound,message:MessagesSquare};
export function ServiceIcon({name}:{name:string}) {const Icon=icons[name as keyof typeof icons] || Sparkles; return <Icon strokeWidth={1.45} size={34} aria-hidden="true"/>}
export {ArrowUpRight,ArrowRight,Instagram,MapPin,Check,Mail,Heart,Menu,X};
