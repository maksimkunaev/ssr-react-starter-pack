import path from 'path';
import fs from 'fs';

import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';

import App from '../shared/App';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static('public'));

app.get('/*', (req, res) => {
    const app = renderToString(<App />);

    const indexFile = path.resolve('./src/template.html');
    fs.readFile(indexFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Something went wrong:', err);
            return res.status(500).send('Oops, better luck next time!');
        }

        return res.send(
            data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
        );
    });
});

app.listen(PORT, () => {
    console.log(`😎 Server is listening on port ${PORT}`);
});