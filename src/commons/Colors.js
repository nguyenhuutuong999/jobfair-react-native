export const Colors = {
  white: '#ffffff',
  black: '#000000',
  cerulean: '#007ad8',
  textTepapa: '#203040',
  textPaleSky: '#657380',
  textRegentGray: '#8495a6',
  textCodGray: '#1C1C1C',
  textSilverChalice: "#A7A7A7",
  statusShamRock: '#41d98d',
  statusSunglow: '#ffbb33',
  statusPersimmon: '#FF5959',
  bgEbonyClay: '#222d33',
  bgAthensGray: '#f2f4f7',
  bgAnakiwa: "#9EE9FF",
  purple: '#5F68DD',
  grey: '#CED5DB',
  midnightBlue: '#1e3556',
  warterLoo: '#82818F',
  silver: '#CCCCCC',
  tundora: '#4D4D4D',
  concrete: '#F2F2F2',
  dustyGray: '#999999',
  doveGray: '#666666',
  mineShaft: '#333333',
  red: '#FA001D',
  light: '#FDFCFC',
  alto: '#D9D9D9',
  lochmara: '#0079D4',
  badgeEggBlue: "#00C8BC",
  badgeBlazeOrange: "#FF6600",
  badgePistachio: "#82CD00",
  badgeSelectiveYellow: "#F7B400",
  badgeMediumPurple: "#B93DD8",
  badgeRazzleDazzleRose: "#FD4DBD",
  badgeGuardsmanRed: "#D70000",
  azureRadiance: "#007AFF",
  rose: "#FB1888",
  tumbleweed: "#D9AE7A",
  pampas: "#EFEBE7",
  authBadgeRed: '#e08f8e',
  authBadgeBlue: '#83c1d9',
  authBadgeGold: '#d2a671',
  backgroundColor: '#25076B',
  buttonColor: '#4A47A3',
  answerColor: '#45A3E5'
};

const percentToHex = (p) => {
  const intValue = ~~((p / 100) * 255); // map percent to nearest integer (0 - 255)
  const hexValue = intValue.toString(16); // get hexadecimal representation
  return hexValue.padStart(2, '0').toUpperCase(); // format with leading 0 and upper case characters
};

export const colorOpacityMaker = (color, opacity) => `${color}${percentToHex(opacity)}`;
