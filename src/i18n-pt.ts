/**
 * Catalogue portugais. Les clés et les paramètres suivent le français
 * (i18n.ts), qui fait référence.
 *
 * Variante brésilienne (le marché le plus large), rédigée pour rester lisible
 * au Portugal : « ritmo » pour l'allure, « FC » pour la fréquence cardiaque,
 * « bpm » conservé comme unité, pas d'espace avant « % ».
 */

import type { Catalog } from "./i18n.ts";

export const pt: Partial<Catalog> = {
  "unit.percent": "%",

  "digest.errFormat": "Formato não reconhecido para “{filename}”. Formatos aceitos: TCX, GPX, FIT.",
  "digest.errNoTime":
    "“{filename}” não tem registro de horário: é uma rota planejada, não um treino gravado.",
  "digest.errNoPoints": "Nenhum ponto utilizável no arquivo.",
  "digest.warnZonesObserved":
    "Zonas de FC calculadas com a FC máxima observada no arquivo, não com um perfil de atleta: interpretar com cautela.",
  "digest.warnNoFtp": "FTP desconhecido: IF e TSS não calculados.",
  "digest.warnCoords":
    "Coordenadas de largada e chegada não recortadas: o percurso pode revelar um endereço residencial.",
  "digest.warnHrSource":
    "Fonte de FC estimada: {label} (confiança {confidence}). Comparar valores cardíacos apenas entre sessões da mesma fonte.",
  "digest.warnDrift": "Deriva cardíaca não calculada: {reason}",

  "sensor.label.chest_strap": "cinta peitoral",
  "sensor.label.optical": "sensor de pulso",
  "sensor.label.unknown": "indeterminada",
  "sensor.lockRange": "FC travada na cadência",
  "sensor.device.name":
    "Hardware declarado no arquivo",
  "sensor.device.note":
    "Fonte lida nas mensagens device_info do FIT.",
  "sensor.startDrop.name":
    "Início anômalo",
  "sensor.startDrop.note":
    "A FC cai {bpm} bpm por volta de {min} min sem mudança de ritmo: o sensor se reajustou (pulso frio, cinta seca). O início do treino fica fora dos cálculos cardíacos.",
  "sensor.startDrop.reason":
    "FC anômala no início (queda de {bpm} bpm sem mudança de ritmo)",
  "sensor.swim.name": "Detecção não aplicável",
  "sensor.swim.note":
    "Na natação, a FC é armazenada e descarregada ao sair da água: a forma do sinal não diz nada sobre o sensor. Enviar o arquivo FIT permite, por outro lado, ler diretamente o equipamento pareado.",
  "sensor.lock.name": "Travamento na cadência",
  "sensor.lock.found":
    "A FC acompanha a cadência durante boa parte da sessão: artefato típico de um sensor de pulso.",
  "sensor.lock.none": "Nenhuma confusão entre FC e cadência detectada.",
  "sensor.plateau.name": "Platô mais longo",
  "sensor.plateau.long": "Sequência longa de FC estritamente constante: assinatura da suavização óptica.",
  "sensor.plateau.normal": "Nenhum platô anormalmente longo.",
  "sensor.plateauTime.name": "Tempo em platô",
  "sensor.plateauTime.note": "Parcela do tempo em que a FC não se altera por mais de 5 s.",
  "sensor.step.name": "Variação média",
  "sensor.step.note": "{pct}% dos intervalos sem nenhuma variação.",
  "sensor.lag.name": "Latência de resposta",
  "sensor.lag.slow": "A FC reage com grande atraso às mudanças de ritmo.",
  "sensor.lag.fast": "Resposta rápida às mudanças de ritmo.",
  "sensor.spike.name": "Pico inicial",
  "sensor.spike.note":
    "FC aberrante no início, seguida de queda brusca: eletrodos secos, típico de uma cinta peitoral.",
  "sensor.calibration.name": "Calibração",
  "sensor.calibration.note":
    "Limiares definidos com dados de corrida: no ciclismo os sinais são menos nítidos e o veredito costuma ficar indeterminado. O arquivo FIT tira a dúvida ao informar o equipamento pareado.",

  "drift.wristCaveat":
    "Sensor do relógio, aquecido pelo pulso: costuma superestimar de 3 a 8 °C. NÃO é a temperatura do ar.",
  "drift.basisPowerIgnored":
    "Potência presente, mas ignorada: fora do ciclismo ela é estimada pelo relógio e não é uma base confiável. Desacoplamento calculado sobre a velocidade.",
  "drift.noWindowPower":
    "Nenhum trecho de pelo menos 10 minutos com potência regular nesta sessão. A relação potência/FC só se compara em esforço constante; melhor analisar as repetições uma a uma.",
  "drift.noWindowSpeed":
    "Nenhum trecho de pelo menos 10 minutos em ritmo regular nesta sessão. A deriva cardíaca só se mede em um esforço contínuo; melhor analisar as repetições uma a uma.",
  "drift.sparseHr": "Janela regular encontrada, mas com poucos dados cardíacos utilizáveis.",
  "drift.halvesInsufficient": "Dados insuficientes para comparar as duas metades da janela.",
  "drift.workDrop.power":
    "Esforço em queda de {drop}% entre as duas metades da janela (potência {from} → {to}): o rendimento cai porque a intensidade cai, não porque o coração deriva. Nenhuma deriva calculável.",
  "drift.workDrop.speed":
    "Esforço em queda de {drop}% entre as duas metades da janela (velocidade {from} → {to}): o rendimento cai porque a intensidade cai, não porque o coração deriva. Nenhuma deriva calculável.",
  "drift.qualityNote.shortEasy":
    "Janela curta, situada na parte menos intensa da sessão, provavelmente um aquecimento ou uma volta à calma. O número é exato, mas não descreve o esforço principal; melhor olhar a análise das repetições.",
  "drift.qualityNote.easy":
    "Único trecho regular encontrado: a parte menos intensa da sessão. Ali a deriva é estruturalmente baixa e diz pouco sobre o esforço principal.",
  "drift.qualityNote.short":
    "Janela de {min} min cobrindo {pct}% da sessão: medida válida, mas pouco representativa do conjunto.",
  "drift.interp.negative":
    "Desacoplamento negativo: o rendimento melhora na segunda metade. Típico de um aquecimento ainda incompleto no início da janela, ou de uma aceleração progressiva voluntária.",
  "drift.interp.low": "Deriva muito baixa: o esforço estava bem abaixo do limiar aeróbio.",
  "drift.interp.normal":
    "Deriva dentro da normalidade (≤ 5%). A resistência aeróbia sustenta este ritmo por esta duração.",
  "drift.interp.markedHot":
    "Deriva acentuada (> 5%), mas com o ar a {temp} °C: nessa temperatura, 5 a 6% de desacoplamento é o custo térmico normal, e não sinal de má forma.",
  "drift.interp.marked":
    "Deriva acentuada (> 5%). O ritmo estava alto demais para a duração, ou a resistência de base é o fator limitante. Desidratação e fadiga residual produzem o mesmo efeito.",
  "drift.interp.highHot":
    "Deriva elevada (> 10%) a {temp} °C: o calor explica parte do número, mas não tudo. Verificar a hidratação e o descanso.",
  "drift.interp.high":
    "Deriva elevada (> 10%). Ritmo não sustentável por esta duração nestas condições.",
  "drift.quality.solide": "sólida",
  "drift.quality.indicatif": "indicativa",

  "adh.tooFew": "Menos de duas repetições identificadas: nada a comparar.",
  "adh.veryRegular.pace": "Ritmo muito regular entre as repetições (variação {cv}%).",
  "adh.veryRegular.power": "Potência muito regular entre as repetições (variação {cv}%).",
  "adh.regularOk": "Regularidade adequada (variação {cv}%).",
  "adh.irregular.pace":
    "Repetições irregulares no ritmo (variação {cv}%): controle a trabalhar, ou sessão mal calibrada.",
  "adh.irregular.power":
    "Repetições irregulares na potência (variação {cv}%): controle a trabalhar, ou sessão mal calibrada.",
  "adh.fade.pace":
    "Queda de {pct}% no ritmo entre a primeira e a última repetição: saída forte demais, ou volume acima do nível atual.",
  "adh.fade.power":
    "Queda de {pct}% na potência entre a primeira e a última repetição: saída forte demais, ou volume acima do nível atual.",
  "adh.build":
    "Progressão de {pct}% ao longo da série: aumento voluntário, sinal de margem disponível.",
  "adh.held.pace": "Ritmo mantido do início ao fim da série.",
  "adh.held.power": "Potência mantida do início ao fim da série.",
  "adh.restLonger":
    "Recuperações cada vez mais longas (+{s} s por repetição): a sessão se desorganiza no fim da série.",
  "adh.restShorter": "Recuperações cada vez mais curtas ({s} s por repetição).",
  "adh.hrRiseStable":
    "Ritmo mantido, mas FC subindo {bpm} bpm ao longo da série: custo cardíaco crescente com o mesmo esforço, assinatura da fadiga acumulada.",
  "adh.hrRiseStable.power":
    "Potência mantida, mas FC subindo {bpm} bpm ao longo da série: custo cardíaco crescente com o mesmo esforço, assinatura da fadiga acumulada.",
  "adh.hrRise": "FC subindo {bpm} bpm ao longo da série.",
  "adh.hrrGood":
    "Recuperação cardíaca muito boa: queda de {bpm} bpm em 60 s após cada repetição.",
  "adh.hrrOk": "Recuperação cardíaca adequada: {bpm} bpm em 60 s.",
  "adh.hrrSlow":
    "Recuperação lenta: apenas {bpm} bpm de queda em 60 s. Fadiga residual, calor ou recuperações curtas demais para o formato.",
  "adh.hrrErode":
    "A recuperação se deteriora {bpm} bpm por repetição: a série consome as reservas mais rápido do que o ritmo deixa ver.",
  "adh.missingReps": "{done} repetições realizadas das {planned} previstas.",
  "adh.targetMet.pace": "Ritmo-alvo respeitado.",
  "adh.targetMet.power": "Potência-alvo respeitada.",
  "adh.belowTarget": "Série realizada {pct}% abaixo do alvo.",
  "adh.aboveTarget":
    "Série realizada {pct}% acima do alvo: o benefício de uma sessão intervalada vem de respeitar a prescrição, não de superá-la.",
  "adh.grade.conforme": "conforme",
  "adh.grade.acceptable": "aceitável",
  "adh.grade.dégradé": "insuficiente",
  "adh.grade.non évaluable": "não avaliável",

  "cls.pool": "Sem posição GPS, sem cadência, velocidade de {speed} m/s: natação em piscina.",
  "cls.openWater":
    "Posição GPS intermitente ({pct}% de cobertura, {flips} perdas de sinal) a {speed} m/s sem cadência: natação em águas abertas. A distância do GPS é superestimada, pois o sinal volta a cada vez que o braço sai da água.",
  "cls.static":
    "{dist} m percorridos em {min} min: deslocamento pequeno demais para uma atividade de resistência.",
  "cls.crossTraining":
    "Declarada como corrida, mas {stopPct}% do tempo parado e {mpm} m por minuto decorrido: esforço descontínuo, provavelmente fortalecimento ou treino cruzado. Contada como carga, sem análise de corrida.",
  "cls.hiking": "Caminhada: contada como carga, sem análise de ritmo nem projeção.",
  "cls.unknownSport": "Esporte não reconhecido como atividade de resistência: contado apenas como carga.",
  "erg.evidence":
    "Potência travada em {pinned} de {total} bloco(s): sessão em modo ERG. Distância e velocidade são virtuais e não medem nada.",
  "erg.warning":
    "Cadência em queda em {n} bloco(s) (até {max} rpm). No ERG, uma cadência que cai aumenta a resistência, o que a faz cair ainda mais: essa espiral termina em parada. A solução é retomar a cadência voluntariamente assim que ela começa a cair, ou desligar o ERG nas últimas repetições.",

  "zone.1": "Z1 recuperação",
  "zone.2": "Z2 resistência",
  "zone.3": "Z3 tempo",
  "zone.4": "Z4 limiar",
  "zone.5": "Z5 VO2máx",
  "zone.6": "Z6 anaeróbia",
  "zone.7": "Z7 neuromuscular",
  "set.rest": ", recuperação {s} s",
  "set.power": " a {w} W",

  "swim.set": "{reps} × {dist} m a {pace}/100m",
  "swim.setRest": ", recuperação {s} s",
  "swim.lapDistance":
    "Distância reconstruída a partir das voltas: o fluxo de pontos não a contém, o que é normal em piscina.",
  "swim.hr":
    "Frequência cardíaca na natação: um sensor óptico não lê debaixo d'água e uma cinta peitoral não transmite submersa; ela grava e descarrega os dados na saída. Os valores são indicativos e seus horários aproximados. Nenhuma deriva cardíaca é calculada nesta sessão.",
  "swim.noLaps":
    "Nenhuma volta utilizável: a sessão não está dividida por comprimentos de piscina. Apenas a distância e a duração totais são utilizáveis.",
  "swim.lowDensity":
    "Apenas {swim} min de nado efetivo em {elapsed} min decorridos: sessão muito fracionada ou banho de lazer, e não treino. Interpretar como tal.",
  "swim.openWater":
    "Natação em águas abertas: a distância vem do GPS, que perde o sinal a cada braçada submersa e o recupera depois. Costuma ser superestimada em 5 a 15%, e o ritmo instantâneo não é utilizável; apenas as médias são.",
  "swim.noStrokes":
    "Nenhuma contagem de braçadas no arquivo: o SWOLF, que mede a eficiência do nado, não pode ser calculado. Nem todos os relógios registram esse dado.",
  "swim.noPoolLength":
    "Comprimento da piscina não deduzido dos dados: as distâncias vêm do relógio tal como estão.",

  "race.400": "400 m",
  "race.800": "800 m",
  "race.1000": "1000 m",
  "race.1609.344": "1 milha",
  "race.3000": "3000 m",
  "race.5000": "5 km",
  "race.10000": "10 km",
  "race.15000": "15 km",
  "race.20000": "20 km",
  "race.21097.5": "meia maratona",
  "race.42195": "maratona",
  "proj.method.race": "Riegel a partir de {ref} em prova (k={k})",
  "proj.method.raceAge": ", marca de {months} meses atrás",
  "proj.method.training": "Riegel a partir de um esforço de {ref} no treino",
  "proj.method.cs": "Velocidade crítica (CS {pace}/km, R²={r2})",
  "dossier.setSource.workout":
    "{set}: treino programado no relógio, estrutura e metas lidas do arquivo.",
  "dossier.setSource.laps":
    "{set}: estrutura lida das voltas (uma volta por etapa).",
  "dossier.setSource.auto":
    "{set}: detectada no sinal, sem treino prescrito no arquivo. Sem avaliação de aderência.",
  "proj.method.achievedRace":
    "Tempo de prova ({date}): o real prevalece sobre o modelo",
  "proj.method.achievedTraining":
    "Esforço corrido no treino ({date}): o real prevalece sobre o modelo",
  "proj.caveat.gap":
    "O modelo sozinho dava {model}, uma diferença de {pct} % em relação ao tempo real ({date}): confiança reduzida.",
  "proj.dateUnknown":
    "data desconhecida",
  "dossier.projNote":
    "Velocidade crítica e projeções: esforços de corrida dos últimos {days} dias (desde {from}). achieved = melhor tempo real na distância nesse período, model_gap_pct = diferença do modelo para esse tempo (positiva: modelo mais lento). Acima de 3 %, a confiança cai.",
  "proj.caveat.marathon":
    "Uma projeção de maratona a partir de dados de treino pressupõe uma preparação específica levada até o fim: longões, ritmo específico, estratégia de nutrição. É a projeção menos confiável de todas.",
  "proj.caveat.half": "Pressupõe uma preparação específica e um ritmo mantido com regularidade.",
  "proj.confidence.haute": "alta",
  "proj.confidence.moyenne": "média",
  "proj.confidence.faible": "baixa",

  "prog.tooFew":
    "Menos de três sessões de corrida utilizáveis: acompanhar a evolução exige mais pontos.",
  "prog.multiSource":
    "Várias fontes de FC no lote: as curvas são construídas separadamente por sensor. Compará-las entre si não faria sentido.",
  "prog.shortSpan": "Período curto demais para distinguir uma evolução das variações do dia a dia.",
  "prog.improving": "Evolução clara: cerca de {bpm} bpm a menos por semana a {pace}/km.",
  "prog.worsening":
    "Custo cardíaco em alta a {pace}/km. Calor, fadiga acumulada ou carga densa demais são as explicações a descartar primeiro.",
  "prog.stable": "Estável: nenhuma mudança mensurável no custo cardíaco no período.",
  "prog.none":
    "Nenhum ritmo de referência é mantido por tempo suficiente em pelo menos três sessões comparáveis. Rodagens de duração regular em ritmo constante tornariam esse acompanhamento possível.",
  "prog.tempSpread":
    "As temperaturas do lote variam em {spread} °C. No mesmo ritmo, o calor custa de 5 a 10 bpm: parte da tendência observada pode ser apenas sazonal.",

  "batch.week": "{year}-S{week}",
  "batch.duplicateOf": "{file} (idêntico a {first})",
  "batch.warnDuplicates":
    "{n} duplicata(s) descartada(s) (mesmo horário de início e mesma distância): {list}.",
  "batch.warnRecordsGap":
    "{n} arquivo(s) cujos pontos param antes do fim declarado do treino ({list}): o fim da gravação está faltando. Os totais vêm do resumo do relógio, mas as tabelas e a FC do final podem estar incompletas.",
  "batch.warnReclassified":
    "{n} sessão(ões) reclassificada(s): o esporte declarado no arquivo não correspondia à forma dos dados ({list}).",
  "batch.warnLoadOnly":
    "{n} sessão(ões) fora de resistência contada(s) no volume, mas excluída(s) das análises de ritmo, deriva e projeção.",
  "batch.warnHrSources":
    "A fonte de FC varia de um treino para outro: {strap} com cinta, {optical} no pulso, {unknown} indeterminada(s). As FC só se comparam entre treinos da mesma fonte (coluna hr_source da tabela de treinos): zonas, derivas e tendências se leem fonte por fonte.",
  "batch.warnCadenceLock":
    "{n} arquivo(s) apresentam FC travada na cadência: os valores cardíacos estão parcialmente errados e as derivas correspondentes não são utilizáveis.",
  "batch.warnDriftPartial":
    "Deriva cardíaca calculada em {ok} de {total} sessão(ões): as demais são curtas ou irregulares demais para que o cálculo faça sentido.",
  "batch.warnCsFit":
    "Ajuste mediano do modelo de velocidade crítica (R² = {r2}): as projeções são indicativas. Um teste dedicado (3 min e 12 min no máximo, descansado) daria um modelo bem mais confiável.",
  "batch.warnNoRace":
    "Nenhum resultado de prova informado. As projeções se baseiam apenas em esforços de treino, que costumam superestimar o desempenho em competição. Informar uma marca real melhora bastante a calibração.",
  "batch.racesFound":
    "Provas reconhecidas nos arquivos: {list}. Elas calibram as projeções. Confira a lista: um treino a fundo numa distância oficial no fim de semana pode passar por uma prova.",
  "race.noteMultisport":
    "etapa de uma prova multiesporte, não uma corrida isolada",
  "race.noteNonStandard":
    "distância fora do padrão",
  "race.noteMeasured":
    "percurso medido em {km} km, longe demais dos {official} oficiais para calibrar as projeções",
  "dossier.racesNote":
    "Provas reconhecidas. detected_by: user (marcada pelo atleta), strava (marcada como prova no Strava), name (nome da atividade), auto (sugestão: distância oficial, esforço contínuo, FC alta ou ritmo rápido, fim de semana). time = tempo decorrido do treino. used = serve para calibrar as projeções.",
  "batch.warnMaxHr":
    "FC máxima observada ({observed} bpm) maior que a informada ({maxHr} bpm). Todas as zonas ficam deslocadas enquanto essa configuração não for corrigida.",
  "batch.bundle.title": "gps-digest v1 — resumo de várias sessões",
  "batch.bundle.range": "{n} sessões de {from} a {to}",
  "batch.bundle.volume": "volume total: {km} km, {dur} em movimento",
  "batch.bundle.note":
    "Os valores de FC só são comparáveis entre sessões se a coluna\nhr_source for idêntica. Ler os avisos antes de qualquer conclusão.",
  "common.refMaxHr": "FC máxima de referência: {hr} bpm",

  "bundle.title": "gps-digest v1 — resumo de atividade compactado para análise por um LLM",
  "bundle.source": "fonte: {format} | {raw} pontos brutos -> {kept} mantidos",
  "bundle.glossary": [
    "t_s = segundos desde a largada | dist_m = distância acumulada (m)",
    "pace_s_km = ritmo em segundos/km | gap_s_km = ritmo ajustado à inclinação (Minetti 2002)",
    "hr_bpm = frequência cardíaca | cad_spm = cadência (passos/min ou rpm) | pw_w = potência (W)",
    "decoupling_pct = deriva aeróbia entre a 1ª e a 2ª metade; > 5% = resistência limitante",
    "hr_source = sensor de FC estimado; NUNCA comparar FC de fontes diferentes",
    "drift_applicable = no significa que a sessão não permite este cálculo, não que ele vale zero",
  ].join("\n"),
  "bundle.tempWrist": "sensor do relógio (superestima de 3 a 8 °C, NÃO é a temperatura do ar)",
  "bundle.tempExternal": "externa",

  "dossier.guide": `# ─────────────────────────────────────────────────────────────────────
# COMO LER ESTE DOSSIÊ
#
# Estrutura: primeiro as tabelas transversais (todas as sessões juntas),
# depois o detalhe de cada sessão, cada uma introduzida por “═══ SESSÃO n ═══”.
# Cada bloco começa com “## nome_do_bloco” e contém um CSV com cabeçalho.
#
# Unidades: metros, segundos, bpm, watts, graus Celsius. Separador decimal
# = ponto. Separador de colunas = vírgula.
#
# Colunas principais
#   t_s          segundos decorridos desde o início da sessão
#   dist_m       distância acumulada desde a largada, em metros
#   speed        ritmo ou velocidade conforme o esporte: min/km na corrida,
#                km/h no ciclismo, min/100m na natação. Nunca converter um
#                no outro.
#   pace_s_km    ritmo em segundos por quilômetro (300 = 5:00/km), calculado
#                sobre o tempo EM MOVIMENTO, como no Strava. O Garmin Connect
#                divide pela duração total: seus ritmos são mais lentos. Não
#                concluir queda de desempenho apenas por essa diferença.
#   pace_mmss    o mesmo ritmo em minutos:segundos, para leitura
#   gap_s_km     ritmo ajustado à inclinação (Minetti 2002): comparável entre
#                um percurso com subidas e um plano
#   grade_pct    inclinação média do trecho, em porcentagem
#   hr_bpm       frequência cardíaca
#   cad_spm      cadência em passos por minuto (corrida) ou rpm (ciclismo)
#   pw_w         potência em watts
#
# Cuidados de leitura, por ordem de importância
#   1. hr_source indica o sensor cardíaco estimado. NUNCA comparar valores
#      de FC entre duas sessões de fontes diferentes: a diferença medida
#      seria um artefato do equipamento, não uma mudança de forma.
#   2. drift_applicable = no significa que a sessão não se presta ao cálculo
#      da deriva (esforço irregular ou curto demais). Não é deriva zero: é
#      a ausência de uma medida válida.
#   3. temp_c vem do sensor do relógio, usado no pulso. Ele superestima a
#      temperatura do ar em 3 a 8 °C. NÃO é a meteorologia.
#   4. O fluxo detalhado é uma média por intervalo, não uma leitura
#      instantânea. Os tempos exatos estão nos blocos splits, laps e
#      intervals.
# ─────────────────────────────────────────────────────────────────────`,
  "dossier.title": "gps-digest — dossiê de treino",
  "dossier.range": "{n} sessão(ões) de {from} a {to}",
  "dossier.volume": "volume: {km} km, {dur} em movimento",
  "dossier.contextNote":
    "Histórico: {total} treinos. Detalhe completo dos últimos {days} dias ({n} treino(s)); os mais antigos aparecem só na tabela “sessions”, uma linha cada.",
  "dossier.hrZonesObserved":
    "Zonas de FC: % da FC máxima observada no período ({hr} bpm), na falta de perfil de atleta. Mesmos limites para todos os treinos; informar a FC máxima ou a FC de limiar os torna confiáveis.",
  "dossier.hrZonesMax":
    "Zonas de FC: % da FC máxima ({hr} bpm), mesmos limites para todos os treinos.",
  "dossier.hrZonesReserve":
    "Zonas de FC: % da FC de reserva (FC máxima {max} bpm, repouso {rest} bpm), mesmos limites para todos os treinos.",
  "dossier.hrZonesThreshold":
    "Zonas de FC: % da FC de limiar ({hr} bpm), mesmos limites para todos os treinos. A Z5 começa no limiar.",
  "dossier.privacyMasked":
    "Posições GPS apagadas num raio de {m} m em volta da largada e da chegada. Distâncias, durações e cálculos cobrem o treino completo: só faltam as coordenadas.",
  "dossier.warningsHeader": "⚠ AVISOS — ler antes de qualquer conclusão",
  "dossier.unknownDate": "data desconhecida",
  "dossier.sessionHeader": "═══ SESSÃO {n} — {date} — {sport} — {label} ═══",
  "dossier.file": "arquivo: {name}",
  "dossier.paceBasis":
    "tempo em movimento (convenção do Strava); o Garmin Connect divide pela duração total e por isso mostra um ritmo mais lento",
  "dossier.eleDevice": "altímetro barométrico do relógio",
  "dossier.eleGps": "calculado a partir da altitude do GPS; costuma subestimar em 30 a 50%",
  "dossier.powerEstimated": "yes (relógio, não comparável à potência do ciclismo)",
  "dossier.driftReading": "leitura da deriva: {text}",
  "dossier.representativeness": "representatividade: {text}",
  "dossier.conditions": "condições: {text}",
  "dossier.classification": "classificação: {text}",
  "dossier.swimSets": "séries: {list}",
  "dossier.adherence": "{set} — {grade}: {verdicts}",
  "dossier.streamNote": "fluxo abaixo: um ponto a cada {step}, valores médios no intervalo",
  "dossier.progNote":
    "FC no ritmo de referência, ao longo do tempo. Comparar apenas\nlinhas com o mesmo hr_source: dois sensores não são comparáveis.",
  "dossier.progMonthlyNote":
    "Progressão aeróbica por mês: FC média em cada pace de referência,\nponderada pelo tempo passado nesse pace. Compare só linhas com o mesmo hr_source.",
  "dossier.progVerdict": "{pace} ({source}): {verdict}",

  "chart.sessionPower": "Potência e frequência cardíaca",
  "chart.sessionPace": "Ritmo e frequência cardíaca",
  "chart.windowNote": "área sombreada: trecho analisado para a deriva",
  "chart.reps": "Repetições",
  "chart.repsNote": "barras: esforço, pontos: frequência cardíaca",
  "chart.trendNote": "FC em bpm, uma queda indica evolução",
  "chart.load": "Carga semanal",
  "chart.loadNote": "barras: TRIMP, carga baseada na FC, comum a todos os esportes; parte escura: tempo em intensidade moderada ou alta",
  "chart.loadNoteHours":
    "barras: horas em movimento, todos os esportes (sem FC nos arquivos)",
  "dossier.loadNote":
    "Carga semanal: uma coluna por modalidade (distância, duração, desnível), nunca somadas. trimp = TRIMP de Edwards (minutos em cada zona de FC × número da zona), a única carga comum a todos os esportes; hr_coverage_pct = parte do tempo em movimento com FC. Um treino sem FC não soma nada ao trimp.",

  "heat.humid": ", {pct}% de umidade",
  "heat.strong":
    "Estresse térmico forte (sensação de {temp} °C{humid}). Uma deriva cardíaca de 8 a 12% é esperada nesse nível, independentemente da forma.",
  "heat.notable":
    "Calor considerável (sensação de {temp} °C{humid}). Conte com 5 a 8% de deriva de origem puramente térmica.",
  "heat.cold":
    "Frio (sensação de {temp} °C). A FC costuma ser mais baixa no mesmo ritmo, e o aquecimento leva mais tempo.",

  "fit.hrEvidence":
    "Sensor cardíaco externo pareado via {source}{product}: informação lida no arquivo, não estimada.",
  "fit.hrEvidenceProduct": " (produto {id})",
  "fit.hrEvidenceWrist":
    "O relógio só lista o sensor óptico de pulso, nenhum sensor cardíaco externo conectado: informação lida do arquivo, não estimada.",
  "fit.sourceN": "fonte {n}",
  "fit.errHeader": "Arquivo FIT inválido: cabeçalho inesperado.",
  "fit.errSignature": "Arquivo FIT inválido: assinatura ausente.",
  "strava.errNoTime": "Atividade Strava {id}: fluxo de tempo ausente.",
  "strava.sensorCaveat":
    "Fluxo do Strava: suavização no servidor. A detecção do sensor de FC é menos confiável do que a partir de um arquivo FIT original.",

  // ── archive.ts ─────────────────────────────────────────────────────────
  "archive.empty":
    "Nenhum arquivo FIT, TCX ou GPX neste arquivo compactado.",
  "archive.tooBig":
    "Arquivo compactado grande demais para o navegador: descompacte e solte só os treinos que quiser.",
  "archive.unsupported":
    "Este arquivo compactado não pode ser lido aqui (ZIP64, criptografia ou compressão incomum): descompacte e solte os arquivos FIT, TCX ou GPX.",
  "archive.corrupt":
    "Arquivo compactado danificado ou incompleto: baixe de novo.",
};
