
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
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /static/ // See below to configure properly
        }
      }
    }
  ],
}