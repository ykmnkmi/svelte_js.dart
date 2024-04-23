<script type="application/dart">
	var message = $property<void Function(({String text}))>();

	void sayHello() {
		message((text: 'Hello!'));
	}
</script>

<button onclick={sayHello}>Click to say hello</button>