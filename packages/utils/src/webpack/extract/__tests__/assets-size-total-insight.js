import { extractAssetsSizeTotalInsight } from '../assets-size-total-insight';

describe('Webpack/extracts/extractAssetsSizeTotalInsight', () => {
  test('should return insight', () => {
    const actual = extractAssetsSizeTotalInsight(null, {
      metrics: { totalSizeByTypeALL: { value: 10000 } },
    });

    expect(actual).toEqual({
      insights: {
        assetsSizeTotal: {
          data: {
            md: '*Bundle Size* — *9.77KB* (*+100%*).',
            text: 'Bundle Size — 9.77KB (+100%).',
            info: {
              delta: 10000,
              deltaPercentage: 100,
              deltaType: 'HIGH_NEGATIVE',
              displayDelta: '+9.77KB',
              displayDeltaPercentage: '+100%',
              displayValue: '9.77KB',
              value: 10000,
            },
          },
          type: 'INFO',
        },
      },
    });
  });

  test('should return insight with baseline', () => {
    const actual = extractAssetsSizeTotalInsight(
      null,
      { metrics: { totalSizeByTypeALL: { value: 10000 } } },
      { metrics: { webpack: { totalSizeByTypeALL: { value: 20000 } } } },
    );

    expect(actual).toEqual({
      insights: {
        assetsSizeTotal: {
          data: {
            md: '*Bundle Size* — *9.77KB* (*-50%*).',
            text: 'Bundle Size — 9.77KB (-50%).',
            info: {
              delta: -10000,
              deltaPercentage: -50,
              deltaType: 'POSITIVE',
              displayDelta: '-9.77KB',
              displayDeltaPercentage: '-50%',
              displayValue: '9.77KB',
              value: 10000,
            },
          },
          type: 'INFO',
        },
      },
    });
  });
});
