(() => {
    class VideoWidget {
        constructor(config) {
            this.config = {
                videoUrl: '',
                ctaText: 'Learn More',
                ctaLink: '',
                containerId: '',
                ...config
            };
            this.maxDuration = 10;
            
            this.init();
        }
        isYouTube(url) {
            return url.includes("youtube.com") || url.includes("youtu.be");
        }

        convertToEmbedUrl(url) {
            return url.replace("watch?v=", "embed/");
        }


        init() {
            this.container = document.createElement('div');
            this.container.className = 'container';

            if (this.isYouTube(this.config.videoUrl)) {
                this.video = document.createElement('iframe');
                this.video.src = this.convertToEmbedUrl(this.config.videoUrl);
                this.video.allow = 'autoplay; encrypted-media';
            } else {
                this.video = document.createElement('video');
                this.video.src = this.config.videoUrl;
                this.video.playsInline = true;
                this.video.muted = true;
                this.video.autoplay = true;
                this.video.loop = true;
            }

            this.video.className = 'video';
            this.video.frameBorder = "0";
          

            this.cta = document.createElement('button');
            this.cta.className = 'cta';
            this.cta.textContent = this.config.ctaText;

            this.container.appendChild(this.video);
            this.container.appendChild(this.cta);
            this.addEventListeners();

            const targetContainer = document.getElementById(this.config.containerId);
            if (targetContainer) {
                targetContainer.appendChild(this.container);
            }

            this.validateDuration();
        }

        addEventListeners() {
            this.cta.addEventListener('click', () => {
                if (this.config.ctaLink) {
                    window.open(this.config.ctaLink, '_blank');
                }
            });
        }

        validateDuration() {
            this.video.addEventListener('loadedmetadata', () => {
                if (this.video.duration > this.maxDuration) {
                    console.warn(`Video duration exceeds ${this.maxDuration} seconds. Consider using a shorter video.`);
                }
            });
        }
    }

    window.VideoWidget = VideoWidget; 
})();
