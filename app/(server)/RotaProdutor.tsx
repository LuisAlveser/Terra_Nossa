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
 export async function cadastrarProdutor(dat:any){
   const usuario = await obterUsuarioDoCookie()
   if(!usuario){
        return
       }
    try {
       const  produtor={
        bio:dat.bio,
        contato:dat.contato,
        endereco:dat.endereco,
        estado:dat.estado,
        cidade:dat.cidade,
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
        const produtor =await prisma.produtor.findFirst({where:{user_id:usuario?.id},include:{user:{select:{nome:true,email:true}}}})
        
        if(produtor){
            return{
                produtor:{
                    
                    ...produtor
                },
                sucesso:true,
                error:"Você já é um produtor",

            }
        }

    } catch (error) {
          return{
        sucesso:false,
        error:"Erro ao  verificar Produtor"
      }
    }
}

export async function atualizarProdutor(data:any){
  try {
      const usuario =await obterUsuarioDoCookie()
      if(!usuario){
        return null
      }
     const resposta= await prisma.produtor.update({where:{user_id:usuario.id},
      data:{bio:data.bio,contato:data.contato,endereco:data.endereco,cidade:data.cidade}})
     if(resposta){
           const token=jwt.sign({id:usuario.id,nome:data.nome,email:data.email},process.env.Token_Segredo!, { expiresIn: '1h' })
                 const cookie=await cookies();
                cookie.set("token",token,{
                   httpOnly: true, 
                   secure: process.env.NODE_ENV === "production",
                   maxAge: 60 * 60, 
                   path: "/",
             })
         return{
          sucesso:true
         }
     }
  } catch (error) {
    console.log(error)
         return{
        sucesso:false,
        error:"Erro ao  virar produtor"
      }
  }
}