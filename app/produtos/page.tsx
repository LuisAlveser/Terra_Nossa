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
import { produtoShema } from "@/lib/auth";
import {zodResolver} from "@hookform/resolvers/zod"
import z from"zod"
import {adicionarProduto}from "@/app/(rotas)/RotaProtudos"
import { useTransition } from "react";
import { useRouter } from 'next/navigation';
import { toast } from "sonner";
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

import jwt from 'jsonwebtoken';

export  default  function Produtos() {
  const router = useRouter()
  const [carregando,start]=useTransition()

 
 const {register,handleSubmit,setValue,formState:{errors}} =useForm({
  resolver: zodResolver(produtoShema),
  defaultValues:{
     titulo:"",
     descricao:"",
     preco:"",
     unit:"",
     categoria:"",
     imageUrl:"",
  }
 })
 const cadastro=(data:z.infer< typeof produtoShema>)=>{
  start(async ()=>{
        try{
        const token =localStorage.getItem("token")
        console.log(token)
        const usuario= jwt.decode(token as string) as{id : number}
        
       const arquivo = data.imageUrl as File;
     
      if (!arquivo) {
        toast.error("Por favor, selecione uma imagem.");
        return;
      }

      
      const nomeArquivo = `${Date.now()}-${arquivo.name}`;

     
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('produtos')
        .upload(nomeArquivo, arquivo);

      if (uploadError) throw uploadError;

      
      const { data: { publicUrl } } = supabase.storage
        .from('produtos')
        .getPublicUrl(nomeArquivo);
      const dadosCompletos={...data,imageUrl: publicUrl,user_id: usuario.id}
      console.log(dadosCompletos)
      const resposta = await adicionarProduto(dadosCompletos);
        
         if(resposta?.sucesso){
             toast.success("Produto adicionado com sucesso")
             router.push("/dashbord")
         
        }else{
           toast.error(resposta?.error||"Erro ao adiiconar produto")
         }
        }catch(error){
          
              toast.error("Erro ao adiiconar produto")
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
        <h1 className="text-2xl text-white font-extrabold text-center">Cadastre seu Produto</h1>
      
         <Input className="w-70 placeholder:text-white text-white"  placeholder="Titulo" {...register("titulo")}/>
              {errors.titulo&&<span className="text-red-700 flex">{errors.titulo.message}</span>} 

          <Input className="w-70 placeholder:text-white text-white" placeholder="Descrição"{...register("descricao")}/>
              {errors.descricao&&<span className="text-red-700 flex ">{errors.descricao.message}</span>}  

           <Input className="w-70 placeholder:text-white text-white" placeholder="Preço" type="number"{...register("preco")}/>
            {errors.preco&&<span className="text-red-700 flex ">{errors.preco.message}</span>} 

           <Input className="w-70 placeholder:text-white text-white" placeholder="Unidade" type="text"{...register("unit")}/>
            {errors.unit&&<span className="text-red-700 flex ">{errors.unit.message}</span>} 

             <Input className="w-70 placeholder:text-white text-white" placeholder="Categoria" type="text"{...register("categoria")}/>
            {errors.categoria&&<span className="text-red-700 flex ">{errors.categoria.message}</span>} 
            
          <Input className="w-70 text-white cursor-pointer"type="file"onChange={(e) => {
    const file = e.target.files?.[0];
    if (file) setValue("imageUrl", file); 
  }}
/>

          <Button type="submit" disabled={carregando} className="w-70 h-10 cursor-pointer  backdrop-grayscale justify-center bg-white text-green-800 font-extrabold ">
            {carregando?<Loader2  className="size-4 animate-spin"/>:<span>Adicionar Produto</span>}</Button>
      </form>
    </Card>
    </div>
  )
}
