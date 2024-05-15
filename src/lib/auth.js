import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectToDb } from "./utils"
import { User } from "./models"
import bcrypt from 'bcrypt';

import { authConfig } from "./auth.config"

const login = async (credentials) => {
    try {
        connectToDb();

        const user = await User.findOne({ username: credentials.username });
        if (!user) {
            throw new Error('Wrong credentials');
        }

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordCorrect) {
            throw new Error('Wrong credentials');
        }

        return user

    } catch (error) {
        console.log(error)
        throw new Error('Failed to login!');
    }
}

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    ...authConfig,
    // i providers seguenti vanno a overridare quelli presenti in authConfig
    providers: [
        //Provider 
        GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        // Aggiunto un nuovo Provider per la login con le credenziali
        CredentialsProvider({
            async authorize(credentials) {
                try {
                    // console.log(credentials)
                    const user = await login(credentials);
                    return user
                } catch (error) {
                    return null;
                }
            }
        })
    ],
    // le callbacks seguenti vanno a overridare quelli presenti in authConfig
    callbacks: {
        // Return here after signIn into Github
        async signIn({ account, profile }) {
            if (account.provider === 'github') {
                connectToDb();
                try {
                    const user = await User.findOne({ email: profile.email });
                    if (!user) {
                        const newUser = new User({
                            username: profile.login,
                            email: profile.email,
                            image: profile.avatar_url
                        })

                        await newUser.save();
                    }

                } catch (error) {
                    console.log(error)
                    // if the user isn't inside database return false 
                    // the user is not authenticathed
                    return false;
                }
            }
            return true;
        },
        // per poter utilizzare ed evitare l'override di una funzione presente in authConfig
        ...authConfig.callbacks 
    }
})