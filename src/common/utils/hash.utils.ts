import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string) {
 const salt: number = 10;
 return bcrypt.hash(password, salt);
}
export async function comparePassword(password: string, hash: string) {
 return bcrypt.compare(password, hash);
}
