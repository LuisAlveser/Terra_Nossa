import z from "zod"

export const cadastroShema=z.object({
   nome:z.string().min(3,"O nome deve ter mais caracteres").max(10),
   email:z.email("Digite um email válido"),
   senha:z.string().min(5,"A senha deve ter mais digitos")
});

export const loginShema=z.object({
   email:z.email(),
   senha:z.string().min(5,"A senha deve ter mais digitos")
});

export const produtorShema=z.object({
    bio:z.string().min(3,"A biografia deve ser mais caracteres"),
    contato:z.string().min(6,"Contato inválido"),
    endereco:z.string().min(3,"Endereço inválido"),
    estado:z.string().min(2,"Estado inválido"),
    cidade:z.string().min(2,"Cidade inválida")
})
export const produtoShema=z.object({
    titulo:z.string().min(3,"A biografia deve ser mais caracteres"),
    descricao:z.string().min(6,"Contato inválido"),
    preco:z.coerce.number().positive("O preço deve ser maior que zero").min(2,"Digite um valor válido"),
    unit:z.coerce.string().min(1,"Unidade  inválida").max(20,"Unidade inválida"),
    categoria:z.string().min(2,"Categoria inválida"),
    imageUrl:z.any().optional()
})

export const avaliacaoShema=z.object({
    comentario:z.string().min(6,"Contato inválido").max(30,"Limite de caracteres atingido"),
    nota:z.string(),
  
})
export const produtorAtualizadoShema = z.object({
    nome: z.string().min(3, "O nome deve ter mais caracteres").max(20),
    email: z.string().email("Digite um email válido"), // Corrigido: z.string().email()
    bio: z.string().min(3, "A biografia deve ter mais caracteres").max(50).or(z.literal("")).optional(),
    contato: z.string().min(6, "Contato inválido").or(z.literal("")).optional(),
    endereco: z.string().min(3, "Endereço inválido").or(z.literal("")).optional(),
    estado: z.string().min(2, "Estado inválido").or(z.literal("")).optional(),
    cidade: z.string().min(2, "Cidade inválida").or(z.literal("")).optional()
});