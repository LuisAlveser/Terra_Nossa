import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { buscarProdutos,buscarProdutosPorProdutor } from "@/app/(server)/RotaProtudos";
import ProdutosCard from "../../../componentsSite/ProdutosCard";
import Link from 'next/link'

import { SidebarContent, SidebarFooter, SidebarHeader, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import  jwt  from "jsonwebtoken";
import ProdutosCardEdicao from "../../../componentsSite/ProdutosCardEdicao";

 interface PageProps {
  searchParams: Promise<{ filtro?: string }>;
}
export default async function Tela_principal({ searchParams }: PageProps) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/");
  }
 let usuario = null;
   if (token) {
    try {
      usuario = jwt.decode(token) as { nome: string,email:String };
    } catch (e) {
      usuario = null;
    }
  }
 
  const params = await searchParams;
  const mostrarMeusProdutos = params.filtro === "meus";
  const data= mostrarMeusProdutos?await buscarProdutosPorProdutor(): await buscarProdutos();
  const listaProdutos=data?.produtos||[]

  return (
    
    <SidebarProvider >
      
        <Sidebar>
      <SidebarHeader className="bg-green-800 h-20 flex flex-row " >

        <h1 className="text-white font-extrabold">Opções</h1>
           

      </SidebarHeader>
      <SidebarContent className=" items-center flex flex-col bg-gray-200 ">

        <Link href="/dashboard?filtro=meus">
            <Button  type="submit"  className="mbs-4  w-40 h-10 md:5 cursor-pointer  backdrop-grayscale justify-center bg-white text-green-800 font-extrabold "> 
            Ver seus produtos 
             </Button>
         </Link>
             
        {mostrarMeusProdutos?
          
          <Link href="/dashboard">
            <Button  type="submit"  className="mbs-4  w-40 h-10 md:5 cursor-pointer  backdrop-grayscale justify-center bg-white text-green-800 font-extrabold "> 
            Ver outros  produtos 
             </Button>
         </Link>:null
         }

         <Button type="submit"   className="mbs-4  w-40 h-10 md:5 cursor-pointer  backdrop-grayscale justify-center bg-white text-green-800 font-extrabold "> 
            Atualizar conta
             </Button>
            

             <Button type="submit"  className="mbs-4  w-40 h-10 md:5 cursor-pointer  backdrop-grayscale justify-center bg-white text-green-800 font-extrabold "> 
            Excluir conta 
             </Button>
      </SidebarContent>
       
     <SidebarFooter className="bg-green-800 ">
         <p className="text-white font-extrabold">{usuario?.email}</p>
     </SidebarFooter>
    </Sidebar>
      <main className="w-full p-4  flex-col">
        <div className="flex items-center mb-6">

          <SidebarTrigger  /> 
          <h1 className="text-2xl font-bold">Nossos Produtos</h1>
        </div>

      
        <div className="flex flex-row flex-wrap gap-10 w-full">
          {
          listaProdutos?.map((item:any) => {
            const produtos ={...item,preco: item.preco.toNumber()}
             return  mostrarMeusProdutos?(
                
             <ProdutosCardEdicao key={item.id} produto={produtos}/>
            )
            :<ProdutosCard key={item.id} produto={produtos} />
})}
        </div>
      </main>
    </SidebarProvider>
  );
}