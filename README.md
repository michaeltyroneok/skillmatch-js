# SkillMatch JS

Simulador de compatibilidade entre o perfil de uma pessoa candidata e vagas fictícias de Front-End Júnior. O projeto foi feito em JavaScript puro e apresenta o resultado no console.



## O que o sistema faz

- Representa o perfil da pessoa candidata com nome, área de interesse, experiência e habilidades.
- Carrega três vagas fictícias por meio de uma Promise com atraso simulado.
- Calcula o percentual de compatibilidade de cada vaga.
- Classifica cada resultado como Alta, Média ou Baixa compatibilidade.
- Lista as habilidades que faltam para cada vaga.
- Identifica a vaga com maior percentual.
- Recomenda estudos com base nas habilidades faltantes.
- Exibe o relatório no console e trata erros no carregamento simulado.

## Como executar

1. Instale o [Node.js](https://nodejs.org/) caso ainda não esteja instalado.
2. Abra a pasta do projeto no VS Code.
3. Abra o terminal integrado do VS Code.
4. Execute `node --version` para confirmar que o Node.js está disponível.
5. Execute `node skillmatch.js` no terminal.
6. Aguarde aproximadamente meio segundo e leia o relatório impresso no terminal.

Não é necessário instalar bibliotecas ou executar `npm install`.

## Regra de cálculo da compatibilidade

O percentual é calculado dividindo o número de requisitos da vaga que aparecem na lista de habilidades do candidato pelo total de requisitos da vaga e multiplicando por 100. O resultado é arredondado para um número inteiro.

**Fórmula:** `(requisitos atendidos / total de requisitos) * 100`.

Todas as vagas usam a mesma regra. Para evitar diferenças de escrita, os nomes das habilidades são comparados exatamente; por isso, os nomes usados nas listas precisam ser consistentes.

## Classificação

- **80% a 100%:** Alta compatibilidade.
- **50% a 79%:** Média compatibilidade.
- **0% a 49%:** Baixa compatibilidade.

## Critério da recomendação de estudo

O sistema conta quantas vezes cada habilidade aparece como requisito faltante nas vagas analisadas. Habilidades que faltam em pelo menos duas vagas são priorizadas. Se nenhuma habilidade atender a esse critério, o sistema recomenda a primeira habilidade faltante encontrada. Essa é uma sugestão baseada apenas nos dados fictícios, não uma avaliação profissional de contratação.

## Conceitos de JavaScript utilizados

- `const` e `let`: declaração de valores e variáveis.
- `var`: não é necessário para a lógica principal deste projeto. É uma forma antiga de declarar variáveis; tem escopo de função, enquanto `let` e `const` têm escopo de bloco. Por isso, o projeto prioriza `const` e `let` conforme ensinado em aula.
- Strings, números, booleanos, arrays e objetos.
- `if/else`, operadores lógicos e matemáticos.
- Laços/iterações: `forEach` e métodos de array.
- Funções tradicionais e arrow functions.
- Métodos de array: `map`, `filter`, `find`, `reduce` e `flatMap`.
- Classes, construtores, atributos, métodos e `this`.
- Herança com `extends` e `super`: `VagaFrontEnd` especializa `Vaga` adicionando a modalidade e um resumo próprio.
- Callback: `processarVagas` recebe uma função para analisar cada vaga.
- Closure: `criarContadorRelatorios` mantém o contador dentro de seu escopo.
- Promise e `async/await`: simulam o carregamento assíncrono das vagas.
- `try/catch`: trata uma possível falha no carregamento.

## Internet e arquitetura cliente-servidor

A internet conecta dispositivos e sistemas por meio de redes e protocolos. Em uma aplicação cliente-servidor, o cliente solicita dados e um servidor os fornece por uma rede, normalmente usando HTTP/HTTPS. Neste mini-projeto não existe servidor real nem chamada de API: `carregarVagas()` usa uma Promise e `setTimeout` para **simular** uma espera de carregamento. Portanto, a demonstração não consulta a internet nem dados externos.

## Ferramentas e extensões

- **VS Code:** editor recomendado para desenvolver e executar o projeto.
- **Node.js:** executa JavaScript fora do navegador.
- **Git e GitHub:** versionamento e publicação do repositório.
- **GitHub Desktop:** opcional para facilitar commits, branches e envio ao GitHub.
- **Extensão recomendada:** Prettier – Code formatter, para formatar o código. Nenhuma extensão do VS Code é necessária para executar o programa.

## Estrutura

```text
skillmatch-js/
├── skillmatch.js
├── README.md
└── planejamento/
    └── tarefas-kanban.md
```



## Limitações e melhorias futuras

Atualmente, o SkillMatch JS é um projeto educacional executado no terminal, com perfil e vagas definidos diretamente no código.

Possíveis evoluções do projeto:
- Permitir o cadastro de diferentes perfis profissionais.
- Buscar vagas a partir de uma fonte de dados externa.
- Melhorar a comparação entre habilidades equivalentes.
- Criar uma interface visual para apresentar os resultados.
- Implementar testes automatizados para validar os cálculos de compatibilidade.