<!-- MarkdownRenderer.svelte -->
<script>
	import { marked } from 'marked';

	export let content = '';
</script>

<div class="prose" innerHTML={marked(content)} />
