import mysql from 'mysql';
import connection from "../utils/database";

interface UserData {
    name?: string;
    email?: string;
    age?: number;
}

const executeQuery = (sql: string, params: any[] = []): Promise<any> => {
    return new Promise((resolve, reject) => {
        connection.query(sql, params, (error, results) => {
            if (error) reject(error);
            resolve(results);
        });
    });
};

export const findAll = () => 
    executeQuery("SELECT * FROM users");

export const findOne = async (id: number) => {
    const results = await executeQuery("SELECT * FROM users WHERE id = ?", [id]);
    return results[0];
};

export const findByEmail = (email: string) => 
    executeQuery("SELECT * FROM users WHERE email = ?", [email]);

export const create = async (userData: UserData) => {
    const existingUser = await findByEmail(userData.email!);
    if (existingUser?.length > 0) {
        throw new Error('Email already exists');
    }
    return executeQuery(
        "INSERT INTO users (name, email, age) VALUES (?, ?, ?)",
        [userData.name, userData.email, userData.age]
    );
};

export const update = async (id: number, updateData: UserData) => {
    if (updateData.email) {
        const existingUser = await findByEmail(updateData.email);
        if (existingUser?.length > 0 && existingUser[0].id !== id) {
            throw new Error('Email already exists');
        }
    }

    const fields = Object.keys(updateData);
    const values = Object.values(updateData);
    
    return executeQuery(
        `UPDATE users SET ${fields.map(f => `${f} = ?`).join(', ')} WHERE id = ?`,
        [...values, id]
    );
};

export const remove = (id: number) => 
    executeQuery("DELETE FROM users WHERE id = ?", [id]);