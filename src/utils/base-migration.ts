import { IncrementalIdConfiguration } from '../configuration/incremental-id-configuration';
import { Version } from './version';

export abstract class BaseMigration {
  abstract name: string;
  abstract description: string;
  abstract version: Version;

  abstract up(configuration: IncrementalIdConfiguration): Promise<void>;
  abstract down(configuration: IncrementalIdConfiguration): Promise<void>;
}
