export function errorResponse(res, statusCode: number, message: string) {
 return res.status(statusCode).json({ message });
}
