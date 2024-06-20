<script type="application/dart">
	var scoops = 1;
	var flavours = ['Mint choc chip'];

	var menu = ['Cookies and cream', 'Mint choc chip', 'Raspberry ripple'];

	String join(List<String> flavours) {
		if (flavours.length == 1) {
			return flavours[0];
		}
		
		var length = flavours.length - 1;
		return '${flavours.sublist(0, length).join(', ')} and ${flavours[length]}';
	}
</script>

<h2>Size</h2>

<label>
	<input type="radio" bind:group={scoops} value={1} />
	One scoop
</label>

<label>
	<input type="radio" bind:group={scoops} value={2} />
	Two scoops
</label>

<label>
	<input type="radio" bind:group={scoops} value={3} />
	Three scoops
</label>

<h2>Flavours</h2>

{#each menu as flavour}
	<label>
		<input type="checkbox" bind:group={flavours} value={flavour} />
		{flavour}
	</label>
{/each}

{#if flavours.length === 0}
	<p>Please select at least one flavour</p>
{:else if flavours.length > scoops}
	<p>Can't order more flavours than scoops!</p>
{:else}
	<p>
		You ordered {scoops}
		{scoops === 1 ? 'scoop' : 'scoops'}
		of {join(flavours)}
	</p>
{/if}