function foo() {
  var bar = 'pedro';

  quux = "in foo";

  function zip() {
    var quux = '';

    bar = true;
  }

  return zip;
};
