import { JsonCountryContentRepository } from "../../infrastructure/content/json-country-content-repository";
import { LocalStorageGameRepository } from "../../infrastructure/persistence/local-storage-game-repository";
import { CryptoRandomAdapter } from "../../infrastructure/random/crypto-random-adapter";
import { WebAudioSoundAdapter } from "../../infrastructure/audio/web-audio-sound-adapter";

/**
 * ゲームストアが使うInfrastructureアダプタのシングルトン。
 * ブラウザセッション全体で1つずつ(GameEngineContextのキャッシュや
 * BGMスケジューラの状態を保持し続けるため)。
 */
export const contentRepository = new JsonCountryContentRepository();
export const gameRepository = new LocalStorageGameRepository();
export const random = new CryptoRandomAdapter();
export const soundAdapter = new WebAudioSoundAdapter();
