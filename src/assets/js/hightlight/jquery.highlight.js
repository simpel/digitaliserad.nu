/*

highlight v5

Highlights arbitrary terms.

<http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html>

MIT license.

Johann Burkard
<http://johannburkard.de>
<mailto:jb@eaio.com>

*/

jQuery.fn.highlight = function(word, meaning) {
 function innerHighlight(node, word) {
  var skip = 0;
  if (node.nodeType == 3) {
   var pos = node.data.toUpperCase().indexOf(word);
   pos -= (node.data.substr(0, pos).toUpperCase().length - node.data.substr(0, pos).length);
   if (pos >= 0) {
    

    var spannode = document.createElement('span');
  
    spannode.setAttribute("title", meaning);
    spannode.setAttribute("aria-haspopup", "true");
    spannode.setAttribute("class", "has-tip top");
    spannode.setAttribute("data-disable-hover", "false");
    spannode.setAttribute("data-tooltip", "");

    
    
    
    var middlebit = node.splitText(pos);
    var endbit = middlebit.splitText(word.length);
    var middleclone = middlebit.cloneNode(true);

    spannode.appendChild(middleclone);
    middlebit.parentNode.replaceChild(spannode, middlebit);
   


    skip = 1;
   }
  }
  else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
   for (var i = 0; i < node.childNodes.length; ++i) {
    i += innerHighlight(node.childNodes[i], word);
   }
  }
  return skip;
 }
 return this.length && word && word.length ? this.each(function() {
  innerHighlight(this, word.toUpperCase());
 }) : this;
};

jQuery.fn.removeHighlight = function() {
 return this.find("span.highlight").each(function() {
  this.parentNode.firstChild.nodeName;
  with (this.parentNode) {
   replaceChild(this.firstChild, this);
   normalize();
  }
 }).end();
};
