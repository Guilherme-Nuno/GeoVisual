let janelaMaximizada = false;
let menu = 0;


function expandirJanela(janelaID) {

    let vistas3D = document.getElementById("vista-3D");
    let vistas2D = document.getElementById("vista-2D");
    let controlos = document.getElementById("controlos");
    let box = document.getElementById("box-container");
    let botao3D = document.getElementById("botao-3D");
    let botao2D = document.getElementById("botao-2D");

    if(!janelaMaximizada){
        if (janelaID === 'vista-3D'){

            vistas3D.style.position = 'absolute';
            vistas3D.style.top = 0;
            vistas3D.style.left = 0;
            vistas3D.style.width = '97vw';
            vistas3D.style.height = '97vh';


            vistas2D.style.position = 'absolute';
            vistas2D.style.top = '20px';
            vistas2D.style.right = '30px';
            vistas2D.style.width = '20vw';
            vistas2D.style.height = '20vh';
            vistas2D.style.flex = '0 0 30%';
            vistas2D.style.zIndex = 1;

            botao3D.textContent = 'X';
            botao2D.style.display = 'none';

        } else {

            vistas2D.style.position = 'absolute';
            vistas2D.style.top = 0;
            vistas2D.style.right = 0;
            vistas2D.style.width = '97vw';
            vistas2D.style.height = '97vh';


            vistas3D.style.position = 'absolute';
            vistas3D.style.top = '20px';
            vistas3D.style.left = '30px';
            vistas3D.style.width = '20vw';
            vistas3D.style.height = '20vh';
            vistas3D.style.flex = '0 0 30%';
            vistas3D.style.zIndex = 1;

            botao2D.textContent = 'X';
            botao3D.style.display = 'none';
        }

        controlos.style.display = 'none';
        controlos.style.flex = '0 0 0';

        box.style.flex = '0 0 95%';

        janelaMaximizada = true;

    } else {
        
        vistas3D.style.position = '';
        vistas3D.style.top = '';
        vistas3D.style.left = '';
        vistas3D.style.width = '';
        vistas3D.style.height = '';
        vistas3D.style.flex = '';
        vistas3D.style.zIndex = '';

        vistas2D.style.position = '';
        vistas2D.style.top = '';
        vistas2D.style.right = '';
        vistas2D.style.width = '';
        vistas2D.style.height = '';
        vistas2D.style.flex = '';
        vistas2D.style.zIndex = '';

        controlos.style.display = '';
        controlos.style.flex = '';

        botao3D.style.display ='';
        botao3D.textContent = '〈〉';

        botao2D.style.display ='';
        botao2D.textContent = '〈〉';

        box.style.flex = '';

        janelaMaximizada = false;
    }
}

function selectMenu(select) {

    let buttonPoint = document.getElementById("button_point");
    let buttonLine = document.getElementById("button_line");
    let buttonPlane = document.getElementById("button_plane");
    let button2D = document.getElementById("button_2D");
    let button3D = document.getElementById("button_3D");
    let buttonFaq = document.getElementById("button_faq");

    let controlsPoint = document.getElementById("controls_point");
    let controlsLine = document.getElementById("controls_line");
    let controlsPlane = document.getElementById("controls_plane");
    let controls2D = document.getElementById("controls_2D");
    let controls3D = document.getElementById("controls_3D");
    let controlsFaq = document.getElementById("controls_faq");

    function clearMenu(){
        buttonPoint.style.backgroundColor = '';
        buttonLine.style.backgroundColor = '';
        buttonPlane.style.backgroundColor = '';
        button3D.style.backgroundColor = '';
        button2D.style.backgroundColor = '';
        buttonFaq.style.backgroundColor = '';
    
        controlsPoint.style.display = 'none';
        controlsLine.style.display = 'none';
        controlsPlane.style.display = 'none';
        controls2D.style.display = 'none';
        controls3D.style.display = 'none';
        controlsFaq.style.display = 'none';
    }

    if (menu == 0 || menu != select) {

        clearMenu();

        switch (select) {
            case 1:
                buttonPoint.style.backgroundColor = 'gray';
                controlsPoint.style.display = 'block';
                menu = 1;
                break;
                
            case 2:
                buttonLine.style.backgroundColor = 'gray';
                controlsLine.style.display = 'block';
                menu = 2;
                break;

            case 3:
                buttonPlane.style.backgroundColor = 'gray';
                controlsPlane.style.display = 'block';
                menu = 3;
                break;

            case 4:
                button2D.style.backgroundColor = 'gray';
                controls2D.style.display = 'block';
                menu = 4;
                break;

            case 5:
            button3D.style.backgroundColor = 'gray';
            controls3D.style.display = 'block';
            menu = 5;
            break;

            case 6:
            buttonFaq.style.backgroundColor = 'gray';
            controlsFaq.style.display = 'block';
            menu = 6;
            break;
            
            default:
                break;
        }
    } else {

        clearMenu();

        menu = 0;
    }
}