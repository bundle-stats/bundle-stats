import { get, template } from 'lodash';

import {
  DELTA_TYPE_HIGH_NEGATIVE,
  DELTA_TYPE_NEGATIVE,
  DELTA_TYPE_LOW_NEGATIVE,
  DELTA_TYPE_NO_CHANGE,
  DELTA_TYPE_LOW_POSITIVE,
  DELTA_TYPE_POSITIVE,
  DELTA_TYPE_HIGH_POSITIVE,
} from '../../config/delta';
import { INSIGHT_INFO } from '../../config/insights';
import { getMetricRunInfo, getMetricType } from '../../utils/metrics';

const INCREASED = template(
  'Bundle size increased with <%= displayAbsDelta %> (<%= displayDeltaPercentage %>).',
);
const DECREASED = template(
  'Bundle size decreased with <%= displayAbsDelta %> (<%= displayDeltaPercentage %>).',
);
const NO_CHANGE = template('Bundle size did not change.');

const TEMPLATES = new Map([
  [DELTA_TYPE_HIGH_NEGATIVE, INCREASED],
  [DELTA_TYPE_NEGATIVE, INCREASED],
  [DELTA_TYPE_LOW_NEGATIVE, INCREASED],
  [DELTA_TYPE_NO_CHANGE, NO_CHANGE],
  [DELTA_TYPE_LOW_POSITIVE, DECREASED],
  [DELTA_TYPE_POSITIVE, DECREASED],
  [DELTA_TYPE_HIGH_POSITIVE, DECREASED],
]);

const METRIC_NAME = 'totalSizeByTypeALL';

export const extractAssetsSizeTotalInsight = (
  webpackStats, currentExtractedData, baselineBundleStats,
) => {
  const currentValue = get(currentExtractedData, ['metrics', METRIC_NAME, 'value'], 0);
  const baselineValue = get(baselineBundleStats, ['metrics', 'webpack', METRIC_NAME, 'value'], 0);

  const metric = getMetricType(['webpack', METRIC_NAME].join('.'));
  const info = getMetricRunInfo(metric, currentValue, baselineValue);
  const { deltaType, delta, displayDeltaPercentage } = info;
  const displayAbsDelta = metric.formatter(Math.abs(delta));
  const messageTemplate = TEMPLATES.get(deltaType);

  return {
    insights: {
      assetsSizeTotal: {
        type: INSIGHT_INFO,
        data: {
          text: messageTemplate({ displayAbsDelta, displayDeltaPercentage }),
          md: messageTemplate({
            displayAbsDelta: `*${displayAbsDelta}*`,
            displayDeltaPercentage: `*${displayDeltaPercentage}*`,
          }),
          info,
        },
      },
    },
  };
};