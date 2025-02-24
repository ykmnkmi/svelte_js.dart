<script type="application/dart">
  import 'dart:math';

  import 'package:svelte_js/svelte_js.dart';

  Future<int> getRandomNumber() async {
    var random = Random();

    if (random.nextBool()) {
      return random.nextInt(0xFF)
    } else {
      throw Exception('No luck!');
    }
  }

  var future = state(getRandomNumber());

  void handleClick() {
    future.set(getRandomNumber());
  }
</script>

<button onclick={handleClick}>generate random number</button>

{#await future}
  <p>...waiting</p>
{:then number}
  <p>The number is {number}</p>
{:catch error}
  <p style="color: red">{(error as Exception).message}</p>
{/await}