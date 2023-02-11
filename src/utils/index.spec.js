const { FormatData } = require('./index');

describe('Utils', () => {
  describe('function FormatData', () => {
    it('should format data to a common pattern', () => {
      const input = { user: 'john doe' };
      const received = FormatData(input);
      expect(received).toEqual({ data: input });
    });
  });
});
