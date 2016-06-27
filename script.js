
var cont = 0;
var bd;

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

function excluir()
{
	if(confirm('Deseja realmente excluir todos os contatos?'))
	{
		localStorage.clear(); //exclui todos os dados da localStorage
		alert("Dados Excluidos");
		//recarrega a pagina
		document.location.reload(true);
	}
}

function cadastrarBD()
{
	var nome = document.getElementById("nome").value;
	var email = document.getElementById("email").value;
	var telefone = document.getElementById("telefone").value;

	//abrir a base de dados(conectar)
	bd = window.openDatabase("baseaula","1.0","Descricao",100000); //abrindo ou criando a base
	//executar as transações, funções na base de dados
	bd.transaction(function(tx){
		//executa o sql para criar a tabela senão existir
		tx.executeSql('CREATE TABLE IF NOT EXISTS contatos(id integer primary key, nome text, email text, telefone text)');
		//cadastrar um contato na tabela
		tx.executeSql('INSERT INTO contatos (nome, email, telefone) values(?,?,?)',[nome,email,telefone]);

		alert("Contato Cadastrado com Sucesso");

		//recarrega a pagina
		//document.location.href(cadastro.html);
	});
}

function listarBD()
{
	//abrir a base de dados(conectar)
	bd = window.openDatabase("baseaula","1.0","Descricao",100000); //abrindo ou criando a base
	//executar as transações, funções na base de dados
	bd.transaction(function(tx){
		//busca os dados da tabela
		tx.executeSql("SELECT * from contatos",[],function(tx,resultado){
			alert("Quantidade de contatos cadastrados: " + resultado.rows.length);
			for(var i=0;i<resultado.rows.length;i++)
			{
				//escreve os dados listados dentro da div resultado
				document.getElementById("resultado").innerHTML +="<br>Nome: "
				+resultado.rows.item(i).nome+"<br>E-mail: "
				+resultado.rows.item(i).email+"<br>Telefone: "
				+resultado.rows.item(i).telefone; //incherta um conteudo dentro de um componente, no caso dentro da div

			}
		});
	});
}

function excluirBD()
{
	var nome = document.getElementById("nome").value;
	var email = document.getElementById("email").value;
	var telefone = document.getElementById("telefone").value;

	//abrir a base de dados(conectar)
	bd = window.openDatabase("baseaula","1.0","Descricao",100000); //abrindo ou criando a base
	//executar as transações, funções na base de dados
	bd.transaction(function(tx){
		//executa o sql para criar a tabela senão existir
		tx.executeSql('DELETE TABLE contatos');

		alert("Contato Excluído com Sucesso");

		//recarrega a pagina
		//document.location.href(cadastro.html);
	});
}

