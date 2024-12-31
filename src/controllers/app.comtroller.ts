import { AdminController } from "src/modules/admin/admin.controller";
import { AuthController } from "src/modules/auth/auth.controller";
import { PostController } from "src/modules/post/post.controller";
import { UserController } from "src/modules/user/user.controller";

export const controllersApp = [
 UserController, AuthController, PostController, AdminController
];

export { AdminController, AuthController, PostController, UserController };

