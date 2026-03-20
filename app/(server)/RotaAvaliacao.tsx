"use server"
import { prisma } from "@/lib/prisma";
import { obterUsuarioDoCookie } from "./RotaProdutor";

export   async function avaliar(data:any,id_produto:number){
      try {
         const usuario = await obterUsuarioDoCookie()
         if(!usuario){
            return
         }
         const notaInt= Number(data.nota)
        const avaliacao={
            comentario:data.comentario,
            nota:notaInt,
            id_produto:id_produto,
            id_user:usuario?.id
        }

        const resposta=await prisma.avaliacao.create({data:avaliacao})
        if(resposta){
            return{
                sucesso:true
            }
        }
      } catch (error) {
        return{
            sucesso:false,
            error:error
        }
      }
}
export  async function buscarAvaliação(id:number){
        try {
            const resposta=await prisma.avaliacao.findMany({where:{id_produto:id},include:{user:{select:{nome:true}}}})
            if(resposta){
                return{
                    sucesso:true,
                    resposta
                }
            }
        } catch (error) {
            return{
            sucesso:false,
            error:error
        }
        }
}