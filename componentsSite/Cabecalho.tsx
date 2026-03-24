import {Button} from"@/components/ui/button"
import Image from 'next/image'
import Link from 'next/link'
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'
import { CircleUserRound } from 'lucide-react';
import {sair }from"@/app/(server)/RotaUsuario"
import {BotaoVoltar}from "@/componentsSite/BotaoAnimado"
export default async function Cabecalho(){
    const cookieStore = await cookies();
   const token = cookieStore.get("token")?.value;

   let usuario = null;
   if (token) {
    try {
      usuario = jwt.decode(token) as { nome: string };
    } catch (e) {
      usuario = null;
    }
  }
    return(
     <header className=" h-15   items-center bg-green-800 flex flex-row  justify-between px-4 md:px-10 ">
     <div className="flex flex-row justify-center items-center">
    <Image className=' ml-5 justify-center '
      src="/Terra_Nossa_logo.png" 
      alt="Descrição da imagem"
      width={60}
      height={60}

      />
     
    <h1 className="text-3xl  pt-2 font-extrabold text-white">Terra Nossa </h1>
 </div>
 

 {   token?<div className=" items-center   bg-green-800 justify-between flex flex-row gap-4 ">
    
       <CircleUserRound className="text-white h-10 w-8 cursor-pointer"/>

      
       <h1 className="text-white font-extrabold text-2xl" >{usuario?.nome}</h1>
       

       <Link href={"/produtor"}>
        <Button className="w-30 h-10 cursor-pointer  backdrop-grayscale justify-center bg-white font-extrabold text-green-800 ">Venda aqui</Button>
        </Link>

        <Link href={"/produtos"}>
        <Button className="w-35 h-10 cursor-pointer  backdrop-grayscale justify-center bg-white font-extrabold text-green-800 ">Adicione Produtos</Button>
        </Link>
        <BotaoVoltar/>
        <Button className="w-20 h-10 cursor-pointer  backdrop-grayscale justify-center bg-white font-extrabold text-green-800 "onClick={sair} >Sair</Button>

 </div>:(
    <div className=" items-center   bg-green-800 justify-between flex flex-row gap-10 ">
        <Link href={"/cadastro"}>
    <Button className="w-20 h-10 cursor-pointer  backdrop-grayscale justify-center bg-white font-extrabold text-green-800  ">
      Cadastro </Button>
      </Link>

      <Link href={"/login"}>
     <Button className="w-20 h-10 cursor-pointer  backdrop-grayscale justify-center bg-white text-green-800 font-extrabold ">
      Login  </Button>
      </Link>
    </div>

    )}
     </header>
    );
}