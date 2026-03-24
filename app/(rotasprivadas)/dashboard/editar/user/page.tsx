import { obterUsuarioDoCookie, verificaProdutor } from "@/app/(server)/RotaProdutor"
import { FormAtualizarUser } from "@/componentsSite/FormAtualzarUser"

export default async  function  UserEditar(){
    const usuario = await obterUsuarioDoCookie()

    const produtor =await verificaProdutor()
    
    return(<>
     <FormAtualizarUser produtor={produtor} usuario={usuario}/>
</>
)
}