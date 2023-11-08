<script>
	import { page } from '$app/stores'
</script>

<div>
	<h2>Pretty Print Page</h2>
	<pre>
{JSON.stringify($page, null, 2)}
  </pre>
</div>
