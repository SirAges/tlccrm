import { connectToDB } from "../../../../lib/database";
import User from "../../../../models/user";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
export const POST = async () => {
    try {
        const cookie = await cookies()?.get("tlccrm")?.value;
        if (!cookie) {
            return new Response("you are not authorized", { status: 401 });
        }

        const refreshToken = cookie;
        const token = await jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                if (err)
                    return new Response("you don't have access, Forbidden", {
                        status: 403
                    });

                const foundUser = await User.findOne({
                    id: decoded._id
                }).exec();

                if (!foundUser)
                    return new Response("You are not authorized", {
                        status: 401
                    });

                const accessToken = await jwt.sign(
                    {
                        id: foundUser._id,
                        roles: foundUser.roles
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: "30m" }
                );

                console.log("access" + accessToken);
                return accessToken;
            }
        );

        return new Response(JSON.stringify(token), { status: 200 });
    } catch (err) {
        return new Response(err, { status: 500 });
    }
};
