import { expect } from 'chai';
import videojs from 'video.js';
import SizeToggleButton from '../';

describe('videojs-size-toggle', () => {
  it('should be registered component', () => {
    expect(videojs.getComponent('SizeToggleButton')).to.equal(SizeToggleButton);
  });
});
