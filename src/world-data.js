const baseUrl = import.meta?.env?.BASE_URL ?? '/';
const asset = (path) => `${baseUrl}assets/${path}`;

const pixelAvatar = (label, fg = '#9adfff', bg = '#10263f') => {
  const svg = `
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>
  <rect width='64' height='64' fill='${bg}'/>
  <rect x='8' y='8' width='48' height='48' fill='#0a1a2a'/>
  <rect x='16' y='20' width='8' height='8' fill='${fg}'/>
  <rect x='40' y='20' width='8' height='8' fill='${fg}'/>
  <rect x='20' y='38' width='24' height='6' fill='${fg}'/>
  <text x='32' y='59' text-anchor='middle' font-size='10' font-family='monospace' fill='${fg}'>${label}</text>
</svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const FALLBACK_ASSETS = {
  logo: pixelAvatar('DSL', '#8de9ff', '#0c2a44'),
  maps: {
    living: pixelAvatar('L', '#78d8ff', '#0b3652'),
    control: pixelAvatar('C', '#8bb9ff', '#0a2a4f'),
  },
  characters: {
    researcherA: pixelAvatar('A', '#8cf3ff', '#12324b'),
    researcherB: pixelAvatar('B', '#a5d7ff', '#162f52'),
    researcherC: pixelAvatar('C', '#d2dbf0', '#2a3454'),
  },
};

export const ROOMS = {
  living: {
    id: 'living',
    label: '深海ラボ / 生活区',
    background: asset('maps/living-room.png'),
    fallbackBackground: FALLBACK_ASSETS.maps.living,
    ariaLabel: '深海ラボの生活区マップ',
    enterMessage: '生活区に移動しました。水圧管理は安定、研究員たちも通常運転です。',
  },
  control: {
    id: 'control',
    label: '深海ラボ / 制御室',
    background: asset('maps/control-room.png'),
    fallbackBackground: FALLBACK_ASSETS.maps.control,
    ariaLabel: '深海ラボの制御室マップ',
    enterMessage: '制御室に移動しました。深度データと外殻センサーが静かに脈動しています。',
  },
};

export const SPEECH_STYLES = {
  researcherA: {
    bubble: '#70530f',
    text: '#f8f3df',
  },
  researcherB: {
    bubble: '#16254f',
    text: '#ecf2ff',
  },
  researcherC: {
    bubble: '#5a1f2f',
    text: '#f7ebef',
  },
};

export const CHARACTERS = {
  living: [
    {
      id: 'researcherA',
      name: '研究員A',
      sprite: asset('characters/researcher-a.png'),
      fallbackSprite: FALLBACK_ASSETS.characters.researcherA,
      speech: [
        'お、呼んだか！',
        '今日は何して遊ぶ？',
        'いい感じの空気だな！',
        'ここのんびりできて好きなんだよな',
        '何か始めるなら付き合うぞ！',
      ],
      position: {
        left: '18%',
        top: '55%',
      },
    },
    {
      id: 'researcherB',
      name: '研究員B',
      sprite: asset('characters/researcher-b.png'),
      fallbackSprite: FALLBACK_ASSETS.characters.researcherB,
      speech: [
        '現在の状態は安定している',
        'その発想は興味深いな',
        '新しい実験案を考えていた',
        'もう少し観察してみよう',
        'それは検証する価値がある',
      ],
      position: {
        left: '48%',
        top: '42%',
      },
    },
    {
      id: 'researcherC',
      name: '研究員C',
      sprite: asset('characters/researcher-c.png'),
      fallbackSprite: FALLBACK_ASSETS.characters.researcherC,
      speech: [
        'ふむ、悪くない',
        '静かでいい場所だ',
        'さて、次はどう動く',
        '慌てる必要はない',
        'いい流れだ、このまま行け',
      ],
      position: {
        left: '74%',
        top: '58%',
      },
    },
  ],
  control: [
    {
      id: 'researcherB',
      name: '研究員B',
      sprite: asset('characters/researcher-b.png'),
      fallbackSprite: FALLBACK_ASSETS.characters.researcherB,
      speech: [
        '現在の状態は安定している',
        'その発想は興味深いな',
        '新しい実験案を考えていた',
        'もう少し観察してみよう',
        'それは検証する価値がある',
      ],
      position: {
        left: '38%',
        top: '36%',
      },
    },
    {
      id: 'researcherC',
      name: '研究員C',
      sprite: asset('characters/researcher-c.png'),
      fallbackSprite: FALLBACK_ASSETS.characters.researcherC,
      speech: [
        'ふむ、悪くない',
        '静かでいい場所だ',
        'さて、次はどう動く',
        '慌てる必要はない',
        'いい流れだ、このまま行け',
      ],
      position: {
        left: '67%',
        top: '52%',
      },
    },
    {
      id: 'researcherA',
      name: '研究員A',
      sprite: asset('characters/researcher-a.png'),
      fallbackSprite: FALLBACK_ASSETS.characters.researcherA,
      speech: [
        'お、呼んだか！',
        '今日は何して遊ぶ？',
        'いい感じの空気だな！',
        'ここのんびりできて好きなんだよな',
        '何か始めるなら付き合うぞ！',
      ],
      position: {
        left: '18%',
        top: '61%',
      },
    },
  ],
};

export const DIALOGS = {
  researcherA: [
    'やっほー！今日の深海ランチは藻類チップス三段盛りだってさ、テンション上がる〜！',
    'ポンプの音がビートに聞こえるんだよね！このまま作業BGMにしちゃおう！',
    '生活区って落ち着くよね！…でも僕は静かすぎると逆にそわそわしちゃう！',
  ],
  researcherB: [
    '外圧と内部温度の推移は良好です。ここ数時間、全システムは理想値の範囲内です。',
    '深海環境では観測ログの連続性が最重要です。小さな変化ほど、後で意味を持ちます。',
    '制御室の表示は静かですが、データは雄弁です。異常は必ず前兆を伴います。',
  ],
  researcherC: [
    '……海は急かさない。こちらも急がず、だな。',
    'このガラス越しの暗がり、嫌いじゃない。灯りがある分だけ人の気配がわかる。',
    '若い連中は賑やかでいい。静かな深海では、あの声が案外ありがたい。',
  ],
};
