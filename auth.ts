import NextAuth from "next-auth"
import { prisma } from "./lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"
import { getUserById } from "./data/user"
import { getAccountByUserId } from "./data/account"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {strategy: "jwt"},
  ...authConfig,
  callbacks: {
    async signIn({user, account}){
      if(account?.provider !== 'credentials'){
        return true
      }

      const existingUser = await getUserById(user.id ?? "");

      if(!existingUser?.emailVerified){
        return false
      }

      return true
    },
    async jwt({token}) {
      if(!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if(!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOauth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.image = existingUser.image;
      token.role = existingUser.role;

      return token;
    },
    async session({token, session}){
      
      return {
        ...session,
        id: token.sub,
        isOauth: token.isOauth,
        role: token.role,
      }

    }
  }
})