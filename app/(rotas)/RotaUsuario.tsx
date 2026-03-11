'use server'

import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import jwt from"jsonwebtoken"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export async function cadastrarUsuario(data:any) {

  try{
      const SALT_ROUNDS = 10
  const hashedPassword = await bcrypt.hash(data.senha,SALT_ROUNDS); 

    const  usuario={
    nome:data.nome,
    email:data.email,
    senha:hashedPassword
    }

   const resposta= await prisma.user.create({data:usuario});
  if(resposta){
    console.log(resposta)
    const token=jwt.sign({id:resposta.id,nome:resposta.nome,email:resposta.email},process.env.Token_Segredo!, { expiresIn: '1h' })
    
    const cookie=await cookies();
    cookie.set("token",token,{
    httpOnly: true, 
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60, 
      path: "/",
    })
     return{
        sucesso:true,
         usuario: { 
          nome: resposta.nome, 
          email: resposta.email 
        
        },
      };
     
  }
} 
catch(error){
     console.error("ERRO REAL NO PRISMA:", error);
      return{
        sucesso:false,
        error:"Erro ao cadastrar"
      }

}

}

export async function name(data:any) {
     
  
  const resposta=await prisma.user.findFirst({where:{email:data.email}})
  if(!resposta){
    return{
      error:"Esse email não existe"
    }
  }
  
    const comparacao= await bcrypt.compare(data.senha,resposta.senha)
    if(comparacao){
        const token=jwt.sign({id:resposta.id,nome:resposta.nome,email:resposta.email},process.env.Token_Segredo!, { expiresIn: '1h' })
        const cookie=await cookies();
       cookie.set("token",token,{
          httpOnly: true, 
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60, 
          path: "/",
    })
    
        return{
      usuario:{
        nome:resposta.nome,
        email:resposta.email
      },
      sucesso:true,
    }
}
}

export async function sair() {
  const cookieStore = await cookies();
  cookieStore.delete("token"); 
  redirect("/"); 
}