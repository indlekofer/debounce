import assert from 'assert';

import debounce from '../lib/index';
import sinon from 'sinon';

describe('debounce', () => {
  var fnt = debounce(() => ++v);
  var fnt2 = debounce(() => ++v, 100, true);

  var clock;
  var v;
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
    var y = [];
    var a = 'a111';
    var b = 'b222';
    var tempfn = debounce((x, p) => {
      y = [x,p];
    });
    var r = tempfn(a, b);
    clock.tick(100);
    assert.equal(y[0], a);
    assert.equal(y[1], b);
  });
});
