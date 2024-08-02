// only for stagging
import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { url } = req.query

    if (!url || Array.isArray(url)) {
        res.status(400).send('Missing or invalid URL parameter')
        return
    }

    const username = process.env.MAGENTO_USERNAME
    const password = process.env.MAGENTO_PASSWORD

    if (!username || !password) {
        res.status(500).send('Missing authentication credentials')
        return
    }

    const encodedCredentials = Buffer.from(`${username}:${password}`).toString('base64')

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Basic ${encodedCredentials}`,
            },
        })

        if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`)

        const contentType = response.headers.get('content-type')
        if (contentType) {
            res.setHeader('Content-Type', contentType)
        }
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')

        response.body?.pipe(res)
    } catch (error) {
        console.error('Error proxying image:', error)
        res.status(500).send('Error proxying image')
    }
}

export const config = {
    api: {
        responseLimit: false,
    },
}