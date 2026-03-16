"use server"
import { prisma } from "@/lib/prisma";
import {obterUsuarioDoCookie}from"@/app/(rotas)/RotaProdutor"
import{verificaProdutor}from"@/app/(rotas)/RotaProdutor" 
import { supabase } from "@/lib/supabase";

export async function adicionarProduto(data:any) {
    const usuario=await obterUsuarioDoCookie()
     try {
        const url =data.imageUrl
        const nomeArquivo = url.split('/').pop();
        const produtor= await prisma.produtor.findFirst({where:{user_id:usuario?.id}})
     
        if(!produtor){
             
            return{
                sucesso:false,
                error:"Vire produtor para adicionar produtos" 
             }
        }
           const produto={
              titulo:data.titulo,
              descricao:data.descricao,
              preco:data.preco,
              unit:data.unit,
              categoria:data.categoria,
              imageUrl:nomeArquivo,
              id_produtor:Number(produtor?.id) 
            }
          const resposta= await prisma.produto.create({data:produto})
         
          if(resposta){
            return{
                sucesso:true, 
            }
          }
        
     } catch (error) {
        console.log(error)
        return{
          sucesso:false,
        error:"Erro em Adicionar Produto" 
        }
    }
}
 export async function buscarProdutos() {
     try {
        const produtos=await prisma.produto.findMany();
        if(produtos){
            return{
            produtos,
        }
    }
     } catch (error) {
        return{
            sucesso:false,
            error:error
        }
     }
   
    
    
}
 export async function buscarProdutosPorProdutor() {
     try {
          const usuario =await obterUsuarioDoCookie()
  const produtor= await prisma.produtor.findFirst({where:{user_id:usuario?.id}}) 

        const produtos=await prisma.produto.findMany({where:{id_produtor:produtor?.id}});
        
        
        if(produtos){
            return{
            produtos,
        }
    }
     } catch (error) {
        return{
            sucesso:false,
            error:error
        }
     }
   
    
    
}
export async function excluirProduto(id:number) {
    try {
       
        const produto =await prisma.produto.findFirst({where:{id:id}})
      
        if(!produto){
             return{
            sucesso:false,
            error:"Produto não encontrado"
        }
        }
        const { data, error } = await supabase
         .storage
         .from('produtos')
         .remove([`${produto.imageUrl}`])
       
         if(!data){
            return {
                sucesso:false,
                error:error
            }
         }
          const deletar=  await prisma.produto.delete({where:{id:id}})
            return{
                sucesso:true,
            }
          


    } catch (error) {
        return{
            sucesso:false,
            error:error
        }
    }
}
