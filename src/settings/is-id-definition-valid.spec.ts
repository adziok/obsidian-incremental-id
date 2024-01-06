import { isIdDefinitionValid } from './is-id-definition-valid';

describe('isIdDefinitionValid', () => {
  describe('prefix validation', () => {
    it('should return false, when prefix is already in use', () => {
      expect(
        isIdDefinitionValid(
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
          [
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
        ),
      ).toEqual(false);
    });

    it('should accept lower case letters', () => {
      expect(
        isIdDefinitionValid(
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
          [],
        ),
      ).toEqual(true);
    });

    it('should accept lower case letters', () => {
      expect(
        isIdDefinitionValid(
          {
            name: 'Global ID',
            currentIteration: 0,
            prefix: 'guid',
            separator: '-',
            leadingZeros: {
              enabled: false,
              numberOfZeros: 8,
            },
          },
          [],
        ),
      ).toEqual(true);
    });

    it('should accept numbers', () => {
      expect(
        isIdDefinitionValid(
          {
            name: 'Global ID',
            currentIteration: 0,
            prefix: '2137',
            separator: '-',
            leadingZeros: {
              enabled: false,
              numberOfZeros: 8,
            },
          },
          [],
        ),
      ).toEqual(true);
    });

    it('should accept mixed letters and numbers', () => {
      expect(
        isIdDefinitionValid(
          {
            name: 'Global ID',
            currentIteration: 0,
            prefix: 'Guid2137',
            separator: '-',
            leadingZeros: {
              enabled: false,
              numberOfZeros: 8,
            },
          },
          [],
        ),
      ).toEqual(true);
    });

    it('should return false when prefix is to short', () => {
      expect(
        isIdDefinitionValid(
          {
            name: 'Global ID',
            currentIteration: 0,
            prefix: 'G',
            separator: '-',
            leadingZeros: {
              enabled: false,
              numberOfZeros: 8,
            },
          },
          [],
        ),
      ).toEqual(false);
    });

    it('should return false when prefix contain invalid chars', () => {
      expect(
        isIdDefinitionValid(
          {
            name: 'Global ID',
            currentIteration: 0,
            prefix: 'G-uid2137',
            separator: '-',
            leadingZeros: {
              enabled: false,
              numberOfZeros: 8,
            },
          },
          [],
        ),
      ).toEqual(false);
    });
  });

  describe('name validation', () => {
    it('should return false, when name is already in use', () => {
      expect(
        isIdDefinitionValid(
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
          [
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
        ),
      ).toEqual(false);
    });

    it('should return false when name is to short', () => {
      expect(
        isIdDefinitionValid(
          {
            name: 'G',
            currentIteration: 0,
            prefix: 'GUID',
            separator: '-',
            leadingZeros: {
              enabled: false,
              numberOfZeros: 8,
            },
          },
          [],
        ),
      ).toEqual(false);
    });

    it('should return false when name is to short', () => {
      expect(
        isIdDefinitionValid(
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
          [],
        ),
      ).toEqual(true);
    });
  });

  describe('currentIteration validation', () => {
    it('should return false when currentIteration is not a number', () => {
      expect(
        isIdDefinitionValid(
          {
            name: 'Global ID',
            currentIteration: NaN,
            prefix: 'GUID',
            separator: '-',
            leadingZeros: {
              enabled: false,
              numberOfZeros: 8,
            },
          },
          [],
        ),
      ).toEqual(false);
    });

    it('should return false when currentIteration is not a positive number', () => {
      expect(
        isIdDefinitionValid(
          {
            name: 'Global ID',
            currentIteration: -1,
            prefix: 'GUID',
            separator: '-',
            leadingZeros: {
              enabled: false,
              numberOfZeros: 8,
            },
          },
          [],
        ),
      ).toEqual(false);
    });

    it('should return true when currentIteration is a positive number', () => {
      expect(
        isIdDefinitionValid(
          {
            name: 'Global ID',
            currentIteration: 1,
            prefix: 'GUID',
            separator: '-',
            leadingZeros: {
              enabled: false,
              numberOfZeros: 8,
            },
          },
          [],
        ),
      ).toEqual(true);
    });
  });
});
