"use strict";
exports.id = 722;
exports.ids = [722];
exports.modules = {

/***/ 3722:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "L": () => (/* binding */ authOptions)
});

// UNUSED EXPORTS: getAuthSession

// EXTERNAL MODULE: ./node_modules/.pnpm/next-auth@4.22.1_z4pol2qj2yv3um3jqqobs4b3eu/node_modules/next-auth/index.js
var next_auth = __webpack_require__(9418);
// EXTERNAL MODULE: external "@prisma/client"
var client_ = __webpack_require__(3524);
;// CONCATENATED MODULE: ./src/lib/db.ts


let prisma;
if (true) {
    prisma = new client_.PrismaClient();
} else {}
const db = prisma;

// EXTERNAL MODULE: ./node_modules/.pnpm/@next-auth+prisma-adapter@1.0.7_7qw3euhupn3rgyypnunrvlfu3i/node_modules/@next-auth/prisma-adapter/dist/index.js
var dist = __webpack_require__(8431);
// EXTERNAL MODULE: ./node_modules/.pnpm/next-auth@4.22.1_z4pol2qj2yv3um3jqqobs4b3eu/node_modules/next-auth/providers/google.js
var google = __webpack_require__(6478);
// EXTERNAL MODULE: ./node_modules/.pnpm/nanoid@4.0.2/node_modules/nanoid/index.js + 1 modules
var nanoid = __webpack_require__(9437);
;// CONCATENATED MODULE: ./src/lib/auth.ts





const authOptions = {
    adapter: (0,dist/* PrismaAdapter */.N)(db),
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: "/signin"
    },
    providers: [
        (0,google/* default */.Z)({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async session ({ token , session  }) {
            if (token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.image = token.picture;
                session.user.username = token.username;
            }
            return session;
        },
        async jwt ({ token , user  }) {
            const dbUser = await db.user.findFirst({
                where: {
                    email: token.email
                }
            });
            if (!dbUser) {
                token.id = user.id;
                return token;
            }
            if (!dbUser.username) {
                await db.user.update({
                    where: {
                        id: dbUser.id
                    },
                    data: {
                        username: (0,nanoid/* nanoid */.x0)(10)
                    }
                });
            }
            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                picture: dbUser.image,
                username: dbUser.username
            };
        },
        redirect () {
            return "/";
        }
    }
};
const getAuthSession = ()=>getServerSession(authOptions);


/***/ })

};
;