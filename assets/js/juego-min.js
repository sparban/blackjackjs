const miModulo=(()=>{"use strict";let e=[];const t=["C","D","H","S"],o=["J","Q","K","A"];let n=[0,0];const l=document.querySelector("#btnPedir"),r=document.querySelector("#btnDetener"),s=document.querySelector("#btnNuevo"),c=document.querySelectorAll(".divCartas"),a=document.querySelectorAll("small"),d=(t=1)=>{e=i(),console.log(e),n=[];for(let e=0;e<t;e++)n.push(0);console.log(e),a.forEach(e=>e.innerText=0),c.forEach(e=>e.innerHTML=""),n=[0,0],r.disabled=!1,l.disabled=!1},i=()=>{e=[];for(let o=2;o<=10;o++)for(let n of t)e.push(o+n);for(let n of o)for(let o of t)e.push(n+o);return _.shuffle(e)};console.log(e);const u=()=>{if(0===e.length)throw"Ya no hay cartas en el maso";return e.pop()},b=(e,t)=>(n[t]=n[t]+(e=>{const t=e.substring(0,e.length-1);return isNaN(t)?"A"===t?11:10:1*t})(e),a[t].innerText=n[t],n[t]),f=(e,t)=>{const o=document.createElement("img");o.src=`assets/cartas/${e}.png`,o.classList.add("carta"),c[t].append(o)},g=e=>{let t=0;do{const o=u();if(t=b(o,n.length-1),a[1].innerText=t,f(o,n.length-1),e>21)break}while(t<e&&e<21);(()=>{const[e,t]=n;e>21?alert("You lose"):t>21?alert("You win"):e===t?alert("anybody win"):e>t?alert("you win"):alert("You lose")})()};return l.addEventListener("click",()=>{const e=u(),t=b(e,0);a[0].innerText=t,f(e,0);t>21?(l.disabled=!0,btnDetener.disabled=!0,console.log("Perdiste"),alert("You lose")):21===t?(l.disabled=!0,btnDetener.disabled=!0,console.log("Great, you could win"),g(t)):console.log("continue with more cards")}),r.addEventListener("click",()=>{g(n[0]),l.disabled=!0,btnDetener.disabled=!0,n=[0,0]}),s.addEventListener("click",()=>{console.clear(),d()}),{nuevoJuego:d}})();