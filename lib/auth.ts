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