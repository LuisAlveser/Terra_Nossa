import { buscarProdutosPorID } from "@/app/(rotas)/RotaProtudos";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"
import { CircleUserRound, MapPin, Phone, User } from "lucide-react";
import Image from 'next/image';
import { Button } from "@/components/ui/button";

export default async function VerProdutos({ params }: { params: { id: number } }) {
    const { id } = await params;
    const produto_id = Number(id);
    const resposta = await buscarProdutosPorID(produto_id);
    const { produto } = resposta;

    if (!produto) return <div className="p-10 text-center">Produto não encontrado.</div>;

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                
               
                <div className="relative aspect-square overflow-hidden rounded-3xl bg-slate-100 border shadow-sm">
                    <Image
                        src={`https://vnzgvgqnhatawhbtexvh.supabase.co/storage/v1/object/public/produtos/${produto.imageUrl}`}
                        alt={produto.titulo}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                </div>

             
                <div className="flex flex-col gap-6">
                    <div>
                        <h1 className="text-4xl font-bold text-slate-900">{produto.titulo}</h1>
                        <p className="text-3xl font-semibold text-green-700 mt-2">
                            R$ {produto.preco}
                        </p>
                    </div>

                    <Card className="border-none bg-slate-50 shadow-none">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <User className="w-5 h-5 text-green-700" />
                                Sobre o Produtor
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="font-bold text-slate-800">{produto.produtor.user.nome}</h3>
                                <p className="text-sm text-slate-600 leading-relaxed italic">
                                    "{produto.produtor.bio}"
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-3 text-sm border-t pt-4">
                                <div className="flex items-center gap-2 text-slate-700">
                                    <MapPin className="w-4 h-4 text-green-600" />
                                    <span>{produto.produtor.cidade} - {produto.produtor.endereco}</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-700">
                                    <Phone className="w-4 h-4 text-green-600" />
                                    <span>{produto.produtor.contato}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Button className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg">
                        Avaliar Produto
                    </Button>
                </div>
            </div>
        </div>
    );
}