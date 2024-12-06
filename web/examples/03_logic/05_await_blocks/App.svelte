<script type="application/dart">
	Future<int> getRandomNumber() async {
		var uri = Uri.parse('https://httpbin.org/bytes/1/throw');
		var response = await get(uri);

		if (response.statusCode == 200) {
			return response.bodyBytes[0];
		}

		throw Exception(response.reasonPhrase);
	}

	var future = getRandomNumber();

	void handleClick() {
		future = getRandomNumber();
	}
</script>

<button on:click={handleClick}>generate random number</button>

{#await future}
	<p>...waiting</p>
{:then number}
	<p>The number is {number}</p>
{:catch error}
	<p style="color: red">{(error as Exception).message}</p>
{/await}