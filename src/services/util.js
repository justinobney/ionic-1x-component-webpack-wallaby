function UtilService($q, $timeout){

  this.memoizePromise = memoizePromise;

  function memoizePromise(fn, expire){
    const calls = {};
    const action = (...args) => {
      var key = hash(args);
      var found = calls[key];

      if(expire){
        $timeout(() => action._forget(...args), expire);
      }

      if(!found){
        const lookup = {inFlight: true};
        const promise = fn(args).then(resp => {
          lookup.inFlight = false;
          lookup.resp = resp;
          return resp;
        });
        lookup.promise = promise;
        calls[key] = lookup;
        return promise
      }

      if(found.inFlight){
        return found.promise;
      }

      return $q.resolve(found.resp);
    };

    action._forget = (...args) => {
      calls[hash(args)] = null
    };

    return action;
  }

  function hash(args){
    const key = args.reduce(
      (acc, val, idx) => {
        acc[idx] = val;
        return acc;
      }, {}
    );
    return JSON.stringify(key);
  }
}

export default angular
  .module('ng-starter.services.util', [])
  .service('utilService', UtilService)
  .name;
