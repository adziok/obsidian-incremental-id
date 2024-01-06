import { IdDefinition } from './types';

const getCurrentIterationWithLeadingZeros = (idDefinition: IdDefinition): string => {
  const numberOfZeros = idDefinition.leadingZeros.numberOfZeros;
  const currentIteration = idDefinition.currentIteration.toString();
  const numberOfLeadingZeros = numberOfZeros - currentIteration.length;
  const leadingZeros = '0'.repeat(numberOfLeadingZeros);
  return `${leadingZeros}${currentIteration}`;
};

export const generateIncrementalId = async (configuration: IdDefinition): Promise<string> => {
  const prefix = `${configuration.prefix}${configuration.separator}`;

  if (configuration.leadingZeros.enabled) {
    return `${prefix}${getCurrentIterationWithLeadingZeros(configuration)}`;
  } else {
    return `${prefix}${configuration.currentIteration.toString()}`;
  }
};
