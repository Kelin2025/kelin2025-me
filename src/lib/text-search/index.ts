export const strIncludesWords = (str: string, words: string[]) =>
  words.every(word =>
    str.toLocaleLowerCase().includes(word.toLocaleLowerCase())
  );
