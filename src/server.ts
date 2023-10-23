import 'dotenv/config'

import { fastify } from 'fastify';
import jwt from '@fastify/jwt'
import { fastifyCors } from '@fastify/cors';
import { plantsRoute } from './routes/plants';
import { authRoutes } from './routes/auth';

const app = fastify()

app.register(fastifyCors, {
    origin: '*',
    // quando tiver com o dominio certo colocar
    // origin: ['http://localhost:3000', 'http://myapi.com.br']
})

app.register(jwt, {
    secret: 'gl7nn2023myplant$brptbr141997',
})

app.register(authRoutes)
app.register(plantsRoute)


app.listen({
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
    host: '0.0.0.0'
}).then(() => {
    console.log('🚀 HTTP server running on http://localhost:3333')
})