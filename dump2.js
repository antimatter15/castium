function getPos(el){
  var x = 0, y = 0;
  do {
    x += el.offsetLeft;
    y += el.offsetTop;
  }while(el = el.offsetParent);
  return [x,y]
}

var el = document.body.getElementsByTagName('*');
for(var i = el.length; i--;){
  var pos = getPos(el[i]);
  var style = getComputedStyle(el[i], null);
  //el[i].setAttribute('style', style.cssText);
  //if(!style || style.display == 'none') el[i].parentNode.removeChild(el[i]);
  el[i].style.position = 'absolute';
  el[i].style.width = el[i].offsetWidth+'px';
  el[i].style.height = el[i].offsetHeight+'px';
  el[i].style.left = pos[0]+'px';
  el[i].style.top = pos[1]+'px';
  
}

for(var i = 0, l = el.length; i < l;i++){
  document.body.appendChild(el[i]);
}
