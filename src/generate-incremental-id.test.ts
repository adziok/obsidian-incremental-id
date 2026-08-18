import { generateIncrementalId } from './generate-incremental-id';
import { IdDefinition } from './types';

describe('generateIncrementalId', () => {
  it('should return id with leading zeros when leadingZeros is enabled', async () => {
    const configuration: IdDefinition = {
      name: 'Global ID',
      prefix: 'ID',
      separator: '-',
      leadingZeros: {
        enabled: true,
        numberOfZeros: 5,
      },
      currentIteration: 1,
    };

    const result = await generateIncrementalId(configuration);
    expect(result).toBe('ID-00001');
  });

  it('should return id without leading zeros when leadingZeros is not enabled', async () => {
    const configuration: IdDefinition = {
      name: 'Global ID',
      prefix: 'ID',
      separator: '-',
      leadingZeros: {
        enabled: false,
        numberOfZeros: 5,
      },
      currentIteration: 1,
    };

    const result = await generateIncrementalId(configuration);
    expect(result).toBe('ID-1');
  });
  it('should not pad when the iteration is as long as the number of zeros', async () => {
    const configuration: IdDefinition = {
      name: 'Daily Note ID',
      prefix: 'DN',
      separator: '-',
      leadingZeros: {
        enabled: true,
        numberOfZeros: 3,
      },
      currentIteration: 100,
    };

    const result = await generateIncrementalId(configuration);
    expect(result).toBe('DN-100');
  });

  it('should keep the iteration when it is longer than the number of zeros', async () => {
    const configuration: IdDefinition = {
      name: 'Daily Note ID',
      prefix: 'DN',
      separator: '-',
      leadingZeros: {
        enabled: true,
        numberOfZeros: 2,
      },
      currentIteration: 100,
    };

    const result = await generateIncrementalId(configuration);
    expect(result).toBe('DN-100');
  });
});
