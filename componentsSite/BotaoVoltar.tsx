'use client'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"

export  function BotaoVoltar(){
    const route=useRouter()
    const path=usePathname()
    const exiberbotao=path.startsWith('/dashboard/ver_produto/')
    console.log(exiberbotao)
    if(!exiberbotao){
        return null
    }
    return(
     <Button className="w-30 h-10 cursor-pointer  backdrop-grayscale justify-center bg-white font-extrabold text-green-800 " onClick={()=>{route.back()}}>
        Voltar
     </Button>   
    )
}