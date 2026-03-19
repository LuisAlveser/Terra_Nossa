
import {buscarProdutosPorID,buscarProdutos}from "@/app/(server)/RotaProtudos"
import FormProdutos from "@/componentsSite/FormProdutos";


export default async function Editar({ params }: { params: { id: number  } }){
    const { id } = await params;
    const produto_id=Number(id)
    const resultado=await buscarProdutosPorID(produto_id)
  
   if (!resultado || !resultado.produto) {
        return(<div>Produto não encontrado</div>)
    }
       
    const produtoSerializado = {
        id: resultado.produto.id,
        titulo: resultado.produto.titulo,
        descricao: resultado.produto.descricao,
        categoria: resultado.produto.categoria,
        imageUrl: resultado.produto.imageUrl??"",
        unit: resultado.produto.unit,
       
        preco: Number(resultado.produto.preco), 
    };
    
    return(<>
    <FormProdutos key={produto_id} produto={produtoSerializado}/>
    </>
    )
}

