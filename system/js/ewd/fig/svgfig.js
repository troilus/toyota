﻿var ET4=function(ECG){this.E0S=ECG;this.Eb9=null;this.EGI;this.ETB=null;this.EEr=0;this.E52=0;this.ES2=0;this.ETO=0;this.EfW=0;this.EfX=0;};ET4.EfY=[];ET4.EfZ=0;ET4.Efa=1;ET4.Efb="ewd:blinkCount";ET4.Efc="#FF6666";ET4.Efd=0;ET4.Eg6=null;ET4.prototype.Eg4=function(){try{if(ET4.Eg6!=null){clearTimeout(ET4.Eg6);ET4.Eg6=null;}}catch(e){}};ET4.prototype.Ecb=function(){try{return{ERT:0,ERI:0,EEr:this.EfW,E52:this.EfX};}catch(e){return null;}};ET4.prototype.Efe=function(E6l){this.EGI=E6l;this.ETB=E6l.rootElement;this.E52=this.ETB.getAttribute("height");this.EEr=this.ETB.getAttribute("width");if(this.EfW==0){this.EfW=this.EEr;this.EfX=this.E52;}};ET4.prototype.EEt=function(EEr,E52){try{this.Eb9.setAttribute("width",EEr+"px");this.Eb9.setAttribute("height",E52+"px");this.EEr=EEr;this.E52=E52;return true;}catch(e){window.alert(e.message);return false;}};ET4.prototype.Ebd=function(){var Eff;var Efg;try{Eff=this.ETB.getAttribute("viewBox");Efg=Eff.split(" ");Efg[2]=Math.ceil(parseFloat(Efg[2]));Efg[3]=Math.ceil(parseFloat(Efg[3]));this.ETB.setAttribute("viewBox",Efg.join(" "));this.ETQ(Efg[2],Efg[3]);this.EfW=Efg[2];this.EfX=Efg[3];return true;}catch(e){window.alert(e.message);return false;}};ET4.prototype.ETQ=function(EEr,E52){try{this.ETB.setAttribute("width",EEr);this.ETB.setAttribute("height",E52);this.ES2=EEr;this.ETO=E52;return true;}catch(e){window.alert(e.message);return false;}};ET4.prototype.Ebb=function(E3T){this.Eb9=E3T;};ET4.prototype.Efh=function(){try{this.ETB.addEventListener("mousedown",parent.Ecs.Ed3,false);return true;}catch(e){return false;}};ET4.prototype.Efi=function(){try{this.ETB.addEventListener("SVGScroll",parent.Ecs.Ed2,false);this.ETB.addEventListener("SVGZoom",parent.Ecs.Ed0,false);return true;}catch(e){return false;}};ET4.prototype.ETI=function(E3T){var Efj=E3T.getAttribute("ewd:blinkNo");var EFZ=parseInt(Efj,10);if(isNaN(EFZ)){return-1;}else{return EFZ;}};ET4.prototype.Ec6=function(E3T){var Efk;var EFZ=this.ETI(E3T);if(EFZ<0){return;}else if(EFZ<ET4.EfY.length){Efk=ET4.EfY[EFZ];if(Efk==null){return;}if(Efk.E0S==ET4.EfZ){this.Efl(Efk);}else if(Efk.E0S==ET4.Efa){this.Efm(Efk);}ET4.EfY[EFZ]=null;}};ET4.prototype.ETM=function(E3T){var n;var EFZ;if(arguments.length>1&&arguments[1]==true){EFZ=-1;}else{EFZ=this.ETI(E3T);}if(EFZ<0){var n=ET4.EfY.length;ET4.EfY.push(new Efn(ET4.EfZ,E3T));E3T.setAttribute("ewd:blinkNo",String(n));if(n==0){setTimeout("ET4.Efo()",100);}}};ET4.prototype.ETL=function(E3T){var EFZ;if(arguments.length>1&&arguments[1]==true){EFZ=-1;}else{EFZ=this.ETI(E3T);}if(EFZ<0){var n=ET4.EfY.length;var blinkObj=new Efn(ET4.Efa,E3T);ET4.EfY.push(blinkObj);E3T.setAttribute("ewd:blinkNo",String(n));if(n==0){setTimeout("ET4.Efo()",100);}}};ET4.prototype.Efl=function(Efp){Efp.E3T.removeAttribute("opacity");Efp.E3T.removeAttribute("ewd:blinkNo");};ET4.prototype.Efm=function(Efq){var col=Efq.Efr;var oldColor=Efq.E3T.getAttribute("ewd:oldColor");if(oldColor==null||oldColor==""){col=Efq.Efs}Efq.E3T.style.setProperty("fill",col,null);Efq.E3T.removeAttribute("ewd:blinkNo");};ET4.Efo=function(){var ET1="1.0";var ECT=0;var Eft;if(ET4.Efd==0){ET1="0.35";ET4.Efd=1;}else{ET4.Efd=0;}if(ET4.EfY.length==0){return;}for(var i=0;i<ET4.EfY.length;i++){if(ET4.EfY[i]==null){}else if(ET4.EfY[i].E0S==ET4.EfZ){try{ET4.EfY[i].E3T.setAttribute("opacity",ET1);ECT++;}catch(e){}}else if(ET4.EfY[i].E0S==ET4.Efa){Eft=(ET4.Efd==0)?ET4.EfY[i].Efs:ET4.Efc;try{ET4.EfY[i].E3T.style.setProperty("fill",Eft,null);ECT++;}catch(e){}}}if(ECT>0){ET4.Eg6=setTimeout("ET4.Efo()",500);}else{ET4.EfY=[];}};var Efn=function(ECG,E3T){this.E0S=ECG;this.E3T=E3T;this.Efs="";this.Efr="";if(ECG==ET4.Efa){this.Efr=E3T.style.getPropertyValue("fill");this.Efs=E3T.getAttribute("ewd:oldColor");if(this.Efs==null||this.Efs==""){this.Efs=this.Efr;}}};function call_execInitLoadProc_svg(E0S){try{var EbW=new ET4(E0S);EbW.Efe(document);EbW.Efh();EbW.Efi();if(parent.Ecs!=undefined){parent.Ecs.EbX(EbW);}else{window.top.E2o.EfT(EbW);}}catch(e){alert(e.message);}};var text_mouse_over=function(Er){var E3T=Er.target;while(E3T.nodeName!="a"){E3T=E3T.parentNode;}var EGD=E3T.getElementsByTagName("text");for(var i=0;i<EGD.length;i++){if(EGD.item(i).style==null){continue;}EGD.item(i).style.setProperty("fill","#ff0000");}};var text_mouse_out=function(Er){var E3T=Er.target;while(E3T.nodeName!="a"){E3T=E3T.parentNode;}var EGD=E3T.getElementsByTagName("text");for(var i=0;i<EGD.length;i++){if(EGD.item(i).style==null){continue;}EGD.item(i).style.setProperty("fill","#0000ff");}};