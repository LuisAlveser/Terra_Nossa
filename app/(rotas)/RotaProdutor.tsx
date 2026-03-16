"use server"


import { prisma } from "@/lib/prisma";
import  jwt  from "jsonwebtoken";
import { cookies } from "next/headers"; 

 export async function obterUsuarioDoCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
   
    return jwt.verify(token, process.env.Token_Segredo!) as { id: number };
  } catch (e) {
    return null;
  }
}
 export async function cadastrarProdutor(data:any){
   const usuario = await obterUsuarioDoCookie()
   
    try {
       const  produtor={
        bio:data.bio,
        contato:data.contato,
        endereco:data.endereco,
        estado:data.estado,
        cidade:data.cidade,
        user_id: usuario?.id
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
export  async function verificaProdutor() {
    const usuario =await obterUsuarioDoCookie()
    
    try {
        const produtor =await prisma.produtor.findFirst({where:{user_id:usuario?.id}})
        
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