<!-- @component
A counter written with Svelte
-->
<script lang="ts">
	import { QueryClientProvider } from '@tanstack/svelte-query'
	import { client } from '../utils';
  import SvelteDetails from './SvelteDetails.svelte'
</script>

<QueryClientProvider client={client}>
  <SvelteDetails />
</QueryClientProvider>
	
