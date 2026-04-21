# 📐 GeiGebra - Calculadora de Funções

<div align="center">

![GeiGebra Logo](./src/assets/img/logo-completa-geigebra.png)

**Uma ferramenta interativa para visualizar e analisar funções matemáticas**

[🚀 Acessar Aplicação](https://geigebra.netlify.app/) • [📝 Reportar Bug](https://github.com/devjuvenilson/calculadora-funcao/issues) • [💡 Sugerir Feature](https://github.com/devjuvenilson/calculadora-funcao/discussions)

</div>

---

## 🎯 Sobre o Projeto

**GeiGebra** é uma calculadora de funções online desenvolvida para ajudar **estudantes de ensino médio e superior** a visualizar, compreender e validar seus cálculos matemáticos de forma rápida e intuitiva.

Com uma interface amigável e integração com o **Desmos Graph API**, a aplicação permite que os usuários:
- Visualizem gráficos de funções em tempo real
- Calculem raízes de diversas funções como do 1º e 2º grau
- Explorem comportamentos de funções interativamente
- Validem respostas de tarefas e provas

---

## ✨ Principais Funcionalidades

✅ **Calculadora de Funções do 1º Grau** - Resolva equações lineares e visualize o comportamento

✅ **Calculadora de Funções do 2º Grau** - Encontre vértices, raízes e represente parábolas

✅ **Gráficos Interativos** - Visualização dinâmica com o Desmos Calculator

✅ **Interface Responsiva** - Acesso completo em desktop, tablet e mobile

✅ **Cálculos Instantâneos** - Resultados em tempo real conforme digita

✅ **Design Intuitivo** - UX pensada para estudantes

---

## 🛠️ Stack Tecnológico

| Tecnologia | Uso |
|-----------|-----|
| **React 19** | Framework principal |
| **React DOM 19** | Renderização de componentes |
| **Desmos API v1.8** | Gráficos matemáticos interativos |
| **CSS3** | Estilização e responsividade |
| **JavaScript ES6+** | Lógica da aplicação |

---

## 🚀 Como Usar

### Opção 1: Acessar Online (Recomendado)

Visite **[geigebra.netlify.app](https://geigebra.netlify.app/)** e comece a usar imediatamente!

### Opção 2: Executar Localmente

#### Pré-requisitos
- Node.js v14+ instalado
- npm ou yarn

#### Instalação

```bash
# Clone o repositório
git clone https://github.com/devjuvenilson/calculadora-funcao.git
cd calculadora-funcao

# Instale as dependências
npm install

# Configure as variáveis de ambiente
# Crie um arquivo .env na raiz do projeto:
echo "REACT_APP_DESMOS_API_KEY=sua_chave_aqui" > .env

# Inicie o servidor de desenvolvimento
npm start
```

A aplicação abrirá em `http://localhost:3000`

#### Build para Produção

```bash
npm run build
```

O bundle otimizado será gerado na pasta `build/`

---

## 📦 Estrutura do Projeto

```
calculadora-funcao/
├── public/
│   └── index.html              # HTML principal
├── src/
│   ├── components/
│   │   ├── FuncaoPrimeiroGrau/ # Calculadora de funções lineares
│   │   ├── FuncaoSegundoGrau/  # Calculadora de funções quadráticas
│   │   ├── DesmosGraph/        # Integração com Desmos API
│   │   ├── BotaoCalcular/      # Componente de botão reutilizável
│   │   └── CopyButton/         # Botão de cópia de resultados
│   ├── pages/
│   │   └── Home/               # Página principal
│   ├── services/
│   │   └── FormulaRender.jsx    # Renderização de fórmulas matemáticas
│   ├── assets/                 # Imagens e ícones
│   └── index.js                # Ponto de entrada
├── .env                        # Variáveis de ambiente (não commitar)
├── package.json
└── README.md
```

---

## 🔒 Segurança

A API Key do Desmos é carregada dinamicamente através de variáveis de ambiente (`REACT_APP_DESMOS_API_KEY`), garantindo:

- ✅ Proteção da chave em repositórios públicos
- ✅ Diferentes chaves para ambientes de dev e produção
- ✅ Carregamento seguro em tempo de build

**Nunca** commite o arquivo `.env` com valores reais. Use `.env.example` como template.

---

## 🤝 Como Contribuir

Adoraríamos sua contribuição! Para contribuir:

1. **Fork** o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um **Pull Request**

### Diretrizes
- Código limpo e bem comentado
- Testes para novas funcionalidades
- Siga o padrão de estilo do projeto
- Atualize o README se necessário

---

## 📋 Roadmap

- [ ] Funções trigonométricas (sen, cos, tan)
- [ ] Exportação de gráficos (PNG/PDF)
- [ ] Modo escuro
- [ ] Suporte multilíngue

---

## 🐛 Reportar Bugs

Encontrou um bug? Abra uma [issue](https://github.com/devjuvenilson/calculadora-funcao/issues) com:
- Descrição clara do problema
- Passos para reproduzir
- Screenshots (se aplicável)
- Ambiente (SO, navegador, versão)

---

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 👨‍💻 Desenvolvedor

Desenvolvido para a comunidade estudantil

**Contato & Redes:**
- GitHub: [@DevJuvenilson](https://github.com/DevJuvenilson)
- LinkedIn: [Juvenilson](https://linkedin.com/in/juvenilsondaniel)

---

<div align="center">

**⭐ Se este projeto foi útil, considere dar uma estrela!**

</div>