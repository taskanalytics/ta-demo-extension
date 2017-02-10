function inject_ta(taId) {
  var body = document.getElementsByTagName('body')[0];
  var script = document.createElement('script');
  /*
  <script> (function(a,b,c,d,e,f,g,h,i){i=/(^|;)\s*_tmc=([^;]+)/.exec(a[c]),i=i?i[2]:"",("done"!==i|| /[?&]_tmcf?(=|&|$)/.test(e))&&(g=a.getElementsByTagName(b)[0],h=a.createElement(b),h[d]("src",f+ "?r="+i+"&"+1*new Date),h[d]("type","text/javascript"),h.async=!0,g.parentNode.insertBefore(h,g)) })(document,"script","cookie","setAttribute",location.search,"//in.taskanalytics.com/00069/tm.js"); </script>
  */
  script.type = 'text/javascript';
  script.text = 'alert("hey man! taId: ' + taId + '");';
  body.appendChild(script);

}


chrome.runtime.sendMessage({command: "getTAID"}, function(response) {
  if(response != undefined && response.taId != undefined) {
    console.log("using taId: " + response.taId);
    inject_ta(response.taId);
  }
});
