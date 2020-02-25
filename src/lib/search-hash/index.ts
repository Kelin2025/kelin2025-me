export const textToHash = (text: string) =>
  text.replace(/\s([a-zа-я])/giu, x => x.slice(1).toLocaleUpperCase());

export const hashToText = (hash: string) =>
  decodeURIComponent(hash)
    .replace(/([A-ZА-Я])/gu, x => ` ${x}`)
    .trim();
