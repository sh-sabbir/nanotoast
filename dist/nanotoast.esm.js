var p=500,f=3e3,b="nanotoast-container",i,T="top-right";function v(t){i?i.className=`nanotoast-container ${t}`:(i=document.createElement("div"),i.id=b,i.classList.add("nanotoast-container",t),document.body.appendChild(i))}function r(t,o="info",a={}){let{description:n="",duration:s=f,position:d=T,closeable:l=!1,id:m=null}=a;v(d);let e=document.createElement("div");e.classList.add("nanotoast",o),e.innerHTML=u(t,n,o,l),m&&(e.dataset.id=m),i.prepend(e),setTimeout(()=>e.classList.add("open"),10),l||(setTimeout(()=>e.classList.remove("open"),s),setTimeout(()=>e.remove(),s+p)),l&&e.querySelector(".nanotoast-close").addEventListener("click",()=>{e.classList.remove("open"),setTimeout(()=>e.remove(),p)})}function u(t,o,a,n){return`
    <div class="nanotoast-icon">${{success:"\u2705",error:"\u274C",warning:"\u26A0\uFE0F",info:"\u2139\uFE0F",loading:"\u23F3"}[a]||"\u{1F514}"}</div>
    <div class="nanotoast-content">
      <div class="nanotoast-message">${t}</div>
      ${o?`<div class="nanotoast-description">${o}</div>`:""}
    </div>
    ${n?'<button class="nanotoast-close">\u2716</button>':""}
  `}function L(t,{loading:o,success:a,error:n}){let s=`toast-${Date.now()}`;r(o,"loading",{id:s,closeable:!1}),t.then(d=>{let l=typeof a=="function"?a(d):a;g(s,l,"success")}).catch(()=>{g(s,n,"error")})}function g(t,o,a){let n=document.querySelector(`.nanotoast[data-id="${t}"]`);n&&(n.innerHTML=u(o,"",a,!1),n.classList.remove("loading"),n.classList.add(a),setTimeout(()=>n.classList.remove("open"),f),setTimeout(()=>n.remove(),f+p))}var c=(t,o={})=>r(t,"info",o);c.success=(t,o={})=>r(t,"success",o);c.error=(t,o={})=>r(t,"error",o);c.warning=(t,o={})=>r(t,"warning",o);c.info=(t,o={})=>r(t,"info",o);c.message=(t,o={})=>r(t,"info",o);c.promise=L;var x=c;var $=x;export{$ as default};
