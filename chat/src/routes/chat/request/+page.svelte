<script>
	import { useChat } from 'ai/svelte';
	import { onMount } from 'svelte';

	const { input, handleSubmit, messages } = useChat({
		api: '/chat/api/request'
	});

	let embed = null;

	// Check the API response directly for debugging purposes
	async function debugHandleSubmit(event) {
		event.preventDefault();
		const response = await fetch('/chat/api/request', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ messages: [{ content: $input }] })
		});
		const data = await response.json();
		console.log(data);
		embed = data.parsedData || data.error;
	}
</script>

<div class="grid md:grid-cols-[300px_1fr] min-h-screen w-full">
	<div class="bg-neutral-950 hidden md:flex flex-col gap-2 text-white">
		<div class="sticky top-0 p-2">
			<button
				class="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 py-2 w-full text-left px-2 justify-start p hover:bg-neutral-900 hover:text-neutral-50 gap-2"
			>
				<div class="rounded-full bg-white text-black flex items-center justify-center w-7 h-7">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="h-4 w-4"
					>
						<path d="M12 8V4H8" />
						<rect width="16" height="12" x="4" y="8" rx="2" />
						<path d="M2 14h2" />
						<path d="M20 14h2" />
						<path d="M15 13v2" />
						<path d="M9 13v2" />
					</svg>
				</div>
				<div class="grow text-ellipsis overflow-hidden whitespace-nowrap text-sm">Dataharvest Helper</div>
			</button>
		</div>
		<div class="overflow-auto flex-1">
			<div class="grid gap-1 p-2">
				<div class="text-stone-500 text-xs font-medium px-2">Today</div>
			</div>
			<a
				href="./embeddings"
				class="truncate overflow-hidden flex-1 text-sm transition-colors rounded-md whitespace-nowrap p-2 block bg-neutral-900 hover:bg-neutral-600 hover:text-neutral-50"
			>
				1. Text embedding the user input
			</a>

			<a
				href="./request"
				class="truncate overflow-hidden flex-1 text-sm transition-colors rounded-md whitespace-nowrap p-2 block bg-neutral-400 hover:bg-neutral-900 hover:text-neutral-50"
			>
				2. Requesting thinks similar to what you asked
			</a>
			<a
				href="./"
				class="truncate overflow-hidden flex-1 text-sm transition-colors rounded-md whitespace-nowrap p-2 block bg-neutral-900 hover:bg-neutral-900 hover:text-neutral-50"
			>
				3. Chat
			</a>
		</div>
	</div>
	<div class="flex flex-col">
		<div class="sticky top-0 p-2">
			<button
				class="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground py-2 gap-1 rounded-xl px-3 h-10 data-[state=open]:bg-neutral-100 text-lg"
			/>
		</div>
		<div class="max-w-2xl flex-1 mx-auto flex flex-col items-start gap-8 px-4 w-full">
			<div class="flex items-start gap-4">
				<div class="grid gap-1">
					{#if embed}
						<div class="font-bold">Database</div>
						<div class="prose prose-stone">
							<p>{embed}</p>
						</div>
					{/if}
				</div>
			</div>
		</div>
		<div
			class="max-w-2xl w-full sticky bottom-0 mx-auto py-2 flex flex-col gap-1.5 px-4 bg-white dark:bg-gray-950"
		>
			<div class="relative">
				<form on:submit={debugHandleSubmit}>
					<textarea
						bind:value={$input}
						class="flex w-full bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[48px] rounded-2xl resize-none p-4 border border-neutral-400 shadow-sm pr-16 dark:border-gray-800"
						placeholder="Message AI Assistant..."
						name="message"
						id="message"
						rows="1"
					/>
					<button
						class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 absolute top-3 right-3 w-8 h-8"
						type="submit"
						disabled=""
						id="send-button"
					/>
				</form>
			</div>
		</div>
	</div>
</div>

<style>
	#send-button {
		background-color: #a7a7a7;
		color: #1f2937;
	}

	/* make the button have an arrow up centred and white bold text */
	#send-button::before {
		content: '↑';
		color: white;
		font-weight: bold;
	}
</style>
