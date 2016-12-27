# Redux Service Worker Middleware

[![npm](https://img.shields.io/npm/v/redux-sw-middleware.svg?style=flat-square)](https://www.npmjs.com/package/redux-sw-middleware)

This middleware registers a service worker for your application and enables Redux 
to receive actions based on events of the service worker.

## Install

```javascript
npm install --save redux-sw-middleware
```

# Example

First add the middleware to redux. You need to pass the path to the service worker file
as a parameter.

```javascript
import createServiceWorkerMiddleware from 'redux-service-worker-middleware'

const serviceWorkerMiddleware = createServiceWorkerMiddleware('/service-worker.js')
const store = createStore(
    reducer,
    initialState,
    applyMiddleware(serviceWorkerMiddleware)
)
```

The middleware will register the service worker and dispatch actions based on state changes
of the service worker.

## Actions

`SERVICE_WORKER_AVAILABLE`: The service worker has downloaded all files is up and running

```javascript
{
    type: 'SERVICE_WORKER_AVAILABLE'
}
```

`SERVICE_WORKER_NEW_CONTENT`: New content is available and will be loaded on the next page reload

```javascript
{
    type: 'SERVICE_WORKER_NEW_CONTENT'
}
```

`SERVICE_WORKER_REDUNDANT`: The service worker became redundant

```javascript
{
    type: 'SERVICE_WORKER_REDUNDANT'
}
```

`SERVICE_WORKER_ERROR`: An error occured

```javascript
{
    type: 'SERVICE_WORKER_ERROR',
    payload: <exception>
}
```

## License

MIT
