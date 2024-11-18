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

// Obtendo a lista de membros do database Firestore.
async function getMembros_Ativos(db) {
  const collectionMembros = collection(db, 'Membros');
  const filtroMembros = query(collectionMembros, where('Situacao', '==', 'ATIVO'));
  const membrosSnapshot = await getDocs(filtroMembros);
  const listaMembros = membrosSnapshot.docs.map(doc => doc.data());
  return listaMembros;
}


// Funcao para exibir os membros em uma secao da pagina.
async function displayMembros() {
  const Membros = await getMembros_Ativos(db);
  const firebaseSection = document.getElementById('firebase');
  
  Membros.forEach(membro => {
      const cityElement = document.createElement('p');
      cityElement.textContent = `Nome: ${membro.Nome}, Situação: ${membro.Situacao}`;
      firebaseSection.appendChild(cityElement);
  });
}

// Call the function to display cities
// displayMembros();



const Artigos = ["#TOP1", "#TOP2", "#SUBTOP2_1", "#SUBTOP2_2", "#SUBTOP2_3", "#SUBTOP2_4", "#SUBTOP2_5", "#TOP3"];

// Funcao para rolar a pagina suavemente ate uma ancora.
function animarScrollAncora(ID) {
  const ancora = document.querySelector(ID);
  const posicaoAlvo = ancora.getBoundingClientRect().top +window.scrollY -90;
  window.scrollTo({top: posicaoAlvo, behavior: 'smooth'});
}

// Loop para adicionar ouvintes de evento para a ancora dos artigos.
for (const Artigo of Artigos) {
  document.querySelector(`a[href="${Artigo}"]`).addEventListener('click', function(event) {
      event.preventDefault();
      animarScrollAncora(Artigo);
  });
}



let Emojis = {
  "Top_Arrow":      "🔝", // "&#128285;"
  "Triangle_Down":  "🔻", // "&#128315;"
  "Square":         "🔲", // "&#128306;"
  "Circle_Y":       "🟡", // "&#128993;"
  "Circle_R":       "🔴", // "&#128308;"
  "Circle_G":       "🟢", // "&#128994;"
  "Circle_P":       "🟣", // "&#128995;"
  "Trophy":         "🏆", // "&#127942;"
  "Medal_2":        "🥈", // "&#129352;"
  "Medal_3":        "🥉", // "&#129353;"
  "Soccer_Ball":    "⚽", // "&#9917;"
  "Check_Bt":       "✅", // "&#9989;"
  "Hollow_Circle":  "⭕",  // "&#11093;"
  "Proibido":       "🚫"  // "&#128683;"

};
// window.alert(Emojis["Top_Arrow"]);