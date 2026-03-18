
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import {Button} from"@/components/ui/button"
import Link from "next/link";

export default function ProdutosCard({produto}){
  
     return (
        
     <>
     <Card className=" w-100 h-auto max-w-md min-h-70 bg-green-800 border-none flex flex-col items-center p-4 ">
        <div className="flex justify-center pt-2 flex-col">      
          <CardHeader className="w-full justify-center items-center pt-2">
            <CardTitle className="text-center text-white text-xl md:text-1xl font-extrabold whitespace-nowrap " >
                {produto.titulo}</CardTitle>
                <div className="flex justify-center w-full h-45 rounded-3xl bg-white overflow-hidden relative">
                <Image 
              src={`https://vnzgvgqnhatawhbtexvh.supabase.co/storage/v1/object/public/produtos/${produto.imageUrl}`}
              alt="Descrição da imagem"
              width={150}
              height={150}
              className="object-contain justify-center w-full h-auto flex rounded-3xl"
            />
            </div>
           <CardDescription>
            <h4 className="text-white font-extrabold pt-2">Preço: R$ {produto.preco.toString()}</h4>
             <h4 className="text-white font-extrabold">Unidade: {produto.unit}</h4>
            
           </CardDescription>
            <Link href={`/dashboard/ver_produto/${produto.id}`} >
             <Button type="submit"  className="mbs-4  w-70 h-10 md:5 cursor-pointer  backdrop-grayscale justify-center bg-white text-green-800 font-extrabold "> 
                Ver 
             </Button>
          </Link>
          </CardHeader>
      </div>
        </Card>
     
     
     </>);
}