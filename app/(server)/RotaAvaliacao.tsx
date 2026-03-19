import { prisma } from "@/lib/prisma";

export   async function avaliar(data:any,id:number){
      try {
        const avaliacao={
            comentario:data.comentario,
            nota:data.nota,
            id_produto:id,
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
export default  async function buscarAvaliação(id:number){
        try {
            const resposta=await prisma.avaliacao.findMany({where:{id_produto:id}})
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