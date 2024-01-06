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
});
