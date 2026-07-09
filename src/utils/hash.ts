import bcrypt from "bcryptjs";

export const hash = {
  compare: async (entry: string, hash: string) =>
    await bcrypt.compare(String(entry), hash),
  generate: (entry: string) =>
    bcrypt.hashSync(String(entry), Number(process.env.BCRYPT_HASH_SALT)),
};
