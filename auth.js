import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {  },
        password: {  }
      },
      authorize: async (credentials) => {
        const user ={
          id:'67d00d631612c8ac45c7557f',
          email:'itzshippu@gmail.com',
          name:'Shippu',
          username:'shippu908',
          password:'Shibu@123',
          role:'admin'
      }
        // await connectToDB('admin');
        // const user = await User.findOne({ email: credentials.email });
        // if (!user) return null;
        // const isValid = await user.comparePassword(credentials.password);
        // if (!isValid) return null;

        if(credentials.email === user.email && credentials.password === user.password){
          return {
            id: user.id,
            name:user.name,
            username:user.username,
            email: user.email,
            role: user.role
          };
        }
        return null;
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login'
  },
  trustHost:true,
  trustedHosts: ['localhost', 'localhost:3000','tirze-fit.com'],
  secret: process.env.NEXTAUTH_SECRET
});