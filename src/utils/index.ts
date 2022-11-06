import { Notice } from 'obsidian';

export class Logger {
  static update(msg: string) {
    const notice = new Notice('', 8000);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    notice.noticeEl.innerHTML = `<b>Icremental Id Update</b>:<br/>${msg}`;
  }

  static error(e: Error) {
    const notice = new Notice('', 8000);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    notice.noticeEl.innerHTML = `<b>Icremental Id Error</b>:<br/>${e.message}`;
  }
}
