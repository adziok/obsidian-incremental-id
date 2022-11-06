import { Plugin } from 'obsidian';
import { CommandHandler } from './command-handler';
import { IncrementalIdPluginSettingTab } from './settings/incremental-id-plugin-setting-tab';
import { IncrementalIdConfiguration } from './configuration/incremental-id-configuration';

export class IncrementalIdPlugin extends Plugin {
  configuration: IncrementalIdConfiguration;
  commandHandler: CommandHandler;

  async onload() {
    await this.loadConfiguration();

    this.addSettingTab(new IncrementalIdPluginSettingTab(this, this.configuration));
  }

  onunload() {
    return;
  }

  private async loadConfiguration() {
    this.configuration = await IncrementalIdConfiguration.create(this);
    this.commandHandler = new CommandHandler(this);
    this.commandHandler.register();
  }
}
