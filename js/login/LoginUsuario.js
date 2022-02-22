let userLogado = JSON.parse(localStorage.getItem('logado')) ?? {userName: '', logado: false};
let logado = userLogado.logado;
const User = new EventEmitter2();

LoginUsuario_render({
    logado,
    usuario: userLogado.userName,
    onLogin: (userName) => {
        logado = true;
        const objUser = {
            userName,
            logado: logado,
        };
        localStorage.setItem('logado', JSON.stringify(objUser));
        userLogado = objUser;
        User.emit('login');
    },
    onLogout: () => {
        logado = false;
        localStorage.removeItem('logado');
        User.emit('logout');
    },
});
