import 'package:web/web.dart';

void Function(T event) once<T extends Event>(void Function(T event) handler) {
  var ran = false;

  return (T event) {
    if (ran) {
      return;
    }

    ran = true;
    handler(event);
  };
}
