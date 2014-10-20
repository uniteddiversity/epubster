function MediumEditor(e,t){"use strict";return this.init(e,t)}"object"==typeof module&&(module.exports=MediumEditor),function(e,t){"use strict";function i(e,t){var i;if(void 0===e)return t;for(i in t)t.hasOwnProperty(i)&&e.hasOwnProperty(i)===!1&&(e[i]=t[i]);return e}function n(e,t){for(var i=t.parentNode;null!==i;){if(i===e)return!0;i=i.parentNode}return!1}function o(){var t,i,n,o=e.getSelection();if(o.getRangeAt&&o.rangeCount){for(n=[],t=0,i=o.rangeCount;i>t;t+=1)n.push(o.getRangeAt(t));return n}return null}function r(t){var i,n,o=e.getSelection();if(t)for(o.removeAllRanges(),i=0,n=t.length;n>i;i+=1)o.addRange(t[i])}function a(){var e=t.getSelection().anchorNode,i=e&&3===e.nodeType?e.parentNode:e;return i}function s(){var i,n="",o,r,a;if(void 0!==e.getSelection){if(o=e.getSelection(),o.rangeCount){for(a=t.createElement("div"),i=0,r=o.rangeCount;r>i;i+=1)a.appendChild(o.getRangeAt(i).cloneContents());n=a.innerHTML}}else void 0!==t.selection&&"Text"===t.selection.type&&(n=t.selection.createRange().htmlText);return n}function l(e){return!(!e||1!==e.nodeType)}MediumEditor.prototype={defaults:{allowMultiParagraphSelection:!0,anchorInputPlaceholder:"Paste or type a link",anchorPreviewHideDelay:500,buttons:["bold","italic","underline","anchor","header1","header2","quote"],buttonLabels:!1,checkLinkFormat:!1,cleanPastedHTML:!1,delay:0,diffLeft:0,diffTop:-10,disableReturn:!1,disableDoubleReturn:!1,disableToolbar:!1,disableEditing:!1,elementsContainer:!1,firstHeader:"h3",forcePlainText:!0,placeholder:"Type your text",secondHeader:"h4",targetBlank:!1,anchorTarget:!1,anchorButton:!1,anchorButtonClass:"btn",extensions:{},activeButtonClass:"medium-editor-button-active",firstButtonClass:"medium-editor-button-first",lastButtonClass:"medium-editor-button-last"},isIE:"Microsoft Internet Explorer"===navigator.appName||"Netscape"===navigator.appName&&null!==new RegExp("Trident/.*rv:([0-9]{1,}[.0-9]{0,})").exec(navigator.userAgent),init:function(e,n){return this.setElementSelection(e),0!==this.elements.length?(this.parentElements=["p","h1","h2","h3","h4","h5","h6","blockquote","pre"],this.id=t.querySelectorAll(".medium-editor-toolbar").length+1,this.options=i(n,this.defaults),this.setup()):void 0},setup:function(){this.isActive=!0,this.initElements().bindSelect().bindPaste().setPlaceholders().bindWindowActions().passInstance()},initElements:function(){this.updateElementList();var e,i=!1;for(e=0;e<this.elements.length;e+=1)this.options.disableEditing||this.elements[e].getAttribute("data-disable-editing")||this.elements[e].setAttribute("contentEditable",!0),this.elements[e].getAttribute("data-placeholder")||this.elements[e].setAttribute("data-placeholder",this.options.placeholder),this.elements[e].setAttribute("data-medium-element",!0),this.bindParagraphCreation(e).bindReturn(e).bindTab(e),this.options.disableToolbar||this.elements[e].getAttribute("data-disable-toolbar")||(i=!0);return i&&(this.options.elementsContainer||(this.options.elementsContainer=t.body),this.initToolbar().bindButtons().bindAnchorForm().bindAnchorPreview()),this},setElementSelection:function(e){this.elementSelection=e,this.updateElementList()},updateElementList:function(){this.elements="string"==typeof this.elementSelection?t.querySelectorAll(this.elementSelection):this.elementSelection,1===this.elements.nodeType&&(this.elements=[this.elements])},serialize:function(){var e,t,i={};for(e=0;e<this.elements.length;e+=1)t=""!==this.elements[e].id?this.elements[e].id:"element-"+e,i[t]={value:this.elements[e].innerHTML.trim()};return i},callExtensions:function(e){if(!(arguments.length<1)){var t=Array.prototype.slice.call(arguments,1),i,n;for(n in this.options.extensions)this.options.extensions.hasOwnProperty(n)&&(i=this.options.extensions[n],void 0!==i[e]&&i[e].apply(i,t))}},passInstance:function(){var e=this,t,i;for(i in e.options.extensions)e.options.extensions.hasOwnProperty(i)&&(t=e.options.extensions[i],t.parent&&(t.base=e));return e},bindParagraphCreation:function(e){var i=this;return this.elements[e].addEventListener("keypress",function(e){var i=a(),n;32===e.which&&(n=i.tagName.toLowerCase(),"a"===n&&t.execCommand("unlink",!1,null))}),this.elements[e].addEventListener("keyup",function(e){var n=a(),o;n&&n.getAttribute("data-medium-element")&&0===n.children.length&&!i.options.disableReturn&&!n.getAttribute("data-disable-return")&&t.execCommand("formatBlock",!1,"p"),13===e.which&&(n=a(),o=n.tagName.toLowerCase(),i.options.disableReturn||this.getAttribute("data-disable-return")||"li"===o||i.isListItemChild(n)||(e.shiftKey||t.execCommand("formatBlock",!1,"p"),"a"===o&&t.execCommand("unlink",!1,null)))}),this},isListItemChild:function(e){for(var t=e.parentNode,i=t.tagName.toLowerCase();-1===this.parentElements.indexOf(i)&&"div"!==i;){if("li"===i)return!0;if(t=t.parentNode,!t||!t.tagName)return!1;i=t.tagName.toLowerCase()}return!1},bindReturn:function(e){var t=this;return this.elements[e].addEventListener("keypress",function(e){if(13===e.which)if(t.options.disableReturn||this.getAttribute("data-disable-return"))e.preventDefault();else if(t.options.disableDoubleReturn||this.getAttribute("data-disable-double-return")){var i=a();i&&"\n"===i.innerText&&e.preventDefault()}}),this},bindTab:function(e){return this.elements[e].addEventListener("keydown",function(e){if(9===e.which){var i=a().tagName.toLowerCase();"pre"===i&&(e.preventDefault(),t.execCommand("insertHtml",null,"    ")),"li"===i&&(e.preventDefault(),e.shiftKey?t.execCommand("outdent",e):t.execCommand("indent",e))}}),this},buttonTemplate:function(e){var t=this.getButtonLabels(this.options.buttonLabels),i={bold:'<button class="medium-editor-action medium-editor-action-bold" data-action="bold" data-element="b">'+t.bold+"</button>",italic:'<button class="medium-editor-action medium-editor-action-italic" data-action="italic" data-element="i">'+t.italic+"</button>",underline:'<button class="medium-editor-action medium-editor-action-underline" data-action="underline" data-element="u">'+t.underline+"</button>",strikethrough:'<button class="medium-editor-action medium-editor-action-strikethrough" data-action="strikethrough" data-element="strike"><strike>A</strike></button>',superscript:'<button class="medium-editor-action medium-editor-action-superscript" data-action="superscript" data-element="sup">'+t.superscript+"</button>",subscript:'<button class="medium-editor-action medium-editor-action-subscript" data-action="subscript" data-element="sub">'+t.subscript+"</button>",anchor:'<button class="medium-editor-action medium-editor-action-anchor" data-action="anchor" data-element="a">'+t.anchor+"</button>",image:'<button class="medium-editor-action medium-editor-action-image" data-action="image" data-element="img">'+t.image+"</button>",header1:'<button class="medium-editor-action medium-editor-action-header1" data-action="append-'+this.options.firstHeader+'" data-element="'+this.options.firstHeader+'">'+t.header1+"</button>",header2:'<button class="medium-editor-action medium-editor-action-header2" data-action="append-'+this.options.secondHeader+'" data-element="'+this.options.secondHeader+'">'+t.header2+"</button>",quote:'<button class="medium-editor-action medium-editor-action-quote" data-action="append-blockquote" data-element="blockquote">'+t.quote+"</button>",orderedlist:'<button class="medium-editor-action medium-editor-action-orderedlist" data-action="insertorderedlist" data-element="ol">'+t.orderedlist+"</button>",unorderedlist:'<button class="medium-editor-action medium-editor-action-unorderedlist" data-action="insertunorderedlist" data-element="ul">'+t.unorderedlist+"</button>",pre:'<button class="medium-editor-action medium-editor-action-pre" data-action="append-pre" data-element="pre">'+t.pre+"</button>",indent:'<button class="medium-editor-action medium-editor-action-indent" data-action="indent" data-element="ul">'+t.indent+"</button>",outdent:'<button class="medium-editor-action medium-editor-action-outdent" data-action="outdent" data-element="ul">'+t.outdent+"</button>"};return i[e]||!1},getButtonLabels:function(e){var t,i,n={bold:"<b>B</b>",italic:"<b><i>I</i></b>",underline:"<b><u>U</u></b>",superscript:"<b>x<sup>1</sup></b>",subscript:"<b>x<sub>1</sub></b>",anchor:"<b>#</b>",image:"<b>image</b>",header1:"<b>H1</b>",header2:"<b>H2</b>",quote:"<b>&ldquo;</b>",orderedlist:"<b>1.</b>",unorderedlist:"<b>&bull;</b>",pre:"<b>0101</b>",indent:"<b>&rarr;</b>",outdent:"<b>&larr;</b>"};if("fontawesome"===e?t={bold:'<i class="fa fa-bold"></i>',italic:'<i class="fa fa-italic"></i>',underline:'<i class="fa fa-underline"></i>',superscript:'<i class="fa fa-superscript"></i>',subscript:'<i class="fa fa-subscript"></i>',anchor:'<i class="fa fa-link"></i>',image:'<i class="fa fa-picture-o"></i>',quote:'<i class="fa fa-quote-right"></i>',orderedlist:'<i class="fa fa-list-ol"></i>',unorderedlist:'<i class="fa fa-list-ul"></i>',pre:'<i class="fa fa-code fa-lg"></i>',indent:'<i class="fa fa-indent"></i>',outdent:'<i class="fa fa-outdent"></i>'}:"object"==typeof e&&(t=e),"object"==typeof t)for(i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);return n},initToolbar:function(){return this.toolbar?this:(this.toolbar=this.createToolbar(),this.keepToolbarAlive=!1,this.anchorForm=this.toolbar.querySelector(".medium-editor-toolbar-form-anchor"),this.anchorInput=this.anchorForm.querySelector("input.medium-editor-toolbar-anchor-input"),this.anchorTarget=this.anchorForm.querySelector("input.medium-editor-toolbar-anchor-target"),this.anchorButton=this.anchorForm.querySelector("input.medium-editor-toolbar-anchor-button"),this.toolbarActions=this.toolbar.querySelector(".medium-editor-toolbar-actions"),this.anchorPreview=this.createAnchorPreview(),this)},createToolbar:function(){var e=t.createElement("div");return e.id="medium-editor-toolbar-"+this.id,e.className="medium-editor-toolbar",e.appendChild(this.toolbarButtons()),e.appendChild(this.toolbarFormAnchor()),this.options.elementsContainer.appendChild(e),e},toolbarButtons:function(){var e=this.options.buttons,i=t.createElement("ul"),n,o,r,a;for(i.id="medium-editor-toolbar-actions",i.className="medium-editor-toolbar-actions clearfix",o=0;o<e.length;o+=1)this.options.extensions.hasOwnProperty(e[o])?(a=this.options.extensions[e[o]],r=void 0!==a.getButton?a.getButton():null):r=this.buttonTemplate(e[o]),r&&(n=t.createElement("li"),l(r)?n.appendChild(r):n.innerHTML=r,i.appendChild(n));return i},toolbarFormAnchor:function(){var e=t.createElement("div"),i=t.createElement("input"),n=t.createElement("label"),o=t.createElement("input"),r=t.createElement("label"),a=t.createElement("input"),s=t.createElement("a"),l=t.createElement("a");return s.setAttribute("href","#"),s.className="medium-editor-toobar-anchor-close",s.innerHTML="&times;",l.setAttribute("href","#"),l.className="medium-editor-toobar-anchor-save",l.innerHTML="&#10003;",i.setAttribute("type","text"),i.className="medium-editor-toolbar-anchor-input",i.setAttribute("placeholder",this.options.anchorInputPlaceholder),o.setAttribute("type","checkbox"),o.className="medium-editor-toolbar-anchor-target",n.innerHTML="Open in New Window?",n.insertBefore(o,n.firstChild),a.setAttribute("type","checkbox"),a.className="medium-editor-toolbar-anchor-button",r.innerHTML="Button",r.insertBefore(a,r.firstChild),e.className="medium-editor-toolbar-form-anchor",e.id="medium-editor-toolbar-form-anchor",e.appendChild(i),e.appendChild(l),e.appendChild(s),this.options.anchorTarget&&e.appendChild(n),this.options.anchorButton&&e.appendChild(r),e},bindSelect:function(){var e=this,i="",n;for(this.checkSelectionWrapper=function(t){return t&&e.clickingIntoArchorForm(t)?!1:(clearTimeout(i),void(i=setTimeout(function(){e.checkSelection()},e.options.delay)))},t.documentElement.addEventListener("mouseup",this.checkSelectionWrapper),n=0;n<this.elements.length;n+=1)this.elements[n].addEventListener("keyup",this.checkSelectionWrapper),this.elements[n].addEventListener("blur",this.checkSelectionWrapper);return this},checkSelection:function(){var t,i;return this.keepToolbarAlive===!0||this.options.disableToolbar||(t=e.getSelection(),""===t.toString().trim()||this.options.allowMultiParagraphSelection===!1&&this.hasMultiParagraphs()||this.selectionInContentEditableFalse()?this.hideToolbarActions():(i=this.getSelectionElement(),!i||i.getAttribute("data-disable-toolbar")?this.hideToolbarActions():this.checkSelectionElement(t,i))),this},clickingIntoArchorForm:function(e){var t=this;return e.type&&"blur"===e.type.toLowerCase()&&e.relatedTarget&&e.relatedTarget===t.anchorInput?!0:!1},hasMultiParagraphs:function(){var e=s().replace(/<[\S]+><\/[\S]+>/gim,""),t=e.match(/<(p|h[0-6]|blockquote)>([\s\S]*?)<\/(p|h[0-6]|blockquote)>/g);return t?t.length:0},checkSelectionElement:function(e,t){var i;for(this.selection=e,this.selectionRange=this.selection.getRangeAt(0),i=0;i<this.elements.length;i+=1)if(this.elements[i]===t)return void this.setToolbarButtonStates().setToolbarPosition().showToolbarActions();this.hideToolbarActions()},findMatchingSelectionParent:function(t){var i=e.getSelection(),n,o,r,a,s=function(e){var i=e;try{for(;!t(i);)i=i.parentNode}catch(n){return!1}return i};try{n=i.getRangeAt(0),o=n.commonAncestorContainer,r=o.parentNode,a=t(o)?o:s(r)}catch(l){a=s(r)}return a},getSelectionElement:function(){return this.findMatchingSelectionParent(function(e){return e.getAttribute("data-medium-element")})},selectionInContentEditableFalse:function(){return this.findMatchingSelectionParent(function(e){return e&&"#text"!==e.nodeName&&"false"===e.getAttribute("contenteditable")})},setToolbarPosition:function(){var t=50,i=e.getSelection(),n=i.getRangeAt(0),o=n.getBoundingClientRect(),r=this.options.diffLeft-this.toolbar.offsetWidth/2,a=(o.left+o.right)/2,s=this.toolbar.offsetWidth/2;return o.top<t?(this.toolbar.classList.add("medium-toolbar-arrow-over"),this.toolbar.classList.remove("medium-toolbar-arrow-under"),this.toolbar.style.top=t+o.bottom-this.options.diffTop+e.pageYOffset-this.toolbar.offsetHeight+"px"):(this.toolbar.classList.add("medium-toolbar-arrow-under"),this.toolbar.classList.remove("medium-toolbar-arrow-over"),this.toolbar.style.top=o.top+this.options.diffTop+e.pageYOffset-this.toolbar.offsetHeight+"px"),this.toolbar.style.left=s>a?r+s+"px":e.innerWidth-a<s?e.innerWidth+r-s+"px":r+a+"px",this.hideAnchorPreview(),this},setToolbarButtonStates:function(){var e=this.toolbarActions.querySelectorAll("button"),t;for(t=0;t<e.length;t+=1)e[t].classList.remove(this.options.activeButtonClass);return this.checkActiveButtons(),this},checkActiveButtons:function(){for(var e=Array.prototype.slice.call(this.elements),t=this.getSelectedParentElement();void 0!==t.tagName&&-1===this.parentElements.indexOf(t.tagName.toLowerCase)&&(this.activateButton(t.tagName.toLowerCase()),this.callExtensions("checkState",t),-1===e.indexOf(t));)t=t.parentNode},activateButton:function(e){var t=this.toolbar.querySelector('[data-element="'+e+'"]');null!==t&&-1===t.className.indexOf(this.options.activeButtonClass)&&(t.className+=" "+this.options.activeButtonClass)},bindButtons:function(){var e=this.toolbar.querySelectorAll("button"),t,i=this,n=function(e){e.preventDefault(),e.stopPropagation(),void 0===i.selection&&i.checkSelection(),this.className.indexOf(i.options.activeButtonClass)>-1?this.classList.remove(i.options.activeButtonClass):this.className+=" "+i.options.activeButtonClass,this.hasAttribute("data-action")&&i.execAction(this.getAttribute("data-action"),e)};for(t=0;t<e.length;t+=1)e[t].addEventListener("click",n);return this.setFirstAndLastItems(e),this},setFirstAndLastItems:function(e){return e.length>0&&(e[0].className+=" "+this.options.firstButtonClass,e[e.length-1].className+=" "+this.options.lastButtonClass),this},execAction:function(i,n){i.indexOf("append-")>-1?(this.execFormatBlock(i.replace("append-","")),this.setToolbarPosition(),this.setToolbarButtonStates()):"anchor"===i?this.triggerAnchorAction(n):"image"===i?t.execCommand("insertImage",!1,e.getSelection()):(t.execCommand(i,!1,null),this.setToolbarPosition())},rangeSelectsSingleNode:function(e){var t=e.startContainer;return t===e.endContainer&&t.hasChildNodes()&&e.endOffset===e.startOffset+1},getSelectedParentElement:function(){var e=null,t=this.selectionRange;return e=this.rangeSelectsSingleNode(t)?t.startContainer.childNodes[t.startOffset]:3===t.startContainer.nodeType?t.startContainer.parentNode:t.startContainer},triggerAnchorAction:function(){var e=this.getSelectedParentElement();return e.tagName&&"a"===e.tagName.toLowerCase()?t.execCommand("unlink",!1,null):"block"===this.anchorForm.style.display?this.showToolbarActions():this.showAnchorForm(),this},execFormatBlock:function(e){var i=this.getSelectionData(this.selection.anchorNode);if("blockquote"===e&&i.el&&"blockquote"===i.el.parentNode.tagName.toLowerCase())return t.execCommand("outdent",!1,null);if(i.tagName===e&&(e="p"),this.isIE){if("blockquote"===e)return t.execCommand("indent",!1,e);e="<"+e+">"}return t.execCommand("formatBlock",!1,e)},getSelectionData:function(e){var t;for(e&&e.tagName&&(t=e.tagName.toLowerCase());e&&-1===this.parentElements.indexOf(t);)e=e.parentNode,e&&e.tagName&&(t=e.tagName.toLowerCase());return{el:e,tagName:t}},getFirstChild:function(e){for(var t=e.firstChild;null!==t&&1!==t.nodeType;)t=t.nextSibling;return t},hideToolbarActions:function(){this.keepToolbarAlive=!1,void 0!==this.toolbar&&this.toolbar.classList.remove("medium-editor-toolbar-active")},showToolbarActions:function(){var e=this,t;this.anchorForm.style.display="none",this.toolbarActions.style.display="block",this.keepToolbarAlive=!1,clearTimeout(t),t=setTimeout(function(){e.toolbar&&!e.toolbar.classList.contains("medium-editor-toolbar-active")&&e.toolbar.classList.add("medium-editor-toolbar-active")},100)},saveSelection:function(){this.savedSelection=o()},restoreSelection:function(){r(this.savedSelection)},showAnchorForm:function(e){this.toolbarActions.style.display="none",this.saveSelection(),this.anchorForm.style.display="block",this.setToolbarPosition(),this.keepToolbarAlive=!0,this.anchorInput.focus(),this.anchorInput.value=e||""},bindAnchorForm:function(){var e=this.anchorForm.querySelector("a.medium-editor-toobar-anchor-close"),i=this.anchorForm.querySelector("a.medium-editor-toobar-anchor-save"),o=this;return this.anchorForm.addEventListener("click",function(e){e.stopPropagation(),o.keepToolbarAlive=!0}),this.anchorInput.addEventListener("keyup",function(e){var t=null,i;13===e.keyCode&&(e.preventDefault(),i=o.options.anchorTarget&&o.anchorTarget.checked?"_blank":"_self",o.options.anchorButton&&o.anchorButton.checked&&(t=o.options.anchorButtonClass),o.createLink(this,i,t))}),i.addEventListener("click",function(e){var t=null,i;e.preventDefault(),i=o.options.anchorTarget&&o.anchorTarget.checked?"_blank":"_self",o.options.anchorButton&&o.anchorButton.checked&&(t=o.options.anchorButtonClass),o.createLink(o.anchorInput,i,t)},!0),this.anchorInput.addEventListener("click",function(e){e.stopPropagation(),o.keepToolbarAlive=!0}),t.body.addEventListener("click",function(e){e.target===o.anchorForm||n(o.anchorForm,e.target)||n(o.toolbarActions,e.target)||(o.keepToolbarAlive=!1,o.checkSelection())},!0),t.body.addEventListener("focus",function(e){e.target===o.anchorForm||n(o.anchorForm,e.target)||n(o.toolbarActions,e.target)||(o.keepToolbarAlive=!1,o.checkSelection())},!0),e.addEventListener("click",function(e){e.preventDefault(),o.showToolbarActions(),r(o.savedSelection)}),this},hideAnchorPreview:function(){this.anchorPreview.classList.remove("medium-editor-anchor-preview-active")},showAnchorPreview:function(t){if(this.anchorPreview.classList.contains("medium-editor-anchor-preview-active")||t.getAttribute("data-disable-preview"))return!0;var i=this,n=40,o=t.getBoundingClientRect(),r=(o.left+o.right)/2,a,s,l;return i.anchorPreview.querySelector("i").textContent=t.href,a=i.anchorPreview.offsetWidth/2,s=i.options.diffLeft-a,clearTimeout(l),l=setTimeout(function(){i.anchorPreview&&!i.anchorPreview.classList.contains("medium-editor-anchor-preview-active")&&i.anchorPreview.classList.add("medium-editor-anchor-preview-active")},100),i.observeAnchorPreview(t),i.anchorPreview.classList.add("medium-toolbar-arrow-over"),i.anchorPreview.classList.remove("medium-toolbar-arrow-under"),i.anchorPreview.style.top=Math.round(n+o.bottom-i.options.diffTop+e.pageYOffset-i.anchorPreview.offsetHeight)+"px",i.anchorPreview.style.left=a>r?s+a+"px":e.innerWidth-r<a?e.innerWidth+s-a+"px":s+r+"px",this},observeAnchorPreview:function(e){var t=this,i=(new Date).getTime(),n=!0,o=function(){i=(new Date).getTime(),n=!0},r=function(e){e.relatedTarget&&/anchor-preview/.test(e.relatedTarget.className)||(n=!1)},a=setInterval(function(){if(n)return!0;var s=(new Date).getTime()-i;s>t.options.anchorPreviewHideDelay&&(t.hideAnchorPreview(),clearInterval(a),t.anchorPreview.removeEventListener("mouseover",o),t.anchorPreview.removeEventListener("mouseout",r),e.removeEventListener("mouseover",o),e.removeEventListener("mouseout",r))},200);t.anchorPreview.addEventListener("mouseover",o),t.anchorPreview.addEventListener("mouseout",r),e.addEventListener("mouseover",o),e.addEventListener("mouseout",r)},createAnchorPreview:function(){var e=this,i=t.createElement("div");return i.id="medium-editor-anchor-preview-"+this.id,i.className="medium-editor-anchor-preview",i.innerHTML=this.anchorPreviewTemplate(),this.options.elementsContainer.appendChild(i),i.addEventListener("click",function(){e.anchorPreviewClickHandler()}),i},anchorPreviewTemplate:function(){return'<div class="medium-editor-toolbar-anchor-preview" id="medium-editor-toolbar-anchor-preview">    <i class="medium-editor-toolbar-anchor-preview-inner"></i></div>'},anchorPreviewClickHandler:function(i){if(this.activeAnchor){var n=this,o=t.createRange(),r=e.getSelection();o.selectNodeContents(n.activeAnchor),r.removeAllRanges(),r.addRange(o),setTimeout(function(){n.activeAnchor&&n.showAnchorForm(n.activeAnchor.href),n.keepToolbarAlive=!1},100+n.options.delay)}this.hideAnchorPreview()},editorAnchorObserver:function(e){var t=this,i=!0,n=function(){i=!1,t.activeAnchor.removeEventListener("mouseout",n)};if(e.target&&"a"===e.target.tagName.toLowerCase()){if(!/href=["']\S+["']/.test(e.target.outerHTML)||/href=["']#\S+["']/.test(e.target.outerHTML))return!0;if(this.toolbar.classList.contains("medium-editor-toolbar-active"))return!0;this.activeAnchor=e.target,this.activeAnchor.addEventListener("mouseout",n),setTimeout(function(){i&&t.showAnchorPreview(e.target)},t.options.delay)}},bindAnchorPreview:function(e){var t,i=this;for(this.editorAnchorObserverWrapper=function(e){i.editorAnchorObserver(e)},t=0;t<this.elements.length;t+=1)this.elements[t].addEventListener("mouseover",this.editorAnchorObserverWrapper);return this},checkLinkFormat:function(e){var t=/^(https?|ftps?|rtmpt?):\/\/|mailto:/;return(t.test(e)?"":"http://")+e},setTargetBlank:function(){var e=a(),t;if("a"===e.tagName.toLowerCase())e.target="_blank";else for(e=e.getElementsByTagName("a"),t=0;t<e.length;t+=1)e[t].target="_blank"},setButtonClass:function(e){var t=a(),i=e.split(" "),n,o;if("a"===t.tagName.toLowerCase())for(o=0;o<i.length;o+=1)t.classList.add(i[o]);else for(t=t.getElementsByTagName("a"),n=0;n<t.length;n+=1)for(o=0;o<i.length;o+=1)t[n].classList.add(i[o])},createLink:function(i,n,o){var a,s;if(0===i.value.trim().length)return void this.hideToolbarActions();if(r(this.savedSelection),this.options.checkLinkFormat&&(i.value=this.checkLinkFormat(i.value)),t.execCommand("createLink",!1,i.value),(this.options.targetBlank||"_blank"===n)&&this.setTargetBlank(),o&&this.setButtonClass(o),this.options.targetBlank||"_blank"===n||o)for(s=t.createEvent("HTMLEvents"),s.initEvent("input",!0,!0,e),a=0;a<this.elements.length;a+=1)this.elements[a].dispatchEvent(s);this.checkSelection(),this.showToolbarActions(),i.value=""},bindWindowActions:function(){var t,i=this;return this.windowResizeHandler=function(){clearTimeout(t),t=setTimeout(function(){i.toolbar&&i.toolbar.classList.contains("medium-editor-toolbar-active")&&i.setToolbarPosition()},100)},e.addEventListener("resize",this.windowResizeHandler),this},activate:function(){this.isActive||this.setup()},deactivate:function(){var i;if(this.isActive)for(this.isActive=!1,void 0!==this.toolbar&&(this.options.elementsContainer.removeChild(this.anchorPreview),this.options.elementsContainer.removeChild(this.toolbar),delete this.toolbar,delete this.anchorPreview),t.documentElement.removeEventListener("mouseup",this.checkSelectionWrapper),e.removeEventListener("resize",this.windowResizeHandler),i=0;i<this.elements.length;i+=1)this.elements[i].removeEventListener("mouseover",this.editorAnchorObserverWrapper),this.elements[i].removeEventListener("keyup",this.checkSelectionWrapper),this.elements[i].removeEventListener("blur",this.checkSelectionWrapper),this.elements[i].removeEventListener("paste",this.pasteWrapper),this.elements[i].removeAttribute("contentEditable"),this.elements[i].removeAttribute("data-medium-element")},htmlEntities:function(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")},bindPaste:function(){var e,i=this;for(this.pasteWrapper=function(e){var n,o="",r;if(this.classList.remove("medium-editor-placeholder"),!i.options.forcePlainText&&!i.options.cleanPastedHTML)return this;if(e.clipboardData&&e.clipboardData.getData&&!e.defaultPrevented){if(e.preventDefault(),i.options.cleanPastedHTML&&e.clipboardData.getData("text/html"))return i.cleanPaste(e.clipboardData.getData("text/html"));if(i.options.disableReturn||this.getAttribute("data-disable-return"))t.execCommand("insertHTML",!1,e.clipboardData.getData("text/plain"));else{for(n=e.clipboardData.getData("text/plain").split(/[\r\n]/g),r=0;r<n.length;r+=1)""!==n[r]&&(o+=navigator.userAgent.match(/firefox/i)&&0===r?i.htmlEntities(n[r]):"<p>"+i.htmlEntities(n[r])+"</p>");t.execCommand("insertHTML",!1,o)}}},e=0;e<this.elements.length;e+=1)this.elements[e].addEventListener("paste",this.pasteWrapper);return this},setPlaceholders:function(){var e,t=function(e){e.querySelector("img")||e.querySelector("blockquote")||""!==e.textContent.replace(/^\s+|\s+$/g,"")||e.classList.add("medium-editor-placeholder")},i=function(e){this.classList.remove("medium-editor-placeholder"),"keypress"!==e.type&&t(this)};for(e=0;e<this.elements.length;e+=1)t(this.elements[e]),this.elements[e].addEventListener("blur",i),this.elements[e].addEventListener("keypress",i);return this},cleanPaste:function(e){var i,n,o,r=this.getSelectionElement(),a=/<p|<br|<div/.test(e),s=[[new RegExp(/<[^>]*docs-internal-guid[^>]*>/gi),""],[new RegExp(/<\/b>(<br[^>]*>)?$/gi),""],[new RegExp(/<span class="Apple-converted-space">\s+<\/span>/g)," "],[new RegExp(/<br class="Apple-interchange-newline">/g),"<br>"],[new RegExp(/<span[^>]*(font-style:italic;font-weight:bold|font-weight:bold;font-style:italic)[^>]*>/gi),'<span class="replace-with italic bold">'],[new RegExp(/<span[^>]*font-style:italic[^>]*>/gi),'<span class="replace-with italic">'],[new RegExp(/<span[^>]*font-weight:bold[^>]*>/gi),'<span class="replace-with bold">'],[new RegExp(/&lt;(\/?)(i|b|a)&gt;/gi),"<$1$2>"],[new RegExp(/&lt;a\s+href=(&quot;|&rdquo;|&ldquo;|“|”)([^&]+)(&quot;|&rdquo;|&ldquo;|“|”)&gt;/gi),'<a href="$2">']];for(i=0;i<s.length;i+=1)e=e.replace(s[i][0],s[i][1]);if(a)for(n=e.split("<br><br>"),this.pasteHTML("<p>"+n.join("</p><p>")+"</p>"),t.execCommand("insertText",!1,"\n"),n=r.querySelectorAll("p,div,br"),i=0;i<n.length;i+=1)switch(o=n[i],o.tagName.toLowerCase()){case"p":case"div":this.filterCommonBlocks(o);break;case"br":this.filterLineBreak(o)}else this.pasteHTML(e)},pasteHTML:function(e){var i,n,o,r,a=t.createDocumentFragment();for(a.appendChild(t.createElement("body")),r=a.querySelector("body"),r.innerHTML=e,i=r.querySelectorAll("*"),o=0;o<i.length;o+=1)n=i[o],n.removeAttribute("class"),n.removeAttribute("lang"),n.style.removeProperty("font-size"),n.style.removeProperty("font-family"),n.removeAttribute("dir"),"meta"===n.tagName.toLowerCase()&&n.parentNode.removeChild(n);t.execCommand("insertHTML",!1,r.innerHTML.replace(/&nbsp;/g," "))},isCommonBlock:function(e){return e&&("p"===e.tagName.toLowerCase()||"div"===e.tagName.toLowerCase())},filterCommonBlocks:function(e){/^\s*$/.test(e.innerText)&&e.parentNode.removeChild(e)},filterLineBreak:function(e){this.isCommonBlock(e.previousElementSibling)?e.parentNode.removeChild(e):!this.isCommonBlock(e.parentNode)||e.parentNode.firstChild!==e&&e.parentNode.lastChild!==e?1===e.parentNode.childElementCount&&this.removeWithParent(e):e.parentNode.removeChild(e)},removeWithParent:function(e){e&&e.parentNode&&(e.parentNode.parentNode&&1===e.parentNode.childElementCount?e.parentNode.parentNode.removeChild(e.parentNode):e.parentNode.removeChild(e.parentNode))},cleanupSpans:function(e){var i,n,o,r=e.querySelectorAll(".replace-with");for(i=0;i<r.length;i+=1)n=r[i],o=t.createElement(n.classList.contains("bold")?"b":"i"),o.innerHTML=n.classList.contains("bold")&&n.classList.contains("italic")?"<i>"+n.innerHTML+"</i>":n.innerHTML,n.parentNode.replaceChild(o,n);for(r=e.querySelectorAll("span"),i=0;i<r.length;i+=1)n=r[i],/^\s*$/.test()?n.parentNode.removeChild(n):n.parentNode.replaceChild(t.createTextNode(n.innerText),n)}}}(window,document);