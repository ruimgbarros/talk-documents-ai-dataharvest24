<div class="flex flex-col min-h-[100dvh]">
	<main class="flex-1">
		<section class="w-full py-12 md:py-24 lg:py-32 xl:py-48 max-w-7xl mx-auto">
			<div class="container px-4 md:px-6">
				<div class="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
					<div class="flex flex-col justify-center space-y-4">
						<div class="space-y-2">
							<h1 class="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
								So, you wanna talk with your documents with AI?
							</h1>
							<p class="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
								Discover how our cutting-edge AI technology is transforming the way journalists
								work, from streamlining research to enhancing storytelling.
							</p>
						</div>
						<div class="flex flex-col gap-2 min-[400px]:flex-row">
							<a
								href="/chat/embeddings"
								class="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
							>
								Start chatting
							</a>
						</div>
					</div>
					<img
						src="/hero.webp"
						width="550"
						height="550"
						alt="Hero"
						class="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
					/>
				</div>
			</div>
		</section>
		<section class="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
			<div class="container px-4 md:px-6">
				<div class="flex flex-col items-center justify-center space-y-4 text-center">
					<div class="space-y-2">
						<div class="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
							Dataharvest 2024
						</div>
						<h2 class="text-3xl font-bold tracking-tighter sm:text-5xl">
							Exploring every step of a chatbot
						</h2>
						<p
							class="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400"
						>
							Lets see every step of a chatbot from the database that we created.
						</p>
					</div>
				</div>
				<div class="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
					<div class="flex flex-col justify-center space-y-4">
						<ul class="grid gap-6">
							<li>
								<a
									href="#"
									class="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
								>
									<div class="text-sm font-medium leading-none group-hover:underline">
										1. Text embedding the user input
									</div>
									<div class="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
										Use GPT to pick what you wrote and convert it to a vector.
									</div>
								</a>
							</li>
							<li>
								<a
									href="#"
									class="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
								>
									<div class="text-sm font-medium leading-none group-hover:underline">
										2. Query the database and get the responses that are related to what you asked
									</div>
									<div class="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
										We will be using cosine similarity to get the most similar responses.
									</div>
								</a>
							</li>
							<li>
								<a
									href="#"
									class="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
								>
									<div class="text-sm font-medium leading-none group-hover:underline">
										3. Give it a personallity
									</div>
									<div class="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
										Use prompt engineering to give the chatbot a personallity.
									</div>
								</a>
							</li>
						</ul>
					</div>
					<img
						src="https://images.unsplash.com/photo-1496694971191-58e2450fc841?q=80&w=2865&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						width="550"
						height="310"
						alt="Image"
						style=""
						class="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
					/>
				</div>
			</div>
		</section>
	</main>
	<footer
		class="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t"
	>
		<p class="text-xs text-gray-500 dark:text-gray-400">Made with ❤️ in Mechleen</p>
		<nav class="sm:ml-auto flex gap-4 sm:gap-6" />
	</footer>
</div>
