// Import the functions you need from the SDKs you need.
// Importando as funcoes necessarias dos SDKs necessarios.
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



// =======================================================
// =======================================================
// =======================================================

/** ### Classe para configuracao e conexao do Website com o Firebase. */
class Firebase {
  
  // Dados de configuracao do Firebase para o Website.
  #firebaseConfig = {
    apiKey: "AIzaSyAVxOvgdLR2qVYh-HZ6FdYZQ27sGLo_4Ws",
    authDomain: "liga-dos-palpiteiros.firebaseapp.com",
    projectId: "liga-dos-palpiteiros",
    storageBucket: "liga-dos-palpiteiros.firebasestorage.app",
    messagingSenderId: "199893383108",
    appId: "1:199893383108:web:7334bf493428531bb45691"
  };

  #appWeb;  // Modulo do Firebase para Web.
  #db;      // Dados armazenados no Firebase.


  /** Construtor da classe. */
  constructor(){
    this.#conectar_Firebase();
  }

  /** Metodo para realizar a conexao do Website com o Firebase. */
  #conectar_Firebase(){
    this.appWeb = initializeApp(this.#firebaseConfig);  // Inicializando o Firebase.
    this.db = getFirestore(this.appWeb);                // Obtendo os dados do Firestore no Firebase.
  }

  /**
   * Metodo para obter os dados de uma tabela no Firebase.
   * @param   {string}  Tabela Nome da tabela no Firebase. Exemplo: 'Membros'.
   * @param   {Array}   Condicoes Condicoes `where()` para filtrar os dados.
   * @returns {Array}   Retorna os dados da tabela conforme as condicoes aplicadas.
   * @example
   * const dados = await obter_Dados('Membros', [
   *     where('status', '==', 'ativo'),
   *     where('logado', '==', true)
   * ]);
   * console.log(dados);  // Array de objetos com dados dos membros ativos e logados.
   */
  async obter_Dados(Tabela = 'Membros', Condicoes = []){
    try{
      const linhas_Tabela = collection(this.db, Tabela);              // Obtendo a colecao de dados da tabela.
      const filtro_Tabela = query(linhas_Tabela, ...Condicoes);       // Filtrando a colecao de dados.
      const dados_Filtro  = await getDocs(filtro_Tabela);             // Obtendo os documentos filtrados.
      const informacoes   = dados_Filtro.docs.map(doc => doc.data()); // Extraindo os dados dos documentos.

      // Verificando se algum dado foi retornado.
      if(dados_Filtro.empty) return null;
      else return informacoes;
      
    } catch (Error) {
      console.error("Ocorreu um erro ao obter os dados: ", Error);
      return null;
    }
  }
}



// =======================================================
// =======================================================
// =======================================================

/** ### Classe para configuracao e manutencao dos membros da liga. */
class Membros {

  info_Membro;  // Informacoes do membro.


  /** Construtor da classe. */
  constructor(){
    this.#verificar_Sessao();
  }

  /** Metodo para guardar dados persistentes na sessao (Contexto da aba atual). */
  #guardar_Sessao(){
    // Guardando os dados do membro na sessao.
    sessionStorage.setItem("info_Membro", JSON.stringify(this.info_Membro));
  }

  /** Metodo para verificar e obter dados persistentes da sessao (Contexto da aba atual).  */
  #verificar_Sessao(){
    // Obtendo os dados salvos na sessao.
    this.info_Membro = JSON.parse(sessionStorage.getItem("info_Membro"));

    // Verificando se existem dados salvos.
    // if(!this.dados_Membro){
    //   alert("Hmm, parece que você não está logado.");
    //   location.href = "index.html";
    // }
  }

  /** Metodo para deslogar o membro e deslogar a sessao.  */
  deslogar_Sessao(){
    // Limpando os dados da sessao.
    sessionStorage.removeItem("info_Membro");
    location.href = "index.html";
  }

  /**
   * Metodo para realizar o login do usuario.
   * @param {*} event Evento de um elemento da página (Esperado um formulário).
   */
  efetuarLogin = async (event) => {

    event.preventDefault();         // Impede o comportamento padrao de um evento.
    var baseDados = new Firebase(); // Conexao com o banco de dados Firebase.

    // Obtendo os dados de um formulario de login.
    var login = document.getElementById("campoLogin").value;
    var senha = document.getElementById("campoSenha").value;

    // Obtendo os dados do membro no Firebase.
    this.info_Membro = await baseDados.obter_Dados('Membros', [where('Login', '==', login), where('Senha', '==', senha)]);
    
    // Verificando se algum dado foi retornado.
    if(this.info_Membro == null){
      alert("É... nada aqui.");
      return;
    }
    
    alert("Tuts tuts.");
    this.#guardar_Sessao();
    location.href = "index.html"; // Redirecionando para pagina principal.
    // open("index.html");
  }
}

var membro = new Membros();



// =======================================================
// =======================================================
// =======================================================

// Testes.
function testa(event){
  // Impede o comportamento padrao do formulario
  event.preventDefault();
  if(membro.info_Membro != null)
      alert(membro.info_Membro[0].Situacao);
  else alert("Tente fazer login antes..");
}



// 'DOMContentLoaded': Garante que o documento vai estar carregado antes de executar as operacoes requisitadas.
document.addEventListener('DOMContentLoaded', () => {
  // Adicionando o metodo ao evento onSubmit do formulario de login.
  if(document.getElementById("Login")) document.getElementById("Login").addEventListener("submit", membro.efetuarLogin);
  if(document.getElementById("teste")) document.getElementById("teste").addEventListener("click", testa);
});



// =======================================================
// =======================================================
// =======================================================

// Obtendo a lista de membros do database Firestore.
// async function getMembros_Ativos(db) {
//   const collectionMembros = collection(db, 'Membros');
//   const filtroMembros = query(collectionMembros, where('Situacao', '==', 'ATIVO'));
//   const membrosSnapshot = await getDocs(filtroMembros);
//   const listaMembros = membrosSnapshot.docs.map(doc => doc.data());
//   return listaMembros;
// }


// Funcao para exibir os membros em uma secao da pagina.
// async function displayMembros() {
//   const Membros = await getMembros_Ativos(db);
//   const firebaseSection = document.getElementById('firebase');
  
//   Membros.forEach(membro => {
//       const cityElement = document.createElement('p');
//       cityElement.textContent = `Nome: ${membro.Nome}, Situação: ${membro.Situacao}`;
//       firebaseSection.appendChild(cityElement);
//   });
// }


// Call the function to display members.
// displayMembros();