console.log('JavaScript conectado ao AviBank');
// buttons //
const botaoEntrar = document.querySelector("#btnEntrar");
const botaoSair = document.querySelector("#btnSair");
const botaoVoltar = document.querySelector("#btnVoltar");
const botaoAreaDeposito = document.querySelector("#btnAreaDeposito");
const botaoAreaSaque = document.querySelector("#btnAreaSaque");
const botaoAreaTransferencia = document.querySelector("#btnAreaTransferencia");
const botaoAreaRegistro = document.querySelector("#btnAreaRegistro");
// input, mensagens e relacionados //
const login = document.querySelector("#campoUsuarioLogin");
const senha = document.querySelector("#campoSenhaLogin");
const loginRegistro = document.querySelector("#campoUsuarioRegistro");
const senhaRegistro = document.querySelector("#campoSenhaRegistro");
const valorDeposito = document.querySelector("#campoDeposito");
const valorSaque = document.querySelector("#campoSaque");
const valorTransferencia = document.querySelector("#campoValorTransferencia");
const mensagem = document.querySelector("#mensagem");
const nomeUsuario = document.querySelector("#nomeUsuario");
const loginCorreto = "admin";
const senhaCorreta = "123";
// sections //
const areaCliente = document.querySelector("#areaCliente");
const areaDeposito = document.querySelector("#areaDeposito");
const areaLogin = document.querySelector("#areaLogin");
const areaRegistro = document.querySelector("#areaRegistro");
const areaSaque = document.querySelector("#areaSaque");
const areaTransferencia = document.querySelector("#areaTransferencia");
// logica //
const saldoAtual = document.querySelector("#saldoAtual");
const botaoDeposito = document.querySelector("#btnDepositar");
const botaoSaque = document.querySelector("#btnSacar");
const botaoTransferir = document.querySelector("#btnTransferir");
const botaoConfirmarRegistro = document.querySelector("#btnConfirmarRegistro");
let loginConfirmado = false;
let saldoCentavos = 150000;

// formatador de moeda para Real //
const formatadorMoeda = new Intl.NumberFormat("pt-BR", { 
    style:  "currency", 
    currency: "BRL"
});

// função para atualizar o saldo //
const atualizarSaldo = () => {
    saldoAtual.textContent = `Saldo atual: ${formatadorMoeda.format(saldoCentavos / 100)}`;
} 

atualizarSaldo();

// função para retornar para areaCliente //
const retornarAreaCliente = () => {
    
    areaDeposito.hidden = true;
    areaSaque.hidden = true;
    areaLogin.hidden = true;
    areaTransferencia.hidden = true;
    areaCliente.hidden = false;
    mensagem.textContent = "";
    
    
};

// função para sair da conta atual //
const sairDaConta = () => {

    areaCliente.hidden = true;
    areaDeposito.hidden = true;
    areaTransferencia.hidden = true   
    areaSaque.hidden = true
    areaLogin.hidden = false;
    areaRegistro.hidden = true;
    botaoSair.hidden = true;
    botaoVoltar.hidden = true;
    loginConfirmado = false;
    login.value = "";
    senha.value = "";
    valorTransferencia.value = "";
    mensagem.textContent = "";
    nomeUsuario.textContent = "";
};

// função para sacar dinheiro //
const sacar = () => {

    let valorReais = Number(valorSaque.value);

    if (valorSaque.value.trim() === "" ||
        valorReais <= 0 ||
        !Number.isFinite(valorReais)) {

        mensagem.textContent = 'Valor inválido!'
        return;
    }

    const valorCentavos = Math.round(valorReais * 100);

    if (saldoCentavos < valorCentavos) {

        mensagem.textContent = 'Saldo insuficiente!'

        return;

    }

    saldoCentavos -= valorCentavos;
    atualizarSaldo();
    retornarAreaCliente();

    valorSaque.value = ""
    mensagem.textContent = ""
}

// função para depositar dinheiro //
const depositar = () => {

    const valorReais = Number(valorDeposito.value);

    if (valorDeposito.value.trim() === "" ||
        !Number.isFinite(valorReais) ||
        valorReais <= 0) {
        mensagem.textContent = 'Valor inválido!';
        return;
    }

    const valorCentavos = Math.round(valorReais * 100);

    if (valorCentavos <= 0) {
        mensagem.textContent = 'Informe um valor válido!';
        return;
    }

    saldoCentavos += valorCentavos;
    mensagem.textContent = "";
    valorDeposito.value = "";

    atualizarSaldo();
    retornarAreaCliente();

}

// função para validar login //
const validarLogin = () => {

    if (login.value.trim().length === 0 ||
        senha.value.trim().length === 0) {

        mensagem.textContent = "Preenchimento inválido, preencha os campos de login!";
        nomeUsuario.textContent = "";
        areaCliente.hidden = true;
        loginConfirmado = false;
        botaoSair.hidden = true;
        botaoVoltar.hidden = true;
        return;
    }
    if (login.value.trim() === loginCorreto &&
        senha.value === senhaCorreta) {

        mensagem.textContent = "Login realizado com sucesso!";
        nomeUsuario.textContent = `Olá, ${login.value.trim()}`;
        areaCliente.hidden = false;
        areaLogin.hidden = true;
        botaoSair.hidden = false;
        botaoVoltar.hidden = false;
        mensagem.textContent = "";
        loginConfirmado = true;

    } else {
        mensagem.textContent = "Login ou senha inválidos!";
        nomeUsuario.textContent = "";
        areaCliente.hidden = true;
        loginConfirmado = false;
        botaoSair.hidden = true;
        botaoVoltar.hidden = true;
    }
}

botaoConfirmarRegistro.addEventListener("click", () => {
    
});

botaoAreaRegistro.addEventListener("click", () => {

    areaLogin.hidden = true;
    
        areaRegistro.hidden = false
        botaoSair.hidden = false;
        botaoSair.textContent = "Voltar ao login";
    
    
});

botaoEntrar.addEventListener("click", () => {

  validarLogin();
    
});
    

botaoSair.addEventListener("click", () => {
    
    sairDaConta();
    
})

botaoVoltar.addEventListener("click", () => {
    
    if (loginConfirmado) {
        retornarAreaCliente();
    } else {
        sairDaConta();
    }
        
});

botaoAreaDeposito.addEventListener("click", () => {
    
    areaCliente.hidden = true;
    areaDeposito.hidden = false;
    
});

botaoDeposito.addEventListener("click", () => {
    
    depositar();
    
});    

botaoAreaSaque.addEventListener("click", () => {

    areaSaque.hidden = false;
    areaCliente.hidden = true

});

botaoSaque.addEventListener("click", () => {
    
    sacar();

});

botaoAreaTransferencia.addEventListener("click", () => {
    
    areaTransferencia.hidden = false;
    areaCliente.hidden = true;
    
});

console.log(`Login confirmado? ${loginConfirmado}`);
    



