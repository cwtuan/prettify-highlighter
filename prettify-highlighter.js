(function($) {
  $.fn.replaceTagName = function(replaceWith) {
    var tags = [],
    i    = this.length;
    while (i--) {
      var newElement = document.createElement(replaceWith),
      thisi      = this[i],
      thisia     = thisi.attributes;
      for (var a = thisia.length - 1; a >= 0; a--) {
        var attrib = thisia[a];
        newElement.setAttribute(attrib.name, attrib.value);
      };
      newElement.innerHTML = thisi.innerHTML;
      $(thisi).after(newElement).remove();
      tags[i - 1] = newElement;
    }
    return $(tags);
  };
})(window.jQuery);




$(function() {
  var highlights = $('code').attr('lines');
  $('code').addClass('prettyprint linenums'); 
  $('code').replaceTagName('pre');     

  prettyPrint();
  $('pre li:eq(0)').remove();

  
  if(highlights) {
    highlights = highlights.replace(/\s/g, "").split(','); 


    for (var i = highlights.length - 1; i >= 0; i--) {
      if(highlights[i].indexOf('-')) { // a range like 3-5
        var range = highlights[i].split('-');

        $('pre li:nth-child(n+' + range[0] + '):nth-child(-n+' + range[1] + ')' ).attr('style', 'background-color:#555;'); 
        
      } else { // just a number
        $('pre li:nth-child(' + highlights[i] + ')').attr('style', 'background-color:#555;');    ///////////////// color   
      }
      
    }
  }

});