import { BaseMigration } from '../utils/base-migration';
import { IncrementalIdConfiguration } from '../configuration/incremental-id-configuration';
import { Version } from '../utils/version';

export class SupportLeadingZerosAndCustomSeparatorInLegacyConfigurationMigration extends BaseMigration {
  name = SupportLeadingZerosAndCustomSeparatorInLegacyConfigurationMigration.name;
  description = 'Add default values related to separator and leading zeros to existing configuration';
  version = Version.parse('0.4.0');

  async up(config: IncrementalIdConfiguration): Promise<void> {
    const legacyIdDefinitions = config.configuration.idDefinitions;

    config.configuration.idDefinitions = legacyIdDefinitions.map((idDefinition) => {
      return {
        ...idDefinition,
        separator: '-',
        leadingZeros: {
          enabled: false,
          numberOfZeros: 8,
        },
      };
    });

    config.configuration.appliedMigrations.push(this.name);

    await config.save();
  }

  async down(): Promise<void> {
    return;
  }
}
