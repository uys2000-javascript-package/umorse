import { doDelete, doGet, doPatch, doPost } from "@uys2000/u-http";
import { UHost } from "@uys2000/u-host";
import { UMorsePath } from "./upath.mjs";
export class UMorseService {
  host = new UHost("local", "morse");
  path = new UMorsePath();
  token = "";

  constructor(host, path, token) {
    if (host) this.host = host;
    if (path) this.path = path;
    if (token) this.token = token;
  }
  getHeader() {
    return { Token: this.token };
  }
  async add(morse) {
    if (!this.token) return false;
    const url = this.host.host + this.path.add;
    const response = await doPost(url, {}, morse, this.getHeader());
    const result = await response.json();

    if (!result.data?.status) throw new Error(result.message);
    return result.data.status;
  }
  async list() {
    if (!this.token) return false;
    const url = this.host.host + this.path.list;
    const response = await doGet(url, {}, this.getHeader());
    const result = await response.json();

    if (!result.data?.sessions) throw new Error(result.message);
    return result.data.sessions;
  }
  async remove(id) {
    if (!this.token) return false;
    const url = this.host.host + this.path.remove;
    const response = await doDelete(url, { id }, this.getHeader());
    const result = await response.json();

    if (!result.data?.status) throw new Error(result.message);
    return result.data.status;
  }
  // get last sync date to send not synced morse saves
  async getLastSync() {
    if (!this.token) return false;
    const url = this.host.host + this.path.lastSync;
    const response = await doGet(url, {}, this.getHeader());
    const result = await response.json();

    if (!result.data?.lastSync) throw new Error(result.message);
    return result.data.lastSync;
  }
  // send not synced morse saves to server and
  // get synced morse saves with not founded morse saves
  async sync(lastSync, morses = []) {
    if (!this.token) return false;
    const url = this.host.host + this.path.sync;
    const body = { lastSync, morses };
    const response = await doPatch(url, {}, body, this.getHeader());
    const result = await response.json();

    if (!result.data?.status) throw new Error(result.message);
    return result.data;
  }
}
