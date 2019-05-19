import assert from 'assert';

import debounce from '../src/index';
import sinon from 'sinon';

describe('debounce', () => {
  let fnt = debounce(() => ++v),
    fnt2 = debounce(() => ++v, 100, true),
    clock,
    v;
  beforeEach(() => {
    clock = sinon.useFakeTimers();
    v = 0;
  });

  afterEach(() => {
    clock.restore();
  });

  it('basic', () => {
    fnt();
    assert.equal(v, 0);
    clock.tick(10);
    assert.equal(v, 0);
    fnt();
    assert.equal(v, 0);
    clock.tick(110);
    assert.equal(v, 1);
    fnt();
    assert.equal(v, 1);
    clock.tick(110);
    assert.equal(v, 2);
  });
  it('immediate test', () => {
    fnt2();
    assert.equal(v, 1);
    clock.tick(10);
    assert.equal(v, 1);
    fnt2();
    assert.equal(v, 1);
    clock.tick(110);
    assert.equal(v, 1);
    fnt2();
    assert.equal(v, 2);
    clock.tick(110);
    assert.equal(v, 2);
    fnt2();
    assert.equal(v, 3);
  });
  it('long test', () => {
    fnt();
    assert.equal(v, 0);
    clock.tick(10);
    assert.equal(v, 0);
    fnt();
    assert.equal(v, 0);
    clock.tick(10);
    assert.equal(v, 0);
    fnt();
    assert.equal(v, 0);
    clock.tick(10);
    assert.equal(v, 0);
    fnt();
    assert.equal(v, 0);
    clock.tick(10);
    assert.equal(v, 0);
    fnt();
    assert.equal(v, 0);
    clock.tick(110);
    assert.equal(v, 1);
    fnt();
    assert.equal(v, 1);
    clock.tick(10);
    fnt();
    assert.equal(v, 1);
    clock.tick(10);
    fnt();
    assert.equal(v, 1);
    clock.tick(10);
    fnt();
    assert.equal(v, 1);
    clock.tick(10);
    fnt();
    assert.equal(v, 1);
    clock.tick(110);
    assert.equal(v, 2);
  });
  it('arguments check', () => {
    let y = [],
      a = 'a111',
      b = 'b222',
      tempfn = debounce((x, p) => {
        y = [x,p];
      }),
      r = tempfn(a, b);
    clock.tick(100);
    assert.equal(y[0], a);
    assert.equal(y[1], b);
  });
});
