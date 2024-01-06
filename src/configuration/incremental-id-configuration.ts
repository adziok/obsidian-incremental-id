import { Logger } from '../utils';
import { IncrementalIdPlugin } from '../incremental-id-plugin';
import { IdDefinition, IncrementalIdPluginConfiguration } from '../types';

const DEFAULT_CONFIGURATION: IncrementalIdPluginConfiguration = {
  appliedMigrations: [],
  idDefinitions: [
    {
      name: 'Global ID',
      currentIteration: 0,
      prefix: 'GUID',
      separator: '-',
      leadingZeros: {
        enabled: false,
        numberOfZeros: 8,
      },
    },
  ],
};

export class IncrementalIdConfiguration {
  configuration: IncrementalIdPluginConfiguration;
  protected constructor(private readonly plugin: IncrementalIdPlugin) {}

  static async create(plugin: IncrementalIdPlugin) {
    const instance = new IncrementalIdConfiguration(plugin);
    instance.configuration = Object.assign({}, DEFAULT_CONFIGURATION, await instance._load());

    return instance;
  }

  async getIncrementId(aPrefix: IdDefinition['prefix']) {
    const index = this.configuration.idDefinitions.findIndex(({ prefix }) => prefix === aPrefix);
    if (index < 0) {
      Logger.error(new Error('Invalid ID prefix'));
      return;
    }

    this.configuration.idDefinitions[index].currentIteration++;
    await this.save();
    return this.configuration.idDefinitions[index];
  }

  async getCurrentId(aPrefix: IdDefinition['prefix']) {
    const index = this.configuration.idDefinitions.findIndex(({ prefix }) => prefix === aPrefix);
    if (index < 0) {
      Logger.error(new Error('Invalid ID prefix'));
      return;
    }

    return this.configuration.idDefinitions[index];
  }

  async save() {
    await this._save(this.configuration);
  }

  private async _save(data: IncrementalIdPluginConfiguration) {
    await this.plugin.saveData(data);
  }

  private _load() {
    return this.plugin.loadData();
  }
}
