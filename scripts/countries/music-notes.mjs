/**
 * BGMデータを音名で書くための小さな道具。
 *
 * 各国の `styles` は周波数(Hz)の生値で持つ(legacy のボリビア・日本がその形で、
 * 再生側 `src/infrastructure/audio/web-audio-sound-adapter.ts` もHzを直接受け取る)。
 * ただし手で 349.23 と書くのは読めないので、ここで音名から周波数に直す。
 *
 * 平均律・A4=440Hz。半音ごとに 2^(1/12) 倍。小数第2位で丸める
 * (legacy の値と同じ桁。E5 だけ legacy は 659.25、この式では 659.26 になるが、
 *  0.03セント差なので聞き分けられない)。
 */

const SEMITONE = {
  c: 0,
  "c#": 1,
  db: 1,
  d: 2,
  "d#": 3,
  eb: 3,
  e: 4,
  f: 5,
  "f#": 6,
  gb: 6,
  g: 7,
  "g#": 8,
  ab: 8,
  a: 9,
  "a#": 10,
  bb: 10,
  b: 11,
};

/** 音名(`"a4"` `"f#5"` `"bb3"`)を周波数に直す。 */
export function hz(name) {
  const m = /^([a-g])([#b]?)([0-8])$/.exec(name);
  if (!m) throw new Error(`音名として読めない: ${name}`);
  const semitone = SEMITONE[m[1] + m[2]];
  const midi = (Number(m[3]) + 1) * 12 + semitone;
  return Math.round(440 * 2 ** ((midi - 69) / 12) * 100) / 100;
}

/**
 * 1小節ぶんの和音。`b` はベース音、`n` はストラムで鳴らす3音。
 * 再生側はベースを `b/2`(と拍12で `b*0.75`)で鳴らすので、`b` は
 * 実際に聞こえるより1オクターブ上を書く(legacy と同じ約束)。
 */
export function chord(bass, notes) {
  if (notes.length !== 3) throw new Error(`和音は3音で書く: ${bass} ${notes}`);
  return { b: hz(bass), n: notes.map(hz) };
}

/**
 * 1小節ぶんの旋律。`[鳴らすステップ(0〜15), 音名, 長さ(ステップ数)]` の並び。
 * 1小節は16ステップ(16分音符16個)。
 */
export function bar(...notes) {
  return notes.map(([step, name, dur]) => {
    if (step < 0 || step > 15) throw new Error(`ステップは0〜15: ${step}`);
    return [step, hz(name), dur];
  });
}
