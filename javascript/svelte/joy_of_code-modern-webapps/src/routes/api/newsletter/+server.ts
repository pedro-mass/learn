import { json } from '@sveltejs/kit'

// api/newsletter GET

export async function GET(event) {
	const options: ResponseInit = {
		status: 418,
		headers: {
			X: 'Gon give it to ya'
		}
	}

	return new Response('Hello', options)
}

export async function POST(event) {
	const data = await event.request.formData()
	const email = data.get('email')

	// subscribe the user to the newsletter
	console.log({
		fn: 'POST',
		message: 'subscribed',
		email
	})

	// return success
	// return new Response(JSON.stringify({ success: true }), {
	// 	headers: { 'Content-Type': 'application/json' }
	// })

	// or since it's common to return json
	return json({ success: true })
}
