import jwt from "jsonwebtoken";
import constants from "@/src/libs/constants";

const ACCESS_TOKEN_SECRET: jwt.Secret = String(process.env.ACCESS_TOKEN_SECRET);

export const token = {
  generateAccessToken: (payload: unknown) =>
    !payload
      ? null
      : jwt.sign(payload, ACCESS_TOKEN_SECRET, {
          expiresIn: constants.token.expiresIn,
        }),
  verifyAccessToken: (token: string) =>
    !token ? null : jwt.verify(token, ACCESS_TOKEN_SECRET),
};
