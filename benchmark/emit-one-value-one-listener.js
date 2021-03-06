var suite = require('chuhai');
var test = require('blue-tape');
var setup = require('../subjects');

test('emit one value - one listener', function (t) {
  return suite('', function (s) {
    s.set('maxTime', setup.maxTime);
    s.set('minSamples', setup.minSamples);

    var subjects = setup.createInstancesOn(handle);

    var called = null;

    s.cycle(function (e) {
      t.false(e.target.error, e.target.name + ' runs without error');
      t.equal(called, 1, e.target.name + ' called handle once');
      called = null;
    });

    s.burn('Theoretical max', function () {
      called = 0;
      handle('bar');
    });

    s.bench('EventEmitter', function () {
      called = 0;
      subjects.ee1.emit('foo', 'bar');
    });

    s.bench('EventEmitter2', function () {
      called = 0;
      subjects.ee2.emit('foo', 'bar');
    });

    s.bench('EventEmitter3', function () {
      called = 0;
      subjects.ee3.emit('foo', 'bar');
    });

    s.bench('dripEmitter', function () {
      called = 0;
      subjects.dripEmitter.emit('foo', 'bar');
    });

    s.bench('barracks', function () {
      called = 0;
      subjects.barracksDispatcher('foo', 'bar');
    });

    s.bench('push-stream', function () {
      called = 0;
      subjects.pushStream.push('bar');
    });

    s.bench('push-stream-patch', function () {
      called = 0;
      subjects.pushStreamPatch.push('bar');
    });

    s.bench('mini-pipe', function () {
      called = 0;
      subjects.pipe.push('bar');
    });

    s.bench('dripEmitterEnhanced', function () {
      called = 0;
      subjects.dripEmitterEnhanced.emit('foo', 'bar');
    });

    s.bench('d3-dispatch', function () {
      called = 0;
      subjects.dispatch.call('foo', null, 'bar');
    });

    s.bench('namespace-emitter', function () {
      called = 0;
      subjects.nsEmitter.emit('foo', 'bar');
    });

    s.bench('ReactiveProperty', function () {
      called = 0;
      subjects.rProperty('bar');
    });

    s.bench('observable', function () {
      called = 0;
      subjects.observableValue('bar');
    });

    s.bench('observ', function () {
      called = 0;
      subjects.observValue.set('bar');
    });

    s.bench('RXJS', function () {
      called = 0;
      subjects.subject.next('bar');
    });

    s.bench('JS-Signals', function () {
      called = 0;
      subjects.signal.dispatch('bar');
    });

    s.bench('MiniSignals', function () {
      called = 0;
      subjects.miniSignal.dispatch('bar');
    });

    s.bench('MicroSignals', function () {
      called = 0;
      subjects.microSignal.dispatch('bar');
    });

    s.bench('signal-emitter', function () {
      called = 0;
      subjects.signalEmitter.emit('bar');
    });

    s.bench('event-signal', function () {
      called = 0;
      subjects.eventSignal.emit('bar');
    });

    s.bench('signal-lite', function () {
      called = 0;
      subjects.signalLite.broadcast('bar');
    });

    s.bench('minivents', function () {
      called = 0;
      subjects.miniVent.emit('foo', 'bar');
    });

    s.bench('pull-notify', function () {
      called = 0;
      subjects.pullNotify('bar');
    });

    s.bench('pull-pushable', function () {
      called = 0;
      subjects.pullPushable.push('bar');
    });

    s.bench('xstream', function () {
      called = 0;
      subjects.xstream.shamefullySendNext('bar');
    });

    s.bench('evee', function () {
      called = 0;
      subjects.evee.emit('foo', 'bar');
    });

    s.bench('sister', function () {
      called = 0;
      subjects.sister.trigger('foo', 'bar');
    });

    function handle(a) {
      if (!subjects) { // ignore calls before bechmarks start
        return;
      }
      if (arguments.length === 0 || arguments.length > 2 || a !== 'bar') {
        throw new Error('invalid arguments ' + a);
      }
      called++;
    }
  });
});
