<script type="application/dart">
	import 'package:web/web.dart';
	
	import 'array_from.dart';

	FileList? files;

	$: if (files != null) {
		print(files);

		for (var file in arrayFrom<File>(files).toDart) {
			print('${file.name}: ${file.size} bytes');
		}
	}
</script>

<label for="avatar">Upload a picture:</label>
<input accept="image/png, image/jpeg" bind:files id="avatar" name="avatar" type="file" />

<label for="many">Upload multiple files of any type:</label>
<input bind:files id="many" multiple type="file" />

{#if files != null}
	<h2>Selected files:</h2>
	{#each arrayFrom<File>(files) as file}
		<p>{file.name} ({file.size} bytes)</p>
	{/each}
{/if}