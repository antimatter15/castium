/*
function getDefaults(){
  var frame = document.createElement('iframe') //create an iframe to get defaults unaffected by css
  document.body.appendChild(frame);
  var win = frame.contentWindow;
  var el = win.document.createElement('div');
  var el2 = win.document.createElement('div');
  win.document.body.appendChild(el);
  el.appendChild(el2);
  var style = win.getComputedStyle(el, null);
  var style2 = win.getComputedStyle(el, null);
  
  var s = {};
  for(var i = style.length; i--;){
    if(style[style[i]] == style2[style[i]]){
      s[style[i]] = style[style[i]];
    }
  }
  document.body.removeChild(frame);

  return s;
}
var defaults = {}//getDefaults();

*/

function getHTML(win, el){
  var tagName = el.tagName.toLowerCase();
  if(tagName == 'br') return '<br>';
  var style = win.getComputedStyle(el, null);
  var parentStyle = win.getComputedStyle(el.parentNode, null);
  if(style.display == 'none') return ''; //dont show hidden elements
  var cssText = '';

  //var inheritable = 'azimuth,border-collapse,border-spacing,caption-side,color,cursor,direction,elevation,empty-cells,font-family,font-size,font-style,font-variant,font,letter-spacing,line-height,list-style-image,list-style-position,list-style-type,list-style,orphans,pitch-range,pitch,quotes,richness,speak-header,speak-numeral,speak-punctuation,speak,speech-rate,stress,text-align,text-indent,text-transform,visibility,voice-family,volume,white-space,widows,word-spacing'.split(',');
  

  for(var i = style.length; i--;){
    var prop = style[i];
    if(prop.charAt(0) != '-'){
    
    //if(defaults[prop] != style[prop] && !(parentStyle[prop] == style[prop] && inheritable.indexOf(prop) != -1)) 
        cssText += prop + ':' + style[prop] + ';';
    }
  }

  
  var attrtext = ['style="'+cssText+'"'];

  if(el.value){
    attrtext.push('value="'+el.value+'"');
  }
  
  for(var i = el.attributes.length; i--;){
    var name = el.attributes[i].name.toLowerCase();
    if(name != 'style' && name != 'className' && name != 'id' && name != 'name' && name != 'class' && name != 'value'){
      attrtext.push(el.attributes[i].name+'="'+el.attributes[i].value+'"');
    }
  }
  

  
  var header = '<'+tagName + ' ' + attrtext.join(' ')+'>';
  var footer = '<'+'/'+tagName + '>';
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

document.documentElement.innerHTML = getHTML(window, document.body);

42
