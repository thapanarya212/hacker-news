const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', async (ws) => {
    console.log('Client connected');

    // Send the number of stories published in the last 5 minutes
    // This function should query the database for the count
    const count = await getRecentStoryCount();
    ws.send(JSON.stringify({ type: 'initial_count', count }));

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

function broadcastNewStory(story) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'new_story', story }));
        }
    });
}

module.exports = { wss, broadcastNewStory };