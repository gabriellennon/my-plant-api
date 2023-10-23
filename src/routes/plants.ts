import { FastifyInstance } from "fastify";
import { z } from 'zod';
import { prisma } from "../lib/prisma";
const { randomUUID } = require('crypto');

export async function plantsRoute(app: FastifyInstance) {
    app.addHook('preHandler', async (request) => {
        await request.jwtVerify()
    })

    app.get('/plants', async (request) => {
        const plants = await prisma.plant.findMany()
        return plants
    })    

    // Cadastro da planta (Apenas para popular a base)
    app.post('/plants', async (req, res) => {
        const bodySchema = z.object({
            name: z.string(),
            about: z.string(),
            water_tips: z.string(),
            water_amount: z.number().min(1),
            photo: z.string(),
            frequency_time: z.number().min(1),
            frequency_repeat_everyday: z.string(),
        })

        const { name, about, water_tips, photo, frequency_time, frequency_repeat_everyday, water_amount } = bodySchema.parse(req.body)
        
        const id = randomUUID();

        const plant = await prisma.plant.create({
            data: {
                id, 
                name, 
                about, 
                water_tips, 
                photo, 
                frequency_time,
                frequency_repeat_everyday,
                water_amount
            }
        })

        return plant
    })

    // REGISTRO DE PLANTAS (USUÁRIO)
    app.post('/plantUser', async (req) => {
        const bodySchema = z.object({
            name: z.string(),
            custom_name: z.string(),
            about: z.string(),
            water_tips: z.string(),
            water_amount: z.number().min(1),
            photo: z.string(),
            environment_plant: z.string(),
            frequency_time: z.number().min(1),
            frequency_repeat: z.string(),
            reminder_time: z.string(),
            reminder_time_in_date: z.string()
        })

        const { name, custom_name , about, water_tips, water_amount, photo, frequency_time, frequency_repeat, reminder_time, reminder_time_in_date, environment_plant } = bodySchema.parse(req.body)

        const id = randomUUID();

        const plant = await prisma.plant_User.create({
            data: {
                id,
                name, 
                custom_name,
                about, 
                water_tips, 
                photo, 
                frequency_time, 
                frequency_repeat, 
                reminder_time,
                userId: req.user.sub,
                environment_plant,
                water_amount,
                reminder_time_in_date
            }
        })

        return plant
    })

    // LISTAGEM PLANTAS DO USUÁRIO
    app.get('/plantsuser', async (request) => {

        const plants = await prisma.plant_User.findMany({
            where: {
                userId: request.user.sub
            },
            orderBy: {
                reminder_time: 'asc'
            }
        })

        return plants
    }) 

    app.delete('/plantsuser/:id', async (request, reply) => {

        const paramsSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = paramsSchema.parse(request.params)

        await prisma.plant_User.delete({
            where: {
                id
            }
        })

        reply.status(200).send()
    }) 
}