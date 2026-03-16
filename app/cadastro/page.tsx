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
import { cadastroShema } from "@/lib/auth";
import {zodResolver} from "@hookform/resolvers/zod"
import z from"zod"
import {cadastrarUsuario}from "@/app/(rotas)/RotaUsuario"
import { useTransition } from "react";
import { useRouter } from 'next/navigation';

import { toast } from "sonner";


export  default  function Cadastro() {
   const router = useRouter()
  const [carregando,start]=useTransition()
 

 const {register,handleSubmit,formState:{errors}} =useForm({
  resolver: zodResolver(cadastroShema),
  defaultValues:{
    nome:"",
    email:"",
    senha:""
  }
 })
 const cadastro=(data:z.infer< typeof cadastroShema>)=>{
  start(async ()=>{
   
         const resposta =await  cadastrarUsuario(data)
         
         if(resposta?.sucesso){
             toast.success("Cadastro realizado com sucesso")
             router.push("/dashboard")
         
        }else{
           toast.error(resposta?.error||"Erro ao cadastrar")
         }
  })
    
 }

  return (
    <div className="flex flex-col justify-center pt-10">
    <Card className=" justify-center mx-auto w-100  max-w-md bg-green-800 border-none flex flex-col items-center p-4 ">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(cadastro)}>
        <CardTitle className="flex justify-end">
        
         <Link href="/">  <CircleX className="text-white cursor-pointer" /></Link>
        </CardTitle>
        <h1 className="text-2xl text-white font-extrabold text-center">Seja bem vindo </h1>
      
         <Input className="w-70 placeholder:text-white text-white"  placeholder="Nome" {...register("nome")}/>
              {errors.nome&&<span className="text-red-700 flex">{errors.nome.message}</span>} 

          <Input className="w-70 placeholder:text-white text-white" placeholder="Email"{...register("email")}/>
              {errors.email&&<span className="text-red-700 flex ">{errors.email.message}</span>}  

           <Input className="w-70 placeholder:text-white text-white" placeholder="Senha" type="password"{...register("senha")}/>
            {errors.senha&&<span className="text-red-700 flex ">{errors.senha.message}</span>} 

          <Button type="submit" disabled={carregando} className="w-70 h-10 cursor-pointer  backdrop-grayscale justify-center bg-white text-green-800 font-extrabold ">
            {carregando?<Loader2  className="size-4 animate-spin"/>:<span>Cadastrar</span>}</Button>
      </form>
    </Card>
    </div>
  )
}
