export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function spliceIntoChunks(arr, chunkSize) {
  const res = [];
  while (arr.length > 0) {
    const chunk = arr.splice(0, chunkSize);
    res.push(chunk);
  }
  return res;
}

const emojiNumberMap = {
  '0': '0️⃣',
  '1': '1️⃣',
  '2': '2️⃣',
  '3': '3️⃣',
  '4': '4️⃣',
  '5': '5️⃣',
  '6': '6️⃣',
  '7': '7️⃣',
  '8': '8️⃣',
  '9': '9️⃣',
  '.': '.',
};

export function numberToEmoji(num: number): string {
  let emojiString = '';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stringNum: any = num.toString();
  // eslint-disable-next-line guard-for-in, no-restricted-syntax
  for (const i in stringNum) {
    emojiString += emojiNumberMap[stringNum[i]];
  }
  return emojiString;
}
