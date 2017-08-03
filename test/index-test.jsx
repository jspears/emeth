import theme, { themeClass, settings } from 'emeth';
import expect from 'expect';

const execLoop = (...fns) => () => fns.forEach(c => c());
describe('theme', function () {
    it('should return in the right order', function () {
        const remove = execLoop(
            theme({ A: { test: 1 } }),
            theme({ B: { test: 3 } }),
            theme({ A: { test: 2 } })
        );
        const tc     = themeClass({ displayName: 'A' });

        expect(tc('test')).toEqual('2 1')
        remove();
    });
    it('should return unknown class', function () {
        const remove  = execLoop(
            theme({ A: { test: 1 } }),
            theme({ B: { test: 3 } }),
            theme({ A: { test: 2 } })
        );
        const owarn   = settings.warn;
        const capture = [];
        settings.warn = (...args) => capture.push(args);

        const tc = themeClass({ displayName: 'A' });
        expect(tc('stuff')).toEqual('stuff');
        expect(capture.length).toEqual(1);
        expect(capture[0][0])
            .toEqual(`could not find a className for '%s' for '%s' `);
        expect(capture[0][1]).toEqual('A');
        expect(capture[0][2]).toEqual(['stuff']);

        remove();
        settings.warn = owarn;
    });
    it('should return theme when removing', function () {
        const test = { A: { test: 1 } };
        const a    = theme(test);
        expect(a()).toEqual(test);
    });
});
