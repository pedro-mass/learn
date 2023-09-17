import { error } from '@sveltejs/kit'
import db from '$lib/database'

export async function load({ params }) {
	const post = await db.post.findUnique({
		where: { slug: params.slug }
	})

	if (!post) {
		throw error(404, 'Post not found')
	}

	return { post }
}
