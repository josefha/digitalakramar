
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Roboto`,
            variants: [`300`, `400`, `700`]
          },
          {
            family: `Sacramento`
          },
          {
            family: `Quicksand`
          }
        ],
      },
    },
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        features: {
          auth: true,
          database: true,
          firestore: false,
          storage: false,
          messaging: false,
          functions: false,
          performance: false,
        },
        credentials: {
          apiKey: process.env.GATSBY_FB_APIKEY,
          authDomain: process.env.GATSBY_FB_AUTHDOMAIN,
          databaseURL: process.env.GATSBY_FB_DATABASEURL,
          projectId: process.env.GATSBY_FB_PROJECTID,
          storageBucket: process.env.GATSBY_FB_STORAGEBUCKET,
          messagingSenderId: process.env.GATSBY_FB_MESSAGINGSENDERID,
          appId: process.env.GATSBY_FB_APPID
        }
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /static/ // See below to configure properly
        }
      }
    },
    {
      resolve: `gatsby-plugin-recaptcha`,
      options: {
         async: true,
         defer: false,
         args: `?onload=onloadCallback&render=explicit`,
      },
   },
  ],
}