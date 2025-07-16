import express from 'express';
import { runWorker } from './workerRunner';
import path from 'path';

const app = express();
app.use(express.json({ limit: '50mb' }));

app.post('/upload', async (req, res) => {
    try {
        const { content, filename } = req.body;
        const savePath = path.join(__dirname, 'uploads', filename);
        const result = await runWorker('saveFile', { path: savePath, content });
        res.json({ success: true, path: result.path });
    } catch (err: any) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get('/read', async (req, res) => {
    try {
        const filePath = path.join(__dirname, 'uploads', req.query.filename as string);
        const result = await runWorker('readFile', { path: filePath });
        res.json({ success: true, content: result.content });
    } catch (err: any) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.listen(3000, () => console.log('Server started'));
