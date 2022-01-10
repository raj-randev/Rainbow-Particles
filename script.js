//**Start-up Code**//


//Select Canvas in HTML File
const canvas = document.getElementById('canvas1');

//Be able to draw on canvas
const c = canvas.getContext('2d');

//Set initial canvas width and height to match the browser width and height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



//**Variables**//


//Empty Array for Particles
const particleArray = [];

//First value in HUE Colour
let hue = 0;

//Container to record mouse's X and Y coordinates
const mouse = {
    x: undefined,
    y: undefined
}



//**Event Listeners**//


window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

canvas.addEventListener('click', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;

    for (let i = 0; i < 5; i++) {
        particleArray.push(new Particle());
    }
})

canvas.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    
    for (let i = 0; i < 2; i++) {
        particleArray.push(new Particle());
    }
})



//**Objects**//


//Class Constructor that gives instruction on the build, position and movement of each particle
class Particle {
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 15 + 1;//Size between 1-15px 
        this.speedX = Math.random() * 3 - 1.5;//Returns a postive or negative(allow left or right movement)
        this.speedY = Math.random() * 3 - 1.5;//Returns a postive or negative(allow up or down movement)
        this.color = `hsl(${hue}, 100%, 50%)`;//Concatenate and add hue variable
    }

    //Updates the speed, direction and size of the Particle
    update = () => {
        this.x += this.speedX;//Adds direction and velocity to the x-axis
        this.y += this.speedY;//Adds direction and velocity to the y-axis
        if (this.size > 0.2) this.size -=0.05;//Reduces the size of each particle until it disappears
    }

    //Function to give instructions for drwaing particle
    draw = () => {
        c.fillStyle = this.color;
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.stroke();
        c.fill();
    }
}



//**Implementation**//


//function to draw particle
handleParticles = () => {
    for (let i = 0; i < particleArray.length; i++){
        particleArray[i].update();
        particleArray[i].draw();

        for (let j = i; j < particleArray.length; j++) {
            const dx = particleArray[i].x - particleArray[j].x;
            const dy = particleArray[i].y - particleArray[j].y;
            const hypDistance = Math.sqrt((dx*dx) + (dy*dy));//work out hypotinuse
            if (hypDistance < 100) {
                c.beginPath();
                c.strokeStyle = particleArray[i].color;
                c.lineWidth = 0.2;
                c.moveTo(particleArray[i].x, particleArray[i].y);
                c.lineTo(particleArray[j].x, particleArray[j].y);
                c.stroke();
                c.closePath();
            }//Add line to adjoining particle if hypotinuse is <= 100px
        }

        if (particleArray[i].size <= 0.3) {
            particleArray.splice(i, 1);
            i--;
        }//If the particle is smaller than 0.3, remoev from the particle array
    }
}

//Function to animate
function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();//Function Call to draw particles
    hue += 0.5;//Add 0.5 to the HUE number to change the colour dynamically
    requestAnimationFrame(animate);
}

animate();