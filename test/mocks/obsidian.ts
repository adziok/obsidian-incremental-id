import { Workspace, Vault, MetadataCache, FileManager, UserEvent, Notice as ONotice } from 'obsidian';

export class Notice implements ONotice {
  noticeEl: HTMLElement = {
    innerHTML: '',
  } as HTMLElement;

  hide(): void {
    return;
  }

  setMessage(): this {
    return this;
  }
}

export class App {
  /** @public */
  workspace: Workspace;

  /** @public */
  vault: Vault;
  /** @public */
  metadataCache: MetadataCache;

  /** @public */
  fileManager: FileManager;

  /**
   * The last known user interaction event, to help commands find out what modifier keys are pressed.
   * @public
   */
  lastEvent: UserEvent | null;
}
