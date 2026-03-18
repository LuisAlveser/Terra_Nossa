
import {buscarProdutosPorID,buscarProdutos}from "@/app/(rotas)/RotaProtudos"
import Produtos from "@/app/produtos/page";


export default async function Editar({ params }: { params: { id: number  } }){
    const { id } = await params;
    const produto_id=Number(id)
    const resultado=await buscarProdutosPorID(produto_id)
   
    const produtoSerializado = {
        ...resultado?.produto,
        preco: Number(resultado?.preco), 
        
       
    };
       
    return(<>
    <Produtos key={produto_id} produto={produtoSerializado}/>
    </>
    )
}

