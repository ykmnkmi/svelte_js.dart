const bool isJS = bool.hasEnvironment('dart.library.js');

const bool isWASM = !isJS;
