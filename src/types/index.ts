export interface IdDefinition {
  name: string;
  currentIteration: number;
  prefix: string;
}

export interface IncrementalIdPluginConfiguration {
  idDefinitions: IdDefinition[];
}
