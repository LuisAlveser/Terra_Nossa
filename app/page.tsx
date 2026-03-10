import { Card1 } from "./components/Card1";
import { Card2 } from "./components/Card2";
import { Card3 } from "./components/Card3";


export default function Home() {
  return (
    <>
    <div className=" flex justify-center h_screen  justify-items-center ">
      <h1 className="text-green-800 text-3xl md:text-5xl lg:text-4xl pt-5 md:pt-10 px-4 text-center font-extrabold ">
        Encontre produtos o mais próximo de você
        </h1>
    </div>
       <div className=" pt-20 justify-center flex flex-row gap-2">
       <Card1/>
          <Card2/>
            <Card3/>
       </div>
    </>
  );
}
