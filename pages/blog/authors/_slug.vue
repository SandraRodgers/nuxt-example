<template>
    <div>
        <h2>{{author}} Page</h2>
        <h3>Blog posts by this author:</h3>
        <ol>
            <li v-for="p in posts">
                <nuxt-link :to="{ path: `/blog/${p.slug}`}"> {{p.title}} </nuxt-link>
            </li>
        </ol>
    </div>
</template>

<script>
export default {
    async asyncData({ $content, params }) {
        // fetch author post here
        const posts = await $content('blog', params).where({author: params.slug}).fetch();
        let author = params.slug;
        return { author, posts }
    },
}
</script>

<style lang="scss" scoped>

</style>