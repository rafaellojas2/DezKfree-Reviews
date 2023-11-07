# DezKfree Reviews
Maneira fácil de exportar e filtrar feedbacks da Aliexpress e transformar-los em planlha (.xlsx) formatação feita seguindo as regras do template do aplicativo da Shopify Trustoo Reviews

## Instalção
Clone o repositório:

**`git clone https://github.com/rafaellojas2/dezkfree-reviews`**

Acesse o repositório:

**`cd ./dezkfree-reviews`**

Instale as dependências dentro do repositório:

**`npm install dezkfree-reviews`**

## Traduzir feedbacks com Google Cloud

A validação do Google Cloud serve para a execusão do Cloud Translation e assim traduzir os feedbacks

### Criar conta

1° **Crie uma conta no Google Cloud** (Necessário cartão de crédito ou débito para criar a conta, mas é liberado gratuitamente traduzir até 500 mil caracteres por mês, aparti disso é cobrado US$20 por milhão. A média de caracteres a cada 100 feedbacks é de 50 caracteres, logo uma conta da Google Cloud consegue por mês traduzir aproximadamente 10 mil feedbacks. 10k free): 

Consulte os preços: https://cloud.google.com/translate/pricing

Crie a conta: **https://console.cloud.google.com/freetrial**

3° **Crie um projeto** com o nome "traduzir-feedback": **https://console.cloud.google.com/projectcreate**

4° **Ative a API Cloud Translation** para esse projeto: **https://console.cloud.google.com/apis/library/translate.googleapis.com**

### Validar conta

1° **Instale o SDK Google Cloud** no seu computador: **https://cloud.google.com/sdk/docs/install**

2° **Faça o login** com sua conta da Google Cloud:

**`gcloud auth application-default login`**

3° **Valide seu projeto**:

**`gcloud auth application-default set-quota-project traduzir-feedback`**

# Funções
**Você pode alterar várias configurações e filtros como:**
- Selecionar a quantidade máxima de feedbacks
- Gerar feedbacks falsos com a quantidade de estrelas que quiser
- Extrair apenas feedbacks brasileiros
- Extrair apenas feedbacks que tenham fotos
- Excluir imagem e comentários de feedbacks negativos
- Restringir quantidade de feedback por nota
- Todos os comentários são traduzidos para pt-BR
- Nomes e sobrenomes gerados são brasileiros

# Como configurar

Acesse o arquivo `./dezkfree-reviews/main/start.js` e edite os filtros e as configurações para suas prefêrencias

O arquivo possui comentários explicado a função de cada váriavel

# Inicialização

Ao iniciar o comando `npm start` automáticamente o produto será pesquisado na Aliexpress, seus feedbacks serão extraidos e o arquivo .xlxs começará a ser gerado

Abra o CMD e através dele acesse a pasta criada `./dezkfree-reviews`, logo depois execute o comando:

**`npm start`**
