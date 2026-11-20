export const FPS = 30;
export const DURATION_SECONDS = 60;
export const DURATION_FRAMES = FPS * DURATION_SECONDS;

export const LANDSCAPE = {width: 1920, height: 1080};
export const PORTRAIT = {width: 1080, height: 1920};

export const COLORS = {
  midnight: '#05070D',
  midnightDeep: '#02040A',
  emerald: '#10B981',
  emeraldDark: '#065F46',
  emeraldGlow: '#34D399',
  gold: '#D4AF37',
  goldBright: '#F6D365',
  goldDeep: '#B8860B',
  deepBlue: '#0B1B3A',
  deepBlueLight: '#163A6B',
  warmOrange: '#FF8A3D',
  text: '#F8FAFC',
  muted: '#CBD5E1',
};

export const SERVER = {
  name: 'XIOSMP',
  ip: 'play.xiosmp.my.id',
  port: '2005',
  tagline: 'YOUR WORLD. YOUR ECONOMY. YOUR EMPIRE.',
  message: 'ONE SERVER. TWO EDITIONS. ENDLESS POSSIBILITIES.',
  editions: 'JAVA + BEDROCK',
  creator: 'XIOSMP Official Server',
};

export const SCENE_TIMINGS = {
  scene1: {from: 0, duration: 7 * FPS},        // 0-7s
  scene2: {from: 7 * FPS, duration: 7 * FPS},  // 7-14s
  scene3: {from: 14 * FPS, duration: 13 * FPS},// 14-27s
  scene4: {from: 27 * FPS, duration: 11 * FPS},// 27-38s
  scene5: {from: 38 * FPS, duration: 8 * FPS}, // 38-46s
  scene6: {from: 46 * FPS, duration: 9 * FPS}, // 46-55s
  scene7: {from: 55 * FPS, duration: 5 * FPS}, // 55-60s
} as const;

export const VO_SCRIPT = [
  {scene: 1, start: 0.5, end: 6.5, text: 'Di sebuah dunia, setiap petualangan memiliki awal...'},
  {scene: 2, start: 7.3, end: 11.5, text: 'Selamat datang di... XIOSMP!'},
  {scene: 3, start: 14.5, end: 26.0, text: 'Rasakan pengalaman Economy Survival Multiplayer. Kumpulkan sumber daya, kembangkan kekayaan, dan bangun kerajaan impianmu.'},
  {scene: 4, start: 27.5, end: 37.0, text: 'Jelajahi dunia yang luas, ciptakan cerita, dan nikmati petualangan bersama pemain lainnya.'},
  {scene: 5, start: 38.3, end: 45.2, text: 'Mainkan bersama Java maupun Bedrock. Satu server, lebih banyak petualangan.'},
  {scene: 6, start: 46.3, end: 53.5, text: 'Jangan tunggu lebih lama. Bergabunglah sekarang di XIOSMP!'},
  {scene: 7, start: 55.3, end: 59.5, text: 'XIOSMP... dunia, ekonomi, dan kerajaanmu dimulai di sini!'},
] as const;
