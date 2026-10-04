/** Catalogue de page : portugais (variante brésilienne). Clés : voir page-i18n.ts. */

import type { PageCatalog } from "./page-i18n.ts";

export const pt: Partial<PageCatalog> = {
  "common.langs": "Idioma",
  "common.footerNav": "Rodapé",
  "common.privacy": "Privacidade",
  "common.source": "Código-fonte",

  "home.title": "Analisar treinos do Garmin e do Strava com o ChatGPT — gps-digest",
  "home.description":
    "Exporte seus treinos do Garmin, do Strava ou do Apple Watch e deixe o ChatGPT, o Claude ou o Gemini analisá-los. Grátis, sem cadastro, tudo fica no seu navegador.",
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
  "home.ld.step1.name": "Opcional: dar o seu histórico com o arquivo do Strava",
  "home.ld.step1.text":
    "Peça o arquivo da sua conta Strava (Download your account) e solte o ZIP do jeito que veio: a ferramenta extrai um ano de contexto compacto.",
  "home.ld.step2.name": "Exportar seus últimos treinos",
  "home.ld.step2.text": "Pegue os arquivos FIT, TCX ou GPX dos seus treinos recentes no Garmin Connect, no Strava ou no Apple Watch.",
  "home.ld.step3.name": "Soltar os arquivos para comprimi-los",
  "home.ld.step3.text":
    "A ferramenta comprime os treinos num dossiê estruturado, no próprio navegador, sem enviar nada.",
  "home.ld.step4.name": "Copiar o dossiê para a IA",
  "home.ld.step4.text":
    "Copie o dossiê gerado e cole no ChatGPT, no Gemini ou no Claude junto com a sua pergunta.",
  "home.ld.faq1.q": "Por que meu arquivo TCX é grande demais para uma IA?",
  "home.ld.faq1.a":
    "Um TCX de uma hora gravado a 1 Hz pesa cerca de 1,7 MB, quase 90% de tags XML, ou seja, uns 533 mil tokens. Mesmo quando esse volume cabe na janela de contexto, o modelo raciocina mal: pede-se a ele uma análise de treino a partir de milhares de linhas de coordenadas brutas.",
  "home.ld.faq2.q": "Meus arquivos GPS são enviados para um servidor?",
  "home.ld.faq2.a":
    "Não. Todo o cálculo é feito no seu navegador. Nenhum arquivo passa por um servidor, e você pode conferir isso na aba Rede. Um percurso GPS revela o endereço da sua casa com precisão de metros: as coordenadas são removidas do dossiê por padrão.",
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
    "<strong>Seus arquivos não saem do seu navegador.</strong> Todo o cálculo é feito no seu aparelho, e você pode conferir isso na aba Rede. Um percurso GPS revela seu endereço com precisão de metros, por isso as coordenadas são removidas do dossiê por padrão. <a href=\"{{href:confidentialite.html}}\">O que sai, e o que nunca sai</a>.",
  "home.step0.badge":
    "Opcional, recomendado",
  "home.step0.title":
    "Dê o seu histórico: o arquivo do Strava",
  "home.step0.text":
    "Uma única vez, em <a href=\"https://www.strava.com/account\" rel=\"noopener\">strava.com/account</a>, na seção “Download your account”. O Strava envia um ZIP por e-mail em poucas horas. Solte-o aqui do jeito que veio: a ferramenta extrai um ano de contexto compacto, sem fotos nem rotas.",
  "home.step1.title": "Baixe seus últimos treinos",
  "home.step1.text": "Os arquivos FIT, TCX ou GPX dos treinos que você quer analisar, do seu relógio ou app: <a href=\"{{href:guide-garmin.html}}\">Garmin</a> · <a href=\"{{href:guide-strava.html}}\">Strava</a> · <a href=\"{{href:guide-apple.html}}\">Apple Watch</a>.",
  "home.step2.title": "Solte-os aqui para comprimi-los",
  "home.step2.text": "A ferramenta transforma tudo num dossiê compacto que a IA consegue ler inteiro. Tudo é calculado no seu navegador: seus arquivos não são enviados para lugar nenhum.",
  "home.step3.title": "Cole o dossiê na sua IA",
  "home.step3.text": "ChatGPT, Claude, Gemini ou Vibe, com a sua pergunta. <a href=\"{{href:post-ia-coach.html}}\">O que perguntar?</a>",

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

  "home.set.title": "Refinar a análise (opcional): FC máxima, última prova, clima",
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
  "home.set.privacy": "Zona de privacidade",
  "home.set.privacyHint": "Raio em metros onde as posições são apagadas, se você mantiver as coordenadas. Nunca corta o treino.",
  "home.set.lthr":
    "FC de limiar",
  "home.set.lthrHint":
    "bpm, a base mais confiável",
  "home.set.lthrPlaceholder":
    "ex.: 160",
  "home.set.restHr":
    "FC de repouso",
  "home.set.restHrHint":
    "bpm, para o modelo de FC de reserva",
  "home.set.zoneModel":
    "Zonas de FC",
  "home.set.zoneAuto":
    "Automático (limiar se souber, senão FC máxima)",
  "home.set.zoneMax":
    "% da FC máxima",
  "home.set.zoneReserve":
    "% da FC de reserva",
  "home.set.zoneThreshold":
    "% da FC de limiar",
  "home.set.weather": "Temperatura do ar",
  "home.set.weatherOn": "Buscar o clima real",
  "home.set.weatherOff": "Não enviar nada",
  "home.set.weatherHint":
    "Envia ao Open-Meteo o <strong>ponto médio</strong> do percurso, arredondado a ~1 km, e a data. Nunca sua largada, nunca seus dados.",

  "home.files.title": "Seus arquivos",
  "home.reads.title":
    "Guias e artigos",
  "home.files.drop": "Solte seus arquivos aqui",
  "home.files.formats": "O arquivo completo do Strava, um ZIP do Garmin ou arquivos FIT, TCX e GPX: tudo funciona do jeito que vem.",
  "home.files.fit":
    "O FIT é o formato nativo do seu relógio: é o único que traz os comprimentos de piscina e o sensor cardíaco realmente pareado.",
  "home.files.pick": "Escolher arquivos",
  "home.archive.period":
    "Período analisado:",
  "home.archive.p3m":
    "Últimos 3 meses",
  "home.archive.p6m":
    "Últimos 6 meses",
  "home.archive.p1y":
    "Últimos 12 meses",
  "home.archive.p2y":
    "Últimos 2 anos",
  "home.archive.pAll":
    "Todo o histórico",

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
  "home.results.races":
    "Provas reconhecidas",

  "home.faq.title": "Perguntas frequentes",
  "home.faq.q1": "Por que meu arquivo TCX é grande demais para o Gemini ou o ChatGPT?",
  "home.faq.a1":
    "Um TCX de uma hora a 1 Hz pesa cerca de 1,7 MB, quase 90% de tags XML, ou seja, uns 533 mil tokens. Mesmo quando esse volume cabe na janela de contexto, o modelo raciocina mal sobre milhares de linhas de coordenadas brutas.",
  "home.faq.q2": "Meus arquivos são enviados para um servidor?",
  "home.faq.a2":
    "Não. Todo o cálculo é feito no seu navegador, e você pode conferir isso na aba Rede. Um percurso GPS revela o endereço da sua casa com precisão de metros: as coordenadas são removidas do dossiê por padrão, e uma zona de privacidade apaga as da largada e da chegada se você decidir mantê-las.",
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
    "<strong>A ferramenta não pôde ser carregada.</strong> Verifique sua conexão e recarregue a página. Em uma rede corporativa, um filtro de segurança pode bloquear o site: tente outra conexão.",
  "js.archiveNote":
    "<strong>Arquivo:</strong> {kept} treinos mantidos de {total}. Os últimos {days} dias são detalhados treino a treino; o resto do período ocupa uma linha por treino no dossiê.",
  "js.archiveProgress":
    "Lendo o arquivo: {n} treinos mantidos ({read} arquivos lidos)…",
  "js.olderInTable":
    "Detalhe exibido para os treinos dos últimos {days} dias. Os {n} mais antigos aparecem na tabela de treinos e no dossiê.",
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
  "js.racesIntro":
    "Suas provas calibram as projeções. Marque as que são provas e desmarque um treino tomado por engano por uma prova: tudo é recalculado.",
  "js.racesNone":
    "Nenhuma prova reconhecida. Se você correu uma, informe seu último tempo em “Refinar a análise”: é a melhor base para as projeções.",
  "js.raceDate":
    "Data",
  "js.raceDistance":
    "Prova",
  "js.raceTime":
    "Tempo",
  "js.raceSource":
    "Reconhecida por",
  "js.raceBy.user":
    "você",
  "js.raceBy.strava":
    "marcada como prova no Strava",
  "js.raceBy.name":
    "nome da atividade",
  "js.raceBy.auto":
    "sugestão: distância oficial, esforço sustentado",
  "js.raceCandidate":
    "a confirmar",
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
  "privacy.ld.q3": "Como a ferramenta protege o endereço da sua casa?",
  "privacy.ld.a3":
    "Os primeiros e últimos pontos de um percurso GPS revelam o endereço da sua casa com precisão de metros. Por padrão, o dossiê não contém nenhuma coordenada. Se você decidir mantê-las, uma zona de privacidade ajustável apaga as posições próximas da largada e da chegada sem cortar o treino: distâncias, durações e cálculos continuam completos.",
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
  "privacy.trim.title": "A zona de privacidade",
  "privacy.trim.text":
    "Os primeiros e últimos pontos de um percurso revelam a porta da sua casa. Por padrão, <strong>o dossiê não contém nenhuma coordenada</strong>: altimetria, pace e frequência cardíaca bastam para a análise. Se você decidir manter as coordenadas, ajuste uma zona de privacidade: as posições dentro desse raio em volta da largada e da chegada são apagadas, inclusive quando o percurso volta a passar perto da sua casa. O treino nunca é cortado: distâncias, durações e cálculos cobrem a gravação completa, e o dossiê avisa a IA.",
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
  "privacy.updated": "Última atualização: <time datetime=\"2026-09-29\">29 de setembro de 2026</time>.",
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
  "post.next":
    "Para passar dessas perguntas a um acompanhamento de verdade, semana após semana: <a href=\"{{href:post-ia-coach.html}}\">configurar um treinador de IA no ChatGPT, no Claude, no Gemini ou no Vibe</a>.",

  "coach.title": "Planilha de corrida com ChatGPT, Claude, Gemini ou Vibe",
  "coach.description":
    "Ficha de atleta, regras de treinador para copiar e colar, configuração no ChatGPT, Claude, Gemini e Vibe, e como passar seus treinos de graça.",
  "coach.kicker": "Guia prático",
  "coach.h1": "Transforme o ChatGPT, o Claude, o Gemini ou o Vibe no seu treinador de corrida",
  "coach.meta": "Publicado em <time datetime=\"2026-09-29\">29 de setembro de 2026</time> · 11 min de leitura",
  "coach.lede":
    "Um treinador que conhece seus treinos, seu objetivo e sua panturrilha sensível, disponível às 11 da noite, sem pagar nada a mais: é o que os assistentes de IA prometem. A promessa se cumpre, com duas condições. É preciso passar o contexto de uma vez por todas, senão eles tratam você como um desconhecido a cada treino. E é preciso entregar seus treinos a eles, o que é bem menos simples do que parece.",
  "coach.tldr1":
    "Uma IA é um bom treinador se tiver três coisas: seu perfil, seus treinos reais e regras de conduta. Sem elas, ela recita uma planilha genérica.",
  "coach.tldr2":
    "O difícil é fazer seus treinos chegarem até ela. O conector oficial do Strava é pago e só funciona com o Claude. Exportar arquivos é grátis e funciona em qualquer lugar, mas um arquivo bruto é pesado demais: é preciso comprimi-lo.",
  "coach.tldr3":
    "ChatGPT, Claude e Vibe têm projetos, o Gemini tem os Gems: a ficha de atleta e as regras ficam ali de uma conversa para outra. Todos existem na versão gratuita.",
  "coach.tldr4":
    "A rotina que funciona: um balanço por semana, numa conversa nova, com seus treinos e uma linha sobre como você se sentiu. E mantenha o controle: uma IA tende a concordar com você.",

  "coach.can.title": "Uma IA consegue mesmo ser seu treinador?",
  "coach.can.p1":
    "Sim, em boa parte do trabalho de um treinador: ler seus treinos, ligá-los ao seu objetivo e ajustar o que vem depois. Não, em tudo o que exige ver ou tocar você. A fronteira é clara, e vale conhecê-la antes de começar.",
  "coach.can.goodIntro": "O que uma IA faz bem:",
  "coach.can.good1": "analisar um treino e dizer, com números, se ele cumpriu o objetivo;",
  "coach.can.good2":
    "reorganizar sua semana quando a vida atrapalha: uma viagem, um resfriado, uma reunião que se estende;",
  "coach.can.good3": "explicar o porquê de cada treino, algo que muitas planilhas prontas nunca fazem;",
  "coach.can.good4": "responder às 11 da noite sem se cansar da sua décima pergunta.",
  "coach.can.badIntro": "O que ela nunca vai fazer:",
  "coach.can.bad1": "ver você correr, e portanto corrigir sua passada ou sua postura;",
  "coach.can.bad2": "perceber que você está mais cansado do que diz;",
  "coach.can.bad3": "diagnosticar uma dor.",
  "coach.can.p2":
    "Pense nela como um preparador muito disponível que nunca viu você correr. Tudo o que ela sabe sobre você é o que você dá para ela ler. Daí o que vem a seguir.",

  "coach.need.title": "O que o seu treinador de IA precisa saber antes de começar?",
  "coach.need.p1": "Três coisas. Se faltar uma, a qualidade dos conselhos despenca.",
  "coach.need.li1":
    "<strong>Seu perfil.</strong> Seu nível, seu objetivo, suas limitações e seus pontos fracos. Sem ele, a IA trata você como um corredor médio, que não existe.",
  "coach.need.li2":
    "<strong>Seus treinos reais.</strong> Não suas lembranças: seus dados. É o ingrediente mais difícil de fornecer, e voltamos a ele logo abaixo.",
  "coach.need.li3":
    "<strong>Regras de conduta.</strong> Como raciocinar, o que recusar, em que formato responder. É isso que separa um treinador de uma máquina de conselhos.",
  "coach.sheet.title": "A ficha de atleta, para preencher uma única vez",
  "coach.sheet.intro":
    "Copie este modelo, preencha em cinco minutos e salve num arquivo de texto. Atualize depois de cada prova ou quando seu objetivo mudar.",
  "coach.sheet.text":
    "FICHA DE ATLETA\nIdade, sexo, anos de corrida:\nVolume atual (km e treinos por semana):\nMelhores marcas dos últimos 12 meses (5 km, 10 km, meia, maratona):\nFC máxima e FC de repouso, se souber:\nObjetivo (prova, distância, data, tempo desejado):\nDisponibilidade (dias possíveis, duração máxima por treino):\nLesões passadas e pontos fracos:\nEquipamento (relógio, cinta cardíaca ou sensor de pulso):\nO que eu gosto e o que eu detesto no treino:",

  "coach.data.title": "Como entregar seus treinos ao seu treinador de IA?",
  "coach.data.p1":
    "É a etapa que quase todos os guias pulam, e é a mais difícil. Sua IA não enxerga seu relógio: você precisa levar os treinos até ela. Existem dois caminhos, e eles não custam o mesmo.",
  "coach.data.strava.title": "O conector do Strava: prático, mas pago e só para o Claude",
  "coach.data.strava.p":
    "Desde junho de 2026, o Strava oferece um conector oficial, um servidor MCP, que deixa o Claude ler seu histórico diretamente. É confortável: nada de exportar, a IA busca o que precisa. Mas é preciso uma assinatura paga do Strava, e o conector só funciona com o Claude. O Strava promete outros assistentes mais tarde, sem data. O Strava não tem conector oficial para ChatGPT, Gemini ou Vibe até agora, e os não oficiais exigem uma instalação técnica.",
  "coach.data.garmin.title":
    "Serviços de terceiros para o Garmin: outra porta, com intermediário",
  "coach.data.garmin.p":
    "Do lado do Garmin, alguns serviços de terceiros fazem a ponte. O Tredict, parceiro oficial do Garmin, oferece um app dentro do ChatGPT que funciona até com uma conta gratuita do ChatGPT, além de um servidor MCP para o Claude. O Shape faz o mesmo por 5 dólares por mês, mas exige um plano pago do ChatGPT. Nos dois casos, você abre uma conta num terceiro e entrega a ele seus dados do Garmin. Faz sentido se você também quer enviar treinos para o relógio. Para analisar suas corridas, a exportação continua grátis e não passa por ninguém.",
  "coach.data.export.title": "Exportar arquivos: grátis e universal, desde que você comprima",
  "coach.data.export.p1":
    "Garmin Connect, Coros, Polar Flow e Strava permitem exportar um treino de graça em FIT, TCX ou GPX. Esse arquivo funciona com qualquer IA, inclusive nos planos gratuitos. A armadilha é o tamanho: uma hora de corrida em TCX pesa cerca de 533 mil tokens, o suficiente para esgotar um plano gratuito com um único treino (<a href=\"{{href:post-ia-analyse.html}}\">veja por quê</a>).",
  "coach.data.export.p2":
    "A solução: comprimir e reestruturar o arquivo antes de entregá-lo à IA. O gps-digest transforma cada treino num dossiê de cerca de 5.800 tokens, com parciais, zonas, repetições, deriva cardíaca e confiabilidade do sensor. Qualquer assistente, gratuito ou pago, lê tudo.",
  "coach.data.colStrava": "Conector do Strava",
  "coach.data.colExport": "Exportação + gps-digest",
  "coach.data.r1": "Custo",
  "coach.data.r1strava": "Assinatura paga do Strava",
  "coach.data.r1export": "Grátis",
  "coach.data.r2": "Assistentes compatíveis",
  "coach.data.r2strava": "Só o Claude, por enquanto",
  "coach.data.r2export": "Todos: ChatGPT, Claude, Gemini, Vibe e os outros",
  "coach.data.r3": "Esforço",
  "coach.data.r3strava": "Nenhum, depois de conectado",
  "coach.data.r3export": "Uma exportação e um arrastar e soltar por semana",
  "coach.data.r4": "O que a IA recebe",
  "coach.data.r4strava": "Os dados do Strava, resumidos ou segundo a segundo",
  "coach.data.r4export": "Um dossiê já calculado: zonas, repetições, deriva, confiabilidade do sensor",
  "coach.data.r5": "Coordenadas GPS",
  "coach.data.r5strava": "Acessíveis à IA",
  "coach.data.r5export": "Removidas por padrão",
  "coach.data.p3":
    "Assinante do Strava e usuário do Claude? O conector vai economizar alguns minutos por semana. Para todos os outros, a exportação gratuita funciona muito bem. Basta comprimir os arquivos antes de entregá-los à IA.",

  "coach.rules.title": "As instruções de treinador, para copiar e colar",
  "coach.rules.intro":
    "Este texto define o comportamento da sua IA. Ele é curto de propósito: cada regra corrige um defeito conhecido dos modelos de linguagem.",
  "coach.rules.text":
    "Você é meu treinador de corrida. Você analisa meus treinos, acompanha meu progresso rumo ao meu objetivo e ajusta meu treinamento semana após semana.\n\nMeu perfil está na ficha de atleta. Meus treinos chegam como dossiês do gps-digest.\n\nRegras:\n1. Apoie cada observação num número do dossiê, e cite-o.\n2. Se um dado estiver faltando ou não for confiável, diga isso em vez de adivinhar.\n3. Seja franco. Se um treino deu errado ou um objetivo é irreal, diga claramente.\n4. Parta do meu volume real e justifique cada aumento de carga.\n5. Se eu relatar uma dor que persiste, piora ou muda minha passada, diga para eu procurar um profissional de saúde em vez de propor um plano.\n6. Se faltar informação para decidir, pergunte.\n7. Termine cada balanço com no máximo três ações concretas.",
  "coach.rules.note":
    "As regras 1 e 2 impedem a IA de preencher lacunas com números plausíveis. A 3 combate a tendência dela de concordar com você. A 4 segura planilhas ambiciosas demais. A 5 lembra que um chatbot não é médico.",
  "coach.copy": "Copiar",
  "coach.copied": "Copiado",

  "coach.setup.title": "Como configurar seu treinador no ChatGPT, no Claude, no Gemini ou no Vibe?",
  "coach.setup.intro":
    "Os quatro assistentes têm um espaço onde a ficha e as regras ficam guardadas de uma conversa para outra. Nada de colar tudo de novo a cada vez.",
  "coach.setup.colTool": "Assistente",
  "coach.setup.colWhere": "Onde o treinador mora",
  "coach.setup.colPlus": "Vantagem para quem corre",
  "coach.setup.gpt.where": "Um projeto, com instruções e arquivos",
  "coach.setup.gpt.plus": "O modo de voz, para comentar o treino em voz alta na volta",
  "coach.setup.claude.where": "Um projeto, com instruções e conhecimento",
  "coach.setup.claude.plus": "Pode entregar a planilha da semana num documento à parte, fácil de reaproveitar",
  "coach.setup.gemini.where": "Um Gem, com instruções e conhecimento",
  "coach.setup.gemini.plus": "Conectado ao Google Drive e ao Google Agenda",
  "coach.setup.vibe.where": "Um projeto, com instruções e arquivos",
  "coach.setup.vibe.plus": "Uma empresa europeia: a Mistral AI, sediada em Paris",
  "coach.setup.gpt.title": "ChatGPT: criar um projeto",
  "coach.setup.gpt.text":
    "Na barra lateral, crie um novo projeto, por exemplo “Treinador de corrida”. Cole as regras nas <strong>instruções do projeto</strong> e adicione a ficha de atleta aos <strong>arquivos</strong> dele. Todas as conversas abertas nesse projeto partem desse contexto. O plano gratuito limita o número de arquivos por projeto: guarde-os para a ficha e cole os dossiês dos treinos direto na conversa.",
  "coach.setup.claude.title": "Claude: criar um projeto",
  "coach.setup.claude.text":
    "Crie um projeto, cole as regras nas <strong>instruções</strong> dele e envie a ficha de atleta para o <strong>conhecimento</strong> do projeto. Cada conversa nova no projeto começa com as duas coisas. O plano gratuito limita o número de projetos e o espaço disponível, mas uma ficha e um dossiê por semana cabem com folga.",
  "coach.setup.gemini.title": "Gemini: criar um Gem",
  "coach.setup.gemini.text":
    "Abra o gerenciador de Gems e crie um <strong>novo Gem</strong>. Cole as regras nas <strong>instruções</strong> dele e adicione a ficha de atleta ao <strong>conhecimento</strong>, a partir do computador ou do Google Drive. Os Gems são gratuitos e acompanham você no app para celular.",
  "coach.setup.vibe.title": "Vibe: criar um projeto",
  "coach.setup.vibe.text":
    "Vibe é o novo nome do Le Chat, da Mistral AI, desde maio de 2026. Crie um <strong>novo projeto</strong>, abra a personalização dele para colar as regras e adicione a ficha de atleta aos <strong>arquivos</strong>. Os projetos existem em todos os planos, com limites.",
  "coach.setup.fallback":
    "Seu plano não tem espaço dedicado, ou você não quer criar um? Cole a ficha e as regras no início de cada conversa nova. É menos confortável, e funciona igualmente bem.",

  "coach.weekly.title": "A rotina que faz você evoluir: um balanço por semana",
  "coach.weekly.intro":
    "Um treinador útil acompanha você ao longo do tempo. O mais eficaz é um horário fixo, domingo à noite ou segunda de manhã, que leva dez minutos.",
  "coach.weekly.step1":
    "<strong>Exporte os treinos da semana</strong> do seu relógio ou do Strava, de preferência em FIT.",
  "coach.weekly.step2":
    "<strong>Envie-os para o <a href=\"{{href:index.html}}\">gps-digest</a></strong> e copie o dossiê. Tudo é calculado no seu navegador.",
  "coach.weekly.step3":
    "<strong>Abra uma conversa nova no projeto</strong>, cole o dossiê e acrescente uma linha sobre como você se sentiu.",
  "coach.weekly.step4": "<strong>Faça a pergunta do balanço</strong> e discuta a semana proposta antes de adotá-la.",
  "coach.weekly.promptIntro": "A pergunta do balanço, para copiar do jeito que está:",
  "coach.weekly.prompt":
    "Aqui estão meus treinos da semana e como me senti. Faça o balanço:\n1. O que foi bem? Com números.\n2. O que merece atenção?\n3. Minha carga está coerente com meu objetivo e a data da prova?\n4. Proponha a próxima semana, treino por treino, com o objetivo de cada um.\n\nMinhas restrições para a próxima semana: [preencher]",
  "coach.weekly.feel":
    "A linha sobre como você se sentiu conta tanto quanto os dados. Seu relógio não sabe que você dormiu mal nem que a panturrilha está repuxando desde terça. Por exemplo: “Esforço percebido 8/10 no sábado, duas noites ruins, panturrilha direita travada desde terça.” Sem ela, a IA julga sua semana só pelo relógio.",
  "coach.weekly.fresh":
    "Por que uma conversa nova toda semana? Porque um modelo aproveita mal o que fica no meio de uma troca muito longa (Liu et al., 2024). Semana após semana no mesmo fio, as primeiras instruções se diluem. O projeto guarda a ficha e as regras; o dossiê traz os fatos. Uma vez por mês, entregue o dossiê das últimas quatro semanas para ela avaliar a tendência.",

  "coach.more.title": "Mais quatro pedidos que funcionam bem",
  "coach.more.intro": "Além do balanço, estes pedidos tiram o melhor de um treinador de IA bem configurado:",
  "coach.more.q1":
    "“Analise meu intervalado: regularidade das repetições, recuperação entre elas e o que devo mudar na próxima vez.”",
  "coach.more.q2":
    "“Minha prova é daqui a dez dias. Aqui estão minhas últimas seis semanas. Que ritmo devo buscar e como organizo o polimento?”",
  "coach.more.q3":
    "“Só tenho três dias para correr nesta semana. Fique com o essencial e me diga do que estou abrindo mão.”",
  "coach.more.q4":
    "“Monte uma planilha de doze semanas para uma meia maratona em 1h45, partindo do meu volume atual. Inclua semanas regenerativas e justifique a progressão.”",

  "coach.traps.title": "As cinco armadilhas do treinador de IA, e como evitá-las",
  "coach.traps.intro": "Um treinador de IA mal usado não avisa quando erra. Estes são os erros mais comuns.",
  "coach.traps.li1":
    "<strong>Ele concorda com você.</strong> Os modelos de linguagem tendem a seguir a linha de quem conversa com eles, um viés bem documentado (Sharma et al., 2024). Pergunte “O que está errado neste treino?” em vez de “Foi um bom treino?”.",
  "coach.traps.li2":
    "<strong>Ele inventa quando faltam números.</strong> Sem dados, ele completa com valores plausíveis, sempre com tom seguro. Daí as regras 1 e 2, e um dossiê completo.",
  "coach.traps.li3":
    "<strong>Ele só sabe o que você conta.</strong> Seu sono, seu estresse, sua semana de trabalho: nada disso está no relógio. Sem a linha sobre como você se sentiu, ele acha que você está em plena forma.",
  "coach.traps.li4":
    "<strong>As planilhas dele às vezes são ambiciosas demais.</strong> No papel, uma planilha não cansa ninguém. Exija que ele parta do seu volume real e justifique cada aumento.",
  "coach.traps.li5":
    "<strong>Ele não é médico.</strong> Uma dor que persiste, piora ou muda sua passada é assunto para um profissional de saúde, não para um chatbot.",

  "coach.choose.title": "Qual IA escolher como treinador de corrida?",
  "coach.choose.p1":
    "A que você já usa. ChatGPT, Claude, Gemini e Vibe sabem ler um dossiê estruturado, seguir regras e propor uma semana coerente. As diferenças dependem dos seus hábitos: o ecossistema Google para o Gemini, o resumo por voz para o ChatGPT, os documentos longos e o conector do Strava para o Claude, uma empresa europeia para o Vibe.",
  "coach.choose.p2":
    "O que muda de verdade a qualidade do treino não é o modelo. É o que você dá para ele ler.",

  "coach.faq.q1": "Dá para usar o ChatGPT como treinador de corrida de graça?",
  "coach.faq.a1":
    "Sim. Os projetos do ChatGPT, do Claude e do Vibe, assim como os Gems do Gemini, existem nos planos gratuitos, com limites de arquivos e de uso. Exportar seus treinos também é grátis. Só é preciso comprimi-los antes de colar, senão um único treino pode esgotar um plano gratuito.",
  "coach.faq.q2": "O ChatGPT consegue criar uma planilha de treino para maratona?",
  "coach.faq.a2":
    "Sim, e bem, se partir do seu nível real: volume atual, marcas recentes, disponibilidade e data da prova. Um estudo mediu isso: treinadores experientes consideram as planilhas do ChatGPT longe do ideal, mas a qualidade sobe bastante quando ele recebe mais informações sobre o corredor (Düking et al., 2024). Peça que ele justifique a progressão e ajuste a planilha toda semana com seus treinos reais, em vez de segui-la às cegas.",
  "coach.faq.q3": "Dá para conectar o Strava ou o Garmin direto a uma IA?",
  "coach.faq.a3":
    "Desde junho de 2026, o Strava oferece um conector oficial, reservado aos assinantes pagos e, por enquanto, ao Claude. Para o Garmin, serviços de terceiros como o Tredict ou o Shape fazem a ponte, com uma conta na plataforma deles. Fora isso, o caminho mais simples continua sendo exportar arquivos, o que o Garmin Connect e o Strava oferecem: grátis, compatível com todas as IAs, desde que você comprima os arquivos antes de colar.",
  "coach.faq.q4": "O que acontece com os dados que eu passo ao meu treinador de IA?",
  "coach.faq.a4":
    "O que você cola num assistente é processado pela empresa responsável, conforme os termos dela. Confira nas configurações a retenção do histórico e o uso das conversas para treinar modelos. O dossiê do gps-digest, por sua vez, não contém suas coordenadas GPS por padrão.",
  "coach.faq.q5": "É preciso escrever para o treinador de IA em inglês?",
  "coach.faq.a5":
    "Não. Os quatro assistentes respondem muito bem em português, e o gps-digest gera o dossiê no idioma da página. Você pode fazer tudo em português, da ficha de atleta ao balanço semanal.",

  "coach.end.title": "Um bom treinador começa com bons dados",
  "coach.end.text":
    "O gps-digest transforma os arquivos do seu relógio num dossiê que o ChatGPT, o Claude, o Gemini ou o Vibe conseguem analisar de verdade, até na versão gratuita. Sem cadastro, e seus arquivos não saem do navegador.",

  "coach.sources.sharma":
    "Sharma M, et al. <em>Towards Understanding Sycophancy in Language Models.</em> ICLR 2024. <a href=\"https://arxiv.org/abs/2310.13548\" rel=\"nofollow\">arXiv:2310.13548</a>.",
  "coach.sources.duking":
    "Düking P, et al. <em>ChatGPT Generated Training Plans for Runners are not Rated Optimal by Coaching Experts, but Increase in Quality with Additional Input Information.</em> Journal of Sports Science and Medicine, 2024, 23(1), 56-72. <a href=\"https://www.jssm.org/jssm-23-56.xml%3EFulltext\" rel=\"nofollow\">jssm.org</a>.",

  "guide.kicker":
    "Guia de exportação",
  "guide.formats.title":
    "FIT, TCX ou GPX: qual formato exportar?",
  "guide.formats.colFormat":
    "Formato",
  "guide.formats.colContent":
    "O que contém",
  "guide.formats.colUse":
    "Quando usar",
  "guide.formats.fit":
    "Tudo: frequência cardíaca, voltas, sensor cardíaco pareado, altimetria barométrica, piscinas",
  "guide.formats.fitUse":
    "Primeira opção",
  "guide.formats.tcx":
    "Frequência cardíaca, voltas, cadência; sem o sensor pareado nem a altimetria barométrica",
  "guide.formats.tcxUse":
    "Boa alternativa",
  "guide.formats.gpx":
    "O trajeto e os tempos, muitas vezes a frequência cardíaca e a cadência; sem voltas",
  "guide.formats.gpxUse":
    "Último recurso",
  "guide.why.title":
    "Por que não colar o arquivo direto no ChatGPT?",
  "guide.why.p":
    "Porque um arquivo de relógio é feito para programas, não para ser lido. O FIT é binário, e uma hora de corrida em TCX pesa cerca de 533 mil tokens: o suficiente para esgotar um plano gratuito com um único treino. Mesmo quando o arquivo passa, a IA raciocina mal sobre milhares de linhas brutas. <a href=\"{{href:post-ia-analyse.html}}\">A explicação completa está aqui</a>.",
  "guide.next.title":
    "E depois: deixe uma IA analisar seus treinos",
  "guide.next.s1":
    "<strong>Solte o arquivo no <a href=\"{{href:index.html}}\">gps-digest</a></strong> do jeito que está: FIT, TCX, GPX, ZIP ou .gz. Tudo é calculado no seu navegador.",
  "guide.next.s2":
    "<strong>Copie o dossiê gerado</strong>: alguns milhares de tokens por treino, em vez de várias centenas de milhares.",
  "guide.next.s3":
    "<strong>Cole no ChatGPT, no Claude, no Gemini ou no Vibe</strong> com a sua pergunta. Para um acompanhamento semana após semana, siga nosso <a href=\"{{href:post-ia-coach.html}}\">guia do treinador de IA</a>.",
  "guide.next.cta":
    "Analisar meus treinos",
  "guide.more.title":
    "Os outros guias de exportação",
  "blog.guides":
    "Guias de exportação",
  "guide.garmin.title":
    "Exportar dados do Garmin (FIT) para o ChatGPT: o guia",
  "guide.garmin.description":
    "Exporte uma atividade do Garmin Connect em FIT, baixe todo o seu histórico ou copie os arquivos do relógio por USB, e deixe o ChatGPT analisar.",
  "guide.garmin.h1":
    "Exporte seus treinos do Garmin para o ChatGPT analisar",
  "guide.garmin.meta":
    "Publicado em <time datetime=\"2026-10-01\">1º de outubro de 2026</time> · 4 min de leitura",
  "guide.garmin.lede":
    "O Garmin Connect mostra seus treinos, mas não os entrega ao ChatGPT. Primeiro é preciso tirar o arquivo de lá. Veja três jeitos de fazer isso, do mais rápido ao mais completo, e o que fazer com o arquivo depois.",
  "guide.garmin.tldr1":
    "Um treino: no site connect.garmin.com, engrenagem da atividade, exportar o arquivo original. Você recebe um ZIP com o FIT dentro.",
  "guide.garmin.tldr2":
    "O app Garmin Connect para celular não exporta arquivos: use um computador ou conecte o relógio por USB.",
  "guide.garmin.tldr3":
    "O FIT bruto é ilegível para o ChatGPT. Solte o ZIP do jeito que está no gps-digest e cole o dossiê gerado na sua IA.",
  "guide.garmin.m1.title":
    "Exportar um treino pelo Garmin Connect",
  "guide.garmin.m1.intro":
    "É o método do dia a dia. Ele é feito no site, a partir de um computador.",
  "guide.garmin.m1.s1":
    "Entre em <strong>connect.garmin.com</strong>.",
  "guide.garmin.m1.s2":
    "Abra <strong>Atividades</strong> no menu à esquerda e depois o treino desejado.",
  "guide.garmin.m1.s3":
    "Clique na <strong>engrenagem</strong>, no canto superior direito da atividade.",
  "guide.garmin.m1.s4":
    "Escolha a opção que exporta o <strong>arquivo original</strong>: o nome muda conforme a versão do site. Também existem as exportações TCX e GPX, mas o FIT original é mais completo.",
  "guide.garmin.m1.s5":
    "O download é um <strong>ZIP</strong> com o arquivo FIT dentro. Não precisa descompactar: o gps-digest abre do jeito que está.",
  "guide.garmin.m1.note":
    "Vários treinos? Exporte um por um e solte todos os ZIP de uma vez.",
  "guide.garmin.m2.title":
    "Sem internet: copiar os arquivos do relógio por USB",
  "guide.garmin.m2.p":
    "Conecte o relógio a um computador com o cabo. Ele aparece como um disco ou um dispositivo chamado GARMIN. Os treinos ficam na pasta <code>GARMIN/Activity</code>, um arquivo FIT por atividade. Copie os mais recentes e solte no gps-digest. No Mac, os relógios recentes não aparecem como disco: é preciso um utilitário de transferência de arquivos MTP.",
  "guide.garmin.m3.title":
    "Todo o histórico: a exportação completa da conta",
  "guide.garmin.m3.p":
    "Para recuperar anos de treinos, entre na sua conta Garmin e, na seção de gerenciamento de dados, solicite a exportação dos seus dados. A Garmin envia por e-mail um link para um arquivo ZIP com a conta inteira, em geral em poucos dias. Os FIT ficam dentro de ZIP aninhados. O gps-digest sabe encontrá-los, mas o arquivo costuma pesar várias centenas de MB: descompacte e solte só os treinos das últimas semanas.",
  "guide.garmin.faq.q1":
    "Dá para exportar um treino pelo app Garmin Connect no celular?",
  "guide.garmin.faq.a1":
    "Não, o app para celular não oferece exportação de arquivos. Use o site connect.garmin.com num computador ou copie os arquivos do relógio por USB.",
  "guide.garmin.faq.q2":
    "Por que o ChatGPT não lê meu arquivo FIT do Garmin?",
  "guide.garmin.faq.a2":
    "O FIT é um formato binário: o ChatGPT precisa escrever um script para decodificá-lo e muitas vezes aproveita só uma parte. Mesmo convertida em texto, uma hora de corrida vira centenas de milhares de tokens. O gps-digest decodifica o arquivo no seu navegador e gera um dossiê de cerca de 5.800 tokens por treino.",
  "guide.garmin.faq.q3":
    "É preciso assinar o Garmin Connect+ para exportar seus dados?",
  "guide.garmin.faq.a3":
    "Não. A exportação de um treino e a exportação completa da conta são gratuitas.",
  "guide.strava.title":
    "Exportar atividades do Strava (GPX, FIT) para o ChatGPT: o guia",
  "guide.strava.description":
    "Exporte uma atividade do Strava em GPX ou no formato original, baixe todo o seu arquivo e deixe o ChatGPT, o Claude ou o Gemini analisar. Grátis.",
  "guide.strava.h1":
    "Exporte suas atividades do Strava para o ChatGPT analisar",
  "guide.strava.meta":
    "Publicado em <time datetime=\"2026-10-01\">1º de outubro de 2026</time> · 4 min de leitura",
  "guide.strava.lede":
    "O Strava guarda suas corridas, mas não as entrega à sua IA, a não ser por um conector pago que só funciona com o Claude. A boa notícia: exportar é grátis, desde que você use o site. Veja como, e o que fazer com o arquivo depois.",
  "guide.strava.tldr1":
    "O mais completo: o arquivo da sua conta (strava.com/account, “Download your account”). Solte o ZIP do jeito que veio: o gps-digest fica com os seus últimos 12 meses.",
  "guide.strava.tldr2":
    "O app do Strava para celular não exporta nada: é preciso usar o site, num computador.",
  "guide.strava.tldr3":
    "O arquivo bruto é pesado demais para o ChatGPT. Solte no gps-digest, mesmo compactado em .gz, e cole o dossiê na sua IA.",
  "guide.strava.m1.title":
    "Exportar uma atividade em strava.com",
  "guide.strava.m1.intro":
    "A exportação só funciona no site do Strava. Ela é gratuita para as suas próprias atividades.",
  "guide.strava.m1.s1":
    "Entre em <strong>strava.com</strong> num computador e abra a atividade.",
  "guide.strava.m1.s2":
    "Clique no botão <strong>“…”</strong> (mais ações), à esquerda da atividade.",
  "guide.strava.m1.s3":
    "Escolha <strong>exportar o arquivo original</strong> se a atividade veio de um relógio: você recebe o FIT do relógio, a versão mais completa.",
  "guide.strava.m1.s4":
    "Se não, escolha <strong>exportar GPX</strong>. Ele contém o trajeto, os tempos e, se foram gravados, a frequência cardíaca, a cadência e a temperatura.",
  "guide.strava.m1.s5":
    "Solte o arquivo baixado no gps-digest.",
  "guide.strava.m1.note":
    "Se a atividade foi gravada com o app do Strava no celular, a exportação GPX resolve muito bem.",
  "guide.strava.m2.title":
    "Recomendado: o arquivo da sua conta, para um ano de contexto",
  "guide.strava.m2.p":
    "Em <a href=\"https://www.strava.com/account\" rel=\"noopener\">strava.com/account</a>, na seção “Download your account”, solicite o arquivo da sua conta. O Strava envia um link por e-mail, em geral em poucas horas. Solte o ZIP do jeito que veio no gps-digest: a ferramenta encontra seus treinos, ignora fotos e rotas e fica com os últimos 12 meses por padrão, de 3 meses a todo o histórico. Os últimos 14 dias são detalhados treino a treino e o resto ocupa uma linha por treino: um ano com mais de 300 treinos dá cerca de 30 mil tokens.",
  "guide.strava.m3.title":
    "Um cuidado: o pace do Strava não é o do Garmin",
  "guide.strava.m3.p":
    "O Strava calcula o pace sobre o tempo em movimento; o Garmin Connect, sobre a duração total. Numa corrida na cidade, com paradas nos semáforos, a diferença passa fácil de 15 segundos por quilômetro. O gps-digest indica no dossiê qual convenção usa, para a IA não comparar números que não são comparáveis.",
  "guide.strava.faq.q1":
    "Dá para exportar uma atividade pelo app do Strava?",
  "guide.strava.faq.a1":
    "Não. A exportação só é feita no site strava.com, num computador.",
  "guide.strava.faq.q2":
    "É preciso assinar o Strava para exportar suas atividades?",
  "guide.strava.faq.a2":
    "Não, exportar as suas próprias atividades é grátis. A assinatura só é necessária para o conector oficial que liga o Strava ao Claude.",
  "guide.strava.faq.q3":
    "Exportar GPX ou o arquivo original: qual escolher?",
  "guide.strava.faq.a3":
    "O arquivo original se a atividade veio de um relógio: costuma ser um FIT, mais completo (voltas, sensor pareado, altimetria barométrica). Se não, o GPX: ele guarda o trajeto e, quase sempre, a frequência cardíaca.",
  "guide.strava.source":
    "Ajuda do Strava, <em>Exporting your Data and Bulk Export</em>. <a href=\"https://support.strava.com/en-us/articles/15401919-exporting-your-data-and-bulk-export\" rel=\"nofollow\">support.strava.com</a>.",
  "guide.apple.title":
    "Exportar treinos do Apple Watch (GPX, FIT) para o ChatGPT",
  "guide.apple.description":
    "A Apple não oferece exportação direta dos seus treinos. Três jeitos de obter um treino do Apple Watch em FIT ou GPX e deixar o ChatGPT analisar.",
  "guide.apple.h1":
    "Exporte seus treinos do Apple Watch para o ChatGPT analisar",
  "guide.apple.meta":
    "Publicado em <time datetime=\"2026-10-01\">1º de outubro de 2026</time> · 4 min de leitura",
  "guide.apple.lede":
    "Suas corridas com o Apple Watch ficam guardadas no app Saúde do iPhone, e a Apple não oferece nenhum botão para tirar de lá um arquivo GPX ou FIT. Mesmo assim, existem três jeitos de recuperá-las.",
  "guide.apple.tldr1":
    "O mais simples: um app que lê o Saúde e exporta em FIT ou GPX, como o HealthFit ou o WorkoutGPX.",
  "guide.apple.tldr2":
    "Sem pagar: sincronize seus treinos com o Strava e exporte-os em strava.com.",
  "guide.apple.tldr3":
    "Você pode abrir o gps-digest direto no Safari do iPhone e soltar ali o arquivo exportado.",
  "guide.apple.m1.title":
    "Com um app de exportação: o mais completo",
  "guide.apple.m1.intro":
    "Alguns apps leem seus treinos no Saúde e os exportam num formato padrão, com a frequência cardíaca. O HealthFit exporta em FIT, GPX ou TCX; o WorkoutGPX, em GPX. Confira na App Store o que a versão gratuita permite.",
  "guide.apple.m1.s1":
    "Instale o app e permita que ele leia seus <strong>treinos</strong>, suas <strong>rotas</strong> e sua <strong>frequência cardíaca</strong> no Saúde.",
  "guide.apple.m1.s2":
    "Escolha o treino a exportar.",
  "guide.apple.m1.s3":
    "Exporte em <strong>FIT</strong> se o app oferecer; se não, em GPX.",
  "guide.apple.m1.s4":
    "Salve o arquivo no app <strong>Arquivos</strong> ou envie para o computador por AirDrop.",
  "guide.apple.m1.s5":
    "Abra o gps-digest no Safari, no iPhone ou no computador, e solte o arquivo.",
  "guide.apple.m1.note":
    "O FIT é melhor que o GPX: ele guarda as voltas e os dados dos sensores.",
  "guide.apple.m2.title":
    "Sem pagar: passar pelo Strava",
  "guide.apple.m2.p":
    "Se você usa o Strava, permita que ele leia seus treinos no Saúde, nas configurações do app do Strava. Seus treinos do Apple Watch passam a ser enviados para lá automaticamente. Depois é só exportá-los em strava.com, como explica nosso <a href=\"{{href:guide-strava.html}}\">guia do Strava</a>.",
  "guide.apple.m3.title":
    "Com a exportação nativa do Saúde: só para curiosos",
  "guide.apple.m3.p":
    "No app Saúde, toque na sua foto de perfil e depois em “Exportar Todos os Dados de Saúde”. Você recebe um arquivo ZIP com suas rotas em GPX, na pasta <code>workout-routes</code>. Essas rotas só têm a posição, a altitude e o horário: a frequência cardíaca fica em outro lugar, num enorme arquivo XML. O arquivo costuma pesar centenas de MB. Para analisar um treino, os dois primeiros métodos são bem melhores.",
  "guide.apple.faq.q1":
    "Dá para exportar uma corrida do Apple Watch em GPX sem app?",
  "guide.apple.faq.a1":
    "Só pela exportação completa do Saúde, que entrega as rotas sem a frequência cardíaca. Para um arquivo completo, é preciso um app de exportação ou passar pelo Strava.",
  "guide.apple.faq.q2":
    "O gps-digest funciona no iPhone?",
  "guide.apple.faq.a2":
    "Sim. Abra a página no Safari, toque no botão para escolher arquivos e selecione o arquivo no app Arquivos. A análise é feita no celular; nada é enviado para um servidor.",
  "guide.apple.faq.q3":
    "Qual formato escolher para um treino do Apple Watch?",
  "guide.apple.faq.a3":
    "O FIT, se o seu app de exportação oferecer: ele guarda as voltas e os dados dos sensores. O GPX também serve, desde que tenha a frequência cardíaca, o que os apps de exportação incluem e a exportação nativa do Saúde não.",
  "coach.sources.strava":
    "Strava, <em>Strava Launches MCP Connector, Allowing Athletes to Sync Training History to Claude</em>, comunicado de 1º de junho de 2026. <a href=\"https://press.strava.com/articles/strava-launches-mcp-connector\" rel=\"nofollow\">press.strava.com</a>.",
  "coach.sources.docs":
    "Documentação oficial: <a href=\"https://help.openai.com/en/articles/10169521-projects-in-chatgpt\" rel=\"nofollow\">projetos do ChatGPT</a>, <a href=\"https://support.claude.com/en/articles/9517075-what-are-projects\" rel=\"nofollow\">projetos do Claude</a>, <a href=\"https://support.google.com/gemini/answer/15146780\" rel=\"nofollow\">Gems do Gemini</a>, <a href=\"https://docs.mistral.ai/vibe/work/projects\" rel=\"nofollow\">projetos do Vibe</a>.",
  "privacy.analytics.row": "Estatísticas de visitas",
  "privacy.analytics.rowText":
    "<strong>Sim, anônimas.</strong> O Cloudflare Web Analytics conta as páginas vistas, sem cookie nem identificador persistente. Nada sobre seus arquivos ou seus treinos.",
  "privacy.analytics.active":
    "A medição de audiência usa o Cloudflare Web Analytics: sem cookie, sem identificador persistente e sem nenhum dado dos seus arquivos. Ela conta páginas vistas, países, origens de tráfego e tipos de aparelho, nunca uma pessoa.",
  "privacy.verify.p1Analytics":
    "Não acredite só na nossa palavra. Abra as ferramentas de desenvolvedor do seu navegador (<code>F12</code>), aba <strong>Rede</strong>, e envie um arquivo. Você verá o carregamento da página, a medição de audiência para <code>cloudflareinsights.com</code> e, se o clima estiver ativado, uma requisição para <code>open-meteo.com</code>. Nada mais. Nenhuma requisição contém o conteúdo do seu arquivo.",
};
