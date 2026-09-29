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
    "<strong>Seus arquivos não saem do seu navegador.</strong> Todo o cálculo é feito no seu aparelho, e você pode conferir isso na aba Rede. Um percurso GPS revela seu endereço com precisão de metros, por isso a largada e a chegada são recortadas por padrão. <a href=\"{{href:confidentialite.html}}\">O que sai, e o que nunca sai</a>.",
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
  "common.blog": "Blog",
  "home.why.more":
    "Por que uma IA precisa de um dossiê estruturado, e não de um arquivo bruto: <a href=\"{{href:post-ia-analyse.html}}\">leia o artigo</a>.",

  "blog.title": "Blog do gps-digest: treino, dados do relógio e IA",
  "blog.description":
    "Artigos sobre análise de treino com inteligência artificial: o que o ChatGPT, o Gemini e o Claude conseguem fazer com seus treinos, e como entregar a eles dados realmente úteis.",
  "blog.lede":
    "Treino, dados do relógio e inteligência artificial. Artigos curtos, com números, e sem promessas que os dados não sustentam.",
  "blog.readMore": "Ler o artigo",

  "post.title": "Analisar seus treinos de corrida com o ChatGPT: a armadilha dos tokens",
  "post.description":
    "A IA analisa muito bem um treino, mas um TCX de uma hora tem 533 mil tokens. Por que isso trava tudo, e como resolver em três minutos.",
  "post.kicker": "Treino e IA",
  "post.h1": "O ChatGPT consegue analisar seus treinos de corrida. Desde que consiga lê-los.",
  "post.meta": "Publicado em <time datetime=\"2026-09-28\">28 de setembro de 2026</time> · 7 min de leitura",
  "post.lede":
    "Pergunte a uma IA por que o intervalado de terça pareceu tão pesado e ela vai responder melhor que a maioria dos apps de treino. Com uma condição: ela precisa enxergar seus dados de verdade. É aí que tudo complica, e não pelo motivo que você imagina.",
  "post.tldrTitle": "Resumo",
  "post.tldr1":
    "O ChatGPT, o Gemini e o Claude sabem interpretar um treino, relacioná-lo ao seu objetivo e responder às suas perguntas seguintes, como um treinador disponível a qualquer hora.",
  "post.tldr2":
    "Um arquivo TCX de uma hora gravado a 1 Hz pesa cerca de 1,7 MB, algo como 533 mil tokens, e quase 90% disso são tags XML.",
  "post.tldr3": "Mesmo quando o arquivo passa, o modelo raciocina mal sobre milhares de linhas de coordenadas brutas.",
  "post.tldr4":
    "A solução não é comprimir, é reestruturar: parciais, voltas, zonas, repetições. Um treino passa a caber em cerca de 5.800 tokens, e a análise fica melhor.",

  "post.why.title": "Por que a IA é uma parceira de treino tão boa?",
  "post.why.p1":
    "Porque ela parte da sua pergunta, não de um painel. Um app mostra os mesmos gráficos para todo mundo. Uma IA pode explicar por que seu ritmo caiu no quilômetro 8, levando em conta o calor, sua semana puxada e o objetivo que você passou para ela.",
  "post.why.listIntro": "Com bons dados, uma IA sabe:",
  "post.why.li1": "explicar um treino em linguagem simples, sem jargão;",
  "post.why.li2":
    "relacionar seus números ao seu objetivo: baixar de 45 minutos nos 10 km não pede os mesmos treinos que uma primeira maratona;",
  "post.why.li3": "comparar várias semanas e perceber uma tendência que você não tinha visto;",
  "post.why.li4":
    "responder à próxima pergunta, e à seguinte, com a paciência de um treinador disponível às 11 da noite;",
  "post.why.li5": "propor a próxima semana com base na sua carga real, e não em uma planilha genérica.",
  "post.why.p2":
    "Essa personalização é o que faz a diferença. Mas ela depende de uma premissa que quase ninguém confere: que o modelo tem acesso de verdade aos seus dados, e não a um resumo de três linhas ou a um arquivo ilegível.",

  "post.tokens.title": "O que é um token, e por que seu relógio gera tantos?",
  "post.tokens.p1":
    "Um token é a unidade de texto que um modelo de linguagem lê e cobra: um pedaço de palavra, de número ou de pontuação. Cada modelo tem um limite, a janela de contexto, além do qual não consegue ler mais nada. Dependendo do modelo e da assinatura, esse limite vai hoje de algumas dezenas de milhares a alguns milhões de tokens.",
  "post.tokens.p2":
    "O problema é que os arquivos do relógio foram feitos para softwares, não para serem lidos. Um arquivo TCX repete as mesmas tags XML a cada segundo do seu treino. Veja o que medimos no nosso teste:",
  "post.tokens.colCase": "Dados",
  "post.tokens.colSize": "Tamanho",
  "post.tokens.colTokens": "Tokens estimados",
  "post.tokens.r1": "Um treino de uma hora, arquivo TCX bruto",
  "post.tokens.r1size": "1,7 MB",
  "post.tokens.r1tokens": "≈ 533 mil",
  "post.tokens.r2": "O mesmo treino, como dossiê estruturado",
  "post.tokens.r2size": "≈ 18 KB",
  "post.tokens.r2tokens": "≈ 5.800",
  "post.tokens.r3": "15 MB de arquivos reais, brutos",
  "post.tokens.r3size": "15 MB",
  "post.tokens.r3tokens": "≈ 4,7 milhões",
  "post.tokens.r4": "Os mesmos arquivos, como dossiê estruturado",
  "post.tokens.r4size": "≈ 100 KB",
  "post.tokens.r4tokens": "≈ 32 mil",
  "post.tokens.note":
    "Estimativa de 3,2 caracteres por token, a proporção observada em CSV numérico. Medições reproduzíveis com o teste publicado no código-fonte.",
  "post.tokens.p3":
    "Ou seja: um único treino bruto já pode estourar uma assinatura comum, e uma temporada inteira não cabe em lugar nenhum.",

  "post.paste.title": "O que acontece quando você cola um arquivo TCX no ChatGPT?",
  "post.paste.intro": "Três cenários possíveis. Nenhum é bom.",
  "post.paste.h1": "1. O arquivo é recusado",
  "post.paste.p1":
    "É o caso mais honesto: a interface avisa que o arquivo é grande demais. Você perde tempo, mas pelo menos fica sabendo.",
  "post.paste.h2": "2. O arquivo é lido só em parte, sem você saber",
  "post.paste.p2":
    "Diante de um anexo pesado, os assistentes muitas vezes leem só trechos dele, ou o entregam a um script que o resume. A IA então responde com segurança a partir de apenas uma parte do treino. A resposta parece certa. Pode não estar.",
  "post.paste.h3": "3. O arquivo passa, mas a análise é fraca",
  "post.paste.p3":
    "Mesmo com uma janela de contexto grande, um modelo aproveita mal a informação perdida no meio de um documento longo. Pesquisadores de Stanford documentaram esse efeito com o nome de “lost in the middle” (Liu et al., 2024). Pedir uma análise de treino a partir de 3.600 linhas de latitudes e longitudes é pedir que ele faça de cabeça contas que faz mal, sobre dados que quase não dizem nada.",

  "post.restructure.title": "É preciso comprimir o arquivo? Não, é preciso reestruturá-lo",
  "post.restructure.p1":
    "Deixar o arquivo menor não basta: ele precisa ficar legível. Um treinador não lê suas coordenadas GPS segundo a segundo. Ele olha seus tempos por quilômetro, suas repetições e sua frequência cardíaca por zona. É exatamente isso que um modelo de linguagem sabe interpretar.",
  "post.restructure.colRaw": "No arquivo bruto",
  "post.restructure.colDossier": "Em um dossiê estruturado",
  "post.restructure.r1raw": "3.600 linhas de latitude, longitude e altitude",
  "post.restructure.r1dossier": "Parciais por quilômetro, voltas, tempo em cada zona",
  "post.restructure.r2raw": "Um valor de frequência cardíaca por segundo",
  "post.restructure.r2dossier": "A deriva cardíaca já calculada, com o trecho do treino medido",
  "post.restructure.r3raw": "Nenhuma indicação sobre o sensor cardíaco",
  "post.restructure.r3dossier": "Cinta peitoral ou pulso, com um nível de confiança",
  "post.restructure.r4raw": "Tags XML repetidas em cada ponto",
  "post.restructure.r4dossier": "Tabelas CSV com unidades explícitas",
  "post.restructure.p2":
    "Com 15 MB de arquivos reais, o dossiê fica em cerca de 32 mil tokens. E a análise que sai dele é melhor do que com os arquivos completos. Não só mais barata: melhor, porque o modelo trabalha com objetos que entende.",

  "post.blind.title": "O que a IA não consegue adivinhar sozinha?",
  "post.blind.p1":
    "Alguns erros não aparecem nos números. Se nada os sinaliza, a IA os trata como fatos e monta a análise em cima deles.",
  "post.blind.li1":
    "<strong>O sensor cardíaco.</strong> Um sensor de pulso às vezes confunde sua cadência com seus batimentos e mostra 172 bpm em vez de 140. Comparar um treino com sensor de pulso e outro com cinta peitoral é comparar dois instrumentos, não dois estados de forma.",
  "post.blind.li2":
    "<strong>A temperatura.</strong> A do relógio é aquecida pelo seu pulso: ela superestima o ar em 3 a 8 °C. Uma IA que a toma pela temperatura real erra a causa da sua deriva cardíaca.",
  "post.blind.li3":
    "<strong>O ritmo.</strong> O Strava o calcula sobre o tempo em movimento; o Garmin Connect, sobre a duração total. Em um treino na cidade, a diferença passa fácil de 15 segundos por quilômetro.",
  "post.blind.li4":
    "<strong>As medidas que não fazem sentido.</strong> Uma deriva cardíaca calculada em um treino intervalado não significa nada. Melhor nenhum número do que um número errado com cara de confiável.",
  "post.blind.p2":
    "Um bom dossiê não se limita a resumir. Ele diz o que é confiável e o que não é, para que a IA não raciocine sobre areia.",

  "post.howto.title": "Como fazer uma IA analisar seus treinos em três minutos?",
  "post.howto.step1":
    "<strong>Exporte seus arquivos</strong> do relógio ou do Strava, de preferência no formato FIT, o mais completo.",
  "post.howto.step2":
    "<strong>Envie-os para o gps-digest.</strong> Tudo é calculado no seu navegador: nenhum arquivo é enviado para um servidor.",
  "post.howto.step3": "<strong>Copie o dossiê</strong> para o ChatGPT, o Gemini ou o Claude e faça sua pergunta.",
  "post.howto.cta": "Preparar meus treinos para a IA",

  "post.prompts.title": "Que perguntas fazer à sua IA?",
  "post.prompts.intro":
    "As melhores perguntas nascem de uma dúvida real. Aqui vão cinco exemplos que funcionam bem com um dossiê estruturado:",
  "post.prompts.q1": "“Minha deriva cardíaca aumentou em relação ao mês passado, com temperatura parecida?”",
  "post.prompts.q2": "“Mantive o ritmo nas repetições de terça? O que devo corrigir na próxima vez?”",
  "post.prompts.q3": "“Com essa carga, estou pronto para baixar de 45 minutos nos 10 km daqui a seis semanas?”",
  "post.prompts.q4": "“Minha divisão entre rodagens leves e treinos fortes faz sentido para uma maratona?”",
  "post.prompts.q5": "“Monte minha próxima semana levando em conta meu cansaço atual.”",

  "post.faq.title": "Perguntas frequentes",
  "post.faq.q1": "O ChatGPT consegue ler um arquivo FIT ou TCX diretamente?",
  "post.faq.a1":
    "Consegue abrir, mas não aproveitar direito. O FIT é um formato binário que a IA precisa decodificar com um script, e um TCX de uma hora tem cerca de 533 mil tokens. Nos dois casos, a análise se apoia em trechos ou em dados brutos pouco adequados. Um dossiê estruturado resolve os dois problemas.",
  "post.faq.q2": "Por que não exportar simplesmente um CSV do Garmin Connect?",
  "post.faq.a2":
    "Porque essa exportação se limita basicamente às voltas. Ela não traz a deriva cardíaca, nem a detecção do sensor, nem o detalhe das repetições, nem o contexto que evita interpretações erradas, como a forma de calcular o ritmo.",
  "post.faq.q3": "Meus dados são enviados para algum lugar?",
  "post.faq.a3":
    "Não. Seus arquivos são lidos e analisados no seu navegador. Só o dossiê que você mesmo copia para uma IA sai do seu aparelho, e as coordenadas GPS são removidas dele por padrão.",
  "post.faq.q4": "Uma IA pode substituir um treinador?",
  "post.faq.a4":
    "Não, e esse não é o objetivo. Ela explica, compara e sugere, mas não vê você correr nem sente suas dores. Em caso de lesão ou dúvida séria, a opinião de um profissional vem primeiro.",
  "post.faq.q5": "Qual IA escolher: ChatGPT, Gemini ou Claude?",
  "post.faq.a5":
    "As três sabem analisar um dossiê estruturado. A diferença real está no tamanho da janela de contexto da sua assinatura. Com um dossiê de alguns milhares de tokens por treino, a questão deixa de importar.",

  "post.sources.title": "Fontes",
  "post.sources.liu":
    "Liu NF, et al. <em>Lost in the Middle: How Language Models Use Long Contexts.</em> Transactions of the Association for Computational Linguistics, 2024. <a href=\"https://arxiv.org/abs/2307.03172\" rel=\"nofollow\">arXiv:2307.03172</a>.",
  "post.sources.bench":
    "Medições de tamanho e de tokens: teste do gps-digest, reproduzível, no <a href=\"https://github.com/tpripri/gps-digest\" rel=\"noopener\">código-fonte aberto</a>.",

  "post.end.title": "Seu próximo treino merece mais que um gráfico genérico",
  "post.end.text":
    "Transforme os arquivos do seu relógio em um dossiê que o ChatGPT, o Gemini ou o Claude consigam analisar de verdade. Grátis, sem cadastro, e seus arquivos não saem do navegador.",
  "post.end.cta": "Experimentar o gps-digest",
  "privacy.analytics.row": "Estatísticas de visitas",
  "privacy.analytics.rowText":
    "<strong>Sim, anônimas.</strong> O Cloudflare Web Analytics conta as páginas vistas, sem cookie nem identificador persistente. Nada sobre seus arquivos ou seus treinos.",
  "privacy.analytics.active":
    "A medição de audiência usa o Cloudflare Web Analytics: sem cookie, sem identificador persistente e sem nenhum dado dos seus arquivos. Ela conta páginas vistas, países, origens de tráfego e tipos de aparelho, nunca uma pessoa.",
  "privacy.verify.p1Analytics":
    "Não acredite só na nossa palavra. Abra as ferramentas de desenvolvedor do seu navegador (<code>F12</code>), aba <strong>Rede</strong>, e envie um arquivo. Você verá o carregamento da página, a medição de audiência para <code>cloudflareinsights.com</code> e, se o clima estiver ativado, uma requisição para <code>open-meteo.com</code>. Nada mais. Nenhuma requisição contém o conteúdo do seu arquivo.",
};
