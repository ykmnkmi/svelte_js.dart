<script type="application/dart">
	var count = $state(1);

	var doubled = $derived(count * 2);	
	var quadrupled = $derived(doubled * 2);

	void handleClick() {
		count += 1;
	}
</script>

<button onclick={handleClick}>
	Count: {count}
</button>

<p>{count} * 2 = {doubled}</p>
<p>{doubled} * 2 = {quadrupled}</p>