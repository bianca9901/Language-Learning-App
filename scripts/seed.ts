import "dotenv/config"
import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"

import * as schema from "../db/schema"

const sql = neon(process.env.DATABASE_URL!)
// @ts-ignore
const db = drizzle(sql, { schema })

const main = async () => {
    try {
        console.log('seeding database')
        await db.delete(schema.courses)
        await db.delete(schema.userProgress)
        await db.delete(schema.units)
        await db.delete(schema.lessons)
        await db.delete(schema.challenges)
        await db.delete(schema.challengeOptions)
        await db.delete(schema.challengeProgress)

        await db.insert(schema.courses).values([
            {
                id: 1,
                title: "Spanish",
                imageSrc: "/es.svg"
            },
            {
                id: 2,
                title: "Italian",
                imageSrc: "/it.svg"
            },
            {
                id: 3,
                title: "Japanese",
                imageSrc: "/jp.svg"
            },
            {
                id: 4,
                title: "French",
                imageSrc: "/fr.svg"
            },
        ])

        await db.insert(schema.units).values([
            {
                id: 1,
                courseId: 1, // spanish
                title: "Unit 1",
                description: "Learn the basics of Spanish",
                order: 1,
            }
        ])
        console.log('seeding finished')
    } catch (error) {
        console.error(error)
        throw new Error('Failed to seed the database')
    }
}
main()