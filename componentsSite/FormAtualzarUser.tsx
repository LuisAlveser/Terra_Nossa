'use client'
import { Input } from "@/components/ui/input"
import {Button} from"@/components/ui/button"
import { CircleX, Loader2 } from "lucide-react";
import Link from 'next/link'
import { useForm } from "react-hook-form";
import { produtorAtualizadoShema } from "@/lib/auth";
import {zodResolver} from "@hookform/resolvers/zod"
import z from"zod"
import {atualizarUsuario, cadastrarUsuario}from "@/app/(server)/RotaUsuario"
import { useTransition } from "react";
import { useRouter } from 'next/navigation';

import { toast } from "sonner";
import { Card, CardTitle } from "@/components/ui/card";
import { atualizarProdutor } from "@/app/(server)/RotaProdutor";


interface Props{
    produtor?:any
    usuario?:any
}


export function FormAtualizarUser({produtor,usuario}:Props){
    const [carregando,start]=useTransition()
    const router=useRouter()
 
    
    
    const {handleSubmit,register,formState:{errors}}=useForm({
        resolver:zodResolver(produtorAtualizadoShema),
     defaultValues:{
        nome:usuario.nome??"",
        email:usuario.email??"",
        bio:produtor?.produtor?.bio??"",
        contato:produtor?.produtor?.contato??"",
        endereco:produtor?.produtor?.endereco??"",
        estado:produtor?.produtor?.estado??"",
        cidade:produtor?.produtor?.cidade??"",
     }
    })
   const cadastro=(data:z.infer<typeof produtorAtualizadoShema>)=>{
       start(async()=>{
        if(produtor){
            const respostaProdutor=await atualizarProdutor(data)
            const respostaUsuario=await atualizarUsuario(data)
             
            if(respostaProdutor&&respostaUsuario){
             
                toast.success("Usuário Atualizado com sucesso")
                router.refresh()
                router.push("/dashboard")
                return
            }else{
                console.log("Resposta",respostaProdutor)
                 toast.error("Erro em atualizar usuário")
            }
        }
         const respostaUsuario=await atualizarUsuario(data)
         
            if(respostaUsuario){
               
                toast.success("Usuário Atualizado com sucesso")
                
                  router.push("/dashboard")
            }else{
                 toast.error("Erro em atualizar usuário")
            }
        
       })
   }
   return(<>
           <div className="flex flex-col justify-center pt-10">
    <Card className=" justify-center mx-auto w-100  max-w-md bg-green-800 border-none flex flex-col items-center p-4 ">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(cadastro)}>
        <CardTitle className="flex justify-end">
        
         <Link href="/dashboard">  <CircleX className="text-white cursor-pointer" /></Link>
        </CardTitle>
        <h1 className="text-2xl text-white font-extrabold text-center">Atualize seus dados </h1>
      
         <Input className="w-70 placeholder:text-white text-white"  placeholder="Nome" {...register("nome")}/>
              {errors.nome&&<span className="text-red-700 flex">{errors.nome.message}</span>} 

          <Input className="w-70 placeholder:text-white text-white" placeholder="Email"{...register("email")}/>
              {errors.email&&<span className="text-red-700 flex ">{errors.email.message}</span>}  
           {produtor?<>
          <Input className="w-70 placeholder:text-white text-white"  placeholder="Biografia" {...register("bio")}/>
              {errors.bio&&<span className="text-red-700 flex">{errors.bio.message}</span>} 

          <Input className="w-70 placeholder:text-white text-white" placeholder="Tel (xx) xxxxx-xxxx "{...register("contato")}/>
              {errors.contato&&<span className="text-red-700 flex ">{errors.contato.message}</span>}  

           <Input className="w-70 placeholder:text-white text-white" placeholder="Endereço" type="text"{...register("endereco")}/>
            {errors.endereco&&<span className="text-red-700 flex ">{errors.endereco.message}</span>} 

           <Input className="w-70 placeholder:text-white text-white" placeholder="Estado" type="text"{...register("estado")}/>
            {errors.estado&&<span className="text-red-700 flex ">{errors.estado.message}</span>} 

             <Input className="w-70 placeholder:text-white text-white" placeholder="Cidade" type="text"{...register("cidade")}/>
            {errors.cidade&&<span className="text-red-700 flex ">{errors.cidade.message}</span>}
          </>:null }
          <Button type="submit" disabled={carregando} className="w-70 h-10 cursor-pointer  backdrop-grayscale justify-center bg-white text-green-800 font-extrabold ">
            {carregando?<Loader2  className="size-4 animate-spin"/>:<span>Atualizar</span>}</Button>
      </form>
    </Card>
    </div>
           </>)
}