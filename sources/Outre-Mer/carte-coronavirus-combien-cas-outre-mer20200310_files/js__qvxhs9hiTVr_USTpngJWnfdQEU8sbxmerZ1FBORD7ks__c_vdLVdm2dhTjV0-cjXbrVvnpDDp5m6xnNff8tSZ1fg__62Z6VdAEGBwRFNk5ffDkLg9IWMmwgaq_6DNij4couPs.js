/* Source and licensing information for the line(s) below can be found at https://la1ere.francetvinfo.fr/misc/jquery-extend-3.4.0.js. */
(function(e){var n=e.fn.jquery.split('.'),t=parseInt(n[0]),i=parseInt(n[1]),r=parseInt(n[2]),f=(r.toString()!==n[2]);if((t>3)||(t===3&&i>4)||(t===3&&i===4&&r>0)||(t===3&&i===4&&r===0&&!f)){return};e.extend=e.fn.extend=function(){var o,r,f,t,s,a,n=arguments[0]||{},i=1,l=arguments.length,u=!1;if(typeof n==='boolean'){u=n;n=arguments[i]||{};i++};if(typeof n!=='object'&&!e.isFunction(n)){n={}};if(i===l){n=this;i--};for(;i<l;i++){if((o=arguments[i])!=null){for(r in o){t=o[r];if(r==='__proto__'||n===t){continue};if(u&&t&&(e.isPlainObject(t)||(s=e.isArray(t)))){f=n[r];if(s&&!e.isArray(f)){a=[]}
else if(!s&&!e.isPlainObject(f)){a={}}
else{a=f};s=!1;n[r]=e.extend(u,a,t)}
else if(t!==undefined){n[r]=t}}}};return n}})(jQuery);;
/* Source and licensing information for the above line(s) can be found at https://la1ere.francetvinfo.fr/misc/jquery-extend-3.4.0.js. */
;/*})'"*/
