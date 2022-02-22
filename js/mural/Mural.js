const Mural = (function (_render, Filtro) {
    'use strict';
    let localStorageKeyname = `cartoes:${userLogado.userName}`;
    let cartoes = pegaCartoesUsuarios();

    const render = () => _render({cartoes: cartoes, filtro: Filtro.tagsETexto});
    render();

    User.on('login', () => {
        localStorageKeyname = `cartoes:${userLogado.userName}`;
        cartoes = pegaCartoesUsuarios();
        render();
    });

    User.on('logout', () => {
        // localStorage.removeItem(userLogado.userName);
        cartoes = [];
        render();
    });

    Filtro.on('filtrado', render);

    function pegaCartoesUsuarios() {
        const cartoesLocal = JSON.parse(localStorage.getItem(localStorageKeyname));
        if (cartoesLocal) {
            return cartoesLocal.map(row => {
                const cartao = new Cartao(row.conteudo, row.tipo);
                preparaCartao(cartao);
                return cartao;
            });
        }
        return [];
    }

    function preparaCartao(cartao) {
        cartao.on('mudanca.**', salvaCartoes);
        cartao.on('remocao', () => {
            cartoes = cartoes.slice(0);
            cartoes.splice(cartoes.indexOf(cartao), 1);
            salvaCartoes();
            render();
        });
    }

    function salvaCartoes() {
        const cartoesParsed = cartoes.map(cartao => ({
            conteudo: cartao.conteudo,
            tipo: cartao.tipo,
        }));
        localStorage.setItem(localStorageKeyname, JSON.stringify(cartoesParsed));
    }

    function adiciona(cartao) {
        if (!logado) {
            return false;
        }
        console.log(cartao);
        cartoes.push(cartao);
        preparaCartao(cartao);
        salvaCartoes();
        render();
        return true;
    }

    return Object.seal({
        adiciona,
    });

})(Mural_render, Filtro);
