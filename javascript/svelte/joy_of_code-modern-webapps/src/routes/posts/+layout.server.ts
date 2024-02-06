import db from '$lib/database'

export async function load() {
	const posts = await db.post.findMany({
		select: {
			title: true,
			slug: true
		},
		take: 4
	})

	return { posts }
}
