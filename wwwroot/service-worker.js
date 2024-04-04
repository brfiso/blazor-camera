const cacheName = 'blazor-camera-cache-v1';
const cacheFiles = [
    '/',
    '/index.html',
    '/manifest.json',
    '/icon.png',
    '/_framework/blazor.webassembly.js',
    '/_framework/blazor.boot.json',
    '/_framework/wasm/mono.js',
    '/_framework/wasm/mono.wasm',
    '/_framework/_bin/blazor_camera.dll',
    '/_framework/_bin/Microsoft.AspNetCore.Blazor.HttpClient.dll',
    '/_framework/_bin/Microsoft.AspNetCore.Components.dll',
    '/_framework/_bin/Microsoft.AspNetCore.Components.Web.dll',
    '/_framework/_bin/Microsoft.Extensions.DependencyInjection.Abstractions.dll',
    '/_framework/_bin/Microsoft.Extensions.DependencyInjection.dll',
    '/_framework/_bin/Microsoft.Extensions.Logging.Abstractions.dll',
    '/_framework/_bin/Microsoft.Extensions.Primitives.dll',
    '/_framework/_bin/Mono.Security.dll',
    '/_framework/_bin/mscorlib.dll',
    '/_framework/_bin/System.Core.dll',
    '/_framework/_bin/System.dll',
    '/_framework/_bin/System.Net.Http.dll',
    '/_framework/_bin/System.Runtime.CompilerServices.Unsafe.dll',
    '/_framework/_bin/System.Text.Encodings.Web.dll',
    '/_framework/_bin/System.Text.Json.dll',
    '/_framework/_bin/WebAssembly.Bindings.dll',
    '/_framework/_bin/WebAssembly.Net.Http.dll',
    '/_framework/_bin/WebAssembly.Net.Http.dll.gz',
    '/_framework/_bin/WebAssembly.Net.WebSockets.dll',
    '/_framework/_bin/WebAssembly.Net.WebSockets.dll.gz',
    '/css/app.css',
    '/_content/BlazorCamera/favicon.ico'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll(cacheFiles);
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cache => cache !== cacheName).map(cache => caches.delete(cache))
            );
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
