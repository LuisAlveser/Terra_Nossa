"use server"


import { prisma } from "@/lib/prisma";
 export async function cadastrarProdutor(data:any){
    try {
       const  produtor={
        bio:data.bio,
        contato:data.contato,
        endereco:data.endereco,
        estado:data.estado,
        cidade:data.cidade,
        user_id: data.user_id
       }
       const resposta=await prisma.produtor.create({data:produtor})
       if(resposta){
          return{
            sucesso:true,
            status:200,
          }
       }

     } catch (error) {
        
          return{
        sucesso:false,
        error:"Erro ao  virar produtor"
      }
    }
 }
export  async function verificaProdutor(data:any) {
    try {
        const produtor =await prisma.produtor.findFirst({where:{user_id:Number(data.user_id)}})
        if(produtor){
            return{
                produtor:{
                    id:produtor.id
                },
                sucesso:true,
                error:"Você já é um produtor",

            }
        }
    } catch (error) {
          return{
        sucesso:false,
        error:"Erro ao  virar produtor"
      }
    }
}