const app = require('./src/app');

/*const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Aplicação executando na porta...:', port);
});*/

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public'));
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started na porta ${port}`));