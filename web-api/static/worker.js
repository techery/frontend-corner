// Service Worker script

let isOnline = false;
let queue = [];

self.addEventListener("install", () => {
    isOnline = navigator.onLine;
});

navigator.connection.onchange = () => {
    isOnline = navigator.onLine;
    console.log(`[Service Worker] You are ${isOnline ? 'online' : 'offline'}`);

    if(isOnline && queue.length){
        console.log('[Service Worker] Processing queue');
        queue.forEach((request)=>{
            fetch(request).then((result)=>{
                console.log('[Service Worker] request', result);
            });
        });

        sendMessage(`Processed ${queue.length} items`);

        queue = [];
    }
};

self.addEventListener("fetch", async (e) => {
    if(!e.request.url.includes('/card') || e.request.method !== 'POST'){
        return;
    }

    console.log(`[Service Worker] Fetched resource ${e.request.url} and type ${e.request.method}`);
    if(isOnline){
        console.log(`[Service Worker] Just proxying request`);
        return await fetch(e.request);
    } else {
        console.log(`[Service Worker] We are offline, so just adding request to queue`);
        queue.push(e.request);

        e.respondWith(new Response(JSON.stringify({result: 'OFFLINE OK'}), {
            headers: {
                "content-type": "application/json;charset=UTF-8",
            },
        }));
    }
});

function sendMessage(data) {
    clients.matchAll().then(clients => {
        clients.forEach(client => {
            client.postMessage(data);
        });
    });
}