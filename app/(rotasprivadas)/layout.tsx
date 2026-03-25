import type { Metadata } from "next";
import {cache}from "react"

import { obterUsuarioDoCookie } from "../(server)/RotaProdutor";
import { redirect } from "next/navigation";



export const metadata: Metadata = {
  title: "Home",
  description: "Entre produtos perto de você",
};

export default async function LayoutPrivado({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
    const usuario= await obterUsuarioDoCookie();
    if(!usuario){
         redirect('/')
    }
  return (
       <>{children}</> 
  );
}