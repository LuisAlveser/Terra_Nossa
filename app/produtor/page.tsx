"use client"
import {
  Card,

  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import {Button} from"@/components/ui/button"
import { CircleX, Loader2 } from "lucide-react";
import Link from 'next/link'
import { useForm } from "react-hook-form";
import { produtorShema } from "@/lib/auth";
import {zodResolver} from "@hookform/resolvers/zod"
import z from"zod"
import {verificaProdutor,cadastrarProdutor}from "@/app/(rotas)/RotaProdutor"
import { useTransition } from "react";
import { useRouter } from 'next/navigation';
import { toast } from "sonner";

import Cookies from "js-cookie";
import jwt from 'jsonwebtoken';

export  default  function Produtor() {
  const router = useRouter()
  const [carregando,start]=useTransition()

 
 const {register,handleSubmit,formState:{errors}} =useForm({
  resolver: zodResolver(produtorShema),
  defaultValues:{
     bio:"",
     contato:"",
     endereco:"",
     estado:"",
     cidade:"",
    
  }
 })
 const cadastro=(data:z.infer< typeof produtorShema>)=>{
  start(async ()=>{
        const token =localStorage.getItem("token")
        console.log(token)
        const usuario= jwt.decode(token as string) as{id : number}
        console.log(usuario)
         const   verifica=await  verificaProdutor(usuario.id)
        if(verifica?.sucesso){
             toast.error(verifica?.error||"Você já é um produtor")
        }

         const dadosCompletos={...data,user_id:usuario.id}
         console.log(dadosCompletos)
       const resposta =await  cadastrarProdutor(dadosCompletos)
       
         
         if(resposta?.sucesso){
             toast.success("Parabens você agora é um produtor")
             router.push("/dashbord")
         
        }else{
           toast.error(resposta?.error||"Erro ao virar produtor")
         }
  })
    
 }

  return (
    <div className="flex flex-col justify-center pt-10">
    <Card className=" justify-center mx-auto w-100  max-w-md bg-green-800 border-none flex flex-col items-center p-4 ">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(cadastro)}>
        <CardTitle className="flex justify-end">
        
         <Link href="/dashbord">  <CircleX className="text-white cursor-pointer" /></Link>
        </CardTitle>
        <h1 className="text-2xl text-white font-extrabold text-center">Comece a vender</h1>
      
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


          <Button type="submit" disabled={carregando} className="w-70 h-10 cursor-pointer  backdrop-grayscale justify-center bg-white text-green-800 font-extrabold ">
            {carregando?<Loader2  className="size-4 animate-spin"/>:<span>Vire Produtor</span>}</Button>
      </form>
    </Card>
    </div>
  )
}
