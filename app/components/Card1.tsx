
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
export function Card1() {
  return (
    <Card className="mx-auto w-90 h-70 max-w-md bg-green-800 border-none flex flex-col items-center p-4">
    <div className="flex justify-center pt-2 flex-col">
        <Image 
          src="/card1_imagem.png" 
          alt="Descrição da imagem"
          width={200}
          height={200}
          className="object-contain justify-center flex "
        />
    
      <CardHeader className="w-full justify-center items-center pt-2">
        <CardTitle className="text-center text-white text-xl md:text-1xl font-extrabold whitespace-nowrap " >AJUDE PRODUTORES LOCAIS</CardTitle>
      </CardHeader>
  </div>
    </Card>
  )
}
