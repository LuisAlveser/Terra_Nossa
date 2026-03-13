import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { buscarProdutos } from "@/app/(rotas)/RotaProtudos";
import ProdutosCard from "../components/ProdutosCard";


import { SidebarContent, SidebarFooter, SidebarHeader, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import  jwt  from "jsonwebtoken";

export default async function Tela_principal() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/");
  }
 let usuario = null;
   if (token) {
    try {
      usuario = jwt.decode(token) as { nome: string };
    } catch (e) {
      usuario = null;
    }
  }
  const produtosData = await buscarProdutos();

  return (
    
    <SidebarProvider >
      
        <Sidebar>
      <SidebarHeader className="bg-green-800 h-20 flex flex-row " >

        <h1 className="text-white font-extrabold">Opções</h1>
           

      </SidebarHeader>
      <SidebarContent className=" items-center flex flex-col bg-gray-200 ">
        <Button type="submit"  className="mbs-4  w-40 h-10 md:5 cursor-pointer  backdrop-grayscale justify-center bg-white text-green-800 font-extrabold "> 
            Ver seus produtos 
             </Button>
         <Button type="submit"  className="mbs-4  w-40 h-10 md:5 cursor-pointer  backdrop-grayscale justify-center bg-white text-green-800 font-extrabold "> 
            Atualiza conta
             </Button>
             
             <Button type="submit"  className="mbs-4  w-40 h-10 md:5 cursor-pointer  backdrop-grayscale justify-center bg-white text-green-800 font-extrabold "> 
            Excluir conta 
             </Button>
      </SidebarContent>
       
     <SidebarFooter className="bg-green-800 ">
         <p className="text-white font-extrabold">{usuario?.email}</p>
     </SidebarFooter>
    </Sidebar>
      <main className="w-full p-4">
        <div className="flex items-center mb-6">

          <SidebarTrigger  /> 
          <h1 className="text-2xl font-bold">Nossos Produtos</h1>
        </div>

      
        <div className="flex flex-row  gap-5">
          {produtosData?.produtos?.map((item) => (
            <ProdutosCard key={item.id} produto={item} />
          ))}
        </div>
      </main>
    </SidebarProvider>
  );
}