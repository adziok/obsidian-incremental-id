import { Plugin } from 'obsidian';
import { CommandHandler } from './command-handler';
import { IncrementalIdPluginSettingTab } from './settings/incremental-id-plugin-setting-tab';
import { IncrementalIdConfiguration } from './configuration/incremental-id-configuration';
import { runMigrations } from './utils/run-migrations';
import { generateIncrementalId } from './generate-incremental-id';

export class IncrementalIdPlugin extends Plugin {
  configuration: IncrementalIdConfiguration;
  commandHandler: CommandHandler;

  async onload() {
    await this.loadConfiguration();
    await runMigrations(this.configuration);

    this.addSettingTab(new IncrementalIdPluginSettingTab(this, this.configuration));

    // TODO find less hacky way
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    app.insertIncrementalId = async (prefix: string) => {
      const idDef = await this.configuration.getIncrementId(prefix);
      if (idDef) {
        return generateIncrementalId(idDef);
      }
    };
    // TODO find less hacky way
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    app.insertCurrentIncrementalId = async (prefix: string) => {
      const idDef = await this.configuration.getCurrentId(prefix);
      if (idDef) {
        return generateIncrementalId(idDef);
      }
    };
  }

  onunload() {
    // TODO find less hacky way
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    app.insertIncrementalId = undefined;
  }

  private async loadConfiguration() {
    this.configuration = await IncrementalIdConfiguration.create(this);
    this.commandHandler = new CommandHandler(this);
    this.commandHandler.register();
  }
}
