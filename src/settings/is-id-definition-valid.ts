import { Logger } from '../utils';
import { IdDefinition } from '../types';

export const isIdDefinitionValid = (def: IdDefinition, existingDefinitions: IdDefinition[]) => {
  let invalid = false;
  if (def.name.length < 3 || existingDefinitions.find(({ name }) => name === def.name)) {
    Logger.error(new Error('You need provide unique name with at least 3 characters'));
    invalid = true;
  }
  if (
    def.prefix.length < 2 ||
    !/^[A-Za-z0-9]*$/.test(def.prefix) ||
    existingDefinitions.find(({ prefix }) => prefix === def.prefix)
  ) {
    Logger.error(new Error('You need provide unique prefix from letters and numbers with at least 2 characters'));
    invalid = true;
  }
  if (!Number.isInteger(def.currentIteration) || def.currentIteration < 0) {
    Logger.error(new Error('You need provide positive integer or 0'));
    invalid = true;
  }
  return !invalid;
};
