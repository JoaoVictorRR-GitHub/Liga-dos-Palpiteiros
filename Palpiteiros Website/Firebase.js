// Import the functions you need from the SDKs you need.
// Importando as funcoes necessarias dos SDKs necessarios.
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration.
// Funcao para configurar o Firebase para o Website.
const firebaseConfig = {
  apiKey: "AIzaSyAVxOvgdLR2qVYh-HZ6FdYZQ27sGLo_4Ws",
  authDomain: "liga-dos-palpiteiros.firebaseapp.com",
  projectId: "liga-dos-palpiteiros",
  storageBucket: "liga-dos-palpiteiros.firebasestorage.app",
  messagingSenderId: "199893383108",
  appId: "1:199893383108:web:7334bf493428531bb45691"
};

// Initialize Firebase.
// Inicializando o Firebase.
const appWeb = initializeApp(firebaseConfig);

// Obtendo os dados do Firestore no Firebase.
const db = getFirestore(appWeb);


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



/**
 * ### Método para realizar o login do usuário.
 * @param {*} event Evento do formulário.
 * @returns TRUE se o login for um sucesso
 * @returns FALSE se o login falhar.
 */
async function verificaLogin(event) {

  // Impede o comportamento padrao do formulario
  event.preventDefault();

  // Obtendo os dados do formulario de login.
  var login = document.getElementById("campoLogin").value;
  var senha = document.getElementById("campoSenha").value;

  // Obtendo os dados do usuario no Firebase.
  const collectionMembros = collection(db, 'Membros');
  const filtroLogin       = query(collectionMembros, where('Login', '==', login), where('Senha', '==', senha));
  const membroSnapshot    = await getDocs(filtroLogin);
  const infoMembro        = membroSnapshot.docs.map(doc => doc.data());
  
  // Verificando se algum dado foi retornado.
  if(membroSnapshot.empty){
    alert("É... nada aqui.");
    return false;
  }
  
  alert("Tuts tuts.");
  return true;
}

// Adicionando o metodo ao evento onSubmit do formulario de login.
document.getElementById("Login").addEventListener("submit", verificaLogin);