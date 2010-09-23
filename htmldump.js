function getDefaults(){
  var frame = document.createElement('iframe') //create an iframe to get defaults unaffected by css
  document.body.appendChild(frame);
  var win = frame.contentWindow;
  var el = win.document.createElement('klsdfjalksdfj');
  win.document.body.appendChild(el);
  var style = win.getComputedStyle(el, null);
  
  var s = {};
  for(var i = style.length; i--;)
    s[style[i]] = style[style[i]];
  
  document.body.removeChild(frame);

  return s;
}

var defaults = {};

function getHTML(win, el){
  var style = win.getComputedStyle(el, null);
  if(style.display == 'none') return ''; //dont show hidden elements
  var cssText = '';



  for(var i = style.length; i--;)
    if(style[i].charAt(0) != '-'){
      if(defaults[style[i]] != style[style[i]]) 
        cssText += style[i] + ':' + style[style[i]] + ';';
    }

  var attrtext = ['style="'+cssText+'"'];
  for(var i = el.attributes.length; i--;){
    var name = el.attributes[i].name.toLowerCase();
    if(name != 'style' && name != 'className' && name != 'id' && name != 'name' && name != 'class'){
      attrtext.push([el.attributes[i].name+'="'+el.attributes[i].value+'"']);
    }
  }

  
  var header = '<'+el.tagName.toLowerCase() + ' ' + attrtext.join(' ')+'>';
  var footer = '<'+'/'+el.tagName.toLowerCase() + '>';
  var html = '';
  for(var i = 0, l = el.childNodes.length; i < l; i++){
    var node = el.childNodes[i];
    if(node.nodeType == 1){ //ELEMENT NODE
      html += getHTML(win, node); //nice little recursion there
    }else if(node.nodeType == 3){ //TEXTNODE
      html += node.nodeValue
    }
  }
  return header + html + footer;
}
