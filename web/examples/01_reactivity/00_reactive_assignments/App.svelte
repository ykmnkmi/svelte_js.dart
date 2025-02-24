<script type="application/dart">
  import 'package:svelte_js/svelte_js.dart';

  var count = state(0);

  void handleClick() {
    count.set(count() + 1);
  }
</script>

<button onclick={handleClick}>
  Clicked {count()}
  {count() == 1 ? 'time' : 'times'}
</button>