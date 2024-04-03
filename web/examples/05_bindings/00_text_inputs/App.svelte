<script>
	var name = '';
</script>

<input bind:value={name} placeholder="Enter your name" />
<p>Hello {name.isNotEmpty ? name : 'stranger'}!</p>
