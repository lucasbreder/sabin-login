function mask(input, maskName) {
    setTimeout(function() {
      var maskValue;

      switch (maskName) {
        case 'phone':
          maskValue = mphone(input.value)
          break;
          case 'cep':
          maskValue = mcep(input.value)
            break;
        default:
          break;
      }
      if (maskValue != input.value) {
        input.value = maskValue;
      }
    }, 1);
  }
  
  function mphone(v) {
    var r = v.replace(/\D/g, "");
    r = r.replace(/^0/, "");
    if (r.length > 10) {
      r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (r.length > 5) {
      r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (r.length > 2) {
      r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } else {
      r = r.replace(/^(\d*)/, "($1");
    }
    return r;
  }
  function mcep(v) {
    var r = v.replace(/\D/g,'')
    r = r.replace(/(\d{5})(\d)/,'$1-$2')
    return r
  }