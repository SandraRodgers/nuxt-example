<template>
  <main>
    <h1>Deepgram Blog</h1>
    <h2>All Posts</h2>
    <ul>
      <li v-for="post in posts" :key="post.slug">
        <NuxtLink :to="`/blog/${post.slug}`">{{post.title}}</NuxtLink>
      </li>
    </ul>
    <h2>Posts By Author</h2>
    <ul>
      <li v-for="(author, i) in authorList" :key="i">
        <NuxtLink :to="`/blog/authors/${author}`">{{author}}</NuxtLink>
      </li>
    </ul>
  </main>
</template>
<script>
export default {
  async asyncData({ $content }) {
			const posts = await $content('blog')
        .fetch()
      const authorList = []
      posts.forEach(post => {
        if (authorList.includes(post.author)===false){
          authorList.push(post.author)
        }
      })
			return { posts, authorList }
	},
}
</script>
