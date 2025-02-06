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
        
    }
})