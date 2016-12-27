export const SERVICE_WORKER_NEW_CONTENT = 'SERVICE_WORKER_NEW_CONTENT';
export const SERVICE_WORKER_AVAILABLE = 'SERVICE_WORKER_AVAILABLE';
export const SERVICE_WORKER_REDUNDANT = 'SERVICE_WORKER_REDUNDANT';
export const SERVICE_WORKER_ERROR = 'SERVICE_WORKER_ERROR';

const createServiceWorkerMiddleware = path => (store) => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(path).then((reg) => {
      reg.onupdatefound = () => {
        const installingWorker = reg.installing;

        installingWorker.onstatechange = () => {
          switch (installingWorker.state) {
            case 'installed':
              if (navigator.serviceWorker.controller) {
                store.dispatch({
                  type: SERVICE_WORKER_NEW_CONTENT,
                });
              } else {
                store.dispatch({
                  type: SERVICE_WORKER_AVAILABLE,
                });
              }
              break;

            case 'redundant':
              store.dispatch({
                type: SERVICE_WORKER_REDUNDANT,
              });
              break;
            // no default
          }
        };
      };
    }).catch((e) => {
      store.dispatch({
        type: SERVICE_WORKER_ERROR,
        payload: e,
      });
    });
  }
  return next => action => next(action);
};

export default createServiceWorkerMiddleware;
