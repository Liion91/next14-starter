// non è presente come funzione aggiuntiva all'interno di auth / callbacks
// perché in auth vengono utilizzate librerie esterne a next ( mongoose / bcrypt)

export const authConfig = {
    // for check the session / the user priviledges
    // for make a redirects

    // deve essere dichiarata la pagina utilizzata 
    // in caso l'utente non sia loggato e o che dalla callback torni false 
    // per poter effettuare il redirect
    // il false dovrebbe tornare solamente nel caso in cui l'utente non sia loggato
    pages: {
        signIn: '/login'
    },
    providers: [],
    callbacks: {
        // nexth ad ogni login crea un jwt token
        // possiamo recuperare il token generato da next ed i dati relativi all'utente
        // utilizziamo i dati utente per poter aggiornare il token
        // possiamo utilizzare queste funzioni anche per poter aggiungere altri dati
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.isAdmin = user.isAdmin
            }
            return token;
        },
        // utilizziamo il token per poter aggiornare la sessione
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.isAdmin = token.isAdmin;
                return session;
            }
        },
        // funzione chiamata ad ogni login
        // sia con github, sia con le credenziali
        authorized({ auth, request }) {
            // i dati che tornano dalla sessione cambiano  
            // a seconda del tipo di login che si effettua

            const user = auth?.user;
            const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/admin");
            const isOnBlogPage = request.nextUrl?.pathname.startsWith("/blog");
            const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");

            // ONLY ADMIN CAN REACH THE ADMIN DASHBOARD
            if (isOnAdminPanel && !user?.isAdmin) {
                return false;  // return to the login page
            }

            // ONLY AUTHENTICATED USERS CAN REACH BLOG PAGE
            if (isOnBlogPage && !user) {
                return false;  // return to the login page
            }

            // ONLY UNAUTHENTICATED USERS CAN REACH LOGIN PAGE
            if (isOnLoginPage && user) {
                return Response.redirect(new URL('/', request.nextUrl));
            }

            return true;
        }
    }
}