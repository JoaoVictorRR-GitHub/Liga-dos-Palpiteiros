const Artigos = ["#TOP1", "#TOP2", "#SUBTOP2_1", "#SUBTOP2_2", "#SUBTOP2_3", "#SUBTOP2_4", "#SUBTOP2_5", "#TOP3"];

// Funcao para rolar a pagina suavemente ate uma ancora.
function animarScrollAncora(ID) {
  const ancora = document.querySelector(ID);
  const posicaoAlvo = ancora.getBoundingClientRect().top +window.scrollY -90;
  window.scrollTo({top: posicaoAlvo, behavior: 'smooth'});
}

// 'DOMContentLoaded': Garante que o documento vai estar carregado antes de executar a função.
document.addEventListener('DOMContentLoaded', () => {
  // Loop para adicionar ouvintes de evento para a ancora dos artigos.
  for (const Artigo of Artigos) {
    document.querySelector(`a[href="${Artigo}"]`).addEventListener('click', function(event) {
        event.preventDefault();
        animarScrollAncora(Artigo);
    });
  }
});



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