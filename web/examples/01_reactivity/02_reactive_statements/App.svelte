<script type="application/dart">
  import 'package:svelte_js/svelte_js.dart';
  import 'package:web/web.dart';

  var count = state(0);

  effect(() {
    if (count() >= 10) {
      window.alert('count is dangerously high!');
      count.set(9);
    }
  });

  void handleClick() {
    count.set(count() + 1);
  }
</script>

<button onclick={handleClick}>
  Clicked {count()}
  {count() == 1 ? 'time' : 'times'}
</button>