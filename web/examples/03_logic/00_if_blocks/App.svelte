<script type="application/dart">
  import 'package:svelte_js/svelte_js.dart';

  import 'user.dart';

  var user = state(User(loggedIn: false));

  void toggle() {
    user.update((user) => User(loggedIn: !user.loggedIn));
  }
</script>

{#if loggedIn}
  <button onclick={toggle}>Log out</button>
{/if}

{#if !loggedIn}
  <button onclick={toggle}>Log in</button>
{/if}