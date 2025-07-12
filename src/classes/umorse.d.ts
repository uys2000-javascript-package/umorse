import { UHost } from "./uhost.mjs";
import { UMorsePath } from "./upath.mjs";

export class USQL {
  id!: number | string;
  timestamp!: number;
  utimestamp!: number;
  dtimestamp!: number;
  deleted!: boolean;
  hidden!: boolean;
}

export class ULMorse {
  title!: string;
  content!: string;
  dot!: string;
  dash!: string;
  separatrix!: string;
}
export class UMorse implements ULMorse, USQL {}

export class UMorseService {
  host: UHost;
  path: USessionPath;
  token: string;

  constructor(host?: UHost, path?: UMorsePath, token?: string);
  add(morse: ULMorse): Promise<false | UMorse>;
  list(): Promise<Array<UMorse>>;
  remove(id: string | number): Promise<boolean>;
  // get last sync date to send not synced morse saves
  getLastSync(): Promise<number>;
  // send not synced morse saves to server and
  // get synced morse saves with not founded morse saves
  sync(
    lastSync: number,
    morses = Array<ULMorse | UMorse>
  ): Promise<{ status: boolean; synced: UMorse[]; forSync: UMorse[] }>;
}
