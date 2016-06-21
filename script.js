
var cont = 0;

function calcular()
{
	//pega os valores do formulario
	var v1 = Number(document.formSoma.valor1.value);
	var v2 = Number(document.formSoma.valor2.value);

	//soma os valores
	var soma = v1 + v2;

	//apresenta o resultado
	alert("A soma dos valores é: "+soma);
}

function cadastrar()
{
	if(localStorage.getItem('cont')==null) //caso não exista nenhum contato gravado
		cont = 0; //zera o contador
	else //caso o contrario
		cont = Number(localStorage.getItem('cont')); //busca a quantidade de contatos armazenados

	//pega os dados do formulario
	var nome = document.getElementById("nome").value;
	var email = document.getElementById("email").value;
	var telefone = document.getElementById("telefone").value;

	//incrementa o contador
	cont++;
	//grava  os dados no localstorage
	localStorage.setItem('cont',cont);
	localStorage.setItem('nome'+cont,nome);
	localStorage.setItem('email'+cont,email);
	localStorage.setItem('telefone'+cont,telefone);

	//mostra mensagem
	alert("Dados gravados com Sucesso");

	//recarrega a pagina
	document.location.reload(true);
}

function listar()
{
	cont = Number(localStorage.getItem('cont'));
	for(var i=1;i<=cont;i++)
	{

		//busca os itens gravados e armazena em variaveis
		var nome = localStorage.getItem('nome'+i);
		var email = localStorage.getItem('email'+i);
		var telefone = localStorage.getItem('telefone'+i);

		//escreve os dados listados dentro da div resultado
		document.getElementById("resultado").innerHTML += "<br>Nome: "+nome+"<br>E-mail: "+email+"<br>Telefone: "+telefone; //incherta um conteudo dentro de um componente, no caso dentro da div
	}
}

