'use client'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { useTheme } from 'next-themes'
import { useTransition } from 'react'
import { Loader2 } from 'lucide-react'
import { excluirConta } from '@/app/(server)/RotaUsuario'
import { toast } from "sonner";

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
export function BotãoExcluir(){
      const route=useRouter()
     
      const excluir=async ()=>{
          const conta =await  excluirConta()
          if(conta?.succeso){
             toast.success(conta.mensagem)
             route.push("/")
          }else{
            toast.error("Erro em excluir conta")
          }
      }
      return(
       <Button type="submit"  className="mbs-4  w-40 h-10 md:5 cursor-pointer  backdrop-grayscale justify-center bg-white text-green-800 font-extrabold " onClick={excluir}> 
            Excluir conta 
             </Button>
    )
}