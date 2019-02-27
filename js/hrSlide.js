;(function(window,undefined){
    // "use strict";

    var opts={
        arrays: false,
        dots: false,
        index: 1,
        animated: false,
        time: 300,
        interval: 5,
        autoInterval:3000
    };
    
    var hrSlide = function (windowId,eleId,options) {
        windowId=(typeof windowId == "string")?windowId:windowId.toString();
        eleId=(typeof eleId == "string")?eleId:eleId.toString();
        this.win=document.getElementById(windowId);
        this.slide=document.getElementById(eleId);
        this.pic=this.slide.children;
        
        this.init();        
    };
    
    hrSlide.prototype={
        constructor: hrSlide,
        
        init:function () {
            this.length=this.insNodes(); //复制第一张和最后一张图片，分别插入前后
            this.setCSS();
        },
        
        setCSS:function(){
            var self=this;
            
            this.win.classList.add('hr-slide-window');
            
            this.slide.classList.add('hr-slide');
            this.slide.style.cssText="width:"+this.win.clientWidth*this.length+"px;";            

            for (var i=0;i<this.length;i++){
                this.pic[i].style.width=this.win.clientWidth+"px";
                this.pic[i].style.display="inline-block";
            }
            
            this.win.style.cssText+="height:"+this.pic[0].clientHeight+"px;";
            
            window.addEventListener("resize", function () {
                self.slide.style.width=self.win.clientWidth*self.length+"px";
                for (var i=0;i<self.length;i++){
                    self.pic[i].style.width=self.win.clientWidth+"px";                    
                }
                self.win.style.cssText="height:"+self.pic[0].clientHeight+"px;";
            });
            
            
        },
        
        insNodes:function () {
            var firstPic=this.pic[0].cloneNode(true);
            var lastPic=this.pic[this.pic.length-1].cloneNode(true);
            
            this.slide.insertBefore(lastPic,this.slide.firstChild);
            this.slide.appendChild(firstPic);
            
            return this.pic.length;
        },
    };
    
    window.hrSlide=hrSlide;
    
})(window);
