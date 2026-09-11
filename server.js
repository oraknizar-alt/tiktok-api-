const express = require('express');
const { WebcastPushConnection } = require('tiktok-live-connector');
const app = express();

app.get('/api/live/:username', async (req, res) => {
    const tiktokLiveConnection = new WebcastPushConnection(req.params.username);
    try {
        const state = await tiktokLiveConnection.connect();
        res.json({ 
            success: true, 
            roomId: state.roomId, 
            title: state.roomInfo?.title,
            viewerCount: state.roomInfo?.viewerCount 
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = app;
