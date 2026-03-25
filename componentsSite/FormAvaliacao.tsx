"use client"
import {
  Card,

  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import {Button} from"@/components/ui/button"
import { CircleX, Loader2, } from "lucide-react";
import Link from 'next/link'
import { useForm,Controller } from "react-hook-form";

import {zodResolver} from "@hookform/resolvers/zod"
import z from"zod"
import {avaliar}from "@/app/(server)/RotaAvaliacao"
import { useState, useTransition } from "react";
import { useRouter } from 'next/navigation';
import {avaliacaoShema}from "@/lib/auth"

import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";



export default  function FormAvaliacao({ params }: { params: { id: number }}){

   
    const produto_id = Number(params.id);
    const router = useRouter()
  const [carregando,start]=useTransition()
const voltar=()=>{
     router.back()
}
  const{register,handleSubmit,control,formState:{errors}}=useForm({
     resolver:zodResolver(avaliacaoShema),
     defaultValues:{
     comentario:"",
     nota:"1",
     }
    
  })
  const cadastro=(data:z.infer< typeof avaliacaoShema>)=>{
    start(async ()=>{
     const resposta=await avaliar(data,produto_id)
     if(resposta?.sucesso){
        toast.success("Avaliação feita com sucesso")
        router.back()
        router.refresh()
     }else{
        console.log(resposta)
        toast.error(resposta?.error as string)
        router.back()
        router.refresh()
     }
    })
  }

    return(
       <div className="flex flex-col justify-center pt-10">
    <Card className=" justify-center mx-auto w-100  max-w-md bg-green-800 border-none flex flex-col items-center p-4 ">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(cadastro)}>
        <CardTitle className="flex justify-end">
        
         <CircleX className="text-white cursor-pointer" onClick={voltar} />
        </CardTitle>
        <h1 className="text-2xl text-white font-extrabold text-center">Avalie o Produto </h1>
      
         <Input className="w-70 placeholder:text-white text-white"  placeholder="Comentario" {...register("comentario")}/>
              {errors.comentario&&<span className="text-red-700 flex">{errors.comentario.message}</span>} 
        <h1 className="text-2xl text-white font-extrabold text-center">Deixe sua nota</h1>
        <Controller
            name="nota"
            control={control}
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange} 
             
                className="flex flex-row justify-center"
              >
                <div className="flex justify-center items-center gap-2">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className="flex items-center gap-1">
                      <RadioGroupItem 
                        value={item.toString()} 
                        id={`r${item}`} 
                        className="border-white text-white bg-white"
                      />
                      <label htmlFor={`r${item}`} className="text-white pr-2">{item}</label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            )}
          />
        
        

          

          <Button type="submit" disabled={carregando} className="w-70 h-10 cursor-pointer  backdrop-grayscale justify-center bg-white text-green-800 font-extrabold ">
            {carregando?<Loader2  className="size-4 animate-spin"/>:<span>Avaliar Produto</span>}</Button>
      </form>
    </Card>
    </div>
    )
}