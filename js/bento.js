if (location.host === 'www.myabakus.com' && (typeof bento$ !== 'undefined')) {
  const b = bento$; // no se debe remover esto no se que pasa con la minificacion.
  b(function() {
    bento.view();
  });
}
