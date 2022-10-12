import * as jwt from 'jsonwebtoken';

export const signAccessToken = (userId: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(
      { userId },
      process.env.SECRET,
      { audience: userId, expiresIn: '2 days' },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      },
    );
  });
};
