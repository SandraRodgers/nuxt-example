const authors = ['Jane Doe', 'Inigo Montoya']
const authorFeeds = []

setTimeout(()=>{
  console.log([mainFeed, ...authorFeeds])
}, 1000)


const mainFeed = {
  path: '/feed.xml',
  async create(feed) {
    const { $content } = require('@nuxt/content');
    const posts = await $content('blog').fetch();
    feed.options = {
      title: "Deepgram blog",
      link: 'https://localhost:3000/feed.xml',
      description: "All things Deepgram",
      }

      posts.forEach((post) => {
        feed.addItem({
          title: post.title,
          id: post.slug,
          author: post.author,
          link: `http://localhost:3000/blog/${post.slug}`,
          date: new Date(post.date),
        })
    })
  },
  cacheTime: 1000 * 60 * 15,
  type: 'rss2',
}

authors.forEach(author => {
  authorFeeds.push({
    path: `/author/${author}/feed.xml`,
    async create(feed) {
      const { $content } = require('@nuxt/content');
      const posts = await $content('blog').where({author: author}).fetch();
      feed.options = {
        title: 'Deepgram blog',
        link: `https://localhost:3000/${author}feed.xml`,
        description: "All things Deepgram",
        }

        posts.forEach((post) => {
          feed.addItem({
            title: post.title,
            id: post.slug,
            author: post.author,
            link: `http://localhost:3000/blog/${post.slug}`,
            date: new Date(post.date),
          })
      })
    },
  cacheTime: 1000 * 60 * 15,
  type: 'rss2',
  })
})

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-example',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/feed',
  ],

  feed: [mainFeed, ...authorFeeds],

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
