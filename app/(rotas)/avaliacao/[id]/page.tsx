

import FormAvaliacao from "@/componentsSite/FormAvaliacao";

export default async function Avaliacao({ params }: { params: { id: number }}){

   const { id } = await params;
    const produto_id = Number(id);

 

 
  
    return(
       <FormAvaliacao params={{
            id:produto_id
        }} />
    )
}