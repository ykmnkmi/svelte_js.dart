<script type="application/dart">
	import 'package:markdown/markdown.dart';

	var text = 'Some words are *italic*, som are **bold**';
</script>

<textarea bind:value={text} />

{@html markdownToHtml(value)}

<style>
	textarea {
		width: 100%;
		height: 200px;
	}
</style>
