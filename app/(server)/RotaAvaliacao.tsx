"use server"
import { prisma } from "@/lib/prisma";
import { obterUsuarioDoCookie } from "./RotaProdutor";

export   async function avaliar(data:any,id_produto:number){
      try {
         const usuario = await obterUsuarioDoCookie()
        
         if(!usuario){
            return
         }
          const produtor =await prisma.produtor.findFirst({where:{user_id:usuario.id}})
          if(produtor){
            return{
            sucesso:false,
            error:"É impossível avaliar seu proprio produto"
            }
             
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
export  async function mediaNota(id_produto:number){
    try {
     
       const resultado =await prisma.avaliacao.aggregate({
        where:{id_produto:id_produto},
        _avg:{nota:true}
       }) 
      
        return{   
           sucesso:true,
           media:resultado._avg.nota
        }
       
       
    } catch (error) {
         return{
            sucesso:false,
            error:error
        }
    }
     

}