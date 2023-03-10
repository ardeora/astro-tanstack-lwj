<!-- @component
A counter written with Svelte
-->
<script lang="ts">
	import { client, counter as count } from './store';
	import { createQuery } from '@tanstack/svelte-query'
	import { fade } from 'svelte/transition';
  import { getColorPalette, getTypesAndWeaknesses } from '../../api/pokemon';
  import { createLeadingZero } from '../../utils/fns';

	$: query = createQuery({
    queryKey: ["types", $count],
    queryFn: () => getTypesAndWeaknesses($count),
    placeholderData: (prev) => prev,
  });

	$: colorsQuery = createQuery({
    queryKey: ["color", $count],
    queryFn: () => getColorPalette($count),
    placeholderData: (prev) => prev,
  });

	$: color = $colorsQuery.data ? `hsl(${$colorsQuery.data[0]}, 40%, 30%)` : 'transparent';

	async function add() {
		count.set(count.get() + 1)		
	}

	async function subtract() {
		count.set(count.get() - 1)
	}

</script>

<div class="bg-white/70 gap-2 flex flex-col p-3 flex-1 backdrop-blur-md rounded-xl h-72">
	<div class="flex">
		<p class="font-semibold flex-1 text-lg text-black/70">Details</p>
		<div>
			<svg width="28" height="28" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 98.1 118" style="enable-background:new 0 0 98.1 118;" xml:space="preserve">
				<style type="text/css">
					.st0{fill:#FF3E00;}
					.st1{fill:#FFFFFF;}
				</style>
				<path class="st0" d="M91.8,15.6C80.9-0.1,59.2-4.7,43.6,5.2L16.1,22.8C8.6,27.5,3.4,35.2,1.9,43.9c-1.3,7.3-0.2,14.8,3.3,21.3  c-2.4,3.6-4,7.6-4.7,11.8c-1.6,8.9,0.5,18.1,5.7,25.4c11,15.7,32.6,20.3,48.2,10.4l27.5-17.5c7.5-4.7,12.7-12.4,14.2-21.1  c1.3-7.3,0.2-14.8-3.3-21.3c2.4-3.6,4-7.6,4.7-11.8C99.2,32.1,97.1,22.9,91.8,15.6"/>
				<path class="st1" d="M40.9,103.9c-8.9,2.3-18.2-1.2-23.4-8.7c-3.2-4.4-4.4-9.9-3.5-15.3c0.2-0.9,0.4-1.7,0.6-2.6l0.5-1.6l1.4,1  c3.3,2.4,6.9,4.2,10.8,5.4l1,0.3l-0.1,1c-0.1,1.4,0.3,2.9,1.1,4.1c1.6,2.3,4.4,3.4,7.1,2.7c0.6-0.2,1.2-0.4,1.7-0.7L65.5,72  c1.4-0.9,2.3-2.2,2.6-3.8c0.3-1.6-0.1-3.3-1-4.6c-1.6-2.3-4.4-3.3-7.1-2.6c-0.6,0.2-1.2,0.4-1.7,0.7l-10.5,6.7  c-1.7,1.1-3.6,1.9-5.6,2.4c-8.9,2.3-18.2-1.2-23.4-8.7c-3.1-4.4-4.4-9.9-3.4-15.3c0.9-5.2,4.1-9.9,8.6-12.7l27.5-17.5  c1.7-1.1,3.6-1.9,5.6-2.5c8.9-2.3,18.2,1.2,23.4,8.7c3.2,4.4,4.4,9.9,3.5,15.3c-0.2,0.9-0.4,1.7-0.7,2.6l-0.5,1.6l-1.4-1  c-3.3-2.4-6.9-4.2-10.8-5.4l-1-0.3l0.1-1c0.1-1.4-0.3-2.9-1.1-4.1c-1.6-2.3-4.4-3.3-7.1-2.6c-0.6,0.2-1.2,0.4-1.7,0.7L32.4,46.1  c-1.4,0.9-2.3,2.2-2.6,3.8s0.1,3.3,1,4.6c1.6,2.3,4.4,3.3,7.1,2.6c0.6-0.2,1.2-0.4,1.7-0.7l10.5-6.7c1.7-1.1,3.6-1.9,5.6-2.5  c8.9-2.3,18.2,1.2,23.4,8.7c3.2,4.4,4.4,9.9,3.5,15.3c-0.9,5.2-4.1,9.9-8.6,12.7l-27.5,17.5C44.8,102.5,42.9,103.3,40.9,103.9"/>
				</svg>
		</div>
	</div>

	<div class="flex-1 relative">
		<p class="text-sm font-semibold text-black/80" style="margin-bottom: {$query.data ? "0px" : "2.625rem"};">Type</p>
		<div class="flex flex-wrap mt-2 gap-2">
		{ #if $query.data }
			
				{#each $query.data.types as type}
					<span class="px-4 py-1 border rounded-md font-medium" style="color: {color}; border-color: {color};">
						{type}
					</span>
				{/each }
			
		{/if}
		</div>

		<p class="text-sm font-semibold text-black/80 mt-3">Weaknesses</p>
		{ #if $query.data }
			<div class="flex flex-wrap mt-2 gap-2">
				{#each $query.data.weaknesses as weakness}
					<span class="px-4 py-1 border rounded-md font-medium" style="color: {color}; border-color: {color};">
						{weakness}
					</span>
				{/each }
			</div>
		{/if}
	</div>

	<div class="flex items-center">
		<button
			on:click={subtract}
			class="text-black/80 hover:bg-black/5 w-8 h-8 flex justify-center items-center rounded-md"
		>
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
			
		</button>
		<div class="flex-1 text-center text-sm text-black/80 font-medium">
			#{createLeadingZero($count)}
		</div>
		<button
			on:click={add}
			class="text-black/80 hover:bg-black/5 w-8 h-8 flex justify-center items-center rounded-md"
		>
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
			
		</button>
	</div>
</div>

