import { IncrementalIdConfiguration } from '../configuration/incremental-id-configuration';
import { Logger } from './index';

export const runMigrations = async (configuration: IncrementalIdConfiguration): Promise<void> => {
  const { migrations } = await import('../migrations');
  configuration.configuration.appliedMigrations = configuration.configuration.appliedMigrations || [];

  const migrationInstances = migrations.map((migrationClass) => {
    return new migrationClass();
  });

  const migrationsToApply = migrationInstances.filter((migration) => {
    return !configuration.configuration.appliedMigrations.includes(migration.name);
  });

  for (const migration of migrationsToApply) {
    Logger.update(`Applying migration ${migration.name}`);
    await migration.up(configuration);
  }
};
