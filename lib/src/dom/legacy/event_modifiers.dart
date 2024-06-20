import 'package:web/web.dart';

void Function(T event) once<T extends Event>(void Function(T event) handler) {
  var ran = false;

  return (event) {
    if (ran) {
      return;
    }

    ran = true;
    handler(event);
  };
}
