;(function(window,undefined){
    "use strict";    
    
    let hrSlide = function (windowId,eleId,options) {
        windowId=(typeof windowId == "string")?windowId:windowId.toString();
        eleId=(typeof eleId == "string")?eleId:eleId.toString();
        
        this.win=document.getElementById(windowId);
        this.slide=document.getElementById(eleId);
        this.pic=this.slide.children;
        
        this.init(options);        
    };
    
    hrSlide.prototype={
        constructor: hrSlide,

        opts:{
            arrays: false,
            dots: false,            
            time: 300,            
            autoInterval:3000
        },
        index: 1,
        animated: false,
        interval: 5,
        
        init:function (options) {
            let opt=this.config(options,this.opts); //设置参数
            this.length=this.insNodes(); //复制第一张和最后一张图片，分别插入前后
            this.lastIndex=this.length-2;
            this.setCSS(); //设置轮播图区域的CSS样式
            
            if (opt['arrays']===true){
                this.arrayEle=this.insArrays();
            }
            if (opt['dots']===true){
                this.dotsEle=this.insDots();
            }
        },
        
        config:function(opt1,opt2){
            for (let k in opt1){
                opt2[k]=opt1[k];
            } 
            return opt2;
        },
        
        setCSS:function(){
            let self=this;
            
            this.win.classList.add('hr-slide-window');
            
            this.slide.classList.add('hr-slide');
            this.slide.style.cssText="width:"+this.win.clientWidth*this.length+"px;";            

            for (let i=0;i<this.length;i++){
                this.pic[i].style.width=this.win.clientWidth+"px";
                this.pic[i].style.display="inline-block";
            }
            
            this.win.style.cssText+="height:"+this.pic[0].clientHeight+"px;";
            this.slide.style.cssText="left: -"+this.pic[0].offsetWidth+"px;";


            window.addEventListener("resize", function () {
                self.slide.style.width=self.win.clientWidth*self.length+"px";
                for (let i=0;i<self.length;i++){
                    self.pic[i].style.width=self.win.offsetWidth+"px";                    
                }
                self.win.style.cssText="height:"+self.pic[0].offsetHeight+"px;";
                self.slide.style.cssText="left: -"+self.pic[0].offsetWidth+"px;";
            });
            
                        
            
        },
        
        insNodes:function () {
            let firstPic=this.pic[0].cloneNode(true);
            let lastPic=this.pic[this.pic.length-1].cloneNode(true);
            
            this.slide.insertBefore(lastPic,this.slide.firstChild);
            this.slide.appendChild(firstPic);
            
            return this.pic.length;
        },
        
        insArrays:function () {
            let pre=document.createElement('a');
            let next=document.createElement('a');
            pre.classList.add('hr-slide-array');
            next.classList.add('hr-slide-array');
            pre.id='pre';
            next.id='next';
            pre.href="javascript:";
            next.href="javascript:";
            pre.innerHTML='<';
            next.innerHTML='>';
            
            this.win.appendChild(pre);
            this.win.appendChild(next);
            return [pre,next];
        },
        
        insDots:function () {
            let dots=document.createElement('div');
            for (let i=0;i<this.length-2;i++){
                let d=document.createElement('span');
                d.index=i+1;
                dots.appendChild(d);
            }
            dots.classList.add('hr-slide-dots');
            dots.children[0].classList.add('on');  
            this.win.appendChild(dots);
            dots.style.cssText="left: calc(50% - "+dots.offsetWidth/2+"px);";
            
            return dots;
        },
        
        animate:function (offset) {
            this.animated=true;
            let newLeft=this.slide.offsetLeft+offset;
            let speed=offset/(this.time/this.interval);

            function go() {
                if((speed<0 && this.slide.offsetLeft>newLeft)||(speed>0 && this.slide.offsetLeft<newLeft)){
                    this.slide.style.left=this.slide.offsetLeft+speed+"px";
                    setTimeout(go,this.interval);
                } else {
                    this.animated=false;
                    this.slide.style.left=newLeft+"px";
                    
                    let width=this.pic[0].offsetWidth;

                    if (newLeft <= -1*width*(this.lastIndex+1)) {
                        this.slide.style.left = -1*width+"px";
                    } else if (newLeft >= 0) {
                        this.slide.style.left = -1*width*this.lastIndex+"px"
                    }
                }
            }
            go(); 
        },
        
        preClick:function () {
            if (this.index===1){
                this.index=lastIndex;
            } else{
                this.index-=1;
            }

            if (!this.animated){
                this.animate(this.pic[0].offsetWidth);
            }

            this.showBtns();
        },
        
        nextClick:function () {
            if (this.index===this.lastIndex){
                this.index=1;
            } else{
                this.index+=1;
            }

            if (!this.animated){
                this.animate(this.pic[0].offsetWidth*(-1));
            }

            this.showBtns();
        },
        
        showBtns:function () {
            let dotsNode=this.dotsEle.children;
            for(let i=0;i<dotsNode.length;i++){
                let button=dotsNode[i];
                if(button.className === "on"){
                    button.className="";
                    break;
                }
            }
            dotsNode[this.index-1].className="on";
        }
    };
    
    window.hrSlide=hrSlide;
    
})(window);
