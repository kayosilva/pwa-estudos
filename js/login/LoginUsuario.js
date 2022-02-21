const userLogado = JSON.parse(localStorage.getItem('logado')) ?? {userName: '', logado: false};
let logado = userLogado.logado;

LoginUsuario_render({
    logado,
    usuario: userLogado.userName,
    onLogin: (userName) => {
        logado = true;
        localStorage.setItem('logado', JSON.stringify({
            userName,
            logado: logado,
        }));
    },
    onLogout: () => {
        logado = false;
        localStorage.removeItem('logado');
    },
});
