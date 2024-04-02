const bool isJS = bool.hasEnvironment('dart.library.html');

const bool isWASM = !isJS;
