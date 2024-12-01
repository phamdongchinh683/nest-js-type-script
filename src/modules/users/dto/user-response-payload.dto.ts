import { Role } from "src/global/globalEnum";

export interface UserResponsePayload {
 id: string;
 username: string;
 password: string;
 fullName: string;
 age: number;
 roles: Role[];
}
