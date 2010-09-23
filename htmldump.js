function getDefaults(){
}

function getHTML(win, el){
  var styles = win.getComputedStyle(el, null);
  if(styles.display == 'none') return ''; //dont show hidden elements
  var cssText = '';

  
  var attrtext = ['style="'+cssText+'"'];
  for(var i = el.attributes.length; i--;){
    var name = el.attributes[i].name.toLowerCase();
    if(name != 'style' && name != 'className' && name != 'id' && name != 'name'){
      attrtext.push([el.attributes[i].name+'='+el.attributes[i].value]);
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
