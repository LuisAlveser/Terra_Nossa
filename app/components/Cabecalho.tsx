
import Image from 'next/image'
export default function Cabecalho(){
    return(
     <header className=" h-15 items-center bg-green-800 flex flex-row ">
    <Image className=' ml-5 justify-center '
      src="/Terra_Nossa_logo.png" 
      alt="Descrição da imagem"
      width={60}
      height={60}

      />
    <h1 className="text-3xl  pt-2 ml-3 font-extrabold justify-center">Terra Nossa </h1>
     </header>
    );
}