!function(){function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},t={},r=n.parcelRequired7c6;null==r&&((r=function(e){if(e in o)return o[e].exports;if(e in t){var n=t[e];delete t[e];var r={id:e,exports:{}};return o[e]=r,n.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,n){t[e]=n},n.parcelRequired7c6=r);var i=r("ejkSG");function a(e,n){if(e=Number(e),n=Number(n),isNaN(e)||isNaN(n))throw new Error("Invalid position or delay");return new Promise((function(o,t){var r=Math.random()>.3;setTimeout((function(){r?o({position:e,delay:n}):t({position:e,delay:n})}),n)}))}document.querySelector(".form").addEventListener("submit",(function(n){n.preventDefault();var o=n.target.elements;try{var t=Number(o.namedItem("delay").value),r=Number(o.namedItem("step").value),u=Number(o.namedItem("amount").value);if(isNaN(t)||isNaN(r)||isNaN(u))throw new Error("Invalid input values");for(var l=[],f=1;f<=u;f++){var s=t+r*(f-1);l.push(a(f,s))}Promise.all(l).then((function(n){n.forEach((function(n){var o=n.position,t=n.delay;e(i).Notify.success("✅ Fulfilled promise ".concat(o," in ").concat(t,"ms"))}))}),(function(n){n.forEach((function(n){var o=n.position,t=n.delay;e(i).Notify.failure("❌ Rejected promise ".concat(o," in ").concat(t,"ms"))}))}))}catch(n){e(i).Notify.failure(n.message)}}))}();
//# sourceMappingURL=03-promises.70afa17f.js.map
