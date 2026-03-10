🌾 Terra Nossa: Vitrine da Agricultura Familiar e Comércio Local
O TerraLocal é uma plataforma Full Stack desenvolvida para conectar pequenos agricultores e comerciantes locais diretamente com o consumidor final. O projeto visa fortalecer a economia regional e incentivar o consumo de produtos frescos e artesanais através de uma vitrine digital inteligente.

🚀 Tecnologias Utilizadas
Este projeto utiliza as tecnologias mais modernas do ecossistema JavaScript para garantir escalabilidade e performance:

Frontend: Next.js (App Router), React, Tailwind CSS.

Backend: Node.js, Prisma ORM v7.

Banco de Dados: PostgreSQL hospedado no Supabase.

Infraestrutura: Docker para containerização.

Linguagem: TypeScript para tipagem estática e segurança.

🛠️ Funcionalidades Principais
Perfil do Produtor: Cadastro detalhado de agricultores e artesãos locais.

Vitrine Digital: Listagem de produtos com categorias, preços e disponibilidade.

Sistema de Avaliação: Feedback dos consumidores para gerar confiança na comunidade.

Filtros Inteligentes: Busca por tipo de produto ou proximidade.

Dashboard Administrativo: Gestão de inventário e pedidos para o comerciante.

🏗️ Arquitetura do Banco de Dados
O banco de dados foi modelado para suportar relações complexas entre usuários e produtos:

User: Gerencia autenticação e perfis básicos.

Produtor: Extensão do usuário com dados específicos do negócio local.

Produto: Itens cadastrados vinculados a um produtor.

Avaliação: Relação entre usuários e produtos para controle de qualidade.