export class UMorsePath {
  add = "add.php";
  get = "get.php";
  remove = "delete.php";
  lastSync = "lastSync.php";
  sync = "sync.php";
  constructor(add, get, remove, lastSync, sync) {
    if (add) this.add = add;
    if (get) this.get = get;
    if (remove) this.remove = remove;
    if (lastSync) this.lastSync = lastSync;
    if (sync) this.sync = sync;
  }
}
