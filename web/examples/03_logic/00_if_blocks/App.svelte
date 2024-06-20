<script type="application/dart">
	var user = User(loggedIn: false);

	void toggle() {
		user.loggedIn = !user.loggedIn;
	}
</script>

{#if loggedIn}
	<button on:click={toggle}>Log out</button>
{/if}

{#if !loggedIn}
	<button on:click={toggle}>Log in</button>
{/if}