let janelaMaximizada = false;


function expandirJanela(janelaID) {

    let vistas3D = document.getElementById("vista-3D");
    let vistas2D = document.getElementById("vista-2D");
    let controlos = document.getElementById("controlos");
    let box = document.getElementById("box-container");

    if(!janelaMaximizada){
        if (janelaID === 'vista-3D'){

            vistas2D.style.flex = '0 0 30%';

        } else {

            vistas3D.style.flex = '0 0 30%';
        }

        controlos.style.display = 'none';
        controlos.style.flex = '0 0 0';

        box.style.flex = '0 0 95%';

        janelaMaximizada = true;

    } else {

    vistas3D.style.flex = 1;
    vistas2D.style.flex = 1;

    controlos.style.display = 'block';
    controlos.style.flex = '0 0 30%';

    box.style.flex = '0 0 65%';

    janelaMaximizada = false;
    }
}