import { Editor } from 'obsidian';
import { IncrementalIdPlugin } from './incremental-id-plugin';
import { IdDefinition } from './configuration/incremental-id-configuration';

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
        id: `insert-id:${newIdDefinition.prefix}`,
        name: `Insert ${newIdDefinition.name}`,
        editorCallback: async (editor: Editor) => {
          const idDef = await this.plugin.configuration.getIncrementId(newIdDefinition.prefix);
          if (idDef) {
            const id = `${idDef.prefix}-${idDef.currentIteration}`;
            editor.replaceSelection(id);
          }
        },
      });
    }
  }

  remove(template: IdDefinition | null): void {
    if (template) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      app.commands.removeCommand(`${this.plugin.manifest.id}:insert-id:${newIdDefinition.prefix}`);
    }
  }
}
