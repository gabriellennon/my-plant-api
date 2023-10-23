import axios from "axios";
import { FastifyInstance } from "fastify";
import { z } from 'zod';
import { prisma } from "../lib/prisma";

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', async (req) => {
    const bodySchema = z.object({
      access_token: z.string()
    })

    
    const { access_token } = bodySchema.parse(req.body)

    const googleUserInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const { sub: googleUserId, email, picture, name } = googleUserInfo.data;

    let user = await prisma.user.findUnique({
      where: {
        googleId: googleUserId
      }
    })

    if(!user) {
      user = await prisma.user.create({
        data: {
          googleId: googleUserId,
          name: name,
          avatarUrl: picture,
          email: email
        }
      })
    }

    const token = app.jwt.sign({
      name: name,
      avatarUrl: picture
    }, {
      sub: user.id,
      expiresIn: '15d'
    })

    return {
      token
    }
  })

  app.post('/registerApple', async (req) => {
    const bodySchema = z.object({
      appleIdentityToken: z.string(),
      name: z.string(),
      avatarUrl: z.string(),
      email: z.string(),
      appleUserId: z.string()
    })

    const { appleIdentityToken, name, avatarUrl, email, appleUserId } = bodySchema.parse(req.body)

    let user = await prisma.user.findUnique({
      where: {
        appleUserId: appleUserId
      }
    })

    if(!user) {
      user = await prisma.user.create({
        data: {
          appleIdentityToken: appleIdentityToken,
          name: name,
          avatarUrl: avatarUrl,
          email: email,
          appleUserId: appleUserId
        }
      })
    }

    const token = app.jwt.sign({
      name: name,
      avatarUrl: avatarUrl
    }, {
      sub: user.id,
      expiresIn: '15d'
    })

    return {
      token
    }
  })
}