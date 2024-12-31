import { Role } from "src/global/globalEnum";

export interface UserResponsePayload {
 id: string;
 username: string;
 password: string;
 roles: Role[];
}
