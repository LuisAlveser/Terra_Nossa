'use client'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { useTheme } from 'next-themes'
import { useTransition } from 'react'
import { Loader2 } from 'lucide-react'


export  function BotaoVoltar(){
    const route=useRouter()
    const path=usePathname()
    const exiberbotao=path.startsWith('/dashboard/ver_produto/')
   
    if(!exiberbotao){
        return null
    }
    return(
     <Button className="w-30 h-10 cursor-pointer  backdrop-grayscale justify-center bg-white font-extrabold text-green-800 " onClick={()=>{route.back()}}>
        Voltar
     </Button>   
    )
}
interface Produto{
    produto_id:number
}
export function BotãoAvaliar({produto_id}:Produto){
      const route=useRouter()
      const[carregando,start]=useTransition();
      const avaliar=()=>{
        start(()=>{
            route.push(`/avaliacao/${produto_id}`)
        })
      }
      return(
     <Button  disabled={carregando}className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg" onClick={avaliar}>
       { carregando?<Loader2  className="size-4 animate-spin"/>:<span>Avaliar Produto</span>}
     </Button>   
    )
}