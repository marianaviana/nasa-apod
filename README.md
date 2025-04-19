# 🌌 NASA APOD - Imagem astronômica do Dia

![GitHub Actions](https://img.shields.io/github/actions/workflow/status/marianaviana/nasa-apod/update.yml?label=Daily%20Update)
![GitHub last commit](https://img.shields.io/github/last-commit/marianaviana/nasa-apod)
![GitHub repo size](https://img.shields.io/github/repo-size/marianaviana/nasa-apod)

Um projeto automatizado que exibe diariamente a incrível "Astronomy Picture of the Day" (APOD) da NASA, com tradução para português e histórico visual.

[▶️ Acesse a Página](https://mariviana.dev/nasa-apod) | [📋 Veja o Código Fonte](https://github.com/marianaviana/nasa-apod)

## ✨ Funcionalidades

- 🚀 **Atualização automática diária** via GitHub Actions
- 🌎 **Tradução para português** integrada
- 🖼️ Exibição de imagens e vídeos astronômicos
- 📅 Histórico das últimas 30 APODs
- 🔍 Informações detalhadas sobre cada foto
- 📱 Design responsivo para todos os dispositivos

## 🛠️ Tecnologias Utilizadas

<p align="center">
  <img src="https://skillicons.dev/icons?i=html,css,js,github,git" alt="Tecnologias" />
</p>

## ⚡ Como Funciona

1. **Automação Diária**:
   - GitHub Actions roda à meia-noite UTC
   - Busca a imagem/vídeo do dia da NASA API
   - Traduz automaticamente para português
   - Atualiza o arquivo JSON e faz commit

2. **Frontend**:
   - Exibe a imagem/vídeo do dia
   - Mostra explicação traduzida
   - Armazena histórico visual

## 🖥️ Pré-visualização
[▶️ Acesse a Página](https://mariviana.dev/nasa-apod)

# Clone o repositório
```bash
git clone https://github.com/marianaviana/nasa-apod.git
```
# Instale as dependências (para desenvolvimento)
```bash
npm install
```
# Inicie o servidor local
```bash
npx serve
```

# 🔑 Guia de Configuração de Chaves API

## 1. Obtenção da NASA API Key

### Passo a Passo:
1. Acesse: [https://api.nasa.gov/](https://api.nasa.gov/)
2. Preencha o formulário rápido:
   - Nome
   - Sobrenome
   - Email válido
3. Clique em "Sign Up"

### O que você receberá:
- Uma chave no formato: `DEMO_KEY` (para testes)
- Um email com sua chave pessoal (ex: `AbC123dEfG456HiJ789KlMnOpQrStUvWxYz`)

### Limites:
- `DEMO_KEY`: 30 requisições/hora por IP
- Chave pessoal: 1.000 requisições/hora

---

## 2. Criação do Personal Access Token (GitHub)

### Passo a Passo:
1. Acesse: [https://github.com/settings/tokens](https://github.com/settings/tokens)
2. Clique em "Generate new token" → "Generate new token (classic)"
3. Configure:
   - **Note**: "NASA APOD Auto-Commits"
   - **Expiration**: Recomendo "No expiration"
   - **Scopes**: Marque `repo` (controle total de repositórios privados)

4. Clique em "Generate token"
5. **Copie o token** (aparece apenas uma vez!)

---

## 3. Configuração no GitHub Secrets

### Para NASA API Key:
1. No seu repositório, vá em:
   - `Settings` → `Secrets and variables` → `Actions`
2. Clique em `New repository secret`
3. Preencha:
   - **Name**: `NASA_API_KEY`
   - **Secret**: Cole sua chave da NASA

### Para Personal Token:
1. Repita o processo acima com:
   - **Name**: `MY_PERSONAL_TOKEN`
   - **Secret**: Cole o token do GitHub

---

## 4. Utilização no Workflow

Exemplo do `.github/workflows/update.yml`:

```yaml
jobs:
  update-apod:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          token: ${{ secrets.MY_PERSONAL_TOKEN }}

      - name: Fetch APOD data
        env:
          NASA_API_KEY: ${{ secrets.NASA_API_KEY }}
        run: node scripts/fetch-data.js
```
## 5. Boas Práticas de Segurança ⚠️

1. Nunca comite chaves diretamente no código
2. Não compartilhe suas chaves publicamente
3. Revogue tokens comprometidos imediatamente
4. Use segredos de ambiente para testes locais:

---
## 🤝 Contribuindo

Contribuições são bem-vindas! Siga estes passos:

1. Faça um fork do projeto
2. Crie uma branch (Ex.: `git checkout -b feature/incrivel`)
3. Commit suas mudanças (Ex.: `git commit -m 'Add incrível feature'`)
4. Push para a branch (Ex.: `git push origin feature/incrivel`)
5. Abra um Pull Request

## 📜 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

<p align="center">
Feito com ❤️ por <a href="https://github.com/marianaviana">Mariana Viana</a> | Dados fornecidos pela <a href="https://api.nasa.gov/">NASA API</a>
</p>

---

### 🌟 Recursos Adicionais

- [NASA APOD API Documentation](https://github.com/nasa/apod-api)
- [LibreTranslate](https://libretranslate.com/)
- [GitHub Actions Docs](https://docs.github.com/pt/actions)
