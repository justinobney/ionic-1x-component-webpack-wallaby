describe('Service: utilService', () => {
    let $injector, $rootScope, $q, $timeout;
    let util;

    beforeEach(() => {
      angular.mock.module(
        'ng-starter.services.util'
      );

      angular.mock.inject(
        _$injector_ => {
          $injector = _$injector_;
          $rootScope = $injector.get('$rootScope');
          $q = $injector.get('$q');
          $timeout = $injector.get('$timeout');
          util = $injector.get('utilService');
        }
      );
    });

    it('memoizePromise tests...', (done) => {
      const obj = {};
      obj.get = () => $q.resolve(2);
      spyOn(obj, 'get').and.callThrough();

      //|+|+|+|+|+|+|+|+|+|+|+|+|+|+|+|+|+|+|+|\\
      const action = util.memoizePromise(obj.get);
      //|+|+|+|+|+|+|+|+|+|+|+|+|+|+|+|+|+|+|+|\\

      expect(obj.get.calls.count()).toBe(0);

      // while in-flight return same promise
      action(1,2,3).then(resp => {
        expect(resp).toEqual(2);
        expect(obj.get.calls.count()).toBe(1);
      });
      // skip: $rootScope.$digest() here
      // simulating 2 calls to same action
      // before the action resolves
      action(1,2,3).then(resp => {
        expect(resp).toEqual(2);
        expect(obj.get.calls.count()).toBe(1);
      });
      $rootScope.$digest();  // trigger resolve

      // once resolved, return cached result
      action(1,2,3).then(resp => {
        expect(resp).toEqual(2);
        expect(obj.get.calls.count()).toBe(1);
      });
      $rootScope.$digest();

      // you can forget previous calls
      action._forget(1,2,3);
      action(1,2,3).then(resp => {
        expect(resp).toEqual(2);
        expect(obj.get.calls.count()).toBe(2);
      });
      $rootScope.$digest();

      // if args change, fire again
      action(1,2,3,4).then(resp => {
        expect(resp).toEqual(2);
        expect(obj.get.calls.count()).toBe(3);
        done();
      });
      $rootScope.$digest();
    });

    it('memoizePromise can set cache expire', (done) => {
      const obj = {};
      obj.get = () => $q.resolve(2);
      spyOn(obj, 'get').and.callThrough();

      //|+|+|+|+|+|+|+|+|+|+|+|+|+|+|+|+|+|+|+|\\
      const action = util.memoizePromise(obj.get, 2000);
      //|+|+|+|+|+|+|+|+|+|+|+|+|+|+|+|+|+|+|+|\\

      expect(obj.get.calls.count()).toBe(0);

      // while in-flight return same promise
      action(1,2,3).then(resp => {
        expect(resp).toEqual(2);
        expect(obj.get.calls.count()).toBe(1);
      });

      // once resolved, return cached result
      action(1,2,3).then(resp => {
        expect(resp).toEqual(2);
        expect(obj.get.calls.count()).toBe(1);
      });
      $rootScope.$digest();

      $timeout.flush(1000);
      expect(obj.get.calls.count()).toBe(1);

      $timeout.flush(1000);
      action(1,2,3).then(resp => {
        expect(resp).toEqual(2);
        expect(obj.get.calls.count()).toBe(2);
      });
      $rootScope.$digest();
      done();

    });
});
