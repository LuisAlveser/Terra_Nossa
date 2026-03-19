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
import {adicionarProduto,atualizarProduto}from "@/app/(server)/RotaProtudos"
import { useTransition } from "react";
import { useRouter } from 'next/navigation';
import { toast } from "sonner";
import { createClient } from '@supabase/supabase-js'
import { supabase } from "@/lib/supabase"; 
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
interface ProdutoProps {
  produto?: {
    id:   number;
    titulo: string;
    descricao:string;
    categoria:string;
    imageUrl: string;
    preco: number | string;
    unit: string;
  };
}

export   default function FormProdutos({ produto }:ProdutoProps) {
  const router = useRouter()
  const [carregando,start]=useTransition()

 const {register,handleSubmit,setValue,formState:{errors}} =useForm({
  resolver: zodResolver(produtoShema),
  defaultValues:{
    titulo: produto?.titulo || "",
    descricao: produto?.descricao || "",
    preco: produto?.preco || "",
    unit: produto?.unit || "",
    categoria: produto?.categoria || "",
    imageUrl: produto?.imageUrl || undefined
  }
 })
 const cadastro=(data:z.infer< typeof produtoShema>)=>{
  start(async ()=>{
        try{
       
        let finalImageUrl = produto?.imageUrl;
       if (data.imageUrl instanceof File) {
        if (produto?.imageUrl) {
          
          await supabase.storage
            .from('produtos')
            .remove([produto.imageUrl]);
        }
          const nomeArquivo = `${Date.now()}-${data.imageUrl.name}`;
          const { data:uploadRes , error: uploadError } = await supabase.storage
            .from('produtos')
            .upload(nomeArquivo, data.imageUrl);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('produtos')
            .getPublicUrl(nomeArquivo);
          
          finalImageUrl = publicUrl;
          
        } else if (!produto && !data.imageUrl) {
          
          toast.error("Por favor, selecione uma imagem.");
          return;
        }
        const dadosCompletos = { ...data, imageUrl: finalImageUrl };
     const resposta = produto 
          ? await atualizarProduto(produto.id, dadosCompletos)
          : await adicionarProduto(dadosCompletos);

        if (resposta?.sucesso) {
          toast.success(produto ? "Produto atualizado!" : "Produto adicionado!");
           router.refresh();
          router.push("/dashboard");
   
        } else {
            console.log(resposta?.error)
          toast.error("Erro na operação");
        }  
      
        }catch(error){
          
              toast.error("Erro ao adicionar produto")
        }
  })
    
 }


  

  return (
    <div className="flex flex-col justify-center pt-10">
    <Card className=" justify-center mx-auto w-100  max-w-md bg-green-800 border-none flex flex-col items-center p-4 ">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(cadastro)}>
        <CardTitle className="flex justify-end">
        
         <Link href={"/dashboard"}>  <CircleX className="text-white cursor-pointer" /></Link>
        </CardTitle>
        <h1 className="text-2xl text-white font-extrabold text-center">{produto?"Atualizar Produto":"Cadastre seu Produto"}</h1>
      
         <Input className="w-70 placeholder:text-white text-white"  placeholder="Titulo" {...register("titulo")}/>
              {errors.titulo&&<span className="text-red-700 flex">{errors.titulo.message}</span>} 

          <Input className="w-70 placeholder:text-white text-white" placeholder="Descrição"{...register("descricao")}/>
              {errors.descricao&&<span className="text-red-700 flex ">{errors.descricao.message}</span>}  

           <Input className="w-70 placeholder:text-white text-white" placeholder="Preço" type="number"{...register("preco")}/>
            {errors.preco&&<span className="text-red-700 flex ">{errors.preco.message}</span>} 

          
               <Select  onValueChange={(value)=>setValue("unit",value)}>
      <SelectTrigger className="w-70    text-white [&>span]:text-white ">
        <SelectValue  placeholder="Selecione a unidade"  />
      </SelectTrigger >
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="text-green-800">Unidades</SelectLabel>
          <SelectItem value="UN">Unidade</SelectItem>
          <SelectItem value="CX (Caixa)">Caixa</SelectItem>
          <SelectItem value="KG (Quilograma) ">KG (Quilograma)</SelectItem>
          <SelectItem value="LT(Litro) ">LT(LT)</SelectItem>
          <SelectItem value="DZ (Dúzia)">DZ (Dúzia)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
             <Input className="w-70 placeholder:text-white text-white" placeholder="Categoria" type="text"{...register("categoria")}/>
            {errors.categoria&&<span className="text-red-700 flex ">{errors.categoria.message}</span>} 
            
          <Input className="w-70 text-white cursor-pointer"type="file"onChange={(e) => {
    const file = e.target.files?.[0];
    if (file) setValue("imageUrl", file,{ shouldValidate: true }); 
  }}
/>

          <Button type="submit" disabled={carregando} className="w-70 h-10 cursor-pointer  backdrop-grayscale justify-center bg-white text-green-800 font-extrabold ">
            {carregando?<Loader2  className="size-4 animate-spin"/>:<span>{produto?"Atualizar Produto":"Adicionar Produto"}</span>}</Button>
      </form>
    </Card>
    </div>
  )
}
