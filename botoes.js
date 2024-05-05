let janelaMaximizada = false;


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