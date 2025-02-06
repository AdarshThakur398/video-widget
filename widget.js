(function() {
    class VideoWidget {
        constructor(config) {
            this.config ={
                videoUrl:'',
                ctaText:'Learn More',
                ctaLink:'',
                container_Id:'',
                ...config
            };
            this.maxDuration=10;
            this.init();
        }
    }
    init() {
        this.container=document.createElement('div');
        this.container.className='container';
        this.video=document.createElement('video');
        this.video.className='video';
        this.video.src=this.config.videoUrl;
        this.video.playsInline=true;
        this.video.muted=true;
        this.video.autoplay=true;
        this.video.loop=true;

        this.cta=document.createElement('button');
        this.cta.className='cta';
        this.cta.textContent=this.config.ctaText;
        this.container.appendChild(this.video);
        this.container.appendChild(this.cta);
        this.addEventListeners();

        const targetContainer=document.getElementById(this.config.containerId);
        if(targetContainer) {
            targetContainer.appendChild(this.container);
        }
        this.valdateDuration();

    }
    window.VideoWidget = VideoWidget;
})();