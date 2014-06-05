
(function($) {
  $.fn.replaceTagName = function(replaceWith) {
    var tags = [],
    i    = this.length;
    while (i--) {
      var newElement = document.createElement(replaceWith),
      thisi      = this[i],
      thisia     = thisi.attributes;
      for (var a = thisia.length - 1; a >= 0; --a) {
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



/**
 * Extract 'GET' parameters from a JS include querystring
 * Ex: /workspace/prettify-highlighter/prettify-highlighter.js?highlight-color=#855'
 */
 var getScriptParams = function (scriptFileName) {
   // Get all script tag
   var scripts = document.getElementsByTagName('script');
   var result = {};
   for(var i = 0; i < scripts.length; ++i) {
     // Check if the file name is the same as scriptFileName
     if(scripts[i].src.indexOf(scriptFileName) !== -1) {    
      // Get the parameters string     
      var urls = scripts[i].src.split('?');
      if(urls.length == 2) {
        var parameters = urls[1].split('&');        
        for(var j=0; j< parameters.length; ++j) {
          var pair = parameters[j].split('=');
          result[pair[0]] = pair[1];
        }
      }
      break;
    }
  }
  return result;
};
var color = getScriptParams('prettify-highlighter.js')['highlight-color'];
if(color[0]!='#') {
  color = '#' + color;
}


var highlights = $('code').attr('lines');
$('code').addClass('prettyprint linenums'); 
$('code').replaceTagName('pre');     

prettyPrint();
$('pre li:eq(0)').remove();

if(highlights) {
  highlights = highlights.replace(/\s/g, '').split(','); 

  for (var i = highlights.length - 1; i >= 0; --i) {
      if(highlights[i].indexOf('-') != -1) { // a range like 3-5
        var range = highlights[i].split('-');
        $('pre li:nth-child(n+' + range[0] + '):nth-child(-n+' + range[1] + ')' ).attr('style', 'background-color:' + color + ';');       
      } else { // just a number
        $('pre li:nth-child(' + highlights[i] + ')').attr('style', 'background-color:' + color + ';');    ///////////////// color   
      }      
    }
  }

});