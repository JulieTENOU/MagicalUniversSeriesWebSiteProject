import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import backgroundImage from "../assets/img/generated-bg.png"

export default function BG() {
    const particlesInit = async (main) => {
        console.log(main);
        await loadFull(main);
    }
    return (
        //particles.js container
        <div style={{ backgroundImage:`url(${backgroundImage})`, position:"fixed", width:'100%', height:'100%', backgroundSize:'cover'}}>

        <Particles id="tsparticles" init={particlesInit} className="particlesBG"options={
            //configuration for the object
            {
                "fullScreen": {
                    "enable": true,
                    "zIndex": -10
                },
                "particles": {
                    "number": {
                        "value": 300,
                        "density": {
                            "enable": false,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": "#fff"
                    },
                    "shape": {
                      "type": "circle"
                       }
                        , "stroke": {
                                "width":0.5,
                                "color": "whitesmoke"
                            },
                            "polygon": { "nb_sides": 5 }, 
                        "image": { "src": "img/github.svg", "width": 100, "height": 100
                    },
                    "opacity": {
                        "value": 1,
                        "random": false,
                        "anim": {
                            "enable": false, 
                            "speed": 1, 
                            "opacity_min": 0.1, 
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 1,
                        "random": true,
                        "anim": { 
                            "enable": false, 
                            "speed": 20, 
                            "size_min": 0.1, 
                            "sync": false
                        }
                    },
                    "line_linked":
                    {
                        "enable": false,
                        "distance": 600,
                        "color": "#fff",
                        "opacity": 0.4,
                        "width": 2
                    },
                    "move": {
                        "enable": true,
                        "speed": 2,
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract":
                        {
                            "enable": false,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events":
                    {
                        "onhover":
                        {
                            "enable": false,
                            "mode": ["repulse"]
                        },
                        'onClick':
                        {
                            "enable": true,
                            "mode": ["push"]
                        },
                        "resize": true
                    },
                    "modes":
                    {
                        "grab": {
                            "distance": 400,
                            "line_linked":
                            {
                                "opacity": 1
                            }
                        },
                        "bubble": {
                            "distance": 400,
                            "size": 40,
                            "duration": 2,
                            "opacity": 8,
                            "speed": 3
                        },
                        "repulse": {
                            "distance": 200,
                        },
                        "push": {
                            "particles_nb": 4
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },
                "retina_detect": true,
            }
        }
        // }
        
        />

        <img src='/src/assets/img/bg.jpg' alt=""/>
        </div>
    )
}