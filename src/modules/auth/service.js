import prisma from '../../config/database.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../../utils/token.js';

export const registerUser = async ({ name, email, password, companyName }) => {

    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (existingUser) {
        throw new Error( "Email telah terdaftar");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const company = await prisma.company.create({
        data: {
            name: companyName,
            plan: "FREE"
        }
    });
    
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role: "OWNER",
            companyId: company.id
        }
    });

    const { password: _, ...safeUser } = user;

    const token = generateToken(user);

    return { user: safeUser, token };
};

export const loginUser = async ({ email, password }) => {
    
    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        throw new Error("Pengguna tidak ditemukan");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Kredensial tidak valid");
    }

    const { password: _, ...safeUser } = user;

    const token = generateToken(user);

    return { user: safeUser, token };

}