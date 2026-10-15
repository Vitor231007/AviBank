console.log('JavaScript conectado ao AviBank');
// buttons //
const botaoEntrar = document.querySelector("#btnEntrar");
const botaoSair = document.querySelector("#btnSair");
const botaoVoltar = document.querySelector("#btnVoltar");
const botaoAreaDeposito = document.querySelector("#btnAreaDeposito");
const botaoAreaSaque = document.querySelector("#btnAreaSaque");
const botaoAreaTransferencia = document.querySelector("#btnAreaTransferencia");
// input, mensagens e relacionados //
const login = document.querySelector("#campoLogin");
const senha = document.querySelector("#campoSenha");
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
const areaSaque = document.querySelector("#areaSaque");
const areaTransferencia = document.querySelector("#areaTransferencia");
// logica //
const saldoAtual = document.querySelector("#saldoAtual");
const botaoDeposito = document.querySelector("#btnDepositar");
const botaoSaque = document.querySelector("#btnSacar");
const botaoTransferir = document.querySelector("#btnTransferir");
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
    areaLogin.hidden = true
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
    botaoSair.hidden = true;
    botaoVoltar.hidden = true;
    loginConfirmado = false;
    login.value = "";
    senha.value = "";
    mensagem.textContent = "";
    nomeUsuario.textContent = "";
};
    

// botão "entrar" e validação de login //
botaoEntrar.addEventListener("click", () => {

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
});    

botaoAreaSaque.addEventListener("click", () => {

    areaSaque.hidden = false;
    areaCliente.hidden = true

});

botaoSaque.addEventListener("click", () => {
    
    let valorReais = Number(valorSaque.value);
    
    if (valorSaque.value.trim() === "" || 
        valorSaque.value <= 0 ||
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
    

});

botaoAreaTransferencia.addEventListener("click", () => {
    
    areaTransferencia.hidden = false;
    areaCliente.hidden = true;
    
});

console.log(`Login confirmado? ${loginConfirmado}`);
    



