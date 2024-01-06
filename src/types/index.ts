export interface IdDefinition {
  name: string;
  currentIteration: number;
  prefix: string;
  separator: string;
  leadingZeros: {
    enabled: boolean;
    numberOfZeros: number;
  };
}

export interface IncrementalIdPluginConfiguration {
  appliedMigrations: string[];
  idDefinitions: IdDefinition[];
}
