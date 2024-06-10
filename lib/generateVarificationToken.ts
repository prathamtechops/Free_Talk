import {
  createVerificationToken,
  deleteVerificationToken,
  getVerificationTokenByMail,
} from "./actions/emailVarification.action";

export const generateVerificationToken = async (email: string) => {
  const token = crypto.randomUUID();
  const expires = new Date(new Date().getTime() + 60 * 60 * 1000);

  const existingToken = await getVerificationTokenByMail({ email });

  if (existingToken) {
    await deleteVerificationToken({ id: existingToken._id });
  }

  const newToken = await createVerificationToken({ email, token, expires });

  return newToken;
};
