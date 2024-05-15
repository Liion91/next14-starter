import NextAuth from "next-auth";
import { authConfig } from "./lib/auth.config";


export default NextAuth(authConfig).auth;

// Used for intercept the fetch
// and used by next for make check if user is logged & admin or not

// non possono essere utilizzate funzioni dichiarate all'interno di auth
// perché in auth sono presenti librerie esterne a Next 

// la funzione authorize scritta in auth.config.js altrimenti poteva essere inserita all'interno 
// del file auth dentro la sezione callbacks invece che in auth.config

export const config = {
    matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};