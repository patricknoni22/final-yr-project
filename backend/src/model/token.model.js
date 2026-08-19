import { prisma } from "../config/db.js";


export const storeToken = async (userId, token) => {
    return await prisma.token.upsert({
        where: { userId },
        update: { token, tokenId: userId },
        create: { userId, tokenId: userId, token }
    });
};


