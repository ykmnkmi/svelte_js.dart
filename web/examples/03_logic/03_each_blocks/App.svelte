<script type="application/dart">
  var cats = [
    (id: 'J---aiyznGQ', name: 'Keyboard Cat'),
    (id: 'z_AbfPXTKms', name: 'Maru'),
    (id: 'OUtn3pvWmpg', name: 'Henri The Existential Cat')
  ];
</script>

<h1>The Famous Cats of YouTube</h1>

<ul>
  {#each cats as { id, name }, index}
    <li>
      <a target="_blank" rel="noreferrer" href="https://www.youtube.com/watch?v={id}">
        {index + 1}: {name}
      </a>
    </li>
  {/each}
</ul>