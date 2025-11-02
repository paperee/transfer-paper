function setInnerHTML(elm, html) {
  elm.innerHTML = html;
  
  Array.from(elm.querySelectorAll("script"))
    .forEach( oldScriptEl => {
      const newScriptEl = document.createElement("script");
      
      Array.from(oldScriptEl.attributes).forEach( attr => {
        newScriptEl.setAttribute(attr.name, attr.value) 
      });
      
      const scriptText = document.createTextNode(oldScriptEl.innerHTML);
      newScriptEl.appendChild(scriptText);
      
      oldScriptEl.parentNode.replaceChild(newScriptEl, oldScriptEl);
  });
}


const mkEssay = {
    async init() {
        this.createEssay()
    },
    async createEssay() {
        setInnerHTML(find("#essay .body")[0], markdown(true).render(data["text"]))
    }
}