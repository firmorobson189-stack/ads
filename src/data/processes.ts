import { MorphoProcess, MorphoProcessMeta } from '../types';

export const MORPHO_PROCESSES: Record<MorphoProcess, MorphoProcessMeta> = {
  'Empréstimo': {
    name: 'Empréstimo',
    colorName: 'Azul Elétrico',
    badgeBg: 'bg-blue-950/70 hover:bg-blue-900/80',
    badgeBorder: 'border-blue-500/60 hover:border-blue-400',
    badgeText: 'text-blue-300',
    iconSymbol: '🔵',
    shortDesc: 'Uso de uma palavra que veio de outra língua.',
    definition: 'Processo pelo qual uma comunidade linguística adota uma palavra ou expressão originária de outro idioma. No Free Fire, a grande maioria dos empréstimos provém da língua inglesa, refletindo a cultura global dos videogames e battle royales.',
    grammarTip: 'Muitos empréstimos sofrem aportuguesamento fonológico ou adaptação mórfica com sufixos verbais portugueses (ex: rush + -ar = rushar).',
    ffExample: 'RUSHAR (do inglês rush), LOOTEAR (do inglês loot), CALL (do inglês call).'
  },
  'Sufixação': {
    name: 'Sufixação',
    colorName: 'Amarelo Dourado',
    badgeBg: 'bg-amber-950/70 hover:bg-amber-900/80',
    badgeBorder: 'border-amber-500/60 hover:border-amber-400',
    badgeText: 'text-amber-300',
    iconSymbol: '🟡',
    shortDesc: 'Acréscimo de um sufixo a uma palavra ou base.',
    definition: 'Processo de derivação em que um morfema sufixal é adicionado ao final de um radical ou palavra-base, podendo alterar seu sentido, intensidade ou sua classe gramatical (como transformar substantivo em verbo ou criar diminutivo/aumentativo afetivo).',
    grammarTip: 'Identifique a raiz principal e o elemento que foi inserido no final (ex: gel + inho, apelar + ão, pino + ar).',
    ffExample: 'GELINHO (gel + inho), APELÃO (apelar + ão), PINAR (pino + ar).'
  },
  'Redução': {
    name: 'Redução',
    colorName: 'Verde Esmeralda',
    badgeBg: 'bg-emerald-950/70 hover:bg-emerald-900/80',
    badgeBorder: 'border-emerald-500/60 hover:border-emerald-400',
    badgeText: 'text-emerald-300',
    iconSymbol: '🟢',
    shortDesc: 'Diminuição da forma de uma palavra.',
    definition: 'Também chamado de truncamento vocabular, ocorre quando uma palavra mais longa é encurtada pela eliminação de suas sílabas finais ou iniciais, preservando o significado original para tornar a fala mais rápida e prática.',
    grammarTip: 'A palavra fica mais curta para facilitar a agilidade das comunicações de squad em combate.',
    ffExample: 'DIMA (redução de diamante), GEL (redução de granada de gel), BOT (redução de robot).'
  },
  'Abreviação': {
    name: 'Abreviação',
    colorName: 'Laranja Tático',
    badgeBg: 'bg-orange-950/70 hover:bg-orange-900/80',
    badgeBorder: 'border-orange-500/60 hover:border-orange-400',
    badgeText: 'text-orange-300',
    iconSymbol: '🟠',
    shortDesc: 'Forma reduzida de uma palavra ou expressão.',
    definition: 'Representação sintética de um termo ou vocábulo longo no registro oral ou escrito, comumente utilizada em chats rápidos ou na marcação de rotas e itens táticos.',
    grammarTip: 'Diferencia-se da sigla por não se limitar apenas às letras iniciais maiúsculas de várias palavras, mas sim na condensação expressiva.',
    ffExample: 'GEL (granada de gelo), CR7 (Chrono / Cristiano Ronaldo).'
  },
  'Composição': {
    name: 'Composição',
    colorName: 'Vermelho Fogo',
    badgeBg: 'bg-rose-950/70 hover:bg-rose-900/80',
    badgeBorder: 'border-rose-500/60 hover:border-rose-400',
    badgeText: 'text-rose-300',
    iconSymbol: '🔴',
    shortDesc: 'União de dois ou mais elementos para formar uma expressão ou palavra.',
    definition: 'Processo em que dois ou mais radicais independentes se fundem para criar um novo termo com identidade própria. Pode ocorrer por justaposição (sem alteração fonética) ou por aglutinação.',
    grammarTip: 'Pergunte-se: existem duas palavras completas que se juntaram para dar um novo sentido?',
    ffExample: 'ZÉ CARRINHO (Zé + carrinho), ZÉ GUARITA (Zé + guarita), PRO PLAYER (pro + player), SUBIR CAPA (subir + capa).'
  },
  'Sigla': {
    name: 'Sigla',
    colorName: 'Roxo Laser',
    badgeBg: 'bg-purple-950/70 hover:bg-purple-900/80',
    badgeBorder: 'border-purple-500/60 hover:border-purple-400',
    badgeText: 'text-purple-300',
    iconSymbol: '🟣',
    shortDesc: 'Uso das letras iniciais de uma expressão.',
    definition: 'Formação vocabular construída a partir da junção das letras iniciais maiúsculas de cada palavra constituinte de uma locução ou termo composto, facilitando menções ágeis em tabelas e transmissões.',
    grammarTip: 'Cada letra representa uma palavra inteira (geralmente em inglês no universo gamer).',
    ffExample: 'HS (Headshot), KD (Kill/Death), FF (Free Fire).'
  },
  'Ressignificação': {
    name: 'Ressignificação',
    colorName: 'Âmbar / Marrom Quente',
    badgeBg: 'bg-amber-900/40 hover:bg-amber-900/60',
    badgeBorder: 'border-amber-600/60 hover:border-amber-500',
    badgeText: 'text-amber-200',
    iconSymbol: '🟤',
    shortDesc: 'Quando uma palavra existente passa a ter um significado específico ou novo em determinado contexto.',
    definition: 'Fenômeno semântico no qual uma palavra já consolidada no dicionário da língua portuguesa adquire um sentido totalmente inovador, figurado ou técnico dentro da comunidade de jogadores de Free Fire.',
    grammarTip: 'A palavra já existia em português com outro sentido (ex: capa de livro/chuva, gato miando), mas ganhou novo significado no jogo.',
    ffExample: 'CAPA (virou tiro na cabeça / headshot), MIADO (virou inimigo com pouca vida).'
  }
};
