/** Catalogue de page : portugais (variante brésilienne). Clés : voir page-i18n.ts. */

import type { PageCatalog } from "./page-i18n.ts";

export const pt: Partial<PageCatalog> = {
  "common.langs": "Idioma",
  "common.footerNav": "Rodapé",
  "common.privacy": "Privacidade",
  "common.source": "Código-fonte",

  "home.title": "Converter arquivos TCX, GPX ou FIT em CSV para o ChatGPT ou o Gemini — gps-digest",
  "home.description":
    "Ferramenta gratuita que transforma os arquivos do seu relógio GPS em um dossiê de treino legível por uma IA. Detecta a cinta cardíaca, calcula a deriva cardíaca, verifica se as séries foram cumpridas e projeta seus tempos. Tudo é calculado no seu navegador: nenhum arquivo é enviado.",
  "home.h1": "Faça uma IA analisar seus treinos de corrida",
  "home.og.description":
    "Os arquivos do seu relógio são grandes demais para uma IA. Esta ferramenta os transforma em um dossiê estruturado que ela consegue analisar de verdade.",
  "home.og.imageAlt": "Um arquivo de relógio GPS transformado em um dossiê de treino estruturado.",

  "home.ld.description":
    "Transforma arquivos de relógios GPS (TCX, GPX, FIT) em um dossiê de treino estruturado, analisável por um modelo de linguagem.",
  "home.ld.feature1": "Conversão de TCX, GPX e FIT para CSV estruturado",
  "home.ld.feature2": "Processamento integral no navegador, nenhum arquivo enviado",
  "home.ld.feature3": "Detecção do sensor de frequência cardíaca (cinta ou pulso)",
  "home.ld.feature4": "Deriva cardíaca com controle de validade",
  "home.ld.feature5": "Análise do cumprimento das séries",
  "home.ld.feature6": "Projeção de tempos para 5 km, 10 km, meia maratona e maratona",
  "home.ld.feature7": "Número ilimitado de arquivos",
  "home.ld.howto": "Fazer uma IA analisar seus treinos de corrida",
  "home.ld.step1.name": "Enviar seus arquivos",
  "home.ld.step1.text":
    "Arraste os arquivos TCX, GPX ou FIT exportados do seu relógio. Não há limite de quantidade.",
  "home.ld.step2.name": "Informar suas referências",
  "home.ld.step2.text": "Informe sua frequência cardíaca máxima medida e um tempo de prova recente.",
  "home.ld.step3.name": "Ler os avisos",
  "home.ld.step3.text":
    "A ferramenta sinaliza trocas de sensor cardíaco e treinos cuja frequência cardíaca não é confiável.",
  "home.ld.step4.name": "Copiar o dossiê para a IA",
  "home.ld.step4.text":
    "Copie o dossiê gerado e cole no ChatGPT, no Gemini ou no Claude junto com a sua pergunta.",
  "home.ld.faq1.q": "Por que meu arquivo TCX é grande demais para uma IA?",
  "home.ld.faq1.a":
    "Um TCX de uma hora gravado a 1 Hz pesa cerca de 1,7 MB, quase 90% de tags XML, ou seja, uns 533 mil tokens. Mesmo quando esse volume cabe na janela de contexto, o modelo raciocina mal: pede-se a ele uma análise de treino a partir de milhares de linhas de coordenadas brutas.",
  "home.ld.faq2.q": "Meus arquivos GPS são enviados para um servidor?",
  "home.ld.faq2.a":
    "Não. Todo o cálculo é feito no seu navegador. Nenhum arquivo passa por um servidor, o que você pode verificar na aba Rede. Um percurso GPS revela o endereço da sua casa com precisão de metros: a ferramenta recorta a largada e a chegada por padrão.",
  "home.ld.faq3.q": "Como saber se um treino foi gravado com cinta peitoral ou com o sensor de pulso?",
  "home.ld.faq3.a":
    "O arquivo quase nunca informa. A ferramenta deduz isso pela assinatura do sinal, cujo marcador mais característico é o travamento na cadência: o sensor óptico confunde o ritmo das passadas com os batimentos e mostra, por exemplo, 172 bpm em vez de 140. Uma cinta peitoral mede um sinal elétrico e não pode cometer esse erro.",
  "home.ld.faq4.q": "Dá para comparar a frequência cardíaca do pulso com a da cinta?",
  "home.ld.faq4.a":
    "Não. As duas tecnologias divergem bastante durante o esforço, e o sensor óptico piora quando a intensidade varia. Uma troca de sensor no meio de um período distorce em silêncio zonas, derivas e tendências. A ferramenta detecta essa troca, a data e analisa os dois períodos separadamente.",
  "home.ld.faq5.q": "Qual é a confiabilidade de uma projeção de maratona?",
  "home.ld.faq5.a":
    "Baixa. Um estudo com 2.303 corredores amadores mostrou que a fórmula de Riegel é bem calibrada até a meia maratona, mas dá previsões de maratona pelo menos dez minutos rápidas demais para metade dos corredores. Um modelo baseado em um ou dois resultados reais de prova reduz o erro mais ou menos pela metade.",
  "home.ld.faq6.q": "A temperatura mostrada pelo meu relógio é a do ar?",
  "home.ld.faq6.a":
    "Não. O sensor fica no pulso e é aquecido pelo corpo: costuma superestimar de 3 a 8 °C. A ferramenta mostra o valor, mas sempre com este aviso, inclusive no dossiê enviado à IA.",

  "home.lede":
    "Os arquivos do seu relógio são grandes demais para o ChatGPT, o Gemini ou o Claude. Esta ferramenta os transforma em um dossiê de treino estruturado (ritmos, voltas, zonas, repetições, deriva cardíaca) que a IA consegue analisar de verdade.",
  "home.promise":
    "<strong>Seus arquivos não saem do seu navegador.</strong> Todo o cálculo é feito no seu aparelho, e você pode conferir isso na aba Rede. Um percurso GPS revela seu endereço com precisão de metros, por isso a largada e a chegada são recortadas por padrão. <a href=\"/{{locale}}/confidentialite.html\">O que sai, e o que nunca sai</a>.",
  "home.step1.title": "Envie seus arquivos",
  "home.step1.text": "Quantos quiser, em TCX, GPX ou FIT, exportados do seu relógio ou do Strava.",
  "home.step2.title": "Informe suas referências",
  "home.step2.text": "FC máxima e último tempo de prova. Sem eles, zonas e projeções ficam aproximadas.",
  "home.step3.title": "Leia os avisos",
  "home.step3.text": "Troca de sensor, FC pouco confiável: é deles que depende a validade do resto.",
  "home.step4.title": "Baixe o dossiê",
  "home.step4.text": "Um arquivo de texto completo e comentado, para colar no ChatGPT, no Gemini ou no Claude.",

  "home.why.title": "Por que usar esta ferramenta?",
  "home.why.p1":
    "Um arquivo TCX de uma hora gravado a 1 Hz pesa cerca de 1,7 MB, quase 90% de tags XML. São uns <strong>533 mil tokens</strong>. Mesmo quando esse volume cabe na janela de contexto, o modelo raciocina mal: pede-se a ele uma análise de treino a partir de milhares de linhas de coordenadas brutas.",
  "home.why.p2":
    "O dossiê gerado aqui tem algumas dezenas de milhares de tokens e contém objetos que um modelo sabe interpretar: parciais por quilômetro, voltas, tempo por zona, repetições uma a uma, melhores esforços, projeções. <strong>A análise fica melhor do que com o arquivo completo</strong>, e não só mais barata.",
  "home.why.tableTitle": "O que a ferramenta calcula sozinha",
  "home.why.colAnalysis": "Análise",
  "home.why.colAnswer": "O que ela responde",
  "home.why.sensor": "Fonte da FC",
  "home.why.sensorText":
    "Cinta peitoral ou sensor de pulso? O arquivo quase nunca informa. A ferramenta deduz isso pelo sinal, em especial pelo travamento na cadência, quando o relógio confunde as passadas com os batimentos.",
  "home.why.drift": "Deriva cardíaca",
  "home.why.driftText":
    "Seu rendimento cai na segunda metade do esforço? Acima de 5%, a resistência de base é o problema. A ferramenta se recusa a calcular deriva em treinos intervalados, onde o número não faria sentido.",
  "home.why.blocks": "Cumprimento das séries",
  "home.why.blocksText":
    "Suas repetições são regulares? O ritmo cai? A FC sobe com o ritmo mantido, sinal de fadiga antes de as pernas cederem?",
  "home.why.projections": "Projeção de tempos",
  "home.why.projectionsText":
    "5 km, 10 km, meia maratona, maratona, com margem e nível de confiabilidade. Um tempo de prova pesa mais que um esforço de treino, e seu peso diminui com o tempo.",
  "home.why.hardware": "Troca de equipamento",
  "home.why.hardwareText":
    "Ao longo de vários treinos, a ferramenta detecta e data uma troca de sensor cardíaco, que invalidaria em silêncio qualquer comparação de FC.",

  "home.set.title": "1. Suas referências",
  "home.set.intro":
    "Opcional, mas sem esses valores as zonas são estimadas pela FC máxima observada nos arquivos, o que é aproximado.",
  "home.set.fcmax": "FC máxima",
  "home.set.fcmaxHint": "Medida, não 220 menos a idade",
  "home.set.fcmaxPlaceholder": "ex. 185",
  "home.set.threshold": "Ritmo de limiar",
  "home.set.thresholdHint": "Mantido por cerca de 1 h",
  "home.set.refDist": "Tempo de referência",
  "home.set.refDistHint": "Distância",
  "home.set.refNone": "Nenhum",
  "home.set.ref5k": "5 km",
  "home.set.ref10k": "10 km",
  "home.set.refHalf": "Meia maratona",
  "home.set.refMarathon": "Maratona",
  "home.set.refTime": "Tempo",
  "home.set.refTimeHint": "h:mm:ss",
  "home.set.refDate": "Data da prova",
  "home.set.refDateHint": "Pondera a antiguidade",
  "home.set.privacy": "Recorte de privacidade",
  "home.set.privacyHint": "Metros na largada e na chegada",
  "home.set.weather": "Temperatura do ar",
  "home.set.weatherOn": "Buscar o clima real",
  "home.set.weatherOff": "Não enviar nada",
  "home.set.weatherHint":
    "Envia ao Open-Meteo o <strong>ponto médio</strong> do percurso, arredondado a ~1 km, e a data. Nunca sua largada, nunca seus dados.",

  "home.files.title": "2. Seus arquivos",
  "home.files.drop": "Solte seus arquivos aqui",
  "home.files.formats": "TCX, GPX ou FIT, quantos quiser, uma temporada inteira se precisar",
  "home.files.fit":
    "O FIT é o formato nativo do seu relógio: é o único que traz os comprimentos de piscina e o sensor cardíaco realmente pareado.",
  "home.files.pick": "Escolher arquivos",

  "home.export.title": "3. Seu dossiê, pronto para análise",
  "home.export.intro":
    "As janelas de contexto atuais comportam tranquilamente 100 mil tokens, então a configuração padrão privilegia o detalhe. Desça um nível se o seu modelo for mais limitado ou se você carregar muitos treinos.",
  "home.export.resolution": "Detalhe do registro",
  "home.export.res5s": "Um ponto a cada 5 s (máximo)",
  "home.export.res10s": "Um ponto a cada 10 s (recomendado)",
  "home.export.res30s": "Um ponto a cada 30 s (leve)",
  "home.export.res100m": "Um ponto a cada 100 m",
  "home.export.res10m": "Um ponto a cada 10 m (muito detalhado)",
  "home.export.resNone": "Só tabelas, sem registro contínuo",
  "home.export.resSummary": "Resumo curto, sem detalhe por treino",
  "home.export.coords": "Coordenadas GPS",
  "home.export.coordsDrop": "Remover (recomendado)",
  "home.export.coordsKeep": "Manter",
  "home.export.coordsHint": "Altimetria, ritmos e FC são mantidos em qualquer caso.",
  "home.export.questions": "Perguntas para fazer à sua IA",
  "home.export.q1":
    "Analise minha deriva cardíaca levando em conta a temperatura e diga se minha resistência de base é um fator limitante.",
  "home.export.q2": "Cumpri minhas séries? O que devo corrigir no próximo treino?",
  "home.export.q3": "Compare os períodos de cada sensor separadamente e diga o que mudou.",
  "home.export.q4": "Com base nessa carga, proponha minha semana de treino.",
  "home.export.q5": "Minha distribuição de intensidades está coerente com meu objetivo?",
  "home.export.preview": "Ver o dossiê gerado",

  "home.results.title": "4. Os detalhes, se quiser se aprofundar",
  "home.results.overview": "Visão geral",
  "home.results.colFile": "Arquivo",
  "home.results.colDate": "Data",
  "home.results.colDist": "Dist.",
  "home.results.colMoving": "Em movimento",
  "home.results.colElapsed": "Total",
  "home.results.colSpeed": "Ritmo / velocidade",
  "home.results.colHr": "FC média",
  "home.results.colSensor": "Sensor",
  "home.results.colDrift": "Deriva",
  "home.results.colBlocks": "Séries",
  "home.results.detail": "Detalhe por treino",
  "home.results.detailIntro":
    "Abra um treino para ver os sinais por trás de cada veredito. Útil principalmente para avaliar a detecção do sensor: só você sabe quais treinos foram feitos com cinta peitoral.",
  "home.results.load": "Carga de treino",
  "home.results.progression": "Evolução aeróbia",
  "home.results.progressionIntro":
    "FC no mesmo ritmo ao longo do tempo: o único indicador de forma que não depende nem do percurso nem da disposição do dia. Os sensores são tratados separadamente.",
  "home.results.projections": "Projeções",

  "home.faq.title": "Perguntas frequentes",
  "home.faq.q1": "Por que meu arquivo TCX é grande demais para o Gemini ou o ChatGPT?",
  "home.faq.a1":
    "Um TCX de uma hora a 1 Hz pesa cerca de 1,7 MB, quase 90% de tags XML, ou seja, uns 533 mil tokens. Mesmo quando esse volume cabe na janela de contexto, o modelo raciocina mal sobre milhares de linhas de coordenadas brutas.",
  "home.faq.q2": "Meus arquivos são enviados para um servidor?",
  "home.faq.a2":
    "Não. Todo o cálculo é feito no seu navegador, e você pode conferir isso na aba Rede. Um percurso GPS contém o endereço da sua casa com precisão de metros nos primeiros e últimos pontos: a ferramenta os recorta por padrão.",
  "home.faq.q3": "Como a ferramenta adivinha se eu usava cinta peitoral?",
  "home.faq.a3":
    "O marcador mais característico é o travamento na cadência: um sensor óptico confunde o ritmo das passadas com os batimentos e mostra, por exemplo, 172 bpm em vez de 140. Uma cinta peitoral mede um sinal elétrico e não pode cometer esse erro. Somam-se a isso a duração dos platôs de valores idênticos, a granularidade batimento a batimento e a latência de resposta às mudanças de ritmo. É uma heurística: sua confiança tem um teto, e é exibida.",
  "home.faq.q4": "Por que a deriva não é calculada em alguns treinos?",
  "home.faq.a4":
    "Porque ali ela não significaria nada. A deriva compara o rendimento entre as duas metades de um esforço <em>contínuo</em>. Em um treino intervalado, a relação velocidade/FC oscila entre repetições e recuperações: o número seria um artefato. A ferramenta prefere dizer que não mede a produzir um número enganoso.",
  "home.faq.q5": "A temperatura exibida é a do ar?",
  "home.faq.a5":
    "Não. O sensor fica no pulso, aquecido pelo corpo: costuma superestimar de 3 a 8 °C. O valor é exibido, mas sempre com este aviso, inclusive no dossiê enviado à IA.",
  "home.faq.q6": "Qual é a confiabilidade de uma projeção de maratona?",
  "home.faq.a6":
    "Baixa, e é preciso dizer isso. Um estudo com 2.303 corredores amadores mostrou que a fórmula de Riegel é bem calibrada até a meia maratona, mas dá previsões de maratona pelo menos dez minutos rápidas demais para metade dos corredores. Um modelo baseado em resultados reais de prova reduz o erro mais ou menos pela metade.",
  "home.faq.q7": "Quais formatos são aceitos?",
  "home.faq.a7":
    "TCX, GPX e FIT. <strong>Prefira o FIT</strong>: é o formato nativo da maioria dos relógios Garmin, Coros, Wahoo e Suunto, e o único que traz os comprimentos de piscina um a um e a lista de equipamentos pareados. É assim que a ferramenta sabe com certeza, e não por estimativa, se você usava cinta cardíaca. A exportação TCX do Garmin Connect junta todos os comprimentos de um treino de natação em uma única linha.",
  "home.faq.q8": "O ritmo exibido não bate com o do Garmin Connect",
  "home.faq.a8":
    "É uma diferença de convenção, não um erro. Aqui o ritmo é calculado sobre o <strong>tempo em movimento</strong>, como faz o Strava: paradas em semáforos e pausas são excluídas. O Garmin Connect divide pela duração total e por isso mostra um ritmo mais lento. Em um treino de 16 km na cidade, a diferença chega facilmente a quinze segundos por quilômetro. As duas durações aparecem lado a lado para que a diferença fique visível, e o dossiê enviado à IA informa a convenção usada. Sem isso, um modelo compararia números que não são comparáveis.",
  "home.faq.q9": "A altimetria também não bate",
  "home.faq.a9":
    "Se você enviar um arquivo FIT, a ferramenta usa o ganho de elevação medido pelo altímetro barométrico do seu relógio. Em TCX ou GPX essa informação não existe: ela é recalculada a partir da altitude do GPS, o que costuma subestimá-la em 30 a 50%. Em um treino real de 16 km, 61 metros calculados contra 140 medidos. É mais um motivo para preferir o FIT.",
  "home.faq.q10": "O esporte detectado está errado, por quê?",
  "home.faq.a10":
    "A ferramenta não confia no rótulo do arquivo, porque ele muitas vezes está errado: um treino de fortalecimento com trechos de corrida é rotulado como “corrida”, e um treino na piscina como “outro”. Por isso a classificação é feita pela forma dos dados. Cada treino recebe um nível: análise completa para corrida e ciclismo, tratamento próprio para natação e contagem como carga para todo o resto. Um treino de fortalecimento pesa na recuperação mesmo que seu ritmo não signifique nada.",

  "home.refs.title": "Em que se baseiam estes cálculos",
  "home.refs.intro":
    "Cada métrica se apoia em um trabalho publicado. Veja quais, e o que cada um não diz.",
  "home.refs.minetti":
    "<strong>Ritmo ajustado à inclinação.</strong> Minetti AE, et al. <em>Energy cost of walking and running at extreme uphill and downhill slopes.</em> J Appl Physiol. 2002;93(3):1039–46. <a href=\"https://doi.org/10.1152/japplphysiol.01177.2001\" rel=\"nofollow\">doi</a> · <a href=\"https://pubmed.ncbi.nlm.nih.gov/12183501/\" rel=\"nofollow\">PubMed</a>. Estabelecido em esteira: não considera nem o terreno técnico nem o desgaste muscular em descidas longas.",
  "home.refs.sensors":
    "<strong>Diferença entre sensores de FC.</strong> Gillinov S, et al. Med Sci Sports Exerc. 2017;49(8):1697–703. · Pasadyn SR, et al. Cardiovasc Diagn Ther. 2019;9(4):379–85. <a href=\"https://doi.org/10.21037/cdt.2019.06.05\" rel=\"nofollow\">doi</a>. Esses trabalhos medem o erro do sensor óptico; não propõem um método para identificá-lo só a partir do arquivo. Nossa detecção deriva deles: não é um protocolo validado.",
  "home.refs.riegel":
    "<strong>Projeção de tempos.</strong> Riegel PS. <em>Athletic records and human endurance.</em> American Scientist. 1981;69(3):285–90. Calibrada com recordes mundiais, em asfalto plano.",
  "home.refs.vickers":
    "<strong>Correção para corredores amadores.</strong> Vickers AJ, Vertosick EA. <em>An empirical study of race times in recreational endurance runners.</em> BMC Sports Sci Med Rehabil. 2016;8:26. <a href=\"https://doi.org/10.1186/s13102-016-0052-y\" rel=\"nofollow\">doi</a>. É a razão direta pela qual um tempo de prova pesa mais que um esforço de treino.",
  "home.refs.cs":
    "<strong>Velocidade crítica.</strong> Jones AM, et al. <em>Critical power: implications for determination of V̇O₂max and exercise tolerance.</em> Med Sci Sports Exerc. 2010;42(10):1876–90. <a href=\"https://doi.org/10.1249/MSS.0b013e3181d9cf7f\" rel=\"nofollow\">doi</a>. O modelo supõe que a velocidade crítica pode ser mantida indefinidamente, o que é falso além de uns 90 minutos.",
  "home.refs.coggan":
    "<strong>Potência normalizada, TSS, deriva Pa:Hr.</strong> Metodologias de treino (Coggan, Friel) amplamente adotadas, mas não artigos revisados por pares. A distinção importa.",
  "home.refs.noteTitle": "O que essas referências não garantem",
  "home.refs.note":
    "Elas fundamentam as fórmulas, não as conclusões. Um número calculado corretamente a partir de um sensor defeituoso continua errado. Em caso de dor, ou antes de mudar um plano de treino, a opinião de um profissional vale mais que esta ferramenta e que a IA para a qual você enviar os resultados.",
  "home.footer": "Licença MIT. Sem conta, sem anúncios, sem rastreadores.",

  "js.libError":
    "<strong>Não foi possível carregar a biblioteca.</strong>Abra a página com <code>npm run dev</code>: abri-la direto do explorador de arquivos não funciona.",
  "js.vigilance": "{n} ponto(s) de atenção incluídos no dossiê",
  "js.indicShort": "indic.",
  "js.sensorSummary": "{file} — {label} (confiança {confidence})",
  "js.noSignal": "Nenhum sinal utilizável.",
  "js.signal": "{name}: <b>{value}</b> — {note}",
  "js.lock": "Travamento na cadência: <b>{pct}</b>, <b>{n}</b> trecho(s) excluído(s) do cálculo da deriva.",
  "js.sets": "Séries detectadas: <b>{sets}</b>",
  "js.weather": "Ar <b>{temp} °C</b>{feels}{humidity}{wind} — Open-Meteo",
  "js.weatherFeels": " (sensação {temp})",
  "js.weatherHumidity": ", {pct} UR",
  "js.weatherWind": ", vento {kmh} km/h",
  "js.drift":
    "Deriva <b>{pct}</b> {badge} em {min} min a {pace} ({coverage} do treino) — {interpretation}",
  "js.driftNone": "Deriva não calculada: {reason}",
  "js.hrr": "Recuperação cardíaca: <b>{bpm} bpm</b> em 60 s{erosion}",
  "js.hrrErosion": ", queda de {bpm} bpm/repetição",
  "js.adherence": "<b>{set}</b> — {grade}: {verdicts}",
  "js.progPace": "Ritmo",
  "js.progSensor": "Sensor",
  "js.progPoints": "Pontos",
  "js.progTrend": "Tendência",
  "js.progReading": "Leitura",
  "js.perWeek": "{value} bpm/sem",
  "js.progNone":
    "Ainda não é possível acompanhar: são necessários pelo menos três treinos de corrida em ritmo comparável, com o mesmo sensor de FC.",
  "js.trendTitle": "FC a {pace} — {source}",
  "js.projDistance": "Distância",
  "js.projEstimate": "Estimativa",
  "js.projRange": "Margem",
  "js.projReliability": "Confiabilidade",
  "js.projMethod": "Método",
  "js.cs": "Velocidade crítica <b>{pace}/km</b>, D' <b>{d} m</b>, R² <b>{r2}</b>",
  "js.projNone": "Nenhuma projeção: é preciso pelo menos um treino de corrida.",
  "js.redOriginal": "Seus arquivos originais",
  "js.redGenerated": "Dossiê gerado",
  "js.redReduction": "Redução",
  "js.redCompat": "Compatibilidade",
  "js.sizeMb": "{value} MB — ~{tokens} tokens",
  "js.sizeKb": "{value} KB — ~{tokens} tokens",
  "js.compatTooBig": "⚠ grande demais para o ChatGPT, reduza o detalhe",
  "js.compatGemini": "⚠ só o Gemini",
  "js.compatOk": "✓ ChatGPT, Claude e Gemini",
  "js.truncated": "… prévia cortada, a cópia contém tudo.",
  "js.download": "Baixar o dossiê (.txt)",
  "js.copy": "Copiar para a área de transferência",
  "js.copied": "Copiado",
  "js.filename": "dossie-treino.txt",

  "privacy.title": "Privacidade: o que sai do seu navegador, e o que nunca sai",
  "privacy.description":
    "Seus arquivos GPS nunca são enviados a um servidor: todo o cálculo é feito no seu navegador. A única exceção é o clima, que transmite o ponto médio do percurso arredondado a cerca de um quilômetro. Detalhe técnico completo e verificável.",
  "privacy.ld.q1": "Os arquivos GPS são enviados para um servidor?",
  "privacy.ld.a1":
    "Não. A leitura e a análise são executadas no navegador, em JavaScript, no aparelho do usuário. Nenhum arquivo é transmitido, o que pode ser verificado na aba Rede das ferramentas de desenvolvedor: nenhuma requisição contém o conteúdo de um arquivo.",
  "privacy.ld.q2": "O que é transmitido a terceiros?",
  "privacy.ld.a2":
    "Apenas a requisição de clima, quando ativada: o ponto médio do percurso arredondado a duas casas decimais (cerca de 1,1 km de resolução) e a data do treino, enviados ao Open-Meteo. Nunca o ponto de largada, que geralmente corresponde à residência, e nunca dados fisiológicos ou identificadores.",
  "privacy.ld.q3": "Por que a ferramenta recorta o início e o fim do percurso?",
  "privacy.ld.a3":
    "Porque os primeiros e últimos pontos de um percurso GPS revelam o endereço da residência com precisão de metros. Esse recorte vem ativado por padrão em 250 metros e é aplicado antes de qualquer exportação, inclusive a destinada a uma inteligência artificial.",
  "privacy.back": "← Voltar para a ferramenta",
  "privacy.h1": "Privacidade",
  "privacy.lede":
    "Um percurso GPS contém o endereço da sua casa com precisão de metros. Esta página diz exatamente o que fica no seu aparelho, o que sai dele e como você mesmo pode verificar.",
  "privacy.principle.title": "O princípio",
  "privacy.principle.p1":
    "<strong>Seus arquivos nunca são transmitidos.</strong> A decodificação e a análise são executadas em JavaScript, no seu navegador, no seu aparelho. Não existe nenhum servidor que os receba. Não é uma política, é uma ausência de infraestrutura.",
  "privacy.principle.p2":
    "Na prática: você pode desligar a internet depois que a página carregar, enviar seus arquivos, e a análise vai funcionar. Só o clima vai falhar, o que prova justamente que ele é a única coisa que sai.",
  "privacy.table.title": "O que sai, o que não sai",
  "privacy.table.colData": "Dado",
  "privacy.table.colSent": "Transmitido?",
  "privacy.table.file": "O arquivo do seu relógio",
  "privacy.table.fileText": "<strong>Nunca.</strong> Lido do disco pelo navegador, analisado na memória.",
  "privacy.table.track": "Seu percurso GPS",
  "privacy.table.never": "<strong>Nunca.</strong>",
  "privacy.table.physio": "Frequência cardíaca, ritmos, potência",
  "privacy.table.settings": "FC máxima, ritmo de limiar, tempos informados",
  "privacy.table.settingsText":
    "<strong>Nunca.</strong> Mantidos na memória durante a sessão e perdidos ao fechar a aba.",
  "privacy.table.dossier": "O dossiê gerado",
  "privacy.table.dossierText":
    "<strong>Nunca</strong> pela ferramenta. Só você o copia ou baixa, e o que você faz com ele depois depende de você.",
  "privacy.table.midpoint": "Ponto médio do percurso, arredondado",
  "privacy.table.midpointText": "<strong>Sim</strong>, se o clima estiver ativado. Veja abaixo.",
  "privacy.weather.title": "O clima: a única exceção",
  "privacy.weather.p1":
    "O sensor de temperatura de um relógio fica no pulso e é aquecido pelo corpo: superestima de 3 a 8 °C e ignora a umidade e o vento. Só que o calor é o principal fator de confusão da deriva cardíaca. Sem a temperatura real, atribui-se à má forma o que é apenas o custo térmico normal.",
  "privacy.weather.p2": "Por isso a requisição é construída para não servir como dado de localização:",
  "privacy.weather.midTitle": "Enviamos o ponto médio do percurso, nunca a largada",
  "privacy.weather.midText":
    "O ponto de largada é a sua casa. O ponto médio é um lugar qualquer, sem relação com o lugar onde você dorme.",
  "privacy.weather.roundTitle": "As coordenadas são arredondadas a duas casas decimais",
  "privacy.weather.roundText":
    "Ou seja, cerca de 1,1 km de resolução. O clima é um fenômeno regional: não se perde precisão, e a requisição deixa de apontar um lugar identificável.",
  "privacy.weather.nothingTitle": "Nada mais é anexado",
  "privacy.weather.nothingText":
    "Nem frequência cardíaca, nem ritmo, nem percurso, nem identificador, nem cookie. Uma latitude arredondada, uma longitude arredondada, uma data. A requisição completa é assim:",
  "privacy.weather.recipient":
    "O destinatário é o <a href=\"https://open-meteo.com\" rel=\"nofollow noopener\">Open-Meteo</a>, um serviço de clima aberto. A função pode ser desativada por um menu na página inicial, e a ferramenta continua funcionando sem ela.",
  "privacy.trim.title": "O recorte da sua casa",
  "privacy.trim.text":
    "Os primeiros e últimos pontos de um percurso revelam a porta da sua casa. A ferramenta remove <strong>250 metros por padrão</strong>, tanto na largada quanto na chegada, antes de qualquer análise e de qualquer exportação. A configuração pode ser alterada, e uma opção remove completamente as coordenadas, mantendo altimetria, ritmos e frequência cardíaca.",
  "privacy.note.title": "O que não controlamos",
  "privacy.note.text":
    "O dossiê que você copia para o ChatGPT, o Gemini ou o Claude sai do seu navegador no momento em que você cola, e passa a seguir os termos desse serviço, não os nossos. Se o dossiê ainda tiver coordenadas, elas vão junto. É exatamente por isso que a opção “remover as coordenadas” vem ativada por padrão na exportação.",
  "privacy.dont.title": "O que não fazemos",
  "privacy.dont.1": "Nenhuma conta, nenhum cadastro, nenhuma senha.",
  "privacy.dont.2": "Nenhum cookie, nenhum rastreador publicitário, nenhum pixel.",
  "privacy.dont.3": "Nenhum anúncio, portanto nenhum interesse em coletar o que quer que seja.",
  "privacy.dont.4": "Nenhuma revenda de dados: não há nenhum para revender.",
  "privacy.dont.analytics":
    "Se algum dia houver medição de audiência, será sem cookies nem identificadores persistentes, e esta página será atualizada antes.",
  "privacy.verify.title": "Verifique você mesmo",
  "privacy.verify.p1":
    "Não acredite só na nossa palavra. Abra as ferramentas de desenvolvedor do seu navegador (<code>F12</code>), aba <strong>Rede</strong>, e envie um arquivo. Você verá o carregamento da página e, se o clima estiver ativado, uma requisição para <code>open-meteo.com</code>. Nada mais. Nenhuma requisição contém o conteúdo do seu arquivo.",
  "privacy.verify.p2":
    "O <a href=\"https://github.com/tpripri/gps-digest\" rel=\"noopener\">código-fonte é aberto</a>, sob licença MIT: o que a página faz pode ser lido linha a linha.",
  "privacy.rights.title": "Seus direitos",
  "privacy.rights.text":
    "Como nenhum dado pessoal é coletado nem guardado, não há nenhum registro a consultar, corrigir ou apagar: fechar a aba basta para apagar tudo. Para qualquer dúvida, o repositório do GitHub citado acima permite abrir uma discussão.",
  "privacy.footerTool": "A ferramenta",
  "privacy.updated": "Última atualização: <time datetime=\"2026-09-25\">25 de setembro de 2026</time>.",
};
