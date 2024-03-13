document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Pegando os valores dos inputs
  const nome = document.getElementById("nome").value;
  const nota1 = parseFloat(document.getElementById("nota1").value);
  const nota2 = parseFloat(document.getElementById("nota2").value);
  const nota3 = parseFloat(document.getElementById("nota3").value);

  // Tratando nome
  // Capitalizando a primeira letra. Para cada primeira letra.
  const separadas = nome.split(" ");
  let nomeCapitalizado = "";
  separadas.map((palavra) => {
    nomeCapitalizado +=
      palavra.charAt(0).toUpperCase() + palavra.slice(1) + " ";
  }).trim();

  // Calculo
  const media = ((nota1 + nota2 + nota3) / 3).toFixed(2);
  let resultado = document.getElementById("resultado");

  // Handle resultado do calculo
  if (media >= 7) {
    resultado.style.border = "1px solid";
    resultado.style.color = "green";
    resultado.innerHTML = ` ${nomeCapitalizado}: APROVADO(a) com média ${media}`;
  } else {
    resultado.style.border = "1px solid";
    resultado.style.color = "red";
    resultado.innerHTML = ` ${nomeCapitalizado}: REPROVADO(a) com média ${media}`;
  }
});
