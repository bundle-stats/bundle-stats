import React from 'react';
import { storiesOf } from '@storybook/react';

import job from '../../../__mocks__/job.json';
import { BundleAssets } from '.';

const stories = storiesOf('BundleAssets', module);

stories.add('default', () => (
  <BundleAssets
    jobs={[job, job.baseline]}
  />
));

stories.add('no baseline', () => (
  <BundleAssets
    jobs={[job, undefined]}
  />
));

stories.add('not predictive', () => (
  <BundleAssets
    jobs={[
      {
        ...job,
        rawData: {
          webpack: {
            stats: {
              assets: [
                {
                  name: 'static/js/not-predictive.93191.js',
                  size: 2989,
                },
              ],
            },
          },
        },
      },
      {
        ...job.baseline,
        rawData: {
          webpack: {
            stats: {
              assets: [
                {
                  name: 'static/js/not-predictive.93191.js',
                  size: 2988,
                },
              ],
            },
          },
        },
      },
    ]}
  />
));
