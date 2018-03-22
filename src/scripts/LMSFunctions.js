var tempo;
var popup = null;
var _comited = true;

function ckeckpopup() {
    if (popup != null && popup.closed) {
        return false;
    }
    if (popup != null && !popup.closed) {
        return true;
    }
}

function Abrir(link) {
    var largura = screen.width;
    var altura = screen.height;

    link = link.replace("&amp;", "&");
    popup = window.open(link, 'LMS', 'width=' + largura + ',height=' + altura + ',top=0,left=0,screenX=0,screenY=0,status=no,scrollbars=no,toolbar=no,resizable=yes,maximized=yes,menubar=no,location=no');

    if (!popup) {
        _comited = false;
    } else {
        _comited = true;
    }

    window.onunload = fechaJanelas;
}

function verificar(link, diplayurl) {
    if (!ckeckpopup()) {
        if (_comited) {
            clearInterval(tempo);
            
            //API.LMSCommit('');

            link = link.replace("&amp;", "&");
            link += link.replace("#", "");

            window.location.href = diplayurl;
        } else {
            var _div = document.getElementById("info").innerHTML = 'Seu navegador está com o bloqueador de popup ativado. <br> Clique <a href=\"#\" onclick=\"javascript:BlockedPopup(\'' + link + '\');\">Aqui</a> para abrir o E-learning manualmente.';
        }
    }
}

function BlockedPopup(link) {
    _comited = true;

    var largura = screen.width;
    var altura = screen.height;

    link = link.replace("&amp;", "&");
    link += link.replace("#", "");

    popup = window.open(link, 'LMS', 'width=' + largura + ',height=' + altura + ',top=0,left=0,screenX=0,screenY=0,status=no,scrollbars=no,toolbar=no,resizable=yes,maximized=yes,menubar=no,location=mo');

    window.onunload = fechaJanelas;
}

function verifica() {
    if (ckeckpopup()) {
        if (popup.opener != null && !popup.opener.closed) {
            return "VOCÊ PERDERÁ TODOS OS DADOS SE FECHAR ESTA JANELA";
        }
    } else {
        window.onbeforeunload = null;
    }
}

function fechaJanelas() {
    if (ckeckpopup()) {
        if (popup.opener != null && !popup.opener.closed) {
            popup.close();
        }
    } else {
        window.onunload = null;
    }
}