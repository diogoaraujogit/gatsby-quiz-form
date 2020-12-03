const lessToJson = require('less-to-json');

module.exports = {
  siteMetadata: {
    title: 'Gatsby Ant Design Starter',
    description: 'Kick off your next, great Gatsby project with this extra awesome ant design starter!',
    author: '@gatsbyjs + @alienCY',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-antd',
      options: {
        style: true,
      },
    },
    {
      resolve: 'gatsby-plugin-less',
      options: {
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: lessToJson('src/theme/vars.less'),
        },
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-layout',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-antd-starter',
        short_name: 'starter',
        start_url: '/',
        background_color: '#5ccfd5',
        theme_color: '#5ccfd5',
        display: 'savageglobalmarketing',
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
