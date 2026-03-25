"use client"
import {
  Card,
  CardTitle,
} from "@/components/ui/card"
import { toast } from "sonner";
import { Input } from "@/components/ui/input"
import {Button} from"@/components/ui/button"
import Link from 'next/link'
import z from"zod"
import {login}from "@/app/(server)/RotaUsuario"
import { useTransition } from "react";
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import { loginShema } from "@/lib/auth";
import { CircleX, Loader2 } from "lucide-react";


export  default function Login() {
    const [carregando,start]=useTransition()
    const router = useRouter()
const{register,handleSubmit,formState:{errors}}=useForm({
 defaultValues:{
    email:"",
    senha:"",
 },
 resolver:zodResolver(loginShema)
})
    const logar =(data:z.infer<typeof loginShema>)=>{
        start(async ()=>{
            const resposta=await login(data)

            if(resposta?.sucesso){
             toast.success("Login realizado com sucesso")
             router.push("/dashboard")

            }else{
             toast.error(resposta?.error||"Erro ao logar")
            }
        })

    }
  return (
    <div className="flex flex-col justify-center pt-10">
    <Card className=" justify-center mx-auto w-100  max-w-md bg-green-800 border-none flex flex-col items-center p-4 ">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(logar)}>
        <CardTitle className="flex justify-end">
        
         <Link href="/">  <CircleX className="text-white cursor-pointer" /></Link>
        </CardTitle>
        <h1 className="text-2xl text-white font-extrabold text-center">Seja bem vindo de volta </h1>
      
        
          <Input className="w-70 placeholder:text-white text-white" placeholder="Email" {...register("email")}/>
            {errors.email&&<span className="text-red-600">{errors.email.message}</span>}

           <Input className="w-70 placeholder:text-white text-white" placeholder="Senha" type="password"{...register("senha")}/>
            {errors.senha&&<span className="text-red-600">{errors.senha.message}</span>}

          <Button type="submit" className="w-70 h-10 cursor-pointer  backdrop-grayscale justify-center bg-white text-green-800 font-extrabold ">
            {carregando?<Loader2 className="size-4 animate-spin"/>:<span>Logar</span> }</Button>
            <p className="flex justify-center ">Esqueceu sua senha? <span className="text-white cursor-pointer font-extrabold pl-1"> Clique aqui!</span></p>
      </form>
    </Card>
    </div>
  )
}
