<script type="application/dart">
	var name = $property<String>();

	var version = $property<int>();

	var speed = $property<String>();
  
	var website = $property<String>();
</script>

<p>
	The <code>{name}</code> package is {speed} fast. Download version {version} from
	<a href="https://www.npmjs.com/package/{name}">npm</a>
	and <a href={website}>learn more here</a>.
</p>