<script type="application/dart">
	var point = <int>[0, 0];
</script>

<div on:mousemove={(MouseEvent event) {
	point[0] = event.clientX;
	point[1] = event.clientY;
}}>
	The mouse position is {point[0]} x {point[1]}
</div>

<style>
	div {
		width: 100%;
		height: 100%;
	}
</style>