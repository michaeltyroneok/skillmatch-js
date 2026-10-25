

const candidato = {
  nome: "Michael Graham", 
  areaInteresse: "Desenvolvimento Front-End",
  experiencia: "Em aprendizado / projetos de estudo",
  disponivelParaTrabalho: true,
  habilidades: [
    "HTML",
    "CSS",
    "JavaScript básico",
    "Variáveis e tipos de dados",
    "Condicionais",
    "Laços de repetição",
    "Funções",
    "Arrays",
    "Métodos de array",
    "Objetos",
    "Git e GitHub"
  ]
};

// Classe base para representar uma vaga.
class Vaga {
  constructor(empresa, cargo, requisitos) {
    this.empresa = empresa;
    this.cargo = cargo;
    this.requisitos = requisitos;
  }

  resumo() {
    return `${this.cargo} na empresa ${this.empresa}`;
  }
}

// Herança: a vaga de Front-End acrescenta a modalidade de trabalho.


class VagaFrontEnd extends Vaga {
  constructor(empresa, cargo, requisitos, modalidade) {
    super(empresa, cargo, requisitos);
    this.modalidade = modalidade;
  }

  resumo() {
    return `${super.resumo()} (${this.modalidade})`;
  }
}


const vagasDisponiveis = [
  new VagaFrontEnd(
    "Pixel Norte",
    "Pessoa Desenvolvedora Front-End Júnior",
    ["HTML", "CSS", "JavaScript básico", "Condicionais", "Funções"],
    "Híbrido"
  ),
  new VagaFrontEnd(
    "Web Horizonte",
    "Pessoa Desenvolvedora Web Júnior",
    ["HTML", "CSS", "JavaScript básico", "Arrays", "Métodos de array", "Objetos", "Git e GitHub"],
    "Remoto"
  ),
  new VagaFrontEnd(
    "Nuvem Criativa",
    "Estágio em Front-End",
    ["HTML", "CSS", "JavaScript básico", "Laços de repetição", "Funções", "Promises", "React"],
    "Presencial"
  )
];


function criarContadorRelatorios() {
  let totalRelatorios = 0;

  return function contarRelatorio() {
    totalRelatorios++;
    return totalRelatorios;
  };
}

const contarRelatorio = criarContadorRelatorios();


function carregarVagas() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Array.isArray(vagasDisponiveis) && vagasDisponiveis.length > 0) {
        resolve(vagasDisponiveis);
      } else {
        reject(new Error("Não foi possível carregar as vagas simuladas."));
      }
    }, 500);
  });
}

function calcularCompatibilidade(perfil, vaga) {
  if (vaga.requisitos.length === 0) {
    return 0;
  }

  const habilidadesPossuidas = vaga.requisitos.filter((requisito) =>
    perfil.habilidades.includes(requisito)
  );

  return Math.round((habilidadesPossuidas.length / vaga.requisitos.length) * 100);
}

function classificarCompatibilidade(percentual) {
  if (percentual >= 80) {
    return "Alta compatibilidade";
  } else if (percentual >= 50) {
    return "Média compatibilidade";
  } else {
    return "Baixa compatibilidade";
  }
}

function analisarVaga(perfil, vaga) {
  const percentual = calcularCompatibilidade(perfil, vaga);
  const habilidadesFaltantes = vaga.requisitos.filter(
    (requisito) => !perfil.habilidades.includes(requisito)
  );

  return {
    vaga: vaga,
    percentual: percentual,
    classificacao: classificarCompatibilidade(percentual),
    habilidadesFaltantes: habilidadesFaltantes
  };
}


function processarVagas(vagas, callback) {
  return vagas.map((vaga) => callback(vaga));
}

function gerarRecomendacao(analises) {
  // Conta quantas vezes cada habilidade aparece como requisito faltante.
  const frequenciaHabilidades = analises
    .flatMap((analise) => analise.habilidadesFaltantes)
    .reduce((frequencias, habilidade) => {
      frequencias[habilidade] = (frequencias[habilidade] || 0) + 1;
      return frequencias;
    }, {});

  const habilidadesPrioritarias = Object.entries(frequenciaHabilidades)
    .filter((item) => item[1] >= 2)
    .map((item) => item[0]);

  if (habilidadesPrioritarias.length > 0) {
    return `Priorize estudar: ${habilidadesPrioritarias.join(", ")}. Essas habilidades aparecem como requisito faltante em pelo menos duas vagas.`;
  }

  const primeiraHabilidadeFaltante = analises.find(
    (analise) => analise.habilidadesFaltantes.length > 0
  );

  if (primeiraHabilidadeFaltante) {
    return `Comece por estudar: ${primeiraHabilidadeFaltante.habilidadesFaltantes[0]}. É uma habilidade que falta em uma das vagas analisadas.`;
  }

  return "Todas as habilidades exigidas foram encontradas no perfil. Revise os conhecimentos e continue praticando.";
}

function exibirRelatorio(perfil, analises) {
  console.log("========================================");
  console.log("SKILLMATCH JS — RELATÓRIO DE COMPATIBILIDADE");
  console.log("========================================");
  console.log(`Candidato: ${perfil.nome}`);
  console.log(`Área de interesse: ${perfil.areaInteresse}`);
  console.log(`Experiência: ${perfil.experiencia}`);
  console.log(`Disponível para oportunidades: ${perfil.disponivelParaTrabalho ? "Sim" : "Não"}`);
  console.log("Habilidades informadas:");
  for (let i = 0; i < perfil.habilidades.length; i++) {
    console.log(`- ${perfil.habilidades[i]}`);
  }

  analises.forEach((analise, indice) => {
    console.log("\n----------------------------------------");
    console.log(`Vaga ${indice + 1}: ${analise.vaga.resumo()}`);
    console.log(`Compatibilidade: ${analise.percentual}%`);
    console.log(`Classificação: ${analise.classificacao}`);
    console.log(
      `Habilidades faltantes: ${analise.habilidadesFaltantes.length > 0 ? analise.habilidadesFaltantes.join(", ") : "Nenhuma"}`
    );
  });

  
  const maiorPercentual = Math.max(...analises.map((analise) => analise.percentual));
  const melhorVaga = analises.find((analise) => analise.percentual === maiorPercentual);

  console.log("\n========================================");
  console.log("MELHOR COMPATIBILIDADE");
  console.log(`${melhorVaga.vaga.resumo()} — ${melhorVaga.percentual}%`);
  console.log("\nRECOMENDAÇÃO DE ESTUDO");
  console.log(gerarRecomendacao(analises));
  console.log(`\nRelatórios gerados nesta execução: ${contarRelatorio()}`);
  console.log("========================================");
}


async function iniciarSkillMatch() {
  try {
    console.log("Carregando vagas simuladas...");
    const vagas = await carregarVagas();
    const analises = processarVagas(vagas, (vaga) => analisarVaga(candidato, vaga));
    exibirRelatorio(candidato, analises);
  } catch (erro) {
    console.error("Ocorreu um erro ao iniciar o SkillMatch:", erro.message);
  }
}

iniciarSkillMatch();
