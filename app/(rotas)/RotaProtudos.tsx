"use server"
import { prisma } from "@/lib/prisma";
import {verificaProdutor}from"@/app/(rotas)/RotaProdutor"

export async function adicionarProduto(data:any) {
     try {
        const url =data.imageUrl
        const nomeArquivo = url.split('/').pop();
        const produtor= await prisma.produtor.findFirst({where:{user_id:data.id}})
     
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

