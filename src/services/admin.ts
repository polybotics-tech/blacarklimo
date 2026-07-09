import { NextRequest } from "next/server";
import constants from "../libs/constants";
import { createAdmin, findAdminByEmail, findAdminById } from "../utils/db";
import { AdminRecordType } from "../utils/db/types";
import { hash } from "../utils/hash";
import { token } from "../utils/token";

async function registerAdmin(body: {
  email: string;
  password: string;
  fullname: string;
}): Promise<{ error?: string; accessToken?: string }> {
  const { email, password, fullname } = body;

  const isExisting = await findAdminByEmail(email);
  if (isExisting) {
    return { error: "An account exist for this email" };
  }

  const password_hash = hash.generate(password);

  const admin = await createAdmin(email, password_hash, fullname);

  if (!admin) {
    return { error: "Something went wrong" };
  }

  const accessToken = token.generateAccessToken({
    id: admin?.id,
    email: admin?.email,
  });

  if (!accessToken) {
    return { error: "Something went wrong" };
  }

  return { accessToken: String(accessToken) };
}

async function loginAdmin(body: { email: string; password: string }): Promise<{
  error?: string;
  accessToken?: string;
  admin?: Partial<AdminRecordType>;
}> {
  const { email, password } = body;

  const admin = await findAdminByEmail(email);

  if (!admin) {
    return { error: "Invalid email or password" };
  }

  const isValid = await hash.compare(password, admin?.passwordHash);

  if (!isValid) {
    return { error: "Invalid email or password" };
  }

  const accessToken = token.generateAccessToken({
    id: admin?.id,
  });

  if (!accessToken) {
    return { error: "Something went wrong" };
  }

  const { passwordHash, ...safeAdmin } = admin;

  return { accessToken: String(accessToken), admin: safeAdmin };
}

async function validateAccessToken(
  req: NextRequest,
): Promise<{ error?: string; admin?: Partial<AdminRecordType> }> {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return { error: "Unauthorized access denied" };
    }

    const tokenBearer = authHeader.trim().split(" ")[0];
    const tokenKey = authHeader.trim().split(" ")[1];

    if (!constants.token.allowedBearers.includes(tokenBearer) || !tokenKey) {
      return { error: "Unauthorized access denied" };
    }

    const payload = token.verifyAccessToken(tokenKey);
    if (!payload) {
      return { error: "Unauthorized access denied" };
    }

    if (typeof payload === "object" && payload !== null && "id" in payload) {
      const admin = await findAdminById(payload?.id);
      if (!admin) {
        return { error: "Unauthorized access denied" };
      }

      const { passwordHash, ...safeAdmin } = admin;

      return {
        admin: safeAdmin,
      };
    } else {
      return { error: "Unauthorized access denied" };
    }
  } catch (error) {
    const errMsg =
      error instanceof Error ? error?.message : "Something went wrong";

    if (String(errMsg).toLowerCase() === "jwt expired")
      return { error: "access token expired" };

    return { error: errMsg };
  }
}

export { registerAdmin, loginAdmin, validateAccessToken };
