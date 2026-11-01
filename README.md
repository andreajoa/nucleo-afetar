# Programa Núcleo Afetar

Website institucional em português brasileiro, com foco em acolhimento, aprendizagem e acesso social. Projeto em **Next.js App Router + TypeScript + CSS**, preparado para exportação estática (`out/`) e publicação em Cloudflare Pages, GitHub Pages com ajustes de basePath, hosting estático, ou plataformas compatíveis.

## Início rápido

```bash
npm install
npm run dev
```

Acesse http://localhost:3000.

```bash
npm run check
npm run build
```

## Publicação

1. Configure o domínio público definitivo em `NEXT_PUBLIC_SITE_URL`, por exemplo `https://www.dominio-oficial.org.br`, **antes do build** para metadata, sitemap e robots corretos.
2. (Opcional) Defina `NEXT_PUBLIC_WHATSAPP_NUMBER` com o número institucional autorizado, apenas dígitos, com `55` + DDD + telefone. Sem essa variável, o formulário funciona localmente: monta uma mensagem que o visitante copia e envia no Instagram profissional informado na documentação institucional.
3. Gere `npm run build`. A saída estática será criada em `out/`.
4. Para Cloudflare Pages: build command `npm run build`; output directory `out`; Node 20+ ou 22. Defina as variáveis no painel da plataforma.

## Estrutura e páginas

- `/` — apresentação, serviços, metodologia, equipe, FAQ e contato.
- `/sobre` — história, missão, propósito social.
- `/servicos` — sete modalidades educativas.
- `/equipe` — biografias das três fundadoras.
- `/contato` — pré-contato sem envio/armazenamento de dados no servidor.
- `/perguntas-frequentes` — FAQ.
- `/conteudos` — três artigos externos fornecidos no conteúdo institucional.
- `/privacidade`, `/termos-de-uso`, `/cookies`, `/acessibilidade` — páginas de transparência.
- `/sitemap.xml`, `/robots.txt`, `/icon.svg`, `/apple-icon.png` — SEO e identidade visual.

## Antes do lançamento público

**Pontos pendentes que precisam ser informados pela organização (não inventados):**

- Nome e identificação da pessoa jurídica responsável, se já formalizada, e registro aplicável/CNPJ quando pertinente.
- Contato institucional de privacidade, e-mail oficial, Instagram do projeto e/ou WhatsApp oficial.
- Cidade, endereço público e condições reais de disponibilidade e participação, se confirmados.
- Confirmação da política efetiva de privacidade de acordo com o provedor de hospedagem, logs, ferramentas e eventual tratamento posterior de dados de crianças.
- Revisão jurídica das páginas legais antes da entrada em produção, principalmente se forem adicionados sistemas de agendamento, analytics, pagamento e prontuários.

Nenhum depoimento, valor, disponibilidade, prazo ou credencial foi fabricado. O projeto não realiza cobrança online nem coleta informações sensíveis de crianças no formulário.

## Créditos visuais

Imagens fornecidas pela equipe: foto institucional das três integrantes, retrato de Margareth Almeida e logo em três versões. A implementação utiliza a versão 3 como referência visual do símbolo e do favicon, com uma versão vetorial simplificada para tamanhos pequenos. Não há alterações dos rostos.

## Acessibilidade e performance

Menu navegável por teclado, link de salto, foco visível, FAQ com estado semântico, alt em imagens, suporte a `prefers-reduced-motion`, imagens WebP compactadas, HTML estático e links internos reais. Confirme a qualidade final em dispositivos e leitores de tela antes da publicação definitiva.
