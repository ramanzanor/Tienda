const app = require('./app')
const { PORT } = require('./config/config')


app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`)
})