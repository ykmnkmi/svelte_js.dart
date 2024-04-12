<script type="application/dart">
	Future<String> getRandomNumber() async {
		var responsePromise = window.fetch('/tutorial/random-number'.toJS);
		var response = await responsePromise.toDart;
		var textPromise = response.text();
		var text = await textPromise.toDart;

		if (response.ok) {
			return text.toDart;
		}

		throw Exception(text);
	}

	var future = $state(getRandomNumber());

	void handleClick() {
		future = getRandomNumber();
	}
</script>

<button onclick={handleClick}>generate random number</button>

{#await future}
	<p>...waiting</p>
{:then number}
	<p>The number is {number}</p>
{:catch error}
	<p style="color: red">{error}</p>
{/await}