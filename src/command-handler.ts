import { Editor } from 'obsidian';
import { IncrementalIdPlugin } from './incremental-id-plugin';
import { IdDefinition } from './types';
import { generateIncrementalId } from './generate-incremental-id';

export class CommandHandler {
  constructor(private plugin: IncrementalIdPlugin) {}

  register(): void {
    this.plugin.configuration.configuration.idDefinitions.forEach((idDefinition) => {
      if (idDefinition.prefix) {
        this.add(null, idDefinition);
      }
    });
  }

  add(oldIdDefinition: IdDefinition | null, newIdDefinition: IdDefinition): void {
    this.remove(oldIdDefinition);

    if (newIdDefinition) {
      this.plugin.addCommand({
        id: newIdDefinition.prefix,
        name: `Insert ${newIdDefinition.name}`,
        editorCallback: async (editor: Editor) => {
          const idDef = await this.plugin.configuration.getIncrementId(newIdDefinition.prefix);
          if (idDef) {
            const id = await generateIncrementalId(idDef);
            editor.replaceSelection(id);
          }
        },
      });
    }
  }

  remove(idDefinition: IdDefinition | null): void {
    if (idDefinition) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      app.commands.removeCommand(this.getCommandId(idDefinition.prefix));
    }
  }

  getCommandId(prefix: string) {
    return `${this.plugin.manifest.id}:insert-id:${prefix}`;
  }
}
